"use strict";
const JSCCommon = {
	modalCall() {
		const link = ".link-modal-js";

		Fancybox.bind(link, {
			arrows: false,
			infobar: false,
			touch: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el => {
			el.addEventListener("click", () => {
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},

	// tabs  .
	tabscostume(tab) {

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
						else {
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function () {
								$(this).removeClass('active');
							});
						}
					});

				});
			}
		}
	},
	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	// JSCCommon.tabscostume('tabs'); 
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.bread-slider-js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true,
		spaceBetween: 0,
		// loopFillGroupWithBlank: true,
		// touchRatio: 0.2,
		// slideToClickedSlide: true,
		// freeModeMomentum: true,

	});

	const sArticleSlider = new Swiper('.mediaContent__slider--js', {

		// slidesPerView: 'auto',
		slidesPerView: 1,
		loop: true,
		watchOverflow: true,
		spaceBetween: 0,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	});

	const sLicensesSlider = new Swiper('.sLicenses__slider--js', {

		slidesPerView: 'auto',
		loop: true,
		watchOverflow: false,
		freeMode: true,
		spaceBetween: 0,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			0: {
				slidesPerView: 'auto'
			},
			640: {
				slidesPerView: 3
			},
			768: {
				slidesPerView: 4
			},
		}
	});
	const ssInstitute = new Swiper('.sInstitute__slider--js', {

		slidesPerView: 'auto',
		loop: true,
		watchOverflow: false,
		freeMode: true,
		spaceBetween: 0,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			0: {
				slidesPerView: 2
			},
			640: {
				slidesPerView: 3
			},
			768: {
				slidesPerView: 4
			},
		}
	});
	const sDescription = new Swiper('.sDescription__slider--js, .sServiseGal__slider--js', {

		slidesPerView: 1,
		loop: false,
		watchOverflow: false,
		spaceBetween: 90,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	});

	const sTestingContent = new Swiper('.sTestingContent__slider--js', {

		slidesPerView: 1,
		loop: true,
		watchOverflow: false,
		spaceBetween: 0,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	});

	var wow = new WOW(
		{
			animateClass: 'animate__animated', // animation css class (default is animated)
			mobile: false,       // trigger animations on mobile devices (default is true)
			scrollContainer: true
		}
	);
	wow.init();



	const convertImages = (query, callback) => {
		const images = document.querySelectorAll(query);

		images.forEach(image => {
			fetch(image.src)
				.then(res => res.text())
				.then(data => {
					const parser = new DOMParser();
					const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');

					if (image.id) svg.id = image.id;
					if (image.className) svg.classList = image.classList;

					image.parentNode.replaceChild(svg, image);
				})
				.then(callback)
				.catch(error => console.error(error))
		});
	}

	convertImages('.img-svg');


	$('.custom-select-multiple-js').each(function () {
		
		let th = $(this);
		$(this).select2(
			{
				dropdownParent: th.parent(),
				closeOnSelect: false
				// placeholder: th.data("placeholder"), 
			}
			);
	})
	
	
	$('.news__cards--2js').slick({
    // arrows: false,
		nextArrow: `<div class="slider__arrow slider__arrow--next"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M15 17.5L9 11.5L15 5.5" stroke="currentColor" stroke-width="2"></path>
					</svg></div>`,
    prevArrow: `<div class="slider__arrow slider__arrow--prev"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M15 17.5L9 11.5L15 5.5" stroke="currentColor" stroke-width="2"></path>
					</svg></div>`,
    slidesToShow: 1,
    mobileFirst: true,
    infinite: true,
    responsive: [ 
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  })

	$('.sAboutTeam__card').hcSticky({
    stickTo: $('.sAboutTeam__sidebar--js')
  });

	$(".toggle-search").click(function () {
		$(this).parents('.header__search').toggleClass("active")
			.find('.block-search-wrap').toggleClass("active")
	})

	document.addEventListener('mouseup', (event) => {
		let container2 = event.target.closest("   .header__search.active"); 
		if (!container2) { 
				$(' .header__search.active').removeClass('active').find('.block-search-wrap').removeClass('active'); 
			};
	}, { passive: true });



	let pickers = document.querySelectorAll(".input-date-picker-js");
		pickers.forEach(el => {
		
			// console.log(el);
			new Litepicker({
				element: el,
				singleMode: false,
				dropdowns: {"minYear":1990,"maxYear":null,"months":true,"years":true},
				// inlineMode: true,
				allowRepick: true,
				// selectBackward: true,
				numberOfColumns: 2,
				numberOfMonths: 2,
				tooltipText: {
					one: 'night',
					other: 'nights'
				},
				tooltipNumber: (totalDays) => {
					return totalDays - 1;
				},
				lang: 'ru-RU',
				format: "DD.MM.YYYY",
			})
		});
	
	$("#mobileMenu").on("click", '.menu__select> a', function (e) {
		e.preventDefault();
		// $(this).parents('li')
		$(this).toggleClass("active").next().toggleClass("active")
	}) 
	document.querySelector("#mobileMenu").addEventListener("click", function (e) {
		let a = e.target.closest('a');
		let ul = e.target.closest('.menu__subMenu');
		let toggle = e.target.closest('.menu__subSelect');
		if (a || ul || !toggle) return; 
		toggle.classList.toggle('active');
		$(toggle.querySelector('ul')).slideToggle();
	})
	// $("#mobileMenu").on("click", '.menu__select> a, .menu__subSelect> a', function (e) {
	// 	e.preventDefault();
	// 	// $(this).parents('li')
	// 	$(this).toggleClass("active").next().toggleClass("active")
	// })


	$(document).on("click", '.alert-block__close', function () {
		$(this).parents('.alert-block ').removeClass('active')
	})




		// We want to preview images, so we register
	// the Image Preview plugin, We also register 
	// exif orientation (to correct mobile image
	// orientation) and size validation, to prevent
	// large files from being added
	FilePond.registerPlugin(
		// encodes the file as base64 data
		FilePondPluginFileEncode,
	
		// validates the size of the file
		FilePondPluginFileValidateSize,
		
		// corrects mobile image orientation
		FilePondPluginImageExifOrientation,
		
		// previews dropped images
		FilePondPluginImagePreview
	);

	// Select the file input and use 
	// create() to turn it into a pond
	FilePond.create(
		document.querySelector('.filepond'),
		{
			// labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
			labelIdle: `Нажмите или перетащите  файлы в эту область. .rar .zip .doc .docx .pdf .jpg не более 10 мб`,
		}
	);

	// How to use with Pintura Image Editor:
	// https://pqina.nl/pintura/docs/latest/getting-started/installation/filepond/
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }

