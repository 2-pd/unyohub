--------------------------------------------------------------------------------

  ユーザー投稿型鉄道運用データベース「鉄道運用Hub」設計案    ページ(7)

--------------------------------------------------------------------------------

# コマンドラインツール(「unyohub」コマンド)

## unyohub setup-libs
ライブラリの初期設定を行う  
処理本体は**libs_setup.php**

### 引数
**第1引数** : 管理者ユーザーID(省略時は「unyohub_admin」)


## unyohub embed-icons
車両アイコン画像をJSONファイルに埋め込む  
処理本体は**embed_train_icon.py**

### 引数
**第1引数** : 路線系統識別名


## unyohub conv-formations
編成表データを変換する  
処理本体は**convert_formation_table.py**

### 引数
**第1引数** : 路線系統識別名


## unyohub copy-formation-info
データベース上で編成データをコピーする  
処理本体は**copy_formation_info.py**

### 引数
**第1引数** : コピー元の路線系統識別名  
**第2引数** : コピー元の編成名  
**第3引数** : コピー先の路線系統識別名  
**第4引数** : コピー先の編成名(省略時は第2引数の編成名を使用)


## unyohub clean-formation-db
データベースから編成表にない編成・車両のデータを削除する  
処理本体は**clean_formation_db_table.py**

### 引数
**第1引数** : 路線系統識別名


## unyohub update-operations
運用表をデータベースに書き込む  
処理本体は**write_operations_to_db.py**

### 引数
**第1引数** : 路線系統識別名  
**第2引数** : ダイヤ改正識別名  
**第3引数** : ダイヤ識別名


## unyohub role-info
ロールの情報を表示する  
処理本体は**role_info.php**

### 引数
**第1引数** : ロール識別名(省略時はロールの一覧を表示)


## unyohub create-role
ロールを新規作成する  
処理本体は**create_role.php**

### 引数
**第1引数** : ロール識別名  
**第2引数** : ロール表示名


## unyohub delete-role
ロールを削除する  
処理本体は**delete_role.php**

### 引数
**第1引数** : ロール識別名


## unyohub add-permission
ロールに権限を割り当てる  
処理本体は**add_permission.php**

### 引数
**第1引数** : ロール識別名  
**第2引数** : 権限対象識別名  
**第3引数** : 動作識別名(省略時は「any」)


## unyohub remove-permission
ロールから権限を剥奪する  
処理本体は**remove_permission.php**

### 引数
**第1引数** : ロール識別名  
**第2引数** : 権限対象識別名  
**第3引数** : 動作識別名(省略時は「any」)


## unyohub assign-role
ユーザーにロールを割り当てる  
処理本体は**assign_role.php**

### 引数
**第1引数** : ユーザー識別名  
**第2引数** : ロール識別名


## unyohub remove-role
ユーザーからロールを剥奪する  
処理本体は**remove_role.php**

### 引数
**第1引数** : ユーザー識別名  
**第2引数** : ロール識別名


## unyohub init-db
各路線系統用データベースファイルを生成する  
処理本体は**initialize_db.py**

### 引数
**第1引数** : 路線系統識別名


## unyohub init-moderation-db
モデレーションログ格納データベースファイルを生成する  
処理本体は**initialize_moderation_db.py**

### 引数
(なし)


## unyohub get-gtfs-realtime
鉄道事業者の公開APIから運行情報データを取得し、車両運用情報を更新する  
処理本体は**get_gtfs_realtime.py**

### 引数
**第1引数** : 路線系統識別名(省略時は全路線系統の運行情報データを取得)

### オプション
**-s** : 処理開始をランダムな秒数遅延し、コンソール出力も行わない


## unyohub update-trip-ids
便識別名と列車番号の対応表をデータベースに書き込む  
処理本体は**update_trip_ids.py**

### 引数
**第1引数** : 路線系統識別名  
**第2引数** : ダイヤ改正識別名  
**第3引数** : ダイヤ識別名


## unyohub cache-transitions
運用データから運用遷移データのキャッシュを生成する  
処理本体は**cache_transition_data.py**

### 引数
**第1引数** : YYYY-MM-DD形式のキャッシュ範囲開始日(省略時は実行時の前日の日付を使用)  
**第2引数** : YYYY-MM-DD形式のキャッシュ範囲終了日(省略時は第2引数の日付を使用)
