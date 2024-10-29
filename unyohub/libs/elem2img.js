/*_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
 *
 *  elem2img.js 24.10-1
 *
 *_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
 *
 *  LICENSE
 *
 *   このソフトウェアは、無権利創作宣言に基づき著作権放棄されています。
 *   営利・非営利を問わず、自由にご利用いただくことが可能です。
 *
 *    https://www.2pd.jp/license/
 *
 */

class Elem2Img {
    constructor () {
        this.func_queue = [];
        this.constructor_executed = false;
        
        var css_list = [...document.styleSheets];
        var css_code = "";
        for (var cnt = 0; cnt < css_list.length; cnt++) {
            try {
                var css_rules = css_list[cnt].cssRules;
                for (var cnt_2 = 0; cnt_2 < css_rules.length; cnt_2++) {
                    if (css_rules[cnt_2].constructor.name === "CSSImportRule") {
                        css_list.push(css_rules[cnt_2].styleSheet);
                    } else {
                        css_code += css_rules[cnt_2].cssText + "\n";
                    }
                }
            } catch (err) {
                console.error("elem2img ERROR: スタイルシート " + document.styleSheets[cnt].href + " が利用できません");
            }
        }
        
        var e2i = this;
        Elem2Img.css_embed_external_files(function (css_code) {
            e2i.css_code = "<style>\n" + css_code + "</style>";
            
            e2i.constructor_executed = true;
            
            for (cnt = 0; cnt < e2i.func_queue.length; cnt++) {
                e2i.func_queue[cnt]();
            }
        }, css_code);
        
        this.set_background_color();
    }
    
    func_queue_add (func) {
        if (this.constructor_executed) {
            func();
        } else {
            this.func_queue.push(func);
        }
    }
    
    static encode_external_data (url) {
        return new Promise(function (resolve) {
            fetch(url).then(function (response) {
                if (!response.ok) {
                    console.error("elem2img ERROR: " + url + " の取得に失敗しました (" + response.status + ")");
                    resolve("");
                }
                
                response.blob().then(function (blob) {
                    var reader = new FileReader();
                    
                    reader.onload = function () {
                        resolve(reader.result);
                    };
                    
                    reader.readAsDataURL(blob);
                });
            }, function (err) {
                console.error("elem2img ERROR: " + url + " が利用できません");
                resolve("");
            });
        });
    }
    
