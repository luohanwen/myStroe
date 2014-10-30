/**
 * 常用的一些验证
 * author haven
 */
var validateFuc = {
    //验证是否是手机号码;
    isPhoneNum: function(phoneNum) {
        var myreg = /^(13|15|18|17)\d{9}|(147|145)\d{8}$/;
        if (phoneNum.length != 11 || !myreg.test(phoneNum)) {
            return false;
        }
        return true;
    },
    //8-16位数字和字母的组合;
    isPassValidate: function(str) {
        var myreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
        if (!myreg.test(str)) {
            return false;
        }
        return true;
    }
};