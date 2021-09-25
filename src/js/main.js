/*
---- 2021.08.08
---- Kwon Jaeyoung
*/
'use strict'; // Show Error Message With Console

var galleryRefresh;
var active          = "#page-resume";
var activeGallery   = 0;
var timeout;
var maxpage         = 10;
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

var portfolioSubPage;
var portfolioVideoIndex;
var portfolioUrl;
var portfolioSubTitle;
var portfolioSubVideo;

portfolioSubPage        = [
    "#page-dr3",
    "#page-dr2",
    "#page-tud",
    "#page-mk",
    "#page-wbh2",
    "#page-wbh",
    "#page-vm",
    "#page-tol"
];

portfolioVideoIndex     = [];

portfolioUrl            = [
    "/pf/DungeonRpg3",
    "/pf/DungeonRpg2",
    "/pf/TheUnknownDungeon",
    "/pf/MicroKingdom",
    "/pf/WayBackHome2",
    "/pf/WayBackHome",
    "/pf/VendingMachine",
    "/pf/TypingOfLegend"
];

portfolioSubTitle       = [
    "- Dungeon Rpg 3 ",
    "- Dungeon Rpg 2 ",
    "- The Unknown Dungeon ",
    "- Micro Kingdom ",
    "- Way Back Home 2 ",
    "- Way Back Home ",
    "- Vending Machine ",
    "- Typing Of Legend "
];

portfolioSubVideo       = [
    ["#video-dr3inst", "#video-dr3creator", "#video-dr3HM"],
    [],
    ["#video-tuddemo"],
    [],
    [],
    [],
    [],
    [],
]

let imgNames = [
    "images/bookDr2Backcover.png",
    "images/bookDr2Side.png",
    "images/bookDr2Title.png",

    "images/bookDr3Backcover.png",
    "images/bookDr3Side.png",
    "images/bookDr3Title.png",

    "images/bookMKBackcover.png",
    "images/bookMKSide.png",
    "images/bookMKTitle.png",

    "images/bookTOLBackcover.png",
    "images/bookTOLSide.png",
    "images/bookTOLTitle.png",

    "images/bookTUDBackcover.png",
    "images/bookTUDSide.png",
    "images/bookTUDTitle.png",

    "images/bookVMBackcover.png", 
    "images/bookVMSide.png",
    "images/bookVMTitle.png",

    "images/bookWBHBackcover.png",
    "images/bookWBHSide.png",
    "images/bookWBHTitle.png",

    "images/bookWBH2Backcover.png",
    "images/bookWBH2Side.png",
    "images/bookWBH2Title.png"
]

let imgFiles = new Array();
for (let i=0; i<imgNames.length; i++) {
    imgFiles[i] = new Image();
    imgFiles[i].src = imgNames[i];
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

var pfVideoSet = function() {
    var videoIndex  = [];
    var indexnum    = 0;
    for(var i = 0; i < 8; i ++)
        for(var j = 0; j < portfolioSubVideo[i].length; j ++) {
            videoIndex[indexnum] = $(portfolioSubVideo[i][j]);
            indexnum++;
        }

    console.log(indexnum);
    return videoIndex;
}

var pfVideoShow = function() {
    console.log(portfolioVideoIndex.length);
    for (var i = 0; i < portfolioVideoIndex.length; i ++) {
        $('.video:eq('+(i)+')').append(portfolioVideoIndex[i]);
    }
}

var pfVideoReset = function() {
    portfolioVideoIndex = pfVideoSet();
    $('.video').empty();
    pfVideoShow();
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
            if(!wcs_add) var wcs_add = {};
            wcs_add["wa"] = "5f6425de4b92ec";
            if(window.wcs) {
                wcs_do();
            }
        }, 2000);
    }

    $(active + " .lo-con").show();

    timeout = setTimeout(function() {

        $(active + " .lo-con")
            .css('opacity','1')
            .css('transition','1s');
        window.scrollTo(0, 0);
        console.log(1);

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
            $(".gal-con:nth-of-type("+(index+1)+")").on('click', function() {
                // Resume -> Portfolio -> Subpage
                jQuery('html > head > title').text(mainTitle + portfolioTitle);
                history.pushState({page: 2, data: 0}, "title 2", "/pf");
                if(!wcs_add) var wcs_add = {};
                wcs_add["wa"] = "5f6425de4b92ec";
                if(window.wcs) {
                    wcs_do();
                }

                active = portfolioSubPage[index];
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