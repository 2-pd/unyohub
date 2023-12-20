#!/usr/bin/env python3
# coding: utf-8

import csv
import json
import re


def convert_time_style(time_data):
    time_str = time_data[1:]
    
    if time_str.find(":") == -1:
        time_str = time_str[:-2] + ":" + time_str[-2:]
    
    return time_data[0:1] + time_str.zfill(5)

def get_lines_and_station_initial(station_name):
    global railroad_info
    
    line_list = []
    
    for line in railroad_info["lines_order"]:
        for station in railroad_info["lines"][line]["stations"]:
            if "station_name" in station and station["station_name"] == station_name:
                line_list.append(line)
                station_initial = station["station_initial"]
    
    return line_list, station_initial


print("railroad_info.json を読み込んでいます...")
with open("railroad_info.json", "r", encoding="utf-8") as json_f:
    railroad_info = json.load(json_f)
    
lines = railroad_info["lines_order"]

station_list = {}
station_list_r = {}
for line in lines:
    station_list[line] = railroad_info["lines"][line]["stations"]
    station_list_r[line] = list(reversed(station_list[line]))

station_name_list = {}
station_name_list_r = {}
for line in lines:
    station_name_list[line] = []
    
    for station in railroad_info["lines"][line]["stations"]:
        station_name_list[line].append(station["station_name"])
    
    station_name_list_r[line] = list(reversed(station_name_list[line]))

print("JSON化された時刻表データのファイル名を入力してください:")

json_file_name = input()

print(json_file_name + " を読み込んでいます...")

with open(json_file_name, "r", encoding="utf-8") as json_f:
    timetable = json.load(json_f)

print("列車番号と運転区間の関係を記載したCSVファイル名を入力してください:")

regexp_file_name = input()

print(regexp_file_name + " を読み込んでいます...")
with open(regexp_file_name, "r", encoding="utf-8") as csv_f:
    csv_reader = csv.reader(csv_f)
    regexp_csv = [data_row for data_row in csv_reader]

regexp_list = []
for regexp_csv_row in regexp_csv:
    regexp_list.append({
        "regexp" : regexp_csv_row[0],
        "starting_station" : regexp_csv_row[1],
        "terminal_station" : regexp_csv_row[2],
    })

print("変換対象のCSVファイル名を入力してください:")

file_name = input()

print("所定の桁数に満たない列車番号の前に「0」を付加する場合にはその桁数を、しない場合には0を入力してください:")

digits_count = int(input())

print(file_name + " を読み込んでいます...")
with open(file_name, "r", encoding="utf-8") as csv_f:
    csv_reader = csv.reader(csv_f)
    operations = [data_row for data_row in csv_reader]

print("データを変換しています...")

