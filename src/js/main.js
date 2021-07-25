'use strict'; // Show Error Message With Console

var target = document.getElementsByClassName("port-imgcon")[0];    //배열의 주소를 반환하므로 해당 인자를 지정해야 한다.
var i = 0;
var subpage = 0;

var animation = target.animate([], 200);
animation.addEventListener('finish', function() {
    target.style.transition = '.5s';
});

var aa              = 42;
var scrollReady     = 0;
var scrollMode      = 0;
var switching_spd   = 1.5;

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
    var timeoutHide;

    var resizing_fitText = function() {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent('resize', true, false);
        window.dispatchEvent(evt);
    }

    // resizing Overlay
    function resizing_overlay() {
        if (window.innerWidth*(66.675/100) <= window.innerHeight) {
            $('.overlay')
                .css('width','149.98125vh')
                .css('height','100vh');
        } else {
            $('.overlay')
                .css('width','100vw')
                .css('height','66.675vw');
        }
    }
    
    window.addEventListener('resize', function () {
        resizing_overlay();
    });
    
    $(window).on('load', function() {

        resizing_overlay();
        // po-con Hide
        $('.po-con').css('opacity','0');
        $('.po-con')
            .css('transform', 'translate(-50%, 100vh)')
            .css('transition', String(switching_spd) + 's');
        $('.po-con').hide();
        $('.overlay').hide();
       
    });
    
    var page_info = [
        ["#dr3-pamphlet", "#dr3-gameplay", "#dr3-gamedesign", "#dr3-development"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
        ["#dr2-pamphlet", "#dr2-gameplay"],
    ];

    var page_info_bgcolor = [
        ["rgb(81, 99, 94)", "rgb(225, 224, 222)", "rgb(225, 224, 222)", "rgb(225, 224, 222)"],
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
    var max_subpage = 0;
    var cur_page = 0;

    // Gallery Interaction
    $(document).ready(function() {

        $(window).on("wheel", function (event){
            if (event.originalEvent.deltaY < 0) {
              if (aa < 42) {
                    aa += 12;
                    target.style.marginLeft = String(aa) + "vw";
                }
                if (scrollReady == 1){
                    if (cur_subpage > 0) {
                        scrollReady = 0;
                        scrollMode  = 1;
                        cur_subpage--;
                        resetPageAni(0, cur_subpage);
                        prevProjectPopup(0, cur_subpage+1);
                        nextProjectPopup(0, cur_subpage);
                        if (cur_subpage == 0) {
                            showOverlay();
                        }
                    }
                }
            }
            else {
                if (aa > -42) {
                    aa -= 12;
                    target.style.marginLeft = String(aa) + "vw";
                }
                if (scrollReady == 1){
                    if (cur_subpage < page_info[0].length - 1) {
                        scrollReady = 0;
                        scrollMode  = 0;
                        cur_subpage++;
                        resetPageAni(0, cur_subpage);
                        prevProjectPopup(0, cur_subpage-1);
                        nextProjectPopup(0, cur_subpage);
                        if (cur_subpage != 0) {
                            hideOverlay();
                        }
                    }
                }
            }
        });

        //$('div').mouseenter(function(){
        //    console.log(this);
        //});

        var resetPageAni = function(index, previndex) {
            var page        = page_info[index][previndex];
            $(page + ' .po-con').hide();
        }

        var showOverlay = function() {
            $('.overlay').show();
            setTimeout(function() {
                $('.overlay')
                    .css('transition', String(switching_spd/2) + 's')
                    .css('opacity', '1');
            }, 1);
            setTimeout(function() {
                $('.overlay')
                    .css('transition', '0s');
            }, 110);
        }

        var hideOverlay = function() {
            $('.overlay')
                .css('opacity', '0')
                .css('transition', String(switching_spd/2) + 's');
            setTimeout(function() {
                 $('.overlay')
                    .css('transition','0s');
                $('.overlay').hide();
            }, switching_spd * 500);
        }

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

        var closeProjectPopup = function(index) {

            var transY = "calc(-50% - 100vh)";

            if (scrollMode == 0) {
                transY = "calc(-50% + 100vh)";
            } else {
                transY = "calc(-50% - 100vh)";
            }

            var img_index   = "nth-of-type("+(index+1)+")";
            var page        = page_info[index][cur_subpage];

            clearTimeout(timeout);

            $(page + ' .po-con')
                .css('opacity','0')
                .css('transform','translate(-50%, '+transY+')')
                .css('transition', String(switching_spd) + 's');

            setTimeout(function() {
                text_ani(page);
                $('.po-con')
                    .css('transition','0s');
                $(page + ' .po-con')
                    .css('opacity','0');
            }, switching_spd * 1000);
        }

        var openProjectPopup = function(index) {

            var img_index   = "nth-of-type("+(index+1)+")";
            var page        = page_info[index][cur_subpage];
            var page_bgcol  = page_info_bgcolor[index][cur_subpage];

            clearTimeout(timeout);
            timeout = setTimeout(function() {

                $(".port-img:"+img_index)
                    .css('width','0px')
                    .css('min-width','0px')
                    .css('max-width','0px')
                    .css('transition', String(switching_spd/2) + 's');
                $(page + ' .po-con').show();

            }, 500);

            timeout = setTimeout(function() {
                
                $('body')
                    .css('background-color', page_bgcol)
                    .css('transition', String(switching_spd/2) + 's');
                $(page + ' .po-con')
                    .css('opacity','1')
                    .css('transform','translate(-50%, -50%)')
                    .css('transition', String(switching_spd) + 's');

            }, switching_spd * 500);

            timeout = setTimeout(function() {
                text_ani(page);
                $('.po-con')
                    .css('transition','0s');
            }, (switching_spd * 500) + 500);

            timeout = setTimeout(function() {
                cursorWheelAni();
                scrollReady = 1;
            }, switching_spd * 1000);

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

            setTimeout(function() {

                $('.port-img').hide();
                $('.port-header').hide();
    
            }, switching_spd * 1000);

        }

        var prevProjectPopup = function(index, previndex) {

            var transY = "calc(-50% - 100vh)";

            if (scrollMode == 0) {
                transY = "calc(-50% - 100vh)";
            } else {
                transY = "calc(-50% + 100vh)";
            }

            var page        = page_info[index][previndex];

            clearTimeout(timeout);
            clearTimeout(timeoutHide);
            text_ani(page);

            timeout = setTimeout(function() {
                $('.po-con')
                    .css('transition','0s');
                $(page + ' .po-con')
                    .css('opacity','0');

            }, switching_spd * 1000);

            timeoutHide = setTimeout(function() {
                $(page + ' .po-con').hide();
                console.log("Hide()!");
            }, switching_spd * 1000);
            
            $(page + ' .po-con')
                .css('opacity','0')
                .css('transform','translate(-50%, '+transY+')')
                .css('transition', String(switching_spd) + 's');
            
        }

        var nextProjectPopup = function(index, nextindex) {

            var page        = page_info[index][nextindex];
            var page_bgcol  = page_info_bgcolor[index][nextindex];

            clearTimeout(timeout);
            $(page + ' .po-con').show();
            resizing_fitText();
            text_ani(page);
        
            timeout = setTimeout(function() {
                $('.po-con')
                    .css('transition','0s');
            }, (switching_spd * 500) + 500);

            timeout = setTimeout(function() {
                scrollReady = 1;
                resizing_fitText();
            }, switching_spd * 500);

            $('body')
                .css('background-color', page_bgcol)
                .css('transition', String(switching_spd/2) + 's');
            $(page + ' .po-con')
                .css('opacity','1')
                .css('transform','translate(-50%, -50%)')
                .css('transition', String(switching_spd) + 's');

        }

        var galleryButton = function(index) {
            $(".port-img:nth-of-type("+(index+1)+")").on('click', function(){
                aa = 42 - 12*index;
                target.style.marginLeft = String(aa) + "vw";
                openProjectPopup(index);
                showOverlay(); 
            });
        }

        for(var i = 0; i < 8; i ++) {
            galleryButton(i);
        }

    });

})(jQuery);