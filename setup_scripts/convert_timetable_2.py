#!/usr/bin/env python3
# coding: utf-8

import csv
import json

print("変換対象のCSVファイル名を入力してください:")

file_name = input()

print(file_name + " を読み込んでいます...")
with open(file_name, "r", encoding="utf-8") as csv_f:
    csv_reader = csv.reader(csv_f)
    timetable_data = [data_row for data_row in csv_reader]

print("データを変換しています...")

timetable_data_t = [list(x) for x in zip(*timetable_data)]

json_data = {}
previous_train_number = ""
for train in timetable_data_t:
    if train[0] != previous_train_number:
        json_data[train[0]] = []
        train_cnt = 0
    else:
        train_cnt += 1
    
    previous_train_number = train[0]
    
    json_data[train[0]].append({})
    
    departure_times = train[8:len(train) - 6]
    
    json_data[train[0]][train_cnt]["first_departure_time"] = list(filter(lambda x: x != "", departure_times))[0]
    json_data[train[0]][train_cnt]["train_type"] = train[1]
    json_data[train[0]][train_cnt]["previous_trains"] = []
    json_data[train[0]][train_cnt]["next_trains"] = []
    
    if train[2] != "":
        json_data[train[0]][train_cnt]["previous_trains"].append({ "line_id" : train[2], "train_number" : train[3], "first_departure_time" : train[4] })
    
    if train[5] != "":
        json_data[train[0]][train_cnt]["previous_trains"].append({ "line_id" : train[5], "train_number" : train[6], "first_departure_time" : train[7] })
    
    if train[-6] != "":
        json_data[train[0]][train_cnt]["next_trains"].append({ "line_id" : train[-6], "train_number" : train[-5], "first_departure_time" : train[-4] })
    
    if train[-3] != "":
        json_data[train[0]][train_cnt]["next_trains"].append({ "line_id" : train[-3], "train_number" : train[-2], "first_departure_time" : train[-1] })
    
    json_data[train[0]][train_cnt]["departure_times"] = departure_times

json_file_name = file_name[:-3] + "json"

print(json_file_name + " に保存しています...")
with open(json_file_name, "w", encoding="utf-8") as json_f:
    json.dump(json_data, json_f, ensure_ascii=False, indent=4)


print("処理が完了しました")