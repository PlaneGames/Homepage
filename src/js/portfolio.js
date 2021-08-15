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
                        .css('height','100px')
                        .css('opacity','1')
                        .css('filter','grayscale(0%)');
                }
                console.log("Hover Gallery");
            }
        }

        var galleryResize = function() {
            if (galleryMode == 0) {
                if (window.innerWidth >= 700) {
                    $('.port-img')
                        .css('width','10vw')
                        .css('height','20vw')
                        .css('max-width','160px')
                        .css('max-height','320px')
                        .css('margin','.5%')
                        .css('opacity','0.7')
                        .css('filter','grayscale(90%)');
                } else {
                    $('.port-img')
                        .css('width','440px')
                        .css('height','100px')
                        .css('max-width','80%')
                        .css('max-height','20vh')
                        .css('margin','.3vh')
                        .css('opacity','0.7')
                        .css('filter','grayscale(90%)');
                }
            }
        }
        
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
                openProjectPopup(index);
                galleryMode = 1;
                //history.pushState({page: 2, data: index}, "title 1", "/pf/"+book_img[index][1]);
            });
            $(".port-img:nth-of-type("+(index+1)+")").on('mouseenter', function(){
                galleryHover(index);
            });
            $(".port-img:nth-of-type("+(index+1)+")").on('mouseout', function(){
                galleryResize();
            });
        }

        for(var i = 0; i < 8; i ++) {
            galleryButton(i);
        }

        //#endregion

        //#region  --- Project Setting ---

        var projectResizing = function() {
            if (galleryMode >= 1) {
                if (window.innerWidth >= 700) {
                    $('.po-con')
                        .css('width','80vw')
                        .css('max-width','1000px')
                        .css('height','40vw')
                        .css('max-height','500px')
                        .css('flex-direction','row');
                    $('.po-box')
                        .css('width','50%')
                        .css('height','100%');

                    $('.po-pr1').css('order','0')
                    $('.po-pr2').css('order','0')
                    $('.po-pr3').css('order','0')
                    $('.po-pr4').css('order','0')
                } else {
                    $('.po-con')
                        .css('width','90vw')
                        .css('height','160vw')
                        .css('max-height','2000px')
                        .css('flex-direction','column');
                    $('.po-box')
                        .css('width','100%')
                        .css('height','50%');
                        
                    $('.po-pr1').css('order','1')
                    $('.po-pr2').css('order','2')
                    $('.po-pr3').css('order','3')
                    $('.po-pr4').css('order','4')
                }
            }
        }

        //#endregion

        window.addEventListener('resize', function () {
            bookResizing();
            galleryResize();
            projectResizing();
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