#!/usr/bin/env python3
# coding: utf-8

import csv
from operator import itemgetter

print("変換対象のCSVファイル名を入力してください:")

file_name = input()

print("所定の桁数に満たない列車番号の前に「0」を付加する場合にはその桁数を、しない場合には0を入力してください:")

digits_count = int(input())

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
            line_stations[line_id].append(cnt)

for cnt in range(1, len(timetable_data_t)):
    for line_id in line_list:
        train = list(itemgetter(*line_stations[line_id])(timetable_data_t[cnt]))
        
        if sum([i != "" for i in train]) > 1:
            train = [timetable_data_t[cnt][0].zfill(digits_count), timetable_data_t[cnt][1], "", "", "", "", "", ""] + train + ["", "", "", "", "", ""]
            
            for cnt_2 in range(8, len(train) - 6):
                if train[cnt_2] != "":
                    if train[cnt_2].find(":") == -1:
                        train[cnt_2] = train[cnt_2][:-2] + ":" + train[cnt_2][-2:]
                    
                    train[cnt_2] = train[cnt_2].zfill(5)
            
            for line_id_2 in line_list:
                if line_id_2 != line_id and len(new_timetable_t[line_id_2]) >= 1 and new_timetable_t[line_id_2][-1][0] == train[0]:
                    train[2] = line_id_2
                    train[3] = train[0]
                    train[4] = list(filter(lambda x: x != "", new_timetable_t[line_id_2][-1][8:-6]))[0]
                    
                    new_timetable_t[line_id_2][-1][-6] = line_id
                    new_timetable_t[line_id_2][-1][-5] = train[0]
                    new_timetable_t[line_id_2][-1][-4] = list(filter(lambda x: x != "", train[8:-6]))[0]
            
            new_timetable_t[line_id].append(train)


print("データを新しいCSVファイルに書き込んでいます...")

if file_name[0:10] == "timetable_":
    file_name = file_name[10:]

for line_id in line_list:
    new_file_name = "timetable_" + line_id + "." + file_name
    
    with open(new_file_name, "w", encoding="utf-8") as csv_f:
        csv_writer = csv.writer(csv_f)
        csv_writer.writerows([list(x) for x in zip(*new_timetable_t[line_id])])

print("処理が完了しました")