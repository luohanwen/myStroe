var iscrollMap = new Array();
var waterChargeUnitMap = null;
Widget.ready = function () {
    //使用iScroll需要禁用touchmove事件
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);
    //测试数据：账户编号
    Widget.setPreferenceForKey("A0645248754,A0645248755,A0645248756", "water_account");
    initWaterAcount();
    initNotificationSetting();
    initDateNotification();
    initScrollAsDefault("water_wrapper", false);
    initHelpScroll("help_wrapper");
    //控件初始化完成后，添加current样式，显示home主页。
    $("#page_home").addClass("current");
};
Widget.onBackPressed = function () {
    if ($("#page_home").hasClass("current")) {
        showExitDialog();
    } else if ($("#page_pay").hasClass("current")) {
        slideToPage("page_pay", "page_home", "right")
    } else if ($("#page_pay_result").hasClass("current")) {
        slideToPage("page_pay_result", "page_home", "right");
    } else if ($("#page_help_details").hasClass("current")) {
        slideToPage("page_help_details", "page_home", "right");
    } else if ($("#page_date").hasClass("current")) {
        slideToPage("page_date", "page_home", "right");
    } else if ($("#page_map").hasClass("current")) {
        waterChargeUnitMap.hide();
        slideToPage("page_map", "page_home", "right");
    }
}
//将label和checkbox的点击事件关联，从而点击checkbox的描述文字时，改变checkbox的选中状态。
$(function () {
    $("#label_phone").bind("click", function () {
        $("#checkbox_phone")[0].click();
    });
    $("#label_mail").bind("click", function () {
        $("#checkbox_mail")[0].click();
    })
});
function slideToPage(pageFrom, pageTo, direction, callback) {
    var animation;
    var from = $("#" + pageFrom), to = $("#" + pageTo);
    if (direction == 'left')
        animation = "slideLeft";
    else
        animation = "slideRight";

    from.addClass(animation + " out");
    to.addClass(animation + " in current");
    to.bind("webkitAnimationEnd", function () {
        from.removeClass("current " + animation + " out");
        to.unbind("webkitAnimationEnd");
        to.removeClass(animation + " in");
        if (typeof callback == "function") {
            callback();
        }
    });
}
function initScrollAsDefault(id, transform) {
    if (iscrollMap[id]) {
        console.log("iscroll default refresh");
        iscrollMap[id].refresh();
        return iscrollMap[id];
    }
    console.log("iscroll default new");
    var useTransformValue = false;
    if (typeof transform == 'boolean')  useTransformValue = transform;
    var myScroll = new iScroll(id, {
        scrollbarClass:'myScrollbar',
        useTransform:useTransformValue, //false:解决input,textarea无法输入中文以及在android4.0以上滑动时输入框偏移的问题
        onBeforeScrollStart:function (e) {
            var target = e.target;
            while (target.nodeType != 1) target = target.parentNode;

            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
                e.preventDefault();
        }
    });
    iscrollMap[id] = myScroll;
    return myScroll;
}
var pullUpEl, pullUpOffset, generatedCount = 5;
function initHelpScroll(id) {
    if (iscrollMap[id]) {
        console.log("iscroll default refresh");
        iscrollMap[id].refresh();
        return iscrollMap[id];
    }
    console.log("iscroll default new");
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;
    myScroll = new iScroll(id, {
        useTransform:true, //true:没有input或textarea时使用
        scrollbarClass:'myScrollbar',
        onRefresh:function () {
            if (pullUpEl.className.match('loading')) {
                pullUpEl.className = 'pullUp';
                pullUpEl.querySelector('.pullUpIcon').style.display = "none";
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '点击获取更多数据';
            }
        },
        onBeforeScrollStart:function (e) {
            var target = e.target;
            while (target.nodeType != 1) target = target.parentNode;

            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
                e.preventDefault();
        }
    });
    iscrollMap[id] = myScroll;
    $('#thelist>li').bind("click", function () {
        //点击list中某一项的事件
        console.log("点击了第" + ($(this).index() + 1) + "项");
        showHelpDetails();
    });

    //单击更多事件处理
    $("#pullUp").bind("click", function () {
        pullUpEl.className = 'pullUp loading';
        pullUpEl.querySelector('.pullUpIcon').style.display = "inline-block";
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '正在加载数据，请稍候...';
        pullUpAction();
    });
    return myScroll;
}
function pullUpAction() {
    setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!
        var el, li, i;
        el = $('#thelist');

        for (i = 0; i < 5; i++) {
            li = document.createElement('li');
            var curCount = ++generatedCount;
            li.innerHTML = '<div class="list_item_content"><div class="list_item_title">主标题'
                + curCount + '</div><div class="list_item_subtitle">副标题' + curCount
                + '</div></div><img class="icon_arrow_right" src="uiframe_1.1.0/images/bae_list_arrow_r.png"/>';
            el.append(li, li);
            li.onclick = function (obj) {
                return function () {
                    //点击list中某一项的事件
                    console.log("点击了第" + ($(obj).index() + 1) + "项");
                    showHelpDetails();
                };
            }(li);
        }
        iscrollMap["help_wrapper"].refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}
