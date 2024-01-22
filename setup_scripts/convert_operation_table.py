#!/usr/bin/env python3
# coding: utf-8

import csv
import json
import sqlite3


def get_lines_and_station(station_initial, cnt, cnt_2):
    global railroad_info
    
    line_list = []
    
    for line in railroad_info["lines_order"]:
        for station in railroad_info["lines"][line]["stations"]:
            if "station_initial" in station and station["station_initial"] == station_initial:
                line_list.append(line)
                station_name = station["station_name"]
    
    if len(line_list) == 0:
        print("「" + station_initial + "」に一致する駅がありません: " + str(cnt + 1) + "行目 " + str(cnt_2 + 1) + "列目")
    
    return line_list, station_name

def split_station_name_and_track(station_name):
    if ":" in station_name:
        station_name_and_track = station_name.split(":")
        station_name = station_name_and_track[0]
        station_track = station_name_and_track[1]
    else:
        station_track = None
    
    return station_name, station_track


print("railroad_info.json を読み込んでいます...")
with open("railroad_info.json", "r", encoding="utf-8") as json_f:
    railroad_info = json.load(json_f)

station_list = {}
for line in railroad_info["lines_order"]:
    station_list[line] = []
    
    for station in railroad_info["lines"][line]["stations"]:
        station_list[line].append(station["station_name"])

print("変換対象のCSVファイル名を入力してください:")

file_name = input()

print(file_name + " を読み込んでいます...")
with open(file_name, "r", encoding="utf-8") as csv_f:
    csv_reader = csv.reader(csv_f)
    operations = [data_row for data_row in csv_reader]

print("データを変換しています...")

error_occurred = False

output_data = []
cnt = 0
id_cnt = 1
while cnt < len(operations):
    if operations[cnt][0].startswith("# "):
        output_data.append({"operation_group_name" : operations[cnt][0][2:], "operations": []})
        
        cnt += 1
    else:
        starting_location, starting_track = split_station_name_and_track(operations[cnt + 1][0].strip())
        terminal_location, terminal_track = split_station_name_and_track(operations[cnt + 2][0].strip())
        
        output_data[-1]["operations"].append({
            "operation_number" : operations[cnt][0].strip(),
            "trains" : [],
            "starting_location" : starting_location,
            "starting_track" : starting_track,
            "terminal_location" : terminal_location,
            "terminal_track" : terminal_track,
            "cars_count" : int(operations[cnt + 3][0]),
            "main_color" : operations[cnt + 3][1]
        })
        
        cnt_2 = 1
        while cnt_2 < len(operations[cnt]) and operations[cnt][cnt_2] != "":
            if operations[cnt][cnt_2][0:1] == ".":
                train_number = operations[cnt][cnt_2] + "__" + str(id_cnt)
                id_cnt += 1
                
                output_data[-1]["operations"][-1]["trains"].append({
                    "train_number" : train_number,
                    "line_id" : None,
                    "first_departure_time" : output_data[-1]["operations"][-1]["trains"][-1]["final_arrival_time"],
                    "final_arrival_time" : None,
                    "starting_station" : None,
                    "terminal_station" : None,
                    "position_forward" : None,
                    "position_rear" : None,
                    "direction" : None
                })
            else:
                train_number = operations[cnt][cnt_2].strip()
                
                if "(" in train_number:
                    bracket_pos = train_number.find("(")
                    hyphen_pos = train_number.rfind("-")
                    
                    position_forward = int(train_number[bracket_pos + 1:hyphen_pos])
                    position_rear = int(train_number[hyphen_pos + 1:-1])
                    
                    train_number = train_number[0:bracket_pos]
                else:
                    position_forward = 1
                    position_rear = int(operations[cnt + 3][0])
                
                if train_number[0:1] == "?":
                    train_number = train_number[1:] + "__" + str(id_cnt)
                    id_cnt += 1
                
                starting_line_list, starting_station = get_lines_and_station(operations[cnt + 1][cnt_2][0:1], cnt, cnt_2)
                terminal_line_list, terminal_station = get_lines_and_station(operations[cnt + 2][cnt_2][0:1], cnt, cnt_2)
                
                if len(output_data[-1]["operations"][-1]["trains"]) >= 1 and output_data[-1]["operations"][-1]["trains"][-1]["train_number"][0:1] != "." and output_data[-1]["operations"][-1]["trains"][-1]["terminal_station"] != starting_station:
                    print("・始発駅が前の列車の終着駅と一致しない列車が検出されました: " + train_number)
                
                line_list = list(set(starting_line_list) & set(terminal_line_list))
                
                first_departure_time = operations[cnt + 1][cnt_2][1:].strip()
                final_arrival_time = operations[cnt + 2][cnt_2][1:].strip()
                
                if len(line_list) == 0:
                    print("エラー: " + train_number + " の走行範囲が複数の路線に跨っています: " + str(cnt + 1) + "行目 " + str(cnt_2 + 1) + "列目")
                    error_occurred = True
                    
                    line_list = starting_line_list
                    direction = "?"
                else:
                    if (station_list[line_list[0]].index(starting_station) > station_list[line_list[0]].index(terminal_station)):
                        direction = "inbound"
                    else:
                        direction = "outbound"
                
                
                if len(output_data[-1]["operations"][-1]["trains"]) >= 1:
                    if output_data[-1]["operations"][-1]["trains"][-1]["final_arrival_time"] == None:
                        if cnt_2 >= 2:
                            output_data[-1]["operations"][-1]["trains"][-1]["final_arrival_time"] = first_departure_time
                    elif output_data[-1]["operations"][-1]["trains"][-1]["final_arrival_time"] != first_departure_time:
                        if output_data[-1]["operations"][-1]["trains"][-1]["train_number"] == train_number:
                            stopped_train_number = train_number
                        else:
                            stopped_train_number = "_" + train_number
                        
                        output_data[-1]["operations"][-1]["trains"].append({
                            "train_number" : stopped_train_number,
                            "line_id" : line_list[0],
                            "first_departure_time" : output_data[-1]["operations"][-1]["trains"][-1]["final_arrival_time"],
                            "final_arrival_time" : first_departure_time,
                            "starting_station" : starting_station,
                            "terminal_station" : starting_station,
                            "position_forward" : position_forward,
                            "position_rear" : position_rear,
                            "direction" : direction
                        })
                
                
                output_data[-1]["operations"][-1]["trains"].append({
                    "train_number" : train_number,
                    "line_id" : line_list[0],
                    "first_departure_time" : first_departure_time,
                    "final_arrival_time" : final_arrival_time,
                    "starting_station" : starting_station,
                    "terminal_station" : terminal_station,
                    "position_forward" : position_forward,
                    "position_rear" : position_rear,
                    "direction" : direction
                })
            
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