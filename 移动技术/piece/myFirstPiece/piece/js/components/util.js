 define([], function() {

         //工具库util.js

         //判断浏览器内核
         var browser = {
                 versions: function() {
                         var u = navigator.userAgent,
                                 app = navigator.appVersion;
                         return {
                                 trident: u.indexOf('Trident') > -1, //IE内核
                                 presto: u.indexOf('Presto') > -1, //opera内核
                                 webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                                 gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                                 mobile: !! u.match(/AppleWebKit.*Mobile.*/) || !! u.match(/AppleWebKit/), //是否为移动终端
                                 ios: !! u.match(/(i[^;]+\;(U;)? CPU.+Mac OS X)/), //ios终端
                                 android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                                 iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                                 iPad: u.indexOf('iPad') > -1, //是否iPad
                                 webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                                 apad: (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) && (u.indexOf("Mobile") < 0)
                         };
                 }(),
                 language: (navigator.browserLanguage || navigator.language).toLowerCase()
         };



         //生成时间戳
         var generateTimeStamp = function() {
                 return Math.round(new Date().getTime() / 1000);
         };

         return {
                 generateTimeStamp: generateTimeStamp,
                 browser: browser
         };


 });