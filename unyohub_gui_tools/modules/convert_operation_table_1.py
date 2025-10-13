# coding: utf-8

import os
import csv
import json
import re


def convert_time_style (time_data, with_station_initial=True):
    if with_station_initial:
        time_str = time_data[1:].strip()
    else:
        if time_data == "NA":
            return "NA"
        
        time_str = time_data
    
    if len(time_str) == 0:
        return ""
    
    if ":" not in time_str:
        if int(time_str) >= 300:
            time_str = time_str[:-2] + ":" + time_str[-2:]
        elif len(time_str) >= 3:
            time_str = str(int(time_str[:-2]) + 24) + ":" + time_str[-2:]
        else:
            time_str = "24:" + time_str.zfill(2)
    else:
        time_str_split = time_str.split(":")
        
        if int(time_str_split[0]) <= 2:
            time_str_split[0] = str(int(time_str_split[0]) + 24)
        
        time_str = time_str_split[0] + ":" + time_str_split[1].zfill(2)
    
    if with_station_initial:
        return time_data[0:1] + time_str.zfill(5)
    else:
        return time_str.zfill(5)


def convert_station_name_and_track (station_name):
    if ":" in station_name:
        station_name_and_track = station_name.split(":")
        
        return station_name_and_track[0] + "(" + station_name_and_track[1] + ")"
    else:
        return station_name


def get_train_style (train_name):
    global train_color_regexp_list
    global train_color_list
    
    if "(" in train_name:
        train_name = train_name[:train_name.find("(")]
    
    bg_color = "#000000"
    fg_color = "#ffffff"
    
    for cnt in range(len(train_color_regexp_list)):
        if train_color_regexp_list[cnt].search(train_name) is not None:
            bg_color = train_color_list[cnt]
            
            r = int(bg_color[1:3], 16)
            g = int(bg_color[3:5], 16)
            b = int(bg_color[5:], 16)
            
            if r + g + b >= 383:
                fg_color = "#000000"
            
            break
    
    return {"background-color" : bg_color, "color" : fg_color, "text-align" : "center"}


def get_cell_html (data_str, style_data=None, colspan=1):
    if style_data is not None:
        style_str = " style=\""
        
        for property_name in style_data.keys():
            style_str += property_name + ": " + style_data[property_name] + ";"
        
        style_str += "\""
    else:
        style_str = ""
    
    if colspan >= 2:
        colspan_str = " colspan=\"" + str(colspan) + "\""
    else:
        colspan_str = ""
    
    if len(data_str) >= 1 and data_str[0] != "※" and "(" in data_str:
        bracket_pos = data_str.find("(")
        
        data_str = data_str[:bracket_pos] + "<small>" + data_str[bracket_pos:] + "</small>"
    
    return "<td" + style_str + colspan_str + ">" + data_str + "</td>"


