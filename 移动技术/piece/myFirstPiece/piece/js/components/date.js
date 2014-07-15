define("date", ["jquery", "mdatepicker"], function($){
	$("date").each(function(){
		var _this = $(this);
		var _config = {
		preset: 'date',
		lang: 'zh',
		//dateOrder: 'yymmdd',
		dateOrder: 'yymmdd D',
		theme: 'android-ics light',
		maxDate: new Date(2015, 12, 31, 59, 50),
		};
		//var id = _this.attr('id');
		var atts = this.attributes, len = atts.length, att, i = 0 ;
		for(; i < len ; i++){
			att = atts[i];
			if(att.specified){
				_config[att.name] = att.value;
			}
		}
		if(! _config.name) {
			_config.name =  _config.id;
		}
		var dateItem = $("<input  />").attr("id", _config.id).attr("name",_config.name);
		dateItem.appendTo(_this.parent());
		_this.remove();
		$(dateItem).scroller('destroy').scroller(_config);
		//alert(_config.id);
	});
});
