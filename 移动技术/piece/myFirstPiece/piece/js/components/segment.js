define(['zepto', 'backbone'], function($, Backbone){

	var Segment = Backbone.View.extend({

		events: {
			'click li': 'onClick'
		},

		initialize: function() {
			console.log('cube---segment---segment init');
			var name = $(this.el).attr('name');
			if(name&&!document.getElementById('seginput-' + this.el.id)){
				var input = $('<input/>');
				input.attr('id', 'seginput-' + this.el.id);
				input.attr('name', name);
				var value = $('#'+this.el.id+' li').attr('data-value');
				input.val(value);
				input.appendTo(this.el);
				input.hide();
			}
			console.log('cube---segment---segment:' + this.el);
		},

		render: function(){
			return this;
		},

		onClick: function(e){
			console.log('cube---segment---segment click');
			var active = this.el.querySelector('.active');
			if (active) {
				$(active).removeClass('active');
			}
			$(e.currentTarget).addClass('active');
			this.$("#seginput-"+this.el.id).val($(e.currentTarget).attr('data-value'));

			this.trigger('Segment:change', this);

			e.preventDefault();
			console.log('cube---segment---segment click end');
		},

		getActiveItem: function(){
			return this.el.querySelector('.active');
		},

		getValue: function(){
			var active = this.getActiveItem();
			if (active) {
				return active.getAttribute('data-value');
			} else {
				return null;
			}
		},

		triggerChange: function(){
			this.trigger('Segment:change', this);
		}

	}, {
		compile: function(el){
			console.log('cube---segment---segment compile');
			var me = this;
			return _.map($(el).find(".segmented-controller"), function(tag){
				return new Segment({el: tag});
			});
		}
	});

	return Segment;
});