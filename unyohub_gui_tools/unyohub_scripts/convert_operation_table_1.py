# coding: utf-8

import os
import csv
import json
import re


def convert_time_style(time_data, with_station_initial = True):
    if with_station_initial:
        time_str = time_data[1:]
    else:
        time_str = time_data
    
    if ":" not in time_str:
        time_str = time_str[:-2] + ":" + time_str[-2:]
    
    if with_station_initial:
        return time_data[0:1] + time_str.zfill(5)
    else:
        return time_str.zfill(5)


def convert_station_name_and_track(station_name):
    if ":" in station_name:
        station_name_and_track = station_name.split(":")
        
        return station_name_and_track[0] + "(" + station_name_and_track[1] + ")"
    else:
        return station_name


def convert_operation_table_1 (mes, main_dir, file_name, json_file_name, digits_count, file_name_for_printing=None):
    if file_name_for_printing != None:
        mes("運用表を印刷用に変換", True)
        
        for_printing = True
    else:
        mes("運用表の変換(ステップ1)", True)
        
        for_printing = False
    
    error_occurred = False
    
    mes("railroad_info.json を読み込んでいます...")
    with open(main_dir + "/railroad_info.json", "r", encoding="utf-8") as json_f:
        railroad_info = json.load(json_f)
    
    lines = railroad_info["lines_order"]
    
    station_list = {}
    station_list_r = {}
    for line in lines:
        station_list[line] = railroad_info["lines"][line]["stations"]
        station_list_r[line] = list(reversed(station_list[line]))
    
    station_name_list = {}
    station_name_list_r = {}
    for line in lines:
        station_name_list[line] = []
        
        for station in railroad_info["lines"][line]["stations"]:
            station_name_list[line].append(station["station_name"])
        
        station_name_list_r[line] = list(reversed(station_name_list[line]))
    
    mes(os.path.basename(json_file_name) + " を読み込んでいます...")
    with open(json_file_name, "r", encoding="utf-8") as json_f:
        timetable = json.load(json_f)
    
    mes("時刻表データを整理しています...")
    
    train_number_list = {}
    for line in lines:
        for direction in ["inbound", "outbound"]:
            stations = railroad_info["lines"][line]["stations"]
            
            if direction == "inbound":
                stations = list(reversed(stations))
            
            train_numbers = timetable[line][direction + "_trains"].keys()
            
            for train_number in train_numbers:
                if train_number not in train_number_list:
                    train_number_list[train_number] = {}
                
                starting_station_index = None
                for train_data in timetable[line][direction + "_trains"][train_number]:
                    for cnt in range(len(train_data["departure_times"])):
                        if train_data["departure_times"][cnt] != None:
                            terminal_station_index = cnt
                            final_arrival_time = train_data["departure_times"][cnt]
                            
                            if starting_station_index == None:
                                starting_station_index = cnt
                                first_departure_time = train_data["departure_times"][cnt]
                
                if "station_initial" not in stations[starting_station_index]:
                    mes("省略表記の登録されていない始発駅が時刻表で検出されました: " + train_number)
                    error_occurred = True
                    continue
                
                if "station_initial" not in stations[terminal_station_index]:
                    mes("省略表記の登録されていない終着駅が時刻表で検出されました: " + train_number)
                    error_occurred = True
                    continue
                
                train_number_list[train_number][first_departure_time] = [
                        stations[starting_station_index]["station_initial"] + first_departure_time[-5:],
                        stations[terminal_station_index]["station_initial"] + final_arrival_time[-5:]
                    ]
    
    if error_occurred:
        mes("エラー発生のため処理が中断されました")
        return
    
    mes(os.path.basename(file_name) + " を読み込んでいます...")
    with open(file_name, "r", encoding="utf-8") as csv_f:
        csv_reader = csv.reader(csv_f)
        operations = [data_row for data_row in csv_reader]
    
    mes("データを変換しています...")
    
    output_data = []
    train_list = []
    for operation in operations:
        if operation[0].startswith("# ") or operation[0].startswith("◆"):
            if for_printing:
                output_data.append(["◆" + operation[0][1:].strip()])
                output_data.append(["運用番号", "出庫", "入庫", "", "列車"])
            else:
                output_data.append(["# " + operation[0][1:].strip()])
            
            if re.match("^#[0-9A-Fa-f]{6}$", operation[1]) != None:
                color = operation[1]
            else:
                color = "#ffffff"
        else:
            if len(operation[0].strip()) == 0:
                mes("運用番号のない運用が見つかりました")
                error_occurred = True
            
            if for_printing:
                output_row_1 = [operation[0], convert_station_name_and_track(operation[2]), convert_station_name_and_track(operation[4]), ""]
                output_row_2 = ["所定" + operation[1].split("(")[0] + "両", operation[3].strip(), operation[5].strip(), ""]
                output_row_3 = ["", "", "", ""]
            else:
                output_row_1 = [operation[0], operation[2], operation[4]]
                output_row_2 = [operation[1], operation[3].strip(), operation[5].strip()]
                output_row_3 = [color, "", ""]
            
            for train_cell in operation[6:]:
                train_cell = train_cell.strip()
                
                if train_cell[0:1] == ".":
                    output_row_1.append(train_cell)
                    output_row_2.append("")
                    output_row_3.append("")
                elif train_cell != "" and train_cell != "○" and train_cell != "△":
                    train_time = train_cell.split("[")
                    
                    train_name_car_count = train_time[0].split("(")
                    if train_name_car_count[0][0:1] != "?":
                        train_name = train_name_car_count[0].zfill(digits_count)
                    else:
                        train_name = train_name_car_count[0]
                    
                    if len(train_name_car_count) == 2:
                        car_count = "(" + train_name_car_count[1]
                    else:
                        car_count = ""
                    
                    if len(train_time) == 2:
                        if "-" not in train_time[1]:
                            mes("時刻の指定が異常です: " + train_name)
                            error_occurred = True
                            continue
                        
                        train_rows = train_time[1].split("-")
                        
                        train_rows[1] = train_rows[1][:-1]
                        
                        output_row_1.append(train_name + car_count)
                        output_row_2.append(convert_time_style(train_rows[0]))
                        output_row_3.append(convert_time_style(train_rows[1]))
                    else:
                        if train_name not in train_number_list:
                            mes("列車番号が時刻表にありません: " + train_name)
                            error_occurred = True
                            continue
                        
                        first_departure_times = list(train_number_list[train_name].keys())
                        first_departure_times.sort()
                        
                        if not for_printing:
                            for first_departure_time in first_departure_times:
                                output_row_1.append(train_name + car_count)
                                output_row_2.append(train_number_list[train_name][first_departure_time][0])
                                output_row_3.append(train_number_list[train_name][first_departure_time][1])
                        else:
                            output_row_1.append(train_name + car_count)
                            output_row_2.append(train_number_list[train_name][first_departure_times[0]][0])
                            output_row_3.append(train_number_list[train_name][first_departure_times[-1]][1])
                        
                        if train_name + car_count in train_list:
                            mes("同一列車の同一組成位置が複数の運用に割り当てられています: " + train_name + car_count)
                            error_occurred = True
                        else:
                            train_list.append(train_name + car_count)
            
            if len(output_row_2[1]) == 0:
                if for_printing:
                    output_row_2[1] = output_row_2[4][1:]
                else:
                    output_row_2[1] = output_row_2[3][1:]
            else:
                output_row_2[1] = convert_time_style(output_row_2[1], False)
            
            if len(output_row_2[2]) == 0:
                output_row_2[2] = output_row_3[-1][1:]
            else:
                output_row_2[2] = convert_time_style(output_row_2[2], False)
            
            output_data.append(output_row_1)
            output_data.append(output_row_2)
            output_data.append(output_row_3)
            output_data.append([])
    
    if error_occurred:
        mes("エラー発生のため処理が中断されました")
        return
    
    if for_printing:
        new_file_name = file_name_for_printing
    else:
        new_file_name = file_name[:-4] + "_unyohub-format.csv"
    
    mes("データを " + os.path.basename(new_file_name) + " に書き込んでいます...")
    
    with open(new_file_name, "w", encoding="utf-8") as csv_f:
        csv_writer = csv.writer(csv_f)
        csv_writer.writerows(output_data)
    
    mes("処理が完了しました")