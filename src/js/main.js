/*
---- 2021.08.08
---- Kwon Jaeyoung
*/

var active = "#page-resume";
var timeout;
var maxpage = 2;
var loadpage = 0;
var loading_per = 0;
var loadcomplete = 0;
var state = { 'active': active };

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
});

var galleryButtonClick = function() {
    $('.gal-con').on('click', function(){

        history.pushState({page: 2}, "title 2", "/pf");
        active = "#page-portfolio";
        
        $('.lo-con')
            .css('opacity','0')
            .css('transition','.5s');

        timeout = setTimeout(function() {

            $('.lo-con').hide();
            $('.lo-con').css('transition','0s');
            
            $(active + " .lo-con").show();

        }, 500);

        timeout = setTimeout(function() {

            $(active + " .lo-con")
                .css('opacity','1')
                .css('transition','1s');

            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);

        }, 600);
        
    });
}

$('.lo-con').hide();
$('.lo-con').css('transition','0s');

$(active + " .lo-con").show();

$(active + " .lo-con").on('load', function() { 
    $(active + " .lo-con")
    .css('opacity','1')
    .css('transition','2s');
})

var showLoading = function() {

    var frame 

    frame = setTimeout(function() {
        if (loading_per < 99) {
            if (loading_per < (loadpage/maxpage) * 100) {
                loading_per += 1;
                showLoading();
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }, 10);

    $(".loader").html("<p>" + loading_per + "%</p>");

}

var hideLoading = function() {
    // loader Hide
    $('.loader')
        .css('opacity','0')
        .css('transition','.2s');
}

var showPage = function() {

    // lo-con Hide
    $('.lo-con').css('opacity','0');
    $('.lo-con').hide();

    $(active + " .lo-con").show();

    timeout = setTimeout(function() {

        $(active + " .lo-con")
            .css('opacity','1')
            .css('transition','1s');

    }, 100);
    //console.log(active);

}

var loadpageChecker = () => {

    if (loadpage < 2) {
        // lo-con Hide
        $('.lo-con').css('opacity','0');
        $('.lo-con').hide();
    } else {
        // lo-con Hide
        $('.lo-con').css('opacity','0');
        $('.lo-con').hide();
        loadcomplete = 1;
        galleryButtonClick();
        $("img").on('load', function() {
            loading_per = 100;
            hideLoading();
            showPage();
            $(".loader").html("<p>" + loading_per + "%</p>");
        });

    }
    showLoading();
}

window.addEventListener('popstate', function () {

});

(function ($) {

    $(document).ready(function() {

    });
    
})(jQuery);