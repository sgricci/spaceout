var BaseLevel = require('./BaseLevel');

var Level_4 = BaseLevel.extend({
	create: function() {
		max_bricks_width = 10;
		max_bricks_height = 20;
		brick_width = 48;
		brick_height = 16;
		for (var w = 0; w < max_bricks_width; w++) {
			for (var h = 1; h < max_bricks_height; h = h + 2) {
				var Brick = require('../entities/Brick');

				brick = new Brick(this.loader, w * brick_width, h * brick_height, (h+1) % 5);
				this.container.addChild(brick.getDrawable());
				this.bricks.push(brick);
			}
		}
	},
});

module.exports = Level_4;
