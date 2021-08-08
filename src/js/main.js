/*
---- 2021.08.08
---- Kwon Jaeyoung
*/

var active = "#page-resume";
var timeout;
var maxpage = 2;
var loadpage = 0;
var loadcomplete = 0;

var galleryButtonClick = function() {
    $('.gal-con').on('click', function(){

        active = "#page-portfolio";

        $('.lo-con').css('opacity','0');

        timeout = setTimeout(function() {

            $('.lo-con').hide();
            $('.lo-con').css('transition','0s');
            
            $(active + " .lo-con").show();

            $(active + " .lo-con").on('load', function() { 
                $(active + " .lo-con")
                .css('opacity','1')
                .css('transition','2s');
            })

        }, 1000);
        
    });
}

var showPage = function() {
    // lo-con Hide
    $('.lo-con').css('opacity','0');
    $('.lo-con').hide();

    $(active + " .lo-con").show();
    timeout = setTimeout(function() {

        $(active + " .lo-con")
            .css('opacity','1')
            .css('transition','1s');

    }, 100);
}

var loadpageChecker = () => {

    if (loadpage < 2) {
        // lo-con Hide
        $('.lo-con').css('opacity','0');
        $('.lo-con').hide();
    } else {
        loadcomplete = 1;
        galleryButtonClick();
        
        $("img").on('load', function() { 
            console.log("image loaded!"); 
        })
        $("img").load(function(){
            showPage();
        });
    }

    $(".loader").html("<p>"+(loadpage/maxpage) * 100+"%</p>");

}

(function ($) {

    $(document).ready(function() {

        

    });
    
    

})(jQuery);