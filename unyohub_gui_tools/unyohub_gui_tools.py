#!/usr/bin/env python3
# coding: utf-8

import importlib
import tkinter as tk
from tkinter import font
from tkinter import messagebox
from tkinter import filedialog
from tkinter import simpledialog
import os
import traceback
import platform
import json
import webbrowser


UNYOHUB_GUI_TOOLS_APP_NAME = "鉄道運用Hub用データ編集ツール"
UNYOHUB_GUI_TOOLS_VERSION = "25.05-1"
UNYOHUB_GUI_TOOLS_LICENSE_TEXT = "このアプリケーションは無権利創作宣言に準拠して著作権放棄されています"
UNYOHUB_GUI_TOOLS_LICENSE_URL = "https://www.2pd.jp/license/"
UNYOHUB_GUI_TOOLS_REPOSITORY_URL = "https://fossil.2pd.jp/unyohub/"


app_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(app_dir)

if platform.system() == "Windows":
    is_windows = True
else:
    is_windows = False

default_dir = os.path.dirname(app_dir)

try:
    with open("config.json", "r", encoding="utf-8") as json_fp:
        config = json.load(json_fp)
except:
    config = {
        "main_dir" : default_dir
    }

if not os.path.isdir(config["main_dir"]):
    config["main_dir"] = default_dir


