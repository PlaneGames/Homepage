var target = document.getElementsByClassName("port-con")[0];    //배열의 주소를 반환하므로 해당 인자를 지정해야 한다.
var target2 = document.getElementsByClassName("port-img")[0];
const styles = {
    transition: 'all 1s ease-out'
};
if (window.addEventListener)
    window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;

var animation = target.animate([], 500);
animation.addEventListener('finish', function() {
    target.style.transition = '.5s';
});

var aa = 0;

// 마우스 휠~
function handle(delta) {
    var s = delta + ": ";
    if (delta > 0) {
        
        target.style.opacity = ".1";
        //left: 50%;
        //transform: translate(-50%, 0%);
        aa += 100;
        target.style.marginLeft = String(aa) + "px";
        callback
    }
    else {
        target.style.opacity = "1";
        target.style.marginLeft = "20px";
        
        aa -= 100;
        target.style.marginLeft = String(aa) + "px";
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