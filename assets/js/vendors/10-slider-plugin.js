(function($){

    $.fn.slider = function(options) {

        options = $.extend({
            slidesToShow: 1,
            waitingTime: 3000,
            arrows: true,
            dots: false
        }, options)

        let $this = $(this)

        let slideObj = {
            sliderBanner: $this.find('.slider__banner'),
            sliderItem: $this.find('.slider__item'),
            itemsLength: $this.find('.slider__item').length,
            nextBtn: $this.find('.next'),
            prevBtn: $this.find('.prev'),
            move: 0
        }

        slideObj.sliderItem.width( parseInt( slideObj.sliderBanner.width() / options.slidesToShow ) );

        slideObj.sliderBanner.width( slideObj.itemsLength * slideObj.sliderItem.outerWidth() )


        slideObj.nextBtn.click(function(){
            slideObj.move = slideObj.move == (slideObj.itemsLength - 1) ? slideObj.itemsLength - 1 : slideObj.move + 1
            slideObj.sliderBanner.css('transform', 'translateX(' + -(slideObj.move * slideObj.sliderItem.width()) + 'px)')
        })

        slideObj.prevBtn.click(function(){
            slideObj.move = slideObj.move <= 0 ? 0 : slideObj.move - 1
            slideObj.sliderBanner.css('transform', 'translateX(' + -(slideObj.move * slideObj.sliderItem.width()) + 'px)')
        })




        return this
    }
}( jQuery ))