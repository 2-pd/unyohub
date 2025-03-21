# coding: utf-8

import os
import csv
import hashlib
import base64


def shape_time_string (time_string):
    if ":" not in time_string:
        if int(time_string) >= 300:
            time_string = time_string[:-2] + ":" + time_string[-2:]
        elif len(time_string) >= 3:
            time_string = str(int(time_string[:-2]) + 24) + ":" + time_string[-2:]
        else:
            time_string = "24:" + time_string.zfill(2)
    
    return time_string.zfill(5)


def get_hashed_id (id_str) :
    return base64.b32encode(hashlib.md5(id_str.encode()).digest()).decode()[:4]


def generate_operation_table (mes, main_dir, diagram_revision, diagram_id, generate_train_number = False):
    mes("運用情報付き時刻表から運用表と変換用時刻表を生成", is_heading=True)
    
    
    inbound_file_base_name = diagram_id + ".inbound.csv"
    file_path = main_dir + "/" + diagram_revision + "/" + inbound_file_base_name
    
    
    mes(inbound_file_base_name + " を読み込んでいます...")
    
    if not os.path.isfile(file_path):
        mes("ファイル " + file_path + " が見つかりません", True)
        return False
    
    with open(file_path, "r", encoding="utf-8") as csv_f:
        csv_reader = csv.reader(csv_f)
        inbound_timetable = [data_row for data_row in csv_reader]
    
    outbound_file_base_name = diagram_id + ".outbound.csv"
    file_path = main_dir + "/" + diagram_revision + "/" + outbound_file_base_name
    
    mes(outbound_file_base_name + " を読み込んでいます...")
    
    if not os.path.isfile(file_path):
        mes("ファイル " + file_path + " が見つかりません", True)
        return False
    
    with open(file_path, "r", encoding="utf-8") as csv_f:
        csv_reader = csv.reader(csv_f)
        outbound_timetable = [data_row for data_row in csv_reader]
    
    
    mes("着時刻行を発時刻行に統合しています...")
    
    arrival_time_row = []
    
    detected_station_indexes = {inbound_timetable[3][0].strip() + "__" + inbound_timetable[3][1].strip() : 3}
    for cnt in range(4, len(inbound_timetable)):
        station_and_line = inbound_timetable[cnt][0].strip() + "__" + inbound_timetable[cnt][1].strip()
        
        if station_and_line in detected_station_indexes:
            arrival_time_row.append(detected_station_indexes[station_and_line])
            
            for cnt_2 in range(2, len(inbound_timetable[cnt])):
                time_string = inbound_timetable[cnt][cnt_2].strip()
                
                if time_string == "" or time_string == "||" or time_string == "ﾚ":
                    inbound_timetable[cnt][cnt_2] = inbound_timetable[detected_station_indexes[station_and_line]][cnt_2]
        
        detected_station_indexes[station_and_line] = cnt
    
    for cnt in reversed(arrival_time_row):
        inbound_timetable.pop(cnt)
    
    arrival_time_row = []
    
    detected_station_indexes = {outbound_timetable[3][0].strip() + "__" + inbound_timetable[3][1].strip() : 3}
    for cnt in range(4, len(outbound_timetable)):
        station_and_line = outbound_timetable[cnt][0].strip() + "__" + outbound_timetable[cnt][1].strip()
        
        if station_and_line in detected_station_indexes:
            arrival_time_row.append(detected_station_indexes[station_and_line])
            
            for cnt_2 in range(2, len(outbound_timetable[cnt])):
                time_string = outbound_timetable[cnt][cnt_2].strip()
                
                if time_string == "" or time_string == "||" or time_string == "ﾚ":
                    outbound_timetable[cnt][cnt_2] = outbound_timetable[detected_station_indexes[station_and_line]][cnt_2]
        
        detected_station_indexes[station_and_line] = cnt
    
    for cnt in reversed(arrival_time_row):
        outbound_timetable.pop(cnt)
    
    
    inbound_timetable_t = [list(x) for x in zip(*inbound_timetable)]
    outbound_timetable_t = [list(x) for x in zip(*outbound_timetable)]
    
    
    if generate_train_number:
        mes("仮列車番号の区別基準となる停車駅を検出しています...")
        
        symbols_inbound = []
        symbols_outbound = []
        
        for cnt in range(3, len(inbound_timetable_t[1])):
            if "[" in inbound_timetable_t[1][cnt]:
                symbol_start = inbound_timetable_t[1][cnt].find("[") + 1
                symbol_end = inbound_timetable_t[1][cnt].find("]")
                
                symbols_inbound.append({"station" : cnt, "symbol" : inbound_timetable_t[1][cnt][symbol_start:symbol_end]})
                inbound_timetable_t[1][cnt] = inbound_timetable_t[1][cnt][0:symbol_start - 1] + inbound_timetable_t[1][cnt][symbol_end + 1:]
        
        for cnt in range(3, len(outbound_timetable_t[1])):
            if "[" in outbound_timetable_t[1][cnt]:
                symbol_start = outbound_timetable_t[1][cnt].find("[") + 1
                symbol_end = outbound_timetable_t[1][cnt].find("]")
                
                symbols_outbound.append({"station" : cnt, "symbol" : outbound_timetable_t[1][cnt][symbol_start:symbol_end]})
                outbound_timetable_t[1][cnt] = outbound_timetable_t[1][cnt][0:symbol_start - 1] + outbound_timetable_t[1][cnt][symbol_end + 1:]
    
    
    mes("列車情報を抽出しています...")
    
    operation_data = {}
    operation_number_hashes = {}
    
    train_cnt = 2
    for cnt in range(2, len(inbound_timetable_t)):
        operation_number = inbound_timetable_t[cnt][1].strip()
        
        if operation_number == "":
            continue
        
        if operation_number not in operation_data:
            operation_data[operation_number] = {}
        
        if generate_train_number:
            inbound_timetable_t[cnt][0] = operation_number + "__" + str(train_cnt)
            
            symbol_added = False
            for symbol_data in symbols_inbound:
                if len(inbound_timetable_t[cnt][symbol_data["station"]]) >= 1 and inbound_timetable_t[cnt][symbol_data["station"]][0] != "|":
                    if not symbol_added:
                        symbol_added = True
                        
                        inbound_timetable_t[cnt][0] += "__"
                    
                    inbound_timetable_t[cnt][0] += symbol_data["symbol"]
        elif inbound_timetable_t[cnt][0][0] == "?":
            if operation_number not in operation_number_hashes:
                operation_number_hashes[operation_number] = get_hashed_id(operation_number)
            
            inbound_timetable_t[cnt][0] = inbound_timetable_t[cnt][0][1:] + "__" + operation_number_hashes[operation_number] + "__" + str(train_cnt)
        
        operation_data[operation_number][shape_time_string(next((item for item in inbound_timetable_t[cnt][2:] if item.isdecimal()), "99:99"))] = inbound_timetable_t[cnt][0]
        
        train_cnt += 2
    
    train_cnt = 1
    for cnt in range(2, len(outbound_timetable_t)):
        operation_number = outbound_timetable_t[cnt][1].strip()
        
        if operation_number == "":
            continue
        
        if operation_number not in operation_data:
            operation_data[operation_number] = {}
        
        if generate_train_number:
            outbound_timetable_t[cnt][0] = operation_number + "__" + str(train_cnt)
            
            symbol_added = False
            for symbol_data in symbols_outbound:
                if len(outbound_timetable_t[cnt][symbol_data["station"]]) >= 1 and outbound_timetable_t[cnt][symbol_data["station"]][0] != "|":
                    if not symbol_added:
                        symbol_added = True
                        
                        outbound_timetable_t[cnt][0] += "__"
                    
                    outbound_timetable_t[cnt][0] += symbol_data["symbol"]
        elif outbound_timetable_t[cnt][0][0] == "?":
            if operation_number not in operation_number_hashes:
                operation_number_hashes[operation_number] = get_hashed_id(operation_number)
            
            outbound_timetable_t[cnt][0] = outbound_timetable_t[cnt][0][1:] + "__" + operation_number_hashes[operation_number] + "__" + str(train_cnt)
        
        operation_data[operation_number][shape_time_string(next((item for item in outbound_timetable_t[cnt][2:] if item.isdecimal()), "99:99"))] = outbound_timetable_t[cnt][0]
        
        train_cnt += 2
    
    
    mes("運用表を生成しています...")
    
    operation_table = [["# 全ての運用"]]
    
    for operation_number in sorted(operation_data.keys()):
        operation = [operation_number, "", "", "", "", ""]
        
        for time_key in sorted(operation_data[operation_number].keys()):
            operation.append(operation_data[operation_number][time_key])
        
        operation_table.append(operation)
    
    
    mes("データを整理しています...")
    
    inbound_timetable = [list(x) for x in zip(*inbound_timetable_t)]
    outbound_timetable = [list(x) for x in zip(*outbound_timetable_t)]
    
    inbound_timetable.pop(1)
    outbound_timetable.pop(1)
    
    
    if generate_train_number:
        inbound_train_numbers = {}
        outbound_train_numbers = {}
        
        for cnt in range(1, len(operation_table)):
            train_cnt = 0
            last_train_number_is_even = True
            
            for cnt_2 in range(6, len(operation_table[cnt])):
                tmp_number_split = operation_table[cnt][cnt_2].split("__")
                tmp_number = int(tmp_number_split[1])
                
                if tmp_number % 2 == 0:
                    if last_train_number_is_even:
                        train_cnt += 2
                    else:
                        train_cnt += 1
                    
                    train_number = operation_table[cnt][0] + "-" + str(train_cnt)
                    
                    if len(tmp_number_split) == 3:
                        train_number += tmp_number_split[2]
                    
                    inbound_train_numbers[operation_table[cnt][cnt_2]] = train_number
                    operation_table[cnt][cnt_2] = train_number
                    
                    last_train_number_is_even = True
                else:
                    if last_train_number_is_even:
                        train_cnt += 1
                    else:
                        train_cnt += 2
                    
                    train_number = operation_table[cnt][0] + "-" + str(train_cnt)
                    
                    if len(tmp_number_split) == 3:
                        train_number += tmp_number_split[2]
                    
                    outbound_train_numbers[operation_table[cnt][cnt_2]] = train_number
                    operation_table[cnt][cnt_2] = train_number
                    
                    last_train_number_is_even = False
        
        for cnt in range(2, len(inbound_timetable[0])):
            inbound_timetable[0][cnt] = inbound_train_numbers[inbound_timetable[0][cnt]]
        for cnt in range(2, len(outbound_timetable[0])):
            outbound_timetable[0][cnt] = outbound_train_numbers[outbound_timetable[0][cnt]]
    else:
        train_numbers = {}
        
        for cnt in range(1, len(operation_table)):
            train_cnt = 1
            
            for cnt_2 in range(6, len(operation_table[cnt])):
                if "__" in operation_table[cnt][cnt_2]:
                    tmp_number_split = operation_table[cnt][cnt_2].split("__")
                    
                    train_number = tmp_number_split[0] + "__" + tmp_number_split[1] + "-" + str(train_cnt)
                    
                    train_numbers[operation_table[cnt][cnt_2]] = train_number
                    operation_table[cnt][cnt_2] = train_number
                    
                    train_cnt += 1
        
        for cnt in range(2, len(inbound_timetable[0])):
            if inbound_timetable[0][cnt] in train_numbers:
                inbound_timetable[0][cnt] = train_numbers[inbound_timetable[0][cnt]]
        for cnt in range(2, len(outbound_timetable[0])):
            if outbound_timetable[0][cnt] in train_numbers:
                outbound_timetable[0][cnt] = train_numbers[outbound_timetable[0][cnt]]
    
    
    mes("出入庫情報をまとめています...")
    
    for cnt in range(1, len(operation_table)):
        first_train_number = operation_table[cnt][6]
        last_train_number = next((train_number for train_number in reversed(operation_table[cnt][6:]) if train_number != ""), None)
        
        if first_train_number in inbound_timetable[0]:
            first_train_index = inbound_timetable[0].index(first_train_number)
            
            for cnt_2 in range(3, len(inbound_timetable_t[first_train_index])):
                if inbound_timetable_t[first_train_index][cnt_2] == "":
                    continue
                
                operation_table[cnt][2] = inbound_timetable_t[0][cnt_2]
                break
        else:
            first_train_index = outbound_timetable[0].index(first_train_number)
            
            for cnt_2 in range(3, len(outbound_timetable_t[first_train_index])):
                if outbound_timetable_t[first_train_index][cnt_2] == "":
                    continue
                
                operation_table[cnt][2] = outbound_timetable_t[0][cnt_2]
                break
        
        if last_train_number in inbound_timetable[0]:
            last_train_index = inbound_timetable[0].index(last_train_number)
            
            for cnt_2 in reversed(range(3, len(inbound_timetable_t[last_train_index]))):
                if inbound_timetable_t[last_train_index][cnt_2] == "":
                    continue
                
                operation_table[cnt][4] = inbound_timetable_t[0][cnt_2]
                break
        else:
            last_train_index = outbound_timetable[0].index(last_train_number)
            
            for cnt_2 in reversed(range(3, len(outbound_timetable_t[last_train_index]))):
                if outbound_timetable_t[last_train_index][cnt_2] == "":
                    continue
                
                operation_table[cnt][4] = outbound_timetable_t[0][cnt_2]
                break
    
    
    mes("データを新しいCSVファイルに書き込んでいます...")
    
    timetable_file_paths = [
        main_dir + "/" + diagram_revision + "/timetable_" + inbound_file_base_name,
        main_dir + "/" + diagram_revision + "/timetable_" + outbound_file_base_name
    ]
    
    with open(timetable_file_paths[0], "w", encoding="utf-8") as csv_f:
        csv_writer = csv.writer(csv_f)
        csv_writer.writerows(inbound_timetable)
    
    with open(timetable_file_paths[1], "w", encoding="utf-8") as csv_f:
        csv_writer = csv.writer(csv_f)
        csv_writer.writerows(outbound_timetable)
    
    operation_table_file_path = main_dir + "/" + diagram_revision + "/operation_table_" + diagram_id + ".csv"
    
    with open(operation_table_file_path, "w", encoding="utf-8") as csv_f:
        csv_writer = csv.writer(csv_f)
        csv_writer.writerows(operation_table)
    
    
    mes("処理が完了しました")
    
    return timetable_file_paths