def open_main_window ():
    global config
    global is_windows
    global main_win
    global console_area
    global label_main_dir
    
    main_win = tk.Tk()
    
    main_win.title(UNYOHUB_GUI_TOOLS_APP_NAME)
    main_win.geometry("960x720")
    main_win.resizable(0, 0)
    main_win.configure(bg="#444444")
    
    main_win.protocol("WM_DELETE_WINDOW", close_main_window)
    
    main_menu = tk.Menu(main_win, fg="#ffffff", bg="#555555", activebackground="#777777", activeforeground="#ffffff", relief=tk.FLAT)
    main_win.configure(menu=main_menu)
    
    if is_windows:
        main_win.iconbitmap("files/tools_icon.ico")
        
        main_menu_file = tk.Menu(main_menu, tearoff=False)
        main_menu_console = tk.Menu(main_menu, tearoff=False)
        main_menu_help = tk.Menu(main_menu, tearoff=False)
        
        label_font = tk.font.Font(family="Yu Gothic", size=12)
        button_font = tk.font.Font(family="Yu Gothic", size=11)
    else:
        main_win.iconphoto(True, tk.PhotoImage(file="files/tools_icon.png"))
        
        main_menu_file = tk.Menu(main_menu, tearoff=False, fg="#ffffff", bg="#777777", bd=10, relief=tk.FLAT)
        main_menu_console = tk.Menu(main_menu, tearoff=False, fg="#ffffff", bg="#777777", bd=10, relief=tk.FLAT)
        main_menu_help = tk.Menu(main_menu, tearoff=False, fg="#ffffff", bg="#777777", bd=10, relief=tk.FLAT)
        
        label_font = tk.font.Font(size=12)
        button_font = tk.font.Font(size=10)
    
    main_menu.add_cascade(label="ファイル", menu=main_menu_file)
    main_menu_file.add_command(label="作業フォルダ変更", command=change_main_dir, font=("",10))
    main_menu_file.insert_separator(1)
    main_menu_file.add_command(label="終了", command=close_main_window, font=("",10))
    
    main_menu.add_cascade(label="コンソール", menu=main_menu_console)
    main_menu_console.add_command(label="コンソール出力のコピー", command=console_copy, font=("",10))
    main_menu_console.insert_separator(1)
    main_menu_console.add_command(label="コンソール出力のクリア", command=clear_mes, font=("",10))
    
    main_menu.add_cascade(label="ヘルプ", menu=main_menu_help)
    main_menu_help.add_command(label="ヘルプを開く", font=("",10), command=open_help_file)
    main_menu_help.insert_separator(1)
    main_menu_help.add_command(label="バージョン情報", font=("",10), command=open_app_info)
    
    console_scroll_y = tk.Scrollbar(main_win, orient="vertical", bg="#666666")
    console_area = tk.Text(main_win, font=button_font, fg="#ffffff", bg="#333333", padx=10, pady=10, relief=tk.FLAT, yscrollcommand=console_scroll_y.set, state=tk.DISABLED)
    console_scroll_y["command"] = console_area.yview
    console_area.place(x=320, y=0, width=625, height=720)
    console_scroll_y.place(x=945, y=0, width=15, height=720)
    
    label_heading_main_dir = tk.Label(main_win, text="作業フォルダ:", font=label_font, fg="#cccccc", bg="#444444")
    label_heading_main_dir.place(x=10, y=10)
    
    label_main_dir = tk.Label(main_win, text=os.path.basename(config["main_dir"]), font=label_font, fg="#ffffff", bg="#444444")
    label_main_dir.place(x=10, y=35)
    
    button_main_dir = tk.Button(main_win, text="作業フォルダ変更", font=button_font, command=change_main_dir, bg="#666666", fg="#ffffff", relief=tk.FLAT, highlightbackground="#666666")
    button_main_dir.place(x=160, y=75, width=150, height=35)
    
    button_initialize_db = tk.Button(main_win, text="データベースのセットアップ", font=button_font, command=initialize_db, bg="#666666", fg="#ffffff", relief=tk.FLAT, highlightbackground="#666666")
    button_initialize_db.place(x=10, y=140, width=300, height=40)
    
    button_embed_train_icon = tk.Button(main_win, text="アイコン画像をファイルに埋め込み", font=button_font, command=embed_train_icon, bg="#666666", fg="#ffffff", relief=tk.FLAT, highlightbackground="#666666")
    button_embed_train_icon.place(x=10, y=190, width=300, height=40)
    
    button_generate_operation_table = tk.Button(main_win, text="運用情報付き時刻表の変換", font=button_font, command=generate_operation_table, bg="#666666", fg="#ffffff", relief=tk.FLAT, highlightbackground="#666666")
    button_generate_operation_table.place(x=10, y=240, width=300, height=40)
    
    button_convert_timetable_1 = tk.Button(main_win, text="時刻表の変換(ステップ1)", font=button_font, command=convert_timetable_1, bg="#666666", fg="#ffffff", relief=tk.FLAT, highlightbackground="#666666")
    button_convert_timetable_1.place(x=10, y=290, width=300, height=40)
    
    button_convert_timetable_2 = tk.Button(main_win, text="時刻表の変換(ステップ2)", font=button_font, command=convert_timetable_2, bg="#666666", fg="#ffffff", relief=tk.FLAT, highlightbackground="#666666")
    button_convert_timetable_2.place(x=10, y=340, width=300, height=40)
    
    button_convert_operation_table_for_printing = tk.Button(main_win, text="運用表を印刷用に変換", font=button_font, command=lambda: convert_operation_table_1(True), bg="#666666", fg="#ffffff", relief=tk.FLAT, highlightbackground="#666666")
    button_convert_operation_table_for_printing.place(x=10, y=390, width=300, height=40)
    
    button_convert_operation_table_1 = tk.Button(main_win, text="運用表の変換(ステップ1)", font=button_font, command=lambda: convert_operation_table_1(False), bg="#666666", fg="#ffffff", relief=tk.FLAT, highlightbackground="#666666")
    button_convert_operation_table_1.place(x=10, y=440, width=300, height=40)
    
    button_convert_operation_table_2 = tk.Button(main_win, text="運用表の変換(ステップ2)", font=button_font, command=convert_operation_table_2, bg="#666666", fg="#ffffff", relief=tk.FLAT, highlightbackground="#666666")
    button_convert_operation_table_2.place(x=10, y=490, width=300, height=40)
    
    button_initialize_moderation_db = tk.Button(main_win, text="モデレーションDBのセットアップ", font=button_font, command=initialize_moderation_db, bg="#666666", fg="#ffffff", relief=tk.FLAT, highlightbackground="#666666")
    button_initialize_moderation_db.place(x=10, y=540, width=300, height=40)
    
    mes(UNYOHUB_GUI_TOOLS_APP_NAME + " v" + UNYOHUB_GUI_TOOLS_VERSION + "\n\n" + UNYOHUB_GUI_TOOLS_LICENSE_TEXT)
    
    main_win.mainloop()


def close_main_window ():
    global config
    global main_win
    
    with open("config.json", "w", encoding="utf-8") as json_fp:
        json.dump(config, json_fp, ensure_ascii=False, indent=4)
    
    main_win.destroy()


def mes (log_text, is_error=False, is_heading=False):
    global console_area
    
    console_area.configure(state=tk.NORMAL)
    if is_error:
        console_area.insert(tk.END, "【エラー】" + str(log_text) + "\n")
    elif is_heading:
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


