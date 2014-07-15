
define(["components/cal_main"], function($){
	var Calendar = function(calendarid, callback, config){
		this.config = {
			modal: true
		};
		this.config = $.extend(this.config, config);
				
		if(! this.config.name) {
			this.config.name =  this.config.id;
		}
		if(! this.config.style) {
			this.config.style = "background-color: #F7F7F7;";
		}
		this.cal_container = $("#cal_container");
		if(this.cal_container.size() == 0) {
			this.jqmWindowDiv = $('<div id="cal_jqmWindowDiv" class="jqmWindow"></div>').prependTo("body");
			this.cal_container = $('<div class="cal_container" id="cal_container" ></div>').appendTo(this.jqmWindowDiv);	
			/*var callback = function(day) {
				jqmWindowDiv.hide();
				$("#"+cal_container.attr("cal_input_id")).val(day);
				//jqmWindowDiv.jqmHide();
				//dateItem.val(day);
			};*/

			var _this = this;
			callback1 = function(day,weekDay) {
				_this.jqmWindowDiv.hide();
				if(callback) {
					callback.call(_this, day, weekDay);
				}
			};
			this.cal_container.init_cal(null, callback1);
			$(window).resize(
				function() {
					this.cal_container.init_cal(null, callback1);
				}
			);
		}
		else {
			this.jqmWindowDiv =  $("#cal_jqmWindowDiv");
		}

		
	};

	Calendar.prototype.show = function () {
			this.cal_container.attr("cal_input_id", this.calendarid);
			this.jqmWindowDiv.show();			
	};
	return Calendar;

});
