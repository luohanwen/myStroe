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
define(['zepto'], function($){

    var keys = [37, 38, 39, 40];

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
        this.config = {autoshow : true, target: 'body', text: '载入中...'};
        if(config) {
            this.config = $.extend(this.config, config);
        }
        if(this.config.autoshow) {
            this.show();
        }
    };

    //change事件需要执行用户自定义事件，还要广播事件。
    Loader.prototype.show = function() {

        disableScrolling();
        var targetOjb = $(this.config.target);
        var cube_loader =  this.find();
        if(cube_loader) return;

        cube_loader = $("<div/>").addClass("cube-loader");
        var cube_loader_block = $("<div/>").addClass("cube-loader-block");
        var cube_loader_icon = $("<div/>").addClass("cube-loader-icon");
        var p = $("<p/>").append(this.config.text);
        cube_loader_block.append(cube_loader_icon);
        cube_loader_block.append(p);
        cube_loader.append(cube_loader_block);

        var children = $(this.config.target).children();
        if(children && children.length>0) {
            children.first().before(cube_loader);
        } else {
            $(targetOjb).append(cube_loader);
        }
        // cube_loader.css("width", "900%");
        // cube_loader.css("height", "900%");
        // cube_loader.css("left", "-400%");
        // cube_loader.css("top", "-400%");
    };

    //
    Loader.prototype.hide = function() {
        enableScrolling();
        var cube_loader = this.find();
        if(cube_loader) $(cube_loader).remove();
    };

    Loader.prototype.hideAll = function() {
        enableScrolling();
        var cube_loader = $(".cube-loader");
        if(cube_loader && cube_loader.length>0) {
            $(cube_loader).each(function(){
                $(this).remove();
            });
        }
    };

    Loader.prototype.find = function() {
        var targetOjb = $(this.config.target);
        var result;
        var children = targetOjb.children();
        $(children).each(function(){
            if($(this).hasClass("cube-loader")) {
                result = this;
            }
        });
        return result;
    }
    return Loader;
});