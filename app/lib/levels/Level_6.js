var BaseLevel = require('./BaseLevel');

var Level_6 = BaseLevel.extend({
	create: function() {
		max_bricks_width = 10;
		max_bricks_height = 20;
		brick_width = 48;
		brick_height = 16;
		var opp = false;
		var max_w = 5;
		var min_w = 4;
		var last_height = 0;
		for (var h = 4; h < max_bricks_height; h++) {
			for (var w = 0; w < max_bricks_width; w++) {
				if ((w == 5 || w == 4) && h != 10) continue;
				if ((w == 1 || w == 2) && (h > 5 && h < 16)) continue;
				if ((w == 7 || w == 8) && (h > 5 && h < 16)) continue;
				if ((w == 1 && (h > 5 && h < 18))) continue;
				if ((w == 7 && (h > 5 && h < 18))) continue;
				var Brick = require('../entities/Brick');

				if ((w == 2 || w == 8) && (h > 5 && h < 18)) {
					brick = new Brick(this.loader, w * brick_width, h * brick_height, 5);
				} else {
					brick = new Brick(this.loader, w * brick_width, h * brick_height, 2);
				}
				this.container.addChild(brick.getDrawable());
				this.bricks.push(brick);
			}
		}
	},
});

module.exports = Level_6;

