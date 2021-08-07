/*(function ($) {

    $(document).ready(function() {

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

    });

})(jQuery);
*/