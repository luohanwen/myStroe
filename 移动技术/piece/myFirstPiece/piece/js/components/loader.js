
/*
 * JS中初始化该控件。
 * var loader = new Loader({
 *       autoshow:false,    //是否初始化时就弹出加载控件
 *       target:'#test'     //页面目标组件表识
 *  });
 * loader.show();       //显示加载窗
 * loader.hide();       //隐藏加载窗
 * loader.hideAll();    //隐藏所有加载窗
 * 
 * loading组件，最终转换出html5
 * <div class="cube-loader">
 *      <div class="cube-loader-icon">
 *      </div>
 * </div>
 */


define(['zepto','components/fixed'], function($,Fixed){
    var me;
    var keys = [37, 38, 39, 40];
    var canceled;

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;  
    }
    
    function keydown(e) {
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                preventDefault(e);
                return;
            }
        }
    }

    function scrolling(e) {
        preventDefault(e);
    }

    function disableScrolling(){
        if(window.addEventListener){
            window.addEventListener('DOMMouseScroll', scrolling, false);
            window.addEventListener('touchmove',scrolling,false);
            window.onmousewheel = document.onmousewheel = scrolling;
            document.onkeydown = keydown;
        }
    }

    function enableScrolling(){
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', scrolling, false);
            window.removeEventListener('touchmove',scrolling,false);
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null;
    }
    
    //判断是否已替换，来判断是否已经构造完成
    var Loader = function(config){
        this.config = {autoshow : true, target: 'body',text:"正在加载中...",cancelable:true};
        canceled = false;
        if(config) {
            this.config = $.extend(this.config, config);
        }
        if(this.config.autoshow) {
            this.show();
        }



    };

    //change事件需要执行用户自定义事件，还要广播事件。
    Loader.prototype.show = function() {
        me = this;

        disableScrolling();
        var targetOjb = $(this.config.target);
        var cube_loader =  this.find();
        if(cube_loader) return;

        //灰色透明背景
        var loader_mask = $("<div/>").addClass("cube-loader-mask");
        var loader = $("<div/>").addClass("cube-flight-loader");
        //小飞机
        var img = $("<img/>").addClass("cube-flight-loader-flight");
        img.attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABMCAYAAAD6BTBNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYwREU3RUVEN0NGODExRTI4OENEODE5MUE4NkZCQUREIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYwREU3RUVFN0NGODExRTI4OENEODE5MUE4NkZCQUREIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjBERTdFRUI3Q0Y4MTFFMjg4Q0Q4MTkxQTg2RkJBREQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjBERTdFRUM3Q0Y4MTFFMjg4Q0Q4MTkxQTg2RkJBREQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7Cd8RcAAANlElEQVR42uxcCWwU1xme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');
        //取消按钮
        var cancelImg = $('<img/>');
        cancelImg.attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc2NUIyNTY4N0NGODExRTI4NTM0QTk5OUJEQjdBQzlGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc2NUIyNTY5N0NGODExRTI4NTM0QTk5OUJEQjdBQzlGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzY1QjI1NjY3Q0Y4MTFFMjg1MzRBOTk5QkRCN0FDOUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzY1QjI1Njc3Q0Y4MTFFMjg1MzRBOTk5QkRCN0FDOUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Lar7mAAAG1klEQVR42syaeWxUVRTG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');
        var cancelBtn = $('<a/>').addClass('cube-flight-loader-cancel');
        cancelBtn.attr('href','javascript:void(0)');
        if(this.config.cancelable!=false){
            cancelBtn.bind('click',function(){
                me.hide();
                canceled = true;
            });
            
        }
        cancelBtn.append(cancelImg);
        //文字
        var text = $('<span/>').addClass("cube-loader-text");
        text.html(this.config.text);


        
        loader.append(img);
        loader.append(cancelBtn);
        loader.append(text);
    
        $(targetOjb).append(loader_mask);
        $(targetOjb).append(loader);


        Fixed.FixLoaderOn();/* add by fengqiuming 20130604  */

    };

    function onLoderScroll(){
    }

    function onLoaderOrientationchange(){
    }


    function onLoderResize(){
    }

    Loader.prototype.hide = function() {
        enableScrolling();
        var cube_loader = me.find();
        if(cube_loader){
            $(".cube-loader-mask").remove();
            $(cube_loader).remove();
        }
        
        Fixed.FixLoaderOff();/* add by fengqiuming 20130604  */
    };

    Loader.prototype.hideAll = function() {
        enableScrolling();
        var cube_loader = $(".cube-flight-loader");
        if(cube_loader && cube_loader.length>0) {
            $(cube_loader).each(function(){
                $(this).remove();
            });
        }

        Fixed.FixLoaderOff();/* add by fengqiuming 20130604  */
    };

    Loader.prototype.find = function() {
        var targetOjb = $(this.config.target);
        var result;
        var children = targetOjb.children();
        $(children).each(function(){
            if($(this).hasClass("cube-flight-loader")) {
                result = this;
            }
        });
        return result;
    };

    Loader.prototype.isCanceled = function(){
        return canceled;
    };
    return Loader;
});