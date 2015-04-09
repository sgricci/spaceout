var Base = require('../Base');
var Collectibles = require('../entities/collectibles/Collectibles');

var CollectibleCollection = Base.extend({
	collectibles: [],
	loader: null,
	init: function(loader, container) {
		this.loader = loader;
		this.container = container;
	},
	spawnPowerup: function(x, y) {
		var random = Math.floor(Math.random()*(Collectibles.length/2));
		this.collectibles.push(new Collectibles[random](this.loader, (x-(24/2)), y, this.container));
	},
	tick: function(delta) {
		for(var i = 0; i < this.collectibles.length; i++) {
			var res = this.collectibles[i].tick(delta);
			if (res === false) {
				this.collectibles.splice(i, 1);
			}
		}
	},
	collision_check: function(player) {
		for(var i = 0; i < this.collectibles.length; i++) {
			var res = this.collectibles[i].collides(player);
			if (res !== false) {
				this.collectibles[i].remove(this.container);
				this.collectibles.splice(i, 1);
				return res;
			}
		}
		return false;
	},
	reset: function() {
		for(var i = 0; i < this.collectibles.length; i++) {
			this.collectibles[i].remove(this.container);
		}
		this.collectibles = [];
	}
});

module.exports = CollectibleCollection;
