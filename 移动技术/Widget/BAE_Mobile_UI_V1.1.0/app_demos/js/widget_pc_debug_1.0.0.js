function printDebugInfo(msg) {
    nativeAlert(msg);
    console.log(msg);
};

function nativeAlert(msg) {
    alert(msg);
};
(function() {
    document.addEventListener("DOMContentLoaded", function(){
        //create our alert, avoid the alert has been overrided.
        nativeAlert = (function() {
            var f = document.createElement("iframe");
            f.style.cssText = "border:0;width:0;height:0;display:none";
            document.body.appendChild(f);
            var d = f.contentWindow.document;
            return f.contentWindow.alert;
        }());
    })
}());

var Widget = {};
function throwException(type, message) {
    nativeAlert("Exception Type:" + type + ",msg:" + message);
    throw new Widget.Exception(type, message);
};
Widget.Exception = function (type, message) {
    this.type = type;
    this.message = message
};
Widget.ExceptionTypes = {get INVALID_PARAMETER() {
    return'invalid_parameter'
}, get SECURITY() {
    return'security'
}, get UNKNOWN() {
    return'unknown'
}, get UNSUPPORTED() {
    return'unsupported'
}};

//Widget
(function() {
    document.addEventListener("DOMContentLoaded", function(){
        setTimeout(function(){
            Widget.ready()
        },500);
    })
}());

