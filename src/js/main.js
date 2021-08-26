/*
---- 2021.08.08
---- Kwon Jaeyoung
*/
'use strict'; // Show Error Message With Console

var galleryRefresh;
var active = "#page-resume";
var activeGallery = 0;
var timeout;
var maxpage = 3;
var loadpage = 0;
var loading_per = 0;
var loadcomplete = 0;
var galleryMode     = 0;
var subpageDirect = 0;

var galleryButtonClick = function() {

    $('.gal-con').on('click', function(){

        history.pushState({page: 2}, "title 2", "/pf");
        console.log(history.state);
        active = "#page-portfolio";
        
        $('.lo-con')
            .css('opacity','0')
            .css('transition','.5s');

        timeout = setTimeout(function() {

            $('.lo-con').hide();
            $('.lo-con').css('transition','0s');
            
            $(active + " .lo-con").show();
            galleryRefresh();

        }, 500);

        timeout = setTimeout(function() {

            $(active + " .lo-con")
                .css('opacity','1')
                .css('transition','1s');

        }, 1000);
        
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

    if (active == "#page-dr3" && subpageDirect >= 1) {
        active = "#page-portfolio";
        timeout = setTimeout(function() {
            _galleryCentering(0);
            galleryMode = 1;
            _openProjectPopup(0);
            gallerySelect = index;
        }, 2000);
    }

    $(active + " .lo-con").show();

    timeout = setTimeout(function() {

        $(active + " .lo-con")
            .css('opacity','1')
            .css('transition','1s');

    }, 700);

    if (active == "#page-portfolio") {
        galleryRefresh();
    }
}

var loadpageChecker = () => {

    if (loadpage < maxpage) {
        // lo-con Hide
        $('.lo-con').css('opacity','0');
        $('.lo-con').hide();
    } else {
        // lo-con Hide
        $('.lo-con').css('opacity','0');
        $('.lo-con').hide();
        loadcomplete = 1;
        galleryButtonClick();
        $('.po-main').hide();
        $("img").on('load', function() {
            loading_per = 100;
            hideLoading();
            $(".loader").html("<p>" + loading_per + "%</p>");
        }); 
        showPage();
    }
    showLoading();
}

