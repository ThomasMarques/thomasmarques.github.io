$(document).ready(function () {
    $(".hire-me").click(function () {
        return $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 500), !1
    }), $("ul.nav-pills li a").click(function () {
        $("ul.nav-pills li.active").removeClass("active"), $(this).parent("li").addClass("active")
    }), $("#main-menu").onePageNav({
        currentClass: "active",
        changeHash: !1,
        scrollThreshold: .5,
        scrollSpeed: 750,
        filter: "",
        easing: "swing"
    })
});