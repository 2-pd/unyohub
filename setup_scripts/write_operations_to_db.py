#!/usr/bin/env python3
# coding: utf-8

import json
import sqlite3

print("データベースに接続しています...")
conn = sqlite3.connect("railroad.db")
cur = conn.cursor()

print("変換対象のダイヤ識別名を入力してください:")

operation_table = input()

with open("operations_" + operation_table + ".json", "r", encoding="utf-8") as json_f:
    operation_data = json.load(json_f)

print("データベースから " + operation_table + " の古いデータを削除しています...")
cur.execute("DELETE FROM `unyohub_operations` WHERE `operation_table` = :operation_table",{"operation_table" : operation_table})
cur.execute("DELETE FROM `unyohub_trains` WHERE `operation_table` = :operation_table", {"operation_table" : operation_table})

print("データを処理しています...")

operation_groups = operation_data.keys()

for operation_group in operation_groups:
    operations = operation_data[operation_group].keys()
    for operation in operations:
        cur.execute("INSERT INTO `unyohub_operations` (`operation_table`, `operation_number`, `starting_location`, `terminal_location`) VALUES (:operation_table, :operation_number, :starting_location, :terminal_location)", {"operation_table" : operation_table, "operation_number" : operation, "starting_location" : operation_data[operation_group][operation]["starting_location"], "terminal_location" : operation_data[operation_group][operation]["terminal_location"]})
        
        trains = operation_data[operation_group][operation]["trains"].keys()
        for train in trains:
            if train[0:1] == "_" or "__" in train:
                continue
            
            for train_data in operation_data[operation_group][operation]["trains"][train]:
                if train_data["starting_station"] != train_data["terminal_station"]:
                    cur.execute("INSERT INTO `unyohub_trains` (`operation_table`, `operation_number`, `train_number`, `first_departure_time`, `position_forward`, `position_rear`, `direction`) VALUES (:operation_table, :operation_number, :train_number, :first_departure_time, :position_forward, :position_rear, :direction)", {"operation_table" : operation_table, "operation_number" : operation, "train_number" : train, "first_departure_time" : train_data["first_departure_time"], "position_forward" : train_data["position_forward"], "position_rear" : train_data["position_rear"], "direction" : train_data["direction"]})

print("データベースの書き込み処理を完了しています...")
conn.commit()
conn.close()

print("処理が完了しました")