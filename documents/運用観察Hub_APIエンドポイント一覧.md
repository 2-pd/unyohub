--------------------------------------------------------------------------------

  ユーザー投稿型鉄道運用データベース「運用観察Hub」設計案    ページ(3)

--------------------------------------------------------------------------------

# APIエンドポイント

## check_logged_in.php
クライアントのログイン状態を確認し、ログインしていればユーザー情報を返す。

### 引数
**$_COOKIE["unyohub_login_token"]** : Wakaranaのログイントークン(ある場合)

### 応答
**ログイン済みの場合** :  
{  
    "user_id" : ユーザーID,  
    "user_name" : ハンドルネーム,  
    "role" : ロール(「ADMIN」、「MODERATOR」、「BASE」のいずれか),  
    "created" : YYYY-MM-DD HH:MM:SS形式のユーザー登録日時,  
    "email_address" : メールアドレス,  
    "website_url" : ユーザーのwebサイトのURL  
}  
  
**ログインしていない場合** :  
文字列「NOT_LOGGED_IN」


## check_sign_up.php
ユーザーIDとパスワードが登録可能であるかを確認する

### 引数
**$_POST["user_id"]** : ユーザーID  
**$_POST["password"]** : パスワード

### 応答
**登録可能である場合** :  
文字列「OK」  
  
**登録可能ではない場合** :  
説明文の文字列


## sign_up.php
ユーザー登録を行う

### 引数
**$_POST["user_id"]** : ユーザーID  
**$_POST["password"]** : パスワード  
**$_POST["user_name"]** : ハンドルネーム  
**$_POST["zizai_captcha_id"]** : Zizai CAPTCHAのセッションID  
**$_POST["zizai_captcha_characters"]** : Zizai CAPTCHAのユーザー入力文字列

### 応答
**登録に成功した場合** :  
{  
    "user_id" : ユーザーID,  
    "user_name" : ハンドルネーム,  
    "role" : ロール(「ADMIN」、「MODERATOR」、「BASE」のいずれか),  
    "created" : YYYY-MM-DD HH:MM:SS形式のユーザー登録日時,  
    "email_address" : メールアドレス,  
    "website_url" : ユーザーのwebサイトのURL  
}  
  
**登録に失敗した場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## login.php
ログインする

### 引数
**$_POST["user_id"]** : ユーザーID  
**$_POST["password"]** : パスワード

### 応答
**ログインに成功した場合** :  
{  
    "user_id" : ユーザーID,  
    "user_name" : ハンドルネーム,  
    "role" : ロール(「ADMIN」、「MODERATOR」、「BASE」のいずれか),  
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


## railroads.php
サーバに登録されている路線系統の一覧を取得する

### 引数
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC)

### 応答
**unyohub.jsonまたは各路線データフォルダのrailroad_info.jsonの変更日時がタイムスタンプより新しかった場合** :  
{  
    "路線系統識別名" : {  
      "railroad_name" : 路線系統表示名,  
      "railroad_icon" : BASE64エンコードされた路線系統のアイコンデータ  
    }...  
}  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される
  
**unyohub.json及び各路線データフォルダのrailroad_info.jsonの変更日時がいずれもタイムスタンプ以前だった場合** :  
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
指定した路線系統の指定した日付の運用情報を取得する

### 引数
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["date"]** : YYYY-MM-DD形式の日付  
**$_POST["operation_number"]** : 運用番号(省略時は全運用の概要を返す)  
**$_POST["last_modified_timestamp"]** : タイムスタンプ(UTC、運用番号指定時は不要)

### 応答
**運用番号指定時** :  
{  
    [  
        "user_id" : 情報提供者のユーザーID,  
        "user_name" : 情報提供者のハンドルネーム,  
        "is_moderator" : ユーザーがモデレーターか否か,  
        "formations" : 編成名(前位側・奇数向きから順に配列で),  
        "posted_datetime" : YYYY-MM-DD HH:MM:SS形式の投稿日時,  
        "comment" : コメント  
    ]...  
}  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
**運用番号省略時、タイムスタンプの時刻より後に運用情報が投稿されていた場合** :  
{  
    "情報投稿のあった運用番号" : {  
        "formations" : 編成名(最も新しい投稿の情報を前位側・奇数向きから順に配列で),  
        "variants_count" : 投稿情報のバリエーション数  
    }...  
}  
▲クライアント端末からAccept-Encodingヘッダーが送信されていた場合、このデータは自動的にgzip圧縮される  
  
