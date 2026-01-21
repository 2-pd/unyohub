#!/usr/bin/env python3
# coding: utf-8

import os
import sqlite3
import time

def copy_formation_info (mes, source_main_dir, source_formation_name, target_main_dir, target_formation_name=None):
    mes("編成データをデータベース上でコピー", is_heading=True)
    
    
    if not os.path.isdir(source_main_dir):
        mes("コピー元として指定された路線系統は存在しません", True)
        return
    
    if not os.path.isdir(target_main_dir):
        mes("コピー先として指定された路線系統は存在しません", True)
        return
    
    if target_formation_name is None:
        target_formation_name = source_formation_name
    
    
    mes("コピー元のデータベースに接続しています...")
    
    conn = sqlite3.connect(source_main_dir + "/railroad.db")
    cur = conn.cursor()
    
    mes(source_formation_name + " の編成データを抽出しています...")
    
    cur.execute("SELECT `series_name`, `subseries_name`, `prefix`, `car_count`, `affiliation`, `caption`, `description`, `inspection_information` FROM `unyohub_formations` WHERE `formation_name` = :formation_name", {"formation_name" : source_formation_name})
    formation_data = cur.fetchone()
    
    cur.execute("SELECT `car_number`, `manufacturer`, `constructed`, `description` FROM `unyohub_cars` WHERE `formation_name` = :formation_name", {"formation_name" : source_formation_name})
    cars_data = cur.fetchall()
    
    cur.execute("SELECT `record_number`, `event_year_month`, `event_type`, `event_content` FROM `unyohub_formation_histories` WHERE `formation_name` = :formation_name", {"formation_name" : source_formation_name})
    histories_data = cur.fetchall()
    
    cur.execute("SELECT `record_number`, `car_number` FROM `unyohub_car_histories` WHERE `formation_name` = :formation_name", {"formation_name" : source_formation_name})
    car_histories_data = cur.fetchall()
    
    cur.execute("SELECT `unyohub_reference_books`.`publisher_name`, `unyohub_reference_books`.`book_title`, `unyohub_reference_books`.`authors`, `unyohub_reference_books`.`publication_year` FROM `unyohub_formation_reference_books`, `unyohub_reference_books` WHERE `unyohub_formation_reference_books`.`formation_name` = :formation_name AND `unyohub_formation_reference_books`.`publisher_name` = `unyohub_reference_books`.`publisher_name` AND `unyohub_formation_reference_books`.`book_title` = `unyohub_reference_books`.`book_title`", {"formation_name" : source_formation_name})
    reference_books = cur.fetchall()
    
    conn.close()
    
    
    mes("コピー先のデータベースに接続しています...")
    
    conn = sqlite3.connect(target_main_dir + "/railroad.db")
    cur = conn.cursor()
    
    mes(target_formation_name + " の編成データを書き込んでいます...")
    
    datetime_now = time.strftime("%Y-%m-%d %H:%M:%S")
    
    cur.execute("INSERT INTO `unyohub_formations`(`formation_name`, `currently_registered`, `series_name`, `subseries_name`, `prefix`, `car_count`, `affiliation`, `caption`, `description`, `semifixed_formation`, `unavailable`, `inspection_information`, `overview_updated`, `updated_datetime`, `edited_user_id`) VALUES (:formation_name, 0, :series_name, :subseries_name, :prefix, :car_count, :affiliation, :caption, :description, NULL, NULL, :inspection_information, :overview_updated, :updated_datetime, NULL) ON CONFLICT (`formation_name`) DO UPDATE SET `affiliation` = :affiliation_2, `caption` = :caption_2, `description` = :description_2, `inspection_information` = :inspection_information_2, `overview_updated` = :overview_updated_2, `updated_datetime` = :updated_datetime_2, `edited_user_id` = NULL", {"formation_name" : target_formation_name, "series_name" : formation_data[0], "subseries_name" : formation_data[1], "prefix" : formation_data[2], "car_count" : formation_data[3], "affiliation" : formation_data[4], "caption" : formation_data[5], "description" : formation_data[6], "inspection_information" : formation_data[7], "overview_updated" : datetime_now, "updated_datetime" : datetime_now, "affiliation_2" : formation_data[4], "caption_2" : formation_data[5], "description_2" : formation_data[6], "inspection_information_2" : formation_data[7], "overview_updated_2" : datetime_now, "updated_datetime_2" : datetime_now})
    
    for car_data in cars_data:
        cur.execute("INSERT INTO `unyohub_cars`(`formation_name`, `car_number`, `car_order`, `manufacturer`, `constructed`, `description`) VALUES (:formation_name, :car_number, NULL, :manufacturer, :constructed, :description) ON CONFLICT(`formation_name`, `car_number`) DO UPDATE SET `manufacturer` = :manufacturer_2, `constructed` = :constructed_2, `description` = :description_2", {"formation_name" : target_formation_name, "car_number" : car_data[0], "manufacturer" : car_data[1], "constructed" : car_data[2], "description" : car_data[3], "manufacturer_2" : car_data[1], "constructed_2" : car_data[2], "description_2" : car_data[3]})
    
    cur.execute("DELETE FROM `unyohub_formation_histories` WHERE `formation_name` = :formation_name", {"formation_name" : target_formation_name})
    cur.execute("DELETE FROM `unyohub_car_histories` WHERE `formation_name` = :formation_name", {"formation_name" : target_formation_name})
    
    for history_data in histories_data:
        cur.execute("INSERT INTO `unyohub_formation_histories`(`formation_name`, `record_number`, `event_year_month`, `event_type`, `event_content`) VALUES (:formation_name, :record_number, :event_year_month, :event_type, :event_content)", {"formation_name" : target_formation_name, "record_number" : history_data[0], "event_year_month" : history_data[1], "event_type" : history_data[2], "event_content" : history_data[3]})
    
    for car_history_data in car_histories_data:
        cur.execute("INSERT INTO `unyohub_car_histories`(`formation_name`, `record_number`, `car_number`) VALUES (:formation_name, :record_number, :car_number)", {"formation_name" : target_formation_name, "record_number" : car_history_data[0], "car_number" : car_history_data[1]})
    
    for reference_book in reference_books:
        cur.execute("REPLACE INTO `unyohub_formation_reference_books`(`formation_name`, `publisher_name`, `book_title`) VALUES (:formation_name, :publisher_name, :book_title)", {"formation_name" : target_formation_name, "publisher_name" : reference_book[0], "book_title" : reference_book[1]})
        
        cur.execute("SELECT COUNT(*) FROM `unyohub_reference_books` WHERE `publisher_name` = :publisher_name AND `book_title` = :book_title", {"publisher_name" : reference_book[0], "book_title" : reference_book[1]})
        if cur.fetchone()[0] == 0:
            cur.execute("INSERT INTO `unyohub_reference_books`(`publisher_name`, `book_title`, `authors`, `publication_year`) VALUES (:publisher_name, :book_title, :authors, :publication_year)", {"publisher_name" : reference_book[0], "book_title" : reference_book[1], "authors" : reference_book[2], "publication_year" : reference_book[3]})
    
    mes("データベースの書き込み処理を完了しています...")
    
    conn.commit()
    conn.close()
    
    
    mes("全ての処理が完了しました")
