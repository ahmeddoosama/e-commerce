(function ($) {

    $.fn.slider = function (options) {

        return this.each(function () {
            // Default Options
            var sliderOptions = $.extend({
                slidesToShow: 1,
                autoPlay: false,
                waitingTime: 3000,
                arrows: true,
                dots: false,
                responsive: false,
                mouseDrag: true
            }, options)

            /**
                > Variables
            **/
            let $this = $(this)
            $this.addClass('slider-plugin')

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

            var responsiveScreenFound = false
            // Responsive Function
            function responsiveFn() {
                if(sliderOptions.responsive){
                    $.each(sliderOptions.responsive, function(index, item){
                        if($(window).width() <= item.breakpoint){
                            $.extend(sliderOptions, item.settings)
                            responsiveScreenFound = true
                        }else if(!responsiveScreenFound){
                            $.extend(sliderOptions, options)
                        }
                    })
                    responsiveScreenFound = false
                }
            }responsiveFn()

            // Calc Slider Width item to show
            function resizing() {

                responsiveFn()

                slideObj.sliderItem.outerWidth(parseInt($this.outerWidth() / sliderOptions.slidesToShow))
                slideObj.sliderBanner.outerWidth(slideObj.itemsLength * slideObj.sliderItem.outerWidth())
                slideObj.sliderBanner.css('transform', 'translateX(' + -(slideObj.move * slideObj.sliderItem.outerWidth()) + 'px)')

                // console.log('resize')
            }
            resizing();


            // Next Button Slider Function
            function nextBtnFn() {

                if (!slideObj.clicked) { // > check user click on nextBtn
                    slideObj.clicked = true 
                    var lastSlide = ((slideObj.itemsLength - 1) - (sliderOptions.slidesToShow - 1))
                    slideObj.move = slideObj.move == lastSlide ? lastSlide : slideObj.move + 1
                    slideObj.sliderBanner.css('transform', 'translateX(' + -(slideObj.move * slideObj.sliderItem.outerWidth()) + 'px)')
                    activeDots(slideObj.move)
                    setTimeout(function () {
                        slideObj.clicked = false
                        if (sliderOptions.autoPlay) {
                            autoplay()
                        }
                    }, 505)
                }

                if (slideObj.move == lastSlide) {
                    slideObj.nextBtn.addClass('disabled')
                } else {
                    $this.find('.slider__controllers .icon').removeClass('disabled')
                }

            }

            slideObj.nextBtn.click(nextBtnFn)

            // Previous Button Slider Function
            function prevBtnFn() {

                if (!slideObj.clicked) { // > check user click on prevBtn
                    slideObj.clicked = true
                    slideObj.move = slideObj.move <= 0 ? 0 : slideObj.move - 1
                    slideObj.sliderBanner.css('transform', 'translateX(' + -(slideObj.move * slideObj.sliderItem.outerWidth()) + 'px)')
                    activeDots(slideObj.move)
                    setTimeout(function () {
                        slideObj.clicked = false
                        if (sliderOptions.autoPlay) {
                            autoplay()
                        }
                    }, 505)
                    if (slideObj.move <= 0) {
                        slideObj.prevBtn.addClass('disabled')
                    } else {
                        $this.find('.slider__controllers .icon').removeClass('disabled')
                    }
                }

            }

            slideObj.prevBtn.click(prevBtnFn)

            // Move slide by mouse
            function mouseDrag() {
                $this.on('mousedown', function (e) {
                    e.preventDefault()
                    slideObj.mousedown = true
                    slideObj.pageX = e.pageX
                    clearTimeout(timeOut)
                    // console.log(slideObj.mousedown)
                })
    
                $(document).on('mouseup', function (e) {
                    e.preventDefault()
                    if (slideObj.mousedown) {
                        slideObj.mousedown = false
                        if (e.pageX - slideObj.pageX > 100) {
                            prevBtnFn()
                        } else if (e.pageX - slideObj.pageX < -100) {
                            nextBtnFn()
                        } else {
                            autoplay()
                        }
                        // console.log(slideObj.mousedown)
                        slideObj.sliderBanner.css('margin-left', '0px')
                    }
                })
    
                $(document).on('mousemove', function (e) {
                    e.preventDefault()
                    if (slideObj.mousedown) {
                        // console.log('move')
                        slideObj.sliderBanner.css('margin-left', (e.pageX - slideObj.pageX) + 'px')
                    }
                })
            }
            if(sliderOptions.mouseDrag) {
                mouseDrag();
            }

            // Move slide by dots

            function activeDots(index) {
                $this.find('.slider-dots .dot').removeClass('active').eq(index).addClass('active')
            }

            function drawDots() {
                let slidesNum = slideObj.itemsLength / sliderOptions.slidesToShow
                liArray = []
                for(let i = 1; i <= slidesNum; i++){
                    liArray.push('<li class="dot '+(i == 1? "active": "")+'"></li>')
                }
                $this.append('<ul class="slider-dots">'+liArray.join('')+'</ul>')

                $this.on('click', '.slider-dots .dot', function(){
                    slideObj.move = $(this).index()
                    activeDots(slideObj.move)

                    slideObj.sliderBanner.css('transform', 'translateX(' + -(slideObj.move * slideObj.sliderItem.outerWidth()) + 'px)')

                    if(sliderOptions.autoPlay) {
                        autoplay();
                    }
                })
            }
            if(sliderOptions.dots) {
                drawDots()
            }


            // autoplay Slider
            var timeOut;

            function autoplay() {
                clearTimeout(timeOut)
                timeOut = setTimeout(function () {
                    nextBtnFn()
                    autoplay()
                }, sliderOptions.waitingTime)
            }
            if (sliderOptions.autoPlay) {
                autoplay()
            }

            let windowResizing
            $(window).on('resize', function () {
                clearTimeout(windowResizing)
                windowResizing = setTimeout(resizing, 500)
            })
        })
        // return
        // return this
    }
}(jQuery))