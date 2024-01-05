#!/usr/bin/env python3
# coding: utf-8

import sqlite3

print("データベースに接続しています...")

conn = sqlite3.connect("railroad.db")

cur = conn.cursor()

print("テーブルを作成しています...")

cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_formations`(`formation_name` TEXT NOT NULL PRIMARY KEY, `series_name` TEXT NOT NULL, `cars_count` INTEGER NOT NULL, `description` TEXT, `inspection_information` TEXT)")
cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_f1` ON `unyohub_formations`(`series_name`)")

cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_cars`(`formation_name` TEXT NOT NULL, `car_number` TEXT NOT NULL, `manufacturer` TEXT, `constructed` TEXT, `description` TEXT, PRIMARY KEY(`formation_name`,`car_number`))")

cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_operations`(`operation_table` TEXT NOT NULL, `operation_number` TEXT NOT NULL, `starting_location` TEXT, `starting_track` TEXT, `terminal_location` TEXT, `terminal_track` TEXT, PRIMARY KEY(`operation_table`,`operation_number`))")
cur.execute("CREATE UNIQUE INDEX IF NOT EXISTS `unyohub_idx_o1` ON `unyohub_operations`(`operation_table`,`starting_location`,`starting_track`)")
cur.execute("CREATE UNIQUE INDEX IF NOT EXISTS `unyohub_idx_o2` ON `unyohub_operations`(`operation_table`,`terminal_location`,`terminal_track`)")

cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_trains`(`operation_table` TEXT NOT NULL, `operation_number` TEXT NOT NULL, `train_number` TEXT NOT NULL, `first_departure_time` TEXT NOT NULL, `position_forward` INTEGER NOT NULL, `position_rear` INTEGER NOT NULL, `direction` INTEGER NOT NULL, PRIMARY KEY(`operation_table`,`operation_number`,`train_number`,`first_departure_time`,`position_forward`))")
cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_t1` ON `unyohub_trains`(`operation_table`,`train_number`,`first_departure_time`,`position_forward`)")

cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_data`(`operation_date` TEXT NOT NULL, `operation_number` TEXT NOT NULL, `user_id` TEXT NOT NULL, `formations` TEXT, `posted_datetime` TEXT, `comment` TEXT, PRIMARY KEY(`operation_date`,`operation_number`,`user_id`))")
cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_d1` ON `unyohub_data`(`user_id`,`posted_datetime`)")
cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_d2` ON `unyohub_data`(`operation_date`,`operation_number`,`posted_datetime`)")

cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_data_caches`(`operation_date` TEXT NOT NULL, `operation_number` TEXT NOT NULL, `formations` TEXT, `variants_count` INTEGER NOT NULL, `comment_exists` INTEGER, `from_beginner` INTEGER, `updated_datetime` TEXT, PRIMARY KEY(`operation_date`,`operation_number`))")
cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_dc1` ON `unyohub_data_caches`(`formations`,`operation_date`)")
cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_dc2` ON `unyohub_data_caches`(`operation_date`,`updated_datetime`)")

conn.commit()
conn.close()

print("処理が完了しました")
