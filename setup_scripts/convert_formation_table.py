#!/usr/bin/env python3
# coding: utf-8

import os
import csv
import json
import sqlite3


equipment_symbols = ["<",">","◇","⬠"]
equipment_keywords = ["PL","PG","PX","PD"]

def replace_equipment_symbols (equipment_str):
    global equipment_symbols
    global equipment_keywords
    
    for cnt in range(0, len(equipment_symbols)):
        equipment_str = equipment_str.replace(equipment_symbols[cnt], equipment_keywords[cnt])
    
    return equipment_str


def insert_series_data (cur, series_name, min_car_count, max_car_count, coupling_group_list):
    print("　- " + series_name + " のデータをまとめています...")
    
    cur.execute("INSERT INTO `unyohub_series`(`series_name`, `min_car_count`, `max_car_count`) VALUES (:series_name, :min_car_count, :max_car_count)", {"series_name" : series_name, "min_car_count" :min_car_count, "max_car_count" : max_car_count})
    
    for coupling_group in coupling_group_list:
        cur.execute("INSERT INTO `unyohub_coupling_groups`(`series_or_formation`, `coupling_group`) VALUES (:series_or_formation, :coupling_group)", {"series_or_formation" : series_name, "coupling_group" : coupling_group})


print("formations.csvを読み込んでいます...")

with open("formations.csv", "r", encoding="utf-8") as csv_f:
    csv_reader = csv.reader(csv_f)
    formation_data = [data_row for data_row in csv_reader]

print("データベースに接続しています...")

conn = sqlite3.connect("railroad.db")
cur = conn.cursor()

print("データベースから不要となるデータを削除しています...")

cur.execute("DELETE FROM `unyohub_series`")
cur.execute("DELETE FROM `unyohub_coupling_groups`")

print("データを変換しています...")

formation_list_old = []
for row_data in cur.execute("SELECT `formation_name` FROM `unyohub_formations`"):
    formation_list_old.append(row_data[0])

json_data = {"formations" : {}, "series" : {}, "series_names" : []}
formation_list = []

