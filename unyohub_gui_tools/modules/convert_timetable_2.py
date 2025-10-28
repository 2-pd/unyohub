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
    previous_trains = {}
    
    lines = railroad_info["lines_order"]
    
    if "joined_lines_order" in railroad_info:
        lines += railroad_info["joined_lines_order"]
    
    for line_id in lines:
        line_data = {}
        
        for direction in ["inbound", "outbound"]:
            file_name = "timetable_" + line_id + "." + diagram_id + "." + direction + ".csv"
            file_path = main_dir + "/" + diagram_revision + "/" + file_name
            
            if not os.path.isfile(file_path):
                mes("《注意》ファイル " + file_name + " がありません")
                
                line_data[direction + "_trains"] = {}
                
                continue
            
            mes(file_name + " を処理しています...")
            with open(file_path, "r", encoding="utf-8-sig") as csv_f:
                csv_reader = csv.reader(csv_f)
                timetable_data = [data_row for data_row in csv_reader]
            
            if timetable_data[3][0] == "":
                if timetable_data[2][0] != "":
                    del timetable_data[3:9]
                else:
                    del timetable_data[2:8]
            elif timetable_data[2][0] != "":
                timetable_data.insert(2, [""] * len(timetable_data[0]))
            
            station_list = []
            arrival_time_mapping = []
            departure_time_mapping = []
            for cnt in range(3, len(timetable_data)):
                station_name = timetable_data[cnt][0].strip()
                
                if len(station_name) == 0:
                    cnt -= 1
                    break
                
                if station_name.endswith("]"):
                    if station_name[-2] == "着":
                        arrival_time_mapping.append(True)
                        departure_time_mapping.append(False)
                    else:
                        arrival_time_mapping.append(False)
                        departure_time_mapping.append(True)
                    
                    station_name = station_name[:-3].strip()
                    if len(station_list) == 0 or station_list[-1] != station_name:
                        station_list.append(station_name)
                else:
                    arrival_time_mapping.append(True)
                    departure_time_mapping.append(True)
                    
                    station_list.append(station_name)
            
            for cnt_2 in range(len(timetable_data), cnt + 7):
                timetable_data.append([""] * len(timetable_data[0]))
            
            timetable_data_t = [list(x) for x in zip(*timetable_data)]
            
            trains = timetable_data_t[1:]
            
            station_count = len(station_list)
            if station_count != len(railroad_info["lines"][line_id]["stations"]):
                mes("時刻表の駅数が路線情報と整合しません: " + line_id + " - " + direction, True)
                mes("エラー発生のため処理が中断されました")
                
                return
            
            if len(departure_time_mapping) == station_count:
                output_arrival_times = False
            else:
                output_arrival_times = True
            
            direction_data = {}
            previous_train_number = ""
            for train in trains:
                if train[0] == "":
                    continue
                
                if train[0].startswith("◆"):
                    train[0] = train[0][1:]
                    is_temporary_train = True
                else:
                    is_temporary_train = False
                
                if train[0] != previous_train_number:
                    if train[0] in direction_data:
                        mes("《注意》直通情報のない同一名の列車が検出されました: " + line_id + " - " + train[0])
                    
                    direction_data[train[0]] = []
                    train_cnt = 0
                else:
                    train_cnt += 1
                
                previous_train_number = train[0]
                
                direction_data[train[0]].append({})
                
                times = train[3: -6]
                
                if output_arrival_times:
                    arrival_times = []
                departure_times = []
                
                last_time_string = "00:00"
                last_stopped_station_index = 0
                for cnt in range(len(times)):
                    if times[cnt] != "":
                        if times[cnt][0] == "|":
                            time_string = times[cnt][1:].strip()
                            before_time_string = "|"
                        else:
                            time_string = times[cnt]
                            before_time_string = ""
                        
                        time_string = shape_time_string(time_string)
                        
                        if time_regexp.match(time_string) is None or time_string < last_time_string:
                            mes("《注意》異常な時刻値が検出されました: " + line_id + " - " + train[0])
                        
                        last_time_string = time_string
                        last_stopped_station_index = len(departure_times)
                        
                        time_string = before_time_string + time_string
                    else:
                        time_string = ""
                    
                    if output_arrival_times and arrival_time_mapping[cnt]:
                        arrival_times.append(time_string)
                    if departure_time_mapping[cnt]:
                        departure_times.append(time_string)
                
                if output_arrival_times:
                    for cnt in range(0, len(departure_times)):
                        if departure_times[cnt] == "" and arrival_times[cnt] != "":
                            departure_times[cnt] = arrival_times[cnt]
                        elif arrival_times[cnt] == "" and departure_times[cnt] != "":
                            arrival_times[cnt] = departure_times[cnt]
                
                if direction == "inbound":
                    last_stopped_station_index = len(railroad_info["lines"][line_id]["stations"]) - last_stopped_station_index - 1
                
                if "station_initial" not in railroad_info["lines"][line_id]["stations"][last_stopped_station_index]:
                    mes("《注意》終着駅に省略表記が登録されていません: " + line_id + " - " + train[0] + " " + railroad_info["lines"][line_id]["stations"][last_stopped_station_index]["station_name"])
                
                for cnt in range(len(departure_times)):
                    if departure_times[cnt] != "":
                        direction_data[train[0]][train_cnt]["starting_station"] = station_list[cnt]
                        
                        if direction == "inbound":
                            starting_station_index = station_count - cnt - 1
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
                
                if is_temporary_train:
                    direction_data[train[0]][train_cnt]["is_temporary_train"] = True
                
                if train[-6] != "":
                    line_id_and_direction = train[-6].split(".")
                    if len(line_id_and_direction) != 2 or (line_id_and_direction[1] != "inbound" and line_id_and_direction[1] != "outbound"):
                        mes("《注意》直通先路線の方面指定が不正です: " + line_id + " - " + train[0])
                        line_id_and_direction.insert(1, direction)
                    
                    direction_data[train[0]][train_cnt]["next_trains"].append({ "line_id" : line_id_and_direction[0], "direction" : line_id_and_direction[1], "train_number" : train[-5], "starting_station" : train[-4] })
                    
                    next_train_key = line_id_and_direction[0] + ":" + line_id_and_direction[1] + ":" + train[-5] + ":" + train[-4]
                    
                    if next_train_key not in previous_trains:
                        previous_trains[next_train_key] = []
                    
                    previous_trains[next_train_key].append({ "line_id" : line_id, "direction" : direction, "train_number" : train[0], "starting_station" : direction_data[train[0]][train_cnt]["starting_station"] })
                
                if train[-3] != "":
                    line_id_and_direction = train[-6].split(".")
                    if len(line_id_and_direction) != 2 or (line_id_and_direction[1] != "inbound" and line_id_and_direction[1] != "outbound"):
                        mes("《注意》直通先路線の方面指定が不正です: " + line_id + " - " + train[0])
                        line_id_and_direction.insert(1, direction)
                    
                    direction_data[train[0]][train_cnt]["next_trains"].append({ "line_id" : line_id_and_direction[0], "direction" : line_id_and_direction[1], "train_number" : train[-2], "starting_station" : train[-1] })
                    
                    next_train_key = line_id_and_direction[0] + ":" + line_id_and_direction[1] + ":" + train[-2] + ":" + train[-1]
                    
                    if next_train_key not in previous_trains:
                        previous_trains[next_train_key] = []
                    
                    previous_trains[next_train_key].append({ "line_id" : line_id, "direction" : direction, "train_number" : train[0], "starting_station" : direction_data[train[0]][train_cnt]["starting_station"] })
                
                if output_arrival_times:
                    direction_data[train[0]][train_cnt]["arrival_times"] = [None if arrival_time == "" else arrival_time for arrival_time in arrival_times]
                direction_data[train[0]][train_cnt]["departure_times"] = [None if departure_time == "" else departure_time for departure_time in departure_times]
            
            line_data[direction + "_trains"] = { key : direction_data[key] for key in sorted(direction_data.keys()) }
        
        output_data[line_id] = line_data
    
    for line_id in lines:
        for direction in ["inbound", "outbound"]:
            for train_number in output_data[line_id][direction + "_trains"].keys():
                for cnt in range(len(output_data[line_id][direction + "_trains"][train_number])):
                    next_train_key = line_id + ":" + direction + ":" + train_number + ":" + output_data[line_id][direction + "_trains"][train_number][cnt]["starting_station"]
                    
                    if next_train_key in previous_trains:
                        output_data[line_id][direction + "_trains"][train_number][cnt]["previous_trains"] = previous_trains[next_train_key]
    
    json_file_name = "timetable_" + diagram_id + ".json"
    
    mes(json_file_name + " に保存しています...")
    with open(main_dir + "/" + diagram_revision + "/" + json_file_name, "w", encoding="utf-8") as json_f:
        json.dump(output_data, json_f, ensure_ascii=False, separators=(',', ':'))
    
    mes("処理が完了しました")
