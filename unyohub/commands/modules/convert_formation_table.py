#!/usr/bin/env python3
# coding: utf-8

import csv
import json
import sqlite3
import time


equipment_symbols = ["<", ">", "◇", "⬠", "≦", "≧"]
equipment_keywords = ["PL", "PG", "PX", "PD", "ZL", "ZG"]

def replace_equipment_symbols (equipment_str):
    global equipment_symbols
    global equipment_keywords
    
    for cnt in range(0, len(equipment_symbols)):
        equipment_str = equipment_str.replace(equipment_symbols[cnt], equipment_keywords[cnt])
    
    return equipment_str


def insert_series_data (mes, cur, series_title, series_name, min_car_count, max_car_count, coupling_group_set):
    mes("   " + series_title + " のデータをまとめています...")
    
    cur.execute("INSERT INTO `unyohub_series_caches`(`series_title`, `series_name`, `min_car_count`, `max_car_count`) VALUES (:series_title, :series_name, :min_car_count, :max_car_count)", {"series_title" : series_title, "series_name" : series_name, "min_car_count" :min_car_count, "max_car_count" : max_car_count})
    
    for coupling_group in list(coupling_group_set):
        cur.execute("INSERT INTO `unyohub_coupling_groups`(`series_or_formation`, `coupling_group`) VALUES (:series_or_formation, :coupling_group)", {"series_or_formation" : series_title, "coupling_group" : coupling_group})


