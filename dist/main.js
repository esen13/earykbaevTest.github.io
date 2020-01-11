// Slider range JS
function showValue(val, vertical) {
    /* setup variables for the elements of our slider */
    let thumb = document.getElementById("sliderthumb");
    let shell = document.getElementById("slidershell");
    let track = document.getElementById("slidertrack");
    let fill = document.getElementById("sliderfill");
    let rangevalue = document.getElementById("slidervalue");
    let slider = document.getElementById("slider");

    let pc = val/(slider.max - slider.min); /* the percentage slider value */
    let thumbsize = 40; /* must match the thumb size in your css */
    let bigval = 760; /* widest or tallest value depending on orientation */
    let smallval = 40; /* narrowest or shortest value depending on orientation */
    let tracksize = bigval - thumbsize;
    let fillsize = 14;
    let filloffset = 10; //top range
    let bordersize = 1;
    let loc = vertical ? (1 - pc) * tracksize : pc * tracksize;

    rangevalue.innerHTML = val;

    fill.style.opacity = pc + 1 > 1 ? 1 : pc + 0.01;

    rangevalue.style.top = (vertical ? loc : 0) + "px";
    rangevalue.style.left = (vertical ? 0 : loc) + "px";
    thumb.style.top =  (vertical ? loc : 25) + "px";
    thumb.style.left = (val > 0 ? loc + thumbsize - 12 : -10) + "px";
    fill.style.top = (vertical ? loc + (thumbsize/2) : filloffset + bordersize) + "px";
    fill.style.left = (vertical ? filloffset + bordersize : 0) + "px";
    fill.style.width = (vertical ? fillsize : loc + thumbsize) + "px";
    fill.style.height = (vertical ? bigval - filloffset - fillsize - loc : fillsize) + "px";
    shell.style.height = (vertical ? bigval : smallval + 20) + "px";
    shell.style.width = (vertical ? smallval : bigval) + "px";
    track.style.height = (vertical ? bigval - 4 : fillsize) + "px"; /* adjust for border */
    track.style.width = (vertical ? fillsize : bigval) + "px"; /* adjust for border */
    track.style.left = (vertical ? filloffset + bordersize : 0) + "px";
    track.style.top = (vertical ? 0 : filloffset + bordersize) + "px";
}
/* function to set the slider values on page load */
function setValue(val, vertical) {
    document.getElementById("slider").value = 3;
    showValue(val, vertical);
}

document.addEventListener('DOMContentLoaded', () => {
    setValue(3,false);
});

// Fixed selector :valid for inputEmail and Textarea
function inputValid(id, event){
    const idTag = document.getElementById(id);
    const text = event.target.value;
    if(text.length > 0) {
        idTag.classList.add("active")
    } else {
        idTag.classList.remove("active")
    }
}

$(document).ready(function($) {

    // Animation scroll
    $(".scroll").click(function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 1400);
    });
    // Active link
    $('.navbar-nav li').click(function (e) {
        $('.navbar-nav li').removeClass("active");
        $(this).closest("li").addClass("active");
    });
    // Mobile menu button
    $('.navbar-toggler.collapsed').click(function () {
        $('#navbars').toggleClass('show');
    });

    // Select with Jquery
    $('select').each(function(){
        let $this = $(this), numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        let $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        let $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (let i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        let $listItems = $list.children('li');

        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            //console.log($this.val());
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });
});

