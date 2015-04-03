var BaseLevel = require('./BaseLevel');

var Level_3 = BaseLevel.extend({
	create: function() {
		max_bricks_width = 9;
		max_bricks_height = 19;
		brick_width = 48;
		brick_height = 16;
		desired_w = 1;

		x = 0;
		for (var h = 0; h < max_bricks_height; h++) {
			x++;
			if (x == 2) {
				desired_w++;
				x = 0;
			}
			for (var w = 0; w < desired_w; w++) {
				var Brick = require('../entities/Brick');

				brick = new Brick(this.loader, w * brick_width, h * brick_height, (h+1) % 5);
				this.container.addChild(brick.getDrawable());
				this.bricks.push(brick);
			}

		}
	},
});

module.exports = Level_3;


