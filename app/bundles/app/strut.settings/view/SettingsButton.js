define(['libs/backbone'],
function(Backbone) {
	return Backbone.View.extend({
		tagName: 'li',
		className: 'iconBtns',
		events: {
			'click': '_click'
		},

		initialize: function() {
 			this._template = JST['strut.settings/Button'];
		},

		_click: function() {
			$(".settings-modal").modal('show');
		},

		render: function() {
			this.$el.html(this._template());
			return this;
		}
	});
});