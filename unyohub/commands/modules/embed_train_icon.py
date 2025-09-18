# coding: utf-8

import os
import glob
import json
import base64


def embed_train_icon (mes, dir_path):
    mes("アイコン画像をファイルに埋め込み", is_heading=True)
    
    
    extension_list = ["webp", "png", "gif", "jpeg", "jpg"]
    icons_dir_path = dir_path + "/icons"
    files = []
    
    if not os.path.isdir(icons_dir_path):
        mes("フォルダ icons が存在しません", True)
        return
    
    
    mes("ファイルの一覧を取得しています...")
    
    for extension in extension_list:
        files += glob.glob(icons_dir_path + "/*." + extension)
    
    files.sort()
    
    mes(str(len(files)) + "件の画像ファイルが検出されました")
    
    train_icons = {}
    icon_list = {}
    
    for file_name in files:
        file_base_name = os.path.basename(file_name)
        mes("・" + file_base_name + " を埋め込んでいます...")
        
        if file_base_name.endswith(".webp"):
            mime_type = "image/webp"
        elif file_base_name.endswith(".png"):
            mime_type = "image/png"
        elif file_base_name.endswith(".gif"):
            mime_type = "image/gif"
        elif file_base_name.endswith(".jpeg") or file_base_name.endswith(".jpg"):
            mime_type = "image/jpeg"
        
        try:
            img_f = open(file_name, "rb")
            img_data = img_f.read()
        except:
            mes(file_base_name + " の読み込みに失敗しました", True)
            return
        
        icon_id = file_base_name[0:file_base_name.rfind(".")]
        
        train_icons[icon_id] = "data:" + mime_type + ";base64," + base64.b64encode(img_data).decode()
        icon_list[icon_id] = { "file_name" : file_base_name, "media_type" : mime_type }
    
    
    mes("train_icons.json を作成しています...")
    
    json_file_path = dir_path + "/train_icons.json"
    
    if not os.path.exists(json_file_path):
        new_json_file = True
    else:
        new_json_file = False
    
    try:
        with open(json_file_path, "w", encoding="utf-8") as json_f:
            json.dump(train_icons, json_f, ensure_ascii=False, separators=(',', ':'))
    except PermissionError:
        mes("train_icons.json の書き込み権限がありません", True)
        return
    except:
        mes("train_icons.json の保存に失敗しました", True)
        return
    
    if new_json_file and os.name == "posix":
        os.chmod(json_file_path, 0o766)
    
    
    mes("icon_list.json を作成しています...")
    
    json_file_path = icons_dir_path + "/icon_list.json"
    
    if not os.path.exists(json_file_path):
        new_json_file = True
    else:
        new_json_file = False
    
    try:
        with open(json_file_path, "w", encoding="utf-8") as json_f:
            json.dump(icon_list, json_f, ensure_ascii=False, separators=(',', ':'))
    except PermissionError:
        mes("icon_list.json の書き込み権限がありません", True)
        return
    except:
        mes("icon_list.json の保存に失敗しました", True)
        return
    
    if new_json_file and os.name == "posix":
        os.chmod(json_file_path, 0o766)
    
    
    mes("処理が完了しました")
