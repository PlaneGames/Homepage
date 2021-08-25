var i               = 0;
var subpage         = 0;

var scrollReady     = 0;
var scrollMode      = 0;
var switching_spd   = 1.5;

var galleryMode     = 0;
var book            = document.querySelector(".book");
var bookcover       = document.querySelector(".book-cover");

const clamp         = (num, min, max) => Math.min(Math.max(num, min), max);

book.addEventListener("click", () => {
    book.classList.toggle("flip");
});

bookcover.addEventListener("mouseenter", () => {
    book.classList.add("rotateRight");
});

bookcover.addEventListener("mouseout", () => {
    book.classList.remove("rotateRight");
});

$(window).on('orientationchange', function() {
    $('.port-img').css('transition','0s');
    $(window).one('resize', function() {
        $('.port-img').css('transition','.4s');
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

var galleryRefresh;

(function ($) {
    
    var timeout;
    var cur_subpage = 0;

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

        var gallerySelect = -1;

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
                        .css('height','8vh')
                        .css('opacity','1')
                        .css('filter','grayscale(0%)');
                }
                console.log("Hover Gallery");
            }
        }

        var galleryResize = function() {
            if (galleryMode == 0) {
                if (window.innerWidth >= 700) {
                    $('.lo-gallerybox')
                        .css('height','25vw')
                        .css('max-height','380px');

                    $('.port-img')
                        .css('width','10vw')
                        .css('height','20vw')
                        .css('max-width','160px')
                        .css('max-height','320px')
                        .css('margin','.5vw')
                        .css('opacity','0.7')
                        .css('filter','grayscale(90%)');
                } else {
                    $('.lo-gallerybox')
                        .css('height','100%')
                        .css('max-height','100%');

                    $('.port-img')
                        .css('width','440px')
                        .css('height','8vh')
                        .css('max-width','80%')
                        .css('min-height','8vh')
                        .css('max-height','8vh')
                        .css('margin','.3vh')
                        .css('opacity','0.7')
                        .css('filter','grayscale(90%)');
                }
            }
        }

        var galleryCentering = function(index) {

            if (galleryMode == 0 && index != -1) {
                var mIndex = index - 4,
                    imgSize = Math.min(vw(10), 160),
                    mType = '',
                    Mside = vw(2),
                    margin = 0;

                if (window.innerWidth >= 700) {

                    imgSize = Math.min(vw(10), 160);
                    Mside = vw(2);
                    if (mIndex < 0) {
                        mType = 'margin-right';
                        margin = (imgSize * 2 + Mside) * mIndex + (imgSize + Mside/2);
                    } else {
                        mType = 'margin-left';
                        margin = -((imgSize * 2 + Mside) * mIndex) - (imgSize + Mside/2);
                    }

                } else {

                    imgSize = vh(8);
                    Mside = vh(1.2);
                    if (mIndex < 0) {
                        mType = 'margin-bottom';
                        margin = (imgSize * 2 + Mside) * mIndex + (imgSize + Mside/2);
                    } else {
                        mType = 'margin-top';
                        margin = -((imgSize * 2 + Mside) * mIndex) - (imgSize + Mside/2);
                    }

                }

                console.log(imgSize);

                $('.port-imgcon').css('margin','0px');
                $('.port-imgcon').css(mType,''+margin+'px');
            }

        }

        galleryRefresh = galleryCentering;
        galleryResize();

        var openProjectPopup = function(index) {

            activeGallery = 1;
            console.log("Open Gallery Popup");

            bookResizing();
            clearTimeout(timeout);
            history.pushState({page: 2, data: 1}, "", "/pf/DungeonRpg3");
            console.log(history.state.data);
            $('.book-title')
                .css('background-image','url("../src/images/'+book_img[index][0]+'.png")');
            $('.book-cover')
                .css('background-image','url("../src/images/'+book_img[index][1]+'.png")');
            $('.front-lcover')
                .css('background-image','url("../src/images/'+book_img[index][2]+'.png")');
            $('.back-cover')
                .css('background-image','url("../src/images/'+book_img[index][3]+'.png")');

            console.log(book_img[index]);

            var img_index   = "nth-of-type("+(index+1)+")";

            $('.port-img').not('.port-img:'+img_index)
                .css('transition','.5s')
                .css('opacity','0');

            $('.lo-gallery-header')
                .css('animation-name','closeGalleryHeader')
                .css('animation-duration','.5s');

            $('.lo-gallery-header h1')
                .css('animation-name','closeGalleryHeader')
                .css('animation-duration','.5s');

            timeout = setTimeout(function() {
                $('.lo-gallery-header').hide();

                $('.port-img').not('.port-img:'+img_index)
                    .css('visibility','hidden')
                    .css('animation-name','closeGallery')
                    .css('animation-duration','1s');
            }, 500);
            timeout = setTimeout(function() {
                $('.port-img:'+img_index)
                    .css('animation-name','scaleBook')
                    .css('animation-duration','1s')
                    .css('opacity','1')
                    .css('filter','grayscale(40%)');
            }, 1000);
            timeout = setTimeout(function() {
                $('.port-img').hide();
                $('.book-con')
                    .css('display','flex')
                    .css('opacity','1');
            }, 2000);
            timeout = setTimeout(function() {
                $('.book-title')
                    .css('transition','1s')
                    .css('opacity','1');
            }, 2100);
            timeout = setTimeout(function() {
                $('.book-con')
                    .css('transition','1s')
                    .css('opacity','0');
            }, 3100);

            timeout = setTimeout(function() {
                active = "#page-dr3";
                showPage();
                projectResizing();
            }, 4100);

        }

        var closeProjectPopup = function(index) {

            console.log("Close Gallery Popup");
            galleryMode = 0;
            //var img_index   = "nth-of-type("+(index+1)+")";

            clearTimeout(timeout);

            $('.book-title')
                .css('transition','.5s')
                .css('opacity','0');
            timeout = setTimeout(function() {
                $('.book-con')
                    .css('transition','.5s')
                    .css('opacity','0')
            }, 500);
            timeout = setTimeout(function() {
                $('.book-con')
                    .css('opacity','1')
                    .css('display','none');
            }, 1000);
            timeout = setTimeout(function() {
                $('.port-img').show()
                    .css('visibility','visible')
                    .css('animation-name','none')
                    .css('transition','0s')
                    .css('opacity','0')
                    .css('filter','grayscale(90%)');
            }, 1000);
            timeout = setTimeout(function() {
                $('.port-img')
                    .css('transition','1s')
                    .css('opacity','1');
                galleryResize();
            }, 1050);

        }

        var galleryButton = function(index) {
            $(".port-img:nth-of-type("+(index+1)+")").on('click', function(){
                //openProjectPopup(index);
                //galleryMode = 1;
                galleryCentering(index);
                gallerySelect = index;
                //history.pushState({page: 2, data: index}, "title 1", "/pf/"+book_img[index][1]);
            });
            $(".port-img:nth-of-type("+(index+1)+")").on('mouseenter', function(){
                galleryHover(index);
            });
            $(".port-img:nth-of-type("+(index+1)+")").on('mouseout', function(){
                galleryResize();
            });
            $(".port-img:nth-of-type("+(index+1)+")").click();
        }

        for(var i = 0; i < 8; i ++) {
            galleryButton(i);
        }

        $('.port-imgcon')
            .css('margin-left','100%')
            .css('margin-right','100%')
            .css('margin-up','100%')
            .css('margin-down','100%');

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
            galleryCentering(gallerySelect);
        });

        window.onpopstate = function(event) {
            if (event.state.page == 1) {
                active = "#page-resume";
                showPage();
            } else {
                active = "#page-portfolio";
                if (activeGallery == 0)
                    showPage();
                else {
                    closeProjectPopup(0);
                }
            }
        }

    });

})(jQuery);