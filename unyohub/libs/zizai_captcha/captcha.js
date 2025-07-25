/* Zizai CAPTCHA 25.07-1 */

const ZIZAI_CAPTCHA_GENERATE_ID_ENDPOINT = "/libs/zizai_captcha/generate_id.php";
const ZIZAI_CAPTCHA_IMAGE_PATH = "/libs/zizai_captcha/image.php";

const ZIZAI_CAPTCHA_RELOAD_IMAGE_DARK = "data:image/webp;base64,UklGRkQCAABXRUJQVlA4TDgCAAAvX8AXENXIkSTJkZx5zKkg01FzC479xP7/MbR3tkCkswJpDZxzjmMSeCkJuwg4AAAQTGZv2bZt87Jt27brsm3btm132babgNgrYE83KONCItmUUk++pRBdzEwUPHfOUOFstZzzvzJ/rJNmmlOEH+eRxZohflWTh1I0yPkwweHJqeqzYhYz8GqJzxZMIYfca7OsFZlV0qbvjW+QZENcMkfLPRpsjF0+a+l+Ke9JlqRNa3S3Skhpez3QxGKgPZ/Zlhpuqkg/TH5BNo3uLL7Z9HSx5q2i+IfnGuKHsA4YMcHZtEb3bEIWNS9izZvDChKFLye4pvG9jMovH3FcQdbetAUb/E4wr+st9SLiLL31eBdRrHn2LnZZWfIuduCUeBdxyI93UQz58i5MhTfvklXnkhn5lvvyLfflW+7Lt9yXcwMX+lV7CU9ufr94V/WfJ/dUk8VTBM7ZdIZvLcO3luFby/DtUYZzfKDlnfjG0jvxZ1Ed0Dnp53fvxKZxeydezMY7iZGX3unbV1CutNK4nsQJdkBrTSFb0HIGfltB4gjfrALFeeT4WkaEBZxUkP5S1ivNwOsMjI/Ai9G1jHmkv9SQxK3VfjaBV0vuF2u6in8HitHZdMbiXSIr5q/KPJ8cMPH+Xmm7zbVYNdEY/b2WsWIvcbvW0mNcbsX48clYuQOaxv4GOCfoR7h4Qj53Vfih/88U0QHc3IGjWpJZ4Xc1Tqkq9gN5ePu/CJlxiSTJ8u5RYpkkmGNRnFDHXgEB";
const ZIZAI_CAPTCHA_RELOAD_IMAGE_LIGHT = "data:image/webp;base64,UklGRgACAABXRUJQVlA4TPQBAAAvX8AXEFVActtIkpT//zR7rY7O9iynQVRMhCTYtk27OrF3bNu22bJt27aTlm3btnHi5Jst2/aZgP4rIFFWolVo0mNMm2pFfOlgjUNQlBEvkMP+u6GWA/ocGATZ9G8qfdTJNAOQ4BlS74o/qmNA8gegluAD8l7XGR8BsLH9GLiJeOXEtDHjdt3zq2r814f7CYCR7VDJNsuX8EKP0VAVYtjbkhnPmD0AMLIdNsFE+0VULPT4UjH+ykWxUAMY2Q493q7EIsmjghkdqAGM7Hd28SnYk4IxByMf8EYMsnx77WmKbmKW03UL8iVdk3GRrtHpTtctwd90zcPvdM3a93TAtXDA0WQD52QD52QD52QD54SjyK2UfpLf7+FWSjHJP1LpHHs4GHQ2GHQ2GHQ2GHQ218BC4fzkmG78EZBu/FeIItyMYQzpxi1K6cZXwelmbJNJN77JxhgFNvHajKdC0VSh/gAYoNJUMOOxlP8S/Bj2g0F3S/enYMZXvSxRvUJCMNbeDgZ9z8jjipnxzohQ6miekBBkURrKhbaDQT/Gqcv/knu/PLRvwphZF96Ma3QW2t4YDPogfRdVT70Tjar3lwz6MAr2jt7ghUysC0VkpM37En+tCUC/UEx0bFS58u+YZwaF4VsoLRaavBSo1GpMtwblIlgQWuivgA==";

