// //jquery不符合amd规范，所以先定义
// require.config({　　　　
// 	shim: {　　　　　　
// 		'../js/jquery/jquery-1.5.2.min.js': {　　　　　　　　
// 			exports: '$'　　　　　　
// 		}　　　
// 	}　　
// });
// define(['../js/util/util.js', '../js/jquery/jquery-1.5.2.min.js'], function(Util, $) {
// 	//Util.test1();
// 	console.info($("#requireInput"));
// });



//主模块加载其他模块也可以这样写
/*require(['../js/util/util.js', '../js/jquery/jquery-1.5.2.min.js'], function(Util, $) {
		//Util.test1();
		console.info($("#requireInput"));
	});*/