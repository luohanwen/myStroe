/**
 * 跑马灯效果
 * @param  speed ms 跑马灯的时间间隔，推荐用50ms
 * @param direction 跑马灯的方向，向上(top),向左(left)
 * @author haven
 */
(function($) {
	$.fn.marquee = function(speed, direction) {
		var ih, oh, timer, walk, clearTimer, run;
		if(direction === "left"){
		     ih = this.find(".marquee-inner").width();
		     oh = this.find(".marquee-outer").width();
		}
		else{
			 ih = this.find(".marquee-inner").height();
		     oh = this.find(".marquee-outer").height();
		}

		var t = 0;
		var me =this;
		walk = function() {
			t -= 2;
			if (t <= (-ih)) {
				me.find(".marquee-inner").css(direction, oh);
				t = oh;
				return;
			}
			me.find(".marquee-inner").css(direction, t);
		};
		clearTimer = function() {
			clearInterval(timer);
		};
		run = function() {
			timer = setInterval(walk, speed);
		};
		timer = setInterval(walk, speed);
		this.find(".marquee-inner").mouseover(clearTimer); //鼠标移动上面停止跑马灯
		this.find(".marquee-inner").mouseout(run);//鼠标移出开始跑马灯
	};
})(jQuery);