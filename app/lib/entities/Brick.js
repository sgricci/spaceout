var Base = require('../Base');

var Brick = Base.extend({
	position: {
		x: 0,
		y: 0
	},
	img: null,
	sprite: null,
	init: function(loader, x, y, color) {
		this.position.x = x;
		this.position.y = y;
		this.img = loader.getResult(this.get_color(color));
		this.create();
	},
	create: function() {
		this.sprite = new createjs.Bitmap(this.img);
		this.sprite.scaleX = 1;
		this.sprite.scaleY = 1;
		this.sprite.x = this.position.x;
		this.sprite.y = this.position.y;
	},
	get_color: function(sel) {
		switch(sel) {
			case 0:
				return 'brick_brown';
			case 1:
				return 'brick_yellow';
			case 2:
				return 'brick_grey';
			case 3:
				return 'brick_purple';
			case 4:
				return 'brick_red';
		}
	},
	getDrawable: function() {
		return this.sprite;
	},
	tick: function(delta, ball) {
	}
});

module.exports = Brick;
