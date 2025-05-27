# coding: utf-8

import os
import sqlite3

def initialize_moderation_db (mes, db_file_path):
    mes("モデレーション用データベースのセットアップ", is_heading=True)
    
    mes("データベースに接続しています...")
    
    if not os.path.exists(db_file_path):
        new_db = True
    else:
        new_db = False
    
    conn = sqlite3.connect(db_file_path)
    
    cur = conn.cursor()
    
    mes("テーブルを作成しています...")
    
    mes("テーブル「unyohub_moderation_deleted_data」を作成しています...")
    cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_moderation_deleted_data`(`moderator_id` TEXT NOT NULL, `deleted_datetime` TEXT NOT NULL, `railroad_id` TEXT NOT NULL, `operation_date` TEXT NOT NULL, `operation_number` TEXT NOT NULL, `user_id` TEXT NOT NULL, `formations` TEXT NOT NULL, `posted_datetime` TEXT NOT NULL, `comment` TEXT, `ip_address` TEXT)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_moderation_idx_d1` ON `unyohub_moderation_deleted_data`(`moderator_id`, `deleted_datetime`)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_moderation_idx_d2` ON `unyohub_moderation_deleted_data`(`deleted_datetime`)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_moderation_idx_d3` ON `unyohub_moderation_deleted_data`(`user_id`, `posted_datetime`)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_moderation_idx_d4` ON `unyohub_moderation_deleted_data`(`railroad_id`, `operation_date`, `operation_number`, `posted_datetime`)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_moderation_idx_d5` ON `unyohub_moderation_deleted_data`(`ip_address`, `posted_datetime`)")
    
    mes("テーブル「unyohub_moderation_timed_out_users」を作成しています...")
    cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_moderation_timed_out_users`(`user_id` TEXT NOT NULL PRIMARY KEY, `expiration_datetime` TEXT NOT NULL)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_moderation_idx_tu1` ON `unyohub_moderation_timed_out_users`(`expiration_datetime`)")
    
    mes("テーブル「unyohub_moderation_user_timed_out_logs」を作成しています...")
    cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_moderation_user_timed_out_logs`(`user_id` TEXT NOT NULL, `timed_out_datetime` TEXT NOT NULL, `moderator_id` TEXT NOT NULL, `timed_out_days` INTEGER NOT NULL, PRIMARY KEY(`user_id`, `timed_out_datetime`))")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_moderation_idx_ul1` ON `unyohub_moderation_user_timed_out_logs`(`timed_out_datetime`)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_moderation_idx_ul2` ON `unyohub_moderation_user_timed_out_logs`(`moderator_id`, `timed_out_datetime`)")
    
    mes("テーブル「unyohub_moderation_timed_out_ip_addresses」を作成しています...")
    cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_moderation_timed_out_ip_addresses`(`ip_address` TEXT NOT NULL PRIMARY KEY, `expiration_datetime` TEXT NOT NULL)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_moderation_idx_ti1` ON `unyohub_moderation_timed_out_ip_addresses`(`expiration_datetime`)")
    
    mes("テーブル「unyohub_moderation_ip_address_timed_out_logs」を作成しています...")
    cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_moderation_ip_address_timed_out_logs`(`ip_address` TEXT NOT NULL, `timed_out_datetime` TEXT NOT NULL, `moderator_id` TEXT NOT NULL, `timed_out_days` INTEGER NOT NULL, PRIMARY KEY(`ip_address`, `timed_out_datetime`))")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_moderation_idx_il1` ON `unyohub_moderation_ip_address_timed_out_logs`(`timed_out_datetime`)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_moderation_idx_il2` ON `unyohub_moderation_ip_address_timed_out_logs`(`moderator_id`, `timed_out_datetime`)")
    
    mes("変更を保存しています...")
    conn.commit()
    conn.close()
    
    if new_db and os.name == "posix":
        os.chmod(db_file_path, 0o766)
    
    mes("処理が完了しました")
