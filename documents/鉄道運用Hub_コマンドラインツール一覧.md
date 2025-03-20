--------------------------------------------------------------------------------

  ユーザー投稿型鉄道運用データベース「鉄道運用Hub」設計案    ページ(7)

--------------------------------------------------------------------------------

# コマンドラインツール(「unyohub」コマンド)

## unyohub setup-libs
ライブラリの初期設定を行う  
処理本体は**libs_setup.php**

### 引数
**第1引数** : 管理者ユーザーID(省略時は「unyohub_admin」)


## unyohub conv-formations
編成表データを変換する  
処理本体は**convert_formation_table.py**

### 引数
**第1引数** : 路線系統識別名


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
**第2引数** : 権限識別名  
**第3引数** : 動作識別名(省略時は「any」)


## unyohub remove-permission
ロールから権限を剥奪する  
処理本体は**remove_permission.php**

### 引数
**第1引数** : ロール識別名  
**第2引数** : 権限識別名  
**第3引数** : 動作識別名(省略時は「any」)


## unyohub add-role
ユーザーにロールを割り当てる  
処理本体は**add_role.php**

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


## unyohub cache-transitions
運用データから運用遷移データのキャッシュを生成する  
処理本体は**cache_transition_data.py**

### 引数
**第1引数** : YYYY-MM-DD形式のキャッシュ範囲開始日(省略時は実行時の前日の日付を使用)  
**第2引数** : YYYY-MM-DD形式のキャッシュ範囲終了日(省略時は第2引数の日付を使用)
