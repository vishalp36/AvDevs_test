$(window).bind('load', function (event) {
	var headHeight = $('.main_header').outerHeight();
	// var footerHeight = $('.main_footer').outerHeight();
	$('body').css('padding-top', headHeight);
	// $('#main').css('margin-bottom', footerHeight);
});
$(document).ready(function () {
	// Wold News Slider
	var worldNews = document.querySelector('.world_news_slider');
	var worldNewsSlider = new Swiper(worldNews, {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			delay: 5000,
		},
	});

	// More News Slider
	var moreNews = document.querySelector('.more_news_slider');
	var moreNewsPrev = document.querySelector(
		'.more_news .col-2 .swiper-button-prev'
	);
	var moreNewsNext = document.querySelector(
		'.more_news .col-2 .swiper-button-next'
	);
	var moreNewsSlider = new Swiper(moreNews, {
		observer: true,
		observeParents: true,
		loop: true,
		autoplay: {
			delay: 5000,
		},
		navigation: {
			nextEl: moreNewsNext,
			prevEl: moreNewsPrev,
		},
	});

	//Trending News Slider
	var trenNews = document.querySelector('.trending_news_slider');
	var trenNewsPrev = document.querySelector(
		'.trending_sec .swiper-button-prev'
	);
	var trenNewsNext = document.querySelector(
		'.trending_sec .swiper-button-next'
	);
	var trenNewsSlider = new Swiper(trenNews, {
		slidesPerView: 3,
		spaceBetween: 40,
		loop: true,
		observer: true,
		observeParents: true,
		autoplay: {
			delay: 5000,
		},
		navigation: {
			nextEl: trenNewsNext,
			prevEl: trenNewsPrev,
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 40,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
		},
	});

	//Trending News Slider
	var hpnNews = document.querySelector('.happen_news_slider');
	var hpnNewsPrev = document.querySelector('.happen_sec .swiper-button-prev');
	var hpnNewsNext = document.querySelector('.happen_sec .swiper-button-next');
	var hpnNewsSlider = new Swiper(hpnNews, {
		observer: true,
		observeParents: true,
		loop: true,
		spaceBetween: 10,
		// autoplay: {
		// 	delay: 5000,
		// },
		navigation: {
			nextEl: hpnNewsNext,
			prevEl: hpnNewsPrev,
		},
	});

	if ($(window).width() < 768) {
		$('html').click(function (event) {
			if ($(event.target).closest('.main_nav').length === 0) {
				$('.main_nav').removeClass('open');
				// open = true;
			}
		});
		$('.ham_btn').click(function (event) {
			$('.main_nav').addClass('open');

			gsap.fromTo(
				'.primary_menu > li,.mobile_footer',
				{
					opacity: 0,
					y: 20,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					delay: 0.5,
					stagger: 0.07,
					ease: 'power3.out',
				}
			);
			// if (open == true) {
			// 	open = false;
			// }
			// if (open = false) {
			// 	$('.main_nav').removeClass('open');
			// 	open = true;
			// }
		});
		$('.close_menu').click(function (event) {
			$('.main_nav').removeClass('open');
			gsap.set('.primary_menu > li,.mobile_footer', {
				opacity: 0,
				y: 20,
				delay: 0.5,
			});
			// open = true;
		});

		$('.ham_btn').click(function (event) {
			event.stopPropagation();
		});
	}

	$(window).scroll(function () {
		var sticky = $('header'),
			scroll = $(window).scrollTop();
		if (scroll >= 40) {
			sticky.addClass('fixed');
		} else {
			sticky.removeClass('fixed');
		}
	});
});
