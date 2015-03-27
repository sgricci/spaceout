var Base = require('../Base');

var Player = Base.extend({
	position: {
		x: 0,
		y: 0
	},
	width: 0,
	height: 0,
	shape: null,
	speed: 4,
	init: function(x, y, w, h) {
		this.position.x = x;
		this.position.y = y;
		this.width  = w;
		this.height = h;
		this.create();
	},
	create: function() {
		this.shape = new createjs.Shape();
	},
	move: function(keymap) {
		if (keymap[37]) { this.moveLeft(); }
		if (keymap[39]) { this.moveRight(); }
	},
	moveLeft: function() {
		this.position.x -= this.speed;
	},
	moveRight: function() {
		this.position.x += this.speed;
	},
	tick: function(keymap, ball) {
		this.move(keymap);
		var res = this.collides(ball);
		if (res) {
			ball.collision();
		}
		this.shape.graphics.clear();
		this.shape.graphics.beginFill("#fff");
		this.shape.graphics.drawRect(this.position.x, this.position.y,
				this.height, this.width);
	},
});

module.exports = Player;
