# coding: utf-8

import os
import csv
from operator import itemgetter


def convert_timetable_1 (mes, file_name, digits_count):
    mes("時刻表の変換(ステップ1)", is_heading=True)
    
    file_base_name = os.path.basename(file_name)
    dir_path = os.path.dirname(file_name) + "/"
    
    mes(file_base_name + " を読み込んでいます...")
    with open(file_name, "r", encoding="utf-8") as csv_f:
        csv_reader = csv.reader(csv_f)
        timetable_data = [data_row for data_row in csv_reader]
    
    mes("データを変換しています...")
    
    timetable_data_t = [list(x) for x in zip(*timetable_data)]
    
    new_timetable_t = {}
    
    line_list = timetable_data_t[1][0].split()
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
        
        for cnt_2 in range(2, len(timetable_data_t[1])):
            if line_list[cnt] in timetable_data_t[1][cnt_2]:
                station_list[line_list[cnt]].append(timetable_data_t[0][cnt_2].strip())
                line_stations[line_list[cnt]].append(cnt_2)
        
        new_timetable_t[line_list[cnt]] = [["", "", "", "", "", "", "", ""] + station_list[line_list[cnt]] + ["", "", "", "", "", ""]]
    
    for cnt in range(2, len(timetable_data_t)):
        if timetable_data_t[cnt][0] == "":
            continue
        
        for line_id in line_list:
            train = list(itemgetter(*line_stations[line_id])(timetable_data_t[cnt]))
            
            if sum([i != "" and i != "||" for i in train]) > 1:
                train = [timetable_data_t[cnt][0].strip().zfill(digits_count), timetable_data_t[cnt][1], "", "", "", "", "", ""] + train + ["", "", "", "", "", ""]
                
                for cnt_2 in range(8, len(train) - 6):
                    train[cnt_2] = train[cnt_2].strip()
                    
                    if train[cnt_2] == "||" or train[cnt_2] == "ﾚ":
                        train[cnt_2] = ""
                    
                    if train[cnt_2] != "":
                        if train[cnt_2][0] == "|":
                            departure_time = train[cnt_2][1:].strip()
                            before_departure_time = "|"
                        else:
                            departure_time = train[cnt_2]
                            before_departure_time = ""
                        
                        if ":" not in departure_time:
                            if int(departure_time) >= 300:
                                departure_time = departure_time[:-2] + ":" + departure_time[-2:]
                            elif len(departure_time) >= 3:
                                departure_time = str(int(departure_time[:-2]) + 24) + ":" + departure_time[-2:]
                            else:
                                departure_time = "24:" + departure_time.zfill(2)
                        else:
                            departure_time_split = departure_time.split(":")
                            
                            if int(departure_time_split[0]) <= 2:
                                departure_time_split[0] = str(int(departure_time_split[0]) + 24)
                            
                            departure_time = departure_time_split[0] + ":" + departure_time_split[1].zfill(2)
                        
                        train[cnt_2] = before_departure_time + departure_time.zfill(5)
                
                for line_id_2 in line_list:
                    if new_timetable_t[line_id_2][-1][0] == train[0]:
                        train[2] = line_id_2
                        train[3] = train[0]
                        for cnt_2 in range(8, len(new_timetable_t[line_id_2][-1]) - 6):
                            if new_timetable_t[line_id_2][-1][cnt_2] != "":
                                train[4] = station_list[line_id_2][cnt_2 - 8]
                                break
                        
                        new_timetable_t[line_id_2][-1][-6] = line_id
                        new_timetable_t[line_id_2][-1][-5] = train[0]
                        for cnt_2 in range(8, len(train) - 6):
                            if train[cnt_2] != "":
                                new_timetable_t[line_id_2][-1][-4] = station_list[line_id][cnt_2 - 8]
                                break
                
                new_timetable_t[line_id].append(train)
    
    
    mes("データを新しいCSVファイルに書き込んでいます...")
    
    if file_base_name[0:10] == "timetable_":
        file_base_name = file_base_name[10:]
    
    for line_id in line_list:
        new_file_name = "timetable_" + line_id + "." + file_base_name[:-4]
        
        if line_id in rename_list:
            new_file_name = new_file_name[:new_file_name.rfind(".") + 1] + rename_list[line_id]
        
        with open(dir_path + new_file_name + ".csv", "w", encoding="utf-8") as csv_f:
            csv_writer = csv.writer(csv_f)
            csv_writer.writerows([list(x) for x in zip(*new_timetable_t[line_id])])
    
    mes("処理が完了しました")
