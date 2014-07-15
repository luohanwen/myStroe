/*
 * 
 */
define(['zepto', 'underscore'], function($, _){
    
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

    //暂时最多只支持两个按钮
    var Dialog = function(config,btnConfigs){
        var me = this;
        this.config = {autoshow : true, target: 'body', title: '提示',content: '提示内容'};
        // this.btnConfigs = {configs:[{title:'确定',eventName:'ok'},{title:'取消',eventName:'cancel'}],ok:function(){},cancel:function(){}}
        this.btnConfigs = {configs:[{title:'确定'}]};
        if(config) {
            this.config = _.extend(this.config, config);
            this.btnConfigs = _.extend(this.btnConfigs,btnConfigs);
        }
        window.onresize = function(){
            me.calculatePosition();
        };
        if(this.config.autoshow && !this.isShow()) {
            this.show();
 	    if(config.disableScroll){
            	disableScrolling();
 	    }
        }
        

        // $(window).bind('resize',function(){
        //     me.calculatePosition();
        // })
    };



    var dialogElem =  '<div id="cube-dialog-wrapper">'
                     +'<div class="cube-dialog ui-corner-all" style="z-index: 500;min-width:260px; position: fixed; height:auto;">'
                     +   '<div style="margin-bottom: 4px;" class="ui-header ui-bar-b">'
                     +       '<div class="ui-title cube-dialog-header" style="padding-top:10px">提示</div>'
                     +   '</div>'
                     +   '<div>'
                     +       '<p class="cube-dialog-subtitle">该航班已经订阅！</p>'
                     +       '<div class="cube-dialog-controls">'
                     +       '</div>'
                     +   '</div>'
                     +'</div>'
                     +'<div class="cube-dialog-screen cube-dialog-screen-model" style="z-index: 1000; display: block; "></div>';
                     +'</div>'

    // var dialogElem = '<div id ="dialog" class="cube-dialog" style="margin-top:200px;margin-left:200px;width:200px;position:absolute;height:200px;background-color:black"></div>'

    var btnElem =    '<button class="btn cube-dialog-btn ui-shadow ui-btn-corner-all ui-btn-icon-left" eventname="abcd">'
                     +    '<span class="ui-btn-inner ui-btn-corner-all">'
                     +       '<span class="cube-dialog-btn-title ui-btn-text">确定</span>'
                     +       '<span class="ui-icon ui-icon-check ui-icon-shadow">&nbsp;</span>'
                     +    '</span>'
                     +'</button>';

    Dialog.prototype.isShow = function(){
        var dialogWrapper = document.getElementById('cube-dialog-wrapper');
        if(dialogWrapper){
            return true;
        }
        return false;
    }


    //change事件需要执行用户自定义事件，还要广播事件。
    Dialog.prototype.show = function() {
        var targetObj = $(this.config.target);


        $(targetObj).append(dialogElem);
        $('.cube-dialog-header').html(this.config.title);       //弹出框标题
        $('.cube-dialog-subtitle').html(this.config.content);   //弹出框内容
        var dialog =  $('.cube-dialog');

        
        if(dialog){
            //设置对话框宽度
            this.calculatePosition();
            this.initBtn(dialog);
        }   
    };

    Dialog.prototype.calculatePosition = function(){
            var pageHeight = document.getElementsByTagName('body')[0].scrollHeight;   //设置黑色背景全屏
            $('.cube-dialog-screen').css('height',pageHeight);
            
            var targetObj = $(this.config.target);
            var dialog =  $('.cube-dialog');
            var targetWidth = parseInt(targetObj.width());
            var targetHeight = parseInt(targetObj.css("height"));
            var dialogWidth =  parseInt(dialog.css('width'));
            var top = document.documentElement.clientHeight;   //获取窗口高度
            if($.browsers && $.browser.msie){
                var wrapper = $('.cube-dialog-screen')[0];
                $(wrapper).height(top);
            }

            var dialogHeight = dialog.height() + 42;
            dialog.css("top", "50%");       //设置到当前窗口中间 
            dialog.css("margin-top", "-"+(dialogHeight/2)+"px"); //反向拖对话框到中间
            // dialog.css("top", scrollTop + (top/2) - parseInt(dialog.css("height"))/2+"px");       //设置到当前窗口中间
            var marginLeft = (targetWidth - dialogWidth)/2 - 5;
            dialog.css('left',marginLeft+'px');
            dialog.css('width', dialogWidth + 'px');
            
    };

    Dialog.prototype.initBtn = function(dialog){
        var me = this;
        var controls = $('.cube-dialog-controls');
        var dialogWidth = $(dialog).css('width');
        if(!controls) return;
        
        for(var i = 0; i < this.btnConfigs.configs.length; i++){        //添加按钮
            controls.append(btnElem);       
        }

       var btns =  $('.cube-dialog-btn');
       var btnWidth= ((parseInt(dialogWidth) - 10 * (btns.length - 1) - 20 * btns.length) / btns.length);      //计算按钮宽度
       var btnTitles = $('.cube-dialog-btn-title');
       for(var i = 0; i < btns.length; i++){
            var localBtn = $(btns[i]);
            var btnConfigs = this.btnConfigs;
            $(btnTitles[i]).html(this.btnConfigs.configs[i].title);             //设置按钮标题
            localBtn.attr({'eventname':this.btnConfigs.configs[i].eventName});      //设置事件名称
            localBtn.css('padding','4px 0px');                                  //设置按钮属性
            localBtn.css('width', btnWidth + 'px');
            localBtn.css('margin-left', 10 + 'px');
            localBtn.css('margin-right', 10 + 'px');
            localBtn.css('margin-bottom', 10 + 'px');
            localBtn.bind('click',function(){                                   //从this.btnConfigs中调用方法
                me.hide();
                if($(this).attr('eventname')){
                    btnConfigs[$(this).attr('eventname')]();
                }
            })
            $(dialog).append(localBtn);
       }
    };


    Dialog.prototype.hide = function() {
        var cube_dialog = this.find();
        if(cube_dialog){ 
            $(cube_dialog).remove();
            enableScrolling();
        }
    };

    Dialog.prototype.find = function() {
        var targetOjb = $(this.config.target);
        var result;
        var children = targetOjb.children();
        $(children).each(function(){
            if($(this).attr('id') == 'cube-dialog-wrapper') {
                result = this;
            }
        });
        return result;
    }


    return Dialog;
});