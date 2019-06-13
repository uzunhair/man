jQuery.noConflict()(function($) {
	'use strict';

	$(document).ready(function () {

        $('.sidebar').theiaStickySidebar({
	      	additionalMarginTop: 30,
	      	additionalMarginBottom: 30
	    });

        // $('body').scrollspy({ target: '#scrollspy' })

		$('#navbar-example a[href^="#"]').on('click', function() {

		    var id = $(this).attr('href');
		    scrollToAnchor(id);

		    return false;

		});

		function scrollToAnchor(aid){
		    var aTag = $(aid);
		    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
		}

		$(function () {
			$('[data-toggle="tooltip"]').tooltip()
		});

		$(function () {
			$('[data-toggle="popover"]').popover()
		});


		// card-carousel

		$('.js_card-carousel').slick({
			infinite: false,
			slidesToShow: 3,
			slidesToScroll: 3,
			arrows: false,
			responsive: [
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						dots: true,
						arrows: true,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: true,
						arrows: true,
					}
				}
			]
		});

	});
});