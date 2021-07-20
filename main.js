'use strict';

var target = document.getElementsByClassName("port-imgcon")[0];    //배열의 주소를 반환하므로 해당 인자를 지정해야 한다.
var target2 = document.getElementsByClassName("port-img")[0];
var i = 0;
var subpage = 0;

if (window.addEventListener)
    window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;

var animation = target.animate([], 200);
animation.addEventListener('finish', function() {
    target.style.transition = '.5s';
});

var aa = 42;

// 마우스 휠
function handle(delta) {
    if (delta > 0) {
        if (aa < 42) {
            aa += 6;
            target.style.marginLeft = String(aa) + "vw";
        }
    }
    else {
        if (aa > -42) {
            aa -= 6;
            target.style.marginLeft = String(aa) + "vw";
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

    function resizing_overlay() {
        if (window.innerWidth*(66.675/100) <= window.innerHeight) {
            $('.po-con img')
                .css('width','149.98125vh')
                .css('height','100vh');
        } else {
            $('.po-con img')
                .css('width','100vw')
                .css('height','66.675vw');
        }
    }
    resizing_overlay();
    window.addEventListener('resize', function () {
        resizing_overlay();
    });

    $('.po-con').hide();
    $('.po-con').css('opacity','0');
    $('.po-con')
        .css('transform','translate(-50%, 100vh)')
        .css('transition','2s');

    $(document).ready(function() {

        var resetPopup = function(index) {

            $('.port-img')
                .css('min-width','10vw')
                .css('height','20vw')
                .css('opacity','.0')
                .css('filter','sepia(80%)')
                .css('transition','.5s')
                .css('border-radius','16px');

            $(index)
                .css('min-width','10vw')
                .css('height','20vw')
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
            $('.po-con:nth-of-type(1)').show();
        }

        var setPopup = function(index) {

            if (subpage == 0) {
                animation();
                /*
                $('body')
                    .css('background-color','rgb(225, 224, 222)');
                    */
                $('body')
                    .css('background-color','rgb(81, 99, 94)')
                    .css('transition','1s');
                $('.po-con')
                    .css('opacity','1')
                    .css('transition','1s');
                $('.po-con:nth-of-type(1)')
                    .css('opacity','1')
                    .css('transform','translate(-50%, -50%)')
                    .css('transition','2s');

                timeout = setTimeout(function() {
                    $('.po-con:nth-of-type(1)')
                        .css('transition','.0s');
                }, 500);

                $(index)
                    .css('opacity','0')
                    .css('filter','sepia(0%)')
                    .css('transition','.5s')
                    .css('border-radius','0px')
                subpage++;
                $('.port-imgcon').hide()
            } else if (subpage == 1) {
                subpage++;
            }
            
        }

        var aaa = function(index) {

            resetPopup(index);

            timeout = setTimeout(function() {
                setPopup(index);
            }, 0);

        }

        $(".port-img:nth-of-type(1)").on('click', function(){
            aa = 42;
            target.style.marginLeft = String(aa) + "vw";
            aaa(this);
        });
        $(".port-img:nth-of-type(2)").on('click', function(){
            aa = 42 - 12;
            target.style.marginLeft = String(aa) + "vw";
            aaa(this);
        });
        $(".port-img:nth-of-type(3)").on('click', function(){
            aa = 42 - 12*2;
            target.style.marginLeft = String(aa) + "vw";
            aaa(this);
        });
        $(".port-img:nth-of-type(4)").on('click', function(){
            aa = 42 - 12*3;
            target.style.marginLeft = String(aa) + "vw";
            aaa(this);
        });
        $(".port-img:nth-of-type(5)").on('click', function(){
            aa = 42 - 12*4;
            target.style.marginLeft = String(aa) + "vw";
            aaa(this);
        });
        $(".port-img:nth-of-type(6)").on('click', function(){
            aa = 42 - 12*5;
            target.style.marginLeft = String(aa) + "vw";
            aaa(this);
        });
        $(".port-img:nth-of-type(7)").on('click', function(){
            aa = 42 - 12*6;
            target.style.marginLeft = String(aa) + "vw";
            aaa(this);
        });
        $(".port-img:nth-of-type(8)").on('click', function(){
            aa = 42 - 12*7;
            target.style.marginLeft = String(aa) + "vw";
            aaa(this);
        });
    });

})(jQuery);