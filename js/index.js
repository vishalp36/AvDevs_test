//GSAP Blur Plugin
(function () {
	const blurProperty = gsap.utils.checkPrefix('filter'),
		blurExp = /blur\((.+)?px\)/,
		getBlurMatch = (target) =>
			(gsap.getProperty(target, blurProperty) || '').match(blurExp) || [];

	gsap.registerPlugin({
		name: 'blur',
		get(target) {
			return +getBlurMatch(target)[1] || 0;
		},
		init(target, endValue) {
			let data = this,
				filter = gsap.getProperty(target, blurProperty),
				endBlur = 'blur(' + endValue + 'px)',
				match = getBlurMatch(target)[0],
				index;
			if (filter === 'none') {
				filter = '';
			}
			if (match) {
				index = filter.indexOf(match);
				endValue =
					filter.substr(0, index) +
					endBlur +
					filter.substr(index + match.length);
			} else {
				endValue = filter + endBlur;
				filter += filter ? ' blur(0px)' : 'blur(0px)';
			}
			data.target = target;
			data.interp = gsap.utils.interpolate(filter, endValue);
		},
		render(progress, data) {
			data.target.style[blurProperty] = data.interp(progress);
		},
	});
})();

const images = gsap.utils.toArray('img');
const loader = document.querySelector('.loader_progress');
const updateProgress = (instance) =>
	(loader.textContent = `${Math.round(
		(instance.progressedCount * 100) / images.length
	)}%`);

imagesLoaded(images).on('progress', updateProgress).on('always', showDemo);

function showDemo(params) {
	gsap.to('.preloader', {
		autoAlpha: 0,
		duration: 1,
		delay: 2,
		ease: 'power3.out',
		onComplete: function () {
			$('.preloader').remove();
			gsap.to('.main_header', {
				duration: 1,
				top: '0%',
				ease: 'power3.out',
				onComplete: function () {
					gsap.to(
						'.site_logo, .primary_menu > li:not(:last-child), .user_profile',
						{
							autoAlpha: 1,
							y: 0,
							duration: 0.5,
							stagger: 0.07,
							ease: 'back.out(1.7)',
							onComplete: function () {
								$(document).scrollTop(0);
								$('body').addClass('loaded');
								sliders();
								scrollAnim();
								gsap.to('#main', {
									autoAlpha: 1,
									blur: 0,
									duration: 1,
									ease: 'power3.out',
								});
							},
						}
					);
				},
			});
		},
	});
	function scrollAnim(params) {
		gsap.utils.toArray('section').forEach((el) => {
			const w = el.querySelectorAll('.section_title');
			gsap.from(w, {
				scrollTrigger: el,
				y: 50,
				opacity: 0,
				duration: 1,
				stagger: 0.07,
				ease: 'power3.out',
			});
		});
		gsap.from('.trending_news_slider .swiper-slide', {
			scrollTrigger: '.trending_news_slider',
			y: 50,
			opacity: 0,
			duration: 1,
			stagger: 0.07,
			ease: 'power3.out',
		});
		gsap.from('.happen_news_slider .news_article', {
			scrollTrigger: '.happen_news_slider',
			y: 50,
			opacity: 0,
			duration: 1,
			stagger: 0.07,
			ease: 'power3.out',
		});
		gsap.from(
			'.footer_logo, .footer_nav_list, .footer_form, .footer_social',
			{
				scrollTrigger: {
					trigger: '.main_footer',
				},
				y: 50,
				opacity: 0,
				duration: 1,
				stagger: 0.07,
				ease: 'power3.out',
			}
		);
	}
	function sliders() {
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
		var hpnNewsPrev = document.querySelector(
			'.happen_sec .swiper-button-prev'
		);
		var hpnNewsNext = document.querySelector(
			'.happen_sec .swiper-button-next'
		);
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
						autoAlpha: 0,
						y: 20,
					},
					{
						autoAlpha: 1,
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
					autoAlpha: 0,
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
	}
}
$(window).bind('load', function (event) {
	var headHeight = $('.main_header').outerHeight();
	$('body').css('padding-top', headHeight);
});
$(document).ready(function () {
	// For Loading Animation
	gsap.set('#main', {
		autoAlpha: 0,
		blur: 20,
	});

	gsap.set('.main_header', {
		top: '-100%',
	});
	gsap.set('.site_logo, .primary_menu > li, .user_profile', {
		autoAlpha: 0,
		y: 15,
	});
});
