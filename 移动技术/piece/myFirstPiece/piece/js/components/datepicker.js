define(['backbone', 'underscore', 'zepto'], function(Backbone, _, $) {

    // date {Date|String}: (可选，默认：today) 初始化日期
    // firstDay {Number}: (可选，默认：1) 设置新的一周从星期几开始，星期天用0表示, 星期一用1表示, 以此类推.
    // minDate {Date|String}: (可选，默认：null) 设置可以选择的最小日期
    // maxDate {Date|String}: (可选，默认：null) 设置可以选择的最大日期
    // swipeable {Boolean}: (可选，默认：false) 设置是否可以通过左右滑动手势来切换日历
    // monthChangeable {Boolean}: (可选，默认：false) 设置是否让月份可选择
    // yearChangeable {Boolean}: (可选，默认：false) 设置是否让年份可选择
    // events 所有Trigger Events中提及的事件都可以在此设置Hander, 如init: function(e){}。
    // parentEl 可以指定生成的日历元素位置，默认指定是当前父元素内

    //Trigger Events
    // 名称              处理函数参数                    描述
    // init             event                        组件初始化的时候触发，不管是render模式还是setup模式都会触发
    // select           event, date, dateStr, ui     选中日期的时候触发
    // monthchange      event, month, year, ui       当当前现实月份发生变化时触发
    // destroy          event                        组件在销毁的时候触发

    var Calendar = Backbone.View.extend({
        initialize: function() {
            var today = new Date();
            var dataDate = $(this.el).val();
            var dataFirstDay = $(this.el).attr('data-firstDay');
            var dataMinDate = $(this.el).attr('data-minDate');
            var dataMaxDate = $(this.el).attr('data-maxDate');
            var dataSwipeable = $(this.el).attr('data-swipeable');
            var dataMonthChangeable = $(this.el).attr('data-monthChangeable');
            var dataYearChangeable = $(this.el).attr('data-yearChangeable');

            var selectYearBefore = $(this.el).attr('data-selectYearBefore');
            var selectYearAfter = $(this.el).attr('data-selectYearAfter');
            var parentEl = $(this.el).attr('data-parentEl');

            var me = this;
            var datepickerHtml = $('<div></div>');
            datepickerHtml = datepickerHtml.calendar({
                date: (dataDate === null ? today : dataDate),
                swipeable: (dataSwipeable === null || dataSwipeable === 'true' ? true : false),
                firstDay: (dataFirstDay === null ? 1 : dataFirstDay),
                minDate: (dataMinDate === null ? null : $.calendar.parseDate(dataMinDate)),
                maxDate: (dataMaxDate === null ? null : $.calendar.parseDate(dataMaxDate)),
                monthChangeable: (dataMonthChangeable === null || dataMonthChangeable === 'false' ? false : true),
                yearChangeable: (dataYearChangeable === null || dataYearChangeable === 'false' ? false : true),
                selectYearBefore: selectYearBefore,
                selectYearAfter: selectYearAfter,
                select: function(event, date, dateStr, ui) {
                    $(me.el).val($.calendar.formatDate(date));
                    datepickerHtml.hide();
                }
            });

            $(this.el).on("click", function() {
                datepickerHtml.show();
            });
            
            datepickerHtml.hide();
            if (parentEl === null) {
                $(this.el).parent().append(datepickerHtml);
            } else {
                $(parentEl).append(datepickerHtml);
            }
        }
    }, {
        compile: function(elContext) {
            var me = this;
            return _.map($(elContext).find(".cube-datepicker"), function(tag) {
                var calendar = new Calendar({
                    el: tag
                });
                return calendar;
            });
        }

    });

    return Calendar;

});