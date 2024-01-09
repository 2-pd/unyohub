#!/usr/bin/env python3
# coding: utf-8

import csv
import json
import sqlite3

print("formations.csvを読み込んでいます...")

with open("formations.csv", "r", encoding="utf-8") as csv_f:
    csv_reader = csv.reader(csv_f)
    formation_data = [data_row for data_row in csv_reader]

print("データベースに接続しています...")

conn = sqlite3.connect("railroad.db")
cur = conn.cursor()

print("データを変換しています...")

formation_list_old = []
for row_data in cur.execute("SELECT `formation_name` FROM `unyohub_formations`"):
    formation_list_old.append(row_data[0])

json_data = {"formations" : {}, "series" : {}, "series_names" : []}
formation_list = []

cnt = 0
while cnt < len(formation_data):
    if formation_data[cnt][0].startswith("# "):
        series_name = formation_data[cnt][0][2:]
        
        print("・" + series_name + " のデータ処理を開始します...")
        
        json_data["series"][series_name] = {"formation_names" : [], "icon_id" : formation_data[cnt + 1][0]}
        json_data["series_names"].append(series_name)
        
        cnt += 2
    else:
        formation_name = formation_data[cnt][0]
        
        print("　- " + formation_name + " のデータを処理しています...")
        
        json_data["series"][series_name]["formation_names"].append(formation_name)
        json_data["formations"][formation_name] = {"cars" : [], "series_name" : series_name, "icon_id" : formation_data[cnt + 1][0]}
        
        car_list_old = []
        for row_data in cur.execute("SELECT `car_number` FROM `unyohub_cars` WHERE `formation_name` = :formation_name", {"formation_name" : formation_name}):
            car_list_old.append(row_data[0])
        
        car_list = []
        
        for cnt_2 in range(1, len(formation_data[cnt])):
            if formation_data[cnt][cnt_2] != "":
                car_number = formation_data[cnt][cnt_2]
                
                json_data["formations"][formation_name]["cars"].append({"car_number" : car_number, "abbreviated_car_number" : formation_data[cnt + 1][cnt_2]})
                
                cur.execute("INSERT INTO `unyohub_cars`(`formation_name`, `car_number`, `car_order`, `manufacturer`, `constructed`, `description`) VALUES (:formation_name, :car_number, :car_order, :manufacturer, :constructed, '') ON CONFLICT(`formation_name`, `car_number`) DO UPDATE SET `formation_name` = :formation_name_2, `car_number` = :car_number_2, `car_order` = :car_order_2, `manufacturer` = :manufacturer_2, `constructed` = :constructed_2", {"formation_name" : formation_name, "car_number" : car_number, "car_order" : cnt_2, "manufacturer" : formation_data[cnt + 2][cnt_2], "constructed" : formation_data[cnt + 3][cnt_2], "formation_name_2" : formation_name, "car_number_2" : car_number, "car_order_2" : cnt_2, "manufacturer_2" : formation_data[cnt + 2][cnt_2], "constructed_2" : formation_data[cnt + 3][cnt_2]})
                
                car_list.append(car_number)
        
        deleted_cars = list(set(car_list_old) - set(car_list))
        
        for deleted_car_number in deleted_cars:
            cur.execute("DELETE FROM `unyohub_cars` WHERE `formation_name` = :formation_name AND `car_number` = :car_number", {"formation_name" : formation_name, "car_number" : deleted_car_number})
        
        cars_count = len(car_list)
        
        cur.execute("INSERT INTO `unyohub_formations`(`formation_name`, `series_name`, `cars_count`, `description`, `inspection_information`) VALUES (:formation_name, :series_name, :cars_count, '', '') ON CONFLICT(`formation_name`) DO UPDATE SET `formation_name` = :formation_name_2, `series_name` = :series_name_2, `cars_count` = :cars_count_2", {"formation_name" : formation_name, "series_name" : series_name, "cars_count" : cars_count, "formation_name_2" : formation_name, "series_name_2" : series_name, "cars_count_2" : cars_count})
        
        formation_list.append(formation_name)
        
        cnt += 4

print("データベースからformations.csvにない編成を削除しています...")

deleted_formations = list(set(formation_list_old) - set(formation_list))

for deleted_formation_name in deleted_formations:
    cur.execute("DELETE FROM `unyohub_formations` WHERE `formation_name` = :formation_name", {"formation_name" : deleted_formation_name})
    cur.execute("DELETE FROM `unyohub_cars` WHERE `formation_name` = :formation_name", {"formation_name" : deleted_formation_name})

print("データベースの書き込み処理を完了しています...")

conn.commit()
conn.close()

print("formations.jsonを作成しています...")

with open("formations.json", "w", encoding="utf-8") as json_f:
    json.dump(json_data, json_f, ensure_ascii=False, separators=(',', ':'))

print("処理が完了しました")
