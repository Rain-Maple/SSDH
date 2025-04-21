// 分辨率自适应
var phoneWidth = parseInt(window.screen.width);
var phoneHeight = parseInt(window.screen.height);
var phoneScale = phoneWidth/834;//除以的值按手机的物理分辨率
var ua = navigator.userAgent;
if (/Android (\d+\.\d+)/.test(ua)) {
    var version = parseFloat(RegExp.$1);
    // andriod 2.3
    if (version > 2.3) {
    document.write('<meta name="viewport" content="width=device-width,initial-scale='+phoneScale+',minimum-scale='+phoneScale+',maximum-scale='+phoneScale+',user-scalable=no">');
    // andriod 2.3以上
    } else {
        document.write('<meta name="viewport" content="width=device-width,user-scalable=no">');
    }
// 其他系统
} else {
    document.write('<meta name="viewport" content="width=device-width, initial-scale='+phoneScale+',minimum-scale='+phoneScale+',maximum-scale ='+phoneScale +',user-scalable=no,">');
}