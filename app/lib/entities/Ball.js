var Base = require('../Base');

var Ball = Base.extend({
	position: {
		x: 0,
		y: 0
	},
	speed  : {
		x: 4,
		y: 5
	},
	radius : 10,
	shape  : null,
	init: function(x, y) {
		this.position.x = x;
		this.position.y = y;
		this.create();
	},
	create: function() {
		this.shape = new createjs.Shape();
	},
	move: function() {
		this.position.x -= this.speed.x;
		this.position.y -= this.speed.y;
		this.check_bounds();
	},
	getBoundingBox: function() {
		return {
			x: this.position.x-(this.radius/2),
			y: this.position.y-(this.radius/2),
			w: this.radius,
			h: this.radius
		};
	},
	check_bounds: function() {
		if (this.position.x < 0) {
			this.position.x = 0;
			this.speed.x *= -1;
		}
		if (this.position.x > 470) {
			this.position.x = 470;
			this.speed.x *= -1;
		}
		if (this.position.y < 0) {
			this.position.y = 0;
			this.speed.y *= -1;
		}

		if (this.position.y > 640) {
			this.speed.y = 0;
			this.speed.x = 0;
		}
	},
	collision: function() {
		this.speed.y *= -1;
	},
	tick: function() {
		this.move();
		this.shape.graphics.clear();
		this.shape.graphics.beginFill('#00f');
		this.shape.graphics.drawCircle(this.position.x, this.position.y,
				this.radius);
	}

});

module.exports = Ball;
