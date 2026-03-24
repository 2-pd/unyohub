# coding: utf-8

def show_help (subcommand=""):
    print("\n\x1b[94m_/_/_/_/\x1b[0m ヘルプ \x1b[94m_/_/_/_/\x1b[0m\n")
    
    match subcommand:
        case "":
            print("サブコマンドの一覧\n")
            
            print("  \x1b[93msetup-libs\x1b[0m                  ライブラリの初期設定を行う")
            print("  \x1b[93membed-icons\x1b[0m                 車両アイコン画像をJSONファイルに埋め込む")
            print("  \x1b[93mconv-formations\x1b[0m             編成表データを変換する")
            print("  \x1b[93mcopy-formation-info\x1b[0m         データベース上で編成データをコピーする")
            print("  \x1b[93mclean-formation-db\x1b[0m          データベースから編成表にない編成・車両のデータを削除する")
            print("  \x1b[93mupdate-operations\x1b[0m           運用表をデータベースに書き込む")
            print("  \x1b[93muser-info\x1b[0m                   ユーザーの情報を表示する")
            print("  \x1b[93mcreate-user\x1b[0m                 ユーザーを新規登録する")
            print("  \x1b[93mmodify-user-info\x1b[0m            ユーザーの情報を変更する")
            print("  \x1b[93mrole-info\x1b[0m                   ロールの情報を表示する")
            print("  \x1b[93mcreate-role\x1b[0m                 ロールを新規作成する")
            print("  \x1b[93mdelete-role\x1b[0m                 ロールを削除する")
            print("  \x1b[93madd-permission\x1b[0m              ロールに権限を割り当てる")
            print("  \x1b[93mremove-permission\x1b[0m           ロールから権限を剥奪する")
            print("  \x1b[93massign-role\x1b[0m                 ユーザーにロールを割り当てる")
            print("  \x1b[93mremove-role\x1b[0m                 ユーザーからロールを剥奪する")
            print("  \x1b[93minit-db\x1b[0m                     各路線系統用データベースファイルを生成する")
            print("  \x1b[93minit-common-dbs\x1b[0m             全路線系統共通データ用データベースファイル群を生成する")
            print("  \x1b[93mget-gtfs-realtime\x1b[0m           鉄道事業者の公開APIから在線情報を取得し、車両運用情報を更新する")
            print("  \x1b[93mupdate-trip-ids\x1b[0m             便識別名と列車番号の対応表をデータベースに書き込む")
            print("  \x1b[93mgenerate-operation-table\x1b[0m    1日分の在線情報をもとに運用表を生成する")
            
            print("\n各サブコマンドのあとに --help を付加して実行するとそのサブコマンドの詳細説明が表示されます")
