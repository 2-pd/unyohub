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
    "allow_guest_user" : ログインしていないユーザーの投稿を認めるか(BOOL値)  
}  
  
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
    "role" : ロール(「ADMIN」、「MODERATOR」、「BASE」のいずれか),  
    "is_beginner" : ビギナーユーザーか否か,  
    "created" : YYYY-MM-DD HH:MM:SS形式のユーザー登録日時,  
    "email_address" : メールアドレス,  
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
    "role" : ロール(「ADMIN」、「MODERATOR」、「BASE」のいずれか),  
    "is_beginner" : ビギナーユーザーか否か,  
    "created" : YYYY-MM-DD HH:MM:SS形式のユーザー登録日時,  
    "email_address" : メールアドレス,  
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


## check_announcements.php
新しいお知らせの有無を確認する

### 引数
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC)

### 応答
**タイムスタンプより新しい重要なお知らせがあった場合** :  
文字列「NEW_IMPORTANT_ANNOUNCEMENTS_EXIST」  
  
**announcements.jsonの変更日時がタイムスタンプより新しく、かつ、タイムスタンプより新しい重要なお知らせがなかった場合** :  
文字列「NEW_ANNOUNCEMENTS_EXIST」  
  
**announcements.jsonの変更日時がタイムスタンプ以前だった場合** :  
文字列「NEW_ANNOUNCEMENTS_NOT_EXIST」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## announcements.php
お知らせを取得する

### 引数
(なし)

### 応答
[  
    { 各お知らせの情報  
        "title" : お知らせのタイトル,  
        "is_important" : 重要なお知らせか否か(BOOL値),  
        "content" : お知らせの本文,  
        "user_id" : お知らせを最後に編集したモデレーターのユーザーID,  
        "user_name" : お知らせを最後に編集したモデレーターのハンドルネーム,  
        "last_modified_timestamp" : お知らせが更新されたタイムスタンプ(UTC、秒単位)  
    }...  
]  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される


## railroads.php
サーバに登録されている路線系統の一覧を取得する

### 引数
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC)

### 応答
**railroads_cache.jsonが存在しなかった場合** :  
railroads.txtに登録されている各路線系統のrailroad_info.jsonからrailroads_cache.jsonを生成して返す  
railroads_cache.jsonの変更日時は、生成日時ではなく、railroads.txtと各railroad_info.jsonのうち最も新しいものの変更日時がセットされる  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
**railroads_cache.jsonが存在し、その変更日時がタイムスタンプより新しかった場合** :  
railroads_cache.jsonを返す  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
**railroads_cache.jsonが存在し、その変更日時がタイムスタンプ以前だった場合** :  
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
  
**formations.jsonの変更日時がタイムスタンプ以前だった場合** :  
文字列「NO_UPDATES_AVAILABLE」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## formation_details.php
指定した編成の詳細情報を取得する

### 引数
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["formation_name"]** : 編成名