function showExitDialog() {
    /**
     * bae_dialog({title:"",...})弹出提示对话框
     * title: 标题，默认为“确认提示”。
     * message: 提示内容，默认为空。
     * modal: 是否为模态对话框。true：默认值，带有灰色蒙版。false：没有灰色蒙版
     * type: 对话框类型。alert：提示对话框；confirm:默认值，确认对话框
     * okEvent: 点击确认按钮的回调函数
     * cancelEvent: 点击取消按钮的回调函数
     * autoClose：延时自动关闭对话框，单位毫秒。如果不设置，则不自动关闭。
     */
    var dialog = $.bae_dialog(
        {
            title:"提 示",
            message:'<div style="text-align:center">将要退出应用，是否确定？</div>',
            modal:true,
            type:'confirm',
            okEvent:function () {/*alert("点击了'确定'按钮")*/
                Widget.close();
            },
            //5s后对话框自动关闭
            autoClose:10000
        });
}

function dataQuery() {
    console.log("dataQuery");
    var handle = $.bae_progressbar({message:"<p>正在请求数据...</p>",
        //是否为模态进度条。true：带有灰色蒙版，蒙版之后内容不可点击。false：没有灰色蒙版，内容可以点击。
        modal:true,
        //是否允许点击进度条取消进度。
        canCancel:true,
        beforeShow:function () {
            $.ajax({url:"http://218.206.179.32/PayServer/servlet/accountInfo1",
                dataType:'text',
                timeout:2000,
                success:function (data, textStatus) {
                    //var testData ="{charge_unit:'自来水市北有限公司',account_num:'1234567',current_amount:130.3,left_amount:'-18.9'}";
                    var dataObj = eval("(" + data + ")");
                    //数据请求完成
                    //通过调用bae_progressbar对象的close()关闭当前正在显示的进度条。
                    handle.close();
                    fillAccountInfo(dataObj);
                    initScrollAsDefault("details_wrapper", false);
                    setTimeout(function () {
                        slideToPage("page_home", "page_pay", "left");
                    }, 200);
                    $.bae_toast("数据请求成功", 2500);
                },
                error:function (data, textStatus) {
                    //数据请求完成
                    //通过调用bae_progressbar对象的close()关闭当前正在显示的进度条。
                    handle.close();
                    $.bae_toast("查询失败，请稍后重试");
                }});
        },
        afterClose:function () {

        }});
}

