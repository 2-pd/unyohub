# coding: utf-8

import os
import csv
import json
import sqlite3

from modules import diagram_funcs

def generate_operation_table (mes, main_dir, date_string):
    mes("運用表の生成", is_heading=True)
    
    
    if not os.path.isdir(main_dir):
        mes("指定された路線系統は存在しません", True)
        return
    
    
    diagram = diagram_funcs.diagram(main_dir, mes=mes)
    
    diagram_revision, diagram_id = diagram.get_diagram_id(date_string)
    
    if diagram_id is None:
        mes("指定された日付に該当するダイヤを判別できませんでした", True)
        return False
    
    
    mes("railroad_info.json を読み込んでいます...")
    try:
        with open(main_dir + "/railroad_info.json", "r", encoding="utf-8-sig") as json_f:
            railroad_info = json.load(json_f)
    except Exception:
        mes("railroad_info.json の読み込みに失敗しました", True)
        return
    
    mes("timetable_" + diagram_id + ".json を読み込んでいます...")
    try:
        with open(main_dir + "/" + diagram_revision + "/timetable_" + diagram_id + ".json", "r", encoding="utf-8-sig") as json_f:
            timetable = json.load(json_f)
    except Exception:
        mes("timetable_" + diagram_id + ".json の読み込みに失敗しました", True)
        return
    
    trains = {}
    
    for line_id in railroad_info["lines_order"]:
        station_count = len(railroad_info["lines"][line_id]["stations"])
        
        for direction in ["inbound_trains", "outbound_trains"]:
            for train_number in timetable[line_id][direction].keys():
                if train_number not in trains:
                    trains[train_number] = { "first_departure_time" : None, "final_arrival_time" : None, "starting_station" : None, "terminal_station" : None }
                
                for cnt in range(station_count):
                    if timetable[line_id][direction][train_number][0]["departure_times"][cnt] is not None:
                        first_departure_time = timetable[line_id][direction][train_number][0]["departure_times"][cnt]
                        
                        if direction == "inbound_trains":
                            starting_station = railroad_info["lines"][line_id]["stations"][station_count - 1 - cnt]["station_name"]
                        else:
                            starting_station = railroad_info["lines"][line_id]["stations"][cnt]["station_name"]
                        
                        break
                
                for cnt in range(station_count - 1, -1, -1):
                    if timetable[line_id][direction][train_number][0]["departure_times"][cnt] is not None:
                        final_arrival_time = timetable[line_id][direction][train_number][0]["departure_times"][cnt]
                        
                        if direction == "inbound_trains":
                            terminal_station = railroad_info["lines"][line_id]["stations"][station_count - 1 - cnt]["station_name"]
                        else:
                            terminal_station = railroad_info["lines"][line_id]["stations"][cnt]["station_name"]
                        
                        break
                
                if trains[train_number]["first_departure_time"] is None or first_departure_time < trains[train_number]["first_departure_time"]:
                    trains[train_number]["first_departure_time"] = first_departure_time
                    trains[train_number]["starting_station"] = starting_station
                
                if trains[train_number]["final_arrival_time"] is None or final_arrival_time > trains[train_number]["final_arrival_time"]:
                    trains[train_number]["final_arrival_time"] = final_arrival_time
                    trains[train_number]["terminal_station"] = terminal_station
    
    
    mes("データベースに接続しています...")
    conn = sqlite3.connect(main_dir + "/railroad.db")
    cur = conn.cursor()
    
    
    mes("在線履歴を抽出しています...")
    cur.execute("SELECT `unyohub_operation_logs`.`vehicle_id`, `unyohub_trip_ids`.`train_number` FROM `unyohub_operation_logs`, `unyohub_trip_ids` WHERE `unyohub_operation_logs`.`operation_date` = :operation_date AND `unyohub_trip_ids`.`diagram_revision` = :diagram_revision AND `unyohub_trip_ids`.`diagram_id` = :diagram_id AND `unyohub_operation_logs`.`trip_id` = `unyohub_trip_ids`.`trip_id`", { "operation_date" : date_string, "diagram_revision" : diagram_revision, "diagram_id" : diagram_id })
    
    operation_logs = {}
    starting_times = {}
    
    for log_data in cur.fetchall():
        if log_data[0] not in operation_logs:
            operation_logs[log_data[0]] = {}
            starting_times[log_data[0]] = None
        
        operation_logs[log_data[0]][trains[log_data[1]]["first_departure_time"]] = log_data[1]
        
        if starting_times[log_data[0]] is None or trains[log_data[1]]["first_departure_time"] < starting_times[log_data[0]]:
            starting_times[log_data[0]] = trains[log_data[1]]["first_departure_time"]
    
    conn.close()
    
    
    mes("運用表を生成しています...")
    
    vehicle_ids = {}
    
    for vehicle_id in starting_times.keys():
        vehicle_ids[starting_times[vehicle_id] + "__" + vehicle_id] = vehicle_id
    
    operation_table = [["# 全ての運用"]]
    
    for time_key in sorted(vehicle_ids.keys()):
        vehicle_id = vehicle_ids[time_key]
        
        operation = ["", "", "", "", "", ""]
        
        for time_key in sorted(operation_logs[vehicle_id].keys()):
            operation.append(operation_logs[vehicle_id][time_key])
        
        operation[0] = operation[6]
        operation[2] = trains[operation[6]]["starting_station"]
        operation[4] = trains[operation[-1]]["terminal_station"]
        
        operation_table.append(operation)
    
    
    mes("運用表を operation_table_" + diagram_id + ".csv に書き込んでいます...")
    
    with open(main_dir + "/" + diagram_revision + "/operation_table_" + diagram_id + ".csv", "w", encoding="utf-8-sig") as csv_f:
        csv_writer = csv.writer(csv_f, lineterminator="\n")
        csv_writer.writerows(operation_table)
    
    
    mes("処理が完了しました")
