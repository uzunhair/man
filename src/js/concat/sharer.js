/**
 * @preserve
 * Sharer.js
 *
 * @description Create your own social share buttons
 * @version 0.2.17
 * @author Ellison Leao <ellisonleao@gmail.com>
 * @license GPLv3
 *
 */

(function (window, document) {
	'use strict';
	/**
	 * @constructor
	 */
	var Sharer = function(elem) {
		this.elem = elem;
	};

	Sharer.prototype = {
		constructor: Sharer,
		/**
		 *  @function getValue
		 *  @description Helper to get the attribute of a DOM element
		 *  @param {String} attr DOM element attribute
		 *  @returns {String|Empty} returns the attr value or empty string
		 */
		getValue: function(attr) {
			var val = this.elem.getAttribute('data-' + attr);
			return (val === undefined || val === null) ? false : val;
		},

		/**
		 * @event share
		 * @description Main share event. Will pop a window or redirect to a link
		 * based on the data-sharer attribute.
		 */
		share: function() {
			var sharer = this.getValue('sharer').toLowerCase(),
				sharers = {
					facebook: {
						shareUrl: 'https://www.facebook.com/sharer/sharer.php',
						params: {u: this.getValue('url')}
					},
					googleplus: {
						shareUrl: 'https://plus.google.com/share',
						params: {url: this.getValue('url')}
					},
					linkedin: {
						shareUrl: 'https://www.linkedin.com/shareArticle',
						params: {
							url: this.getValue('url'),
							mini: true
						}
					},
					twitter: {
						shareUrl: 'https://twitter.com/intent/tweet/',
						params: {
							text: this.getValue('title'),
							url: this.getValue('url'),
							hashtags: this.getValue('hashtags'),
							via: this.getValue('via')
						}
					},
					email: {
						shareUrl: 'mailto:' + this.getValue('to'),
						params: {
							subject: this.getValue('subject'),
							body: this.getValue('title') + '\n' + this.getValue('url')
						},
						isLink: true
					},
					whatsapp: {
						shareUrl: 'whatsapp://send',
						params: {
							text: this.getValue('title') + ' ' + this.getValue('url')
						},
						isLink: true
					},
					telegram: {
						shareUrl: 'tg://msg_url',
						params: {
							text: this.getValue('title') + ' ' + this.getValue('url')
						},
						isLink: true
					},
					viber: {
						shareUrl: 'viber://forward',
						params: {
							text: this.getValue('title') + ' ' + this.getValue('url')
						},
						isLink: true
					},
					line: {
						shareUrl: 'http://line.me/R/msg/text/?' + encodeURIComponent(this.getValue('title') + ' ' + this.getValue('url')),
						isLink: true
					},
					pinterest: {
						shareUrl: 'https://www.pinterest.com/pin/create/button/',
						params: {
							url: this.getValue('url'),
							media: this.getValue('image'),
							description: this.getValue('description')
						}
					},
					tumblr: {
						shareUrl: 'http://tumblr.com/widgets/share/tool',
						params: {
							canonicalUrl: this.getValue('url'),
							content: this.getValue('url'),
							posttype: 'link',
							title: this.getValue('title'),
							caption: this.getValue('caption'),
							tags: this.getValue('tags')
						}
					},
					hackernews: {
						shareUrl: 'https://news.ycombinator.com/submitlink',
						params: {
							u: this.getValue('url'),
							t: this.getValue('title')
						}
					},
					reddit: {
						shareUrl: 'https://www.reddit.com/submit',
						params: {'url': this.getValue('url')}
					},
					vk: {
						shareUrl: 'http://vk.com/share.php',
						params: {
							url: this.getValue('url'),
							title: this.getValue('title'),
							description: this.getValue('caption'),
							image: this.getValue('image')
						}
					},
					xing: {
						shareUrl: 'https://www.xing.com/app/user',
						params: {
							'op': 'share',
							'url': this.getValue('url'),
							'title': this.getValue('title')
						}
					},
					buffer: {
						shareUrl: 'https://buffer.com/add',
						params: {
							url: this.getValue('url'),
							title: this.getValue('title'),
							via: this.getValue('via'),
							picture: this.getValue('picture')
						}
					},
					instapaper: {
						shareUrl: 'http://www.instapaper.com/edit',
						params: {
							url: this.getValue('url'),
							title: this.getValue('title'),
							description: this.getValue('description')
						}
					},
					pocket: {
						shareUrl: 'https://getpocket.com/save',
						params: {
							url: this.getValue('url')
						}
					},
					digg: {
						shareUrl: 'http://www.digg.com/submit',
						params: {
							url: this.getValue('url')
						}
					},
					stumbleupon: {
						shareUrl: 'http://www.stumbleupon.com/submit',
						params: {
							url: this.getValue('url'),
							title: this.getValue('title')
						}
					},
					flipboard: {
						shareUrl: 'https://share.flipboard.com/bookmarklet/popout',
						params: {
							v: 2,
							title: this.getValue('title'),
							url: this.getValue('url'),
							t: Date.now()
						}
					},
					weibo: {
						shareUrl: 'http://service.weibo.com/share/share.php',
						params: {
							url: this.getValue('url'),
							title: this.getValue('title'),
							pic: this.getValue('image'),
							appkey: this.getValue('appkey'),
							ralateUid: this.getValue('ralateuid'),
							language: 'zh_cn'
						}
					},
					renren: {
						shareUrl: 'http://share.renren.com/share/buttonshare',
						params: {
							link: this.getValue('url')
						}
					},
					myspace: {
						shareUrl: 'https://myspace.com/post',
						params: {
							u: this.getValue('url'),
							t: this.getValue('title'),
							c: this.getValue('description')
						}
					},
					blogger: {
						shareUrl: 'https://www.blogger.com/blog-this.g',
						params: {
							u: this.getValue('url'),
							n: this.getValue('title'),
							t: this.getValue('description')
						}
					},
					baidu: {
						shareUrl: 'http://cang.baidu.com/do/add',
						params: {
							it: this.getValue('title'),
							iu: this.getValue('url')
						}
					},
					douban: {
						shareUrl: 'https://www.douban.com/share/service',
						params: {
							name: this.getValue('title'),
							href: this.getValue('url'),
							image: this.getValue('image')
						}
					},
					okru: {
						shareUrl: 'https://connect.ok.ru/dk',
						params: {
							'st.cmd': 'WidgetSharePreview',
							'st.shareUrl': this.getValue('url'),
							'title': this.getValue('title')
						}
					},
					mailru: {
						shareUrl: 'http://connect.mail.ru/share',
						params: {
							'share_url': this.getValue('url'),
							'linkname': this.getValue('title'),
							'linknote': this.getValue('description'),
							'type': 'page'
						}
					}
				},
				s = sharers[sharer];

			// custom popups sizes
			if (s) {
				s.width = this.getValue('width');
				s.height = this.getValue('height');
			}
			return s !== undefined ? this.urlSharer(s) : false;
		},
		/**
		 * @event urlSharer
		 * @param {Object} sharer
		 */
		urlSharer: function(sharer) {
			var p = sharer.params || {},
				keys = Object.keys(p),
				i,
				str = keys.length > 0 ? '?' : '';
			for (i = 0; i < keys.length; i++) {
				if (str !== '?') {
					str += '&';
				}
				if (p[keys[i]]) {
					str += keys[i] + '=' + encodeURIComponent(p[keys[i]]);
				}
			}
			sharer.shareUrl += str;

			if (!sharer.isLink) {
				var popWidth = sharer.width || 600,
					popHeight = sharer.height || 480,
					left = window.innerWidth / 2 - popWidth / 2 + window.screenX,
					top = window.innerHeight / 2 - popHeight / 2 + window.screenY,
					popParams = 'scrollbars=no, width=' + popWidth + ', height=' + popHeight + ', top=' + top + ', left=' + left,
					newWindow = window.open(sharer.shareUrl, '', popParams);

				if (window.focus) {
					newWindow.focus();
				}
			} else {
				window.location.href = sharer.shareUrl;
			}
		}
	};

	/**
	 * Creates a click event on every DOM element which has the `sharer` class
	 */
	window.addEventListener('load', function() {
		var elems = document.querySelectorAll('.sharer'),
			i,
			l = elems.length;

		function addShare(elem) {
			var target = elem.currentTarget || elem.srcElement;
			var sharer = new Sharer(target);
			sharer.share();
		}

		for (i = 0; i < l ; i++) {
			elems[i].addEventListener('click', addShare);
		}
	});
})(window, document);

