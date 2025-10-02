#!/usr/bin/env python3
# coding: utf-8

import csv
import sqlite3

def update_train_number_mappings (mes, main_dir, diagram_revision, diagram_id):
    mes("便識別名と列車番号の対応表をデータベースに書き込み", is_heading=True)
    
    
    mes("データベースに接続しています...")
    conn = sqlite3.connect(main_dir + "/railroad.db")
    cur = conn.cursor()
    
    
    mes("train_number_mappings_" + diagram_id + ".csv を読み込んでいます...")
    with open(main_dir + "/" + diagram_revision + "/train_number_mappings_" + diagram_id + ".csv", "r", encoding="utf-8-sig") as csv_f:
        csv_reader = csv.reader(csv_f)
        train_number_mappings = [data_row for data_row in csv_reader]
    
    
    mes("データベースから " + diagram_revision + " 改正ダイヤ " + diagram_id + " の古い便識別名データを削除します...")
    cur.execute("DELETE FROM `unyohub_trip_ids` WHERE `diagram_revision` = :diagram_revision AND `diagram_id` = :diagram_id", {"diagram_revision" : diagram_revision, "diagram_id" : diagram_id})
    
    
    mes("便識別名データを書き込んでいます...")
    
    for train_number_mapping in train_number_mappings:
        if len(train_number_mapping[0]) == 0:
            continue
        
        cur.execute("INSERT INTO `unyohub_trip_ids` (`diagram_revision`, `diagram_id`, `train_number`, `trip_id`) VALUES (:diagram_revision, :diagram_id, :train_number, :trip_id)", {"diagram_revision" : diagram_revision, "diagram_id" : diagram_id, "train_number" : train_number_mapping[1], "trip_id" : train_number_mapping[0]})
    
    
    mes("データベースの書き込み処理を完了しています...")
    conn.commit()
    conn.close()
    
    
    mes("処理が完了しました")
