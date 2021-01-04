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
});