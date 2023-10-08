#!/usr/bin/env python3
# coding: utf-8

import sys
import csv
import json

print("formations.csvを読み込んでいます...")
try:
    csv_f = open("formations.csv", "r", encoding="utf-8")
    csv_reader = csv.reader(csv_f)
    formation_data = [data_row for data_row in csv_reader]
except:
    print("【エラー】formations.csvの読み込みに失敗しました")
    sys.exit()

json_data = {}
for formation in formation_data:
    if formation[0].startswith("# "):
        series_name = formation[0][2:]
        json_data[series_name] = {}
    else:
        formation_name = formation.pop(0)
        json_data[series_name][formation_name] = {"cars" : list(filter(lambda car: car != "", formation))}

print("formations.jsonを作成しています...")
try:
    json_f = open("formations.json", "w", encoding="utf-8")
    json.dump(json_data, json_f, ensure_ascii=False, indent=4)
except:
    print("【エラー】formations.jsonの保存に失敗しました")
    sys.exit()

print("処理が完了しました")