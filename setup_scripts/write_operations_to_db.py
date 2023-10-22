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

for operation_group in operation_data:
    for operation in operation_group["operations"]:
        cur.execute("INSERT INTO `unyohub_operations` (`operation_table`, `operation_number`, `starting_location`, `terminal_location`) VALUES (:operation_table, :operation_number, :starting_location, :terminal_location)", {"operation_table" : operation_table, "operation_number" : operation["operation_number"], "starting_location" : operation["starting_location"], "terminal_location" : operation["terminal_location"]})
        
        for train in operation["trains"]:
            if train["train_number"][0:1] != "_" and "__" not in train["train_number"] and train["starting_station"] != train["terminal_station"]:
                cur.execute("INSERT INTO `unyohub_trains` (`operation_table`, `operation_number`, `train_number`, `first_departure_time`, `position_forward`, `position_rear`, `direction`) VALUES (:operation_table, :operation_number, :train_number, :first_departure_time, :position_forward, :position_rear, :direction)", {"operation_table" : operation_table, "operation_number" : operation["operation_number"], "train_number" : train["train_number"], "first_departure_time" : train["first_departure_time"], "position_forward" : train["position_forward"], "position_rear" : train["position_rear"], "direction" : train["direction"]})

print("データベースの書き込み処理を完了しています...")
conn.commit()
conn.close()

print("処理が完了しました")