define(['libs/backbone'],
function(Backbone) {
	return Backbone.View.extend({
		tagName: 'div',
		className: 'modal fade settings-modal',
		events: {
			'click #saveSettings': '_save',
			'change #useImgur':'_toggleImgur',
			'change #useHint':'_toggleHint'
		},

		initialize: function() {
 			this._template = JST['strut.settings/Modal'];
		},

		_save: function() {

		},

		_toggleImgur: function(event) {
			if($("#useImgur").is(':checked')) {
				this.model.trigger('imgur:enable');
			} else {
				this.model.trigger('imgur:disable');
			}
		},
		_toggleHint: function(event) {
			this.model.trigger('useHint:' + ($("#useHint").is(':checked') ? 'enable' : 'disable'));
		},
		render: function() {
			this.$el.html(this._template({useImgUr: this.model.loadedSettings.useImgUr, useHint: this.model.loadedSettings.useHint}));
			return this;
		}
	});
});