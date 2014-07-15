
define(['zepto', 'backbone', 'gmu', 'components/cache'], function($, Backbone, gmu, Cache) {

	//handle the positon for <header> in UC & QQ browser.
	var fixHeader = function() {
		$('header').css({'width':''});
        $('header .title').css({'position':'absolute'});


        $('header').css({'position':'absolute'});


        var headerWidth = $('header').css('width');
        $('header').css({'position':'fixed'});
        $('header').css({'width':headerWidth});
	};

	//handle the positon for loader in UC & QQ browser.
	var fixLoaderOn = function(){
        $(window).on('orientationchange', onFixLoaderOrientationchange);
        $(window).on('resize', onFixLoderResize);
        $(window).on('scroll', onFixLoderScroll);
	};

	var fixLoaderOff = function(){
        $(window).off('orientationchange', onFixLoaderOrientationchange);
        $(window).off('resize', onFixLoderResize);
        $(window).off('scroll', onFixLoderScroll);
	};

    function onFixLoaderOrientationchange(){
    }


    function onFixLoderResize(){
        $('.cube-flight-loader').css({'position':'absolute'});
    }

	function onFixLoderScroll(){
        $('.cube-flight-loader').css({'position':'fixed'});
    }

    //handle the positon for popover in UC & QQ browser.
    var fixPopoverOn = function(){
        $(window).on('orientationchange', onFixPopoverOrientationchange);
        $(window).on('resize', onFixPopoverResize);
        $(window).on('scroll', onFixPopoverScroll);
	};

	var fixPopoverOff = function(){
        $(window).off('orientationchange', onFixPopoverOrientationchange);
        $(window).off('resize', onFixPopoverResize);
        $(window).off('scroll', onFixPopoverScroll);
	};

    function onFixPopoverOrientationchange(){
        
    }


    function onFixPopoverResize(){
    }

	function onFixPopoverScroll(){
    }

    function fixHeaderWithPopoverOffsetTop(){
    }

	return {
		FxHeader: fixHeader,
		FixLoaderOn: fixLoaderOn,
		FixLoaderOff: fixLoaderOff,
		FixPopoverOn: fixPopoverOn,
		FixPopoverOff: fixPopoverOff,
		FixHeaderWithPopoverOffsetTop : fixHeaderWithPopoverOffsetTop
	};

});