define(["zepto", 'components/store'], function ($, Store) {
	var Page = function(config) {
		this.config = {		
		}
		this.config = $.extend(this.config, config);
	};

	Page.prototype.getPackage = function() {
		var mpackage;
		var curl = window.location.href;
		var pageIndex = curl.lastIndexOf("/");
		if(pageIndex > -1) {
			mpackage = curl.substring(0, pageIndex);
			var spindex = mpackage.lastIndexOf("/");
			if(spindex > -1) {
				mpackage = mpackage.substring(spindex + 1, mpackage.length);
			}		
		}
		return mpackage;
	}

	Page.prototype.gotoPageForResult = function (page, mPackage){
		var url;
		if(mPackage) {
			url = "../"+mPackage+"/"+page;
		}
		else {
			url = page;
		}
		
		//url = url + "?pageReturn=true";
		var curl = window.location.href;
		Store.saveObject(mPackage + "_pageReturn", {pageReturn: true});
		Store.saveObject(url, {preURL : curl});
		window.location.href = url;	
	};

	Page.prototype.goBack = function (spage){
		var mPackage = this.getPackage();
		var pageReturn = Store.loadObject(mPackage + "_pageReturn");
		var curl = window.location.href;
		var skey = "../" + mPackage;
		if(spage) {
			skey = skey + "/" +spage;
		}
		else {
			skey = skey + curl.substring(curl.lastIndexOf("/") , curl.length);
		}
		var url = Store.loadObject(skey);
		if(url && url.preURL && pageReturn) {
			if(url.preURL.indexOf("?") > -1)
				url.preURL = url.preURL + "&";
			else url.preURL = url.preURL + "?";
			window.location.href = url.preURL + "goBackPage=true&cube-action=push";
			Store.deleteObject(mPackage + "_pageReturn");
			Store.deleteObject(skey);
			return true;
		}
		return false;
	};

	return Page;
});