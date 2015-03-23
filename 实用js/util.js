/**
 * 一些实用的js方法
 * @author haven
 */
function Util() {}
    /** 
    * 图片转换成base64  convertImgToBase64  (不能读取本地文件路径)
    * @param {String} url 
    * @param {Function} callback 
    * @param {String} [outputFormat='image/png'] 
    * @author HaNdTriX 
    * @example 
    convertImgToBase64('http://goo.gl/AOxHAL', function(base64Img){ 
    console.log('IMAGE:',base64Img); 
    }) 
    */
Util.prototype.convertImgToBase64 = function(url, callback, outputFormat) {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = url;
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback.call(this, dataURL);
        // Clean up 
        canvas = null;
    };
};
/**
 * 随机获取数组的值，返回新数组
 * @param  {json} opt 新数组长度和源数组如：{arry:[1,2],range:1}
 * @return {Array}     [新数组]
 */
Util.prototype.getRandomArr(opt) {
    var old_arry = opt.arry,
        range = opt.range;
    //防止超过数组的长度
    range = range > old_arry.length ? old_arry.length : range;
    var newArray = [].concat(old_arry), //拷贝原数组进行操作就不会破坏原数组
        valArray = [];
    for (var n = 0; n < range; n++) {
        var r = Math.floor(Math.random() * (newArray.length));
        valArray.push(newArray[r]);
        //在原数组删掉，然后在下轮循环中就可以避免重复获取
        newArray.splice(r, 1);
    }
    return valArray;
}