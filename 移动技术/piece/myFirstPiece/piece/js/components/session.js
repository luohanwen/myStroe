/**
 * HTML5 Session存储模块，Session DB实例
 * 
 */
define(['zepto'], function($){

	var Session = function(){
		
	}

	Session.saveObject = function(key, object) {
		window.sessionStorage[key] = JSON.stringify(object);
	}

	Session.loadObject = function(key) {
		var objectString =  window.sessionStorage[key];
		return objectString == null ? null : JSON.parse(objectString);
	}

	Session.deleteObject = function(key) {
		window.sessionStorage[key] = null;
	}

	return Session;
});