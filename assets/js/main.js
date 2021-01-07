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
    $(this).parent().toggleClass('active')
})

$(document).on('click', function(event){
    let $target = $(event.target)

    $('.click-outside').each(function(index){
        let $this = $(this)
        if($this.hasClass('active') && $target.closest('.click-outside').length == 0){
            $this.removeClass('active')
        }
    })
})



});