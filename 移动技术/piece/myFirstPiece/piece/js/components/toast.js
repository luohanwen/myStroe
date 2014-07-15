/*
 * JS冒泡信息组件,added by lee 2013.09.03。
 */


define(['zepto'], function($) {



	//冒泡提示信息: msg:提示内容, duration:停留时间
	var Toast = function(msg, duration) {
		duration = isNaN(duration) ? 2000 : duration;
		var m = document.createElement('div');
		m.innerHTML = msg;
		m.style.cssText = "width:60%; min-width:150px; background:#000; opacity:0.5; height:40px; color:#fff; line-height:40px; text-align:center; border-radius:5px; position:fixed; top:40%; left:20%; z-index:999999; font-weight:bold;";
		document.body.appendChild(m);
		setTimeout(function() {
			var d = 0.5;
			m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
			m.style.opacity = '0';
			setTimeout(function() {
				document.body.removeChild(m)
			}, d * 1000);
		}, duration);
	};


	return Toast;
});