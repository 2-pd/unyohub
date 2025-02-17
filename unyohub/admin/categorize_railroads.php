<?php
include "admin_common.php";

if (!$user->check_permission("instance_administrator")) {
    print "【!】アクセス中のユーザーアカウントにはこのページにアクセスする権限がありません";
    exit;
}

print_header();


$railroads = json_decode(file_get_contents(RAILROADS_JSON_PATH), TRUE);

if (isset($_POST["railroad_categories"])) {
    if (!isset($_POST["one_time_token"]) || !$user->check_one_time_token($_POST["one_time_token"])) {
        print "<script> alert('【!】ワンタイムトークンが無効です。処理はキャンセルされました。'); </script>";
        
        $railroad_categories = $_POST["railroad_categories"];
        
        goto on_error;
    }
    
    $categories = array();
    $category_cnt = -1;
    
    foreach (explode("\n", $_POST["railroad_categories"]) as $row_str) {
        $row_str = trim($row_str);
        
        if (empty($row_str)) {
            continue;
        }
        
        if (substr($row_str, 0, 2) === "# ") {
            $category_cnt++;
            $subcategory_cnt = -1;
            
            $categorized_railroad_ids = array();
            
            $row_str_exploded = explode(":", substr($row_str, 2));
            $categories[] = array("category_name" => trim($row_str_exploded[0]), "category_color" => (!empty($row_str_exploded[1]) ? trim($row_str_exploded[1]) : "#333333"));
        } else {
            if ($category_cnt === -1) {
                print "<script> alert('【!】グループに属さないサブグループや路線系統を設定することはできません。処理はキャンセルされました。'); </script>";
                
                $railroad_categories = $_POST["railroad_categories"];
                
                goto on_error;
            }
            
            if (substr($row_str, 0, 3) === "## ") {
                $subcategory_cnt++;
                
                $categorized_railroad_ids = array();
                
                if ($subcategory_cnt === 0) {
                    if (array_key_exists("railroads", $categories[$category_cnt])) {
                        print "<script> alert('【!】グループにサブグループと路線系統の両方を直接所属させることはできません。処理はキャンセルされました。'); </script>";
                        
                        $railroad_categories = $_POST["railroad_categories"];
                        
                        goto on_error;
                    }
                    
                    $categories[$category_cnt]["subcategories"] = array();
                }
                
                $row_str_exploded = explode(":", substr($row_str, 3));
                $categories[$category_cnt]["subcategories"][] = array("subcategory_name" => trim($row_str_exploded[0]), "subcategory_color" => (!empty($row_str_exploded[1]) ? trim($row_str_exploded[1]) : "#333333"), "railroads" => array());
            } else {
                $railroad_id = trim($row_str);
                
                if (!array_key_exists($railroad_id, $railroads["railroads"])) {
                    print "<script> alert('【!】有効でない路線系統識別名が含まれています。処理はキャンセルされました。'); </script>";
                    
                    $railroad_categories = $_POST["railroad_categories"];
                    
                    goto on_error;
                }
                
                if (in_array($railroad_id, $categorized_railroad_ids)) {
                    continue;
                }
                
                $categorized_railroad_ids[] = $railroad_id;
                
                if ($subcategory_cnt >= 0) {
                    $categories[$category_cnt]["subcategories"][$subcategory_cnt]["railroads"][] = $railroad_id;
                } else {
                    if (!array_key_exists("railroads", $categories[$category_cnt])) {
                        $categories[$category_cnt]["railroads"] = array();
                    }
                    
                    $categories[$category_cnt]["railroads"][] = $railroad_id;
                }
            }
        }
    }
    
    $railroads["categories"] = $categories;
    
    file_put_contents(RAILROADS_JSON_PATH, json_encode($railroads, JSON_UNESCAPED_UNICODE));
    
    print "<script> alert('路線系統グループを更新しました'); </script>";
}

$railroad_categories = "";

$categorized_railroads = array();

foreach ($railroads["categories"] as $category) {
    $railroad_categories .= (!empty($railroad_categories) ? "\n" : "")."# ".$category["category_name"]." : ".$category["category_color"]."\n";
    
    if (array_key_exists("subcategories", $category)) {
        foreach ($category["subcategories"] as $subcategory) {
            $railroad_categories .= "## ".$subcategory["subcategory_name"]." : ".$subcategory["subcategory_color"]."\n";
            
            foreach ($subcategory["railroads"] as $railroad_id) {
                $railroad_categories .= $railroad_id."\n";
                
                $categorized_railroads[] = $railroad_id;
            }
        }
    } elseif (array_key_exists("railroads", $category)) {
        foreach ($category["railroads"] as $railroad_id) {
            $railroad_categories .= $railroad_id."\n";
            
            $categorized_railroads[] = $railroad_id;
        }
    }
}

$uncategorized_railroads = array_diff(array_keys($railroads["railroads"]), $categorized_railroads);

if (!empty($uncategorized_railroads)) {
    if ($cnt == 0 || $railroads["categories"][$cnt - 1]["category_name"] !== "その他") {
        $railroad_categories .= ($cnt >= 1 ? "\n" : "")."# その他 : #333333\n";
    }
    
    foreach ($uncategorized_railroads as $railroad_id) {
        $railroad_categories .= $railroad_id."\n";
    }
}

on_error:


print "<article>";

print "<h2>路線系統グループの編集</h2>";

print "<form action='categorize_railroads.php' method='post'>";
print "<input type='hidden' name='one_time_token' value='".$user->create_one_time_token()."'>";

print "<div class='informational_text'>路線系統は識別名で、グループ名は先頭に「# 」を、サブグループ名は先頭に「## 」を付けてそれぞれ1行に1つずつ入力してください。<br>グループ名やサブグループ名のあとに「:」を入力すると、そのあとにテーマカラーを「#」に続く6桁の16進数で指定することができます。</div>";

print "<textarea name='railroad_categories' class='rule_content'>".htmlspecialchars($railroad_categories)."</textarea>";

print "<button type='submit' class='wide_button'>上書き保存</button>";
print "</form>";

print "</article>";


print_footer();
