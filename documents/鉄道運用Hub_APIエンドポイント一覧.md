--------------------------------------------------------------------------------

  ユーザー投稿型鉄道運用データベース「鉄道運用Hub」設計案    ページ(3)

--------------------------------------------------------------------------------

# APIエンドポイント

## instance_info.php
鉄道運用Hubのインスタンス情報を取得する

### 引数
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC、省略可能)

### 応答
**タイムスタンプが省略されるか、main.iniの変更日時がタイムスタンプより新しかった場合** :  
{  
    "instance_name" : 鉄道運用Hubインスタンスの表示名,  
    "introduction_text" : インスタンスの紹介文(未設定なら省略),  
    "manual_url" : ユーザーマニュアルのURL(未設定なら省略),  
    "administrator_name" : インスタンス運営者名(未設定なら省略),  
    "administrator_url" : インスタンス運営者紹介ページのURL(未設定なら省略),  
    "administrator_introduction" : インスタンス運営者の紹介文(未設定なら省略),  
    "available_days_ahead" : 何日先の日付まで運用情報の閲覧と投稿が可能か,  
    "allow_guest_user" : ログインしていないユーザーの投稿を認めるか(BOOL値),  
    "require_comments_on_speculative_posts" : 未出庫の運用への情報投稿時にコメント入力を強制するか(BOOL値),  
    "quotation_guidelines" : 引用情報を投稿する際に表示される案内文(未設定なら省略)  
}  
  
※上記の他、**Last-Modified**レスポンスヘッダーにインスタンス情報の最終更新日時が出力される  
  
**main.iniの変更日時がタイムスタンプ以前だった場合** :  
文字列「NO_UPDATES_AVAILABLE」


## check_logged_in.php
クライアントのログイン状態を確認し、ログインしていればユーザー情報を返す

### 引数
**$_COOKIE["unyohub_login_token"]** : Wakaranaのログイントークン(ある場合)

### 応答
**ログイン済みの場合** :  
{  
    "user_id" : ユーザーID,  
    "user_name" : ハンドルネーム,  
    "is_control_panel_user" : 管理画面にアクセス可能か否か,  
    "is_management_member" : 運営メンバーか否か,   
    "is_beginner" : ビギナーユーザーか否か,  
    "created" : YYYY-MM-DD HH:MM:SS形式のユーザー登録日時,  
    "website_url" : ユーザーのwebサイトのURL  
}  
  
**ログインしていない場合** :  
文字列「NOT_LOGGED_IN」


## login.php
ログインする

### 引数
**$_POST["user_id"]** : ユーザーID  
**$_POST["password"]** : パスワード  
**$_POST["totp_pin"]** : TOTPのワンタイムコード(2要素認証未設定ユーザーでは空文字列)

### 応答
**ログインに成功した場合** :  
{  
    "user_id" : ユーザーID,  
    "user_name" : ハンドルネーム,  
    "is_control_panel_user" : 管理画面にアクセス可能か否か,  
    "is_management_member" : 運営メンバーか否か,   
    "is_beginner" : ビギナーユーザーか否か,  
    "created" : YYYY-MM-DD HH:MM:SS形式のユーザー登録日時,  
    "website_url" : ユーザーのwebサイトのURL  
}  
  
**ログインに失敗した場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## logout.php
ログアウトする

### 引数
**$_COOKIE["unyohub_login_token"]** : Wakaranaのログイントークン

### 応答
**ログアウトに成功した場合** :  
文字列「LOGGED_OUT」  
  
**ログアウトに失敗した場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## announcements.php
お知らせを取得する

### 引数
**$_POST["railroad_id"]** : 路線系統識別名(路線系統別のお知らせを取得する場合のみ指定)  
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC、省略可能)

### 応答
**タイムスタンプが指定された場合で、announcements.jsonが存在しないかタイムスタンプ以前に更新されていた場合** :  
文字列「NEW_ANNOUNCEMENTS_NOT_EXIST」  
  
