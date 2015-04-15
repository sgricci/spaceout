var BaseLevel = require('./BaseLevel');

var Level_8 = BaseLevel.extend({
	original_bricks: [],
	create: function() {
		max_bricks_height = 20;
		w = 0;
		h = 0;
		for (var h = 0; h < max_bricks_height; h++) {
			this.add_brick(w, h, 1);
		}
		w++;
		this.add_brick(w, 10, 1);
		this.add_brick(w, 10, 1);
		w++;
		this.add_brick(w, 10, 1);
		this.add_brick(w, 10, 1);
		w++;
		for (var h = 0; h < max_bricks_height; h++) {
			this.add_brick(w, h, 1);
		}
		w = w+2;
		for (var h = 1; h < max_bricks_height; h++) {
			this.add_brick(w, h, 5);
		}
		w++;
		this.add_brick(w, 0, 5);
		this.add_brick(w, 10, 5);
		w++;
		for (var h = 1; h < max_bricks_height; h++) {
			this.add_brick(w, h, 5);
		}

		w = w+2;
		for (var h = 0; h < max_bricks_height-4; h++) {
			this.add_brick(w, h, 4);
		}
		this.add_brick(w, 18, 4);
		this.add_brick(w, 19, 4);

	},
	add_brick: function(w, h, color) {
		brick_width = 48;
		brick_height = 16;
		var Brick = require('../entities/Brick');
		brick = new Brick(this.loader, w * brick_width, h * brick_height, color);
		this.container.addChild(brick.getDrawable());
		this.bricks.push(brick);
		var Brick = require('../entities/Brick');
		brick = new Brick(this.loader, w * brick_width, h * brick_height, color);
		this.original_bricks.push(brick);
	},
	tick: function(delta, ball, projectilesCollection) {
		var self = this;
		var projectiles = projectilesCollection.projectiles;
		for (var i = 0; i < this.bricks.length; i++) {
			if (typeof(this.bricks[i]) == "undefined") continue;
			this.bricks[i].tick(delta);
			if (ndgmr.checkRectCollision(this.bricks[i].sprite, ball.sprite)) {
				var brick_num = i;
				setTimeout(function() {
					var Brick = require('../entities/Brick');
					self.bricks[brick_num] = self.original_bricks[brick_num];
					self.container.addChild(self.bricks[brick_num].getDrawable());
				}, 200);
				this.gamestate.brickDestroy(this.bricks[i].sprite);
				this.container.removeChild(this.bricks[i].getDrawable());
				delete this.bricks[i];
				ball.collision('block', delta);
				new createjs.Sound.play('hit_block');
				this.gamestate.addScore(100);
			}
			for (var x = 0; x < projectiles.length; x++) {
				if (ndgmr.checkRectCollision(this.bricks[i].sprite, projectiles[x].getDrawable())) {
					this.gamestate.brickDestroy(this.bricks[i].sprite);
					this.container.removeChild(this.bricks[i].getDrawable());
					projectilesCollection.destroy(x);
					var brick_num = i;
					setTimeout(function() {
						var Brick = require('../entities/Brick');
						self.bricks[brick_num] = self.original_bricks[brick_num];
						self.container.addChild(self.bricks[brick_num].getDrawable());
					}, 200);
					delete this.bricks[i];
					new createjs.Sound.play('hit_block');
					this.gamestate.addScore(100);
				}
			}
		}
	},
});

module.exports = Level_8;
