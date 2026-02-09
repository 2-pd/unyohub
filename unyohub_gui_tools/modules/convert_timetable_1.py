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
    
    if file_base_name[0:10] == "timetable_":
        file_base_name = file_base_name[10:]
    
    file_base_name_period_pos = file_base_name.find(".")
    diagram_id = file_base_name[:file_base_name_period_pos]
    default_direction = file_base_name[file_base_name_period_pos + 1:-4]
    
    
    mes("路線情報を処理しています...")
    
    if timetable_data[2][1].strip() != "":
        timetable_data.insert(2, [""] * len(timetable_data[0]))
    
    if timetable_data[-1][1].strip() != "":
        timetable_data.append([""] * len(timetable_data[0]))
    
    timetable_data_t = [list(x) for x in zip(*timetable_data)]
    
    direction_list = {}
    
    line_list_str = timetable_data_t[1][0].strip()
    for line_str in line_list_str.split():
        period_pos = line_str.rfind(".")
        
        if period_pos != -1:
            direction_list[line_str[:period_pos]] = line_str[period_pos + 1:]
    
    line_set = set()
    station_list = {}
    station_name_list = {}
    line_stations = {}
    
    for cnt in range(3, len(timetable_data_t[1])):
        timetable_data_t[0][cnt] = timetable_data_t[0][cnt].strip()
        station_name = timetable_data_t[0][cnt]
        
        if station_name.endswith("]"):
            station_name = station_name[:-3].strip()
        
        for line_str in timetable_data_t[1][cnt].split():
            if len(line_str) == 0:
                continue
            
            if "." not in line_str:
                if line_str in direction_list:
                    line_str += "." + direction_list[line_str]
                else:
                    line_str += "." + default_direction
            
            if line_str not in line_set:
                line_set.add(line_str)
                station_list[line_str] = []
                station_name_list[line_str] = []
                line_stations[line_str] = []
            
            station_list[line_str].append(timetable_data_t[0][cnt])
            station_name_list[line_str].append(station_name)
            line_stations[line_str].append(cnt)
    
    new_timetable_t = {}
    
    for line_str in line_set:
        if station_list[line_str][0].endswith("[発]"):
            station_list[line_str][0] = station_name_list[line_str][0]
        
        if station_list[line_str][-1].endswith("[着]"):
            station_list[line_str][-1] = station_name_list[line_str][-1]
        
        new_timetable_t[line_str] = [["", "", ""] + station_list[line_str] + ["", "", "", "", "", ""]]
    
    
    mes("各列車時刻データを変換しています...")
    
    previous_trains = {}
    
    for timetable_column in timetable_data_t[2:]:
        if timetable_column[0] == "":
            continue
        
        train_number = timetable_column[0].strip()
        
        from_previous_day = False
        run_through_next_day = False
        
        if train_number.startswith("~"):
            train_number = train_number[1:].strip()
            from_previous_day = True
        elif train_number.endswith("~"):
            train_number = train_number[:-1].strip()
            run_through_next_day = True
        
        if train_number.startswith("◆"):
            train_number = train_number[1:].strip()
            temporary_train_symbol = "◆"
        else:
            temporary_train_symbol = ""
        
        train_number = train_number.zfill(digits_count)
        
        if from_previous_day:
            decorated_train_number = temporary_train_symbol + "~" + train_number
        elif run_through_next_day:
            decorated_train_number = temporary_train_symbol + train_number + "~"
        else:
            decorated_train_number = temporary_train_symbol + train_number
        
        using_lines = {}
        line_starting_stations = {}
        
        for line_str in line_set:
            train = list(itemgetter(*line_stations[line_str])(timetable_column))
            
            starting_station = None
            last_stopped_station_index = None
            for cnt in range(len(train)):
                train[cnt] = train[cnt].strip()
                
                if train[cnt] == "||" or train[cnt] == "ﾚ":
                    train[cnt] = ""
                
                if train[cnt] == "":
                    continue
                
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
                        if int(departure_time) >= 400:
                            departure_time = departure_time[:-2] + ":" + departure_time[-2:]
                        elif len(departure_time) >= 3:
                            departure_time = str(int(departure_time[:-2]) + 24) + ":" + departure_time[-2:]
                        else:
                            departure_time = "24:" + departure_time.zfill(2)
                    else:
                        mes("時刻として認識できない値が含まれています: " + train_number, True)
                        
                        departure_time = "00:00"
                else:
                    departure_time_split = departure_time.split(":")
                    
                    if departure_time_split[0].isdecimal() and departure_time_split[1].isdecimal():
                        if int(departure_time_split[0]) <= 3:
                            departure_time_split[0] = str(int(departure_time_split[0]) + 24)
                        
                        departure_time = departure_time_split[0] + ":" + departure_time_split[1].zfill(2)
                    else:
                        mes("時刻として認識できない値が含まれています: " + train_number, True)
                        
                        departure_time = "00:00"
                
                if from_previous_day and int(departure_time[:-3]) >= 24:
                    departure_time = str(int(departure_time[:-3]) - 24) + ":" + departure_time[-2:]
                elif run_through_next_day and int(departure_time[:-3]) < 8:
                    departure_time = str(int(departure_time[:-3]) + 24) + ":" + departure_time[-2:]
                
                train[cnt] = before_departure_time + departure_time.zfill(5)
                
                last_stopped_station_index = cnt
                if starting_station is None:
                    starting_station = station_name_list[line_str][cnt]
                    
                    if station_list[line_str][cnt].endswith("[着]"):
                        train[cnt] = ""
            
            if starting_station is not None and starting_station != station_name_list[line_str][last_stopped_station_index]:
                using_lines[departure_time] = line_str
                line_starting_stations[line_str] = starting_station
                
                if station_list[line_str][last_stopped_station_index].endswith("[発]"):
                    train[last_stopped_station_index] = ""
                
                new_timetable_t[line_str].append([decorated_train_number, timetable_column[1], timetable_column[2]] + train + ["", "", "", "", "", ""])
        
        line_first_departure_times = sorted(using_lines.keys())
        
        for cnt in range(len(line_first_departure_times)):
            line_str = using_lines[line_first_departure_times[cnt]]
            
            if cnt == 0 and train_number + ":" + line_starting_stations[line_str] in previous_trains:
                previous_train_data = previous_trains.pop(train_number + ":" + line_starting_stations[line_str])
                
                for train_data in previous_train_data:
                    if new_timetable_t[train_data["line_id"]][train_data["column_index"]][-6] == "":
                        next_train_row = -6
                    else:
                        next_train_row = -3
                    
                    new_timetable_t[train_data["line_id"]][train_data["column_index"]][next_train_row] = line_str
                    new_timetable_t[train_data["line_id"]][train_data["column_index"]][next_train_row + 1] = train_number
                    new_timetable_t[train_data["line_id"]][train_data["column_index"]][next_train_row + 2] = line_starting_stations[line_str]
            
            if cnt <= len(line_first_departure_times) - 2:
                next_line_str = using_lines[line_first_departure_times[cnt + 1]]
                
                new_timetable_t[line_str][-1][-6] = next_line_str
                new_timetable_t[line_str][-1][-5] = train_number
                new_timetable_t[line_str][-1][-4] = line_starting_stations[next_line_str]
            else:
                for cnt_2 in range(len(new_timetable_t[line_str][-1]) - 7, 2, -1):
                    if new_timetable_t[line_str][-1][cnt_2] != "":
                        terminal_station = station_name_list[line_str][cnt_2 - 3]
                        break
                
                for next_train_number in timetable_column[-1].strip().split():
                    if "@" in next_train_number:
                        next_train_info = next_train_number.split("@")
                        
                        if new_timetable_t[line_str][-1][-6] == "":
                            next_train_row = -6
                        else:
                            next_train_row = -3
                        
                        new_timetable_t[line_str][-1][next_train_row] = next_train_info[1]
                        if len(next_train_info[0]) >= 1:
                            new_timetable_t[line_str][-1][next_train_row + 1] = next_train_info[0]
                        else:
                            new_timetable_t[line_str][-1][next_train_row + 1] = train_number
                        new_timetable_t[line_str][-1][next_train_row + 2] = terminal_station
                    else:
                        if next_train_number + ":" + terminal_station not in previous_trains:
                            previous_trains[next_train_number + ":" + terminal_station] = []
                        
                        previous_trains[next_train_number + ":" + terminal_station].append({"line_id" : line_str, "column_index" : len(new_timetable_t[line_str]) - 1})
    
    
    for line_str in line_set:
        period_pos = line_str.rfind(".")
        new_file_name = "timetable_" + line_str[:period_pos] + "." + diagram_id + line_str[period_pos:] + ".csv"
        
        mes(new_file_name + " を保存しています...")
        
        with open(dir_path + new_file_name, "w", encoding="utf-8-sig") as csv_f:
            csv_writer = csv.writer(csv_f, lineterminator="\n")
            csv_writer.writerows([list(x) for x in zip(*new_timetable_t[line_str])])
    
    mes("処理が完了しました")
