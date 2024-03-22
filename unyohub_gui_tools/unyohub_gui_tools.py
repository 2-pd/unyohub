#!/usr/bin/env python3
# coding: utf-8

import importlib
import os
import traceback
import platform
import json
import tkinter as tk
from tkinter import font
from tkinter import filedialog
from tkinter import messagebox
from unyohub_scripts import *


if platform.system() == "Linux":
    is_linux = True
else:
    is_linux = False

try:
    with open("config.json", "r", encoding="utf-8") as json_fp:
        config = json.load(json_fp)
except:
    config = {
        "main_dir" : os.path.abspath("./")
    }


def open_main_window ():
    global config
    global is_linux
    global main_win
    global console_area
    global label_main_dir
    
    main_win = tk.Tk()
    
    main_win.title("鉄道運用Hub GUIツール")
    main_win.geometry("960x720")
    main_win.resizable(0, 0)
    main_win.configure(bg="#444444")
    
    if is_linux:
        label_font = tk.font.Font(size=12)
        button_font = tk.font.Font(size=10)
    else:
        label_font = tk.font.Font(family="Yu Gothic", size=12)
        button_font = tk.font.Font(family="Yu Gothic", size=11)
    
    console_scroll_y = tk.Scrollbar(orient="vertical", bg="#666666")
    console_area = tk.Text(main_win, font=button_font, fg="#ffffff", bg="#333333", padx=10, pady=10, relief="flat", yscrollcommand=console_scroll_y.set, state=tk.DISABLED)
    console_scroll_y["command"] = console_area.yview
    console_area.place(x=320, y=0, width=625, height=720)
    console_scroll_y.place(x=945, y=0, width=15, height=720)
    
    label_heading_main_dir = tk.Label(main_win, text="作業フォルダ:", font=label_font, fg="#cccccc", bg="#444444")
    label_heading_main_dir.place(x=10, y=10)
    
    label_main_dir = tk.Label(main_win, text=os.path.basename(config["main_dir"]), font=label_font, fg="#ffffff", bg="#444444")
    label_main_dir.place(x=10, y=35)
    
    button_main_dir = tk.Button(main_win, text="作業フォルダ変更", font=button_font, command=change_main_dir, bg="#666666", fg="#ffffff", relief="flat", highlightbackground="#666666")
    button_main_dir.place(x=160, y=70, width=150, height=35)
    
    button_initialize_db = tk.Button(main_win, text="データベースのセットアップ", font=button_font, command=initialize_db, bg="#666666", fg="#ffffff", relief="flat", highlightbackground="#666666")
    button_initialize_db.place(x=10, y=140, width=300, height=40)
    
    button_initialize_db = tk.Button(main_win, text="アイコン画像をファイルに埋め込み", font=button_font, command=embed_train_icon, bg="#666666", fg="#ffffff", relief="flat", highlightbackground="#666666")
    button_initialize_db.place(x=10, y=190, width=300, height=40)
    
    main_win.protocol("WM_DELETE_WINDOW", main_window_close)
    
    mes("鉄道運用Hub データ変換用GUIツール へようこそ！")
    
    main_win.mainloop()


def main_window_close ():
    global config
    global main_win
    
    with open("config.json", "w", encoding="utf-8") as json_fp:
        json.dump(config, json_fp, ensure_ascii=False, indent=4)
    
    main_win.destroy()


def mes (log_text, is_heading=False):
    global console_area
    
    console_area.configure(state=tk.NORMAL)
    if is_heading:
        console_area.insert(tk.END, "\n_/_/_/_/ " + str(log_text) + "_/_/_/_/\n\n")
    else:
        console_area.insert(tk.END, str(log_text) + "\n")
    console_area.configure(state=tk.DISABLED)
    
    console_area.see(tk.END)


def error_mes (exc_text):
    mes("\n【!】内部エラー:")
    mes(exc_text)


def change_main_dir ():
    global config
    
    dir_path = filedialog.askdirectory(title="作業フォルダを選択してください", initialdir=config["main_dir"])
    
    if len(dir_path) >= 1 :
        config["main_dir"] = dir_path
        label_main_dir["text"] = os.path.basename(config["main_dir"])


def initialize_db ():
    global config
    
    if messagebox.askokcancel("データベースのセットアップ", "現在の作業フォルダにデータベースファイルをセットアップしますか？"):
        try:
            initialize_db = importlib.import_module("unyohub_scripts.initialize_db")
            initialize_db.initialize_db(mes, config["main_dir"])
        except Exception as err:
            error_mes(traceback.format_exc())


def embed_train_icon ():
    global config
    
    dir_path = filedialog.askdirectory(title="アイコン画像のあるフォルダを選択してください", initialdir=config["main_dir"])
    
    if len(dir_path) >= 1:
        try:
            embed_train_icon = importlib.import_module("unyohub_scripts.embed_train_icon")
            embed_train_icon.embed_train_icon(mes, dir_path)
        except Exception as err:
            error_mes(traceback.format_exc())


open_main_window()
