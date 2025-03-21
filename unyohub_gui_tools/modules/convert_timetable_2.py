# coding: utf-8

import os
import csv
import json
import re


def shape_time_string (time_str):
    if ":" not in time_str:
        if int(time_str) >= 300:
            time_str = time_str[:-2] + ":" + time_str[-2:]
        elif len(time_str) >= 3:
            time_str = str(int(time_str[:-2]) + 24) + ":" + time_str[-2:]
        else:
            time_str = "24:" + time_str.zfill(2)
    else:
        time_str_split = time_str.split(":")
        
        if int(time_str_split[0]) <= 2:
            time_str_split[0] = str(int(time_str_split[0]) + 24)
        
        time_str = time_str_split[0] + ":" + time_str_split[1].zfill(2)
    
    return time_str.zfill(5)


def convert_timetable_2 (mes, main_dir, diagram_revision, diagram_id):
    mes("時刻表の変換(ステップ2)", is_heading=True)

    mes("railroad_info.json を読み込んでいます...")
    with open(main_dir + "/railroad_info.json", "r", encoding="utf-8") as json_f:
        railroad_info = json.load(json_f)
    
    time_regexp = re.compile("^[0-2][0-9]:[0-5][0-9]$")
    
    output_data = {}
    
    for line_id in railroad_info["lines_order"]:
        line_data = {}
        
        for direction in ["inbound", "outbound"]:
            file_name = "timetable_" + line_id + "." + diagram_id + "." + direction + ".csv"
            file_path = main_dir + "/" + diagram_revision + "/" + file_name
            
            if not os.path.isfile(file_path):
                mes("《注意》ファイル " + file_name + " がありません")
                
                line_data[direction + "_trains"] = {}
                
                continue
            
            mes(file_name + " を処理しています...")
            with open(file_path, "r", encoding="utf-8") as csv_f:
                csv_reader = csv.reader(csv_f)
                timetable_data = [data_row for data_row in csv_reader]
            
            if len(timetable_data) != len(railroad_info["lines"][line_id]["stations"]) + 14:
                for cnt in range(len(railroad_info["lines"][line_id]["stations"]) + 14 - len(timetable_data)):
                    timetable_data.append([""] * len(timetable_data[0]))
            
            if timetable_data[8][0] != "":
                timetable_data.insert(2, [""] * len(timetable_data[0]))
            
            timetable_data_t = [list(x) for x in zip(*timetable_data)]
            
            station_list = timetable_data_t[0][9: -6]
            trains = timetable_data_t[1:]
            
            direction_data = {}
            previous_train_number = ""
            for train in trains:
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
                
                departure_times = train[9: -6]
                
                last_departure_time = "00:00"
                last_stopped_station_index = 0
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
                        last_stopped_station_index = cnt
                        
                        departure_times[cnt] = before_departure_time + departure_time
                
                if direction == "inbound":
                    last_stopped_station_index = len(railroad_info["lines"][line_id]["stations"]) - last_stopped_station_index - 1
                
                if "station_initial" not in railroad_info["lines"][line_id]["stations"][last_stopped_station_index]:
                    mes("《注意》終着駅に省略表記が登録されていません: " + line_id + " - " + train[0] + " " + railroad_info["lines"][line_id]["stations"][last_stopped_station_index]["station_name"])
                
                for cnt in range(len(departure_times)):
                    if departure_times[cnt] != "":
                        direction_data[train[0]][train_cnt]["starting_station"] = station_list[cnt]
                        
                        if direction == "inbound":
                            starting_station_index = len(railroad_info["lines"][line_id]["stations"]) - cnt - 1
                        else:
                            starting_station_index = cnt
                        
                        if "station_initial" not in railroad_info["lines"][line_id]["stations"][starting_station_index]:
                            mes("《注意》始発駅に省略表記が登録されていません: " + line_id + " - " + train[0] + " " + railroad_info["lines"][line_id]["stations"][starting_station_index]["station_name"])
                        
                        break
                
                direction_data[train[0]][train_cnt]["train_type"] = train[1]
                direction_data[train[0]][train_cnt]["previous_trains"] = []
                direction_data[train[0]][train_cnt]["next_trains"] = []
                
                if train[2] != "":
                    direction_data[train[0]][train_cnt]["destination"] = train[2]
                
                if train[3] != "":
                    direction_data[train[0]][train_cnt]["previous_trains"].append({ "line_id" : train[3], "train_number" : train[4], "starting_station" : train[5] })
                
                if train[6] != "":
                    direction_data[train[0]][train_cnt]["previous_trains"].append({ "line_id" : train[6], "train_number" : train[7], "starting_station" : train[8] })
                
                if train[-6] != "":
                    direction_data[train[0]][train_cnt]["next_trains"].append({ "line_id" : train[-6], "train_number" : train[-5], "starting_station" : train[-4] })
                
                if train[-3] != "":
                    direction_data[train[0]][train_cnt]["next_trains"].append({ "line_id" : train[-3], "train_number" : train[-2], "starting_station" : train[-1] })
                
                
                direction_data[train[0]][train_cnt]["departure_times"] = [None if departure_time == "" else departure_time for departure_time in departure_times]
            
            line_data[direction + "_trains"] = direction_data
        
        output_data[line_id] = line_data
    
    json_file_name = "timetable_" + diagram_id + ".json"
    
    mes(json_file_name + " に保存しています...")
    with open(main_dir + "/" + diagram_revision + "/" + json_file_name, "w", encoding="utf-8") as json_f:
        json.dump(output_data, json_f, ensure_ascii=False, separators=(',', ':'))
    
    mes("処理が完了しました")
