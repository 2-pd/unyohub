# coding: utf-8

import os
import csv
import json
import re


def shape_time_string (time_string):
    if ":" not in time_string:
        time_string = time_string[:-2] + ":" + time_string[-2:]
    
    return time_string.zfill(5)


def convert_timetable_2 (mes, main_dir, operation_table):
    mes("時刻表の変換(ステップ2)", is_heading=True)

    mes("railroad_info.json を読み込んでいます...")
    with open(main_dir + "/railroad_info.json", "r", encoding="utf-8") as json_f:
        railroad_info = json.load(json_f)
    
    time_regexp = re.compile("^[0-2][0-9]:[0-5][0-9]$")
    
    output_data = {}
    
    for line_id in railroad_info["lines_order"]:
        line_data = {}
        
        for direction in ["inbound", "outbound"]:
            file_name = "timetable_" + line_id + "." + operation_table + "." + direction + ".csv"
            file_path = main_dir + "/" + file_name
            
            if not os.path.isfile(file_path):
                mes("ファイル " + file_name + " が見つかりません", True)
                return
            
            mes(file_name + " を処理しています...")
            with open(file_path, "r", encoding="utf-8") as csv_f:
                csv_reader = csv.reader(csv_f)
                timetable_data = [data_row for data_row in csv_reader]
            
            if len(timetable_data) != len(railroad_info["lines"][line_id]["stations"]) + 14:
                for cnt in range(len(railroad_info["lines"][line_id]["stations"]) + 14 - len(timetable_data)):
                    timetable_data.append([""] * len(timetable_data[0]))
            
            timetable_data_t = [list(x) for x in zip(*timetable_data)]
            
            direction_data = {}
            previous_train_number = ""
            for train in timetable_data_t:
                if train[0] == "":
                    continue
                
                if train[0] != previous_train_number:
                    if train[0] in direction_data:
                        mes("《注意》直通情報のない同一名の列車が検出されました: " + line_id + " - " + train[0])
                    
                    direction_data[train[0]] = []
                    train_cnt = 0
                else:
                    train_cnt += 1
                
                previous_train_number = train[0]
                
                direction_data[train[0]].append({})
                
                departure_times = train[8: -6]
                
                last_departure_time = "00:00"
                for cnt in range(len(departure_times)):
                    if departure_times[cnt] != "":
                        if departure_times[cnt][0] == "|":
                            departure_time = departure_times[cnt][1:].strip()
                            before_departure_time = "|"
                        else:
                            departure_time = departure_times[cnt]
                            before_departure_time = ""
                        
                        departure_time = shape_time_string(departure_time)
                        
                        if time_regexp.match(departure_time) is None or departure_time < last_departure_time:
                            mes("《注意》異常な時刻値が検出されました: " + line_id + " - " + train[0])
                        
                        last_departure_time = departure_time
                        
                        departure_times[cnt] = before_departure_time + departure_time
                
                direction_data[train[0]][train_cnt]["first_departure_time"] = list(filter(lambda x: x != "", departure_times))[0][-5:]
                direction_data[train[0]][train_cnt]["train_type"] = train[1]
                direction_data[train[0]][train_cnt]["previous_trains"] = []
                direction_data[train[0]][train_cnt]["next_trains"] = []
                
                if train[2] != "":
                    direction_data[train[0]][train_cnt]["previous_trains"].append({ "line_id" : train[2], "train_number" : train[3], "first_departure_time" : shape_time_string(train[4]) })
                
                if train[5] != "":
                    direction_data[train[0]][train_cnt]["previous_trains"].append({ "line_id" : train[5], "train_number" : train[6], "first_departure_time" : shape_time_string(train[7]) })
                
                if train[-6] != "":
                    direction_data[train[0]][train_cnt]["next_trains"].append({ "line_id" : train[-6], "train_number" : train[-5], "first_departure_time" : shape_time_string(train[-4]) })
                
                if train[-3] != "":
                    direction_data[train[0]][train_cnt]["next_trains"].append({ "line_id" : train[-3], "train_number" : train[-2], "first_departure_time" : shape_time_string(train[-1]) })
                
                
                direction_data[train[0]][train_cnt]["departure_times"] = [None if departure_time == "" else departure_time for departure_time in departure_times]
            
            line_data[direction + "_trains"] = direction_data
        
        output_data[line_id] = line_data
    
    json_file_name = "timetable_" + operation_table + ".json"
    
    mes(json_file_name + " に保存しています...")
    with open(main_dir + "/" + json_file_name, "w", encoding="utf-8") as json_f:
        json.dump(output_data, json_f, ensure_ascii=False, separators=(',', ':'))
    
    mes("処理が完了しました")
