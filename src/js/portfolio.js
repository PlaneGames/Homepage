var i = 0;
var subpage = 0;

var scrollReady     = 0;
var scrollMode      = 0;
var switching_spd   = 1.5;

/*
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
*/
/*
secondHalf.addEventListener("mouseenter", () => {
  book.classList.add("rotateRight");
});

secondHalf.addEventListener("mouseout", () => {
  book.classList.remove("rotateRight");
});
*/
(function ($) {

    var timeout;
    
    var page_info = [
        ["#dr3", "#dr3-gameplay", "#dr3-gamedesign", "#dr3-development"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
    ];

    var cur_subpage = 0;
    //$('.book-con').hide();
    
    $(document).ready(function() {

        var openProjectPopup = function(index) {

            var img_index   = "nth-of-type("+(index+1)+")";

            //clearTimeout(timeout);

            $('.lo-gallery-header')
                .css('opacity','0')
                //.css('width','0px')
                //.css('height','0px')
                .css('padding','0px')
                .css('margin','0px')
                .css('transition','1s');
            $('.lo-gallery-header h1')
                .css('height','0px')
                .css('padding','0px')
                .css('margin','0px')
                .css('transition','1s');

            $('.port-img').not('.port-img:'+img_index)
                .css('opacity','.0')
                .css('transition','1s')
                //.css('height','0px')
                //.css('width','0px')
                .css('margin','0px');

            //$('.port-img:'+img_index)
                //.css('min-width','160px')
                //.css('max-width','20vw')
                //.css('width','320px')
                //.css('min-height','240px')
                //.css('height','30vw')
                //.css('max-height','480px');

            timeout = setTimeout(function() {
                $('.lo-gallery-header').hide();
                $('.port-img').not('.port-img:'+img_index).hide();
                //$('.book-con').show();
            }, 1000);
        
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