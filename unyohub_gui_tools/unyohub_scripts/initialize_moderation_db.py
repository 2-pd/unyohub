# coding: utf-8

import sqlite3

def initialize_moderation_db (mes, db_file_path):
    mes("モデレーション用データベースのセットアップ", True)
    
    mes("データベースに接続しています...")
    
    conn = sqlite3.connect(db_file_path)
    
    cur = conn.cursor()
    
    mes("テーブルを作成しています...")
    
    cur.execute("CREATE TABLE IF NOT EXISTS `unyohub_moderation_deleted_data`(`moderator_id` TEXT NOT NULL, `deleted_datetime` TEXT NOT NULL, `railroad_id` TEXT NOT NULL, `operation_date` TEXT NOT NULL, `operation_number` TEXT NOT NULL, `user_id` TEXT NOT NULL, `formations` TEXT NOT NULL, `posted_datetime` TEXT NOT NULL, `comment` TEXT, `ip_address` TEXT, PRIMARY KEY(`railroad_id`, `operation_date`, `operation_number`, `user_id`))")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_d1` ON `unyohub_moderation_deleted_data`(`moderator_id`, `deleted_datetime`)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_d2` ON `unyohub_moderation_deleted_data`(`deleted_datetime`)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_d3` ON `unyohub_moderation_deleted_data`(`user_id`, `posted_datetime`)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_d4` ON `unyohub_moderation_deleted_data`(`railroad_id`, `operation_date`, `operation_number`, `posted_datetime`)")
    cur.execute("CREATE INDEX IF NOT EXISTS `unyohub_idx_d5` ON `unyohub_moderation_deleted_data`(`ip_address`, `posted_datetime`)")
    
    mes("処理が完了しました")
