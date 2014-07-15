
define(['backbone', 'underscore', 'zepto', 'gmu'], function(Backbone, _, $, gmu) {

    var Carousel = Backbone.View.extend({

        // viewNum {Number}: (可选, 默认:1) 可以同时看到几张图片
        // imgInit {Number}: (可选, 默认:2)初始加载几张图片
        // imgZoom {Boolean}: (可选, 默认:false)是否缩放图片,设为true时可以将超出边界的图片等比缩放
        // loop {Boolean}: (可选, 默认:false)设为true时,播放到最后一张时继续正向播放第一张(无缝滑动)，设为false则反向播放倒数第2张
        // springBackDis {Number}: (可选, 默认:15)滑动能够回弹的最大距离
        // autoPlay {Boolean}: ((可选, 默认:true)是否自动播放
        // autoPlayTime {Number}: (可选, 默认:4000ms)自动播放的间隔
        // animationTime {Number}: (可选, 默认:400ms)滑动动画时间
        // showArr {Boolean}: (可选, 默认:true)是否展示上一个下一个箭头  **Cube版本不需要显示
        // showDot {Boolean}: (可选, 默认:true)是否展示页码  **此处因为已经自行实现，所以不需要GMU的

        initialize: function() {
            var me = this;

            var dataViewNum = $(me.el).attr('data-viewNum');
            var dataImgInit = $(me.el).attr('data-imgInit');
            var dataImgZoom = $(me.el).attr('data-imgZoom');
            var dataLoop = $(me.el).attr('data-loop');
            var dataSpringBackDis = $(me.el).attr('data-springBackDis');
            var dataAutoPlay = $(me.el).attr('data-autoPlay');
            var dataAutoPlayTime = $(me.el).attr('data-autoPlayTime');
            var dataAnimationTime = $(me.el).attr('data-animationTime');
            var dataShowArr = $(me.el).attr('data-showArr');
            var dataShowDot = $(me.el).attr('data-showDot');

            var thisCarousel = $(me.el).slider({
                viewNum: (dataViewNum === null ? 1 : dataViewNum),
                imgInit: (dataImgInit === null ? 2 : dataImgInit),
                imgZoom: (dataImgZoom === null || dataImgZoom === 'false' ? false : true),
                loop: (dataLoop === null || dataLoop === 'true' ? true : false),
                springBackDis: (dataSpringBackDis === null ? 15 : dataSpringBackDis),
                autoPlay: (dataAutoPlay === null || dataAutoPlay === 'true' ? true : false),
                autoPlayTime: (dataAutoPlayTime === null ? 4000 : dataAutoPlayTime),
                animationTime: (dataAnimationTime === null ? 400 : dataAnimationTime),
                showArr: (dataShowArr === null || dataShowArr === 'true' ? false : false),
                showDot: (dataShowDot === null || dataShowDot === 'true' ? false : false)
            });

            var pagerEl = arguments[0].pagerEl;

            var container = arguments[0].container;
            // $(container).append(thisCarousel);

            setTimeout(function() {
                $(me.el).slider('_resize');
            }, 0);


            $(window).on('resize', carouselInit);

            function carouselInit(){
                $(me.el).slider('_resize');
            }


            $(pagerEl.find('td')).css({'background-color':'#ffffff'});
            $(pagerEl.find('td')).css({'opacity':'0.3'});
            $(pagerEl.find('td')[0]).css({'background-color':'#37c1f4'})
            $(pagerEl.find('td')[0]).css({'opacity':'1.0'})


            thisCarousel.on('slide',function(){

                var pageIndex = arguments[0].data;
                pagerEl.find('td').css({'background-color':'#ffffff'});
                pagerEl.find('td').css({'opacity':'0.3'});
                $(pagerEl.find('td')[pageIndex]).css({'background-color':'#37c1f4'})
                $(pagerEl.find('td')[pageIndex]).css({'opacity':'1.0'})
            });

            var pCount = pagerEl.find('td').length;
            for(k = 0; k < pCount; k++){

                var sliderIndex = k;
                $(pagerEl.find('td')[sliderIndex]).on('click',function(){
                    // sliderIndex $(this).index())
                    $(me.el).slider('_move',$(this).index());
                    // $(me.el).slider('_resize');
                })
            }


        
        }
    }, {
        compile: function(elContext) {
            var me = this;
            // return _.map($(elContext).find(".slider"), function(tag) {
            //  var slider = new Slider({
            //      el: tag
            //  });
            //  return slider;
            // });
            return _.map($(elContext).find("carousel"), function(tag) {
                var container = document.createElement('div');
                var containerWidth = $(tag).css('width');
                var carouselId = ($(tag).attr('id').length>0)? $(tag).attr('id') : 'myCarousel';
                $(container).attr('id',carouselId);
                $(container).attr('style','position:relative;'+
                                    'top:0;left:0;'+
                                    'width:'+containerWidth+';'+
                                    'overflow:hidden;');

                var pager = '<table  border="0" cellpadding="0" cellspacing="0" '+
                                    'style="cursor:pointer;'+
                                    'width:100%;'+
                                    'height:3px;'+
                                    'position:'+
                                    'absolute;'+
                                    'bottom:0px;'+
                                    '"></tr>';
                                    
                var childrenCount = $(tag).children().length;
                for (j = 0; j < childrenCount; j++){
                    pager+='<td style="font-size:5px">&nbsp;</td>'
                }
                pager+='</tr></table>';

                var pagerEl = $(pager)
                // var pager = 


                var attrs = tag.attributes;
                var finalTag = document.createElement('div');
                for(i=0; i< attrs.length; i++){
                    finalTag.setAttribute(attrs[i].name, attrs[i].value);
                }
                $(finalTag).css({'width':'100%'})


                // finalTag.innerHTML = tag.innerHTML;
                $(finalTag).append( $(tag).children());



                var carousel = new Carousel({
                    el: finalTag,
                    pagerEl: pagerEl,
                    container: container
                });

                container.appendChild(finalTag);

                $(container).append(pagerEl);
                $(tag).replaceWith(container);

                return container;
            });


        }

    });
    return Carousel;
});