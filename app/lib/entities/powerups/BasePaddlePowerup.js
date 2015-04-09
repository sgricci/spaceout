var BasePowerup = require('./BasePowerup');

var BasePaddlePowerup = BasePowerup.extend({
	img: null,
	position: {
		x: 0,
		y: 0
	},
	sprite: null,
	init: function(loader) {
		img = loader.getResult(this.img);
		this.sprite = new createjs.Bitmap(img);
		this.sprite.x = 0;
		this.sprite.y = 0;
		this.sprite.width = this.width;
		this.sprite.height = this.height;
	},
	getDrawable: function() {
		return this.sprite;
	},
	set: function(x, y) {
		this.position.x = x;
		this.position.y = y;
		this.sprite.x = x;
		this.sprite.y = y;
	},
	remove: function(container) {
		container.removeChild(this.sprite);
	},
	interact: function(delta, keymap, player) {
	},
	tick: function(delta) {
	}
});

module.exports = BasePaddlePowerup;
