<?php
include "user_common.php";

print_header("設定・キャッシュデータの削除", FALSE);
?>
    <script>
        function clear_caches () {
            if (confirm("キャッシュデータの削除により運用表や時刻表のデータが再ダウンロードされるため、削除後は多くの通信容量を消費する場合があります。\n\nよろしいですか？")) {
                var wait_screen_elm = document.getElementById("wait_screen");
                
                wait_screen_elm.style.display = "block";
                
                var promise_1 = new Promise (function (resolve, reject) {
                    localStorage.clear();
                    
                    var delete_request = indexedDB.deleteDatabase("unyohub_caches");
                    
                    delete_request.addEventListener("success", resolve);
                    delete_request.addEventListener("error", reject);
                });
                
                var promise_2 = new Promise (function (resolve) {
                    setTimeout(resolve, 500);
                });
                
                Promise.all([promise_1, promise_2]).then(function () {
                    wait_screen_elm.style.display = "none";
                    
                    alert("設定とキャッシュデータを削除しました");
                    
                    if (window.opener !== null) {
                        if (window.opener.location.pathname === "/") {
                            window.opener.location.reload();
                        } else {
                            window.opener.location.pathname = "/";
                        }
                        
                        window.close();
                    }
                }, function () {
                    wait_screen_elm.style.display = "none";
                    
                    alert("キャッシュデータの削除に失敗しました");
                });
            }
        }
    </script>
    <button type="button" class="wide_button" onclick="clear_caches();">設定・キャッシュデータを削除</button>
    <div id="wait_screen"></div>
<?php print_footer(); ?>
