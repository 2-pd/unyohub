#!/usr/bin/env python3
# coding: utf-8

import csv
import json
from operator import itemgetter

print("変換対象のCSVファイル名を入力してください:")

file_name = input()

print(file_name + " を読み込んでいます...")
with open(file_name, "r", encoding="utf-8") as csv_f:
    csv_reader = csv.reader(csv_f)
    timetable_data = [data_row for data_row in csv_reader]

print("データを変換しています...")

timetable_data_t = [list(x) for x in zip(*timetable_data)]

new_timetable_t = {}

line_list = timetable_data_t[0][0].split()
line_stations = {}

for line_id in line_list:
    new_timetable_t[line_id] = []
    
    line_stations[line_id] = []
    
    for cnt in range(2, len(timetable_data_t[0])):
        if line_id in timetable_data_t[0][cnt]:
            line_stations[line_id] += [cnt]

for cnt in range(2, len(timetable_data_t)):
    for line_id in line_list:
        train = list(itemgetter(*line_stations[line_id])(timetable_data_t[cnt]))
        
        if sum([i != "" for i in train]) > 1:
            train = [timetable_data_t[cnt][0], timetable_data_t[cnt][1], "", "", "", "", "", ""] + train + ["", "", "", "", "", ""]
            
            for line_id_2 in line_list:
                line_data_last = len(new_timetable_t[line_id_2]) - 1
                
                if line_id_2 != line_id and line_data_last >= 0 and new_timetable_t[line_id_2][line_data_last][0] == train[0]:
                    line_id_2_len = len(new_timetable_t[line_id_2][line_data_last])
                    
                    train[2] = line_id_2
                    train[3] = train[0]
                    train[4] = list(filter(lambda x: x != "", new_timetable_t[line_id_2][line_data_last][8:line_id_2_len - 6]))[0]
                    
                    new_timetable_t[line_id_2][line_data_last][line_id_2_len - 6] = line_id
                    new_timetable_t[line_id_2][line_data_last][line_id_2_len - 5] = train[0]
                    new_timetable_t[line_id_2][line_data_last][line_id_2_len - 4] = list(filter(lambda x: x != "", train[8:len(train) - 6]))[0]
            
            new_timetable_t[line_id].append(train)


print("データを新しいCSVファイルに書き込んでいます...")

for line_id in line_list:
    new_file_name = line_id + "." + file_name
    
    with open(new_file_name, "w", encoding="utf-8") as csv_f:
        csv_writer = csv.writer(csv_f)
        csv_writer.writerows([list(x) for x in zip(*new_timetable_t[line_id])])

print("処理が完了しました")