var zizai_captcha_dir;
(function(){
    var script_elms = document.getElementsByTagName("script");
    var path_splitted = script_elms[script_elms.length - 1].src.split("/");
    path_splitted[path_splitted.length - 1] = "";
    
    zizai_captcha_dir = path_splitted.join("/");
}());

function zizai_captcha_get_id (callback_func, args = null) {
    if (ZIZAI_CAPTCHA_GENERATE_ID_ENDPOINT.startsWith("/") || ZIZAI_CAPTCHA_GENERATE_ID_ENDPOINT.startsWith("https://")) {
        var endpoint_path = ZIZAI_CAPTCHA_GENERATE_ID_ENDPOINT;
    } else {
        var endpoint_path = zizai_captcha_dir + ZIZAI_CAPTCHA_GENERATE_ID_ENDPOINT;
    }
    
    var request_obj = new XMLHttpRequest();
    
    request_obj.onreadystatechange = function () {
        if (request_obj.readyState === 4) {
            if (request_obj.status === 200) {
                if (args === null) {
                    callback_func(JSON.parse(request_obj.responseText));
                } else {
                    callback_func(JSON.parse(request_obj.responseText), args);
                }
            } else {
                callback_func(false);
            }
        }
    };
    
    request_obj.open("GET", endpoint_path, true);
    request_obj.timeout = 10000;
    request_obj.send();
}

function zizai_captcha_get_image_path (session_id) {
    if (ZIZAI_CAPTCHA_IMAGE_PATH.startsWith("/") || ZIZAI_CAPTCHA_IMAGE_PATH.startsWith("https://")) {
        return ZIZAI_CAPTCHA_IMAGE_PATH + "/" + session_id;
    } else {
        return zizai_captcha_dir + ZIZAI_CAPTCHA_IMAGE_PATH + "/" + session_id;
    }
}

function zizai_captcha_reload_image_callback (data, args) {
    document.getElementById(args[0]).src = zizai_captcha_get_image_path(data.session_id);
    
    if (args[1] !== null) {
        document.getElementById(args[1]).value = data.session_id;
    }
}

function zizai_captcha_reload_image (image_id, session_id_id = null) {
    zizai_captcha_get_id(zizai_captcha_reload_image_callback, [image_id, session_id_id]);
}

function zizai_captcha_get_html_callback (data, args) {
    var image_path = zizai_captcha_get_image_path(data.session_id);
    var input_font_size = Math.round(data.image_height * 0.6);
    
    var rgb_sum = 0;
    for (var cnt = 0; cnt < 3; cnt++) {
        rgb_sum += parseInt(args[4].substring(cnt * 2 + 1, cnt * 2 + 3), 16);
    }
    
    var button_image = rgb_sum > 382 ? ZIZAI_CAPTCHA_RELOAD_IMAGE_DARK : ZIZAI_CAPTCHA_RELOAD_IMAGE_LIGHT;
    
    if (button_image.substring(0, 5) !== "data:") {
        button_image = zizai_captcha_dir + button_image;
    }
    
    args[0](`
<input type="hidden" name="${args[1]}" id="${args[1]}" value="${data.session_id}">
<img src="${image_path}" alt="" id="${args[3]}" style="vertical-align: text-bottom;"><button type="button" onclick="zizai_captcha_reload_image('${args[3]}', '${args[1]}');" style="box-sizing: border-box; width: ${data.image_height}px; height: ${data.image_height}px; background-color: ${args[4]}; background-image: url('${button_image}'); background-size: cover; border: none; margin-left: 5px; vertical-align: text-bottom; cursor: pointer;"></button><br>
<input type="text" name="${args[2]}" id="${args[2]}" style="box-sizing: border-box; width: ${data.image_width}px; height: ${data.image_height}px; font-size: ${input_font_size}px; letter-spacing: 0.5em; text-align: center;">
`);
}

function zizai_captcha_get_html (callback_func, button_color = "#dddddd", id_name = "zizai_captcha_id", characters_name = "zizai_captcha_characters", image_id = "zizai_captcha_image") {
    zizai_captcha_get_id(zizai_captcha_get_html_callback, [callback_func, id_name, characters_name, image_id, button_color]);
}
