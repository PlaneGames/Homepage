var i               = 0;
var subpage         = 0;

var scrollReady     = 0;
var scrollMode      = 0;
var switching_spd   = 1.5;

var book            = document.querySelector(".book");
var bookcover       = document.querySelector(".book-cover");
var bookopen        = 0;

var gallerySelect   = -1;

const clamp         = (num, min, max) => Math.min(Math.max(num, min), max);

/*
book.addEventListener("click", () => {
    book.classList.toggle("flip");
});

bookcover.addEventListener("mouseenter", () => {
    book.classList.add("rotateRight");
});

bookcover.addEventListener("mouseout", () => {
    book.classList.remove("rotateRight");
});
*/

$(window).on('orientationchange', function() {
    //$('.port-img').css('transition','0s');
    $(window).one('resize', function() {
        //$('.port-img').css('transition','.4s');
    });
});

var book_img = [
    ["bookDr3Title", "DungeonRpg3", "bookDr3Side", "bookDr3Backcover"],
    ["bookDr2Title", "DungeonRpg2", "bookDr2Side", "bookDr2Backcover"],
    ["bookTUDTitle", "TUDCutscene", "bookTUDSide", "bookTUDBackcover"],
    ["bookMKTitle", "MicroCastle", "bookMKSide", "bookMKBackcover"],
    ["bookWBH2Title", "WayBackHome2", "bookWBH2Side", "bookWBH2Backcover"],
    ["bookWBHTitle", "WayBackHome", "bookWBHSide", "bookWBHBackcover"],
    ["bookVMTitle", "VendingMachine", "bookVMSide", "bookVMBackcover"],
    ["bookTOLTitle", "TypingOfLegend", "bookTOLSide", "bookTOLBackcover"],
];