def convert_formation_table (mes, main_dir):
    mes("編成表の変換", is_heading=True)
    
    mes("formations.csvを読み込んでいます...")
    
    with open(main_dir + "/formations.csv", "r", encoding="utf-8-sig") as csv_f:
        csv_reader = csv.reader(csv_f)
        formation_data = [data_row for data_row in csv_reader]
    
    mes("データベースに接続しています...")
    
    conn = sqlite3.connect(main_dir + "/railroad.db")
    cur = conn.cursor()
    
    mes("データベースから以前の車両形式データを削除しています...")
    
    cur.execute("DELETE FROM `unyohub_series_caches`")
    cur.execute("DELETE FROM `unyohub_coupling_groups`")
    
    mes("データを変換しています...")
    
    datetime_now = time.strftime("%Y-%m-%d %H:%M:%S")
    
    formation_list_old = set()
    for row_data in cur.execute("SELECT `formation_name` FROM `unyohub_formations`"):
        formation_list_old.add(row_data[0])
    
    json_data = {"formations" : {}, "series" : {}, "series_names" : []}
    
    cnt = 0
    
    body_colorings = {}
    for coloring in formation_data:
        if coloring[0].startswith("# "):
            break
        
        if len(coloring[0]) >= 1:
            body_colorings[coloring[0]] = {"font_color" : coloring[1]}
            
            stripes = []
            for cnt_2 in range(2, len(coloring)):
                if len(coloring[cnt_2]) == 0:
                    break
                
                stripe_data = coloring[cnt_2].split()
                stripes.append({"color" : stripe_data[0]})
                
                if len(stripe_data) >= 2:
                    start_and_end = stripe_data[1].split("-")
                    
                    stripes[-1]["start"] = int(start_and_end[0])
                    stripes[-1]["end"] = int(start_and_end[1])
                    
                    if len(stripe_data) >= 3 and stripe_data[2] == "V":
                        stripes[-1]["verticalize"] = True
            
            body_colorings[coloring[0]]["base_color"] = stripes.pop(-1)["color"]
            
            if len(stripes) >= 1:
                body_colorings[coloring[0]]["stripes"] = stripes
        
        cnt += 1
    
    if len(body_colorings) >= 1:
        json_data["body_colorings"] = body_colorings
    
    formation_list = set()
    unregistered_formation_list = set()
    car_numbers = set()
    abbr_numbers = set()
    
    series_name = None
    subseries_name = None
    while cnt < len(formation_data):
        formation_name = formation_data[cnt][0].strip()
        
        if len(formation_name) == 0:
            cnt += 1
        elif formation_name.startswith("# "):
            if subseries_name is not None and subseries_max_car_count >= 1:
                insert_series_data(mes, cur, series_name + subseries_name, series_name, subseries_min_car_count, subseries_max_car_count, subseries_coupling_group_set)
            
            if series_name is not None and max_car_count >= 1:
                insert_series_data(mes, cur, series_name, series_name, min_car_count, max_car_count, coupling_group_set)
            
            series_name = formation_name[2:].strip()
            
            mes("・" + series_name + " のデータ処理を開始します...")
            
            json_data["series"][series_name] = {}
            json_data["series_names"].append(series_name)
            
            icon_id = formation_data[cnt + 1][0].strip()
            if len(icon_id) >= 1:
                json_data["series"][series_name]["icon_id"] = icon_id
            
            subseries_name = None
            coupling_group_set = set()
            min_car_count = None
            max_car_count = 0
            
            cnt += 2
        elif formation_name.startswith("## "):
            if subseries_name is not None and subseries_max_car_count >= 1:
                insert_series_data(mes, cur, series_name + subseries_name, series_name, subseries_min_car_count, subseries_max_car_count, subseries_coupling_group_set)
            
            subseries_name = formation_name[3:].strip()
            
            mes("・" + series_name + " " + subseries_name + " のデータを処理しています...")
            
            if "subseries" not in json_data["series"][series_name]:
                json_data["series"][series_name]["subseries"] = {}
                json_data["series"][series_name]["subseries_names"] = []
            
            json_data["series"][series_name]["subseries"][subseries_name] = {"formation_names" : []}
            json_data["series"][series_name]["subseries_names"].append(subseries_name)
            
            icon_id = formation_data[cnt + 1][0].strip()
            if len(icon_id) >= 1:
                json_data["series"][series_name]["subseries"][subseries_name]["icon_id"] = icon_id
            
            subseries_coupling_group_set = set()
            subseries_min_car_count = None
            subseries_max_car_count = 0
            
            cnt += 2
        else:
            if formation_name.startswith("†"):
                formation_name = formation_name[1:].strip()
                
                currently_registered = False
                new_formation_name = None
            elif formation_data[cnt][1].startswith(">"):
                currently_registered = False
                
                new_formation_name_and_railroad_id = formation_data[cnt][1][1:].split("@")
                new_formation_name = new_formation_name_and_railroad_id[0].strip()
                
                if len(new_formation_name_and_railroad_id) == 1:
                    new_railroad_id = None
                else:
                    new_railroad_id = new_formation_name_and_railroad_id[1].strip()
            else: 
                currently_registered = True
                new_formation_name = None
            
            mes("  - " + formation_name + " のデータを処理しています...")
            
            if formation_name in formation_list:
                mes("同一の編成名が複数の編成に設定されています: " + formation_name, True)
            else:
                json_data["formations"][formation_name] = {}
                
                if currently_registered:
                    json_data["formations"][formation_name]["cars"] = []
                    json_data["formations"][formation_name]["series_name"] = series_name
                    json_data["formations"][formation_name]["icon_id"] = formation_data[cnt + 1][0].strip()
                elif new_formation_name is not None:
                    json_data["formations"][formation_name]["new_railroad_id"] = new_railroad_id
                    json_data["formations"][formation_name]["new_formation_name"] = new_formation_name
                
                car_list_old = set()
                for row_data in cur.execute("SELECT `car_number` FROM `unyohub_cars` WHERE `formation_name` = :formation_name", {"formation_name" : formation_name}):
                    car_list_old.add(row_data[0])
                
                car_list = set()
                
                if new_formation_name is None:
                    for cnt_2 in range(1, len(formation_data[cnt])):
                        if formation_data[cnt][cnt_2] != "":
                            car_number = formation_data[cnt][cnt_2].strip()
                            if car_number in car_numbers:
                                mes("《注意》同一の車両番号が複数の車両に設定されています: " + car_number)
                            else:
                                car_numbers.add(car_number)
                            
                            if currently_registered:
                                abbr_number = formation_data[cnt + 1][cnt_2].strip()
                                if abbr_number in abbr_numbers:
                                    mes("《注意》同一の車両番号省略表記が複数の車両に設定されています: " + abbr_number)
                                else:
                                    abbr_numbers.add(abbr_number)
                                
                                json_data["formations"][formation_name]["cars"].append({"car_number" : car_number, "abbr_number" : abbr_number})
                            
                                if len(formation_data[cnt + 2][cnt_2]) >= 1:
                                    json_data["formations"][formation_name]["cars"][-1]["coloring_id"] = formation_data[cnt + 2][cnt_2].strip()
                                
                                equipment = replace_equipment_symbols(formation_data[cnt + 3][cnt_2].upper()).split()
                                if len(equipment) >= 1:
                                    json_data["formations"][formation_name]["cars"][-1]["equipment"] = equipment
                            
                            cur.execute("INSERT INTO `unyohub_cars`(`formation_name`, `car_number`, `car_order`, `manufacturer`, `constructed`, `description`) VALUES (:formation_name, :car_number, :car_order, '', '', '') ON CONFLICT(`formation_name`, `car_number`) DO UPDATE SET `car_order` = :car_order_2", {"formation_name" : formation_name, "car_number" : car_number, "car_order" : cnt_2, "car_order_2" : cnt_2})
                            
                            car_list.add(car_number)
                
                deleted_cars = list(car_list_old - car_list)
                
                for deleted_car_number in deleted_cars:
                    mes("      " + deleted_car_number + " のデータを除外します")
                    cur.execute("UPDATE `unyohub_cars` SET `car_order` = NULL WHERE `formation_name` = :formation_name AND `car_number` = :car_number", {"formation_name" : formation_name, "car_number" : deleted_car_number})
                
                car_count = len(car_list)
                
                cur.execute("INSERT INTO `unyohub_formations`(`formation_name`, `currently_registered`, `series_name`, `subseries_name`, `car_count`, `affiliation`, `caption`, `description`, `semifixed_formation`, `unavailable`, `inspection_information`, `overview_updated`, `updated_datetime`, `edited_user_id`) VALUES (:formation_name, :currently_registered, :series_name, :subseries_name, :car_count, '', '', '', NULL, FALSE, '', :overview_updated, :updated_datetime, NULL) ON CONFLICT(`formation_name`) DO UPDATE SET `currently_registered` = :currently_registered_2, `series_name` = :series_name_2, `subseries_name` = :subseries_name_2, `car_count` = :car_count_2", {"formation_name" : formation_name, "currently_registered" : currently_registered, "series_name" : series_name, "subseries_name" : subseries_name, "car_count" : car_count, "overview_updated" : datetime_now, "updated_datetime" : datetime_now, "currently_registered_2" : currently_registered, "series_name_2" : series_name, "subseries_name_2" : subseries_name, "car_count_2" : car_count})
                
                formation_list.add(formation_name)
                
                if car_count > max_car_count:
                    max_car_count = car_count
                
                if car_count >= 1 and (min_car_count is None or car_count < min_car_count):
                    min_car_count = car_count
                
                if subseries_name is None:
                    if "formation_names" not in json_data["series"][series_name]:
                        json_data["series"][series_name]["formation_names"] = []
                    
                    json_data["series"][series_name]["formation_names"].append(formation_name)
                else:
                    json_data["series"][series_name]["subseries"][subseries_name]["formation_names"].append(formation_name)
                    json_data["formations"][formation_name]["subseries_name"] = subseries_name
                    
                    if car_count > subseries_max_car_count:
                        subseries_max_car_count = car_count
                    
                    if car_count >= 1 and (subseries_min_car_count is None or car_count < subseries_min_car_count):
                        subseries_min_car_count = car_count
                
                if currently_registered:
                    coupling_groups = formation_data[cnt + 2][0].split()
                    for coupling_group in coupling_groups:
                        if len(coupling_group) >= 1:
                            cur.execute("INSERT INTO `unyohub_coupling_groups`(`series_or_formation`, `coupling_group`) VALUES (:series_or_formation, :coupling_group)", {"series_or_formation" : formation_name, "coupling_group" : coupling_group})
                            
                            coupling_group_set.add(coupling_group)
                            
                            if subseries_name is not None:
                                subseries_coupling_group_set.add(coupling_group)
                else:
                    unregistered_formation_list.add(formation_name)
            
            if currently_registered:
                cnt += 4
            else:
                cnt += 1
    
    if subseries_name is not None and subseries_max_car_count >= 1:
        insert_series_data(mes, cur, series_name + subseries_name, series_name, subseries_min_car_count, subseries_max_car_count, subseries_coupling_group_set)
    
    if max_car_count >= 1:
        insert_series_data(mes, cur, series_name, series_name, min_car_count, max_car_count, coupling_group_set)
    
    mes("編成表から除外された編成を検出しています...")
    
    deleted_formations = formation_list_old - formation_list
    uncoupled_formations = set()
    
    for deleted_formation_name in list(deleted_formations | unregistered_formation_list):
        if deleted_formation_name in deleted_formations:
            mes("  - " + deleted_formation_name + " が編成表から除外されました")
        
        for row_data in cur.execute("SELECT `semifixed_formation` FROM `unyohub_formations` WHERE `formation_name` = :formation_name", {"formation_name" : deleted_formation_name}):
            uncoupled_formations.add(row_data[0])
    
    mes("半固定編成の情報を整理しています...")
    
    for uncoupled_formation in list(uncoupled_formations):
        cur.execute("UPDATE `unyohub_formations` SET `semifixed_formation` = NULL, `overview_updated` = :overview_updated WHERE `semifixed_formation` = :semifixed_formation", {"semifixed_formation" : uncoupled_formation, "overview_updated" : datetime_now})
    
    mes("データベースの書き込み処理を完了しています...")
    
    conn.commit()
    conn.close()
    
    mes("formations.jsonを作成しています...")
    try:
        with open(main_dir + "/formations.json", "w", encoding="utf-8") as json_f:
            json.dump(json_data, json_f, ensure_ascii=False, separators=(',', ':'))
    except PermissionError:
        mes("formations.jsonの書き込み権限がありません", True)
    except:
        mes("formations.jsonの作成に失敗しました", True)
    else:
        mes("処理が完了しました")
