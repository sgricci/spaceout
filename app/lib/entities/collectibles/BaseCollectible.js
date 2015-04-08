var Base = require('../../Base');

var BaseCollectible = Base.extend({
	img: null,
	powerup: null,
	width: 24,
	height: 16,
	position: {
		x: 0,
		y: 0
	},
	speed: 100,
	init: function(loader, x, y, container) {
		this.position.x = x;
		this.position.y = y;

		img = loader.getResult(this.img);
		this.sprite = new createjs.Bitmap(img);
		this.sprite.x = parseInt(x,10);
		this.sprite.y = parseInt(y,10);
		this.sprite.width = this.width;
		this.sprite.height = this.height;
		container.addChild(this.sprite);
	},
	tick: function(delta) {
		this.sprite.y += (this.speed * delta);
		if (this.sprite.y > 640) {
			return false;
		}
		return true;
	},
	collides: function(player) {
		var intersection = ndgmr.checkRectCollision(player.getDrawable(),this.sprite); 
		if (intersection) {
			return this.powerup
		}
		return false;
	},
	remove: function(container) {
		container.removeChild(this.sprite);
	}
});

module.exports = BaseCollectible;