(function ($) {
    
    var timeout;
    var cur_subpage = 0;
    var clearTimeoutAll = function() {
        var highestTimeoutId = setTimeout(";");
            for (var i = 0 ; i < highestTimeoutId ; i++) {
            clearTimeout(i);
        }
    }

    $(document).ready(function() {

        //#region  --- Book Side Cover Sizing ---

        var bookWidth = clamp(160, $('.book-cover').width(), 320);

        function vw(v) {
            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            return (v * w) / 100;
        }

        function vh(v) {
            var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            return (v * h) / 100;
        }

        var bookResizing = function() {
            bookWidth = clamp(160, vw(20), 320);
            $('.back-cover')
                .css('transform','rotateY(180deg) translateZ('+bookWidth/5+'px)');
            $('.front-lcover')
                .css('transform','rotateY(-90deg) translateX(-'+bookWidth/5+'px)');
        }

        //#endregion

        //#region  --- Gallery Button Selecting ---

        var galleryHover = function(n) {
            var index = "nth-of-type("+(n+1)+")";
            if (galleryMode == 0) {
                if (window.innerWidth >= 700) {
                    $('.port-img:'+index)
                        .css('height','25vw')
                        .css('max-height','380px')
                        .css('opacity','1')
                        .css('filter','grayscale(0%)');
                } else {
                    $('.port-img:'+index)
                        .css('width','90%')
                        .css('max-width','90%')
                        .css('opacity','1')
                        .css('filter','grayscale(0%)');
                }
            }
        }

        var galleryUnHover = function(n) {
            var index = "nth-of-type("+(n+1)+")";
            if (galleryMode == 0) {
                if (window.innerWidth >= 700) {
                    $('.port-img:'+index)
                        .css('height','20vw')
                        .css('max-height','320px')
                        .css('opacity','.6')
                        .css('filter','grayscale(90%)');
                } else {
                    $('.port-img:'+index)
                        .css('width','440px')
                        .css('max-width','80%')
                        .css('opacity','.6')
                        .css('filter','grayscale(90%)');
                }
            }
        }

        var galleryResize = function() {
            if (galleryMode == 0) {
                if (window.innerWidth >= 700) {
                    $('.lo-gallery-header')
                        .css('height','40vw')
                        .css('max-height','640px');

                    $('.lo-gallerybox')
                        .css('height','25vw')
                        .css('max-height','380px');

                    $('.port-img')
                        .css('min-width','0px')
                        .css('min-height','0px')
                        .css('width','10vw')
                        .css('height','20vw')
                        .css('max-width','160px')
                        .css('max-height','320px')
                        .css('margin','.5vw')
                        .css('opacity','0.6')
                        .css('filter','grayscale(90%)');
                } else {
                    $('.lo-gallery-header')
                        .css('height','100%')
                        .css('max-height','100%');

                    $('.lo-gallerybox')
                        .css('height','100%')
                        .css('max-height','100%');

                    $('.port-img')
                        .css('min-width','0px')
                        .css('min-height','0px')
                        .css('width','440px')
                        .css('height','8vh')
                        .css('max-width','80%')
                        .css('min-height','8vh')
                        .css('max-height','8vh')
                        .css('margin','.3vh')
                        .css('opacity','0.6')
                        .css('filter','grayscale(90%)');
                }
            }
        }

        var galleryCentering = function(index) {

            if (galleryMode == 0 && index != -1) {

                var mIndex = index - 4,
                    imgSize,
                    Mside,
                    margin,
                    xx,
                    yy;

                if (window.innerWidth >= 700) {
                    Mside = vw(1);
                    imgSize = Math.min(vw(10), 160) + Mside;
                    margin = -(imgSize * mIndex) - (imgSize/2);
                    xx = margin, yy = 0;
                } else {
                    Mside = vh(.6);
                    imgSize = vh(8) + Mside;
                    margin = -(imgSize * mIndex) - (imgSize/2);
                    xx = 0, yy = margin;
                }

                 $('.port-imgcon')
                    .css('transform','translate('+xx+'px,'+yy+'px');

            }

        }

        galleryResize();

        var openProjectPopup = function(index) {

            var bookSetting = function(index) {
                $('.book-title')
                    .css('background-image','url("../src/images/'+book_img[index][0]+'.png")');
                $('.book-cover')
                    .css('background-image','url("../src/images/'+book_img[index][1]+'.png")');
                $('.front-lcover')
                    .css('background-image','url("../src/images/'+book_img[index][2]+'.png")');
                $('.back-cover')
                    .css('background-image','url("../src/images/'+book_img[index][3]+'.png")');
            }
    
            var galleryHeaderSetting = function() {
                $('.lo-gallery-header')
                    .css('opacity','0')
                    .css('transition','.5s');
            }
    
            var galleryBoxSetting = function() {
                $('.lo-gallerybox')
                    .css('transition','.5s')
                    .css('min-height','240px')
                    .css('height','30vw')
                    .css('max-height','480px');
            }

            var bookOpenSetting = function() {
                bookopen = 1;
                $('.book-con')
                    .css('display','flex');
                book.classList.remove("rotateRight");
                book.classList.remove("flip");
                timeout = setTimeout(function() {
                    if (galleryMode != 0) {
                        var img_index   = "nth-of-type("+(index+1)+")";
                        $('.book-con')
                            .css('transition','.0s')
                            .css('opacity','1');
                        $('.book-title')
                            .css('transition','.5s')
                            .css('opacity','1');
                        $('.port-img:'+img_index)
                            .css('transition','.0s')
                            .css('opacity','0');
                        book.classList.toggle("rotateRight");
                    } else {
                        return;
                    }
                }, 500);
                timeout = setTimeout(function() {
                    if (galleryMode != 0) {
                        book.classList.remove("rotateRight");
                        book.classList.toggle("flip");
                    } else {
                        return;
                    }
                }, 1500);
                timeout = setTimeout(function() {
                    if (galleryMode != 0) {
                        $('.port-img')
                            .css('transition','.5s')
                            .hide();
                        $('.book-con')
                            .css('transition','.5s')
                            .css('opacity','0');
                    } else {
                        return;
                    }
                }, 2000);
                timeout = setTimeout(function() {
                    if (galleryMode != 0) {
                        active = "#page-dr3";
                        showPage();
                        pfVideoReset(index);
                    } else {
                        return;
                    }
                }, 2300);
            }

            var selectedGallerySetting = function(index) {
                var img_index   = "nth-of-type("+(index+1)+")";
                $('.port-img').not('.port-img:'+img_index)
                    .css('transition','.3s')
                    .css('opacity','0');
                timeout = setTimeout(function() {
                    if (galleryMode != 0) {
                        $('.port-imgcon').css('transform','translate(0px, 0px)');
                        $('.port-imgcon').css('transition','0s');
                        $('.port-img').not('.port-img:'+img_index).hide();

                        $('.port-img:'+img_index)
                            .css('transition','.5s')
                            .css('min-width','160px')
                            .css('min-height','240px')
                            .css('width','20vw')
                            .css('height','30vw')
                            .css('max-width','320px')
                            .css('max-height','480px')
                            .css('opacity','1')
                            .css('filter','grayscale(40%)');
                        bookOpenSetting();
                    } else {
                        return;
                    }
                }, 700);
            }

            clearTimeoutAll();

            galleryResize();
            activeGallery = 1;

            bookSetting(index);
            galleryHeaderSetting();
            galleryBoxSetting();
            selectedGallerySetting(index);
            bookResizing();

        }

        var closeProjectPopup = function(index) {

            var galleryHeaderSetting = function() {
                $('.lo-gallery-header')
                    .css('opacity','1')
                    .css('transition','.5s');
            }
            var bookCloseSetting = function() {
                book.classList.remove("rotateRight");
                book.classList.remove("flip");
                $('.book-title')
                    .css('transition','.5s')
                    .css('opacity','0');
                $('.book-con')
                    .css('transition','.5s')
                    .css('opacity','0')
                    .css('display','none');
            }
            var pageChangeSetting = function() {
                if (active != "#page-portfolio") {
                    $('.lo-con')
                        .css('opacity','0')
                        .css('transition','.5s');
                    $('.port-img').show();
                    $('.port-img')
                        .css('transition','.5s');
                    timeout = setTimeout(function() {
                        active = "#page-portfolio";
                        showPage();
                        pfVideoReset(index);
                        galleryResize();
                        _galleryRefresh();
                        gallerySelect = -1;
                    }, 500);
                } else {
                    var img_index   = "nth-of-type("+(index+1)+")";
                    $('.port-img:'+img_index).show();
                    $('.port-img:'+img_index)
                        .css('opacity','1')
                        .css('transition','.5s');
                    galleryResize();    // 이 구간에서 레이아웃 업데이트 단계 실행으로 인한 성능 저하 발생.
                    galleryCentering(index);
                    $('.port-imgcon').css('transition','.0s');
                    $('.port-img').show();
                    $('.port-img').not('.port-img:'+img_index)
                        .css('opacity','0')
                        .css('transition','.0s');
                    $('.port-imgcon').css('transition','.5s');
                    $('.port-img')
                        .css('opacity','0.6')
                        .css('transition','.5s');
                    timeout = setTimeout(function() {
                        galleryCentering(3.5);
                        gallerySelect = -1;
                    }, 600);
                }
            }

            clearTimeoutAll();
            activeGallery = 0;
            galleryMode = 0;
            
            galleryHeaderSetting();
            bookCloseSetting();
            pageChangeSetting();
            
        }

        var clickEvent = (function() {
            if ('ontouchstart' in document.documentElement === true) {
                return 'touchstart';
            } else {
                return 'click';
            }
        })();

        var galleryButton = function(index) {
            var checkAble = subpageDirect <= 0 && galleryMode == 0 && gallerySelect == -1;
            $(".port-img:nth-of-type("+(index+1)+")").on(clickEvent, function(){
                checkAble = subpageDirect <= 0 && galleryMode == 0 && gallerySelect == -1;
                if (checkAble) {
                    galleryCentering(index);
                    galleryMode = 1;
                    jQuery('html > head > title').text('PLANE | Portfolio ' + portfolioSubTitle[index]);
                    history.pushState({page: 2, data: (index+1)}, "", portfolioUrl[index]);
                    openProjectPopup(index);
                    gallerySelect = index;
                }
            });
            
            $(".port-img:nth-of-type("+(index+1)+")").on('mouseenter', function(){
                checkAble = subpageDirect <= 0 && galleryMode == 0 && gallerySelect == -1;
                if (checkAble) {
                    if (clickEvent != 'touchstart')
                        galleryHover(index);
                }
            });
            $(".port-img:nth-of-type("+(index+1)+")").on('mouseout', function(){
                checkAble = subpageDirect <= 0 && galleryMode == 0 && gallerySelect == -1;
                if (checkAble) {
                    galleryUnHover(index)
                }
            });

        }

        for(var i = 0; i < 8; i ++) {
            galleryButton(i);
        }

        var _galleryRefresh = function() {
            //galleryHover(7);
            galleryCentering(7);
            var refreshTime = setTimeout(function() {
                galleryCentering(3.5);
                galleryResize();
            }, 700);
        }

        galleryRefresh = _galleryRefresh;
        _openProjectPopup = openProjectPopup;
        _galleryCentering = galleryCentering;

        //#endregion

        //#region  --- Project Setting ---
        var poConResizing = function(w, h, maxw, maxh, dire) {
            $('.po-con')
                .css('width',w)
                .css('max-width',maxw)
                .css('height',h)
                .css('max-height',maxh)
                .css('flex-direction',dire);
        }

        var projectResizing = function() {
            var margin_w = 32;
            var margin_h = 16;
            if (galleryMode >= 1) {
                if (window.innerWidth >= 760) {
                    poConResizing(vw(100)-margin_w+'px', vw(50)-margin_h+'px', '1000px', '500px', 'row');

                    $('.po-subbox h3')
                        .css('margin-bottom','32px')
                        .css('margin-top','32px');

                    if (window.innerWidth <= 800) {
                        $('.po-subbox p')
                            .css('margin','0px')
                            .css('font-size','11px');
                        $('.po-titlesidebar')
                            .css('border','none');
                    } else if (window.innerWidth <= 880) {
                        $('.po-subbox p')
                            .css('margin','8px')
                            .css('font-size','11px');
                        $('.po-titlesidebar')
                            .css('border-left','12px solid rgba(0, 0, 0, 0.2)')
                            .css('border-right','12px solid rgba(0, 0, 0, 0.2)');
                    } else {
                        $('.po-subbox p')
                            .css('margin','16px')
                            .css('font-size','12px');
                        $('.po-titlesidebar')
                            .css('border-left','16px solid rgba(0, 0, 0, 0.2)')
                            .css('border-right','16px solid rgba(0, 0, 0, 0.2)');
                    }
                    
                    $('.po-pr1').css('order','0');
                    $('.po-pr2').css('order','0');
                    $('.po-pr3').css('order','0');
                    $('.po-pr4').css('order','0');
                    $('.po-h50')
                        .css('height',vw(25)-margin_h/2+'px')
                        .css('max-height','250px');
                        
                    $('.po-pr-w50-w100').css('width','50%');
                    $('.po-pr-w92-w100').css('width','92%');
                    $('.po-pr-h100-h50').css('height','100%');
                    $('.po-pr-h49-auto').css('height','49%');
                    $('.po-pr-h49-h48').css('height','49%');
                    $('.po-pr-h100-auto').css('height','100%');
                    $('.po-pr-show-hide').css('display','block');
                } else {
                    poConResizing(vw(100)-margin_w/2+'px', 'auto', '1000px', '2000px', 'column');

                    $('.po-subbox h3')
                        .css('margin-bottom','32px')
                        .css('margin-top','48px');
                    $('.po-subbox p')
                        .css('margin','0px')
                        .css('margin-bottom','32px')
                        .css('margin-top','32px')
                        .css('font-size','12px');
                        
                    $('.po-pr1').css('order','1')
                    $('.po-pr2').css('order','2')
                    $('.po-pr3').css('order','3')
                    $('.po-pr4').css('order','4')

                    $('.po-h50')
                        .css('height',vw(50)-margin_h/2+'px')
                        .css('max-height',vw(50)-margin_h/2+'px');
                    $('.po-pr-w50-w100').css('width','100%');
                    $('.po-pr-w92-w100').css('width','100%');
                    $('.po-pr-h100-h50').css('height',vw(50)-margin_h/2+'px');
                    $('.po-pr-h49-h48').css('height','48%');
                    $('.po-pr-h49-auto').css('height','auto');
                    $('.po-pr-h100-auto').css('height','auto');

                    $('.po-titlesidebar')
                        .css('border','none');
                }
            }
        }

        //#endregion

        window.addEventListener('resize', function () {
            bookResizing();
            galleryResize();
            projectResizing();
            if (gallerySelect >= 0)
                galleryCentering(gallerySelect);
            else
                galleryCentering(3.5);
        });

        window.onpopstate = function(event) {
            if (event.state.page == 1) {
                active = "#page-resume";
                jQuery('html > head > title').text(mainTitle + resumeTitle);
                showPage();
            } else {
                var _data = history.state.data;
                if (_data > 0) {
                    jQuery('html > head > title').text(mainTitle + portfolioTitle + portfolioSubTitle[_data-1]);
                    galleryCentering(_data-1);
                    galleryMode = 1;
                    openProjectPopup(_data-1);
                    gallerySelect = _data-1;
                } else {
                    jQuery('html > head > title').text(mainTitle + portfolioTitle);
                    if (activeGallery == 0) {
                        active = "#page-portfolio";
                        showPage();
                    } else {
                        closeProjectPopup(gallerySelect);
                    }
                }
            }
        }

    });

})(jQuery);