/*_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/*/

const UNYOHUB_APP_NAME = "鉄道運用Hub";
const UNYOHUB_VERSION = "24.10-1";

/*_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/*/

/* LICENSE
 * 
 *   このソフトウェアは、無権利創作宣言に基づき著作権放棄されています。
 *   営利・非営利を問わず、自由にご利用いただくことが可能です。
 * 
 *    https://www.2pd.jp/license/
 * 
 *   異なるライセンスの下で配布する際は名称(上記、UNYOHUB_APP_NAMEの値)を変更し、区別可能としてください。
 *
 */


const UNYOHUB_INDEXEDDB_VERSION = 2410001;
const UNYOHUB_LICENSE_TEXT = "このアプリケーションは無権利創作宣言に準拠して著作権放棄されています。";
const UNYOHUB_LICENSE_URL = "https://www.2pd.jp/license/";
const UNYOHUB_REPOSITORY_URL = "https://fossil.2pd.jp/unyohub/";


document.getElementById("splash_screen_app_version").innerText = "v" + UNYOHUB_VERSION;


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
    var text_splitted = escape_html(text).replace(/https?:\/\/[^\s\\`\|\[\]\{\}\^]+/g, "<a href='$&' target='_blank' class='external_link'>$&</a>").split("\n");
    
    for (var cnt = 0; cnt < text_splitted.length; cnt++) {
        if (text_splitted[cnt].substring(0, 2) === "# ") {
            text_splitted[cnt] = "<h4>" + text_splitted[cnt].substring(2) + "</h4>";
        } else if (cnt + 1 < text_splitted.length && text_splitted[cnt + 1].substring(2) !== "# ") {
            text_splitted[cnt] += "<br>";
        }
    }
    
    return text_splitted.join("");
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
        "refresh_interval" : 5,
        "operation_data_cache_period" : 7,
        "show_train_types_in_position_mode" : false,
        "show_arriving_trains_on_timetable" : false,
        "show_starting_trains_only_on_timetable" : false,
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
    document.getElementsByTagName("title")[0].innerText = instance_info["instance_name"];
    document.getElementById("instance_name").innerText = instance_info["instance_name"];
}

(function () {
    var instance_info_json = localStorage.getItem("unyohub_instance_info");
    
    if (instance_info_json !== null) {
        instance_info = JSON.parse(instance_info_json);
        
        var last_modified_timestamp_q = "last_modified_timestamp=" + instance_info["last_modified_timestamp"];
    } else {
        instance_info = {
            instance_name : UNYOHUB_APP_NAME,
            manual_url : null,
            introduction_text : null,
            allow_guest_user : false
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
        
        cursor_request = idx_od1.openCursor(IDBKeyRange.upperBound(get_date_string(get_timestamp() - 10800 - 86400 * (config["operation_data_cache_period"])), true), "next");
        
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

function switch_dark_mode () {
    if (config["dark_mode"]) {
        document.getElementsByTagName("body")[0].classList.add("dark_mode");
    } else {
        document.getElementsByTagName("body")[0].classList.remove("dark_mode");
    }
    
    switch (mode_val) {
        case 0:
            position_change_lines(selected_line);
            break;
        case 1:
            update_selected_line(selected_line);
            if (timetable_selected_station !== null) {
                timetable_select_station(timetable_selected_station);
            }
            break;
        case 2:
            operation_data_draw();
            break;
        case 4:
            operation_table_list_number();
            break;
    }
}


var splash_screen_elm = document.getElementById("splash_screen");

switch_dark_mode();
splash_screen_elm.classList.remove("splash_screen_loading");


var header_elm = document.getElementsByTagName("header")[0];
var railroad_icon_elm = document.getElementById("railroad_icon");

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

function open_popup (id) {
    if (square_popup_is_open) {
        close_square_popup();
    }
    
    popup_background_elm.style.display = "block";
    
    var elm = document.getElementById(id);
    
    if (!elm.classList.contains("popup_active")) {
        elm.classList.add("popup_active");
        elm.style.zIndex = popup_history.length + 50;
        
        popup_history.push(id);
        
        menu_click(true);
    }
}

function popup_close (close_all = false) {
    var id = popup_history.pop();
    
    if (popup_history.length === 0) {
        popup_background_elm.style.display = "none";
    }
    
    document.getElementById(id).classList.remove("popup_active");
    
    if (close_all && popup_history.length >= 1) {
        popup_close(true);
    }
}

var screen_elm = document.getElementById("popup_screen");
var wait_screen_elm = document.getElementById("wait_screen");

function open_square_popup (id) {
    if (square_popup_is_open) {
        close_square_popup();
    }
    
    screen_elm.className = "popup_screen_active";
    document.getElementById(id).classList.add("popup_active");
    
    popup_history.push(id);
    square_popup_is_open = true;
}

function close_square_popup () {
    var id = popup_history.pop();
    
    screen_elm.className = "";
    document.getElementById(id).classList.remove("popup_active");
    
    square_popup_is_open = false;
    
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
        
        menu_user_name_elm.innerText = user_data["user_name"] + " " + honorific;
        
        splash_screen_login_status_elm.innerHTML = "ようこそ <b>" + escape_html(user_data["user_name"]) + "</b> さん<br><a href='/user/user_info.php' target='_blank' rel='opener'>ユーザー情報</a>　<a href='javascript:void(0);' onclick='user_logout();'>ログアウト</a>";
    } else {
        menu_logged_in_elm.style.display = "none";
        menu_not_logged_in_elm.style.display = "block";
        
        splash_screen_login_status_elm.innerHTML = "<b>ログインしていません</b><br><a href='javascript:void(0);' onclick='open_square_popup(\"login_popup\");'>ログイン</a>　<a href='/user/sign_up.php' target='_blank' rel='opener'>新規登録</a>";
    }
    
    if (!instance_info["allow_guest_user"] && popup_history.includes("write_operation_data_popup")) {
        if (user_data !== null) {
            write_operation_data_area_elm.style.display = "block";
            require_login_area_elm.style.display = "none";
            
            get_one_time_token();
        } else {
            write_operation_data_area_elm.style.display = "none";
            require_login_area_elm.style.display = "block";
        }
    }
}

function check_logged_in () {
    ajax_post("check_logged_in.php", null, function (response) {
        if (response !== false) {
            if (response !== "NOT_LOGGED_IN"){
                update_user_data(JSON.parse(response));
            } else {
                update_user_data();
            }
        } else {
            splash_screen_login_status_elm.innerText = "【!】ログイン状態の確認に失敗しました";
        }
    });
}

var splash_screen_login_status_elm = document.getElementById("splash_screen_login_status");

function update_railroad_list (railroads) {
    var buttons_html = "";
    
    for (var cnt = 0; cnt < railroads["railroads_order"].length; cnt++) {
        buttons_html += "<a href='/railroad_" + railroads["railroads_order"][cnt] + "/' class='wide_button' onclick='select_railroad(\"" + railroads["railroads_order"][cnt] + "\"); return false;'><img src='" + railroads["railroads"][railroads["railroads_order"][cnt]]["railroad_icon"] + "' alt='' style='background-color: " + railroads["railroads"][railroads["railroads_order"][cnt]]["main_color"] + ";'>" + escape_html(railroads["railroads"][railroads["railroads_order"][cnt]]["railroad_name"]) + "</a>";
    }
    
    if (cnt === 0) {
        buttons_html = "<div class='no_data'>利用可能なデータがありません</div>";
    }
    
    document.getElementById("railroad_select_area").innerHTML = buttons_html;
    document.getElementById("splash_screen_buttons").innerHTML = buttons_html;
    
    splash_screen_elm.className = "splash_screen_loaded";
}


var menu_off_line_elm = document.getElementById("menu_off_line");

window.ononline = function () {
    menu_off_line_elm.style.display = "none";
    
    check_logged_in();
}

function on_off_line () {
    splash_screen_login_status_elm.innerHTML = "<b class='off_line_message'>端末がオフラインです</b><br>前回アクセス時のデータを表示します";
    
    menu_off_line_elm.style.display = "block";
    
    menu_admin_elm.style.display = "none";
    menu_logged_in_elm.style.display = "none";
    menu_not_logged_in_elm.style.display = "none";
    
    announcements_overview_elm.innerHTML = "";
}

window.onoffline = on_off_line;


window.onload = function () {
    if (location.pathname.startsWith("/railroad_")) {
        select_railroad(location.pathname.substring(10, location.pathname.length - 1));
    }
    
    var cache_json = localStorage.getItem("unyohub_railroads_caches");
    
    if (cache_json !== null) {
        var railroads_caches = JSON.parse(cache_json);
    } else {
        var railroads_caches = {
            railroads : {},
            railroads_order : [],
            last_modified_timestamp : 0
        };
    }
    
    if (navigator.onLine) {
        check_logged_in();
        
        ajax_post("railroads.php", "last_modified_timestamp=" + railroads_caches["last_modified_timestamp"], function (response, last_modified) {
            if (response !== false && response !== "NO_UPDATES_AVAILABLE") {
                railroads_caches = JSON.parse(response);
                
                var last_modified_date = new Date(last_modified);
                railroads_caches["last_modified_timestamp"] = Math.floor(last_modified_date.getTime() / 1000);
                
                localStorage.setItem("unyohub_railroads_caches", JSON.stringify(railroads_caches));
            }
            
            update_railroad_list(railroads_caches);
        }, 10);
    } else {
        update_railroad_list(railroads_caches);
        on_off_line();
    }
    
    check_announcements(true);
};


var announcements_overview_elm = document.getElementById("announcements_overview");
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
        
        for (var cnt = 0; cnt < announcements_data.length; cnt++) {
            if (announcements_data[cnt]["expiration_timestamp"] >= ts && announcements_data[cnt]["last_modified_timestamp"] > last_read_timestamp) {
                if (announcements_data[cnt]["is_important"]) {
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
            announcements_overview_elm.innerHTML = "<b class='new_icon'>新しいお知らせがあります</b>";
            menu_announcements_elm.className = "new_icon";
        } else {
            announcements_overview_elm.innerHTML = "新しいお知らせはありません";
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
        
        for (var cnt = 0; cnt < announcements_data.length; cnt++) {
            if (announcements_data[cnt]["expiration_timestamp"] >= ts) {
                if (announcements_data[cnt]["last_modified_timestamp"] > last_read_timestamp) {
                    new_announcement_exists = true;
                    
                    if (announcements_data[cnt]["is_important"]) {
                        new_important_announcement_exists = true;
                    }
                }
                
                if (announcements_data[cnt]["is_important"]) {
                    if (announcement_text.length >= 1) {
                        announcement_text = "複数の重要な情報があります";
                        
                        continue;
                    }
                    
                    announcement_text = announcements_data[cnt]["title"];
                }
            }
        }
        
        railroad_announcement_elm.innerText = announcement_text;
        
        if (new_important_announcement_exists) {
            railroad_announcement_elm.className = "railroad_announcement_with_important_notification";
        } else if (new_announcement_exists) {
            railroad_announcement_elm.className = "railroad_announcement_with_notification";
        }
    });
}

function show_announcements (railroad_id = null, important_announcements_exist = false) {
    open_square_popup("announcements_popup");
    
    announcements_overview_elm.innerHTML = "新しいお知らせはありません";
    menu_button_elm.classList.remove("menu_button_with_notification");
    menu_announcements_elm.className = "";
    
    var heading_elm = document.getElementById("announcements_heading");
    if (important_announcements_exist) {
        if (!config["dark_mode"]) {
            var color = "#cc0000";
        } else {
            var color = "#ff3333";
        }
        
        heading_elm.innerHTML = "<span style='color: " + color + ";'>重要なお知らせがあります</span>";
    } else {
        heading_elm.innerHTML = "お知らせの一覧";
    }
    
    var railroad_heading_elm = document.getElementById("railroad_announcements_heading");
    
    if (railroad_id !== null) {
        heading_elm.style.display = "none";
        railroad_heading_elm.style.display = "block";
        
        var main_color = railroad_info["main_color"];
        if (config["dark_mode"]) {
            main_color = convert_color_dark_mode(main_color);
        }
        
        railroad_heading_elm.style.backgroundColor = main_color;
        
        railroad_heading_elm.innerText = railroad_info["railroad_name"] + "のお知らせ";
    } else {
        heading_elm.style.display = "block";
        railroad_heading_elm.style.display = "none";
    }
    
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
        
        buf += "<div><div class='announcement'>" + convert_to_html(announcements_data[cnt]["content"]) + "<small>" + escape_html(announcements_data[cnt]["user_name"]) + "　" + dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes() + "</small></div></div>";
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
    railroad_icon_elm.style.backgroundImage = "url(" + railroad_info["railroad_icon"] + "), linear-gradient(to right, " + railroad_info["main_color"] + ", hsl(" + main_color_hsl[0] + "deg " + Math.round(main_color_hsl[1] / 2.55) + "% " + Math.round(Math.min(main_color_hsl[2] * 1.2, 255) / 2.55) + "%))";
    
    railroad_info["deadhead_train_number_regexp"] = new RegExp(railroad_info["deadhead_train_number"]);
    
    for (var cnt_2 = 0; cnt_2 < railroad_info["train_color_rules"].length; cnt_2++) {
        railroad_info["train_color_rules"][cnt_2]["regexp"] = new RegExp(railroad_info["train_color_rules"][cnt_2]["pattern"]);
    }
    
    header_elm.className = "railroad_select_mode";
}


var formation_styles_available = false;

function update_formation_styles () {
    var formation_css = document.getElementById("formation_styles").sheet;
    for (var cnt = formation_css.cssRules.length - 1; cnt >= 0; cnt--) {
        formation_css.deleteRule(cnt);
    }
    
    formation_styles_available = false;
    
    if ("body_colorings" in formations) {
        try {
            var coloring_ids = Object.keys(formations["body_colorings"]);
            
            for (cnt = 0; cnt < coloring_ids.length; cnt++) {
                var base_color = formations["body_colorings"][coloring_ids[cnt]]["base_color"]
                
                var css_code = ".car_coloring_" + coloring_ids[cnt] + " { background-color: " + base_color + "; color: " + formations["body_colorings"][coloring_ids[cnt]]["font_color"] + "; text-shadow: -1.4px -1.4px " + base_color + ", -0.5px -1.4px " + base_color + ", 0.5px -1.4px " + base_color + ", 1.4px -1.4px " + base_color + ", -1.4px -0.5px " + base_color + ", 1.4px -0.5px " + base_color + ", -1.4px 0.5px " + base_color + ", 1.4px 0.5px " + base_color + ", -1.4px 1.4px " + base_color + ", -0.5px 1.4px " + base_color + ", 0.5px 1.4px " + base_color + ", 1.4px 1.4px " + base_color + ";";
                
                if ("stripes" in formations["body_colorings"][coloring_ids[cnt]]) {
                    css_code += " background-image:";
                    
                    for (var cnt_2 = 0; cnt_2 < formations["body_colorings"][coloring_ids[cnt]]["stripes"].length; cnt_2++) {
                        var stripe_data = formations["body_colorings"][coloring_ids[cnt]]["stripes"][cnt_2];
                        
                        if (cnt_2 >= 1) {
                            css_code += ",";
                        }
                        
                        css_code += " linear-gradient(";
                        
                        if ("verticalize" in stripe_data && stripe_data["verticalize"]) {
                            css_code += "to right, ";
                        } else {
                            css_code += "to bottom, ";
                        }
                        
                        css_code += "transparent 0% " + stripe_data["start"] + "%, " + stripe_data["color"] + " " + stripe_data["start"] + "% " + stripe_data["end"] + "%, transparent " + stripe_data["end"] + "% 100%)";
                    }
                    
                    css_code += ";";
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

function select_railroad (railroad_id) {
    splash_screen_elm.style.display = "none";
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
                                position_mode();
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
    
    update_railroad_announcement(railroad_id, true);
    
    Promise.all([promise_1, promise_2, promise_3, promise_4]).then(function () {
        history.pushState(null, "", "/railroad_" + railroad_id + "/");
        document.getElementsByTagName("title")[0].innerText = railroad_info["railroad_name"] + "の運用情報 | " + instance_info["instance_name"];
        
        update_formation_styles();
        
        selected_line = railroad_info["lines_order"][0];
        
        position_mode();
    }, function () {
        mes("選択された路線系統はデータが利用できません", true);
        
        open_popup('railroad_select_popup');
        blank_article_elm.innerHTML = "<div class='no_data'><a href='javascript:void(0);' onclick='open_popup(\"railroad_select_popup\");'>路線系統を選択</a>してください</div>";
    });
}


function get_holiday_list (year) {
    var holiday_list = ["01-01", "02-11", "02-23", "04-29", "05-03", "05-04", "05-05", "08-11", "11-03", "11-23"];
    var happy_monday_list = [["01", 2], ["07", 3], ["09", 3], ["10", 2]];
    
    holiday_list.push("03-" + (Math.floor(20.8431 + 0.242194 * (year - 1980)) - Math.floor((year - 1980) / 4)));
    var shubun = Math.floor(23.2488 + 0.242194 * (year - 1980)) - Math.floor((year - 1980) / 4);
    holiday_list.push("09-" + shubun);
    
    for (var hm_cnt = 0; hm_cnt < happy_monday_list.length; hm_cnt++) {
        var dt = new Date(String(year) + "-" + happy_monday_list[hm_cnt][0] + "-01 12:00:00");
        
        var day_number = dt.getDay();
        if (day_number <= 1) {
            day_number += 7;
        }
        holiday_list.push(happy_monday_list[hm_cnt][0] + "-" + ("0" + ((2 - day_number) + (7 * happy_monday_list[hm_cnt][1]))).slice(-2));
    }
    
    for (var h_cnt = 0; h_cnt < holiday_list.length; h_cnt++) {
        var dt = new Date(String(year) + "-" + holiday_list[h_cnt] + " 12:00:00");
        
        if (dt.getDay() === 0) {
            var furikae_cnt = 0;
            do {
                furikae_cnt++;
                var furikae_date = holiday_list[h_cnt].substring(0, 2) + "-" + ("0" + (Number(holiday_list[h_cnt].substring(3)) + furikae_cnt)).slice(-2);
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
    
    for (var cnt = 0; cnt < diagram_revisions["diagram_revisions"].length; cnt++) {
        if (diagram_revisions["diagram_revisions"][cnt] <= date_str) {
            return diagram_revisions["diagram_revisions"][cnt];
        }
    }
    
    mes("指定された日付のダイヤ情報は利用できません", true);
    
    return null;
}

function search_diagram_schedules (date_str) {
    for (var cnt = 0; cnt < diagram_info["diagram_schedules"].length; cnt++) {
        for (var cnt_2 = 0; cnt_2 < diagram_info["diagram_schedules"][cnt]["periods"].length; cnt_2++) {
            if (diagram_info["diagram_schedules"][cnt]["periods"][cnt_2]["start_date"] <= date_str && (diagram_info["diagram_schedules"][cnt]["periods"][cnt_2]["end_date"] === null || diagram_info["diagram_schedules"][cnt]["periods"][cnt_2]["end_date"] >= date_str)) {
                if (get_holiday_list(Number(date_str.substring(0, 4))).includes(date_str.substring(5))) {
                    return diagram_info["diagram_schedules"][cnt]["diagrams_by_day"][0];
                } else {
                    var dt = new Date(date_str + " 12:00:00");
                    
                    return diagram_info["diagram_schedules"][cnt]["diagrams_by_day"][dt.getDay()];
                }
            }
        }
    }
}

function get_diagram_id (date_str, callback_func) {
    var railroad_id = railroad_info["railroad_id"];
    var diagram_revision = get_diagram_revision(date_str);
    
    if (diagram_revision === null) {
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
var footer_elm = document.getElementsByTagName("footer")[0];

tab_area_elm.onselectstart = function () { return false; };

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
    
    var tab_buttons = tab_area_elm.getElementsByTagName("button");
    var footer_boxes = footer_elm.getElementsByTagName("div");
    for (var cnt = 0; cnt < article_elms.length; cnt++) {
        if (cnt === num) {
            article_elms[cnt].style.display = "block";
            tab_buttons[cnt].className = "active_tab";
            footer_boxes[cnt].style.display = "block";
        } else {
            article_elms[cnt].style.display = "none";
            tab_buttons[cnt].className = "";
            footer_boxes[cnt].style.display = "none";
        }
    }
}


var operation_table = null;
var line_operations = null;
var operation_groups = null;

function load_operation_table (resolve_func, reject_func, diagram_id, update_line_operations = true) {
    var tables = ["operation_tables"];
    
    if (update_line_operations) {
        tables.push("line_operations")
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

function update_operation_table(resolve_func, reject_func, diagram_id, last_modified_timestamp){
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
                for (var cnt = 0; cnt < lines.length; cnt++) {
                    line_operations_data["lines"][lines[cnt]] = {
                        inbound_trains : {},
                        outbound_trains : {}
                    };
                }
                
                var operation_group_mapping = {};
                for (cnt = 0; cnt < operation_response["operation_groups"].length; cnt++) {
                    for (var cnt_2 = 0; cnt_2 < operation_response["operation_groups"][cnt]["operation_numbers"].length; cnt_2++){
                        operation_group_mapping[operation_response["operation_groups"][cnt]["operation_numbers"][cnt_2]] = operation_response["operation_groups"][cnt]["operation_group_name"];
                    }
                }
                
                var operation_numbers = Object.keys(operation_response["operations"]);
                for (cnt = 0; cnt < operation_numbers.length; cnt++) {
                    operation_response["operations"][operation_numbers[cnt]]["operation_group_name"] = operation_group_mapping[operation_numbers[cnt]];
                    
                    operations_stopped_trains[operation_numbers[cnt]] = [];
                    
                    for_2: for (var cnt_2 = 0; cnt_2 < operation_response["operations"][operation_numbers[cnt]]["trains"].length; cnt_2++) {
                        if (operation_response["operations"][operation_numbers[cnt]]["trains"][cnt_2]["train_number"].substring(0, 1) === "_") {
                            var train = operation_response["operations"][operation_numbers[cnt]]["trains"].splice(cnt_2, 1)[0];
                            
                            operations_stopped_trains[operation_numbers[cnt]].push(train);
                            
                            cnt_2--;
                        } else {
                            var train = operation_response["operations"][operation_numbers[cnt]]["trains"][cnt_2];
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
                                    if (train["train_number"].substring(1) !== "_") {
                                        var operation_trains = operation_response["operations"][train_operations[cnt_4]]["trains"];
                                    } else {
                                        var operation_trains = operations_stopped_trains[train_operations[cnt_4]];
                                    }
                                    
                                    for (var cnt_5 = 0; cnt_5 < operation_trains.length; cnt_5++) {
                                        if (operation_trains[cnt_5]["train_number"] === train["train_number"] && operation_trains[cnt_5]["starting_station"] === train["starting_station"]) {
                                            if (operation_trains[cnt_5]["position_forward"] > train["position_forward"]) {
                                                break for_4;
                                            }
                                        }
                                    }
                                }
                                
                                line_operations_data["lines"][train["line_id"]][train_direction][train["train_number"]][cnt_3]["operation_numbers"].splice(cnt_4, 0, operation_numbers[cnt]);
                                
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
                            operation_numbers : [operation_numbers[cnt]]
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
    
    idb_start_transaction("operation_data", false, function (transaction) {
        var operation_data_store = transaction.objectStore("operation_data");
        var get_request = operation_data_store.get([railroad_id, operation_date]);
        
        get_request.onsuccess = function (evt) {
            if (evt.target.result !== undefined) {
                operation_data = evt.target.result;
                var last_modified_timestamp = operation_data["last_modified_timestamp"];
                
                if (!remote_data_only) {
                    resolve_func();
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
                        }
                        
                        resolve_func();
                    } else if (operation_data === null || remote_data_only) {
                        reject_func();
                    }
                });
            } else if (operation_data === null || remote_data_only) {
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


var selected_line;

var position_line_select_elm = document.getElementById("position_line_select");
var position_area_elm = document.getElementById("position_area");
var position_reload_button_elm = document.getElementById("position_reload_button");
var position_time_button_elm = document.getElementById("position_time_button");

function position_mode (date_str = "today", position_time_additions = null) {
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
            position_change_lines(selected_line, position_scroll_amount);
        }, function () {
            position_area_elm.innerHTML = "<div class='no_data'>表示に必要なデータが利用できません</div>";
            position_line_select_elm.style.display = "none";
        });
    });
}

function update_selected_line (line_id) {
    selected_line = line_id;
    
    var line_color = railroad_info["lines"][line_id]["line_color"];
    
    if (config["dark_mode"]) {
        line_color = convert_color_dark_mode(line_color);
    }
    
    if ("line_symbol" in railroad_info["lines"][line_id]) {
        var line_symbol = railroad_info["lines"][line_id]["line_symbol"];
    } else {
        var line_symbol = railroad_info["lines"][line_id]["line_name"].substring(0, 1);
    }
    
    var line_select_html = "<abbr style='color: " + line_color + ";''>" + line_symbol + "</abbr>" + escape_html(railroad_info["lines"][line_id]["line_name"]);
    
    position_line_select_elm.innerHTML = line_select_html;
    timetable_line_select_elm.innerHTML = line_select_html;
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
    
    update_selected_line(line_id);
    
    var buf = "";
    for (var cnt = 0; cnt <= railroad_info["lines"][line_id]["stations"].length; cnt++) {
        var border_style = "";
        var position_station_class = "";
        var connecting_lines_html = "";
        
        if (cnt >= 1){
            buf += "<tr";
            
            if ("connecting_lines" in railroad_info["lines"][line_id]["stations"][cnt - 1]) {
                var junction_class_list = [];
                
                for (var cnt_2 = 0; cnt_2 < railroad_info["lines"][line_id]["stations"][cnt - 1]["connecting_lines"].length; cnt_2++) {
                    var connecting_line_color = railroad_info["lines"][railroad_info["lines"][line_id]["stations"][cnt - 1]["connecting_lines"][cnt_2]["line_id"]]["line_color"];
                    
                    if (config["dark_mode"]) {
                        connecting_line_color = convert_color_dark_mode(connecting_line_color);
                    }
                    
                    var line_directions = railroad_info["lines"][line_id]["stations"][cnt - 1]["connecting_lines"][cnt_2]["directions"];
                    
                    for (var cnt_3 = 0; cnt_3 < line_directions.length; cnt_3++) {
                        if ((line_directions[cnt_3] === "TL" || line_directions[cnt_3] === "TR") && !("T" in junction_class_list)) {
                            junction_class_list.push("T");
                        } else if ((line_directions[cnt_3] === "L" || line_directions[cnt_3] === "R") && !("LR" in junction_class_list)) {
                            junction_class_list.push("LR");
                        } else if ((line_directions[cnt_3] === "BL" || line_directions[cnt_3] === "BR") && !("B" in junction_class_list)) {
                            junction_class_list.push("B");
                        }
                        
                        connecting_lines_html += "<a href='javascript:void(0);' class='connecting_line_" + line_directions[cnt_3] + "' onclick='position_change_lines(\"" + railroad_info["lines"][line_id]["stations"][cnt - 1]["connecting_lines"][cnt_2]["line_id"] + "\")' style='color: " + connecting_line_color + ";'><div>" + escape_html(railroad_info["lines"][railroad_info["lines"][line_id]["stations"][cnt - 1]["connecting_lines"][cnt_2]["line_id"]]["line_name"]) + "</div></a>";
                    }
                }
                
                buf += " class='";
                for (cnt_2 = 0; cnt_2 < junction_class_list.length; cnt_2++) {
                    if (cnt_2 >= 1) {
                        buf += " ";
                    }
                    
                    buf += "position_row_junction_" + junction_class_list[cnt_2];
                }
                buf += "'";
            }
            
            buf += "><th><h4";
            
            if ("is_signal_station" in railroad_info["lines"][line_id]["stations"][cnt - 1] && railroad_info["lines"][line_id]["stations"][cnt - 1]["is_signal_station"]) {
                buf += " class='position_signal_station'";
                
                border_style = " style='border-top-color: transparent;'";
                position_station_class = " position_line_signal_station";
            } else {
                buf += " onclick='show_station_timetable(\"" + line_id + "\", \"" + railroad_info["lines"][line_id]["stations"][cnt - 1]["station_name"] + "\");'";
                
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
            
            buf += "</h4>";
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
    open_square_popup("line_select_popup");
    
    if (lines === null) {
        lines = railroad_info["lines_order"];
    }
    
    var buf = "";
    for (var cnt = 0; cnt < lines.length; cnt++) {
        var line_color = railroad_info["lines"][lines[cnt]]["line_color"];
        if (config["dark_mode"]) {
            line_color = convert_color_dark_mode(line_color);
        }
        
        if ("line_symbol" in railroad_info["lines"][lines[cnt]]) {
            var line_symbol = railroad_info["lines"][lines[cnt]]["line_symbol"];
        } else {
            var line_symbol = railroad_info["lines"][lines[cnt]]["line_name"].substring(0, 1);
        }
        
        buf += "<a href='javascript:void(0);' onclick='close_square_popup(); ";
        
        if (position_mode) {
            buf += "position_change_lines(\"" + lines[cnt] + "\");";
        } else {
            buf += "timetable_change_lines(\"" + lines[cnt] + "\");";
        }
        
        buf += "'><abbr style='background-color: " + line_color + ";''>" + line_symbol + "</abbr>" + escape_html(railroad_info["lines"][lines[cnt]]["line_name"]) + "</a>";
    }
    
    document.getElementById("line_select_area").innerHTML = buf;
}

function convert_train_position_data (train_data) {
    if (train_data["train_number"].substring(0, 1) === "_") {
        train_data["train_title"] = train_data["train_number"].substring(1).split("__")[0];
    } else {
        train_data["train_title"] = train_data["train_number"].split("__")[0];
    }
    
    train_data["formation_html"] = escape_html(train_data["formation_text"]).replace(/\+/g, "<wbr>+");
    
    if (train_data["comment_exists"]) {
        train_data["formation_html"] += "*";
    }
    
    if (train_data["posts_count"] === 0) {
        if (!config["dark_mode"]) {
            var color = "#0099cc";
        } else {
            var color = "#33ccff";
        }
        
        train_data["formation_html"] = "<b style='color: " + color + ";'>" + train_data["formation_html"] + "</b>";
    } else if (train_data["variant_exists"]) {
        if (!config["dark_mode"]) {
            var color = "#cc0000";
        } else {
            var color = "#ff9999";
        }
        
        train_data["formation_html"] = "<b style='color: " + color + ";'>" + train_data["formation_html"] + "</b>";
    } else if (train_data["is_quotation"]) {
        if (!config["dark_mode"]) {
            var color = "#9966ff";
        } else {
            var color = "#cc99ff";
        }
        
        train_data["formation_html"] = "<b style='color: " + color + ";'>" + train_data["formation_html"] + "</b>";
    } else if (config["colorize_beginners_posts"] && train_data["from_beginner"]) {
        train_data["formation_html"] = "<b style='color: #33cc99;'>" + train_data["formation_html"] + "</b>";
    } else {
        train_data["formation_html"] = "<b>" + train_data["formation_html"] + "</b>";
    }
    
    return train_data;
}

function draw_train_position (hh_and_mm) {
    if (operation_data["operation_date"] === get_date_string(get_timestamp())) {
        var is_today_str = "true";
    } else {
        var is_today_str = "false";
    }
    
    var directions = ["inbound", "outbound"];
    var line_positions = [get_train_positions(line_operations["lines"][selected_line]["inbound_trains"], selected_line, hh_and_mm, true), get_train_positions(line_operations["lines"][selected_line]["outbound_trains"], selected_line, hh_and_mm, false)];
    var position_elms = [document.getElementsByClassName("position_inbound"), document.getElementsByClassName("position_outbound")];
    
    for (var direction_cnt = 0; direction_cnt <= 1; direction_cnt++) {
        for (var cnt = 0; cnt < line_positions[direction_cnt].length; cnt++) {
            if (line_positions[direction_cnt][cnt].length === 1) {
                var train = convert_train_position_data(line_positions[direction_cnt][cnt][0]);
                
                var train_color = get_train_color(train["train_title"], "#333333");
                if (config["dark_mode"]) {
                    train_color = convert_font_color_dark_mode(train_color);
                }
                
                var buf = "<div onclick='train_detail(\"" + selected_line + "\", \"" + train["train_number"] + "\", \"" + train["starting_station"] + "\", \"" + directions[direction_cnt] + "_trains\", true, " + is_today_str + ");' style='color: " + train_color + ";'><span class='train_icon_wrapper'><img src='" + get_icon(train["first_formation"]) + "' alt='' class='train_icon'";
                
                if (railroad_info["deadhead_train_number_regexp"].test(train["train_title"])) {
                    buf += " style='opacity: 0.5;'";
                    train["train_type"] = "回送";
                }
                
                buf += "></span><span class='train_type' style='background-color: " + train_color + "; border-color: " + train_color + ";'>";
                
                if (config["show_train_types_in_position_mode"]) {
                    if (train["train_type"] !== "回送" && "show_final_destinations_in_position_mode" in railroad_info["lines"][selected_line] && railroad_info["lines"][selected_line]["show_final_destinations_in_position_mode"]) {
                        buf += get_final_destination(selected_line, train["train_number"], train["starting_station"], 4);
                    } else {
                        buf += train["train_type"];
                    }
                } else {
                    buf += train["train_title"];
                }
                
                buf += "</span><br>" + train["formation_html"] + "</div>";
            } else if (line_positions[direction_cnt][cnt].length >= 2) {
                var buf = "<div class='multiple_trains'>";
                for (var cnt_2 = 0; cnt_2 < line_positions[direction_cnt][cnt].length; cnt_2++) {
                    var train = convert_train_position_data(line_positions[direction_cnt][cnt][cnt_2]);
                    
                    var train_color = get_train_color(train["train_title"], "#333333");
                    if (config["dark_mode"]) {
                        train_color = convert_font_color_dark_mode(train_color);
                    }
                    
                    buf += "<span class='train_icon_wrapper' onclick='train_detail(\"" + selected_line + "\", \"" + train["train_number"] + "\", \"" + train["starting_station"] + "\", \"" + directions[direction_cnt] + "_trains\", true, " + is_today_str + ");' style='color: " + train_color + ";'><img src='" + get_icon(train["first_formation"]) + "' alt='' class='train_icon'";
                    
                    if (railroad_info["deadhead_train_number_regexp"].test(train["train_title"])) {
                        buf += " style='opacity: 0.5;'"
                    }
                    
                    buf += "></span>";
                }
                buf += "</div>";
            } else {
                var buf = "";
            }
            
            if (direction_cnt === 0){
                position_elms[0][line_positions[direction_cnt].length - cnt].innerHTML = buf;
            } else {
                position_elms[1][cnt].innerHTML = buf;
            }
        }
    }
}

function hh_mm_to_minutes (hh_and_mm) {
    h_and_m = hh_and_mm.split(":");
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
    
    var line_positions = [];
    for (var cnt = 0; cnt < line_rows_count; cnt++) {
        line_positions.push([]);
    }
    
    if (is_inbound) {
        var train_direction = "inbound_trains";
    } else {
        var train_direction = "outbound_trains";
    }
    
    var train_numbers = Object.keys(trains);
    for (cnt = 0; cnt < train_numbers.length; cnt++) {
        if (trains[train_numbers[cnt]][0]["first_departure_time"] > hh_and_mm) {
            continue;
        }
        
        for (var cnt_2 = 0; cnt_2 < trains[train_numbers[cnt]].length; cnt_2++) {
            if (trains[train_numbers[cnt]][cnt_2]["final_arrival_time"] <= hh_and_mm){
                continue;
            }
            
            var train_type = null;
            
            if (train_numbers[cnt].substring(0, 1) !== "_" && train_numbers[cnt] in timetable["timetable"][line_id][train_direction]){
                for_3: for (var cnt_3 = 0; cnt_3 < timetable["timetable"][line_id][train_direction][train_numbers[cnt]].length; cnt_3++) {
                    if (timetable["timetable"][line_id][train_direction][train_numbers[cnt]][cnt_3]["starting_station"] === trains[train_numbers[cnt]][cnt_2]["starting_station"]) {
                        var last_stopped = null;
                        var last_stopped_time = null;
                        
                        for (var cnt_4 = 0; cnt_4 < station_list.length; cnt_4++) {
                            var departure_time = timetable["timetable"][line_id][train_direction][train_numbers[cnt]][cnt_3]["departure_times"][cnt_4];
                            
                            if (departure_time !== null) {
                                departure_time = departure_time.slice(-5);
                                
                                if (departure_time >= hh_and_mm) {
                                    if (last_stopped !== null) {
                                        var train_position = calculate_train_position(line_id, minutes_now, last_stopped, cnt_4, hh_mm_to_minutes(last_stopped_time), hh_mm_to_minutes(departure_time));
                                    } else {
                                        if ("double_station_spacing" in railroad_info["lines"][line_id] && railroad_info["lines"][line_id]["double_station_spacing"]) {
                                            var train_position = cnt_4 * 2;
                                        } else {
                                            var train_position = cnt_4;
                                        }
                                    }
                                    
                                    train_type = timetable["timetable"][line_id][train_direction][train_numbers[cnt]][cnt_3]["train_type"];
                                    
                                    break for_3;
                                }
                                
                                last_stopped = cnt_4;
                                last_stopped_time = departure_time;
                            }
                        }
                    }
                }
            }
            
            if (train_type === null) {
                train_type = "＊＊＊";
                
                if (train_numbers[cnt].substring(0, 1) === "_") {
                    var train_number = train_numbers[cnt].substring(1).split("__")[0];
                    
                    if (train_number in timetable["timetable"][line_id][train_direction]) {
                        train_type = timetable["timetable"][line_id][train_direction][train_number][0]["train_type"];
                    }
                }
                
                for (var cnt_3 = 0; cnt_3 < station_list.length; cnt_3++) {
                    if (station_list[cnt_3]["station_name"] === trains[train_numbers[cnt]][cnt_2]["starting_station"]) {
                        var starting_station_index = cnt_3;
                    }
                    if (station_list[cnt_3]["station_name"] === trains[train_numbers[cnt]][cnt_2]["terminal_station"]) {
                        var terminal_station_index = cnt_3;
                    }
                }
                
                var train_position = calculate_train_position(line_id, minutes_now, starting_station_index, terminal_station_index, hh_mm_to_minutes(trains[train_numbers[cnt]][cnt_2]["first_departure_time"]), hh_mm_to_minutes(trains[train_numbers[cnt]][cnt_2]["final_arrival_time"]));
            }
            
            if (train_position < 0 || train_position > line_rows_count) {
                break;
            }
            
            var operation_list = get_operations(line_id, train_numbers[cnt], trains[train_numbers[cnt]][cnt_2]["starting_station"], train_direction);
            
            var formation_data = convert_formation_data(line_id, operation_list, is_inbound);
            
            line_positions[train_position].push({
                train_number : train_numbers[cnt],
                train_type : train_type,
                starting_station : trains[train_numbers[cnt]][cnt_2]["starting_station"],
                first_departure_time : trains[train_numbers[cnt]][cnt_2]["first_departure_time"],
                final_arrival_time : trains[train_numbers[cnt]][cnt_2]["final_arrival_time"],
                operation_numbers : trains[train_numbers[cnt]][cnt_2]["operation_numbers"],
                formation_text : formation_data["formation_text"],
                posts_count : formation_data["posts_count"],
                variant_exists : formation_data["variant_exists"],
                comment_exists : formation_data["comment_exists"],
                from_beginner : formation_data["from_beginner"],
                is_quotation : formation_data["is_quotation"],
                first_formation : formation_data["first_formation"]
            });
            
            break;
        }
    }
    
    return line_positions;
}

function convert_formation_data (line_id, operation_list, is_inbound) {
    var first_formation = null;
    var posts_count = null;
    var variant_exists = false;
    var comment_exists = false;
    var from_beginner = false;
    var is_quotation = false;
    
    if (operation_list !== null) {
        var formation_text = "";
        
        for (var cnt = 0; cnt < operation_list.length; cnt++) {
            if (operation_list[cnt] in operation_data["operations"] && operation_data["operations"][operation_list[cnt]] !== null) {
                if (operation_data["operations"][operation_list[cnt]]["formations"] !== "") {
                    var operation_formation_text = operation_data["operations"][operation_list[cnt]]["formations"];
                } else {
                    var operation_formation_text = "運休";
                }
                
                if (railroad_info["lines"][line_id]["inbound_forward_direction"] === is_inbound) {
                    if (cnt === 0) {
                        first_formation = operation_data["operations"][operation_list[cnt]]["formations"].split("+")[0];
                    } else {
                        formation_text += "+";
                    }
                    
                    formation_text += operation_formation_text;
                } else {
                    if (cnt === 0) {
                        var formation_data = operation_data["operations"][operation_list[cnt]]["formations"].split("+");
                        
                        first_formation = formation_data[formation_data.length - 1];
                    } else {
                        formation_text = "+" + formation_text;
                    }
                    
                    formation_text = operation_formation_text + formation_text;
                }
                
                posts_count = Number(posts_count) + operation_data["operations"][operation_list[cnt]]["posts_count"];
                variant_exists = variant_exists || ("variant_exists" in operation_data["operations"][operation_list[cnt]] && operation_data["operations"][operation_list[cnt]]["variant_exists"]);
                comment_exists = comment_exists || ("comment_exists" in operation_data["operations"][operation_list[cnt]] && operation_data["operations"][operation_list[cnt]]["comment_exists"]);
                from_beginner = from_beginner || ("from_beginner" in operation_data["operations"][operation_list[cnt]] && operation_data["operations"][operation_list[cnt]]["from_beginner"]);
                is_quotation = is_quotation || ("is_quotation" in operation_data["operations"][operation_list[cnt]] && operation_data["operations"][operation_list[cnt]]["is_quotation"]);
            } else {
                if (railroad_info["lines"][line_id]["inbound_forward_direction"] === is_inbound) {
                    if (cnt === 0) {
                        formation_text += "?";
                    } else {
                        formation_text += "+?";
                    }
                } else {
                    if (cnt === 0) {
                        formation_text = "?" + formation_text;
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
        formation_text : formation_text,
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
        for(var cnt = 0; cnt < timetable["timetable"][line_id]["inbound_trains"][train_number].length; cnt++) {
            if (timetable["timetable"][line_id]["inbound_trains"][train_number][cnt]["starting_station"] === starting_station) {
                Object.assign(train_data, timetable["timetable"][line_id]["inbound_trains"][train_number][cnt]);
                train_data["is_inbound"] = true;
                
                return train_data;
            }
        }
    } else if (train_number in timetable["timetable"][line_id]["outbound_trains"]) {
        for(var cnt = 0; cnt < timetable["timetable"][line_id]["outbound_trains"][train_number].length; cnt++) {
            if (timetable["timetable"][line_id]["outbound_trains"][train_number][cnt]["starting_station"] === starting_station) {
                Object.assign(train_data, timetable["timetable"][line_id]["outbound_trains"][train_number][cnt]);
                train_data["is_inbound"] = false;
                
                return train_data;
            }
        }
    }
    
    return null;
}

function get_operations (line_id, train_number, starting_station, train_direction) {
    if (train_number in line_operations["lines"][line_id][train_direction]) {
        var trains = line_operations["lines"][line_id][train_direction][train_number];
        for (var cnt = 0; cnt < trains.length; cnt++) {
            if (trains[cnt]["starting_station"] === starting_station) {
                return [...trains[cnt]["operation_numbers"]];
            }
        }
    }
    
    return null;
}

function get_final_destination (line_id, train_number, starting_station, max_length = 10) {
    if (train_number.substring(0, 1) !== "_") {
        var next_trains = [{line_id : line_id, train_number : train_number, starting_station : starting_station}];
    } else {
        if (!(train_number in line_operations["lines"][line_id]["inbound_trains"] || train_number in line_operations["lines"][line_id]["outbound_trains"])) {
            return "＊＊＊";
        }
        
        var next_trains = [{line_id : line_id, train_number : train_number.substring(1).split("__")[0], starting_station : starting_station}];
    }
    
    var buf = "";
    
    for (var cnt = 0; cnt < next_trains.length; cnt++) {
        var train_data = get_train(next_trains[cnt]["line_id"], next_trains[cnt]["train_number"], next_trains[cnt]["starting_station"]);
        
        if (train_data !== null) {
            if (train_data["next_trains"].length >= 1) {
                next_trains.push(...train_data["next_trains"]);
            } else {
                var last_stopped_index = 0;
                
                for (var cnt_2 = 0; cnt_2 < train_data["departure_times"].length; cnt_2++) {
                    if (train_data["departure_times"][cnt_2] !== null) {
                        last_stopped_index = cnt_2;
                    }
                }
                
                if (buf.length >= 1) {
                    buf += " / ";
                }
                
                var station_list = [...railroad_info["lines"][next_trains[cnt]["line_id"]]["stations"]];
                
                if (train_data["is_inbound"]) {
                    station_list.reverse();
                }
                
                buf += escape_html(station_list[last_stopped_index]["station_name"]);
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

function get_operation_data_detail (operation_date, operation_number_or_list, area_id) {
    var area_elm = document.getElementById(area_id)
    
    if (Array.isArray(operation_number_or_list)) {
        operation_number_list = operation_number_or_list;
    } else {
        operation_number_list = [operation_number_or_list];
    }
    
    var operation_numbers_str = "";
    var buf = "";
    for (var cnt = 0; cnt < operation_number_list.length; cnt++) {
        if (cnt >= 1) {
            operation_numbers_str += ",";
        }
        
        operation_numbers_str += operation_number_list[cnt];
        buf += "<input type='checkbox' id='" + area_id + "_detail_" + add_slashes(operation_number_list[cnt]) + "'><label for='" + area_id + "_detail_" + add_slashes(operation_number_list[cnt]) + "' class='drop_down'>" + escape_html(operation_number_list[cnt]) + "運用 目撃情報</label><div class='descriptive_text'>情報を取得しています...</div>";
    }
    
    area_elm.innerHTML = buf;
    
    ajax_post("operation_data_detail.php", "railroad_id=" + escape_form_data(railroad_info["railroad_id"]) + "&date=" + operation_date + "&operation_numbers=" + escape_form_data(operation_numbers_str), function (response) {
        if (response !== false) {
            var data = JSON.parse(response);
            
            var detail_html = "";
            var operation_numbers = Object.keys(data);
            for (var cnt = 0; cnt < operation_numbers.length; cnt++) {
                detail_html += "<input type='checkbox' id='" + area_id + "_detail_" + add_slashes(operation_numbers[cnt]) + "'><label for='" + area_id + "_detail_" + add_slashes(operation_numbers[cnt]) + "' class='drop_down'>" + escape_html(operation_numbers[cnt]) + "運用 目撃情報</label><div>";
                
                for (var cnt_2 = 0; cnt_2 < data[operation_numbers[cnt]].length; cnt_2++) {
                    if (data[operation_numbers[cnt]][cnt_2]["formations"] !== "") {
                        var formation_text = data[operation_numbers[cnt]][cnt_2]["formations"];
                    } else {
                        var formation_text = "運休";
                    }
                    
                    if ("is_quotation" in data[operation_numbers[cnt]][cnt_2] && data[operation_numbers[cnt]][cnt_2]["is_quotation"]) {
                        var train_number_text = "引用情報";
                    } else {
                        var train_number_text = data[operation_numbers[cnt]][cnt_2]["train_number"];
                        
                        if (train_number_text === "○") {
                            train_number_text = "出庫時";
                        } else if (train_number_text === "△") {
                            train_number_text = "入庫時";
                        } else {
                            train_number_text = train_number_text.split("__")[0];
                            
                            if (train_number_text.substring(0, 1) === ".") {
                                train_number_text = train_number_text.substring(1) + "待機";
                            }
                        }
                    }
                    
                    if (data[operation_numbers[cnt]][cnt_2]["user_name"] !== null) {
                        var user_name_html = escape_html(data[operation_numbers[cnt]][cnt_2]["user_name"]);
                        var class_html = "";
                        
                        if (!("is_management_member" in data[operation_numbers[cnt]][cnt_2] && data[operation_numbers[cnt]][cnt_2]["is_management_member"])) {
                            user_name_html += " 様";
                            
                            if ("is_beginner" in data[operation_numbers[cnt]][cnt_2] && data[operation_numbers[cnt]][cnt_2]["is_beginner"]) {
                                class_html = " class='beginner'";
                            }
                        }
                        
                        if ("website_url" in data[operation_numbers[cnt]][cnt_2] && data[operation_numbers[cnt]][cnt_2]["website_url"] !== null) {
                            user_name_html = "<span" + class_html + "><a href='" + add_slashes(data[operation_numbers[cnt]][cnt_2]["website_url"]) + "' target='_blank' class='external_link'>" + user_name_html + " <small>(" + data[operation_numbers[cnt]][cnt_2]["user_id"] + ")</small></a>";
                        } else {
                            user_name_html = "<span" + class_html + ">" + user_name_html + " <small>(" + data[operation_numbers[cnt]][cnt_2]["user_id"] + ")</small>";
                        }
                    } else {
                        var user_name_html = "<span>(ゲスト様)";
                    }
                    
                    if ("ip_address" in data[operation_numbers[cnt]][cnt_2] && data[operation_numbers[cnt]][cnt_2]["ip_address"] !== null) {
                        var ip_address_str = ", \"" + add_slashes(data[operation_numbers[cnt]][cnt_2]["ip_address"]) + "\"";
                    } else {
                        var ip_address_str = "";
                    }
                    
                    if (user_data !== null && (data[operation_numbers[cnt]][cnt_2]["user_id"] === user_data["user_id"] || "ip_address" in data[operation_numbers[cnt]][cnt_2])) {
                        user_name_html += "<button type='button' onclick='edit_operation_data(\"" + operation_date + "\", \"" + add_slashes(operation_numbers[cnt]) + "\", \"" + add_slashes(data[operation_numbers[cnt]][cnt_2]["user_id"]) + "\", \"" + add_slashes(formation_text) + "\"" + ip_address_str + ");'>";
                        
                        if (data[operation_numbers[cnt]][cnt_2]["user_id"] === user_data["user_id"]) {
                            user_name_html += "取り消し";
                        } else {
                            user_name_html += "詳細";
                        }
                        
                        user_name_html += "</button>";
                    }
                    
                    user_name_html += "</span>";
                    
                    detail_html += "<div class='operation_data_detail'><b><small>" + train_number_text + "</small>" + formation_text + "<span>" + get_date_and_time(data[operation_numbers[cnt]][cnt_2]["posted_datetime"]) + "</span></b>";
                    
                    if ("comment" in data[operation_numbers[cnt]][cnt_2] && data[operation_numbers[cnt]][cnt_2]["comment"] !== null) {
                        detail_html += "<div class='descriptive_text'>" + escape_html(data[operation_numbers[cnt]][cnt_2]["comment"]).replace(/\n/g, "<br>") + "</div>";
                    }
                    
                    detail_html += user_name_html + "</div>";
                }
                
                if (cnt_2 === 0) {
                    detail_html += "<div class='descriptive_text'>";
                    if (operation_date === get_date_string(get_timestamp())) {
                        detail_html += "まだ目撃情報が投稿されていません";
                    } else {
                        detail_html += "当日の目撃情報はありません";
                    }
                    detail_html += "</div>";
                }
                
                detail_html += "</div>";
            }
        } else {
            detail_html = "【!】運用情報の取得に失敗しました";
        }
        
        area_elm.innerHTML = detail_html;
    });
}

var train_detail_area_elm = document.getElementById("train_detail_area");

function train_detail (line_id, train_number, starting_station, train_direction, show_operation_data = true, is_today = true) {
    open_square_popup("train_detail_popup");
    train_detail_area_elm.innerHTML = "";
    
    var previous_trains = [];
    var next_trains = [];
    
    var train_operations = get_operations(line_id, train_number, starting_station, train_direction);
    
    if (train_number.substring(0, 1) === "_") {
        train_number = train_number.substring(1).split("__")[0];
    }
    
    var train_data = [get_train(line_id, train_number, starting_station)];
    
    var buf = "<span class='train_detail_day' style='background-color: ";
    
    if (!config["dark_mode"]) {
        buf += diagram_info["diagrams"][operation_table["diagram_id"]]["main_color"];
    } else {
        buf += convert_color_dark_mode(diagram_info["diagrams"][operation_table["diagram_id"]]["main_color"]);
    }
    
    buf += ";'>";
    
    buf += diagram_info["diagrams"][operation_table["diagram_id"]]["diagram_name"];
    
    if (timetable_date === "__today__") {
        buf += "(今日)";
        
        var diagram_id_or_ts = get_timestamp();
    } else if (timetable_date === "__tomorrow__") {
        buf += "(明日)";
        
        var diagram_id_or_ts = get_timestamp() + 86400;
    } else {
        var diagram_id_or_ts = "\"" + operation_table["diagram_id"] + "\"";
    }
    
    buf += "</span>";
    buf += "<h3>";
    
    if (train_operations !== null) {
        if (railroad_info["lines"][line_id]["inbound_forward_direction"] !== (train_direction === "inbound_trains")) {
            train_operations.reverse();
        }
        
        for (var cnt = 0; cnt < train_operations.length; cnt++) {
            if (cnt >= 1) {
                buf += "+";
            }
            
            buf += "<a href='javascript:void(0);' onclick='operation_detail(\"" + train_operations[cnt] + "\",";
            if (timetable_date === "__today__" || timetable_date === "__tomorrow__") {
                buf += " " + diagram_id_or_ts + ", true";
            } else {
                buf += " \"" + operation_table["diagram_id"] + "\", false";
            }
            buf += ");'>" + train_operations[cnt] + "運用(" + operation_table["operations"][train_operations[cnt]]["car_count"] + "両)</a>";
        }
    } else {
        buf += "不明な運用";
        
        show_operation_data = false;
    }
    
    buf += "</h3>";
    
    if (show_operation_data) {
        buf += "<div class='formation_data_area'>";
        
        var heading_str = "";
        for (cnt = 0; cnt < train_operations.length; cnt++) {
            if (cnt >= 1) {
                buf += " +"
            }
            
            if (train_operations[cnt] in operation_data["operations"] && operation_data["operations"][train_operations[cnt]] !== null) {
                if (operation_data["operations"][train_operations[cnt]]["formations"] !== "") {
                    var formations_data = operation_data["operations"][train_operations[cnt]]["formations"].split("+");
                    
                    for (var cnt_2 = 0; cnt_2 < formations_data.length; cnt_2++) {
                        if (cnt_2 >= 1) {
                            buf += " +"
                        }
                        
                        if (formations_data[cnt_2] in formations["formations"]) {
                            buf += "<a href='javascript:void(0);' onclick='close_square_popup(); formation_table_mode(\"" + add_slashes(formations_data[cnt_2]) + "\");'><img src='" + get_icon(formations_data[cnt_2]) + "' alt='' class='train_icon'>" + escape_html(formations_data[cnt_2]) + "</a>";
                            
                            if ("heading" in formations["formations"][formations_data[cnt_2]]) {
                                if (heading_str.length >= 1) {
                                    heading_str += "<br>";
                                }
                                
                                heading_str += escape_html(formations_data[cnt_2] + " : " + formations["formations"][formations_data[cnt_2]]["heading"]);
                            }
                        } else if (formations_data[cnt_2] === "?") {
                            buf += "<img src='" + UNYOHUB_UNKNOWN_TRAIN_ICON + "' alt='' class='train_icon'>" + "?";
                        } else {
                            buf += "<img src='" + get_icon(formations_data[cnt_2]) + "' alt='' class='train_icon'>" + escape_html(formations_data[cnt_2]);
                        }
                    }
                } else {
                    buf += "<img src='" + UNYOHUB_CANCELED_TRAIN_ICON + "' alt='' class='train_icon'>" + "運休";
                }
            } else {
                buf += "<img src='" + UNYOHUB_UNKNOWN_TRAIN_ICON + "' alt='' class='train_icon'>" + "?";
            }
        }
        
        buf += "</div><div class='descriptive_text'>" + heading_str + "</div><div id='train_operation_detail_area'></div>";
    }
    
    if (train_data[0] !== null) {
        if (train_data[0]["previous_trains"].length >= 1) {
            previous_trains.push(...train_data[0]["previous_trains"]);
        }
        
        for (cnt = 0; cnt < previous_trains.length; cnt++) {
            train_data.unshift(get_train(previous_trains[cnt]["line_id"], previous_trains[cnt]["train_number"], previous_trains[cnt]["starting_station"]));
            
            if (train_data[0] !== null && train_data[0]["previous_trains"].length >= 1) {
                previous_trains.push(...train_data[0]["previous_trains"][0]);
            }
        }
        
        if (train_data[train_data.length - 1]["next_trains"].length >= 1) {
            next_trains.push(...train_data[train_data.length - 1]["next_trains"]);
        }
        
        for (cnt = 0; cnt < next_trains.length; cnt++) {
            train_data.push(get_train(next_trains[cnt]["line_id"], next_trains[cnt]["train_number"], next_trains[cnt]["starting_station"]));
            
            if (train_data[train_data.length - 1] !== null && train_data[train_data.length - 1]["next_trains"].length >= 1) {
                next_trains.push(...train_data[train_data.length - 1]["next_trains"]);
            }
        }
        
        if (is_today){
            var now_str = get_hh_mm();
        }
        var previous_departure_times = null;
        
        for (cnt = 0; cnt < train_data.length; cnt++) {
            if (train_data[cnt] === null) {
                continue;
            }
            
            var stations = [...railroad_info["lines"][train_data[cnt]["line_id"]]["stations"]];
            
            buf += "<h4>" + escape_html(railroad_info["lines"][train_data[cnt]["line_id"]]["line_name"]) + "　";
            
            if (train_data[cnt]["is_inbound"]) {
                buf += "上り";
            } else {
                buf += "下り";
            }
            
            var color = get_train_color(train_data[cnt]["train_number"]);
            if (config["dark_mode"]) {
                color = convert_font_color_dark_mode(color);
            }
            
            buf += "<span style='color: " + color + ";'>" + escape_html(train_data[cnt]["train_type"] + "　" + train_data[cnt]["train_number"]) + "</span>";
            
            if (train_operations !== null) {
                var train_operations_2 = get_operations(train_data[cnt]["line_id"], train_data[cnt]["train_number"], train_data[cnt]["starting_station"], train_data[cnt]["is_inbound"] ? "inbound_trains" : "outbound_trains");
                
                if (railroad_info["lines"][train_data[cnt]["line_id"]]["inbound_forward_direction"] === train_data[cnt]["is_inbound"]) {
                    var before_train_str = "◀ ";
                    var after_train_str = " 　";
                } else {
                    train_operations_2.reverse();
                    
                    var before_train_str = "　 ";
                    var after_train_str = " ▶";
                }
                
                buf += "<div class='descriptive_text'>" + before_train_str;
                
                for (var cnt_2 = 0; cnt_2 < train_operations_2.length; cnt_2++) {
                    if (cnt_2 >= 1) {
                        buf += "+";
                    }
                    
                    buf += "<a href='javascript:void(0);' onclick='operation_detail(\"" + train_operations_2[cnt_2] + "\",";
                    if (timetable_date === "__today__" || timetable_date === "__tomorrow__") {
                        buf += " " + diagram_id_or_ts + ", true";
                    } else {
                        buf += " \"" + operation_table["diagram_id"] + "\", false";
                    }
                    buf += ");'>" + train_operations_2[cnt_2] + "運用</a>";
                }
                
                buf += after_train_str + "</div>";
            }
            
            buf += "</h4>";
            
            for (cnt_2 = 0; cnt_2 < train_data[cnt]["departure_times"].length; cnt_2++) {
                if (train_data[cnt]["departure_times"][cnt_2] !== null && train_data[cnt]["departure_times"][cnt_2].substring(0, 1) !== "|") {
                    var border_color = railroad_info["lines"][train_data[cnt]["line_id"]]["line_color"];
                    
                    if (config["dark_mode"]) {
                        border_color = convert_color_dark_mode(border_color);
                    }
                    
                    if (train_data[cnt]["is_inbound"]) {
                        var station_index = stations.length - 1 - cnt_2;
                    } else {
                        var station_index = cnt_2;
                    }
                    
                    if (is_today && ((previous_departure_times !== null && previous_departure_times < now_str && train_data[cnt]["departure_times"][cnt_2] >= now_str) || train_data[cnt]["departure_times"][cnt_2] === now_str)) {
                        var highlight_str = " train_detail_departure_times_highlight";
                    } else {
                        var highlight_str = "";
                    }
                    
                    buf += "<div class='train_detail_departure_times" + highlight_str + "' style='border-color: " + border_color + ";'><u onclick='show_station_timetable(\"" + train_data[cnt]["line_id"] + "\", \"" + stations[station_index]["station_name"] + "\", " + train_data[cnt]["is_inbound"] + ");'>" + escape_html(stations[station_index]["station_name"]) + "</u><span style='float: right;'>" + train_data[cnt]["departure_times"][cnt_2] + "</span></div>";
                    
                    previous_departure_times = train_data[cnt]["departure_times"][cnt_2];
                }
            }
        }
        
        if (is_today) {
            buf += "<div class='informational_text'>現在位置は端末の現在時刻に基づく推定です</div>";
        }
    } else {
        var train_title = train_number.split("__")[0];
        
        var color = get_train_color(train_title);
        if (config["dark_mode"]) {
            color = convert_font_color_dark_mode(color);
        }
        
        buf += "<h4>" + escape_html(railroad_info["lines"][line_id]["line_name"]) + "　<span style='color: " + color + ";'>"
        if (railroad_info["deadhead_train_number_regexp"].test(train_title)) {
            buf += "回送　";
        }
        buf += escape_html(train_title) + "</span></h4>";
        buf += "<div class='no_data'>詳細情報はありません</div>";
    }
    
    if (navigator.onLine && train_operations !== null && is_today) {
        buf += "<button type='button' class='wide_button' onclick='select_operation_to_write_data(\"" + line_id + "\",\"" + add_slashes(train_number) + "\",\"" + starting_station + "\",\"" + train_direction + "\");'>運用情報を投稿</button>";
    }
    
    train_detail_area_elm.innerHTML = buf;
    
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
        timetable_mode(false);
    }
    
    if (is_inbound !== null) {
        if (is_inbound) {
            radio_outbound_elm.checked = false;
            radio_inbound_elm.checked = true;
        } else {
            radio_inbound_elm.checked = false;
            radio_outbound_elm.checked = true;
        }
    }
    
    timetable_change_lines(line_id, true);
    timetable_select_station(station_name);
}


var timetable_line_select_elm = document.getElementById("timetable_line_select");
var timetable_area_elm = document.getElementById("timetable_area");
var timetable_back_button_elm = document.getElementById("timetable_back_button");
var timetable_promise_list = [];
var timetable_selectable_lines = [];

function timetable_mode (load_data = true) {
    change_mode(1);
    
    if (load_data) {
        var ts = get_timestamp();
        var date_string = get_date_string(ts);
        
        get_diagram_id(date_string, function (diagram_id) {
            var promise_1_resolved = false;
            var promise_2_resolved = false;
            var promise_3_resolved = false;
            
            timetable_promise_list = [
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
            ];
            
            update_timetable_date(diagram_id, date_string);
            
            timetable_change_lines(selected_line, true);
        });
    } else {
        timetable_promise_list = [];
        
        update_timetable_date(operation_table["diagram_id"], operation_data["operation_date"]);
        
        timetable_change_lines(selected_line, true);
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
var direction_radio_area_elm = document.getElementById("direction_radio_area");

function timetable_change_lines(line_id, force_station_select_mode = false) {
    document.getElementById("radio_inbound_label").innerHTML = "上り<small>(" + escape_html(railroad_info["lines"][line_id]["stations"][0]["station_name"]) + "方面)</small>";
    document.getElementById("radio_outbound_label").innerHTML = "下り<small>(" + escape_html(railroad_info["lines"][line_id]["stations"][railroad_info["lines"][line_id]["stations"].length - 1]["station_name"]) + "方面)</small>";
    
    update_selected_line(line_id);
    
    if (timetable_selected_station === null || force_station_select_mode) {
        timetable_selectable_lines = railroad_info["lines_order"];
        
        timetable_selected_station = null;
        timetable_back_button_elm.style.display = "none";
        direction_radio_area_elm.style.display = "none";
        
        var station_indexes = {};
        for (var cnt = 0; cnt < railroad_info["lines"][line_id]["stations"].length; cnt++) {
            station_indexes[railroad_info["lines"][line_id]["stations"][cnt]["station_name_kana"]] = cnt;
        }
        
        var station_names = Object.keys(station_indexes).sort(new Intl.Collator("ja").compare);
        
        var kana_rows_regexp = [/^[あ-お]/, /^[か-こが-ご]/, /^[さ-そざ-ぞ]/, /^[た-とだ-ど]/, /^[な-の]/, /^[は-ほば-ぼぱ-ぽ]/, /^[ま-も]/, /^[や-よ]/, /^[ら-ろ]/, /^[わ-を]/, /.*/];
        var kana_rows = ["あ 行", "か 行", "さ 行", "た 行", "な 行", "は 行", "ま 行", "や 行", "ら 行", "わ 行", "その他"];
        
        var buf = "";
        var kana_rows_cnt = -1;
        for (cnt = 0; cnt < station_names.length; cnt++) {
            if ("is_signal_station" in railroad_info["lines"][line_id]["stations"][station_indexes[station_names[cnt]]] && railroad_info["lines"][line_id]["stations"][station_indexes[station_names[cnt]]]["is_signal_station"]) {
                continue;
            }
            
            for (var cnt_2 = Math.max(kana_rows_cnt, 0); kana_rows_regexp[cnt_2].exec(station_names[cnt]) === null; cnt_2++) {}
            if (cnt_2 > kana_rows_cnt) {
                if (kana_rows_cnt >= 0) {
                    buf += "</div>";
                }
                
                buf += "<input type='checkbox' id='timetable_kana_rows_" + cnt_2 + "'><label for='timetable_kana_rows_" + cnt_2 + "' class='drop_down'>" + kana_rows[cnt_2] + "の駅</label><div>";
                kana_rows_cnt = cnt_2;
            }
            
            buf += "<a href='javascript:void(0);' onclick='timetable_select_station(\"" + railroad_info["lines"][line_id]["stations"][station_indexes[station_names[cnt]]]["station_name"] + "\")'><b>" + escape_html(railroad_info["lines"][line_id]["stations"][station_indexes[station_names[cnt]]]["station_name"]) + "</b> <small>(" + station_names[cnt] + ")" + "</small></a>";
        }
        buf += "</div>";
        
        timetable_area_elm.innerHTML = buf;
    } else {
        timetable_select_station(timetable_selected_station);
    }
}

var radio_inbound_elm = document.getElementById("radio_inbound");
var radio_outbound_elm = document.getElementById("radio_outbound");

function timetable_select_station (station_name) {
    timetable_area_elm.innerHTML = "";
    
    timetable_selected_station = station_name;
    
    Promise.all(timetable_promise_list).then(function () {
        draw_station_timetable(station_name);
    }, function () {
        timetable_area_elm.innerHTML = "<div class='no_data'>表示に必要なデータが利用できません</div>";
    });
}

function draw_station_timetable (station_name) {
    timetable_back_button_elm.style.display = "block";
    direction_radio_area_elm.style.display = "block";
    
    for (station_index = 0; station_index < railroad_info["lines"][selected_line]["stations"].length; station_index++) {
        if (railroad_info["lines"][selected_line]["stations"][station_index]["station_name"] === station_name) {
            break;
        }
    }
    
    document.getElementById("timetable_station_name").innerText = railroad_info["lines"][selected_line]["stations"][station_index]["station_name"];
    
    if ("connecting_lines" in railroad_info["lines"][selected_line]["stations"][station_index]) {
        timetable_selectable_lines = [selected_line];
        
        for (var cnt = 0; cnt < railroad_info["lines"][selected_line]["stations"][station_index]["connecting_lines"].length; cnt++) {
            timetable_selectable_lines.push(railroad_info["lines"][selected_line]["stations"][station_index]["connecting_lines"][cnt]["line_id"]);
        }
    } else {
        timetable_selectable_lines = [selected_line];
    }
    
    if (document.getElementById("radio_inbound").checked) {
        var train_direction = "inbound_trains";
        var is_inbound = true;
        var station_index = railroad_info["lines"][selected_line]["stations"].length - 1 - station_index;
    } else {
        var train_direction = "outbound_trains";
        var is_inbound = false;
    }
    
    document.getElementById("show_arriving_trains_check").checked = config["show_arriving_trains_on_timetable"];
    document.getElementById("show_starting_trains_only_check").checked = config["show_starting_trains_only_on_timetable"];
    
    var keys = Object.keys(timetable["timetable"][selected_line][train_direction]);
    var departure_times = {};
    var starting_stations = {};
    var train_types = {};
    var is_starting_stations = {};
    var is_terminal_stations = {};
    
    for (cnt = 0; cnt < keys.length; cnt++) {
        for (var cnt_2 = 0; cnt_2 < timetable["timetable"][selected_line][train_direction][keys[cnt]].length; cnt_2++) {
            var departure_time = timetable["timetable"][selected_line][train_direction][keys[cnt]][cnt_2]["departure_times"][station_index];
            
            if (departure_time !== null && departure_time.substring(0, 1) !== "|"){
                var is_terminal_station = true;
                
                for (var cnt_3 = station_index + 1; cnt_3 < timetable["timetable"][selected_line][train_direction][keys[cnt]][cnt_2]["departure_times"].length; cnt_3++) {
                    if (timetable["timetable"][selected_line][train_direction][keys[cnt]][cnt_2]["departure_times"][cnt_3] !== null) {
                        is_terminal_station = false;
                        break;
                    }
                }
                
                if (is_terminal_station) {
                    for (cnt_3 = 0; cnt_3 < timetable["timetable"][selected_line][train_direction][keys[cnt]][cnt_2]["next_trains"].length; cnt_3++) {
                        if (timetable["timetable"][selected_line][train_direction][keys[cnt]][cnt_2]["next_trains"][cnt_3]["line_id"] === selected_line) {
                            is_terminal_station = false;
                            break;
                        }
                    }
                }
                
                if (!config["show_arriving_trains_on_timetable"] && is_terminal_station) {
                    continue;
                }
                
                if (timetable["timetable"][selected_line][train_direction][keys[cnt]][cnt_2]["previous_trains"].length == 0) {
                    var is_starting_station = true;
                    
                    for (cnt_3 = 0; cnt_3 < station_index; cnt_3++) {
                        if (timetable["timetable"][selected_line][train_direction][keys[cnt]][cnt_2]["departure_times"][cnt_3] !== null) {
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
                
                if (!(hh_and_mm[0] in departure_times)) {
                    departure_times[hh_and_mm[0]] = {};
                    starting_stations[hh_and_mm[0]] = {};
                    train_types[hh_and_mm[0]] = {};
                    is_starting_stations[hh_and_mm[0]] = {};
                    is_terminal_stations[hh_and_mm[0]] = {};
                }
                
                departure_times[hh_and_mm[0]][hh_and_mm[1]] = keys[cnt];
                starting_stations[hh_and_mm[0]][hh_and_mm[1]] = timetable["timetable"][selected_line][train_direction][keys[cnt]][cnt_2]["starting_station"];
                train_types[hh_and_mm[0]][hh_and_mm[1]] = timetable["timetable"][selected_line][train_direction][keys[cnt]][cnt_2]["train_type"];
                is_starting_stations[hh_and_mm[0]][hh_and_mm[1]] = is_starting_station;
                is_terminal_stations[hh_and_mm[0]][hh_and_mm[1]] = is_terminal_station;
            }
        }
    }
    
    keys = Object.keys(departure_times);
    keys.sort();
    
    if (timetable_date === "__today__" || timetable_date === "__tomorrow__") {
        var show_operation_data = true;
        
        if (timetable_date === "__today__") {
            var is_today = true;
        } else {
            var is_today = false;
        }
    } else {
        var show_operation_data = false;
        var is_today = false;
    }
    
    var bg_color = diagram_info["diagrams"][operation_table["diagram_id"]]["main_color"];
    
    if (config["dark_mode"]) {
        bg_color = convert_color_dark_mode(bg_color);
        
        var color_style = "";
    } else {
        var color_style = " color: #444444;";
    }
    
    var buf = "";
    for (cnt = 0; cnt < keys.length; cnt++) {
        buf += "<input type='checkbox' id='timetable_hour_" + keys[cnt] + "'><label for='timetable_hour_" + keys[cnt] + "' style='background-color: " + bg_color + ";" + color_style + "' class='drop_down'>" + Number(keys[cnt]) + "時</label><div>";
        
        var keys_2 = Object.keys(departure_times[keys[cnt]]);
        keys_2.sort();
        
        for (cnt_2 = 0; cnt_2 < keys_2.length; cnt_2++) {
            buf += "<a href='javascript:void(0);' onclick='train_detail(\"" + selected_line + "\", \"" + departure_times[keys[cnt]][keys_2[cnt_2]] + "\", \"" + starting_stations[keys[cnt]][keys_2[cnt_2]] + "\", \"" + train_direction + "\", " + show_operation_data + ", " + is_today + ");' class='timetable_train'>";
            
            var train_operations = get_operations(selected_line, departure_times[keys[cnt]][keys_2[cnt_2]], starting_stations[keys[cnt]][keys_2[cnt_2]], train_direction);
            if (show_operation_data && train_operations !== null) {
                var formation_data = convert_formation_data(selected_line, train_operations, is_inbound);
                
                buf += "<img src='" + get_icon(formation_data["first_formation"]) + "' alt='' class='train_icon'>";
            } else {
                buf += "<img src='" + UNYOHUB_GENERIC_TRAIN_ICON + "' alt='' class='train_icon'>";
            }
            
            var color = get_train_color(departure_times[keys[cnt]][keys_2[cnt_2]]);
            
            if (config["dark_mode"]) {
                color = convert_font_color_dark_mode(color);
            }
            
            buf += "<span style='color: " + color + ";'><b>" + Number(keys_2[cnt_2]);
            
            if (is_starting_stations[keys[cnt]][keys_2[cnt_2]]) {
                buf += "<small>(始)</small>";
            } else if (is_terminal_stations[keys[cnt]][keys_2[cnt_2]]) {
                buf += "(着)";
            }
            
            buf += "</b>" + escape_html(train_types[keys[cnt]][keys_2[cnt_2]]) + "</span>　";
            
            buf += get_final_destination(selected_line, departure_times[keys[cnt]][keys_2[cnt_2]], starting_stations[keys[cnt]][keys_2[cnt_2]]);
            
            if (show_operation_data) {
                buf += "　<small>";
                if (train_operations !== null) {
                    var car_count = 0;
                    for (cnt_3 = 0; cnt_3 < train_operations.length; cnt_3++) {
                        car_count += operation_table["operations"][train_operations[cnt_3]]["car_count"];
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
                        if (!config["dark_mode"]) {
                            var color = "#0099cc";
                        } else {
                            var color = "#33ccff";
                        }
                        
                        buf += "<span style='color: " + color + ";'>" + escape_html(formation_data["formation_text"]) + "</span>";
                    } else if (formation_data["variant_exists"]) {
                        if (!config["dark_mode"]) {
                            var color = "#cc0000";
                        } else {
                            var color = "#ff9999";
                        }
                        
                        buf += "<span style='color: " + color + ";'>" + escape_html(formation_data["formation_text"]) + "</span>";
                    } else if (formation_data["is_quotation"]) {
                        if (!config["dark_mode"]) {
                            var color = "#9966ff";
                        } else {
                            var color = "#cc99ff";
                        }
                        
                        buf += "<span style='color: " + color + ";'>" + escape_html(formation_data["formation_text"]) + "</span>";
                    } else if (config["colorize_beginners_posts"] && formation_data["from_beginner"]) {
                        buf += "<span style='color: #33cc99;'>" + escape_html(formation_data["formation_text"]) + "</span>";
                    } else {
                        buf += escape_html(formation_data["formation_text"]);
                    }
                }
            } else if (train_operations !== null) {
                buf += "<br>";
                
                if (railroad_info["lines"][selected_line]["inbound_forward_direction"] !== (train_direction === "inbound_trains")) {
                    train_operations.reverse();
                }
                
                for (cnt_3 = 0; cnt_3 < train_operations.length; cnt_3++) {
                    if (cnt_3 >= 1) {
                        buf += "+";
                    }
                    
                    buf += train_operations[cnt_3] + "運用<small>(" + operation_table["operations"][train_operations[cnt_3]]["operation_group_name"] + " " + operation_table["operations"][train_operations[cnt_3]]["car_count"] + "両)</small>";
                }
            } else {
                buf += "<br>不明な運用";
            }
            
            buf += "</a>";
        }
        
        buf += "</div>"
    }
    
    if (buf.length !== 0) {
        timetable_area_elm.innerHTML = buf;
    } else {
        timetable_area_elm.innerHTML = "<div class='no_data'>条件に合う列車は登録されていません</div>";
    }
    
    article_elms[1].scrollTop = 0;
}

function timetable_select_neighboring_station (move_count) {
    var station_list = railroad_info["lines"][selected_line]["stations"];
    
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
    config["show_arriving_trains_on_timetable"] = bool_val;
    
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
            load_timetable_diagram(diagram_id, date_string);
        });
    } else {
        load_timetable_diagram(operation_table_name, null);
    }
}

function load_timetable_diagram (diagram_id, date_string) {
    var promise_1_resolved = false;
    var promise_2_resolved = false;
    var promise_3_resolved = false;
    
    timetable_promise_list = [
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
        timetable_promise_list.push(new Promise(function (resolve, reject) {
            update_operation_data(function () {
                if (!promise_3_resolved) {
                    promise_3_resolved = true;
                    resolve();
                }
            }, reject, false, date_string);
        }));
    }
    
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
    open_square_popup("diagram_list_popup");
    
    document.getElementById("diagram_list_heading").innerText = diagram_info["diagram_revision"] + "改正ダイヤ";
    
    var diagram_list = timetable_get_diagram_list();
    
    get_diagram_id(get_date_string(get_timestamp()), function (today_diagram_id) {
        get_diagram_id(get_date_string(get_timestamp() + 86400), function (tomorrow_diagram_id) {
            var buf = "";
            for (var cnt = 0; cnt < diagram_list.length; cnt++) {
                if (diagram_list[cnt] === "__today__") {
                    var diagram_name = "今日<small>(" + escape_html(diagram_info["diagrams"][today_diagram_id]["diagram_name"]) + ")</small>";
                    var bg_color = diagram_info["diagrams"][today_diagram_id]["main_color"];
                } else if (diagram_list[cnt] === "__tomorrow__") {
                    var diagram_name = "明日<small>(" + escape_html(diagram_info["diagrams"][tomorrow_diagram_id]["diagram_name"]) + ")</small>";
                    var bg_color = diagram_info["diagrams"][tomorrow_diagram_id]["main_color"];
                } else {
                    var diagram_name = escape_html(diagram_info["diagrams"][diagram_list[cnt]]["diagram_name"]);
                    var bg_color = diagram_info["diagrams"][diagram_list[cnt]]["main_color"];
                }
                
                if (config["dark_mode"]) {
                    bg_color = convert_color_dark_mode(bg_color);
                }
                
                buf += "<a type='button' class='wide_button' onclick='close_square_popup(); timetable_change_diagram(\"" + diagram_list[cnt] + "\");' style='background-color: " + bg_color + "; border-color: " + bg_color + ";'>" + diagram_name + "</a>";
            }
            
            buf += "<div class='descriptive_text'>ダイヤ情報更新日時: " + get_date_and_time(diagram_info["last_modified_timestamp"]) + "</div>";
            
            document.getElementById("diagram_list_area").innerHTML = buf;
        });
    });
}


var operation_data_heading_elm = document.getElementById("operation_data_heading");
var operation_data_area_elm = document.getElementById("operation_data_area");
var operation_date_button_elm = document.getElementById("operation_date_button");

var operation_all_data_loaded = false;

function operation_data_mode () {
    change_mode(2);
    
    operation_date_button_elm.max = get_date_string(get_timestamp() + 86400);
    
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
    
    if (operation_data_date > ts + 86400) {
        operation_data_date = ts + 86400;
        
        mes("2日以上先の運用情報は表示できません");
    }
    
    operation_data_heading_elm.innerText = "";
    operation_data_area_elm.innerHTML = "";
    
    var date_string = get_date_string(operation_data_date);
    operation_date_button_elm.value = date_string;
    
    operation_all_data_loaded = false;
    
    get_diagram_id(date_string, function (diagram_id) {
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
    
    for_1: for (var cnt = 0; cnt < station_names.length; cnt++) {
        var station_name = station_names[cnt];
        
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
    
    station_names_tmp_keys.sort();
    
    for (cnt = 0; cnt < station_names_tmp_keys.length; cnt++) {
        station_names_sorted.push(station_names_tmp[station_names_tmp_keys[cnt]]);
    }
    
    station_names_sorted.push(...station_names_tmp_2);
    
    return station_names_sorted;
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
    if (days_before === 0) {
        buf_h2 += "(今日)";
    } else if (days_before === -1) {
        buf_h2 += "(明日)";
    } else if (days_before === 1) {
        buf_h2 += "(昨日)";
    } else {
        show_write_operation_data_button = "false";
        
        if (days_before === 2) {
            buf_h2 += "(一昨日)";
        } else {
            buf_h2 += "(" + days_before + "日前)";
        }
    }
    
    operation_data_heading_elm.innerText = buf_h2;
    
    if (document.getElementById("radio_operation_groups").checked) {
        var groups = operation_table["operation_groups"];
    } else {
        var groups = [];
        
        var operation_numbers = [];
        for (var cnt = 0; cnt < operation_table["operation_groups"].length; cnt++) {
            operation_numbers.push(...operation_table["operation_groups"][cnt]["operation_numbers"]);
        }
        
        if (document.getElementById("radio_series").checked) {
            var groups_tmp = {"運休" : [], "不明" : []};
            for (cnt = 0; cnt < formations["series_names"].length; cnt++) {
                groups_tmp[formations["series_names"][cnt]] = [];
            }
            
            for (cnt = 0; cnt < operation_numbers.length; cnt++) {
                if (operation_numbers[cnt] in operation_data["operations"] && operation_data["operations"][operation_numbers[cnt]] !== null) {
                    if (operation_data["operations"][operation_numbers[cnt]]["formations"] === "") {
                        groups_tmp["運休"].push(operation_numbers[cnt]);
                        continue;
                    }
                    
                    var formation_list = operation_data["operations"][operation_numbers[cnt]]["formations"].split("+");
                    
                    var series_list = [];
                    for (var cnt_2 = 0; cnt_2 < formation_list.length; cnt_2++) {
                        if (formation_list[cnt_2] in formations["formations"]) {
                            series_list.push(formations["formations"][formation_list[cnt_2]]["series_name"]);
                            continue;
                        }
                        
                        var series_names_index = formations["series_names"].indexOf(formation_list[cnt_2]);
                        
                        if (series_names_index !== -1) {
                            series_list.push(formations["series_names"][series_names_index]);
                            continue;
                        }
                        
                        series_list.push("不明");
                    }
                    
                    series_list = Array.from(new Set(series_list));
                    
                    for (var cnt_2 = 0; cnt_2 < series_list.length; cnt_2++) {
                        groups_tmp[series_list[cnt_2]].push(operation_numbers[cnt]);
                    }
                } else {
                    groups_tmp["不明"].push(operation_numbers[cnt]);
                }
            }
            
            for (cnt = 0; cnt < formations["series_names"].length; cnt++) {
                if (groups_tmp[formations["series_names"][cnt]].length >= 1) {
                    groups.push({operation_group_name: formations["series_names"][cnt], operation_numbers:groups_tmp[formations["series_names"][cnt]]});
                }
            }
            
            if (groups_tmp["運休"].length >= 1) {
                groups.push({operation_group_name: "運休", operation_numbers:groups_tmp["運休"]});
            }
            
            if (groups_tmp["不明"].length >= 1) {
                groups.push({operation_group_name: "不明", operation_numbers:groups_tmp["不明"]});
            }
        } else {
            if (document.getElementById("radio_starting_location").checked) {
                var location_str = "starting_location";
            } else {
                var location_str = "terminal_location";
            }
            
            var operations_list = {};
            var locations = [];
            
            for (cnt = 0; cnt < operation_numbers.length; cnt++) {
                if (!locations.includes(operation_table["operations"][operation_numbers[cnt]][location_str])) {
                    locations.push(operation_table["operations"][operation_numbers[cnt]][location_str]);
                    operations_list[operation_table["operations"][operation_numbers[cnt]][location_str]] = [];
                }
                
                operations_list[operation_table["operations"][operation_numbers[cnt]][location_str]].push(operation_numbers[cnt]);
            }
            
            locations = sort_station_names(locations);
            
            for (cnt = 0; cnt < locations.length; cnt++) {
                groups[cnt] = {operation_group_name: locations[cnt], operation_numbers: operations_list[locations[cnt]]};
            }
        }
    }
    
    var buf = "";
    
    for (var cnt = 0; cnt < groups.length; cnt++) {
        buf += "<h3>" + groups[cnt]["operation_group_name"] + "</h3>";
        
        buf += "<table>";
        for (var cnt_2 = 0; cnt_2 < groups[cnt]["operation_numbers"].length; cnt_2++) {
            var operation_number = groups[cnt]["operation_numbers"][cnt_2];
            
            if (!config["dark_mode"]) {
                var bg_color = operation_table["operations"][operation_number]["main_color"];
            } else {
                var bg_color = convert_color_dark_mode(operation_table["operations"][operation_number]["main_color"]);
            }
            
            buf += "<tr onclick='operation_detail(\"" + operation_number + "\", " + operation_data_date + ", " + show_write_operation_data_button + ");'><th style='background-color: " + bg_color + ";'><u>" + operation_number + "</u><small>(" + operation_table["operations"][operation_number]["car_count"] + ")</th>";
            
            if (days_before >= 1 || (days_before === 0 && operation_table["operations"][operation_number]["ending_time"] < now_str)) {
                buf += "<td class='after_operation'";
            } else if (days_before <= -1 || operation_table["operations"][operation_number]["starting_time"] > now_str) {
                buf += "<td class='before_operation'";
            } else {
                buf += "<td";
            }
            
            if (operation_number in operation_data["operations"] && operation_data["operations"][operation_number] !== null) {
                if (operation_data["operations"][operation_number]["posts_count"] === 0) {
                    if (!config["dark_mode"]) {
                        var color = "#0099cc";
                    } else {
                        var color = "#33ccff";
                    }
                    
                    buf += " style='color: " + color + ";'>";
                } else if ("variant_exists" in operation_data["operations"][operation_number] && operation_data["operations"][operation_number]["variant_exists"]) {
                    if (!config["dark_mode"]) {
                        var color = "#cc0000";
                    } else {
                        var color = "#ff9999";
                    }
                    
                    buf += " style='color: " + color + ";'>";
                } else if ("is_quotation" in operation_data["operations"][operation_number] && operation_data["operations"][operation_number]["is_quotation"]) {
                    if (!config["dark_mode"]) {
                        var color = "#9966ff";
                    } else {
                        var color = "#cc99ff";
                    }
                    
                    buf += " style='color: " + color + ";'>";
                } else if (config["colorize_beginners_posts"] && "from_beginner" in operation_data["operations"][operation_number] && operation_data["operations"][operation_number]["from_beginner"]) {
                    buf += " style='color: #33cc99;'>";
                } else {
                    buf += ">";
                }
                
                if (operation_data["operations"][operation_number]["formations"] !== "") {
                    var formation_list = operation_data["operations"][operation_number]["formations"].split("+");
                    
                    for (var cnt_3 = 0; cnt_3 < formation_list.length; cnt_3++){
                        if (cnt_3 >= 1) {
                            buf += " +";
                        }
                        
                        buf += "<img src='" + get_icon(formation_list[cnt_3]) + "' alt='' class='train_icon'>" + formation_list[cnt_3];
                    }
                } else {
                    buf += "<img src='" + UNYOHUB_CANCELED_TRAIN_ICON + "' alt='' class='train_icon'>運休";
                }
                
                if ("comment_exists" in operation_data["operations"][operation_number] && operation_data["operations"][operation_number]["comment_exists"]) {
                    buf += "*";
                }
                
                buf += "</td>";
            } else {
                buf += "><img src='" + UNYOHUB_UNKNOWN_TRAIN_ICON + "' alt='' class='train_icon'>?</td>";
            }
            buf += "</tr>";
        }
        buf += "</table>";
    }
    
    buf += "<br><div class='informational_text'>最新の投稿: " + get_date_and_time(operation_data["last_modified_timestamp"]) + "</div>";
    
    operation_data_area_elm.innerHTML = buf;
}

var operation_detail_area_elm = document.getElementById("operation_detail_area");
var operation_detail_write_button_enabled = false;

function operation_detail (operation_number, operation_data_date_ts_or_diagram_id, show_write_operation_data_button = null, formation_text = null) {
    open_popup("operation_detail_popup");
    
    operation_detail_area_elm.innerHTML = "";
    operation_detail_area_elm.scrollTop = 0;
    
    if (show_write_operation_data_button !== null) {
        operation_detail_write_button_enabled = show_write_operation_data_button;
    }
    
    if (typeof operation_data_date_ts_or_diagram_id !== "string") {
        get_diagram_id(get_date_string(operation_data_date_ts_or_diagram_id), function (diagram_id) {
            if (diagram_id !== operation_table["diagram_id"] || diagram_id !== line_operations["diagram_id"] || diagram_info["diagrams"][diagram_id]["timetable_id"] !== timetable["timetable_id"]) {
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
    
    var buf = "<h2 style='background-color: " + bg_color + ";" + color_style + "'><button type='button' class='previous_button' onclick='previous_operation_number(\"" + operation_number + "\", " + diagram_id_or_ts + ");'></button>" + operation_number + "運用<small>" + operation_table["operations"][operation_number]["operation_group_name"] + " (" + operation_table["operations"][operation_number]["car_count"] + "両)</small><button type='button' class='next_button' onclick='next_operation_number(\"" + operation_number + "\", " + diagram_id_or_ts + ");'></button></h2>";
    
    if (formation_text !== null || operation_data_date_ts !== null) {
        buf += "<div class='formation_data_area'>";
        
        if (formation_text === null && operation_number in operation_data["operations"] && operation_data["operations"][operation_number] !== null) {
            formation_text = operation_data["operations"][operation_number]["formations"];
        }
        
        var heading_str = "";
        if (formation_text !== null) {
            if (formation_text !== "") {
                var formations_data = formation_text.split("+");
                
                for (var cnt_2 = 0; cnt_2 < formations_data.length; cnt_2++) {
                    if (cnt_2 >= 1) {
                        buf += " +"
                    }
                    
                    if (formations_data[cnt_2] in formations["formations"]) {
                        buf += "<a href='javascript:void(0);' onclick='popup_close(); formation_table_mode(\"" + add_slashes(formations_data[cnt_2]) + "\");'><img src='" + get_icon(formations_data[cnt_2]) + "' alt='' class='train_icon'>" + escape_html(formations_data[cnt_2]) + "</a>";
                        
                        if ("heading" in formations["formations"][formations_data[cnt_2]]) {
                            if (heading_str.length >= 1) {
                                heading_str += "<br>";
                            }
                            
                            heading_str += escape_html(formations_data[cnt_2] + " : " + formations["formations"][formations_data[cnt_2]]["heading"]);
                        }
                    } else if (formations_data[cnt_2] === "?") {
                        buf += "<img src='" + UNYOHUB_UNKNOWN_TRAIN_ICON + "' alt='' class='train_icon'>" + "?";
                    } else {
                        buf += "<img src='" + get_icon(formations_data[cnt_2]) + "' alt='' class='train_icon'>" + escape_html(formations_data[cnt_2]);
                    }
                }
            } else {
                buf += "<img src='" + UNYOHUB_CANCELED_TRAIN_ICON + "' alt='' class='train_icon'>" + "運休";
            }
        } else {
            buf += "<img src='" + UNYOHUB_UNKNOWN_TRAIN_ICON + "' alt='' class='train_icon'>" + "?";
        }
        
        buf += "</div><div class='descriptive_text'>" + heading_str + "</div><div id='operation_data_detail_area'></div>";
    }
    
    var checked_strs = [" checked='checked'", ""];
    if (config["simplify_operation_details"]) {
        checked_strs.reverse()
    }
    buf += "<div><input type='radio' name='switch_simplify_operation_details' id='simplify_operation_details' onchange='change_simplify_operation_details(!this.checked, \"" + add_slashes(operation_number) + "\", " + diagram_id_or_ts + ", " + is_today + ");'" + checked_strs[0] + "><label for='simplify_operation_details'>詳細表示</label><input type='radio'  name='switch_simplify_operation_details' id='not_simplify_operation_details' onchange='change_simplify_operation_details(this.checked, \"" + add_slashes(operation_number) + "\", " + diagram_id_or_ts + ", " + is_today + ");'" + checked_strs[1] + "><label for='not_simplify_operation_details'>簡略表示</label></div>";
    
    if (operation_table["operations"][operation_number]["comment"] !== null) {
        buf += "<div class='descriptive_text'>" + escape_html(operation_table["operations"][operation_number]["comment"]) + "</div>";
    }
    
    buf += "<div id='operation_trains_area'></div>";
    
    if (navigator.onLine && operation_detail_write_button_enabled) {
        buf += "<button type='button' class='wide_button' onclick='write_operation_data(\"" + operation_data_date_str + "\", \"" + operation_number + "\");'>運用情報を投稿</button>";
    }
    
    operation_detail_area_elm.innerHTML = buf;
    
    draw_operation_trains(operation_number, diagram_id_or_ts, is_today);
    
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
    var buf 
    = "<div class='" + train_div_class_name + "'><b class='train_overview_location'>" + operation_table["operations"][operation_number]["starting_location"];
    if (operation_table["operations"][operation_number]["starting_track"] !== null) {
        buf += "<small>(" + operation_table["operations"][operation_number]["starting_track"] + ")</small>";
    }
    buf += " 出庫</b><time>" + operation_table["operations"][operation_number]["starting_time"] + "</time></div>";
    
    if (is_today){
        var now_str = get_hh_mm();
    }
    
    var trains = operation_table["operations"][operation_number]["trains"];
    var next_train_operation_list = null;
    var starting_station = null;
    var highlight_str = "";
    for (var cnt = 0; cnt < trains.length; cnt++) {
        if (trains[cnt]["train_number"].substring(0, 1) === ".") {
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
                    var station_list_1 = railroad_info["lines"][trains[cnt]["line_id"]]["stations"];
                    for (var cnt_2 = 0; cnt_2 < station_list_1.length; cnt_2++) {
                        if (station_list_1[cnt_2]["station_name"] === trains[cnt]["starting_station"]) {
                            starting_station = station_list_1[cnt_2]["station_initial"];
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
            
            if (!config["dark_mode"]) {
                var color = get_train_color(trains[cnt]["train_number"]);
            } else {
                var color = convert_font_color_dark_mode(get_train_color(trains[cnt]["train_number"]));
            }
            
            buf += "<div class='" + train_div_class_name + "'>";
            
            buf += "<a href='javascript:void(0);' onclick='train_detail(\"" + trains[cnt]["line_id"] + "\", \"" + trains[cnt]["train_number"] + "\", \"" + trains[cnt]["starting_station"] + "\", \"" + trains[cnt]["direction"] + "_trains\", false, " + is_today + ");'><b style='color: " + color + ";'><u>";
            
            if (trains[cnt]["train_number"] in timetable["timetable"][trains[cnt]["line_id"]][trains[cnt]["direction"] + "_trains"]) {
                for (var cnt_2 = 0; cnt_2 < timetable["timetable"][trains[cnt]["line_id"]][trains[cnt]["direction"] + "_trains"][trains[cnt]["train_number"]].length; cnt_2++) {
                    if (timetable["timetable"][trains[cnt]["line_id"]][trains[cnt]["direction"] + "_trains"][trains[cnt]["train_number"]][cnt_2]["starting_station"] === trains[cnt]["starting_station"]) {
                        var train_type = timetable["timetable"][trains[cnt]["line_id"]][trains[cnt]["direction"] + "_trains"][trains[cnt]["train_number"]][cnt_2]["train_type"];
                        
                        if (config["simplify_operation_details"]) {
                            buf += train_type.substring(0, 1) + " ";
                        } else {
                            buf += train_type + "　";
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
            
            buf += "</u><small>(" + trains[cnt]["position_forward"] + "-" + trains[cnt]["position_rear"];
            if (!config["simplify_operation_details"]) {
                buf += "両目";
            }
            buf += ")</small></b>";
            
            if (is_today && trains[cnt]["final_arrival_time"] < now_str) {
                highlight_str = "";
            }
            
            if (config["simplify_operation_details"]) {
                var station_list_2 = railroad_info["lines"][trains[cnt]["line_id"]]["stations"];
                for (var cnt_2 = 0; cnt_2 < station_list_2.length; cnt_2++) {
                    if (station_list_2[cnt_2]["station_name"] === trains[cnt]["terminal_station"]) {
                        var terminal_station = station_list_2[cnt_2]["station_initial"];
                        break;
                    }
                }
            } else {
                var terminal_station = trains[cnt]["terminal_station"];
            }
            
            buf += "<div" + highlight_str + "><span>" + starting_station + " " + first_departure_time + "</span><span>→</span><span>" + trains[cnt]["final_arrival_time"] + " " + terminal_station + "</span></div></a>";
            
            if (!config["simplify_operation_details"] && operations_list.length >= 1) {
                buf += "<div class='coupling_info'>併結:";
                for (var cnt_2 = 0; cnt_2 < operations_list.length; cnt_2++) {
                    buf += " <a href='javascript:void(0);' onclick='operation_detail(\"" + operations_list[cnt_2] + "\", " + diagram_id_or_ts + ");'>" + operations_list[cnt_2] + "運用</a>";
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


var formation_table_wrapper_elm = document.getElementById("formation_table_wrapper");
var formation_search_area_elm = document.getElementById("formation_search_area");
var car_number_search_elm = document.getElementById("car_number_search");
var formation_table_area_elm = document.getElementById("formation_table_area");
var formation_screenshot_button_elm = document.getElementById("formation_screenshot_button");
var formation_back_button_elm = document.getElementById("formation_back_button");

var selected_formation_name = null;

var formation_table_drop_down_status;
var formation_table_wrapper_scroll_amount;

function formation_table_mode (formation_name = null) {
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
        formation_table_wrapper_scroll_amount = formation_table_wrapper_elm.scrollTop;
    }
}

function draw_formation_table () {
    formation_screenshot_button_elm.style.display = "none";
    formation_back_button_elm.style.display = "none";
    
    var buf = ""
    for (var cnt = 0; cnt < formations["series_names"].length; cnt++) {
        var buf_2 = "";
        var search_hit_formation_count = 0;
        for (var cnt_2 = 0; cnt_2 < formations["series"][formations["series_names"][cnt]]["formation_names"].length; cnt_2++){
            var formation_name = formations["series"][formations["series_names"][cnt]]["formation_names"][cnt_2];
            
            var buf_3 = "<tr onclick='formation_detail(\"" + add_slashes(formation_name) + "\");'><th><img src='" + get_icon(formation_name) + "' alt='' class='train_icon'></th>";
            
            buf_3 += "<td><h5><b>" + escape_html(formation_name) + "</b>";
            if ("heading" in formations["formations"][formation_name]) {
                buf_3 += escape_html(formations["formations"][formation_name]["heading"]);
            }
            buf_3 += "</h5>";
            
            var search_hit_count = 0;
            for (var cnt_3 = 0; cnt_3 < formations["formations"][formation_name]["cars"].length; cnt_3++) {
                var car_class = "";
                
                if (car_number_search_elm.value.length >= 1) {
                    if (formations["formations"][formation_name]["cars"][cnt_3]["car_number"].includes(car_number_search_elm.value) || formations["formations"][formation_name]["cars"][cnt_3]["abbr_number"].includes(car_number_search_elm.value)) {
                        car_class =  "car_highlight";
                        
                        search_hit_count++;
                    }
                } else {
                    search_hit_count = 1;
                }
                
                if ("equipment" in formations["formations"][formation_name]["cars"][cnt_3]) {
                    for (var cnt_4 = 0; cnt_4 < formations["formations"][formation_name]["cars"][cnt_3]["equipment"].length; cnt_4++) {
                        if (car_class.length >= 1) {
                            car_class += " ";
                        }
                        
                        car_class += "car_" + formations["formations"][formation_name]["cars"][cnt_3]["equipment"][cnt_4];
                    }
                }
                
                if (formation_styles_available && config["colorize_formation_table"] && "coloring_id" in formations["formations"][formation_name]["cars"][cnt_3]) {
                    if (car_class.length >= 1) {
                        car_class += " ";
                    }
                    
                    car_class += "car_coloring_" + formations["formations"][formation_name]["cars"][cnt_3]["coloring_id"];
                }
                
                buf_3 += "<div class='" + car_class + "'>" + escape_html(formations["formations"][formation_name]["cars"][cnt_3]["abbr_number"]) + "<span></span><span></span></div>";
            }
            
            buf_3 += "</td></tr>";
            
            if (search_hit_count >= 1) {
                buf_2 += buf_3;
                search_hit_formation_count++;
            }
        }
        
        if (search_hit_formation_count >= 1) {
            var checkbox_id = "series_" + formations["series_names"][cnt];
            
            buf += "<input type='checkbox' id='" + checkbox_id + "'";
            
            if (checkbox_id in formation_table_drop_down_status && formation_table_drop_down_status[checkbox_id]) {
                buf += " checked='checked'";
            }
            
            buf += " onclick='update_formation_table_drop_down_status(this);'><label for='" + checkbox_id + "' class='drop_down'>" + escape_html(formations["series_names"][cnt]);
            if (car_number_search_elm.value.length >= 1) {
                buf += " (" + search_hit_formation_count + "編成該当)";
            }
            buf += "</label>";
            buf += "<div><table class='formation_table'>" + buf_2 + "</table></div>";
        }
    }
    
    if (buf.length !== 0) {
        buf += "<div class='informational_text'>";
        buf += "編成表更新日時: " + get_date_and_time(formations["last_modified_timestamp"]) + "<br>";
        buf += "車両アイコン更新日時: " + get_date_and_time(train_icons["last_modified_timestamp"]);
        buf += "</div>";
        
        formation_table_area_elm.innerHTML = buf;
    } else {
        formation_table_area_elm.innerHTML = "<div class='no_data'>検索キーワードを含む車両が見つかりません</div>";
    }
    
    formation_search_area_elm.style.display = "block";
    selected_formation_name = null;
    
    formation_table_wrapper_elm.scrollTop = formation_table_wrapper_scroll_amount;
}

function change_colorize_formation_table (bool_val) {
    config["colorize_formation_table"] = bool_val;
    
    save_config();
    
    draw_formation_table();
}

function update_formation_table_drop_down_status (elm) {
    formation_table_drop_down_status[elm.id] = elm.checked;
}

function formation_detail (formation_name) {
    formation_search_area_elm.style.display = "none";
    formation_table_area_elm.innerHTML = "";
    
    selected_formation_name = formation_name;
    
    formation_screenshot_button_elm.style.display = "block";
    formation_back_button_elm.style.display = "block";
    
    var buf = "<h2><button type='button' class='previous_button' onclick='previous_formation(\"" + add_slashes(formation_name) + "\");'></button>" + escape_html(formation_name) + "<button type='button' class='next_button' onclick='next_formation(\"" + add_slashes(formation_name) + "\");'></button></h2>";
    
    buf += "<img src='" + get_icon(formation_name) + "' alt='' class='train_icon_large'>";
    
    buf += "<div class='key_and_value'><b>車両形式</b>" + formations["formations"][formation_name]["series_name"] + "</div>";
    buf += "<div class='descriptive_text' id='formation_description'></div>";
    
    buf += "<input type='checkbox' id='formation_operations'><label for='formation_operations' class='drop_down'>運用情報</label><div id='formation_operations_area'><div class='descriptive_text'>情報の取得を待機しています</div></div>";
    
    buf += "<h3>検査情報</h3>";
    buf += "<div class='descriptive_text' id='inspection_information'>情報がありません</div>"
    
    buf += "<h3>車両情報</h3>";
    buf += "<table class='car_info'>";
    for (var cnt = 0; cnt < formations["formations"][formation_name]["cars"].length; cnt++) {
        var car_class = "";
        if ("equipment" in formations["formations"][formation_name]["cars"][cnt]) {
            for (var cnt_2 = 0; cnt_2 < formations["formations"][formation_name]["cars"][cnt]["equipment"].length; cnt_2++) {
                if (car_class.length >= 1) {
                    car_class += " ";
                }
                
                car_class += "car_info_car_" + formations["formations"][formation_name]["cars"][cnt]["equipment"][cnt_2];
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
    buf += "</table>"
    
    formation_table_area_elm.innerHTML = buf;
    formation_table_wrapper_elm.scrollTop = 0;
    
    if (navigator.onLine) {
        ajax_post("formation_details.php", "railroad_id=" + escape_form_data(railroad_info["railroad_id"]) + "&formation_name=" + escape_form_data(formation_name), function (response) {
            if (response !== false) {
                var data = JSON.parse(response);
                
                document.getElementById("formation_description").innerText = data["description"];
                
                if (data["inspection_information"] !== "") {
                    document.getElementById("inspection_information").innerText = data["inspection_information"];
                }
                
                for (var cnt = 0; cnt < data["cars"].length; cnt++) {
                    document.getElementById("car_info_" + cnt).innerText = data["cars"][cnt]["manufacturer"] + " " + data["cars"][cnt]["constructed"];
                    document.getElementById("car_description_" + cnt).innerText = data["cars"][cnt]["description"];
                }
                
                if (data["operations_today"] !== null || data["operations_tomorrow"] !== null) {
                    var buf = "<div class='formation_operation_data'><h4>今日の運用情報</h4>";
                    if (data["operations_today"] !== null) {
                        for (cnt = 0; cnt < data["operations_today"].length; cnt++) {
                            buf += "<div class='key_and_value' onclick='operation_detail(\"" + add_slashes(data["operations_today"][cnt]["operation_number"]) + "\", " + get_timestamp() + ", false, \"" + add_slashes(data["operations_today"][cnt]["formations"]) + "\");'><u>" + escape_html(data["operations_today"][cnt]["operation_number"]) + "</u>" + data["operations_today"][cnt]["formations"] + "</div>";
                        }
                    } else {
                        buf += "<div class='descriptive_text'>情報がありません</div>";
                    }
                    buf += "</div>";
                    
                    buf += "<div class='formation_operation_data'><h4>明日の運用情報</h4>";
                    if (data["operations_tomorrow"] !== null) {
                        for (cnt = 0; cnt < data["operations_tomorrow"].length; cnt++) {
                            buf += "<div class='key_and_value' onclick='operation_detail(\"" + add_slashes(data["operations_tomorrow"][cnt]["operation_number"]) + "\", " + (get_timestamp() + 86400) + ", false, \"" + add_slashes(data["operations_tomorrow"][cnt]["formations"]) + "\");'><u>" + escape_html(data["operations_tomorrow"][cnt]["operation_number"]) + "</u>" + data["operations_tomorrow"][cnt]["formations"] + "</div>";
                        }
                    } else {
                        buf += "<div class='descriptive_text'>明日の運用情報は判明していません</div>";
                    }
                    buf += "</div>";
                } else if (data["last_seen_date"] !== null) {
                    var last_seen_date_splitted = data["last_seen_date"].split("-");
                    
                    var buf = "<div class='formation_operation_data_last_seen'><h4>最終目撃情報(" + last_seen_date_splitted[0] + "/" + Number(last_seen_date_splitted[1]) + "/" + Number(last_seen_date_splitted[2]) + ")</h4>";
                    
                    var dt = new Date(data["last_seen_date"] + " 12:00:00");
                    
                    for (cnt = 0; cnt < data["operations_last_day"].length; cnt++) {
                        buf += "<div class='key_and_value' onclick='operation_detail(\"" + add_slashes(data["operations_last_day"][cnt]["operation_number"]) + "\", " + Math.floor(dt.getTime() / 1000) + ", false, \"" + add_slashes(data["operations_last_day"][cnt]["formations"]) + "\");'><u>" + escape_html(data["operations_last_day"][cnt]["operation_number"]) + "</u>" + data["operations_last_day"][cnt]["formations"] + "</div>";
                    }
                    
                    buf += "</div>";
                } else {
                    var buf = "<div class='descriptive_text'>この編成の運用情報が投稿されたことはありません</div>";
                }
                
                document.getElementById("formation_operations_area").innerHTML = buf;
            }
        });
    }
}

function previous_formation (formation_name) {
    var formation_list = formations["series"][formations["formations"][formation_name]["series_name"]]["formation_names"];
    
    var formation_index = formation_list.indexOf(formation_name);
    if (formation_index >= 1) {
        formation_detail(formation_list[formation_index - 1]);
    } else {
        formation_detail(formation_list[formation_list.length - 1]);
    }
}

function next_formation (formation_name) {
    var formation_list = formations["series"][formations["formations"][formation_name]["series_name"]]["formation_names"];
    
    var formation_index = formation_list.indexOf(formation_name);
    if (formation_index < formation_list.length - 1) {
        formation_detail(formation_list[formation_index + 1]);
    } else {
        formation_detail(formation_list[0]);
    }
}


function get_icon (formation_name) {
    if (formation_name === null || formation_name === "?") {
        return UNYOHUB_UNKNOWN_TRAIN_ICON;
    }
    
    if (formation_name === "") {
        return UNYOHUB_CANCELED_TRAIN_ICON;
    }
    
    if (formation_name in formations["formations"]){
        if (formations["formations"][formation_name]["icon_id"] in train_icons["icons"]) {
            return train_icons["icons"][formations["formations"][formation_name]["icon_id"]];
        }
    } else if (formation_name in formations["series"]) {
        if (formations["series"][formation_name]["icon_id"] in train_icons["icons"]) {
            return train_icons["icons"][formations["series"][formation_name]["icon_id"]];
        }
    }
    
    return UNYOHUB_GENERIC_TRAIN_ICON;
}

function get_train_color (train_name, default_value = "inherit") {
    for (var cnt = 0; cnt < railroad_info["train_color_rules"].length; cnt++) {
        if (railroad_info["train_color_rules"][cnt]["regexp"].test(train_name)) {
            return railroad_info["train_color_rules"][cnt]["color"];
        }
    }
    
    return default_value;
}


var operation_search_area_elm = document.getElementById("operation_search_area");
var operation_table_area_elm = document.getElementById("operation_table_area");
var operation_table_info_elm = document.getElementById("operation_table_info");
var operation_table_name_elm = document.getElementById("operation_table_name");

function operation_table_mode (load_data = true, diagram_id = null) {
    change_mode(4);
    
    operation_search_area_elm.style.display = "none";
    operation_table_area_elm.innerHTML = "";
    operation_table_info_elm.innerHTML = "";
    
    if (load_data && diagram_id === null) {
        get_diagram_id(get_date_string(get_timestamp()), function (diagram_id) {
            operation_table_load_data(load_data, diagram_id);
        });
    } else {
        operation_table_load_data(load_data, diagram_id);
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
    
    operation_table_name_elm.innerText = diagram_info["diagrams"][diagram_id]["diagram_name"];
    train_number_search_elm.value = "";
    operation_table_wrapper_scroll_amount = 0;
    
    Promise.all(promise_list).then(function () {
        reset_operation_narrow_down();
    }, function () {
        operation_table_area_elm.innerHTML = "<div class='no_data'>表示に必要なデータが利用できません</div>";
    });
}

var train_number_search_elm = document.getElementById("train_number_search");
var search_group_name_elm = document.getElementById("operation_search_group_name");
var search_car_count_elm = document.getElementById("operation_search_car_count");
var search_starting_location_elm = document.getElementById("operation_search_starting_location");
var search_terminal_location_elm = document.getElementById("operation_search_terminal_location");

var operation_table_sorting_criteria = "operation_number";
var operation_table_ascending_order = true;

function operation_table_list_number () {
    operation_search_area_elm.style.display = "block";
    operation_table_area_elm.innerHTML = "";
    
    get_diagram_id(get_date_string(get_timestamp()), function (diagram_id) {
        draw_operation_table(diagram_id === operation_table["diagram_id"]);
    });
}

function draw_operation_table (is_today) {
    var search_keyword = train_number_search_elm.value;
    
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
    
    var search_filter_count_elm = document.getElementById("operation_search_filter_count");
    
    if (search_filter_count >= 1) {
        search_filter_count_elm.innerText = "(" + search_filter_count + ")";
    } else {
        search_filter_count_elm.innerText = "";
    }
    
    var operation_numbers = Object.keys(operation_table["operations"]).toSorted();
    
    if (operation_table_sorting_criteria  !== "operation_number") {
        var tmp_operation_list = {};
        
        if (operation_table_sorting_criteria === "starting_time") {
            for (var cnt = 0; cnt < operation_numbers.length; cnt++) {
                tmp_operation_list[operation_table["operations"][operation_numbers[cnt]]["starting_time"] + "_" + cnt] = operation_numbers[cnt];
            }
        } else {
            for (var cnt = 0; cnt < operation_numbers.length; cnt++) {
                tmp_operation_list[operation_table["operations"][operation_numbers[cnt]]["ending_time"] + "_" + cnt] = operation_numbers[cnt];
            }
        }
        
        var time_keys = Object.keys(tmp_operation_list).toSorted();
        
        operation_numbers = [];
        for (cnt = 0; cnt < time_keys.length; cnt++) {
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
    for (var cnt = 0; cnt < operation_numbers.length; cnt++) {
        if (!search_car_count_list.includes(operation_table["operations"][operation_numbers[cnt]]["car_count"])) {
            search_car_count_list.push(operation_table["operations"][operation_numbers[cnt]]["car_count"]);
        }
        if (!search_starting_location_list.includes(operation_table["operations"][operation_numbers[cnt]]["starting_location"])) {
            search_starting_location_list.push(operation_table["operations"][operation_numbers[cnt]]["starting_location"]);
        }
        if (!search_terminal_location_list.includes(operation_table["operations"][operation_numbers[cnt]]["terminal_location"])) {
            search_terminal_location_list.push(operation_table["operations"][operation_numbers[cnt]]["terminal_location"]);
        }
        
        if ((search_group_name !== "" && operation_table["operations"][operation_numbers[cnt]]["operation_group_name"] !== search_group_name) || (search_car_count !== "" && operation_table["operations"][operation_numbers[cnt]]["car_count"] !== Number(search_car_count)) || (search_starting_location !== "" && operation_table["operations"][operation_numbers[cnt]]["starting_location"] !== search_starting_location) || (search_terminal_location !== "" && operation_table["operations"][operation_numbers[cnt]]["terminal_location"] !== search_terminal_location)) {
            continue;
        }
        
        if (!config["dark_mode"]) {
            var color = operation_table["operations"][operation_numbers[cnt]]["main_color"];
        } else {
            var color = convert_color_dark_mode(operation_table["operations"][operation_numbers[cnt]]["main_color"]);
        }
        
        if (operation_table["operations"][operation_numbers[cnt]]["starting_track"] !== null) {
            var $starting_track_text = "<small>(" + operation_table["operations"][operation_numbers[cnt]]["starting_track"] + ")</small>";
        } else {
            var $starting_track_text = "";
        }
        
        if (operation_table["operations"][operation_numbers[cnt]]["terminal_track"] !== null) {
            var $terminal_track_text = "<small>(" + operation_table["operations"][operation_numbers[cnt]]["terminal_track"] + ")</small>";
        } else {
            var $terminal_track_text = "";
        }
        
        var trains = operation_table["operations"][operation_numbers[cnt]]["trains"];
        var search_hit_count = 0;
        var buf_2 = "";
        for (var cnt_2 = 0; cnt_2 < trains.length; cnt_2++) {
            if (trains[cnt_2]["train_number"].substring(0, 1) === ".") {
                continue;
            }
            
            if (cnt_2 !== 0 && trains[cnt_2]["train_number"] === trains[cnt_2 - 1]["train_number"]) {
                continue;
            }
            
            var train_number = trains[cnt_2]["train_number"].split("__")[0];
            
            if (search_keyword === "") {
                if (trains[cnt_2]["train_number"] in timetable["timetable"][trains[cnt_2]["line_id"]][trains[cnt_2]["direction"] + "_trains"]) {
                    var train_type_initial = timetable["timetable"][trains[cnt_2]["line_id"]][trains[cnt_2]["direction"] + "_trains"][trains[cnt_2]["train_number"]][0]["train_type"].substring(0, 1);
                } else if (railroad_info["deadhead_train_number_regexp"].test(train_number)) {
                    var train_type_initial = "回";
                } else {
                    var train_type_initial = "＊";
                }
                
                var train_color = get_train_color(train_number, "#333333");
                if (config["dark_mode"]) {
                    train_color = convert_font_color_dark_mode(train_color);
                }
                buf_2 += "<small style='background-color: " + train_color + ";'>" + train_type_initial + "</small>";
            } else {
                var train_number_search_index = train_number.indexOf(search_keyword);
                
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
        
        if (search_keyword === "" || search_hit_count >= 1) {
            buf += "<tr onclick='operation_detail(\"" + operation_numbers[cnt] + "\", " + operation_table_name_or_ts + ", " + is_today_str + ");'>";
            buf += "<th rowspan='2' style='background-color: " + color + "'><b>" + operation_numbers[cnt] + "</b>" + operation_table["operations"][operation_numbers[cnt]]["operation_group_name"] + "<br>(" + operation_table["operations"][operation_numbers[cnt]]["car_count"] + "両)</th>";
            buf += "<td>" + operation_table["operations"][operation_numbers[cnt]]["starting_location"] + $starting_track_text + "<time>" + operation_table["operations"][operation_numbers[cnt]]["starting_time"] + "</time></td>";
            buf += "<td>" + operation_table["operations"][operation_numbers[cnt]]["terminal_location"] + $terminal_track_text + "<time>" + operation_table["operations"][operation_numbers[cnt]]["ending_time"] + "</time></td>";
            buf += "</tr>";
            buf += "<tr onclick='operation_detail(\"" + operation_numbers[cnt] + "\", " + operation_table_name_or_ts + ", " + is_today_str + ");'><td colspan='2' class='operation_overview'>";
            buf += buf_2;
            buf += "</td></tr>";
        }
    }
    
    search_starting_location_list = sort_station_names(search_starting_location_list);
    search_terminal_location_list = sort_station_names(search_terminal_location_list);
    
    var buf_2 = "<option value=''>運用系統 指定なし</option>";
    for (cnt = 0; cnt < operation_table["operation_groups"].length; cnt++) {
        buf_2 += "<option value='" + operation_table["operation_groups"][cnt]["operation_group_name"] + "'>" + operation_table["operation_groups"][cnt]["operation_group_name"] + "</option>";
    }
    search_group_name_elm.innerHTML = buf_2;
    search_group_name_elm.value = search_group_name;
    
    var buf_2 = "<option value=''>所定両数 指定なし</option>";
    for (cnt = 0; cnt < search_car_count_list.length; cnt++) {
        buf_2 += "<option value='" + search_car_count_list[cnt] + "'>" + search_car_count_list[cnt] + "両</option>";
    }
    search_car_count_elm.innerHTML = buf_2;
    search_car_count_elm.value = search_car_count;
    
    var buf_2 = "<option value=''>出庫場所 指定なし</option>";
    for (cnt = 0; cnt < search_starting_location_list.length; cnt++) {
        buf_2 += "<option value='" + search_starting_location_list[cnt] + "'>" + search_starting_location_list[cnt] + " 出庫</option>";
    }
    search_starting_location_elm.innerHTML = buf_2;
    search_starting_location_elm.value = search_starting_location;
    
    var buf_2 = "<option value=''>入庫場所 指定なし</option>";
    for (cnt = 0; cnt < search_terminal_location_list.length; cnt++) {
        buf_2 += "<option value='" + search_terminal_location_list[cnt] + "'>" + search_terminal_location_list[cnt] + " 入庫</option>";
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
    
    operation_table_name_elm.innerText = diagram_info["diagrams"][diagram_id]["diagram_name"];
    
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
    open_square_popup("diagram_list_popup");
    
    document.getElementById("diagram_list_heading").innerText = diagram_info["diagram_revision"] + "改正ダイヤ";
    
    var buf = "";
    for (var cnt = 0; cnt < diagram_info["diagram_order"].length; cnt++) {
        var bg_color = diagram_info["diagrams"][diagram_info["diagram_order"][cnt]]["main_color"];
        
        if (config["dark_mode"]) {
            bg_color = convert_color_dark_mode(bg_color);
        }
        
        buf += "<button type='button' class='wide_button' onclick='close_square_popup(); operation_table_change(\"" + diagram_info["diagram_order"][cnt] + "\");' style='background-color: " + bg_color + "; border-color: " + bg_color + ";'>"  + escape_html(diagram_info["diagrams"][diagram_info["diagram_order"][cnt]]["diagram_name"]) + "</button>";
    }
    
    buf += "<div class='descriptive_text'>ダイヤ情報更新日時: " + get_date_and_time(diagram_info["last_modified_timestamp"]) + "</div>";
    
    document.getElementById("diagram_list_area").innerHTML = buf;
}


var screenshot_preview_elm = document.getElementById("screenshot_preview");
var save_screenshot_button_elm = document.getElementById("save_screenshot_button");

function take_screenshot (elm_id, is_popup = false) {
    open_popup("screenshot_popup");
    screenshot_preview_elm.innerHTML = "";
    save_screenshot_button_elm.style.display = "none";
    
    var screenshot_area_elm = document.createElement("div");
    screenshot_area_elm.classList.add("screenshot_area");
    
    if (is_popup) {
        screenshot_area_elm.classList.add("popup_screenshot_area");
    }
    
    screenshot_area_elm.innerHTML = document.getElementById(elm_id).innerHTML;
    
    var input_elms = screenshot_area_elm.getElementsByTagName("input");
    
    for (var cnt = input_elms.length - 1; cnt >= 0; cnt--) {
        input_elms[cnt].remove();
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
        screenshot_preview_elm.innerHTML = "<img src='" + image_data + "' alt=''>";
        save_screenshot_button_elm.style.display = "block";
    }, screenshot_area_elm, 2);
    
    screenshot_area_elm.remove();
}

function save_screenshot () {
    var ts = get_timestamp();
    var dt = new Date(ts * 1000);
    
    Elem2Img.save_image(screenshot_preview_elm.getElementsByTagName("img")[0].src, UNYOHUB_APP_NAME + "_" + get_date_string(ts) + "_" + ("0" + dt.getHours()).slice(-2) + ("0" + dt.getMinutes()).slice(-2) + ("0" + dt.getSeconds()).slice(-2) + ".png");
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

var write_operation_data_area_elm = document.getElementById("write_operation_data_area");
var require_login_area_elm = document.getElementById("require_login_area");

function write_operation_data (yyyy_mm_dd, operation_number, train_number = null) {
    open_popup("write_operation_data_popup");
    
    var yyyy_mm_dd_today = get_date_string(get_timestamp());
    
    if (yyyy_mm_dd === null) {
        post_yyyy_mm_dd = yyyy_mm_dd_today;
    } else {
        post_yyyy_mm_dd = yyyy_mm_dd;
    }
    
    post_operation_number = operation_number;
    
    var alias_of_forward_direction = escape_html(railroad_info["alias_of_forward_direction"]);
    
    var buf = "<h3>" + escape_html(operation_number) + "運用</h3>";
    
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
    if (speculative_post) {
        buf += " checked='checked'";
    }
    buf += "><label for='operation_data_details' class='drop_down'>詳細情報</label><div>";
    
    buf += "<div id='train_number_data'>";
    buf += "<h4>目撃時の列車</h4>";
    buf += "<b id='operation_data_train_number'></b><button onclick='open_square_popup(\"train_number_popup\");'>変更</button>";
    buf += "</div>";
    
    buf += "<h4>運用補足情報</h4>";
    buf += "<textarea id='operation_data_comment'></textarea>";
    
    if(speculative_post) {
        buf += "<div class='warning_text' id='comment_guide'>お手数ですが、この運用に充当される編成を確認した方法を補足情報にご入力ください。</div>";
    } else {
        buf += "<div class='informational_text' id='comment_guide'>差し替え等の特記事項がない場合は省略可能です。</div>";
    }
    
    buf += "<div class='warning_text' id='quote_guide' style='display: none;'>情報の出典を補足情報にご入力ください。<br><br>また、お手数ですが、投稿前に<a href='javascript:void(0);' onclick='show_rules();'>ルールとポリシー</a>をご覧いただき、引用元が投稿ルールに反しない情報ソースであることをご確認願います。</div>";
    
    buf += "</div><br>";
    
    buf += "<button type='button' class='wide_button' onclick='check_post_operation_data();'>投稿する</button>";
    
    write_operation_data_area_elm.innerHTML = buf;
    
    if (instance_info["allow_guest_user"] || user_data !== null) {
        write_operation_data_area_elm.style.display = "block";
        require_login_area_elm.style.display = "none";
        
        if (user_data !== null) {
            get_one_time_token();
        }
    } else {
        write_operation_data_area_elm.style.display = "none";
        require_login_area_elm.style.display = "block";
    }
    
    buf = "<a href='javascript:void(0);' onclick='set_train_number(\"○\")'>○ 出庫時</a>";
    
    if (!speculative_post) {
        if (post_yyyy_mm_dd === yyyy_mm_dd_today) {
            var now_hh_mm = get_hh_mm();
        } else {
            var now_hh_mm = "99:99";
        }
        
        for (var cnt = 0; cnt < operation_table["operations"][operation_number]["trains"].length; cnt++) {
            if (cnt == 0 || operation_table["operations"][operation_number]["trains"][cnt]["train_number"] !== operation_table["operations"][operation_number]["trains"][cnt - 1]["train_number"]) {
                var first_departure_time = operation_table["operations"][operation_number]["trains"][cnt]["first_departure_time"];
            }
            
            if (cnt + 1 < operation_table["operations"][operation_number]["trains"].length && operation_table["operations"][operation_number]["trains"][cnt]["train_number"] === operation_table["operations"][operation_number]["trains"][cnt + 1]["train_number"]) {
                continue;
            }
            
            var train_title = operation_table["operations"][operation_number]["trains"][cnt]["train_number"].split("__")[0];
            
            if (train_title.substring(0, 1) === ".") {
                train_title = train_title.substring(1) + "待機";
                
                var color = "inherit";
            } else {
                var color = get_train_color(train_title);
                if (config["dark_mode"]) {
                    color = convert_font_color_dark_mode(color);
                }
            }
            
            buf += "<a href='javascript:void(0);' onclick='set_train_number(\"" + add_slashes(operation_table["operations"][operation_number]["trains"][cnt]["train_number"]) + "\")' style='color: " + color + ";'>" + escape_html(train_title) + "<small>" + first_departure_time + " 〜 " + operation_table["operations"][operation_number]["trains"][cnt]["final_arrival_time"] + "</small></a>";
            
            if (operation_table["operations"][operation_number]["trains"][cnt]["final_arrival_time"] > now_hh_mm) {
                break;
            }
        }
        
        if (train_number !== null) {
            set_train_number(train_number);
        } else {
            if (cnt === operation_table["operations"][operation_number]["trains"].length) {
                buf += "<a href='javascript:void(0);' onclick='set_train_number(\"△\")'>△ 入庫時</a>";
                set_train_number("△");
            } else {
                set_train_number(operation_table["operations"][operation_number]["trains"][cnt]["train_number"]);
            }
        }
    } else {
        set_train_number("○");
    }
    
    var train_number_area_elm = document.getElementById("train_number_area");
    
    train_number_area_elm.innerHTML = buf;
    train_number_area_elm.scrollTop = 0;
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
        
        if (train_title.substring(0, 1) === ".") {
            train_title = train_title.substring(1) + "待機";
        } else {
            var color = get_train_color(train_title);
            if (config["dark_mode"]) {
                color = convert_font_color_dark_mode(color);
            }
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
    var formation_text = formations_splitted[formations_splitted.length - 1].toUpperCase();
    
    var buf = "";
    
    if (formation_text.length >= 1) {
        var formation_names = formations["series_names"].concat(Object.keys(formations["formations"]).sort());
        
        var suggestion_list = formation_names.filter(function (formation_name) {
            return formation_name.toUpperCase().startsWith(formation_text);
        });
        
        for (var cnt = 0; cnt < suggestion_list.length; cnt++) {
            buf += "<a href='javascript:void(0);' onclick='complete_formation(\"" + add_slashes(suggestion_list[cnt]) + "\");'><img src='" + get_icon(suggestion_list[cnt]) + "' alt='' class='train_icon'>" + suggestion_list[cnt] + "</a>";
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
    var train_operations = get_operations(line_id, train_number, starting_station, train_direction)
    
    if (train_operations.length === 1) {
        write_operation_data(null, train_operations[0], train_number);
        
        return;
    }
    
    open_square_popup("select_operation_popup");
    
    var position_operations = {};
    for (var cnt = 0; cnt < train_operations.length; cnt++) {
        for (var cnt_2 = 0; cnt_2 < operation_table["operations"][train_operations[cnt]]["trains"].length; cnt_2++) {
            if (operation_table["operations"][train_operations[cnt]]["trains"][cnt_2]["train_number"] === train_number && operation_table["operations"][train_operations[cnt]]["trains"][cnt_2]["starting_station"] === starting_station) {
                position_operations[operation_table["operations"][train_operations[cnt]]["trains"][cnt_2]["position_forward"] + "-" + operation_table["operations"][train_operations[cnt]]["trains"][cnt_2]["position_rear"]] = train_operations[cnt];
                
                break;
            }
        }
    }
    
    var position_keys = Object.keys(position_operations);
    position_keys.sort();
    
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
        
        buf += "<td onclick='write_operation_data(null, \"" + add_slashes(position_operations[position_keys[cnt]]) + "\", \"" + add_slashes(train_number) + "\");'><div><b>" + position_keys[cnt] + "</b>両目</div>" + escape_html(position_operations[position_keys[cnt]]) + "運用</td></tr>";
    }
    
    buf += "</table>";
    
    document.getElementById("select_operation_area").innerHTML = buf;
}

function check_post_operation_data () {
    if (user_data === null) {
        if (config["guest_id"] === null) {
            show_rules(show_captcha);
        } else {
            show_captcha();
        }
        
        captcha_submit_button_elm.onclick = post_operation_data;
    } else {
        post_operation_data();
    }
}

function post_operation_data () {
    open_wait_screen();
    
    if (user_data !== null && one_time_token === null) {
        close_wait_screen();
        
        mes("内部処理が完了していないため、数秒待ってから再送信してください", true);
        
        return;
    }
    
    var send_data = "railroad_id=" + escape_form_data(railroad_info["railroad_id"]) + "&date=" + escape_form_data(post_yyyy_mm_dd) + "&operation_number=" + escape_form_data(post_operation_number) + "&formations=" + escape_form_data(document.getElementById("operation_data_formation").value) + "&comment=" + escape_form_data(document.getElementById("operation_data_comment").value);
    
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

function edit_operation_data (yyyy_mm_dd, operation_number, user_id, formation_text, ip_address = null) {
    open_popup("edit_operation_data_popup");
    
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
    
    buf += "<br><button type='button' class='wide_button' onclick='revoke_operation_data(\"" + yyyy_mm_dd + "\", \"" + add_slashes(operation_number) + "\", \"" + add_slashes(user_id) + "\");'>取り消す</button>";
    
    if (user_id !== user_data["user_id"]) {
        buf += "<button type='button' class='wide_button' onclick='revoke_users_all_operation_data(\"" + add_slashes(user_id) + "\");'>ユーザーの投稿を全て取り消す</button>";
    }
    
    document.getElementById("edit_operation_data_area").innerHTML = buf;
    
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

function revoke_operation_data (yyyy_mm_dd, operation_number, user_id) {
    open_wait_screen();
    
    if (one_time_token === null) {
        close_wait_screen();
        
        mes("内部処理が完了していないため、数秒待ってから再送信してください", true);
        
        return;
    }
    
    ajax_post("revoke.php", "railroad_id=" + escape_form_data(railroad_info["railroad_id"]) + "&date=" + escape_form_data(yyyy_mm_dd) + "&operation_number=" + escape_form_data(operation_number) + "&user_id=" + escape_form_data(user_id) + "&one_time_token=" + escape_form_data(one_time_token), function (response) {
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


var captcha_submit_button_elm = document.getElementById("captcha_submit_button");

function show_captcha () {
    var info_elm = document.getElementById("captcha_info");
    
    info_elm.style.display = "none";
    captcha_submit_button_elm.style.display = "none";
    open_square_popup("captcha_popup");
    
    if (!config["dark_mode"]) {
        var button_color = "#eeeeee";
    } else {
        var button_color = "#777777";
    }
    
    zizai_captcha_get_html(function (html) {
        document.getElementById("captcha_area").innerHTML = html;
        info_elm.style.display = "block";
        captcha_submit_button_elm.style.display = "block";
    }, button_color);
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
    if (confirm("ログアウトしますか？")){
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
    open_popup("about_railroad_data_popup");
    
    var main_color = railroad_info["main_color"];
    if (config["dark_mode"]) {
        main_color = convert_color_dark_mode(main_color);
    }
    
    var buf = "<h2 style='background-color: " + main_color + ";'><img src='" + railroad_info["railroad_icon"] + "' alt=''>" + railroad_info["railroad_name"] + "</h2>";
    
    if ("description" in railroad_info && railroad_info["description"].length >= 1) {
        buf += "<div class='long_text'>" + convert_to_html(railroad_info["description"]) + "</div>";
    }
    
    if ("editors" in railroad_info && railroad_info["editors"].length >= 1) {
        buf += "<h3>製作者</h3>";
        
        for (var cnt = 0; cnt < railroad_info["editors"].length; cnt++) {
            if ("editor_url" in railroad_info["editors"][cnt] && railroad_info["editors"][cnt]["editor_url"].length >= 1) {
                buf += "<b><a href='" + railroad_info["editors"][cnt]["editor_url"] + "' target='_blank' class='external_link'>" + escape_html(railroad_info["editors"][cnt]["editor_name"]) + "</a></b><br>";
            } else {
                buf += "<b>" + escape_html(railroad_info["editors"][cnt]["editor_name"]) + "</b><br>";
            }
            
            if ("introduction_text" in railroad_info["editors"][cnt] && railroad_info["editors"][cnt]["introduction_text"].length >= 1) {
                buf += "<div class='informational_text'>" + escape_html(railroad_info["editors"][cnt]["introduction_text"]).replace(/\n/g, "<br>") + "</div>";
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
        
        for (var cnt = 0; cnt < railroad_info["related_links"].length; cnt++) {
            buf += "<b><a href='" + railroad_info["related_links"][cnt]["link_url"] + "' target='_blank' class='external_link'>" + escape_html(railroad_info["related_links"][cnt]["link_text"]) + "</a></b><br>";
            
            if ("link_description" in railroad_info["related_links"][cnt] && railroad_info["related_links"][cnt]["link_description"].length >= 1) {
                buf += "<div class='informational_text'>" + escape_html(railroad_info["related_links"][cnt]["link_description"]).replace(/\n/g, "<br>") + "</div>";
            }
        }
    }
    
    buf += "<h3>データ更新日時</h3><div class='informational_text'>";
    buf += "路線系統情報: " + get_date_and_time(railroad_info["last_modified_timestamp"]) + "<br>";
    buf += "ダイヤ改正一覧情報: " + get_date_and_time(diagram_revisions["last_modified_timestamp"]);
    buf += "</div>";
    
    document.getElementById("about_railroad_data_area").innerHTML = buf;
    
    document.getElementById("about_railroad_data_popup").scrollTop = 0;
}


var dark_mode_check_elm = document.getElementById("dark_mode_check");
var colorize_beginners_posts_check_elm = document.getElementById("colorize_beginners_posts_check");
var refresh_interval_elm = document.getElementById("refresh_interval");
var operation_data_cache_period_elm = document.getElementById("operation_data_cache_period");

function edit_config () {
    open_popup("config_popup");
    
    dark_mode_check_elm.checked = config["dark_mode"];
    colorize_beginners_posts_check_elm.checked = config["colorize_beginners_posts"];
    refresh_interval_elm.value = config["refresh_interval"];
    operation_data_cache_period_elm.value = config["operation_data_cache_period"];
}

function change_config () {
    config["dark_mode"] = dark_mode_check_elm.checked;
    config["colorize_beginners_posts"] = colorize_beginners_posts_check_elm.checked;
    
    if (Number(refresh_interval_elm.value) > 60) {
        refresh_interval_elm.value = 60;
    } else if (Number(refresh_interval_elm.value) < 1) {
        refresh_interval_elm.value = 1;
    }
    config["refresh_interval"] = Number(refresh_interval_elm.value);
    
    if (Number(operation_data_cache_period_elm.value) > 30) {
        operation_data_cache_period_elm.value = 30;
    } else if (Number(operation_data_cache_period_elm.value) < 1) {
        operation_data_cache_period_elm.value = 1;
    }
    config["operation_data_cache_period"] = Number(operation_data_cache_period_elm.value);
    
    switch_dark_mode();
    
    save_config();
}

function reset_config_value () {
    if (confirm("設定をリセットしますか？")) {
        var dafault_config = get_default_config();
        
        dark_mode_check_elm.checked = dafault_config["dark_mode"];
        colorize_beginners_posts_check_elm.checked = dafault_config["colorize_beginners_posts_check"];
        refresh_interval_elm.value = dafault_config["refresh_interval"];
        operation_data_cache_period_elm.value = dafault_config["operation_data_cache_period"];
        
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
    open_popup("about_popup");
    
    var buf = "<img src='/apple-touch-icon.webp' alt='" + UNYOHUB_APP_NAME + "' id='unyohub_icon'>";
    buf += "<h2>" + UNYOHUB_APP_NAME + " " + UNYOHUB_VERSION + "</h2>";
    
    if (instance_info["introduction_text"] !== null || instance_info["manual_url"] !== null) {
        buf += "<h3>" + escape_html(instance_info["instance_name"]) + "について</h3>";
        if (instance_info["introduction_text"] !== null) {
            buf += "<div class='long_text'>" + convert_to_html(instance_info["introduction_text"]) + "</div>";
        }
        if (instance_info["manual_url"] !== null) {
            buf += "<button onclick='window.open(\"" + instance_info["manual_url"] + "\", \"_blank\", \"noopener\");' class='wide_button'>" + escape_html(instance_info["instance_name"]) + "の使い方</button><br>";
        }
    }
    
    buf += "<h3>ソフトウェア情報</h3>";
    buf += "<h4>ライセンス</h4>";
    buf += "<div class='informational_text'>" + UNYOHUB_LICENSE_TEXT + "<br><br><a href='" + UNYOHUB_LICENSE_URL + "' target='_blank' class='external_link'>" + UNYOHUB_LICENSE_URL + "</a></div>";
    buf += "<h4>ソースコード</h4>";
    buf += "<div class='informational_text'><a href='" + UNYOHUB_REPOSITORY_URL + "' target='_blank' class='external_link'>" + UNYOHUB_REPOSITORY_URL + "</a></div>";
    
    document.getElementById("about_area").innerHTML = buf;
}


function reload_app () {
    wait_screen_elm.style.display = "block";
    
    setTimeout(function () {
        if (location.pathname === "/") {
            location.reload();
        } else {
            location.pathname = "/";
        }
    }, 100);
}


history.pushState(null, null, location.href);

window.onpopstate = function () {
    if (square_popup_is_open) {
        close_square_popup();
    } else if (popup_history.length >= 1) {
        popup_close();
    } else if (menu_elm.className === "menu_open") {
        menu_click(true);
    } else{
        switch (mode_val) {
            case 1:
                if (timetable_selected_station !== null) {
                    timetable_change_lines(selected_line, true);
                }
                break;
            case 3:
                if (selected_formation_name !== null) {
                    draw_formation_table();
                }
                break;
        }
    }
    
    history.pushState(null, null, null);
};


if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service_worker.js");
}
