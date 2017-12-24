define({
	'key': 'strut.settings',
	'data': {
		'useImgUr': false,
		'useHint': false,
		'keepShownSubsteps': false,
		'hideSlideWhileNavigating': false
	},
	loadedSettings : null,

	init: function() {
		this.initialSeed();
		this.mapToDefaults();
	},

	initialSeed: function() {
		this.loadSettings();

		if(this.loadedSettings == null)
		{
			this.seed(this.data);
		}
	},

	loadSettings: function() {
		var _loadedSettings = null;
		this.storage.load(this.key, function(res) {
			_loadedSettings = res;
		});
		this.loadedSettings = _loadedSettings;
	},

	mapToDefaults: function() {
		var _this = this;

		if(this.loadedSettings == null)
			this.loadedSettings = {};

		_.each(this.data, function(item, key) {
			var loadedSettingValue = _this.get(key);

			if(loadedSettingValue == null)
			{
				_this.loadedSettings[key] = item;
				_this.seed(_this.loadedSettings);
			}
		});
	},

	get: function(key) {
		return typeof this.loadedSettings[key] == "undefined" ? null : this.loadedSettings[key];
	},

	seed: function(data) {
		this.storage.store(this.key, data);
	},

	useRegistry: function (registry) {
		this.registry = registry;
		this.storage = this.registry.getBest("strut.StorageInterface");
		return this;
	}
});