def console_copy ():
    global main_win
    global console_area
    
    main_win.clipboard_clear()
    main_win.clipboard_append(console_area.get("0.0", tk.END).strip())


def select_diagram (callback_func, enable_generate_number_check=False):
    global config
    global main_win
    global select_diagram_win
    global select_diagram_callback
    global diagram_revision_list
    global diagram_id_entry
    global generate_number_value
    
    select_diagram_callback = callback_func
    
    dir_list = sorted([ dir_name for dir_name in os.listdir(config["main_dir"]) if os.path.isdir(config["main_dir"] + "/" + dir_name) ], reverse=True)
    
    if len(dir_list) == 0:
        mes("現在の作業フォルダにはダイヤ改正日別フォルダがありません", True)
        return
    
    if is_windows:
        label_font = tk.font.Font(family="Yu Gothic", size=12)
        list_font = tk.font.Font(family="Yu Gothic", size=10)
        button_font = tk.font.Font(family="Yu Gothic", size=11)
    else:
        label_font = tk.font.Font(size=12)
        list_font = tk.font.Font(size=10)
        button_font = tk.font.Font(size=10)
    
    select_diagram_win = tk.Toplevel()
    
    select_diagram_win.title("ダイヤの選択")
    select_diagram_win.geometry("480x240")
    select_diagram_win.resizable(0, 0)
    select_diagram_win.configure(bg="#444444")
    
    select_diagram_win.grab_set()
    select_diagram_win.focus_set()
    select_diagram_win.transient(main_win)
    
    select_diagram_win.protocol("WM_DELETE_WINDOW", close_select_diagram_win)
    
    label_diagram_revision = tk.Label(select_diagram_win, text="ダイヤ改正日フォルダ:", font=label_font, fg="#ffffff", bg="#444444")
    label_diagram_revision.place(x=30, y=10)
    
    diagram_revision_list_var = tk.StringVar(value=dir_list)
    diagram_revision_list_scroll_y = tk.Scrollbar(select_diagram_win, orient="vertical", bg="#666666")
    diagram_revision_list = tk.Listbox(select_diagram_win, listvariable=diagram_revision_list_var, selectmode=tk.SINGLE, exportselection=False, font=button_font, bg="#333333", fg="#ffffff", relief=tk.FLAT, yscrollcommand=diagram_revision_list_scroll_y.set)
    diagram_revision_list_scroll_y["command"] = diagram_revision_list.yview
    diagram_revision_list.place(x=30, y=40, width=160, height=140)
    diagram_revision_list_scroll_y.place(x=190, y=40, width=20, height=140)
    diagram_revision_list.select_set(0)
    
    label_diagram_id = tk.Label(select_diagram_win, text="ダイヤ識別名:", font=label_font, fg="#ffffff", bg="#444444")
    label_diagram_id.place(x=240, y=10)
    
    diagram_id_entry = tk.Entry(select_diagram_win, bg="#333333", fg="#ffffff", relief=tk.FLAT)
    diagram_id_entry.place(x=240, y=40, width=200)
    
    if enable_generate_number_check:
        generate_number_value = tk.BooleanVar()
        generate_number_check = tk.Checkbutton(select_diagram_win, variable=generate_number_value, text="仮の列車番号を生成する", font=list_font, bg="#333333", fg="#999999", activebackground="#666666", activeforeground="#ffffff")
        generate_number_check.place(x=240, y=80, width=200)
    else:
        generate_number_value = None
    
    button_ok = tk.Button(select_diagram_win, text="OK", font=button_font, command=select_diagram_ok, bg="#666666", fg="#ffffff", relief=tk.FLAT, highlightbackground="#666666")
    button_ok.place(x=320, y=190, width=120, height=30)


def select_diagram_ok ():
    global select_diagram_callback
    global diagram_revision_list
    global diagram_id_entry
    global generate_number_value
    
    diagram_revision = diagram_revision_list.get(diagram_revision_list.curselection())
    diagram_id = diagram_id_entry.get()
    
    if len(diagram_id) == 0:
        messagebox.showerror("エラー", "ダイヤ識別名を入力してください")
        return
    
    close_select_diagram_win()
    
    if generate_number_value != None:
        select_diagram_callback(diagram_revision, diagram_id, generate_number_value.get())
    else:
        select_diagram_callback(diagram_revision, diagram_id)


