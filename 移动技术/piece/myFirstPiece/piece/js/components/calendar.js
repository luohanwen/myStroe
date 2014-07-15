window.showDialog = window.showDialog || function(dialogId) {
	if(window.scrollers && window.scrollers[dialogId])
		window.scrollers[dialogId].show();
};

window.hideDialog = window.hideDialog || function(dialogId) {
	if(window.scrollers && window.scrollers[dialogId])
		window.scrollers[dialogId].hide();
};
Date.prototype.toDayStr = Date.prototype.toDayStr || function() {
	var year = this.getFullYear();
	var mon = this.getMonth()+1;
	var day = this.getDate();
	return year + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
}

define(['zepto', 'backbone', 'underscore', 'gmu', "components/cal_main"], function($, Backbone, _, gmu){
	var Calendar  = Backbone.View.extend({
		tagName: 'input',
		elContext: document,
		events: {
          "click" : "dateInputClick"
        },
        initialize: function() {
        	/*window.cal_iScroll = new iScroll($(elContext).find("#cal_container"), {
						useTransition: true,
						hScroll:false
					});*/
			var aaa;
        },
        render: function(){
        	//this.$eprop("readOnly", "readOnly").prop("id", _config.id).prop("name",_config.name);
        	return this;
        },
		
		dateInputClick : function(e) {
			alert("");
		}
	},{
		compile: function(elContext){
			var me = this;
			//$(elContext).find("calendar").each(function(){
            return _.map($(elContext).find("calendar"), function(tag){
			
				var _this = $(tag);//$(this);
				var _config = {
					modal: true
				};
				//var id = _this.attr('id');
				var atts = tag.attributes, len = atts.length, att, i = 0 ;
				for(; i < len ; i++){
					att = atts[i];
					if(att.specified){
						_config[att.name] = att.value;
					}
				}

				if(_config.customparse && "default" != _config.customparse) {
					return;
				}

				if(! _config.name) {
					_config.name =  _config.id;
				}
				if(! _config.style) {
					_config.style = "background-color: #ffffff;";
				}
				var dateItem = $("<input  class='calendar_input_item' style='"+_config.style+"' />").prop("readOnly", "readOnly").prop("id", _config.id).prop("name",_config.name);
				if(_config.value == "today") {
					dateItem.val(new Date().toDayStr());
				}
				if( _config["class"]) {
					dateItem.prop("class",_config["class"]);
				}

				var jqmWindowDiv;
				var cal_container = $(elContext).find("#cal_container");
				

				
				if(cal_container.size() == 0) {
					jqmWindowDiv = $('<div id="cal_jqmWindowDiv" class="jqmWindow"></div>').prependTo(elContext);
					var cal_iScroll = $('<div id="cal_iScroll" style="width: 100%; height: 100% ;"></div>').appendTo(jqmWindowDiv);	
					cal_container = $('<div class="cal_container" id="cal_container" style="height: 415px;"></div>').appendTo(cal_iScroll);
					
					//cal_container.init_cal(null, callback);
					
				}
				else {
					jqmWindowDiv =  $(elContext).find("#cal_jqmWindowDiv");
				}

				var cal_callback = function(day,weekDay) {
						jqmWindowDiv.hide();
						if(day)
						$("#"+cal_container.attr("cal_input_id")).val(day);
						//jqmWindowDiv.jqmHide();
						//dateItem.val(day);
				};
				

				
				//alert("vvv1");
				 _this.replaceWith(dateItem);
				//dateItem.appendTo(_this.parent());
				//_config.dialogHtml = _this.html();
				
				//alert(_this.html());
				//_this.remove();
				//alert(_config.setText1);
				//jqmWindowDiv.jqm(_config);
				//dateItem.live('click',
				dateItem.click(
				
				
					function(){
						if(dateItem.val()) {
							var d = dateItem.val().split("-");
							var day = new Date(d[0],(d[1]-1),d[2],0,0,0,0);
							cal_container.init_cal(day, cal_callback);
							
						} else {
							cal_container.init_cal("", cal_callback);	
						}
						cal_container.attr("cal_input_id", _config.id);
						jqmWindowDiv.show();	
						if(!window.calIScroll)
						window.calIScroll = new iScroll("cal_iScroll", {
							useTransition: true,
							hScroll:false
						});	
						window.calIScroll.refresh();	
				});
				//$.scrollers[_config.id].show();
				//$(dateItem).scroller('destroy').scroller(_config).show();
				//alert(_config.id);

				var calendar = new Calendar();
				return calendar;
			});
		}
	});
	return Calendar;
});