/* global Modernizr */
'use strict';

/* Test code */

(function ($, document, window) {
	$(function () {
		var $toTopPageShareContainer = $('#js_to-top_page-share-container');

		if ($toTopPageShareContainer.length === 0) {
			return;
		}

		var $toTop = $('.js_to-top', $toTopPageShareContainer);
		var $share = $('.js_toggle-target', $toTopPageShareContainer);
		var lastPos = 0;
		var tick = 0;

		$toTop.on('click', function () {
			$('html, body').animate({ scrollTop: 0 }, 600);
		});

		setInterval(function () {
			var curPos = $(document).scrollTop();
			if (lastPos < curPos) {
				$toTopPageShareContainer.slideUp(500);
				$share.toggleTargetPopup('close');
				tick = 0;
			} else if (lastPos === curPos && tick > 10) {
				// 5sec.
				$toTopPageShareContainer.slideUp(500);
				$share.toggleTargetPopup('close');
			} else {
				$toTopPageShareContainer.slideDown(500);
				tick = 0;
			}
			tick++;
			lastPos = curPos;
		}, 500);
	});
})($, document, window);
/* exported AreaDataService, throttle, I18NService, NavigationService, RouterDataService */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var AreaDataService = {
	toggleExpandedAreaState: function toggleExpandedAreaState($elem) {
		if ($elem.attr('aria-expanded') === 'true') {
			$elem.attr('aria-expanded', 'false');
		} else if ($elem.attr('aria-expanded') === 'false') {
			$elem.attr('aria-expanded', 'true');
		}
	},
	toggleVisibleAreaState: function toggleVisibleAreaState($elem) {
		if ($elem.attr('aria-hidden') !== 'undefined') {
			$elem.attr('aria-hidden', (!$elem.is(':visible')).toString());
		}
	},
	setExpandedState: function setExpandedState($elem, state) {
		$elem.attr('aria-expanded', state.toString());
	},
	setHiddenState: function setHiddenState($elem, state) {
		$elem.attr('aria-hidden', state.toString());
	}
};

