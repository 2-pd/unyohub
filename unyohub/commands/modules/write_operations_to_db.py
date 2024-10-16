#!/usr/bin/env python3
# coding: utf-8

import json
import sqlite3

def write_operations_to_db (mes, main_dir, diagram_revision, diagram_id):
    mes("運用表のデータベース書き込み", is_heading=True)
    
    mes("データベースに接続しています...")
    conn = sqlite3.connect(main_dir + "/railroad.db")
    cur = conn.cursor()
    
    with open(main_dir + "/" + diagram_revision + "/operation_table_" + diagram_id + ".json", "r", encoding="utf-8") as json_f:
        operation_data = json.load(json_f)
    
    mes("データベースから " + diagram_revision + " 改正ダイヤ " + diagram_id + " の古いデータを削除しています...")
    cur.execute("DELETE FROM `unyohub_operations` WHERE `diagram_revision` = :diagram_revision AND `diagram_id` = :diagram_id", {"diagram_revision" : diagram_revision, "diagram_id" : diagram_id})
    cur.execute("DELETE FROM `unyohub_trains` WHERE `diagram_revision` = :diagram_revision AND `diagram_id` = :diagram_id", {"diagram_revision" : diagram_revision, "diagram_id" : diagram_id})
    
    mes("データを処理しています...")
    
    for operation_number in operation_data["operations"].keys():
        mes(operation_number + "運用 をデータベースに登録します...")
        
        operation = operation_data["operations"][operation_number]
        
        cur.execute("INSERT INTO `unyohub_operations` (`diagram_revision`, `diagram_id`, `operation_number`, `starting_location`, `starting_track`, `starting_time`, `terminal_location`, `terminal_track`, `ending_time`, `min_car_count`, `max_car_count`) VALUES (:diagram_revision, :diagram_id, :operation_number, :starting_location, :starting_track, :starting_time, :terminal_location, :terminal_track, :ending_time, :min_car_count, :max_car_count)", {"diagram_revision" : diagram_revision, "diagram_id" : diagram_id, "operation_number" : operation_number, "starting_location" : operation["starting_location"], "starting_track" : operation["starting_track"], "starting_time" : operation["starting_time"], "terminal_location" : operation["terminal_location"], "terminal_track" : operation["terminal_track"], "ending_time" : operation["ending_time"], "min_car_count" : operation["min_car_count"], "max_car_count" : operation["max_car_count"]})
        
        first_departure_time = None
        train_count = len(operation["trains"])
        
        for cnt in range(train_count):
            if operation["trains"][cnt]["train_number"][0] == "_":
                continue
            
            if first_departure_time is None:
                first_departure_time = operation["trains"][cnt]["first_departure_time"]
            
            if cnt + 1 < train_count and operation["trains"][cnt + 1]["train_number"] == operation["trains"][cnt]["train_number"]:
                continue
            
            cur.execute("INSERT INTO `unyohub_trains` (`diagram_revision`, `diagram_id`, `operation_number`, `train_number`, `first_departure_time`, `final_arrival_time`) VALUES (:diagram_revision, :diagram_id, :operation_number, :train_number, :first_departure_time, :final_arrival_time)", {"diagram_revision" : diagram_revision, "diagram_id" : diagram_id, "operation_number" : operation_number, "train_number" : operation["trains"][cnt]["train_number"], "first_departure_time" : first_departure_time, "final_arrival_time" : operation["trains"][cnt]["final_arrival_time"]})
            
            first_departure_time = None
    
    mes("データベースの書き込み処理を完了しています...")
    conn.commit()
    conn.close()
    
    mes("処理が完了しました")
