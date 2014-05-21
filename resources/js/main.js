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
    }), $(document).ready(function() { // Magnific popup
        $('.magnific-popup').magnificPopup({
            delegate: 'a',
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: false,
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            removalDelay: 300,
            image: {
                verticalFit: true
            },
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function(element) {
                    return element.find('img');
                }
            }

        });
    });
});

function changProject(projectName) {
    $("#page-projects .row .projects-title").addClass("fade-out-left");
    setTimeout(function() {
        $("#page-projects .row .projects-title").addClass("hidden");
        $("#page-projects .projects-desc ."+projectName).removeClass("hidden");
        setTimeout(function() {
            $("#page-projects .projects-desc ."+projectName).removeClass("chidden");
        }, 10);
    }, 800);
}

function hideProject(projectName) {
    $("#page-projects .projects-desc ."+projectName).addClass("chidden");
    setTimeout(function() {
        $("#page-projects .projects-desc ."+projectName).addClass("hidden");
        $("#page-projects .row .projects-title").removeClass("hidden");
        setTimeout(function() {
            $("#page-projects .row .projects-title").removeClass("fade-out-left");
        }, 10);
    }, 800);
}