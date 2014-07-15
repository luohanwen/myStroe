define([], function(){
	return {

		setLocale: function(locale){
			window.localStorage.lang = locale;

			requirejs.config({
				config: {
					i18n: {
						locale: window.localStorage.lang
					}
				}
			});
		},

		getLocale: function(){
			return window.localStorage.lang;
		},

		setLocaleAndReload: function(locale){
			this.setLocale(locale);
			window.location.reload();
		}
	};
});