def close_select_diagram_win ():
    global select_diagram_win
    
    select_diagram_win.destroy()


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
            
            initialize_db = importlib.import_module("modules.initialize_db")
            initialize_db.initialize_db(mes, config["main_dir"])
        except:
            error_mes(traceback.format_exc())


def embed_train_icon ():
    global config
    
    dir_path = filedialog.askdirectory(title="アイコン画像のあるフォルダを選択してください", initialdir=config["main_dir"])
    
    if len(dir_path) >= 1:
        try:
            clear_mes()
            
            embed_train_icon = importlib.import_module("modules.embed_train_icon")
            embed_train_icon.embed_train_icon(mes, dir_path)
        except:
            error_mes(traceback.format_exc())


def generate_operation_table ():
    global config
    
    select_diagram(generate_operation_table_exec, True)


def generate_operation_table_exec (diagram_revision, diagram_id, generate_train_number):
    try:
        clear_mes()
        
        generate_operation_table = importlib.import_module("modules.generate_operation_table")
        timetable_file_paths = generate_operation_table.generate_operation_table(mes, config["main_dir"], diagram_revision, diagram_id, generate_train_number)
    except:
        error_mes(traceback.format_exc())
        
        timetable_file_paths = False
    
    if timetable_file_paths != False and messagebox.askyesno("次の操作", "出力された時刻表を路線別時刻表に変換しますか？"):
        digits_count = simpledialog.askinteger("列車番号の桁数を指定", "所定の桁数に満たない列車番号の前に「0」を付加する場合にはその桁数を入力してください", initialvalue=0)
        
        if digits_count is None:
            return
        
        for timetable_file_path in timetable_file_paths:
            convert_timetable_1(timetable_file_path, digits_count)


def convert_timetable_1 (input_file_name=None, digits_count=None):
    global config
    
    if input_file_name is None:
        file_name = filedialog.askopenfilename(title="変換対象の時刻表CSVファイルを選択してください", filetypes=[("CSV形式の表ファイル","*.csv")], initialdir=config["main_dir"])
    else:
        file_name = input_file_name
    
    if len(file_name) >= 1:
        if digits_count is None:
            digits_count = simpledialog.askinteger("列車番号の桁数を指定", "所定の桁数に満たない列車番号の前に「0」を付加する場合にはその桁数を入力してください", initialvalue=0)
            
            if digits_count is None:
                return
        
        try:
            if input_file_name is None:
                clear_mes()
            
            convert_timetable_1 = importlib.import_module("modules.convert_timetable_1")
            convert_timetable_1.convert_timetable_1(mes, file_name, digits_count)
        except:
            error_mes(traceback.format_exc())


def convert_timetable_2 ():
    global config
    
    if not os.path.isfile(config["main_dir"] + "/railroad_info.json"):
        messagebox.showwarning("路線別時刻表を変換できません", "現在の作業フォルダには路線別時刻表ファイルの変換に必要な railroad_info.json が存在しません")
        return
    
    select_diagram(convert_timetable_2_exec)


def convert_timetable_2_exec (diagram_revision, diagram_id):
    
    try:
        clear_mes()
        
        convert_timetable_2 = importlib.import_module("modules.convert_timetable_2")
        convert_timetable_2.convert_timetable_2(mes, config["main_dir"], diagram_revision, diagram_id)
    except:
        error_mes(traceback.format_exc())


def convert_operation_table_1 (for_printing):
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
    
    if for_printing:
        file_name_for_printing = filedialog.asksaveasfilename(title="印刷用運用表のファイル名を指定してください", filetypes=[("HTMLファイル","*.html")], initialdir=config["main_dir"], initialfile=os.path.splitext(os.path.basename(file_name))[0] + "_印刷用.html", defaultextension="html")
        
        if len(file_name_for_printing) == 0:
            return
        
        max_columns = simpledialog.askinteger("運用表の列数を指定", "出力する運用表の列数を指定してください", initialvalue=20, minvalue=6)
    
        if max_columns is None:
            return
    else:
        file_name_for_printing = None
        max_columns = None
    
    digits_count = simpledialog.askinteger("列車番号の桁数を指定", "所定の桁数に満たない列車番号の前に「0」を付加する場合にはその桁数を入力してください", initialvalue=0)
    
    if digits_count is None:
        return
    
    try:
        clear_mes()
        
        convert_operation_table_1 = importlib.import_module("modules.convert_operation_table_1")
        new_file_name = convert_operation_table_1.convert_operation_table_1(mes, config["main_dir"], file_name, json_file_name, digits_count, file_name_for_printing, max_columns)
    except:
        error_mes(traceback.format_exc())
        
        new_file_name = False
    
    if not for_printing and new_file_name != False and messagebox.askyesno("次の操作", "出力された区間組成運用表をJSONファイルに変換しますか？"):
        convert_operation_table_2(new_file_name)


