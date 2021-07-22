function text_ani_reset() {
  $(".po-text-ani").lettering();
}

$(document).ready(function() {
  text_ani_reset();
});

function text_ani() {
  text_ani_reset();
  var title1 = new TimelineMax();

  title1.staggerFromTo(".po-text-ani span", 0.5, {
    ease: Back.easeOut.config(1.7),
    opacity: 0,
    bottom: -80
  },
  {
    ease: Back.easeOut.config(1.7),
    opacity: 1,
    bottom: 0
  }, 0.1);
  console.log("text_ani() Start!");
}

$(document).ready(function() {
  console.log("asdasd");
}, 110);