//初始化输入账户编号
function initWaterAcount() {
    var accounts = Widget.preferenceForKey("water_account");
    if (accounts) {
        var accounts_array = accounts.split(",");
        for (var i = 0; i < accounts_array.length; i++) {
            var selected_string = i == 0 ? " selected" : "";
            var option_string = "<option value='" + accounts_array[i] + "' " + selected_string + "> " + accounts_array[i] + " </option>"
            //为select中增加新的option
            $("#water_account").append($(option_string));
        }
        //增加手动输入选项
        var option_string = "<option value='-1'> 手动输入账户编号</option>";
        $("#water_account").append($(option_string));
        //bae_select().refresh()：修改select的DOM结构后，必须需要调用该refresh函数更新样式
        $("#water_account").bae_select().refresh();
    }
    $("#water_account").change(function () {
        var val = $("#water_account").children('option:selected').val();
        if (val == "-1") {
            $("#input_water_account").show();
        }
        else {
            $("#input_water_account").hide();
        }
        iscrollMap["water_wrapper"].refresh();
    });
    $("#input_water_account").hide();
}
function initNotificationSetting() {
    handlePhoneNotificationStatus();
    handleMailNotificationStatus();
    $("#checkbox_phone").bind("click", function () {
        handlePhoneNotificationStatus();
        iscrollMap["water_wrapper"].refresh();
    });
    $("#checkbox_mail").bind("click", function () {
        handleMailNotificationStatus();
        iscrollMap["water_wrapper"].refresh();
    })
}

function handlePhoneNotificationStatus() {
    var isChecked = $("#checkbox_phone")[0].checked;
    if ("checked" == isChecked || true == isChecked) {
        $("#input_phone").show();
    } else {
        $("#input_phone").hide();
    }
}

function handleMailNotificationStatus() {
    var isChecked = $("#checkbox_mail")[0].checked;
    if ("checked" == isChecked || true == isChecked) {
        $("#input_mail").show();
    } else {
        $("#input_mail").hide();
    }
}

function initDateNotification() {
    var today = new Date();
    //getMonth() 从 Date 对象返回月份 (0 ~ 11)。因此获取下一月需要+2。
    var format_date = today.getFullYear() + "-" + (parseInt(today.getMonth()) + 2) + "-" + today.getDate();
    $("#notify_date").text(format_date);
    $("#notify_date_btn").bind("click", function () {
        $("#chose_notify_date").bae_calendar({event:"choseDate", date:$("#notify_date").text(), chooseOldDate:false});
        slideToPage("page_home", "page_date", "left");
    })
}

function choseHelp() {
    iscrollMap["help_wrapper"].refresh();
}

function fillAccountInfo(data) {
    if (data) {
        $("#charge_unit").text(data.charge_unit);
        $("#account_num").text(data.account_num);
        $("#current_amount").text(data.current_amount);
        $("#left_amount").text(data.left_amount);
        $("#charge_amount").val(-parseFloat(data.left_amount));
    }
}
function showWaterChargeUnitMap() {
    slideToPage("page_home", "page_map", "left", function () {
        if (waterChargeUnitMap) {
            waterChargeUnitMap.show();
        } else {
            waterChargeUnitMap = new Widget.CMap.Map("map_wrapper");
            waterChargeUnitMap.setZoom(11);
            initWaterChargeUnitMarker();
            setMapCenter();
            initCenterIconBtn();
        }
    })
}

function initWaterChargeUnitMarker() {
    var suffix = "";
    //测试数据：缴费单位的坐标数据
    var markers = [
        {lat:39.90676109736608, lng:116.42546798706054, icon:"res/marker", msg:"新区自来水总公司"},
        {lat:39.94776109736608, lng:116.49446798706054, icon:"res/marker", msg:"自来水市南有限公司"},
        {lat:39.98676109736608, lng:116.39446798706054, icon:"res/marker", msg:"自来水市北有限公司"}
    ];
    if (Widget.Device.getOSPlatform() == "iOS") {
        suffix = "_mini"
    }
    for (var i = 0; i < markers.length; i++) {
        var point = new Widget.CMap.Point(markers[i].lat,markers[i].lng);
        marker = new Widget.CMap.Marker(point);
        marker.setIcon(markers[i].icon + suffix + ".png");
        marker.setBubbleMsg(markers[i].msg);
        waterChargeUnitMap.addOverlay(marker);
    }
}

