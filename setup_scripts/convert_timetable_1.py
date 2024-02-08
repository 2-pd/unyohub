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
rename_list = {}

for cnt in range(len(line_list)):
    period_pos = line_list[cnt].rfind(".")
    
    if period_pos != -1:
        rename_list[line_list[cnt][:period_pos]] = line_list[cnt][period_pos + 1:]
        line_list[cnt] = line_list[cnt][:period_pos]
    
    new_timetable_t[line_list[cnt]] = []
    
    line_stations[line_list[cnt]] = []
    
    for cnt_2 in range(2, len(timetable_data_t[0])):
        if line_list[cnt] in timetable_data_t[0][cnt_2]:
            line_stations[line_list[cnt]].append(cnt_2)

for cnt in range(1, len(timetable_data_t)):
    if timetable_data_t[cnt][0] == "":
        continue
    
    for line_id in line_list:
        train = list(itemgetter(*line_stations[line_id])(timetable_data_t[cnt]))
        
        if sum([i != "" for i in train]) > 1:
            train = [timetable_data_t[cnt][0].strip().zfill(digits_count), timetable_data_t[cnt][1], "", "", "", "", "", ""] + train + ["", "", "", "", "", ""]
            
            for cnt_2 in range(8, len(train) - 6):
                train[cnt_2] = train[cnt_2].strip()
                
                if train[cnt_2] != "":
                    if train[cnt_2][0] == "|":
                        departure_time = train[cnt_2][1:].strip()
                        before_departure_time = "|"
                    else:
                        departure_time = train[cnt_2]
                        before_departure_time = ""
                    
                    if ":" not in departure_time:
                        departure_time = departure_time[:-2] + ":" + departure_time[-2:]
                    
                    train[cnt_2] = before_departure_time + departure_time.zfill(5)
            
            for line_id_2 in line_list:
                if len(new_timetable_t[line_id_2]) >= 1 and new_timetable_t[line_id_2][-1][0] == train[0]:
                    train[2] = line_id_2
                    train[3] = train[0]
                    train[4] = list(filter(lambda x: x != "", new_timetable_t[line_id_2][-1][8:-6]))[0][-5:]
                    
                    new_timetable_t[line_id_2][-1][-6] = line_id
                    new_timetable_t[line_id_2][-1][-5] = train[0]
                    new_timetable_t[line_id_2][-1][-4] = list(filter(lambda x: x != "", train[8:-6]))[0][-5:]
            
            new_timetable_t[line_id].append(train)


print("データを新しいCSVファイルに書き込んでいます...")

if file_name[0:10] == "timetable_":
    file_name = file_name[10:]

for line_id in line_list:
    new_file_name = "timetable_" + line_id + "." + file_name[:-4]
    
    if line_id in rename_list:
        new_file_name = new_file_name[:new_file_name.rfind(".") + 1] + rename_list[line_id]
    
    with open(new_file_name + ".csv", "w", encoding="utf-8") as csv_f:
        csv_writer = csv.writer(csv_f)
        csv_writer.writerows([list(x) for x in zip(*new_timetable_t[line_id])])

print("処理が完了しました")
