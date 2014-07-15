define(['zepto', 'backbone', 'components/list'], function($, Backbone, List) {

	var list;
	var SearchBar = Backbone.View.extend({

		events: {},

		initialize: function() {
			this.render();
		},

		render: function() {
			var me = this;
			$(me.el).bind('touchend input', function(e) {
				window.scrollTo(0, 0);
				var inputVal = $(me.el).val();
				list.filterChildren(inputVal);
			});
			return this;
		}
	}, {
		compile: function(view) {
			console.log('searchbar compile');
			var el = view.el;
			var me = this;
			return _.map($(el).find(".searchbar"), function(tag) {
				var listname = $(tag).attr('data-listname');
				if (listname) {
					var lists = List.compile(el);
					for (var i = 0; i < lists.length; i++) {
						if (lists[i].id == listname) {
							list = lists[i];
						}
					}
					if(list){
						view.components[listname] = list;
					}else{
						list = view.components[listname];
					}
				}
				return new SearchBar({
					el: tag
				});

			});
		}
	});

	return SearchBar;
});