### 応答
**正常時** :  
{  
    "formation_name" : 編成名,  
    "cars" : [ 各車両の情報  
        {  
            "car_number" : 車番,  
            "manufacturer" : 製造メーカー名,  
            "constructed" : 製造年月日,  
            "description" : 補足説明文  
        }...  
    ],  
    "series_name" : 形式名,  
    "description" : 補足説明文,  
    "inspection_information" : 検査情報,  
    "operations_today" : [ 当日の運用情報(なければNULL)  
        {  
            "operation_number" : 運用番号,  
            "formations" : 組成情報,  
            "posts_count" : 情報の投稿数,  
            "variant_exists" : 投稿情報のバリエーションの有無,  
            "comment_exists" : 運用補足情報の有無,  
            "from_beginner" : ビギナーの投稿か否か  
        }...  
    ],  
    "operations_tomorrow" : [ 翌日の運用情報(なければNULL)  
        {  
            "operation_number" : 運用番号,  
            "formations" : 組成情報,  
            "posts_count" : 情報の投稿数,  
            "variant_exists" : 投稿情報のバリエーションの有無,  
            "comment_exists" : 運用補足情報の有無,  
            "from_beginner" : ビギナーの投稿か否か  
        }...  
    ],  
    "last_seen_date" : 最終目撃日(YYYY-MM-DD形式、当日の運用情報がない場合のみ。データが全く存在しなければNULL),  
    "operations_last_day" : [ 最終目撃日の運用情報(当日の運用情報がない場合のみ。データが全く存在しなければNULL)  
        {  
            "operation_number" : 運用番号,  
            "formations" : 組成情報,  
            "posts_count" : 情報の投稿数,  
            "variant_exists" : 投稿情報のバリエーションの有無,  
            "comment_exists" : 運用補足情報の有無,  
            "from_beginner" : ビギナーの投稿か否か  
        }...  
    ]  
}  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## operation_table.php
指定した路線系統・ダイヤのJSON化された運用表を取得する

### 引数
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["operation_table"]** : 運用表識別名  
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC)

### 応答
**JSON化された運用表の変更日時がタイムスタンプより新しかった場合** :  
JSON化された運用表の内容を返す  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
**JSON化された運用表の変更日時がタイムスタンプ以前だった場合** :  
文字列「NO_UPDATES_AVAILABLE」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## timetable.php
指定した路線系統・ダイヤのJSON化された時刻表を取得する

### 引数
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["operation_table"]** : 運用表識別名(運用表と時刻表は同一識別名のため)  
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC)

### 応答
**JSON化された時刻表の変更日時がタイムスタンプより新しかった場合** :  
JSON化された時刻表の内容を返す  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
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
        "posts_count" : 情報の投稿数,  
        "variant_exists" : 投稿情報のバリエーションの有無,  
        "comment_exists" : 運用補足情報の有無,  
        "from_beginner" : ビギナーの投稿か否か  
    }...  
}  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
**タイムスタンプの時刻より後に運用情報が投稿されていない場合** :  
文字列「NO_UPDATES_AVAILABLE」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## operation_data_detail.php
指定した路線系統の指定した日付の指定した運用番号の詳細な運用情報を取得する

### 引数
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["date"]** : YYYY-MM-DD形式の日付  
**$_POST["operation_numbers"]** : 運用番号(複数ある場合はカンマ区切りで)

