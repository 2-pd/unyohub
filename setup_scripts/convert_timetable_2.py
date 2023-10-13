#!/usr/bin/env python3
# coding: utf-8

import csv
import json

print("railroad_info.json を読み込んでいます...")
with open("railroad_info.json", "r", encoding="utf-8") as json_f:
    railroad_info = json.load(json_f)

print("変換対象のダイヤ識別名を入力してください:")

operation_table = input()

lines = railroad_info["lines"].keys()

output_data = {}

for line_id in lines:
    line_data = {}
    
    for direction in ["inbound", "outbound"]:
        file_name = "timetable_" + line_id + "." + operation_table + "." + direction + ".csv"
        
        print(file_name + " を処理しています...")
        with open(file_name, "r", encoding="utf-8") as csv_f:
            csv_reader = csv.reader(csv_f)
            timetable_data = [data_row for data_row in csv_reader]
        
        timetable_data_t = [list(x) for x in zip(*timetable_data)]
        
        direction_data = {}
        previous_train_number = ""
        for train in timetable_data_t:
            if train[0] != previous_train_number:
                direction_data[train[0]] = []
                train_cnt = 0
            else:
                train_cnt += 1
            
            previous_train_number = train[0]
            
            direction_data[train[0]].append({})
            
            departure_times = train[8:len(train) - 6]
            
            direction_data[train[0]][train_cnt]["first_departure_time"] = list(filter(lambda x: x != "", departure_times))[0]
            direction_data[train[0]][train_cnt]["train_type"] = train[1]
            direction_data[train[0]][train_cnt]["previous_trains"] = []
            direction_data[train[0]][train_cnt]["next_trains"] = []
            
            if train[2] != "":
                direction_data[train[0]][train_cnt]["previous_trains"].append({ "line_id" : train[2], "train_number" : train[3], "first_departure_time" : train[4] })
            
            if train[5] != "":
                direction_data[train[0]][train_cnt]["previous_trains"].append({ "line_id" : train[5], "train_number" : train[6], "first_departure_time" : train[7] })
            
            if train[-6] != "":
                direction_data[train[0]][train_cnt]["next_trains"].append({ "line_id" : train[-6], "train_number" : train[-5], "first_departure_time" : train[-4] })
            
            if train[-3] != "":
                direction_data[train[0]][train_cnt]["next_trains"].append({ "line_id" : train[-3], "train_number" : train[-2], "first_departure_time" : train[-1] })
            
            
            direction_data[train[0]][train_cnt]["departure_times"] = [None if departure_time == "" else departure_time for departure_time in departure_times]
        
        line_data[direction + "_trains"] = direction_data
    
    output_data[line_id] = line_data

json_file_name = "timetable_" + operation_table + ".json"

print(json_file_name + " に保存しています...")
with open(json_file_name, "w", encoding="utf-8") as json_f:
    json.dump(output_data, json_f, ensure_ascii=False, separators=(',', ':'))

print("処理が完了しました")