    static css_embed_external_files (callback_func, css_code) {
        var promise_list = [];
        var css_split_list = [];
        
        var url_regexp = /url\(["']?(http:|https:)?[^:"'\(\)]+["']?\)/g;
        var url_before_after_regexp = /(^url\(["']?|["']?\)$)/g;
        
        var last_match = 0;
        while (true) {
            var url_data = url_regexp.exec(css_code);
            
            if (url_data === null) {
                css_split_list.push(css_code.substring(last_match));
                break;
            }
            
            promise_list.push(Elem2Img.encode_external_data(url_data[0].replaceAll(url_before_after_regexp, "")));
            
            css_split_list.push(css_code.substring(last_match, url_data.index));
            last_match = url_regexp.lastIndex;
        }
        
        Promise.all(promise_list).then(function (base64_data_list) {
            var css_code = css_split_list[0];
            for (var cnt = 0; cnt < base64_data_list.length; cnt++) {
                css_code += "url('" + base64_data_list[cnt] + "')" + css_split_list[cnt + 1];
            }
            
            callback_func(css_code);
        });
    }
    
    static embed_images (elem) {
        var promise_list = [];
        
        var img_elems = [...elem.getElementsByTagName("img")];
        img_elems.forEach (function (img_elem) {
            if (img_elem.src.substring(0, 5) !== "data:") {
                promise_list.push(new Promise(function (resolve) {
                    Elem2Img.encode_external_data(img_elem.src).then(function (base64_data) {
                        img_elem.src = base64_data;
                        resolve();
                    });
                }));
            }
        });
        
        var styled_elems = [elem, ...elem.querySelectorAll("*[style]")];
        styled_elems.forEach (function (styled_elem) {
            promise_list.push(new Promise(function (resolve) {
                Elem2Img.css_embed_external_files(function (css_code) {
                    styled_elem.style.cssText = css_code;
                    resolve();
                }, styled_elem.style.cssText);
            }));
        });
        
        return Promise.all(promise_list);
    }
    
    get_image_url (elem, width, height) {
        var xml_serializer = new XMLSerializer();
        var svg_code = "<svg xmlns='http://www.w3.org/2000/svg' width='" + width + "' height='" + height + "'>" + this.css_code + "<foreignObject width='100%' height='100%'>" + xml_serializer.serializeToString(elem) + "</foreignObject></svg>";
        
        return "data:image/svg+xml;charset=utf-8;base64," + btoa(encodeURIComponent(svg_code).replace(/%([0-9A-F][0-9A-F])/g, function (match, match_1) {
            return String.fromCharCode('0x' + match_1);
        }));
    }
    
    paste_svg (svg_data, canv_width, canv_height) {
        var canv = document.createElement("canvas");
        var ctx = canv.getContext("2d");
        
        canv.width = canv_width;
        canv.height = canv_height;
        
        if (this.background_color !== null) {
            ctx.fillStyle = this.background_color;
            ctx.fillRect(0, 0, canv_width, canv_height);
        }
        
        return new Promise(function (resolve) {
            var img_elem = document.createElement("img");
            
            img_elem.onload = function () {
                ctx.drawImage(img_elem, 0, 0, canv_width, canv_height);
                resolve(canv);
            };
            
            img_elem.src = svg_data;
        });
    }
    
    get_image (callback_func, elem, mime_type, scale, quality = 100) {
        var elem_2 = elem.cloneNode(true);
        
        var canv_width = Math.round(elem.offsetWidth * scale);
        var canv_height = Math.round(elem.offsetHeight * scale);
        
        elem_2.style.transform = "translate(" + ((canv_width - elem.offsetWidth) / 2) + "px, " + ((canv_height - elem.offsetHeight) / 2) + "px) scale(" + scale + ")";
        elem_2.style.boxSizing = "border-box";
        elem_2.style.width = elem.offsetWidth + "px";
        elem_2.style.height = elem.offsetHeight + "px";
        elem_2.style.maxWidth = elem.offsetWidth + "px";
        elem_2.style.maxHeight = elem.offsetHeight + "px";
        elem_2.style.setProperty("margin" ,"0", "important");
        elem_2.style.position = "static";
        
        var e2i = this;
        Elem2Img.embed_images(elem_2).then(function () {
            e2i.func_queue_add (function () {
                var svg_data = e2i.get_image_url(elem_2, canv_width, canv_height);
                
                (async function () {//SafariでSVG内の画像が読み込まれないバグの暫定回避
                    if (!window.navigator.userAgent.includes("Chrome") && window.navigator.userAgent.includes("Safari")) {
                        for (var cnt = 0; cnt < 3; cnt++) {
                            await e2i.paste_svg(svg_data, canv_width, canv_height);
                            await new Promise(function (resolve) {
                                setTimeout(resolve, 100);
                            });
                        }
                    }
                    
                    e2i.paste_svg(svg_data, canv_width, canv_height).then(function (canv) {
                        callback_func(canv.toDataURL(mime_type, quality / 100));
                    });
                })();
            });
        });
    }
    
    get_webp (callback_func, elem, scale = 1, quality = 100) {
        this.get_image(callback_func, elem, "image/webp", scale, quality);
    }
    
    get_png (callback_func, elem, scale = 1) {
        this.get_image(callback_func, elem, "image/png", scale);
    }
    
    get_jpeg (callback_func, elem, scale = 1, quality = 100) {
        this.get_image(callback_func, elem, "image/jpeg", scale, quality);
    }
    
    static save_image (image_data, file_name) {
        var a_elem = document.createElement("a");
        a_elem.href = image_data;
        a_elem.download = file_name;
        a_elem.click();
    }
    
    save_webp (elem, file_name, scale = 1, quality = 100) {
        this.get_webp(function (image_data) {
            Elem2Img.save_image(image_data, file_name);
        }, elem, scale, quality);
    }
    
    save_png (elem, file_name, scale = 1) {
        this.get_png(function (image_data) {
            Elem2Img.save_image(image_data, file_name);
        }, elem, scale);
    }
    
    save_jpeg (elem, file_name, scale = 1, quality = 100) {
        this.get_jpeg(function (image_data) {
            Elem2Img.save_image(image_data, file_name);
        }, elem, scale, quality);
    }
    
    set_background_color (background_color = null) {
        this.background_color = background_color;
    }
}
