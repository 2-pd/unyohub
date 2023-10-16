#!/usr/bin/env python3
# coding: utf-8

import csv
import json
import sqlite3


def get_lines_and_stations(station_initial):
    global railroad_info
    
    line_list = []
    
    lines = railroad_info["lines"].keys()
    for line in lines:
        stations = railroad_info["lines"][line]["stations"].keys()
        for station in stations:
            if "station_initial" in railroad_info["lines"][line]["stations"][station] and railroad_info["lines"][line]["stations"][station]["station_initial"] == station_initial:
                line_list.append(line)
                station_name = station
    
    return line_list, station_name


print("railroad_info.json を読み込んでいます...")
with open("railroad_info.json", "r", encoding="utf-8") as json_f:
    railroad_info = json.load(json_f)
    
lines = list(railroad_info["lines"].keys())

print("変換対象のCSVファイル名を入力してください:")

file_name = input()

print(file_name + " を読み込んでいます...")
with open(file_name, "r", encoding="utf-8") as csv_f:
    csv_reader = csv.reader(csv_f)
    operations = [data_row for data_row in csv_reader]

print("データを変換しています...")

error_occurred = False

output_data = {}
cnt = 0
id_cnt = 1
while cnt < len(operations):
    if operations[cnt][0].startswith("# "):
        operation_group = operations[cnt][0][2:]
        output_data[operation_group] = {"operations" : {}, "color" : operations[cnt][1]}
        
        cnt += 1
    else:
        previous_train_final_arrival_time = None
        
        operation_number = operations[cnt][0]
        output_data[operation_group]["operations"][operation_number] = {"trains" : {}}
        
        output_data[operation_group]["operations"][operation_number]["starting_location"] = operations[cnt + 1][0]
        output_data[operation_group]["operations"][operation_number]["terminal_location"] = operations[cnt + 2][0]
        output_data[operation_group]["operations"][operation_number]["car_count"] = operations[cnt + 3][0]
        
        cnt_2 = 1
        while cnt_2 < len(operations[cnt]) and operations[cnt][cnt_2] != "":
            if operations[cnt][cnt_2][0:1] == ".":
                train_number = operations[cnt][cnt_2] + "__" + str(id_cnt)
                id_cnt += 1
                
                output_data[operation_group]["operations"][operation_number]["trains"][train_number] = [{
                    "line_id" : None,
                    "first_departure_time" : previous_train_final_arrival_time,
                    "final_arrival_time" : None,
                    "starting_station" : None,
                    "terminal_station" : None,
                    "position_forward" : None,
                    "position_rear" : None,
                    "direction" : None
                }]
                
                previous_train_number = train_number
                previous_train_final_arrival_time = None
            else:
                train_number = operations[cnt][cnt_2]
                
                if "(" in train_number:
                    bracket_pos = train_number.find("(")
                    hyphen_pos = train_number.rfind("(")
                    
                    position_forward = int(train_number[bracket_pos + 1:hyphen_pos])
                    position_rear = int(train_number[hyphen_pos + 1:-1])
                    
                    train_number = train_number[0:bracket_pos]
                else:
                    position_forward = 1
                    position_rear = int(operations[cnt + 3][0])
                
                if train_number[0:1] == "?":
                    train_number = train_number[1:] + "__" + str(id_cnt)
                    id_cnt += 1
                
                if train_number in output_data[operation_group]["operations"][operation_number]["trains"]:
                    train_index = len(output_data[operation_group]["operations"][operation_number]["trains"][train_number])
                    output_data[operation_group]["operations"][operation_number]["trains"][train_number].append({})
                else:
                    train_index = 0
                    output_data[operation_group]["operations"][operation_number]["trains"][train_number] = [{}]
                
                starting_line_list, starting_station = get_lines_and_stations(operations[cnt + 1][cnt_2][0:1])
                terminal_line_list, terminal_station = get_lines_and_stations(operations[cnt + 2][cnt_2][0:1])
                
                line_list = list(set(starting_line_list) & set(terminal_line_list))
                
                first_departure_time = operations[cnt + 1][cnt_2][1:]
                final_arrival_time = operations[cnt + 2][cnt_2][1:]
                
                if len(line_list) == 0:
                    print("エラー: " + train_number + " の走行範囲が複数の路線に跨っています")
                    error_occurred = True
                    
                    line_list = starting_line_list
                    direction = "?"
                else:
                    if (list(railroad_info["lines"][line_list[0]]["stations"].keys()).index(starting_station) > list(railroad_info["lines"][line_list[0]]["stations"].keys()).index(terminal_station)):
                        direction = "inbound"
                    else:
                        direction = "outbound"
                
                output_data[operation_group]["operations"][operation_number]["trains"][train_number][train_index] = {
                    "line_id" : line_list[0],
                    "first_departure_time" : first_departure_time,
                    "final_arrival_time" : final_arrival_time,
                    "starting_station" : starting_station,
                    "terminal_station" : terminal_station,
                    "position_forward" : position_forward,
                    "position_rear" : position_rear,
                    "direction" : direction
                }
                
                
                if previous_train_final_arrival_time == None:
                    if cnt_2 >= 2:
                        output_data[operation_group]["operations"][operation_number]["trains"][previous_train_number][0]["final_arrival_time"] = first_departure_time
                elif previous_train_final_arrival_time != first_departure_time:
                    if previous_train_number == train_number:
                        stopped_train_number = train_number
                        stopped_train_index = train_index
                        
                        output_data[operation_group]["operations"][operation_number]["trains"][stopped_train_number].insert(train_index, {})
                    else:
                        stopped_train_number = "_" + train_number
                        stopped_train_index = 0
                        
                        tmp_train_data = output_data[operation_group]["operations"][operation_number]["trains"].pop(train_number)
                        
                        output_data[operation_group]["operations"][operation_number]["trains"][stopped_train_number] = [{}]
                        
                        output_data[operation_group]["operations"][operation_number]["trains"][train_number] = tmp_train_data
                    
                    output_data[operation_group]["operations"][operation_number]["trains"][stopped_train_number][stopped_train_index] = {
                        "line_id" : line_list[0],
                        "first_departure_time" : previous_train_final_arrival_time,
                        "final_arrival_time" : first_departure_time,
                        "starting_station" : starting_station,
                        "terminal_station" : starting_station,
                        "position_forward" : position_forward,
                        "position_rear" : position_rear,
                        "direction" : direction
                    }
                
                
                previous_train_number = train_number
                previous_train_final_arrival_time = final_arrival_time
            
            cnt_2 += 1
        
        cnt += 4

if error_occurred:
    print("エラー発生のため処理が中断されました")
else:
    json_file_name = file_name[0:-4] + ".json"
    
    print(json_file_name + " に保存しています...")
    with open(json_file_name, "w", encoding="utf-8") as json_f:
        json.dump(output_data, json_f, ensure_ascii=False, separators=(',', ':'))
    
    print("処理が完了しました")