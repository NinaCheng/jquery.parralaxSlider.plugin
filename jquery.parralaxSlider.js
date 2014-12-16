(function ($) {
	var _window = $(window);
	
	var updateFixedLayout = function (mainContainer, childSection, childSectionInner, navigation) {	
		scrollTop = $(document).scrollTop(),
		windowHeight = _window.height();

		var config = {
			fixedContainer : mainContainer.first(),
			navContainer : $(navigation),
			currentIndex : Math.floor(scrollTop / windowHeight),
			navIndex : Math.round(scrollTop / windowHeight),
			nextIndex : Math.floor(scrollTop / windowHeight) + 1
		};

		// if element has elements within it
		if (config.fixedContainer.length > 0) {
			config.childSections = config.fixedContainer.find(childSection);

			config.childSections.each(function (index) {
				var _this = $(this),
				contentInner = _this.find(childSectionInner);
				if (_this.height() != windowHeight) {
					_this.css({
						'height' : windowHeight
					});
				}

				// if index equals current or next element
				if (index == config.currentIndex || index == config.nextIndex) {
					contentInner.show();
					var _top = windowHeight - scrollTop % windowHeight - (contentInner.position().top + $('html').position().top),
					_bottom = contentInner.height(),
					_right = contentInner.width(),
					_left = 0;
					if (index == config.nextIndex) {
						//Clip
						contentInner.css({
							'clip' : 'rect(' + _top + 'px,' + _right + 'px,' + _bottom + 'px,' + _left + 'px)',
							'clip-path' : 'rect(' + _top + 'px,' + _right + 'px,' + _bottom + 'px,' + _left + 'px)'
						});

					} else {

						contentInner.css({
							'clip' : 'rect(' + 0 + 'px,' + _right + 'px,' + _top + 'px,' + _left + 'px)',
							'clip-path' : 'rect(' + 0 + 'px,' + _right + 'px,' + _top + 'px,' + _left + 'px)'
						});

					}
				} else {
					if (contentInner.is(':visible')) {
						contentInner.hide();
					}

				}
			});

			if (config.navContainer.length) {
				config.navContainer.find('a:eq(' + config.navIndex + ')').addClass('current-item').siblings().removeClass('current-item');
				if (config.navIndex == 1 || config.navIndex == 3 || config.navIndex == 5) {
					config.navContainer.addClass('dark-nav');
				} else {
					config.navContainer.removeClass('dark-nav');
				}
			}

			//console.log(config.navIndex);
		}
	}

	$.fn.parallaxSlider = function (options) {
		var config = $.extend({
				mainContainer : this,
				childSectionSelector : 'section',
				childSectionInner : '.reason-inner',
				navigationSelector : '.reason-nav'
			}, options);

		_window.on('scroll load', function (e) {
			updateFixedLayout(config.mainContainer, config.childSectionSelector, config.childSectionInner, config.navigationSelector);
		});
		
		return this;
	}
}(jQuery));
