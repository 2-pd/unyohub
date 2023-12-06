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

print("データベースから古いデータを削除しています...")
cur.execute("DELETE FROM `unyohub_formations`")

print("データを変換しています...")

json_data = {"formations" : {}, "series" : []}

cnt = 0
while cnt < len(formation_data):
    if formation_data[cnt][0].startswith("# "):
        json_data["series"].append({"series_name" : formation_data[cnt][0][2:], "formation_names" : []})
        series_name = formation_data[cnt][0][2:]
        
        cnt += 1
    else:
        formation_name = formation_data[cnt][0]
        
        if cnt + 3 < len(formation_data):
            description = formation_data[cnt + 3][0]
        else:
            description = ""
        
        json_data["series"][-1]["formation_names"].append(formation_name)
        json_data["formations"][formation_name] = {"cars" : [], "series_name" : series_name, "description" : description}
        
        for cnt_2 in range(1, len(formation_data[cnt])):
            if formation_data[cnt][cnt_2] != "":
                json_data["formations"][formation_name]["cars"].append({"car_number" : formation_data[cnt][cnt_2], "manufacturer" : formation_data[cnt + 1][cnt_2], "constructed" : formation_data[cnt + 2][cnt_2]})
        
        cur.execute("INSERT INTO `unyohub_formations`(`formation_name`, `series_name`, `cars_count`) VALUES (:formation_name, :series_name, :cars_count)", {"formation_name" : formation_name, "series_name" : series_name, "cars_count" : len(json_data["formations"][formation_name]["cars"])})
        
        cnt += 4

print("データベースの書き込み処理を完了しています...")
conn.commit()
conn.close()

print("formations.jsonを作成しています...")
with open("formations.json", "w", encoding="utf-8") as json_f:
    json.dump(json_data, json_f, ensure_ascii=False, separators=(',', ':'))

print("処理が完了しました")
