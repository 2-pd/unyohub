# coding: utf-8

import sqlite3

def initialize_db (mes, main_dir):
    mes("データベースのセットアップ", is_heading=True)
    
    mes("データベースに接続しています...")
    
    conn = sqlite3.connect(main_dir + "/railroad.db")
    
    cur = conn.cursor()
    
    mes("テーブル「unyohub_series」を作成しています...")
    cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_series`(`series_name` TEXT NOT NULL PRIMARY KEY, `min_car_count` INTEGER NOT NULL, `max_car_count` INTEGER NOT NULL)")
    
    mes("テーブル「unyohub_formations」を作成しています...")
    cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_formations`(`formation_name` TEXT NOT NULL PRIMARY KEY, `series_name` TEXT NOT NULL, `car_count` INTEGER NOT NULL, `affiliation` TEXT, `caption` TEXT, `description` TEXT, `unavailable` INTEGER NOT NULL, `inspection_information` TEXT, `overview_updated` TEXT NOT NULL, `updated_datetime` TEXT NOT NULL, `edited_user_id` TEXT)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_f1` ON `unyohub_formations`(`series_name`)")
    
    mes("テーブル「unyohub_cars」を作成しています...")
    cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_cars`(`formation_name` TEXT NOT NULL, `car_number` TEXT NOT NULL, `car_order` INTEGER NOT NULL, `manufacturer` TEXT, `constructed` TEXT, `description` TEXT, PRIMARY KEY(`formation_name`, `car_number`))")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_c1` ON `unyohub_cars`(`formation_name`, `car_order`)")
    
    mes("テーブル「unyohub_formation_histories」を作成しています...")
    cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_formation_histories`(`formation_name` TEXT NOT NULL, `event_year_month` TEXT NOT NULL, `event_type` TEXT NOT NULL, `event_content` TEXT)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_fh1` ON `unyohub_formation_histories`(`formation_name`, `event_year_month`)")
    
    mes("テーブル「unyohub_coupling_groups」を作成しています...")
    cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_coupling_groups`(`series_or_formation` TEXT NOT NULL, `coupling_group` TEXT NOT NULL, PRIMARY KEY(`series_or_formation`, `coupling_group`))")
    
    mes("テーブル「unyohub_operations」を作成しています...")
    cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_operations`(`diagram_revision` TEXT NOT NULL, `diagram_id` TEXT NOT NULL, `operation_number` TEXT NOT NULL, `starting_location` TEXT, `starting_track` TEXT, `starting_time` TEXT NOT NULL, `terminal_location` TEXT, `terminal_track` TEXT, `ending_time` TEXT NOT NULL, `min_car_count` INTEGER NOT NULL, `max_car_count` INTEGER NOT NULL, PRIMARY KEY(`diagram_revision`, `diagram_id`, `operation_number`))")
    cur.execute("CREATE UNIQUE INDEX IF NOT EXISTS `unyohub_idx_o1` ON `unyohub_operations`(`diagram_revision`, `diagram_id`, `starting_location`, `starting_track`)")
    cur.execute("CREATE UNIQUE INDEX IF NOT EXISTS `unyohub_idx_o2` ON `unyohub_operations`(`diagram_revision`, `diagram_id`, `terminal_location`, `terminal_track`)")
    
    mes("テーブル「unyohub_trains」を作成しています...")
    cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_trains`(`diagram_revision` TEXT NOT NULL, `diagram_id` TEXT NOT NULL, `operation_number` TEXT NOT NULL, `train_number` TEXT NOT NULL, `first_departure_time` TEXT NOT NULL, `final_arrival_time` TEXT NOT NULL, PRIMARY KEY(`diagram_revision`, `diagram_id`, `operation_number`, `train_number`))")
    
    mes("テーブル「unyohub_data」を作成しています...")
    cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_data`(`operation_date` TEXT NOT NULL, `operation_number` TEXT NOT NULL, `user_id` TEXT NOT NULL, `train_number` TEXT, `formations` TEXT NOT NULL, `is_quotation` INTEGER, `posted_datetime` TEXT NOT NULL, `comment` TEXT, `ip_address` TEXT, PRIMARY KEY(`operation_date`, `operation_number`, `user_id`))")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_d1` ON `unyohub_data`(`user_id`, `posted_datetime`)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_d2` ON `unyohub_data`(`operation_date`, `operation_number`, `posted_datetime`)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_d3` ON `unyohub_data`(`ip_address`, `posted_datetime`)")
    
    mes("テーブル「unyohub_data_caches」を作成しています...")
    cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_data_caches`(`operation_date` TEXT NOT NULL, `operation_number` TEXT NOT NULL, `formations` TEXT, `posts_count` INTEGER, `variant_exists` INTEGER, `comment_exists` INTEGER, `from_beginner` INTEGER, `is_quotation` INTEGER, `updated_datetime` TEXT NOT NULL, PRIMARY KEY(`operation_date`, `operation_number`))")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_dc1` ON `unyohub_data_caches`(`formations`, `operation_date`)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_dc2` ON `unyohub_data_caches`(`operation_date`, `updated_datetime`)")
    
    mes("テーブル「unyohub_data_each_formation」を作成しています...")
    cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_data_each_formation`(`formation_name` TEXT NOT NULL, `operation_date` TEXT NOT NULL, `operation_number` TEXT NOT NULL, PRIMARY KEY(`formation_name`, `operation_date`, `operation_number`))")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_df1` ON `unyohub_data_each_formation`(`operation_date`, `operation_number`)")
    
    mes("変更を保存しています...")
    conn.commit()
    conn.close()
    
    mes("処理が完了しました")
