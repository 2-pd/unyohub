# 鉄道運用Hub
鉄道運用Hubはオープンソースのユーザー投稿型鉄道運用情報データベースアプリケーションです。  

## サーバへのインストール

1. Apacheまたはnginxのwebサーバを用意します。このwebサーバでは、SQLite3モジュールが有効化されたPHP(7以降)が実行できる必要があります。また、nginxを使用する場合は、confファイルで拡張子が「db」のファイルへのアクセスを拒否してください。
2. unyohubフォルダ内のファイルを全てサーバにアップロードします。
3. setup_scriptsフォルダからlibs_setup.phpをサーバにアップロードし、サーバ上で実行します。このとき、管理者ユーザーのユーザーIDと初期パスワードが表示されるため、これらをメモしてください。
4. ここからはサーバではなくPC上での作業となります。作業に使用するPCではコマンドラインからPython3を実行できる必要があります。まずは、unyohubフォルダ内に空のフォルダ「data」を作成し、そこに任意の名前で路線系統のデータフォルダを作成してください。
5. このデータフォルダにsetup_scriptsからinitialize_db.pyをコピーしてPython3で実行すると、railroad.dbが生成されます。
6. documentsフォルダ内のファイル構成資料を参考に、データフォルダ内にrailroad_info.jsonを作成します。
7. 任意の空フォルダに、その路線系統で使用する車両アイコン画像ファイル(拡張子はwebp、png、gifのいずれか)を作成します。それぞれの画像のファイル名(拡張子以外の部分)はアイコンIDとなるため、半角英数字とハイフンのみで構成することを推奨します。
8. このフォルダにsetup_scriptsからembed_train_icon.pyをコピーして実行し、生成されたtrain_icons.jsonを路線系統のデータフォルダにコピーします。
9. documentsフォルダ内のサンプルを参考にして、編成表、各ダイヤの運用表、各路線の時刻表をデータフォルダ内に作成し、それぞれ、convert_formation_table.py、convert_operation_table.py、convert_timetable_2.pyを実行してJSONファイルに変換します。
10. write_operations_to_db.pyを実行して、JSON化された運用表を全てrailroad.dbにインポートします。
11. configフォルダ内のunyohub.jsonを編集し、unyohub.jsonと「data」フォルダ全体をサーバにアップロードすれば、アプリが実行可能となります。
12. エンドユーザーから投稿された運用情報は全てrailroad.dbに蓄積されます。railroad.dbは定期的にバックアップしてください。

## カスタマイズ

鉄道運用Hubのアプリ名やアイコンは以下のファイルを編集することで変更可能です。
- index.html の定数値 UNYOHUB_APP_NAME
- manifest.json の変数値 name 及び short_name
- favicon.ico (同名のアイコンファイルに差し替え)
- apple-touch-icon.webp、maskable_icon.webp、splash_screen_image.webp (それぞれ同名のWebPファイルに差し替え)

なお、2pd.jpドメインのFossilリポジトリ(<https://fossil.2pd.jp/unyohub/>)以外は全てミラーです。リポジトリのクローンを行う場合はFossilリポジトリのご利用を推奨します。  
また、このソフトウェアについてのご質問や不具合の報告は[Midari Create](https://create.2pd.jp/)へご連絡ください。