function initCenterIconBtn() {
    var a = document.getElementById("center_icon_btn");
    var $a = $(a);
    a.addEventListener("touchstart", function (ev) {
        $a.addClass("active")
    }, false);
    a.addEventListener("touchmove", function (ev) {
        ev.preventDefault()
    }, false);
    a.addEventListener("touchend", function (ev) {
        setTimeout(function () {
            $a.removeClass("active")
        }, 300)
    }, false)
}
function setMapCenter() {
    //测试数据：地图中心点
    var v = new Widget.CMap.Point(39.94776109736608, 116.42546798706054);
    waterChargeUnitMap.setCenter(v);
}
function choseDate(date) {
    $("#notify_date").text(date);
    slideToPage("page_date", "page_home", "right")
}
var handle;
function pay() {
    console.log("send url pay");
    if (!window.navigator.onLine) {
        $.bae_toast("网络不通，请检查网路");
        return;
    }
    var handle = $.bae_progressbar({message:"<p>正在请求数据...</p>",
        //是否为模态进度条。true：带有灰色蒙版，蒙版之后内容不可点击。false：没有灰色蒙版，内容可以点击。
        modal:true,
        //是否允许点击进度条取消进度。
        canCancel:true,
        beforeShow:function () {
            //向订单服务器请求缴费的订单地址
            $.ajax({
                type:"get",
                url:"http://218.206.179.32/PayServer/servlet/payOrder",
                dataType:'text',
                timeout:2000,
                success:function (data, textStatus) {
                    var dataObj = eval("(" + data + ")");

                    //数据请求完成
                    //通过调用bae_progressbar对象的close()关闭当前正在显示的进度条。
                    handle.close();
                    if (dataObj.result) {
                        //支付地址(比如支付基地手机支付地址、支付宝支付地址等，由商家签约的支付平台而定)
                        var payUrl = dataObj.url;
                        Widget.CPay.urlPay(payUrl);
                        $.bae_toast("订单生成成功", 2500);
                    } else {
                        $.bae_toast("订单生成失败，请稍后重试");
                    }
                },
                error:function (data, textStatus) {
                    //数据请求完成
                    //通过调用bae_progressbar对象的close()关闭当前正在显示的进度条。
                    handle.close();
                }});
        },
        afterClose:function () {

        }});
}

/**
 *支付完成后回调函数
 */
Widget.CPay.onUrlPayFinished = function () {
    //TODO 如果商户提供了订单查询接口，则可以在此查询订单支付是否成功
    console.log("send onUrlPayFinished");
    dataRequery();
}
function showHelpDetails() {
    slideToPage("page_home", "page_help_details", "left");
    initScrollAsDefault("help_details_wrapper", true);
}
function fillPayResultAccountInfo(data) {
    if (data) {
        $("#result_charge_unit").text(data.charge_unit);
        $("#result_account_num").text(data.account_num);
        $("#result_left_amount").text(data.left_amount);
    }
}
function dataRequery() {
    var handle = $.bae_progressbar({message:"<p>正在请求数据...</p>",
        //是否为模态进度条。true：带有灰色蒙版，蒙版之后内容不可点击。false：没有灰色蒙版，内容可以点击。
        modal:true,
        //是否允许点击进度条取消进度。
        canCancel:true,
        beforeShow:function () {
            $.ajax({url:"http://218.206.179.32/PayServer/servlet/accountInfo2",
                dataType:'text',
                timeout:2000,
                success:function (data, textStatus) {
                    var dataObj = eval("(" + data + ")");
                    //数据请求完成
                    //通过调用bae_progressbar对象的close()关闭当前正在显示的进度条。
                    handle.close();
                    fillPayResultAccountInfo(dataObj);
                    initScrollAsDefault("pay_result_wrapper", false);
                    slideToPage("page_pay", "page_pay_result", "right");
                },
                error:function (data, textStatus) {
                    //数据请求完成
                    //通过调用bae_progressbar对象的close()关闭当前正在显示的进度条。
                    handle.close();
                    $.bae_toast("查询失败，请稍后重试");
                }});
        },
        afterClose:function () {
            $.bae_toast("支付成功", 2500);
        }});
}