cnt = 0
series_name = None
while cnt < len(formation_data):
    if formation_data[cnt][0].startswith("# "):
        if series_name != None:
            insert_series_data(cur, series_name, min_car_count, max_car_count, coupling_group_list)
        
        series_name = formation_data[cnt][0][2:]
        
        print("・" + series_name + " のデータ処理を開始します...")
        
        json_data["series"][series_name] = {"formation_names" : [], "icon_id" : formation_data[cnt + 1][0]}
        json_data["series_names"].append(series_name)
        
        coupling_group_list = []
        min_car_count = None
        max_car_count = 0
        
        cnt += 2
    else:
        formation_name = formation_data[cnt][0]
        
        print("　- " + formation_name + " のデータを処理しています...")
        
        json_data["series"][series_name]["formation_names"].append(formation_name)
        json_data["formations"][formation_name] = {"cars" : [], "series_name" : series_name, "icon_id" : formation_data[cnt + 1][0]}
        
        if len(formation_data[cnt + 3][0]) >= 1:
            json_data["formations"][formation_name]["heading"] = formation_data[cnt + 3][0]
        
        car_list_old = []
        for row_data in cur.execute("SELECT `car_number` FROM `unyohub_cars` WHERE `formation_name` = :formation_name", {"formation_name" : formation_name}):
            car_list_old.append(row_data[0])
        
        car_list = []
        
        for cnt_2 in range(1, len(formation_data[cnt])):
            if formation_data[cnt][cnt_2] != "":
                car_number = formation_data[cnt][cnt_2]
                
                json_data["formations"][formation_name]["cars"].append({"car_number" : car_number, "abbr_number" : formation_data[cnt + 1][cnt_2]})
                
                if len(formation_data[cnt + 4][cnt_2]) >= 1:
                    json_data["formations"][formation_name]["cars"][-1]["coloring_id"] = formation_data[cnt + 4][cnt_2]
                
                equipment = replace_equipment_symbols(formation_data[cnt + 5][cnt_2].upper()).split()
                if len(equipment) >= 1:
                    json_data["formations"][formation_name]["cars"][-1]["equipment"] = equipment
                
                cur.execute("INSERT INTO `unyohub_cars`(`formation_name`, `car_number`, `car_order`, `manufacturer`, `constructed`, `description`) VALUES (:formation_name, :car_number, :car_order, :manufacturer, :constructed, '') ON CONFLICT(`formation_name`, `car_number`) DO UPDATE SET `car_order` = :car_order_2, `manufacturer` = :manufacturer_2, `constructed` = :constructed_2", {"formation_name" : formation_name, "car_number" : car_number, "car_order" : cnt_2, "manufacturer" : formation_data[cnt + 2][cnt_2], "constructed" : formation_data[cnt + 3][cnt_2], "car_order_2" : cnt_2, "manufacturer_2" : formation_data[cnt + 2][cnt_2], "constructed_2" : formation_data[cnt + 3][cnt_2]})
                
                car_list.append(car_number)
        
        deleted_cars = list(set(car_list_old) - set(car_list))
        
        for deleted_car_number in deleted_cars:
            cur.execute("DELETE FROM `unyohub_cars` WHERE `formation_name` = :formation_name AND `car_number` = :car_number", {"formation_name" : formation_name, "car_number" : deleted_car_number})
        
        car_count = len(car_list)
        
        cur.execute("INSERT INTO `unyohub_formations`(`formation_name`, `series_name`, `car_count`, `description`, `inspection_information`) VALUES (:formation_name, :series_name, :car_count, '', '') ON CONFLICT(`formation_name`) DO UPDATE SET `series_name` = :series_name_2, `car_count` = :car_count_2", {"formation_name" : formation_name, "series_name" : series_name, "car_count" : car_count, "series_name_2" : series_name, "car_count_2" : car_count})
        
        formation_list.append(formation_name)
        
        if car_count > max_car_count:
            max_car_count = car_count
        
        if min_car_count == None or car_count < min_car_count:
            min_car_count = car_count
        
        coupling_groups = formation_data[cnt + 2][0].split()
        for coupling_group in coupling_groups:
            if len(coupling_group) >= 1:
                cur.execute("INSERT INTO `unyohub_coupling_groups`(`series_or_formation`, `coupling_group`) VALUES (:series_or_formation, :coupling_group)", {"series_or_formation" : formation_name, "coupling_group" : coupling_group})
                
                if coupling_group not in coupling_group_list:
                    coupling_group_list.append(coupling_group)
        
        cnt += 6

insert_series_data(cur, series_name, min_car_count, max_car_count, coupling_group_list)

if os.path.isfile("car_colorings.csv"):
    print("car_colorings.csvを読み込んでいます...")
    
    with open("car_colorings.csv", "r", encoding="utf-8") as csv_f:
        csv_reader = csv.reader(csv_f)
        coloring_data = [data_row for data_row in csv_reader]
    
    body_colorings = {}
    for coloring in coloring_data:
        body_colorings[coloring[0]] = {"font_color" : coloring[1]}
        
        stripes = []
        for cnt in range(2, len(coloring)):
            if len(coloring[cnt]) == 0:
                break
            
            stripe_data = coloring[cnt].split()
            stripes.append({"color" : stripe_data[0]})
            
            if len(stripe_data) >= 2:
                start_and_end = stripe_data[1].split("-")
                
                stripes[-1]["start"] = int(start_and_end[0])
                stripes[-1]["end"] = int(start_and_end[1])
                
                if len(stripe_data) >= 3 and stripe_data[2] == "V":
                    stripes[-1]["verticalize"] = True
        
        body_colorings[coloring[0]]["base_color"] = stripes.pop(-1)["color"]
        
        if len(stripes) >= 1:
            body_colorings[coloring[0]]["stripes"] = stripes
    
    json_data["body_colorings"] = body_colorings
else:
    print("car_colorings.csvがありません")

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
