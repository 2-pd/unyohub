#!/usr/bin/env python3
# coding: utf-8

import sys
import json
import base64

print("train_icons_org.jsonを読み込んでいます...")
try:
    with open("train_icons_org.json", "r", encoding="utf-8") as json_f:
        train_icons = json.load(json_f)
except:
    print("【エラー】train_icons_org.jsonの読み込みに失敗しました")
    sys.exit()

for cnt in range(len(train_icons)):
    print(train_icons[cnt]["icon"] + "を埋め込んでいます...")
    
    if train_icons[cnt]["icon"].endswith(".webp"):
        mime_type = "image/webp"
    elif train_icons[cnt]["icon"].endswith(".png"):
        mime_type = "image/png"
    elif train_icons[cnt]["icon"].endswith(".gif"):
        mime_type = "image/gif"
    elif train_icons[cnt]["icon"].endswith(".jpeg") or train_icons[cnt]["icon"].endswith(".jpg"):
        mime_type = "image/jpeg"
    else:
        print("【エラー】不明な拡張子のファイルです")
        sys.exit()
    
    try:
        img_f = open(train_icons[cnt]["icon"], "rb")
        img_data = img_f.read()
    except:
        print("【エラー】" + train_icons[cnt]["icon"] + "の読み込みに失敗しました")
        sys.exit()
    
    train_icons[cnt]["icon"] = "data:" + mime_type + ";base64," + base64.b64encode(img_data).decode()

print("train_icons.jsonを作成しています...")
try:
    with open("train_icons.json", "w", encoding="utf-8") as json_f:
        json.dump(train_icons, json_f, ensure_ascii=False, separators=(',', ':'))
except:
    print("【エラー】train_icons.jsonの保存に失敗しました")
    sys.exit()

print("処理が完了しました")