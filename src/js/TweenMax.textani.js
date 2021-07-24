function text_ani_reset() {
  $(".po-text-ani").lettering();
}

$(document).ready(function() {
  text_ani_reset();
});

function text_ani(pageIndex) {
  text_ani_reset();
  var title1 = new TimelineLite();

  title1.staggerFromTo(pageIndex + ' .po-text-ani span', 0.5, {
    ease: Back.easeOut.config(1.7),
    opacity: 0,
    bottom: -80
  },
  {
    ease: Back.easeOut.config(1.7),
    opacity: 1,
    bottom: 0
  }, 0.1);
}

$(document).ready(function() {
}, 110);