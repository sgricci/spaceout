var Base = require('../Base');

var Ball = Base.extend({
	position: {
		x: 0,
		y: 0
	},
	speed  : {
		x: 160,
		y: 200
	},
	radius : 10,
	shape  : null,
	img: null,
	sprite: null,
	init: function(loader, x, y) {
		this.img = loader.getResult('ball');
		this.position.x = x;
		this.position.y = y;
		this.create();
	},
	create: function() {
		this.shape = new createjs.Shape();
		this.sprite = new createjs.Bitmap(this.img);
		this.sprite.scaleX = 2;
		this.sprite.scaleY = 2;
		this.sprite.x = this.position.x;
		this.sprite.y = this.position.y;
	},
	move: function(delta) {
		this.position.x -= this.speed.x * delta;
		this.position.y -= this.speed.y * delta;
		this.check_bounds();
		this.sprite.x = this.position.x;
		this.sprite.y = this.position.y;
	},
	getBoundingBox: function() {
		return {
			x: this.position.x-(this.radius/2),
			y: this.position.y-(this.radius/2),
			w: this.radius,
			h: this.radius
		};
	},
	getDrawable: function() {
		return this.sprite;
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
	collision: function(collision_type, delta) {
		switch(collision_type) {
			case 'block':
				this.speed.x *= -1;
				this.speed.y *= -1;
				break;
			case 'left':
			case 'right':
				this.speed.x *= 1.05;
				this.speed.y *= 1.05;
				this.speed.y *= -1;
				this.speed.x *= -1;
				orig_x = this.speed.x;
				this.speed.x = this.speed.y;
				this.speed.y = Math.abs(orig_x);
				break;
			default:
				this.speed.x *= 0.9;
				this.speed.y *= -1.1;
		}
		this.move(delta);
	},
	tick: function(delta) {
		this.move(delta);
	}
});

module.exports = Ball;
