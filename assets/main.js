// Webpack Imports
import 'bootstrap';

( function ( $ ) {
	'use strict';

	// JQuery fallback: add title attribute from placeholder
	$( 'input, textarea' ).attr( 'title', function () {
		return $( this ).attr( 'placeholder' );
	} );

	// Focus Search if Searchform is empty
	$( '.search-form' ).on( 'submit', function ( e ) {
		var search = $( '#s' );
		if (!search.parent($('form')).hasClass('open')) {
			search.parent($('form')).addClass('open').parent($('#navbar')).addClass('search-open');
			e.preventDefault();
			search.focus();
			return;
		}
		if ( search.val().length < 1 ) {
			e.preventDefault();
			search.parent($('form')).removeClass('open').parent($('#navbar')).removeClass('search-open');
		}
	} );
	$(window).load(function() { //start after HTML, images have loaded

    var InfiniteRotator =
    {
        init: function()
        {
            //initial fade-in time (in milliseconds)
            var initialFadeIn = 1000;
            //interval between items (in milliseconds)
            var itemInterval = 5000;
            //cross-fade time (in milliseconds)
            var fadeTime = 2500;
            //count number of items
            var numberOfItems = $('.cycle-fade-img').length;
            //set current item
						var currentItem = Math.floor(Math.random() * (numberOfItems));
            //show first item
            $('.cycle-fade-img').eq(currentItem).fadeIn(initialFadeIn);
            //loop through the items
            var infiniteLoop = setInterval(function(){
                $('.cycle-fade-img').eq(currentItem).fadeOut(fadeTime);

                if(currentItem == numberOfItems -1){
                    currentItem = 0;
                }else{
                    currentItem++;
                }
                $('.cycle-fade-img').eq(currentItem).fadeIn(fadeTime);
            }, itemInterval);
        }
    };
    InfiniteRotator.init();
	});

	$(window).load(function() { //start after HTML, images have loaded

    var CountDownTime =
    {
        init: function()
        {
            //loop through the items
            var countdownLoop = setInterval(function(){
                $('.oae-countdown').each(function() {
									var date = $(this).data('countdown');
									var count = getDateCount(date);
								
									$(this).find('.oae-countdown-days').html(count.d);
									$(this).find('.oae-countdown-hours').html(count.h);
									$(this).find('.oae-countdown-minutes').html(count.m);
									$(this).find('.oae-countdown-seconds').html(count.s);
								});
            }, 1000);
        }
    };
    CountDownTime.init();
	});

}( jQuery ) );

function getDateCount(date) {

  // Get today's date and time
  var target = new Date(date);
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = target - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // If the count down is finished, write some text
  if (distance < 0) {
    return {
      d: 0,
      h: 0,
      m: 0,
      s: 0
    }
  }

  return {
    d: days,
    h: hours,
    m: minutes,
    s: seconds
  }
}
