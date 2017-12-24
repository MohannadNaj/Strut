define(['tantaman/web/widgets/Button'],
	function(Button) {
		/**
		 * Allows to assign custom css classes to elements on slide.
		 *
		 * @param editorModel
		 * @constructor
		 */
		function SubstepEditor(editorModel) {
			this._button = new Button({
				icon: 'glyphicon glyphicon-fire',
				cb: this._launch.bind(this),
				name: 'Substep'
			});

			this._appended = false;

			this._button.$el.addClass('iconBtns btn-grouped');
			this._button.disable();

			this._deck = editorModel.deck();

			var activeSlide = this._deck.get('activeSlide');
			if (activeSlide) {
				this._activeSlideChanged(this._deck, activeSlide);
			}

			this._deck.on('change:activeSlide', this._activeSlideChanged, this);
		}

		SubstepEditor.prototype = {
			/**
			 * Returns SubstepEditor button to be placed in main menu.
			 *
			 * @returns {Button}
			 */
			view: function() {
				return this._button;
			},

			/**
			 * Reacts on an active slide change.
			 *
			 * @param {Deck} deck
			 * @param {Slide} slide
			 * @private
			 */
			_activeSlideChanged: function(deck, slide) {
				if (this._activeSlide) {
					this._activeSlide.off(null, null, this);
				}

				this._activeSlide = slide;
				if (this._activeSlide) {
					this._activeSlide.on('change:activeComponent', this._activeComponentsChanged, this);
					this._activeComponentsChanged(slide);
				}
			},

			/**
			 * Reacts on an active component change.
			 *
			 * @param {Slide} slide Parent slide of the component being changed.
			 * @private
			 */
			_activeComponentsChanged: function(slide) {
				this._activeComponents = this._activeSlide.selected;
				if (this._activeComponents.length) {
					this._button.enable();
				}
				else {
					this._button.disable();
				}
			},
			
			/**
			 * Menu button click callback.
			 *
			 * @private
			 */
			_launch: function() {
				this._activeComponents.forEach(function(component) {
					var customClasses = component.customClasses()

					if(! customClasses)
						customClasses = '';

					if(customClasses.indexOf('substep') == -1) {
						component.customClasses(customClasses + ' substep');
					} else {
						component.customClasses(customClasses.replace('substep',''));
					}
				});
			},

			/**
			 * Removes SubstepEditor from the editor.
			 */
			dispose: function() {
				if (this._activeSlide)
					this._activeSlide.off(null, null, this);
				this._deck.off(null, null, this);
			}
		};

		return SubstepEditor;
	});