Widget.ready = function () {
    //printDebugInfo("Widget.ready()");
};
Widget.close = function () {
    printDebugInfo("Widget.close()");
};
Widget.onBackPressed = function () {
    //printDebugInfo("Widget.onBackPressed()");
};
Widget.openURL = function (url) {
    printDebugInfo("Widget.openURL(), url:" + url);
    window.open(url, "newWindow");
};
Widget.setPreferenceForKey = function (value, key) {
    window.localStorage.setItem(key, value);
};
Widget.preferenceForKey = function (key) {
    return window.localStorage.getItem(key);
};
Widget.getDisplayAreaWidth = function () {
    return document.body.clientWidth;
};
Widget.getDisplayAreaHeight = function () {
    return document.body.clientHeight;
};
Widget.getDisplayScale = function () {
    printDebugInfo("Widget.getDisplayScale was deprecated");
    return 1.00;
};
Widget.getCurrentCityCode = function () {
    return "110102";
};
Widget.onWakeup = function() {};
//SingleSign
Widget.getTicket = function () {
    return "TT00120130605072055805000000004540TURBd01EQXdNREF3TURBd01EQXdNUT09MjczNTE4NDZIOTQzMGU5YzU3YTEzNzZhMTE5MmEwMDkwNDI3Yw=="
};
Widget.getSSOData = function (key) {
    var sso = [];
    sso['mobilenumber'] = "13455685258";
    sso['mail'] = "zhangxiaoxian@139.com";
    sso['username'] = "zhangxiaoxian";
    sso['userstatus'] = "在线";
    sso['areacode'] = "110102";
    sso['name'] = "张小娴";
    sso['sex'] = "女";
    sso['birthday'] = "1984-2-1";
    sso['address'] = "北京市西城区";
    sso['postcode'] = "100052";
    sso['interests'] = "读书，音乐";
    sso['profession'] = "教师";
    sso['married'] = "是";
    sso['havechildren'] = "是";
    sso['salary'] = "8000";
    sso['school'] = "硕士";
    sso['nationality'] = "中国";
    sso['folk'] = "汉族";
    sso['polity'] = "党员";
    sso['faith'] = "无";
    return sso[key] == undefined ? "" : sso[key];
};
//Todo: 增加Widget.login
//Multimedia
Widget.Multimedia = {get isAudioPlaying() {
    if (Widget.Multimedia.AudioPlayer.currentState == 'playing') {
        return true
    } else {
        return false
    }
}, getVolume:{}, stopAll:{}};
Widget.Multimedia.getVolume = function () {
    return 3;
};
Widget.Multimedia.stopAll = function () {
    Widget.Multimedia.AudioPlayer.stop();
}
//AudioPlayer
var audioPlayerTimer;
Widget.Multimedia.AudioPlayer = {currentState:'', media:'', onStateChange:function () {
}, open:function (path) {
    printDebugInfo("AudioPlayer.open() path:" + path);
    Widget.Multimedia.AudioPlayer.currentState = 'opened';
    Widget.Multimedia.AudioPlayer.onStateChange('opened')
}, play:function (times) {
    printDebugInfo("AudioPlayer.play() times:" + times);
    Widget.Multimedia.AudioPlayer.currentState = 'playing';
    Widget.Multimedia.AudioPlayer.onStateChange('playing');
    audioPlayerTimer = setTimeout(function () {
        Widget.Multimedia.AudioPlayer.currentState = 'stopped';
        Widget.Multimedia.AudioPlayer.onStateChange('completed');
    }, 3000);
}, pause:function () {
    printDebugInfo("AudioPlayer.pause()");
    Widget.Multimedia.AudioPlayer.currentState = 'paused';
    Widget.Multimedia.AudioPlayer.onStateChange('paused')
    clearTimeout(audioPlayerTimer);
}, resume:function () {
    printDebugInfo("AudioPlayer.resume()");
    Widget.Multimedia.AudioPlayer.currentState = 'playing';
    Widget.Multimedia.AudioPlayer.onStateChange('playing')
    audioPlayerTimer = setTimeout(function () {
        Widget.Multimedia.AudioPlayer.currentState = 'stopped';
        Widget.Multimedia.AudioPlayer.onStateChange('completed');
    }, 3000);
}, stop:function () {
    printDebugInfo("AudioPlayer.stop()");
    Widget.Multimedia.AudioPlayer.currentState = 'stopped';
    Widget.Multimedia.AudioPlayer.onStateChange('stopped')
    clearTimeout(audioPlayerTimer);
} };
//Camera
var g_imgUri;
Widget.Multimedia.Camera = {onCameraCaptured:function(){}, captureImage:{}};
Widget.Multimedia.Camera.captureImage = function (fileName, lowRes) {
    printDebugInfo("Camera.captureImage() fileName:" + fileName + " lowRes:" + lowRes);
    g_imgUri = fileName;
    setTimeout(function () {
        Widget.Multimedia.Camera.onCameraCaptured(g_imgUri)
    }, 200);
};
Widget.Multimedia.Camera.setWindow = function (domobj) {
    printDebugInfo("Camera.setWindow was deprecated");
};
//Device
Widget.Device = {};
Widget.Device.getAvailableApplications = function () {
    var ret = new Array();
    ret.push(Widget.Device.ApplicationTypes.BROWSER);
    ret.push(Widget.Device.ApplicationTypes.MAIL);
    ret.push(Widget.Device.ApplicationTypes.MEDIAPLAYER);
    ret.push(Widget.Device.ApplicationTypes.MESSAGING);
    ret.push(Widget.Device.ApplicationTypes.PHONECALL);
    ret.push(Widget.Device.ApplicationTypes.ALARM);
    ret.push(Widget.Device.ApplicationTypes.CALCULATOR);
    ret.push(Widget.Device.ApplicationTypes.CALENDAR);
    ret.push(Widget.Device.ApplicationTypes.CAMERA);
    ret.push(Widget.Device.ApplicationTypes.CONTACTS);
    ret.push(Widget.Device.ApplicationTypes.FILES);
    ret.push(Widget.Device.ApplicationTypes.GAMES);
    ret.push(Widget.Device.ApplicationTypes.PICTURES);
    ret.push(Widget.Device.ApplicationTypes.PROG_MANAGER);
    ret.push(Widget.Device.ApplicationTypes.SETTINGS);
    ret.push(Widget.Device.ApplicationTypes.TASKS);
    ret.push(Widget.Device.ApplicationTypes.WIDGET_MANAGER);
    return ret
};
Widget.Device.launchApplication = function (application, startParameter) {
    if (application == null || application == '') {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is empty');
        return
    }
    if (typeof(application) != 'string') {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is not string');
        return
    }
    if (startParameter != null && typeof(startParameter) != 'string') {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is not string');
        return
    }
    if (null == startParameter) {
        startParameter = ''
    }
    var valid = false;
    var typeArray = Widget.Device.getAvailableApplications();
    for(var i = 0; i< typeArray.length; i++) {
        if(application == typeArray[i]) {
            printDebugInfo("launchApplication:" + application + ",param:" + startParameter);
            valid = true;
        }
    }
    if (!valid)  {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is error!');
    }
};
Widget.Device.vibrate = function (number) {
    if (number == null || number == '') {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is empty');
        return
    }
    if (typeof(number) != 'number') {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is not number');
        return
    }
    if (number < 0) {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is error');
        return
    }
    printDebugInfo("Device.vibrate time:" + number);
};
Widget.Device.getDeviceId = function () {
    return "5b9cd5617bb30924ddde9f760adbfc11";
};
Widget.Device.getNetworkConnectionType = function () {
//    return "2G";
//    return "3G";
    return "WIFI";
//    return "";
};
Widget.Device.getOSPlatform = function () {
    return 'iOS';
//    return 'Android';
};
Widget.Device.getOSVersion = function () {
//iOS version
    return "5.1.1";
//android version
//    return "8";
};
//ApplicationTypes
Widget.Device.ApplicationTypes = {get ALARM() {
    return'ALARM'
}, get BROWSER() {
    return'BROWSER'
}, get CALCULATOR() {
    return'CALCULATOR'
}, get CALENDAR() {
    return'CALENDAR'
}, get CAMERA() {
    return'CAMERA'
}, get CONTACTS() {
    return'CONTACTS'
}, get FILES() {
    return'FILES'
}, get GAMES() {
    return'GAMES'
}, get MAIL() {
    return'MAIL'
}, get MEDIAPLAYER() {
    return'MEDIAPLAYER'
}, get MESSAGING() {
    return'MESSAGING'
}, get PHONECALL() {
    return'PHONECALL'
}, get PICTURES() {
    return'PICTURES'
}, get PROG_MANAGER() {
    return'PROG_MANAGER'
}, get SETTINGS() {
    return'SETTINGS'
}, get TASKS() {
    return'TASKS'
}};
//DeviceStateInfo
Widget.Device.DeviceStateInfo = {requestPositionInfo:function (method) {
    printDebugInfo("DeviceStateInfo.requestPositionInfo() was deprecated. please use Widget.CMap.Location instead.")
    if (method == null || method == '') {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is empty');
        return
    }
    if (typeof(method) != 'string') {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is not string');
        return
    }
    var v = method.toLowerCase();
    if (v != 'gps' && v != 'agps' && v != 'cellid') {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is error');
        return
    }
    positionMethod = method;
    setTimeout(function () {
        Device_onPositionSuccess();
    }, 1000);
}, onPositionRetrieved:function(){}, AccelerometerInfo:{}};
var positionMethod = '';
function Device_onPositionSuccess() {
    var positionInfo = new Widget.Device.PositionInfo();
    positionInfo.accuracy = "171.1583074013777";
    positionInfo.altitude = "55.312042236328125";
    positionInfo.altitudeAccuracy = 10;
    positionInfo.latitude = "39.89593653827606";
    positionInfo.longitude = "116.34605993549015";
    positionInfo.timeStamp = "Wed Jun 05 2013 11:11:50 GMT+0800 (CST)";
    Widget.Device.DeviceStateInfo.onPositionRetrieved(positionInfo, positionMethod)
};
//AccelerometerInfo
Widget.Device.DeviceStateInfo.AccelerometerInfo = {x:0, get xAxis() {
    var x = -0.10896278;
    //printDebugInfo("xAxis:" + x);
    return x;
}, y:0, get yAxis() {
    var y = -0.29964766;
    //printDebugInfo("yAxis:" + y);
    return y;
}, z:0, get zAxis() {
    var z = 9.765789;
    //printDebugInfo("zAxis:" + z);
    return z;
}};
//PositionInfo
Widget.Device.PositionInfo = function () {
    this.mAccuracy;
    this.mAltitude;
    this.mAltitudeAccuracy;
    this.mCellId;
    this.mLatitude;
    this.mLongitude;
    this.mTimeStamp
};
Widget.Device.PositionInfo.prototype = {get accuracy() {
    return this.mAccuracy
}, set accuracy(value) {
    this.mAccuracy = value
}, get altitude() {
    return this.mAltitude
}, set altitude(value) {
    this.mAltitude = value
}, get altitudeAccuracy() {
    return this.mAltitudeAccuracy
}, set altitudeAccuracy(value) {
    this.mAltitudeAccuracy = value
}, get cellID() {
    return this.mCellId
}, set cellID(value) {
    this.mCellId = value
}, get latitude() {
    return this.mLatitude
}, set latitude(value) {
    this.mLatitude = value
}, get longitude() {
    return this.mLongitude
}, set longitude(value) {
    this.mLongitude = value
}, get timeStamp() {
    return this.mTimeStamp
}, set timeStamp(value) {
    this.mTimeStamp = value
}};
//Messaging
Widget.Messaging = {};
Widget.Messaging.createMessage = function (messageType) {
    if (messageType == null || messageType.length == 0) {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The messageType is null');
        return null
    }
    if (messageType != Widget.Messaging.MessageTypes.SMSMessage) {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is not valid');
        return null
    }
    var msg = new Widget.Messaging.Message();
    msg.attachments = new Array();
    msg.bccAddress = new Array();
    msg.body = '';
    msg.callbackNumber = '';
    msg.ccAddress = new Array();
    msg.destinationAddress = new Array();
    msg.isRead = '';
    msg.messageId = '';
    msg.messagePriority = '';
    msg.messageType = messageType;
    msg.sourceAddress = '';
    msg.subject = '';
    msg.time = '';
    msg.validityPeriodHours = '';
    return msg
};
Widget.Messaging.sendMessage = function (msg) {
    if (msg == null) {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is null');
        return
    }
    if (!(msg instanceof Widget.Messaging.Message)) {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is not valid');
        return
    }
    if ((msg.destinationAddress == null) || (msg.destinationAddress.length == 0)) {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, 'destinationAddress is null');
        return
    }
    if ((msg.body == null) || (msg.body.length == 0)) {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, 'body is null');
        return
    }
    Widget.Messaging.currentMsg = msg;
    printDebugInfo("Messaging.sendMessage() destinationAddress:" + msg.destinationAddress
        + "msg:" + msg.body)
};
Widget.Messaging.onMessageSendingFailure = function() {
    printDebugInfo("Messaging.onMessageSendingFailure was deprecated.")
}
//Message
Widget.Messaging.Message = function () {
    this.body = '';
    this.callbackNumber = '';
    this.destinationAddress = '';
    this.isRead = '';
    this.messageId = '';
    this.messagePriority = '';
    this.messageType = '';
    this.sourceAddress = '';
    this.subject = '';
    this.time = '';
    this.validityPeriodHours = '';
    this.addAddress = function (type, addr) {
        if (type == null || type.length == 0) {
            throwException(Widget.ExceptionTypes.INVALID_PARAMETER, 'The address type is null');
            return
        }
        if (addr == null || addr.length == 0) {
            throwException(Widget.ExceptionTypes.INVALID_PARAMETER, 'The address is null');
            return
        }
        if (type == 'destination') {
            this.destinationAddress.push(addr)
        }
    };
    this.deleteAddress = function (type, addr) {
        if (type == null || type.length == 0) {
            throwException(Widget.ExceptionTypes.INVALID_PARAMETER, 'The addressType is null');
            return
        }
        if (addr == null || addr.length == 0) {
            throwException(Widget.ExceptionTypes.INVALID_PARAMETER, 'The address is null');
            return
        }
        if (type == 'destination') {
            for (var j = 0; j < this.destinationAddress.length; j++) {
                if (addr == this.destinationAddress[j]) {
                    this.destinationAddress.splice(j, 1)
                }
            }
        }
    }
};
//MessageTypes
Widget.Messaging.MessageTypes = {SMSMessage:'sms'};
//PIM
Widget.PIM = {};
Widget.PIM.onAddressBookItemsFound = function () {
};
var g_count = 0;
Widget.PIM.findAddressBookItems = function (comparisonContact, startInx, endInx) {
    if (comparisonContact == null || comparisonContact == 'undefined') {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is null');
        return
    }
    if (!(comparisonContact instanceof Widget.PIM.AddressBookItem)) {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is not valid');
        return
    }
    if (isNaN(endInx) || isNaN(startInx)) {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is not valid');
        return
    }
    if (endInx < 0) {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is not valid');
        return
    }
    printDebugInfo("PIM.findAddressBookItems() startInx:" + startInx + ", endInx:" + endInx);
    g_count = endInx - startInx;
    setTimeout(function () {
        onFindContactSuccess();
    }, 1000)
};

