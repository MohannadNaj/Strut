define(['libs/backbone'],
function(Backbone) {
	return Backbone.View.extend({
		tagName: 'div',
		className: 'modal fade settings-modal',
		events: {
			'click #saveSettings': '_save',
			'change #useImgur':'_toggleImgur',
			'change #hideSlideWhileNavigating':'_toggleHideSlideWhileNavigating',
			'change #keepShownSubsteps':'_toggleKeepShownSubsteps',
			'change #useHint':'_toggleHint'
		},

		initialize: function() {
 			this._template = JST['strut.settings/Modal'];
		},

		_save: function() {

		},
		_toggleHideSlideWhileNavigating: function(event) {
			if($("#hideSlideWhileNavigating").is(':checked')) {
				this.model.trigger('hideSlideWhileNavigating:enable');
			} else {
				this.model.trigger('hideSlideWhileNavigating:disable');
			}
		},
		_toggleKeepShownSubsteps: function(event) {
			if($("#keepShownSubsteps").is(':checked')) {
				this.model.trigger('keepShownSubsteps:enable');
			} else {
				this.model.trigger('keepShownSubsteps:disable');
			}
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
			this.$el.html(this._template({useImgUr: this.model.loadedSettings.useImgUr, useHint: this.model.loadedSettings.useHint, hideSlideWhileNavigating: this.model.loadedSettings.hideSlideWhileNavigating, keepShownSubsteps: this.model.loadedSettings.keepShownSubsteps}));
			return this;
		}
	});
});