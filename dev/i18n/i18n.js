/*
 * My own i18n with javascript
 */
function createCookie(e, t, n) {
    var r;
    if (n) {
        var i = new Date;
        i.setTime(i.getTime() + n * 24 * 60 * 60 * 1e3);
        r = "; expires=" + i.toGMTString()
    } else {
        r = ""
    }
    document.cookie = e + "=" + t + r + "; path=/"
}

function getCookie(e) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(e + "=");
        if (c_start != -1) {
            c_start = c_start + e.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length
            }
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return undefined
}

function changeForLater() {
    if (value == "en") {
        $(".french-flag").addClass("off");
        $(".english-flag").removeClass("off")
    } else {
        $(".french-flag").removeClass("off");
        $(".english-flag").addClass("off")
    }
    $(".i18n").each(function () {
        $(this).html(json_data[value][this.getAttribute("i18n-key")])
    })
}

function changeLang(e, t) {
    if (value == e) return;
    value = e;
    createCookie("lang", value, 7);
    if (t) {
        $(".to-fade").removeClass("fadein").addClass("fadeout");
        $(".i18n").removeClass("fadein").addClass("fadeout");
        setTimeout(changeForLater, 800);
        setTimeout(function () {
            $(".to-fade").addClass("fadein").removeClass("fadeout");
            $(".i18n").addClass("fadein").removeClass("fadeout")
        }, 1e3)
    } else {
        changeForLater()
    }
}

var value;
var json_data = new Object;
$(document).ready(function () {
    {
        $.getJSON("../dev/i18n/i18n-data.json", function (e) {
            e.forEach(function (e) {
                json_data[e.lang] = e
            });
            var t = getCookie("lang");
            if (t == undefined) t = "fr";
            changeLang(t, false)
        })
    }
    $(".i18n-language-selector").click(function (e) {
        changeLang(this.getAttribute("value"), true)
    })
});