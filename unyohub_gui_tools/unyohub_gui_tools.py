#!/usr/bin/env python3
# coding: utf-8

import importlib
import os
import traceback
import platform
import json
import tkinter as tk
from tkinter import font
from tkinter import messagebox
from tkinter import filedialog
from tkinter import simpledialog
from unyohub_scripts import *


UNYOHUB_GUI_TOOLS_VERSION = "24.03-2"


if platform.system() == "Windows":
    is_windows = True
else:
    is_windows = False

try:
    with open("config.json", "r", encoding="utf-8") as json_fp:
        config = json.load(json_fp)
except:
    config = {
        "main_dir" : os.path.abspath("./")
    }


def open_main_window ():
    global config
    global is_windows
    global main_win
    global console_area
    global label_main_dir
    
    main_win = tk.Tk()
    
    main_win.title("鉄道運用Hub GUIツール")
    main_win.geometry("960x720")
    main_win.resizable(0, 0)
    main_win.configure(bg="#444444")
    
    if is_windows:
        main_win.iconbitmap("files/tools_icon.ico")
        
        label_font = tk.font.Font(family="Yu Gothic", size=12)
        button_font = tk.font.Font(family="Yu Gothic", size=11)
    else:
        main_win.iconphoto(True, tk.PhotoImage(file="files/tools_icon.png"))
        
        label_font = tk.font.Font(size=12)
        button_font = tk.font.Font(size=10)
    
    main_win.protocol("WM_DELETE_WINDOW", main_window_close)
    
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
    button_main_dir.place(x=160, y=75, width=150, height=35)
    
    button_initialize_db = tk.Button(main_win, text="データベースのセットアップ", font=button_font, command=initialize_db, bg="#666666", fg="#ffffff", relief="flat", highlightbackground="#666666")
    button_initialize_db.place(x=10, y=140, width=300, height=40)
    
    button_embed_train_icon = tk.Button(main_win, text="アイコン画像をファイルに埋め込み", font=button_font, command=embed_train_icon, bg="#666666", fg="#ffffff", relief="flat", highlightbackground="#666666")
    button_embed_train_icon.place(x=10, y=190, width=300, height=40)
    
    button_convert_timetable_1 = tk.Button(main_win, text="時刻表の変換(ステップ1)", font=button_font, command=convert_timetable_1, bg="#666666", fg="#ffffff", relief="flat", highlightbackground="#666666")
    button_convert_timetable_1.place(x=10, y=240, width=300, height=40)
    
    button_convert_timetable_2 = tk.Button(main_win, text="時刻表の変換(ステップ2)", font=button_font, command=convert_timetable_2, bg="#666666", fg="#ffffff", relief="flat", highlightbackground="#666666")
    button_convert_timetable_2.place(x=10, y=290, width=300, height=40)
    
    button_convert_operation_table_1 = tk.Button(main_win, text="運用表の変換(ステップ1)", font=button_font, command=convert_operation_table_1, bg="#666666", fg="#ffffff", relief="flat", highlightbackground="#666666")
    button_convert_operation_table_1.place(x=10, y=340, width=300, height=40)
    
    button_convert_operation_table_2 = tk.Button(main_win, text="運用表の変換(ステップ2)", font=button_font, command=convert_operation_table_2, bg="#666666", fg="#ffffff", relief="flat", highlightbackground="#666666")
    button_convert_operation_table_2.place(x=10, y=390, width=300, height=40)
    
    mes("鉄道運用Hub 各種データ変換用GUIツール v" + UNYOHUB_GUI_TOOLS_VERSION)
    
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
        console_area.insert(tk.END, "\n_/_/_/_/ " + str(log_text) + " _/_/_/_/\n\n")
    else:
        console_area.insert(tk.END, str(log_text) + "\n")
    console_area.configure(state=tk.DISABLED)
    
    console_area.see(tk.END)


def error_mes (exc_text):
    mes("\n【!】内部エラー:")
    mes(exc_text)


def clear_mes ():
    global console_area
    
    console_area.configure(state=tk.NORMAL)
    console_area.delete("0.0", tk.END)
    console_area.configure(state=tk.DISABLED)


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
            clear_mes()
            
            initialize_db = importlib.import_module("unyohub_scripts.initialize_db")
            initialize_db.initialize_db(mes, config["main_dir"])
        except:
            error_mes(traceback.format_exc())


