$(document).ready(function () {
    $(".hire-me").click(function () {
        return $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 500), !1
    }); $("ul.nav-pills li a").click(function () {
        $("ul.nav-pills li.active").removeClass("active"), $(this).parent("li").addClass("active")
    }); $("#main-menu").onePageNav({
        currentClass: "active",
        changeHash: !1,
        scrollThreshold: .5,
        scrollSpeed: 750,
        filter: "",
        easing: "swing"
    }); $('.magnific-popup').magnificPopup({
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
    }); // sending mail
    var form = $('#contact-form'); // contact form
    var submit = $('#contact-button');  // submit button
    // form submit event
    form.on('submit', function(e) {
        e.preventDefault(); // prevent default form submit

        $.ajax({
            url: 'http://fc.isima.fr/~marquest/mail.php', // form action url
            type: 'POST', // form submit method get/post
            dataType: 'json', // request type html/json/xml
            data: form.serialize(), // serialize form data 
            beforeSend: function() {
                
            },
            success: function(data) {
                console.log(data);
                if(data.success) {
                } else {
                }
            },
            error: function(e) {
                
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