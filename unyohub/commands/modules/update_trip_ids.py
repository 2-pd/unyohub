#!/usr/bin/env python3
# coding: utf-8

import os
import csv
import sqlite3

def update_trip_ids (mes, main_dir, diagram_revision, diagram_id, options=set()):
    mes("便識別名と列車番号の対応表をデータベースに書き込み", is_heading=True)
    
    
    if not os.path.isdir(main_dir):
        mes("指定された路線系統は存在しません", True)
        return
    
    
    mes("データベースに接続しています...")
    conn = sqlite3.connect(main_dir + "/railroad.db")
    cur = conn.cursor()
    
    
    if "-D" not in options:
        diagram_revision_dir_path = main_dir + "/" + diagram_revision
        
        if not os.path.isdir(diagram_revision_dir_path):
            mes("指定された改正日のフォルダは存在しません", True)
            return
        
        try:
            mes("train_number_mappings_" + diagram_id + ".csv を読み込んでいます...")
            with open(diagram_revision_dir_path + "/train_number_mappings_" + diagram_id + ".csv", "r", encoding="utf-8-sig") as csv_f:
                csv_reader = csv.reader(csv_f)
                train_number_mappings = [data_row for data_row in csv_reader]
        except Exception:
            mes("train_number_mappings_" + diagram_id + ".csv の読み込みに失敗しました", True)
            return
    
    
    mes("データベースから " + diagram_revision + " 改正ダイヤ " + diagram_id + " の古い便識別名データを削除します...")
    cur.execute("DELETE FROM `unyohub_trip_ids` WHERE `diagram_revision` = :diagram_revision AND `diagram_id` = :diagram_id", {"diagram_revision" : diagram_revision, "diagram_id" : diagram_id})
    
    
    if "-D" not in options:
        mes("便識別名データを書き込んでいます...")
        
        for train_number_mapping in train_number_mappings:
            if len(train_number_mapping[0]) == 0:
                continue
            
            cur.execute("INSERT INTO `unyohub_trip_ids` (`diagram_revision`, `diagram_id`, `train_number`, `trip_id`) VALUES (:diagram_revision, :diagram_id, :train_number, :trip_id)", {"diagram_revision" : diagram_revision, "diagram_id" : diagram_id, "train_number" : train_number_mapping[1], "trip_id" : train_number_mapping[0]})
    
    
    mes("データベースの書き込み処理を完了しています...")
    conn.commit()
    conn.close()
    
    
    mes("処理が完了しました")