**それ以外の場合** :  
[  
    { 各お知らせの情報(有効期限が切れたものはサーバ側で除外される)  
        "title" : お知らせのタイトル,  
        "is_important" : 重要なお知らせか否か(BOOL値),  
        "content" : お知らせの本文,  
        "user_id" : お知らせを最後に編集したモデレーターのユーザーID,  
        "user_name" : お知らせを最後に編集したモデレーターのハンドルネーム,  
        "expiration_timestamp" : お知らせの有効期限のタイムスタンプ(UTC、秒単位),  
        "last_modified_timestamp" : お知らせが更新されたタイムスタンプ(UTC、秒単位)  
    }...  
]  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
※上記の他、**Last-Modified**レスポンスヘッダーにお知らせの最終更新日時が出力される


## railroads.php
railroads.jsonを取得する

### 引数
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC)

### 応答
**railroads.jsonの変更日時がタイムスタンプより新しかった場合** :  
railroads.jsonの内容を返す  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
※上記の他、**Last-Modified**レスポンスヘッダーにrailroads.jsonの最終更新日時が出力される  
  
**railroads.jsonの変更日時がタイムスタンプ以前だった場合** :  
文字列「NO_UPDATES_AVAILABLE」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## railroad_info.php
指定した路線系統のrailroad_info.jsonを取得する

### 引数
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC)

### 応答
**railroad_info.jsonの変更日時がタイムスタンプより新しかった場合** :  
railroad_info.jsonの内容を返す  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
※上記の他、**Last-Modified**レスポンスヘッダーにrailroad_info.jsonの最終更新日時が出力される  
  
**railroad_info.jsonの変更日時がタイムスタンプ以前だった場合** :  
文字列「NO_UPDATES_AVAILABLE」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## train_icons.php
指定した路線系統のtrain_icons.jsonを取得する

### 引数
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC)

### 応答
**train_icons.jsonの変更日時がタイムスタンプより新しかった場合** :  
train_icons.jsonの内容を返す  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
※上記の他、**Last-Modified**レスポンスヘッダーにtrain_icons.jsonの最終更新日時が出力される  
  
**train_icons.jsonの変更日時がタイムスタンプ以前だった場合** :  
文字列「NO_UPDATES_AVAILABLE」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## formations.php
指定した路線系統のformations.jsonを取得する

### 引数
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC)

### 応答
**formations.jsonの変更日時がタイムスタンプより新しかった場合** :  
formations.jsonの内容を返す  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
※上記の他、**Last-Modified**レスポンスヘッダーにformations.jsonの最終更新日時が出力される  
  
**formations.jsonの変更日時がタイムスタンプ以前だった場合** :  
文字列「NO_UPDATES_AVAILABLE」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## formation_overviews.php
指定した路線系統に在籍中の編成の概要一覧を取得する

### 引数
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC)

### 応答
**タイムスタンプの時刻より後に概要情報が更新された編成があった場合** :  
{  
    "編成名" : {  
        "caption" : 1行見出し,  
        "semifixed_formation" : 編成が組み込まれている半固定編成(「+」区切り、半固定編成を組成していない場合は省略),  
        "unavailable" : 運用離脱中か否か(BOOL値)  
    }...  
}  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
※上記の他、**Last-Modified**レスポンスヘッダーに編成情報概要の最終更新日時が出力される  
  
**タイムスタンプの時刻より後に概要情報が更新された編成がない場合** :  
文字列「NO_UPDATES_AVAILABLE」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## formation_details.php
指定した編成の詳細情報を取得する

### 引数
**$_COOKIE["unyohub_login_token"]** : Wakaranaのログイントークン(ある場合)  
  
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["formation_name"]** : 編成名

