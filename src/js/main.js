'use strict'; // Show Error Message With Console

var target = document.getElementsByClassName("port-imgcon")[0];    //배열의 주소를 반환하므로 해당 인자를 지정해야 한다.
var i = 0;
var subpage = 0;


var animation = target.animate([], 200);
animation.addEventListener('finish', function() {
    target.style.transition = '.5s';
});

var aa = 42;
var subpageChange = 0;
var scrollMode = 0;

// Mouse Wheel Process

let cursor;
let h1;
let x, y;

const mouseFunc = (e) => { 
    x = e.clientX, 
    y = e.clientY; 
    cursor.style.transform = `translate(${x}px, ${y}px)`; 
} 

window.onload = () => { 
    cursor = document.getElementsByClassName("cursor_con")[0]; 
    h1 = document.getElementsByTagName("h1")[0]; 
    document.addEventListener("mousemove", mouseFunc); 
}

(function ($) {

    $('body').mousedown(function(e){if(e.button==1)return false});
    $('body').css('cursor','none');

    var timeout;

    // resizing Overlay
    function resizing_overlay() {
        if (window.innerWidth*(66.675/100) <= window.innerHeight) {
            $('.po-con .overlay')
                .css('width','149.98125vh')
                .css('height','100vh');
        } else {
            $('.po-con .overlay')
                .css('width','100vw')
                .css('height','66.675vw');
        }
    }
    resizing_overlay();
    window.addEventListener('resize', function () {
        resizing_overlay();
    });

    $(window).on('load', function() {
  
        // po-con Hide
        $('.po-con').css('opacity','0');
        $('.po-con')
            .css('transform','translate(-50%, 100vh)')
            .css('transition','2s');
        $('.po-con').hide();
        console.log("asdasd");
       
    });
    
    var page_info = [
        ["#dr3-pamphlet", "#dr3-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
    ];

    console.log(page_info[0].length);

    var cur_subpage = 0;
    var cur_page = 0;

    // Gallery Interaction
    $(document).ready(function() {

        $(window).on("wheel", function (event){
            console.log(event.originalEvent.deltaY);

            if (event.originalEvent.deltaY < 0) {
              if (aa < 42) {
                    aa += 12;
                    target.style.marginLeft = String(aa) + "vw";
                }
                console.log("wheel");
            }
            else {
                if (aa > -42) {
                    aa -= 12;
                    target.style.marginLeft = String(aa) + "vw";
                    console.log(aa);
                }
                if (scrollMode == 1){
                    scrollMode = 0;
                    openProjectPopup(0);
                    cur_subpage += 1;
                    console.log("subpage");
                }
            }
        });

        var cursorWheelAni = function() {
            $('.cursor_item .cursor_wheel')
                .css('animation-name','cursorWheel')
                .css('animation-duration','1s')
                .css('animation-fill-mode','backwards')
                .css('animation-timing-function','cubic-bezier(0.65, 0, 0.35, 1)')
                .css('animation-iteration-count','5');
            $('.cursor_item')
                .css('animation-name','cursorWheelScale')
                .css('animation-duration','.5s')
                .css('animation-fill-mode','backwards')
                .css('animation-direction','alternate')
                .css('animation-timing-function','cubic-bezier(0.65, 0, 0.35, 1)')
                .css('animation-iteration-count','10');
            $('.cursor_wheelup')
                .css('animation-name','cursorWheelUp')
                .css('animation-duration','.5s')
                .css('animation-fill-mode','backwards')
                .css('animation-direction','alternate')
                .css('animation-timing-function','cubic-bezier(0.65, 0, 0.35, 1)')
                .css('animation-iteration-count','10');
             $('.cursor_wheeldown')
                .css('animation-name','cursorWheelDown')
                .css('animation-duration','.5s')
                .css('animation-fill-mode','backwards')
                .css('animation-direction','alternate')
                .css('animation-timing-function','cubic-bezier(0.65, 0, 0.35, 1)')
                .css('animation-iteration-count','10');
            $('.cursor_guide')
                .css('transition','1s')
                .css('animation-name','cursorGuideScale')
                .css('animation-duration','1s')
                .css('animation-direction','alternate')
                .css('animation-timing-function','cubic-bezier(0.65, 0, 0.35, 1)')
                .css('animation-iteration-count','6');
        }

        var openProjectPopup = function(index) {

            var img_index   = "nth-of-type("+(index+1)+")";
            var page        = page_info[index][cur_subpage];

            clearTimeout(timeout);
            $('.port-img').not(".port-img:"+img_index)
                .css('opacity','.0')
                .css('filter','sepia(80%)')
                .css('transition','.5s')
                .css('border-radius','16px');
            $('.port-header')
                .css('margin-bottom','-120px')
                .css('padding-bottom','0px')
                .css('opacity','0')
                .css('transition','.5s');

            timeout = setTimeout(function() {

                $(".port-img:"+img_index)
                    .css('width','0px')
                    .css('min-width','0px')
                    .css('max-width','0px')
                    .css('transition','1s');
                $(page + ' .po-con').show();

            }, 500);

            timeout = setTimeout(function() {
                
                $('body')
                    .css('background-color','rgb(81, 99, 94)')
                    .css('transition','1s');
                $(page + ' .po-con')
                    .css('opacity','1')
                    .css('transform','translate(-50%, -50%)')
                    .css('transition','2s');

            }, 1000);

            timeout = setTimeout(function() {
                text_ani();
                $('.po-con')
                    .css('transition','0s');
            }, 1500);

            timeout = setTimeout(function() {
                cursorWheelAni();
                subpageChange = 1;
                scrollMode = 1;
            }, 2000);

        }

        var galleryButton = function(index) {
            $(".port-img:nth-of-type("+(index+1)+")").on('click', function(){
                aa = 42 - 12*index;
                target.style.marginLeft = String(aa) + "vw";
                openProjectPopup(index);     
                //console.log(index); //console test
            });
        }

        for(var i = 0; i < 8; i ++) {
            galleryButton(i);
        }

    });

})(jQuery);