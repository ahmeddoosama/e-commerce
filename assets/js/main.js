$(document).ready(function(){
//Dropdowns Select
let dropDown = $('.select')

function dropDownSelect() {

    dropDown.each(function(){
        let $this = $(this);

        let defaultText = $this.find('.list-item:first-child').addClass('active').find('a').text();
        $this.find('.selected-item .item-text').text(defaultText)
    });

    dropDown.on('click', '.list-item', function() {
        let $this = $(this);
        $this.addClass('active').siblings().removeClass('active')
            .parents('.select').find('.selected-item .item-text').text($this.find('a').text())
    });
}

if(dropDown.length) {
    dropDownSelect()
}
// Show search bar when click on search icon
$(document).on('click', '.toggle-active-parent', function() {
    let $this = $(this)
    $this.parent().toggleClass('active')

    if($this.parent('.accordion__item').length){
        $this.parent().siblings().removeClass('active').find('.accordion__body').slideUp();
        $this.parent().find('.accordion__body').slideToggle(300);
    }
})

$(document).on('click', function(event){
    let $target = $(event.target)

    $('.click-outside').each(function(index){
        let $this = $(this)

        let hasClass = $this.hasClass('remove-from-parent') ? $this.parent().hasClass('active') : $this.hasClass('active')

        if(hasClass &&  $target.closest('.click-outside').length == 0 && !$target.hasClass('click-outside-btn')) {
            $this.hasClass('remove-from-parent') ? $this.parent().removeClass('active') : $this.removeClass('active')
        }
    })
})


$(document).on('click', '.category-slider-btn', function(){
    $('.category-sidebar').addClass('active')
})
});