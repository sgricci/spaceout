var BaseLevel = require('./BaseLevel');

var Level_7 = BaseLevel.extend({
	create: function() {
		max_bricks_height = 20;
		w = 0;
		h = 0;
		for (var h = 0; h < max_bricks_height; h++) {
			this.add_brick(w, h, 1);
		}
		w++;
		this.add_brick(w, 0, 1);
		this.add_brick(w, 19, 1);
		w++;
		this.add_brick(w, 1, 1);
		this.add_brick(w, 18, 1);
		w++;
		for (var h = 2; h < max_bricks_height-2; h++) {
			this.add_brick(w, h, 1);
		}
		w = w+2;
		this.add_brick(w, 0, 5);
		this.add_brick(w, 1, 5);
		for (var h = 4; h < max_bricks_height; h++) {
			this.add_brick(w, h, 5);
		}
		w = w+2;
		for (var h = 0; h < max_bricks_height; h++) {
			this.add_brick(w, h, 4);
		}
		w++;
		for (var h = 0; h < max_bricks_height; h++) {
			if (h == 0 || h == 8 || h == max_bricks_height-1) {
				this.add_brick(w, h, 4);
			}
		}
		w++;
		for (var h = 0; h < max_bricks_height; h++) {
			if (h == 0 || h == 8 || h == max_bricks_height-1) {
				this.add_brick(w, h, 4);
			}
		}

	},
	add_brick: function(w, h, color) {
		brick_width = 48;
		brick_height = 16;
		var Brick = require('../entities/Brick');
		brick = new Brick(this.loader, w * brick_width, h * brick_height, color);
		this.container.addChild(brick.getDrawable());
		this.bricks.push(brick);
	}
});

module.exports = Level_7;


