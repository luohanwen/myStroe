/**
 * some date operation
 * @author luohanwen
 */
define([], function() {
	//扩展Date的格式化方法
	Date.prototype.formatDate = function(format) {
		var o = {
			"M+": this.getMonth() + 1, //month
			"d+": this.getDate(), //day
			"h+": this.getHours(), //hour
			"m+": this.getMinutes(), //minute
			"s+": this.getSeconds(), //second
			"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
			"S": this.getMilliseconds() //millisecond
		};
		if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(format))
				format = format.replace(RegExp.$1,
					RegExp.$1.length == 1 ? o[k] :
					("00" + o[k]).substr(("" + o[k]).length));
		return format;
	};


	var date = {

		/**
		 * 日期格式转换
		 * @param  date 要转换的日期 date类型
		 * @param  format 要转换的格式 如yyyy-MM-dd hh:mm:ss
		 * @return {[type]}        [description]
		 */
		dateFormat: function(date, format) {
			var formatDate = date.formatDate(format);
			return formatDate;
		},


		/**
		 * 日期字符串转换为日期格式
		 * @param DateStr 要转换的日期字符串 格式（yyyy-MM-dd）
		 */
		StringToDate: function(DateStr) {

			var converted = Date.parse(DateStr);
			var myDate = new Date(converted);
			if (isNaN(myDate)) {
				//var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';  
				var arys = DateStr.split('-');
				myDate = new Date(arys[0], --arys[1], arys[2]);
			}
			return myDate;
		},
		/**
		 * 求日期的下N天的日期
		 * @param {string} [dateStr] [日期字符串]
		 * @param {int} [n] [相隔的天数]
		 * @param {string} [format] [需要的最后结果日期字符串的形式]
		 * @return {string} [下N天的日期]
		 */
		nextNDay: function(dateStr, n, format) {
			var time = n * 24 * 60 * 60 * 1000;
			var date = new Date(dateStr);
			var timeNew = date.getTime() + time;
			var dateNew = new Date(timeNew);
			dateNew = this.dateFormat(dateNew, format);
			return dateNew;
		},

		/**
		 * 求日期的下一天 date为日期类型
		 */
		nextDay: function(date) {
			date.setUTCDate(date.getUTCDate() + 1);
			return date;
		},
		/**
		 * 求日期的上一天 date为日期类型
		 */
		preDay: function(date) {
			date.setUTCDate(date.getUTCDate() - 1);
			return date;
		},
		/**
		 * 求日期的下一天
		 * @param string dateStr 格式为yyyy-MM-dd
		 * @return string 下一天的日期
		 */
		nextDayString: function(dateStr) {
			var date = this.StringToDate(dateStr);
			date.setUTCDate(date.getUTCDate() + 1);
			date = this.dateFormat(date, "yyyy-MM-dd");
			return date;
		},
		/**
		 * 求日期的上一天
		 * @param string dateStr 格式为yyyy-MM-dd
		 * @return string 上一天的日期
		 */
		preDayString: function(dateStr) {
			var date = this.StringToDate(dateStr);
			date.setUTCDate(date.getUTCDate() - 1);
			date = this.dateFormat(date, "yyyy-MM-dd");
			return date;
		},


		/**
		 * 求日期d1 和 d2的差值
		 * @param d1 d2 日期字符串 年月日
		 * @param separator 日期字符串的分隔符 如“-”
		 */
		DateDiff: function(d1, d2, separator) {
			var day = 24 * 60 * 60 * 1000;
			try {
				var dateArr = d1.split(separator);
				var checkDate = new Date();
				checkDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
				var checkTime = checkDate.getTime();

				var dateArr2 = d2.split(separator);
				var checkDate2 = new Date();
				checkDate2.setFullYear(dateArr2[0], dateArr2[1] - 1, dateArr2[2]);
				var checkTime2 = checkDate2.getTime();

				var cha = (checkTime - checkTime2) / day;
				return cha;
			} catch (e) {
				return false;
			}

		},
		/**
		 * 求日期d1 和 d2的差值(升级版)
		 * @param {string} [d1 d2] [日期字符串 例2013-12-11 也可以带上时分秒]
		 * @author luohanwen
		 */
		DateDiffNew: function(d1, d2) {
			var day = 24 * 60 * 60 * 1000;
			try {
				/*将"-"转换成"/",ios中new date 不能传-的日期字符串*/
				var reg = new RegExp("-", "g");
				d1 = d1.replace(reg, "/");
				d2 = d2.replace(reg, "/");

				var date = new Date(d1);
				var checkTime = date.getTime();

				var date1 = new Date(d2);
				var checkTime1 = date1.getTime();
				var cha = (checkTime - checkTime1) / day;

				return cha;
			} catch (e) {
				return false;
			}

		}
	};
	return date;

});