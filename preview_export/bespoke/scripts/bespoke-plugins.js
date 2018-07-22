/*!
 * bespoke-hash v0.1.2
 *
 * Copyright 2013, Mark Dalgleish
 * This content is released under the MIT license
 * http://mit-license.org/markdalgleish
 */

(function(bespoke) {

	bespoke.plugins.hash = function(deck) {
		var activeIndex,

			parseHash = function() {
				var hash = window.location.hash.slice(1),
					slideNumberOrName = parseInt(hash, 10);

				if (hash) {
					if (slideNumberOrName) {
						activateSlide(slideNumberOrName - 1);
					} else {
						deck.slides.forEach(function(slide, i) {
							slide.getAttribute('data-bespoke-hash') === hash && activateSlide(i);
						});
					}
				}
			},

			activateSlide = function(index) {
				if (index !== activeIndex) {
					deck.slide(index);
				}
			};

		setTimeout(function() {
			parseHash();

			deck.on('activate', function(e) {
				var slideName = e.slide.getAttribute('data-bespoke-hash');
				window.location.hash = slideName || e.index + 1;
				activeIndex = e.index;
			});

			window.addEventListener('hashchange', parseHash);
		}, 0);
	};

}(bespoke));

/*!
 * bespoke-state v0.2.2
 *
 * Copyright 2013, Mark Dalgleish
 * This content is released under the MIT license
 * http://mit-license.org/markdalgleish
 */

(function(bespoke) {

	bespoke.plugins.state = function(deck) {
		var modifyState = function(method, event) {
			var attr = event.slide.getAttribute('data-bespoke-state');

			if (attr) {
				attr.split(' ').forEach(function(state) {
					state && deck.parent.classList[method](state);
				});
			}
		};

		deck.on('activate', modifyState.bind(null, 'add'));
		deck.on('deactivate', modifyState.bind(null, 'remove'));
	};

}(bespoke));

(function(bespoke) {

	bespoke.plugins.bullet = function(deck) {
    var activeSlideIndex,
      activeBulletIndex,

      bullets = deck.slides.map(function(slide) {
        return [].slice.call(slide.querySelectorAll((typeof options === 'string' ? options : '[data-bespoke-bullet]')), 0);
      }),

      next = function() {
        var nextSlideIndex = activeSlideIndex + 1;

        if (activeSlideHasBulletByOffset(1)) {
          activateBullet(activeSlideIndex, activeBulletIndex + 1);
          return false;
        } else if (bullets[nextSlideIndex]) {
          activateBullet(nextSlideIndex, 0);
        }
      },

      prev = function() {
        var prevSlideIndex = activeSlideIndex - 1;

        if (activeSlideHasBulletByOffset(-1)) {
          activateBullet(activeSlideIndex, activeBulletIndex - 1);
          return false;
        } else if (bullets[prevSlideIndex]) {
          activateBullet(prevSlideIndex, bullets[prevSlideIndex].length - 1);
        }
      },

      activateBullet = function(slideIndex, bulletIndex) {
        activeSlideIndex = slideIndex;
        activeBulletIndex = bulletIndex;

        bullets.forEach(function(slide, s) {
          slide.forEach(function(bullet, b) {
            bullet.classList.add('bespoke-bullet');

            if (s < slideIndex || s === slideIndex && b <= bulletIndex) {
              bullet.classList.add('bespoke-bullet-active');
              bullet.classList.remove('bespoke-bullet-inactive');
            } else {
              bullet.classList.add('bespoke-bullet-inactive');
              bullet.classList.remove('bespoke-bullet-active');
            }

            if (s === slideIndex && b === bulletIndex) {
              bullet.classList.add('bespoke-bullet-current');
            } else {
              bullet.classList.remove('bespoke-bullet-current');
            }
          });
        });
      },

      activeSlideHasBulletByOffset = function(offset) {
        return bullets[activeSlideIndex][activeBulletIndex + offset] !== undefined;
      };

    deck.on('next', next);
    deck.on('prev', prev);

    deck.on('slide', function(e) {
      activateBullet(e.index, 0);
    });

    activateBullet(0, 0);
  };

}(bespoke));

