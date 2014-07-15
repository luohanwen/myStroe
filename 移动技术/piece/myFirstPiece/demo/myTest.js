define(['text!demo/myTest.html'],
	function(viewTemplate) {
		return Piece.View.extend({
			id: 'demo_myTest',
			render: function() {
				$(this.el).html(viewTemplate);

				Piece.View.prototype.render.call(this);
				return this;
			},
			onShow: function() {
				//write your business logic here :)
			}
		}); //view define

	});