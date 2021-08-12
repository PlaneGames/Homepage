var i = 0;
var subpage = 0;

var scrollReady     = 0;
var scrollMode      = 0;
var switching_spd   = 1.5;
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

var book = document.querySelector(".book");
var bookcover = document.querySelector(".book-cover");

console.log(book);

book.addEventListener("click", () => {
  book.classList.toggle("flip");
  console.log(123455);
});

bookcover.addEventListener("mouseenter", () => {
  book.classList.add("rotateRight");
  console.log(123455);
});

bookcover.addEventListener("mouseout", () => {
  book.classList.remove("rotateRight");
});

/*
secondHalf.addEventListener("mouseenter", () => {
  book.classList.add("rotateRight");
});

secondHalf.addEventListener("mouseout", () => {
  book.classList.remove("rotateRight");
});
*/

$(window).on('orientationchange', function() {

    $('.port-img').css('transition','0s');
    $(window).one('resize', function() {
        $('.port-img').css('transition','.4s');
    });

});

(function ($) {
    
    var timeout;

    var cur_subpage = 0;
    //$('.book-con').hide();

    $(document).ready(function() {

        /* --- Book Side Cover Sizing --- */

        var bookWidth = clamp(160, $('.book-cover').width(), 320);
        
        var bookResizing = function() {
            bookWidth = clamp(160, $('.book-cover').width(), 320);
            $('.back-cover')
                .css('transform','rotateY(180deg) translateZ('+bookWidth/5+'px)')
        }

        window.addEventListener('resize', function () {
            bookResizing();
        });
        
        /* --- Gallery Button Selecting --- */

        var openProjectPopup = function(index) {

            bookResizing();
            
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
                    .css('display','flex');
            }, 2000);

        }

        var galleryButton = function(index) {
            $(".port-img:nth-of-type("+(index+1)+")").on('click', function(){
                openProjectPopup(index);
            });
        }

        for(var i = 0; i < 8; i ++) {
            galleryButton(i);
        }

    });

})(jQuery);