### 応答
**正常時** :  
{  
    "運用番号" : [  
        {  
            "user_id" : 情報提供者のユーザーID(アクセス者がモデレーターではない場合、この値はログインしていないユーザーならnull),  
            "user_name" : 情報提供者のハンドルネーム,  
            "is_moderator" : ユーザーがモデレーターか否か,  
            "is_beginner" : ユーザーがビギナーか否か,  
            "website_url" : ユーザーのwebサイトのURL,  
            "formations" : 編成名(前位側・奇数向きから順に各編成を「+」で区切った文字列。運休の場合は空文字列),  
            "posted_datetime" : YYYY-MM-DD HH:MM:SS形式の投稿日時,  
            "comment" : 運用補足情報(コメント),  
            "ip_address" : 投稿者のIPアドレス(アクセス者がモデレーターではない場合、この項目は存在しない)  
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
  
**$_POST["user_id"]** :モデレーション対象のユーザーIDまたは空文字列  
**$_POST["ip_address"]** : モデレーション対象のIPアドレスまたは空文字列

### 応答
**正常時** :  
{  
    "is_suspicious_user" : ユーザーIDが要注意ユーザーに指定済みか否か(ユーザーIDが空の場合はNULL),  
    "host_name" : IPアドレスに対応するホスト名(IPアドレスが空の場合はNULL),  
    "is_suspicious_ip_address" : IPアドレスが要注意IPアドレスに指定済みか否か(IPアドレスが空の場合はNULL)  
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
**$_POST["formations"]** : 編成を前位側(奇数側)から順に「+」で区切った文字列  
**$_POST["comment"]** : 運用補足情報(コメント)  
**$_POST["one_time_token"]** : ワンタイムトークン(ログインしている場合)  
**$_POST["guest_id"]** : 　「*」から始まる仮ユーザーID(ログインしていない場合)  
**$_POST["zizai_captcha_id"]** : Zizai CAPTCHAのセッションID(ログインしていない場合)  
**$_POST["zizai_captcha_characters"]** : Zizai CAPTCHAのユーザー入力文字列(ログインしていない場合)

### 応答
**投稿に成功した場合** :  
{  
  "投稿された運用番号" : {  
        "formations" : 編成名(最も新しい投稿の情報を前位側・奇数向きから順に各編成を「+」で区切った文字列。運休の場合は空文字列),  
        "posts_count" : 情報の投稿数,  
        "variant_exists" : 投稿情報のバリエーションの有無,  
        "comment_exists" : 運用補足情報の有無,  
        "from_beginner" : ビギナーの投稿か否か  
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
**$_POST["user_id"]** : ユーザーID。モデレーターは他のユーザーの投稿も取り消すことができる。  
**$_POST["one_time_token"]** : ワンタイムトークン

### 応答
**取り消しに成功した場合** :  
{  
  "取り消し操作対象の運用番号" : { 他のユーザーからの情報がない場合、この連想配列ではなくnullが格納される  
        "formations" : 他のユーザーの情報に基づく編成名(最も新しい投稿の情報を前位側・奇数向きから順に各編成を「+」で区切った文字列),  
        "posts_count" : 情報の投稿数,  
        "variant_exists" : 投稿情報のバリエーションの有無,  
        "comment_exists" : 運用補足情報の有無,  
        "from_beginner" : ビギナーの投稿か否か  
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


## change_user_data.php
ログイン中のユーザーのプロフィールを書き換える

### 引数
**$_COOKIE["unyohub_login_token"]** : Wakaranaのログイントークン  
  
**$_POST["user_name"]** : ハンドルネーム  
**$_POST["email_address"]** : メールアドレス(パスワードリセットのみに使用)  
**$_POST["website_url"]** : ユーザーのwebサイトのURL  
**$_POST["one_time_token"]** : ワンタイムトークン(ログインしている場合)

### 応答
**書き換えに成功した場合** :  
{  
    "user_id" : ユーザーID,  
    "user_name" : ハンドルネーム,  
    "role" : ロール(「ADMIN」、「MODERATOR」、「BASE」のいずれか),  
    "is_beginner" : ビギナーユーザーか否か,  
    "created" : YYYY-MM-DD HH:MM:SS形式のユーザー登録日時,  
    "email_address" : メールアドレス,  
    "website_url" : ユーザーのwebサイトのURL  
} 
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## change_user_password.php
ログイン中のユーザーのパスワードを変更する

### 引数
**$_COOKIE["unyohub_login_token"]** : Wakaranaのログイントークン  
  
**$_POST["old_password"]** : 古いパスワード  
**$_POST["new_password"]** : 新しいパスワード

### 応答
**変更に成功した場合** :  
文字列「SUCCEEDED」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## mark_user_suspect.php
ユーザーを要注意として標識する

### 引数
**$_COOKIE["unyohub_login_token"]** : モデレーターユーザーのWakaranaのログイントークン  
  
**$_POST["user_id"]** :モデレーション対象のユーザーID

### 応答
**標識に成功した場合** :  
文字列「SUCCEEDED」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## mark_ip_address_suspect.php
IPアドレスを要注意として標識する

### 引数
**$_COOKIE["unyohub_login_token"]** : モデレーターユーザーのWakaranaのログイントークン  
  
**$_POST["ip_address"]** : モデレーション対象のIPアドレス

### 応答
**標識に成功した場合** :  
文字列「SUCCEEDED」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文
