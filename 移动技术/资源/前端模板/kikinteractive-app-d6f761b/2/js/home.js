// Demo
(function ($) {
	var $os     = $('[data-os]'),
			$url    = $('[data-url]'),
			$iframe = $('iframe'),
			os, url;

	$os.click(function () {
		setOS( $(this).data('os') );
	});

	$url.click(function () {
		if (window.innerWidth < 562) {
			window.location.href = $(this).data('url');
		} else {
			setUrl( $(this).data('url') );
		}
	});

	setOS('ios');
	setUrl('demo/');


	function setOS(osType) {
		if (os === osType) {
			return;
		}
		os = osType;
		$os.each(function () {
			if ($(this).data('os') === os) {
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}
		});
		setUrl(url, true);
	}

	function setUrl(newUrl, force) {
		if ((url === newUrl) && !force) {
			return;
		}
		url = newUrl;
		$iframe.attr('src', newUrl+'?_app_platform='+os);
		$url.each(function () {
			if ($(this).data('url') === newUrl) {
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}
		});
	}
})(jQuery);
