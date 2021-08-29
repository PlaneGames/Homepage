/*
---- 2021.08.08
---- Kwon Jaeyoung
*/
'use strict'; // Show Error Message With Console

var galleryRefresh;
var active          = "#page-resume";
var activeGallery   = 0;
var timeout;
var maxpage         = 3;
var loadpage        = 0;
var loading_per     = 0;
var loadcomplete    = 0;
var galleryMode     = 0;
var subpageDirect   = 0;
var _openProjectPopup;
var _galleryCentering;
var galleryButtonClick;

var mainTitle       = "PLANE | ";
var resumeTitle     = "Game Developer ";
var portfolioTitle  = "Portfolio "

var portfolioVideoIndex;
var portfolioUrl;
var portfolioSubTitle;
var portfolioSubVideo;

portfolioVideoIndex     = [];

portfolioUrl            = [
    "/pf/DungeonRpg3",
    "/pf/DungeonRpg2",
    "/pf/TheUnknownDungeon",
    "/pf/MicroCastle",
    "/pf/WayBackHome2",
    "/pf/WayBackHome",
    "/pf/VendingMachine",
    "/pf/TypingOfLegend"
];

portfolioSubTitle       = [
    "- Dungeon Rpg 3 ",
    "- Dungeon Rpg 2 ",
    "- The Unknown Dungeon ",
    "- Micro Castle ",
    "- Way Back Home 2 ",
    "- Way Back Home ",
    "- Vending Machine ",
    "- Typing Of Legend "
];

portfolioSubVideo       = [
    ["#video-dr3inst", "#video-dr3creator"],
    [""],
    [""],
    [""],
    [""],
    [""],
    [""],
    [""],
]

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

var pfVideoSet = function(index) {
    var maxIndex    = portfolioSubVideo[index].length;
    var videoIndex  = [maxIndex];
    for (var i = 0; i < maxIndex; i ++) {
        videoIndex[i] = $(portfolioSubVideo[index][i]);
    }
    return videoIndex;
}

var pfVideoShow = function(videoIndex) {
    var maxIndex    = videoIndex.length;
    for (var i = 0; i < maxIndex; i ++) {
        $('.video:eq('+(i)+')').append(videoIndex[i]);
    }
}

var pfVideoReset = function(index) {
    if (portfolioSubVideo[index][0] != "") {
        portfolioVideoIndex = pfVideoSet(index);
        $('.video').empty();
        pfVideoShow(portfolioVideoIndex);
    }
}

var showPage = function() {

    // lo-con Hide
    $('.lo-con').css('opacity','0');
    $('.lo-con').hide();

    if (subpageDirect >= 1) {
        active = "#page-portfolio";
        timeout = setTimeout(function() {
            _galleryCentering(subpageDirect-1);
            galleryMode = 1;
            jQuery('html > head > title').text(mainTitle + portfolioTitle + portfolioSubTitle[subpageDirect-1]);
            history.pushState({page: 2, data: (subpageDirect)}, "", portfolioUrl[subpageDirect-1]);
            _openProjectPopup(subpageDirect-1);
            gallerySelect = subpageDirect-1;
            subpageDirect = 0;
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
        for(var i = 0; i < 8; i ++) {
            galleryButtonClick(i);
        }
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

(function ($) {

    $(document).ready(function() {

        var _galleryButtonClick = function(index) {
            $(".gal-con:nth-of-type("+(index+1)+")").on('click', function(){
                // Resume -> Portfolio -> Subpage
                jQuery('html > head > title').text(mainTitle + portfolioTitle);
                history.pushState({page: 2, data: 0}, "title 2", "/pf");

                active = "#page-dr3";
                subpageDirect = index + 1;
                
                $('.lo-con')
                    .css('opacity','0')
                    .css('transition','.5s');

                timeout = setTimeout(function() {

                    showPage();

                }, 500);
                
            });
        }

        galleryButtonClick = _galleryButtonClick;
        
    });

})(jQuery);