#!/usr/bin/env python3
# coding: utf-8

import csv
import json


def convert_time_style(time_data):
    time_str = time_data[1:]
    
    if time_str.find(":") == -1:
        time_str = time_str[:-2] + ":" + time_str[-2:]
    
    return time_data[0:1] + time_str.zfill(5)
    

print("railroad_info.json を読み込んでいます...")
with open("railroad_info.json", "r", encoding="utf-8") as json_f:
    railroad_info = json.load(json_f)
    
lines = railroad_info["lines"].keys()

print("JSON化された時刻表データのファイル名を入力してください:")

json_file_name = input()

print(json_file_name + " を読み込んでいます...")

with open(json_file_name, "r", encoding="utf-8") as json_f:
    timetable = json.load(json_f)

station_list = {}
station_list_r = {}
timetable_data = {}
for line in lines:
    station_list[line] = list(railroad_info["lines"][line]["stations"].keys())
    station_list_r[line] = list(reversed(station_list[line]))

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
cnt = 0
while cnt < len(operations):
    if operations[cnt][0].startswith("◆"):
        output_data.append(["# " + operations[cnt][0][1:], "#ffffff"])
        
        cnt += 1
    else:
        output_row_1 = [operations[cnt][0]]
        output_row_2 = [operations[cnt][2]]
        output_row_3 = [operations[cnt][3]]
        output_row_4 = [operations[cnt][1]]
        
        cnt_2 = 4
        while cnt_2 < len(operations[cnt]):
            if (operations[cnt][cnt_2][0:1] == "."):
                output_row_1.append(operations[cnt][cnt_2])
                output_row_2.append("")
                output_row_3.append("")
            elif (operations[cnt][cnt_2] != "" and operations[cnt][cnt_2] != "○" and operations[cnt][cnt_2] != "△"):
                train_name_car_count = operations[cnt][cnt_2].split("(")
                train_name = train_name_car_count[0].zfill(digits_count)
                
                if len(train_name_car_count) == 2:
                    car_count = "(" + train_name_car_count[1]
                else:
                    car_count = ""
                
                first_departure_time = operations[cnt + 1][cnt_2][1:].zfill(5)
                last_departure_time = operations[cnt + 2][cnt_2][1:].zfill(5)
                
                first_departure_times = []
                last_departure_times = []
                for line in lines:
                    if (train_name in timetable[line]["inbound_trains"]):
                        for train in timetable[line]["inbound_trains"][train_name]:
                            for cnt_3 in range(len(train["departure_times"])):
                                if train["departure_times"][cnt_3] != None:
                                    first_departure_times.append(railroad_info["lines"][line]["stations"][station_list_r[line][cnt_3]]["station_initial"] + train["departure_times"][cnt_3])
                                    break
                            for cnt_3 in range(len(train["departure_times"]) - 1, -1, -1):
                                if train["departure_times"][cnt_3] != None:
                                    last_departure_times.append(railroad_info["lines"][line]["stations"][station_list_r[line][cnt_3]]["station_initial"] + train["departure_times"][cnt_3])
                                    break
                    if (train_name in timetable[line]["outbound_trains"]):
                        for train in timetable[line]["outbound_trains"][train_name]:
                            for cnt_3 in range(len(train["departure_times"])):
                                if train["departure_times"][cnt_3] != None:
                                    first_departure_times.append(railroad_info["lines"][line]["stations"][station_list[line][cnt_3]]["station_initial"] + train["departure_times"][cnt_3])
                                    break
                            for cnt_3 in range(len(train["departure_times"]) - 1, -1, -1):
                                if train["departure_times"][cnt_3] != None:
                                    last_departure_times.append(railroad_info["lines"][line]["stations"][station_list[line][cnt_3]]["station_initial"] + train["departure_times"][cnt_3])
                                    break
                
                first_departure_times.sort(key=lambda data : data[1:])
                last_departure_times.sort(key=lambda data : data[1:])
                
                for cnt_3 in range(len(first_departure_times)):
                    if first_departure_times[cnt_3][1:] >= first_departure_time and last_departure_times[cnt_3][1:] <= last_departure_time:
                        output_row_1.append(train_name + car_count)
                        output_row_2.append(first_departure_times[cnt_3])
                        output_row_3.append(last_departure_times[cnt_3])
            
            cnt_2 += 1
        
        output_data.append(output_row_1)
        output_data.append(output_row_2)
        output_data.append(output_row_3)
        output_data.append(output_row_4)
        
        cnt += 3

print("データを新しいCSVファイルに書き込んでいます...")

with open(file_name[:-4] + "_unyohub-format.csv", "w", encoding="utf-8") as csv_f:
    csv_writer = csv.writer(csv_f)
    csv_writer.writerows(output_data)

print("処理が完了しました")