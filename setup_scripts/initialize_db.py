#!/usr/bin/env python3
# coding: utf-8

import sqlite3

print("データベースに接続しています...")

conn = sqlite3.connect("railroad.db")

cur = conn.cursor()

print("テーブルを作成しています...")

cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_formations`(`formation_name` TEXT NOT NULL PRIMARY KEY, `series_name` TEXT NOT NULL, `cars_count` INTEGER NOT NULL, `description` TEXT, `inspection_information` TEXT)")
cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_f1` ON `unyohub_formations`(`series_name`)")

cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_cars`(`formation_name` TEXT NOT NULL, `car_number` TEXT NOT NULL, `car_order` INTEGER NOT NULL, `manufacturer` TEXT, `constructed` TEXT, `description` TEXT, PRIMARY KEY(`formation_name`, `car_number`))")
cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_c1` ON `unyohub_cars`(`formation_name`, `car_order`)")

cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_operations`(`operation_table` TEXT NOT NULL, `operation_number` TEXT NOT NULL, `starting_location` TEXT, `starting_track` TEXT, `first_departure_time` TEXT NOT NULL, `terminal_location` TEXT, `terminal_track` TEXT, `final_arrival_time` TEXT NOT NULL, PRIMARY KEY(`operation_table`, `operation_number`))")
cur.execute("CREATE UNIQUE INDEX IF NOT EXISTS `unyohub_idx_o1` ON `unyohub_operations`(`operation_table`, `starting_location`, `starting_track`)")
cur.execute("CREATE UNIQUE INDEX IF NOT EXISTS `unyohub_idx_o2` ON `unyohub_operations`(`operation_table`, `terminal_location`, `terminal_track`)")

cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_data`(`operation_date` TEXT NOT NULL, `operation_number` TEXT NOT NULL, `user_id` TEXT NOT NULL, `formations` TEXT NOT NULL, `posted_datetime` TEXT NOT NULL, `comment` TEXT, PRIMARY KEY(`operation_date`, `operation_number`, `user_id`))")
cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_d1` ON `unyohub_data`(`user_id`, `posted_datetime`)")
cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_d2` ON `unyohub_data`(`operation_date`, `operation_number`, `posted_datetime`)")

cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_data_caches`(`operation_date` TEXT NOT NULL, `operation_number` TEXT NOT NULL, `formations` TEXT, `posts_count` INTEGER, `variant_exists` INTEGER, `comment_exists` INTEGER, `from_beginner` INTEGER, `updated_datetime` TEXT NOT NULL, PRIMARY KEY(`operation_date`, `operation_number`))")
cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_dc1` ON `unyohub_data_caches`(`formations`, `operation_date`)")
cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_dc2` ON `unyohub_data_caches`(`operation_date`, `updated_datetime`)")

cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_data_each_formation`(`formation_name` TEXT NOT NULL, `operation_date` TEXT NOT NULL, `operation_number` TEXT NOT NULL, PRIMARY KEY(`formation_name`, `operation_date`, `operation_number`))")
cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_df1` ON `unyohub_data_each_formation`(`operation_date`, `operation_number`)")

cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_transition_statistics_same_day`(`operation_table` TEXT NOT NULL, `operation_number` TEXT NOT NULL, `later_operation_number` TEXT NOT NULL, `percentage` REAL NOT NULL, PRIMARY KEY(`operation_table`, `operation_number`, `later_operation_number`))")
cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_ts1` ON `unyohub_transition_statistics_same_day`(`operation_table`, `operation_number`, `percentage`)")
cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_ts2` ON `unyohub_transition_statistics_same_day`(`operation_table`, `later_operation_number`, `percentage`)")

cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_transition_statistics_to_next_day`(`operation_table` TEXT NOT NULL, `next_day_operation_table` TEXT NOT NULL, `operation_number` TEXT NOT NULL, `next_day_operation_number` TEXT NOT NULL, `percentage` REAL NOT NULL, PRIMARY KEY(`operation_table`, `next_day_operation_table`, `operation_number`, `next_day_operation_number`))")
cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_tn1` ON `unyohub_transition_statistics_to_next_day`(`operation_table`, `operation_number`, `percentage`)")
cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_tn2` ON `unyohub_transition_statistics_to_next_day`(`next_day_operation_table`, `next_day_operation_number`, `percentage`)")

cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_transition_data_caches_same_day`(`operation_date` TEXT NOT NULL, `operation_number` TEXT NOT NULL, `later_operation_number` TEXT NOT NULL, PRIMARY KEY(`operation_date`, `operation_number`, `later_operation_number`))")

cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_transition_data_caches_from_previous_day`(`operation_date` TEXT NOT NULL, `previous_day_operation_number` TEXT NOT NULL, `operation_number` TEXT NOT NULL, PRIMARY KEY(`operation_date`, `operation_number`, `previous_day_operation_number`))")

conn.commit()
conn.close()

print("処理が完了しました")
