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
        
        case "setup-libs":
            print("\x1b[93munyohub setup-libs\x1b[0m  ライブラリの初期設定を行う")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : 管理者ユーザーID(省略時は「unyohub_admin」)")
        
        case "embed-icons":
            print("\x1b[93munyohub embed-icons\x1b[0m  車両アイコン画像をJSONファイルに埋め込む")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : 路線系統識別名")
        
        case "conv-formations":
            print("\x1b[93munyohub conv-formations\x1b[0m  編成表データを変換する")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : 路線系統識別名")
        
        case "copy-formation-info":
            print("\x1b[93munyohub copy-formation-info\x1b[0m  データベース上で編成データをコピーする")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : コピー元の路線系統識別名")
            print("  \x1b[33m第2引数\x1b[0m : コピー元の編成名")
            print("  \x1b[33m第3引数\x1b[0m : コピー先の路線系統識別名")
            print("  \x1b[33m第4引数\x1b[0m : コピー先の編成名(省略時は第2引数の編成名を使用)")
        
        case "clean-formation-db":
            print("\x1b[93munyohub clean-formation-db\x1b[0m  データベースから編成表にない編成・車両のデータを削除する")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : 路線系統識別名")
        
        case "update-operations":
            print("\x1b[93munyohub update-operations\x1b[0m  運用表をデータベースに書き込む")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : 路線系統識別名")
            print("  \x1b[33m第2引数\x1b[0m : ダイヤ改正識別名")
            print("  \x1b[33m第3引数\x1b[0m : ダイヤ識別名")
            
            print("\nオプション")
            print("  \x1b[33m-D\x1b[0m : 運用表を書き込むのではなく削除する")
        
        case "user-info":
            print("\x1b[93munyohub user-info\x1b[0m  ユーザーの情報を表示する")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : ユーザー識別名(省略時はユーザーの総数を表示)")
        
        case "create-user":
            print("\x1b[93munyohub create-user\x1b[0m  ユーザーを新規登録する")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : ユーザー識別名")
            print("  \x1b[33m第2引数\x1b[0m : ユーザー表示名")
            print("  \x1b[33m第3引数\x1b[0m : メールアドレス(省略可能)")
        
        case "modify-user-info":
            print("\x1b[93munyohub modify-user-info\x1b[0m  ユーザーの情報を変更する")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : ユーザー識別名")
            
            print("\nオプション")
            print("  \x1b[33m--user-name \"ユーザー表示名\"\x1b[0m : ユーザー表示名を変更する場合は指定")
            print("  \x1b[33m--email-address \"メールアドレス\"\x1b[0m : メールアドレスを変更する場合は指定")
            print("  \x1b[33m--website-url \"webサイトのURL\"\x1b[0m : webサイトのURLを変更する場合は指定")
            print("  \x1b[33m--reset-password\x1b[0m : パスワードを再設定する場合は指定(新しいパスワードはランダムな文字列が自動設定される)")
            print("  \x1b[33m--time-out 日数\x1b[0m : タイムアウトを設定する場合は指定(日数を0とした場合はタイムアウトが解除される)")
            print("  \x1b[33m--enable\x1b[0m : アカウントの凍結を解除する場合は指定")
            print("  \x1b[33m--disable\x1b[0m : アカウントを凍結する場合は指定")
        
        case "role-info":
            print("\x1b[93munyohub role-info\x1b[0m  ロールの情報を表示する")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : ロール識別名(省略時はロールの一覧を表示)")
        
        case "create-role":
            print("\x1b[93munyohub create-role\x1b[0m  ロールを新規作成する")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : ロール識別名")
            print("  \x1b[33m第2引数\x1b[0m : ロール表示名")
        
        case "delete-role":
            print("\x1b[93munyohub delete-role\x1b[0m  ロールを削除する")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : ロール識別名")
        
        case "add-permission":
            print("\x1b[93munyohub add-permission\x1b[0m  ロールに権限を割り当てる")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : ロール識別名")
            print("  \x1b[33m第2引数\x1b[0m : 権限対象識別名")
            print("  \x1b[33m第3引数\x1b[0m : 動作識別名(省略時は「any」)")
        
        case "remove-permission":
            print("\x1b[93munyohub remove-permission\x1b[0m  ロールから権限を剥奪する")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : ロール識別名")
            print("  \x1b[33m第2引数\x1b[0m : 権限対象識別名")
            print("  \x1b[33m第3引数\x1b[0m : 動作識別名(省略時は「any」)")
        
        case "assign-role":
            print("\x1b[93munyohub assign-role\x1b[0m  ユーザーにロールを割り当てる")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : ユーザー識別名")
            print("  \x1b[33m第2引数\x1b[0m : ロール識別名")
        
        case "remove-role":
            print("\x1b[93munyohub remove-role\x1b[0m  ユーザーからロールを剥奪する")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : ユーザー識別名")
            print("  \x1b[33m第2引数\x1b[0m : ロール識別名")
        
        case "init-db":
            print("\x1b[93munyohub init-db\x1b[0m  各路線系統用データベースファイルを生成する")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : 路線系統識別名")
        
        case "init-common-dbs":
            print("\x1b[93munyohub init-common-dbs\x1b[0m  全路線系統共通データ用データベースファイル群を生成する")
        
        case "get-gtfs-realtime":
            print("\x1b[93munyohub get-gtfs-realtime\x1b[0m  鉄道事業者の公開APIから在線情報を取得し、車両運用情報を更新する")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : 路線系統識別名(省略時は公開APIエンドポイントが登録されている全路線系統の在線情報を取得)")
            
            print("\nオプション")
            print("  \x1b[33m-s\x1b[0m : 処理開始をランダムな秒数遅延し、コンソール出力も行わない")
        
        case "update-trip-ids":
            print("\x1b[93munyohub update-trip-ids\x1b[0m  便識別名と列車番号の対応表をデータベースに書き込む")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : 路線系統識別名")
            print("  \x1b[33m第2引数\x1b[0m : ダイヤ改正識別名")
            print("  \x1b[33m第3引数\x1b[0m : ダイヤ識別名")
            
            print("\nオプション")
            print("  \x1b[33m-D\x1b[0m : 対応表を書き込むのではなく削除する")
        
        case "generate-operation-table":
            print("\x1b[93munyohub generate-operation-table\x1b[0m  1日分の在線情報をもとに運用表を生成する")
            
            print("\n引数")
            print("  \x1b[33m第1引数\x1b[0m : 路線系統識別名")
            print("  \x1b[33m第2引数\x1b[0m : YYYY-MM-DD形式の日付")
        
        case _:
            print("\x1b[31mサブコマンド \x1b[1m" + subcommand + "\x1b[22m は存在しません\x1b[0m")
