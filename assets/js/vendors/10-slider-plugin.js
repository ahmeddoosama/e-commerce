(function ($) {

    $.fn.slider = function (options) {

        // Default Options
        options = $.extend({
            slidesToShow: 1,
            waitingTime: 3000,
            arrows: true,
            dots: false
        }, options)

        /**
            > Variables
        **/
        let $this = $(this)

        let slideObj = {
            sliderBanner: $this.find('.slider__banner'),
            sliderItem: $this.find('.slider__item'),
            itemsLength: $this.find('.slider__item').length,
            nextBtn: $this.find('.next'),
            prevBtn: $this.find('.prev'),
            move: 0,
            clicked: false,
            windowResizing: false
        }

        // Calc Slider Width item to show
        function resizing(){

            slideObj.sliderItem.width( parseInt( $this.width() / options.slidesToShow ) )
            slideObj.sliderBanner.width(slideObj.itemsLength * slideObj.sliderItem.outerWidth())
            slideObj.sliderBanner.css('transform', 'translateX(' + -(slideObj.move * slideObj.sliderItem.width()) + 'px)')

            // console.log('resize')
        }resizing();


        // Next Button Slider Function
        slideObj.nextBtn.click(function () {

            if(!slideObj.clicked) { // > check user click on nextBtn
                slideObj.clicked = true
                slideObj.move = slideObj.move == (slideObj.itemsLength - 1) ? slideObj.itemsLength - 1 : slideObj.move + 1
                slideObj.sliderBanner.css('transform', 'translateX(' + -(slideObj.move * slideObj.sliderItem.width()) + 'px)')
                setTimeout(function(){ slideObj.clicked = false }, 505)
            }

        })

        // Previous Button Slider Function
        slideObj.prevBtn.click(function () {

            if(!slideObj.clicked) { // > check user click on prevBtn
                slideObj.clicked = true
                slideObj.move = slideObj.move <= 0 ? 0 : slideObj.move - 1
                slideObj.sliderBanner.css('transform', 'translateX(' + -(slideObj.move * slideObj.sliderItem.width()) + 'px)')
                setTimeout(function(){ slideObj.clicked = false }, 505)
            }

        })

        $(window).on('resize', function(){
            if(!slideObj.windowResizing) {
                slideObj.windowResizing = true
                resizing()
                setTimeout(function(){slideObj.windowResizing = false}, 100)
            }
        })

        // return
        return this
    }
}(jQuery))