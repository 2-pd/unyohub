#!/usr/bin/env python3
# coding: utf-8

import csv
import json
import sqlite3
import time

def clean_formation_db_table (mes, main_dir):
    mes("編成表データベースから不要なデータを削除", is_heading=True)
    
    mes("formations.jsonを読み込んでいます...")
    
    with open(main_dir + "/formations.json", "r", encoding="utf-8") as json_f:
        formation_data = json.load(json_f)
    
    mes("データベースに接続しています...")
    
    conn = sqlite3.connect(main_dir + "/railroad.db")
    cur = conn.cursor()
    
    mes("削除対象の編成を検出しています...")
    
    formation_list = formation_data["formations"].keys()
    
    db_formation_list = set()
    for row_data in cur.execute("SELECT `formation_name` FROM `unyohub_formations`"):
        db_formation_list.add(row_data[0])
    
    excluded_formations = list(db_formation_list - set(formation_list))
    
    mes("編成表にない編成をデータベースから削除しています...")
    
    for formation_name in excluded_formations:
        mes("  - " + formation_name + " のデータを削除しています...")
        
        cur.execute("DELETE FROM `unyohub_formations` WHERE `formation_name` = :formation_name", {"formation_name" : formation_name})
        cur.execute("DELETE FROM `unyohub_cars` WHERE `formation_name` = :formation_name", {"formation_name" : formation_name})
        cur.execute("DELETE FROM `unyohub_formation_histories` WHERE `formation_name` = :formation_name", {"formation_name" : formation_name})
    
    mes("編成表にない車両をデータベースから削除しています...")
    
    for formation_name in formation_list:
        car_list = set()
        for car_data in formation_data["formations"][formation_name]["cars"]:
            car_list.add(car_data["car_number"])
        
        db_car_list = set()
        for row_data in cur.execute("SELECT `car_number` FROM `unyohub_cars` WHERE `formation_name` = :formation_name", {"formation_name" : formation_name}):
            db_car_list.add(row_data[0])
        
        excluded_cars = list(db_car_list - car_list)
        
        for car_number in excluded_cars:
            mes("  - " + formation_name + " から " + car_number + " のデータを削除しています...")
            
            cur.execute("DELETE FROM `unyohub_cars` WHERE `formation_name` = :formation_name AND `car_number` = :car_number", {"formation_name" : formation_name, "car_number" : car_number})
    
    mes("データベースの書き込み処理を完了しています...")
    
    conn.commit()
    conn.close()
    
    mes("処理が完了しました")
