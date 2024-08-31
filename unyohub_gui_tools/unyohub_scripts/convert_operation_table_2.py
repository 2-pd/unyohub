# coding: utf-8

import os
import csv
import json
import re


def get_lines_and_station(mes, railroad_info, station_initial, cnt, cnt_2):
    line_list = []
    
    for line in railroad_info["lines_order"]:
        for station in railroad_info["lines"][line]["stations"]:
            if "station_initial" in station and station["station_initial"] == station_initial:
                line_list.append(line)
                station_name = station["station_name"]
    
    if len(line_list) == 0:
        mes("「" + station_initial + "」に一致する駅がありません: " + str(cnt + 1) + "行目 " + str(cnt_2 + 1) + "列目")
    
    return line_list, station_name


def split_station_name_and_track(station_name):
    if ":" in station_name:
        station_name_and_track = station_name.split(":")
        station_name = station_name_and_track[0]
        station_track = station_name_and_track[1]
    else:
        station_track = None
    
    return station_name, station_track


def convert_operation_table_2 (mes, main_dir, file_name):
    mes("運用表の変換(ステップ2)", True)
    
    mes("railroad_info.json を読み込んでいます...")
    with open(main_dir + "/railroad_info.json", "r", encoding="utf-8") as json_f:
        railroad_info = json.load(json_f)
    
    station_list = {}
    for line in railroad_info["lines_order"]:
        station_list[line] = []
        
        for station in railroad_info["lines"][line]["stations"]:
            station_list[line].append(station["station_name"])
    
    mes(os.path.basename(file_name) + " を読み込んでいます...")
    with open(file_name, "r", encoding="utf-8") as csv_f:
        csv_reader = csv.reader(csv_f)
        operations = [data_row for data_row in csv_reader]
    
    mes("データを変換しています...")
    
    time_regexp = re.compile("^[0-2][0-9]:[0-5][0-9]$")
    
    error_occurred = False
    
    output_data = []
    cnt = 0
    id_cnt = 1
    stopped_train_list = {}
    while cnt < len(operations):
        if operations[cnt][0].startswith("# "):
            output_data.append({"operation_group_name" : operations[cnt][0][2:].strip(), "operations": []})
            
            cnt += 1
        else:
            starting_location, starting_track = split_station_name_and_track(operations[cnt][1].strip())
            terminal_location, terminal_track = split_station_name_and_track(operations[cnt][2].strip())
            
            car_count = operations[cnt + 1][0]
            
            if "(" in car_count:
                bracket_pos = car_count.find("(")
                hyphen_pos = car_count.rfind("-")
                
                min_car_count = int(car_count[bracket_pos + 1:hyphen_pos])
                max_car_count = int(car_count[hyphen_pos + 1:-1])
                
                car_count = int(car_count[0:bracket_pos])
            else:
                car_count = int(car_count)
                
                min_car_count = car_count
                max_car_count = car_count
            
            output_data[-1]["operations"].append({
                "operation_number" : operations[cnt][0].strip(),
                "trains" : [],
                "starting_location" : starting_location,
                "starting_track" : starting_track,
                "starting_time" : operations[cnt + 1][1].strip(),
                "terminal_location" : terminal_location,
                "terminal_track" : terminal_track,
                "ending_time" : operations[cnt + 1][2].strip(),
                "car_count" : car_count,
                "min_car_count" : min_car_count,
                "max_car_count" : max_car_count,
                "main_color" : operations[cnt + 2][0]
            })
            
            cnt_2 = 3
            while cnt_2 < len(operations[cnt]) and operations[cnt][cnt_2] != "":
                if operations[cnt][cnt_2][0:1] == ".":
                    train_number = operations[cnt][cnt_2] + "__" + str(id_cnt)
                    id_cnt += 1
                    
                    output_data[-1]["operations"][-1]["trains"].append({
                        "train_number" : train_number,
                        "line_id" : None,
                        "first_departure_time" : output_data[-1]["operations"][-1]["trains"][-1]["final_arrival_time"],
                        "final_arrival_time" : None,
                        "starting_station" : None,
                        "terminal_station" : None,
                        "position_forward" : None,
                        "position_rear" : None,
                        "direction" : None
                    })
                else:
                    train_number = operations[cnt][cnt_2].strip()
                    
                    if "(" in train_number:
                        bracket_pos = train_number.find("(")
                        hyphen_pos = train_number.rfind("-")
                        
                        if hyphen_pos != -1:
                            position_forward = int(train_number[bracket_pos + 1:hyphen_pos])
                            position_rear = int(train_number[hyphen_pos + 1:-1])
                        else:
                            position_forward = int(train_number[bracket_pos + 1:-1])
                            position_rear = position_forward
                        
                        train_number = train_number[0:bracket_pos]
                    else:
                        position_forward = 1
                        position_rear = car_count
                    
                    if train_number[0:1] == "?":
                        train_number = train_number[1:] + "__" + str(id_cnt)
                        id_cnt += 1
                    
                    starting_line_list, starting_station = get_lines_and_station(mes, railroad_info, operations[cnt + 1][cnt_2][0:1], cnt, cnt_2)
                    terminal_line_list, terminal_station = get_lines_and_station(mes, railroad_info, operations[cnt + 2][cnt_2][0:1], cnt, cnt_2)
                    
                    if len(output_data[-1]["operations"][-1]["trains"]) >= 1 and output_data[-1]["operations"][-1]["trains"][-1]["train_number"][0:1] != "." and output_data[-1]["operations"][-1]["trains"][-1]["terminal_station"] != starting_station:
                        mes("・始発駅が前の列車の終着駅と一致しない列車が検出されました: " + train_number)
                    
                    line_list = list(set(starting_line_list) & set(terminal_line_list))
                    
                    first_departure_time = operations[cnt + 1][cnt_2][1:].strip()
                    final_arrival_time = operations[cnt + 2][cnt_2][1:].strip()
                    
                    if time_regexp.match(first_departure_time) == None or time_regexp.match(final_arrival_time) == None:
                        mes("エラー: " + train_number + " の時刻値が異常です: " + str(cnt + 1) + "行目 " + str(cnt_2 + 1) + "列目")
                        error_occurred = True
                    
                    if first_departure_time > final_arrival_time:
                        mes("エラー: " + train_number + " の始発時刻と終着時刻が矛盾しています: " + str(cnt + 1) + "行目 " + str(cnt_2 + 1) + "列目")
                        error_occurred = True
                    
                    if len(line_list) == 0:
                        mes("エラー: " + train_number + " の走行範囲が複数の路線に跨っています: " + str(cnt + 1) + "行目 " + str(cnt_2 + 1) + "列目")
                        error_occurred = True
                        
                        line_list = starting_line_list
                        direction = "?"
                    else:
                        if (station_list[line_list[0]].index(starting_station) > station_list[line_list[0]].index(terminal_station)):
                            direction = "inbound"
                        else:
                            direction = "outbound"
                    
                    
                    if len(output_data[-1]["operations"][-1]["trains"]) >= 1 and output_data[-1]["operations"][-1]["trains"][-1]["final_arrival_time"] == None:
                        if output_data[-1]["operations"][-1]["trains"][-1]["first_departure_time"] > first_departure_time:
                            mes("エラー: " + train_number + " の始発時刻が前の列車の終着時刻と矛盾しています: " + str(cnt + 1) + "行目 " + str(cnt_2 + 1) + "列目")
                            error_occurred = True
                        
                        if cnt_2 >= 2:
                            output_data[-1]["operations"][-1]["trains"][-1]["final_arrival_time"] = first_departure_time
                    else:
                        if len(output_data[-1]["operations"][-1]["trains"]) == 0:
                            previous_train_final_arrival_time = output_data[-1]["operations"][-1]["starting_time"]
                        else:
                            previous_train_final_arrival_time = output_data[-1]["operations"][-1]["trains"][-1]["final_arrival_time"]
                        
                        if previous_train_final_arrival_time != first_departure_time:
                            if previous_train_final_arrival_time > first_departure_time:
                                mes("エラー: " + train_number + " の始発時刻が前の列車の終着時刻と矛盾しています: " + str(cnt + 1) + "行目 " + str(cnt_2 + 1) + "列目")
                                error_occurred = True
                            
                            if len(output_data[-1]["operations"][-1]["trains"]) >= 1 and output_data[-1]["operations"][-1]["trains"][-1]["train_number"] == train_number:
                                stopped_train_number = train_number
                            else:
                                stopped_train_number = "_" + train_number
                                time_id = previous_train_final_arrival_time + "-" + first_departure_time
                                
                                if stopped_train_number in stopped_train_list:
                                    if time_id in stopped_train_list[stopped_train_number]:
                                        stopped_train_index = stopped_train_list[stopped_train_number].index(time_id) + 1
                                    else:
                                        stopped_train_list[stopped_train_number].append(time_id)
                                        stopped_train_index = len(stopped_train_list[stopped_train_number])
                                else:
                                    stopped_train_list[stopped_train_number] = [time_id]
                                    stopped_train_index = 1
                                
                                stopped_train_number = stopped_train_number + "__" + str(stopped_train_index)
                            
                            output_data[-1]["operations"][-1]["trains"].append({
                                "train_number" : stopped_train_number,
                                "line_id" : line_list[0],
                                "first_departure_time" : previous_train_final_arrival_time,
                                "final_arrival_time" : first_departure_time,
                                "starting_station" : starting_station,
                                "terminal_station" : starting_station,
                                "position_forward" : position_forward,
                                "position_rear" : position_rear,
                                "direction" : direction
                            })
                    
                    
                    output_data[-1]["operations"][-1]["trains"].append({
                        "train_number" : train_number,
                        "line_id" : line_list[0],
                        "first_departure_time" : first_departure_time,
                        "final_arrival_time" : final_arrival_time,
                        "starting_station" : starting_station,
                        "terminal_station" : terminal_station,
                        "position_forward" : position_forward,
                        "position_rear" : position_rear,
                        "direction" : direction
                    })
                
                cnt_2 += 1
            
            cnt += 4
    
    if error_occurred:
        mes("エラー発生のため処理が中断されました")
    else:
        if file_name[-19:] == "_unyohub-format.csv":
            json_file_name = file_name[0:-19] + ".json"
        else:
            json_file_name = file_name[0:-4] + ".json"
        
        mes(os.path.basename(json_file_name) + " に保存しています...")
        with open(json_file_name, "w", encoding="utf-8") as json_f:
            json.dump(output_data, json_f, ensure_ascii=False, separators=(',', ':'))
        
        mes("処理が完了しました")