### 応答
**正常時** :  
{  
    "formation_name" : 編成名,  
    "cars" : [ 各車両の情報(転出・改番済みの編成では省略)  
        {  
            "car_number" : 車番,  
            "manufacturer" : 製造メーカー名,  
            "constructed" : 製造年月日,  
            "description" : 補足説明文  
        }...  
    ],  
    "series_name" : 形式名,  
    "subseries_name" : 番台等を含む形式名(番台等の区分がない場合はNULL),  
    "affiliation" : 所属車両基地,  
    "caption" : 1行見出し,  
    "description" : 補足説明文,  
    "semifixed_formation" : 編成が組み込まれている半固定編成(「+」区切り、半固定編成を組成していない場合は省略),  
    "unavailable" : 運用離脱中か否か(除籍・転出・改番済みの編成では省略),  
    "inspection_information" : 検査情報,  
    "histories" : [ 車歴情報  
        {  
            "event_year_month" : 「YYYY-MM」形式の年月、または「YYYY」形式の年,  
            "event_type" : 変更の種類(「construct」、「modify」、「repaint」、「renewal」、「transfer」、「rearrange」、「unregister」、「other」のいずれか),  
            "event_content" : 変更内容説明文  
        }...  
    ],  
    "updated_timestamp" : 編成情報が更新されたタイムスタンプ(UTC),  
    "edited_user_name" : 最後に編集したユーザーのハンドルネーム(コントロールパネルアクセス権のあるユーザーでアクセスした場合のみ),  
    "reference_books" : [ 参考書籍情報(なければ省略)  
        {  
            "publisher_name" : 出版社名,  
            "book_title" : 書籍名,  
            "authors" : 著者名テキスト(なければNULL),  
            "publication_year" : 発行年(なければNULL)  
        }...  
    ],  
    "operations_today" : [ 当日の運用情報(なければNULL)  
        {  
            "operation_number" : 運用番号,  
            "formations" : 組成情報,  
            "relieved_formations" : 差し替え前の編成を充当順に配列で(差し替えがなければ省略),  
            "posts_count" : 情報の投稿数,  
            "variant_exists" : 投稿情報のバリエーションの有無(なければ省略),  
            "comment_exists" : 運用補足情報の有無(なければ省略),  
            "from_beginner" : ビギナーの投稿か否か(ビギナーでなければ省略),  
            "is_quotation" : 引用情報か否か(引用情報でなければ省略)  
        }...  
    ],  
    "operations_tomorrow" : [ 翌日の運用情報(なければNULL)  
        {  
            "operation_number" : 運用番号,  
            "formations" : 組成情報,  
            "relieved_formations" : 差し替え前の編成を充当順に配列で(差し替えがなければ省略),  
            "posts_count" : 情報の投稿数,  
            "variant_exists" : 投稿情報のバリエーションの有無(なければ省略),  
            "comment_exists" : 運用補足情報の有無(なければ省略),  
            "from_beginner" : ビギナーの投稿か否か(ビギナーでなければ省略),  
            "is_quotation" : 引用情報か否か(引用情報でなければ省略)  
        }...  
    ],  
    "last_seen_date" : 最終目撃日(YYYY-MM-DD形式、当日の運用情報がない場合のみ。データが全く存在しなければNULL),  
    "operations_last_day" : [ 最終目撃日の運用情報(当日の運用情報がない場合のみ。データが全く存在しなければNULL)  
        {  
            "operation_number" : 運用番号,  
            "formations" : 組成情報,  
            "relieved_formations" : 差し替え前の編成を充当順に配列で(差し替えがなければ省略),  
            "posts_count" : 情報の投稿数,  
            "variant_exists" : 投稿情報のバリエーションの有無(なければ省略),  
            "comment_exists" : 運用補足情報の有無(なければ省略),  
            "from_beginner" : ビギナーの投稿か否か(ビギナーでなければ省略),  
            "is_quotation" : 引用情報か否か(引用情報でなければ省略)  
        }...  
    ],  
    "editable" : アクセス者がこの編成の情報を編集する権限を有するか否か(BOOL値、権限がなければ省略)  
}  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## diagram_revisions.php
指定した路線系統のダイヤ改正識別名一覧を取得する

### 引数
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC)

### 応答
**diagram_revisions.txtの変更日時がタイムスタンプより新しかった場合** :  
diagram_revisions.txtの各行の文字列を要素とする配列をJSON化した文字列を返す  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
※上記の他、**Last-Modified**レスポンスヘッダーにdiagram_revisions.txtの最終更新日時が出力される  
  
**diagram_revisions.txtの変更日時がタイムスタンプ以前だった場合** :  
文字列「NO_UPDATES_AVAILABLE」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## diagram_info.php
指定した路線系統の指定したダイヤ改正識別名のダイヤ情報を取得する

### 引数
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["diagram_revision"]** : ダイヤ改正識別名  
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC)

### 応答
**diagram_info.jsonの変更日時がタイムスタンプより新しかった場合** :  
diagram_info.jsonの内容を返す  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
※上記の他、**Last-Modified**レスポンスヘッダーにdiagram_info.jsonの最終更新日時が出力される  
  
