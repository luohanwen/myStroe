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
