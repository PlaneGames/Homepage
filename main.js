'use strict';

var target = document.getElementsByClassName("port-imgcon")[0];    //배열의 주소를 반환하므로 해당 인자를 지정해야 한다.
var target2 = document.getElementsByClassName("port-img")[0];
var i = 0;

if (window.addEventListener)
    window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;

var animation = target.animate([], 500);
animation.addEventListener('finish', function() {
    target.style.transition = '.5s';
});

var aa = 840;

// 마우스 휠
function handle(delta) {
    if (delta > 0) {
        if (aa < 840) {
            aa += 120;
            target.style.marginLeft = String(aa) + "px";
        }
    }
    else {
        if (aa > -840) {
            aa -= 120;
            target.style.marginLeft = String(aa) + "px";
            console.log(aa);
        }
    }
}

//마우스 이벤트
function wheel(event){
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {
        delta = event.wheelDelta/120;
        if (window.opera) delta = -delta;
    } else if (event.detail) delta = -event.detail/3;
    if (delta) handle(delta);
}

var timeout;

(function ($) {

    $(document).ready(function() {

        var resetPopup = function(index) {

            $('.port-img')
                .css('min-width','200px')
                .css('height','400px')
                .css('opacity','.0')
                .css('filter','sepia(80%)')
                .css('transition','.5s')
                .css('border-radius','16px');

            $(index)
                .css('min-width','200px')
                .css('height','400px')
                .css('opacity','1')
                .css('filter','sepia(0%)')
                .css('transition','.5s')
                .css('border-radius','16px');

            clearTimeout(timeout);

            $('.port-header')
                .css('margin-bottom','-120px')
                .css('padding-bottom','0px')
                .css('opacity','0')
                .css('transition','.5s');

            timeout = setTimeout(function() {
                $('.port-header').hide();
            }, 500);

        }

        var setPopup = function(index) {

            $(index)
                .css('min-width','1280px')
                .css('height','720px')
                .css('opacity','1')
                .css('filter','sepia(0%)')
                .css('transition','1s')
                .css('border-radius','0px');

        }

        var aaa = function(index) {

            resetPopup(index);

            timeout = setTimeout(function() {
                setPopup(index);
            }, 1000);

        }

        $(".port-img:nth-of-type(1)").on('click', function(){

            aa = 840;
            target.style.marginLeft = String(aa) + "px";
            aaa(this);
        });
        $(".port-img:nth-of-type(2)").on('click', function(){
            aa = 840 - 240;
            target.style.marginLeft = String(aa) + "px";
            aaa(this);
        });
        $(".port-img:nth-of-type(3)").on('click', function(){
            aa = 840 - (240*2);
            target.style.marginLeft = String(aa) + "px";
            aaa(this);
        });
        $(".port-img:nth-of-type(4)").on('click', function(){
            aa = 840 - (240*3);
            target.style.marginLeft = String(aa) + "px";
            aaa(this);
        });
        $(".port-img:nth-of-type(5)").on('click', function(){
            aa = 840 - 240*4;
            target.style.marginLeft = String(aa) + "px";
            aaa(this);
        });
        $(".port-img:nth-of-type(6)").on('click', function(){
            aa = 840 - 240*5;
            target.style.marginLeft = String(aa) + "px";
            aaa(this);
        });
        $(".port-img:nth-of-type(7)").on('click', function(){
            aa = 840 - 240*6;
            target.style.marginLeft = String(aa) + "px";
            aaa(this);
        });
        $(".port-img:nth-of-type(8)").on('click', function(){
            aa = 840 - 240*7;
            target.style.marginLeft = String(aa) + "px";
            aaa(this);
        });
    });

})(jQuery);