def embed_train_icon ():
    global config
    
    dir_path = filedialog.askdirectory(title="アイコン画像のあるフォルダを選択してください", initialdir=config["main_dir"])
    
    if len(dir_path) >= 1:
        try:
            clear_mes()
            
            embed_train_icon = importlib.import_module("unyohub_scripts.embed_train_icon")
            embed_train_icon.embed_train_icon(mes, dir_path)
        except:
            error_mes(traceback.format_exc())


def convert_timetable_1 ():
    global config
    
    file_name = filedialog.askopenfilename(title="変換対象の時刻表CSVファイルを選択してください", filetypes=[("CSV形式の表ファイル","*.csv")], initialdir=config["main_dir"])
    
    if len(file_name) >= 1:
        digits_count_str = simpledialog.askstring("列車番号の桁数を指定", "所定の桁数に満たない列車番号の前に「0」を付加する場合にはその桁数を入力してください")
        
        if digits_count_str.isdecimal():
            digits_count = int(digits_count_str)
        else:
            digits_count = 0
        
        try:
            clear_mes()
            
            convert_timetable_1 = importlib.import_module("unyohub_scripts.convert_timetable_1")
            convert_timetable_1.convert_timetable_1(mes, file_name, digits_count)
        except:
            error_mes(traceback.format_exc())


def convert_timetable_2 ():
    global config
    
    if not os.path.isfile(config["main_dir"] + "/railroad_info.json"):
        messagebox.showwarning("路線別時刻表を変換できません", "現在の作業フォルダには路線別時刻表ファイルの変換に必要な railroad_info.json が存在しません")
        return
    
    operation_table = simpledialog.askstring("ダイヤ識別名の入力", "変換対象の路線別時刻表ファイルに含まれるダイヤ識別名を入力してください")
    
    if len(operation_table) >= 1:
        try:
            clear_mes()
            
            convert_timetable_2 = importlib.import_module("unyohub_scripts.convert_timetable_2")
            convert_timetable_2.convert_timetable_2(mes, config["main_dir"], operation_table)
        except:
            error_mes(traceback.format_exc())


def convert_operation_table_1 ():
    global config
    
    if not os.path.isfile(config["main_dir"] + "/railroad_info.json"):
        messagebox.showwarning("運用表を変換できません", "現在の作業フォルダには運用表ファイルの変換に必要な railroad_info.json が存在しません")
        return
    
    file_name = filedialog.askopenfilename(title="変換対象の運用表CSVファイルを選択してください", filetypes=[("CSV形式の表ファイル","*.csv")], initialdir=config["main_dir"])
    if len(file_name) == 0:
        return
    
    json_file_name = filedialog.askopenfilename(title="運用表に対応するダイヤの変換済み時刻表を選択してください", filetypes=[("JSONファイル","*.json")], initialdir=config["main_dir"])
    if len(json_file_name) == 0:
        return
    
    digits_count_str = simpledialog.askstring("列車番号の桁数を指定", "所定の桁数に満たない列車番号の前に「0」を付加する場合にはその桁数を入力してください")
    
    if digits_count_str.isdecimal():
        digits_count = int(digits_count_str)
    else:
        digits_count = 0
    
    try:
        clear_mes()
        
        convert_operation_table_1 = importlib.import_module("unyohub_scripts.convert_operation_table_1")
        convert_operation_table_1.convert_operation_table_1(mes, config["main_dir"], file_name, json_file_name, digits_count)
    except:
        error_mes(traceback.format_exc())


def convert_operation_table_2 ():
    global config
    
    if not os.path.isfile(config["main_dir"] + "/railroad_info.json"):
        messagebox.showwarning("運用表を変換できません", "現在の作業フォルダには運用表ファイルの変換に必要な railroad_info.json が存在しません")
        return
    
    file_name = filedialog.askopenfilename(title="変換対象の区間組成運用表CSVファイルを選択してください", filetypes=[("CSV形式の表ファイル","*.csv")], initialdir=config["main_dir"])
    
    if len(file_name) >= 1:
        try:
            clear_mes()
            
            convert_operation_table_2 = importlib.import_module("unyohub_scripts.convert_operation_table_2")
            convert_operation_table_2.convert_operation_table_2(mes, config["main_dir"], file_name)
        except:
            error_mes(traceback.format_exc())


open_main_window()
