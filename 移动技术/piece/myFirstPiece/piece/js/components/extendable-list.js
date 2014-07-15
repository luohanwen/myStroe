/*
 * 列表组件，最终转换出html5
 * <div id="passenger-list">
 *  <div class="contentScroller">
 *  </div>
 * </div>
 *
 */
define(['zepto', 'underscore', 'components/loader', 'components/cache', 'iScroll', 'backbone', 'components/list'], function($, _, Loader, Cache, iScroll, Backbone, List) {

    var elContext;
    var ExtendableList = List.extend({

        tagName: 'div',

        events: {
            // "": "reload"
            "click .cube-list-item": "onItemSelect"
        },

        requestParams: {},

        config: {
            /*提取到父类*/
            observers: [],
            /*自有*/
            autoLoad: "true",
            pageParam: 'page',
            pageSizeParam: 'pageSize',
            page: 1,
            pageSize: 10,
            pullDownEnable: false,
            pagingEnable: true,
            iScroll: false,
            method: 'GET',
            extendable: false,
            extendRoot: "",
            filterStr: null
        },

        request: null,

        onItemSelect: function(e) {
            var me = this;
            var target = e.currentTarget;


            var data = null;

            var index = target.getAttribute('index');
            var CACHE_ID = 'cube-list-' + this.config['id'];
            if (Cache.get(CACHE_ID)) {
                var olddata = Cache.get(CACHE_ID);
                var data = olddata[index];
                if (me.config.extendRoot) {
                    _.each(me.config['extendRoot'].split('.'), function(element) {
                        data = data[element];
                    });
                }
            }

            var extendLi = this.$('.cube-extend-view')[index];
            if ($(extendLi).css('display') == 'none') {
                $.each(this.$('.extended'), function() {
                    $(this).removeClass('extended');
                    $(this).hide();
                })
                $(extendLi).addClass('extended');
                $(extendLi).show();
            } else {
                $(extendLi).removeClass('extended');
                $(extendLi).hide();
            }
            console.log('on extend:' + index);
            if (this.iScroll)
                this.iScroll.refresh();
            this.trigger("ExtendableList:extend", this, data, index);



        },

        loadListByJSONArray: function(jsonArray) {
            var me = this;
            //加载搜索栏
            me.clearList();

            //把数组数据存起来
            var cache_data = jsonArray;
            var CACHE_ID = 'cube-list-' + me.config['id'];
            //修改一个bug 当page大于1时才append数据 否则不append
            if (Cache.get(CACHE_ID) && me.config['page'] > 1) {
                var olddata = Cache.get(CACHE_ID);
                cache_data = olddata.concat(jsonArray);
            }

            Cache.put(CACHE_ID, cache_data);

            var _itemTemplateName = this.config['_itemTemplate'];
            var _extendableTemplate = this.config._extendableTemplate;
            var moreItemElementName = this.config['moreItemElement'];
            var paging = this.config['paging'];
            var templateStr;
            if (_itemTemplateName) templateStr = $("#" + _itemTemplateName).html();
            if (_extendableTemplate) extendTemplateStr = $("#" + _extendableTemplate).html();

            for (var i = 0; i < jsonArray.length; i++) {
                var item = jsonArray[i];
                item.index = i;
                var li = $("<li/>");
                li.addClass('cube-list-item');
                var extendLi = $("<li/>");
                extendLi.addClass('cube-extend-view');
                li.attr('index', (me.config['page'] - 1) * me.config['pageSize'] + i);

                if (_itemTemplateName) li.append(_.template(templateStr, item));

                var extendArray = item;
                if (me.config.extendRoot) {
                    _.each(me.config['extendRoot'].split('.'), function(element) {
                        extendArray = extendArray[element];
                    });
                }

                for (var j = 0; j < extendArray.length; j++) {
                    if (_extendableTemplate) extendLi.append(_.template(extendTemplateStr, extendArray[j]));
                }
                //TODO: 需要重构
                var container = $(elContext.querySelector('#' + me.id)).find('.contentScroller').find('.item-content')
                li.appendTo(container);
                extendLi.appendTo(container);
                extendLi.css("display", "none");
            }
            if (this.$("#" + me.config['id'] + '-more')) {
                this.$('#' + me.config['id'] + '-more').remove();
            }
            //加载更多按钮
            if (paging == 'true' && me.config['pageSize'] == jsonArray.length) {
                //加上一个加载更多的cell
                var moreLi = $("<li/>");
                moreLi.addClass('cube-list-item-more');
                moreLi.attr('id', (me.config['id'] + '-more'));
                //TODO: 需要重构
                moreLi.appendTo($(elContext.querySelector('#' + me.id)).find('.contentScroller'));
                if (moreItemElementName != null) {
                    this.$("#" + moreItemElementName).template(moreItemElementName);
                    moreLi.append($.tmpl(moreItemElementName, null));
                } else {
                    var defalutMoreItemDiv = $("<div>更多...</div>");
                    moreLi.append(defalutMoreItemDiv);
                }
                moreLi.click(function() {
                    me.loadNextPage();
                });
            }
            me.trigger("drawed", me, jsonArray);
            if (me.config.iScroll != 'false') {
                me.iScroll.refresh();
            }
        },

        loadNextPage: function() {
            console.log('extendablelist:load  begin');
            var me = this;

            me.requestParams[me.config.pageParam] = this.config['page'];
            me.requestParams['pageSize'] = this.config['pageSize'];
            var _itemTemplateName = this.config['_itemTemplate'];
            var _extendableTemplate = this.config._extendableTemplate;
            if (!me.config['url']) return;
            var loader = new Loader({
                text: "查询中..."
            });

            $.ajax({
                block: true,
                timeout: 20 * 1000,
                traditional: true,
                url: me.config['url'],
                type: me.config['method'],
                data: me.requestParams,
                dataType: "json",
                beforeSend: function(xhr, settings) {
                    console.log('extendablelist component request data...');
                    if (me.request) {
                        me.request.abort();
                    }
                    me.request = xhr;
                },
                complete: function() {
                    me.request = null;
                },
                success: function(data, textStatus, jqXHR) {

                    console.log('列表数据加载成功：' + textStatus + " response:[" + data + "]");
                    me.trigger("load", me, data);

                    var jsonRoot = data;

                    if (me.config.jsonRoot) {
                        _.each(me.config['jsonRoot'].split('.'), function(element) {
                            jsonRoot = jsonRoot[element];
                        });
                    };

                    //编译一下
                    var templateStr;


                    //append
                    console.log(jsonRoot.length + ' records in total');

                    me.loadListByJSONArray(jsonRoot);


                    //iScrollObj
                    if (me.config.iScroll != 'false') {
                        me.iScroll.refresh();
                    }


                    if (me.config['filterStr']) {
                        me.filterChildren(me.config['filterStr'])
                    }
                    //update current number
                    me.config.page = me.config.page + 1;
                    me.trigger("loaded", me, data);
                    loader.hide();
                    console.log('extendablelist:load and draw  end');

                },
                error: function(e, xhr, type) {
                    console.error('列表数据加载失败：' + e + "/" + type + "/" + xhr);
                    loader.hide();
                }
            });
        }

    }, {

        compile: function(view) {
            var me = this;
            return _.map($(view).find("extendablelist"), function(tag) {
                console.log('extendablelist:compile  begin');
                var config = me.parseConfig(tag, ['id', 'itemTemplate', '_itemTemplate', 'moreItemElement', 'url', 'method', 'jsonRoot', 'class', 'paging', 'iScroll', 'autoLoad', 'pageParam', 'searching', 'searchkeys', 'filterStr', 'pageSize', '_extendableTemplate', 'extendRoot', 'skin']);

                //build html
                //<div id="{id}">
                //  <div class="contentScroller">
                //    <div class="content">
                //    </div>
                //  </div>
                //</div>
                var list_el = document.createElement('div');
                list_el.setAttribute('id', config.id);
                list_el.setAttribute('data-component', 'extendablelist');
                if (config.skin) {
                    list_el.setAttribute('class', 'cube-list-' + config.skin);
                } else {
                    list_el.setAttribute('class', 'cube-list-nostyle');
                }
                this.$(list_el).css('height', '100%');
                //整体滚动容器
                var scroller_el = document.createElement('ul');
                this.$(scroller_el).addClass('contentScroller');
                list_el.appendChild(scroller_el);

                //item容器（方便在header和footer之间找到正确位置插入数据行）
                var content_el = document.createElement('div');
                this.$(content_el).addClass('item-content');
                scroller_el.appendChild(content_el);

                //replace with html
                this.$(tag).replaceWith(list_el);

                config['el'] = list_el;
                elContext = view;
                var extendablelist = new ExtendableList(config);
                console.log('extendablelist:compile  end');

                //处理三星s4 点击事件触发两次  
                Cache.put(config.id + 'Onload', 0);

                function listSizeFix() {
                    var bodyHeight = $(window).height();
                    var currentTop = $(list_el).offset().top;
                    var finalHeight = bodyHeight - currentTop;

                    if (config.height) {
                        finalHeight = config.height;
                    }

                    if (config.additionHeight) {
                        finalHeight = finalHeight + parseInt(config.additionHeight);
                    }

                    $('html').css({
                        'min-height': currentTop
                    })
                    $('body').find(list_el).css({
                        'height': ((finalHeight) + 'px')
                    })

                    $('.cube-list-item-more-record').css({
                        'border-bottom': '0px'
                    });

                }
                var timer = setInterval(function() {
                    if ($('body').find(list_el).length > 0) {
                        //do something
                        listSizeFix();
                    }


                    var onloadCounter = parseInt(Cache.get(config.id + 'Onload')) + 1;
                    if (onloadCounter == 1) {
                        $(window).on('resize', listSizeFix);
                        $(list_el).unload(function() {
                            $(window).off('resize', listSizeFix);
                        })

                    }
                    if (onloadCounter > 1 && $('body').find(list_el).length == 0) {
                        clearInterval(timer);
                        console.log('enddddd');
                    } else {
                        Cache.put(config.id + 'Onload', onloadCounter);
                    }
                }, 500);
                return extendablelist;
            });
        }
    });

    return ExtendableList;
});