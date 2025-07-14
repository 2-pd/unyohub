#!/usr/bin/env python3
# coding: utf-8

import sqlite3
import time

def copy_formation_info (mes, source_main_dir, source_formation_name, target_main_dir, target_formation_name=None):
    mes("編成データをデータベース上でコピー", is_heading=True)
    
    if target_formation_name is None:
        target_formation_name = source_formation_name
    
    
    mes("コピー元のデータベースに接続しています...")
    
    conn = sqlite3.connect(source_main_dir + "/railroad.db")
    cur = conn.cursor()
    
    mes(source_formation_name + " の編成データを抽出しています...")
    
    cur.execute("SELECT `series_name`, `subseries_name`, `car_count`, `affiliation`, `caption`, `description`, `inspection_information` FROM `unyohub_formations` WHERE `formation_name` = :formation_name", {"formation_name" : source_formation_name})
    formation_data = cur.fetchone()
    
    cur.execute("SELECT `car_number`, `manufacturer`, `constructed`, `description` FROM `unyohub_cars` WHERE `formation_name` = :formation_name", {"formation_name" : source_formation_name})
    cars_data = cur.fetchall()
    
    cur.execute("SELECT `event_year_month`, `event_type`, `event_content` FROM `unyohub_formation_histories` WHERE `formation_name` = :formation_name", {"formation_name" : source_formation_name})
    histories_data = cur.fetchall()
    
    conn.close()
    
    
    mes("コピー先のデータベースに接続しています...")
    
    conn = sqlite3.connect(target_main_dir + "/railroad.db")
    cur = conn.cursor()
    
    mes(target_formation_name + " の編成データを書き込んでいます...")
    
    datetime_now = time.strftime("%Y-%m-%d %H:%M:%S")
    
    cur.execute("INSERT INTO `unyohub_formations`(`formation_name`, `currently_registered`, `series_name`, `subseries_name`, `car_count`, `affiliation`, `caption`, `description`, `semifixed_formation`, `unavailable`, `inspection_information`, `overview_updated`, `updated_datetime`, `edited_user_id`) VALUES (:formation_name, 0, :series_name, :subseries_name, :car_count, :affiliation, :caption, :description, NULL, NULL, :inspection_information, :overview_updated, :updated_datetime, NULL) ON CONFLICT (`formation_name`) DO UPDATE SET `affiliation` = :affiliation_2, `caption` = :caption_2, `description` = :description_2, `inspection_information` = :inspection_information_2, `overview_updated` = :overview_updated_2, `updated_datetime` = :updated_datetime_2, `edited_user_id` = NULL", {"formation_name" : target_formation_name, "series_name" : formation_data[0], "subseries_name" : formation_data[1], "car_count" : formation_data[2], "affiliation" : formation_data[3], "caption" : formation_data[4], "description" : formation_data[5], "inspection_information" : formation_data[6], "overview_updated" : datetime_now, "updated_datetime" : datetime_now, "affiliation_2" : formation_data[3], "caption_2" : formation_data[4], "description_2" : formation_data[5], "inspection_information_2" : formation_data[6], "overview_updated_2" : datetime_now, "updated_datetime_2" : datetime_now})
    
    for car_data in cars_data:
        cur.execute("INSERT INTO `unyohub_cars`(`formation_name`, `car_number`, `car_order`, `manufacturer`, `constructed`, `description`) VALUES (:formation_name, :car_number, NULL, :manufacturer, :constructed, :description) ON CONFLICT(`formation_name`, `car_number`) DO UPDATE SET `manufacturer` = :manufacturer_2, `constructed` = :constructed_2, `description` = :description_2", {"formation_name" : target_formation_name, "car_number" : car_data[0], "manufacturer" : car_data[1], "constructed" : car_data[2], "description" : car_data[3], "manufacturer_2" : car_data[1], "constructed_2" : car_data[2], "description_2" : car_data[3]})
    
    cur.execute("DELETE FROM `unyohub_formation_histories` WHERE `formation_name` = :formation_name", {"formation_name" : target_formation_name})
    
    for history_data in histories_data:
        cur.execute("INSERT INTO `unyohub_formation_histories`(`formation_name`, `event_year_month`, `event_type`, `event_content`) VALUES (:formation_name, :event_year_month, :event_type, :event_content)", {"formation_name" : target_formation_name, "event_year_month" : history_data[0], "event_type" : history_data[1], "event_content" : history_data[2]})
    
    mes("データベースの書き込み処理を完了しています...")
    
    conn.commit()
    conn.close()
    
    
    mes("全ての処理が完了しました")
