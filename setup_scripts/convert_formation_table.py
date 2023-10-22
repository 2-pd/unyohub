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

for formation in formation_data:
    if formation[0].startswith("# "):
        json_data["series"].append({"series_name" : formation[0][2:], "formation_names" : []})
        series_name = formation[0][2:]
    else:
        formation_name = formation.pop(0)
        json_data["series"][-1]["formation_names"].append(formation_name)
        json_data["formations"][formation_name] = {"cars" : [], "series_name" : series_name}
        
        for car_number in list(filter(lambda car: car != "", formation)):
            json_data["formations"][formation_name]["cars"].append({"car_number" : car_number})
        
        cur.execute("INSERT INTO `unyohub_formations`(`formation_name`, `cars_count`) VALUES (:formation_name, :cars_count)", {"formation_name" : formation_name, "cars_count" : len(json_data["formations"][formation_name]["cars"])})

print("データベースの書き込み処理を完了しています...")
conn.commit()
conn.close()

print("formations.jsonを作成しています...")
with open("formations.json", "w", encoding="utf-8") as json_f:
    json.dump(json_data, json_f, ensure_ascii=False, separators=(',', ':'))

print("処理が完了しました")
