# coding: utf-8

import os
import csv
from operator import itemgetter


def shape_time_string (time_string):
    if ":" not in time_string:
        time_string = time_string[:-2] + ":" + time_string[-2:]
    
    return time_string.zfill(5)


def generate_operation_table (mes, main_dir, operation_table_name):
    mes("運用情報付き時刻表から運用表と変換用時刻表を生成", is_heading=True)
    
    
    inbound_file_base_name = operation_table_name + ".inbound.csv"
    file_path = main_dir + "/" + inbound_file_base_name
    
    mes(inbound_file_base_name + " を読み込んでいます...")
    
    if not os.path.isfile(file_path):
        mes("ファイル " + file_path + " が見つかりません", True)
        return
    
    with open(file_path, "r", encoding="utf-8") as csv_f:
        csv_reader = csv.reader(csv_f)
        inbound_timetable = [data_row for data_row in csv_reader]
    
    outbound_file_base_name = operation_table_name + ".outbound.csv"
    file_path = main_dir + "/" + outbound_file_base_name
    
    mes(outbound_file_base_name + " を読み込んでいます...")
    
    if not os.path.isfile(file_path):
        mes("ファイル " + file_path + " が見つかりません", True)
        return
    
    with open(file_path, "r", encoding="utf-8") as csv_f:
        csv_reader = csv.reader(csv_f)
        outbound_timetable = [data_row for data_row in csv_reader]
    
    
    mes("時刻表データを変換しています...")
    
    inbound_timetable_t = [list(x) for x in zip(*inbound_timetable)]
    outbound_timetable_t = [list(x) for x in zip(*outbound_timetable)]
    
    symbols_inbound = []
    symbols_outbound = []
    
    for cnt in range(2, len(inbound_timetable_t[0])):
        if "[" in inbound_timetable_t[0][cnt]:
            symbol_start = inbound_timetable_t[0][cnt].find("[") + 1
            symbol_end = inbound_timetable_t[0][cnt].find("]")
            
            symbols_inbound.append({"station" : cnt, "symbol" : inbound_timetable_t[0][cnt][symbol_start:symbol_end]})
            inbound_timetable_t[0][cnt] = inbound_timetable_t[0][cnt][0:symbol_start - 1] + inbound_timetable_t[0][cnt][symbol_end + 1:]
    
    for cnt in range(2, len(outbound_timetable_t[0])):
        if "[" in outbound_timetable_t[0][cnt]:
            symbol_start = outbound_timetable_t[0][cnt].find("[") + 1
            symbol_end = outbound_timetable_t[0][cnt].find("]")
            
            symbols_outbound.append({"station" : cnt, "symbol" : outbound_timetable_t[0][cnt][symbol_start:symbol_end]})
            outbound_timetable_t[0][cnt] = outbound_timetable_t[0][cnt][0:symbol_start - 1] + outbound_timetable_t[0][cnt][symbol_end + 1:]
    
    operation_data = {}
    
    train_cnt = 2
    for cnt in range(1, len(inbound_timetable_t)):
        operation_number = inbound_timetable_t[cnt][0].strip()
        
        if operation_number == "":
            continue
        
        inbound_timetable_t[cnt][0] = operation_number + "__" + str(train_cnt)
        
        if operation_number not in operation_data:
            operation_data[operation_number] = {}
        
        symbol_added = False
        for symbol_data in symbols_inbound:
            if len(inbound_timetable_t[cnt][symbol_data["station"]]) >= 1 and inbound_timetable_t[cnt][symbol_data["station"]][0] != "|":
                if not symbol_added:
                    symbol_added = True
                    
                    inbound_timetable_t[cnt][0] += "__"
                
                inbound_timetable_t[cnt][0] += symbol_data["symbol"]
        
        operation_data[operation_number][shape_time_string(next((item for item in inbound_timetable_t[cnt][2:] if item != ""), "99:99"))] = inbound_timetable_t[cnt][0]
        
        train_cnt += 2
    
    train_cnt = 1
    for cnt in range(1, len(outbound_timetable_t)):
        operation_number = outbound_timetable_t[cnt][0].strip()
        
        if operation_number == "":
            continue
        
        outbound_timetable_t[cnt][0] = operation_number + "__" + str(train_cnt)
        
        if operation_number not in operation_data:
            operation_data[operation_number] = {}
        
        symbol_added = False
        for symbol_data in symbols_outbound:
            if len(outbound_timetable_t[cnt][symbol_data["station"]]) >= 1 and outbound_timetable_t[cnt][symbol_data["station"]][0] != "|":
                if not symbol_added:
                    symbol_added = True
                    
                    outbound_timetable_t[cnt][0] += "__"
                
                outbound_timetable_t[cnt][0] += symbol_data["symbol"]
        
        operation_data[operation_number][shape_time_string(next((item for item in outbound_timetable_t[cnt][2:] if item != ""), "99:99"))] = outbound_timetable_t[cnt][0]
        
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
    
    inbound_train_numbers = {inbound_timetable[0][0] : inbound_timetable[0][0], "" : ""}
    outbound_train_numbers = {outbound_timetable[0][0] : outbound_timetable[0][0], "" : ""}
    
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
    
    inbound_timetable[0] = [inbound_train_numbers[item] for item in inbound_timetable[0]]
    outbound_timetable[0] = [outbound_train_numbers[item] for item in outbound_timetable[0]]
    
    
    mes("データを新しいCSVファイルに書き込んでいます...")
    
    new_file_path = main_dir + "/timetable_" + inbound_file_base_name
    
    with open(new_file_path, "w", encoding="utf-8") as csv_f:
        csv_writer = csv.writer(csv_f)
        csv_writer.writerows(inbound_timetable)
    
    new_file_path = main_dir + "/timetable_" + outbound_file_base_name
    
    with open(new_file_path, "w", encoding="utf-8") as csv_f:
        csv_writer = csv.writer(csv_f)
        csv_writer.writerows(outbound_timetable)
    
    new_file_path = main_dir + "/operations_" + operation_table_name + ".csv"
    
    with open(new_file_path, "w", encoding="utf-8") as csv_f:
        csv_writer = csv.writer(csv_f)
        csv_writer.writerows(operation_table)
    
    
    mes("処理が完了しました")