var I18NService = function ($, window) {
	var srv = {};
	srv.data = {};

	srv.setData = function () {
		$.getJSON($('body').data('i18n-json-url') || null, function (data) {
			srv.data = data;
			$(window).trigger('i18n.initialized');
		});
	};

	srv.getDateFormat = function () {
		return srv.data.datepicker.format;
	};

	srv.getDatepicker = function () {
		return srv.data.datepicker;
	};

	srv.getRoutingJSONPath = function () {
		return srv.data.routingJSONPath || null;
	};

	//init
	$(function () {
		srv.setData();
	});

	return {
		getDatepicker: function getDatepicker() {
			return srv.getDatepicker();
		},
		getRoutingJSONPath: function getRoutingJSONPath() {
			return srv.getRoutingJSONPath();
		},
		getDateFormat: function getDateFormat() {
			return srv.getDateFormat();
		}
	};
}($, window);

var RouterDataService = function ($, window) {
	var srv = {};
	srv.data = {};

	srv.setData = function () {
		$.getJSON(I18NService.getRoutingJSONPath(), function (data) {
			srv.data = data;
			$(window).trigger('routerData.initialized');
		});
	};

	srv.getData = function () {
		return srv.data;
	};

	//init
	$(window).on('i18n.initialized', function () {
		srv.setData();
	});

	return {
		getData: function getData() {
			return srv.getData();
		}
	};
}($, window);

