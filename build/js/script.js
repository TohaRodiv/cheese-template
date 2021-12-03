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

		new Swiper(".__products-slider", {
			slidesPerView: 4,
			spaceBetween: 10,
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
		});
	})();


})($);