**運用番号省略時、タイムスタンプの時刻より後に運用情報が投稿されていない場合** :  
文字列「NO_UPDATES_AVAILABLE」  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## user_data.php
指定したユーザーの情報を取得する

### 引数
**$_POST["user_id"]** : ユーザーID

### 応答
**ユーザー情報の取得に成功した場合** :  
{  
    "user_id" : ユーザーID,  
    "user_name" : ハンドルネーム,  
    "role" : ロール(「ADMIN」、「MODERATOR」、「BASE」のいずれか),  
    "created" : YYYY-MM-DD HH:MM:SS形式のユーザー登録日時,  
    "website_url" : ユーザーのwebサイトのURL  
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
**$_POST["comment"]** : コメント  
**$_POST["one_time_token"]** : ワンタイムトークン(ログインしている場合)  
**$_POST["guest_id"]** : 　「*」から始まる仮ユーザーID(ログインしていない場合)  
**$_POST["zizai_captcha_id"]** : Zizai CAPTCHAのセッションID(ログインしていない場合)  
**$_POST["zizai_captcha_characters"]** : Zizai CAPTCHAのユーザー入力文字列(ログインしていない場合)

### 応答
**投稿に成功した場合** :  
{  
  "投稿された運用番号" : {  
        "formations" : 編成名(最も新しい投稿の情報を前位側・奇数向きから順に配列で),  
        "variants_count" : 投稿情報のバリエーション数  
    }  
}  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## post_text.php
運用観察ノートからコピーした運用情報を一括投稿する

### 引数
**$_COOKIE["unyohub_login_token"]** : Wakaranaのログイントークン(ある場合)  
  
**$_POST["railroad_id"]** : 路線系統識別名  
**$_POST["content"]** : 1行に1運用ずつ運用情報が記載されたテキストデータ  
**$_POST["one_time_token"]** : ワンタイムトークン(ログインしている場合)  
**$_POST["guest_id"]** : 　「*」から始まる仮ユーザーID(ログインしていない場合) 
**$_POST["zizai_captcha_id"]** : Zizai CAPTCHAのセッションID(ログインしていない場合)  
**$_POST["zizai_captcha_characters"]** : Zizai CAPTCHAのユーザー入力文字列(ログインしていない場合)

### 応答
**投稿に成功した場合** :  
{  
  "投稿された運用番号" : {  
        "formations" : 編成名(最も新しい投稿の情報を前位側・奇数向きから順に配列で),  
        "variants_count" : 投稿情報のバリエーション数  
    }...  
}  
  
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
  "updated" : ユーザー情報の更新日時  
} 
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## change_user_password.php
ログイン中のユーザーのパスワードを変更する

### 引数
**$_COOKIE["unyohub_login_token"]** : Wakaranaのログイントークン  
  
**$_POST["old_password"]** : 古いパスワード  
**$_POST["new_password"]** : 新しいパスワード  
**$_POST["one_time_token"]** : ワンタイムトークン(ログインしている場合)

### 応答
**変更に成功した場合** :  
{  
  "updated" : ユーザー情報の更新日時  
}  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文


## change_user_role.php
ユーザーのロールを変更する(管理者専用)

### 引数
**$_COOKIE["unyohub_login_token"]** : Wakaranaのログイントークン(管理者ユーザーのもの)  
  
**$_POST["user_id"]** : ユーザーID  
**$_POST["role"]** : 設定するロール(「ADMIN」、「MODERATOR」、「BASE」のいずれか)  
**$_POST["one_time_token"]** : ワンタイムトークン(ログインしている場合)

### 応答
**変更に成功した場合** :  
{  
  "updated" : ユーザー情報の更新日時  
}  
  
**エラーの場合** :  
文字列「ERROR: 」とそれに続くエラー内容文
