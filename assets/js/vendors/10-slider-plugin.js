(function ($) {

    $.fn.slider = function (options) {

        // Default Options
        options = $.extend({
            slidesToShow: 1,
            autoPlay: true,
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
            mousedown: false,
            pageX: 0
        }

        // Calc Slider Width item to show
        function resizing(){

            slideObj.sliderItem.width( parseInt( $this.width() / options.slidesToShow ) )
            slideObj.sliderBanner.width(slideObj.itemsLength * slideObj.sliderItem.outerWidth())
            slideObj.sliderBanner.css('transform', 'translateX(' + -(slideObj.move * slideObj.sliderItem.width()) + 'px)')

            // console.log('resize')
        }resizing();


        // Next Button Slider Function
        function nextBtnFn() {

            if(!slideObj.clicked) { // > check user click on nextBtn
                slideObj.clicked = true
                slideObj.move = slideObj.move == (slideObj.itemsLength - 1) ? slideObj.itemsLength - 1 : slideObj.move + 1
                slideObj.sliderBanner.css('transform', 'translateX(' + -(slideObj.move * slideObj.sliderItem.width()) + 'px)')
                setTimeout(function(){ 
                    slideObj.clicked = false
                    if(options.autoPlay){
                        autoplay()
                    }
                }, 505)}

                if(slideObj.move == (slideObj.itemsLength - 1)){
                    slideObj.nextBtn.addClass('disabled')
                }else {
                    $this.find('.slider__controllers .icon').removeClass('disabled')
                }

        }

        slideObj.nextBtn.click(nextBtnFn)

        // Previous Button Slider Function
        slideObj.prevBtn.click(function () {

            if(!slideObj.clicked) { // > check user click on prevBtn
                slideObj.clicked = true
                slideObj.move = slideObj.move <= 0 ? 0 : slideObj.move - 1
                slideObj.sliderBanner.css('transform', 'translateX(' + -(slideObj.move * slideObj.sliderItem.width()) + 'px)')
                setTimeout(function(){
                    slideObj.clicked = false
                    if(options.autoPlay){
                        autoplay()
                    }
                }, 505)
                if(slideObj.move <= 0){
                    slideObj.prevBtn.addClass('disabled')
                }else {
                    $this.find('.slider__controllers .icon').removeClass('disabled')
                }
            }
        })

        // Move slide by mouse

        $this.on('mousedown', function(e){
            e.preventDefault()
            slideObj.mousedown = true
            slideObj.pageX = e.pageX
            clearTimeout(timeOut)
            // console.log(slideObj.mousedown)
        })

        $(document).on('mouseup', function(e){
            e.preventDefault()
            if(slideObj.mousedown) {
                slideObj.mousedown = false
                if(e.pageX - slideObj.pageX > 100) {
                    slideObj.prevBtn.trigger('click')
                }else if (e.pageX - slideObj.pageX < -100) {
                    slideObj.nextBtn.trigger('click')
                }else {
                    autoplay()
                }
                // console.log(slideObj.mousedown)
                slideObj.sliderBanner.css('margin-left', '0px')
            }
        })

        $(document).on('mousemove', function(e){
            e.preventDefault()
            if(slideObj.mousedown) {
                // console.log('move')
                slideObj.sliderBanner.css('margin-left', (e.pageX - slideObj.pageX) + 'px')
            }
        })

        // autoplay Slider
        var timeOut;
        function autoplay() {
            clearTimeout(timeOut)
            timeOut = setTimeout(function(){
                nextBtnFn()
                autoplay()
            }, options.waitingTime)
        }
        if(options.autoPlay){
            autoplay()
        }

        let windowResizing
        $(window).on('resize', function(){
            clearTimeout(windowResizing)
            windowResizing = setTimeout(resizing, 500)
        })

        // return
        return this
    }
}(jQuery))