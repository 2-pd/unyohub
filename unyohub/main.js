/* 鉄道運用Hub main.js */

const UNYOHUB_INDEXEDDB_VERSION = 2412001;


const UNYOHUB_GENERIC_TRAIN_ICON = "data:image/webp;base64,UklGRngCAABXRUJQVlA4TGwCAAAvT8AdEJVIkm07bhst/QLu7Zlm2YK2CYgQP35pmv/Uls0uAgq2bcee31a2bc5bstkct2Tbjl60ze4t2bZtPRMQ53o2pNDRH8YI4BcYfVlNvSh4lsHnZOiTzqZEzTzPErPzCSdpnudFuv2aAcWwxMQBHRES3XFCAYqI2yb9LVYokNiCsUOMFV9U1gCRbyT58wfwklUxXrzIeBT/hJhAzpP4X8NCrHfNyC3QJFEQ1ayTuGA6LbObznnkdUvfgH63jYflyhLTdynrKjFLNFlYeaEZVAQYHCljCxiRIxqS7x6/Q8TtwgsBFkr86Ltq9OvtEXZBcQmY5OqAtoMjYDQ72KHCCuV22LTCthnkMvsis5JS7ZBihWk7TNn4w5E/O+kP50/6OAd0NqTIiQlOZPzB+ERENiwn2eMJoYs7dcstnSkYXAsUMrhR5/eU/kMehCPHgIMcZYcB+PEjF/nG58iLhA85yfuLqEY34OZvBcrFDz6/qAX2chTbIvl7ci9SqCfz/5EQ5EkKLPDxJHkXuHmSXIvs4slcoPck64pXnidwC2iefFGL4M2PKaps+sFGjUk/mKjR6AcNNbL8SJk1wvyYatnkB8baHs+PFxcItWDdC9biKB1eLMdSvBfEHYvg3gPuYjCLHrAwbPGA9mEUeUDhsBTtAVHDcPYgOw17ZXkAc9gOyVt/0w45LFjtj5VoZKA/+luo7o+qFmL7SzEtyb0/3FpeRP0hbAHDd2/8/MO2BLu9sRPNTPbGRBu1vVHTlhJ7I6ENbgodXsyjFvPwra21iFGLMH3+8CrxMs4mXW1RLVE5zio9bQW2lxj5colzHQ==";

const UNYOHUB_UNKNOWN_TRAIN_ICON = "data:image/webp;base64,UklGRqADAABXRUJQVlA4TJMDAAAvT8AdELVQuq03kST1T3+OaO5eMQ8zM/OOeXbMzMwQUY6wrMGVWo2FMUWRldBVEVIACCDAyGa2bXtLNpvjlmzb0Yu22b0l27b9uAmwv+qFRQhPPi+MIP5C8vFEVGnAqwvsBoK2y7PtTt1wOHRnftjiwH04HI7cp5fEIMSoO1PXCJuZO73WooOb2fSG++pYCkXu7KBgqWyHLBvgFAoJgfwD3gojS2elHs/Of8JEoM+L839iEmwy62voS6DFfWi1hZk7V8yGVfbDJc+8r4df8OX1dZ5GZ1lhdta9MKuxoTstEia80YqQGSI4U3HCE3JCU/DfI242fZo3giRUCWDgrCc/Oz1vchHi2kVyc42wHJxdaOEkhyopVMphWwq7YtB3saWelJAuhzQpzMphRsbKSf7JCf9wXUozLixCdL/KmQufZ7InqrAYt7JHnDB6ePBsuac7hCLWBBmyuPPMZ0LmLumok5y6gpwUThEE8MdV5Be/KUodvlxJPkutOnpBzeUaZE7rwfcO2QqOrij2lRDY2m5u5kU+4Ft+4Vcad9/wHs9zAztpLQRWQnhLl/A6v9An7F7mOC0N2zvA/K8kf4k9iLqeH+gFfs81CHqYX5HZ3YuYW+mldjch5FI6Mf3PXIiIko/4FcEfUiBhoRd9JwJKvkbWV/yf7ir62F94nEOUeOPNHOVZovorSPcEMd3EW76NqMdI9zYxj+Ktv0DMW6QbxeyjvaWYr0k3HTEdaG8HMT+Tro9c9fa3ENP/9ZP592sjZlqHpZhlHZ4j5oQKN9PHPk4e21k7FXF+8Cx99JXk8Ah9yuUSbe7HlfmMrSgzfTGuzO24Mg/iunzPdbgur7AX0KR7hQvwdrPoRu/xHDewE29b3l146v9oEJJMdAiu4KdJ8K3goUlwrxRumqxVMNekMKtsVtME1QpymuyQrRgfevRWy3aqR/iVyLtIxVYd03owVUezHjTVkaNHyK4jQo9BXWGlB5Z1e8T5o8UpJOqMTS3YsCnpSiR4PFVI1IKEqcx41IAHi2ZZA5bixhrQGUeJBhTHhVgNiInDVYPCJW6zkgYoxm0S5CO/fhBnrOfHmjVkKD8Gm1CbHzVNiM8vxDUJnvnh0aTUyg/NJojwm9upw6JNjP3c2LPG87mtNqM+N+qaheTcSGqGagiPrwyTVobxG82aVixpxUT/9eHdnbc06+5nZVHrTnWa8+4Lsgz705b49Gn7qw4A";

const UNYOHUB_CANCELED_TRAIN_ICON = "data:image/webp;base64,UklGRjoEAABXRUJQVlA4TC4EAAAvT8AdEEfEKJJsJ73k6IIz/r1gAAUcMyLYRratZHHJ6b8W6iB0J3dHkSTLStbf2F1wxr8XDKCA4x+3se06ivS+8JB5E0EEFWwN9EcH1ERGF2uF9mkdIFA/ga4+29Jq2EWJR/SM8jJX3C+j0Q4LKDZQrFGgUGi+foi8Gc4ut9L6BZECgEbiR4wR/ASJLK+1K9/1f1T/6nR+lvpdd+f17TFWtnLlU+b29SqDNfOV53fKuD/afDkc/KCHo0aACBBx/VMj4Nc/hFfxpgCAHgQRvw8CRAUAMBgMhjkAAJgCmAIApjAABiQoQQSIFjV6EAThIByRIAcRCapBRIL6BEURLp4gDuW935qv7NMvHNK2bTsbKWPbWO+ObWtt22ZmbXt/9zbN+zz3m2M+P32iiP5DcNtGkqRIM3vv3FOo/oGzUc/PA+yJwRx94rInDaGcfiSAeXwKyLkFkWsHVEXuKmFCEVVNRZJzMPJuibwKVVXkjRImFVFVvSFy+wKKK57rzObvoisfUX9h3X12yuGjpx/J+gHMX3gm60cdJn7X9zSC6yJ71cNJkfm3t+++iJ+nj12J03Q+F95+G7tyUj2zV+Qd5PNHK3mq5w+vzbmMCdfS86p58fNvChp5/RjwsE++KW7Chy5kZi7gOC6gSXB8QLEHx30UL3CvQgKbGMUlHJ9QLOG4Q6Wkoqa5fqC0wMv5H09wpFHopaB0oD6pqYgz5Jc1tXimqvPU/vd3Zl3w5F6u7Q87U+8lj8vyHS2X7Nk54VqaXOJz0dUpbvRBuiyZ62rxIYwqRPy1nUhUKyZtJ1GDGLWcNNSJWbtJMiAErSZhqVC0maQFlSQtlqTa307SWrE6qsM9hMuzYwzBZDfl4g45/zkwSdNO4wc8uESt5GZB1UbZkMXnA110fjDE5gtHZP6wxGWAJyoTTDEZ4YrIDFt+BPhyowCQFwmEnGhApEcEIzUqEDdtpkUGIy06NCExIAqIA1V2LMgy40GXFROGjLhwJMeG4xYK21I3YGwfs8hkN/GTmA0vqlxY0WXCiSMPRjxZ0OPKgRxfBtQQ0sG0dRdJFoDFjPaQZAFYzBBlwV7MkGXBXMwwpPAVshCEeTDDEcS6Emcuw3fAuhLooQzH+CE95tmeZQc1l+EsN6y/M/xhBvavk5lpVmCTrG1QTmgTL8uM4N728o4e3lUvl8lZ8LKXEWo2HPVQ2EbMiq1F/+mvDtI+UrU6wdvnCt4+XPD2CYO3jxm8fdbg7QMHb586ePvoWm7Iuup7HKJ30rU2mvgch8g+TtLRNzjlWpwo7ks9x0l85p5rfWI1zE37RCZ22+eqiS/22WfisH2+mzhjn18mLjy1zZN/apoHtnmgRpZtc9vMe9usmblom89mfh/wHxERNQ33cuUc5mRAX66NnsciMf9yYdktchVwubBzQgCXa4MeBQ==";


function escape_html (text) {
    return text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function escape_form_data (data) {
    return encodeURIComponent(data).replace(/%20/g, "+");
}

function add_slashes (text) {
    return text.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, "\\\"");
}

function convert_to_html (text) {
    var split_text = escape_html(text).replace(/https?:\/\/[^\s\\`\|\[\]\{\}\^]+/g, "<a href='$&' target='_blank' class='external_link'>$&</a>").split("\n");
    
    for (var cnt = 0; cnt < split_text.length; cnt++) {
        if (split_text[cnt].substring(0, 2) === "# ") {
            split_text[cnt] = "<h4>" + split_text[cnt].substring(2) + "</h4>";
        } else if (cnt + 1 < split_text.length && split_text[cnt + 1].substring(2) !== "# ") {
            split_text[cnt] += "<br>";
        }
    }
    
    return split_text.join("");
}

function str_to_halfwidth (str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (char) {
        return String.fromCharCode(char.charCodeAt(0) - 0xFEE0);
    });
}


function get_timestamp () {
    return Math.floor(Date.now() / 1000);
}

function get_date_string (ts) {
    var dt = new Date((ts - 10800) * 1000);
    return dt.getFullYear() + "-" + ("0" + String(dt.getMonth() + 1)).slice(-2) + "-" + ("0" + dt.getDate()).slice(-2);
}

function get_hh_mm (ts = null) {
    if (ts === null) {
        var dt = new Date();
    } else {
        var dt = new Date(ts * 1000);
    }
    
    var hours = dt.getHours();
    var minutes = ("0" + dt.getMinutes()).slice(-2);

    if (hours < 3) {
        hours += 24;
    }
    hours = ("0" + hours).slice(-2);

    return hours + ":" + minutes;
}

function get_date_and_time (ts_or_date_str) {
    if (typeof ts_or_date_str === "string") {
        var dt = new Date(ts_or_date_str);
    } else if (ts_or_date_str === null) {
        return "データなし";
    } else {
        var dt = new Date(ts_or_date_str * 1000);
    }
    
    var date_str = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
    
    var now_ts = get_timestamp();
    var dt_2 = new Date(now_ts * 1000);
    if (date_str === dt_2.getFullYear() + "/" + (dt_2.getMonth() + 1) + "/" + dt_2.getDate()) {
        date_str = "今日";
    } else {
        dt_2 = new Date((now_ts - 86400) * 1000);
        if (date_str === dt_2.getFullYear() + "/" + (dt_2.getMonth() + 1) + "/" + dt_2.getDate()) {
            date_str = "昨日";
        } else {
            dt_2 = new Date((now_ts - 172800) * 1000);
            if (date_str === dt_2.getFullYear() + "/" + (dt_2.getMonth() + 1) + "/" + dt_2.getDate()) {
                date_str = "一昨日";
            }
        }
    }
    
    return date_str + " " + ("0" + dt.getHours()).slice(-2) + ":" + ("0" + dt.getMinutes()).slice(-2);
}


function get_default_config () {
    return {
        "unyohub_version" : UNYOHUB_VERSION,
        "guest_id" : null,
        "dark_mode" : false,
        "enlarge_display_size" : false,
        "refresh_interval" : 5,
        "operation_data_cache_period" : 7,
        "position_mode_minute_step" : 1,
        "show_train_types_in_position_mode" : false,
        "show_deadhead_trains_on_timetable" : true,
        "show_starting_trains_only_on_timetable" : false,
        "colorize_corrected_posts" : false,
        "colorize_beginners_posts" : false,
        "show_unregistered_formations_on_formation_table" : true,
        "colorize_formation_table" : true,
        "simplify_operation_details" : false,
        "show_favorite_railroads" : true,
        "show_favorite_stations" : true,
        "favorite_railroads" : [],
        "favorite_stations" : []
    };
}

function save_config () {
    localStorage.setItem("unyohub_config", JSON.stringify(config));
}

var config = new Object();
(function () {
    var config_json = localStorage.getItem("unyohub_config");
    
    if (config_json !== null) {
        config = JSON.parse(config_json);
    }
    
    if (!("unyohub_version" in config) || config["unyohub_version"] !== UNYOHUB_VERSION) {
        var default_config = get_default_config();
        
        config = Object.assign({}, default_config, config);
        
        Object.keys(config).forEach(function (key) {
            if (!(key in default_config)) {
                delete config[key];
            }
        });
        
        config["unyohub_version"] = UNYOHUB_VERSION;
        
        save_config();
    }
}());


function get_guest_id () {
    if (config["guest_id"] === null) {
        config["guest_id"] = "*" + Math.floor(Math.random() * 1000000000000);
        
        save_config();
    }
    
    return config["guest_id"];
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


function change_title (title_text, url = null) {
    document.getElementsByTagName("title")[0].innerText = title_text;
    
    if (url !== null && url !== location.pathname + location.hash) {
        history.pushState(null, "", url);
    }
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
        
        console.error(UNYOHUB_APP_NAME + ": " + message_text);
        
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


var instance_info;

function update_instance_info () {
    change_title(instance_info["instance_name"]);
    document.getElementById("instance_name").innerText = instance_info["instance_name"];
    document.getElementById("menu_instance_name").innerText = instance_info["instance_name"];
    document.getElementById("menu_reload_button").innerText = instance_info["instance_name"];
    
    var menu_manual_button_elm = document.getElementById("menu_manual_button");
    if ("manual_url" in instance_info) {
        menu_manual_button_elm.style.display = "block";
        menu_manual_button_elm.setAttribute("href", instance_info["manual_url"]);
    } else {
        menu_manual_button_elm.style.display = "none";
    }
    
    if (location.pathname === "/") {
        document.getElementById("splash_screen_instance_name").innerText = instance_info["instance_name"];
    }
}

(function () {
    var instance_info_json = localStorage.getItem("unyohub_instance_info");
    
    if (instance_info_json !== null) {
        instance_info = JSON.parse(instance_info_json);
        
        var last_modified_timestamp_q = "last_modified_timestamp=" + instance_info["last_modified_timestamp"];
    } else {
        instance_info = {
            instance_name : UNYOHUB_APP_NAME,
            available_days_ahead : 1,
            allow_guest_user : false,
            require_comments_on_speculative_posts : false
        };
        
        var last_modified_timestamp_q = null;
    }
    
    update_instance_info();
    
    if (navigator.onLine) {
        ajax_post("instance_info.php", last_modified_timestamp_q, function (response, last_modified) {
            if (response !== false && response !== "NO_UPDATES_AVAILABLE") {
                instance_info = JSON.parse(response);
                
                var last_modified_date = new Date(last_modified);
                instance_info["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                
                localStorage.setItem("unyohub_instance_info", JSON.stringify(instance_info));
                
                update_instance_info();
            }
        });
    }
}());


var db_open_promise = new Promise(function (resolve, reject) {
    var open_request = indexedDB.open("unyohub_caches", UNYOHUB_INDEXEDDB_VERSION);
    
    open_request.onerror = function () {
        mes("IndexedDBの初期化に失敗したため、" + UNYOHUB_APP_NAME + "は正常に動作できません", true);
    };
    
    open_request.onupgradeneeded = function () {
        var db = open_request.result;
        
        var object_store_names = [...db.objectStoreNames];
        
        if (!object_store_names.includes("railroads")) {
            db.createObjectStore("railroads", {keyPath : "railroad_id"});
        }
        if (!object_store_names.includes("train_icons")) {
            db.createObjectStore("train_icons", {keyPath : "railroad_id"});
        }
        if (!object_store_names.includes("formations")) {
            db.createObjectStore("formations", {keyPath : "railroad_id"});
        }
        if (!object_store_names.includes("formation_overviews")) {
            db.createObjectStore("formation_overviews", {keyPath : "railroad_id"});
        }
        if (!object_store_names.includes("diagram_revisions")) {
            db.createObjectStore("diagram_revisions", {keyPath : "railroad_id"});
        }
        if (!object_store_names.includes("diagrams")) {
            db.createObjectStore("diagrams", {keyPath : ["railroad_id", "diagram_revision"]});
        }
        if (!object_store_names.includes("operation_tables")) {
            db.createObjectStore("operation_tables", {keyPath : ["railroad_id", "diagram_revision", "diagram_id"]});
        }
        if (!object_store_names.includes("line_operations")) {
            db.createObjectStore("line_operations", {keyPath : ["railroad_id", "diagram_revision", "diagram_id"]});
        }
        if (!object_store_names.includes("timetables")) {
            db.createObjectStore("timetables", {keyPath : ["railroad_id", "diagram_revision", "timetable_id"]});
        }
        if (!object_store_names.includes("operation_data")) {
            var operation_data_store = db.createObjectStore("operation_data", {keyPath : ["railroad_id", "operation_date"]});
            operation_data_store.createIndex("idx_od1", "operation_date");
        }
        if (!object_store_names.includes("announcements")) {
            db.createObjectStore("announcements", {keyPath : "railroad_id"});
        }
    };
    
    open_request.onsuccess = function () {
        var transaction = open_request.result.transaction("operation_data", "readwrite");
        open_request.result.close();
        
        var operation_data_store = transaction.objectStore("operation_data");
        var idx_od1 = operation_data_store.index("idx_od1");
        
        var cursor_request = idx_od1.openCursor(IDBKeyRange.upperBound(get_date_string(get_timestamp() - 10800 - 86400 * (config["operation_data_cache_period"])), true), "next");
        
        cursor_request.onsuccess = function () {
            var cursor = cursor_request.result;
            
            if (cursor !== null) {
                operation_data_store.delete([cursor.value["railroad_id"], cursor.value["operation_date"]]);
                cursor.continue();
            }
            
            resolve();
        };
    };
});


var railroad_info = null;
var train_icons = null;
var joined_railroad_train_icons = {};
var formations = null;
var joined_railroad_formations = {};
var formation_overviews = null;
var joined_railroad_formation_overviews = {};
var diagram_revisions = null;
var diagram_info = {};


function idb_start_transaction (tables, writable, callback_func) {
    var open_request = indexedDB.open("unyohub_caches", UNYOHUB_INDEXEDDB_VERSION);
    
    open_request.onsuccess = function () {
        if (writable) {
            var transaction = open_request.result.transaction(tables, "readwrite");
        } else {
            var transaction = open_request.result.transaction(tables, "readonly");
        }
        
        open_request.result.close();
        
        callback_func(transaction);
    };
}


function rgb2hsl (color_hex) {
    var r = parseInt(color_hex.substring(1, 3), 16);
    var g = parseInt(color_hex.substring(3, 5), 16);
    var b = parseInt(color_hex.substring(5), 16);
    
    var rgb_max = Math.max(r, g, b);
    var rgb_min = Math.min(r, g, b);
    
    var h = 0;
    var s = 0;
    
    var l = Math.round((rgb_max + rgb_min) / 2);
    
    if (rgb_max !== rgb_min) {
        if (r === rgb_max) {
            h = Math.round((g - b) / (rgb_max - rgb_min) * 60);
        } else if (g === rgb_max) {
            h = Math.round((b - r) / (rgb_max - rgb_min) * 60 + 120);
        } else {
            h = Math.round((r - g) / (rgb_max - rgb_min) * 60 + 240);
        }
        
        if (h < 0) {
            h += 360;
        }
        
        if (l <= 127) {
            s = Math.round((rgb_max - rgb_min) / (rgb_max + rgb_min) * 255);
        } else {
            s = Math.round((rgb_max - rgb_min) / (510 - rgb_max - rgb_min) * 255);
        }
    }
    
    return [h, s, l];
}

function convert_color_dark_mode (color_hex) {
    var hsl = rgb2hsl(color_hex);
    
    return "hsl(" + hsl[0] + "deg " + Math.round(Math.min(hsl[1] * 0.75, 127) / 2.55) + "% " + Math.round(Math.min(Math.max(319 - hsl[2], 255), 95) / 2.55) + "%)";
}

function convert_font_color_dark_mode (color_hex) {
    var hsl = rgb2hsl(color_hex);
    
    return "hsl(" + hsl[0] + "deg " + Math.round(hsl[1] / 2.55) + "% " + Math.round(Math.min(Math.max(255 - hsl[2], 170), 255) / 2.55) + "%)";
}

function update_display_settings (redraw = false) {
    if (config["dark_mode"]) {
        document.getElementsByTagName("body")[0].classList.add("dark_mode");
    } else {
        document.getElementsByTagName("body")[0].classList.remove("dark_mode");
    }
    
    if (config["enlarge_display_size"]) {
        document.getElementsByTagName("body")[0].classList.add("enlarge");
    } else {
        document.getElementsByTagName("body")[0].classList.remove("enlarge");
    }
    
    if (redraw) {
        switch (mode_val) {
            case -1:
                get_railroad_list(function (railroads, loading_completed) {
                    update_railroad_list(railroads, document.getElementById("splash_screen_inner"), loading_completed);
                });
                break;
                
            case 0:
                position_change_lines(position_selected_line);
                break;
            
            case 1:
                update_selected_line(timetable_selected_line, false);
                if (timetable_selected_station !== null) {
                    timetable_select_station(timetable_selected_station);
                }
                break;
            
            case 2:
                operation_data_draw();
                break;
            
            case 4:
                if (operation_table === null) {
                    operation_table_mode(null);
                } else {
                    operation_table_list_number();
                }
                break;
        }
    }
}


var splash_screen_elm = document.getElementById("splash_screen");

update_display_settings();

if (location.pathname === "/") {
    var splash_screen_login_status_elm = document.getElementById("splash_screen_login_status");
    var splash_screen_announcement_elm = document.getElementById("splash_screen_announcement");
}

splash_screen_elm.classList.remove("splash_screen_loading");


var header_elm = document.getElementsByTagName("header")[0];

var menu_elm = document.getElementById("menu");
var menu_button_elm = document.getElementById("menu_button");

function menu_click (force_close = false) {
    if (menu_elm.className === "menu_open" || force_close) {
        menu_elm.className = "";
        menu_button_elm.classList.remove("menu_button_active");
    } else {
        menu_elm.className = "menu_open";
        menu_button_elm.classList.add("menu_button_active");
    }
}

var popup_background_elm = document.getElementById("popup_background");
var popup_history = new Array();
var square_popup_is_open = false;

function open_popup (id, title = null, allow_screenshot = false) {
    if (square_popup_is_open) {
        close_square_popup();
    }
    
    popup_background_elm.style.display = "block";
    
    var elm = document.getElementById(id);
    
    if (elm === null) {
        elm = document.createElement("div");
        elm.id = id;
        elm.className = "popup";
        
        var buf = "<button type='button' class='popup_close_button' onclick='popup_close();'></button>";
        
        if (allow_screenshot) {
            buf += "<button type='button' class='screenshot_button' onclick='take_screenshot(\"" + id + "_inner\", true);'></button>";
        }
        
        if (title !== null) {
            buf += "<h2>" + title + "</h2>";
        }
        
        buf += "<div id='" + id + "_inner'></div>";
        
        elm.innerHTML = buf;
        
        document.getElementsByTagName("body")[0].appendChild(elm);
    }
    
    for (var cnt = 0; cnt < popup_history.length; cnt++) {
        document.getElementById(popup_history[cnt]).style.zIndex = cnt + 51;
        
        if (popup_history[cnt] === id) {
            popup_history.splice(cnt, 1);
            cnt--;
        }
    }
    
    popup_history.push(id);
    elm.style.zIndex = 50 + popup_history.length;
    
    if (!elm.classList.contains("popup_active")) {
        elm.classList.add("popup_active");
        
        menu_click(true);
    }
    
    history.pushState(null, "", location.pathname + "#" + id);
    
    return document.getElementById(id + "_inner");
}

function popup_close (close_all = false, update_url = true) {
    if (popup_history.length === 0) {
        return;
    }
    
    var id = popup_history.pop();
    
    if (popup_history.length === 0) {
        popup_background_elm.style.display = "none";
    }
    
    document.getElementById(id).classList.remove("popup_active");
    
    if (update_url) {
        if (popup_history.length >= 1) {
            history.replaceState(null, "", location.pathname + "#" + popup_history[popup_history.length - 1]);
        } else {
            history.replaceState(null, "", location.pathname);
        }
    }
    
    if (close_all && popup_history.length >= 1) {
        popup_close(true);
    }
}

var screen_elm = document.getElementById("popup_screen");
var wait_screen_elm = document.getElementById("wait_screen");

function open_square_popup (id, is_preview_popup = false, title = null, allow_screenshot = false) {
    if (square_popup_is_open) {
        close_square_popup();
    }
    
    screen_elm.className = "popup_screen_active";
    
    var elm = document.getElementById(id);
    
    if (elm === null) {
        elm = document.createElement("div");
        elm.id = id;
        
        if (is_preview_popup) {
            elm.className = "preview_popup";
        } else {
            elm.className = "square_popup";
        }
        
        var buf = "<button type='button' class='popup_close_button' onclick='close_square_popup();'></button>";
        
        if (allow_screenshot) {
            buf += "<button type='button' class='screenshot_button' onclick='take_screenshot(\"" + id + "_inner\", true);'></button>";
        }
        
        if (title !== null) {
            buf += "<h3>" + title + "</h3>";
        }
        
        buf += "<div id='" + id + "_inner'></div>";
        
        elm.innerHTML = buf;
        
        screen_elm.appendChild(elm);
    }
    
    elm.classList.add("popup_active");
    
    popup_history.push(id);
    square_popup_is_open = true;
    
    history.pushState(null, "", location.pathname + "#" + id);
    
    return document.getElementById(id + "_inner");
}

function close_square_popup (update_url = true) {
    var id = popup_history.pop();
    
    screen_elm.className = "";
    document.getElementById(id).classList.remove("popup_active");
    
    square_popup_is_open = false;
    
    if (update_url) {
        if (popup_history.length >= 1) {
            history.replaceState(null, "", location.pathname + "#" + popup_history[popup_history.length - 1]);
        } else {
            history.replaceState(null, "", location.pathname);
        }
    }
    
    menu_click(true);
}

function open_wait_screen () {
    wait_screen_elm.style.display = "block";
    screen_elm.style.backgroundColor = "transparent";
}

function close_wait_screen () {
    wait_screen_elm.style.display = "none";
    screen_elm.style.backgroundColor = "";
}


var user_data = null;

var menu_admin_elm = document.getElementById("menu_admin");
var menu_logged_in_elm = document.getElementById("menu_logged_in");
var menu_not_logged_in_elm = document.getElementById("menu_not_logged_in");

function update_user_data (user_data_next = null) {
    user_data = user_data_next;
    
    menu_admin_elm.style.display = "none";
    
    if (user_data !== null) {
        menu_logged_in_elm.style.display = "block";
        menu_not_logged_in_elm.style.display = "none";
        
        var menu_user_name_elm = document.getElementById("menu_user_name");
        menu_user_name_elm.className = "";
        
        var user_name = user_data["user_name"] !== null ? user_data["user_name"] : "ハンドルネーム未設定";
        
        if (user_data["is_management_member"]) {
            menu_admin_elm.style.display = "block";
            var honorific = "(管)";
        } else {
            if (user_data["is_control_panel_user"]) {
                menu_admin_elm.style.display = "block";
            }
            
            var honorific = "さん";
            
            if (user_data["is_beginner"]) {
                menu_user_name_elm.className = "beginner";
            }
        }
        
        menu_user_name_elm.innerText = user_name + " " + honorific;
        
        if (location.pathname === "/") {
            splash_screen_login_status_elm.innerHTML = "<b>" + escape_html(user_name) + "</b> さん<button type='button' id='logout_button' onclick='user_logout();'>ログアウト</button><button type='button' id='user_info_button' onclick='window.open(\"/user/user_info.php\");'>利用者情報</button>";
        }
    } else {
        menu_logged_in_elm.style.display = "none";
        menu_not_logged_in_elm.style.display = "block";
        
        if (location.pathname === "/") {
            splash_screen_login_status_elm.innerHTML = "<b>ゲストモード</b>です<button type='button' id='login_button' onclick='show_login_form();'>ログイン</button><button type='button' id='sign_up_button' onclick='window.open(\"/user/sign_up.php\");'>新規登録</button>";
        }
    }
}

function check_logged_in () {
    ajax_post("check_logged_in.php", null, function (response) {
        if (response !== false) {
            if (response !== "NOT_LOGGED_IN") {
                update_user_data(JSON.parse(response));
            } else {
                update_user_data();
            }
        } else if (location.pathname === "/") {
            splash_screen_login_status_elm.innerText = "【!】ログイン状態の確認に失敗しました";
        }
    });
}


var railroads = null;

var icon_area_elm = null;

function get_railroad_list (callback_func) {
    if (railroads !== null) {
        callback_func(railroads, true);
        
        return;
    }
    
    var cache_json = localStorage.getItem("unyohub_railroads_caches");
    
    if (cache_json !== null) {
        railroads = JSON.parse(cache_json);
    } else {
        railroads = {
            railroads : {},
            categories : [],
            last_modified_timestamp : 0
        };
    }
    
    if (navigator.onLine) {
        if (railroads["categories"].length >= 1) {
            callback_func(railroads, false);
        }
        
        ajax_post("railroads.php", "last_modified_timestamp=" + railroads["last_modified_timestamp"], function (response, last_modified) {
            if (response !== false && response !== "NO_UPDATES_AVAILABLE") {
                railroads = JSON.parse(response);
                
                var last_modified_date = new Date(last_modified);
                railroads["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                
                localStorage.setItem("unyohub_railroads_caches", JSON.stringify(railroads));
            }
            
            callback_func(railroads, true);
        }, 10);
    } else {
        callback_func(railroads, true);
    }
}

var railroad_list_area;

function update_railroad_list (railroads, area_elm = null, loading_completed = true) {
    if (area_elm !== null) {
        railroad_list_area = area_elm;
    } else {
        area_elm = railroad_list_area;
    }
    
    var favorite_category_style = " style='color: #" + (!config["dark_mode"] ? "333333" : "999999") + ";'";
    var favorite_subcategory_style = " style='color: #808080;'";
    
    if (config["show_favorite_railroads"] || config["show_favorite_stations"]) {
        var categories_html = "<li class='category_index' onclick='scroll_to_category(0);'" + favorite_category_style + "><b>お気に入り</b></li>";
        var icons_html = "<h3 class='icon_heading'" + favorite_category_style + "><b>お気に入り</b></h3>";
        
        var heading_cnt = 1;
        
        if (config["show_favorite_railroads"]) {
            if (config["show_favorite_stations"]) {
                categories_html += "<li class='subcategory_index' onclick='scroll_to_category(1);'" + favorite_subcategory_style + "><span>路線系統</span></li>";
                icons_html += "<h4 class='icon_heading'" + favorite_subcategory_style + "><span>お気に入り路線系統</span></h4>";
                
                heading_cnt = 3;
            }
            
            if (config["favorite_railroads"].length >= 1) {
                for (var railroad_id of config["favorite_railroads"]) {
                    icons_html += "<a href='/railroad_" + railroad_id + "/' onclick='event.preventDefault(); select_railroad(\"" + railroad_id + "\");' oncontextmenu='event.preventDefault(); railroad_icon_context_menu(\"" + railroad_id + "\");' ontouchstart='railroad_icon_touch_start(event);' ontouchmove='railroad_icon_touch_move(event);' ontouchend='railroad_icon_touch_end(\"" + railroad_id + "\");'><img src='" + railroads["railroads"][railroad_id]["railroad_icon"] + "' alt='' style='background-color: " + railroads["railroads"][railroad_id]["main_color"] + ";'>" + escape_html(railroads["railroads"][railroad_id]["railroad_name"]) + "</a>";
                }
            } else {
                icons_html += "<div class='informational_text'>アイコンを長押し/右クリックすると路線系統をお気に入りに追加できます</div>";
            }
        }
        
        if (config["show_favorite_stations"]) {
            if (config["show_favorite_railroads"]) {
                categories_html += "<li class='subcategory_index' onclick='scroll_to_category(2);'" + favorite_subcategory_style + "><span>駅</span></li>";
                icons_html += "<h4 class='icon_heading'" + favorite_subcategory_style + "><span>お気に入り駅</span></h4>";
            }
            
            if (config["favorite_stations"].length >= 1) {
                for (var station_data of config["favorite_stations"]) {
                    icons_html += "<button type='button' class='railroad_link' onclick='select_railroad(\"" + station_data["railroad_id"] + "\", \"timetable_mode\", \"" + station_data["line_id"] + "\", \"" + station_data["station_name"] + "\");' oncontextmenu='event.preventDefault(); remove_favorite_station(\"" + station_data["railroad_id"] + "\", \"" + station_data["line_id"] + "\", \"" + station_data["station_name"] + "\", true);'><img src='" + railroads["railroads"][station_data["railroad_id"]]["railroad_icon"] + "' alt='' style='background-color: " + railroads["railroads"][station_data["railroad_id"]]["main_color"] + ";'>" + escape_html(station_data["station_name"]) + "</button>";
                }
            } else {
                icons_html += "<div class='informational_text'>各駅の時刻表からその駅をお気に入りに追加できます</div>";
            }
        }
    } else {
        var categories_html = "";
        var icons_html = "";
        var heading_cnt = 0;
    }
    
    for (var category of railroads["categories"]) {
        var category_html = " style='color: " + (config["dark_mode"] ? convert_color_dark_mode(category["category_color"]) : category["category_color"]) + ";'><b>" + escape_html(category["category_name"]) + "</b></";
        categories_html += "<li class='category_index' onclick='scroll_to_category(" + heading_cnt + ");'" + category_html + "li>";
        icons_html += "<h3 class='icon_heading'" + category_html + "h3>";
        
        heading_cnt++;
        
        if ("subcategories" in category) {
            for (var subcategory of category["subcategories"]) {
                var subcategory_html = " style='color: " + (config["dark_mode"] ? convert_color_dark_mode(subcategory["subcategory_color"]) : subcategory["subcategory_color"]) + ";'><span>" + escape_html(subcategory["subcategory_name"]) + "</span></";
                categories_html += "<li class='subcategory_index' onclick='scroll_to_category(" + heading_cnt + ");'" + subcategory_html + "li>";
                icons_html += "<h4 class='icon_heading'" + subcategory_html + "h4>";
                
                heading_cnt++;
                
                for (var railroad_id of subcategory["railroads"]) {
                    icons_html += "<a href='/railroad_" + railroad_id + "/' onclick='event.preventDefault(); select_railroad(\"" + railroad_id + "\");' oncontextmenu='event.preventDefault(); railroad_icon_context_menu(\"" + railroad_id + "\");' ontouchstart='railroad_icon_touch_start(event);' ontouchmove='railroad_icon_touch_move(event);' ontouchend='railroad_icon_touch_end(\"" + railroad_id + "\");'><img src='" + railroads["railroads"][railroad_id]["railroad_icon"] + "' alt='' style='background-color: " + railroads["railroads"][railroad_id]["main_color"] + ";'>" + escape_html(railroads["railroads"][railroad_id]["railroad_name"]) + "</a>";
                }
            }
        } else if ("railroads" in category) {
            for (var railroad_id of category["railroads"]) {
                icons_html += "<a href='/railroad_" + railroad_id + "/' onclick='event.preventDefault(); select_railroad(\"" + railroad_id + "\");' oncontextmenu='event.preventDefault(); railroad_icon_context_menu(\"" + railroad_id + "\");' ontouchstart='railroad_icon_touch_start(event);' ontouchmove='railroad_icon_touch_move(event);' ontouchend='railroad_icon_touch_end(\"" + railroad_id + "\");'><img src='" + railroads["railroads"][railroad_id]["railroad_icon"] + "' alt='' style='background-color: " + railroads["railroads"][railroad_id]["main_color"] + ";'>" + escape_html(railroads["railroads"][railroad_id]["railroad_name"]) + "</a>";
            }
        }
    }
    
    if (!loading_completed) {
        categories_html += "<div class='loading_icon'></div>";
    } else if (railroads["categories"].length === 0) {
        icons_html = "<div class='no_data'>利用可能なデータがありません</div>";
    }
    
    area_elm.innerHTML = "<ul id='category_area'>" + categories_html + "</ul><div id='icon_area' onscroll='icon_area_onscroll();'>" + icons_html + "</div>";
    
    splash_screen_elm.className = "splash_screen_loaded";
    
    icon_area_elm = document.getElementById("icon_area");
    
    icon_area_onscroll();
}

function scroll_to_category (index_val) {
    icon_area_elm.scrollTop += document.getElementsByClassName("icon_heading")[index_val].getBoundingClientRect().top - icon_area_elm.getBoundingClientRect().top - 5;
}

function icon_area_onscroll () {
    var heading_elms = document.getElementsByClassName("icon_heading");
    var index_elms = document.getElementById("category_area").getElementsByTagName("li");
    
    var icon_area_top = icon_area_elm.getBoundingClientRect().top;
    
    for (var cnt = 0; cnt < heading_elms.length; cnt++) {
        if (heading_elms[cnt].getBoundingClientRect().top > icon_area_top) {
            index_elms[cnt].classList.add("active_index");
            
            break;
        }
        
        index_elms[cnt].classList.remove("active_index");
    }
    
    for (cnt++; cnt < heading_elms.length; cnt++) {
        index_elms[cnt].classList.remove("active_index");
    }
}

var railroad_icon_touch_start_time = null;
var railroad_icon_touch_start_y = 0;

function railroad_icon_context_menu (railroad_id, redraw_railroad_list = true) {
    railroad_icon_touch_start_time = null;
    
    for (var cnt = 0; cnt < config["favorite_railroads"].length; cnt++) {
        if (config["favorite_railroads"][cnt] === railroad_id) {
            if (confirm(railroads["railroads"][railroad_id]["railroad_name"] + " をお気に入りから削除しますか？")) {
                config["favorite_railroads"].splice(cnt, 1);
                save_config();
                
                if (redraw_railroad_list) {
                    update_railroad_list(railroads);
                }
                
                mes("路線系統をお気に入りから削除しました");
                
                return true;
            }
            
            return false;
        }
    }
    
    if (confirm(railroads["railroads"][railroad_id]["railroad_name"] + " をお気に入りに追加しますか？")) {
        config["favorite_railroads"].push(railroad_id);
        save_config();
        
        if (redraw_railroad_list) {
            update_railroad_list(railroads);
        }
        
        mes("路線系統をお気に入りに追加しました");
        
        return true;
    }
    
    return false;
}

function railroad_icon_touch_start (event) {
    railroad_icon_touch_start_time = Date.now();
    railroad_icon_touch_start_y = event.touches[0].screenY;
}

function railroad_icon_touch_move (event) {
    if (Math.abs(railroad_icon_touch_start_y - event.touches[0].screenY) > 10) {
        railroad_icon_touch_start_time = null;
    }
}

function railroad_icon_touch_end (railroad_id) {
    if (railroad_icon_touch_start_time !== null && Date.now() - railroad_icon_touch_start_time > 1000) {
        railroad_icon_context_menu(railroad_id);
    } else {
        railroad_icon_touch_start_time = null;
    }
}

function show_railroad_list () {
    var popup_inner_elm = open_popup("railroad_select_popup", "路線系統の切り替え");
    
    get_railroad_list(function (railroads, loading_completed) {
        update_railroad_list(railroads, popup_inner_elm, loading_completed);
    });
}


var menu_off_line_elm = document.getElementById("menu_off_line");

window.ononline = function () {
    menu_off_line_elm.style.display = "none";
    
    check_logged_in();
}

function on_off_line () {
    menu_off_line_elm.style.display = "block";
    
    menu_admin_elm.style.display = "none";
    menu_logged_in_elm.style.display = "none";
    menu_not_logged_in_elm.style.display = "none";
    
    if (location.pathname === "/") {
        splash_screen_login_status_elm.innerHTML = "<b class='off_line_message' onclick='show_off_line_message();'>オフラインモード</b>";
    }
}

window.onoffline = on_off_line;

function show_off_line_message () {
    var popup_inner_elm = open_square_popup("off_line_message_popup", true, "オフラインモード");
    
    popup_inner_elm.innerHTML = "<div class='informational_text'>端末がオフライン状態のため、前回のアクセス時に取得したデータを表示します。<br><br>この状態ではダウンロードされていないデータや一部の機能がご利用いただけません。</div>";
}


window.onload = function () {
    db_open_promise.then(function () {
        if (location.pathname.startsWith("/railroad_")) {
            var path_info = location.pathname.split("/");
            
            if (path_info.length >= 3 && path_info[2].length >= 1) {
                if (path_info.length >= 4 && path_info[3].length >= 1) {
                    var mode_option_1 = decodeURIComponent(path_info[3]);
                    
                    if (path_info.length >= 5 && path_info[4].length >= 1) {
                        var mode_option_2 = decodeURIComponent(path_info[4]);
                    } else {
                        var mode_option_2 = null;
                    }
                } else {
                    var mode_option_1 = null;
                    var mode_option_2 = null;
                }
                
                select_railroad(path_info[1].substring(9), path_info[2] + "_mode", mode_option_1, mode_option_2);
            } else {
                select_railroad(path_info[1].substring(9));
            }
            
            check_announcements();
        } else {
            get_railroad_list(function (railroads, loading_completed) {
                update_railroad_list(railroads, document.getElementById("splash_screen_inner"), loading_completed);
            });
            
            check_announcements(true);
        }
        
        if (navigator.onLine) {
            check_logged_in();
        } else {
            on_off_line();
        }
    });
};


var menu_announcements_elm = document.getElementById("menu_announcements");
var railroad_announcement_elm = document.getElementById("railroad_announcement");

function mark_announcements_read (announcements_data) {
    if (announcements_data["last_read_timestamp"] === announcements_data["last_modified_timestamp"]) {
        return;
    }
    
    var announcements_data_new = {...announcements_data};
    
    announcements_data_new["last_read_timestamp"] = announcements_data_new["last_modified_timestamp"];
    
    idb_start_transaction("announcements", true, function (transaction) {
        var announcements_store = transaction.objectStore("announcements");
        announcements_store.put(announcements_data_new);
    });
}

function fetch_announcements (railroad_id, mark_read, callback_func) {
    if (railroad_id === null) {
        var railroad_id_key = "/";
        var railroad_id_q = "";
    } else {
        var railroad_id_key = railroad_id;
        var railroad_id_q = "railroad_id=" + escape_form_data(railroad_id) + "&";
    }
    
    idb_start_transaction("announcements", false, function (transaction) {
        var announcements_store = transaction.objectStore("announcements");
        var get_request = announcements_store.get(railroad_id_key);
        
        get_request.onsuccess = function (evt) {
            if (evt.target.result !== undefined) {
                var announcements_data = evt.target.result;
            } else {
                var announcements_data = {announcements : [], last_modified_timestamp : 0, last_read_timestamp : 0};
            }
            
            if (navigator.onLine) {
                ajax_post("announcements.php", railroad_id_q + "last_modified_timestamp=" + announcements_data["last_modified_timestamp"], function (response, last_modified) {
                    if (response === "NEW_ANNOUNCEMENTS_NOT_EXIST") {
                        if (mark_read) {
                            mark_announcements_read(announcements_data);
                        }
                        
                        callback_func(announcements_data["announcements"], announcements_data["last_read_timestamp"]);
                    } else {
                        var announcements_data_new = {announcements : JSON.parse(response)};
                        
                        announcements_data_new["railroad_id"] = railroad_id_key;
                        
                        var last_modified_date = new Date(last_modified);
                        announcements_data_new["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                        
                        if (mark_read) {
                            announcements_data_new["last_read_timestamp"] = announcements_data_new["last_modified_timestamp"];
                        } else {
                            announcements_data_new["last_read_timestamp"] = announcements_data["last_read_timestamp"];
                        }
                        
                        idb_start_transaction("announcements", true, function (transaction) {
                            var announcements_store = transaction.objectStore("announcements");
                            
                            announcements_store.put(announcements_data_new);
                        });
                        
                        callback_func(announcements_data_new["announcements"], announcements_data["last_read_timestamp"]);
                    }
                });
            } else {
                if (mark_read) {
                    mark_announcements_read(announcements_data);
                }
                
                callback_func(announcements_data["announcements"], announcements_data["last_read_timestamp"]);
            }
        };
    });
}

function check_announcements (show_important_announcements = false) {
    announcement_last_checked = get_timestamp();
    
    fetch_announcements(null, false, function (announcements_data, last_read_timestamp) {
        var ts = get_timestamp();
        
        var new_announcement_exists = false;
        
        for (var announcement_data of announcements_data) {
            if (announcement_data["expiration_timestamp"] >= ts && announcement_data["last_modified_timestamp"] > last_read_timestamp) {
                if (announcement_data["is_important"]) {
                    if (show_important_announcements) {
                        show_announcements(null, true);
                    } else {
                        menu_button_elm.classList.add("menu_button_with_notification");
                        menu_announcements_elm.className = "new_icon_red";
                    }
                    
                    return;
                }
                
                new_announcement_exists = true;
            }
        }
        
        if (new_announcement_exists) {
            if (location.pathname === "/") {
                splash_screen_announcement_elm.classList.add("announcement_with_notification");
            }
            menu_announcements_elm.className = "new_icon";
        } else {
            if (location.pathname === "/") {
                splash_screen_announcement_elm.classList.remove("announcement_with_notification");
            }
            menu_announcements_elm.className = "";
        }
        
        menu_button_elm.classList.remove("menu_button_with_notification");
    });
}

function update_railroad_announcement (railroad_id, clear_text = false) {
    railroad_announcement_last_checked = get_timestamp();
    
    if (clear_text) {
        railroad_announcement_elm.innerText = "";
    }
    
    railroad_announcement_elm.className = "";
    
    fetch_announcements(railroad_id, false, function (announcements_data, last_read_timestamp) {
        var ts = get_timestamp();
        
        var new_announcement_exists = false;
        var announcement_text = "";
        var new_important_announcement_exists = false;
        
        for (var announcement_data of announcements_data) {
            if (announcement_data["expiration_timestamp"] >= ts) {
                if (announcement_data["last_modified_timestamp"] > last_read_timestamp) {
                    new_announcement_exists = true;
                    
                    if (announcement_data["is_important"]) {
                        new_important_announcement_exists = true;
                    }
                }
                
                if (announcement_data["is_important"]) {
                    if (announcement_text.length >= 1) {
                        announcement_text = "複数の重要な情報があります";
                        
                        continue;
                    }
                    
                    announcement_text = announcement_data["title"];
                }
            }
        }
        
        railroad_announcement_elm.innerText = announcement_text;
        
        if (new_important_announcement_exists) {
            railroad_announcement_elm.className = "announcement_with_important_notification";
        } else if (new_announcement_exists) {
            railroad_announcement_elm.className = "announcement_with_notification";
        }
    });
}

function show_announcements (railroad_id = null, important_announcements_exist = false) {
    var popup_inner_elm = open_square_popup("announcements_popup", true);
    
    menu_button_elm.classList.remove("menu_button_with_notification");
    menu_announcements_elm.className = "";
    
    if (location.pathname === "/") {
        splash_screen_announcement_elm.classList.remove("announcement_with_notification");
    }
    
    if (railroad_id === null) {
        if (important_announcements_exist) {
            var buf = "<h3 id='announcements_heading' class='announcements_heading_important'>重要なお知らせがあります</h3>";
        } else {
            var buf = "<h3 id='announcements_heading'>お知らせ</h3>";
        }
    } else {
        var buf = "<h3 id='railroad_announcements_heading' style='background-color: " + (config["dark_mode"] ? convert_color_dark_mode(railroad_info["main_color"]) : railroad_info["main_color"]) + ";'>" + escape_html(railroad_info["railroad_name"]) + "のお知らせ</h3>";
    }
    
    buf += "<div id='announcements_area' class='wait_icon'></div>";
    
    popup_inner_elm.innerHTML = buf;
    
    fetch_announcements(railroad_id, true, function (announcements_data, last_read_timestamp) {
        draw_announcements(announcements_data, last_read_timestamp);
    });
}

function draw_announcements (announcements_data, last_read_timestamp) {
    var buf = "";
    
    var ts = get_timestamp();
    
    for (var cnt = 0; cnt < announcements_data.length; cnt++) {
        if (announcements_data[cnt]["expiration_timestamp"] < ts) {
            continue;
        }
        
        buf += "<input type='checkbox' id='announcement_" + cnt + "'><label for='announcement_" + cnt + "' class='drop_down";
        
        if (announcements_data[cnt]["is_important"]) {
            buf += " important_announcement";
        }
        
        if (announcements_data[cnt]["last_modified_timestamp"] > last_read_timestamp) {
            buf += " new_icon";
        }
        
        buf += "'>" + escape_html(announcements_data[cnt]["title"]) + "</label>";
        
        var dt = new Date(announcements_data[cnt]["last_modified_timestamp"] * 1000);
        
        buf += "<div><div class='announcement'>" + convert_to_html(announcements_data[cnt]["content"]) + "<small>" + escape_html(announcements_data[cnt]["user_name"]) + "　" + dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate() + " " + dt.getHours() + ":" + ("0" + dt.getMinutes()).slice(-2) + "</small></div></div>";
    }
    
    if (buf.length === 0) {
        buf = "<div class='no_data'>お知らせはありません</div>";
    }
    
    document.getElementById("announcements_area").innerHTML = buf;
}

function show_railroad_announcements () {
    railroad_announcement_elm.className = "";
    
    show_announcements(railroad_info["railroad_id"]);
}


function update_railroad_info (data) {
    railroad_info = data
    
    var railroad_name_splitted = escape_html(railroad_info["railroad_name"]).split(" ");
    railroad_name_splitted[0] += "<small>";
    
    document.getElementById("railroad_name").innerHTML = railroad_name_splitted.join(" ") + "</small>";
    
    var main_color_hsl = rgb2hsl(railroad_info["main_color"]);
    document.getElementById("railroad_icon").style.backgroundImage = "url(" + railroad_info["railroad_icon"] + "), linear-gradient(to right, " + railroad_info["main_color"] + ", hsl(" + main_color_hsl[0] + "deg " + Math.round(main_color_hsl[1] / 2.55) + "% " + Math.round(Math.min(main_color_hsl[2] * 1.2, 255) / 2.55) + "%))";
    
    railroad_info["deadhead_train_number_regexp"] = new RegExp(railroad_info["deadhead_train_number"]);
    
    for (var cnt = 0; cnt < railroad_info["train_color_rules"].length; cnt++) {
        railroad_info["train_color_rules"][cnt]["regexp"] = new RegExp(railroad_info["train_color_rules"][cnt]["pattern"]);
    }
    
    header_elm.className = "railroad_select_mode";
}


var series_icon_ids = {};
var joined_railroad_series_icon_ids = {};
var formation_styles_available = false;

function update_formation_styles (railroad_id = null) {
    if (railroad_id === null) {
        var series_names = formations["series_names"];
        var series_data = formations["series"];
    } else {
        var series_names = joined_railroad_formations[railroad_id]["series_names"];
        var series_data = joined_railroad_formations[railroad_id]["series"];
    }
    
    var icon_ids_data = {};
    
    for (var series_name of series_names) {
        if ("unregistered" in series_data[series_name] && series_data[series_name]["unregistered"]) {
            continue;
        }
        
        icon_ids_data[series_name] = series_data[series_name]["icon_id"];
        
        if ("subseries_names" in series_data[series_name]) {
            for (var subseries_name of series_data[series_name]["subseries_names"]) {
                if (!("unregistered" in series_data[series_name]["subseries"][subseries_name] && series_data[series_name]["subseries"][subseries_name]["unregistered"])) {
                    icon_ids_data[series_name + subseries_name] = series_data[series_name]["subseries"][subseries_name]["icon_id"];
                }
            }
        }
    }
    
    if (railroad_id !== null) {
        joined_railroad_series_icon_ids[railroad_id] = icon_ids_data;
        
        return;
    }
    
    series_icon_ids = icon_ids_data;
    
    var formation_css = document.getElementById("formation_styles").sheet;
    for (var cnt = formation_css.cssRules.length - 1; cnt >= 0; cnt--) {
        formation_css.deleteRule(cnt);
    }
    
    formation_styles_available = false;
    
    if ("body_colorings" in formations) {
        try {
            var coloring_ids = Object.keys(formations["body_colorings"]);
            
            for (cnt = 0; cnt < coloring_ids.length; cnt++) {
                var base_color = formations["body_colorings"][coloring_ids[cnt]]["base_color"];
                
                var css_code = ".car_coloring_" + coloring_ids[cnt] + " { background-color: " + base_color + "; color: " + formations["body_colorings"][coloring_ids[cnt]]["font_color"] + "; text-shadow: -1.4px -1.4px " + base_color + ", -0.5px -1.4px " + base_color + ", 0.5px -1.4px " + base_color + ", 1.4px -1.4px " + base_color + ", -1.4px -0.5px " + base_color + ", 1.4px -0.5px " + base_color + ", -1.4px 0.5px " + base_color + ", 1.4px 0.5px " + base_color + ", -1.4px 1.4px " + base_color + ", -0.5px 1.4px " + base_color + ", 0.5px 1.4px " + base_color + ", 1.4px 1.4px " + base_color + ";";
                
                if ("stripes" in formations["body_colorings"][coloring_ids[cnt]]) {
                    var gradient_code = "";
                    for (var stripe_data of formations["body_colorings"][coloring_ids[cnt]]["stripes"]) {
                        gradient_code += (gradient_code.length >= 1 ? "," : "") + " linear-gradient(" + ("verticalize" in stripe_data && stripe_data["verticalize"] ? "to right, " : "to bottom, ") + "transparent 0% " + stripe_data["start"] + "%, " + stripe_data["color"] + " " + stripe_data["start"] + "% " + stripe_data["end"] + "%, transparent " + stripe_data["end"] + "% 100%)";
                    }
                    
                    css_code += " background-image:" + gradient_code + ";";
                }
                
                css_code += "}";
                
                formation_css.insertRule(css_code, cnt);
            }
            
            formation_styles_available = true;
        } catch (err) {
            mes("編成表の車体塗装情報が破損しています", true);
        }
    }
}


function load_railroad_data (railroad_id, is_main_railroad, resolve_func_1, resolve_func_2, reject_func) {
    var joined_railroads = [];
    var added_railroads = [];
    
    var promise_list_1 = [];
    var promise_list_2 = [];
    
    if (is_main_railroad) {
        promise_list_1.push(new Promise(function (resolve_1, reject_1) {
            promise_list_2.push(new Promise(function (resolve_2, reject_2) {
                idb_start_transaction("railroads", false, function (transaction) {
                    var railroads_store = transaction.objectStore("railroads");
                    var get_request = railroads_store.get(railroad_id);
                    
                    get_request.onsuccess = function (evt) {
                        if (evt.target.result !== undefined) {
                            var railroad_info_data = evt.target.result;
                            
                            update_railroad_info(railroad_info_data);
                            
                            joined_railroads = "joined_railroads" in railroad_info ? railroad_info["joined_railroads"] : [];
                            
                            var last_modified_timestamp = railroad_info_data["last_modified_timestamp"];
                            
                            resolve_1();
                        } else {
                            var last_modified_timestamp = 0;
                            reject_1();
                        }
                        
                        if (navigator.onLine) {
                            ajax_post("railroad_info.php", "railroad_id=" + escape_form_data(railroad_id) + "&last_modified_timestamp=" + last_modified_timestamp, function (response, last_modified) {
                                if (response !== false && response !== "NO_UPDATES_AVAILABLE") {
                                    var railroad_info_data = JSON.parse(response);
                                    
                                    railroad_info_data["railroad_id"] = railroad_id;
                                    
                                    var last_modified_date = new Date(last_modified);
                                    railroad_info_data["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                                    
                                    update_railroad_info(railroad_info_data);
                                    
                                    idb_start_transaction("railroads", true, function (transaction) {
                                        var railroads_store = transaction.objectStore("railroads");
                                        railroads_store.put(railroad_info_data);
                                    });
                                    
                                    added_railroads = [...new Set("joined_railroads" in railroad_info ? railroad_info["joined_railroads"] : []).difference(new Set(joined_railroads))];
                                    
                                    resolve_2(true);
                                } else {
                                    if (last_modified_timestamp > 0) {
                                        resolve_2(false);
                                    } else {
                                        reject_2(null);
                                    }
                                }
                            });
                        } else {
                            if (last_modified_timestamp > 0) {
                                resolve_2(false);
                            } else {
                                reject_2(null);
                            }
                        }
                    };
                });
            }));
        }));
    }
    
    promise_list_1.push(new Promise(function (resolve_1, reject_1) {
        promise_list_2.push(new Promise(function (resolve_2, reject_2) {
            idb_start_transaction("train_icons", false, function (transaction) {
                var railroads_store = transaction.objectStore("train_icons");
                var get_request = railroads_store.get(railroad_id);
                
                get_request.onsuccess = function (evt) {
                    if (evt.target.result !== undefined) {
                        var train_icons_data = evt.target.result;
                        last_modified_timestamp = train_icons_data["last_modified_timestamp"];
                        
                        if (is_main_railroad) {
                            train_icons = train_icons_data;
                        } else {
                            joined_railroad_train_icons[railroad_id] = train_icons_data;
                        }
                        
                        resolve_1();
                    } else {
                        if (is_main_railroad) {
                            train_icons = {railroad_id : null};
                        }
                        var last_modified_timestamp = 0;
                        
                        reject_1();
                    }
                    
                    if (navigator.onLine) {
                        ajax_post("train_icons.php", "railroad_id=" + escape_form_data(railroad_id) + "&last_modified_timestamp=" + last_modified_timestamp, function (response, last_modified) {
                            if (response !== false && response !== "NO_UPDATES_AVAILABLE") {
                                var train_icons_data = {icons : JSON.parse(response)};
                                
                                train_icons_data["railroad_id"] = railroad_id;
                                
                                var last_modified_date = new Date(last_modified);
                                train_icons_data["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                                
                                idb_start_transaction("train_icons", true, function (transaction) {
                                    var icons_store = transaction.objectStore("train_icons");
                                    icons_store.put(train_icons_data);
                                });
                                
                                if (is_main_railroad) {
                                    train_icons = train_icons_data;
                                } else {
                                    joined_railroad_train_icons[railroad_id] = train_icons_data;
                                }
                                
                                resolve_2(true);
                            } else {
                                if (last_modified_timestamp > 0) {
                                    resolve_2(false);
                                } else {
                                    reject_2(null);
                                }
                            }
                        });
                    } else {
                        if (last_modified_timestamp > 0) {
                            resolve_2(false);
                        } else {
                            reject_2(null);
                        }
                    }
                };
            });
        }));
    }));
    
    promise_list_1.push(new Promise(function (resolve_1, reject_1) {
        promise_list_2.push(new Promise(function (resolve_2, reject_2) {
            idb_start_transaction("formations", false, function (transaction) {
                var formations_store = transaction.objectStore("formations");
                var get_request = formations_store.get(railroad_id);
                
                get_request.onsuccess = function (evt) {
                    if (evt.target.result !== undefined) {
                        var formations_data = evt.target.result;
                        var last_modified_timestamp = formations_data["last_modified_timestamp"];
                        
                        if (is_main_railroad) {
                            formations = formations_data;
                            
                            update_formation_styles();
                        } else {
                            joined_railroad_formations[railroad_id] = formations_data;
                            
                            update_formation_styles(railroad_id);
                        }
                        
                        resolve_1();
                    } else {
                        var last_modified_timestamp = 0;
                        
                        reject_1();
                    }
                    
                    if (navigator.onLine) {
                        ajax_post("formations.php", "railroad_id=" + escape_form_data(railroad_id) + "&last_modified_timestamp=" + last_modified_timestamp, function (response, last_modified) {
                            if (response !== false && response !== "NO_UPDATES_AVAILABLE") {
                                var formations_data = JSON.parse(response);
                                
                                formations_data["railroad_id"] = railroad_id;
                                
                                var last_modified_date = new Date(last_modified);
                                formations_data["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                                
                                idb_start_transaction("formations", true, function (transaction) {
                                    var formations_store = transaction.objectStore("formations");
                                    formations_store.put(formations_data);
                                });
                                
                                if (is_main_railroad) {
                                    formations = formations_data;
                                    
                                    update_formation_styles();
                                } else {
                                    joined_railroad_formations[railroad_id] = formations_data;
                                    
                                    update_formation_styles(railroad_id);
                                }
                                
                                resolve_2(true);
                            } else {
                                if (last_modified_timestamp > 0) {
                                    resolve_2(false);
                                } else {
                                    reject_2(null);
                                }
                            }
                        });
                    } else {
                        if (last_modified_timestamp > 0) {
                            resolve_2(false);
                        } else {
                            reject_2(null);
                        }
                    }
                };
            });
        }));
    }));
    
    promise_list_1.push(new Promise(function (resolve_1, reject_1) {
        promise_list_2.push(new Promise(function (resolve_2, reject_2) {
            idb_start_transaction("formation_overviews", false, function (transaction) {
                var formation_overviews_store = transaction.objectStore("formation_overviews");
                var get_request = formation_overviews_store.get(railroad_id);
                
                get_request.onsuccess = function (evt) {
                    if (evt.target.result !== undefined) {
                        var formation_overviews_data = evt.target.result;
                        var last_modified_timestamp = formation_overviews_data["last_modified_timestamp"];
                        
                        if (is_main_railroad) {
                            formation_overviews = formation_overviews_data;
                        } else {
                            joined_railroad_formation_overviews[railroad_id] = formation_overviews_data;
                        }
                        
                        resolve_1();
                    } else {
                        var last_modified_timestamp = 0;
                        
                        reject_1();
                    }
                    
                    if (navigator.onLine) {
                        ajax_post("formation_overviews.php", "railroad_id=" + escape_form_data(railroad_id) + "&last_modified_timestamp=" + last_modified_timestamp, function (response, last_modified) {
                            if (response !== false && response !== "NO_UPDATES_AVAILABLE") {
                                var formation_overviews_data = {formations : JSON.parse(response)};
                                
                                formation_overviews_data["railroad_id"] = railroad_id;
                                
                                var last_modified_date = new Date(last_modified);
                                formation_overviews_data["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                                
                                idb_start_transaction("formation_overviews", true, function (transaction) {
                                    var formation_overviews_store = transaction.objectStore("formation_overviews");
                                    formation_overviews_store.put(formation_overviews_data);
                                });
                                
                                if (is_main_railroad) {
                                    formation_overviews = formation_overviews_data;
                                } else {
                                    joined_railroad_formation_overviews[railroad_id] = formation_overviews_data;
                                }
                                
                                resolve_2(true);
                            } else {
                                if (last_modified_timestamp > 0) {
                                    resolve_2(false);
                                } else {
                                    reject_2(null);
                                }
                            }
                        });
                    } else {
                        if (last_modified_timestamp > 0) {
                            resolve_2(false);
                        } else {
                            reject_2(null);
                        }
                    }
                };
            });
        }));
    }));
    
    if (is_main_railroad) {
        promise_list_1.push(new Promise(function (resolve_1, reject_1) {
            promise_list_2.push(new Promise(function (resolve_2, reject_2) {
                var tmp_diagram_revision = null;
                
                idb_start_transaction("diagram_revisions", false, function (transaction) {
                    var diagram_revisions_store = transaction.objectStore("diagram_revisions");
                    var get_request = diagram_revisions_store.get(railroad_id);
                    
                    get_request.onsuccess = function (evt) {
                        if (evt.target.result !== undefined) {
                            diagram_revisions = evt.target.result;
                            var last_modified_timestamp = diagram_revisions["last_modified_timestamp"];
                            
                            resolve_1();
                            tmp_diagram_revision = get_diagram_revision();
                        } else {
                            var last_modified_timestamp = 0;
                            
                            reject_1();
                        }
                        
                        if (navigator.onLine) {
                            ajax_post("diagram_revisions.php", "railroad_id=" + escape_form_data(railroad_id) + "&last_modified_timestamp=" + last_modified_timestamp, function (response, last_modified) {
                                if (response !== false && response !== "NO_UPDATES_AVAILABLE") {
                                    diagram_revisions = {diagram_revisions : JSON.parse(response)};
                                    
                                    diagram_revisions["railroad_id"] = railroad_id;
                                    
                                    var last_modified_date = new Date(last_modified);
                                    diagram_revisions["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                                    
                                    idb_start_transaction("diagram_revisions", true, function (transaction) {
                                        var diagram_revisions_store = transaction.objectStore("diagram_revisions");
                                        diagram_revisions_store.put(diagram_revisions);
                                    });
                                    
                                    resolve_2(true);
                                } else {
                                    if (tmp_diagram_revision !== null) {
                                        resolve_2(false);
                                    } else {
                                        reject_2(null);
                                    }
                                }
                            });
                        } else {
                            if (tmp_diagram_revision !== null) {
                                resolve_2(false);
                            } else {
                                reject_2(null);
                            }
                        }
                    };
                });
            }));
        }));
        
        if (!location.pathname.startsWith("/railroad_" + railroad_id + "/")) {
            document.getElementById("tab_position_mode").setAttribute("href", "/railroad_" + railroad_id + "/");
            document.getElementById("tab_timetable_mode").setAttribute("href", "/railroad_" + railroad_id + "/timetable/");
            document.getElementById("tab_operation_data_mode").setAttribute("href", "/railroad_" + railroad_id + "/operation_data/");
            document.getElementById("tab_formations_mode").setAttribute("href", "/railroad_" + railroad_id + "/formations/");
            document.getElementById("tab_operation_table_mode").setAttribute("href", "/railroad_" + railroad_id + "/operation_table/");
        }
        
        update_railroad_announcement(railroad_id, true);
    }
    
    Promise.all(promise_list_1).then(function () {
        if (joined_railroads.length >= 1) {
            var joined_railroads_promise_list = [];
            
            for (let joined_railroad_id of joined_railroads) {
                joined_railroads_promise_list.push(new Promise(function (resolve, reject) {
                    load_railroad_data(joined_railroad_id, false, resolve, resolve, reject);
                }));
            }
            
            Promise.all(joined_railroads_promise_list).then(function () {
                resolve_func_1();
            }, function () {
                reject_func();
            });
        } else {
            resolve_func_1();
        }
    }, function () {});
    Promise.allSettled(promise_list_1).then(function () {
        Promise.all(promise_list_2).then(function (update_exists_list) {
            if (update_exists_list.includes(true)) {
                if (added_railroads.length >= 1) {
                    var joined_railroads_promise_list = [];
                    
                    for (let joined_railroad_id of added_railroads) {
                        joined_railroads_promise_list.push(new Promise(function (resolve, reject) {
                            load_railroad_data(joined_railroad_id, false, resolve, resolve, reject);
                        }));
                    }
                    
                    Promise.all(joined_railroads_promise_list).then(function () {
                        resolve_func_2();
                    }, function () {
                        reject_func();
                    });
                } else {
                    resolve_func_2();
                }
            }
        }, function () {
            reject_func();
        });
    });
}

function select_mode (mode_name, mode_option_1, mode_option_2, mode_option_3) {
    switch (mode_name) {
        case "position_mode":
            position_mode(mode_option_1, "__today__", mode_option_2);
            break;
        
        case "timetable_mode":
            timetable_mode(true, false);
            
            if (mode_option_2 !== null) {
                show_station_timetable(mode_option_1, mode_option_2, mode_option_3);
            } else {
                timetable_change_lines(mode_option_1, true);
            }
            
            break;
        
        case "operation_data_mode":
            operation_data_mode();
            break;
        
        case "formations_mode":
            formations_mode(mode_option_1);
            break;
        
        case "operation_table_mode":
            operation_table_mode(mode_option_1);
            break;
    }
}

var blank_article_elm = document.getElementById("blank_article");

function select_railroad (railroad_id, mode_name = "position_mode", mode_option_1 = null, mode_option_2 = null, mode_option_3 = null) {
    splash_screen_elm.style.display = "none";
    splash_screen_elm.innerHTML = "";
    if (popup_history.length >= 1) {
        popup_close();
    }
    
    change_mode(-1);
    
    header_elm.className = "";
    
    joined_railroad_train_icons = {};
    joined_railroad_formations = {};
    joined_railroad_formation_overviews = {};
    joined_railroad_series_icon_ids = {};
    
    diagram_info = {};
    timetable_selected_line = null;
    
    load_railroad_data(railroad_id, true, function () {
        position_selected_line = railroad_info["lines_order"][0];
        
        select_mode(mode_name, mode_option_1, mode_option_2, mode_option_3);
    }, function () {
        position_selected_line = railroad_info["lines_order"][0];
        
        select_mode(mode_name, mode_option_1, mode_option_2, mode_option_3);
    }, function () {
        mes("選択された路線系統はデータが利用できません", true);
        
        show_railroad_list();
        blank_article_elm.innerHTML = "<div class='no_data'><a href='javascript:void(0);' onclick='show_railroad_list();'>路線系統を選択</a>してください</div>";
    });
}


function get_holiday_list (year) {
    var holiday_list = ["01-01", "02-11", "02-23", "04-29", "05-03", "05-04", "05-05", "08-11", "11-03", "11-23"];
    var happy_monday_list = [["01", 2], ["07", 3], ["09", 3], ["10", 2]];
    
    holiday_list.push("03-" + (Math.floor(20.8431 + 0.242194 * (year - 1980)) - Math.floor((year - 1980) / 4)));
    var shubun = Math.floor(23.2488 + 0.242194 * (year - 1980)) - Math.floor((year - 1980) / 4);
    holiday_list.push("09-" + shubun);
    
    for (var happy_monday of happy_monday_list) {
        var dt = new Date(String(year) + "-" + happy_monday[0] + "-01 12:00:00");
        
        var day_number = dt.getDay();
        if (day_number <= 1) {
            day_number += 7;
        }
        holiday_list.push(happy_monday[0] + "-" + ("0" + ((2 - day_number) + (7 * happy_monday[1]))).slice(-2));
    }
    
    for (var holiday of holiday_list) {
        var dt = new Date(String(year) + "-" + holiday + " 12:00:00");
        
        if (dt.getDay() === 0) {
            var furikae_cnt = 0;
            do {
                furikae_cnt++;
                var furikae_date = holiday.substring(0, 2) + "-" + ("0" + (Number(holiday.substring(3)) + furikae_cnt)).slice(-2);
            } while (holiday_list.includes(furikae_date));
            
            holiday_list.push(furikae_date);
        }
    }
    
    if (holiday_list.includes("09-" + (shubun - 2))) {
        holiday_list.push("09-" + (shubun - 1));
    }
    
    return holiday_list;
}

function get_diagram_revision (date_str = null) {
    if (date_str === null) {
        date_str = get_date_string(get_timestamp());
    }
    
    for (var diagram_revision of diagram_revisions["diagram_revisions"]) {
        if (diagram_revision <= date_str) {
            return diagram_revision;
        }
    }
    
    mes("指定された日付のダイヤ情報は利用できません", true);
    
    return false;
}

function search_diagram_schedules (diagram_revision, date_str) {
    for (var diagram_schedule of diagram_info[diagram_revision]["diagram_schedules"]) {
        for (var diagram_period of diagram_schedule["periods"]) {
            if (diagram_period["start_date"] <= date_str && (diagram_period["end_date"] === null || diagram_period["end_date"] >= date_str)) {
                if (get_holiday_list(Number(date_str.substring(0, 4))).includes(date_str.substring(5))) {
                    return diagram_schedule["diagrams_by_day"][0];
                } else {
                    var dt = new Date(date_str + " 12:00:00");
                    
                    return diagram_schedule["diagrams_by_day"][dt.getDay()];
                }
            }
        }
    }
}

function get_diagram_id (dates, callback_1, callback_2 = null) {
    var railroad_id = railroad_info["railroad_id"];
    
    callback_2 = typeof callback_2 === "function" ? callback_2 : callback_1;
    
    if (typeof dates === "string") {
        dates = [dates];
    }
    
    var diagram_revisions = {};
    var diagram_revision_set = new Set();
    var diagram_revision_dates = {};
    for (var date_str of dates) {
        var diagram_revision = get_diagram_revision(date_str);
        
        if (diagram_revision === false) {
            callback_2(null);
            return;
        }
        
        diagram_revisions[date_str] = diagram_revision;
        diagram_revision_set.add(diagram_revision);
        if (!(diagram_revision in diagram_revision_dates)) {
            diagram_revision_dates[diagram_revision] = [];
        }
        diagram_revision_dates[diagram_revision].push(date_str);
    }
    
    var promise_list_1 = [];
    var promise_list_2 = [];
    var updates_exist = false;
    
    var diagram_ids = {};
    for (let diagram_revision of diagram_revision_set) {
        let tmp_diagram_ids_1;
        let promise_1;
        let last_modified_timestamp;
        
        if (diagram_revision in diagram_ids) {
            tmp_diagram_ids_1 = diagram_ids[diagram_revision];
            
            for (var date_str of diagram_revision_dates[diagram_revision]) {
                tmp_diagram_ids_1[date_str] = search_diagram_schedules(diagram_revision, date_str);
            }
            diagram_ids[diagram_revision] = tmp_diagram_ids_1;
            
            promise_1 = Promise.resolve();
        } else {
            tmp_diagram_ids_1 = {};
            promise_1 = new Promise(function (resolve_1, reject_1) {
                idb_start_transaction("diagrams", false, function (transaction) {
                    var diagrams_store = transaction.objectStore("diagrams");
                    var get_request = diagrams_store.get([railroad_id, diagram_revision]);
                    
                    get_request.onsuccess = function (evt) {
                        if (evt.target.result !== undefined) {
                            var diagram_info_data = evt.target.result;
                            last_modified_timestamp = diagram_info["last_modified_timestamp"];
                            
                            diagram_info[diagram_revision] = diagram_info_data;
                            
                            for (var date_str of diagram_revision_dates[diagram_revision]) {
                                tmp_diagram_ids_1[date_str] = search_diagram_schedules(diagram_revision, date_str);
                            }
                            diagram_ids[diagram_revision] = tmp_diagram_ids_1;
                            
                            resolve_1();
                        } else {
                            last_modified_timestamp = 0;
                            
                            reject_1();
                        }
                    };
                });
            });
        }
        
        promise_list_1.push(promise_1);
        promise_list_2.push(new Promise(function (resolve_2, reject_2) {
            promise_1.then(function () {}, function () {}).finally(function () {
                if (navigator.onLine) {
                    ajax_post("diagram_info.php", "railroad_id=" + escape_form_data(railroad_id) + "&diagram_revision=" + escape_form_data(diagram_revision) + "&last_modified_timestamp=" + last_modified_timestamp, function (response, last_modified) {
                        if (response !== false && response !== "NO_UPDATES_AVAILABLE") {
                            var diagram_info_data = JSON.parse(response);
                            
                            diagram_info_data["railroad_id"] = railroad_id;
                            diagram_info_data["diagram_revision"] = diagram_revision;
                            
                            var last_modified_date = new Date(last_modified);
                            diagram_info_data["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                            
                            idb_start_transaction("diagrams", true, function (transaction) {
                                var diagrams_store = transaction.objectStore("diagrams");
                                diagrams_store.put(diagram_info_data);
                            });
                            
                            diagram_info[diagram_revision] = diagram_info_data;
                            
                            var tmp_diagram_ids_2 = {};
                            for (date_str of diagram_revision_dates[diagram_revision]) {
                                tmp_diagram_ids_2[date_str] = search_diagram_schedules(diagram_revision, date_str);
                                if (!(date_str in tmp_diagram_ids_1) || tmp_diagram_ids_1[date_str] !== tmp_diagram_ids_2[date_str]) {
                                    updates_exist = true;
                                }
                            }
                            
                            diagram_ids[diagram_revision] = tmp_diagram_ids_2;
                            
                            resolve_2();
                        } else {
                            if (tmp_diagram_ids_1.length === 0) {
                                reject_2();
                            } else {
                                resolve_2();
                            }
                        }
                    });
                } else if (tmp_diagram_ids_1.length === 0) {
                    mes("オフラインのためダウンロードが完了していないダイヤ情報データは利用できません", true);
                    
                    reject_2();
                } else {
                    resolve_2();
                }
            });
        }));
    }
    
    Promise.all(promise_list_1).then(function () {
        callback_1(...dates.map(function (date_str) {
            return { diagram_revision : diagram_revisions[date_str], diagram_id : diagram_ids[diagram_revisions[date_str]][date_str] };
        }));
    }, function () {});
    Promise.allSettled(promise_list_1).then(function () {
        Promise.all(promise_list_2).then(function () {
            if (updates_exist) {
                callback_2(...dates.map(function (date_str) {
                    return { diagram_revision : diagram_revisions[date_str], diagram_id : diagram_ids[diagram_revisions[date_str]][date_str] };
                }));
            }
        }, function () { callback_2(null); });
    });
}


var tab_area_elm = document.getElementById("tab_area");
var article_elms = document.getElementsByTagName("article");

tab_area_elm.onselectstart = function (event) { event.preventDefault(); };

var mode_val = -1;

function change_mode (num) {
    if (num === -1) {
        blank_article_elm.innerHTML = "";
        blank_article_elm.style.display = "block";
        
        article_elms[0].scrollTop = 0;
    } else {
        if (num === mode_val) {
            return;
        }
        
        blank_article_elm.style.display = "none";
    }
    
    mode_val = num;
    
    var tabs = tab_area_elm.getElementsByTagName("a");
    var footer_boxes = document.getElementsByTagName("footer")[0].getElementsByTagName("div");
    for (var cnt = 0; cnt < article_elms.length; cnt++) {
        if (cnt === num) {
            article_elms[cnt].style.display = "block";
            tabs[cnt].className = "active_tab";
            footer_boxes[cnt].style.display = "block";
        } else {
            article_elms[cnt].style.display = "none";
            tabs[cnt].className = "";
            footer_boxes[cnt].style.display = "none";
        }
    }
}


var operation_table = null;
var line_operations = null;
var joined_operation_tables = {};
var joined_line_operations = {};

function set_operation_table (joined_railroad_id, data) {
    if (joined_railroad_id === null) {
        if (data["railroad_id"] === railroad_info["railroad_id"]) {
            operation_table = data;
        }
    } else {
        joined_operation_tables[joined_railroad_id] = data;
    }
}

function set_line_operations (joined_railroad_id, data) {
    if (joined_railroad_id === null) {
        if (data["railroad_id"] === railroad_info["railroad_id"]) {
            line_operations = data;
        }
    } else {
        var lines = Object.keys(data["lines"]);
        for (var line_id of lines) {
            var train_numbers = Object.keys(data["lines"][line_id]["inbound_trains"]);
            for (var train_number of train_numbers) {
                for (var cnt = 0; cnt < data["lines"][line_id]["inbound_trains"][train_number].length; cnt++) {
                    for (var cnt_2 = 0; cnt_2 < data["lines"][line_id]["inbound_trains"][train_number][cnt]["operation_numbers"].length; cnt_2++) {
                        data["lines"][line_id]["inbound_trains"][train_number][cnt]["operation_numbers"][cnt_2] += "@" + joined_railroad_id;
                    }
                }
            }
        
            var train_numbers = Object.keys(data["lines"][line_id]["outbound_trains"]);
            for (var train_number of train_numbers) {
                for (var cnt = 0; cnt < data["lines"][line_id]["outbound_trains"][train_number].length; cnt++) {
                    for (var cnt_2 = 0; cnt_2 < data["lines"][line_id]["outbound_trains"][train_number][cnt]["operation_numbers"].length; cnt_2++) {
                        data["lines"][line_id]["outbound_trains"][train_number][cnt]["operation_numbers"][cnt_2] += "@" + joined_railroad_id;
                    }
                }
            }
        }
        
        joined_line_operations[joined_railroad_id] = data;
    }
}

function load_operation_table (resolve_func_1, reject_func_1, resolve_func_2, reject_func_2, diagram_revision, diagram_id, joined_railroads = null) {
    var railroad_ids = joined_railroads === null ? [null] : [null, ...joined_railroads];
    
    var promise_list_1 = [];
    var promise_list_2 = [];
    
    joined_operation_tables = {};
    joined_line_operations = {};
    
    for (let railroad_id_or_null of railroad_ids) {
        promise_list_1.push(new Promise(function (resolve_1, reject_1) {
            promise_list_2.push(new Promise(function (resolve_2, reject_2) {
                var railroad_id = railroad_id_or_null === null ? railroad_info["railroad_id"] : railroad_id_or_null;
                
                var data = null;
                var last_modified_timestamp = 0;
                
                idb_start_transaction(["operation_tables", "line_operations"], false, function (transaction) {
                    var operation_tables = transaction.objectStore("operation_tables");
                    var operations_get_request = operation_tables.get([railroad_id, diagram_revision, diagram_id]);
                    
                    var line_operations_store = transaction.objectStore("line_operations");
                    var line_operations_get_request = line_operations_store.get([railroad_id, diagram_revision, diagram_id]);
                    
                    var promise_list_3 = [
                        new Promise(function (resolve, reject) {
                            operations_get_request.onsuccess = function (evt) {
                                if (evt.target.result !== undefined) {
                                    data = evt.target.result;
                                    last_modified_timestamp = data["last_modified_timestamp"];
                                    
                                    set_operation_table(railroad_id_or_null, data);
                                }
                                
                                resolve();
                            };
                        }),
                        new Promise(function (resolve, reject) {
                            line_operations_get_request.onsuccess = function (evt) {
                                if (evt.target.result !== undefined) {
                                    set_line_operations(railroad_id_or_null, evt.target.result);
                                }
                                
                                resolve();
                            };
                        })
                    ];
                    
                    Promise.all(promise_list_3).then(function () {
                        if (last_modified_timestamp > 0) {
                            resolve_1();
                        } else {
                            reject_1();
                        }
                        
                        update_operation_table(resolve_2, reject_2, railroad_id_or_null, diagram_revision, diagram_id, last_modified_timestamp);
                    });
                });
            }));
        }));
    }
    
    Promise.all(promise_list_1).then(resolve_func_1, reject_func_1);
    
    Promise.allSettled(promise_list_1).then(function () {
        Promise.all(promise_list_2).then(function (update_exists_list) {
            resolve_func_2(update_exists_list.includes(true));
        }, reject_func_2);
    });
}

function update_operation_table (resolve_func, reject_func, railroad_id_or_null, diagram_revision, diagram_id, last_modified_timestamp) {
    var railroad_id = railroad_id_or_null === null ? railroad_info["railroad_id"] : railroad_id_or_null;
    
    if (!navigator.onLine) {
        if (last_modified_timestamp === 0) {
            mes("オフラインのためダウンロードが完了していない運用データは利用できません", true);
            
            reject_func(null);
        } else {
            resolve_func(false);
        }
        
        return;
    }
    
    ajax_post("operation_table.php", "railroad_id=" + escape_form_data(railroad_id) + "&diagram_revision=" + escape_form_data(diagram_revision) + "&diagram_id=" + escape_form_data(diagram_id) + "&last_modified_timestamp=" + last_modified_timestamp, function (response, last_modified) {
        if (response !== false && response !== "NO_UPDATES_AVAILABLE") {
            var operation_response = JSON.parse(response);
            
            var last_modified_date = new Date(last_modified);
            last_modified_timestamp = Math.floor(last_modified_date.getTime() / 1000);
            
            operation_response["railroad_id"] = railroad_id;
            operation_response["diagram_revision"] = diagram_revision;
            operation_response["diagram_id"] = diagram_id;
            operation_response["last_modified_timestamp"] = last_modified_timestamp;
            
            var line_operations_data = {railroad_id : railroad_id, diagram_revision : diagram_revision, diagram_id : diagram_id, last_modified_timestamp : last_modified_timestamp, lines : {}};
            
            var operations_stopped_trains = {};
            
            var operation_group_mapping = {};
            for (var operation_group of operation_response["operation_groups"]) {
                for (var operation_number of operation_group["operation_numbers"]) {
                    operation_group_mapping[operation_number] = operation_group["operation_group_name"];
                }
            }
            
            for (var operation_number of Object.keys(operation_response["operations"])) {
                operation_response["operations"][operation_number]["operation_group_name"] = operation_group_mapping[operation_number];
                
                operations_stopped_trains[operation_number] = [];
                
                for_2: for (var cnt_2 = 0; cnt_2 < operation_response["operations"][operation_number]["trains"].length; cnt_2++) {
                    if (operation_response["operations"][operation_number]["trains"][cnt_2]["train_number"].startsWith("_")) {
                        var train = operation_response["operations"][operation_number]["trains"].splice(cnt_2, 1)[0];
                        
                        operations_stopped_trains[operation_number].push(train);
                        
                        cnt_2--;
                    } else {
                        var train = operation_response["operations"][operation_number]["trains"][cnt_2];
                    }
                    
                    if (train["direction"] === "inbound") {
                        var train_direction = "inbound_trains";
                    } else if (train["direction"] === "outbound") {
                        var train_direction = "outbound_trains";
                    } else {
                        continue;
                    }
                    
                    if (!(train["line_id"] in line_operations_data["lines"])) {
                        line_operations_data["lines"][train["line_id"]] = {
                            inbound_trains : {},
                            outbound_trains : {}
                        };
                    }
                    
                    if (!(train["train_number"] in line_operations_data["lines"][train["line_id"]][train_direction])) {
                        line_operations_data["lines"][train["line_id"]][train_direction][train["train_number"]] = [];
                    }
                    
                    for (var cnt_3 = 0; cnt_3 < line_operations_data["lines"][train["line_id"]][train_direction][train["train_number"]].length; cnt_3++) {
                        if (line_operations_data["lines"][train["line_id"]][train_direction][train["train_number"]][cnt_3]["starting_station"] === train["starting_station"]) {
                            var train_operations = line_operations_data["lines"][train["line_id"]][train_direction][train["train_number"]][cnt_3]["operation_numbers"];
                            
                            for_4: for (var cnt_4 = 0; cnt_4 < train_operations.length; cnt_4++) {
                                if (!train["train_number"].startsWith("_")) {
                                    var operation_trains = operation_response["operations"][train_operations[cnt_4]]["trains"];
                                } else {
                                    var operation_trains = operations_stopped_trains[train_operations[cnt_4]];
                                }
                                
                                for (var operation_train of operation_trains) {
                                    if (operation_train["train_number"] === train["train_number"] && operation_train["starting_station"] === train["starting_station"] && operation_train["position_forward"] > train["position_forward"]) {
                                        break for_4;
                                    }
                                }
                            }
                            
                            line_operations_data["lines"][train["line_id"]][train_direction][train["train_number"]][cnt_3]["operation_numbers"].splice(cnt_4, 0, operation_number);
                            
                            continue for_2;
                        } else if (line_operations_data["lines"][train["line_id"]][train_direction][train["train_number"]][cnt_3]["first_departure_time"] > train["first_departure_time"]) {
                            break;
                        }
                    }
                    
                    line_operations_data["lines"][train["line_id"]][train_direction][train["train_number"]].splice(cnt_3, 0, {
                        first_departure_time : train["first_departure_time"],
                        final_arrival_time : train["final_arrival_time"],
                        starting_station : train["starting_station"],
                        terminal_station : train["terminal_station"],
                        operation_numbers : [operation_number]
                    });
                }
            }
            
            set_operation_table(railroad_id_or_null, operation_response);
            set_line_operations(railroad_id_or_null, structuredClone(line_operations_data));
            
            idb_start_transaction(["operation_tables", "line_operations"], true, function (transaction) {
                var operation_tables_store = transaction.objectStore("operation_tables");
                operation_tables_store.put(operation_response);
                
                var line_operations_store = transaction.objectStore("line_operations");
                line_operations_store.put(line_operations_data);
            });
            
            resolve_func(true);
        } else {
            if (last_modified_timestamp > 0) {
                resolve_func(false);
            } else {
                reject_func(null);
            }
        }
    });
}


var timetable = null;
var timetable_date = null;

function update_timetable (resolve_1, reject_1, resolve_2, reject_2, diagram_revision, timetable_id) {
    timetable = null;
    
    var railroad_id = railroad_info["railroad_id"];
    
    idb_start_transaction("timetables", false, function (transaction) {
        var timetables_store = transaction.objectStore("timetables");
        var get_request = timetables_store.get([railroad_id, diagram_revision, timetable_id]);
        
        get_request.onsuccess = function (evt) {
            if (evt.target.result !== undefined) {
                timetable = evt.target.result;
                var last_modified_timestamp = timetable["last_modified_timestamp"];
                
                resolve_1();
            } else {
                var last_modified_timestamp = 0;
                
                reject_1();
            }
            
            if (navigator.onLine) {
                ajax_post("timetable.php", "railroad_id=" + escape_form_data(railroad_id) + "&diagram_revision=" + escape_form_data(diagram_revision) + "&timetable_id=" + escape_form_data(timetable_id) + "&last_modified_timestamp=" + last_modified_timestamp, function (response, last_modified) {
                    if (response !== false && response !== "NO_UPDATES_AVAILABLE") {
                        timetable = {timetable : JSON.parse(response)};
                        
                        timetable["railroad_id"] = railroad_id;
                        timetable["diagram_revision"] = diagram_revision;
                        timetable["timetable_id"] = timetable_id;
                        
                        var last_modified_date = new Date(last_modified);
                        timetable["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                        
                        idb_start_transaction("timetables", true, function (transaction) {
                            var timetable_store = transaction.objectStore("timetables");
                            timetable_store.put(timetable);
                        });
                        
                        resolve_2(true);
                    } else {
                        if (timetable !== null) {
                            resolve_2(false);
                        } else {
                            reject_2();
                        }
                    }
                });
            } else {
                if (timetable !== null) {
                    resolve_2(false);
                } else {
                    mes("オフラインのためダウンロードが完了していない時刻表データは利用できません", true);
                    
                    reject_2();
                }
            }
        };
    });
}


var operation_data = null;
var joined_operation_data = {};
var operation_date_last;
var operation_data_last_updated = null;

function set_operation_data (joined_railroad_id, data) {
    if (joined_railroad_id === null) {
        if (data["railroad_id"] === railroad_info["railroad_id"] && data["operation_date"] === operation_date_last) {
            operation_data = data;
        }
    } else {
        joined_operation_data[joined_railroad_id] = data;
    }
}

function update_operation_data (resolve_func_1, reject_func_1, resolve_func_2, reject_func_2, operation_date, joined_railroads = null, remote_data_only = false) {
    var railroad_ids = joined_railroads === null ? [null] : [null, ...joined_railroads];
    
    var promise_list_1 = [];
    var promise_list_2 = [];
    var updates_exist = false;
    
    for (let railroad_id_or_null of railroad_ids) {
        promise_list_1.push(new Promise(function (resolve_1, reject_1) {
            promise_list_2.push(new Promise(function (resolve_2, reject_2) {
                var railroad_id = railroad_id_or_null === null ? railroad_info["railroad_id"] : railroad_id_or_null;
                
                var data = null;
                var resolved = false;
                
                idb_start_transaction("operation_data", false, function (transaction) {
                    var operation_data_store = transaction.objectStore("operation_data");
                    var get_request = operation_data_store.get([railroad_id, operation_date]);
                    
                    get_request.onsuccess = function (evt) {
                        if (evt.target.result !== undefined) {
                            data = evt.target.result;
                            var last_modified_timestamp = data["last_modified_timestamp"];
                            
                            if (!remote_data_only) {
                                resolved = true;
                            }
                        } else {
                            if (!remote_data_only) {
                                data = {railroad_id : railroad_id, operation_date : operation_date, operations : {}, last_modified_timestamp : null};
                                
                                resolved = true;
                            }
                            
                            var last_modified_timestamp = 0;
                        }
                        
                        if (resolved) {
                            set_operation_data(railroad_id_or_null, data);
                            
                            resolve_1();
                        } else {
                            reject_1();
                        }
                        
                        if (navigator.onLine) {
                            if (data === null) {
                                data = {railroad_id : railroad_id, operation_date : operation_date, operations : {}, last_modified_timestamp : null};
                            }
                            
                            ajax_post("operation_data.php", "railroad_id=" + escape_form_data(railroad_id) + "&date=" + escape_form_data(operation_date) + "&last_modified_timestamp=" + last_modified_timestamp, function (response, last_modified) {
                                if (response !== false) {
                                    if (response !== "NO_UPDATES_AVAILABLE") {
                                        Object.assign(data["operations"], JSON.parse(response));
                                        
                                        var last_modified_date = new Date(last_modified);
                                        data["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                                        
                                        idb_start_transaction("operation_data", true, function (transaction) {
                                            var operation_data_store = transaction.objectStore("operation_data");
                                            operation_data_store.put(data);
                                        });
                                        
                                        set_operation_data(railroad_id_or_null, data);
                                        
                                        updates_exist = true;
                                    } else if (!resolved) {
                                        set_operation_data(railroad_id_or_null, data);
                                        
                                        updates_exist = true;
                                    }
                                    
                                    resolve_2(updates_exist);
                                } else if (resolved) {
                                    resolve_2(false);
                                } else {
                                    reject_2();
                                }
                            });
                        } else {
                            resolve_2(false);
                        }
                    };
                });
            }));
        }));
    }
    
    operation_data_last_updated = get_timestamp();
    
    Promise.all(promise_list_1).then(resolve_func_1, reject_func_1);
    
    Promise.allSettled(promise_list_1).then(function () {
        Promise.all(promise_list_2).then(function () {
            resolve_func_2(updates_exist);
        }, reject_func_2);
    });
}


function load_data (callback_1, callback_2, reject_func, diagram_revision, diagram_id, joined_railroads = null, operation_data_date = null) {
    var promise_list_1 = [];
    var promise_list_2 = [];
    
    promise_list_1.push(new Promise(function (resolve_1, reject_1) {
        promise_list_2.push(new Promise(function (resolve_2, reject_2) {
            load_operation_table(resolve_1, reject_1, resolve_2, reject_2, diagram_revision, diagram_id, joined_railroads);
        }));
    }));
    
    promise_list_1.push(new Promise(function (resolve_1, reject_1) {
        promise_list_2.push(new Promise(function (resolve_2, reject_2) {
            update_timetable(resolve_1, reject_1, resolve_2, reject_2, diagram_revision, diagram_info[diagram_revision]["diagrams"][diagram_id]["timetable_id"]);
        }));
    }));
    
    joined_operation_data = {};
    if (operation_data_date !== null) {
        operation_date_last = operation_data_date;
        
        promise_list_1.push(new Promise(function (resolve_1, reject_1) {
            promise_list_2.push(new Promise(function (resolve_2, reject_2) {
                update_operation_data(resolve_1, reject_1, resolve_2, reject_2, operation_data_date, joined_railroads);
            }));
        }));
    } else {
        operation_date_last = null;
        operation_data = null;
        operation_data_last_updated = null;
    }
    
    Promise.all(promise_list_1).then(function () {
        callback_1();
    }, function () {});
    Promise.allSettled(promise_list_1).then(function () {
        Promise.all(promise_list_2).then(function (update_exists_list) {
            if (typeof callback_2 === "function") {
                callback_2(update_exists_list.includes(true));
            } else if (update_exists_list.includes(true)) {
                callback_1();
            }
        }, function () {
            reject_func();
        });
    });
}


var background_updater_last_execution = null;
var announcement_last_checked = null;
var railroad_announcement_last_checked = null;
var position_last_updated = null;

function background_updater () {
    var date_now = new Date();
    var now_ts = Math.floor(date_now.getTime() / 1000);
    
    if (background_updater_last_execution !== null) {
        if (now_ts < background_updater_last_execution + 60) {
            var hh_and_mm = ("0" + date_now.getHours()).slice(-2) + ":" + ("0" + date_now.getMinutes()).slice(-2);
            
            if (mode_val === 0 && position_last_updated !== null && position_last_updated < hh_and_mm) {
                position_change_time();
            }
            
            if (announcement_last_checked !== null && now_ts > announcement_last_checked + 1800) {
                check_announcements();
            }
            
            if (railroad_info !== null && railroad_announcement_last_checked !== null && now_ts > railroad_announcement_last_checked + 600) {
                update_railroad_announcement(railroad_info["railroad_id"]);
            }
        
            if (navigator.onLine && operation_data_last_updated !== null && operation_data_last_updated < now_ts - config["refresh_interval"] * 60) {
                update_operation_data(function () {}, function () {}, function (update_exists) {
                    if (!update_exists) {
                        return;
                    }
                    
                    switch (mode_val) {
                        case 0:
                            position_change_time(0);
                            break;
                        
                        case 1:
                            if (timetable_selected_station !== null) {
                                timetable_select_station(timetable_selected_station);
                            }
                            break;
                        
                        case 2:
                            operation_data_draw();
                            break;
                    }
                }, function () {}, operation_date_last, mode_val <= 1 && "joined_railroads" in railroad_info ? railroad_info["joined_railroads"] : null, true);
            }
        } else if (mode_val === 0) {
            mes("情報を更新しています...", false, 2);
        }
    }
    
    background_updater_last_execution = now_ts;
}

var background_updater_interval_id = null;

function background_updater_start_stop () {
    if (background_updater_interval_id !== null) {
        clearInterval(background_updater_interval_id);
    }
    
    if (document.visibilityState === "visible") {
        background_updater();
        background_updater_interval_id = setInterval(background_updater, 2000);
    } else {
        background_updater_interval_id = null;
    }
}

document.onvisibilitychange = background_updater_start_stop;
background_updater_start_stop();


var position_selected_line = null;

var position_line_select_elm = document.getElementById("position_line_select");
var position_area_elm = document.getElementById("position_area");
var position_reload_button_elm = document.getElementById("position_reload_button");
var position_time_button_elm = document.getElementById("position_time_button");

function position_mode (line_id = null, date_str = "__today__", scroll_target_station = null, position_time_additions = null) {
    change_title(railroad_info["railroad_name"] + "の車両運用情報 | " + instance_info["instance_name"], "/railroad_" + railroad_info["railroad_id"] + "/");
    
    change_mode(0);
    
    if (line_id !== null) {
        position_selected_line = line_id;
    }
    
    var position_scroll_amount = article_elms[0].scrollTop;
    
    position_area_elm.innerHTML = "";
    position_line_select_elm.style.display = "none";
    
    timetable_date = date_str;
    
    var position_diagram_elm = document.getElementById("position_diagram");
    
    if (date_str === "__today__") {
        var diagram_date = get_date_string(get_timestamp());
        position_diagram_elm.innerHTML = "今日";
        
        if (position_time_additions === null) {
            position_reload_button_elm.style.display = "none";
        }
    } else {
        position_last_updated = null;
        position_reload_button_elm.style.display = "block";
        
        if (date_str === "__tomorrow__") {
            var diagram_date = get_date_string(get_timestamp() + 86400);
            position_diagram_elm.innerHTML = "明日";
        } else {
            var diagram_date = get_date_string(get_timestamp());
            position_diagram_elm.innerHTML = "";
        }
    }
    
    get_diagram_id(diagram_date, function (diagram_data) {
        if (diagram_data === null) {
            return;
        }
        
        if (date_str !== "__today__" && date_str !== "__tomorrow__") {
            var diagram_id = date_str;
            var operation_data_date = null;
            position_diagram_elm.innerHTML = "<small>" + escape_html(diagram_info[diagram_data["diagram_revision"]]["diagrams"][diagram_id]["diagram_name"]) + "</small>";
        } else {
            var diagram_id = diagram_data["diagram_id"];
            var operation_data_date = diagram_date;
        }
        
        if (config["show_train_types_in_position_mode"]) {
            document.getElementById("show_train_types_radio").checked = true;
        } else {
            document.getElementById("show_train_numbers_radio").checked = true;
        }
        
        position_change_time(position_time_additions, false, false);
        
        var data_loaded = false;
        load_data(function () {
            position_line_select_elm.style.display = "block";
            position_change_lines(position_selected_line, scroll_target_station !== null ? scroll_target_station : position_scroll_amount);
            
            data_loaded = true;
        }, function (updates_exist) {
            if (!data_loaded) {
                position_line_select_elm.style.display = "block";
                position_change_lines(position_selected_line, scroll_target_station !== null ? scroll_target_station : position_scroll_amount);
            } else if (updates_exist) {
                position_change_time(0);
            }
        }, function () {
            position_area_elm.innerHTML = "<div class='no_data'>表示に必要なデータが利用できません</div>";
            position_line_select_elm.style.display = "none";
        }, diagram_data["diagram_revision"], diagram_id, "joined_railroads" in railroad_info ? railroad_info["joined_railroads"] : null, operation_data_date);
    });
}

function update_selected_line (line_id, position_mode) {
    if (line_id !== null) {
        var line_color = config["dark_mode"] ? convert_color_dark_mode(railroad_info["lines"][line_id]["line_color"]) : railroad_info["lines"][line_id]["line_color"];
        
        if ("line_symbol" in railroad_info["lines"][line_id]) {
            var line_symbol = railroad_info["lines"][line_id]["line_symbol"];
        } else {
            var line_symbol = railroad_info["lines"][line_id]["line_name"].substring(0, 1);
        }
        
        var line_name = escape_html(railroad_info["lines"][line_id]["line_name"]);
    } else {
        var line_color = "transparent";
        var line_symbol = "";
        var line_name = "全ての路線";
    }
    
    var line_select_html = "<abbr style='color: " + line_color + ";'>" + line_symbol + "</abbr>" + line_name;
    if (position_mode) {
        position_selected_line = line_id;
        position_line_select_elm.innerHTML = line_select_html;
    } else {
        timetable_selected_line = line_id;
        document.getElementById("timetable_line_select").innerHTML = line_select_html;
    }
}

function position_change_lines (line_id, scroll_target = -1) {
    if (!config["dark_mode"]) {
        var line_color = railroad_info["lines"][line_id]["line_color"];
        
        var line_color_hsl = rgb2hsl(line_color);
        var station_color = "hsl(" + line_color_hsl[0] + "deg " + Math.round(line_color_hsl[1] / 2.55) + "% " + Math.round((line_color_hsl[2] + 1275) / 6 / 2.55) + "%)";
        var major_station_row_color = "hsl(" + line_color_hsl[0] + "deg " + Math.round(line_color_hsl[1] / 2.55) + "% " + Math.round((line_color_hsl[2] + 2295) / 10 / 2.55) + "%)";
    } else {
        var line_color = convert_color_dark_mode(railroad_info["lines"][line_id]["line_color"]);
        
        var line_color_hsl = rgb2hsl(railroad_info["lines"][line_id]["line_color"]);
        var station_color = "hsl(" + line_color_hsl[0] + "deg " + Math.round(line_color_hsl[1] / 4 / 2.55) + "% " + Math.round(Math.min(255 - line_color_hsl[2] + 32, 127) / 2.55) + "%)";
        var major_station_row_color = "hsl(" + line_color_hsl[0] + "deg " + Math.round(line_color_hsl[1] / 16 / 2.55) + "% " + Math.round(Math.min(Math.max(255 - line_color_hsl[2] + 16, 255), 85) / 2.55) + "%)";
    }
    
    update_selected_line(line_id, true);
    
    var buf = "";
    for (var cnt = 0; cnt <= railroad_info["lines"][line_id]["stations"].length; cnt++) {
        var border_style = "";
        var position_station_class = "";
        var connecting_lines_html = "";
        
        if (cnt >= 1) {
            buf += "<tr";
            
            if ("connecting_lines" in railroad_info["lines"][line_id]["stations"][cnt - 1]) {
                var junction_class_list = [];
                
                for (var connecting_line of railroad_info["lines"][line_id]["stations"][cnt - 1]["connecting_lines"]) {
                    for (var line_direction of connecting_line["directions"]) {
                        if ((line_direction === "TL" || line_direction === "TR") && !("T" in junction_class_list)) {
                            junction_class_list.push("T");
                        } else if ((line_direction === "L" || line_direction === "R") && !("LR" in junction_class_list)) {
                            junction_class_list.push("LR");
                        } else if ((line_direction === "BL" || line_direction === "BR") && !("B" in junction_class_list)) {
                            junction_class_list.push("B");
                        }
                        
                        if (!("affiliated_railroad_id" in railroad_info["lines"][connecting_line["line_id"]])) {
                            connecting_lines_html += "<button type='button' class='connecting_line_" + line_direction + "' onclick='position_change_lines(\"" + connecting_line["line_id"] + "\", \"" + add_slashes(railroad_info["lines"][line_id]["stations"][cnt - 1]["station_name"]) + "\");' style='color: " + (config["dark_mode"] ? convert_color_dark_mode(railroad_info["lines"][connecting_line["line_id"]]["line_color"]) : railroad_info["lines"][connecting_line["line_id"]]["line_color"]) + ";'><div>" + escape_html(railroad_info["lines"][connecting_line["line_id"]]["line_name"]) + "</div></button>";
                        } else {
                            connecting_lines_html += "<a href='/railroad_" + railroad_info["lines"][connecting_line["line_id"]]["affiliated_railroad_id"] + "/' class='connecting_line_" + line_direction + "' onclick='event.preventDefault(); select_railroad(\"" + railroad_info["lines"][connecting_line["line_id"]]["affiliated_railroad_id"] + "\", \"position_mode\", \"" + connecting_line["line_id"] + "\");' style='color: " + (config["dark_mode"] ? convert_color_dark_mode(railroad_info["lines"][connecting_line["line_id"]]["line_color"]) : railroad_info["lines"][connecting_line["line_id"]]["line_color"]) + ";'><div>" + escape_html(railroad_info["lines"][connecting_line["line_id"]]["line_name"]) + "</div></a>";
                        }
                    }
                }
                
                var buf_2 = "";
                for (var junction_class of junction_class_list) {
                    buf_2 += (buf_2.length >= 1 ? " " : "") + "position_row_junction_" + junction_class;
                }
                buf += " class='" + buf_2 + "'";
            }
            
            buf += "><th>";
            
            if ("is_signal_station" in railroad_info["lines"][line_id]["stations"][cnt - 1] && railroad_info["lines"][line_id]["stations"][cnt - 1]["is_signal_station"]) {
                var is_signal_station = true;
                
                buf += "<div class='position_station position_signal_station'";
                
                border_style = " style='border-top-color: transparent;'";
                position_station_class = " position_line_signal_station";
            } else {
                var is_signal_station = false;
                
                buf += "<a href='/railroad_" + railroad_info["railroad_id"] + "/timetable/" + line_id + "/" + encodeURIComponent(railroad_info["lines"][line_id]["stations"][cnt - 1]["station_name"]) + "/' onclick='event.preventDefault(); show_station_timetable(\"" + line_id + "\", \"" + railroad_info["lines"][line_id]["stations"][cnt - 1]["station_name"] + "\");' class='position_station'";
                
                if ("is_major_station" in railroad_info["lines"][line_id]["stations"][cnt - 1] && railroad_info["lines"][line_id]["stations"][cnt - 1]["is_major_station"]) {
                    buf += " style='background-color: " + station_color + ";'";
                    
                    border_style = " style='border-top: 2px solid " + major_station_row_color + ";'";
                    position_station_class = " position_line_major_station";
                }
            }
            
            buf += ">";
            
            if (railroad_info["lines"][line_id]["stations"][cnt - 1]["station_name"].length > 5) {
                buf += escape_html(railroad_info["lines"][line_id]["stations"][cnt - 1]["station_name"].substring(0, 4) + "..");
            } else{
                buf += escape_html(railroad_info["lines"][line_id]["stations"][cnt - 1]["station_name"]);
            }
            
            buf += is_signal_station ? "</div>" : "</a>";
            
            if (connecting_lines_html.length >= 1 || ("connecting_railroads" in railroad_info["lines"][line_id]["stations"][cnt - 1] && railroad_info["lines"][line_id]["stations"][cnt - 1]["connecting_railroads"].length >= 1)) {
                buf += "<button type='button' class='connecting_railroads_button' onclick='select_lines(\"" + line_id + "\", \"" + add_slashes(railroad_info["lines"][line_id]["stations"][cnt - 1]["station_name"]) + "\");' aria-label='接続路線'></button>";
            }
        } else {
            buf += "<tr><th>";
        }
        
        buf += "</th><td class='position_inbound'" + border_style + "></td><td class='position_line" + position_station_class + "' style='color: " + line_color + ";'>" + connecting_lines_html + "</td><td class='position_outbound'" + border_style + "></td></tr>";
        
        if ("double_station_spacing" in railroad_info["lines"][line_id] && railroad_info["lines"][line_id]["double_station_spacing"] && cnt !== 0 && cnt !== railroad_info["lines"][line_id]["stations"].length) {
                buf += "<tr class='position_row_no_station'><th></th><td class='position_inbound'></td><td class='position_line" + position_station_class + "' style='color: " + line_color + ";'></td><td class='position_outbound'></td></tr>";
        }
    }
    
    position_area_elm.innerHTML = buf;
    
    if (typeof scroll_target === "string") {
        for (cnt = 0; cnt < railroad_info["lines"][line_id]["stations"].length; cnt++) {
            if (railroad_info["lines"][line_id]["stations"][cnt]["station_name"] === scroll_target) {
                var article_rect = article_elms[0].getBoundingClientRect();
                var station_rect = position_area_elm.getElementsByClassName("position_station")[cnt].getBoundingClientRect();
                
                article_elms[0].scrollTop += station_rect.top - article_rect.top - (article_rect.height / 2) + (station_rect.height / 2);
                
                break;
            }
        }
    } else if (scroll_target >= 0) {
        article_elms[0].scrollTop = scroll_target;
    }
    
    var label_train_type_elm = document.getElementById("show_train_types_label_train_type");
    var label_final_destination_elm = document.getElementById("show_train_types_label_final_destination");
    
    if ("show_final_destinations_in_position_mode" in railroad_info["lines"][line_id] && railroad_info["lines"][line_id]["show_final_destinations_in_position_mode"]) {
        label_train_type_elm.style.display = "none";
        label_final_destination_elm.style.display = "inline";
    } else {
        label_train_type_elm.style.display = "inline";
        label_final_destination_elm.style.display = "none";
    }
    
    position_change_time(0);
}

function select_lines (line_id = null, station_name = null, position_mode = true) {
    var popup_inner_elm = open_square_popup("line_select_popup", true, "路線の選択");
    
    if (line_id === null || station_name === null) {
        var lines = [...railroad_info["lines_order"]];
        var joined_lines = "joined_lines_order" in railroad_info ? [...railroad_info["joined_lines_order"]] : [];
        var connecting_railroads = [];
        
        if (!position_mode) {
            lines.unshift(null);
        }
    } else {
        var lines = position_mode ? [] : [line_id];
        var joined_lines = [];
        
        for (var station_data of railroad_info["lines"][line_id]["stations"]) {
            if (station_data["station_name"] === station_name) {
                if ("connecting_lines" in station_data) {
                    for (var connecting_line of station_data["connecting_lines"]) {
                        if (!("affiliated_railroad_id" in railroad_info["lines"][connecting_line["line_id"]])) {
                            lines.push(connecting_line["line_id"]);
                        } else {
                            joined_lines.push(connecting_line["line_id"]);
                        }
                    }
                }
                
                var connecting_railroads = "connecting_railroads" in station_data ? station_data["connecting_railroads"] : [];
                
                break;
            }
        }
    }
    
    var buf = "";
    for (var line_id of lines) {
        if (line_id !== null) {
            var line_id_text = "\"" + line_id + "\"";
            var line_color = config["dark_mode"] ? convert_color_dark_mode(railroad_info["lines"][line_id]["line_color"]) : railroad_info["lines"][line_id]["line_color"];
            var line_symbol = "line_symbol" in railroad_info["lines"][line_id] ? railroad_info["lines"][line_id]["line_symbol"] : railroad_info["lines"][line_id]["line_name"].substring(0, 1);
            var line_name = escape_html(railroad_info["lines"][line_id]["line_name"]);
        } else {
            var line_id_text = null;
            var line_color = "transparent";
            var line_symbol = "";
            var line_name = "全ての路線";
        }
        
        buf += "<button type='button' onclick='close_square_popup(); ";
        
        if (position_mode) {
            buf += "position_change_lines(" + line_id_text + ", " + (station_name === null ? "0" : "\"" + add_slashes(station_name) + "\"") + ");";
        } else {
            buf += "timetable_change_lines(" + line_id_text + ");";
        }
        
        buf += "'><abbr style='background-color: " + line_color + ";'>" + line_symbol + "</abbr>" + line_name + "</button>";
    }
    
    if (joined_lines.length >= 1) {
        buf += "<h4>乗り入れ先の路線</h4>";
        
        for (var line_id of joined_lines) {
            buf += "<button type='button' onclick='close_square_popup(); ";
            
            if (position_mode) {
                buf += "select_railroad(\"" + railroad_info["lines"][line_id]["affiliated_railroad_id"] + "\", \"position_mode\", \"" + line_id + "\"" + (station_name === null ? "" : ", \"" + add_slashes(station_name) + "\"") + ");";
            } else {
                buf += "select_railroad(\"" + railroad_info["lines"][line_id]["affiliated_railroad_id"] + "\", \"timetable_mode\", \"" + line_id + "\"" + (timetable_selected_station === null ? "" : ", \"" + add_slashes(timetable_selected_station) + "\"") + ");";
            }
            
            buf += "'><abbr style='background-color: " + (config["dark_mode"] ? convert_color_dark_mode(railroad_info["lines"][line_id]["line_color"]) : railroad_info["lines"][line_id]["line_color"]) + ";'>" + ("line_symbol" in railroad_info["lines"][line_id] ? railroad_info["lines"][line_id]["line_symbol"] : railroad_info["lines"][line_id]["line_name"].substring(0, 1)) + "</abbr>" + escape_html(railroad_info["lines"][line_id]["line_name"]) + "</button>";
        }
    }
    
    buf += "<div id='line_select_connecting_railroads'></div>";
    
    popup_inner_elm.innerHTML = buf;
    
    if (connecting_railroads.length >= 1) {
        get_railroad_list(function (railroads, loading_completed) {
            var buf = "<h4>乗り換え可能な路線系統</h4>";
            
            for (var connecting_railroad of connecting_railroads) {
                if (!(connecting_railroad["railroad_id"] in railroads["railroads"])) {
                    continue;
                }
                
                var railroad_color = !config["dark_mode"] ? railroads["railroads"][connecting_railroad["railroad_id"]]["main_color"] : convert_color_dark_mode(railroads["railroads"][connecting_railroad["railroad_id"]]["main_color"]);
                
                if ("lines" in connecting_railroad) {
                    buf += "<div class='connecting_railroad_link' style='border-color: " + railroad_color + ";'><h5>" + escape_html(railroads["railroads"][connecting_railroad["railroad_id"]]["railroad_name"]) + "</h5>";
                    
                    for (var line of connecting_railroad["lines"]) {
                        buf += "<a href='/railroad_" + connecting_railroad["railroad_id"] + "/timetable/" + line["line_id"] + "/" + encodeURIComponent("station_name" in line ? line["station_name"] : station_name) + "/' onclick='event.preventDefault(); close_square_popup(); select_railroad(\"" + connecting_railroad["railroad_id"] + "\", \"" + (position_mode ? "position" : "timetable") + "_mode\", \"" + line["line_id"] + "\", \"" + add_slashes("station_name" in line ? line["station_name"] : station_name) + "\");'>" + escape_html(line["line_name"]);
                        if ("station_name" in line && line["station_name"] !== station_name) {
                            buf += "<small>(" + escape_html(line["station_name"]) + "駅)</small>";
                        }
                        buf += "</a>";
                    }
                    
                    buf += "</div>";
                } else {
                    buf += "<a href='/railroad_" + connecting_railroad["railroad_id"] + "/" + (position_mode ? "" : "timetable/") + "' class='connecting_railroad_link' onclick='event.preventDefault(); close_square_popup(); select_railroad(\"" + connecting_railroad["railroad_id"] + "\", \"" + (position_mode ? "position" : "timetable") + "_mode\");' style='border-color: " + railroad_color + ";'><h5>" + escape_html(railroads["railroads"][connecting_railroad["railroad_id"]]["railroad_name"]) + "</h5></a>";
                }
            }
            
            if (!loading_completed) {
                buf += "<div class='loading_icon'></div>";
            }
            
            document.getElementById("line_select_connecting_railroads").innerHTML = buf;
        })
    }
}

function convert_train_position_data (train_data) {
    train_data["train_title"] = train_data["train_number"].startsWith("_") ? train_data["train_number"].substring(1).split("__")[0] : train_data["train_number"].split("__")[0];
    
    train_data["formation_html"] = escape_html(train_data["formation_text"]).replace(/\+/g, "<wbr>+");
    
    if (train_data["comment_exists"]) {
        train_data["formation_html"] += "*";
    }
    
    if (train_data["posts_count"] === 0) {
        train_data["formation_html"] = "<b style='color: " + (!config["dark_mode"] ? "#0099cc" : "#33ccff") + ";'>" + train_data["formation_html"] + "</b>";
    } else if (train_data["reassigned"]) {
        train_data["formation_html"] = "<b style='color: " + (!config["dark_mode"] ? "#cc0000" : "#ff9999") + ";'>" + train_data["formation_html"] + "</b>";
    } else if (config["colorize_corrected_posts"] && train_data["variant_exists"]) {
        train_data["formation_html"] = "<b style='color: " + (!config["dark_mode"] ? "#ee7700" : "#ffcc99") + ";'>" + train_data["formation_html"] + "</b>";
    } else if (train_data["is_quotation"]) {
        train_data["formation_html"] = "<b style='color: " + (!config["dark_mode"] ? "#9966ff" : "#cc99ff") + ";'>" + train_data["formation_html"] + "</b>";
    } else if (config["colorize_beginners_posts"] && train_data["from_beginner"]) {
        train_data["formation_html"] = "<b style='color: #33cc99;'>" + train_data["formation_html"] + "</b>";
    } else {
        train_data["formation_html"] = "<b>" + train_data["formation_html"] + "</b>";
    }
    
    return train_data;
}

function draw_train_position (hh_and_mm) {
    var directions = ["inbound", "outbound"];
    var position_elms = [document.getElementsByClassName("position_inbound"), document.getElementsByClassName("position_outbound")];
    
    var inbound_trains = line_operations["lines"][position_selected_line]["inbound_trains"];
    var outbound_trains = line_operations["lines"][position_selected_line]["outbound_trains"];
    if ("joined_railroads" in railroad_info) {
        for (var railroad_id of railroad_info["joined_railroads"]) {
            if (position_selected_line in joined_line_operations[railroad_id]["lines"]) {
                inbound_trains = Object.assign(inbound_trains, joined_line_operations[railroad_id]["lines"][position_selected_line]["inbound_trains"]);
                outbound_trains = Object.assign(outbound_trains, joined_line_operations[railroad_id]["lines"][position_selected_line]["outbound_trains"]);
            }
        }
    }
    
    var line_positions = [get_train_positions(inbound_trains, position_selected_line, hh_and_mm, true), get_train_positions(outbound_trains, position_selected_line, hh_and_mm, false)];
    
    for (var direction_cnt = 0; direction_cnt <= 1; direction_cnt++) {
        for (var cnt = 0; cnt < line_positions[direction_cnt].length; cnt++) {
            if (line_positions[direction_cnt][cnt].length === 1) {
                var train = convert_train_position_data(line_positions[direction_cnt][cnt][0]);
                
                var train_color = config["dark_mode"] ? convert_font_color_dark_mode(get_train_color(train["train_title"], "#333333")) : get_train_color(train["train_title"], "#333333");
                
                var buf = "<div onclick='train_detail(\"" + position_selected_line + "\", \"" + train["train_number"] + "\", \"" + train["starting_station"] + "\", \"" + directions[direction_cnt] + "_trains\", " + (operation_data !== null ? "true" : "false") + ");' style='color: " + train_color + ";'><span class='train_icon_wrapper'><img src='" + (operation_data !== null ? get_icon(train["first_formation"], train["railroad_id"]) : UNYOHUB_GENERIC_TRAIN_ICON) + "' alt='' class='train_icon'";
                
                if (railroad_info["deadhead_train_number_regexp"].test(train["train_title"])) {
                    buf += " style='opacity: 0.5;'";
                    train["train_type"] = "回送";
                }
                
                buf += "></span><span class='train_type' style='background-color: " + train_color + "; border-color: " + train_color + ";'>";
                
                if (config["show_train_types_in_position_mode"]) {
                    if (train["train_type"] !== "回送" && "show_final_destinations_in_position_mode" in railroad_info["lines"][position_selected_line] && railroad_info["lines"][position_selected_line]["show_final_destinations_in_position_mode"]) {
                        buf += get_final_destination(position_selected_line, train["train_number"], train["starting_station"], 4);
                    } else {
                        buf += train["train_type"];
                    }
                } else {
                    buf += train["train_title"];
                }
                
                buf += "</span><br>" + train["formation_html"] + "</div>";
            } else if (line_positions[direction_cnt][cnt].length >= 2) {
                var buf = "<div class='multiple_trains'>";
                for (var line_train of line_positions[direction_cnt][cnt]) {
                    var train = convert_train_position_data(line_train);
                    
                    buf += "<span class='train_icon_wrapper' onclick='train_detail(\"" + position_selected_line + "\", \"" + train["train_number"] + "\", \"" + train["starting_station"] + "\", \"" + directions[direction_cnt] + "_trains\", " + (operation_data !== null ? "true" : "false") + ");' style='color: " + (config["dark_mode"] ? convert_font_color_dark_mode(get_train_color(train["train_title"], "#333333")) : get_train_color(train["train_title"], "#333333")) + ";'><img src='" + (operation_data !== null ? get_icon(train["first_formation"], train["railroad_id"]) : UNYOHUB_GENERIC_TRAIN_ICON) + "' alt='' class='train_icon'";
                    
                    if (railroad_info["deadhead_train_number_regexp"].test(train["train_title"])) {
                        buf += " style='opacity: 0.5;'"
                    }
                    
                    buf += "></span>";
                }
                buf += "</div>";
            } else {
                var buf = "";
            }
            
            if (direction_cnt === 0) {
                position_elms[0][line_positions[direction_cnt].length - cnt].innerHTML = buf;
            } else {
                position_elms[1][cnt].innerHTML = buf;
            }
        }
    }
}

function hh_mm_to_minutes (hh_and_mm) {
    var h_and_m = hh_and_mm.split(":");
    return Number(h_and_m[0]) * 60 + Number(h_and_m[1]);
}

function calculate_train_position (line_id, minutes_now, previous_station_index, next_station_index, previous_station_time, next_station_time) {
    if ("double_station_spacing" in railroad_info["lines"][line_id] && railroad_info["lines"][line_id]["double_station_spacing"]) {
        var station_spacing = 2;
    } else {
        var station_spacing = 1;
    }
    
    if (next_station_time === previous_station_time) {
        return next_station_index * station_spacing;
    }
    
    return Math.ceil(((next_station_index - previous_station_index) * (minutes_now - previous_station_time) / (next_station_time - previous_station_time) + previous_station_index) * station_spacing);
}

function get_train_positions (trains, line_id, hh_and_mm, is_inbound) {
    var hidden_formation_regexp = /^(\?|運休)(\+(\?|運休))*$/;
    
    var station_list = [...railroad_info["lines"][line_id]["stations"]];
    
    if (is_inbound) {
        station_list.reverse();
    }
    
    var minutes_now = hh_mm_to_minutes(hh_and_mm);
    
    if ("double_station_spacing" in railroad_info["lines"][line_id] && railroad_info["lines"][line_id]["double_station_spacing"]) {
        var line_rows_count = station_list.length * 2 - 1;
    } else {
        var line_rows_count = station_list.length;
    }
    
    var line_positions = new Array(line_rows_count);
    for (var cnt = 0; cnt < line_rows_count; cnt++) {
        line_positions[cnt] = [];
    }
    
    var train_direction = is_inbound ? "inbound_trains" : "outbound_trains";
    
    for (var train_number of Object.keys(trains)) {
        if (trains[train_number][0]["first_departure_time"] > hh_and_mm) {
            continue;
        }
        
        for (var train of trains[train_number]) {
            if (train["final_arrival_time"] <= hh_and_mm) {
                continue;
            }
            
            var train_type = null;
            
            if (!train_number.startsWith("_") && train_number in timetable["timetable"][line_id][train_direction]) {
                for_3: for (var timetable_train of timetable["timetable"][line_id][train_direction][train_number]) {
                    if (timetable_train["starting_station"] === train["starting_station"]) {
                        var last_stopped = null;
                        var last_stopped_time = null;
                        
                        for (cnt = 0; cnt < station_list.length; cnt++) {
                            var departure_time = timetable_train["departure_times"][cnt];
                            
                            if (departure_time !== null) {
                                departure_time = departure_time.slice(-5);
                                
                                if (departure_time >= hh_and_mm) {
                                    if (last_stopped !== null) {
                                        var train_position = calculate_train_position(line_id, minutes_now, last_stopped, cnt, hh_mm_to_minutes(last_stopped_time), hh_mm_to_minutes(departure_time));
                                    } else {
                                        if ("double_station_spacing" in railroad_info["lines"][line_id] && railroad_info["lines"][line_id]["double_station_spacing"]) {
                                            var train_position = cnt * 2;
                                        } else {
                                            var train_position = cnt;
                                        }
                                    }
                                    
                                    train_type = timetable_train["train_type"];
                                    
                                    break for_3;
                                }
                                
                                last_stopped = cnt;
                                last_stopped_time = departure_time;
                            }
                        }
                    }
                }
            }
            
            if (train_type === null) {
                train_type = "＊＊＊";
                
                if (train_number.startsWith("_")) {
                    train_number = train_number.substring(1, train_number.lastIndexOf("__"));
                    
                    if (train_number in timetable["timetable"][line_id][train_direction]) {
                        train_type = timetable["timetable"][line_id][train_direction][train_number][0]["train_type"];
                    }
                }
                
                for (var cnt = 0; cnt < station_list.length; cnt++) {
                    if (station_list[cnt]["station_name"] === train["starting_station"]) {
                        var starting_station_index = cnt;
                    }
                    if (station_list[cnt]["station_name"] === train["terminal_station"]) {
                        var terminal_station_index = cnt;
                    }
                }
                
                var train_position = calculate_train_position(line_id, minutes_now, starting_station_index, terminal_station_index, hh_mm_to_minutes(train["first_departure_time"]), hh_mm_to_minutes(train["final_arrival_time"]));
            }
            
            if (train_position < 0 || train_position > line_rows_count) {
                break;
            }
            
            var operation_list = get_operations(line_id, train_number, train["starting_station"], train_direction);
            
            var formation_data = convert_formation_data(line_id, operation_list, is_inbound);
            
            var hidden_by_default = true;
            for (var operation_number of operation_list) {
                if (!operation_number.includes("@")) {
                    var operations = operation_table["operations"];
                } else {
                    var at_pos = operation_number.indexOf("@");
                    
                    var operations = joined_operation_tables[operation_number.substring(at_pos + 1)]["operations"];
                    operation_number = operation_number.substring(0, at_pos);
                }
                
                if (!("hidden_by_default" in operations[operation_number] && operations[operation_number]["hidden_by_default"])) {
                    hidden_by_default = false;
                    break;
                }
            }
            
            if (!(hidden_by_default && hidden_formation_regexp.test(formation_data["formation_text"]))) {
                line_positions[train_position].push({
                    railroad_id : formation_data["railroad_id"],
                    train_number : train_number,
                    train_type : train_type,
                    starting_station : train["starting_station"],
                    first_departure_time : train["first_departure_time"],
                    final_arrival_time : train["final_arrival_time"],
                    operation_numbers : train["operation_numbers"],
                    formation_text : formation_data["formation_text"],
                    reassigned : formation_data["reassigned"],
                    posts_count : formation_data["posts_count"],
                    variant_exists : formation_data["variant_exists"],
                    comment_exists : formation_data["comment_exists"],
                    from_beginner : formation_data["from_beginner"],
                    is_quotation : formation_data["is_quotation"],
                    first_formation : formation_data["first_formation"]
                });
            }
            
            break;
        }
    }
    
    return line_positions;
}

function convert_formation_data (line_id, operation_list, is_inbound) {
    var railroad_id = null;
    var first_formation = null;
    var reassigned = false;
    var posts_count = null;
    var variant_exists = false;
    var comment_exists = false;
    var from_beginner = false;
    var is_quotation = false;
    
    if (operation_list !== null) {
        var formation_text = "";
        if (operation_data !== null) {
            for (var operation_number of operation_list) {
                if (!operation_number.includes("@")) {
                    var data = operation_data["operations"];
                } else {
                    var at_pos = operation_number.indexOf("@");
                    railroad_id = operation_number.substring(at_pos + 1);
                    
                    operation_number = operation_number.substring(0, at_pos);
                    var data = joined_operation_data[railroad_id]["operations"];
                }
                
                if (operation_number in data && data[operation_number] !== null) {
                    if (data[operation_number]["formations"] !== "") {
                        var operation_formation_text = data[operation_number]["formations"];
                    } else {
                        var operation_formation_text = "運休";
                    }
                    
                    if (railroad_info["lines"][line_id]["inbound_forward_direction"] === is_inbound) {
                        if (formation_text.length === 0) {
                            first_formation = data[operation_number]["formations"].split("+")[0];
                        } else {
                            formation_text += "+";
                        }
                        
                        formation_text += operation_formation_text;
                    } else {
                        if (formation_text.length === 0) {
                            var formation_data = data[operation_number]["formations"].split("+");
                            
                            first_formation = formation_data[formation_data.length - 1];
                        } else {
                            formation_text = "+" + formation_text;
                        }
                        
                        formation_text = operation_formation_text + formation_text;
                    }
                    
                    reassigned = reassigned || ("relieved_formations" in data[operation_number] && data[operation_number]["relieved_formations"].length >= 1);
                    posts_count = Number(posts_count) + data[operation_number]["posts_count"];
                    variant_exists = variant_exists || ("variant_exists" in data[operation_number] && data[operation_number]["variant_exists"]);
                    comment_exists = comment_exists || ("comment_exists" in data[operation_number] && data[operation_number]["comment_exists"]);
                    from_beginner = from_beginner || ("from_beginner" in data[operation_number] && data[operation_number]["from_beginner"]);
                    is_quotation = is_quotation || ("is_quotation" in data[operation_number] && data[operation_number]["is_quotation"]);
                } else {
                    if (formation_text.length === 0) {
                        formation_text = "?";
                    } else if (railroad_info["lines"][line_id]["inbound_forward_direction"] === is_inbound) {
                        formation_text += "+?";
                    } else {
                        formation_text = "?+" + formation_text;
                    }
                }
            }
        }
    } else {
        var formation_text = "?";
    }
    
    return {
        railroad_id : railroad_id,
        formation_text : formation_text,
        reassigned : reassigned,
        posts_count : posts_count,
        variant_exists : variant_exists,
        comment_exists : comment_exists,
        from_beginner : from_beginner,
        is_quotation : is_quotation,
        first_formation : first_formation
    };
}


function get_train (line_id, train_number, starting_station) {
    var train_data = { line_id : line_id, train_number : train_number };
    
    if (train_number in timetable["timetable"][line_id]["inbound_trains"]) {
        for (var train of timetable["timetable"][line_id]["inbound_trains"][train_number]) {
            if (train["starting_station"] === starting_station) {
                Object.assign(train_data, train);
                train_data["is_inbound"] = true;
                
                return train_data;
            }
        }
    } else if (train_number in timetable["timetable"][line_id]["outbound_trains"]) {
        for (var train of timetable["timetable"][line_id]["outbound_trains"][train_number]) {
            if (train["starting_station"] === starting_station) {
                Object.assign(train_data, train);
                train_data["is_inbound"] = false;
                
                return train_data;
            }
        }
    }
    
    return null;
}

function get_operations (line_id, train_number, starting_station, train_direction) {
    if (train_number in line_operations["lines"][line_id][train_direction]) {
        for (var train of line_operations["lines"][line_id][train_direction][train_number]) {
            if (train["starting_station"] === starting_station) {
                return [...train["operation_numbers"]];
            }
        }
    }
    
    if ("joined_railroads" in railroad_info) {
        for (railroad_id of railroad_info["joined_railroads"]) {
            if (line_id in joined_line_operations[railroad_id]["lines"] && train_number in joined_line_operations[railroad_id]["lines"][line_id][train_direction]) {
                for (var train of joined_line_operations[railroad_id]["lines"][line_id][train_direction][train_number]) {
                    if (train["starting_station"] === starting_station) {
                        return [...train["operation_numbers"]];
                    }
                }
            }
        }
    }
    
    return null;
}

function get_final_destination (line_id, train_number, starting_station, max_length = 10) {
    if (!train_number.startsWith("_")) {
        var next_trains = [{line_id : line_id, train_number : train_number, starting_station : starting_station}];
    } else {
        if (!(train_number in line_operations["lines"][line_id]["inbound_trains"] || train_number in line_operations["lines"][line_id]["outbound_trains"])) {
            return "＊＊＊";
        }
        
        var next_trains = [{line_id : line_id, train_number : train_number.substring(1, train_number.lastIndexOf("__")), starting_station : starting_station}];
    }
    
    var buf = "";
    
    for (var next_train of next_trains) {
        var train_data = get_train(next_train["line_id"], next_train["train_number"], next_train["starting_station"]);
        
        if (train_data !== null) {
            if ("destination" in train_data) {
                buf += (buf.length >= 1 ? " / " : "") + escape_html(train_data["destination"]);
            } else if (train_data["next_trains"].length >= 1) {
                next_trains.push(...train_data["next_trains"]);
            } else {
                for (var last_stopped_index = train_data["departure_times"].length - 1; last_stopped_index >= 1; last_stopped_index--) {
                    if (train_data["departure_times"][last_stopped_index] !== null && !train_data["departure_times"][last_stopped_index].startsWith("|")) {
                        break;
                    }
                }
                
                var station_list = [...railroad_info["lines"][next_train["line_id"]]["stations"]];
                
                if (train_data["is_inbound"]) {
                    station_list.reverse();
                }
                
                buf += (buf.length >= 1 ? " / " : "") + escape_html(station_list[last_stopped_index]["station_name"]);
            }
        }
    }
    
    if (buf.length > max_length) {
        return buf.substring(0, max_length - 1) + "..";
    } else if (buf === "") {
        return "＊＊＊";
    }
    
    return buf;
}

function position_list_diagrams () {
    var popup_inner_elm = open_square_popup("diagram_list_popup", true, "ダイヤの選択");
    
    popup_inner_elm.className = "wait_icon";
    popup_inner_elm.innerHTML = "";
    
    var diagram_list = timetable_get_diagram_list(operation_table["diagram_revision"]);
    
    get_diagram_id([get_date_string(get_timestamp()), get_date_string(get_timestamp() + 86400)], function (today_diagram_data, tomorrow_diagram_data) {
        if (today_diagram_data === null || tomorrow_diagram_data === null) {
            return;
        }
        
        var buf = "";
        for (var diagram_id of diagram_list) {
            if (diagram_id === "__today__") {
                var diagram_name = "今日<small>(" + escape_html(diagram_info[today_diagram_data["diagram_revision"]]["diagrams"][today_diagram_data["diagram_id"]]["diagram_name"]) + ")</small>";
                var bg_color = diagram_info[today_diagram_data["diagram_revision"]]["diagrams"][today_diagram_data["diagram_id"]]["main_color"];
            } else if (diagram_id === "__tomorrow__") {
                var diagram_name = "明日<small>(" + escape_html(diagram_info[tomorrow_diagram_data["diagram_revision"]]["diagrams"][tomorrow_diagram_data["diagram_id"]]["diagram_name"]) + ")</small>";
                var bg_color = diagram_info[tomorrow_diagram_data["diagram_revision"]]["diagrams"][tomorrow_diagram_data["diagram_id"]]["main_color"];
            } else {
                var diagram_name = escape_html(diagram_info[today_diagram_data["diagram_revision"]]["diagrams"][diagram_id]["diagram_name"]);
                var bg_color = diagram_info[today_diagram_data["diagram_revision"]]["diagrams"][diagram_id]["main_color"];
            }
            
            if (config["dark_mode"]) {
                bg_color = convert_color_dark_mode(bg_color);
            }
            
            buf += "<button type='button' class='wide_button' onclick='close_square_popup(); position_mode(null, \"" + diagram_id + "\", null, 0);' style='background-color: " + bg_color + "; border-color: " + bg_color + ";'>" + diagram_name + "</button>";
        }
        
        popup_inner_elm.innerHTML = buf;
    });
}

var position_time;

var position_time_touch_start_y;
var position_time_touch_end_y;

function position_change_time (position_time_additions = null, multiply_step_value = false, draw_train_position_now = true) {
    if (position_time_additions === null) {
        position_time = Date.now() / 60000;
    } else if (position_time_additions !== 0) {
        position_time += multiply_step_value ? position_time_additions * config["position_mode_minute_step"] : position_time_additions;
        
        position_last_updated = null;
        position_reload_button_elm.style.display = "block";
    }
    
    var position_date_time = new Date(position_time * 60000);
    
    var hours = position_date_time.getHours();
    var minutes = ("0" + position_date_time.getMinutes()).slice(-2);
    var hh_and_mm_24 = ("0" + hours).slice(-2) + ":" + minutes;
    
    if (position_time_additions === null) {
        position_last_updated = hh_and_mm_24;
    }
    
    if (hours < 3) {
        hours += 24;
    }
    hours = ("0" + hours).slice(-2);
    
    var hh_and_mm = hours + ":" + minutes;
    
    document.getElementById("position_hours").innerHTML = Number(hours) + "<small>時</small>";
    document.getElementById("position_minutes").innerHTML = Number(minutes) + "<small>分</small>";
    
    position_time_button_elm.value = hh_and_mm_24;
    
    if (draw_train_position_now) {
        draw_train_position(hh_and_mm);
    }
}

function position_time_swipe_start (event) {
    position_time_touch_start_y = event.touches[0].screenY;
    position_time_touch_end_y = position_time_touch_start_y;
}

function position_time_swipe (event) {
    position_time_touch_end_y = event.touches[0].screenY;
    
    if (Math.abs(position_time_touch_end_y - position_time_touch_start_y) >= 10) {
        event.currentTarget.style.opacity = "0.25";
    } else {
        event.currentTarget.style.opacity = "";
    }
}

function position_time_swipe_end (event, step) {
    event.currentTarget.style.opacity = "";
    
    if (position_time_touch_end_y >= position_time_touch_start_y + 10) {
        position_change_time(-step);
    } else if (position_time_touch_end_y <= position_time_touch_start_y - 10) {
        position_change_time(step);
    }
}

function position_time_button_change () {
    if (position_time_button_elm.value.length === 0) {
        position_reload();
        return;
    }
    
    var hours_minutes = position_time_button_elm.value.split(":");
    
    if (hours_minutes[0] < 3) {
        hours_minutes[0] += 24;
    }
    
    var hh_and_mm = hours_minutes.join(":");
    
    position_change_time(hh_mm_to_minutes(hh_and_mm) - hh_mm_to_minutes(get_hh_mm(position_time * 60)));
}

function change_show_train_types (bool_val) {
    config["show_train_types_in_position_mode"] = bool_val;
    
    save_config();
    
    position_change_time(0);
}

var assign_order_maxima = {};

function get_operation_data_detail (operation_date, operation_number_or_list, area_id) {
    assign_order_maxima = {};
    
    var operation_number_list = Array.isArray(operation_number_or_list) ? operation_number_or_list : [operation_number_or_list];
    for (var cnt = 0; cnt < operation_number_list.length; cnt++) {
        var at_pos = operation_number_list[cnt].indexOf("@");
        
        if (at_pos === -1) {
            var railroad_id = railroad_info["railroad_id"];
        } else {
            var railroad_id = operation_number_list[cnt].substring(at_pos + 1);
            operation_number_list[cnt] = operation_number_list[cnt].substring(0, at_pos);
        }
    }
    
    if (cnt === 0) {
        return;
    }
    
    var area_elm = document.getElementById(area_id);
    
    area_elm.innerHTML = "<div class='loading_icon'></div>".repeat(operation_number_list.length);
    
    ajax_post("operation_data_detail.php", "railroad_id=" + escape_form_data(railroad_id) + "&date=" + operation_date + "&operation_numbers=" + escape_form_data(operation_number_list.join()), function (response) {
        if (response !== false) {
            var data = JSON.parse(response);
            
            var detail_html = "";
            for (var operation_number of Object.keys(data)) {
                detail_html += "<input type='checkbox' id='" + area_id + "_detail_" + add_slashes(operation_number) + "'><label for='" + area_id + "_detail_" + add_slashes(operation_number) + "' class='drop_down'>" + escape_html(operation_number) + "運用 目撃情報</label><div>";
                
                var assign_order_last = -1;
                var formation_text_last = null;
                
                for (var data_item of data[operation_number]) {
                    if (data_item["formations"] !== "") {
                        var formation_text = data_item["formations"];
                    } else {
                        var formation_text = "運休";
                    }
                    
                    if ("is_quotation" in data_item && data_item["is_quotation"]) {
                        var train_number_text = "引用情報";
                    } else {
                        var train_number_text = data_item["train_number"];
                        
                        if (train_number_text === "○") {
                            train_number_text = "出庫時";
                        } else if (train_number_text === "△") {
                            train_number_text = "入庫時";
                        } else {
                            train_number_text = train_number_text.split("__")[0];
                            
                            if (train_number_text.startsWith(".")) {
                                train_number_text = train_number_text.substring(1) + "待機";
                            }
                        }
                    }
                    
                    if (data_item["user_id"] !== null && !data_item["user_id"].startsWith("*")) {
                        var user_name_html = data_item["user_name"] !== null ? escape_html(data_item["user_name"]) : data_item["user_id"];
                        var class_html = "";
                        
                        if (!("is_management_member" in data_item && data_item["is_management_member"])) {
                            user_name_html += " 様";
                            
                            if ("is_beginner" in data_item && data_item["is_beginner"]) {
                                class_html = " class='beginner'";
                            }
                        }
                        
                        if ("website_url" in data_item && data_item["website_url"] !== null) {
                            user_name_html = "<span" + class_html + "><a href='" + add_slashes(data_item["website_url"]) + "' target='_blank' class='external_link'>" + user_name_html + " <small>(" + data_item["user_id"] + ")</small></a>";
                        } else {
                            user_name_html = "<span" + class_html + ">" + user_name_html + " <small>(" + data_item["user_id"] + ")</small>";
                        }
                    } else {
                        var user_name_html = "<span>(ゲスト様)";
                    }
                    
                    if ("ip_address" in data_item && data_item["ip_address"] !== null) {
                        var ip_address_str = ", \"" + add_slashes(data_item["ip_address"]) + "\"";
                    } else {
                        var ip_address_str = "";
                    }
                    
                    if (user_data !== null && (data_item["user_id"] === user_data["user_id"] || "ip_address" in data_item)) {
                        user_name_html += "<button type='button' onclick='edit_operation_data(\"" + railroad_id + "\", \"" + operation_date + "\", \"" + add_slashes(operation_number) + "\", " + data_item["assign_order"] + ", \"" + add_slashes(data_item["user_id"]) + "\", \"" + add_slashes(formation_text) + "\"" + ip_address_str + ");'>";
                        
                        if (data_item["user_id"] === user_data["user_id"]) {
                            user_name_html += "取り消し";
                        } else {
                            user_name_html += "詳細";
                        }
                        
                        user_name_html += "</button>";
                    }
                    
                    user_name_html += "</span>";
                    
                    if (data_item["assign_order"] !== assign_order_last) {
                        if (assign_order_last !== -1 && formation_text !== formation_text_last) {
                            detail_html += "<div class='operation_data_detail'><b class='warning_sentence'>↑ 差し替え ↑</b></div>";
                        }
                        
                        assign_order_last = data_item["assign_order"];
                        formation_text_last = formation_text;
                    }
                    
                    detail_html += "<div class='operation_data_detail'><b><small>" + train_number_text + "</small>" + formation_text + "<span>" + get_date_and_time(data_item["posted_datetime"]) + "</span></b>";
                    
                    if ("comment" in data_item && data_item["comment"] !== null) {
                        detail_html += "<div class='descriptive_text'>" + escape_html(data_item["comment"]).replace(/\n/g, "<br>") + "</div>";
                    }
                    
                    detail_html += user_name_html + "</div>";
                }
                
                if (data[operation_number].length === 0) {
                    assign_order_maxima[operation_number] = 0;
                    
                    detail_html += "<div class='descriptive_text'>";
                    if (operation_date === get_date_string(get_timestamp())) {
                        detail_html += "まだ目撃情報が投稿されていません";
                    } else {
                        detail_html += "当日の目撃情報はありません";
                    }
                    detail_html += "</div>";
                } else {
                    assign_order_maxima[operation_number] = data[operation_number][0]["assign_order"];
                }
                
                detail_html += "</div>";
            }
        } else {
            detail_html = "【!】運用情報の取得に失敗しました";
        }
        
        area_elm.innerHTML = detail_html;
    });
}

function train_detail (line_id, train_number, starting_station, train_direction, show_operation_data = true, is_today = null) {
    var popup_inner_elm = open_square_popup("train_detail_popup", true, null, true);
    
    popup_inner_elm.className = "wait_icon";
    popup_inner_elm.innerHTML = "";
    
    var previous_trains = [];
    var next_trains = [];
    
    var train_operations = get_operations(line_id, train_number, starting_station, train_direction);
    
    var train_data = [get_train(line_id, train_number, starting_station)];
    
    var buf = "<span class='train_detail_day' style='background-color: " + (config["dark_mode"] ? convert_color_dark_mode(diagram_info[operation_table["diagram_revision"]]["diagrams"][operation_table["diagram_id"]]["main_color"]) : diagram_info[operation_table["diagram_revision"]]["diagrams"][operation_table["diagram_id"]]["main_color"]) + ";'>";
    
    buf += diagram_info[operation_table["diagram_revision"]]["diagrams"][operation_table["diagram_id"]]["diagram_name"];
    
    if (mode_val <= 1) {
        if (timetable_date === "__today__") {
            buf += "(今日)";
            
            var diagram_id_or_ts = get_timestamp();
            is_today = true;
        } else if (timetable_date === "__tomorrow__") {
            buf += "(明日)";
            
            var diagram_id_or_ts = get_timestamp() + 86400;
        }
        
        var diagram_is_current_revision = true;
    } else {
        var diagram_id_or_ts = "\"" + operation_table["diagram_id"] + "\"";
        var diagram_is_current_revision = (get_diagram_revision() === operation_table["diagram_revision"]);
    }
    
    buf += "</span>";
    
    if (train_operations !== null) {
        if (railroad_info["lines"][line_id]["inbound_forward_direction"] !== (train_direction === "inbound_trains")) {
            train_operations.reverse();
        }
        
        var buf_2 = "";
        for (var train_operation of train_operations) {
            if (buf_2.length >= 1) {
                buf_2 += "+";
            }
            
            if (!train_operation.includes("@")) {
                buf_2 += "<u onclick='operation_detail(\"" + train_operation + "\",";
                if (timetable_date === "__today__" || timetable_date === "__tomorrow__") {
                    buf_2 += " " + diagram_id_or_ts + ", true";
                } else {
                    buf_2 += " \"" + operation_table["diagram_id"] + "\", false";
                }
                buf_2 += ");'>" + train_operation + "運用(" + operation_table["operations"][train_operation]["car_count"] + "両)</u>";
            } else {
                var at_pos = train_operation.indexOf("@");
                var railroad_id = train_operation.substring(at_pos + 1);
                train_operation = train_operation.substring(0, at_pos);
                
                buf_2 += train_operation + "運用(" + joined_operation_tables[railroad_id]["operations"][train_operation]["car_count"] + "両)";
            }
        }
    } else {
        var buf_2 = "不明な運用";
        
        show_operation_data = false;
    }
    
    buf += "<h3>" + buf_2 + "</h3>";
    
    if (show_operation_data) {
        var buf_2 = "";
        var heading_str = "";
        for (var train_operation of train_operations) {
            if (!train_operation.includes("@")) {
                var railroad_id = null;
                var data = operation_data["operations"];
            } else {
                var at_pos = train_operation.indexOf("@");
                var railroad_id = train_operation.substring(at_pos + 1);
                
                train_operation = train_operation.substring(0, at_pos);
                
                var data = joined_operation_data[railroad_id]["operations"];
            }
            
            if (buf_2.length >= 1) {
                buf_2 += " +";
            }
            
            if (train_operation in data && data[train_operation] !== null) {
                if (data[train_operation]["formations"] !== "") {
                    var buf_3 = "";
                    for (var formation_name of data[train_operation]["formations"].split("+")) {
                        if (buf_3.length >= 1) {
                            buf_3 += " +";
                        }
                        
                        if (formation_name in formations["formations"] || (railroad_id !== null && formation_name in joined_railroad_formations[railroad_id]["formations"])) {
                            buf_3 += "<a href='/railroad_" + (railroad_id === null ? railroad_info["railroad_id"] : railroad_id) + "/formations/" + encodeURIComponent(formation_name) + "/' onclick='event.preventDefault(); close_square_popup(); " + (railroad_id === null ? "formations_mode(" : "select_railroad(\"" + railroad_id + "\", \"formations_mode\", ") + "\"" + add_slashes(formation_name) + "\");'><img src='" + get_icon(formation_name, railroad_id) + "' alt='' class='train_icon'>" + escape_html(formation_name) + "</a>";
                            
                            var overview = get_formation_overview(formation_name, railroad_id);
                            if (overview["caption"].length >= 1) {
                                if (heading_str.length >= 1) {
                                    heading_str += "<br>";
                                }
                                
                                heading_str += escape_html(formation_name + " : " + overview["caption"]);
                            }
                        } else if (formation_name === "?") {
                            buf_3 += "<img src='" + UNYOHUB_UNKNOWN_TRAIN_ICON + "' alt='' class='train_icon'>?";
                        } else {
                            buf_3 += "<img src='" + get_icon(formation_name, railroad_id) + "' alt='' class='train_icon'>" + escape_html(formation_name);
                        }
                    }
                    
                    buf_2 += buf_3;
                } else {
                    buf_2 += "<img src='" + UNYOHUB_CANCELED_TRAIN_ICON + "' alt='' class='train_icon'>運休";
                }
            } else {
                buf_2 += "<img src='" + UNYOHUB_UNKNOWN_TRAIN_ICON + "' alt='' class='train_icon'>?";
            }
        }
        
        buf += "<div class='formation_data_area'>" + buf_2 + "</div><div class='descriptive_text'>" + heading_str + "</div><div id='train_operation_detail_area'></div>";
    }
    
    if (train_data[0] !== null) {
        if (train_data[0]["previous_trains"].length >= 1) {
            previous_trains.push(...train_data[0]["previous_trains"]);
        }
        
        for (var previous_train of previous_trains) {
            train_data.unshift(get_train(previous_train["line_id"], previous_train["train_number"], previous_train["starting_station"]));
            
            if (train_data[0] !== null && train_data[0]["previous_trains"].length >= 1) {
                previous_trains.push(...train_data[0]["previous_trains"]);
            }
        }
        
        if (train_data[train_data.length - 1]["next_trains"].length >= 1) {
            next_trains.push(...train_data[train_data.length - 1]["next_trains"]);
        }
        
        for (var next_train of next_trains) {
            train_data.push(get_train(next_train["line_id"], next_train["train_number"], next_train["starting_station"]));
            
            if (train_data[train_data.length - 1] !== null && train_data[train_data.length - 1]["next_trains"].length >= 1) {
                next_trains.push(...train_data[train_data.length - 1]["next_trains"]);
            }
        }
        
        if (is_today) {
            var now_str = get_hh_mm();
        }
        var previous_departure_time = null;
        
        for (var train of train_data) {
            if (train === null) {
                continue;
            }
            
            var timetable_train_number = train["train_number"].split("__")[0];
            
            if ("clockwise_is_inbound" in railroad_info["lines"][train["line_id"]] && railroad_info["lines"][train["line_id"]]["clockwise_is_inbound"] !== null) {
                var directions = railroad_info["lines"][train["line_id"]]["clockwise_is_inbound"] ? ["外回り", "内回り"] : ["内回り", "外回り"];
            } else {
                var directions = ["上り", "下り"];
            }
            
            var stations = [...railroad_info["lines"][train["line_id"]]["stations"]];
            
            var is_deadhead_train = (railroad_info["deadhead_train_number_regexp"].test(timetable_train_number) || train["train_type"]=== "回送") ? true : false;
            
            buf += "<h4>" + escape_html(railroad_info["lines"][train["line_id"]]["line_name"]) + "　" + (train["is_inbound"] ? directions[0] : directions[1]);
            
            buf += "<span style='color: " + (config["dark_mode"] ? convert_font_color_dark_mode(get_train_color(timetable_train_number)) : get_train_color(timetable_train_number)) + ";'>" + escape_html(train["train_type"] + "　" + timetable_train_number) + "</span>";
            
            if (train_operations !== null) {
                var train_operations_2 = get_operations(train["line_id"], train["train_number"], train["starting_station"], train["is_inbound"] ? "inbound_trains" : "outbound_trains");
                
                if (railroad_info["lines"][train["line_id"]]["inbound_forward_direction"] === train["is_inbound"]) {
                    var before_train_str = "◀ ";
                    var after_train_str = " 　";
                } else {
                    train_operations_2.reverse();
                    
                    var before_train_str = "　 ";
                    var after_train_str = " ▶";
                }
                
                var buf_2 = "";
                for (var train_operation of train_operations_2) {
                    if (buf_2.length >= 1) {
                        buf_2 += "+";
                    }
                    
                    if (!train_operation.includes("@")) {
                        buf_2 += "<u onclick='operation_detail(\"" + train_operation + "\",";
                        if (timetable_date === "__today__" || timetable_date === "__tomorrow__") {
                            buf_2 += " " + diagram_id_or_ts + ", true";
                        } else {
                            buf_2 += " \"" + operation_table["diagram_id"] + "\", false";
                        }
                        buf_2 += ");'>" + train_operation + "運用</u>";
                    } else {
                        buf_2 += train_operation.substring(0, train_operation.indexOf("@")) + "運用";
                    }
                }
                
                buf += "<div class='descriptive_text'>" + before_train_str + buf_2 + after_train_str + "</div>";
            }
            
            buf += "</h4>";
            
            for (var cnt = 0; cnt < train["departure_times"].length; cnt++) {
                if (train["departure_times"][cnt] !== null && !train["departure_times"][cnt].startsWith("|")) {
                    var station_index = train["is_inbound"] ? stations.length - 1 - cnt : cnt;
                    var highlight_str = is_today && ((previous_departure_time !== null && previous_departure_time < now_str && train["departure_times"][cnt] >= now_str) || train["departure_times"][cnt] === now_str) ? " train_detail_departure_time_highlight" : "";
                    var onclick_func = "affiliated_railroad_id" in railroad_info["lines"][train["line_id"]] ? "close_square_popup(); select_railroad(\"" + railroad_info["lines"][train["line_id"]]["affiliated_railroad_id"] + "\", \"timetable_mode\", \"" + train["line_id"] + "\", \"" + add_slashes(stations[station_index]["station_name"]) + "\", " + train["is_inbound"] + ");" : "show_station_timetable(\"" + train["line_id"] + "\", \"" + stations[station_index]["station_name"] + "\", " + train["is_inbound"] + ");";
                    
                    buf += "<div class='train_detail_departure_time" + (is_deadhead_train ? " deadhead_train_departure_time" : "") + highlight_str + "' style='border-color: " + (config["dark_mode"] ? convert_color_dark_mode(railroad_info["lines"][train["line_id"]]["line_color"]) : railroad_info["lines"][train["line_id"]]["line_color"]) + ";'>" + (diagram_is_current_revision && (!("is_signal_station" in stations[station_index]) || !stations[station_index]["is_signal_station"]) ? "<u onclick='" + onclick_func + "'>" + escape_html(stations[station_index]["station_name"]) + "</u>" : escape_html(stations[station_index]["station_name"])) + "<span>" + train["departure_times"][cnt] + "</span></div>";
                    
                    previous_departure_time = train["departure_times"][cnt];
                }
            }
        }
        
        if (is_today) {
            buf += "<div class='informational_text'>現在位置は端末の現在時刻に基づく推定です</div>";
        }
    } else {
        var train_title = train_number.split("__")[0];
        
        buf += "<h4>" + escape_html(railroad_info["lines"][line_id]["line_name"]) + "　<span style='color: " + (config["dark_mode"] ? convert_font_color_dark_mode(get_train_color(train_title)) : get_train_color(train_title)) + ";'>"
        if (railroad_info["deadhead_train_number_regexp"].test(train_title)) {
            buf += "回送　";
        }
        buf += escape_html(train_title) + "</span></h4>";
        buf += "<div class='no_data'>詳細情報はありません</div>";
    }
    
    if (navigator.onLine && train_operations !== null && is_today) {
        buf += "<button type='button' class='write_button' onclick='select_operation_to_write_data(\"" + line_id + "\",\"" + add_slashes(train_number) + "\",\"" + starting_station + "\",\"" + train_direction + "\");'>運用情報を投稿</button>";
    }
    
    popup_inner_elm.innerHTML = buf;
    
    document.getElementById("train_detail_popup").scrollTop = 0;
    
    if (show_operation_data && navigator.onLine) {
        get_operation_data_detail(operation_data["operation_date"], train_operations, "train_operation_detail_area");
    }
}

function show_station_timetable (line_id, station_name, is_inbound = null) {
    if (square_popup_is_open) {
        close_square_popup();
    }
    
    if (popup_history.length >= 1) {
        popup_close(true);
    }
    
    if (mode_val !== 1) {
        timetable_mode(false, false);
    }
    
    if (is_inbound !== null) {
        var radio_inbound_elm = document.getElementById("radio_inbound");
        var radio_outbound_elm = document.getElementById("radio_outbound");
        
        if (is_inbound) {
            radio_inbound_elm.checked = true;
            radio_outbound_elm.checked = false;
        } else {
            radio_inbound_elm.checked = false;
            radio_outbound_elm.checked = true;
        }
    }
    
    timetable_select_station(station_name, line_id);
}


var timetable_selected_line = null;
var timetable_promise;

var timetable_area_elm = document.getElementById("timetable_area");

var timetable_drop_down_status;
var timetable_wrapper_scroll_amount;

function timetable_mode (require_load_data = true, draw_station_list = true) {
    change_mode(1);
    
    timetable_drop_down_status = {};
    
    if (require_load_data) {
        var ts = get_timestamp();
        var date_string = get_date_string(ts);
        
        var resolved = false;
        timetable_promise = new Promise(function (resolve, reject) {
            get_diagram_id(date_string, function (diagram_data) {
                if (diagram_data === null) {
                    return;
                }
                
                update_timetable_date(diagram_data["diagram_revision"], diagram_data["diagram_id"], date_string);
                
                load_data(resolve, function () {
                    if (!resolved) {
                        resolve();
                    } else if (timetable_selected_station !== null) {
                        timetable_select_station(timetable_selected_station);
                    }
                }, reject, diagram_data["diagram_revision"], diagram_data["diagram_id"], "joined_railroads" in railroad_info ? railroad_info["joined_railroads"] : null,  date_string);
            });
        });
        
        timetable_promise.then(function () {
            resolved = true;
        });
        
        if (draw_station_list) {
            timetable_change_lines(null, true);
        }
    } else {
        timetable_promise = Promise.resolve();
        
        update_timetable_date(operation_table["diagram_revision"], operation_table["diagram_id"], operation_data !== null ? operation_data["operation_date"]: null);
    }
}

function update_timetable_date (diagram_revision, diagram_id, date_string) {
    var timetable_operation_name_elm = document.getElementById("timetable_operation_name");
    
    if (date_string !== null) {
        var now_ts = get_timestamp();
        
        if (date_string === get_date_string(now_ts)) {
            timetable_date = "__today__";
            
            timetable_operation_name_elm.innerHTML = "今日<small>(" + diagram_info[diagram_revision]["diagrams"][diagram_id]["diagram_name"] + ")</small>";
            
            return;
        } else if (date_string === get_date_string(now_ts + 86400)) {
            timetable_date = "__tomorrow__";
            
            timetable_operation_name_elm.innerHTML = "明日<small>(" + diagram_info[diagram_revision]["diagrams"][diagram_id]["diagram_name"] + ")</small>";
            
            return;
        }
    }
    
    timetable_date = diagram_id;
    
    timetable_operation_name_elm.innerHTML = diagram_info[diagram_revision]["diagrams"][diagram_id]["diagram_name"];
}

var timetable_selected_station = null;

function timetable_wrapper_onscroll () {
    if (timetable_selected_station !== null) {
        timetable_wrapper_scroll_amount = article_elms[1].scrollTop;
    }
}

function timetable_change_lines (line_id, force_station_select_mode = false) {
    if (line_id !== null) {
        if ("clockwise_is_inbound" in railroad_info["lines"][line_id] && railroad_info["lines"][line_id]["clockwise_is_inbound"] !== null) {
            var directions = railroad_info["lines"][line_id]["clockwise_is_inbound"] ? ["外回り<small>(右回り)</small>", "内回り<small>(左回り)</small>"] : ["内回り<small>(左回り)</small>", "外回り<small>(右回り)</small>"];
        } else {
            var directions = ["上り<small>(" + escape_html(railroad_info["lines"][line_id]["stations"][0]["station_name"]) + "方面)</small>", "下り<small>(" + escape_html(railroad_info["lines"][line_id]["stations"][railroad_info["lines"][line_id]["stations"].length - 1]["station_name"]) + "方面)</small>"];
        }
        
        document.getElementById("radio_inbound_label").innerHTML = directions[0];
        document.getElementById("radio_outbound_label").innerHTML = directions[1];
    }
    
    update_selected_line(line_id, false);
    
    if (force_station_select_mode || timetable_selected_station === null) {
        const KANA_ROWS_REGEXP = [/^[あ-お]/, /^[か-こが-ご]/, /^[さ-そざ-ぞ]/, /^[た-とだ-ど]/, /^[な-の]/, /^[は-ほば-ぼぱ-ぽ]/, /^[ま-も]/, /^[や-よ]/, /^[ら-ろ]/, /^[わ-を]/, /.*/];
        const KANA_ROWS = ["あ 行", "か 行", "さ 行", "た 行", "な 行", "は 行", "ま 行", "や 行", "ら 行", "わ 行", "その他"];
        
        timetable_wrapper_scroll_amount = 0;
        
        if (line_id === null) {
            change_title(railroad_info["railroad_name"] + "の駅別発着車両運用 | " + instance_info["instance_name"], "/railroad_" + railroad_info["railroad_id"] + "/timetable/");
            
            var lines = railroad_info["lines_order"];
        } else {
            change_title(railroad_info["lines"][line_id]["line_name"] + "の駅別発着車両運用 | " + instance_info["instance_name"], "/railroad_" + railroad_info["railroad_id"] + "/timetable/" + line_id + "/");
            
            var lines = [line_id];
        }
        
        timetable_selected_station = null;
        document.getElementById("timetable_back_button").style.display = "none";
        document.getElementById("direction_radio_area").style.display = "none";
        
        var station_indexes = {};
        for (var line of lines) {
            for (var cnt = 0; cnt < railroad_info["lines"][line]["stations"].length; cnt++) {
                if (!(railroad_info["lines"][line]["stations"][cnt]["station_name_kana"] in station_indexes)) {
                    station_indexes[railroad_info["lines"][line]["stations"][cnt]["station_name_kana"]] = { line_id : line, index : cnt };
                }
            }
        }
        
        var buf = "";
        var kana_rows_cnt = -1;
        for (var station_name_kana of Object.keys(station_indexes).toSorted(new Intl.Collator("ja").compare)) {
            if ("is_signal_station" in railroad_info["lines"][station_indexes[station_name_kana]["line_id"]]["stations"][station_indexes[station_name_kana]["index"]] && railroad_info["lines"][station_indexes[station_name_kana]["line_id"]]["stations"][station_indexes[station_name_kana]["index"]]["is_signal_station"]) {
                continue;
            }
            
            for (var cnt = Math.max(kana_rows_cnt, 0); !KANA_ROWS_REGEXP[cnt].test(station_name_kana); cnt++) {}
            if (cnt > kana_rows_cnt) {
                buf += (kana_rows_cnt >= 0 ? "</div>" : "") + "<input type='checkbox' id='timetable_kana_rows_" + cnt + "'><label for='timetable_kana_rows_" + cnt + "' class='drop_down'>" + KANA_ROWS[cnt] + "の駅</label><div>";
                kana_rows_cnt = cnt;
            }
            
            var station_name = railroad_info["lines"][station_indexes[station_name_kana]["line_id"]]["stations"][station_indexes[station_name_kana]["index"]]["station_name"];
            buf += "<a href='/railroad_" + railroad_info["railroad_id"] + "/timetable/" + station_indexes[station_name_kana]["line_id"] + "/" + encodeURIComponent(station_name) + "/' onclick='event.preventDefault(); timetable_select_station(\"" + station_name + "\", \"" + station_indexes[station_name_kana]["line_id"] + "\");'><b>" + escape_html(station_name) + "</b> <small>(" + station_name_kana + ")</small></a>";
        }
        buf += "</div>";
        
        timetable_area_elm.innerHTML = buf;
    } else if (line_id !== null && timetable_selected_station !== null) {
        timetable_select_station(timetable_selected_station);
    }
}

function timetable_select_station (station_name, line_id = null) {
    timetable_selected_station = station_name;
    
    if (line_id !== null && line_id !== timetable_selected_line) {
        timetable_selected_line = line_id;
        
        timetable_change_lines(line_id);
        
        return;
    } else if (timetable_selected_line === null) {
        return;
    }
    
    change_title(station_name + "駅(" + railroad_info["lines"][timetable_selected_line]["line_name"] + ")発着列車の充当車両 | " + instance_info["instance_name"], "/railroad_" + railroad_info["railroad_id"] + "/timetable/" + timetable_selected_line + "/" + encodeURIComponent(station_name) + "/");
    
    document.getElementById("timetable_back_button").style.display = "block";
    document.getElementById("direction_radio_area").style.display = "block";
    
    document.getElementById("timetable_station_name").innerHTML = "<h2>" + escape_html(station_name) + "</h2>";
    timetable_area_elm.innerHTML = "";
    
    timetable_promise.then(function () {
        draw_station_timetable(station_name);
    }, function () {
        timetable_area_elm.innerHTML = "<div class='no_data'>表示に必要なデータが利用できません</div>";
    });
}

function draw_station_timetable (station_name) {
    for (var station_index = 0; station_index < railroad_info["lines"][timetable_selected_line]["stations"].length; station_index++) {
        if (railroad_info["lines"][timetable_selected_line]["stations"][station_index]["station_name"] === station_name) {
            break;
        }
    }
    
    var previous_station = timetable_get_neighboring_station(timetable_selected_line, station_name, -1);
    var next_station = timetable_get_neighboring_station(timetable_selected_line, station_name, 1);
    
    document.getElementById("timetable_station_name").innerHTML = "<a href='/railroad_" + railroad_info["railroad_id"] + "/timetable/" + timetable_selected_line + "/" + encodeURIComponent(previous_station) + "/' class='previous_button' onclick='event.preventDefault(); timetable_select_station(\"" + previous_station + "\");'>" + escape_html(previous_station) + "</a><h2>" + escape_html(station_name) + "</h2><a href='/railroad_" + railroad_info["railroad_id"] + "/timetable/" + timetable_selected_line + "/" + encodeURIComponent(next_station) + "/' class='next_button' onclick='event.preventDefault(); timetable_select_station(\"" + next_station + "\");'>" + escape_html(next_station) + "</a>";
    
    if (document.getElementById("radio_inbound").checked) {
        var train_direction = "inbound_trains";
        var is_inbound = true;
        var station_index = railroad_info["lines"][timetable_selected_line]["stations"].length - 1 - station_index;
    } else {
        var train_direction = "outbound_trains";
        var is_inbound = false;
    }
    
    document.getElementById("show_deadhead_trains_check").checked = config["show_deadhead_trains_on_timetable"];
    document.getElementById("show_starting_trains_only_check").checked = config["show_starting_trains_only_on_timetable"];
    
    var train_infos = {};
    
    for (var train_number of Object.keys(timetable["timetable"][timetable_selected_line][train_direction])) {
        for (var train of timetable["timetable"][timetable_selected_line][train_direction][train_number]) {
            var departure_time = train["departure_times"][station_index];
            
            if (departure_time !== null && !departure_time.startsWith("|")) {
                var is_deadhead_train = (railroad_info["deadhead_train_number_regexp"].test(train_number) || train["train_type"] === "回送") ? true : false;
                
                var is_terminal_station = true;
                
                for (var cnt = station_index + 1; cnt < train["departure_times"].length; cnt++) {
                    if (train["departure_times"][cnt] !== null) {
                        is_terminal_station = false;
                        break;
                    }
                }
                
                if (is_terminal_station) {
                    for (var next_train of train["next_trains"]) {
                        if (next_train["line_id"] === timetable_selected_line) {
                            is_terminal_station = false;
                            break;
                        }
                    }
                }
                
                if (!config["show_deadhead_trains_on_timetable"] && (is_deadhead_train || is_terminal_station)) {
                    continue;
                }
                
                if (train["previous_trains"].length == 0) {
                    var is_starting_station = true;
                    
                    for (var cnt = 0; cnt < station_index; cnt++) {
                        if (train["departure_times"][cnt] !== null) {
                            is_starting_station = false;
                            break;
                        }
                    }
                } else {
                    var is_starting_station = false;
                }
                
                if (config["show_starting_trains_only_on_timetable"] && !is_starting_station) {
                    continue;
                }
                
                hh_and_mm = departure_time.split(":");
                
                if (!(hh_and_mm[0] in train_infos)) {
                    train_infos[hh_and_mm[0]] = {};
                }
                if (!(hh_and_mm[1] in train_infos[hh_and_mm[0]])) {
                    train_infos[hh_and_mm[0]][hh_and_mm[1]] = [];
                }
                
                train_infos[hh_and_mm[0]][hh_and_mm[1]].push({
                    train_number : train_number,
                    starting_station : train["starting_station"],
                    train_type : train["train_type"],
                    is_starting_station : is_starting_station,
                    is_terminal_station : is_terminal_station,
                    is_deadhead_train :  is_deadhead_train
                });
            }
        }
    }
    
    if (timetable_date === "__today__" || timetable_date === "__tomorrow__") {
        var show_operation_data = true;
        
        if (timetable_date === "__today__") {
            var is_today = true;
            
            var now_hh_mm = get_hh_mm();
            var now_hh = now_hh_mm.substring(0, 2);
        } else {
            var is_today = false;
        }
    } else {
        var show_operation_data = false;
        var is_today = false;
    }
    
    var bg_color = diagram_info[operation_table["diagram_revision"]]["diagrams"][operation_table["diagram_id"]]["main_color"];
    var bg_color_hsl = rgb2hsl(bg_color);
    
    if (config["dark_mode"]) {
        bg_color = convert_color_dark_mode(bg_color);
        var bg_color_past = "hsl(" + bg_color_hsl[0] + "deg " + Math.round(bg_color_hsl[1] / 4 / 2.55) + "% " + Math.round(Math.min(255 - bg_color_hsl[2] + 32, 127) / 2.55) + "%)";
        
        var color_style = "";
    } else {
        var bg_color_past = "hsl(" + bg_color_hsl[0] + "deg " + Math.round(bg_color_hsl[1] / 2.55) + "% " + Math.round(bg_color_hsl[2] / 1.5 / 2.55 + 33.3) + "%)";
        
        var color_style = " color: #444444;";
    }
    
    var buf = "";
    for (var hh of Object.keys(train_infos).toSorted()) {
        var checkbox_id = "timetable_hour_" + hh;
        
        buf += "<input type='checkbox' id='" + checkbox_id + "'";
        
        if (checkbox_id in timetable_drop_down_status && timetable_drop_down_status[checkbox_id]) {
            buf += " checked='checked'";
        }
        
        buf += " onclick='update_timetable_drop_down_status(this);'><label for='" + checkbox_id + "' style='background-color: " + (is_today && hh < now_hh ? bg_color_past : bg_color) + ";" + color_style + "' class='drop_down'>" + Number(hh) + "時</label><div>";
        
        for (var mm of Object.keys(train_infos[hh]).toSorted()) {
            for (var train_info of train_infos[hh][mm]) {
                buf += "<div onclick='train_detail(\"" + timetable_selected_line + "\", \"" + train_info["train_number"] + "\", \"" + train_info["starting_station"] + "\", \"" + train_direction + "\", " + show_operation_data + ");' class='timetable_train" + (is_today && hh + ":" + mm < now_hh_mm ? " after_operation" : "") + "'>";
                
                var train_operations = get_operations(timetable_selected_line, train_info["train_number"], train_info["starting_station"], train_direction);
                
                var icon_style = train_info["is_deadhead_train"] ? " style='opacity: 0.5;'" : "";
                if (show_operation_data && train_operations !== null) {
                    var formation_data = convert_formation_data(timetable_selected_line, train_operations, is_inbound);
                    
                    buf += "<img src='" + get_icon(formation_data["first_formation"], formation_data["railroad_id"]) + "' alt='' class='train_icon'" + icon_style + ">";
                } else {
                    buf += "<img src='" + UNYOHUB_GENERIC_TRAIN_ICON + "' alt='' class='train_icon'" + icon_style + ">";
                }
                
                buf += "<span style='color: " + (config["dark_mode"] ? convert_font_color_dark_mode(get_train_color(train_info["train_number"])) : get_train_color(train_info["train_number"])) + ";'><b>" + Number(mm);
                
                if (train_info["is_starting_station"]) {
                    buf += "<small>(始)</small>";
                } else if (train_info["is_terminal_station"]) {
                    buf += "(着)";
                }
                
                buf += "</b>" + escape_html(train_info["train_type"]) + "</span>　";
                
                buf += get_final_destination(timetable_selected_line, train_info["train_number"], train_info["starting_station"]);
                
                if (railroad_info["lines"][timetable_selected_line]["inbound_forward_direction"] === is_inbound) {
                    var direction_sign_left = "<span class='direction_sign'>◀</span> ";
                    var direction_sign_right = "";
                } else {
                    var direction_sign_left = "";
                    var direction_sign_right = " <span class='direction_sign'>▶</span>";
                }
                
                if (show_operation_data) {
                    buf += "　<small>";
                    if (train_operations !== null) {
                        var car_count = 0;
                        for (var train_operation of train_operations) {
                            if (!train_operation.includes("@")) {
                                car_count += operation_table["operations"][train_operation]["car_count"];
                            } else {
                                var operation_number_and_railroad_id = train_operation.split("@");
                                
                                car_count += joined_operation_tables[operation_number_and_railroad_id[1]]["operations"][operation_number_and_railroad_id[0]]["car_count"];
                            }
                        }
                        
                        buf += "(所定" + car_count + "両)";
                    } else {
                        buf += "(不明な運用)";
                    }
                    buf += "</small><br>";
                    
                    if (train_operations !== null) {
                        if (formation_data["comment_exists"]) {
                            formation_data["formation_text"] += "*";
                        }
                        
                        buf += direction_sign_left;
                        if (formation_data["posts_count"] === 0) {
                            buf += "<span style='color: " + (!config["dark_mode"] ? "#0099cc" : "#33ccff") + ";'>" + escape_html(formation_data["formation_text"]) + "</span>";
                        } else if (formation_data["reassigned"]) {
                            buf += "<span style='color: " + (!config["dark_mode"] ? "#cc0000" : "#ff9999") + ";'>" + escape_html(formation_data["formation_text"]) + "</span>";
                        } else if (config["colorize_corrected_posts"] && formation_data["variant_exists"]) {
                            buf += "<span style='color: " + (!config["dark_mode"] ? "#ee7700" : "#ffcc99") + ";'>" + escape_html(formation_data["formation_text"]) + "</span>";
                        } else if (formation_data["is_quotation"]) {
                            buf += "<span style='color: " + (!config["dark_mode"] ? "#9966ff" : "#cc99ff") + ";'>" + escape_html(formation_data["formation_text"]) + "</span>";
                        } else if (config["colorize_beginners_posts"] && formation_data["from_beginner"]) {
                            buf += "<span style='color: #33cc99;'>" + escape_html(formation_data["formation_text"]) + "</span>";
                        } else {
                            buf += escape_html(formation_data["formation_text"]);
                        }
                        buf += direction_sign_right;
                    }
                } else if (train_operations !== null) {
                    buf += "<br>";
                    
                    if (railroad_info["lines"][timetable_selected_line]["inbound_forward_direction"] !== is_inbound) {
                        train_operations.reverse();
                    }
                    
                    buf += direction_sign_left;
                    for (var cnt = 0; cnt < train_operations.length; cnt++) {
                        if (!train_operations[cnt].includes("@")) {
                            buf += (cnt >= 1 ? "+" : "") + train_operations[cnt] + "運用<small>(" + operation_table["operations"][train_operations[cnt]]["operation_group_name"] + " " + operation_table["operations"][train_operations[cnt]]["car_count"] + "両)</small>";
                        } else {
                            var operation_number_and_railroad_id = train_operations[cnt].split("@");
                            
                            buf += (cnt >= 1 ? "+" : "") + operation_number_and_railroad_id[0] + "運用<small>(" + joined_operation_tables[operation_number_and_railroad_id[1]]["operations"][operation_number_and_railroad_id[0]]["operation_group_name"] + " " + joined_operation_tables[operation_number_and_railroad_id[1]]["operations"][operation_number_and_railroad_id[0]]["car_count"] + "両)</small>";
                        }
                    }
                    buf += direction_sign_right;
                } else {
                    buf += "<br>不明な運用";
                }
                
                buf += "</div>";
            }
        }
        
        buf += "</div>"
    }
    
    if (buf.length !== 0) {
        timetable_area_elm.innerHTML = buf;
    } else {
        timetable_area_elm.innerHTML = "<div class='no_data'>条件に合う列車は登録されていません</div>";
    }
    
    article_elms[1].scrollTop = timetable_wrapper_scroll_amount;
}

function timetable_get_neighboring_station (line_id, station_name, move_count) {
    var station_list = railroad_info["lines"][line_id]["stations"];
    
    for (var cnt = 0; cnt < station_list.length; cnt++) {
        if (station_list[cnt]["station_name"] === station_name) {
            break;
        }
    }
    
    var station_index = cnt + move_count;
    
    while (true) {
        if (station_index < 0) {
            station_index = station_list.length - 1;
        } else if (station_index > station_list.length - 1) {
            station_index = 0;
        }
        
        if (!("is_signal_station" in station_list[station_index]) || !station_list[station_index]["is_signal_station"]) {
            break;
        }
        
        if (move_count > 0) {
            station_index++;
        } else {
            station_index--;
        }
    }
    
    return station_list[station_index]["station_name"];
}

function change_show_arriving_trains (bool_val) {
    config["show_deadhead_trains_on_timetable"] = bool_val;
    
    save_config();
    
    timetable_select_station(timetable_selected_station);
}

function change_show_starting_trains_only (bool_val) {
    config["show_starting_trains_only_on_timetable"] = bool_val;
    
    save_config();
    
    timetable_select_station(timetable_selected_station);
}

function timetable_station_menu () {
    var popup_inner_elm = open_square_popup("station_menu_popup");
    
    var buf = "add_favorite_station(\"" + railroad_info["railroad_id"] + "\", \"" + add_slashes(timetable_selected_line) + "\", \"" + add_slashes(timetable_selected_station) + "\")'>お気に入り駅に追加";
    for (var favorite_station of config["favorite_stations"]) {
        if (favorite_station["railroad_id"] === railroad_info["railroad_id"] && favorite_station["line_id"] === timetable_selected_line && favorite_station["station_name"] === timetable_selected_station) {
            buf = "remove_favorite_station(\"" + railroad_info["railroad_id"] + "\", \"" + add_slashes(timetable_selected_line) + "\", \"" + add_slashes(timetable_selected_station) + "\")'>お気に入り駅から削除";
        }
    }
    
    popup_inner_elm.innerHTML = "<button type='button' class='wide_button' onclick='close_square_popup(); position_mode(\"" + add_slashes(timetable_selected_line) + "\", \"__today__\", \"" + add_slashes(timetable_selected_station) + "\")'>駅付近の列車走行位置</button><button type='button' class='wide_button' onclick='close_square_popup(); " + buf + "</button>";
}

function timetable_change_diagram (operation_table_name) {
    if (operation_table_name === "__today__" || operation_table_name === "__tomorrow__") {
        if (operation_table_name === "__today__") {
            var date_string = get_date_string(get_timestamp());
        } else {
            var date_string = get_date_string(get_timestamp() + 86400);
        }
        
        get_diagram_id(date_string, function (diagram_data) {
            if (diagram_data !== null) {
                load_timetable_diagram(diagram_data["diagram_revision"], diagram_data["diagram_id"], date_string);
            }
        });
    } else {
        load_timetable_diagram(operation_table["diagram_revision"], operation_table_name, null);
    }
}

function load_timetable_diagram (diagram_revision, diagram_id, date_string) {
    var resolved = false;
    
    timetable_promise = new Promise(function (resolve, reject) {
        load_data(function () {
            if (!resolved) {
                resolved = true;
                
                resolve();
            } else if (timetable_selected_station !== null) {
                timetable_select_station(timetable_selected_station);
            }
        }, null, reject, diagram_revision, diagram_id, "joined_railroads" in railroad_info ? railroad_info["joined_railroads"] : null, date_string);
    });
    
    if (timetable_selected_station !== null) {
        timetable_select_station(timetable_selected_station);
    }
    
    update_timetable_date(diagram_revision, diagram_id, date_string);
}

function timetable_get_diagram_list (diagram_revision) {
    return ["__today__", "__tomorrow__", ...diagram_info[diagram_revision]["diagram_order"]];
}

function timetable_diagram_previous () {
    var diagram_list = timetable_get_diagram_list(operation_table["diagram_revision"]);
    var list_index = diagram_list.indexOf(timetable_date) - 1;
    
    if (list_index < 0) {
        list_index = diagram_list.length - 1;
    }
    
    timetable_change_diagram(diagram_list[list_index]);
}

function timetable_diagram_next () {
    var diagram_list = timetable_get_diagram_list(operation_table["diagram_revision"]);
    var list_index = diagram_list.indexOf(timetable_date) + 1;
    
    if (list_index >= diagram_list.length) {
        list_index = 0;
    }
    
    timetable_change_diagram(diagram_list[list_index]);
}

function timetable_list_diagrams () {
    var popup_inner_elm = open_square_popup("diagram_list_popup", true, "ダイヤの選択");
    
    popup_inner_elm.className = "wait_icon";
    popup_inner_elm.innerHTML = "";
    
    var diagram_list = timetable_get_diagram_list(operation_table["diagram_revision"]);
    
    get_diagram_id([get_date_string(get_timestamp()), get_date_string(get_timestamp() + 86400)], function (today_diagram_data, tomorrow_diagram_data) {
        if (today_diagram_data === null || tomorrow_diagram_data === null) {
            return;
        }
        
        var buf = "";
        for (var diagram_id of diagram_list) {
            if (diagram_id === "__today__") {
                var diagram_name = "今日<small>(" + escape_html(diagram_info[today_diagram_data["diagram_revision"]]["diagrams"][today_diagram_data["diagram_id"]]["diagram_name"]) + ")</small>";
                var bg_color = diagram_info[today_diagram_data["diagram_revision"]]["diagrams"][today_diagram_data["diagram_id"]]["main_color"];
            } else if (diagram_id === "__tomorrow__") {
                var diagram_name = "明日<small>(" + escape_html(diagram_info[tomorrow_diagram_data["diagram_revision"]]["diagrams"][tomorrow_diagram_data["diagram_id"]]["diagram_name"]) + ")</small>";
                var bg_color = diagram_info[tomorrow_diagram_data["diagram_revision"]]["diagrams"][tomorrow_diagram_data["diagram_id"]]["main_color"];
            } else {
                var diagram_name = escape_html(diagram_info[today_diagram_data["diagram_revision"]]["diagrams"][diagram_id]["diagram_name"]);
                var bg_color = diagram_info[today_diagram_data["diagram_revision"]]["diagrams"][diagram_id]["main_color"];
            }
            
            if (config["dark_mode"]) {
                bg_color = convert_color_dark_mode(bg_color);
            }
            
            buf += "<button type='button' class='wide_button' onclick='close_square_popup(); timetable_change_diagram(\"" + diagram_id + "\");' style='background-color: " + bg_color + "; border-color: " + bg_color + ";'>" + diagram_name + "</button>";
        }
        
        popup_inner_elm.innerHTML = buf;
    });
}

function update_timetable_drop_down_status (elm) {
    timetable_drop_down_status[elm.id] = elm.checked;
}

function add_favorite_station (railroad_id, line_id, station_name) {
    if (confirm(station_name + "駅 (" + railroad_info["lines"][line_id]["line_name"] + ") をお気に入りに追加しますか？")) {
        config["favorite_stations"].push({ railroad_id : railroad_id, line_id : line_id, station_name : station_name });
        save_config();
        
        mes("駅をお気に入りに追加しました");
    }
}

function remove_favorite_station (railroad_id, line_id, station_name, redraw_railroad_list = false) {
    if (confirm(station_name + "駅をお気に入りから削除しますか？")) {
        for (var cnt = 0; cnt < config["favorite_stations"].length; cnt++) {
            if (config["favorite_stations"][cnt]["railroad_id"] === railroad_id && config["favorite_stations"][cnt]["line_id"] === line_id && config["favorite_stations"][cnt]["station_name"] === station_name) {
                config["favorite_stations"].splice(cnt, 1);
                save_config();
                
                mes("駅をお気に入りから削除しました");
                
                if (redraw_railroad_list) {
                    update_railroad_list(railroads);
                }
                
                return true;
            }
        }
    }
    
    return false;
}


var operation_number_order = null;

var operation_data_heading_elm = document.getElementById("operation_data_heading");
var operation_data_area_elm = document.getElementById("operation_data_area");
var operation_date_button_elm = document.getElementById("operation_date_button");

var operation_all_data_loaded = false;

function operation_data_mode () {
    change_title(railroad_info["railroad_name"] + "の運用履歴データ | " + instance_info["instance_name"], "/railroad_" + railroad_info["railroad_id"] + "/operation_data/");
    
    change_mode(2);
    
    operation_date_button_elm.max = get_date_string(get_timestamp() + (86400 * instance_info["available_days_ahead"]));
    
    operation_data_change_date(null);
}

function operation_data_change_date (date_additions) {
    var ts = get_timestamp();
    
    if (date_additions === null) {
        var operation_data_date = ts;
    } else if (typeof date_additions === "string") {
        var dt = new Date(date_additions + " 03:00:00");
        var operation_data_date = Math.floor(dt.getTime() / 1000);
    } else {
        var dt = new Date(operation_data["operation_date"] + " 03:00:00");
        var operation_data_date = Math.floor(dt.getTime() / 1000) + (date_additions * 86400);
    }
    
    if (operation_data_date > ts + (86400 * instance_info["available_days_ahead"])) {
        operation_data_date = ts + (86400 * instance_info["available_days_ahead"]);
        
        mes((instance_info["available_days_ahead"] + 1) + "日以上先の運用情報は表示できません");
    }
    
    operation_data_heading_elm.innerText = "";
    operation_data_area_elm.innerHTML = "";
    
    var date_string = get_date_string(operation_data_date);
    operation_date_button_elm.value = date_string;
    
    operation_all_data_loaded = false;
    
    get_diagram_id(date_string, function (diagram_data) {
        if (diagram_data === null) {
            operation_data_area_elm.innerHTML = "<div class='no_data'>指定された日付のデータは利用できません</div>";
            
            return;
        }
        
        document.getElementById("operation_data_date").innerHTML = date_string.substring(0, 4) + "<small>年</small> " + Number(date_string.substring(5, 7)) + "<small>月</small> " + Number(date_string.substring(8)) + "<small>日</small>";
        
        load_data(function () {
            operation_all_data_loaded = true;
            
            operation_data_draw();
        }, null, function () {
            operation_data_area_elm.innerHTML = "<div class='no_data'>表示に必要なデータが利用できません</div>";
        }, diagram_data["diagram_revision"], diagram_data["diagram_id"], null, date_string);
    });
    
}

function operation_date_button_change () {
    if (operation_date_button_elm.valueAsDate !== null) {
        operation_data_change_date(operation_date_button_elm.value);
    } else {
        operation_data_change_date(null);
    }
}

function sort_station_names (station_names) {
    var station_names_sorted = [];
    var station_names_tmp = {};
    var station_names_tmp_keys = [];
    var station_names_tmp_2 = [];
    
    for_1: for (var station_name of station_names) {
        for (var cnt_2 = 0; cnt_2 < railroad_info["lines_order"].length; cnt_2++) {
            var station_list = railroad_info["lines"][railroad_info["lines_order"][cnt_2]]["stations"];
            
            for (var cnt_3 = 0; cnt_3 < station_list.length; cnt_3++) {
                if (station_list[cnt_3]["station_name"] === station_name) {
                    var station_names_tmp_key = ("00" + cnt_2).slice(-3) + "-" + ("00" + cnt_3).slice(-3);
                    
                    station_names_tmp[station_names_tmp_key] = station_name;
                    station_names_tmp_keys.push(station_names_tmp_key);
                    
                    continue for_1;
                }
            }
        }
        
        station_names_tmp_2.push(station_name);
    }
    
    for (var station_name_tmp of station_names_tmp_keys.toSorted()) {
        station_names_sorted.push(station_names_tmp[station_name_tmp]);
    }
    
    station_names_sorted.push(...station_names_tmp_2);
    
    return station_names_sorted;
}

function get_operation_data_cell_html (operation_number, days_before, now_str, highlighted_formation = null, additional_text = null) {
    if (days_before >= 1 || (days_before === 0 && (operation_table["operations"][operation_number]["starting_time"] === null || operation_table["operations"][operation_number]["ending_time"] < now_str))) {
        var buf = "<td class='after_operation'";
    } else if (days_before <= -1 || operation_table["operations"][operation_number]["starting_time"] > now_str) {
        var buf = "<td class='before_operation'";
    } else {
        var buf = "<td";
    }
    
    if (operation_number in operation_data["operations"] && operation_data["operations"][operation_number] !== null) {
        if (operation_data["operations"][operation_number]["posts_count"] === 0) {
            buf += " style='color: " + (!config["dark_mode"] ? "#0099cc" : "#33ccff") + ";'>";
        } else if ("relieved_formations" in operation_data["operations"][operation_number] && operation_data["operations"][operation_number]["relieved_formations"].length >= 1) {
            buf += " style='color: " + (!config["dark_mode"] ? "#cc0000" : "#ff9999") + ";'>";
        } else if (config["colorize_corrected_posts"] && "variant_exists" in operation_data["operations"][operation_number] && operation_data["operations"][operation_number]["variant_exists"]) {
            buf += " style='color: " + (!config["dark_mode"] ? "#ee7700" : "#ffcc99") + ";'>";
        } else if ("is_quotation" in operation_data["operations"][operation_number] && operation_data["operations"][operation_number]["is_quotation"]) {
            buf += " style='color: " + (!config["dark_mode"] ? "#9966ff" : "#cc99ff") + ";'>";
        } else if (config["colorize_beginners_posts"] && "from_beginner" in operation_data["operations"][operation_number] && operation_data["operations"][operation_number]["from_beginner"]) {
            buf += " style='color: #33cc99;'>";
        } else {
            buf += ">";
        }
        
        var assigned_formations = [operation_data["operations"][operation_number]["formations"]];
        
        if ("relieved_formations" in operation_data["operations"][operation_number] && operation_data["operations"][operation_number]["relieved_formations"].length >= 1) {
            assigned_formations = operation_data["operations"][operation_number]["relieved_formations"].concat(assigned_formations);
        }
        
        if (assigned_formations.length >= 2) {
            buf += "<span class='relieved_formations'>";
        }
        for (var cnt = 0; cnt < assigned_formations.length; cnt++) {
            if (cnt >= 1) {
                buf += "<br>→ ";
            }
            
            if (assigned_formations[cnt] !== "") {
                var formation_list = assigned_formations[cnt].split("+");
                
                for (var cnt_2 = 0; cnt_2 < formation_list.length; cnt_2++) {
                    if (highlighted_formation === null) {
                        buf += (cnt_2 >= 1 ? " <wbr>+" : "") + "<img src='" + get_icon(formation_list[cnt_2]) + "' alt='' class='train_icon'>" + formation_list[cnt_2];
                    } else if (formation_list[cnt_2] === highlighted_formation || (highlighted_formation in formations["series"] && formation_list[cnt_2].startsWith(highlighted_formation))) {
                        buf += (cnt_2 >= 1 ? " <wbr>+ " : "") + "<b>" + formation_list[cnt_2] + "</b>";
                    } else {
                        buf += (cnt_2 >= 1 ? " <wbr>+ " : "") + formation_list[cnt_2];
                    }
                }
            } else {
                buf += (highlighted_formation === null ? "<img src='" + UNYOHUB_CANCELED_TRAIN_ICON + "' alt='' class='train_icon'>" : "") + "運休";
            }
            
            if (cnt === assigned_formations.length - 2) {
                buf += "</span>";
            }
        }
        
        if ("comment_exists" in operation_data["operations"][operation_number] && operation_data["operations"][operation_number]["comment_exists"]) {
            buf += "*";
        }
    } else {
        buf += ">" + (highlighted_formation === null ? "<img src='" + UNYOHUB_UNKNOWN_TRAIN_ICON + "' alt='' class='train_icon'>" : "") + "?";
    }
    
    if (additional_text !== null) {
        buf += "<wbr> <small>" + additional_text + "</small>";
    }
    
    buf += "</td>";
    
    return buf;
}

function operation_data_draw () {
    if (!operation_all_data_loaded) {
        return;
    }
    
    var bg_color = diagram_info[operation_table["diagram_revision"]]["diagrams"][operation_table["diagram_id"]]["main_color"];
    
    if (config["dark_mode"]) {
        operation_data_heading_elm.style.backgroundColor = convert_color_dark_mode(bg_color);
        operation_data_heading_elm.style.color = "";
    } else {
        operation_data_heading_elm.style.backgroundColor = bg_color;
        operation_data_heading_elm.style.color = "#444444";
    }
    
    var buf_h2 = diagram_info[operation_table["diagram_revision"]]["diagrams"][operation_table["diagram_id"]]["diagram_name"] + " ";
    
    var today_ts = get_timestamp();
    var now_str = get_hh_mm(today_ts);
    var dt = new Date(operation_data["operation_date"] + " 03:00:00");
    var operation_data_date = Math.floor(dt.getTime() / 1000);
    var days_before = Math.floor((today_ts - operation_data_date) / 86400);
    
    var show_write_operation_data_button = "true";
    if (days_before >= 1) {
        if (days_before === 1) {
            buf_h2 += "(昨日)";
        } else {
            show_write_operation_data_button = "false";
            
            if (days_before === 2) {
                buf_h2 += "(一昨日)";
            } else {
                buf_h2 += "(" + days_before + "日前)";
            }
        }
    } else if (days_before === 0) {
        buf_h2 += "(今日)";
    } else if (days_before === -1) {
        buf_h2 += "(明日)";
    } else if (days_before === -2) {
        buf_h2 += "(明後日)";
    } else {
        buf_h2 += "(" + Math.abs(days_before) + "日後)";
    }
    
    operation_data_heading_elm.innerText = buf_h2;
    
    if (!document.getElementById("radio_operation_groups").checked) {
        var operation_numbers = [];
        for (var operation_group of operation_table["operation_groups"]) {
            operation_numbers.push(...operation_group["operation_numbers"]);
        }
    }
    
    operation_number_order = [];
    
    var buf = "";
    
    if (!document.getElementById("radio_formations").checked) {
        if (document.getElementById("radio_operation_groups").checked) {
            var sorting_criteria = "operation_groups";
            
            var groups = operation_table["operation_groups"];
        } else {
            if (document.getElementById("radio_starting_location").checked) {
                var sorting_criteria = "starting_location";
            } else {
                var sorting_criteria = "terminal_location";
                
                var formations_last_assigned = {};
                var reoperated_operation_numbers = new Set();
            }
            
            var operations_list = {};
            var locations = [];
            
            for (var operation_number of operation_numbers) {
                if (!locations.includes(operation_table["operations"][operation_number][sorting_criteria])) {
                    locations.push(operation_table["operations"][operation_number][sorting_criteria]);
                    operations_list[operation_table["operations"][operation_number][sorting_criteria]] = [];
                }
                
                operations_list[operation_table["operations"][operation_number][sorting_criteria]].push(operation_number);
                
                if (sorting_criteria === "terminal_location" && operation_number in operation_data["operations"] && operation_data["operations"][operation_number] !== null) {
                    var assigned_formations = operation_data["operations"][operation_number]["formations"].split("+");
                    
                    for (var assigned_formation of assigned_formations) {
                        if (assigned_formation in formations["formations"]) {
                            if (assigned_formation in formations_last_assigned) {
                                if (operation_table["operations"][operation_number]["ending_time"] > operation_table["operations"][formations_last_assigned[assigned_formation]]["ending_time"]) {
                                    reoperated_operation_numbers.add(formations_last_assigned[assigned_formation]);
                                    
                                    formations_last_assigned[assigned_formation] = operation_number;
                                } else {
                                    reoperated_operation_numbers.add(operation_number);
                                }
                            } else {
                                formations_last_assigned[assigned_formation] = operation_number;
                            }
                        }
                    }
                }
            }
            
            var groups = [];
            for (var location of sort_station_names(locations)) {
                groups.push({operation_group_name: location, operation_numbers: operations_list[location]});
            }
        }
        
        for (var group of groups) {
            buf += "<h3>" + group["operation_group_name"] + "</h3>";
            
            buf += "<table>";
            for (var operation_number of group["operation_numbers"]) {
                buf += "<tr onclick='operation_detail(" + operation_number_order.length + ", " + operation_data_date + ", " + show_write_operation_data_button + ");'><th style='background-color: " + (config["dark_mode"] ? convert_color_dark_mode(operation_table["operations"][operation_number]["main_color"]) : operation_table["operations"][operation_number]["main_color"]) + ";'>";
                if (sorting_criteria === "starting_location" && operation_table["operations"][operation_number]["starting_track"] !== null) {
                    buf += "<small>" + operation_table["operations"][operation_number]["starting_track"] + "停泊</small><br>";
                } else if (sorting_criteria === "terminal_location" && operation_table["operations"][operation_number]["terminal_track"] !== null) {
                    buf += "<small>" + operation_table["operations"][operation_number]["terminal_track"] + "停泊</small><br>";
                }
                buf += "<u>" + operation_number + "</u><small>(" + operation_table["operations"][operation_number]["car_count"] + ")</small>";
                if (sorting_criteria === "starting_location" && operation_table["operations"][operation_number]["starting_time"] >= "12:00") {
                    buf += "<br><small>午後出庫</small><br>";
                } else if (sorting_criteria === "terminal_location" && operation_table["operations"][operation_number]["ending_time"] < "12:00") {
                    buf += "<br><small>午前入庫</small><br>";
                }
                buf += "</th>";
                
                buf += get_operation_data_cell_html(operation_number, days_before, now_str, null, (sorting_criteria === "terminal_location" && reoperated_operation_numbers.has(operation_number) ? "(再出庫有)" : null));
                
                buf += "</tr>";
                
                operation_number_order.push(operation_number);
            }
            buf += "</table>";
        }
    } else {
        var formation_list = Object.keys(formations["formations"]);
        
        var series_list = [];
        var series_titles = {};
        var series_formation_list = {};
        var formation_operation_data = {};
        
        for (var series_name of formations["series_names"]) {
            if ("unregistered" in formations["series"][series_name] && formations["series"][series_name]["unregistered"]) {
                continue;
            }
            
            series_list.push(series_name);
            series_titles[series_name] = series_name;
            formation_operation_data[series_name] = new Set();
            
            if ("subseries_names" in formations["series"][series_name]) {
                for (var subseries_name of formations["series"][series_name]["subseries_names"]) {
                    if (!("unregistered" in formations["series"][series_name]["subseries_names"][subseries_name] && formations["series"][series_name]["subseries_names"][subseries_name]["unregistered"])) {
                        series_titles[series_name + subseries_name] = series_name;
                    }
                }
            }
        }
        
        for (var formation_name of formation_list) {
            if ("cars" in formations["formations"][formation_name]) {
                formation_operation_data[formation_name] = new Set();
            }
        }
        
        formation_operation_data["運休"] = new Set();
        formation_operation_data["不明"] = new Set();
        
        for (var operation_number of operation_numbers) {
            if (!(operation_number in operation_data["operations"]) || operation_data["operations"][operation_number] === null) {
                formation_operation_data["不明"].add(operation_number);
                
                continue;
            } else if (operation_data["operations"][operation_number]["formations"].length === 0) {
                formation_operation_data["運休"].add(operation_number);
                
                continue;
            } else {
                for (var assigned_formation of operation_data["operations"][operation_number]["formations"].split("+")) {
                    if (assigned_formation in formations["formations"] && "cars" in formations["formations"][assigned_formation]) {
                        formation_operation_data[assigned_formation].add(operation_number);
                    } else if (assigned_formation in series_titles) {
                        formation_operation_data[series_titles[assigned_formation]].add(operation_number);
                    } else {
                        formation_operation_data["不明"].add(operation_number);
                    }
                }
            }
        }
        
        for (series_name of series_list) {
            if ("subseries_names" in formations["series"][series_name]) {
                series_formation_list[series_name] = [];
                
                for (subseries_name of formations["series"][series_name]["subseries_names"]) {
                    if (!("unregistered" in formations["series"][series_name]["subseries_names"][subseries_name] && formations["series"][series_name]["subseries_names"][subseries_name]["unregistered"])) {
                        series_formation_list[series_name].push(...formations["series"][series_name]["subseries"][subseries_name]["formation_names"]);
                    }
                }
            } else {
                series_formation_list[series_name] = [...formations["series"][series_name]["formation_names"]];
            }
            
            if (formation_operation_data[series_name].size >= 1) {
                series_formation_list[series_name].push(series_name);
            }
        }
        
        if (formation_operation_data["運休"].size >= 1) {
            series_list.push("運休");
            series_formation_list["運休"] = ["運休"];
        }
        if (formation_operation_data["不明"].size >= 1) {
            series_list.push("不明");
            series_formation_list["不明"] = ["不明"];
        }
        
        for (series_name of series_list) {
            buf += "<h3>" + series_name + "</h3>";
            
            buf += "<table class='operation_data_3_columns'>";
            for (var formation_name of series_formation_list[series_name]) {
                if (!(formation_name in formation_operation_data)) {
                    continue;
                }
                
                var operation_numbers = Array.from(formation_operation_data[formation_name]);
                for (var cnt = 0; cnt < operation_numbers.length || cnt === 0; cnt++) {
                    if (operation_numbers.length >= 1) {
                        var operation_number = operation_numbers[cnt];
                        
                        buf += "<tr onclick='operation_detail(" + operation_number_order.length + ", " + operation_data_date + ", " + show_write_operation_data_button + ");'>";
                    } else {
                        buf += "<tr>";
                    }
                    
                    if (cnt === 0) {
                        buf += "<td onclick='event.stopPropagation();" + (formation_name in formations["formations"] ? " formations_mode(\"" + add_slashes(formation_name) + "\");" : "") + "'" + (operation_numbers.length >= 1 ? " rowspan='" + operation_numbers.length + "'" : "") + "><img src='";
                        
                        if (formation_name === "運休") {
                            buf += UNYOHUB_CANCELED_TRAIN_ICON;
                        } else if (formation_name === "不明") {
                            buf += UNYOHUB_UNKNOWN_TRAIN_ICON;
                        } else {
                            buf += get_icon(formation_name);
                        }
                        
                        buf += "' alt='' class='train_icon'>" + formation_name + "</td>";
                    }
                    
                    if (operation_numbers.length >= 1) {
                        buf += "<th style='background-color: " + (config["dark_mode"] ? convert_color_dark_mode(operation_table["operations"][operation_number]["main_color"]) : operation_table["operations"][operation_number]["main_color"]) + ";'><u>" + operation_number + "</u></th>";
                        
                        buf += get_operation_data_cell_html(operation_number, days_before, now_str, formation_name);
                        
                        operation_number_order.push(operation_number);
                    } else {
                        buf += "<td colspan='2' class='no_operation'>(情報がありません)</td>";
                    }
                    
                    buf += "</tr>";
                }
            }
            buf += "</table>";
        }
    }
    
    buf += "<br><div class='informational_text'>最新の投稿: " + get_date_and_time(operation_data["last_modified_timestamp"]) + "</div>";
    
    operation_data_area_elm.innerHTML = buf;
}

var operation_detail_write_button_enabled = false;

function operation_detail (operation_number_or_index, operation_data_date_ts_or_diagram_id, show_write_operation_data_button = null, search_keyword = null) {
    var popup_inner_elm = open_popup("operation_detail_popup", null, true);
    
    popup_inner_elm.className = "wait_icon";
    popup_inner_elm.innerHTML = "";
    popup_inner_elm.scrollTop = 0;
    
    if (show_write_operation_data_button !== null) {
        operation_detail_write_button_enabled = show_write_operation_data_button;
    }
    
    if (typeof operation_data_date_ts_or_diagram_id !== "string") {
        var operation_data_date = get_date_string(operation_data_date_ts_or_diagram_id);
        
        get_diagram_id(operation_data_date, function (diagram_data) {
            if (diagram_data === null) {
                return;
            }
            
            if (operation_table === null || diagram_data["diagram_revision"] !== operation_table["diagram_revision"] || diagram_data["diagram_id"] !== operation_table["diagram_id"] || operation_data === null || operation_data_date !== operation_data["operation_date"]) {
                load_data(function () {
                    draw_operation_detail(operation_number_or_index, diagram_data["diagram_revision"], diagram_data["diagram_id"], operation_data_date_ts_or_diagram_id, search_keyword);
                }, null, function () {}, diagram_data["diagram_revision"], diagram_data["diagram_id"], null, operation_data_date);
            } else {
                draw_operation_detail(operation_number_or_index, diagram_data["diagram_revision"], diagram_data["diagram_id"], operation_data_date_ts_or_diagram_id, search_keyword);
            }
        });
    } else {
        draw_operation_detail(operation_number_or_index, operation_table["diagram_revision"], operation_data_date_ts_or_diagram_id, null, search_keyword);
    }
}

function draw_operation_detail (operation_number_or_index, diagram_revision, diagram_id, operation_data_date_ts, search_keyword) {
    var operation_number = typeof operation_number_or_index === "string" ? operation_number_or_index : operation_number_order[operation_number_or_index];
    
    if (operation_data_date_ts === null) {
        var operation_data_date_str = null;
        var is_today = false;
        var diagram_id_or_ts = "\"" + diagram_id + "\"";
        operation_detail_write_button_enabled = false;
    } else {
        var operation_data_date_str = get_date_string(operation_data_date_ts);
        
        if (operation_data_date_str === get_date_string(get_timestamp())) {
            var is_today = true;
        } else {
            var is_today = false;
        }
        
        var diagram_id_or_ts = operation_data_date_ts;
    }
    
    var bg_color = diagram_info[diagram_revision]["diagrams"][diagram_id]["main_color"];
    
    if (config["dark_mode"]) {
        bg_color = convert_color_dark_mode(bg_color);
        
        var color_style = "";
    } else {
        var color_style = " color: #444444;";
    }
    
    if (operation_number in operation_table["operations"]) {
        var buf = "<div class='heading_wrapper' style='background-color: " + bg_color + ";" + color_style + "'><button type='button' class='previous_button' onclick='previous_operation_number(" + (typeof operation_number_or_index === "string" ? "\"" + operation_number + "\"" : operation_number_or_index) + ", " + diagram_id_or_ts + ");'></button><h2>" + operation_number + "運用<small>" + operation_table["operations"][operation_number]["operation_group_name"] + " (" + operation_table["operations"][operation_number]["car_count"] + "両)</small></h2><button type='button' class='next_button' onclick='next_operation_number(" + (typeof operation_number_or_index === "string" ? "\"" + operation_number + "\"" : operation_number_or_index) + ", " + diagram_id_or_ts + ");'></button></div>";
    } else {
        var buf = "<h2 style='background-color: " + bg_color + ";" + color_style + "'>" + operation_number + "運用</h2>";
    }
    
    if (operation_data_date_ts !== null) {
        buf += "<div class='formation_data_area'>";
        
        var formation_text = (operation_number in operation_data["operations"] && operation_data["operations"][operation_number] !== null) ? operation_data["operations"][operation_number]["formations"] : null;
        
        var heading_str = "";
        if (formation_text !== null) {
            if (formation_text !== "") {
                var buf_2 = "";
                for (var formation_name of formation_text.split("+")) {
                    if (buf_2.length >= 1) {
                        buf_2 += " +"
                    }
                    
                    if (formation_name in formations["formations"]) {
                        buf_2 += "<a href='/railroad_" + railroad_info["railroad_id"] + "/formations/" + encodeURIComponent(formation_name) + "/' onclick='event.preventDefault(); popup_close(true); formations_mode(\"" + add_slashes(formation_name) + "\");'><img src='" + get_icon(formation_name) + "' alt='' class='train_icon'>" + escape_html(formation_name) + "</a>";
                        
                        var overview = get_formation_overview(formation_name);
                        if (overview["caption"].length >= 1) {
                            if (heading_str.length >= 1) {
                                heading_str += "<br>";
                            }
                            
                            heading_str += escape_html(formation_name + " : " + overview["caption"]);
                        }
                    } else if (formation_name === "?") {
                        buf_2 += "<img src='" + UNYOHUB_UNKNOWN_TRAIN_ICON + "' alt='' class='train_icon'>?";
                    } else {
                        buf_2 += "<img src='" + get_icon(formation_name) + "' alt='' class='train_icon'>" + escape_html(formation_name);
                    }
                }
                
                buf += buf_2;
            } else {
                buf += "<img src='" + UNYOHUB_CANCELED_TRAIN_ICON + "' alt='' class='train_icon'>運休";
            }
        } else {
            buf += "<img src='" + UNYOHUB_UNKNOWN_TRAIN_ICON + "' alt='' class='train_icon'>?";
        }
        
        buf += "</div><div class='descriptive_text'>" + heading_str + "</div><div id='operation_data_detail_area'></div>";
    }
    
    if (operation_number in operation_table["operations"]) {
        if (navigator.onLine) {
            buf += "<button type='button' class='execute_button' onclick='operation_data_history(null, \"" + add_slashes(operation_number) + "\");'>過去30日間の充当編成</button>";
        }
        
        buf += "<div><input type='radio' name='switch_simplify_operation_details' id='simplify_operation_details' onchange='change_simplify_operation_details(!this.checked, \"" + add_slashes(operation_number) + "\", " + diagram_id_or_ts + ", " + is_today + ", " + (search_keyword === null ? "null" : "\"" + add_slashes(search_keyword) + "\"") + ");'" + (config["simplify_operation_details"] ? "" : " checked='checked'") + "><label for='simplify_operation_details'>詳細表示</label><input type='radio'  name='switch_simplify_operation_details' id='not_simplify_operation_details' onchange='change_simplify_operation_details(this.checked, \"" + add_slashes(operation_number) + "\", " + diagram_id_or_ts + ", " + is_today + ", " + (search_keyword === null ? "null" : "\"" + add_slashes(search_keyword) + "\"") + ");'" + (config["simplify_operation_details"] ? " checked='checked'" : "") + "><label for='not_simplify_operation_details'>簡略表示</label></div>";
        
        if (operation_table["operations"][operation_number]["comment"] !== null) {
            buf += "<div class='descriptive_text'>" + escape_html(operation_table["operations"][operation_number]["comment"]) + "</div>";
        }
        
        buf += "<div id='operation_trains_area'></div>";
        
        if (navigator.onLine && operation_detail_write_button_enabled) {
            buf += "<button type='button' class='write_button' onclick='write_operation_data(null, \"" + operation_data_date_str + "\", \"" + operation_number + "\");'>運用情報を投稿</button>";
        }
    } else {
        buf += "<div class='no_data'>運用表に登録されていない運用です</div>";
    }
    
    document.getElementById("operation_detail_popup_inner").innerHTML = buf;
    
    if (operation_number in operation_table["operations"]) {
        draw_operation_trains(operation_number, diagram_id_or_ts, is_today, search_keyword);
    }
    
    if (navigator.onLine && operation_data_date_ts !== null) {
        get_operation_data_detail(operation_data_date_str, operation_number, "operation_data_detail_area");
    }
}

function draw_operation_trains (operation_number, diagram_id_or_ts, is_today, search_keyword = null) {
    if (config["simplify_operation_details"]) {
        var train_div_class_name = "train_overview";
    } else {
        var train_div_class_name = "operation_table_train";
    }
    var buf = "<div class='" + train_div_class_name + "'><b class='train_overview_location'>" + operation_table["operations"][operation_number]["starting_location"];
    if (operation_table["operations"][operation_number]["starting_track"] !== null) {
        buf += "<small>(" + operation_table["operations"][operation_number]["starting_track"] + ")</small>";
    }
    
    if (operation_table["operations"][operation_number]["starting_time"] !== null) {
        buf += " 出庫</b><time>" + operation_table["operations"][operation_number]["starting_time"] + "</time></div>";
        
        if (is_today) {
            var now_str = get_hh_mm();
        }
        
        var trains = operation_table["operations"][operation_number]["trains"];
        var next_train_operation_list = null;
        var starting_station = null;
        var highlight_str = "";
        for (var cnt = 0; cnt < trains.length; cnt++) {
            if (trains[cnt]["train_number"].startsWith(".")) {
                buf += "<div class='" + train_div_class_name + " operation_table_deposited_train'>";
                buf += "<b>" + trains[cnt]["train_number"].substring(1).split("__")[0] + "<small>待機</small></b>";
                
                if (is_today && trains[cnt]["final_arrival_time"] < now_str) {
                    highlight_str = "";
                }
                
                buf += "<div" + highlight_str + "><span>" + trains[cnt]["first_departure_time"] + "</span><span>〜</span><span>" + trains[cnt]["final_arrival_time"] + "</span></div>";
                buf += "</div>";
            } else {
                if (next_train_operation_list === null) {
                    var operations_list = get_operations(trains[cnt]["line_id"], trains[cnt]["train_number"], trains[cnt]["starting_station"], trains[cnt]["direction"] + "_trains");
                    if (operations_list !== null) {
                        operations_list.splice(operations_list.indexOf(operation_number), 1);
                    } else {
                        operations_list = [];
                    }
                } else {
                    var operations_list = next_train_operation_list;
                }
                
                if (starting_station === null) {
                    if (config["simplify_operation_details"]) {
                        for (var station of railroad_info["lines"][trains[cnt]["line_id"]]["stations"]) {
                            if (station["station_name"] === trains[cnt]["starting_station"]) {
                                starting_station = station["station_initial"];
                                break;
                            }
                        }
                    } else {
                        starting_station = trains[cnt]["starting_station"];
                    }
                    
                    var first_departure_time = trains[cnt]["first_departure_time"];
                    
                    if (is_today && search_keyword === null && first_departure_time <= now_str) {
                        highlight_str = " class='search_highlight'";
                    }
                }
                
                if (cnt + 1 < trains.length && trains[cnt]["train_number"] === trains[cnt + 1]["train_number"]) {
                    next_train_operation_list = get_operations(trains[cnt + 1]["line_id"], trains[cnt + 1]["train_number"], trains[cnt + 1]["starting_station"], trains[cnt + 1]["direction"] + "_trains");
                    if (next_train_operation_list !== null) {
                        next_train_operation_list.splice(next_train_operation_list.indexOf(operation_number), 1);
                    } else {
                        next_train_operation_list = [];
                    }
                    
                    if (config["simplify_operation_details"] || operations_list.toString() === next_train_operation_list.toString() ) {
                        continue;
                    }
                } else {
                    next_train_operation_list = null;
                }
                
                buf += "<div class='" + train_div_class_name + "'>";
                
                buf += "<div onclick='train_detail(\"" + trains[cnt]["line_id"] + "\", \"" + trains[cnt]["train_number"] + "\", \"" + trains[cnt]["starting_station"] + "\", \"" + trains[cnt]["direction"] + "_trains\", false, " + is_today + ");'><b style='color: " + (config["dark_mode"] ? convert_font_color_dark_mode(get_train_color(trains[cnt]["train_number"])) : get_train_color(trains[cnt]["train_number"])) + ";'><u>";
                
                if (trains[cnt]["train_number"] in timetable["timetable"][trains[cnt]["line_id"]][trains[cnt]["direction"] + "_trains"]) {
                    for (var timetable_train of timetable["timetable"][trains[cnt]["line_id"]][trains[cnt]["direction"] + "_trains"][trains[cnt]["train_number"]]) {
                        if (timetable_train["starting_station"] === trains[cnt]["starting_station"]) {
                            if (config["simplify_operation_details"]) {
                                buf += timetable_train["train_type"].substring(0, 1) + " ";
                            } else {
                                buf += timetable_train["train_type"] + "　";
                            }
                            
                            break;
                        }
                    }
                } else {
                    if (railroad_info["deadhead_train_number_regexp"].test(trains[cnt]["train_number"])) {
                        if (config["simplify_operation_details"]) {
                            buf += "回 ";
                        } else {
                            buf += "回送　";
                        }
                    }
                }
                
                var train_number_text = trains[cnt]["train_number"].split("__")[0];
                if (search_keyword !== null && train_number_text.toUpperCase().includes(search_keyword)) {
                    var search_keyword_index = train_number_text.toUpperCase().indexOf(search_keyword);
                    buf += escape_html(train_number_text.substring(0, search_keyword_index)) + "<span class='search_highlight'>" + escape_html(train_number_text.substring(search_keyword_index, search_keyword_index + search_keyword.length)) + "</span>" + escape_html(train_number_text.substring(search_keyword_index + search_keyword.length));
                } else {
                    buf += escape_html(train_number_text);
                }
                
                buf += "</u><small>(";
                if (trains[cnt]["position_forward"] !== trains[cnt]["position_rear"]) {
                    buf += trains[cnt]["position_forward"] + "-" + trains[cnt]["position_rear"];
                } else {
                    buf += trains[cnt]["position_forward"];
                }
                if (!config["simplify_operation_details"]) {
                    buf += "両目";
                }
                buf += ")</small></b>";
                
                if (is_today && trains[cnt]["final_arrival_time"] < now_str) {
                    highlight_str = "";
                }
                
                if (config["simplify_operation_details"]) {
                    for (var station of railroad_info["lines"][trains[cnt]["line_id"]]["stations"]) {
                        if (station["station_name"] === trains[cnt]["terminal_station"]) {
                            var terminal_station = station["station_initial"];
                            break;
                        }
                    }
                } else {
                    var terminal_station = trains[cnt]["terminal_station"];
                }
                
                buf += "<div" + highlight_str + "><span>" + starting_station + " " + first_departure_time + "</span><span>→</span><span>" + trains[cnt]["final_arrival_time"] + " " + terminal_station + "</span></div></div>";
                
                if (!config["simplify_operation_details"] && operations_list.length >= 1) {
                    buf += "<div class='coupling_info'>併結:";
                    for (var coupling_operation of operations_list) {
                        buf += " <u onclick='operation_detail(\"" + coupling_operation + "\", " + diagram_id_or_ts + ");'>" + coupling_operation + "運用";
                        if (operation_data !== null) {
                            buf += "<small>(" + (coupling_operation in operation_data["operations"] && operation_data["operations"][coupling_operation] !== null ? escape_html(operation_data["operations"][coupling_operation]["formations"]) : "情報なし") + ")</small>";
                        }
                        buf += "</u>";
                    }
                    buf += "</div>";
                }
                
                buf += "</div>";
                
                starting_station = null;
            }
            
            if (is_today && search_keyword === null && trains[cnt]["final_arrival_time"] < now_str) {
                highlight_str = " class='search_highlight'";
            } else {
                highlight_str = "";
            }
        }
        
        buf += "<div class='" + train_div_class_name + "'><b class='train_overview_location'>" + operation_table["operations"][operation_number]["terminal_location"];
        if (operation_table["operations"][operation_number]["terminal_track"] !== null) {
            buf += "<small>(" + operation_table["operations"][operation_number]["terminal_track"] + ")</small>";
        }
        buf += " 入庫</b><time>" + operation_table["operations"][operation_number]["ending_time"] + "</time></div>";
    } else {
        buf += " 待機</b><time datetime='PT24H'>運行なし</time>";
    }
    
    document.getElementById("operation_trains_area").innerHTML = buf;
}

function change_simplify_operation_details (bool_val, operation_number, operation_table_name_or_ts, is_today, search_keyword) {
    config["simplify_operation_details"] = bool_val;
    
    save_config();
    
    draw_operation_trains(operation_number, operation_table_name_or_ts, is_today, search_keyword);
}

function previous_operation_number (operation_number_or_index, operation_data_date_ts_or_operation_name) {
    if (typeof operation_number_or_index === "string") {
        for (var group_index = 0; group_index < operation_table["operation_groups"].length; group_index++) {
            if (operation_table["operation_groups"][group_index]["operation_group_name"] === operation_table["operations"][operation_number_or_index]["operation_group_name"]) {
                break;
            }
        }
        
        var operation_numbers = operation_table["operation_groups"][group_index]["operation_numbers"];
        var operation_number_index = operation_numbers.indexOf(operation_number_or_index);
        
        if (operation_number_index >= 1) {
            operation_detail(operation_numbers[operation_number_index - 1], operation_data_date_ts_or_operation_name);
        } else {
            group_index = group_index >= 1 ? group_index - 1 : operation_table["operation_groups"].length - 1;
            
            operation_detail(operation_table["operation_groups"][group_index]["operation_numbers"][operation_table["operation_groups"][group_index]["operation_numbers"].length - 1], operation_data_date_ts_or_operation_name);
        }
    } else {
        if (operation_number_or_index >= 1) {
            operation_detail(operation_number_or_index - 1, operation_data_date_ts_or_operation_name);
        } else {
            operation_detail(operation_number_order.length - 1, operation_data_date_ts_or_operation_name);
        }
    }
}

function next_operation_number (operation_number_or_index, operation_data_date_ts_or_operation_name) {
    if (typeof operation_number_or_index === "string") {
        for (var group_index = 0; group_index < operation_table["operation_groups"].length; group_index++) {
            if (operation_table["operation_groups"][group_index]["operation_group_name"] === operation_table["operations"][operation_number_or_index]["operation_group_name"]) {
                break;
            }
        }
        
        var operation_numbers = operation_table["operation_groups"][group_index]["operation_numbers"];
        var operation_number_index = operation_numbers.indexOf(operation_number_or_index);
        
        if (operation_number_index < operation_numbers.length - 1) {
            operation_detail(operation_numbers[operation_number_index + 1], operation_data_date_ts_or_operation_name);
        } else {
            group_index = group_index < operation_table["operation_groups"].length - 1 ? group_index + 1 : 0;
            
            operation_detail(operation_table["operation_groups"][group_index]["operation_numbers"][0], operation_data_date_ts_or_operation_name);
        }
    } else {
        if (operation_number_or_index < operation_number_order.length - 1) {
            operation_detail(operation_number_or_index + 1, operation_data_date_ts_or_operation_name);
        } else {
            operation_detail(0, operation_data_date_ts_or_operation_name);
        }
    }
}


var car_number_search_elm = document.getElementById("car_number_search");
var formation_table_area_elm = document.getElementById("formation_table_area");

var selected_formation_name = null;

var formation_table_drop_down_status;
var formation_table_wrapper_scroll_amount;

function formations_mode (formation_name = null) {
    change_mode(3);
    
    operation_table = null;
    timetable = null;
    operation_data = null;
    
    car_number_search_elm.value = "";
    formation_table_area_elm.innerHTML = "";
    formation_table_drop_down_status = {};
    formation_table_wrapper_scroll_amount = 0;
    
    var label_elm = document.getElementById("colorize_formation_table_label");
    if (formation_styles_available) {
        label_elm.style.display = "inline-block";
        
        document.getElementById("colorize_formation_table").checked = config["colorize_formation_table"];
    } else {
        label_elm.style.display = "none";
    }
    
    document.getElementById("show_unregistered_formations").checked = config["show_unregistered_formations_on_formation_table"];
    
    if (formation_name === null) {
        draw_formation_table();
    } else {
        formation_detail(formation_name);
    }
}

function formation_table_wrapper_onscroll () {
    if (selected_formation_name === null) {
        formation_table_wrapper_scroll_amount = article_elms[3].scrollTop;
    }
}

function get_formation_table_html (formation_names, search_keyword) {
    var buf = "";
    var search_hit_formation_count = 0;
    var search_hit_formations_car_count = 0;
    for (var formation_name of formation_names) {
        if (search_keyword.length >= 1 && formation_name.includes(search_keyword)) {
            var search_keyword_index = formation_name.indexOf(search_keyword);
            var formation_name_html = escape_html(formation_name.substring(0, search_keyword_index)) + "<span class='search_highlight'>" + escape_html(formation_name.substring(search_keyword_index, search_keyword_index + search_keyword.length)) + "</span>" + escape_html(formation_name.substring(search_keyword_index + search_keyword.length));
            
            var formation_name_search_hit = true;
        } else {
            var formation_name_html = escape_html(formation_name);
            var formation_name_search_hit = false;
        }
        
        if ("cars" in formations["formations"][formation_name]) {
            var overview = get_formation_overview(formation_name);
            
            var buf_2 = "<tr onclick='formation_detail(\"" + add_slashes(formation_name) + "\");'><td><img src='" + get_icon(formation_name) + "' alt='' class='train_icon'" + (overview["unavailable"] ? " style='opacity: 0.5;'" : "") + "></td>";
            
            buf_2 += "<td><h5><a href='/railroad_" + railroad_info["railroad_id"] + "/formations/" + add_slashes(encodeURIComponent(formation_name)) + "/' onclick='event.preventDefault();'>" + formation_name_html + "</a>";
            
            if (overview["unavailable"]) {
                buf_2 += "<b class='warning_sentence'>運用離脱中</b>";
            } else if (overview["caption"].length >= 1) {
                buf_2 += escape_html(overview["caption"]);
            }
            
            buf_2 += "</h5>";
            
            var search_hit_count = 0;
            for (var car of formations["formations"][formation_name]["cars"]) {
                var car_class = "";
                
                if (search_keyword.length >= 1) {
                    if (car["car_number"].toUpperCase().includes(search_keyword) || car["abbr_number"].toUpperCase().includes(search_keyword)) {
                        car_class =  "car_highlight";
                        
                        search_hit_count++;
                    } else if (formation_name_search_hit) {
                        search_hit_count++;
                    }
                } else {
                    search_hit_count++;
                }
                
                if ("equipment" in car) {
                    for (var equipment of car["equipment"]) {
                        car_class += (car_class.length >= 1 ? " " : "") + "car_" + equipment;
                    }
                }
                
                if (formation_styles_available && config["colorize_formation_table"] && "coloring_id" in car) {
                    car_class += (car_class.length >= 1 ? " " : "") + "car_coloring_" + car["coloring_id"];
                }
                
                buf_2 += "<div class='" + car_class + "'>" + escape_html(car["abbr_number"]) + "<span></span><span></span></div>";
            }
            
            buf_2 += "</td></tr>";
            
            if (search_hit_count >= 1) {
                buf += buf_2;
                search_hit_formation_count++;
                search_hit_formations_car_count += search_hit_count;
            }
        } else if (config["show_unregistered_formations_on_formation_table"]) {
            if (search_keyword.length == 0 || formation_name.includes(search_keyword)) {
                if ("new_formation_name" in formations["formations"][formation_name]) {
                buf += "<tr onclick='formation_detail(\"" + add_slashes(formation_name) + "\");' class='renamed_formation'><td><img src='" + UNYOHUB_GENERIC_TRAIN_ICON + "' alt='' class='train_icon'></td><td><h5><a href='/railroad_" + (formations["formations"][formation_name]["new_railroad_id"] === null ? railroad_info["railroad_id"] : formations["formations"][formation_name]["new_railroad_id"]) + "/formations/" + add_slashes(encodeURIComponent(formations["formations"][formation_name]["new_formation_name"])) + "/' onclick='event.preventDefault();'>" + formation_name_html + "</a></h5>" + (formations["formations"][formation_name]["new_railroad_id"] === null ? escape_html(formations["formations"][formation_name]["new_formation_name"]) + " に改番" : "転出済み") + "</td>";
                } else {
                    buf += "<tr onclick='formation_detail(\"" + add_slashes(formation_name) + "\");' class='unregistered_formation'><td><img src='" + UNYOHUB_GENERIC_TRAIN_ICON + "' alt='' class='train_icon'></td><td><h5><a href='/railroad_" + railroad_info["railroad_id"] + "/formations/" + add_slashes(encodeURIComponent(formation_name)) + "/' onclick='event.preventDefault();'>" + formation_name_html + "</a></h5>除籍済み</td>";
                }
                
                if (search_keyword.length >= 1) {
                    search_hit_formation_count++;
                }
            }
        }
    }
    
    return [buf, search_hit_formation_count, search_hit_formations_car_count];
}

function draw_formation_table (update_title = true) {
    if (update_title) {
        change_title(railroad_info["railroad_name"] + "の編成表 | " + instance_info["instance_name"], "/railroad_" + railroad_info["railroad_id"] + "/formations/");
    }
    
    document.getElementById("formation_screenshot_button").style.display = "none";
    document.getElementById("formation_back_button").style.display = "none";
    
    var search_keyword = str_to_halfwidth(car_number_search_elm.value).toUpperCase();
    
    var buf = ""
    for (var series_name of formations["series_names"]) {
        if ("subseries_names" in formations["series"][series_name]) {
            var buf_2 = "";
            var search_hit_formation_count = 0;
            var search_hit_formations_car_count = 0;
            
            for (var subseries_name of formations["series"][series_name]["subseries_names"]) {
                var [buf_3, subseries_search_hit_formation_count, subseries_search_hit_formations_car_count] = get_formation_table_html(formations["series"][series_name]["subseries"][subseries_name]["formation_names"], search_keyword);
                
                if (buf_3.length >= 1) {
                    buf_2 += "<tr><th colspan='2'>" + escape_html(subseries_name) + "</th></tr>" + buf_3;
                    search_hit_formation_count += subseries_search_hit_formation_count;
                    search_hit_formations_car_count += subseries_search_hit_formations_car_count;
                }
            }
        } else {
            var [buf_2, search_hit_formation_count, search_hit_formations_car_count] = get_formation_table_html(formations["series"][series_name]["formation_names"], search_keyword);
        }
        
        if (buf_2.length >= 1) {
            var checkbox_id = "series_" + series_name;
            
            buf += "<input type='checkbox' id='" + checkbox_id + "'" + (checkbox_id in formation_table_drop_down_status && formation_table_drop_down_status[checkbox_id] ? " checked='checked'" : "") + " onclick='update_formation_table_drop_down_status(this);'>";
            buf += "<label for='" + checkbox_id + "' class='drop_down'>" + escape_html(series_name) + (search_keyword.length >= 1 ? " (" + search_hit_formation_count + "編成該当)" : "") + "</label>";
            buf += "<div id='formation_table_" + checkbox_id + "'><h3 class='formation_table_series_name'>" + escape_html(series_name) + "</h3><button type='button' class='screenshot_button' onclick='take_screenshot(\"formation_table_" + checkbox_id + "\");' aria-label='スクリーンショット'></button><table class='formation_table'><tr><td colspan='2'>" + search_hit_formation_count + "編成 " + search_hit_formations_car_count + "両 " + (search_keyword.length >= 1 ? "該当" : "在籍中") + "" + buf_2 + "</td></tr></table></div>";
        }
    }
    
    if (buf.length !== 0) {
        buf += "<div class='informational_text'>";
        buf += "編成表更新日時: " + get_date_and_time(formations["last_modified_timestamp"]) + "<br>";
        buf += "車両アイコン更新日時: " + get_date_and_time(train_icons["last_modified_timestamp"]) + "<br>";
        buf += "編成概要更新日時: " + get_date_and_time(formation_overviews["last_modified_timestamp"]);
        buf += "</div>";
        
        formation_table_area_elm.innerHTML = buf;
    } else {
        formation_table_area_elm.innerHTML = "<div class='no_data'>検索キーワードを含む車両が見つかりません。" + (config["show_unregistered_formations_on_formation_table"] ? "<br>除籍・転出済みの車両は編成名でのみ検索可能です。" : "") + "</div>";
    }
    
    document.getElementById("formation_search_area").style.display = "block";
    selected_formation_name = null;
    
    article_elms[3].scrollTop = formation_table_wrapper_scroll_amount;
}

function change_colorize_formation_table (bool_val) {
    config["colorize_formation_table"] = bool_val;
    
    save_config();
    
    draw_formation_table(false);
}

function change_show_unregistered_formations (bool_val) {
    config["show_unregistered_formations_on_formation_table"] = bool_val;
    
    save_config();
    
    draw_formation_table(false);
}

function update_formation_table_drop_down_status (elm) {
    formation_table_drop_down_status[elm.id] = elm.checked;
}

function get_operation_data_html (data, ts, clickable = true, no_data_text = "情報がありません") {
    if (data !== null) {
        buf = "";
        for (var data_item of data) {
            if (clickable) {
                buf += "<div class='key_and_value' onclick='operation_detail(\"" + add_slashes(data_item["operation_number"]) + "\", " + ts + ", false);'><u>" + escape_html(data_item["operation_number"]) + "</u>";
            } else {
                buf += "<div class='key_and_value'><b>" + escape_html(data_item["operation_number"]) + "</b>";
            }
            
            if ("relieved_formations" in data_item) {
                var buf_2 = "";
                for (var relieved_formation of data_item["relieved_formations"]) {
                    buf_2 += (buf_2.length >= 1 ? "<br>→ " : "") + (relieved_formation !== "" ? escape_html(relieved_formation) : "運休");
                }
                buf += "<span class='relieved_formations'>" + buf_2 + "</span><br>→ ";
            }
            
            buf += (data_item["formations"] !== "" ? escape_html(data_item["formations"]) : "運休") + "</div>";
        }
        
        return buf;
    } else {
        return "<div class='descriptive_text'>" + no_data_text + "</div>";
    }
}

function get_previous_formation (formation_name, series_name, subseries_name = null) {
    var formation_list = subseries_name !== null ? formations["series"][series_name]["subseries"][subseries_name]["formation_names"] : formations["series"][series_name]["formation_names"];
    var formation_index = formation_list.indexOf(formation_name);
    
    var previous_subseries_name = subseries_name;
    if (formation_index >= 1) {
        var previous_series_name = series_name;
        var previous_formation_name = formation_list[formation_index - 1];
    } else {
        var series_index = formations["series_names"].indexOf(series_name);
        if (series_index >= 1) {
            var previous_series_name = formations["series_names"][series_index - 1];
        } else {
            var previous_series_name = formations["series_names"][formations["series_names"].length - 1];
        }
        
        var previous_formation_name = null;
        if ("subseries_name" in formations["formations"][formation_name]) {
            var subseries_index = formations["series"][series_name]["subseries_names"].indexOf(formations["formations"][formation_name]["subseries_name"]);
            if (subseries_index >= 1) {
                previous_subseries_name = formations["series"][series_name]["subseries_names"][subseries_index - 1];
                var previous_subseries_formation_names = formations["series"][series_name]["subseries"][previous_subseries_name]["formation_names"];
                
                previous_formation_name = previous_subseries_formation_names[previous_subseries_formation_names.length - 1];
            }
        }
        
        if (previous_formation_name === null) {
            if ("subseries_names" in formations["series"][previous_series_name]) {
                previous_subseries_name = formations["series"][previous_series_name]["subseries_names"][formations["series"][previous_series_name]["subseries_names"].length - 1];
                var formation_list = formations["series"][previous_series_name]["subseries"][previous_subseries_name]["formation_names"];
            } else {
                previous_subseries_name = null;
                var formation_list = formations["series"][previous_series_name]["formation_names"];
            }
            
            previous_formation_name = formation_list[formation_list.length - 1];
        }
    }
    
    if ("cars" in formations["formations"][previous_formation_name]) {
        return previous_formation_name;
    } else {
        return get_previous_formation(previous_formation_name, previous_series_name, previous_subseries_name);
    }
}

function get_next_formation (formation_name, series_name, subseries_name = null) {
    var formation_list = subseries_name !== null ? formations["series"][series_name]["subseries"][subseries_name]["formation_names"] : formations["series"][series_name]["formation_names"];
    var formation_index = formation_list.indexOf(formation_name);
    
    var next_subseries_name = subseries_name;
    if (formation_index <= formation_list.length - 2) {
        var next_series_name = series_name;
        var next_formation_name = formation_list[formation_index + 1];
    } else {
        var series_index = formations["series_names"].indexOf(series_name);
        if (series_index <= formations["series_names"].length - 2) {
            var next_series_name = formations["series_names"][series_index + 1];
        } else {
            var next_series_name = formations["series_names"][0];
        }
        
        var next_formation_name = null;
        if ("subseries_name" in formations["formations"][formation_name]) {
            var subseries_index = formations["series"][series_name]["subseries_names"].indexOf(formations["formations"][formation_name]["subseries_name"]);
            if (subseries_index <= formations["series"][series_name]["subseries_names"].length - 2) {
                next_series_name = formations["series"][series_name]["subseries_names"][subseries_index + 1];
                
                next_formation_name = formations["series"][series_name]["subseries"][next_series_name]["formation_names"][0];
            }
        }
        
        if (next_formation_name === null) {
            if ("subseries_names" in formations["series"][next_series_name]) {
                next_subseries_name = formations["series"][next_series_name]["subseries_names"][0];
                next_formation_name = formations["series"][next_series_name]["subseries"][next_subseries_name]["formation_names"][0];
            } else {
                next_subseries_name = null;
                next_formation_name = formations["series"][next_series_name]["formation_names"][0];
            }
        }
    }
    
    if ("cars" in formations["formations"][next_formation_name]) {
        return next_formation_name;
    } else {
        return get_next_formation(next_formation_name, next_series_name, next_subseries_name);
    }
}

function formation_detail (formation_name) {
    if ("new_formation_name" in formations["formations"][formation_name]) {
        if (formations["formations"][formation_name]["new_railroad_id"] === null) {
            formation_detail(formations["formations"][formation_name]["new_formation_name"]);
        } else {
            select_railroad(formations["formations"][formation_name]["new_railroad_id"], "formations_mode", formations["formations"][formation_name]["new_formation_name"]);
        }
        
        return;
    }
    
    document.getElementById("formation_search_area").style.display = "none";
    formation_table_area_elm.innerHTML = "";
    
    selected_formation_name = formation_name;
    
    document.getElementById("formation_screenshot_button").style.display = "block";
    document.getElementById("formation_back_button").style.display = "block";
    
    if ("cars" in formations["formations"][formation_name]) {
        var series_name = formations["formations"][formation_name]["series_name"];
        
        change_title(series_name + " " + formation_name + " (" + railroad_info["railroad_name"] + ") の編成情報・運用 | " + instance_info["instance_name"], "/railroad_" + railroad_info["railroad_id"] + "/formations/" + encodeURIComponent(formation_name) + "/");
        
        var previous_formation_name = get_previous_formation(formation_name, series_name, "subseries_name" in formations["formations"][formation_name] ? formations["formations"][formation_name]["subseries_name"] : null);
        var next_formation_name = get_next_formation(formation_name, series_name, "subseries_name" in formations["formations"][formation_name] ? formations["formations"][formation_name]["subseries_name"] : null);
        
        var buf = "<div class='heading_wrapper'><a href='/railroad_" + railroad_info["railroad_id"] + "/formations/" + encodeURIComponent(previous_formation_name) + "/' class='previous_button' onclick='event.preventDefault(); formation_detail(\"" + add_slashes(previous_formation_name) + "\");'>" + escape_html(previous_formation_name) + "</a><h2>" + escape_html(formation_name) + "</h2><a href='/railroad_" + railroad_info["railroad_id"] + "/formations/" + encodeURIComponent(next_formation_name) + "/' class='next_button' onclick='event.preventDefault(); formation_detail(\"" + add_slashes(next_formation_name) + "\");'>" + escape_html(next_formation_name) + "</a></div>";
        
        var overview = get_formation_overview(formation_name);
        
        buf += "<img src='" + get_icon(formation_name) + "' alt='" + add_slashes(series_name) + "' class='train_icon_large'>";
        buf += "<strong id='formation_caption'>" + overview["caption"] + "</strong>";
    } else {
        change_title(formation_name + " (" + railroad_info["railroad_name"] + ") の編成情報 | " + instance_info["instance_name"], "/railroad_" + railroad_info["railroad_id"] + "/formations/" + encodeURIComponent(formation_name) + "/");
        
        var buf = "<div class='heading_wrapper'><h2>" + escape_html(formation_name) + "</h2></div>";
        
        var overview = null;
        
        buf += "<img src='" + UNYOHUB_GENERIC_TRAIN_ICON + "' alt='' class='train_icon_large' style='opacity: 0.5;'>";
        buf += "<strong id='formation_caption'></strong>";
    }
    
    buf += "<div id='formation_operations_area'></div>";
    if (navigator.onLine) {
        buf += "<button type='button' class='execute_button' onclick='operation_data_history(\"" + add_slashes(formation_name) + "\");'>過去30日間の運用</button>";
    }
    
    buf += "<div id='semifixed_formation_area'></div>";
    
    buf += "<h3>基本情報</h3>";
    buf += "<div class='key_and_value'><b>車両形式</b><span id='formation_series_name'>" + ("series_name" in formations["formations"][formation_name] ? escape_html(series_name + ("subseries_name" in formations["formations"][formation_name] ? " " + formations["formations"][formation_name]["subseries_name"] : "")) : "") + "</div>";
    buf += "<div class='key_and_value' id='formation_affiliation'></div>";
    
    buf += "<div class='descriptive_text' id='formation_description'></div>";
    
    buf += "<h3>検査情報</h3>";
    if (overview === null) {
        buf += "<div class='descriptive_text warning_sentence' id='inspection_information'>除籍済み</div>";
    } else if (overview["unavailable"]) {
        buf += "<div class='descriptive_text warning_sentence' id='inspection_information'>運用離脱中</div>";
    } else {
        buf += "<div class='descriptive_text' id='inspection_information'>情報がありません</div>";
    }
    
    buf += "<h3>車両情報</h3>";
    buf += "<table id='car_info_table'>";
    if ("cars" in formations["formations"][formation_name]) {
        for (var cnt = 0; cnt < formations["formations"][formation_name]["cars"].length; cnt++) {
            var car_class = "";
            if ("equipment" in formations["formations"][formation_name]["cars"][cnt]) {
                for (var equipment of formations["formations"][formation_name]["cars"][cnt]["equipment"]) {
                    car_class += (car_class.length >= 1 ? " " : "") + "car_info_car_" + equipment;
                }
            }
            
            if (formation_styles_available && "coloring_id" in formations["formations"][formation_name]["cars"][cnt] && formations["formations"][formation_name]["cars"][cnt]["coloring_id"] in formations["body_colorings"]) {
                var coloring_data = formations["body_colorings"][formations["formations"][formation_name]["cars"][cnt]["coloring_id"]];
                
                var car_style = "style='background-color: " + coloring_data["base_color"] + "; color: " + coloring_data["font_color"] + ";'";
            } else {
                var car_style = "";
            }
            
            buf += "<tr>";
            
            if (cnt === 0) {
                buf += "<td rowspan='" + formations["formations"][formation_name]["cars"].length + "'><span>▲" + escape_html(railroad_info["alias_of_forward_direction"]) + "</span></td>";
            }
            
            buf += "<td class='" + car_class + "' " + car_style + "></td><td><b>" + escape_html(formations["formations"][formation_name]["cars"][cnt]["car_number"]) + "</b><span id='car_info_" + cnt + "'></span><div class='descriptive_text' id='car_description_" + cnt + "'></div></td></tr>";
        }
    }
    buf += "</table>";
    
    buf += "<h3>車歴</h3>";
    buf += "<div id='histories_area'><div class='descriptive_text'>車歴データがありません</div></div>";
    
    buf += "<div id='formation_updated_area' class='informational_text'></div>"
    
    formation_table_area_elm.innerHTML = buf;
    article_elms[3].scrollTop = 0;
    
    var formation_operations_area_elm = document.getElementById("formation_operations_area");
    var histories_area_elm = document.getElementById("histories_area");
    
    if (navigator.onLine) {
        formation_operations_area_elm.className = "loading_icon";
        histories_area.className = "loading_icon";
        
        ajax_post("formation_details.php", "railroad_id=" + escape_form_data(railroad_info["railroad_id"]) + "&formation_name=" + escape_form_data(formation_name), function (response) {
            if (response !== false) {
                var data = JSON.parse(response);
                
                if (data["caption"] !== null) {
                    document.getElementById("formation_caption").innerText = data["caption"];
                }
                
                document.getElementById("formation_series_name").innerText = data["series_name"] + ("subseries_name" in data ? " " + data["subseries_name"] : "");
                
                if (data["affiliation"] !== null && data["affiliation"].length >= 1) {
                    document.getElementById("formation_affiliation").innerHTML = "<b>" + ("cars" in formations["formations"][formation_name] ? "" : "最終") + "所属</b>" + escape_html(data["affiliation"]);
                }
                
                document.getElementById("formation_description").innerText = data["description"];
                
                var inspection_information_area = document.getElementById("inspection_information");
                if (data["inspection_information"] !== null) {
                    inspection_information_area.innerText = data["inspection_information"];
                }
                
                if (!("unavailable" in data)) {
                    inspection_information_area.classList.add("warning_sentence");
                    
                    if (inspection_information_area.innerText.length == 0) {
                        inspection_information_area.innerText = "除籍済み";
                    }
                } else if (data["unavailable"]) {
                    inspection_information_area.classList.add("warning_sentence");
                    
                    if (inspection_information_area.innerText.length == 0) {
                        inspection_information_area.innerText = "運用離脱中";
                    }
                } else {
                    inspection_information_area.classList.remove("warning_sentence");
                    
                    if (inspection_information_area.innerText.length == 0) {
                        inspection_information_area.innerText = "情報がありません";
                    }
                }
                
                var car_info_table_elm = document.getElementById("car_info_table");
                if (car_info_table_elm.children.length >= 1) {
                    for (var cnt = 0; cnt < data["cars"].length; cnt++) {
                        document.getElementById("car_info_" + cnt).innerText = data["cars"][cnt]["manufacturer"] + " " + data["cars"][cnt]["constructed"];
                        document.getElementById("car_description_" + cnt).innerText = data["cars"][cnt]["description"];
                    }
                } else {
                    var buf = "";
                    for (var cnt = 0; cnt < data["cars"].length; cnt++) {
                        buf += "<tr>";
                        
                        if (cnt === 0) {
                            buf += "<td rowspan='" + data["cars"].length + "'><span>▲" + escape_html(railroad_info["alias_of_forward_direction"]) + "</span></td>";
                            
                            var car_class = "car_info_car_C1";
                        } else if (cnt === data["cars"].length - 1) {
                            var car_class = "car_info_car_C2";
                        } else {
                            var car_class = "";
                        }
                        
                        buf += "<td class='" + car_class + "'></td><td><b>" + escape_html(data["cars"][cnt]["car_number"]) + "</b><span>" + escape_html(data["cars"][cnt]["manufacturer"] + " " + data["cars"][cnt]["constructed"]) + "</span><div class='descriptive_text'>" + escape_html(data["cars"][cnt]["description"]) + "</div></td></tr>";
                    }
                    
                    car_info_table_elm.innerHTML = buf;
                }
                
                if ("semifixed_formation" in data) {
                    var buf = "";
                    for (var semifixed_formation of data["semifixed_formation"].split("+")) {
                        buf += (buf.length >= 1 ? " + " : "") + (semifixed_formation !== formation_name ? "<a href='/railroad_" + railroad_info["railroad_id"] + "/formations/" + encodeURIComponent(semifixed_formation) + "/' onclick='event.preventDefault(); formation_detail(\"" + add_slashes(semifixed_formation) + "\");'>" : "<b>") + "<img src='" + get_icon(semifixed_formation) + "' alt='' class='train_icon'>" + escape_html(semifixed_formation) + (semifixed_formation !== formation_name ? "</a>" : "</b>");
                    }
                    
                    document.getElementById("semifixed_formation_area").innerHTML = "<h3>半固定編成</h3><div>" + buf + "</div>";
                }
                
                var buf = "<input type='checkbox' id='formation_operations'><label for='formation_operations' class='drop_down'>運用情報</label>";
                if (data["operations_today"] !== null || data["operations_tomorrow"] !== null) {
                    var ts = get_timestamp();
                    
                    buf += "<div><div class='formation_operation_data'><h4>今日の運用情報</h4>" + get_operation_data_html(data["operations_today"], ts) + "</div>";
                    buf += "<div class='formation_operation_data'><h4>明日の運用情報</h4>" + get_operation_data_html(data["operations_tomorrow"], ts + 86400, true, "明日の運用情報は判明していません") + "</div></div>";
                } else if (data["last_seen_date"] !== null) {
                    var last_seen_date_split = data["last_seen_date"].split("-");
                    var dt = new Date(data["last_seen_date"] + " 12:00:00");
                    
                    buf += "<div><div class='formation_operation_data_last_seen'><h4>最終目撃情報(" + last_seen_date_split[0] + "/" + Number(last_seen_date_split[1]) + "/" + Number(last_seen_date_split[2]) + ")</h4>" + get_operation_data_html(data["operations_last_day"], Math.floor(dt.getTime() / 1000)) + "</div></div>";
                } else {
                    buf += "<div><div class='descriptive_text'>この編成の運用情報が投稿されたことはありません</div></div>";
                }
                
                formation_operations_area_elm.innerHTML = buf;
                
                var event_type_ja = { construct : "新製", modify : "改修", repaint : "塗装変更", renewal : "更新", transfer : "転属", rearrange : "組換", unregister : "廃車", other : "その他" };
                
                var buf = "";
                for (var history of data["histories"]) {
                    if (history["event_year_month"].length === 4) {
                        var event_year_month = history["event_year_month"] + "年";
                    } else {
                        var event_year_month = history["event_year_month"].substring(0, 4) + "年" + Number(history["event_year_month"].substring(5)) + "月";
                    }
                    
                    buf += "<div class='history_item'><time datetime='" + history["event_year_month"] + "'>" + event_year_month + "</time><h5 class='event_type_" + history["event_type"] + "'>" + event_type_ja[history["event_type"]] + "</h5><br>" + convert_to_html(history["event_content"]) + "</div>";
                }
                
                if (buf.length >= 1) {
                    histories_area_elm.innerHTML = buf;
                }
                
                document.getElementById("formation_updated_area").innerText = "編成情報更新日時: " + get_date_and_time(data["updated_timestamp"]) + ("edited_user_name" in data ? " (" + data["edited_user_name"] + ")" : "");
            }
        });
    }
}

function operation_data_history (formation_name, operation_number = null) {
    var popup_inner_elm = open_popup("data_history_popup", "運用履歴", true);
    
    popup_inner_elm.innerHTML = "";
    popup_inner_elm.className = "wait_icon";
    
    if (operation_number === null) {
        var post_q = "formation_name=" + escape_form_data(formation_name);
        var subtitle = formation_name;
    } else {
        var post_q = "operation_number=" + escape_form_data(operation_number);
        var subtitle = operation_number + "運用";
    }
    
    var ts = get_timestamp();
    var operation_data_date = get_date_string(ts);
    if (operation_table === null) {
        var load_data_promise = new Promise(function (resolve, reject) {
            get_diagram_id(operation_data_date, function (diagram_data) {
                load_data(resolve, null, reject, diagram_data["diagram_revision"], diagram_data["diagram_id"], null, operation_data_date);
            });
        });
    } else {
        var load_data_promise = Promise.resolve();
    }
    
    load_data_promise.then(function () {
        ajax_post("operation_data_history.php", "railroad_id=" + escape_form_data(railroad_info["railroad_id"]) + "&" + post_q, function (response) {
            const YOBI_LIST = ["日", "月", "火", "水", "木", "金", "土"];
            
            if (response !== false) {
                var buf = "<h3>" + escape_html(subtitle) + "</h3>";
                
                var data = JSON.parse(response);
                
                var day_value = new Date((ts - 10800) * 1000).getDay();
                for (var cnt = 0; cnt < 30; cnt++) {
                    var yyyy_mm_dd = get_date_string(ts);
                    
                    buf += "<h4>" + Number(yyyy_mm_dd.substring(5, 7)) + "月" + Number(yyyy_mm_dd.substring(8)) + "日 (" + YOBI_LIST[day_value] + ")</h4>";
                    if (yyyy_mm_dd in data) {
                        buf += get_operation_data_html(data[yyyy_mm_dd], ts, (operation_table !== null && get_diagram_revision(yyyy_mm_dd) === operation_table["diagram_revision"]));
                    } else {
                        buf += "<div class='descriptive_text'>情報がありません</div>";
                    }
                    
                    ts -= 86400;
                    day_value = (day_value !== 0 ? day_value - 1 : 6);
                }
                
                popup_inner_elm.innerHTML = buf;
            }
        });
    });
}


function get_icon (formation_name, railroad_id = null) {
    if (formation_name === null || formation_name === "?") {
        return UNYOHUB_UNKNOWN_TRAIN_ICON;
    }
    
    if (formation_name === "") {
        return UNYOHUB_CANCELED_TRAIN_ICON;
    }
    
    if (railroad_id === null) {
        if (formation_name in formations["formations"]) {
            if ("icon_id" in formations["formations"][formation_name] && formations["formations"][formation_name]["icon_id"] in train_icons["icons"]) {
                return train_icons["icons"][formations["formations"][formation_name]["icon_id"]];
            }
        } else if (formation_name in series_icon_ids) {
            if (series_icon_ids[formation_name] in train_icons["icons"]) {
                return train_icons["icons"][series_icon_ids[formation_name]];
            }
        }
    } else {
        if (formation_name in joined_railroad_formations[railroad_id]["formations"]) {
            if ("icon_id" in joined_railroad_formations[railroad_id]["formations"][formation_name] && joined_railroad_formations[railroad_id]["formations"][formation_name]["icon_id"] in joined_railroad_train_icons[railroad_id]["icons"]) {
                return joined_railroad_train_icons[railroad_id]["icons"][joined_railroad_formations[railroad_id]["formations"][formation_name]["icon_id"]];
            }
        } else if (formation_name in joined_railroad_series_icon_ids[railroad_id]) {
            if (joined_railroad_series_icon_ids[railroad_id][formation_name] in joined_railroad_train_icons[railroad_id]["icons"]) {
                return joined_railroad_train_icons[railroad_id]["icons"][joined_railroad_series_icon_ids[railroad_id][formation_name]];
            }
        }
    }
    
    return UNYOHUB_GENERIC_TRAIN_ICON;
}

function get_train_color (train_name, default_value = "inherit") {
    for (var train_color_rule of railroad_info["train_color_rules"]) {
        if (train_color_rule["regexp"].test(train_name)) {
            return train_color_rule["color"];
        }
    }
    
    return default_value;
}

function get_formation_overview (formation_name, railroad_id = null) {
    var overview = { caption: "", semifixed_formation : null, unavailable: false };
    
    if (railroad_id === null) {
        var overviews = formation_overviews["formations"];
    } else {
        var overviews = joined_railroad_formation_overviews[railroad_id]["formations"];
    }
    
    if (formation_name in overviews) {
        overview["unavailable"] = overviews[formation_name]["unavailable"];
        
        if (overviews[formation_name]["caption"] !== null) {
            overview["caption"] = overviews[formation_name]["caption"];
        }
        
        if ("semifixed_formation" in overviews[formation_name]) {
            overview["semifixed_formation"] = overviews[formation_name]["semifixed_formation"];
        }
    }
    
    return overview;
}


var operation_search_area_elm = document.getElementById("operation_search_area");
var operation_table_heading_elm = document.getElementById("operation_table_heading");
var operation_table_area_elm = document.getElementById("operation_table_area");
var operation_table_info_elm = document.getElementById("operation_table_info");
var operation_table_footer_inner_elm = document.getElementById("operation_table_footer_inner");

function operation_table_mode (diagram_revision = "__current__") {
    change_mode(4);
    
    operation_search_area_elm.style.display = "none";
    operation_table_heading_elm.innerHTML = "";
    operation_table_area_elm.innerHTML = "";
    operation_table_info_elm.innerHTML = "";
    operation_table_footer_inner_elm.style.display = "none";
    
    var current_diagram_revision = get_diagram_revision();
    
    if (diagram_revision !== null) {
        if (diagram_revision === current_diagram_revision) {
            diagram_revision = "__current__";
        }
        
        var operation_data_date = diagram_revision === "__current__" ? get_date_string(get_timestamp()) : diagram_revision;
        
        get_diagram_id(operation_data_date, function (diagram_data) {
            if (diagram_data === null) {
                mes("指定された改正日のダイヤはデータがありません", true);
                
                return;
            }
            
            var diagram_revision_year_month = diagram_data["diagram_revision"].substring(0, 4) + "年" + Number(diagram_data["diagram_revision"].substring(5, 7)) + "月改正"
            
            change_title(railroad_info["railroad_name"] + " " + diagram_revision_year_month + "ダイヤ運用表 | " + instance_info["instance_name"], "/railroad_" + railroad_info["railroad_id"] + "/operation_table/" + diagram_data["diagram_revision"] + "/");
            
            if (diagram_data["diagram_revision"] === current_diagram_revision) {
                var diagram_revision_info = "(現行ダイヤ)";
            } else if (diagram_data["diagram_revision"] > current_diagram_revision) {
                var diagram_revision_info = "<b class='warning_sentence'>(将来のダイヤ)</b>";
            } else {
                var diagram_revision_info = "<b class='warning_sentence'>(過去のダイヤ)</b>";
            }
            
            operation_table_heading_elm.innerHTML = diagram_revision_year_month + " " + diagram_revision_info;
            operation_table_footer_inner_elm.style.display = "block";
            document.getElementById("operation_table_name").innerText = diagram_info[diagram_data["diagram_revision"]]["diagrams"][diagram_data["diagram_id"]]["diagram_name"];
            document.getElementById("train_number_search").value = "";
            operation_table_wrapper_scroll_amount = 0;
            
            load_data(function () {
                reset_operation_narrow_down();
            }, null, function () {
                operation_table_area_elm.innerHTML = "<div class='no_data'>表示に必要なデータが利用できません</div>";
            }, diagram_data["diagram_revision"], diagram_data["diagram_id"], null, diagram_revision === "__current__" ? operation_data_date : null);
        });
    } else {
        change_title(railroad_info["railroad_name"] + "の運用表一覧 | " + instance_info["instance_name"], "/railroad_" + railroad_info["railroad_id"] + "/operation_table/");
        
        operation_table_heading_elm.innerHTML = "改正別の運用表";
        
        operation_table = null;
        
        var buf = "";
        for (var diagram_revisions_item of diagram_revisions["diagram_revisions"]) {
            if (diagram_revisions_item === current_diagram_revision) {
                buf += "<a href='/railroad_" + railroad_info["railroad_id"] + "/operation_table/" + current_diagram_revision + "/' class='wide_button' onclick='event.preventDefault(); operation_table_mode();'>" + current_diagram_revision.substring(0, 4) + "年" + Number(current_diagram_revision.substring(5, 7)) + "月改正ダイヤ<small>(現行)</small></a>";
            } else {
                buf += "<a href='/railroad_" + railroad_info["railroad_id"] + "/operation_table/" + diagram_revisions_item + "/' class='wide_button " + (diagram_revisions_item > current_diagram_revision ? "before_operation" : "after_operation") + "' onclick='event.preventDefault(); operation_table_mode(\"" + diagram_revisions_item + "\");'>" + diagram_revisions_item.substring(0, 4) + "年" + Number(diagram_revisions_item.substring(5, 7)) + "月改正ダイヤ</a>";
            }
        }
        
        operation_table_area_elm.innerHTML = buf;
    }
}

var search_group_name_elm = document.getElementById("operation_search_group_name");
var search_car_count_elm = document.getElementById("operation_search_car_count");
var search_starting_location_elm = document.getElementById("operation_search_starting_location");
var search_terminal_location_elm = document.getElementById("operation_search_terminal_location");

var operation_table_sorting_criteria = "operation_number";
var operation_table_ascending_order = true;

function operation_table_list_number () {
    operation_search_area_elm.style.display = "block";
    operation_table_area_elm.innerHTML = "";
    
    if (operation_table["diagram_revision"] === get_diagram_revision()) {
        get_diagram_id(get_date_string(get_timestamp()), function (diagram_data) {
            if (diagram_data !== null) {
                draw_operation_table(diagram_data["diagram_id"] === operation_table["diagram_id"]);
            }
        });
    } else {
        draw_operation_table(null);
    }
}

function draw_operation_table (is_today) {
    var search_keyword = str_to_halfwidth(document.getElementById("train_number_search").value).toUpperCase();
    
    var search_filter_count = 0;
    
    var search_group_name = search_group_name_elm.value;
    if (search_group_name.length >= 1) {
        search_filter_count++
    }
    
    var search_car_count = search_car_count_elm.value;
    var search_car_count_list = [];
    if (search_car_count.length >= 1) {
        search_filter_count++
    }
    
    var search_starting_location = search_starting_location_elm.value;
    var search_starting_location_list = [];
    if (search_starting_location.length >= 1) {
        search_filter_count++
    }
    
    var search_terminal_location = search_terminal_location_elm.value;
    var search_terminal_location_list = [];
    if (search_terminal_location.length >= 1) {
        search_filter_count++
    }
    
    document.getElementById("operation_search_filter_count").innerText = search_filter_count >= 1 ? "(" + search_filter_count + ")" : "";
    
    var operation_numbers = Object.keys(operation_table["operations"]).toSorted();
    
    if (operation_table_sorting_criteria  !== "operation_number") {
        var tmp_operation_list = {};
        
        if (operation_table_sorting_criteria === "starting_time") {
            for (var cnt = 0; cnt < operation_numbers.length; cnt++) {
                tmp_operation_list[(operation_table["operations"][operation_numbers[cnt]]["starting_time"] !== null ? operation_table["operations"][operation_numbers[cnt]]["starting_time"] : "99:99") + "_" + cnt] = operation_numbers[cnt];
            }
        } else {
            for (var cnt = 0; cnt < operation_numbers.length; cnt++) {
                tmp_operation_list[(operation_table["operations"][operation_numbers[cnt]]["ending_time"] !== null ? operation_table["operations"][operation_numbers[cnt]]["ending_time"] : "99:99") + "_" + cnt] = operation_numbers[cnt];
            }
        }
        
        var time_keys = Object.keys(tmp_operation_list).toSorted();
        
        operation_numbers = [];
        for (var cnt = 0; cnt < time_keys.length; cnt++) {
            operation_numbers[cnt] = tmp_operation_list[time_keys[cnt]];
        }
    }
    
    if (operation_table_ascending_order) {
        var sorting_criteria_class_name = "sorting_criteria";
    } else {
        operation_numbers.reverse();
        
        var sorting_criteria_class_name = "sorting_criteria_desc";
    }
    
    if (is_today) {
        var operation_table_name_or_ts = get_timestamp();
        var is_today_str = "true";
    } else {
        var operation_table_name_or_ts = "\"" + operation_table["diagram_id"] + "\"";
        var is_today_str = "false";
    }
    
    operation_number_order = [];
    
    var buf = "";
    for (var operation_number of operation_numbers) {
        var operation_number_html = escape_html(operation_number);
        if (search_keyword !== "") {
            var search_keyword_index = operation_number.toUpperCase().indexOf(search_keyword);
            
            if (search_keyword_index >= 0) {
                var operation_number_search_hit = true;
                
                operation_number_html = escape_html(operation_number.substring(0, search_keyword_index)) + "<span class='search_highlight'>" + escape_html(operation_number.substring(search_keyword_index, search_keyword_index + search_keyword.length)) + "</span>" + escape_html(operation_number.substring(search_keyword_index + search_keyword.length));
            } else {
                var operation_number_search_hit = false;
            }
        }
        
        if (!search_car_count_list.includes(operation_table["operations"][operation_number]["car_count"])) {
            search_car_count_list.push(operation_table["operations"][operation_number]["car_count"]);
        }
        if (!search_starting_location_list.includes(operation_table["operations"][operation_number]["starting_location"])) {
            search_starting_location_list.push(operation_table["operations"][operation_number]["starting_location"]);
        }
        if (!search_terminal_location_list.includes(operation_table["operations"][operation_number]["terminal_location"])) {
            search_terminal_location_list.push(operation_table["operations"][operation_number]["terminal_location"]);
        }
        
        if ((search_group_name !== "" && operation_table["operations"][operation_number]["operation_group_name"] !== search_group_name) || (search_car_count !== "" && operation_table["operations"][operation_number]["car_count"] !== Number(search_car_count)) || (search_starting_location !== "" && operation_table["operations"][operation_number]["starting_location"] !== search_starting_location) || (search_terminal_location !== "" && operation_table["operations"][operation_number]["terminal_location"] !== search_terminal_location)) {
            continue;
        }
        
        var trains = operation_table["operations"][operation_number]["trains"];
        var search_hit_count = 0;
        var buf_2 = "";
        for (var cnt_2 = 0; cnt_2 < trains.length; cnt_2++) {
            if (cnt_2 !== 0 && trains[cnt_2]["train_number"] === trains[cnt_2 - 1]["train_number"]) {
                continue;
            }
            
            var train_title = trains[cnt_2]["train_number"].split("__")[0];
            
            if (search_keyword === "") {
                if (train_title.startsWith(".")) {
                    buf_2 += "<small class='operation_overview_yard_stay'>" + train_title.substring(1) + "</small>";
                } else {
                    if (trains[cnt_2]["train_number"] in timetable["timetable"][trains[cnt_2]["line_id"]][trains[cnt_2]["direction"] + "_trains"]) {
                        var train_type_initial = timetable["timetable"][trains[cnt_2]["line_id"]][trains[cnt_2]["direction"] + "_trains"][trains[cnt_2]["train_number"]][0]["train_type"].substring(0, 1);
                    } else if (railroad_info["deadhead_train_number_regexp"].test(train_title)) {
                        var train_type_initial = "回";
                    } else {
                        var train_type_initial = "＊";
                    }
                    
                    buf_2 += "<small style='background-color: " + (config["dark_mode"] ? convert_font_color_dark_mode(get_train_color(train_title, "#333333")) : get_train_color(train_title, "#333333")) + ";'>" + train_type_initial + "</small>";
                }
            } else {
                var train_title_search_index = train_title.toUpperCase().indexOf(search_keyword);
                
                if (train_title_search_index !== -1) {
                    if (search_hit_count < 4) {
                        var train_title_search_index_end = train_title_search_index + search_keyword.length;
                        
                        buf_2 += "<span>" + train_title.substring(0, train_title_search_index) + "<span class='search_highlight'>" + train_title.substring(train_title_search_index, train_title_search_index_end) + "</span>" + train_title.substring(train_title_search_index_end) + "</span>";
                    } else if (search_hit_count === 4) {
                        buf_2 += "<span>他</span>";
                    }
                    
                    search_hit_count++;
                }
            }
        }
        
        if (buf_2 === "") {
            buf_2 = search_keyword === "" ? "(運行なし)" : "(該当なし)";
        }
        
        if (search_keyword === "" || operation_number_search_hit || search_hit_count >= 1) {
            buf += "<tr onclick='operation_detail(" + operation_number_order.length + ", " + operation_table_name_or_ts + ", " + is_today_str + (search_keyword === "" ? "" : ", \"" + add_slashes(search_keyword) + "\"") + ");'>";
            buf += "<th rowspan='2' style='background-color: " + (config["dark_mode"] ? convert_color_dark_mode(operation_table["operations"][operation_number]["main_color"]) : operation_table["operations"][operation_number]["main_color"]) + "'><b>" + operation_number_html + "</b>" + operation_table["operations"][operation_number]["operation_group_name"] + "<br>(" + operation_table["operations"][operation_number]["car_count"] + "両)</th>";
            buf += "<td>" + operation_table["operations"][operation_number]["starting_location"] + (operation_table["operations"][operation_number]["starting_track"] !== null ? "<small>(" + operation_table["operations"][operation_number]["starting_track"] + ")</small>" : "") + "<time" + (operation_table["operations"][operation_number]["starting_time"] !== null ? ">" + operation_table["operations"][operation_number]["starting_time"] : " datetime='PT24H'>N/A") + "</time></td>";
            buf += "<td>" + operation_table["operations"][operation_number]["terminal_location"] + (operation_table["operations"][operation_number]["terminal_track"] !== null ? "<small>(" + operation_table["operations"][operation_number]["terminal_track"] + ")</small>" : "") + "<time" + (operation_table["operations"][operation_number]["ending_time"] !== null ? ">" + operation_table["operations"][operation_number]["ending_time"] : " datetime='PT24H'>N/A") + "</time></td>";
            buf += "</tr>";
            buf += "<tr onclick='operation_detail(" + operation_number_order.length + ", " + operation_table_name_or_ts + ", " + is_today_str + (search_keyword === "" ? "" : ", \"" + add_slashes(search_keyword) + "\"") + ");'><td colspan='2' class='operation_overview'>";
            buf += buf_2;
            buf += "</td></tr>";
            
            operation_number_order.push(operation_number);
        }
    }
    
    search_starting_location_list = sort_station_names(search_starting_location_list);
    search_terminal_location_list = sort_station_names(search_terminal_location_list);
    
    var buf_2 = "<option value=''>運用系統 指定なし</option>";
    for (var operation_group of operation_table["operation_groups"]) {
        buf_2 += "<option value='" + operation_group["operation_group_name"] + "'>" + operation_group["operation_group_name"] + "</option>";
    }
    search_group_name_elm.innerHTML = buf_2;
    search_group_name_elm.value = search_group_name;
    
    var buf_2 = "<option value=''>所定両数 指定なし</option>";
    for (var car_count of search_car_count_list) {
        buf_2 += "<option value='" + car_count + "'>" + car_count + "両</option>";
    }
    search_car_count_elm.innerHTML = buf_2;
    search_car_count_elm.value = search_car_count;
    
    var buf_2 = "<option value=''>出庫場所 指定なし</option>";
    for (var starting_location of search_starting_location_list) {
        buf_2 += "<option value='" + starting_location + "'>" + starting_location + " 出庫</option>";
    }
    search_starting_location_elm.innerHTML = buf_2;
    search_starting_location_elm.value = search_starting_location;
    
    var buf_2 = "<option value=''>入庫場所 指定なし</option>";
    for (var terminal_location of search_terminal_location_list) {
        buf_2 += "<option value='" + terminal_location + "'>" + terminal_location + " 入庫</option>";
    }
    search_terminal_location_elm.innerHTML = buf_2;
    search_terminal_location_elm.value = search_terminal_location;
    
    if (buf.length !== 0) {
        switch (operation_table_sorting_criteria) {
            case "operation_number":
                var buf_3 = "<th class='" + sorting_criteria_class_name + "' onclick='operation_table_reverse_order();'>運用番号</th><th onclick='sort_operation_table(\"starting_time\")'>出庫時刻</th><th onclick='sort_operation_table(\"ending_time\")'>入庫時刻</th>";
                break;
            
            case "starting_time":
                var buf_3 = "<th onclick='sort_operation_table(\"operation_number\")'>運用番号</th><th class='" + sorting_criteria_class_name + "' onclick='operation_table_reverse_order();'>出庫時刻</th><th onclick='sort_operation_table(\"ending_time\")'>入庫時刻</th>";
                break;
            
            case "ending_time":
                var buf_3 = "<th onclick='sort_operation_table(\"operation_number\")'>運用番号</th><th onclick='sort_operation_table(\"starting_time\")'>出庫時刻</th><th class='" + sorting_criteria_class_name + "' onclick='operation_table_reverse_order();'>入庫時刻</th>";
                break;
        }
        
        operation_table_area_elm.innerHTML = "<table class='operation_table'><tr>" + buf_3 + "</tr>" + buf + "</table>";
    } else {
        operation_table_area_elm.innerHTML = "<div class='no_data'>絞り込み条件に一致する運用が見つかりません</div>";
    }
    
    operation_table_info_elm.innerHTML = "ダイヤ情報更新日時: " + get_date_and_time(diagram_info[operation_table["diagram_revision"]]["last_modified_timestamp"]) + "<br>運用表更新日時: " + get_date_and_time(operation_table["last_modified_timestamp"]) + "<br>時刻表更新日時: " + get_date_and_time(timetable["last_modified_timestamp"]);
}

function sort_operation_table (sorting_criteria) {
    operation_table_sorting_criteria = sorting_criteria;
    operation_table_ascending_order = true;
    
    operation_table_list_number();
}

function operation_table_reverse_order () {
    operation_table_ascending_order = !operation_table_ascending_order;
    
    operation_table_list_number();
}

function reset_operation_narrow_down (close_menu = true) {
    search_group_name_elm.value = "";
    search_car_count_elm.value = "";
    search_starting_location_elm.value = "";
    search_terminal_location_elm.value = "";
    
    if (close_menu) {
        document.getElementById("operation_search_menu").checked = false;
    }
    
    operation_table_list_number();
}

function operation_table_change (diagram_revision, diagram_id) {
    operation_search_area_elm.style.display = "none";
    operation_table_area_elm.innerHTML = "";
    operation_table_info_elm.innerHTML = "";
    
    document.getElementById("operation_table_name").innerText = diagram_info[diagram_revision]["diagrams"][diagram_id]["diagram_name"];
    
    var today_date_string = get_date_string(get_timestamp());
    get_diagram_id(today_date_string, function (diagram_data) {
        load_data(function () {
            operation_table_list_number();
        }, null, function () {
            operation_table_area_elm.innerHTML = "<div class='no_data'>表示に必要なデータが利用できません</div>";
        }, diagram_revision, diagram_id, null, (diagram_revision === diagram_data["diagram_revision"] && diagram_id === diagram_data["diagram_id"]) ? today_date_string : null);
    });
    
}

function operation_table_previous () {
    var list_index = diagram_info[operation_table["diagram_revision"]]["diagram_order"].indexOf(operation_table["diagram_id"]) - 1;
    
    if (list_index < 0) {
        list_index = diagram_info[operation_table["diagram_revision"]]["diagram_order"].length - 1;
    }
    
    operation_table_change(operation_table["diagram_revision"], diagram_info[operation_table["diagram_revision"]]["diagram_order"][list_index]);
}

function operation_table_next () {
    var list_index = diagram_info[operation_table["diagram_revision"]]["diagram_order"].indexOf(operation_table["diagram_id"]) + 1;
    
    if (list_index >= diagram_info[operation_table["diagram_revision"]]["diagram_order"].length) {
        list_index = 0;
    }
    
    operation_table_change(operation_table["diagram_revision"], diagram_info[operation_table["diagram_revision"]]["diagram_order"][list_index]);
}

function operation_table_list_tables () {
    var popup_inner_elm = open_square_popup("diagram_list_popup", true, "ダイヤの選択");
    
    var buf = "";
    for (var diagram_id of diagram_info[operation_table["diagram_revision"]]["diagram_order"]) {
        var bg_color = config["dark_mode"] ? convert_color_dark_mode(diagram_info[operation_table["diagram_revision"]]["diagrams"][diagram_id]["main_color"]) :diagram_info[operation_table["diagram_revision"]]["diagrams"][diagram_id]["main_color"];
        buf += "<button type='button' class='wide_button' onclick='close_square_popup(); operation_table_change(\"" + operation_table["diagram_revision"] + "\", \"" + diagram_id + "\");' style='background-color: " + bg_color + "; border-color: " + bg_color + ";'>"  + escape_html(diagram_info[operation_table["diagram_revision"]]["diagrams"][diagram_id]["diagram_name"]) + "</button>";
    }
    
    buf += "<button type='button' class='execute_button' onclick='close_square_popup(); operation_table_mode(null);'>他の改正版のダイヤ</button>";
    
    popup_inner_elm.innerHTML = buf;
}


function take_screenshot (elm_id, is_popup = false) {
    var popup_inner_elm = open_popup("screenshot_popup", "スクリーンショット");
    
    popup_inner_elm.innerHTML = "<div id='screenshot_preview'></div><button type='button' id='save_screenshot_button' class='wide_button' onclick='save_screenshot();' style='display: none;'>画像として保存</button>";
    
    var screenshot_area_elm = document.createElement("div");
    screenshot_area_elm.classList.add("screenshot_area");
    
    if (is_popup) {
        screenshot_area_elm.classList.add("popup_screenshot_area");
    }
    
    screenshot_area_elm.innerHTML = document.getElementById(elm_id).innerHTML;
    
    for (var input_elm of screenshot_area_elm.getElementsByTagName("input")) {
        input_elm.remove();
    }
    
    document.getElementsByTagName("body")[0].appendChild(screenshot_area_elm);
    
    var e2i = new Elem2Img();
    
    if (!config["dark_mode"]) {
        e2i.set_background_color("#ffffff");
    } else {
        e2i.set_background_color("#444444");
        screenshot_area_elm.classList.add("dark_mode");
    }
    
    e2i.get_png(function (image_data) {
        document.getElementById("screenshot_preview").innerHTML = "<img src='" + image_data + "' alt=''>";
        document.getElementById("save_screenshot_button").style.display = "block";
    }, screenshot_area_elm, 2);
    
    screenshot_area_elm.remove();
}

function save_screenshot () {
    var ts = get_timestamp();
    var dt = new Date(ts * 1000);
    
    Elem2Img.save_image(document.getElementById("screenshot_preview").getElementsByTagName("img")[0].src, UNYOHUB_APP_NAME + "_" + get_date_string(ts) + "_" + ("0" + dt.getHours()).slice(-2) + ("0" + dt.getMinutes()).slice(-2) + ("0" + dt.getSeconds()).slice(-2) + ".png");
}


var one_time_token = null;

function get_one_time_token () {
    ajax_post("one_time_token.php", null, function (response) {
        if (response !== false) {
            var data = JSON.parse(response);
            
            one_time_token = data["token"];
        }
    });
}

var post_railroad_id;
var post_yyyy_mm_dd;
var post_operation_number;
var post_train_number;

function write_operation_data (railroad_id, yyyy_mm_dd, operation_number, train_number = null) {
    var popup_inner_elm = open_popup("write_operation_data_popup", "運用情報の投稿");
    
    if (!instance_info["allow_guest_user"] && user_data === null) {
        var buf = "<div class='warning_text'>情報投稿にはログインが必要です。<br>ユーザーアカウントをまだ作成されていない場合は新規登録してください。</div>";
        buf += "<div class='link_block'><a href='javascript:void(0);' onclick='show_login_form();'>ログイン</a>　<a href='/user/sign_up.php' target='_blank' rel='opener'>新規登録</a></div>";
        
        popup_inner_elm.innerHTML = buf;
        
        return;
    }
    
    var yyyy_mm_dd_today = get_date_string(get_timestamp());
    
    if (yyyy_mm_dd === null) {
        post_yyyy_mm_dd = yyyy_mm_dd_today;
    } else {
        post_yyyy_mm_dd = yyyy_mm_dd;
    }
    
    post_railroad_id = railroad_id === null ? railroad_info["railroad_id"] : railroad_id;
    post_operation_number = operation_number;
    
    var operation_info = post_railroad_id === railroad_info["railroad_id"] ? operation_table["operations"][operation_number] : joined_operation_tables[post_railroad_id]["operations"][operation_number];
    
    var existing_operation_data = post_railroad_id === railroad_info["railroad_id"] ? operation_data["operations"] : joined_operation_data[post_railroad_id]["operations"];
    var existing_posts_count = (operation_number in existing_operation_data && existing_operation_data[operation_number] !== null) ? existing_operation_data[operation_number]["posts_count"] : 0;
    
    var alias_of_forward_direction = escape_html(railroad_info["alias_of_forward_direction"]);
    
    var buf = "<div id='write_operation_data_area'>";
    buf += "<h3>" + escape_html(operation_number) + "運用</h3>";
    
    if (post_yyyy_mm_dd > yyyy_mm_dd_today || (post_yyyy_mm_dd === yyyy_mm_dd_today && operation_info["starting_time"] > get_hh_mm())) {
        var speculative_post = true;
        
        buf += "<div class='warning_text'>【!】出庫前の運用に情報を投稿しようとしています</div>";
    } else {
        var speculative_post = false;
    }
    
    buf += "<h4>確認方法</h4>";
    buf += "<div class='radio_area'><input type='radio' name='identify_method' id='identify_method_direct' checked='checked'><label for='identify_method_direct' onclick='switch_identify_method(true);'>直接確認</label><input type='radio' name='identify_method' id='identify_method_quote'><label for='identify_method_quote' onclick='switch_identify_method(false);'>引用情報</label></div>";
    
    buf += "<h4>編成名または車両形式</h4>";
    buf += "<div class='informational_text'><b>◀ " + alias_of_forward_direction + "</b></div>";
    buf += "<input type='text' id='operation_data_formation' autocomplete='off' oninput='suggest_formation(" + (post_railroad_id === railroad_info["railroad_id"] ? "null" : "\"" +  post_railroad_id + "\"") + ", this.value);' onblur='clear_formation_suggestion();'><button type='button' id='car_number_suggest_mode_button' onclick='switch_car_number_suggest_mode(!car_number_suggest_mode);'></button><div class='suggestion_area'><div id='formation_suggestion'></div></div>";
    buf += "<div id='car_number_suggest_mode_info'>車両番号から編成名をサジェストします</div>";
    buf += "<div class='informational_text'>複数の編成が連結している場合は、" + alias_of_forward_direction + "の編成から順に「+」で区切って入力してください。<br>不明な編成には「不明」、運休情報は「運休」を入力可能です。</div>";
    
    buf += "<input type='checkbox' id='operation_data_details'";
    if ((speculative_post && instance_info["require_comments_on_speculative_posts"]) || existing_posts_count >= 1) {
        buf += " checked='checked'";
    }
    buf += "><label for='operation_data_details' class='drop_down'>詳細情報</label><div>";
    
    buf += "<h4>情報の種類</h4>";
    buf += "<div class='radio_area'><input type='radio' name='operation_data_type' id='operation_data_type_normal' checked='checked'><label for='operation_data_type_normal'>通常・訂正の情報</label><input type='radio' name='operation_data_type' id='operation_data_type_reassign'><label for='operation_data_type_reassign'>新しい差し替え情報</label></div>";
    
    if (existing_posts_count >= 1) {
        buf += "<div class='informational_text'>既にこの運用に対して投稿されている情報と同じ編成を投稿する場合や、既に投稿されている運用情報が見間違いであると思われる場合に正しい編成の情報で上書きをする場合は「通常・訂正の情報」を、<br>既に投稿されている編成がダイヤ乱れや車両トラブルにより別の編成に取り替えられたことを最初に報告する場合は「新しい差し替え情報」を選択してください。</div>";
    }
    
    if (post_yyyy_mm_dd === yyyy_mm_dd_today) {
        var now_hh_mm = get_hh_mm();
    } else {
        var now_hh_mm = "99:99";
    }
    
    buf += "<div id='train_number_data'>";
    buf += "<h4>目撃時の列車</h4>";
    buf += "<b id='operation_data_train_number'></b><button type='button' onclick='select_train_number(\"" + post_railroad_id + "\", \"" + add_slashes(operation_number) + "\", \"" + now_hh_mm + "\");'>変更</button>";
    buf += "</div>";
    
    buf += "<h4>運用補足情報</h4>";
    buf += "<textarea id='operation_data_comment'></textarea>";
    
    if (speculative_post && instance_info["require_comments_on_speculative_posts"]) {
        buf += "<div class='warning_text' id='comment_guide'>お手数ですが、この運用に充当される編成を確認した方法を補足情報にご入力ください。</div>";
    } else {
        buf += "<div class='informational_text' id='comment_guide'>差し替え等の特記事項がない場合は省略可能です。</div>";
    }
    
    buf += "<div class='warning_text' id='quote_guide' style='display: none;'>情報の出典を補足情報にご入力ください。";
    if ("quotation_guidelines" in instance_info) {
        buf += "<br><br>" + convert_to_html(instance_info["quotation_guidelines"]) + "</div>";
    }
    buf += "</div><br>";
    
    buf += "<button type='button' class='wide_button' onclick='check_post_operation_data();'>投稿する</button>";
    
    buf += "</div>";
    
    if (user_data !== null) {
        get_one_time_token();
    }
    
    popup_inner_elm.innerHTML = buf;
    
    document.getElementById("write_operation_data_popup").scrollTop = 0;
    
    if (!speculative_post) {
        for (var cnt = 0; cnt < operation_info["trains"].length; cnt++) {
            if (operation_info["trains"][cnt]["final_arrival_time"] > now_hh_mm) {
                break;
            }
        }
        
        if (train_number !== null) {
            set_train_number(train_number);
        } else {
            if (cnt === operation_info["trains"].length) {
                set_train_number("△");
            } else {
                set_train_number(operation_info["trains"][cnt]["train_number"]);
            }
        }
    } else {
        set_train_number("○");
    }
    
    switch_car_number_suggest_mode();
}

function select_train_number (railroad_id, operation_number, now_hh_mm) {
    var popup_inner_elm = open_square_popup("train_number_popup", true, "列車の選択");
    
    var trains = railroad_id === railroad_info["railroad_id"] ? operation_table["operations"][operation_number]["trains"] : joined_operation_tables[post_railroad_id]["operations"][operation_number]["trains"];
    
    var buf = "<u onclick='set_train_number(\"○\")'>○ 出庫時</u>";
    
    for (var cnt = 0; cnt < trains.length; cnt++) {
        if (cnt == 0 || trains[cnt]["train_number"] !== trains[cnt - 1]["train_number"]) {
            var first_departure_time = trains[cnt]["first_departure_time"];
        }
        
        if (cnt + 1 < trains.length && trains[cnt]["train_number"] === trains[cnt + 1]["train_number"]) {
            continue;
        }
        
        var train_title = trains[cnt]["train_number"].split("__")[0];
        
        if (train_title.startsWith(".")) {
            train_title = train_title.substring(1) + "待機";
            
            var color = "inherit";
        } else {
            var color = config["dark_mode"] ? convert_font_color_dark_mode(get_train_color(train_title)) : get_train_color(train_title);
        }
        
        buf += "<u onclick='set_train_number(\"" + add_slashes(trains[cnt]["train_number"]) + "\")' style='color: " + color + ";'>" + escape_html(train_title) + "<small>" + first_departure_time + " 〜 " + trains[cnt]["final_arrival_time"] + "</small></u>";
        
        if (trains[cnt]["final_arrival_time"] > now_hh_mm) {
            break;
        }
    }
    
    if (cnt === trains.length) {
        buf += "<u onclick='set_train_number(\"△\")'>△ 入庫時</u>";
    }
    
    popup_inner_elm.innerHTML = buf;
    
    document.getElementById("train_number_popup").scrollTop = 0;
}

function set_train_number (train_number) {
    if (square_popup_is_open) {
        close_square_popup();
    }
    
    post_train_number = train_number;
    
    var color = "inherit";
    if (train_number === "○") {
        var train_title = "出庫時";
    } else if (train_number === "△") {
        var train_title = "入庫時";
    } else {
        var train_title = train_number.split("__")[0];
        
        if (train_title.startsWith(".")) {
            train_title = train_title.substring(1) + "待機";
        } else {
            color = config["dark_mode"] ? convert_font_color_dark_mode(get_train_color(train_title)) : get_train_color(train_title);
        }
    }
    
    var operation_data_train_number_elm = document.getElementById("operation_data_train_number");
    operation_data_train_number_elm.innerText = train_title;
    operation_data_train_number_elm.style.color = color;
}

function switch_identify_method (direct) {
    var train_number_data_elm = document.getElementById("train_number_data");
    var comment_guide_elm = document.getElementById("comment_guide");
    var quote_guide_elm = document.getElementById("quote_guide");
    
    if (direct) {
        train_number_data_elm.style.display = "block";
        comment_guide_elm.style.display = "block";
        quote_guide_elm.style.display = "none";
    } else {
        train_number_data_elm.style.display = "none";
        comment_guide_elm.style.display = "none";
        quote_guide_elm.style.display = "block";
        
        document.getElementById("operation_data_details").checked = true;
    }
}

var car_number_suggest_mode = false;
var car_list = [];

function switch_car_number_suggest_mode (enable = null) {
    if (enable !== null) {
        car_number_suggest_mode = enable;
    }
    
    car_list = [];
    
    var button_elm = document.getElementById("car_number_suggest_mode_button");
    var mode_info_elm = document.getElementById("car_number_suggest_mode_info");
    
    if (car_number_suggest_mode) {
        button_elm.classList.add("car_number_suggest_mode");
        mode_info_elm.style.display = "block";
        
        var formation_data = post_railroad_id === railroad_info["railroad_id"] ? formations["formations"] : joined_railroad_formations[post_railroad_id]["formations"];
        
        for (var formation_name of Object.keys(formation_data).toSorted()) {
            if (!("cars" in formation_data[formation_name])) {
                continue;
            }
            
            for (var car_data of formation_data[formation_name]["cars"]) {
                car_list.push({ car_number : car_data["car_number"].toUpperCase(), formation_name : formation_name });
            }
        }
    } else {
        button_elm.classList.remove("car_number_suggest_mode");
        mode_info_elm.style.display = "none";
    }
}

function suggest_formation (railroad_id, formations_text) {
    if (railroad_id === railroad_info["railroad_id"]) {
        railroad_id = null;
    }
    
    var formations_splitted = formations_text.split("+");
    var formation_text = str_to_halfwidth(formations_splitted[formations_splitted.length - 1]).toUpperCase();
    
    var buf = "";
    
    if (formation_text.length >= 1) {
        if (railroad_id === null) {
            var formation_data = formations["formations"];
            var icon_ids = series_icon_ids;
        } else {
            var formation_data = joined_railroad_formations[railroad_id]["formations"];
            var icon_ids = joined_railroad_series_icon_ids[railroad_id];
        }
        
        var formation_names = Object.keys(icon_ids).concat(Object.keys(formation_data).toSorted());
        
        if (!car_number_suggest_mode) {
            var suggestion_list = formation_names.filter(function (formation_name) {
                return formation_name.toUpperCase().startsWith(formation_text) && (formation_name in icon_ids || "cars" in formation_data[formation_name]);
            });
        } else {
            var suggestion_list = car_list.filter(function (car_data) {
                return car_data["car_number"].includes(formation_text);
            });
        }
        
        for (var suggestion of suggestion_list) {
            buf += "<button type='button' onclick='complete_formation(\"";
            
            if (!car_number_suggest_mode) {
                var overview = get_formation_overview(suggestion, railroad_id);
                
                if (!car_number_suggest_mode && overview["semifixed_formation"] !== null) {
                    buf += add_slashes(overview["semifixed_formation"]) + "\");'>";
                    
                    var suggestion_formations = overview["semifixed_formation"].split("+");
                    for (var cnt = 0; cnt < suggestion_formations.length; cnt++) {
                        buf += (cnt >= 1 ? " + " : "") + "<img src='" + get_icon(suggestion_formations[cnt], railroad_id) + "' alt='' class='train_icon'" + (overview["unavailable"] ? " style='opacity: 0.5;'" : "") + ">" + (suggestion_formations[cnt] === suggestion ? "<b>" : "") + escape_html(suggestion_formations[cnt]) + (suggestion_formations[cnt] === suggestion ? "</b>" : "");
                    }
                    
                    if (overview["unavailable"]) {
                        buf += "<small class='warning_sentence'>(離脱中)</small>";
                    } else {
                        buf += "<small>(半固定)</small>";
                    }
                } else {
                    buf += add_slashes(suggestion) + "\");'>";
                    
                    if (overview["unavailable"]) {
                        buf += "<img src='" + get_icon(suggestion, railroad_id) + "' alt='' class='train_icon' style='opacity: 0.5;'>" + escape_html(suggestion) + "<small class='warning_sentence'>(運用離脱中)</small>";
                    } else {
                        buf += "<img src='" + get_icon(suggestion, railroad_id) + "' alt='' class='train_icon'><b>" + escape_html(suggestion) + "</b>";
                        if (overview["caption"].length >= 1) {
                            buf += "<small>(" + escape_html(overview["caption"]) + ")</small>";
                        }
                    }
                }
            } else {
                buf += add_slashes(suggestion["formation_name"]) + "\");'>";
                
                var start_pos = suggestion["car_number"].indexOf(formation_text);
                var end_pos = start_pos + formation_text.length;
                
                buf += "<img src='" + get_icon(suggestion["formation_name"], railroad_id) + "' alt='' class='train_icon'>" + escape_html(suggestion["car_number"].substring(0, start_pos)) + "<b>" + escape_html(suggestion["car_number"].substring(start_pos, end_pos)) + "</b>" + escape_html(suggestion["car_number"].substring(end_pos));
                buf += "<small>(" + escape_html(suggestion["formation_name"]) + ")</small>";
            }
            
            buf += "</button>";
        }
    }
    
    document.getElementById("formation_suggestion").innerHTML = buf;
}

function complete_formation (formation_text) {
    var operation_data_formation_elm = document.getElementById("operation_data_formation");
    
    if (formation_text !== "+") {
        var formations_splitted = operation_data_formation_elm.value.split("+");
        formations_splitted[formations_splitted.length - 1] = formation_text;
        
        operation_data_formation_elm.value = formations_splitted.join("+");
        
        setTimeout(function () {
            document.getElementById("formation_suggestion").innerHTML = "<button type='button' onclick='complete_formation(\"+\");'>＋</button>";
        }, 200);
    } else {
        operation_data_formation_elm.value += "+";
    }
    
    if (window.navigator.userAgent.includes("Chrome") || !window.navigator.userAgent.includes("Safari")) {
        operation_data_formation_elm.focus();
    }
}

function clear_formation_suggestion () {
    setTimeout(function () {
        document.getElementById("formation_suggestion").innerHTML = "";
    }, 100);
}

function select_operation_to_write_data (line_id, train_number, starting_station, train_direction) {
    var train_operations = get_operations(line_id, train_number, starting_station, train_direction);
    
    if (train_operations.length === 1) {
        var at_pos = train_operations[0].indexOf("@");
        if (at_pos === -1) {
            var railroad_id = null;
        } else {
            var railroad_id = train_operations[0].substring(at_pos + 1);
            train_operations[0] = train_operations[0].substring(0, at_pos);
        }
        
        write_operation_data(railroad_id, null, train_operations[0], train_number);
        
        return;
    }
    
    var popup_inner_elm = open_square_popup("select_operation_popup", false, "情報を投稿する運用の選択");
    
    var position_operations = {};
    for (var train_operation of train_operations) {
        var at_pos = train_operation.indexOf("@");
        if (at_pos === -1) {
            var railroad_id = railroad_info["railroad_id"];
        } else {
            var railroad_id = train_operation.substring(at_pos + 1);
            train_operation = train_operation.substring(0, at_pos);
        }
        
        for (var train of (railroad_id === railroad_info["railroad_id"] ? operation_table["operations"][train_operation]["trains"] : joined_operation_tables[railroad_id]["operations"][train_operation]["trains"])) {
            if (train["train_number"] === train_number && train["starting_station"] === starting_station) {
                position_operations[("0" + train["position_forward"]).slice(-2)] = {
                    railroad_id : railroad_id,
                    operation_number : train_operation,
                    position_forward : train["position_forward"],
                    position_rear : train["position_rear"]
                };
                
                break;
            }
        }
    }
    
    var position_keys = Object.keys(position_operations).toSorted();
    
    var buf = "<table class='select_operation_";
    if (train_direction === "inbound_trains") {
        buf += "inbound";
    } else {
        buf += "outbound";
        position_keys.reverse();
    }
    buf += "'>";
    
    for (var cnt = 0; cnt < position_keys.length; cnt++) {
        buf += "<tr>";
        
        if (cnt === 0) {
            buf += "<td rowspan='" + position_keys.length + "'><span>進行方向</span></td>";
        }
        
        buf += "<td onclick='write_operation_data(\"" + position_operations[position_keys[cnt]]["railroad_id"] + "\", null, \"" + add_slashes(position_operations[position_keys[cnt]]["operation_number"]) + "\", \"" + add_slashes(train_number) + "\");'><div><b>" + position_operations[position_keys[cnt]]["position_forward"];
        
        if (position_operations[position_keys[cnt]]["position_forward"] !== position_operations[position_keys[cnt]]["position_rear"]) {
            buf += "-" + position_operations[position_keys[cnt]]["position_rear"];
        }
        
        buf += "</b>両目</div>" + escape_html(position_operations[position_keys[cnt]]["operation_number"]) + "運用</td></tr>";
    }
    
    buf += "</table>";
    
    popup_inner_elm.innerHTML = buf;
}

function check_post_operation_data () {
    if (user_data === null) {
        if (config["guest_id"] === null) {
            show_rules(function () { show_captcha(post_operation_data); });
        } else {
            show_captcha(post_operation_data);
        }
    } else {
        post_operation_data();
    }
}

function post_operation_data () {
    open_wait_screen();
    
    if ((user_data !== null && one_time_token === null) || !(post_operation_number in assign_order_maxima)) {
        close_wait_screen();
        
        mes("内部処理が完了していないため、数秒待ってから再送信してください", true);
        
        return;
    }
    
    if (document.getElementById("operation_data_type_reassign").checked) {
        if (assign_order_maxima[post_operation_number] === 0) {
            close_wait_screen();
            
            mes("他の情報が投稿されていない運用に差し替え情報を投稿することはできません", true);
            
            return;
        }
        
        var assign_order = assign_order_maxima[post_operation_number] + 1;
    } else {
        if (assign_order_maxima[post_operation_number] >= 1) {
            var assign_order = assign_order_maxima[post_operation_number];
        } else {
            var assign_order = 1;
        }
    }
    
    var send_data = "railroad_id=" + escape_form_data(post_railroad_id) + "&date=" + escape_form_data(post_yyyy_mm_dd) + "&operation_number=" + escape_form_data(post_operation_number) + "&assign_order=" + assign_order + "&formations=" + escape_form_data(document.getElementById("operation_data_formation").value) + "&comment=" + escape_form_data(document.getElementById("operation_data_comment").value);
    
    if (document.getElementById("identify_method_quote").checked) {
        send_data += "&is_quotation=YES";
    } else {
        send_data += "&train_number=" + escape_form_data(post_train_number);
    }
    
    if (user_data !== null) {
        send_data += "&one_time_token=" + escape_form_data(one_time_token);
    } else {
        send_data += "&guest_id=" + escape_form_data(get_guest_id()) + "&zizai_captcha_id=" + escape_form_data(document.getElementById("zizai_captcha_id").value) + "&zizai_captcha_characters=" + escape_form_data(document.getElementById("zizai_captcha_characters").value);
    }
    
    ajax_post("post.php", send_data, function (response) {
        close_wait_screen();
        
        if (response !== false) {
            mes("情報提供ありがとうございました");
            
            if (square_popup_is_open) {
                close_square_popup();
            }
            popup_close(true);
            
            if (post_railroad_id === railroad_info["railroad_id"]) {
                Object.assign(operation_data["operations"], JSON.parse(response));
            } else {
                Object.assign(joined_operation_data[post_railroad_id]["operations"], JSON.parse(response));
            }
            
            switch (mode_val) {
                case 0:
                    position_change_time(0);
                    break;
                
                case 1:
                    timetable_select_station(timetable_selected_station);
                    break;
                
                case 2:
                    operation_data_draw();
                    break;
            }
        } else {
            if (user_data !== null) {
                get_one_time_token();
            } else {
                zizai_captcha_reload_image("zizai_captcha_image", "zizai_captcha_id");
            }
        }
    });
}

function edit_operation_data (railroad_id, yyyy_mm_dd, operation_number, assign_order, user_id, formation_text, ip_address = null) {
    var popup_inner_elm = open_popup("edit_operation_data_popup", "運用情報の取り消し");
    
    buf = "<h3>投稿内容</h3>";
    buf += "<div class='key_and_value'><b>運行日</b>" + yyyy_mm_dd.substring(0, 4) + "年 " + Number(yyyy_mm_dd.substring(5, 7)) + "月 " + Number(yyyy_mm_dd.substring(8)) + "日</div>";
    buf += "<div class='key_and_value'><b>運用番号</b>" + escape_html(operation_number) + "</div>";
    buf += "<div class='key_and_value'><b>編成名</b>" + escape_html(formation_text) + "</div>";
    
    if (user_id !== user_data["user_id"]) {
        buf += "<input type='checkbox' id='edit_operation_data_moderation_info'><label for='edit_operation_data_moderation_info' class='drop_down'>投稿者情報</label><div>";
        buf += "<div class='key_and_value'><b>ユーザーID</b>" + escape_html(user_id) + "<div id='edit_operation_data_is_timed_out_user'></div></div>";
        buf += "<div id='edit_operation_data_user_info' class='loading_icon'></div>";
        if (ip_address !== null) {
            buf += "<div class='key_and_value'><b>IPアドレス</b>" + escape_html(ip_address) + "<div id='edit_operation_data_is_timed_out_ip_address'></div></div>";
            buf += "<div id='edit_operation_data_ip_address_info' class='loading_icon'></div>";
        }
        buf += "<div id='edit_operation_data_user_timed_out_logs'></div>";
        if (ip_address !== null) {
            buf += "<div id='edit_operation_data_ip_address_timed_out_logs'></div>";
        }
        buf += "</div>";
    }
    
    buf += "<br><br><button type='button' class='wide_button' onclick='revoke_operation_data(\"" + railroad_id + "\", \"" + yyyy_mm_dd + "\", \"" + add_slashes(operation_number) + "\", " + assign_order + ",\"" + add_slashes(user_id) + "\");'>投稿を取り消す</button>";
    
    if (user_id !== user_data["user_id"]) {
        buf += "<button type='button' class='wide_button' onclick='revoke_users_all_operation_data(\"" + railroad_id + "\", \"" + add_slashes(user_id) + "\");'>ユーザーの投稿を全て取り消す</button>";
    }
    
    popup_inner_elm.innerHTML = buf;
    
    get_one_time_token();
    
    if (user_id !== user_data["user_id"]) {
        show_moderation_info(railroad_id, user_id, ip_address);
    }
}

function show_moderation_info (railroad_id, user_id, ip_address) {
    if (user_id === null) {
        user_id = "";
    }
    
    if (ip_address === null) {
        ip_address = "";
    }
    
    ajax_post("moderation_info.php", "railroad_id=" + escape_form_data(railroad_id) + "&user_id=" + escape_form_data(user_id) + "&ip_address=" + escape_form_data(ip_address), function (response) {
        if (response === false) {
            return;
        }
        
        var moderation_info = JSON.parse(response);
        
        var user_info_elm = document.getElementById("edit_operation_data_user_info");
        if (moderation_info["is_timed_out_user"] !== null) {
            if (moderation_info["user_name"] !== null) {
                user_info_elm.innerHTML = "<div class='key_and_value'><b>ハンドルネーム</b>" + escape_html(moderation_info["user_name"]) + "</div><div class='key_and_value'><b>登録日時</b>" + escape_html(moderation_info["user_created"]) + "</div>";
            } else {
                user_info_elm.classList.remove("loading_icon");
            }
            
            var is_timed_out_user_elm = document.getElementById("edit_operation_data_is_timed_out_user");
            if (moderation_info["is_timed_out_user"]) {
                is_timed_out_user_elm.innerText = "【!】タイムアウト中";
                is_timed_out_user_elm.className = "warning_text";
            } else {
                is_timed_out_user_elm.innerHTML = "<button type='button' onclick='time_out_setting(\"" + add_slashes(user_id) + "\", \"" + railroad_id + "\");'>タイムアウトを設定</button>";
            }
            
            var buf = "";
            for (var log_data of moderation_info["user_timed_out_logs"]) {
                buf += log_data["timed_out_datetime"] + " から " + log_data["timed_out_days"] + "日間 (モデレーター: " + escape_html(log_data["moderator_name"]) + ")<br>";
            }
            
            document.getElementById("edit_operation_data_user_timed_out_logs").innerHTML = "<h5>ユーザーのタイムアウト履歴</h5><div class='descriptive_text'>" + (buf.length >= 1 ? buf : "ユーザーにタイムアウトの履歴はありません") + "</div>";
        } else {
            user_info_elm.classList.remove("loading_icon");
        }
        
        var ip_address_info_elm = document.getElementById("edit_operation_data_ip_address_info");
        if (moderation_info["is_timed_out_ip_address"] !== null) {
            ip_address_info_elm.innerHTML = "<div class='key_and_value'><b>ホスト名</b>" + escape_html(moderation_info["host_name"]) + "</div>";
            
            var is_timed_out_ip_address_elm = document.getElementById("edit_operation_data_is_timed_out_ip_address");
            if (moderation_info["is_timed_out_ip_address"]) {
                is_timed_out_ip_address_elm.innerText = "【!】タイムアウト中";
                is_timed_out_ip_address_elm.className = "warning_text";
            } else {
                is_timed_out_ip_address_elm.innerHTML = "<button type='button' onclick='time_out_setting(\"" + add_slashes(ip_address) + "\", \"" + railroad_id + "\");'>タイムアウトを設定</button>";
            }
            
            var buf = "";
            for (var log_data of moderation_info["ip_address_timed_out_logs"]) {
                buf += log_data["timed_out_datetime"] + " から " + log_data["timed_out_days"] + "日間 (モデレーター: " + escape_html(log_data["moderator_name"]) + ")<br>";
            }
            
            document.getElementById("edit_operation_data_ip_address_timed_out_logs").innerHTML = "<h5>IPアドレスのタイムアウト履歴</h5><div class='descriptive_text'>" + (buf.length >= 1 ? buf : "IPアドレスにタイムアウトの履歴はありません") + "</div>";
        } else {
            ip_address_info_elm.classList.remove("loading_icon");
        }
    });
}

function revoke_operation_data (railroad_id, yyyy_mm_dd, operation_number, assign_order, user_id) {
    open_wait_screen();
    
    if (one_time_token === null) {
        close_wait_screen();
        
        mes("内部処理が完了していないため、数秒待ってから再送信してください", true);
        
        return;
    }
    
    ajax_post("revoke.php", "railroad_id=" + escape_form_data(railroad_id) + "&date=" + escape_form_data(yyyy_mm_dd) + "&operation_number=" + escape_form_data(operation_number) + "&assign_order=" + assign_order + "&user_id=" + escape_form_data(user_id) + "&one_time_token=" + escape_form_data(one_time_token), function (response) {
        close_wait_screen();
        
        if (response !== false) {
            mes("運用情報を取り消しました");
            
            if (square_popup_is_open) {
                close_square_popup();
            }
            popup_close(true);
            
            if (railroad_id === railroad_info["railroad_id"]) {
                Object.assign(operation_data["operations"], JSON.parse(response));
            } else {
                Object.assign(joined_operation_data[railroad_id]["operations"], JSON.parse(response));
            }
            
            switch (mode_val) {
                case 0:
                    position_change_time(0);
                    break;
                
                case 1:
                    timetable_select_station(timetable_selected_station);
                    break;
                
                case 2:
                    operation_data_draw();
                    break;
                
                case 3:
                    if (selected_formation_name !== null) {
                        formation_detail(selected_formation_name);
                    }
                    break;
            }
        }
    });
}

function revoke_users_all_operation_data (railroad_id, user_id) {
    if (confirm("このユーザーの過去24時間の投稿を全て取り消しますか？")) {
        open_wait_screen();
        
        if (one_time_token === null) {
            close_wait_screen();
            
            mes("内部処理が完了していないため、数秒待ってから再送信してください", true);
            
            return;
        }
        
        ajax_post("revoke_users_all.php", "railroad_id=" + escape_form_data(railroad_id) + "&user_id=" + escape_form_data(user_id) + "&one_time_token=" + escape_form_data(one_time_token), function (response) {
            close_wait_screen();
            
            if (response === "SUCCESSFULLY_REVOKED") {
                mes("運用情報を取り消しました");
                
                if (square_popup_is_open) {
                    close_square_popup();
                }
                popup_close(true);
                
                update_operation_data(function () {}, function () {}, function () {
                    switch (mode_val) {
                        case 0:
                            position_change_time(0);
                            break;
                        
                        case 1:
                            timetable_select_station(timetable_selected_station);
                            break;
                        
                        case 2:
                            operation_data_draw();
                            break;
                        
                        case 3:
                            if (selected_formation_name !== null) {
                                formation_detail(selected_formation_name);
                            }
                            break;
                    }
                }, function () {}, operation_date_last, mode_val <= 1 && "joined_railroads" in railroad_info ? railroad_info["joined_railroads"] : null, true);
            }
        });
    }
}

function time_out_setting (user_id_or_ip_address, railroad_id) {
    var popup_inner_elm = open_square_popup("time_out_popup");
    
    if (!user_id_or_ip_address.includes(".") && !user_id_or_ip_address.includes(":")) {
        var target_is_user_id = true;
    } else {
        var target_is_user_id = false;
    }
    
    var buf = "<h4>タイムアウト対象の" + (target_is_user_id ? "ユーザーID" : "IPアドレス") + "</h4>";
    buf += "<b>" + user_id_or_ip_address + "</b>";
    buf += "<h4>タイムアウト期間</h4>";
    buf += "<input type='number' id='timed_out_days' min='1' max='90' value='7'>日間<br>";
    buf += "<br><br><button type='button' class='wide_button' onclick='time_out_" + (target_is_user_id ? "user" : "ip_address") + "(\"" + add_slashes(user_id_or_ip_address) + "\", \"" + railroad_id + "\");'>タイムアウトを設定</button>";
    
    popup_inner_elm.innerHTML = buf;
}

function time_out_user (user_id, railroad_id) {
    open_wait_screen();
    
    if (one_time_token === null) {
        close_wait_screen();
        
        mes("内部処理が完了していないため、数秒待ってから再送信してください", true);
        
        return;
    }
    
    ajax_post("time_out_user.php", "railroad_id=" + escape_form_data(railroad_id) + "&user_id=" + escape_form_data(user_id) + "&timed_out_days=" + escape_form_data(document.getElementById("timed_out_days").value) + "&one_time_token=" + escape_form_data(one_time_token), function (response) {
        close_wait_screen();
        
        if (response === "SUCCEEDED") {
            mes("ユーザーをタイムアウトしました");
            
            close_square_popup();
            
            show_moderation_info(railroad_id, user_id, null);
        }
        
        get_one_time_token();
    });
}

function time_out_ip_address (ip_address, railroad_id) {
    open_wait_screen();
    
    if (one_time_token === null) {
        close_wait_screen();
        
        mes("内部処理が完了していないため、数秒待ってから再送信してください", true);
        
        return;
    }
    
    ajax_post("time_out_ip_address.php", "railroad_id=" + escape_form_data(railroad_id) + "&ip_address=" + escape_form_data(ip_address) + "&timed_out_days=" + escape_form_data(document.getElementById("timed_out_days").value) + "&one_time_token=" + escape_form_data(one_time_token), function (response) {
        close_wait_screen();
        
        if (response === "SUCCEEDED") {
            mes("IPアドレスをタイムアウトしました");
            
            close_square_popup();
            
            show_moderation_info(railroad_id, null, ip_address);
        }
        
        get_one_time_token();
    });
}


function show_captcha (callback_func) {
    var popup_inner_elm = open_square_popup("captcha_popup", false, "画像認証");
    
    var buf = "<div id='captcha_info' class='informational_text' style='display: none;'>画像に表示されている文字を入力してください。</div>";
    buf += "<div id='captcha_area' class='wait_icon'></div>";
    buf += "<button type='button' id='captcha_submit_button' class='wide_button' style='display: none;'>送信</button>";
    
    popup_inner_elm.innerHTML = buf;
    
    zizai_captcha_get_html(function (html) {
        var captcha_submit_button_elm = document.getElementById("captcha_submit_button");
        
        document.getElementById("captcha_area").innerHTML = html;
        document.getElementById("captcha_info").style.display = "block";
        captcha_submit_button_elm.style.display = "block";
        
        captcha_submit_button_elm.onclick = callback_func;
    }, config["dark_mode"] ? "#777777 !important" : "#eeeeee");
}


function show_login_form () {
    var popup_inner_elm = open_square_popup("login_popup");
    
    var buf = "<h4>IDまたはメールアドレス</h4>";
    buf += "<input type='text' id='login_user_id' autocomplete='username'>";
    buf += "<h4>パスワード</h4>";
    buf += "<input type='password' id='login_password' autocomplete='current-password'>";
    buf += "<div class='link_block'><a href='/user/send_password_reset_email.php' target='_blank' rel='opener'>パスワードを忘れた場合</a></div>";
    buf += "<button type='button' class='wide_button' onclick='challenge_login();'>ログイン</button>";
    
    popup_inner_elm.innerHTML = buf;
}

function challenge_login () {
    open_wait_screen();
    
    var user_id = document.getElementById("login_user_id").value;
    var password = document.getElementById("login_password").value;
    
    ajax_post("login.php", "user_id=" + escape_form_data(user_id) + "&password=" + escape_form_data(password), function (response) {
        close_wait_screen();
        
        if (response !== false) {
            mes("ログインしました");
            
            update_user_data(JSON.parse(response));
            close_square_popup();
            popup_close(true);
        }
    });
}

function user_logout () {
    if (confirm("ログアウトしますか？")) {
        open_wait_screen();
        
        ajax_post("logout.php", null, function (response) {
            close_wait_screen();
            
            if (response !== false) {
                mes("ログアウトしました");
                
                update_user_data();
            }
        });
    }
}


function about_railroad_data () {
    var popup_inner_elm = open_popup("about_railroad_data_popup");
    
    var buf = "<h2 style='background-color: " + (config["dark_mode"] ? convert_color_dark_mode(railroad_info["main_color"]) : railroad_info["main_color"]) + ";'><img src='" + railroad_info["railroad_icon"] + "' alt=''>" + railroad_info["railroad_name"] + "</h2>";
    
    if ("description" in railroad_info && railroad_info["description"].length >= 1) {
        buf += "<div class='long_text'>" + convert_to_html(railroad_info["description"]) + "</div>";
    }
    
    if ("editors" in railroad_info && railroad_info["editors"].length >= 1) {
        buf += "<h3>製作者</h3>";
        
        for (var editor of railroad_info["editors"]) {
            if ("editor_url" in editor && editor["editor_url"].length >= 1) {
                buf += "<h4><a href='" + editor["editor_url"] + "' target='_blank' class='external_link'>" + escape_html(editor["editor_name"]) + "</a></h4>";
            } else {
                buf += "<h4>" + escape_html(editor["editor_name"]) + "</h4>";
            }
            
            if ("introduction_text" in editor && editor["introduction_text"].length >= 1) {
                buf += "<div class='informational_text'>" + escape_html(editor["introduction_text"]).replace(/\n/g, "<br>") + "</div>";
            }
        }
    }
    
    if ("license_text" in railroad_info && railroad_info["license_text"].length >= 1) {
        buf += "<h3>ライセンス</h3><div class='long_text'>" + convert_to_html(railroad_info["license_text"]) + "</div>";
    }
    
    if ("acknowledgment" in railroad_info && railroad_info["acknowledgment"].length >= 1) {
        buf += "<h3>謝辞</h3><div class='long_text'>" + convert_to_html(railroad_info["acknowledgment"]) + "</div>";
    }
    
    if ("related_links" in railroad_info && railroad_info["related_links"].length >= 1) {
        buf += "<h3>関連リンク</h3>";
        
        for (var related_link of railroad_info["related_links"]) {
            buf += "<h4><a href='" + related_link["link_url"] + "' target='_blank' class='external_link'>" + escape_html(related_link["link_text"]) + "</a></h4>";
            
            if ("link_description" in related_link && related_link["link_description"].length >= 1) {
                buf += "<div class='informational_text'>" + escape_html(related_link["link_description"]).replace(/\n/g, "<br>") + "</div>";
            }
        }
    }
    
    buf += "<h3>データ更新日時</h3><div class='informational_text'>";
    buf += "路線系統情報: " + get_date_and_time(railroad_info["last_modified_timestamp"]) + "<br>";
    buf += "ダイヤ改正一覧情報: " + get_date_and_time(diagram_revisions["last_modified_timestamp"]);
    buf += "</div>";
    
    popup_inner_elm.innerHTML = buf;
    
    document.getElementById("about_railroad_data_popup").scrollTop = 0;
}


function edit_config () {
    var popup_inner_elm = open_popup("config_popup", "アプリの設定");
    
    var buf = "<h4>お気に入り路線系統</h4>";
    buf += "<ul id='config_favorite_railroads' class='rearrangeable_list'></ul>";
    buf += "<input type='checkbox' id='show_favorite_railroads_check' class='toggle' onchange='change_config();'" + (config["show_favorite_railroads"] ? " checked='checked'" : "") + "><label for='show_favorite_railroads_check'>お気に入り路線系統を表示</label>";
    
    buf += "<h4>お気に入り駅</h4>";
    buf += "<ul id='config_favorite_stations' class='rearrangeable_list'></ul>";
    buf += "<input type='checkbox' id='show_favorite_stations_check' class='toggle' onchange='change_config();'" + (config["show_favorite_stations"] ? " checked='checked'" : "") + "><label for='show_favorite_stations_check'>お気に入り駅を表示</label>";
    
    buf += "<h4>各種設定</h4>";
    buf += "<input type='checkbox' id='dark_mode_check' class='toggle' onchange='change_config();'" + (config["dark_mode"] ? " checked='checked'" : "") + "><label for='dark_mode_check'>ダークテーマ</label>";
    buf += "<input type='checkbox' id='enlarge_display_size_check' class='toggle' onchange='change_config();'" + (config["enlarge_display_size"] ? " checked='checked'" : "") + "><label for='enlarge_display_size_check'>各種表示サイズの拡大</label>";
    buf += "<input type='checkbox' id='colorize_corrected_posts_check' class='toggle' onchange='change_config();'" + (config["colorize_corrected_posts"] ? " checked='checked'" : "") + "><label for='colorize_corrected_posts_check'>訂正された投稿を区別する</label>";
    buf += "<input type='checkbox' id='colorize_beginners_posts_check' class='toggle' onchange='change_config();'" + (config["colorize_beginners_posts"] ? " checked='checked'" : "") + "><label for='colorize_beginners_posts_check'>ビギナーの方の投稿を区別する</label>";
    buf += "<h5>運用情報の自動更新間隔</h5>";
    buf += "<input type='number' id='refresh_interval' min='1' max='60' onchange='change_config();' value='" + config["refresh_interval"] + "'>分ごと";
    buf += "<h5>運用情報のキャッシュ保管日数</h5>";
    buf += "<input type='number' id='operation_data_cache_period' min='1' max='30' onchange='change_config();' value='" + config["operation_data_cache_period"] + "'>日前以降のキャッシュを保管";
    buf += "<h5>走行位置表示時刻調節ボタンの動作</h5>";
    buf += "<input type='number' id='position_mode_minute_step' min='1' max='10' onchange='change_config();' value='" + config["position_mode_minute_step"] + "'>分単位で増減";
    buf += "<u class='execute_link' onclick='reset_config_value();'>デフォルト値に戻す</u>";
    buf += "<a href='/user/clear_caches.php' class='execute_link' target='_blank' rel='opener'>設定・キャッシュデータの削除</a>";
    buf += "<div class='informational_text'>変更内容は自動で保存されます</div>";
    
    popup_inner_elm.innerHTML = buf;
    
    get_railroad_list(function () {
        config_draw_favorite_railroads();
        config_draw_favorite_stations();
    });
}

function change_config () {
    config["show_favorite_railroads"] = document.getElementById("show_favorite_railroads_check").checked;
    config["show_favorite_stations"] = document.getElementById("show_favorite_stations_check").checked;
    config["dark_mode"] = document.getElementById("dark_mode_check").checked;
    config["enlarge_display_size"] = document.getElementById("enlarge_display_size_check").checked;
    config["colorize_corrected_posts"] = document.getElementById("colorize_corrected_posts_check").checked;
    config["colorize_beginners_posts"] = document.getElementById("colorize_beginners_posts_check").checked;
    
    var refresh_interval_elm = document.getElementById("refresh_interval");
    if (Number(refresh_interval_elm.value) > 60) {
        refresh_interval_elm.value = 60;
    } else if (Number(refresh_interval_elm.value) < 1) {
        refresh_interval_elm.value = 1;
    }
    config["refresh_interval"] = Number(refresh_interval_elm.value);
    
    var operation_data_cache_period_elm = document.getElementById("operation_data_cache_period");
    if (Number(operation_data_cache_period_elm.value) > 30) {
        operation_data_cache_period_elm.value = 30;
    } else if (Number(operation_data_cache_period_elm.value) < 1) {
        operation_data_cache_period_elm.value = 1;
    }
    config["operation_data_cache_period"] = Number(operation_data_cache_period_elm.value);
    
    var position_mode_minute_step_elm = document.getElementById("position_mode_minute_step");
    if (Number(position_mode_minute_step_elm.value) > 10) {
        position_mode_minute_step_elm.value = 10;
    } else if (Number(position_mode_minute_step_elm.value) < 1) {
        position_mode_minute_step_elm.value = 1;
    }
    config["position_mode_minute_step"] = Number(position_mode_minute_step_elm.value);
    
    update_display_settings(true);
    
    save_config();
}

function config_draw_favorite_railroads () {
    var buf = "";
    for (var cnt = 0; cnt < config["favorite_railroads"].length; cnt++) {
        buf += "<li ontouchstart='rearrangeable_list_touch_start(event, \"config_favorite_railroads\", " + cnt + ");' ontouchmove='rearrangeable_list_touch_move(event, \"config_favorite_railroads\", " + cnt + ");' ontouchend='rearrange_favorite_railroads(" + cnt + ", rearrangeable_list_drag_end(\"config_favorite_railroads\"));' onmousedown='rearrangeable_list_mouse_down(event, \"config_favorite_railroads\", " + cnt + ");' onmousemove='rearrangeable_list_mouse_move(event, \"config_favorite_railroads\", " + cnt + ");' onmouseup='rearrange_favorite_railroads(" + cnt + ", rearrangeable_list_drag_end(\"config_favorite_railroads\"));'><button type='button' onclick='railroad_icon_context_menu(\"" + config["favorite_railroads"][cnt] + "\");'></button>" + escape_html(railroads["railroads"][config["favorite_railroads"][cnt]]["railroad_name"]) + "</li>";
    }
    
    document.getElementById("config_favorite_railroads").innerHTML = buf;
}

function config_remove_favorite_railroad (railroad_id) {
    if (railroad_icon_context_menu(railroad_id)) {
        config_draw_favorite_railroads();
    }
}

function config_draw_favorite_stations () {
    var buf = "";
    for (var cnt = 0; cnt < config["favorite_stations"].length; cnt++) {
        buf += "<li ontouchstart='rearrangeable_list_touch_start(event, \"config_favorite_stations\", " + cnt + ");' ontouchmove='rearrangeable_list_touch_move(event, \"config_favorite_stations\", " + cnt + ");' ontouchend='rearrange_favorite_stations(" + cnt + ", rearrangeable_list_drag_end(\"config_favorite_stations\"));' onmousedown='rearrangeable_list_mouse_down(event, \"config_favorite_stations\", " + cnt + ");' onmousemove='rearrangeable_list_mouse_move(event, \"config_favorite_stations\", " + cnt + ");' onmouseup='rearrange_favorite_stations(" + cnt + ", rearrangeable_list_drag_end(\"config_favorite_stations\"));'><button type='button' onclick='config_remove_favorite_station(\"" + config["favorite_stations"][cnt]["railroad_id"] + "\", \"" + config["favorite_stations"][cnt]["line_id"] + "\", \"" + config["favorite_stations"][cnt]["station_name"] + "\");'></button>" + escape_html(config["favorite_stations"][cnt]["station_name"]) + "<small>(" + escape_html(railroads["railroads"][config["favorite_stations"][cnt]["railroad_id"]]["railroad_name"]) + ")</small></li>";
    }
    
    document.getElementById("config_favorite_stations").innerHTML = buf;
}

function config_remove_favorite_station (railroad_id, line_id, station_name) {
    if (remove_favorite_station(railroad_id, line_id, station_name)) {
        config_draw_favorite_stations();
    }
}

var rearrangeable_list_drag_start_y = null;
var rearrangeable_list_item_new_index = 0;

function rearrangeable_list_drag_start (page_y, list_id, item_index) {
    var list_elm = document.getElementById(list_id);
    
    rearrangeable_list_drag_start_y = page_y - list_elm.getBoundingClientRect().top;
    rearrangeable_list_item_new_index = item_index;
    
    var items = list_elm.getElementsByTagName("li");
    
    list_elm.style.height = items.length * 48 + "px";
    
    for (var cnt = 0; cnt < items.length; cnt++) {
        items[cnt].style.position = "absolute";
        items[cnt].style.top = cnt * 48 + "px";
        if (cnt === item_index) {
            items[cnt].style.zIndex = "2";
        } else {
            items[cnt].style.zIndex = "1";
        }
    }
}

function rearrangeable_list_touch_start (event, list_id, item_index) {
    rearrangeable_list_drag_start(event.touches[0].pageY, list_id, item_index);
}

function rearrangeable_list_mouse_down (event, list_id, item_index) {
    rearrangeable_list_drag_start(event.pageY, list_id, item_index);
}

function rearrangeable_list_drag_move (page_y, list_id, item_index) {
    var list_elm = document.getElementById(list_id);
    
    var touch_y = page_y - list_elm.getBoundingClientRect().top;
    
    var items = list_elm.getElementsByTagName("li");
    
    if (touch_y < 0) {
        touch_y = 0;
    } else if (touch_y > items.length * 48) {
        touch_y = items.length * 48;
    }
    
    var move_amount = touch_y - rearrangeable_list_drag_start_y;
    rearrangeable_list_item_new_index = item_index + Math.round(move_amount / 48);
    
    if (rearrangeable_list_item_new_index < 0) {
        rearrangeable_list_item_new_index = 0;
    } else if (rearrangeable_list_item_new_index >= items.length) {
        rearrangeable_list_item_new_index = items.length - 1;
    }
    
    for (var cnt = 0; cnt < items.length; cnt++) {
        if (cnt === item_index) {
            items[cnt].style.top = 48 * cnt + move_amount + "px";
        } else if (cnt < item_index && cnt >= rearrangeable_list_item_new_index) {
            items[cnt].style.top = 48 * (cnt + 1) + "px";
            items[cnt].classList.add("rearrangeable_list_item_moving");
        } else if (cnt > item_index && cnt <= rearrangeable_list_item_new_index) {
            items[cnt].style.top = 48 * (cnt - 1) + "px";
            items[cnt].classList.add("rearrangeable_list_item_moving");
        } else {
            items[cnt].style.top = 48 * cnt + "px";
        }
    }
}

function rearrangeable_list_touch_move (event, list_id, item_index) {
    event.preventDefault();
    
    rearrangeable_list_drag_move(event.touches[0].pageY, list_id, item_index);
}

function rearrangeable_list_mouse_move (event, list_id, item_index) {
    if (rearrangeable_list_drag_start_y !== null) {
        rearrangeable_list_drag_move(event.pageY, list_id, item_index);
    }
}

function rearrangeable_list_drag_end (list_id) {
    rearrangeable_list_drag_start_y === null;
    
    var list_elm = document.getElementById(list_id);
    
    list_elm.style.height = "fit-content";
    
    for (var list_item of list_elm.getElementsByTagName("li")) {
        list_item.style.position = "static";
        list_item.classList.remove("rearrangeable_list_item_moving");
    }
    
    return rearrangeable_list_item_new_index;
}

function rearrange_favorite_railroads (old_index, new_index) {
    if (new_index === old_index) {
        return;
    }
    
    var new_favorite_railroads = [];
    var moving_item_data = config["favorite_railroads"].splice(old_index, 1)[0];
    for (var cnt = 0; cnt <= config["favorite_railroads"].length; cnt++) {
        if (cnt === new_index) {
            new_favorite_railroads.push(moving_item_data);
        }
        
        if (cnt < config["favorite_railroads"].length) {
            new_favorite_railroads.push(config["favorite_railroads"][cnt]);
        }
    }
    
    config["favorite_railroads"] = new_favorite_railroads;
    
    save_config();
    
    config_draw_favorite_railroads();
    update_display_settings(true);
}

function rearrange_favorite_stations (old_index, new_index) {
    if (new_index === old_index) {
        return;
    }
    
    var new_favorite_stations = [];
    var moving_item_data = config["favorite_stations"].splice(old_index, 1)[0];
    for (var cnt = 0; cnt <= config["favorite_stations"].length; cnt++) {
        if (cnt === new_index) {
            new_favorite_stations.push(moving_item_data);
        }
        
        if (cnt < config["favorite_stations"].length) {
            new_favorite_stations.push(config["favorite_stations"][cnt]);
        }
    }
    
    config["favorite_stations"] = new_favorite_stations;
    
    save_config();
    
    config_draw_favorite_stations();
    update_display_settings(true);
}

function reset_config_value () {
    if (confirm("設定をリセットしますか？")) {
        var dafault_config = get_default_config();
        
        document.getElementById("dark_mode_check").checked = dafault_config["dark_mode"];
        document.getElementById("colorize_corrected_posts_check").checked = dafault_config["colorize_corrected_posts"];
        document.getElementById("colorize_beginners_posts_check").checked = dafault_config["colorize_beginners_posts"];
        document.getElementById("refresh_interval").value = dafault_config["refresh_interval"];
        document.getElementById("operation_data_cache_period").value = dafault_config["operation_data_cache_period"];
        document.getElementById("position_mode_minute_step").value = dafault_config["position_mode_minute_step"];
        
        change_config();
    }
}


var rules_continue_func = null;

function show_rules (continue_func = null) {
    if (!navigator.onLine) {
        mes("ルールの閲覧にはネットワーク接続が必要です", true);
        return;
    }
    
    if (typeof continue_func === "function") {
        rules_continue_func = continue_func;
        var get_param = "?show_accept_button=yes";
    } else {
        rules_continue_func = null;
        var get_param = "";
    }
    
    window.open("/user/rules.php" + get_param);
}

function accept_rules () {
    rules_continue_func();
    
    rules_continue_func = null;
}


function show_about () {
    var popup_inner_elm = open_popup("about_popup");
    
    var buf = "<img src='/apple-touch-icon.webp' alt='" + UNYOHUB_APP_NAME + "' id='unyohub_icon'>";
    buf += "<h2>" + escape_html(instance_info["instance_name"]) + "</h2>";
    
    if ("introduction_text" in instance_info) {
        buf += "<div class='long_text'>" + convert_to_html(instance_info["introduction_text"]) + "</div>";
    }
    
    if ("manual_url" in instance_info) {
        buf += "<div class='link_block'><a href='" + add_slashes(instance_info["manual_url"]) + "' target='_blank' class='external_link'>" + escape_html(instance_info["instance_name"]) + "の使い方</a></div>";
    }
    buf += "<div class='link_block'><a href='/user/rules.php' target='_blank'>ルールとポリシー</a></div>";
    
    buf += "<h3>運営者</h3>";
    if ("administrator_name" in instance_info) {
        if ("administrator_url" in instance_info) {
            buf += "<h4><a href='" + add_slashes(instance_info["administrator_url"]) + "' target='_blank' class='external_link'>" + escape_html(instance_info["administrator_name"]) + "</a></h4>";
        } else {
            buf += "<h4>" + escape_html(instance_info["administrator_name"]) + "</h4>";
        }
    }
    if ("administrator_introduction" in instance_info) {
        buf += "<div class='long_text'>" + convert_to_html(instance_info["administrator_introduction"]) + "</div>";
    }
    
    buf += "<h3>アプリケーション情報</h3>";
    buf += "<h4>" + UNYOHUB_APP_NAME + " v" + UNYOHUB_VERSION + "</h4>";
    buf += "<div class='link_block'><a href='" + UNYOHUB_APP_INFO_URL + "' target='_blank' class='external_link'>" + UNYOHUB_APP_NAME + "について</a></div>";
    buf += "<h5>ライセンス</h5>";
    buf += "<div class='informational_text'>" + UNYOHUB_LICENSE_TEXT + "</div>";
    buf += "<h5>ソースコード</h5>";
    buf += "<div class='link_block'><a href='" + UNYOHUB_REPOSITORY_URL + "' target='_blank' class='external_link'>" + UNYOHUB_REPOSITORY_URL + "</a></div>";
    
    popup_inner_elm.innerHTML = buf;
}


function reload_app () {
    open_wait_screen();
    
    setTimeout(function () {
        if (location.pathname === "/") {
            location.reload();
        } else {
            location.pathname = "/";
        }
    }, 100);
}


window.onpopstate = function () {
    if (square_popup_is_open) {
        close_square_popup(false);
    } else if (popup_history.length >= 1) {
        popup_close(false, false);
    } else {
        if (location.pathname === "/") {
            reload_app();
            return;
        }
        
        var path_info = location.pathname.split("/");
        
        var railroad_id = path_info[1].substring(9);
        var mode_name = path_info.length >= 3 && path_info[2].length >= 1 ? path_info[2] : "position";
        var mode_option_1 = path_info.length >= 4 && path_info[3].length >= 1 ? decodeURIComponent(path_info[3]) : null;
        var mode_option_2 = path_info.length >= 5 && path_info[4].length >= 1 ? decodeURIComponent(path_info[4]) : null;
        
        if (railroad_id !== railroad_info["railroad_id"]) {
            select_railroad(railroad_id, mode_name + "_mode", mode_option_1, mode_option_2);
            return;
        }
        
        switch (mode_val) {
            case 1:
                if (mode_name === "timetable") {
                    if (mode_option_2 === null) {
                        timetable_change_lines(mode_option_1, true);
                    } else {
                        timetable_select_station(mode_option_2, mode_option_1);
                    }
                }
                
                break;
            
            case 3:
                if (mode_name === "formations") {
                    if (mode_option_1 === null) {
                        draw_formation_table();
                    } else {
                        formation_detail(mode_option_1);
                    }
                    return;
                }
                
                break;
            
            case 4:
                if (mode_name === "operation_table") {
                    operation_table_mode(mode_option_1);
                    return;
                }
                break;
        }
        
        select_mode(mode_name + "_mode", mode_option_1, mode_option_2);
    }
};


(function () {
    var body_elm = document.getElementsByTagName("body")[0];
    
    var captcha_script_elm = document.createElement("script");
    captcha_script_elm.src = "/libs/zizai_captcha/captcha.js";
    captcha_script_elm.async = true;
    body_elm.appendChild(captcha_script_elm);
    
    var elem2img_script_elm = document.createElement("script");
    elem2img_script_elm.src = "/libs/elem2img.js";
    elem2img_script_elm.async = true;
    body_elm.appendChild(elem2img_script_elm);
} ());


if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service_worker.php");
}
