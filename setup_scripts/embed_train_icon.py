#!/usr/bin/env python3
# coding: utf-8

import sys
import glob
import json
import base64

print("ファイルの一覧を取得しています...")
extension_list = ["webp", "png", "gif", "jpeg", "jpg"]
files = []

for extension in extension_list:
    files += glob.glob("*." + extension)

files.sort()

print(str(len(files)) + "件の画像ファイルが検出されました")

train_icons = {}

for file_name in files:
    print("・" + file_name + " を埋め込んでいます...")
    
    if file_name.endswith(".webp"):
        mime_type = "image/webp"
    elif file_name.endswith(".png"):
        mime_type = "image/png"
    elif file_name.endswith(".gif"):
        mime_type = "image/gif"
    elif file_name.endswith(".jpeg") or file_name.endswith(".jpg"):
        mime_type = "image/jpeg"
    
    try:
        img_f = open(file_name, "rb")
        img_data = img_f.read()
    except:
        print("【エラー】" + file_name + " の読み込みに失敗しました")
        sys.exit()
    
    icon_id = file_name[0:file_name.rfind(".")]
    
    train_icons[icon_id] = "data:" + mime_type + ";base64," + base64.b64encode(img_data).decode()

print("train_icons.jsonを作成しています...")
try:
    with open("train_icons.json", "w", encoding="utf-8") as json_f:
        json.dump(train_icons, json_f, ensure_ascii=False, separators=(',', ':'))
except:
    print("【エラー】train_icons.jsonの保存に失敗しました")
    sys.exit()

print("処理が完了しました")