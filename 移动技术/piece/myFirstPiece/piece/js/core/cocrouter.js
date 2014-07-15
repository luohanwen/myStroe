define(['require', 'underscore', 'backbone', 'core/mainview', 'components/loader', 'components/util'],
	function(require, _, Backbone, MainView, Loader, Util) {
		//a CoC router
		var CoCRouter = Backbone.Router.extend({

			//load mode: app, module, view
			loadMode: 'view',
			urls: [],
			//排前面优先？
			routes: {
				//eg: index.html
				'': 'index',
				//eg: index.html#com.foss.demo/listView
				//eg: index.html#com.foss.demo/listView?t=push
				"*module/*page(?*param)": "modularRoute",
				//eg: index.html#listView
				"*page(?t=:param)": "pageRoute"
			},

			initialize: function(options) {
				var me = this;
				// window.onpopstate = function(e) {
				// 	if (e.state !== null) {
				// 		console.info(e);
				// 		console.info('history.back()');
				// 		console.info(window.location.href);
				// 		console.info(me.urls);
				// 		var u = me.urls[me.urls.length - 2];
				// 		console.info('=======' + u);
				// 		Backbone.history.navigate(u, {
				// 			trigger: true,
				// 			replace: true
				// 		});
				// 	}

				// };
				if (options) {
					this.delegate = options.delegate;
					this.loadMode = pieceConfig.loadMode;
					this.defaultModule = pieceConfig.defaultModule;
					this.defaultView = pieceConfig.defaultView;
					this.enablePad = pieceConfig.enablePad;
				}
			},

			index: function() {
				this.modularRoute(this.defaultModule, this.defaultView);
			},

			_loadViewByApp: function(module, view, success, fail) {
				require([module + '/' + view], function(ViewClass) {
					var v = new ViewClass();
					v.module = module;
					success(v);
				}, function(err) {
					fail(err);
				});

			},

			_loadViewByModule: function(module, moduleName, view, success, fail) {
				require([module + "/" + moduleName], function(Module) {
					var ViewClass;
					if (view === null || view === '') {
						ViewClass = Module['default'];
					} else {
						ViewClass = Module[view];
					}

					var v = new ViewClass();
					v.module = module;

					success(v);

				}, function(err) {
					fail(err);
				});
			},


			_loadViewByView: function(module, view, success, fail) {
				require([module + '/' + view], function(ViewClass) {
					var v = new ViewClass();
					v.module = module;
					success(v);
				}, function(err) {
					fail(err);
				});
			},

			modularRoute: function(module, view, param) {

				console.info("cube---cocrouter---modularRoute--" + module + '/' + view + '/' + param);

				var me = this;

				var require_path = module + '/' + (view === null ? '' : view);

				var url_path;

				var loader;
				var viewLoaded;
				var moduleName;

				//判断是否存在

				// if (!param) {
				// 	url_path = require_path + '?t=' + Util.generateparam();
				// 	//如果时间戳为空、可被表示为新开页面，为url加上param，存入栈，并且push
				// 	Backbone.history.navigate(url_path, {
				// 		trigger: false,
				// 		replace: true
				// 	});
				// 	console.log('mr2:' + window.location.href);

				// 	var loader;
				// 	var viewLoaded = require.defined(module + "/module");

				// 	if (!viewLoaded) {
				// 		//TODO: show loading
				// 		loader = new Loader({
				// 			text: '加载中...'
				// 		});
				// 	}

				// } else {
				// 	url_path = require_path + '?t=' + param;
				// 	//如果访问过，则进行
				// 	var url_index = _.indexOf(this.urls, url_path);
				// 	if (url_index > -1) {
				// 		this.urls.pop(url_path);
				// 		me.delegate.pop();
				// 		console.log(me.urls);
				// 		return;
				// 	}
				// 	console.info(url_index);
				// 	console.info(this.urls);
				// }

				// //添加进栈
				// this.urls.push(url_path);


				function success(viewInstance) {
					//如果是第一个，则是直接跳转，不需要push
					// if (me.urls.length > 1) {
					// 	me.delegate.push(viewInstance);
					// } else {
					// 	me.delegate.changePage(viewInstance, module);
					// }

					if (viewInstance.type == 'portal') {
						viewInstance.render();
						if ('onShow' in viewInstance) viewInstance.onShow();
					} else {
						//只是采用changePage
						me.delegate.changePage(viewInstance, module);
					}


					if (loader !== undefined) {
						loader.hide();
					}
					// console.info(me.urls);
				}

				function fail(err) {
					if (loader !== undefined) {
						loader.hide();
					}
					// var failedId = err.requireModules && err.requireModules[0];
					console.log("cube---cocrouter---load fail: " + err.message);
				}

				switch (this.loadMode) {
					case 'app':
						throw new Error('app scope router not implement yet');
					case 'module':
						console.info("cube---cocrouter---load by module");
						//判断是否开启pad页面
						if (this.enablePad === "true") {
							console.info("cube---cocrouter---enablePad === true");
							//判断浏览器，如果是平板，则加载平板模块文件
							if (Util.browser.versions.apad || Util.browser.versions.iPad) {
								viewLoaded = require.defined(module + "/modulePad");
								moduleName = "modulePad";
							} else {
								viewLoaded = require.defined(module + "/module");
								moduleName = "module";
							}
						} else {
							viewLoaded = require.defined(module + "/module");
							moduleName = "module";

							if (!viewLoaded) {
								//TODO: show loading
								loader = new Loader({
									text: '加载中...'
								});
							}
						}


						this._loadViewByModule(module, moduleName, view, success, fail);
						break;
					case 'view':
						console.info("cube---cocrouter---load by view");
						var viewLoaded = require.defined(module + "/" + view);
						if (!viewLoaded) {
							loader = new Loader({
								text: '加载中...'
							});
						}

						this._loadViewByView(module, view, success, fail);
						break;
					default:
						throw new Error('missing loadMode');
				}
			},

			pageRoute: function(page, param) {
				console.log('page route to:' + page);
			}

		});

		return CoCRouter;
	});