define(['zepto', 'underscore', 'backbone', 'canvasloader', 'components/util', 'components/cache'], function($, _, Backbone, MyCanvasLoader, Util, Cache) {
	//['a','b','c']		'a'为载入脚本的定义名称  －－－   对应require.config里面的名字
	//function(a,b,c)		(a,b,c)为传入脚本作为对象时的名称  －－－ 对应回调时用的对象名

	var Base64Img = Backbone.View.extend({
		initialize: function() {
			this.render();
			// this.el = cl;
		},


		render: function() {
			var me = this;

			var imgWidth = $(me.el).attr('width') ? $(me.el).attr('width') : 30;
			var imgHeight = $(me.el).attr('height') ? $(me.el).attr('height') : 30;
			var src = $(me.el).attr('src');
			var imgOrgStyle = $(me.el).attr('style');
			var isShowLoader = ($(me.el).attr('isShowLoader') == 'true');


			var newDiv;
			var newElClass;


			if (!Cache.get('base64ImgClass')) {
				newElClass = 'base64Img' + Util.generateTimeStamp();
				Cache.put('base64ImgClass', newElClass.toString());
			} else {
				newElClass = Cache.get('base64ImgClass') + 1;
				Cache.put('base64ImgClass', newElClass.toString());
			}


			if (isShowLoader) {
				var newEl = document.createElement('div');
				newDiv = $(newEl);
				newDiv.attr({
					'style': 'margin:auto;width:' + imgWidth + 'px;height:' + imgHeight + 'px;',
					'class': newElClass.toString()
				});


				var cl = new CanvasLoader(newEl);
				cl.setColor('#cccccc'); // this value control the loader's color,default is '#000000'
				cl.setDiameter(
				(imgWidth < imgHeight) ? imgWidth : imgHeight); // loader's size,default is 40
				cl.setDensity(9); // default is 40
				cl.setSpeed(1); // default is 2
				cl.setFPS(27); // default is 24
				cl.show(); // Hidden by default

				// this.el = cl.cont;


				$(me.el).replaceWith(newDiv);

			} else {
				$(me.el).addClass(newElClass.toString());
			}


			// alert('tttt'+newElClass)
			// alert($('.'+newElClass).length)


			$.ajax({
				type: "GET",
				url: (src),
				dataType: "text",
				before: function() {

				},
				success: function(data, textStatus) {
					var newImg = $(document.createElement('img'));
					newImg.attr({
						'width': imgWidth,
						'height': imgHeight,
						'style': 'display:none',
						'src': ''
					});


					$(newImg).attr({
						'src': data,
						'style': imgOrgStyle
					});


					$('.' + newElClass).replaceWith(newImg);
					// $(me.el).replaceWith(newImg);



				},
				complete: function() {

				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("err");
				}
			});


			// return cl.cont;


		}
	}, {
		compile: function(contentEl) {
			var me = this;
			return _.map($(contentEl).find("base64"), function(tag) {
				var base64Img = new Base64Img({
					el: tag
				});
				return base64Img;
			});
		}
	});

	return Base64Img;

});