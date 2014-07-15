define(['zepto', 'backbone', 'iScroll'], function($, Backbone, iScroll) {

	var ModulePanel = Backbone.View.extend({

		initialize: function(args) {

		},

		render: function(arguments) {
			this.loadRelatedModuleInfo(arguments);
		},

		loadRelatedModuleInfo: function(moduleJson) {
			if ($('.cube-panel').length > 0) {
				console.info('移除侧边栏');
				$('.cube-panel').remove();
				$('.cube-panel-masker').remove();
			}
			console.info('重新加载侧边栏');
			var me = this;
			var CubeModuleJson = JSON.parse(moduleJson);
			var ModuleArray = [];
			var count = 0;
			var end = CubeModuleJson.relatesTo.length;
			//遍历关联的模块，找出模块名
			_.each(CubeModuleJson.relatesTo, function(pack) {
				//使用requirejs加载module.json文件
				require(["text!" + pack + "/CubeModule.json"], function(RelatedModule) {
					if (RelatedModule) {
						ModuleArray.push({
							name: JSON.parse(RelatedModule).name,
							pack: pack,
							moduleUrl: "../" + pack + "/index.html?cube-action=push",
							iconUrl: "../" + pack + "/icon.png"
						});
					}
					count++;
					if (count == end) {
						me.loadModuleCallBack(ModuleArray);
					}
				});

			});
		},


		loadModuleCallBack: function(moduleArray) {
			var PanelTemplate = '<div id="panel-menu" style="margin-top: 44px;">' + '<div id="panel-scroller" style="height: 100%;">' + '<div>' + '<% _.each(ModuleList, function(item) { %>' + '<a href="#" hrefUrl="<%= item.moduleUrl %>" class="toOther" name="<%= item.pack %>">' + '<div class="panel-item-content">' + '<img src="<%=item.iconUrl%>">' + '<div class="panel-btn-text"><%= item.name %></div>' + '</div>' + '</a>' + '<% }); %>' + '</div>' + '</div>' + '</div>';

			var content = _.template(PanelTemplate, {
				ModuleList: moduleArray
			});

			//渲染panel
			this.createPanel(content);
		},

		createPanel: function(arguments) {
			var me = this;
			var panel_el = arguments;
			if ($('body').find('.cube-panel').length < 1) {
				$('body').append(panel_el);
				var panel_id = $(panel_el).attr('id');
				$("#" + panel_id).addClass("cube-panel");
				var panelMasker = "<div class='cube-panel-masker'></div>";
				$('body').append(panelMasker);


				$('.cube-panel-masker').click(function() {
					me.hide();
				});

				$("#" + panel_id + " a").click(function() {
					me.PanelItemClick($(this));
				});

				//iscroll试侧边栏可以滚动
				var panelIscroll = new iScroll("panel-scroller");
			};
		},

		PanelItemClick: function(selectItem) {
			window.location.href = selectItem.attr('hrefUrl');
			console.info(selectItem);
			this.hide();
			//console.info("====" + selectItem.html());
		},

		show: function() {
			if ($('.cube-panel-masker').css("display") == "block") {
				this.hide();
				return;
			}
			$(".cube-panel").removeClass("cube-panel-position-hide");
			$(".cube-panel").addClass("cube-panel-position-show");
			$('.cube-panel-masker').css("display", "block");
			$('.cube-panel-masker').removeClass("cube-panel-position-hide");
			$('.cube-panel-masker').addClass("cube-panel-position-show");
		},

		hide: function() {
			$(".cube-panel").removeClass("cube-panel-position-show");
			$(".cube-panel").addClass("cube-panel-position-hide");
			$('.cube-panel-masker').css("display", "none");
			$('.cube-panel-masker').removeClass("cube-panel-position-show");
			$('.cube-panel-masker').addClass("cube-panel-position-hide");
		}

	}, {
		render: function(arguments) {
			ModulePanel.instance.render(arguments);
		},
		show: function() {
			ModulePanel.instance.show();
		},
		hide: function() {
			ModulePanel.instance.hide();
		}
	});

	ModulePanel.instance = new ModulePanel();

	return ModulePanel;

});