def convert_operation_table_2 (input_file_name=None):
    global config
    
    if not os.path.isfile(config["main_dir"] + "/railroad_info.json"):
        messagebox.showwarning("運用表を変換できません", "現在の作業フォルダには運用表ファイルの変換に必要な railroad_info.json が存在しません")
        return
    
    if input_file_name is None:
        file_name = filedialog.askopenfilename(title="変換対象の区間組成運用表CSVファイルを選択してください", filetypes=[("CSV形式の表ファイル","*.csv")], initialdir=config["main_dir"])
    else:
        file_name = input_file_name
    
    if len(file_name) >= 1:
        try:
            if input_file_name is None:
                clear_mes()
            
            convert_operation_table_2 = importlib.import_module("modules.convert_operation_table_2")
            convert_operation_table_2.convert_operation_table_2(mes, config["main_dir"], file_name)
        except:
            error_mes(traceback.format_exc())


def initialize_moderation_db ():
    global config
    
    db_file_path = filedialog.asksaveasfilename(title="モデレーション用データベースの保存先を選択してください", filetypes=[("SQLite3 データベースファイル","*.db")], initialdir=config["main_dir"], initialfile="moderation.db", defaultextension="db")
    if len(db_file_path) >= 1:
        try:
            clear_mes()
            
            initialize_moderation_db = importlib.import_module("modules.initialize_moderation_db")
            initialize_moderation_db.initialize_moderation_db(mes, db_file_path)
        except:
            error_mes(traceback.format_exc())


def open_help_file():
    webbrowser.open("file://" + os.path.abspath("./README.html"))


app_info_win = None

def open_app_info ():
    global app_info_win
    global is_windows
    global icon_image
    
    if app_info_win is not None and app_info_win.winfo_exists():
        return
    
    app_info_win = tk.Toplevel()
    
    app_info_win.title("バージョン情報")
    app_info_win.geometry("480x240")
    app_info_win.resizable(0, 0)
    app_info_win.configure(bg="#444444")
    
    app_info_win.protocol("WM_DELETE_WINDOW", close_app_info)
    
    if is_windows:
        title_font = tk.font.Font(family="Yu Gothic", size=14)
        label_font = tk.font.Font(family="Yu Gothic", size=10)
        button_font = tk.font.Font(family="Yu Gothic", size=11)
    else:
        title_font = tk.font.Font(size=14)
        label_font = tk.font.Font(size=10)
        button_font = tk.font.Font(size=10)
    
    icon_image = tk.PhotoImage(file="files/tools_icon.png")
    label_icon = tk.Label(app_info_win, image=icon_image, bg="#444444")
    label_icon.place(x=208, y=28)
    
    label_title = tk.Label(app_info_win, text=UNYOHUB_GUI_TOOLS_APP_NAME + " v" + UNYOHUB_GUI_TOOLS_VERSION, font=title_font, fg="#ffffff", bg="#444444")
    label_title.place(x=0, y=100, width=480, height=40)
    
    label_license = tk.Label(app_info_win, text=UNYOHUB_GUI_TOOLS_LICENSE_TEXT, font=label_font, fg="#cccccc", bg="#444444")
    label_license.place(x=0, y=140, width=480, height=30)
    
    button_open_license = tk.Button(app_info_win, text="ライセンス", font=button_font, command=open_license_url, bg="#666666", fg="#ffffff", relief=tk.FLAT, highlightbackground="#666666")
    button_open_license.place(x=90, y=180, width=140, height=30)
    
    button_open_repository = tk.Button(app_info_win, text="ソースコード", font=button_font, command=open_repository_url, bg="#666666", fg="#ffffff", relief=tk.FLAT, highlightbackground="#666666")
    button_open_repository.place(x=250, y=180, width=140, height=30)


def open_license_url ():
    webbrowser.open(UNYOHUB_GUI_TOOLS_LICENSE_URL)


def open_repository_url ():
    webbrowser.open(UNYOHUB_GUI_TOOLS_REPOSITORY_URL)


def close_app_info ():
    global app_info_win
    
    app_info_win.destroy()


open_main_window()
