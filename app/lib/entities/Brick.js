var Base = require('../Base');

var Brick = Base.extend({
	position: {
		x: 0,
		y: 0
	},
	img: null,
	sprite: null,
	init: function(loader, x, y) {
		this.position.x = x;
		this.position.y = y;
		this.img = loader.getResult('brick');
		this.create();
	},
	create: function() {
		this.sprite = new createjs.Bitmap(this.img);
		this.sprite.scaleX = 1;
		this.sprite.scaleY = 1;
		this.sprite.x = this.position.x;
		this.sprite.y = this.position.y;
	},
	getDrawable: function() {
		return this.sprite;
	},
	tick: function(delta, ball) {
	}
});

module.exports = Brick;
