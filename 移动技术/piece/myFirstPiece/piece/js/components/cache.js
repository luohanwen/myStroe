define(function(){
	
	var Cache = new function(){
	}

	Cache.put = function(key, object){
		if (window.cache == null) { window.cache = {} };

		window.cache[key] = object;
	}

	Cache.get = function(key){
		if (window.cache == null) { return null; };

		return window.cache[key];
	}

	return Cache;
});