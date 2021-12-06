($ => {

	($ => {
		document.querySelectorAll(".__toggle-sub-menu")
			.forEach(btn => {
				btn.addEventListener("click", e => {
					const target = $(e.currentTarget);
					target.toggleClass("active");
					$(target).next(".__submenu").stop().slideToggle();
				});
			});

	})($);

	(() => {
		new Swiper(".__top-slider", {
			pagination: {
				el: ".swiper-pagination",
				dynamicBullets: true,
				clickable: true,
			},
			grabCursor: true,
			effect: "creative",
			effect: "creative",
			creativeEffect: {
				prev: {
					shadow: true,
					translate: ["-20%", 0, -1],
				},
				next: {
					translate: ["100%", 0, 0],
				},
			},
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
		});

		document.querySelectorAll(".__products-slider").forEach(slider => {
			new Swiper(slider, {
				slidesPerView: 1,
				spaceBetween: 0,
				pagination: {
					el: '.__product-slider-pagination',
					type: 'bullets',
					clickable: true,
				},
				navigation: {
					nextEl: '.__product-slider-button-next',
					prevEl: '.__product-slider-button-prev',
				},
				autoplay: {
					delay: 5000,
					pauseOnMouseEnter: true,
				},
				breakpoints: {
					576: {
						slidesPerView: 2,
						spaceBetween: 10,
					},

					1200: {
						slidesPerView: 3,
						spaceBetween: 10,
					},

					1400: {
						slidesPerView: 4,
						spaceBetween: 10,
					}
				},
			});
		});

		new Swiper(".__news-slider", {
			slidesPerView: 1,
			navigation: {
				nextEl: '.__product-slider-button-next',
				prevEl: '.__product-slider-button-prev',
			},
			pagination: {
				el: '.__product-slider-pagination',
				type: 'bullets',
				clickable: true,
			},
			autoplay: {
				delay: 5000,
				pauseOnMouseEnter: true,
			},
			breakpoints: {
				576: {
					slidesPerView: 2,
					spaceBetween: 10,
				},

				1200: {
					slidesPerView: 3,
					spaceBetween: 10,
				},
			},
		});

	})();

	(() => {
		const toTopBtn = document.querySelector(".__to-top");
		const scrollContent = document.querySelector(".__top-main");

		if (toTopBtn && scrollContent) {
			toTopBtn.addEventListener('click', e => {
				e.preventDefault();
				pageScrollTop();
			});
			handlePageScroll();

			window.addEventListener('scroll', handlePageScroll);
			scrollContent.addEventListener('scroll', handlePageScroll);
		}

		function pageScrollTop() {
			[window, scrollContent].forEach(itemScroll => {
				itemScroll.scroll({
					top: 0,
					left: 0,
					behavior: 'smooth',
				});
			});
			toTopBtn.classList.remove('hidden');
		}

		function isReadyActive (scrollPos, scrollHeight) {
			return scrollPos > scrollHeight / 3;
		}

		function handlePageScroll() {
			let windowScroll = window.pageYOffset;
			let windowHeight = window.outerHeight;

			let scrollContentScroll = scrollContent.scrollTop;

			if (isReadyActive(windowScroll, windowHeight) || isReadyActive(scrollContentScroll, windowHeight)) {
				toTopBtn.classList.remove('hidden');
			} else {
				toTopBtn.classList.add('hidden');
			}
		}
	})();


})($);