def convert_operation_table_1 (mes, main_dir, file_name, json_file_name, digits_count, file_name_for_printing=None, max_columns=16):
    global train_color_regexp_list
    global train_color_list
    
    if file_name_for_printing is not None:
        mes("運用表を印刷用に変換", is_heading=True)
        
        if max_columns < 6:
            mes("出力する表の列数は6列以上必要です", True)
            return False
        
        for_printing = True
        
        cell_styles = []
        merged_cell_row_indexes = set()
    else:
        mes("運用表の変換(ステップ1)", is_heading=True)
        
        for_printing = False
    
    error_occurred = False
    
    mes("railroad_info.json を読み込んでいます...")
    with open(main_dir + "/railroad_info.json", "r", encoding="utf-8") as json_f:
        railroad_info = json.load(json_f)
    
    if for_printing:
        train_color_regexp_list = []
        train_color_list = []
        
        for train_color_rule in railroad_info["train_color_rules"]:
            train_color_regexp_list.append(re.compile(train_color_rule["pattern"]))
            train_color_list.append(train_color_rule["color"])
    
    lines = railroad_info["lines_order"]
    
    if "joined_lines_order" in railroad_info:
        lines += railroad_info["joined_lines_order"]
    
    station_list = {}
    station_list_r = {}
    for line in lines:
        station_list[line] = railroad_info["lines"][line]["stations"]
        station_list_r[line] = list(reversed(station_list[line]))
    
    station_name_list = {}
    station_name_list_r = {}
    for line in lines:
        station_name_list[line] = []
        
        for station in railroad_info["lines"][line]["stations"]:
            station_name_list[line].append(station["station_name"])
        
        station_name_list_r[line] = list(reversed(station_name_list[line]))
    
    mes(os.path.basename(json_file_name) + " を読み込んでいます...")
    with open(json_file_name, "r", encoding="utf-8") as json_f:
        timetable = json.load(json_f)
    
    mes("時刻表データを整理しています...")
    
    train_number_list = {}
    for line in lines:
        for direction in ["inbound", "outbound"]:
            stations = railroad_info["lines"][line]["stations"]
            
            if direction == "inbound":
                stations = list(reversed(stations))
            
            train_numbers = timetable[line][direction + "_trains"].keys()
            
            for train_number in train_numbers:
                if train_number not in train_number_list:
                    train_number_list[train_number] = {}
                
                for train_data in timetable[line][direction + "_trains"][train_number]:
                    starting_station_index = None
                    
                    for cnt in range(len(train_data["departure_times"])):
                        if train_data["departure_times"][cnt] is not None:
                            terminal_station_index = cnt
                            final_arrival_time = train_data["departure_times"][cnt]
                            
                            if starting_station_index is None:
                                starting_station_index = cnt
                                first_departure_time = train_data["departure_times"][cnt]
                    
                    if "station_initial" not in stations[starting_station_index]:
                        mes("省略表記の登録されていない始発駅が時刻表で検出されました: " + train_number, True)
                        error_occurred = True
                        continue
                    
                    if "station_initial" not in stations[terminal_station_index]:
                        mes("省略表記の登録されていない終着駅が時刻表で検出されました: " + train_number, True)
                        error_occurred = True
                        continue
                    
                    if first_departure_time.startswith("|"):
                        first_departure_time = first_departure_time[1:]
                    
                    train_number_list[train_number][first_departure_time] = [
                            stations[starting_station_index]["station_initial"] + first_departure_time[-5:],
                            stations[terminal_station_index]["station_initial"] + final_arrival_time[-5:]
                        ]
    
    if error_occurred:
        mes("エラー発生のため処理が中断されました")
        return False
    
    mes(os.path.basename(file_name) + " を読み込んでいます...")
    with open(file_name, "r", encoding="utf-8-sig") as csv_f:
        csv_reader = csv.reader(csv_f)
        operations = [data_row for data_row in csv_reader]
    
    mes("データを変換しています...")
    
    color_regexp = re.compile("^#[0-9A-Fa-f]{6}$")
    
    output_data = []
    train_list = []
    for operation in operations:
        if len(operation[0].strip()) == 0:
            continue
        
        if operation[0].startswith("# ") or operation[0].startswith("◆"):
            if len(operation) >= 2 and color_regexp.match(operation[1]) is not None:
                color = operation[1]
            else:
                color = "#ffffff"
            
            if for_printing:
                output_data.append(["◆" + operation[0][1:].strip()])
                merged_cell_row_indexes.add(len(output_data) - 1)
                
                output_data.append(["運用番号", "出庫", "入庫", "", "列車"] + [""] * (max_columns - 5))
                
                cell_styles.append([{"background-color" : color, "font-weight" : "bold"}])
                cell_styles.append([{"font-size" : "small", "text-align" : "center"}, {"font-size" : "small", "text-align" : "center"}, {"font-size" : "small", "text-align" : "center"}] + ([{"font-size" : "small"}] * (max_columns - 3)))
            else:
                output_data.append(["# " + operation[0][1:].strip()])
        elif operation[0].startswith("* ") or operation[0].startswith("※"):
            if for_printing:
                output_data[-1] = ["※ " + operation[0][1:].strip()]
                merged_cell_row_indexes.add(len(output_data) - 1)
                
                output_data.append([""] * max_columns)
                cell_styles.append([None] * max_columns)
            else:
                output_data[-1].append(operation[0][1:].strip())
        else:
            if len(operation[1].strip()) == 0:
                mes("・両数が指定されていません: " + operation[0])
            
            if for_printing:
                if operation[0][0] == "@":
                    operation[0] = operation[0][1:]
                
                output_row_1 = [operation[0], convert_station_name_and_track(operation[2]), convert_station_name_and_track(operation[4]), ""]
                output_row_2 = ["所定" + operation[1].split("(")[0] + "両", operation[3].strip(), operation[5].strip(), ""]
                output_row_3 = ["", "", "", ""]
                
                output_cell_styles_1 = [{"background-color" : color, "font-weight" : "bold"}, {"text-align" : "center"}, {"text-align" : "center"}, None]
                output_cell_styles_2 = [None, {"text-align" : "center"}, {"text-align" : "center"}, None]
                output_cell_styles_3 = [None, None, None, None]
            else:
                output_row_1 = [operation[0], operation[2], operation[4]]
                output_row_2 = [operation[1], convert_time_style(operation[3], False), convert_time_style(operation[5], False)]
                output_row_3 = [color, "", ""]
            
            previous_train_name = None
            
            for train_cell in operation[6:]:
                train_cell = train_cell.strip()
                
                if train_cell.startswith("."):
                    if previous_train_name is None or previous_train_name.startswith("."):
                        mes("《注意》無効な留置指定「" + train_cell + "」をスキップします")
                        continue
                    
                    output_row_1.append(train_cell)
                    output_row_2.append("")
                    output_row_3.append("")
                    
                    if for_printing:
                        output_row_1[-1] = output_row_1[-1][1:]
                        
                        output_cell_styles_1.append({"text-align" : "center", "font-style" : "italic"})
                        output_cell_styles_2.append(None)
                        output_cell_styles_3.append(None)
                    
                    previous_train_name = train_cell
                elif train_cell != "" and train_cell != "○" and train_cell != "△":
                    train_time = train_cell.split("[")
                    
                    train_name_car_count = train_time[0].split("(")
                    if train_name_car_count[0][0:1] != "?":
                        train_name = train_name_car_count[0].zfill(digits_count)
                    else:
                        train_name = train_name_car_count[0]
                    
                    if len(train_name_car_count) == 2:
                        car_count = "(" + train_name_car_count[1]
                    else:
                        car_count = ""
                    
                    if len(train_time) == 2:
                        if "-" not in train_time[1]:
                            mes("時刻の指定が異常です: " + train_name, True)
                            error_occurred = True
                            continue
                        
                        train_rows = train_time[1][:-1].split("-")
                        
                        if len(train_rows[0]) == 1 and len(train_rows[1]) == 1:
                            if train_name not in train_number_list:
                                mes("《注意》時刻表にない列車 " + train_name + " をスキップします")
                                continue
                            
                            first_departure_times = list(train_number_list[train_name].keys())
                            first_departure_times.sort()
                            
                            within_segment = False
                            for first_departure_time in first_departure_times:
                                if train_number_list[train_name][first_departure_time][0][0] == train_rows[0] or within_segment:
                                    if not for_printing or not within_segment:
                                        output_row_1.append(train_name + car_count)
                                        output_row_2.append(train_number_list[train_name][first_departure_time][0])
                                        output_row_3.append(train_number_list[train_name][first_departure_time][1])
                                    else:
                                        output_row_3[-1] = train_number_list[train_name][first_departure_time][1]
                                    
                                    if train_number_list[train_name][first_departure_time][1][0] == train_rows[1]:
                                        break
                                    
                                    within_segment = True
                        else:
                            if for_printing and train_name[0] == "?":
                                train_name = train_name[1:]
                            
                            output_row_1.append(train_name + car_count)
                            output_row_2.append(convert_time_style(train_rows[0]))
                            output_row_3.append(convert_time_style(train_rows[1]))
                        
                        if for_printing:
                            output_cell_styles_1.append(get_train_style(train_name))
                            output_cell_styles_2.append(None)
                            output_cell_styles_3.append(None)
                    else:
                        if train_name not in train_number_list:
                            mes("《注意》時刻表にない列車 " + train_name + " をスキップします")
                            continue
                        
                        first_departure_times = list(train_number_list[train_name].keys())
                        first_departure_times.sort()
                        
                        if not for_printing:
                            for first_departure_time in first_departure_times:
                                output_row_1.append(train_name + car_count)
                                output_row_2.append(train_number_list[train_name][first_departure_time][0])
                                output_row_3.append(train_number_list[train_name][first_departure_time][1])
                        else:
                            if train_name[0] == "?":
                                train_name = train_name[1:]
                            
                            output_row_1.append(train_name + car_count)
                            output_row_2.append(train_number_list[train_name][first_departure_times[0]][0])
                            output_row_3.append(train_number_list[train_name][first_departure_times[-1]][1])
                            
                            output_cell_styles_1.append(get_train_style(train_name))
                            output_cell_styles_2.append({"text-align" : "center"})
                            output_cell_styles_3.append({"text-align" : "center"})
                        
                        if train_name + car_count in train_list:
                            mes("同一列車の同一組成位置が複数の運用に割り当てられています: " + train_name + car_count, True)
                            error_occurred = True
                        else:
                            train_list.append(train_name + car_count)
                    
                    previous_train_name = train_name
            
            if output_row_1[-1].startswith("."):
                mes("《注意》無効な留置指定「" + output_row_1[-1] + "」を除外します")
                
                del output_row_1[-1]
                del output_row_2[-1]
                del output_row_3[-1]
            
            if len(output_row_2[1]) == 0:
                if for_printing:
                    if len(output_row_2) >= 5:
                        output_row_2[1] = output_row_2[4][1:]
                    else:
                        mes("出庫時刻が認識できません: " + output_row_1[0], True)
                        error_occurred = True
                else:
                    if len(output_row_2) >= 4:
                        output_row_2[1] = output_row_2[3][1:]
                    else:
                        mes("出庫時刻が認識できません: " + output_row_1[0], True)
                        error_occurred = True
            else:
                output_row_2[1] = convert_time_style(output_row_2[1], False)
            
            if len(output_row_2[2]) == 0:
                if len(output_row_2) >= 4:
                    output_row_2[2] = output_row_3[-1][1:]
                else:
                    mes("入庫時刻が認識できません: " + output_row_1[0], True)
                    error_occurred = True
            else:
                output_row_2[2] = convert_time_style(output_row_2[2], False)
            
            if for_printing:
                while True:
                    if len(output_row_1) <= max_columns:
                        empty_cells = [""] * (max_columns - len(output_row_1))
                        
                        output_row_1 += empty_cells
                        output_row_2 += empty_cells
                        output_row_3 += empty_cells
                        
                        none_cells = [None] * len(empty_cells)
                        
                        output_cell_styles_1 += none_cells
                        output_cell_styles_2 += none_cells
                        output_cell_styles_3 += none_cells
                        
                        break
                    
                    output_data.append(output_row_1[0:max_columns])
                    output_data.append(output_row_2[0:max_columns])
                    output_data.append(output_row_3[0:max_columns])
                    
                    output_row_1 = ["", "", "", ""] + output_row_1[max_columns:]
                    output_row_2 = ["", "", "", ""] + output_row_2[max_columns:]
                    output_row_3 = ["", "", "", ""] + output_row_3[max_columns:]
                    
                    cell_styles.append(output_cell_styles_1[0:max_columns])
                    cell_styles.append(output_cell_styles_2[0:max_columns])
                    cell_styles.append(output_cell_styles_3[0:max_columns])
                    
                    output_cell_styles_1 = [None, None, None, None] + output_cell_styles_1[max_columns:]
                    output_cell_styles_2 = [None, None, None, None] + output_cell_styles_2[max_columns:]
                    output_cell_styles_3 = [None, None, None, None] + output_cell_styles_3[max_columns:]
            
            output_data.append(output_row_1)
            output_data.append(output_row_2)
            output_data.append(output_row_3)
            output_data.append([])
            
            if for_printing:
                output_data[-1] = [""] * max_columns
                
                cell_styles.append(output_cell_styles_1)
                cell_styles.append(output_cell_styles_2)
                cell_styles.append(output_cell_styles_3)
                cell_styles.append([None] * max_columns)
    
    if error_occurred:
        mes("エラー発生のため処理が中断されました")
        return False
    
    if for_printing:
        new_file_name = file_name_for_printing
    else:
        new_file_name = file_name[:-4] + "_unyohub-format.csv"
    
    mes("データを " + os.path.basename(new_file_name) + " に書き込んでいます...")
    
    with open(new_file_name, "w", encoding="utf-8-sig") as csv_f:
        if for_printing:
            csv_f.write("<table style=\"border-collapse: collapse;\">\n")
            
            for cnt in range(len(output_data)):
                csv_f.write("<tr>")
                
                if cnt in merged_cell_row_indexes:
                    csv_f.write(get_cell_html(output_data[cnt][0], cell_styles[cnt][0], max_columns))
                else:
                    for cnt_2 in range(max_columns):
                        csv_f.write(get_cell_html(output_data[cnt][cnt_2], cell_styles[cnt][cnt_2]))
                
                csv_f.write("</tr>\n")
                
            csv_f.write("</table>\n")
        else:
            csv_writer = csv.writer(csv_f, lineterminator="\n")
            csv_writer.writerows(output_data)
    
    mes("処理が完了しました")
    
    return new_file_name