output_data = []
for operation in operations:
    if operation[0].startswith("◆"):
        output_data.append(["# " + operation[0][1:]])
        
        if re.match("^#[0-9A-Fa-f]{6}$", operation[1]) != None:
            color = operation[1]
        else:
            color = "#ffffff"
    else:
        output_row_1 = [operation[0]]
        output_row_2 = [operation[2]]
        output_row_3 = [operation[3]]
        output_row_4 = [operation[1], color]
        
        for train_cell in operation[4:]:
            train_cell = train_cell.strip()
            
            if train_cell[0:1] == ".":
                output_row_1.append(train_cell)
                output_row_2.append("")
                output_row_3.append("")
            elif train_cell != "" and train_cell != "○" and train_cell != "△":
                train_time = train_cell.split("[")
                
                train_name_car_count = train_time[0].split("(")
                if train_name_car_count[0][0:1] != "?":
                    train_name = train_name_car_count[0].zfill(digits_count)
                else:
                    train_name = train_name_car_count[0]
                
                if len(train_name_car_count) == 2:
                    car_count = "(" + train_name_car_count[1]
                else:
                    car_count = ""
                
                if len(train_time) == 2:
                    train_rows = train_time[1].split("-")
                    
                    train_rows[1] = train_rows[1][:-1]
                    
                    output_row_1.append(train_name + car_count)
                    output_row_2.append(convert_time_style(train_rows[0]))
                    output_row_3.append(convert_time_style(train_rows[1]))
                else:
                    starting_station = None
                    terminal_station = None
                    
                    for regexp_data in regexp_list:
                        if re.match(regexp_data["regexp"], train_name) != None:
                            starting_station = regexp_data["starting_station"]
                            terminal_station = regexp_data["terminal_station"]
                            
                            break
                    
                    if starting_station == None or terminal_station == None:
                        print("列車番号がいずれの運転区間にもマッチしません: " + train_name)
                        output_row_2.append("")
                        output_row_3.append("")
                        continue
                    
                    starting_lines, starting_station_initial = get_lines_and_station_initial(starting_station)
                    terminal_lines, terminal_station_initial = get_lines_and_station_initial(terminal_station)
                    
                    first_departure_time = "00:00"
                    final_arrival_time = "99:99"
                    
                    first_departure_times = []
                    final_arrival_times = []
                    for line in lines:
                        if train_name in timetable[line]["inbound_trains"]:
                            if line in starting_lines:
                                starting_station_index = station_name_list_r[line].index(starting_station)
                            if line in terminal_lines:
                                terminal_station_index = station_name_list_r[line].index(terminal_station)
                            
                            for train in timetable[line]["inbound_trains"][train_name]:
                                if line in starting_lines and train["departure_times"][starting_station_index] != None and train["departure_times"][starting_station_index] > first_departure_time:
                                        first_departure_time = train["departure_times"][starting_station_index]
                                
                                if line in terminal_lines and train["departure_times"][terminal_station_index] != None and train["departure_times"][terminal_station_index] < final_arrival_time:
                                        final_arrival_time = train["departure_times"][terminal_station_index]
                                    
                                for cnt in range(len(train["departure_times"])):
                                    if train["departure_times"][cnt] != None:
                                        first_departure_times.append(station_list_r[line][cnt]["station_initial"] + train["departure_times"][cnt])
                                        break
                                
                                for cnt in range(len(train["departure_times"]) - 1, -1, -1):
                                    if train["departure_times"][cnt] != None:
                                        final_arrival_times.append(station_list_r[line][cnt]["station_initial"] + train["departure_times"][cnt])
                                        break
                        elif train_name in timetable[line]["outbound_trains"]:
                            if line in starting_lines:
                                starting_station_index = station_name_list[line].index(starting_station)
                            if line in terminal_lines:
                                terminal_station_index = station_name_list[line].index(terminal_station)
                            
                            for train in timetable[line]["outbound_trains"][train_name]:
                                if line in starting_lines and train["departure_times"][starting_station_index] != None and train["departure_times"][starting_station_index] > first_departure_time:
                                        first_departure_time = train["departure_times"][starting_station_index]
                                
                                if line in terminal_lines and train["departure_times"][terminal_station_index] != None and train["departure_times"][terminal_station_index] < final_arrival_time:
                                        final_arrival_time = train["departure_times"][terminal_station_index]
                                
                                for cnt in range(len(train["departure_times"])):
                                    if train["departure_times"][cnt] != None:
                                        first_departure_times.append(station_list[line][cnt]["station_initial"] + train["departure_times"][cnt])
                                        break
                                
                                for cnt in range(len(train["departure_times"]) - 1, -1, -1):
                                    if train["departure_times"][cnt] != None:
                                        final_arrival_times.append(station_list[line][cnt]["station_initial"] + train["departure_times"][cnt])
                                        break
                    
                    if first_departure_time == "00:00" or final_arrival_time == "99:99":
                        print("列車番号が時刻表にありません: " + train_name)
                    
                    if len(first_departure_times) >= 1:
                        first_departure_times.sort(key=lambda data : data[1:])
                        final_arrival_times.sort(key=lambda data : data[1:])
                        
                        for cnt in range(len(first_departure_times)):
                            if first_departure_times[cnt][1:] >= first_departure_time and final_arrival_times[cnt][1:] <= final_arrival_time:
                                output_row_1.append(train_name + car_count)
                                output_row_2.append(first_departure_times[cnt])
                                output_row_3.append(final_arrival_times[cnt])
                    else:
                        output_row_1.append(train_name + car_count)
                        output_row_2.append(starting_station_initial + first_departure_time)
                        output_row_3.append(terminal_station_initial + final_arrival_time)
        
        output_data.append(output_row_1)
        output_data.append(output_row_2)
        output_data.append(output_row_3)
        output_data.append(output_row_4)

print("データを新しいCSVファイルに書き込んでいます...")

with open(file_name[:-4] + "_unyohub-format.csv", "w", encoding="utf-8") as csv_f:
    csv_writer = csv.writer(csv_f)
    csv_writer.writerows(output_data)

print("処理が完了しました")