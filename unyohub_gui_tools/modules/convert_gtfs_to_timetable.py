# coding: utf-8

import copy
import csv

def convert_gtfs_to_timetable (mes, main_dir, diagram_revision):
    mes("GTFSデータから時刻表を生成", is_heading=True)
    
    
    dir_path = main_dir + "/" + diagram_revision + "/"
    
    
    mes("stops_inbound.csv を読み込んでいます...")
    with open(dir_path + "stops_inbound.csv", "r", encoding="utf-8-sig") as csv_f:
        csv_reader = csv.reader(csv_f)
        stops_inbound = [data_row for data_row in csv_reader]
    
    mes("stops_outbound.csv を読み込んでいます...")
    with open(dir_path + "stops_outbound.csv", "r", encoding="utf-8-sig") as csv_f:
        csv_reader = csv.reader(csv_f)
        stops_outbound = [data_row for data_row in csv_reader]
    
    
    mes("trips.txtを読み込んでいます...")
    with open(dir_path + "trips.txt", "r", encoding="utf-8-sig") as csv_f:
        dict_reader = csv.DictReader(csv_f)
        trips = [data_row for data_row in dict_reader]
    
    mes("stop_times.txtを読み込んでいます...")
    with open(dir_path + "stop_times.txt", "r", encoding="utf-8-sig") as csv_f:
        dict_reader = csv.DictReader(csv_f)
        stop_times = [data_row for data_row in dict_reader]
    
    
    mes("停留場情報を整理しています...")
    
    inbound_timetable_t = [["", "", ""], ["", "", ""]]
    outbound_timetable_t = [["", "", ""], ["", "", ""]]
    
    lines_inbound = []
    stop_info_inbound = {}
    last_departure_time_indexes = {}
    for stop_info in stops_inbound:
        stop_info_inbound[stop_info[0]] = { "stop_name" : stop_info[1], "row_index" : len(inbound_timetable_t[0]) }
        
        line_ids = []
        for line_id in stop_info[2].split():
            if line_id not in lines_inbound:
                lines_inbound.append(line_id)
            else:
                line_ids.append(line_id)
            
            last_departure_time_indexes[line_id] = len(inbound_timetable_t[1])
        
        inbound_timetable_t[0].append(stop_info[1] + "[着]")
        inbound_timetable_t[1].append(" ".join(line_ids))
        inbound_timetable_t[0].append(stop_info[1] + "[発]")
        inbound_timetable_t[1].append(stop_info[2])
    
    inbound_timetable_t[0][0] = " ".join(lines_inbound)
    inbound_timetable_t[0].append("")
    inbound_timetable_t[1].append("")
    
    for line_id in last_departure_time_indexes.keys():
        line_ids = inbound_timetable_t[1][last_departure_time_indexes[line_id] + 1].split()
        line_ids.remove(line_id)
        inbound_timetable_t[1][last_departure_time_indexes[line_id] + 1] = " ".join(line_ids)
    
    lines_outbound = []
    stop_info_outbound = {}
    last_departure_time_indexes = {}
    for stop_info in stops_outbound:
        stop_info_outbound[stop_info[0]] = { "stop_name" : stop_info[1], "row_index" : len(outbound_timetable_t[0]) }
        
        line_ids = []
        for line_id in stop_info[2].split():
            if line_id not in lines_outbound:
                lines_outbound.append(line_id)
            else:
                line_ids.append(line_id)
            
            last_departure_time_indexes[line_id] = len(outbound_timetable_t[1])
        
        outbound_timetable_t[0].append(stop_info[1] + "[着]")
        outbound_timetable_t[1].append(" ".join(line_ids))
        outbound_timetable_t[0].append(stop_info[1] + "[発]")
        outbound_timetable_t[1].append(stop_info[2])
    
    outbound_timetable_t[0][0] = " ".join(lines_outbound)
    outbound_timetable_t[0].append("")
    outbound_timetable_t[1].append("")
    
    for line_id in last_departure_time_indexes.keys():
        line_ids = outbound_timetable_t[1][last_departure_time_indexes[line_id] + 1].split()
        line_ids.remove(line_id)
        outbound_timetable_t[1][last_departure_time_indexes[line_id] + 1] = " ".join(line_ids)
    
    
    mes("列車情報を整理しています...")
    
    diagram_ids = set()
    inbound_timetables_t = {}
    outbound_timetables_t = {}
    
    trip_info = {}
    for trip in trips:
        trip_info[trip["trip_id"]] = { "diagram_id" : trip["service_id"], "destination" : trip["trip_headsign"] }
        
        diagram_ids.add(trip["service_id"])
        inbound_timetables_t[trip["service_id"]] = copy.deepcopy(inbound_timetable_t)
        outbound_timetables_t[trip["service_id"]] = copy.deepcopy(outbound_timetable_t)
    
    
    mes("時刻表を生成しています...")
    
    last_trip_id = None
    for stop_time in stop_times:
        if stop_time["stop_id"] in stop_info_inbound:
            row_index_inbound = stop_info_inbound[stop_time["stop_id"]]["row_index"]
        else:
            row_index_inbound = None
        
        if stop_time["stop_id"] in stop_info_outbound:
            row_index_outbound = stop_info_outbound[stop_time["stop_id"]]["row_index"]
        else:
            row_index_outbound = None
        
        if last_trip_id != stop_time["trip_id"]:
            if row_index_inbound is not None:
                inbound_timetables_t[trip_info[stop_time["trip_id"]]["diagram_id"]].append([stop_time["trip_id"], "普通", trip_info[stop_time["trip_id"]]["destination"]] + [""] * (len(inbound_timetable_t[0]) - 3))
                
            if row_index_outbound is not None:
                outbound_timetables_t[trip_info[stop_time["trip_id"]]["diagram_id"]].append([stop_time["trip_id"], "普通", trip_info[stop_time["trip_id"]]["destination"]] + [""] * (len(outbound_timetable_t[0]) - 3))
            
            last_stop_is_starting_stop = True
            last_trip_id = stop_time["trip_id"]
            direction = None
        elif last_stop_is_starting_stop:
            if last_row_index_inbound is not None and row_index_inbound is not None and row_index_inbound > last_row_index_inbound:
                direction = "inbound"
                
                if last_row_index_outbound is not None and (row_index_outbound is None or row_index_outbound < last_row_index_outbound):
                    del outbound_timetables_t[trip_info[stop_time["trip_id"]]["diagram_id"]][-1]
            else:
                direction = "outbound"
                
                if last_row_index_inbound is not None and (row_index_inbound is None or row_index_inbound < last_row_index_inbound):
                    del inbound_timetables_t[trip_info[stop_time["trip_id"]]["diagram_id"]][-1]
            
            last_stop_is_starting_stop = False
        else:
            if direction == "inbound" and (row_index_inbound is None or row_index_inbound < last_row_index_inbound):
                outbound_timetables_t[trip_info[stop_time["trip_id"]]["diagram_id"]].append([stop_time["trip_id"], "普通", trip_info[stop_time["trip_id"]]["destination"]] + [""] * (len(outbound_timetable_t[0]) - 3))
                outbound_timetables_t[trip_info[stop_time["trip_id"]]["diagram_id"]][-1][last_row_index_outbound + 1] = last_departure_time[:5]
                
                line_id = list(set(outbound_timetable_t[1][last_row_index_outbound + 1].split()) & set(outbound_timetable_t[1][row_index_outbound].split()))[0]
                
                inbound_timetables_t[trip_info[stop_time["trip_id"]]["diagram_id"]][-1][-1] = "@" + line_id + ".outbound"
                
                direction = "outbound"
            elif direction == "outbound" and (row_index_outbound is None or row_index_outbound < last_row_index_outbound):
                inbound_timetables_t[trip_info[stop_time["trip_id"]]["diagram_id"]].append([stop_time["trip_id"], "普通", trip_info[stop_time["trip_id"]]["destination"]] + [""] * (len(inbound_timetable_t[0]) - 3))
                inbound_timetables_t[trip_info[stop_time["trip_id"]]["diagram_id"]][-1][last_row_index_inbound + 1] = last_departure_time[:5]
                
                line_id = list(set(inbound_timetable_t[1][last_row_index_inbound + 1].split()) & set(inbound_timetable_t[1][row_index_inbound].split()))[0]
                
                outbound_timetables_t[trip_info[stop_time["trip_id"]]["diagram_id"]][-1][-1] = "@" + line_id + ".inbound"
                
                direction = "inbound"
        
        if (direction is None or direction == "inbound") and row_index_inbound is not None:
            inbound_timetables_t[trip_info[stop_time["trip_id"]]["diagram_id"]][-1][row_index_inbound] = stop_time["arrival_time"][:5]
            inbound_timetables_t[trip_info[stop_time["trip_id"]]["diagram_id"]][-1][row_index_inbound + 1] = stop_time["departure_time"][:5]
        
        if (direction is None or direction == "outbound") and row_index_outbound is not None:
            outbound_timetables_t[trip_info[stop_time["trip_id"]]["diagram_id"]][-1][row_index_outbound] = stop_time["arrival_time"][:5]
            outbound_timetables_t[trip_info[stop_time["trip_id"]]["diagram_id"]][-1][row_index_outbound + 1] = stop_time["departure_time"][:5]
        
        last_row_index_inbound = row_index_inbound
        last_row_index_outbound = row_index_outbound
        last_departure_time = stop_time["departure_time"]
    
    
    mes("不要なデータを除外しています...")
    
    inbound_timetables = {}
    outbound_timetables = {}
    
    for diagram_id in diagram_ids:
        inbound_timetables[diagram_id] = [list(x) for x in zip(*inbound_timetables_t[diagram_id])]
        outbound_timetables[diagram_id] = [list(x) for x in zip(*outbound_timetables_t[diagram_id])]
    
    for row_index in range(len(inbound_timetable_t[1]) - 2, 2, -1):
        if len(inbound_timetable_t[1][row_index]) == 0:
            for diagram_id in diagram_ids:
                del inbound_timetables[diagram_id][row_index]
    
    for row_index in range(len(outbound_timetable_t[1]) - 2, 2, -1):
        if len(outbound_timetable_t[1][row_index]) == 0:
            for diagram_id in diagram_ids:
                del outbound_timetables[diagram_id][row_index]
    
    
    mes("時刻表をCSVファイルに保存しています...")
    
    for diagram_id in diagram_ids:
        with open(dir_path + "timetable_" + diagram_id + ".inbound.csv", "w", encoding="utf-8-sig") as csv_f:
            csv_writer = csv.writer(csv_f, lineterminator="\n")
            csv_writer.writerows(inbound_timetables[diagram_id])
            
        with open(dir_path + "timetable_" + diagram_id + ".outbound.csv", "w", encoding="utf-8-sig") as csv_f:
            csv_writer = csv.writer(csv_f, lineterminator="\n")
            csv_writer.writerows(outbound_timetables[diagram_id])
    
    
    mes("処理が完了しました")
