$(document).ready(function() {
  $(".po-text-ani").lettering();
  $(".button").lettering();
});


function animation() {
  var title1 = new TimelineMax();
  title1.to(".button", 0, {
    visibility: 'hidden', opacity: 0
  });

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

  title1.to(".button", 0.2, {
    visibility: 'visible', opacity: 1
  });
}


$(document).ready(function() {
  
}, 0);

$('.button').click(function() {
  animation();
});