function onFindContactSuccess() {
    var arrayValue = new Array();
    var item = new Widget.PIM.AddressBookItem();
    item.addressBookItemId = 1;
    item.fullName = '张小娴';
    item.mobilePhone = '15833656854';
    item.homePhone = '010-88636247';
    item.workPhone = '010-88634548';
    item.eMail = 'zhangxiaoxian@139.com';
    item.company = '中国银行';
    item.title = '经理';
    item.address = '北京市西城区';
    arrayValue.push(item);
    item = new Widget.PIM.AddressBookItem();
    item.addressBookItemId = 2;
    item.fullName = '王伟';
    item.mobilePhone = '13455652874';
    item.homePhone = '021-61972125';
    item.workPhone = '021-619724223';
    item.eMail = 'wangwei@sina.com.cn';
    item.company = 'softbank';
    item.title = '职员';
    item.address = '上海市浦东区';
    arrayValue.push(item);
    item = new Widget.PIM.AddressBookItem();
    item.addressBookItemId = 3;
    item.fullName = '李中书';
    item.mobilePhone = '18955658524';
    item.homePhone = '025-85418645';
    item.workPhone = '025-85412458';
    item.eMail = 'lizhongshu@sohu.com';
    item.company = '国家电网';
    item.title = '科长';
    item.address = '南京市玄武区';
    arrayValue.push(item);
    item = new Widget.PIM.AddressBookItem();
    item.addressBookItemId = 4;
    item.fullName = 'Steven';
    item.mobilePhone = '13577458542';
    item.homePhone = '0571-88757921';
    item.workPhone = '0571-78957921';
    item.eMail = 'steven@gmail.com';
    item.company = 'softbank';
    item.title = 'Manager';
    item.address = '杭州市余杭区';
    arrayValue.push(item);
    if (g_count > 0) {
        g_count = g_count > arrayValue.length ? arrayValue.length : g_count;
    }
    var retArray = new Array();
    for (var i = 0; i < g_count; i++) {
        retArray.push(arrayValue[i]);
    }
    Widget.PIM.onAddressBookItemsFound(retArray)
}
;

