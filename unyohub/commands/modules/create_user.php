<?php
include __DIR__."/../../libs/wakarana/main.php";


$wakarana_base_dir = "config";


print "\n_/_/_/_/ ユーザーの新規登録 _/_/_/_/\n\n";

print "ユーザーアカウント ".addslashes($argv[1])." を作成しています...\n";

$wakarana = new wakarana(__DIR__."/../../".$wakarana_base_dir);

$password = wakarana::create_random_password();

$user = $wakarana->add_user($argv[1], $password, $argv[2]);
if (!is_object($user)) {
    switch ($wakarana->get_rejection_reason()) {
        case "invalid_user_id":
            print "【エラー】ユーザーIDに使用できない文字が含まれています\n";
            break;
        case "user_already_exists":
            print "【エラー】既に他のユーザーが使用しているユーザーIDです\n";
            break;
        default:
            print "【エラー】ユーザーの登録に失敗しました\n";
    }
    
    exit;
}

print "ユーザーアカウントを作成しました\n";
print "パスワード: ".$password."\n";

if (!empty($argv[3])) {
    print "作成したユーザーアカウントにメールアドレスを追加しています...\n";
    
    if (!$user->add_email_address($argv[3])) {
        switch ($user->get_rejection_reason()) {
            case "invalid_email_address":
                print "《注意》正しいメールアドレスが入力されていません\n";
                break;
            case "blacklisted_email_domain":
                print "《注意》使用できないメールアドレスです\n";
                break;
            case "email_address_already_exists":
                print "《注意》既に使用されているメールアドレスです\n";
                break;
            default:
                print "《注意》メースアドレス確認コードの照合に失敗しました\n";
        }
        
        print "メールアドレスの登録はキャンセルされました\n";
    }
}

print "処理が完了しました\n";