var NavigationService = function ($) {
	var srv = {};
	srv.data = {};

	srv.setData = function () {
		$.getJSON($('body').data('nav-json-url'), function (data) {
			srv.data = data;
			$(window).trigger('nav_data.initialized');
		});
	};

	srv.getNestedObj = function (searchKey, obj) {
		//search an object recursively in json by id and return match
		for (var key in obj) {

			if (!obj.hasOwnProperty(key)) {
				continue;
			}

			//if searchKey matches
			if (key === searchKey) {
				return obj[key];
			} else if (_typeof(obj[key]) === 'object') {
				// return matched object from a deeper search
				var matchedObject = srv.getNestedObj(searchKey, obj[key]);
				if (matchedObject !== null) {
					return matchedObject;
				}
			}
		}
		return null;
	};

	srv.generateSingleLink = function (obj, key, generateSiblings, currentPageID, generateHalf) {
		var curHTML = '';
		if (typeof obj[key].subMenu !== 'undefined' && !generateSiblings) {
			curHTML = '<a aria-haspopup="true" aria-expanded="false" href="#" data-nav-id="' + key + '">' + obj[key].displayName + '</a>';
		} else if (typeof obj[key].link !== 'undefined') {

			curHTML = generateHalf ? '<div class="col-md-6">' : '';
			curHTML += '<a href="' + obj[key].link + '" {{isExternal}} {{isCurrentPage}}>' + obj[key].displayName + '</a>';
			curHTML += generateHalf ? '</div>' : '';

			curHTML = curHTML.replace('{{isExternal}}', typeof obj[key].isExternal !== 'undefined' && obj[key].isExternal ? 'target="_blank"' : '');
			curHTML = curHTML.replace('{{isCurrentPage}}', currentPageID === key ? 'class="current-site"' : '');
		}
		return curHTML;
	};

	srv.generateLinkList = function (obj, currentPageID, generateSiblings, generateHalf) {
		var html = '';

		for (var key in obj) {
			if (!obj.hasOwnProperty(key)) {
				continue;
			}
			html += srv.generateSingleLink(obj, key, generateSiblings, currentPageID, generateHalf);
		}
		return html;
	};

	$(function () {
		srv.setData();
	});

	return {
		getNestedObj: function getNestedObj(searchKey) {
			return srv.getNestedObj(searchKey, srv.data);
		},

		generateLinkList: function generateLinkList(obj, currentPageID, generateSiblings, generateHalf) {
			if (typeof obj === 'string') {
				obj = srv.getNestedObj(obj, srv.data).subMenu;
			}
			return srv.generateLinkList(obj, currentPageID, generateSiblings, generateHalf);
		}
	};
}($);
/* global AreaDataService */
'use strict';

(function ($) {
	var pluginName = 'toggleTargetPopup',
		defaults = {
			target: '#defaultDummy',
			fadeTime: 666
		};

	function Plugin(element, options) {
		this.$elem = $(element);
		this.$target = $();
		this.settings = $.extend({}, defaults, options);
		this.init();
	}

	$.extend(Plugin.prototype, {

		init: function init() {
			var me = this;

			// target element is defined in data target e.g. data-target=".some-class"
			if (me.$elem.data('target') !== undefined) {
				me.$target = $(me.$elem.data('target'));
			} else if (me.$elem.attr('href') !== undefined && me.$elem.attr('href') !== '#') {
				//this must be an id
				me.$target = $(me.$elem.attr('href'));
			}

			if (me.$target.length === 0) {
				return;
			}

			me.eventHandler();
		},

		eventHandler: function eventHandler() {
			var me = this;

			$(me.$elem).on('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				me.toggleTarget();

				if (me.$elem.hasClass('js_close-nav')) {
					$('.js_main-navigation').trigger('close_nav');
				}
			});

			$('body').on('click', function (e) {
				if ($(e.target).closest(me.$target).length === 0 && !$(e.target).is(me.$target)) {
					me.close();
				}
			});
		},

		toggleTarget: function toggleTarget() {
			var me = this;

			me.$target.fadeToggle(this.settings.fadeTime);
			AreaDataService.toggleExpandedAreaState(this.$elem);
			AreaDataService.toggleVisibleAreaState(this.$target);

			if (me.$elem.hasClass('js_no-mobile-sticky-affix')) {
				setTimeout(function () {
					$('.js_mobile-sticky').toggleClass('state_has-sticky-child state_sticky-hidden');
				}, $('.js_mobile-sticky').hasClass('state_has-sticky-child') ? 200 : 0);
			}
		},

		close: function close() {
			var me = this;

			AreaDataService.setExpandedState(me.$elem, false);
			AreaDataService.setHiddenState(me.$target, true);
			me.$target.fadeOut(me.settings.fadeTime);

			setTimeout(function () {
				$('.js_mobile-sticky:not(#main-navigation .affix):not(.js_man-anchornavi)').removeClass('state_has-sticky-child state_sticky-hidden');
			}, 200);
		}
	});

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});
	};
})(jQuery);

$(function () {
	$('.js_toggle-target').toggleTargetPopup();
});