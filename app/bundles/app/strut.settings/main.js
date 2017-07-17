define(['./model/SettingsModel',
		'./view/SettingsButton',
		'./view/SettingsModal',
		'./SettingsSeeder',
		],
function(SettingsModel, SettingsButton, SettingsModal, SettingsSeeder) {
	return {
		initialize: function(registry) {

			var model = new SettingsModel(registry);
			var seed = SettingsSeeder.useRegistry(registry).init();

			this._settingsButton = new SettingsButton({model: model});
			this._settingsModal = new SettingsModal({model: model});

			this.render();

			registry.register('strut.settings',
				{model: model});
		},

		render: function() {

			var _this = this;

			$(document).ready(function(){
				var $modeButtons = $('.mode-buttons');
				
				$modeButtons.before(_this._settingsButton.render().el);

				var $modals = $('#modals');

				$modals.append(_this._settingsModal.render().el)
			});
		}
	};
});
