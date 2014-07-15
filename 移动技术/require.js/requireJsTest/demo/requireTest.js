//jquery不符合amd规范，所以先定义
require.config({　　　　
	shim: {　　　　　　
		'../base/js/jquery/jquery-1.5.2.min.js': {　　　　　　　　
			exports: '$'　　　　　　
		}　　　
	}　　
});
define(['../base/js/util/util.js', '../base/js/jquery/jquery-1.5.2.min.js'], function(Util, $) {
	//Util.test1();
	console.info($);
	console.info($("#requireInput"));
});



//主模块加载其他模块也可以这样写
/*require(['../js/util/util.js', '../js/jquery/jquery-1.5.2.min.js'], function(Util, $) {
		//Util.test1();
		console.info($("#requireInput"));
	});*/