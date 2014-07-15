/*
 * 
 * 
 */
define(['zepto','underscore','components/cache','components/loader'], function($,_,Cache,Loader){
	var Form = function(config) {
		this.config = {
		};
        this.config = _.extend(this.config, config);
		this.requestParams = {};
        this.jqObject = $("#" + config.id);
		this.parseConfig($("#" + config.id));
	};

	//获取组件配置参数
    Form.prototype.serialize = function() {
        if(this.jqObject) {
        	return $(this.jqObject).serialize();
        }
    };

	//获取组件配置参数
    Form.prototype.serializeArray = function() {
        if(this.jqObject) {
        	return $(this.jqObject).serializeArray();
        }
    };
	Form.prototype.setRequestParams = function(params) {
		this.requestParams = _.extend(this.requestParams, params);
		this.loadPage();
	};
	Form.prototype.loadPage = function(){
        var loader = new Loader({text:"查询中..."});
		var me = this;
		var _itemTemplateName = this.config['_itemTemplate'];
		
		$.ajax({
			block: true,
			url: me.config['url'],
			type: "GET",
			data: me.requestParams,
			dataType : "json",
			success: function(data, textStatus, jqXHR){
			    loader.hide();
				console.log('列表数据加载成功：' + textStatus + " response:[" + data + "]");
				var jsonRoot = data;
				_.each(me.config['jsonRoot'].split('.'), function(element){
					jsonRoot = jsonRoot[element];
				});

				var templateStr = $("#" + _itemTemplateName).html();
				$(document.getElementById(me.config['id'])).append(_.template(templateStr, jsonRoot));
		
			
			},
			error: function(e, xhr, type){
			    loader.hide();
				console.error('列表数据加载失败：' + e + "/" + type + "/" + xhr);
			}
		});
	};
	Form.prototype.parseConfig = function(element) {

		var me = this;

		var jqObject = $(element);
		this.config['id']			= jqObject.attr('id');
		this.config['itemTemplate']	= jqObject.attr('itemTemplate');
		this.config['url']			= jqObject.attr('url');
		this.config['jsonRoot']		= jqObject.attr('jsonRoot');

		// var cfg = {};
		// _.map(jqObject.get(0).attributes, function(attr){
		// 	cfg[attr.nodeName] = attr.nodeValue;
		// });

		// this.config = _.extend(this.config, cfg);

		jqObject.children().each(function(index, element){
			//find suitable handler
			var handler = me[element.tagName.toLowerCase() + 'TagHandler'];
			if (_.isFunction(handler)) {
				handler.apply(me, [element]);
			};
		});
	};
    return Form;
});