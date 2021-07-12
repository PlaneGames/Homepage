'use strict';

var target = document.getElementsByClassName("port-imgcon")[0];    //배열의 주소를 반환하므로 해당 인자를 지정해야 한다.
var target2 = document.getElementsByClassName("port-img")[0];

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

(function ($) {

    $(document).ready(function() {
        //for (var i = 1; i < 9; i ++)
        $(".port-img").on('click', function(){
            aa = 840; //- 120*i;
            target.style.marginLeft = String(aa) + "px";
        });
    });

})(jQuery);