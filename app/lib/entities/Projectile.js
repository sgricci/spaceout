var Base = require('../Base');

var Projectile = Base.extend({
	position: {
		x: 0,
		y: 0
	},
	speed: 400,
	sprite: null,
	init: function(loader, x, y) {
		var img = loader.getResult('projectile');
		this.position.x = x;
		this.position.y = y;
		this.sprite = new createjs.Bitmap(img);
		this.sprite.x = x;
		this.sprite.y = y;
	},
	getDrawable: function() {
		return this.sprite;
	},
	tick: function(delta) {
		this.sprite.y -= this.speed * delta;
		return true;
	}
});
module.exports = Projectile;
