<?php
include "../libs/zizai_captcha/main.php";
include "__operation_data_functions.php";

if (!isset($_POST["railroad_id"], $_POST["date"], $_POST["operation_number"], $_POST["assign_order"], $_POST["user_id"], $_POST["one_time_token"])) {
    print "ERROR: 送信値が不正です";
    exit;
}

$moderator_id = NULL;

$user = $wakarana->check();
if (is_object($user)) {
    if ($user->check_one_time_token($_POST["one_time_token"])) {
        $user_id = $user->get_id();
        
        if ($user_id !== $_POST["user_id"]) {
            if (!$user->check_permission("railroads/".$_POST["railroad_id"], "moderate")) {
                print "ERROR: モデレーター権限が確認できませんでした。他のユーザーの投稿は削除できません";
                exit;
            }
            
            $moderator_id = $user_id;
            
            connect_moderation_db();
        }
    } else {
        print "ERROR: ワンタイムトークンの認証に失敗しました。再度ご送信ください";
        exit;
    }
} else {
    print "ERROR: ログイン情報の有効期限が切れています。再ログインしてください";
    exit;
}

if (!load_railroad_data($_POST["railroad_id"])) {
    exit;
}

$ts = convert_date_to_timestamp($_POST["date"]);

if ($ts === FALSE) {
    print "ERROR: 日付が不正です";
    exit;
}

$db_obj->query("BEGIN");

$data_cache_values = revoke_post($ts, $_POST["operation_number"], $_POST["assign_order"], $_POST["user_id"], $moderator_id);

$db_obj->query("COMMIT");

if (!empty($data_cache_values)) {
    if (is_null($data_cache_values["formations"])) {
        $data_cache_values["formations"] = "";
    }
    if (isset($data_cache_values["relieved_formations"])) {
        $data_cache_values["relieved_formations"] = array_map(function ($data_item) {
            return is_null($data_item) ? "" : $data_item;
        }, $data_cache_values["relieved_formations"]);
    }
    
    if (!$data_cache_values["variant_exists"]) {
        unset($data_cache_values["variant_exists"]);
    }
    if (!$data_cache_values["comment_exists"]) {
        unset($data_cache_values["comment_exists"]);
    }
    if (!$data_cache_values["from_beginner"]) {
        unset($data_cache_values["from_beginner"]);
    }
    if (!$data_cache_values["is_quotation"]) {
        unset($data_cache_values["is_quotation"]);
    }
}

$data = array($_POST["operation_number"] => $data_cache_values);

print json_encode($data, JSON_UNESCAPED_UNICODE);