**diagram_info.jsonの変更日時がタイムスタンプ以前だった場合** :  
文字列「NO_UPDATES_AVAILABLE」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## operation_table.php
指定した路線系統・ダイヤのJSON化された運用表を取得する

### 引数
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["diagram_revision"]** : ダイヤ改正識別名  
**$_POST["diagram_id"]** : ダイヤ識別名  
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC)

### 応答
**JSON化された運用表の変更日時がタイムスタンプより新しかった場合** :  
JSON化された運用表の内容を返す  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
※上記の他、**Last-Modified**レスポンスヘッダーに運用表JSONファイルの最終更新日時が出力される  
  
**JSON化された運用表の変更日時がタイムスタンプ以前だった場合** :  
文字列「NO_UPDATES_AVAILABLE」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## timetable.php
指定した路線系統・ダイヤのJSON化された時刻表を取得する

### 引数
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["diagram_revision"]** : ダイヤ改正識別名  
**$_POST["timetable_id"]** : 時刻表識別名  
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC)

### 応答
**JSON化された時刻表の変更日時がタイムスタンプより新しかった場合** :  
JSON化された時刻表の内容を返す  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
※上記の他、**Last-Modified**レスポンスヘッダーに時刻表JSONファイルの最終更新日時が出力される  
  
**JSON化された時刻表の変更日時がタイムスタンプ以前だった場合** :  
文字列「NO_UPDATES_AVAILABLE」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## operation_data.php
指定した路線系統の指定した日付の運用情報全体を取得する

### 引数
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["date"]** : YYYY-MM-DD形式の日付  
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC、運用番号指定時は不要)

### 応答
**タイムスタンプの時刻より後に運用情報が投稿されていた場合** :  
{  
    "タイムスタンプの時刻より後に情報投稿のあった運用番号" : { 当該の運用番号に投稿された情報が全て取り消された場合、この連想配列ではなくnullが格納される  
        "formations" : 編成名(最も新しい投稿の情報を前位側・奇数向きから順に各編成を「+」で区切った文字列。運休の場合は空文字列),  
        "relieved_formations" : 差し替え前の編成を充当順に配列で(差し替えがなければ省略),  
        "posts_count" : 情報の投稿数,  
        "variant_exists" : 投稿情報のバリエーションの有無(なければ省略),  
        "comment_exists" : 運用補足情報の有無(なければ省略),  
        "from_beginner" : ビギナーの投稿か否か(ビギナーでなければ省略),  
        "is_quotation" : 引用情報か否か(引用情報でなければ省略)  
    }...  
}  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
※上記の他、**Last-Modified**レスポンスヘッダーに当該日の運用情報の最終更新日時が出力される  
  
**タイムスタンプの時刻より後に運用情報が投稿されていない場合** :  
文字列「NO_UPDATES_AVAILABLE」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## operation_data_detail.php
指定した路線系統の指定した日付の指定した運用番号の詳細な運用情報を取得する

### 引数
**$_COOKIE["unyohub_login_token"]** : Wakaranaのログイントークン(ある場合)  
  
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["date"]** : YYYY-MM-DD形式の日付  
**$_POST["operation_numbers"]** : 運用番号(複数ある場合はカンマ区切りで)

### 応答
**正常時** :  
{  
    "運用番号" : [  
        { 投稿された運用情報。充当順の逆順で、同じ充当順の情報は新しい順に  
            "user_id" : 情報提供者のユーザーID,  
            "user_name" : 情報提供者のハンドルネーム(設定されていない場合はnull),  
            "is_management_member" : ユーザーが運営メンバーか否か(運営メンバーでなければ省略),  
            "is_beginner" : ユーザーがビギナーか否か(ビギナーでなければ省略),  
            "website_url" : ユーザーのwebサイトのURL(なければ省略),  
            "formations" : 編成名(前位側・奇数向きから順に各編成を「+」で区切った文字列。運休の場合は空文字列),  
            "train_number" : 列車番号または「○」(出庫時)、「△」(入庫時)、NULL(引用情報の場合),  
            "assign_order" : 当該運用に何番目に充当された編成の情報か(1から始まり、差し替えのたびに1ずつ増える),  
            "is_quotation" : 引用情報か否か(引用情報でなければ省略),  
            "posted_datetime" : YYYY-MM-DD HH:MM:SS形式の投稿日時,  
            "comment" : 運用補足情報(なければ省略),  
            "ip_address" : 投稿者のIPアドレス(アクセス者が当該路線系統のモデレーター権限を持たない場合、この項目は存在しない)  
        }...  
    ]...  
}  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## operation_data_history.php
指定した編成または運用番号の過去30日間の運用履歴を取得する

