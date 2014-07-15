//init require js
require.config({
	baseUrl: '../',
	paths: {
		//plugin
		text: 'components/vendor/text',
		domReady: 'components/vendor/domReady',
		i18n: 'components/vendor/i18n',
		//lib
		zepto: '__proto__' in {} ? 'components/vendor/zepto.min' : 'components/vendor/jquery-2.0.0',
		underscore: 'components/vendor/underscore_amd',
		backbone: 'components/vendor/backbone_amd',
		swipeview: 'components/vendor/swipeview',
		bean: 'components/vendor/bean',
		flotr2: 'components/vendor/flotr2-amd',
		canvasloader: 'components/vendor/canvasloader',
		gmu: 'components/vendor/gmu',
		//path
		lib: 'components/vendor',
		cube: 'components/js'
	},
	shim: {
		backbone: {
			deps: ['underscore']
		},
		zepto: {
			exports: '$'
		},
		gmu: {
			deps: ['zepto']
		},
		swipeview: {
			exports: 'SwipeView'
		}
	}
});

//i18n
if (window.localStorage['lang'] === undefined) window.localStorage['lang'] = "zh-cn";
requirejs.config({
	config: {
		i18n: {
			locale: window.localStorage['lang']
		}
	}
});

(function() {

	var launcher = document.querySelector("meta[name='launcher']");
	var hideAddressBar = launcher.getAttribute('hideAddressBar') == 'true';
	var preventTouchMove = launcher.getAttribute('preventTouchMove') == 'true';
	var enablePhoneGap = launcher.getAttribute('enablePhoneGap') == 'true';

	var defaultModule = launcher.getAttribute('defaultModule');
	var defaultView = launcher.getAttribute('defaultView');
	var loadMode = launcher.getAttribute('loadMode');

	var enablePad = launcher.getAttribute('enablePad');

	//load phonegap js
	if (enablePhoneGap) {
		var phonegapjs = document.createElement('script');
		phonegapjs.setAttribute('type', 'text/javascript');
		phonegapjs.setAttribute('src', '../cordova.js');
		document.head.appendChild(phonegapjs);
	}

	require(['domReady', 'zepto', 'gmu', 'components/i18n', 'lib/fastclick', 'backbone', 'components/mainview', 'components/cocrouter'], 
		function(domReady, $, gmu, i18n, FastClick, Backbone, MainView, CoCRouter) {
		// domReady(function() {
		//remove 300ms delay
		new FastClick(document.body);
		//hide address bar
		if (hideAddressBar) setTimeout(function() {
				window.scrollTo(0, 1);
			}, 0);
		if (preventTouchMove) document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);

		function onDeviceReady(desktop) {

			// Hiding splash screen when app is loaded
			window.isDesktop = desktop;

			var mainview = new MainView();

		    var router = new CoCRouter({
		      delegate: mainview,
		      defaultModule: defaultModule,
		      enablePad: enablePad,
		      defaultView: defaultView,
		      loadMode: loadMode
		    });

		    var rootPath = window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'));
		    console.info("cube---app---start watch history, rootPath: " + rootPath);
		    Backbone.history.start({
		      pushState: false,
		      root: rootPath
		    });

			$('html').css('min-height', window.screen.availHeight - 44 + "px");
			// $('html').css('min-height', window.innerHeight);
		}

		if (enablePhoneGap && navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
			// This is running on a device so waiting for deviceready event
			document.addEventListener('deviceready', onDeviceReady, false);

		} else {
			// On desktop don't have to wait for anything
			onDeviceReady(true);
		}
		// }); //domReady
	});

})();