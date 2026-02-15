/* 鉄道運用Hub integration_funcs.js */

function escape_html (text) {
    return text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function escape_form_data (data) {
    return encodeURIComponent(data).replace(/%20/g, "+");
}


function ajax_post (end_point_name, query_str, callback_func, timeout = 30) {
    var ajax_request = new XMLHttpRequest();
    ajax_request.onloadend = function () {
        if (ajax_request.responseText.substring(0, 6) === "ERROR:") {
            mes(ajax_request.responseText, true);
            callback_func(false, null);
        } else if (ajax_request.status === 0) {
            mes("ERROR: ネットワークが不安定です", true);
            callback_func(false, null);
        } else if (ajax_request.status !== 200) {
            mes("ERROR: データの取得に失敗しました(" + ajax_request.status + ")", true);
            callback_func(false, null);
        } else {
            callback_func(ajax_request.responseText, ajax_request.getResponseHeader("last-modified"));
        }
    };
    
    ajax_request.open("POST", "/api/" + end_point_name, true);
    ajax_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    ajax_request.timeout = timeout * 1000;
    ajax_request.send(query_str);
}


var message_area_elm = document.getElementById("message_area");
var message_elm_list = [];

function mes (message_text, is_error = false, display_time = 10) {
    var box_elm = document.createElement("div");
    
    box_elm.innerText = message_text;
    
    var close_button_elm = document.createElement("button");
    
    box_elm.appendChild(close_button_elm);
    close_button_elm.className = "message_close_button";
    close_button_elm.onclick = function () {
        delete_mes(box_elm);
    }
    
    if (is_error) {
        box_elm.className = "error_message";
        
        if (message_elm_list.length >= 1 && message_elm_list[message_elm_list.length - 1].innerText === message_text) {
            delete_mes(message_elm_list[message_elm_list.length - 1]);
        }
    }
    
    if (message_elm_list.length >= 3) {
        delete_mes(message_elm_list[0]);
    }
    
    message_area_elm.prepend(box_elm);
    message_elm_list.push(box_elm);
    
    setTimeout(delete_mes, display_time * 1000, box_elm);
}

function delete_mes (box_elm) {
    var message_index = message_elm_list.indexOf(box_elm);
    
    if (message_index !== -1) {
        message_area_elm.removeChild(box_elm);
        message_elm_list.splice(message_index, 1);
    }
}


var screen_elm = document.getElementById("popup_screen");
var wait_screen_elm = document.getElementById("wait_screen");

var active_popup_id = null;

function open_square_popup (id, title = null) {
    screen_elm.className = "popup_screen_active";
    
    var elm = document.getElementById(id);
    
    if (elm === null) {
        elm = document.createElement("div");
        elm.id = id;
        elm.className = "square_popup";
        
        var buf = "<button type='button' class='popup_close_button' onclick='close_square_popup();'></button>";
        
        if (title !== null) {
            buf += "<h3>" + title + "</h3>";
        }
        
        buf += "<div id='" + id + "_inner'></div>";
        
        elm.innerHTML = buf;
        
        screen_elm.appendChild(elm);
    }
    
    elm.classList.add("popup_active");
    
    active_popup_id = id;
    
    return document.getElementById(id + "_inner");
}

function close_square_popup () {
    screen_elm.className = "";
    document.getElementById(active_popup_id).classList.remove("popup_active");
}

function open_wait_screen () {
    wait_screen_elm.style.display = "block";
    screen_elm.style.backgroundColor = "transparent";
}

function close_wait_screen () {
    wait_screen_elm.style.display = "none";
    screen_elm.style.backgroundColor = "";
}


function check_logged_in (logged_in_callback, not_logged_in_callback, on_error_callback) {
    ajax_post("check_logged_in.php", null, function (response) {
        if (response !== false) {
            if (response !== "NOT_LOGGED_IN") {
                logged_in_callback(JSON.parse(response));
            } else {
                not_logged_in_callback();
            }
        } else {
            on_error_callback();
        }
    });
}

var login_callback_func;

function show_login_form (callback_func) {
    var popup_inner_elm = open_square_popup("login_popup");
    
    var buf = "<h4>IDまたはメールアドレス</h4>";
    buf += "<input type='text' id='login_user_id' autocomplete='username'>";
    buf += "<h4>パスワード</h4>";
    buf += "<input type='password' id='login_password' autocomplete='current-password'>";
    buf += "<div class='link_block'><a href='/user/send_password_reset_email.php' target='_blank' rel='opener'>パスワードを忘れた場合</a></div>";
    buf += "<button type='button' class='wide_button' onclick='challenge_login();'>ログイン</button>";
    
    popup_inner_elm.innerHTML = buf;
    
    login_callback_func = callback_func;
}

function challenge_login () {
    open_wait_screen();
    
    var user_id = document.getElementById("login_user_id").value;
    var password = document.getElementById("login_password").value;
    
    ajax_post("login.php", "user_id=" + escape_form_data(user_id) + "&password=" + escape_form_data(password), function (response) {
        close_wait_screen();
        
        if (response !== false) {
            mes("ログインしました");
            
            login_callback_func(JSON.parse(response));
            close_square_popup();
        }
    });
}

function user_logout (callback_func) {
    if (confirm("ログアウトしますか？")) {
        open_wait_screen();
        
        ajax_post("logout.php", null, function (response) {
            close_wait_screen();
            
            if (response !== false) {
                mes("ログアウトしました");
                
                callback_func();
            }
        });
    }
}
