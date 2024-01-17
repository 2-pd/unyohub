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

print("データを処理しています...")

for operation_group in operation_data:
    for operation in operation_group["operations"]:
        cur.execute("INSERT INTO `unyohub_operations` (`operation_table`, `operation_number`, `starting_location`, `starting_track`, `first_departure_time`, `terminal_location`, `terminal_track`, `final_arrival_time`) VALUES (:operation_table, :operation_number, :starting_location, :starting_track, :first_departure_time, :terminal_location, :terminal_track, :final_arrival_time)", {"operation_table" : operation_table, "operation_number" : operation["operation_number"], "starting_location" : operation["starting_location"], "starting_track" : operation["starting_track"], "first_departure_time" : operation["trains"][0]["first_departure_time"], "terminal_location" : operation["terminal_location"], "terminal_track" : operation["terminal_track"], "final_arrival_time" : operation["trains"][-1]["final_arrival_time"]})

print("データベースの書き込み処理を完了しています...")
conn.commit()
conn.close()

print("処理が完了しました")