### 引数
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["formation_name"]** : 編成名(運用番号を指定する場合は省略)  
**$_POST["operation_number"]** : 運用番号(編成名を指定する場合は省略)

### 応答
**正常時** :  
{  
    "YYYY-MM-DD形式の日付" : [  
        {  
            "operation_number" : 運用番号,  
            "formations" : 編成名(前位側・奇数向きから順に各編成を「+」で区切った文字列。運休の場合は空文字列),  
            "relieved_formations" : 差し替え前の編成を充当順に配列で(差し替えがなければ省略)  
        }...  
    ]...  
}  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文



## moderation_info.php
ユーザーIDとIPアドレスからモデレーション情報を取得する

### 引数
**$_COOKIE["unyohub_login_token"]** : モデレーターユーザーのWakaranaのログイントークン  
  
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["user_id"]** :モデレーション対象のユーザーIDまたは空文字列  
**$_POST["ip_address"]** : モデレーション対象のIPアドレスまたは空文字列

### 応答
**正常時** :  
{  
    "user_name" : ユーザーIDに対応するユーザー名(ユーザーIDが空の場合やゲストユーザーの場合はNULL),  
    "user_created" : ユーザーIDに対応するアカウントが作成されたYYYY-MM-DD HH:MM:SS形式の日時(ユーザーIDが空の場合やゲストユーザーの場合はNULL),  
    "is_timed_out_user" : タイムアウト中のユーザーIDか否か(BOOL値。ユーザーIDが空の場合はNULL),  
    "user_timed_out_logs" : [ ユーザーIDのタイムアウト指定履歴(直近5件を新しい順に。ユーザーIDが空の場合はNULL)  
        {  
            "timed_out_datetime" : YYYY-MM-DD HH:MM:SS形式のタイムアウト設定日時,  
            "moderator_id" : タイムアウトを設定したモデレーターのユーザーID,  
            "moderator_name" : タイムアウトを設定したモデレーターのハンドルネーム,  
            "timed_out_days" : タイムアウトされた日数  
        }...  
    ],  
    "host_name" : IPアドレスに対応するホスト名(IPアドレスが空の場合はNULL),  
    "is_timed_out_ip_address" : タイムアウト中のIPアドレスか否か(BOOL値。IPアドレスが空の場合はNULL),  
    "ip_address_timed_out_logs" : [ IPアドレスのタイムアウト指定履歴(直近5件を新しい順に。IPアドレスが空の場合はNULL)  
        {  
            "timed_out_datetime" : YYYY-MM-DD HH:MM:SS形式のタイムアウト設定日時,  
            "moderator_id" : タイムアウトを設定したモデレーターのユーザーID,  
            "moderator_name" : タイムアウトを設定したモデレーターのハンドルネーム,  
            "timed_out_days" : タイムアウトされた日数  
        }...  
    ],  
}  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## one_time_token.php
ログイン済みのユーザーにワンタイムトークンを発行する

### 引数
**$_COOKIE["unyohub_login_token"]** : Wakaranaのログイントークン

### 応答
**ログイン状態が確認できた場合** :  
{  
  "token" : ワンタイムトークン  
}  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## post.php
運用情報を投稿する

### 引数
**$_COOKIE["unyohub_login_token"]** : Wakaranaのログイントークン(ある場合)  
  
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["date"]** : YYYY-MM-DD形式の日付  
**$_POST["operation_number"]** : 運用番号  
**$_POST["assign_order"]** : 当該運用に何番目に充当された編成の情報か(1から始まり、差し替えのたびに1ずつ増える。上限値は10で、省略時は1とみなす)  
**$_POST["train_number"]** : 列車番号、「○」(出庫時)、「△」(入庫時)のいずれか(引用情報の場合は省略)  
**$_POST["formations"]** : 編成を前位側(奇数側)から順に「+」で区切った文字列  
**$_POST["is_quotation"]** : 引用情報か否か(引用情報の場合は文字列「YES」、引用情報でなければ省略可能)  
**$_POST["comment"]** : 運用補足情報(コメント)  
**$_POST["one_time_token"]** : ワンタイムトークン(ログインしている場合)  
**$_POST["guest_id"]** : 「*」から始まる仮ユーザーID(ログインしていない場合)  
**$_POST["zizai_captcha_id"]** : Zizai CAPTCHAのセッションID(ログインしていない場合)  
**$_POST["zizai_captcha_characters"]** : Zizai CAPTCHAのユーザー入力文字列(ログインしていない場合)

