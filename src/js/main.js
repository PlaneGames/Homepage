/*
---- 2021.08.08
---- Kwon Jaeyoung
*/

var active = "#page-resume";
var timeout;
var loadpage = 0;
var loadcomplete = 0;

var galleryButtonClick = function() {
    $('.gal-con').on('click', function(){

        active = "#page-portfolio";
        // lo-con Hide
        $('.lo-con').css('opacity','0');
        $('.lo-con').hide();
        
        $(active + " .lo-con").show();
        $(active + " .lo-con")
            .css('opacity','1')
            .css('transition','1s');
        console.log(active);
    });
}

var loadpageChecker = () => {

    console.log(loadpage);
    if (loadpage < 2) {
        // lo-con Hide
        $('.lo-con').css('opacity','0');
        $('.lo-con').hide();
    } else {
        // lo-con Hide
        $('.lo-con').css('opacity','0');
        $('.lo-con').hide();
        
        $(active + " .lo-con").show();
        $(active + " .lo-con")
            .css('opacity','1')
            .css('transition','1s');
        loadcomplete = 1;
        galleryButtonClick();
    }

}

(function ($) {

    $(document).ready(function() {
    });

})(jQuery);