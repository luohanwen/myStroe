/**
 * HTML5本地存储模块，DB实例
 */
define(['zepto'], function($){

	var Store = function(){
		
	}

	Store.saveObject = function(key, object) {
		window.localStorage[key] = JSON.stringify(object);
	}

	Store.loadObject = function(key) {
		var objectString =  window.localStorage[key];
		return objectString == null ? null : JSON.parse(objectString);
	}

	Store.deleteObject = function(key) {
		window.localStorage[key] = null;
	}

	Store.clear = function() {
		window.localStorage.clear();
	}

	return Store;
});