### 応答
**投稿に成功した場合** :  
{  
  "投稿された運用番号" : {  
        "formations" : 編成名(最も新しい投稿の情報を前位側・奇数向きから順に各編成を「+」で区切った文字列。運休の場合は空文字列),  
        "relieved_formations" : 差し替え前の編成を充当順に配列で(差し替えがなければ省略),  
        "posts_count" : 情報の投稿数,  
        "variant_exists" : 投稿情報のバリエーションの有無(なければ省略),  
        "comment_exists" : 運用補足情報の有無(なければ省略),  
        "from_beginner" : ビギナーの投稿か否か(ビギナーのものでなければ省略),  
        "is_quotation" : 引用情報か否か(引用情報でなければ省略)  
    }  
}  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## revoke.php
投稿済みの運用情報を取り消す

### 引数
**$_COOKIE["unyohub_login_token"]** : Wakaranaのログイントークン  
  
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["date"]** : YYYY-MM-DD形式の日付  
**$_POST["operation_number"]** : 運用番号  
**$_POST["assign_order"]** : 当該運用に何番目に充当された編成の情報か(1から始まり、差し替えのたびに1ずつ増える。上限値は10で、省略時は1とみなす)  
**$_POST["user_id"]** : ユーザーID。モデレーターは他のユーザーの投稿も取り消すことができる。  
**$_POST["one_time_token"]** : ワンタイムトークン

### 応答
**取り消しに成功した場合** :  
{  
  "取り消し操作対象の運用番号" : { 他のユーザーからの情報がない場合、この連想配列ではなくnullが格納される  
        "formations" : 他のユーザーの情報に基づく編成名(最も新しい投稿の情報を前位側・奇数向きから順に各編成を「+」で区切った文字列),  
        "relieved_formations" : 差し替え前の編成を充当順に配列で(差し替えがなければ省略),  
        "posts_count" : 情報の投稿数,  
        "variant_exists" : 投稿情報のバリエーションの有無(なければ省略),  
        "comment_exists" : 運用補足情報の有無(なければ省略),  
        "from_beginner" : ビギナーの投稿か否か(ビギナーのものでなければ省略),  
        "is_quotation" : 引用情報か否か(引用情報でなければ省略)  
    }  
}  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## revoke_users_all.php
特定のユーザーが過去24時間に投稿した運用情報を全て取り消す

### 引数
**$_COOKIE["unyohub_login_token"]** : モデレーターユーザーのWakaranaのログイントークン  
  
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["user_id"]** : 取り消し対象のユーザーID  
**$_POST["one_time_token"]** : ワンタイムトークン

### 応答
**取り消しに成功した場合** :  
文字列「SUCCESSFULLY_REVOKED」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## time_out_user.php
ユーザーをタイムアウトさせる

### 引数
**$_COOKIE["unyohub_login_token"]** : モデレーターユーザーのWakaranaのログイントークン  
  
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["user_id"]** :タイムアウト対象のユーザーID  
**$_POST["timed_out_days"]** : タイムアウト日数  
**$_POST["one_time_token"]** : ワンタイムトークン

### 応答
**標識に成功した場合** :  
文字列「SUCCEEDED」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## time_out_ip_address.php
IPアドレスをタイムアウトさせる

### 引数
**$_COOKIE["unyohub_login_token"]** : モデレーターユーザーのWakaranaのログイントークン  
  
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["ip_address"]** : タイムアウト対象のIPアドレス  
**$_POST["timed_out_days"]** : タイムアウト日数  
**$_POST["one_time_token"]** : ワンタイムトークン

### 応答
**標識に成功した場合** :  
文字列「SUCCEEDED」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文
