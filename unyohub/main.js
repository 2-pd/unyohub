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
        "show_train_types_in_position_mode" : false,
        "show_deadhead_trains_on_timetable" : true,
        "show_starting_trains_only_on_timetable" : false,
        "colorize_corrected_posts" : false,
        "colorize_beginners_posts" : false,
        "colorize_formation_table" : true,
        "simplify_operation_details" : false
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
            instance_name : UNYOHUB_APP_NAME
        };
        
        var last_modified_timestamp_q = null;
    }
    
    update_instance_info();
    
    ajax_post("instance_info.php", last_modified_timestamp_q, function (response, last_modified) {
        if (response !== false && response !== "NO_UPDATES_AVAILABLE") {
            instance_info = JSON.parse(response);
            
            var last_modified_date = new Date(last_modified);
            instance_info["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
            
            localStorage.setItem("unyohub_instance_info", JSON.stringify(instance_info));
            
            update_instance_info();
        }
    });
}());


(function () {
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
        };
    };
}());


var railroad_info = null;
var train_icons = null;
var formations = null;
var diagram_revisions = null;
var diagram_info = null;


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
                    update_railroad_list(railroads, "splash_screen_inner", loading_completed);
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
                if (diagram_info === null) {
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
            splash_screen_login_status_elm.innerHTML = "<b>" + escape_html(user_name) + "</b> さん<a id='logout_button' href='javascript:void(0);' onclick='user_logout();'>ログアウト</a><a id='user_info_button' href='/user/user_info.php' target='_blank' rel='opener'>利用者情報</a>";
        }
    } else {
        menu_logged_in_elm.style.display = "none";
        menu_not_logged_in_elm.style.display = "block";
        
        if (location.pathname === "/") {
            splash_screen_login_status_elm.innerHTML = "<b>ゲストモード</b>です<a id='login_button' href='javascript:void(0);' onclick='show_login_form();'>ログイン</a><a id='sign_up_button' href='/user/sign_up.php' target='_blank' rel='opener'>新規登録</a>";
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

function update_railroad_list (railroads, area_id, loading_completed, categories = null) {
    if (categories === null) {
        categories = railroads["categories"];
    }
    
    var categories_html = "";
    var icons_html = "";
    
    var heading_cnt = 0;
    
    for (var category of categories) {
        var category_html = " style='color: " + (config["dark_mode"] ? convert_color_dark_mode(category["category_color"]) : category["category_color"]) + ";'><b>" + escape_html(category["category_name"]) + "</b></";
        categories_html += "<li class='category_index' onclick='scroll_to_category(" + heading_cnt + ");'" + category_html + "li>";
        icons_html += "<h3 class='icon_heading'" + category_html + "h3>";
        
        heading_cnt++;
        
        if ("subcategories" in category) {
            for (var subcategory of category["subcategories"]) {
                var subcategory_html = " style='color: " + (config["dark_mode"] ? convert_color_dark_mode(subcategory["subcategory_color"]) : subcategory["subcategory_color"]) + ";'><span>" + escape_html(subcategory["subcategory_name"]) + "</span></";
                categories_html += "<li class='subcategory_index' onclick='scroll_to_category(" + heading_cnt + ");'" + subcategory_html + "li>";
                icons_html += "<h4 class='icon_heading'" + subcategory_html + "h3>";
                
                heading_cnt++;
                
                for (var railroad_id of subcategory["railroads"]) {
                    icons_html += "<a href='/railroad_" + railroad_id + "/' onclick='event.preventDefault(); select_railroad(\"" + railroad_id + "\");'><img src='" + railroads["railroads"][railroad_id]["railroad_icon"] + "' alt='' style='background-color: " + railroads["railroads"][railroad_id]["main_color"] + ";'>" + escape_html(railroads["railroads"][railroad_id]["railroad_name"]) + "</a>";
                }
            }
        } else if ("railroads" in category) {
            for (var railroad_id of category["railroads"]) {
                icons_html += "<a href='/railroad_" + railroad_id + "/' onclick='event.preventDefault(); select_railroad(\"" + railroad_id + "\");'><img src='" + railroads["railroads"][railroad_id]["railroad_icon"] + "' alt='' style='background-color: " + railroads["railroads"][railroad_id]["main_color"] + ";'>" + escape_html(railroads["railroads"][railroad_id]["railroad_name"]) + "</a>";
            }
        }
    }
    
    if (!loading_completed) {
        categories_html += "<div class='loading_icon'></div>";
    } else if (categories.length === 0) {
        icons_html = "<div class='no_data'>利用可能なデータがありません</div>";
    }
    
    document.getElementById(area_id).innerHTML = "<ul id='category_area'>" + categories_html + "</ul><div id='icon_area' onscroll='icon_area_onscroll();'>" + icons_html + "</div>";
    
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

function show_railroad_list (railroad_list = null) {
    open_popup("railroad_select_popup", "路線系統の切り替え");
    
    var popup_elm = document.getElementById("railroad_select_popup");
    
    get_railroad_list(function (railroads, loading_completed) {
        if (railroad_list === null) {
            popup_elm.classList.remove("railroad_select_no_categories");
            
            update_railroad_list(railroads, "railroad_select_popup_inner", loading_completed);
        } else {
            popup_elm.classList.add("railroad_select_no_categories");
            
            update_railroad_list(railroads, "railroad_select_popup_inner", loading_completed, [{ category_name : "乗り換え可能な路線系統", category_color : "#333333", railroads : railroad_list }]);
        }
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
    alert("端末がオフライン状態のため、前回アクセス時のデータを表示します。\nこの状態では一部の機能がご利用いただけません。");
}


window.onload = function () {
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
    } else if (location.pathname.length >= 2) {
        reload_app();
    } else {
        get_railroad_list(function (railroads, loading_completed) {
            update_railroad_list(railroads, "splash_screen_inner", loading_completed);
        });
    }
    
    if (navigator.onLine) {
        check_logged_in();
    } else {
        on_off_line();
    }
    
    check_announcements(true);
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


function update_railroad_info () {
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


var series_icon_ids;
var formation_styles_available = false;

function update_formation_styles () {
    series_icon_ids = {};
    
    for (var series_name of formations["series_names"]) {
        series_icon_ids[series_name] = formations["series"][series_name]["icon_id"];
        
        if ("subseries_names" in formations["series"][series_name]) {
            for (var subseries_name of formations["series"][series_name]["subseries_names"]) {
                series_icon_ids[series_name + subseries_name] = formations["series"][series_name]["subseries"][subseries_name]["icon_id"];
            }
        }
    }
    
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


var blank_article_elm = document.getElementById("blank_article");

function select_railroad (railroad_id, mode_name = "position_mode", mode_option_1 = null, mode_option_2 = null) {
    splash_screen_elm.style.display = "none";
    splash_screen_elm.innerHTML = "";
    if (popup_history.length >= 1) {
        popup_close();
    }
    
    change_mode(-1);
    
    header_elm.className = "";
    
    var promise_1 = new Promise(function (resolve, reject) {
        var resolved = false;
        
        idb_start_transaction("railroads", false, function (transaction) {
            var railroads_store = transaction.objectStore("railroads");
            var get_request = railroads_store.get(railroad_id);
            
            get_request.onsuccess = function (evt) {
                if (evt.target.result !== undefined) {
                    railroad_info = evt.target.result;
                    
                    update_railroad_info();
                    
                    var last_modified_timestamp = railroad_info["last_modified_timestamp"];
                    
                    resolve();
                    resolved = true;
                } else {
                    var last_modified_timestamp = 0;
                }
                
                if (navigator.onLine) {
                    ajax_post("railroad_info.php", "railroad_id=" + escape_form_data(railroad_id) + "&last_modified_timestamp=" + last_modified_timestamp, function (response, last_modified) {
                        if (response !== false && response !== "NO_UPDATES_AVAILABLE") {
                            railroad_info = JSON.parse(response);
                            
                            railroad_info["railroad_id"] = railroad_id;
                            
                            var last_modified_date = new Date(last_modified);
                            railroad_info["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                            
                            var railroad_info_new = {...railroad_info};
                            
                            update_railroad_info();
                            
                            idb_start_transaction("railroads", true, function (transaction) {
                                var railroads_store = transaction.objectStore("railroads");
                                railroads_store.put(railroad_info_new);
                            });
                            
                            if (!resolved) {
                                resolve();
                            }
                        } else if (!resolved) {
                            reject();
                        }
                    });
                } else if (!resolved) {
                    reject();
                }
            };
        });
    });
    
    var promise_2 = new Promise(function (resolve, reject) {
        var resolved = false;
        
        idb_start_transaction("train_icons", false, function (transaction) {
            var railroads_store = transaction.objectStore("train_icons");
            var get_request = railroads_store.get(railroad_id);
            
            get_request.onsuccess = function (evt) {
                if (evt.target.result !== undefined) {
                    train_icons = evt.target.result;
                    var last_modified_timestamp = train_icons["last_modified_timestamp"];
                    
                    resolve();
                    resolved = true;
                } else {
                    train_icons = {railroad_id : null};
                    var last_modified_timestamp = 0;
                }
                
                if (navigator.onLine) {
                    ajax_post("train_icons.php", "railroad_id=" + escape_form_data(railroad_id) + "&last_modified_timestamp=" + last_modified_timestamp, function (response, last_modified) {
                        if (response !== false && response !== "NO_UPDATES_AVAILABLE") {
                            train_icons = {icons : JSON.parse(response)};
                            
                            train_icons["railroad_id"] = railroad_id;
                            
                            var last_modified_date = new Date(last_modified);
                            train_icons["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                            
                            idb_start_transaction("train_icons", true, function (transaction) {
                                var icons_store = transaction.objectStore("train_icons");
                                icons_store.put(train_icons);
                            });
                            
                            if (!resolved) {
                                resolve();
                            }
                        } else if (!resolved) {
                            reject();
                        }
                    });
                } else if (!resolved) {
                    reject();
                }
            };
        });
    });
    
    var promise_3 = new Promise(function (resolve, reject) {
        var resolved = false;
        
        idb_start_transaction("formations", false, function (transaction) {
            var formations_store = transaction.objectStore("formations");
            var get_request = formations_store.get(railroad_id);
            
            get_request.onsuccess = function (evt) {
                if (evt.target.result !== undefined) {
                    formations = evt.target.result;
                    var last_modified_timestamp = formations["last_modified_timestamp"];
                    
                    resolve();
                    resolved = true;
                } else {
                    var last_modified_timestamp = 0;
                }
                
                if (navigator.onLine) {
                    ajax_post("formations.php", "railroad_id=" + escape_form_data(railroad_id) + "&last_modified_timestamp=" + last_modified_timestamp, function (response, last_modified) {
                        if (response !== false && response !== "NO_UPDATES_AVAILABLE") {
                            formations = JSON.parse(response);
                            
                            formations["railroad_id"] = railroad_id;
                            
                            var last_modified_date = new Date(last_modified);
                            formations["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                            
                            idb_start_transaction("formations", true, function (transaction) {
                                var formations_store = transaction.objectStore("formations");
                                formations_store.put(formations);
                            });
                            
                            if (!resolved) {
                                resolve();
                            } else {
                                update_formation_styles();
                            }
                        } else if (!resolved) {
                            reject();
                        }
                    });
                } else if (!resolved) {
                    reject();
                }
            };
        });
    });
    
    var promise_4 = new Promise(function (resolve, reject) {
        var resolved = false;
        
        idb_start_transaction("formation_overviews", false, function (transaction) {
            var formation_overviews_store = transaction.objectStore("formation_overviews");
            var get_request = formation_overviews_store.get(railroad_id);
            
            get_request.onsuccess = function (evt) {
                if (evt.target.result !== undefined) {
                    formation_overviews = evt.target.result;
                    var last_modified_timestamp = formation_overviews["last_modified_timestamp"];
                    
                    resolve();
                    resolved = true;
                } else {
                    var last_modified_timestamp = 0;
                }
                
                if (navigator.onLine) {
                    ajax_post("formation_overviews.php", "railroad_id=" + escape_form_data(railroad_id) + "&last_modified_timestamp=" + last_modified_timestamp, function (response, last_modified) {
                        if (response !== false && response !== "NO_UPDATES_AVAILABLE") {
                            formation_overviews = {formations : JSON.parse(response)};
                            
                            formation_overviews["railroad_id"] = railroad_id;
                            
                            var last_modified_date = new Date(last_modified);
                            formation_overviews["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                            
                            idb_start_transaction("formation_overviews", true, function (transaction) {
                                var formation_overviews_store = transaction.objectStore("formation_overviews");
                                formation_overviews_store.put(formation_overviews);
                            });
                            
                            if (!resolved) {
                                resolve();
                            } else if (mode_name === "formations_mode") {
                                formations_mode(mode_option_1);
                            }
                        } else if (!resolved) {
                            reject();
                        }
                    });
                } else if (!resolved) {
                    reject();
                }
            };
        });
    });
    
    var promise_5 = new Promise(function (resolve, reject) {
        var tmp_diagram_revision = null;
        
        idb_start_transaction("diagram_revisions", false, function (transaction) {
            var diagram_revisions_store = transaction.objectStore("diagram_revisions");
            var get_request = diagram_revisions_store.get(railroad_id);
            
            get_request.onsuccess = function (evt) {
                if (evt.target.result !== undefined) {
                    diagram_revisions = evt.target.result;
                    var last_modified_timestamp = diagram_revisions["last_modified_timestamp"];
                    
                    resolve();
                    tmp_diagram_revision = get_diagram_revision();
                } else {
                    var last_modified_timestamp = 0;
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
                            
                            if (tmp_diagram_revision === null) {
                                resolve();
                            } else if (tmp_diagram_revision !== get_diagram_revision()) {
                                select_mode(mode_name, mode_option_1, mode_option_2);
                            }
                        } else if (tmp_diagram_revision === null) {
                            reject();
                        }
                    });
                } else if (tmp_diagram_revision === null) {
                    reject();
                }
            };
        });
    });
    
    if (!location.pathname.startsWith("/railroad_" + railroad_id + "/")) {
        document.getElementById("tab_position_mode").setAttribute("href", "/railroad_" + railroad_id + "/");
        document.getElementById("tab_timetable_mode").setAttribute("href", "/railroad_" + railroad_id + "/timetable/");
        document.getElementById("tab_operation_data_mode").setAttribute("href", "/railroad_" + railroad_id + "/operation_data/");
        document.getElementById("tab_formations_mode").setAttribute("href", "/railroad_" + railroad_id + "/formations/");
        document.getElementById("tab_operation_table_mode").setAttribute("href", "/railroad_" + railroad_id + "/operation_table/");
    }
    
    update_railroad_announcement(railroad_id, true);
    
    Promise.all([promise_1, promise_2, promise_3, promise_4, promise_5]).then(function () {
        update_formation_styles();
        
        position_selected_line = railroad_info["lines_order"][0];
        
        select_mode(mode_name, mode_option_1, mode_option_2);
    }, function () {
        mes("選択された路線系統はデータが利用できません", true);
        
        show_railroad_list();
        blank_article_elm.innerHTML = "<div class='no_data'><a href='javascript:void(0);' onclick='show_railroad_list();'>路線系統を選択</a>してください</div>";
    });
}

function select_mode (mode_name, mode_option_1, mode_option_2) {
    switch (mode_name) {
        case "position_mode":
            position_mode();
            break;
        
        case "timetable_mode":
            timetable_mode(true, false);
            
            if (mode_option_2 !== null) {
                timetable_select_station(mode_option_2, mode_option_1);
            } else if (mode_option_1 !== null) {
                timetable_change_lines(mode_option_1);
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

function search_diagram_schedules (date_str) {
    for (var diagram_schedule of diagram_info["diagram_schedules"]) {
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

function get_diagram_id (date_str, callback_func) {
    var railroad_id = railroad_info["railroad_id"];
    var diagram_revision = get_diagram_revision(date_str);
    
    if (diagram_revision === false) {
        callback_func(null);
        return;
    }
    
    if (diagram_info !== null && diagram_info["railroad_id"] === railroad_id && diagram_revision === diagram_info["diagram_revision"]) {
        callback_func(search_diagram_schedules(date_str));
        return;
    }
    
    var tmp_diagram_id = null;
    idb_start_transaction("diagrams", false, function (transaction) {
        var diagrams_store = transaction.objectStore("diagrams");
        var get_request = diagrams_store.get([railroad_id, diagram_revision]);
        
        get_request.onsuccess = function (evt) {
            if (evt.target.result !== undefined) {
                diagram_info = evt.target.result;
                var last_modified_timestamp = diagram_info["last_modified_timestamp"];
                
                tmp_diagram_id = search_diagram_schedules(date_str);
                callback_func(tmp_diagram_id);
            } else {
                var last_modified_timestamp = 0;
            }
            
            if (navigator.onLine) {
                ajax_post("diagram_info.php", "railroad_id=" + escape_form_data(railroad_id) + "&diagram_revision=" + escape_form_data(diagram_revision) + "&last_modified_timestamp=" + last_modified_timestamp, function (response, last_modified) {
                    if (response !== false && response !== "NO_UPDATES_AVAILABLE") {
                        diagram_info = JSON.parse(response);
                        
                        diagram_info["railroad_id"] = railroad_id;
                        diagram_info["diagram_revision"] = diagram_revision;
                        
                        var last_modified_date = new Date(last_modified);
                        diagram_info["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                        
                        idb_start_transaction("diagrams", true, function (transaction) {
                            var diagrams_store = transaction.objectStore("diagrams");
                            diagrams_store.put(diagram_info);
                        });
                        
                        var diagram_id = search_diagram_schedules(date_str);
                        
                        if (diagram_id !== tmp_diagram_id) {
                            callback_func(diagram_id);
                        }
                    }
                });
            } else if (tmp_diagram_id === null) {
                mes("オフラインのためダウンロードが完了していないダイヤ情報データは利用できません", true);
            }
        };
    });
}


var tab_area_elm = document.getElementById("tab_area");
var article_elms = document.getElementsByTagName("article");

tab_area_elm.onselectstart = function (event) { event.preventDefault();  };

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

function load_operation_table (resolve_func, reject_func, diagram_id, update_line_operations = true) {
    var tables = ["operation_tables"];
    
    if (update_line_operations) {
        tables.push("line_operations");
    }
    
    idb_start_transaction(tables, false, function (transaction) {
        
        var last_modified_timestamp = 0;
        
        var operation_tables = transaction.objectStore("operation_tables");
        var operations_get_request = operation_tables.get([railroad_info["railroad_id"], diagram_info["diagram_revision"], diagram_id]);
        
        var promise_list = [new Promise(function (resolve, reject) {
            operations_get_request.onsuccess = function (evt) {
                if (evt.target.result !== undefined) {
                    operation_table = evt.target.result;
                    last_modified_timestamp = operation_table["last_modified_timestamp"];
                }
                
                resolve();
            };
        })];
        
        if (update_line_operations) {
            var line_operations_store = transaction.objectStore("line_operations");
            var line_operations_get_request = line_operations_store.get([railroad_info["railroad_id"], diagram_info["diagram_revision"], diagram_id]);
            
            promise_list.push(new Promise(function (resolve, reject) {
                line_operations_get_request.onsuccess = function (evt) {
                    if (evt.target.result !== undefined) {
                        line_operations = evt.target.result;
                        last_modified_timestamp = line_operations["last_modified_timestamp"];
                    }
                    
                    resolve();
                };
            }));
        }
        
        Promise.all(promise_list).then(function () {
            if (last_modified_timestamp > 0) {
                resolve_func();
            }
            
            update_operation_table(resolve_func, reject_func, diagram_id, last_modified_timestamp);
        });
    });
}

function update_operation_table (resolve_func, reject_func, diagram_id, last_modified_timestamp) {
    var railroad_id = railroad_info["railroad_id"];
    var diagram_revision = diagram_info["diagram_revision"];
    
    if (navigator.onLine) {
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
                
                var lines = railroad_info["lines_order"];
                for (var line_id of lines) {
                    line_operations_data["lines"][line_id] = {
                        inbound_trains : {},
                        outbound_trains : {}
                    };
                }
                
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
                
                operation_table = operation_response;
                line_operations = line_operations_data;
                
                idb_start_transaction(["operation_tables", "line_operations"], true, function (transaction) {
                    var operation_tables_store = transaction.objectStore("operation_tables");
                    operation_tables_store.put(operation_response);
                    
                    var line_operations_store = transaction.objectStore("line_operations");
                    line_operations_store.put(line_operations_data);
                });
                
                resolve_func();
            } else if (last_modified_timestamp === 0) {
                reject_func();
            }
        });
    } else if (last_modified_timestamp === 0) {
        mes("オフラインのためダウンロードが完了していない運用データは利用できません", true);
        
        reject_func();
    }
}


var timetable = null;
var timetable_date = null;

function update_timetable (resolve_func, reject_func, timetable_id) {
    timetable = null;
    
    var railroad_id = railroad_info["railroad_id"];
    var diagram_revision = diagram_info["diagram_revision"];
    
    idb_start_transaction("timetables", false, function (transaction) {
        var timetables_store = transaction.objectStore("timetables");
        var get_request = timetables_store.get([railroad_id, diagram_revision, timetable_id]);
        
        get_request.onsuccess = function (evt) {
            if (evt.target.result !== undefined) {
                timetable = evt.target.result;
                var last_modified_timestamp = timetable["last_modified_timestamp"];
                
                resolve_func();
            } else {
                var last_modified_timestamp = 0;
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
                        
                        resolve_func();
                    } else if (timetable === null) {
                        reject_func();
                    }
                });
            } else {
                if (timetable === null) {
                    mes("オフラインのためダウンロードが完了していない時刻表データは利用できません", true);
                    
                    reject_func();
                }
            }
        };
    });
}


var operation_data = null;
var operation_date_last;
var operation_data_last_updated = null;

function update_operation_data (resolve_func, reject_func, remote_data_only = false, operation_date = null) {
    if (operation_date === null) {
        operation_date = operation_date_last;
    } else {
        operation_data = null;
        operation_date_last = operation_date;
    }
    
    var railroad_id = railroad_info["railroad_id"];
    
    var resolved = false;
    
    idb_start_transaction("operation_data", false, function (transaction) {
        var operation_data_store = transaction.objectStore("operation_data");
        var get_request = operation_data_store.get([railroad_id, operation_date]);
        
        get_request.onsuccess = function (evt) {
            if (evt.target.result !== undefined) {
                operation_data = evt.target.result;
                var last_modified_timestamp = operation_data["last_modified_timestamp"];
                
                if (!remote_data_only) {
                    resolve_func();
                    
                    resolved = true;
                }
            } else {
                var last_modified_timestamp = 0;
            }
            
            if (navigator.onLine) {
                if (operation_data === null) {
                    operation_data = {railroad_id : railroad_id, operation_date : operation_date, operations : {}, last_modified_timestamp : null};
                }
                
                ajax_post("operation_data.php", "railroad_id=" + escape_form_data(railroad_id) + "&date=" + escape_form_data(operation_date) + "&last_modified_timestamp=" + last_modified_timestamp, function (response, last_modified) {
                    if (response !== false) {
                        if (response !== "NO_UPDATES_AVAILABLE" && operation_data["railroad_id"] === railroad_id && operation_data["operation_date"] === operation_date) {
                            Object.assign(operation_data["operations"], JSON.parse(response));
                            
                            var last_modified_date = new Date(last_modified);
                            operation_data["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                            
                            idb_start_transaction("operation_data", true, function (transaction) {
                                var operation_data_store = transaction.objectStore("operation_data");
                                operation_data_store.put(operation_data);
                            });
                            
                            resolve_func();
                        } else if (!resolved) {
                            resolve_func();
                        }
                    } else if (!resolved) {
                        reject_func();
                    }
                });
            } else if (!resolved) {
                operation_data = {railroad_id : railroad_id, operation_date : operation_date, operations : {}, last_modified_timestamp : null};
                
                resolve_func();
            }
        };
    });
    
    operation_data_last_updated = get_timestamp();
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
                update_operation_data(function () {
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
                }, function () {}, true);
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

function position_mode (date_str = "today", position_time_additions = null) {
    change_title(railroad_info["railroad_name"] + "の車両運用情報 | " + instance_info["instance_name"], "/railroad_" + railroad_info["railroad_id"] + "/");
    
    change_mode(0);
    
    var position_scroll_amount = article_elms[0].scrollTop;
    
    position_area_elm.innerHTML = "";
    position_line_select_elm.style.display = "none";
    
    if (date_str === "tomorrow") {
        var timestamp_additions = 86400;
        
        position_last_updated = null;
        position_reload_button_elm.style.display = "block";
    } else {
        var timestamp_additions = 0;
        
        if (position_time_additions === null) {
            position_reload_button_elm.style.display = "none";
        }
    }
    
    document.getElementById("position_date_select").value = date_str;
    
    timetable_date = "__" + date_str + "__";
    
    var operation_data_date = get_date_string(get_timestamp() + timestamp_additions);
    
    get_diagram_id(operation_data_date, function (diagram_id) {
        if (diagram_id === null) {
            return;
        }
        
        var all_resolved = false;
        
        var promise_1_resolved = false;
        var promise_1 = new Promise(function (resolve, reject) {
            load_operation_table(function () {
                if (!promise_1_resolved) {
                    promise_1_resolved = true;
                    resolve();
                } else if (all_resolved) {
                    position_change_time(0);
                }
            }, reject, diagram_id);
        });
        
        var promise_2_resolved = false;
        var promise_2 = new Promise(function (resolve, reject) {
            update_timetable(function () {
                if (!promise_2_resolved) {
                    promise_2_resolved = true;
                    resolve();
                } else if (all_resolved) {
                    position_change_time(0);
                }
            }, reject, diagram_info["diagrams"][diagram_id]["timetable_id"]);
        });
        
        var promise_3_resolved = false;
        var promise_3 = new Promise(function (resolve, reject) {
            update_operation_data(function () {
                if (!promise_3_resolved) {
                    promise_3_resolved = true;
                    resolve();
                } else if (all_resolved) {
                    position_change_time(0);
                }
            }, reject, false, operation_data_date);
        });
        
        if (config["show_train_types_in_position_mode"]) {
            document.getElementById("show_train_types_radio").checked = true;
        } else {
            document.getElementById("show_train_numbers_radio").checked = true;
        }
        
        position_change_time(position_time_additions, false);
        
        Promise.all([promise_1, promise_2, promise_3]).then(function () {
            all_resolved = true;
            
            position_line_select_elm.style.display = "block";
            position_change_lines(position_selected_line, position_scroll_amount);
        }, function () {
            position_area_elm.innerHTML = "<div class='no_data'>表示に必要なデータが利用できません</div>";
            position_line_select_elm.style.display = "none";
        });
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

function position_change_lines (line_id, position_scroll_amount = -1) {
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
                        
                        connecting_lines_html += "<a href='javascript:void(0);' class='connecting_line_" + line_direction + "' onclick='position_change_lines(\"" + connecting_line["line_id"] + "\")' style='color: " + (config["dark_mode"] ? convert_color_dark_mode(railroad_info["lines"][connecting_line["line_id"]]["line_color"]) : railroad_info["lines"][connecting_line["line_id"]]["line_color"]) + ";'><div>" + escape_html(railroad_info["lines"][connecting_line["line_id"]]["line_name"]) + "</div></a>";
                    }
                }
                
                var buf_2 = "";
                for (var junction_class of junction_class_list) {
                    buf_2 += (buf_2.length >= 1 ? " " : "") + "position_row_junction_" + junction_class;
                }
                buf += " class='" + buf_2 + "'";
            }
            
            buf += "><th><a";
            
            if ("is_signal_station" in railroad_info["lines"][line_id]["stations"][cnt - 1] && railroad_info["lines"][line_id]["stations"][cnt - 1]["is_signal_station"]) {
                buf += " href='javascript:void(0);' class='position_signal_station'";
                
                border_style = " style='border-top-color: transparent;'";
                position_station_class = " position_line_signal_station";
            } else {
                buf += " href='/railroad_" + railroad_info["railroad_id"] + "/timetable/" + line_id + "/" + encodeURIComponent(railroad_info["lines"][line_id]["stations"][cnt - 1]["station_name"]) + "/' onclick='event.preventDefault(); show_station_timetable(\"" + line_id + "\", \"" + railroad_info["lines"][line_id]["stations"][cnt - 1]["station_name"] + "\");'";
                
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
            
            buf += "</a>";
            
            if ("connecting_railroads" in railroad_info["lines"][line_id]["stations"][cnt - 1]) {
                var connecting_railroad_list = [];
                for (var connecting_railroad of railroad_info["lines"][line_id]["stations"][cnt - 1]["connecting_railroads"]) {
                    connecting_railroad_list.push("\"" + connecting_railroad["railroad_id"] + "\"");
                }
                
                if (connecting_railroad_list.length >= 1) {
                    buf += "<button type='button' class='connecting_railroads_button' onclick='show_railroad_list([" + connecting_railroad_list.join(",") + "]);'></button>";
                }
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
    
    if (position_scroll_amount >= 0) {
        article_elms[0].scrollTop = position_scroll_amount;
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

function select_lines (lines = null, position_mode = true) {
    var popup_inner_elm = open_square_popup("line_select_popup", true, "路線の選択");
    
    if (lines === null) {
        lines = railroad_info["lines_order"];
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
        
        buf += "<button onclick='close_square_popup(); ";
        
        if (position_mode) {
            buf += "position_change_lines(" + line_id_text + ");";
        } else {
            buf += "timetable_change_lines(" + line_id_text + ");";
        }
        
        buf += "'><abbr style='background-color: " + line_color + ";'>" + line_symbol + "</abbr>" + line_name + "</button>";
    }
    
    popup_inner_elm.innerHTML = buf;
}

function convert_train_position_data (train_data) {
    if (train_data["train_number"].startsWith("_")) {
        train_data["train_title"] = train_data["train_number"].substring(1).split("__")[0];
    } else {
        train_data["train_title"] = train_data["train_number"].split("__")[0];
    }
    
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
    var line_positions = [get_train_positions(line_operations["lines"][position_selected_line]["inbound_trains"], position_selected_line, hh_and_mm, true), get_train_positions(line_operations["lines"][position_selected_line]["outbound_trains"], position_selected_line, hh_and_mm, false)];
    var position_elms = [document.getElementsByClassName("position_inbound"), document.getElementsByClassName("position_outbound")];
    
    for (var direction_cnt = 0; direction_cnt <= 1; direction_cnt++) {
        for (var cnt = 0; cnt < line_positions[direction_cnt].length; cnt++) {
            if (line_positions[direction_cnt][cnt].length === 1) {
                var train = convert_train_position_data(line_positions[direction_cnt][cnt][0]);
                
                var train_color = config["dark_mode"] ? convert_font_color_dark_mode(get_train_color(train["train_title"], "#333333")) : get_train_color(train["train_title"], "#333333");
                
                var buf = "<div onclick='train_detail(\"" + position_selected_line + "\", \"" + train["train_number"] + "\", \"" + train["starting_station"] + "\", \"" + directions[direction_cnt] + "_trains\", true);' style='color: " + train_color + ";'><span class='train_icon_wrapper'><img src='" + get_icon(train["first_formation"]) + "' alt='' class='train_icon'";
                
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
                    
                    buf += "<span class='train_icon_wrapper' onclick='train_detail(\"" + position_selected_line + "\", \"" + train["train_number"] + "\", \"" + train["starting_station"] + "\", \"" + directions[direction_cnt] + "_trains\", true);' style='color: " + (config["dark_mode"] ? convert_font_color_dark_mode(get_train_color(train["train_title"], "#333333")) : get_train_color(train["train_title"], "#333333")) + ";'><img src='" + get_icon(train["first_formation"]) + "' alt='' class='train_icon'";
                    
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
                if (!("hidden_by_default" in operation_table["operations"][operation_number] && operation_table["operations"][operation_number]["hidden_by_default"])) {
                    hidden_by_default = false;
                    break;
                }
            }
            
            if (!(hidden_by_default && hidden_formation_regexp.test(formation_data["formation_text"]))) {
                line_positions[train_position].push({
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
    var first_formation = null;
    var reassigned = false;
    var posts_count = null;
    var variant_exists = false;
    var comment_exists = false;
    var from_beginner = false;
    var is_quotation = false;
    
    if (operation_list !== null) {
        var formation_text = "";
        for (var operation_number of operation_list) {
            if (operation_number in operation_data["operations"] && operation_data["operations"][operation_number] !== null) {
                if (operation_data["operations"][operation_number]["formations"] !== "") {
                    var operation_formation_text = operation_data["operations"][operation_number]["formations"];
                } else {
                    var operation_formation_text = "運休";
                }
                
                if (railroad_info["lines"][line_id]["inbound_forward_direction"] === is_inbound) {
                    if (formation_text.length === 0) {
                        first_formation = operation_data["operations"][operation_number]["formations"].split("+")[0];
                    } else {
                        formation_text += "+";
                    }
                    
                    formation_text += operation_formation_text;
                } else {
                    if (formation_text.length === 0) {
                        var formation_data = operation_data["operations"][operation_number]["formations"].split("+");
                        
                        first_formation = formation_data[formation_data.length - 1];
                    } else {
                        formation_text = "+" + formation_text;
                    }
                    
                    formation_text = operation_formation_text + formation_text;
                }
                
                reassigned = reassigned || ("relieved_formations" in operation_data["operations"][operation_number] && operation_data["operations"][operation_number]["relieved_formations"].length >= 1);
                posts_count = Number(posts_count) + operation_data["operations"][operation_number]["posts_count"];
                variant_exists = variant_exists || ("variant_exists" in operation_data["operations"][operation_number] && operation_data["operations"][operation_number]["variant_exists"]);
                comment_exists = comment_exists || ("comment_exists" in operation_data["operations"][operation_number] && operation_data["operations"][operation_number]["comment_exists"]);
                from_beginner = from_beginner || ("from_beginner" in operation_data["operations"][operation_number] && operation_data["operations"][operation_number]["from_beginner"]);
                is_quotation = is_quotation || ("is_quotation" in operation_data["operations"][operation_number] && operation_data["operations"][operation_number]["is_quotation"]);
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
    } else {
        var formation_text = "?";
    }
    
    return {
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

var position_time;

var position_time_touch_start_y;
var position_time_touch_end_y;

function position_change_time (position_time_additions = null, draw_train_position_now = true) {
    if (position_time_additions === null) {
        position_time = Date.now() / 60000;
    } else if (position_time_additions !== 0) {
        position_time += position_time_additions;
        
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
    
    var area_elm = document.getElementById(area_id);
    
    if (Array.isArray(operation_number_or_list)) {
        operation_number_list = operation_number_or_list;
    } else {
        operation_number_list = [operation_number_or_list];
    }
    
    area_elm.innerHTML = "<div class='loading_icon'></div>".repeat(operation_number_list.length);
    
    ajax_post("operation_data_detail.php", "railroad_id=" + escape_form_data(railroad_info["railroad_id"]) + "&date=" + operation_date + "&operation_numbers=" + escape_form_data(operation_number_list.join()), function (response) {
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
                        user_name_html += "<button type='button' onclick='edit_operation_data(\"" + operation_date + "\", \"" + add_slashes(operation_number) + "\", " + data_item["assign_order"] + ", \"" + add_slashes(data_item["user_id"]) + "\", \"" + add_slashes(formation_text) + "\"" + ip_address_str + ");'>";
                        
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
    
    var buf = "<span class='train_detail_day' style='background-color: " + (config["dark_mode"] ? convert_color_dark_mode(diagram_info["diagrams"][operation_table["diagram_id"]]["main_color"]) : diagram_info["diagrams"][operation_table["diagram_id"]]["main_color"]) + ";'>";
    
    buf += diagram_info["diagrams"][operation_table["diagram_id"]]["diagram_name"];
    
    if (mode_val <= 1) {
        if (timetable_date === "__today__") {
            buf += "(今日)";
            
            var diagram_id_or_ts = get_timestamp();
            is_today = true;
        } else if (timetable_date === "__tomorrow__") {
            buf += "(明日)";
            
            var diagram_id_or_ts = get_timestamp() + 86400;
        }
    } else {
        var diagram_id_or_ts = "\"" + operation_table["diagram_id"] + "\"";
    }
    
    buf += "</span>";
    
    if (train_operations !== null) {
        if (railroad_info["lines"][line_id]["inbound_forward_direction"] !== (train_direction === "inbound_trains")) {
            train_operations.reverse();
        }
        
        var buf_2 = "";
        for (var train_operation of train_operations) {
            buf_2 += (buf_2.length >= 1 ? "+" : "") + "<a href='javascript:void(0);' onclick='operation_detail(\"" + train_operation + "\",";
            if (timetable_date === "__today__" || timetable_date === "__tomorrow__") {
                buf_2 += " " + diagram_id_or_ts + ", true";
            } else {
                buf_2 += " \"" + operation_table["diagram_id"] + "\", false";
            }
            buf_2 += ");'>" + train_operation + "運用(" + operation_table["operations"][train_operation]["car_count"] + "両)</a>";
        }
    } else {
        var buf_2 = "不明な運用";
        
        show_operation_data = false;
    }
    
    buf += "<h3>" + buf_2 + "</h3>";
    
    if (show_operation_data) {
        buf_2 = "";
        var heading_str = "";
        for (var train_operation of train_operations) {
            if (buf_2.length >= 1) {
                buf_2 += " +";
            }
            
            if (train_operation in operation_data["operations"] && operation_data["operations"][train_operation] !== null) {
                if (operation_data["operations"][train_operation]["formations"] !== "") {
                    var buf_3 = "";
                    for (var formation_name of operation_data["operations"][train_operation]["formations"].split("+")) {
                        if (buf_3.length >= 1) {
                            buf_2 += " +";
                        }
                        
                        if (formation_name in formations["formations"]) {
                            buf_2 += "<a href='javascript:void(0);' onclick='close_square_popup(); formations_mode(\"" + add_slashes(formation_name) + "\");'><img src='" + get_icon(formation_name) + "' alt='' class='train_icon'>" + escape_html(formation_name) + "</a>";
                            
                            var overview = get_formation_overview(formation_name);
                            if (overview["caption"].length >= 1) {
                                if (heading_str.length >= 1) {
                                    heading_str += "<br>";
                                }
                                
                                heading_str += escape_html(formation_name + " : " + overview["caption"]);
                            }
                        } else if (formation_name === "?") {
                            buf_2 += "<img src='" + UNYOHUB_UNKNOWN_TRAIN_ICON + "' alt='' class='train_icon'>" + "?";
                        } else {
                            buf_2 += "<img src='" + get_icon(formation_name) + "' alt='' class='train_icon'>" + escape_html(formation_name);
                        }
                    }
                    
                    buf_2 += buf_3;
                } else {
                    buf_2 += "<img src='" + UNYOHUB_CANCELED_TRAIN_ICON + "' alt='' class='train_icon'>" + "運休";
                }
            } else {
                buf_2 += "<img src='" + UNYOHUB_UNKNOWN_TRAIN_ICON + "' alt='' class='train_icon'>" + "?";
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
                    buf_2 += (buf_2.length >= 1 ? "+" : "") + "<a href='javascript:void(0);' onclick='operation_detail(\"" + train_operation + "\",";
                    if (timetable_date === "__today__" || timetable_date === "__tomorrow__") {
                        buf_2 += " " + diagram_id_or_ts + ", true";
                    } else {
                        buf_2 += " \"" + operation_table["diagram_id"] + "\", false";
                    }
                    buf_2 += ");'>" + train_operation + "運用</a>";
                }
                
                buf += "<div class='descriptive_text'>" + before_train_str + buf_2 + after_train_str + "</div>";
            }
            
            buf += "</h4>";
            
            for (var cnt = 0; cnt < train["departure_times"].length; cnt++) {
                if (train["departure_times"][cnt] !== null && !train["departure_times"][cnt].startsWith("|")) {
                    var station_index = train["is_inbound"] ? stations.length - 1 - cnt : cnt;
                    
                    if (is_today && ((previous_departure_time !== null && previous_departure_time < now_str && train["departure_times"][cnt] >= now_str) || train["departure_times"][cnt] === now_str)) {
                        var highlight_str = " train_detail_departure_time_highlight";
                    } else {
                        var highlight_str = "";
                    }
                    
                    buf += "<div class='train_detail_departure_time" + (is_deadhead_train ? " deadhead_train_departure_time" : "") + highlight_str + "' style='border-color: " + (config["dark_mode"] ? convert_color_dark_mode(railroad_info["lines"][train["line_id"]]["line_color"]) : railroad_info["lines"][train["line_id"]]["line_color"]) + ";'><u onclick='show_station_timetable(\"" + train["line_id"] + "\", \"" + stations[station_index]["station_name"] + "\", " + train["is_inbound"] + ");' >" + escape_html(stations[station_index]["station_name"]) + "</u><span style='float: right;'>" + train["departure_times"][cnt] + "</span></div>";
                    
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
var timetable_selectable_lines = [];

var timetable_area_elm = document.getElementById("timetable_area");

var timetable_drop_down_status;
var timetable_wrapper_scroll_amount;

function timetable_mode (load_data = true, draw_station_list = true) {
    change_mode(1);
    
    timetable_drop_down_status = {};
    
    if (load_data) {
        var ts = get_timestamp();
        var date_string = get_date_string(ts);
        
        timetable_promise = new Promise(function (timetable_promise_resolve, timetable_promise_reject) {
            get_diagram_id(date_string, function (diagram_id) {
                if (diagram_id === null) {
                    return;
                }
                
                var promise_1_resolved = false;
                var promise_2_resolved = false;
                var promise_3_resolved = false;
                
                Promise.all([
                    new Promise(function (resolve, reject) {
                        load_operation_table(function () {
                            if (!promise_1_resolved) {
                                promise_1_resolved = true;
                                resolve();
                            }
                        }, reject, diagram_id);
                    }),
                    new Promise(function (resolve, reject) {
                        update_timetable(function () {
                            if (!promise_2_resolved) {
                                promise_2_resolved = true;
                                resolve();
                            }
                        }, reject, diagram_info["diagrams"][diagram_id]["timetable_id"]);
                    }),
                    new Promise(function (resolve, reject) {
                        update_operation_data(function () {
                            if (!promise_3_resolved) {
                                promise_3_resolved = true;
                                resolve();
                            }
                        }, reject, false, date_string);
                    })
                ]).then(timetable_promise_resolve, timetable_promise_reject);
                
                update_timetable_date(diagram_id, date_string);
            });
        });
        
        timetable_change_lines(null, true, draw_station_list);
    } else {
        timetable_promise = new Promise(function (resolve) { resolve(); });
        
        update_timetable_date(operation_table["diagram_id"], operation_data["operation_date"]);
    }
}

function update_timetable_date (diagram_id, date_string) {
    var timetable_operation_name_elm = document.getElementById("timetable_operation_name");
    
    if (date_string !== null) {
        var now_ts = get_timestamp();
        
        if (date_string === get_date_string(now_ts)) {
            timetable_date = "__today__";
            
            timetable_operation_name_elm.innerHTML = "今日<small>(" + diagram_info["diagrams"][diagram_id]["diagram_name"] + ")</small>";
            
            return;
        } else if (date_string === get_date_string(now_ts + 86400)) {
            timetable_date = "__tomorrow__";
            
            timetable_operation_name_elm.innerHTML = "明日<small>(" + diagram_info["diagrams"][diagram_id]["diagram_name"] + ")</small>";
            
            return;
        }
    }
    
    timetable_date = diagram_id;
    
    timetable_operation_name_elm.innerHTML = diagram_info["diagrams"][diagram_id]["diagram_name"];
}

var timetable_selected_station = null;

function timetable_wrapper_onscroll () {
    if (timetable_selected_station !== null) {
        timetable_wrapper_scroll_amount = article_elms[1].scrollTop;
    }
}

function timetable_change_lines(line_id, force_station_select_mode = false, draw_station_list = true) {
    if (line_id !== null) {
        if ("clockwise_is_inbound" in railroad_info["lines"][line_id] && railroad_info["lines"][line_id]["clockwise_is_inbound"] !== null) {
            var directions = railroad_info["lines"][line_id]["clockwise_is_inbound"] ? ["外回り<small>(右回り)</small>", "内回り<small>(左回り)</small>"] : ["内回り<small>(左回り)</small>", "外回り<small>(右回り)</small>"];
        } else {
            var directions = ["上り" + "<small>(" + escape_html(railroad_info["lines"][line_id]["stations"][0]["station_name"]) + "方面)</small>", "下り" + "<small>(" + escape_html(railroad_info["lines"][line_id]["stations"][railroad_info["lines"][line_id]["stations"].length - 1]["station_name"]) + "方面)</small>"];
        }
        
        document.getElementById("radio_inbound_label").innerHTML = directions[0];
        document.getElementById("radio_outbound_label").innerHTML = directions[1];
    }
    
    update_selected_line(line_id, false);
    
    if (force_station_select_mode || ((line_id === null || timetable_selected_station === null) && draw_station_list)) {
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
        
        timetable_selectable_lines = [null, ...railroad_info["lines_order"]];
        
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
            buf += "<a href='/railroad_" + railroad_info["railroad_id"] + "/timetable/" + station_indexes[station_name_kana]["line_id"] + "/" + encodeURIComponent(station_name) + "/' onclick='event.preventDefault(); timetable_select_station(\"" + station_name + "\", \"" + station_indexes[station_name_kana]["line_id"] + "\");'><b>" + escape_html(station_name) + "</b> <small>(" + station_name_kana + ")" + "</small></a>";
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
    
    timetable_area_elm.innerHTML = "";
    
    timetable_promise.then(function () {
        draw_station_timetable(station_name);
    }, function () {
        timetable_area_elm.innerHTML = "<div class='no_data'>表示に必要なデータが利用できません</div>";
    });
}

function draw_station_timetable (station_name) {
    change_title(station_name + "駅(" + railroad_info["lines"][timetable_selected_line]["line_name"] + ")発着列車の充当車両 | " + instance_info["instance_name"], "/railroad_" + railroad_info["railroad_id"] + "/timetable/" + timetable_selected_line + "/" + encodeURIComponent(station_name) + "/");
    
    document.getElementById("timetable_back_button").style.display = "block";
    document.getElementById("direction_radio_area").style.display = "block";
    
    for (var station_index = 0; station_index < railroad_info["lines"][timetable_selected_line]["stations"].length; station_index++) {
        if (railroad_info["lines"][timetable_selected_line]["stations"][station_index]["station_name"] === station_name) {
            break;
        }
    }
    
    document.getElementById("timetable_station_name").innerText = railroad_info["lines"][timetable_selected_line]["stations"][station_index]["station_name"];
    
    if ("connecting_lines" in railroad_info["lines"][timetable_selected_line]["stations"][station_index]) {
        timetable_selectable_lines = [timetable_selected_line];
        
        for (var connecting_line of railroad_info["lines"][timetable_selected_line]["stations"][station_index]["connecting_lines"]) {
            timetable_selectable_lines.push(connecting_line["line_id"]);
        }
    } else {
        timetable_selectable_lines = [timetable_selected_line];
    }
    
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
    
    var bg_color = diagram_info["diagrams"][operation_table["diagram_id"]]["main_color"];
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
                buf += "<a href='javascript:void(0);' onclick='train_detail(\"" + timetable_selected_line + "\", \"" + train_info["train_number"] + "\", \"" + train_info["starting_station"] + "\", \"" + train_direction + "\", " + show_operation_data + ");' class='timetable_train" + (is_today && hh + ":" + mm < now_hh_mm ? " after_operation" : "") + "'>";
                
                var train_operations = get_operations(timetable_selected_line, train_info["train_number"], train_info["starting_station"], train_direction);
                
                var icon_style = train_info["is_deadhead_train"] ? " style='opacity: 0.5;'" : "";
                if (show_operation_data && train_operations !== null) {
                    var formation_data = convert_formation_data(timetable_selected_line, train_operations, is_inbound);
                    
                    buf += "<img src='" + get_icon(formation_data["first_formation"]) + "' alt='' class='train_icon'" + icon_style + ">";
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
                
                if (show_operation_data) {
                    buf += "　<small>";
                    if (train_operations !== null) {
                        var car_count = 0;
                        for (var train_operation of train_operations) {
                            car_count += operation_table["operations"][train_operation]["car_count"];
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
                    }
                } else if (train_operations !== null) {
                    buf += "<br>";
                    
                    if (railroad_info["lines"][timetable_selected_line]["inbound_forward_direction"] !== (train_direction === "inbound_trains")) {
                        train_operations.reverse();
                    }
                    
                    for (var cnt = 0; cnt < train_operations.length; cnt++) {
                        buf += (cnt >= 1 ? "+" : "") + train_operations[cnt] + "運用<small>(" + operation_table["operations"][train_operations[cnt]]["operation_group_name"] + " " + operation_table["operations"][train_operations[cnt]]["car_count"] + "両)</small>";
                    }
                } else {
                    buf += "<br>不明な運用";
                }
                
                buf += "</a>";
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

function timetable_select_neighboring_station (move_count) {
    var station_list = railroad_info["lines"][timetable_selected_line]["stations"];
    
    for (var cnt = 0; cnt < station_list.length; cnt++) {
        if (station_list[cnt]["station_name"] === timetable_selected_station) {
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
    
    timetable_select_station(station_list[station_index]["station_name"]);
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

function timetable_change_diagram (operation_table_name) {
    if (operation_table_name === "__today__" || operation_table_name === "__tomorrow__") {
        if (operation_table_name === "__today__") {
            var date_string = get_date_string(get_timestamp());
        } else {
            var date_string = get_date_string(get_timestamp() + 86400);
        }
        
        get_diagram_id(date_string, function (diagram_id) {
            if (diagram_id !== null) {
                load_timetable_diagram(diagram_id, date_string);
            }
        });
    } else {
        load_timetable_diagram(operation_table_name, null);
    }
}

function load_timetable_diagram (diagram_id, date_string) {
    var promise_1_resolved = false;
    var promise_2_resolved = false;
    var promise_3_resolved = false;
    
    var promise_list = [
        new Promise(function (resolve, reject) {
            load_operation_table(function () {
                if (!promise_1_resolved) {
                    promise_1_resolved = true;
                    resolve();
                }
            }, reject, diagram_id);
        }),
        new Promise(function (resolve, reject) {
            update_timetable(function () {
                if (!promise_2_resolved) {
                    promise_2_resolved = true;
                    resolve();
                }
            }, reject, diagram_info["diagrams"][diagram_id]["timetable_id"]);
        })
    ];
    
    if (date_string !== null) {
        promise_list.push(new Promise(function (resolve, reject) {
            update_operation_data(function () {
                if (!promise_3_resolved) {
                    promise_3_resolved = true;
                    resolve();
                }
            }, reject, false, date_string);
        }));
    }
    
    timetable_promise = Promise.all(promise_list);
    
    if (timetable_selected_station !== null) {
        timetable_select_station(timetable_selected_station);
    }
    
    update_timetable_date(diagram_id, date_string);
}

function timetable_get_diagram_list () {
    return ["__today__", "__tomorrow__", ...diagram_info["diagram_order"]];
}

function timetable_diagram_previous () {
    var diagram_list = timetable_get_diagram_list();
    var list_index = diagram_list.indexOf(timetable_date) - 1;
    
    if (list_index < 0) {
        list_index = diagram_list.length - 1;
    }
    
    timetable_change_diagram(diagram_list[list_index]);
}

function timetable_diagram_next () {
    var diagram_list = timetable_get_diagram_list();
    var list_index = diagram_list.indexOf(timetable_date) + 1;
    
    if (list_index >= diagram_list.length) {
        list_index = 0;
    }
    
    timetable_change_diagram(diagram_list[list_index]);
}

function timetable_list_diagrams () {
    var popup_inner_elm = open_square_popup("diagram_list_popup", true);
    
    popup_inner_elm.className = "wait_icon";
    popup_inner_elm.innerHTML = "";
    
    var buf = "<h3>" + diagram_info["diagram_revision"] + "改正ダイヤ</h3>";
    
    var diagram_list = timetable_get_diagram_list();
    
    get_diagram_id(get_date_string(get_timestamp()), function (today_diagram_id) {
        get_diagram_id(get_date_string(get_timestamp() + 86400), function (tomorrow_diagram_id) {
            if (today_diagram_id === null || tomorrow_diagram_id === null) {
                return;
            }
            
            for (var diagram_id of diagram_list) {
                if (diagram_id === "__today__") {
                    var diagram_name = "今日<small>(" + escape_html(diagram_info["diagrams"][today_diagram_id]["diagram_name"]) + ")</small>";
                    var bg_color = diagram_info["diagrams"][today_diagram_id]["main_color"];
                } else if (diagram_id === "__tomorrow__") {
                    var diagram_name = "明日<small>(" + escape_html(diagram_info["diagrams"][tomorrow_diagram_id]["diagram_name"]) + ")</small>";
                    var bg_color = diagram_info["diagrams"][tomorrow_diagram_id]["main_color"];
                } else {
                    var diagram_name = escape_html(diagram_info["diagrams"][diagram_id]["diagram_name"]);
                    var bg_color = diagram_info["diagrams"][diagram_id]["main_color"];
                }
                
                if (config["dark_mode"]) {
                    bg_color = convert_color_dark_mode(bg_color);
                }
                
                buf += "<button type='button' class='wide_button' onclick='close_square_popup(); timetable_change_diagram(\"" + diagram_id + "\");' style='background-color: " + bg_color + "; border-color: " + bg_color + ";'>" + diagram_name + "</button>";
            }
            
            buf += "<div class='descriptive_text'>ダイヤ情報更新日時: " + get_date_and_time(diagram_info["last_modified_timestamp"]) + "</div>";
            
            popup_inner_elm.innerHTML = buf;
        });
    });
}

function update_timetable_drop_down_status (elm) {
    timetable_drop_down_status[elm.id] = elm.checked;
}


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
    
    get_diagram_id(date_string, function (diagram_id) {
        if (diagram_id === null) {
            operation_data_area_elm.innerHTML = "<div class='no_data'>指定された日付のデータは利用できません</div>";
            
            return;
        }
        
        var promise_1_resolved = false;
        var promise_2_resolved = false;
        
        var promise_1 = new Promise(function (resolve, reject) {
            load_operation_table(function () {
                if (!promise_1_resolved) {
                    promise_1_resolved = true;
                    resolve();
                }
            }, reject, diagram_id, false);
        });
        var promise_2 = new Promise(function (resolve, reject) {
            update_operation_data(function () {
                if (!promise_2_resolved) {
                    promise_2_resolved = true;
                    resolve();
                } else if (promise_1_resolved) {
                    operation_data_draw();
                }
            }, reject, false, date_string);
        });
        
        document.getElementById("operation_data_date").innerHTML = date_string.substring(0, 4) + "<small>年</small> " + Number(date_string.substring(5, 7)) + "<small>月</small> " + Number(date_string.substring(8)) + "<small>日</small>";
        
        Promise.all([promise_1, promise_2]).then(function () {
            operation_all_data_loaded = true;
            
            operation_data_draw();
        }, function () {
            operation_data_area_elm.innerHTML = "<div class='no_data'>表示に必要なデータが利用できません</div>";
        });
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
    
    var bg_color = diagram_info["diagrams"][operation_table["diagram_id"]]["main_color"];
    
    if (config["dark_mode"]) {
        operation_data_heading_elm.style.backgroundColor = convert_color_dark_mode(bg_color);
        operation_data_heading_elm.style.color = "";
    } else {
        operation_data_heading_elm.style.backgroundColor = bg_color;
        operation_data_heading_elm.style.color = "#444444";
    }
    
    var buf_h2 = diagram_info["diagrams"][operation_table["diagram_id"]]["diagram_name"] + " ";
    
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
                buf += "<tr onclick='operation_detail(\"" + operation_number + "\", " + operation_data_date + ", " + show_write_operation_data_button + ");'><th style='background-color: " + (config["dark_mode"] ? convert_color_dark_mode(operation_table["operations"][operation_number]["main_color"]) : operation_table["operations"][operation_number]["main_color"]) + ";'>";
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
            }
            buf += "</table>";
        }
    } else {
        var formation_list = Object.keys(formations["formations"]);
        
        var series_list = [...formations["series_names"]];
        var series_titles = {};
        var series_formation_list = {};
        var formation_operation_data = {};
        
        for (var series_name of series_list) {
            series_titles[series_name] = series_name;
            formation_operation_data[series_name] = new Set();
            
            if ("subseries_names" in formations["series"][series_name]) {
                for (var subseries_name of formations["series"][series_name]["subseries_names"]) {
                    series_titles[series_name + subseries_name] = series_name;
                }
            }
        }
        
        for (var formation_name of formation_list) {
            formation_operation_data[formation_name] = new Set();
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
                    if (assigned_formation in formations["formations"]) {
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
                    series_formation_list[series_name].push(...formations["series"][series_name]["subseries"][subseries_name]["formation_names"]);
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
                var operation_numbers = Array.from(formation_operation_data[formation_name]);
                for (var cnt = 0; cnt < operation_numbers.length || cnt === 0; cnt++) {
                    if (operation_numbers.length >= 1) {
                        var operation_number = operation_numbers[cnt];
                        
                        buf += "<tr onclick='operation_detail(\"" + operation_number + "\", " + operation_data_date + ", " + show_write_operation_data_button + ");'>";
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

function operation_detail (operation_number, operation_data_date_ts_or_diagram_id, show_write_operation_data_button = null, formation_text = null) {
    var popup_inner_elm = open_popup("operation_detail_popup", null, true);
    
    popup_inner_elm.className = "wait_icon";
    popup_inner_elm.innerHTML = "";
    popup_inner_elm.scrollTop = 0;
    
    if (show_write_operation_data_button !== null) {
        operation_detail_write_button_enabled = show_write_operation_data_button;
    }
    
    if (typeof operation_data_date_ts_or_diagram_id !== "string") {
        get_diagram_id(get_date_string(operation_data_date_ts_or_diagram_id), function (diagram_id) {
            if (diagram_id === null) {
                return;
            }
            
            if (operation_table === null || diagram_id !== operation_table["diagram_id"] || line_operations === null || diagram_id !== line_operations["diagram_id"] || timetable === null || diagram_info["diagrams"][diagram_id]["timetable_id"] !== timetable["timetable_id"]) {
                var promise_1_resolved = false;
                var promise_1 = new Promise(function (resolve, reject) {
                    load_operation_table(function () {
                        if (!promise_1_resolved) {
                            promise_1_resolved = true;
                            resolve();
                        }
                    }, function () {}, diagram_id);
                });
                
                var promise_2_resolved = false;
                var promise_2 = new Promise(function (resolve, reject) {
                    update_timetable(function () {
                        if (!promise_2_resolved) {
                            promise_2_resolved = true;
                            resolve();
                        } else if (promise_1_resolved) {
                            draw_operation_detail(operation_number, diagram_id, operation_data_date_ts_or_diagram_id, formation_text);
                        }
                    }, function () {}, diagram_info["diagrams"][diagram_id]["timetable_id"]);
                });
                
                Promise.all([promise_1, promise_2]).then(function () {
                    draw_operation_detail(operation_number, diagram_id, operation_data_date_ts_or_diagram_id, formation_text);
                });
                
                return;
            }
            
            draw_operation_detail(operation_number, diagram_id, operation_data_date_ts_or_diagram_id, formation_text);
        });
    } else {
        draw_operation_detail(operation_number, operation_data_date_ts_or_diagram_id, null, formation_text);
    }
}

function draw_operation_detail (operation_number, diagram_id, operation_data_date_ts, formation_text) {
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
        
        if (formation_text !== null) {
            var diagram_id_or_ts = "\"" + diagram_id + "\"";
        } else {
            var diagram_id_or_ts = operation_data_date_ts;
        }
    }
    
    var bg_color = diagram_info["diagrams"][diagram_id]["main_color"];
    
    if (config["dark_mode"]) {
        bg_color = convert_color_dark_mode(bg_color);
        
        var color_style = "";
    } else {
        var color_style = " color: #444444;";
    }
    
    if (operation_number in operation_table["operations"]) {
        var buf = "<div class='heading_wrapper' style='background-color: " + bg_color + ";" + color_style + "'><button type='button' class='previous_button' onclick='previous_operation_number(\"" + operation_number + "\", " + diagram_id_or_ts + ");'></button><h2>" + operation_number + "運用<small>" + operation_table["operations"][operation_number]["operation_group_name"] + " (" + operation_table["operations"][operation_number]["car_count"] + "両)</small></h2><button type='button' class='next_button' onclick='next_operation_number(\"" + operation_number + "\", " + diagram_id_or_ts + ");'></button></div>";
    } else {
        var buf = "<h2 style='background-color: " + bg_color + ";" + color_style + "'>" + operation_number + "運用</h2>";
    }
    
    if (formation_text !== null || operation_data_date_ts !== null) {
        buf += "<div class='formation_data_area'>";
        
        if (formation_text === null && operation_number in operation_data["operations"] && operation_data["operations"][operation_number] !== null) {
            formation_text = operation_data["operations"][operation_number]["formations"];
        }
        
        var heading_str = "";
        if (formation_text !== null) {
            if (formation_text !== "") {
                var buf_2 = "";
                for (var formation_name of formation_text.split("+")) {
                    if (buf_2.length >= 1) {
                        buf_2 += " +"
                    }
                    
                    if (formation_name in formations["formations"]) {
                        buf_2 += "<a href='javascript:void(0);' onclick='popup_close(true); formations_mode(\"" + add_slashes(formation_name) + "\");'><img src='" + get_icon(formation_name) + "' alt='' class='train_icon'>" + escape_html(formation_name) + "</a>";
                        
                        var overview = get_formation_overview(formation_name);
                        if (overview["caption"].length >= 1) {
                            if (heading_str.length >= 1) {
                                heading_str += "<br>";
                            }
                            
                            heading_str += escape_html(formation_name + " : " + overview["caption"]);
                        }
                    } else if (formation_name === "?") {
                        buf_2 += "<img src='" + UNYOHUB_UNKNOWN_TRAIN_ICON + "' alt='' class='train_icon'>" + "?";
                    } else {
                        buf_2 += "<img src='" + get_icon(formation_name) + "' alt='' class='train_icon'>" + escape_html(formation_name);
                    }
                }
                
                buf += buf_2;
            } else {
                buf += "<img src='" + UNYOHUB_CANCELED_TRAIN_ICON + "' alt='' class='train_icon'>" + "運休";
            }
        } else {
            buf += "<img src='" + UNYOHUB_UNKNOWN_TRAIN_ICON + "' alt='' class='train_icon'>" + "?";
        }
        
        buf += "</div><div class='descriptive_text'>" + heading_str + "</div><div id='operation_data_detail_area'></div>";
    }
    
    if (operation_number in operation_table["operations"]) {
        if (navigator.onLine) {
            buf += "<button type='button' class='execute_button' onclick='operation_data_history(null, \"" + add_slashes(operation_number) + "\");'>過去30日間の充当編成</button>";
        }
        
        buf += "<div><input type='radio' name='switch_simplify_operation_details' id='simplify_operation_details' onchange='change_simplify_operation_details(!this.checked, \"" + add_slashes(operation_number) + "\", " + diagram_id_or_ts + ", " + is_today + ");'" + (config["simplify_operation_details"] ? "" : " checked='checked'") + "><label for='simplify_operation_details'>詳細表示</label><input type='radio'  name='switch_simplify_operation_details' id='not_simplify_operation_details' onchange='change_simplify_operation_details(this.checked, \"" + add_slashes(operation_number) + "\", " + diagram_id_or_ts + ", " + is_today + ");'" + (config["simplify_operation_details"] ? " checked='checked'" : "") + "><label for='not_simplify_operation_details'>簡略表示</label></div>";
        
        if (operation_table["operations"][operation_number]["comment"] !== null) {
            buf += "<div class='descriptive_text'>" + escape_html(operation_table["operations"][operation_number]["comment"]) + "</div>";
        }
        
        buf += "<div id='operation_trains_area'></div>";
        
        if (navigator.onLine && operation_detail_write_button_enabled) {
            buf += "<button type='button' class='write_button' onclick='write_operation_data(\"" + operation_data_date_str + "\", \"" + operation_number + "\");'>運用情報を投稿</button>";
        }
    } else {
        buf += "<div class='no_data'>運用表に登録されていない運用です</div>";
    }
    
    document.getElementById("operation_detail_popup_inner").innerHTML = buf;
    
    if (operation_number in operation_table["operations"]) {
        draw_operation_trains(operation_number, diagram_id_or_ts, is_today);
    }
    
    if (navigator.onLine && (formation_text !== null || operation_data_date_ts !== null)) {
        get_operation_data_detail(operation_data_date_str, operation_number, "operation_data_detail_area");
    }
}

function draw_operation_trains (operation_number, diagram_id_or_ts, is_today) {
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
                    
                    if (is_today && first_departure_time <= now_str) {
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
                
                buf += "<a href='javascript:void(0);' onclick='train_detail(\"" + trains[cnt]["line_id"] + "\", \"" + trains[cnt]["train_number"] + "\", \"" + trains[cnt]["starting_station"] + "\", \"" + trains[cnt]["direction"] + "_trains\", false, " + is_today + ");'><b style='color: " + (config["dark_mode"] ? convert_font_color_dark_mode(get_train_color(trains[cnt]["train_number"])) : get_train_color(trains[cnt]["train_number"])) + ";'><u>";
                
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
                
                buf += trains[cnt]["train_number"].split("__")[0];
                
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
                
                buf += "<div" + highlight_str + "><span>" + starting_station + " " + first_departure_time + "</span><span>→</span><span>" + trains[cnt]["final_arrival_time"] + " " + terminal_station + "</span></div></a>";
                
                if (!config["simplify_operation_details"] && operations_list.length >= 1) {
                    buf += "<div class='coupling_info'>併結:";
                    for (var coupling_operation of operations_list) {
                        buf += " <a href='javascript:void(0);' onclick='operation_detail(\"" + coupling_operation + "\", " + diagram_id_or_ts + ");'>" + coupling_operation + "運用";
                        if (is_today) {
                            buf += "<small>(" + (coupling_operation in operation_data["operations"] && operation_data["operations"][coupling_operation] !== null ? escape_html(operation_data["operations"][coupling_operation]["formations"]) : "情報なし") + ")</small>";
                        }
                        buf += "</a>";
                    }
                    buf += "</div>";
                }
                
                buf += "</div>";
                
                starting_station = null;
            }
            
            if (is_today && trains[cnt]["final_arrival_time"] < now_str) {
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

function change_simplify_operation_details (bool_val, operation_number, operation_table_name_or_ts, is_today) {
    config["simplify_operation_details"] = bool_val;
    
    save_config();
    
    draw_operation_trains(operation_number, operation_table_name_or_ts, is_today);
}

function previous_operation_number (operation_number, operation_data_date_ts_or_operation_name) {
    var operation_numbers = Object.keys(operation_table["operations"]).toSorted();
    
    var operation_number_index = operation_numbers.indexOf(operation_number);
    if (operation_number_index >= 1) {
        operation_detail(operation_numbers[operation_number_index - 1], operation_data_date_ts_or_operation_name);
    } else {
        operation_detail(operation_numbers[operation_numbers.length - 1], operation_data_date_ts_or_operation_name);
    }
}

function next_operation_number (operation_number, operation_data_date_ts_or_operation_name) {
    var operation_numbers = Object.keys(operation_table["operations"]).toSorted();
    
    var operation_number_index = operation_numbers.indexOf(operation_number);
    if (operation_number_index < operation_numbers.length - 1) {
        operation_detail(operation_numbers[operation_number_index + 1], operation_data_date_ts_or_operation_name);
    } else {
        operation_detail(operation_numbers[0], operation_data_date_ts_or_operation_name);
    }
}


var car_number_search_elm = document.getElementById("car_number_search");
var formation_table_area_elm = document.getElementById("formation_table_area");

var selected_formation_name = null;

var formation_table_drop_down_status;
var formation_table_wrapper_scroll_amount;

function formations_mode (formation_name = null) {
    change_mode(3);
    
    car_number_search_elm.value = "";
    formation_table_area_elm.innerHTML = "";
    formation_table_drop_down_status = {};
    formation_table_wrapper_scroll_amount = 0;
    
    var colorize_radio_area_elm = document.getElementById("colorize_formation_table_radio_area");
    if (formation_styles_available) {
        colorize_radio_area_elm.style.display = "block";
        
        if (config["colorize_formation_table"]) {
            document.getElementById("colorize_formation_table").checked = true;
        } else {
            document.getElementById("not_colorize_formation_table").checked = true;
        }
    } else {
        colorize_radio_area_elm.style.display = "none";
    }
    
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
    for (var formation_name of formation_names) {
        var overview = get_formation_overview(formation_name);
        
        var buf_2 = "<tr onclick='formation_detail(\"" + add_slashes(formation_name) + "\");'><td><img src='" + get_icon(formation_name) + "' alt='' class='train_icon'" + (overview["unavailable"] ? " style='opacity: 0.5;'" : "") + "></td>";
        
        buf_2 += "<td><h5><a href='/railroad_" + railroad_info["railroad_id"] + "/formations/" + add_slashes(encodeURIComponent(formation_name)) + "/' onclick='event.preventDefault();'>" + escape_html(formation_name) + "</a>";
        
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
                }
            } else {
                search_hit_count = 1;
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
        }
    }
    
    return [buf, search_hit_formation_count];
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
            
            for (var subseries_name of formations["series"][series_name]["subseries_names"]) {
                var [buf_3, subseries_search_hit_formation_count] = get_formation_table_html(formations["series"][series_name]["subseries"][subseries_name]["formation_names"], search_keyword);
                
                if (subseries_search_hit_formation_count >= 1) {
                    buf_2 += "<tr><th colspan='2'>" + escape_html(subseries_name) + "</th></tr>" + buf_3;
                    search_hit_formation_count += subseries_search_hit_formation_count;
                }
            }
        } else {
            var [buf_2, search_hit_formation_count] = get_formation_table_html(formations["series"][series_name]["formation_names"], search_keyword);
        }
        
        if (search_hit_formation_count >= 1) {
            var checkbox_id = "series_" + series_name;
            
            buf += "<input type='checkbox' id='" + checkbox_id + "'";
            
            if (checkbox_id in formation_table_drop_down_status && formation_table_drop_down_status[checkbox_id]) {
                buf += " checked='checked'";
            }
            
            buf += " onclick='update_formation_table_drop_down_status(this);'><label for='" + checkbox_id + "' class='drop_down'>" + escape_html(series_name);
            if (search_keyword >= 1) {
                buf += " (" + search_hit_formation_count + "編成該当)";
            }
            buf += "</label>";
            buf += "<div><table class='formation_table'>" + buf_2 + "</table></div>";
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
        formation_table_area_elm.innerHTML = "<div class='no_data'>検索キーワードを含む車両が見つかりません</div>";
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

function update_formation_table_drop_down_status (elm) {
    formation_table_drop_down_status[elm.id] = elm.checked;
}

function get_operation_data_html (data, ts, clickable = true, no_data_text = "情報がありません") {
    if (data !== null) {
        buf = "";
        for (var data_item of data) {
            if (clickable) {
                buf += "<div class='key_and_value' onclick='operation_detail(\"" + add_slashes(data_item["operation_number"]) + "\", " + ts + ", false, \"" + add_slashes(data_item["formations"]) + "\");'><u>" + escape_html(data_item["operation_number"]) + "</u>";
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

function get_first_formation_of_series (series_name) {
    if ("subseries_names" in formations["series"][series_name]) {
        return formations["series"][series_name]["subseries"][formations["series"][series_name]["subseries_names"][0]]["formation_names"][0];
    } else {
        return formations["series"][series_name]["formation_names"][0];
    }
}

function get_last_formation_of_series (series_name) {
    if ("subseries_names" in formations["series"][series_name]) {
        var formation_list = formations["series"][series_name]["subseries"][formations["series"][series_name]["subseries_names"][formations["series"][series_name]["subseries_names"].length - 1]]["formation_names"];
    } else {
        var formation_list = formations["series"][series_name]["formation_names"];
    }
    
    return formation_list[formation_list.length - 1];
}

function formation_detail (formation_name) {
    change_title(formation_name + " (" + railroad_info["railroad_name"] + ") の編成情報・運用 | " + instance_info["instance_name"], "/railroad_" + railroad_info["railroad_id"] + "/formations/" + encodeURIComponent(formation_name) + "/");
    
    document.getElementById("formation_search_area").style.display = "none";
    formation_table_area_elm.innerHTML = "";
    
    selected_formation_name = formation_name;
    
    document.getElementById("formation_screenshot_button").style.display = "block";
    document.getElementById("formation_back_button").style.display = "block";
    
    var series_name = formations["formations"][formation_name]["series_name"];
    var formation_list = "subseries_name" in formations["formations"][formation_name] ? formations["series"][series_name]["subseries"][formations["formations"][formation_name]["subseries_name"]]["formation_names"] : formations["series"][series_name]["formation_names"];
    
    var formation_index = formation_list.indexOf(formation_name);
    
    if (formation_index >= 1) {
        var previous_formation_name = formation_list[formation_index - 1];
    } else {
        var series_index = formations["series_names"].indexOf(series_name);
        if (series_index >= 1) {
            var previous_formation_name = get_last_formation_of_series(formations["series_names"][series_index - 1]);
        } else {
            var previous_formation_name = get_last_formation_of_series(formations["series_names"][formations["series_names"].length - 1]);
        }
        
        if ("subseries_name" in formations["formations"][formation_name]) {
            var subseries_index = formations["series"][series_name]["subseries_names"].indexOf(formations["formations"][formation_name]["subseries_name"]);
            if (subseries_index >= 1) {
                var previous_subseries_formation_names = formations["series"][series_name]["subseries"][formations["series"][series_name]["subseries_names"][subseries_index - 1]]["formation_names"];
                previous_formation_name = previous_subseries_formation_names[previous_subseries_formation_names.length - 1];
            }
        }
    }
    
    if (formation_index <= formation_list.length - 2) {
        var next_formation_name = formation_list[formation_index + 1];
    } else {
        var series_index = formations["series_names"].indexOf(series_name);
        if (series_index <= formations["series_names"].length - 2) {
            var next_formation_name = get_first_formation_of_series(formations["series_names"][series_index + 1]);
        } else {
            var next_formation_name = get_first_formation_of_series(formations["series_names"][0]);
        }
        
        if ("subseries_name" in formations["formations"][formation_name]) {
            var subseries_index = formations["series"][series_name]["subseries_names"].indexOf(formations["formations"][formation_name]["subseries_name"]);
            if (subseries_index <= formations["series"][series_name]["subseries_names"].length - 2) {
                next_formation_name = formations["series"][series_name]["subseries"][formations["series"][series_name]["subseries_names"][subseries_index + 1]]["formation_names"][0];
            }
        }
    }
    
    var buf = "<div class='heading_wrapper'><a href='/railroad_" + railroad_info["railroad_id"] + "/formations/" + encodeURIComponent(previous_formation_name) + "/' class='previous_button' onclick='event.preventDefault(); formation_detail(\"" + add_slashes(previous_formation_name) + "\");'>" + escape_html(previous_formation_name) + "</a><h2>" + escape_html(formation_name) + "</h2><a href='/railroad_" + railroad_info["railroad_id"] + "/formations/" + encodeURIComponent(next_formation_name) + "/' class='next_button' onclick='event.preventDefault(); formation_detail(\"" + add_slashes(next_formation_name) + "\");'>" + escape_html(next_formation_name) + "</a></div>";
    
    var overview = get_formation_overview(formation_name);
    
    buf += "<img src='" + get_icon(formation_name) + "' alt='" + add_slashes(series_name) + "' class='train_icon_large'>";
    
    buf += "<strong id='formation_caption'>" + overview["caption"] + "</strong>";
    
    buf += "<div id='formation_operations_area'></div>";
    if (navigator.onLine) {
        buf += "<button type='button' class='execute_button' onclick='operation_data_history(\"" + add_slashes(formation_name) + "\");'>過去30日間の運用</button>";
    }
    
    buf += "<div id='semifixed_formation_area'></div>";
    
    buf += "<h3>基本情報</h3>";
    buf += "<div class='key_and_value'><b>車両形式</b>" + escape_html(series_name + ("subseries_name" in formations["formations"][formation_name] ? " " + formations["formations"][formation_name]["subseries_name"] : "")) + "</div>";
    buf += "<div class='key_and_value' id='formation_affiliation'></div>";
    
    buf += "<div class='descriptive_text' id='formation_description'></div>";
    
    buf += "<h3>検査情報</h3>";
    if (overview["unavailable"]) {
        buf += "<div class='descriptive_text warning_sentence' id='inspection_information'>運用離脱中</div>";
    } else {
        buf += "<div class='descriptive_text' id='inspection_information'>情報がありません</div>";
    }
    
    buf += "<h3>車両情報</h3>";
    buf += "<table class='car_info'>";
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
            buf += "<td rowspan='" + formations["formations"][formation_name]["cars"].length + "'><span>▲" + railroad_info["alias_of_forward_direction"] + "</span></td>";
        }
        
        buf += "<td class='" + car_class + "' " + car_style + "></td><td><b>" + formations["formations"][formation_name]["cars"][cnt]["car_number"] + "</b><span id='car_info_" + cnt + "'></span><div class='descriptive_text' id='car_description_" + cnt + "'></div></td></tr>";
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
                
                if (data["affiliation"] !== null && data["affiliation"].length >= 1) {
                    document.getElementById("formation_affiliation").innerHTML = "<b>所属</b>" + escape_html(data["affiliation"]);
                }
                
                document.getElementById("formation_description").innerText = data["description"];
                
                var inspection_information_area = document.getElementById("inspection_information");
                if (data["inspection_information"] !== null) {
                    inspection_information_area.innerText = data["inspection_information"];
                }
                
                if (data["unavailable"]) {
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
                
                for (var cnt = 0; cnt < data["cars"].length; cnt++) {
                    document.getElementById("car_info_" + cnt).innerText = data["cars"][cnt]["manufacturer"] + " " + data["cars"][cnt]["constructed"];
                    document.getElementById("car_description_" + cnt).innerText = data["cars"][cnt]["description"];
                }
                
                if ("semifixed_formation" in data) {
                    var buf = "";
                    for (var semifixed_formation of data["semifixed_formation"].split("+")) {
                        buf += (buf.length >= 1 ? " + " : "") + (semifixed_formation !== formation_name ? "<a href='javascript:void(0);' onclick='formation_detail(\"" + add_slashes(semifixed_formation) + "\");'>" : "<b>") + "<img src='" + get_icon(semifixed_formation) + "' alt='' class='train_icon'>" + escape_html(semifixed_formation) + (semifixed_formation !== formation_name ? "</a>" : "</b>");
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
                
                var event_type_ja = { construct : "新製", modify : "改修", repaint : "塗装変更", renewal : "更新", transfer : "転属", rearrange : "組換", other : "その他" };
                
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
    
    ajax_post("operation_data_history.php", "railroad_id=" + escape_form_data(railroad_info["railroad_id"]) + "&" + post_q, function (response) {
        const YOBI_LIST = ["日", "月", "火", "水", "木", "金", "土"];
        
        if (response !== false) {
            var buf = "<h3>" + escape_html(subtitle) + "</h3>";
            
            var data = JSON.parse(response);
            
            var ts = get_timestamp();
            var day_value = new Date((ts - 10800) * 1000).getDay();
            for (var cnt = 0; cnt < 30; cnt++) {
                var yyyy_mm_dd = get_date_string(ts);
                
                buf += "<h4>" + Number(yyyy_mm_dd.substring(5, 7)) + "月" + Number(yyyy_mm_dd.substring(8)) + "日 (" + YOBI_LIST[day_value] + ")</h4>";
                if (yyyy_mm_dd in data) {
                    buf += get_operation_data_html(data[yyyy_mm_dd], ts, get_diagram_revision(yyyy_mm_dd) === operation_table["diagram_revision"]);
                } else {
                    buf += "<div class='descriptive_text'>情報がありません</div>";
                }
                
                ts -= 86400;
                day_value = (day_value !== 0 ? day_value - 1 : 6);
            }
            
            popup_inner_elm.innerHTML = buf;
        }
    });
}


function get_icon (formation_name) {
    if (formation_name === null || formation_name === "?") {
        return UNYOHUB_UNKNOWN_TRAIN_ICON;
    }
    
    if (formation_name === "") {
        return UNYOHUB_CANCELED_TRAIN_ICON;
    }
    
    if (formation_name in formations["formations"]) {
        if (formations["formations"][formation_name]["icon_id"] in train_icons["icons"]) {
            return train_icons["icons"][formations["formations"][formation_name]["icon_id"]];
        }
    } else if (formation_name in series_icon_ids) {
        if (series_icon_ids[formation_name] in train_icons["icons"]) {
            return train_icons["icons"][series_icon_ids[formation_name]];
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

function get_formation_overview (formation_name) {
    var overview = { caption: "", semifixed_formation : null, unavailable: false };
    
    if (formation_name in formation_overviews["formations"]) {
        overview["unavailable"] = formation_overviews["formations"][formation_name]["unavailable"];
        
        if (formation_overviews["formations"][formation_name]["caption"] !== null) {
            overview["caption"] = formation_overviews["formations"][formation_name]["caption"];
        }
        
        if ("semifixed_formation" in formation_overviews["formations"][formation_name]) {
            overview["semifixed_formation"] = formation_overviews["formations"][formation_name]["semifixed_formation"];
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
    
    diagram_info = null;
    
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
        
        get_diagram_id(diagram_revision === "__current__" ? get_date_string(get_timestamp()) : diagram_revision, function (diagram_id) {
            var diagram_revision_year_month = diagram_info["diagram_revision"].substring(0, 4) + "年" + Number(diagram_info["diagram_revision"].substring(5, 7)) + "月改正"
            
            change_title(railroad_info["railroad_name"] + " " + diagram_revision_year_month + "ダイヤ運用表 | " + instance_info["instance_name"], "/railroad_" + railroad_info["railroad_id"] + "/operation_table/" + diagram_info["diagram_revision"] + "/");
            
            if (diagram_info["diagram_revision"] === current_diagram_revision) {
                var diagram_revision_info = "(現行ダイヤ)";
            } else if (diagram_info["diagram_revision"] > current_diagram_revision) {
                var diagram_revision_info = "<b class='warning_sentence'>(将来のダイヤ)</b>";
            } else {
                var diagram_revision_info = "<b class='warning_sentence'>(過去のダイヤ)</b>";
            }
            
            operation_table_heading_elm.innerHTML = diagram_revision_year_month + " " + diagram_revision_info;
            
            if (diagram_id !== null) {
                operation_table_load_data(true, diagram_id);
            }
        });
    } else {
        change_title(railroad_info["railroad_name"] + "の運用表一覧 | " + instance_info["instance_name"], "/railroad_" + railroad_info["railroad_id"] + "/operation_table/");
        
        operation_table_heading_elm.innerHTML = "改正別の運用表";
        
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

function operation_table_load_data (load_data, diagram_id) {
    var promise_list = [];
    
    if (load_data) {
        var promise_1_resolved = false;
        var promise_2_resolved = false;
        
        promise_list.push(new Promise(function (resolve, reject) {
            load_operation_table(function () {
                if (!promise_1_resolved) {
                    promise_1_resolved = true;
                    resolve();
                }
            }, reject, diagram_id);
        }));
        promise_list.push(new Promise(function (resolve, reject) {
            update_timetable(function () {
                if (!promise_2_resolved) {
                    promise_2_resolved = true;
                    resolve();
                }
            }, reject, diagram_info["diagrams"][diagram_id]["timetable_id"]);
        }));
    }
    
    var promise_3_resolved = false;
    
    promise_list.push(new Promise(function (resolve, reject) {
        update_operation_data(function () {
            if (!promise_3_resolved) {
                promise_3_resolved = true;
                resolve();
            }
        }, reject, false, get_date_string(get_timestamp()));
    }));
    
    operation_table_footer_inner_elm.style.display = "block";
    document.getElementById("operation_table_name").innerText = diagram_info["diagrams"][diagram_id]["diagram_name"];
    document.getElementById("train_number_search").value = "";
    operation_table_wrapper_scroll_amount = 0;
    
    Promise.all(promise_list).then(function () {
        reset_operation_narrow_down();
    }, function () {
        operation_table_area_elm.innerHTML = "<div class='no_data'>表示に必要なデータが利用できません</div>";
    });
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
    
    if (diagram_info["diagram_revision"] === get_diagram_revision()) {
        get_diagram_id(get_date_string(get_timestamp()), function (diagram_id) {
            if (diagram_id !== null) {
                draw_operation_table(diagram_id === operation_table["diagram_id"]);
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
    
    var buf = "";
    for (var operation_number of operation_numbers) {
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
            
            var train_number = trains[cnt_2]["train_number"].split("__")[0];
            
            if (search_keyword === "") {
                if (train_number.startsWith(".")) {
                    buf_2 += "<small class='operation_overview_yard_stay'>" + train_number.substring(1) + "</small>";
                } else {
                    if (trains[cnt_2]["train_number"] in timetable["timetable"][trains[cnt_2]["line_id"]][trains[cnt_2]["direction"] + "_trains"]) {
                        var train_type_initial = timetable["timetable"][trains[cnt_2]["line_id"]][trains[cnt_2]["direction"] + "_trains"][trains[cnt_2]["train_number"]][0]["train_type"].substring(0, 1);
                    } else if (railroad_info["deadhead_train_number_regexp"].test(train_number)) {
                        var train_type_initial = "回";
                    } else {
                        var train_type_initial = "＊";
                    }
                    
                    buf_2 += "<small style='background-color: " + (config["dark_mode"] ? convert_font_color_dark_mode(get_train_color(train_number, "#333333")) : get_train_color(train_number, "#333333")) + ";'>" + train_type_initial + "</small>";
                }
            } else {
                var train_number_search_index = train_number.toUpperCase().indexOf(search_keyword);
                
                if (train_number_search_index !== -1) {
                    if (search_hit_count < 4) {
                        var train_number_search_index_end = train_number_search_index + search_keyword.length;
                        
                        buf_2 += "<span>" + train_number.substring(0, train_number_search_index) + "<span class='search_highlight'>" + train_number.substring(train_number_search_index, train_number_search_index_end) + "</span>" + train_number.substring(train_number_search_index_end) + "</span>";
                    } else if (search_hit_count === 4) {
                        buf_2 += "<span>他</span>";
                    }
                    
                    search_hit_count++;
                }
            }
        }
        
        if (buf_2 === "") {
            buf_2 = "(運行なし)";
        }
        
        if (search_keyword === "" || search_hit_count >= 1) {
            buf += "<tr onclick='operation_detail(\"" + operation_number + "\", " + operation_table_name_or_ts + ", " + is_today_str + ");'>";
            buf += "<th rowspan='2' style='background-color: " + (config["dark_mode"] ? convert_color_dark_mode(operation_table["operations"][operation_number]["main_color"]) : operation_table["operations"][operation_number]["main_color"]) + "'><b>" + operation_number + "</b>" + operation_table["operations"][operation_number]["operation_group_name"] + "<br>(" + operation_table["operations"][operation_number]["car_count"] + "両)</th>";
            buf += "<td>" + operation_table["operations"][operation_number]["starting_location"] + (operation_table["operations"][operation_number]["starting_track"] !== null ? "<small>(" + operation_table["operations"][operation_number]["starting_track"] + ")</small>" : "") + "<time" + (operation_table["operations"][operation_number]["starting_time"] !== null ? ">" + operation_table["operations"][operation_number]["starting_time"] : " datetime='PT24H'>N/A") + "</time></td>";
            buf += "<td>" + operation_table["operations"][operation_number]["terminal_location"] + (operation_table["operations"][operation_number]["terminal_track"] !== null ? "<small>(" + operation_table["operations"][operation_number]["terminal_track"] + ")</small>" : "") + "<time" + (operation_table["operations"][operation_number]["ending_time"] !== null ? ">" + operation_table["operations"][operation_number]["ending_time"] : " datetime='PT24H'>N/A") + "</time></td>";
            buf += "</tr>";
            buf += "<tr onclick='operation_detail(\"" + operation_number + "\", " + operation_table_name_or_ts + ", " + is_today_str + ");'><td colspan='2' class='operation_overview'>";
            buf += buf_2;
            buf += "</td></tr>";
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
    
    operation_table_info_elm.innerHTML = "運用表更新日時: " + get_date_and_time(operation_table["last_modified_timestamp"]) + "<br>時刻表更新日時: " + get_date_and_time(timetable["last_modified_timestamp"]);
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

function operation_table_change (diagram_id) {
    operation_search_area_elm.style.display = "none";
    operation_table_area_elm.innerHTML = "";
    operation_table_info_elm.innerHTML = "";
    
    document.getElementById("operation_table_name").innerText = diagram_info["diagrams"][diagram_id]["diagram_name"];
    
    var promise_1_resolved = false;
    var promise_2_resolved = false;
    
    var promise_1 = new Promise(function (resolve, reject) {
        load_operation_table(function () {
            if (!promise_1_resolved) {
                promise_1_resolved = true;
                resolve();
            } else if (promise_2_resolved) {
                operation_table_list_number();
            }
        }, reject, diagram_id);
    });
    
    var promise_2 = new Promise(function (resolve, reject) {
        update_timetable(function () {
            if (!promise_2_resolved) {
                promise_2_resolved = true;
                resolve();
            } else if (promise_1_resolved) {
                operation_table_list_number();
            }
        }, reject, diagram_info["diagrams"][diagram_id]["timetable_id"]);
    });
    
    Promise.all([promise_1, promise_2]).then(function () {
        operation_table_list_number();
    }, function () {
        operation_table_area_elm.innerHTML = "<div class='no_data'>表示に必要なデータが利用できません</div>";
    });
}

function operation_table_previous () {
    var list_index = diagram_info["diagram_order"].indexOf(operation_table["diagram_id"]) - 1;
    
    if (list_index < 0) {
        list_index = diagram_info["diagram_order"].length - 1;
    }
    
    operation_table_change(diagram_info["diagram_order"][list_index]);
}

function operation_table_next () {
    var list_index = diagram_info["diagram_order"].indexOf(operation_table["diagram_id"]) + 1;
    
    if (list_index >= diagram_info["diagram_order"].length) {
        list_index = 0;
    }
    
    operation_table_change(diagram_info["diagram_order"][list_index]);
}

function operation_table_list_tables () {
    var popup_inner_elm = open_square_popup("diagram_list_popup", true);
    
    var buf = "<h3>" + diagram_info["diagram_revision"] + "改正ダイヤ</h3>";
    for (var diagram_id of diagram_info["diagram_order"]) {
        var bg_color = config["dark_mode"] ? convert_color_dark_mode(diagram_info["diagrams"][diagram_id]["main_color"]) :diagram_info["diagrams"][diagram_id]["main_color"];
        buf += "<button type='button' class='wide_button' onclick='close_square_popup(); operation_table_change(\"" + diagram_id + "\");' style='background-color: " + bg_color + "; border-color: " + bg_color + ";'>"  + escape_html(diagram_info["diagrams"][diagram_id]["diagram_name"]) + "</button>";
    }
    
    buf += "<div class='descriptive_text'>ダイヤ情報更新日時: " + get_date_and_time(diagram_info["last_modified_timestamp"]) + "</div>";
    
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

var post_yyyy_mm_dd;
var post_operation_number;
var post_train_number;

function write_operation_data (yyyy_mm_dd, operation_number, train_number = null) {
    var popup_inner_elm = open_popup("write_operation_data_popup", "運用情報の投稿");
    
    var yyyy_mm_dd_today = get_date_string(get_timestamp());
    
    if (yyyy_mm_dd === null) {
        post_yyyy_mm_dd = yyyy_mm_dd_today;
    } else {
        post_yyyy_mm_dd = yyyy_mm_dd;
    }
    
    post_operation_number = operation_number;
    
    var alias_of_forward_direction = escape_html(railroad_info["alias_of_forward_direction"]);
    
    if (instance_info["allow_guest_user"] || user_data !== null) {
        var buf = "<div id='write_operation_data_area'>";
        buf += "<h3>" + escape_html(operation_number) + "運用</h3>";
        
        if (post_yyyy_mm_dd > yyyy_mm_dd_today || (post_yyyy_mm_dd === yyyy_mm_dd_today && operation_table["operations"][operation_number]["starting_time"] > get_hh_mm())) {
            var speculative_post = true;
            
            buf += "<div class='warning_text'>【!】出庫前の運用に情報を投稿しようとしています</div>";
        } else {
            var speculative_post = false;
        }
        
        buf += "<h4>確認方法</h4>";
        buf += "<div class='radio_area'><input type='radio' name='identify_method' id='identify_method_direct' checked='checked'><label for='identify_method_direct' onclick='switch_identify_method(true);'>直接確認</label><input type='radio' name='identify_method' id='identify_method_quote'><label for='identify_method_quote' onclick='switch_identify_method(false);'>引用情報</label></div>";
        
        buf += "<h4>編成名または車両形式</h4>";
        buf += "<div class='informational_text'><b>◀ " + alias_of_forward_direction + "</b></div>";
        buf += "<input type='text' id='operation_data_formation' autocomplete='off' oninput='suggest_formation(this.value);' onblur='clear_formation_suggestion();'><div class='suggestion_area'><div id='formation_suggestion'></div></div>";
        buf += "<div class='informational_text'>複数の編成が連結している場合は、" + alias_of_forward_direction + "の編成から順に「+」で区切って入力してください。<br>不明な編成には「不明」、運休情報は「運休」を入力可能です。</div>";
        
        buf += "<input type='checkbox' id='operation_data_details'";
        if (speculative_post && instance_info["require_comments_on_speculative_posts"]) {
            buf += " checked='checked'";
        }
        buf += "><label for='operation_data_details' class='drop_down'>詳細情報</label><div>";
        
        buf += "<h4>情報の種類</h4>";
        buf += "<div class='radio_area'><input type='radio' name='operation_data_type' id='operation_data_type_normal' checked='checked'><label for='operation_data_type_normal'>通常・訂正の情報</label><input type='radio' name='operation_data_type' id='operation_data_type_reassign'><label for='operation_data_type_reassign'>新しい差し替え情報</label></div>";
        
        if (post_yyyy_mm_dd === yyyy_mm_dd_today) {
            var now_hh_mm = get_hh_mm();
        } else {
            var now_hh_mm = "99:99";
        }
        
        buf += "<div id='train_number_data'>";
        buf += "<h4>目撃時の列車</h4>";
        buf += "<b id='operation_data_train_number'></b><button onclick='select_train_number(\"" + add_slashes(operation_number) + "\", \"" + now_hh_mm + "\");'>変更</button>";
        buf += "</div>";
        
        buf += "<h4>運用補足情報</h4>";
        buf += "<textarea id='operation_data_comment'></textarea>";
        
        if (speculative_post && instance_info["require_comments_on_speculative_posts"]) {
            buf += "<div class='warning_text' id='comment_guide'>お手数ですが、この運用に充当される編成を確認した方法を補足情報にご入力ください。</div>";
        } else {
            buf += "<div class='informational_text' id='comment_guide'>差し替え等の特記事項がない場合は省略可能です。</div>";
        }
        
        buf += "<div class='warning_text' id='quote_guide' style='display: none;'>情報の出典を補足情報にご入力ください。<br><br>また、お手数ですが、投稿前に<a href='javascript:void(0);' onclick='show_rules();'>ルールとポリシー</a>をご覧いただき、引用元が投稿ルールに反しない情報ソースであることをご確認願います。</div>";
        
        buf += "</div><br>";
        
        buf += "<button type='button' class='wide_button' onclick='check_post_operation_data();'>投稿する</button>";
        
        buf += "</div>";
        
        if (user_data !== null) {
            get_one_time_token();
        }
    } else {
        var buf = "<div class='warning_text'>情報投稿にはログインが必要です。<br>ユーザーアカウントをまだ作成されていない場合は新規登録してください。</div>";
        buf += "<div class='link_block'><a href='javascript:void(0);' onclick='show_login_form();'>ログイン</a>　<a href='/user/sign_up.php' target='_blank' rel='opener'>新規登録</a></div>";
    }
    
    popup_inner_elm.innerHTML = buf;
    
    if (!speculative_post) {
        for (var cnt = 0; cnt < operation_table["operations"][operation_number]["trains"].length; cnt++) {
            if (operation_table["operations"][operation_number]["trains"][cnt]["final_arrival_time"] > now_hh_mm) {
                break;
            }
        }
        
        if (train_number !== null) {
            set_train_number(train_number);
        } else {
            if (cnt === operation_table["operations"][operation_number]["trains"].length) {
                set_train_number("△");
            } else {
                set_train_number(operation_table["operations"][operation_number]["trains"][cnt]["train_number"]);
            }
        }
    } else {
        set_train_number("○");
    }
}

function select_train_number (operation_number, now_hh_mm) {
    var popup_inner_elm = open_square_popup("train_number_popup", true, "列車の選択");
    
    var buf = "<a href='javascript:void(0);' onclick='set_train_number(\"○\")'>○ 出庫時</a>";
    
    for (var cnt = 0; cnt < operation_table["operations"][operation_number]["trains"].length; cnt++) {
        if (cnt == 0 || operation_table["operations"][operation_number]["trains"][cnt]["train_number"] !== operation_table["operations"][operation_number]["trains"][cnt - 1]["train_number"]) {
            var first_departure_time = operation_table["operations"][operation_number]["trains"][cnt]["first_departure_time"];
        }
        
        if (cnt + 1 < operation_table["operations"][operation_number]["trains"].length && operation_table["operations"][operation_number]["trains"][cnt]["train_number"] === operation_table["operations"][operation_number]["trains"][cnt + 1]["train_number"]) {
            continue;
        }
        
        var train_title = operation_table["operations"][operation_number]["trains"][cnt]["train_number"].split("__")[0];
        
        if (train_title.startsWith(".")) {
            train_title = train_title.substring(1) + "待機";
            
            var color = "inherit";
        } else {
            var color = config["dark_mode"] ? convert_font_color_dark_mode(get_train_color(train_title)) : get_train_color(train_title);
        }
        
        buf += "<a href='javascript:void(0);' onclick='set_train_number(\"" + add_slashes(operation_table["operations"][operation_number]["trains"][cnt]["train_number"]) + "\")' style='color: " + color + ";'>" + escape_html(train_title) + "<small>" + first_departure_time + " 〜 " + operation_table["operations"][operation_number]["trains"][cnt]["final_arrival_time"] + "</small></a>";
        
        if (operation_table["operations"][operation_number]["trains"][cnt]["final_arrival_time"] > now_hh_mm) {
            break;
        }
    }
    
    if (cnt === operation_table["operations"][operation_number]["trains"].length) {
        buf += "<a href='javascript:void(0);' onclick='set_train_number(\"△\")'>△ 入庫時</a>";
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

function suggest_formation (formations_text) {
    var formations_splitted = formations_text.split("+");
    var formation_text = str_to_halfwidth(formations_splitted[formations_splitted.length - 1]).toUpperCase();
    
    var buf = "";
    
    if (formation_text.length >= 1) {
        var formation_names = Object.keys(series_icon_ids).concat(Object.keys(formations["formations"]).toSorted());
        
        var suggestion_list = formation_names.filter(function (formation_name) {
            return formation_name.toUpperCase().startsWith(formation_text);
        });
        
        for (var suggestion of suggestion_list) {
            var overview = get_formation_overview(suggestion);
            
            buf += "<a href='javascript:void(0);' ";
            
            if (overview["semifixed_formation"] !== null) {
                buf += "onclick='complete_formation(\"" + add_slashes(overview["semifixed_formation"]) + "\");'>";
                
                var suggestion_formations = overview["semifixed_formation"].split("+");
                for (var cnt = 0; cnt < suggestion_formations.length; cnt++) {
                    buf += (cnt >= 1 ? " + " : "") + "<img src='" + get_icon(suggestion_formations[cnt]) + "' alt='' class='train_icon'" + (overview["unavailable"] ? " style='opacity: 0.5;'" : "") + ">" + (suggestion_formations[cnt] === suggestion ? "<b>" : "") + add_slashes(suggestion_formations[cnt]) + (suggestion_formations[cnt] === suggestion ? "</b>" : "");
                }
                
                if (overview["unavailable"]) {
                    buf += "<small class='warning_sentence'>(離脱中)</small>";
                } else {
                    buf += "<small>(半固定)</small>";
                }
            } else {
                buf += "onclick='complete_formation(\"" + add_slashes(suggestion) + "\");'>";
                
                if (overview["unavailable"]) {
                    buf += "<img src='" + get_icon(suggestion) + "' alt='' class='train_icon' style='opacity: 0.5;'>" + add_slashes(suggestion) + "<small class='warning_sentence'>(運用離脱中)</small>";
                } else {
                    buf += "<img src='" + get_icon(suggestion) + "' alt='' class='train_icon'><b>" + add_slashes(suggestion) + "</b>";
                    if (overview["caption"].length >= 1) {
                        buf += "<small>(" + overview["caption"] + ")</small>";
                    }
                }
            }
            
            buf += "</a>";
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
            document.getElementById("formation_suggestion").innerHTML = "<a href='javascript:void(0);' onclick='complete_formation(\"+\");'>＋</a>";
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
        write_operation_data(null, train_operations[0], train_number);
        
        return;
    }
    
    var popup_inner_elm = open_square_popup("select_operation_popup", false, "情報を投稿する運用の選択");
    
    var position_operations = {};
    for (var train_operation of train_operations) {
        for (var train of operation_table["operations"][train_operation]["trains"]) {
            if (train["train_number"] === train_number && train["starting_station"] === starting_station) {
                position_operations[("0" + train["position_forward"]).slice(-2)] = {
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
        
        buf += "<td onclick='write_operation_data(null, \"" + add_slashes(position_operations[position_keys[cnt]]["operation_number"]) + "\", \"" + add_slashes(train_number) + "\");'><div><b>" + position_operations[position_keys[cnt]]["position_forward"];
        
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
    
    var send_data = "railroad_id=" + escape_form_data(railroad_info["railroad_id"]) + "&date=" + escape_form_data(post_yyyy_mm_dd) + "&operation_number=" + escape_form_data(post_operation_number) + "&assign_order=" + assign_order + "&formations=" + escape_form_data(document.getElementById("operation_data_formation").value) + "&comment=" + escape_form_data(document.getElementById("operation_data_comment").value);
    
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
            
            Object.assign(operation_data["operations"], JSON.parse(response));
            
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

function edit_operation_data (yyyy_mm_dd, operation_number, assign_order, user_id, formation_text, ip_address = null) {
    var popup_inner_elm = open_popup("edit_operation_data_popup", "運用情報の取り消し");
    
    buf = "<h3>投稿内容</h3>";
    buf += "<div class='key_and_value'><b>運行日</b>" + yyyy_mm_dd.substring(0, 4) + "年 " + Number(yyyy_mm_dd.substring(5, 7)) + "月 " + Number(yyyy_mm_dd.substring(8)) + "日</div>";
    buf += "<div class='key_and_value'><b>運用番号</b>" + escape_html(operation_number) + "</div>";
    buf += "<div class='key_and_value'><b>編成名</b>" + escape_html(formation_text) + "</div>";
    
    if (user_id !== user_data["user_id"]) {
        buf += "<h3>投稿者情報</h3>";
        buf += "<div class='key_and_value'><b>ユーザーID</b>" + escape_html(user_id) + "<div id='edit_operation_data_is_suspicious_user'></div></div>";
        if (ip_address !== null) {
            buf += "<div class='key_and_value'><b>IPアドレス</b>" + escape_html(ip_address) + "<div id='edit_operation_data_is_suspicious_ip_address'></div></div>";
            buf += "<div class='key_and_value'><b>ホスト名</b><div id='edit_operation_data_host_name'></div></div>";
        }
    } else {
        buf += "<br>";
    }
    
    buf += "<br><button type='button' class='wide_button' onclick='revoke_operation_data(\"" + yyyy_mm_dd + "\", \"" + add_slashes(operation_number) + "\", " + assign_order + ",\"" + add_slashes(user_id) + "\");'>取り消す</button>";
    
    if (user_id !== user_data["user_id"]) {
        buf += "<button type='button' class='wide_button' onclick='revoke_users_all_operation_data(\"" + add_slashes(user_id) + "\");'>ユーザーの投稿を全て取り消す</button>";
    }
    
    popup_inner_elm.innerHTML = buf;
    
    get_one_time_token();
    
    if (user_id !== user_data["user_id"]) {
        show_moderation_info(user_id, ip_address);
    }
}

function show_moderation_info (user_id, ip_address) {
    if (user_id === null) {
        user_id = "";
    }
    
    if (ip_address === null) {
        ip_address = "";
    }
    
    ajax_post("moderation_info.php", "railroad_id=" + escape_form_data(railroad_info["railroad_id"]) + "&user_id=" + escape_form_data(user_id) + "&ip_address=" + escape_form_data(ip_address), function (response) {
        if (response === false) {
            return;
        }
        
        var moderation_info = JSON.parse(response);
        
        if (moderation_info["is_suspicious_user"] !== null) {
            var is_suspicious_user_elm = document.getElementById("edit_operation_data_is_suspicious_user");
            if (moderation_info["is_suspicious_user"]) {
                is_suspicious_user_elm.innerText = "【!】要注意ユーザー";
                is_suspicious_user_elm.className = "warning_text";
            } else {
                is_suspicious_user_elm.innerHTML = "<button type='button' onclick='mark_user_suspect(\"" + add_slashes(user_id) + "\");'>要注意ユーザーに指定</button>";
            }
        }
        
        if (moderation_info["host_name"] !== null && moderation_info["is_suspicious_ip_address"] !== null) {
            document.getElementById("edit_operation_data_host_name").innerText = moderation_info["host_name"];
            
            var is_suspicious_ip_address_elm = document.getElementById("edit_operation_data_is_suspicious_ip_address");
            if (moderation_info["is_suspicious_ip_address"]) {
                is_suspicious_ip_address_elm.innerText = "【!】要注意IPアドレス";
                is_suspicious_ip_address_elm.className = "warning_text";
            } else {
                is_suspicious_ip_address_elm.innerHTML = "<button type='button' onclick='mark_ip_address_suspect(\"" + add_slashes(ip_address) + "\");'>要注意IPアドレスに指定</button>";
            }
        }
    });
}

function revoke_operation_data (yyyy_mm_dd, operation_number, assign_order, user_id) {
    open_wait_screen();
    
    if (one_time_token === null) {
        close_wait_screen();
        
        mes("内部処理が完了していないため、数秒待ってから再送信してください", true);
        
        return;
    }
    
    ajax_post("revoke.php", "railroad_id=" + escape_form_data(railroad_info["railroad_id"]) + "&date=" + escape_form_data(yyyy_mm_dd) + "&operation_number=" + escape_form_data(operation_number) + "&assign_order=" + assign_order + "&user_id=" + escape_form_data(user_id) + "&one_time_token=" + escape_form_data(one_time_token), function (response) {
        close_wait_screen();
        
        if (response !== false) {
            mes("運用情報を取り消しました");
            
            if (square_popup_is_open) {
                close_square_popup();
            }
            popup_close(true);
            
            Object.assign(operation_data["operations"], JSON.parse(response));
            
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

function revoke_users_all_operation_data (user_id) {
    if (confirm("このユーザーの過去24時間の投稿を全て取り消しますか？")) {
        open_wait_screen();
        
        if (one_time_token === null) {
            close_wait_screen();
            
            mes("内部処理が完了していないため、数秒待ってから再送信してください", true);
            
            return;
        }
        
        ajax_post("revoke_users_all.php", "railroad_id=" + escape_form_data(railroad_info["railroad_id"]) + "&user_id=" + escape_form_data(user_id) + "&one_time_token=" + escape_form_data(one_time_token), function (response) {
            close_wait_screen();
            
            if (response === "SUCCESSFULLY_REVOKED") {
                mes("運用情報を取り消しました");
                
                if (square_popup_is_open) {
                    close_square_popup();
                }
                popup_close(true);
                
                update_operation_data(function () {
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
                }, function () {}, true);
            }
        });
    }
}

function mark_user_suspect (user_id) {
    if (confirm("このユーザーを要注意ユーザーに指定しますか？")) {
        open_wait_screen();
        
        if (one_time_token === null) {
            close_wait_screen();
            
            mes("内部処理が完了していないため、数秒待ってから再送信してください", true);
            
            return;
        }
        
        ajax_post("mark_user_suspect.php", "railroad_id=" + escape_form_data(railroad_info["railroad_id"]) + "&user_id=" + escape_form_data(user_id) + "&one_time_token=" + escape_form_data(one_time_token), function (response) {
            close_wait_screen();
            
            if (response === "SUCCEEDED") {
                mes("ユーザーを要注意に指定しました");
                
                show_moderation_info(user_id, null);
            }
            
            get_one_time_token();
        });
    }
}

function mark_ip_address_suspect (ip_address) {
    if (confirm("このIPアドレスを要注意IPアドレスに指定しますか？")) {
        open_wait_screen();
        
        if (one_time_token === null) {
            close_wait_screen();
            
            mes("内部処理が完了していないため、数秒待ってから再送信してください", true);
            
            return;
        }
        
        ajax_post("mark_ip_address_suspect.php", "railroad_id=" + escape_form_data(railroad_info["railroad_id"]) + "&ip_address=" + escape_form_data(ip_address) + "&one_time_token=" + escape_form_data(one_time_token), function (response) {
            close_wait_screen();
            
            if (response === "SUCCEEDED") {
                mes("IPアドレスを要注意に指定しました");
                
                show_moderation_info(null, ip_address);
            }
            
            get_one_time_token();
        });
    }
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
    }, config["dark_mode"] ? "#777777" : "#eeeeee");
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
    
    var buf = "<input type='checkbox' id='dark_mode_check' class='toggle' onchange='change_config();'" + (config["dark_mode"] ? "checked='checked'" : "") + "><label for='dark_mode_check'>ダークテーマ</label>";
    buf += "<input type='checkbox' id='enlarge_display_size_check' class='toggle' onchange='change_config();'" + (config["enlarge_display_size"] ? "checked='checked'" : "") + "><label for='enlarge_display_size_check'>各種表示サイズの拡大</label>";
    buf += "<input type='checkbox' id='colorize_corrected_posts_check' class='toggle' onchange='change_config();'" + (config["colorize_corrected_posts"] ? "checked='checked'" : "") + "><label for='colorize_corrected_posts_check'>訂正された投稿を区別する</label>";
    buf += "<input type='checkbox' id='colorize_beginners_posts_check' class='toggle' onchange='change_config();'" + (config["colorize_beginners_posts"] ? "checked='checked'" : "") + "><label for='colorize_beginners_posts_check'>ビギナーの方の投稿を区別する</label>";
    buf += "<h3>運用情報の自動更新間隔</h3>";
    buf += "<input type='number' id='refresh_interval' min='1' max='60' onchange='change_config();' value='" + config["refresh_interval"] + "'>分ごと<br>";
    buf += "<h3>運用情報のキャッシュ保管日数</h3>";
    buf += "<input type='number' id='operation_data_cache_period' min='1' max='30' onchange='change_config();' value='" + config["operation_data_cache_period"] + "'>日前以降のキャッシュを保管<br>";
    buf += "<a href='javascript:void(0);' class='execute_link' onclick='reset_config_value();'>デフォルト値に戻す</a>";
    buf += "<a href='javascript:void(0);' class='execute_link' onclick='reset_cache_db();'>キャッシュデータベースの初期化</a>";
    buf += "<div class='informational_text'>変更内容は自動で保存されます</div>";
    
    popup_inner_elm.innerHTML = buf;
}

function change_config () {
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
    
    update_display_settings(true);
    
    save_config();
}

function reset_config_value () {
    if (confirm("設定をリセットしますか？")) {
        var dafault_config = get_default_config();
        
        document.getElementById("dark_mode_check").checked = dafault_config["dark_mode"];
        document.getElementById("colorize_corrected_posts_check").checked = dafault_config["colorize_corrected_posts"];
        document.getElementById("colorize_beginners_posts_check").checked = dafault_config["colorize_beginners_posts"];
        document.getElementById("refresh_interval").value = dafault_config["refresh_interval"];
        document.getElementById("operation_data_cache_period").value = dafault_config["operation_data_cache_period"];
        
        change_config();
    }
}

function reset_cache_db () {
    if (confirm("キャッシュデータの削除により運用表や時刻表のデータが再ダウンロードされるため、多くの通信容量を消費する場合があります。\n\nよろしいですか？")) {
        localStorage.removeItem("unyohub_instance_info");
        localStorage.removeItem("unyohub_railroads_caches");
        
        var delete_request = indexedDB.deleteDatabase("unyohub_caches");
        
        delete_request.onsuccess = function () {
            reload_app();
        };
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
        switch (mode_val) {
            case 1:
                if (timetable_selected_station !== null) {
                    timetable_change_lines(timetable_selected_line, true);
                }
                break;
            
            case 3:
                if (selected_formation_name !== null) {
                    draw_formation_table();
                }
                break;
            
            case 4:
                if (diagram_info !== null) {
                    operation_table_mode(null);
                }
                break;
        }
    }
};


if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service_worker.js");
}