Widget.PIM.getAddressBookItemsCount = function () {
    return 4;
};

Widget.PIM.createAddressBookItem = function () {
    return new Widget.PIM.AddressBookItem()
};
Widget.PIM.getAddressBookItem = function (id) {
    if (id == null || id == '') {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is null');
        return null
    }
    if (isNaN(id)) {
        throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is not number');
        return null
    }
    printDebugInfo("PIM.getAddressBookItem() id:" + id);
    var item = new Widget.PIM.AddressBookItem();
    item.addressBookItemId = 1;
    item.fullName = '张小娴';
    item.mobilePhone = '15833656854';
    item.homePhone = '010-88636247';
    item.workPhone = '010-88634548';
    item.eMail = 'zhangxiaoxian@139.com';
    item.company = '中国银行';
    item.title = '经理';
    item.address = '北京市西城区';
    return item;
};
//AddressBookItem
Widget.PIM.AddressBookItem = function () {
    this.address = '';
    this.addressBookItemId = '';
    this.company = '';
    this.eMail = '';
    this.fullName = '';
    this.homePhone = '';
    this.mobilePhone = '';
    this.title = '';
    this.workPhone = ''
};
Widget.PIM.AddressBookItem.prototype = {
    getAttributeValue:function (attribute) {
        if (attribute == null || attribute == '') {
            throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is null');
            return null
        }
        if (typeof(attribute) != 'string') {
            throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter is not string');
            return null
        }
        if ('address' == attribute) {
            return this.address
        } else if ('addressBookItemId' == attribute) {
            return this.addressBookItemId
        } else if ('company' == attribute) {
            return this.company
        } else if ('eMail' == attribute) {
            return this.eMail
        } else if ('fullName' == attribute) {
            return this.fullName
        } else if ('homePhone' == attribute) {
            return this.homePhone
        } else if ('mobilePhone' == attribute) {
            return this.mobilePhone
        } else if ('title' == attribute) {
            return this.title
        } else if ('workPhone' == attribute) {
            return this.workPhone
        }
    }, getAvailableAttributes:function () {
        var attributesArray = new Array();
        if (this.address != null && this.address != undefined && this.address != '') {
            attributesArray.push('address')
        }
        if (this.addressBookItemId != null && this.addressBookItemId != undefined && this.addressBookItemId != '') {
            attributesArray.push('addressBookItemId')
        }
        if (this.company != null && this.company != undefined && this.company != '') {
            attributesArray.push('company')
        }
        if (this.eMail != null && this.eMail != undefined && this.eMail != '') {
            attributesArray.push('eMail')
        }
        if (this.fullName != null && this.fullName != undefined && this.fullName != '') {
            attributesArray.push('fullName')
        }
        if (this.homePhone != null && this.homePhone != undefined && this.homePhone != '') {
            attributesArray.push('homePhone')
        }
        if (this.mobilePhone != null && this.mobilePhone != undefined && this.mobilePhone != '') {
            attributesArray.push('mobilePhone')
        }
        if (this.title != null && this.title != undefined && this.title != '') {
            attributesArray.push('title')
        }
        if (this.workPhone != null && this.workPhone != undefined && this.workPhone != '') {
            attributesArray.push('workPhone')
        }
        return attributesArray
    }, setAttributeValue:function (attribute, value) {
        if (attribute == null || attribute == '') {
            throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter attribute is null');
            return
        }
        if (typeof(attribute) != 'string') {
            throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter attribute is not string');
            return
        }
        if (value == null || value == '') {
            throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter value is null');
            return
        }
        if (typeof(value) != 'string') {
            throwException(Widget.ExceptionTypes.INVALID_PARAMETER, ' The parameter value is not string');
            return
        }
        if ('address' == attribute) {
            this.address = value
        } else if ('addressBookItemId' == attribute) {
            this.addressBookItemId = value
        } else if ('company' == attribute) {
            this.company = value
        } else if ('eMail' == attribute) {
            this.eMail = value
        } else if ('fullName' == attribute) {
            this.fullName = value
        } else if ('homePhone' == attribute) {
            this.homePhone = value
        } else if ('mobilePhone' == attribute) {
            this.mobilePhone = value
        } else if ('title' == attribute) {
            this.title = value
        } else if ('workPhone' == attribute) {
            this.workPhone = value
        }
    }, update:function () {
        printDebugInfo("AddressBookItem update fullName:" + this.fullName + ",workPhone:" + this.workPhone
            + ",homePhone:" + this.homePhone + ",mobilePhone:" + this.mobilePhone + ",eMail:" + this.eMail
            + ",company:" + this.company + ",address:" + this.address + ",title:" + this.title)
    }
};
//Todo: 增加Widget.CPay