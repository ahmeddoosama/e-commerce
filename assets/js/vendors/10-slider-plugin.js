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
        }

        slideObj.sliderItem.width( parseInt( slideObj.sliderBanner.width() / options.slidesToShow ) );

        slideObj.sliderBanner.width( slideObj.itemsLength * slideObj.sliderItem.outerWidth() )

        return this
    }
}( jQuery ))