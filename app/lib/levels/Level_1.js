var BaseLevel = require('./BaseLevel');

var Level_1 = BaseLevel.extend({
	create: function() {
		max_bricks_width = 9;
		max_bricks_height = 11;
		brick_width = 48;
		brick_height = 16;
		for (var w = 1; w < max_bricks_width; w++) {
			for (var h = 2; h < max_bricks_height; h++) {
				var Brick = require('../entities/Brick');

				brick = new Brick(this.loader, w * brick_width, h * brick_height, (h+2)%5);
				this.container.addChild(brick.getDrawable());
				this.bricks.push(brick);
			}
		}
	},
});

module.exports = Level_1;
