var BaseLevel = require('./BaseLevel');

var Level_1 = BaseLevel.extend({
	bricks: [],
	container: null,
	loader: null,
	init: function(loader) {
		this.loader = loader;
		this.create();
	},
	create: function() {
		this.container = new createjs.Container();
		max_bricks_width = 15;
		max_bricks_height = 10;
		brick_width = 32;
		brick_height = 16;
		for (var w = 0; w < max_bricks_width; w++) {
			for (var h = 0; h < max_bricks_height; h++) {
				var Brick = require('../entities/Brick');

				brick = new Brick(this.loader, w * brick_width, h * brick_height);
				this.container.addChild(brick.getDrawable());
				this.bricks.push(brick);
			}
		}
	},
	add: function(container) {
		container.addChild(this.container);
	},
	tick: function(delta, ball) {
		for (var i = 0; i < this.bricks.length; i++) {
			if (typeof(this.bricks[i]) == "undefined") continue;
			this.bricks[i].tick(delta);
			if (ndgmr.checkRectCollision(this.bricks[i].sprite, ball.sprite)) {
				this.container.removeChild(this.bricks[i].getDrawable());
				delete this.bricks[i];
				ball.collision('block', delta);
			}
		}
	}
});

module.exports = Level_1;
