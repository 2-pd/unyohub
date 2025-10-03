# coding: utf-8

import traceback
import time
import random
import urllib.request
import json
import sqlite3

from google.protobuf.json_format import MessageToDict

from modules import gtfs_realtime_pb2
from modules import diagram_funcs


def do_nothing (*args):
    pass


def get_railroad_gtfs_realtime (mes, main_dir, url):
    diagram = diagram_funcs.diagram(main_dir, mes=mes)
    
    mes(url + " に接続します...")
    
    operation_date = diagram.get_date_string()
    
    feed_mes = gtfs_realtime_pb2.FeedMessage()
    
    
    try:
        with urllib.request.urlopen(urllib.request.Request(url), timeout=10) as response:
            feed_mes.ParseFromString(response.read())
    except urllib.error.HTTPError as err:
        mes("サーバがエラーコード " + str(err.code) + " を返しました", True)
        return False
    except urllib.error.URLError:
        mes("サーバに接続できませんでした", True)
        return False
    except Exception:
        mes(traceback.format_exc(), True)
        return False
    
    
    feed_dict = MessageToDict(feed_mes)
    
    if "entity" not in feed_dict:
        mes("走行中の編成の情報がありません")
        return True
    
    
    mes("取得したデータを保存しています...")
    
    try:
        with open(main_dir + "/gtfs_realtime_cache.json", "w", encoding="utf-8") as json_f:
            json.dump(feed_dict, json_f, ensure_ascii=False, separators=(',', ':'))
    except PermissionError:
        mes("gtfs_realtime_cache.jsonの書き込み権限がありません", True)
    except:
        mes("gtfs_realtime_cache.jsonの作成に失敗しました", True)
    
    
    mes("取得したデータをデータベースに記録しています...")
    
    try:
        conn = sqlite3.connect(main_dir + "/railroad.db")
        cur = conn.cursor()
        
        for trip_data in feed_dict["entity"]:
            trip_id = trip_data["tripUpdate"]["trip"]["tripId"]
            vehicle_id = trip_data["tripUpdate"]["vehicle"]["id"]
            
            cur.execute("REPLACE INTO `unyohub_operation_logs`(`operation_date`, `trip_id`, `vehicle_id`) VALUES (:operation_date, :trip_id, :vehicle_id)", {"operation_date" : operation_date, "trip_id" : trip_id, "vehicle_id" : vehicle_id})
        
        conn.commit()
        conn.close()
    except:
        mes("データベースへの記録に失敗しました", True)
        mes(traceback.format_exc())
    else:
        mes("データベースへの記録が完了しました")
    
    
    return True


def get_gtfs_realtime (mes, railroad_id=None, options=set()):
    if "-s" in options:
        time.sleep(random.randint(11,50))
    else:
        mes("運行情報データの取得", is_heading=True)
    
    with open("../config/gtfs_realtime_endpoints.json", "r", encoding="utf-8") as json_f:
        endpoints = json.load(json_f)
    
    if railroad_id is None:
        railroad_ids = endpoints.keys()
    else:
        railroad_ids = [railroad_id]
    
    for railroad_id in railroad_ids:
        if "-s" in options:
            get_railroad_gtfs_realtime(do_nothing, "../data/" + railroad_id, endpoints[railroad_id])
        else:
            get_railroad_gtfs_realtime(mes, "../data/" + railroad_id, endpoints[railroad_id])
    
    if "-s" not in options:
        mes("全ての処理が完了しました")
