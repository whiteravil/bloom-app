$(function() {

	let wrapper 	  					= $('.wrapper .simplebar-content-wrapper'),
			scrollPos     				= 0,
			directionScrollGlobal = 1;

	function checkMob() {
		if ( $(window).width() >= 992 ) {
			$('body').removeClass('scroll');
			$('.wrapper').removeClass('no-scroll');
		}
		else {
			$('body').addClass('scroll');
			$('.wrapper').addClass('no-scroll');
		}
	}checkMob();

	let textPos = 0,
			textDirection = 1,
			textFirst = $('.text-slider-item:first-child'),
			textLast = $('.text-slider-item:last-child'),
			textFirstContent = textFirst.text(),
			textLastContent = textLast.text(),
			textScrollDelay = $(window).width() > 575 ? 10 : 5;

	setInterval(() => {
		textFirst.css({
			'-webkit-transform': `translate3d(${-textPos}px, 0, 0)`,
			'-ms-transform': `translate3d(${-textPos}px, 0, 0)`,
			'transform': `translate3d(${-textPos}px, 0, 0)`,
		})
		textLast.css({
			'-webkit-transform': `translate3d(${textPos}px, 0, 0)`,
			'-ms-transform': `translate3d(${textPos}px, 0, 0)`,
			'transform': `translate3d(${textPos}px, 0, 0)`,
		})
		textPos += textScrollDelay * directionScrollGlobal
	}, 50)
	setInterval(() => {
		textFirst.text(textFirst.text() + textFirstContent);
		textFirst.attr('data-copy', textFirst.text() + textFirstContent);
		textLast.text(textLast.text() + textLastContent);
		textLast.attr('data-copy', textLast.text() + textLastContent);
	}, 15000)

	function scrollAnimates() {

		let docHeight    = $('.wrapper .simplebar-content').outerHeight(true),
				scr 				 = $(window).width() >= 992 ? wrapper.scrollTop() : $(window).scrollTop(),
				projectsTape = $('.projects-tape'),
				textTape 		 = $('.text-slider-tape'),
				directionScroll = scr > scrollPos ? 1 : -1;

		directionScrollGlobal = directionScroll;

		if ( projectsTape.length !== 0 && $(window).width() >= 576 ) {
			// if ( -1 * projectsTape.offset().top < projectsTape.height() ) {
			// 	projectsTape.css({
			// 		'-webkit-transform': `translate3d(-${scr}px, 0, 0)`,
			// 		'-ms-transform': `translate3d(-${scr}px, 0, 0)`,
			// 		'transform': `translate3d(-${scr}px, 0, 0)`,
			// 	})
			// }
		}

		if ( textTape.length !== 0 ) {
			if ( scr > textTape.offset().top - $(window).height() ) {
				let del = $(window).width() > 992 ? 100 : 200;
				textPos += ( scr / del ) * directionScroll;
			}
		}

		if ( $('.s-how-rent').length !== 0 ) {
			$('.s-how-rent').each(function() {
				let sHowRent 				= $(this),
						sHowRentOffset  = $(window).width() >= 992 ?  sHowRent.offset().top : scr - sHowRent.offset().top,
						height					= parseInt(( sHowRent.outerHeight() + $(window).height() )),
						progress        = ( sHowRentOffset - $(window).height() ) * -100 / height;

				if ( sHowRentOffset - $(window).height() < 0 && sHowRentOffset * -1 <= sHowRent.outerHeight() ) {
					let frame = progress * 45 / 100;
					drawImageFunc(frame);
				}
			});
		}

		$(window).width() >= 576 ? $('.daterangepicker').hide() : null;
		
		scrollPos = scr;

		stickyFilter();

	};

	let pos = 0;
	function drawImageFunc(frame) {
		pos = $('.rent-image').outerWidth() * parseInt(frame);
		$('.rent-image').each(function() {
			let thsImg = $(this);
			thsImg.attr('style') !== undefined ? thsImg.css('background-position', `left -${pos}px top 0`) : null
		})
	};

	function bedRotate() {
		let posBed = 1,
				posDirect = 1;
		setInterval(() => {
			$('.bed-image').css('background-position', `top 0 left -${$('.bed-image').outerWidth() * posBed}px`);
			if ( posBed === 46 ) {
				posDirect = 0
			}
			else if ( posBed === 1 ) {
				posDirect = 1
			}
			posDirect === 1 ? posBed++ : posBed--
		}, 50)
	}
	
	let scrollDelta = 0;
	function scrollAnimateCallback(e) {

		let docHeight = $('.wrapper .simplebar-content').outerHeight(true),
				scr       = $(window).width() >= 992 ? wrapper.scrollTop() : $(window).scrollTop();

		if ( scr >= docHeight - $(window).height() - 5 ) {
			scrollDelta += e.originalEvent.deltaY;
			if ( scrollDelta > 1000) {
				$('.footer-right').addClass('opened');
				$('.footer-info .h2').addClass('hidden-animate');
			}
			else if ( e.originalEvent.deltaY < 0 ) {
				$('.footer-right').removeClass('opened');
				$('.footer-info .h2').removeClass('hidden-animate');
			}
		}
		else {
			scrollDelta = 0;
			$('.footer-right').removeClass('opened');
			$('.footer-info .h2').removeClass('hidden-animate');
		}

	};

	let $selectAddress = $('.select-address');

	$selectAddress.select2({
		multiple: true,
		maximumSelectionLength: 1,
		language: {
			noResults: function(){
				return 'Нет совпадений'
			},
			maximumSelected: function() {
				return 'Вы можете выбрать только один адрес'
			}
		}
	});

	$selectAddress.on('select2:open', function(e) {
		// if ( !$(this).hasClass('catalog-filters-select-metro') ) {
			$('.select2-dropdown').parent().addClass(`select-address--dropdown ${$(this).hasClass('catalog-filters-select-metro') ? 'small-size' : ''}`).css('opacity', 0);
			setTimeout(() => {
				$('.select-address--dropdown').css({
					'height': `${$('.select-address--dropdown .select2-dropdown').outerHeight()}px`,
					'opacity': 1
				});
				$('.select-address--dropdown .select2-dropdown').hide();
				$('.select-address--dropdown .select2-dropdown').slideDown(300)
			}, 100)
		// }
		// else {
		// 	$('.select2-dropdown').parent().addClass('select-default-dropdown').css('opacity', 0);
		// 	setTimeout(() => {
		// 		$('.select-default-dropdown').css({
		// 			'height': `${$('.select-default-dropdown .select2-dropdown').outerHeight()}px`,
		// 			'opacity': 1
		// 		});
		// 		$('.select-default-dropdown .select2-dropdown').hide();
		// 		$('.select-default-dropdown .select2-dropdown').slideDown(300)
		// 	}, 100)
		// }
	});

	$('body').on('input', '.select2-search__field', function() {
		$('.select-address--dropdown').css({
			'height': `${$('.select-address--dropdown .select2-dropdown').outerHeight()}px`,
		})
	});

	let animateInterval = 0;
	$('.rent-arrow svg').each(function() {
		setTimeout(() => {
			$(this).addClass('animate')
		}, animateInterval)
		animateInterval += 375
	});

	$('.questions-nav-link').on('click', function() {
		let link = $(this),
				tab  = $(`.questions-tab[data-tab=${link.data('tab')}]`);
		if ( tab.is(':hidden') ) {
			$('.questions-nav-link').removeClass('active');
			link.addClass('active')
			$('.questions-tab').removeClass('animate').addClass('hide-animate');
			tab.show();
			tab.removeClass('hide-animate');
			setTimeout(() => {
				tab.addClass('animate');
			}, 10);
			setTimeout(() => {
				$('.questions-tab').each(function() {
					if ( $(this).index() !== tab.index() ) {
						$(this).hide().removeClass('hide-animate');
					}
				});
			$('.questions-tabs').css('height', '')
			}, 300);
		}
		tabHeight();
		$('.questions-nav').removeClass('opened');
		setTimeout(() => {
			$('.questions-nav').hide()
		}, 300)
		$('.questions-nav-mob-active').text($(this).text())
	});

	$('.questions-nav-mob-active').on('click', function() {
		let nav = $('.questions-nav');
		if ( nav.is(':hidden') ) {
			nav.show();
			setTimeout(() => {
				nav.addClass('opened')
			}, 50)
		}
		else {
			nav.removeClass('opened');
			setTimeout(() => {
				nav.hide()
			}, 300)
		}
	});

	function tabHeight() {
		$('.questions-tabs').each(function() {
			let height = 0,
					ths = $(this),
					tab = ths.find('.questions-tab');
			tab.each(function() {
				tab.outerHeight() > height ? height = tab.outerHeight() : null
			});
			ths.css('height', `${height}px`)
		});
	}tabHeight();

	$('.footer-right').on('click', function() {
		$('.footer-right').addClass('opened');
		$('.footer-info .h2').addClass('hidden-animate');
	});

	$('.footer-left').on('click', function() {
		$('.footer-right').removeClass('opened');
		$('.footer-info .h2').removeClass('hidden-animate');
	});

	$(window).on('resize', function() {
		tabHeight();
		checkMob();
		stickyFilter();
	});

	$('.phone-mask').inputmask({
  	mask: "+7 999 999-99-99",
  	showMaskOnHover: false
  });

	let $defaultSelect = $('.select-styles');
	$defaultSelect.select2({
		minimumResultsForSearch: -1
	})

	$defaultSelect.on('select2:open', function(e) {
		$('.select2-dropdown').parent().addClass('select-default-dropdown').css('opacity', 0);
		setTimeout(() => {
			$('.select-default-dropdown').css({
				'height': `${$('.select-default-dropdown .select2-dropdown').outerHeight()}px`,
				'opacity': 1
			});
			$('.select-default-dropdown .select2-dropdown').hide();
			$('.select-default-dropdown .select2-dropdown').slideDown(300)
		}, 100)
	});


	let datePickerInput = $('.date-picker');

	moment.locale('ru');

	datePickerInput.each(function() {
		let ths = $(this);
		ths.daterangepicker({
			linkedCalendars: $(window).width() >= 768 ? true : false,
			opens: 'left',
			autoUpdateInput: false,
			autoApply: true,
			locale: {
				format:	ths.data('format'),
				separator: " — ",
				applyLabel: "Применить",
				cancelLabel: "очистить выбор",
				fromLabel: "с",
				toLabel: "по",
				customRangeLabel: "Custom",
				daysOfWeek: [
					"пн",
					"вт",
					"ср",
					"чт",
					"пт",
					"сб",
					"вс"
				],
				monthNames: [
					"январь",
					"февраль",
					"март",
					"апрель",
					"май",
					"июнь",
					"июль",
					"август",
					"сентябрь",
					"октябрь",
					"ноябрь",
					"декабрь"
				],
			},
		}, function(chosen_date_first, chosen_date_last) {
			datePickerInput.val( chosen_date_first.format(ths.data('format')) + ' — ' + chosen_date_last.format(ths.data('format')) );
			updateRentDate(ths);
		});
	});
	
	$('.date-picker').on('showCalendar.daterangepicker', function(ev, picker) {
		addRoundedToCalendarItems();
		addMobButtonsForDatepicker();
	});

	$('.date-picker').on('show.daterangepicker', function(ev, picker) {
		addRoundedToCalendarItems();
		checkCalendarPosition();
		addMobButtonsForDatepicker();
	});

	$('.date-picker').on('hide.daterangepicker', function() {
		$('.daterangepicker').removeClass('bottom-position')
	})

	$('.daterangepicker').on('click', addRoundedToCalendarItems);

	function addRoundedToCalendarItems() {
		let calendar = $('.daterangepicker'),
				leftCalendar = calendar.find('.drp-calendar.left'),
				rightCalendar = calendar.find('.drp-calendar.right');
		calendar.find('td.available').removeClass('rounded-right rounded-left');
		leftCalendar.find('td.available.in-range:not(".ends"):last').addClass('rounded-right');
		rightCalendar.find('td.available.in-range:not(".ends"):first').addClass('rounded-left');
		checkCalendarPosition();
	}

	function checkCalendarPosition() {
		if ( $(window).width() >= 992 ) {
			setTimeout(() => {
				$('.daterangepicker').each(function() {
					let thsDate =  $(this);
					thsDate.css('transform', 'translateY(0px)');
					if ( thsDate.is(':visible') ) {
						let dtTop = parseInt(thsDate.css('top')),
								dtHeight = thsDate.outerHeight(),
								wdHeight = $(window).height();
						$('.daterangepicker').css('transform', 'translateY(0px)');
						if ( wdHeight - dtTop < dtHeight ) {
							let minus = dtTop - wdHeight + dtHeight;
							thsDate.css('transform', `translateY(-${minus + 40}px)`);
						}
					}
				});
			}, 5)
		}
		else {
			$('.daterangepicker').css('transform', 'translateY(0px)');
		}
	}

	$('.open-popup').on('click', function(e) {
		e.preventDefault();
		let id = $(this).attr('href');
		openPopup(id);
	});

	function openPopup(id) {
		$(id).show();
		$('body').addClass('no-scroll-mob');
		if ( $(window).width() < 992 ) {
			$('body').removeClass('scroll');
		}
		document.addEventListener('touchmove', function(e) {e.preventDefault();}, true);
		setTimeout(() => {
			$(id).addClass('opened')
		}, 50)
		setTimeout(() => {
			$('.map-loader').removeClass('opened')
		}, 1050)
		setTimeout(() => {
			$('.map-loader').hide()
		}, 1650)
	}

	setTimeout(() => {
		$('.map-loader').removeClass('opened')
	}, 1050)
	setTimeout(() => {
		$('.map-loader').hide()
	}, 1650)

	function closePopup(popup) {
		$('body').removeClass('no-scroll-mob');
		if ( $(window).width() < 992 ) {
			$('body').addClass('scroll');
		}
		document.removeEventListener('touchmove', function(e) {e.preventDefault();}, true);
		if ( popup ) {
			popup.removeClass('opened');
			setTimeout(() => {
				popup.hide()
			}, 300);
		}
		else {
			$('.popup-wrapper').removeClass('opened');
			setTimeout(() => {
				$('.popup-wrapper').hide()
			}, 300);
		}
		$('.rent-apart-success').removeClass('opened');
	}

	$('.popup-close').on('click', function() {
		closePopup($(this).parents('.popup-wrapper'));
	});
	$('.popup-bg').on('click', function() {
		closePopup($(this).parents('.popup-wrapper'));
	});
	$('.catalog-map-back-link').on('click', function() {
		closePopup();
	});

	$('.galleries-carousel').owlCarousel({
		items: 1,
		nav: false,
		dots: false,
		margin: 15,
		URLhashListener:true,
		startPosition: 'URLHash',
		touchDrag: false,
		mouseDrag: false
	});

	$('.gallery').owlCarousel({
		items: 1,
		nav: true,
		dots: true,
		margin: 0,
		responsive: {
			0: {
				margin: 16
			},
			576: {
				margin: 0
			}
		}
	});

	$('.gallery-nav-link').on('click', function() {
		$('.gallery-nav-link').removeClass('active');
		$(this).addClass('active viewed')
	});


	function checkDefaultDate() {
		if ( $('.rate-date-input').length !== 0 ) {
			if ( $('.rate-date-input').val().length > 0 ) {
				$('.rent-date-item.from .date-input').text($('.rate-date-input').val().split(' — ')[0]);
				$('.rent-date-item.to .date-input').text($('.rate-date-input').val().split(' — ')[1]);
				$('.rent-date-item.mobile .date-input').text($('.rate-date-input').val());
				$('.rate-date-input-from').val($('.rate-date-input').val().split(' — ')[0]);
				$('.rate-date-input-to').val($('.rate-date-input').val().split(' — ')[1]);
			}
		}
	}checkDefaultDate();

	function updateRentDate(input) {
		let thsValue = input.val(),
				valArr = thsValue.split(' — ');
		$('.rent-date-item.from .date-input').text(valArr[0]);
		$('.rent-date-item.to .date-input').text(valArr[1]);
		$('.rent-date-item.mobile .date-input').text(valArr[0].slice(0,-5) + ' — ' + valArr[1].slice(0,-5));
		$('.rate-date-input-from').val(valArr[0]).change();
		$('.rate-date-input-to').val(valArr[1]).change();
	}

	$('.rate-date-input-from').on('change', function() {
		console.log($(this).val())
	});

	$('.rate-date-input-to').on('change', function() {
		console.log($(this).val())
	});

	function stickyFilter() {
		if ( $('.catalog-filters-wrapper').length > 0 ) {
			let filterBlock  = $('.catalog-filters-wrapper'),
					forOffset    = $('.catalog-filters-height'),
					filterOffset = $(window).width() >= 992 ? forOffset.offset().top :  $(window).scrollTop() - forOffset.offset().top,
					height       = 83;
			if ( 0 > filterOffset ) {
				filterBlock.addClass('fixed')
				forOffset.css({
					'height': `${height + parseInt(filterBlock.css('margin-bottom'))}px`,
				})
			}
			else {
				filterBlock.removeClass('fixed')
				forOffset.css('height', '')
			}
		}
	};

	$('.filter-fixed-btn').on('click', function() {
		let filterData = $(this).data('filter'),
				filter = $(`.catalog-filters-mob-left[data-filter="${filterData}"]`);
		filter.addClass('filter-block');
		setTimeout(() => {
			filter.addClass('opened');
		}, 50);
		if ( $(window).width() < 576 ) {
			$('body').removeClass('scroll');
		}
	});

	function closeFilterMenu() {
		$('.catalog-filters-mob-left').removeClass('opened');
		setTimeout(() => {
			$('.catalog-filters-mob-left').removeClass('d-block');
		}, 300);
		if ( $(window).width() < 576 ) {
			$('body').addClass('scroll');
		}
	}

	$('.close-filter-menu-btn').on('click', closeFilterMenu);

	$('.mobile-map-block-click').on('click', function() {
		openPopup('#catalog-map')
	});

	function addMobButtonsForDatepicker() {
		$('.daterangepicker').each(function() {
			let dp = $(this);
			if ( dp.find('.daterangepicker-flex').length === 0 ) {
				dp.find('> *').wrapAll('<div class="daterangepicker-flex-block">');
				dp.find('.daterangepicker-flex-block').wrap('<div class="daterangepicker-flex">');
				dp.find('.daterangepicker-flex-block').prepend('<div class="daterangepicker-title">выберите даты проживания</div>');
			}
		});
	}addMobButtonsForDatepicker();

	$('.video-block').each(function() {
		let ths 	= $(this),
				play 	= ths.find('.play-video'),
				video = ths.find('iframe'),
				src   = video.attr('src');
		play.on('click', function() {
			play.fadeOut(400);
			setTimeout(() => {
				video.attr('src', src + '&autoplay=1')
			}, 200)
		});
	});

	$('.scroll-to').on('click', function(e) {
		let id 						= $(this).attr('href'),
				scrollWrapper = $(window).width() >= 992 ? $('.simplebar-content-wrapper').first() : 	$('body, html'),
				scrTop        = $(window).width() >= 992 ? scrollWrapper.scrollTop() : 0;
		e.preventDefault();
		scrollWrapper.animate({
			scrollTop: $(id).offset().top + scrTop
		}, 1000)
	});

	$('.similar-aparts-row').owlCarousel({
		items: 3,
		margin: 50,
		dots: true,
		nav: true,
		responsive: {
			0: {
				items: 1,
				margin: 16
			},
			420: {
				items: 2,
				margin: 16
			},
			992: {
				items: 3,
				margin: 16
			},
			1366: {
				margin: 50
			}
		}
	});

	$('.apartment-descr-text-wrapper').each(function() {
		let ths 		= $(this),
				btn     = ths.find('.apartment-descr-text-open');
		btn.on('click', function() {
			ths.toggleClass('full')
		})
	});

	$('.btn-success').on('click', function(e) {
		e.preventDefault();
		let id = $(this).data('success');
		console.log(id)
		$(id).addClass('opened');
	});

	$('.write-more').on('click', function(e) {
		e.preventDefault();
		$('.form-success').removeClass('opened');
	});

	$('.catalog-filters-more').each(function() {
		let btn  = $(this).find('.open-more-filter'),
				drop = $(this).find('.catalog-filters-drop');
		btn.on('click', function(e) {
			e.preventDefault();
			if ( drop.is(':hidden') ) {
				drop.show();
				$('.catalog-filters-drop-bg').show();
				$('.simplebar-content').first().css('position', 'relative');
				setTimeout(() => {
					drop.addClass('opened');
					$('.catalog-filters-drop-bg').addClass('opened');
				}, 50)
			}
			else {
				closeMoreFilters();
			}
		});
	});

	function closeMoreFilters() {
		$('.catalog-filters-drop').removeClass('opened');
		$('.catalog-filters-drop-bg').removeClass('opened');
		setTimeout(() => {
			$('.catalog-filters-drop').hide();
			$('.catalog-filters-drop-bg').hide();
			$('.simplebar-content').first().css('position', '');
		}, 300)
	}

	$('.close-filter').on('click', closeMoreFilters);
	$('.catalog-filters-drop-bg').on('click', closeMoreFilters);

	$(document).on('click', function(e) {
		// if (
		// 		!$(e.target).closest('.catalog-filters-mob-left').length &&
		// 		!$(e.target).closest('.filter-fixed-btn').length &&
		// 		!$(e.target).closest('.daterangepicker').length &&
		// 		!$(e.target).parent().hasClass('available') &&
		// 		$(window).width() >= 576
		// 	) {
		// 	closeFilterMenu();
		// }
		if ( !$(e.target).closest('.catalog-filters-more').length ) {
			closeMoreFilters()
		}
		if ( !$(e.target).closest('.catalog-filters-checkbox-group').length ) {
			$('.catalog-filters-checkboxes-drop').hide();
		}
	});

	$('.links').each(function() {
		let ths = $(this);
		ths.find('.open-links').on('click', function(e) {
			e.preventDefault();
			ths.toggleClass('opened')
		});
	});

	$('.catalog-filters-selected-close').on('click', function() {
		$(this).parent().remove();
	});

	$('.catalog-filters-checkbox-group').each(function() {
		let ths 	 = $(this),
				active = ths.find('.catalog-filters-active-checkboxes'),
				drop   = ths.find('.catalog-filters-checkboxes-drop');
		checkFiltersCheckboxes(active, drop);
		drop.find('input[type=checkbox]').on('change', function() {
			checkFiltersCheckboxes(active, drop);
		});
		active.on('click', function() {
			drop.is(':hidden') ? drop.slideToggle(400) : drop.hide();
		});
	});

	function checkFiltersCheckboxes(active, drop) {
		let activeTextArr = [];
		drop.find('.checkbox-label').each(function() {
			let thsLabel = $(this);
			thsLabel.find('input').is(':checked') ? activeTextArr.push(thsLabel.find('span').text().trim()) : null;
		});
		activeTextArr.length !== 0 ? active.text(activeTextArr.join(', ')) : active.text('выберите из списка')
	}

	// $('.circle-btn.liked').on('click', function(e) {
	// 	e.preventDefault();
	// 	$(this).toggleClass('active')
	// });

	if ( $('.popup-wrapper:visible').length > 0 && $(window).width() < 576 ) {
		$('body').removeClass('scroll');
	}

	wrapper.on('scroll', scrollAnimates);
	$(window).on('scroll', scrollAnimates);
	wrapper.on('wheel', scrollAnimateCallback);
	$(window).on('wheel', scrollAnimateCallback);
	wrapper.on('touchmove', scrollAnimateCallback);
	$(window).on('touchmove', scrollAnimateCallback);

	$(window).on('load', function() {
		$('.loader-img').hide();
		$('.rent-image').addClass('loaded');
		bedRotate();
		scrollAnimates();
		stickyFilter();
	});

});

