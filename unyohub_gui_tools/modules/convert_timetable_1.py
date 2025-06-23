# coding: utf-8

import os
import csv
from operator import itemgetter


def convert_timetable_1 (mes, file_name, digits_count):
    mes("時刻表の変換(ステップ1)", is_heading=True)
    
    file_base_name = os.path.basename(file_name)
    dir_path = os.path.dirname(file_name) + "/"
    
    mes(file_base_name + " を読み込んでいます...")
    with open(file_name, "r", encoding="utf-8-sig") as csv_f:
        csv_reader = csv.reader(csv_f)
        timetable_data = [data_row for data_row in csv_reader]
    
    mes("データを変換しています...")
    
    if timetable_data[2][1].strip() != "":
        timetable_data.insert(2, [""] * len(timetable_data[0]))
    
    if timetable_data[-1][1].strip() != "":
        timetable_data.append([""] * len(timetable_data[0]))
    
    timetable_data_t = [list(x) for x in zip(*timetable_data)]
    
    new_timetable_t = {}
    
    line_list_str = timetable_data_t[1][0].strip()
    if len(line_list_str) == 0:
        mes("路線識別名列挙欄が未入力です", True)
        mes("エラー発生のため処理が中断されました")
        
        return
    
    line_list = line_list_str.split()
    station_list = {}
    line_stations = {}
    rename_list = {}
    
    for cnt in range(len(line_list)):
        period_pos = line_list[cnt].rfind(".")
        
        if period_pos != -1:
            rename_list[line_list[cnt][:period_pos]] = line_list[cnt][period_pos + 1:]
            line_list[cnt] = line_list[cnt][:period_pos]
        
        station_list[line_list[cnt]] = []
        line_stations[line_list[cnt]] = []
        
        for cnt_2 in range(3, len(timetable_data_t[1])):
            if line_list[cnt] in timetable_data_t[1][cnt_2]:
                station_list[line_list[cnt]].append(timetable_data_t[0][cnt_2].strip())
                line_stations[line_list[cnt]].append(cnt_2)
        
        new_timetable_t[line_list[cnt]] = [["", "", "", "", "", "", "", "", ""] + station_list[line_list[cnt]] + ["", "", "", "", "", ""]]
    
    previous_trains = {}
    
    for timetable_column in timetable_data_t[2:]:
        if timetable_column[0] == "":
            continue
        
        previous_line_id = None
        
        for line_id in line_list:
            train = list(itemgetter(*line_stations[line_id])(timetable_column))
            
            if sum([i != "" and i != "||" for i in train]) > 1:
                train = [timetable_column[0].strip().zfill(digits_count), timetable_column[1].strip(), timetable_column[2].strip(), "", "", "", "", "", ""] + train + ["", "", "", "", "", ""]
                starting_station = None
                
                for cnt in range(9, len(train) - 6):
                    train[cnt] = train[cnt].strip()
                    
                    if train[cnt] == "||" or train[cnt] == "ﾚ":
                        train[cnt] = ""
                    
                    if train[cnt] != "":
                        if starting_station is None:
                            starting_station = station_list[line_id][cnt - 9]
                        
                        if train[cnt][0] == "|":
                            departure_time = train[cnt][1:].strip()
                            before_departure_time = "|"
                        else:
                            departure_time = train[cnt]
                            before_departure_time = ""
                        
                        if departure_time[-1] == "?":
                            departure_time = departure_time[:-1]
                            before_departure_time = "|"
                        
                        if ":" not in departure_time:
                            if departure_time.isdecimal() and len(departure_time) <= 4:
                                if int(departure_time) >= 300:
                                    departure_time = departure_time[:-2] + ":" + departure_time[-2:]
                                elif len(departure_time) >= 3:
                                    departure_time = str(int(departure_time[:-2]) + 24) + ":" + departure_time[-2:]
                                else:
                                    departure_time = "24:" + departure_time.zfill(2)
                            else:
                                mes("時刻として認識できない値が含まれています: " + train[0], True)
                                
                                departure_time = "00:00"
                        else:
                            departure_time_split = departure_time.split(":")
                            
                            if departure_time_split[0].isdecimal() and departure_time_split[1].isdecimal():
                                if int(departure_time_split[0]) <= 2:
                                    departure_time_split[0] = str(int(departure_time_split[0]) + 24)
                                
                                departure_time = departure_time_split[0] + ":" + departure_time_split[1].zfill(2)
                            else:
                                mes("時刻として認識できない値が含まれています: " + train[0], True)
                                
                                departure_time = "00:00"
                        
                        train[cnt] = before_departure_time + departure_time.zfill(5)
                
                if previous_line_id is not None:
                    train[3] = previous_line_id
                    train[4] = train[0]
                    for cnt in range(9, len(new_timetable_t[previous_line_id][-1]) - 6):
                        if new_timetable_t[previous_line_id][-1][cnt] != "":
                            train[5] = station_list[previous_line_id][cnt - 9]
                            break
                    
                    new_timetable_t[previous_line_id][-1][-6] = line_id
                    new_timetable_t[previous_line_id][-1][-5] = train[0]
                    for cnt in range(9, len(train) - 6):
                        if train[cnt] != "":
                            new_timetable_t[previous_line_id][-1][-4] = station_list[line_id][cnt - 9]
                            break
                elif train[0] + "@" + starting_station in previous_trains:
                    previous_train_data = previous_trains.pop(train[0] + "@" + starting_station)
                    
                    for cnt in range(len(previous_train_data)):
                        previous_line_id = previous_train_data[cnt]["line_id"]
                        previous_train_number = previous_train_data[cnt]["train_number"]
                        
                        train[cnt * 3 + 3] = previous_line_id
                        train[cnt * 3 + 4] = previous_train_number
                        train[cnt * 3 + 5] = previous_train_data[cnt]["starting_station"]
                        
                        for cnt_2 in range(1, len(new_timetable_t[previous_line_id])):
                            if new_timetable_t[previous_line_id][cnt_2][0] == previous_train_number:
                                for cnt_3 in range(9, len(new_timetable_t[previous_line_id][cnt_2]) - 6):
                                    if new_timetable_t[previous_line_id][cnt_2][cnt_3] != "":
                                        starting_station = station_list[previous_line_id][cnt_3 - 9]
                                        break
                                
                                if starting_station == previous_train_data[cnt]["starting_station"]:
                                    previous_train_index = cnt_2
                                    break
                        
                        if new_timetable_t[previous_line_id][previous_train_index][-6] == "":
                            next_train_row = -6
                        else:
                            next_train_row = -3
                        
                        new_timetable_t[previous_line_id][previous_train_index][next_train_row] = line_id
                        new_timetable_t[previous_line_id][previous_train_index][next_train_row + 1] = train[0]
                        for cnt_2 in range(9, len(train) - 6):
                            if train[cnt_2] != "":
                                new_timetable_t[previous_line_id][previous_train_index][next_train_row + 2] = station_list[line_id][cnt_2 - 9]
                                break
                
                new_timetable_t[line_id].append(train)
                
                previous_line_id = line_id
        
        if previous_line_id is not None and timetable_column[-1].strip() != "":
            for cnt in reversed(range(9, len(new_timetable_t[previous_line_id][-1]) - 6)):
                if new_timetable_t[previous_line_id][-1][cnt] != "":
                    terminal_station = station_list[previous_line_id][cnt - 9]
                    break
            
            for train_number in timetable_column[-1].strip().split():
                if train_number + "@" + terminal_station not in previous_trains:
                    previous_trains[train_number + "@" + terminal_station] = []
                
                previous_trains[train_number + "@" + terminal_station].append({"line_id" : previous_line_id, "train_number" : new_timetable_t[previous_line_id][-1][0], "starting_station" : starting_station})
    
    
    mes("データを新しいCSVファイルに書き込んでいます...")
    
    if file_base_name[0:10] == "timetable_":
        file_base_name = file_base_name[10:]
    
    for line_id in line_list:
        new_file_name = "timetable_" + line_id + "." + file_base_name[:-4]
        
        if line_id in rename_list:
            new_file_name = new_file_name[:new_file_name.rfind(".") + 1] + rename_list[line_id]
        
        with open(dir_path + new_file_name + ".csv", "w", encoding="utf-8-sig") as csv_f:
            csv_writer = csv.writer(csv_f, lineterminator="\n")
            csv_writer.writerows([list(x) for x in zip(*new_timetable_t[line_id])])
    
    mes("処理が完了しました")
