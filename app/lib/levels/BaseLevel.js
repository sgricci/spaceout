var Base = require('../Base');

var BaseLevel = Base.extend({
	bricks: [],
	container: null,
	gamestate: null,
	loader: null,
	init: function(gamestate, loader) {
		this.gamestate = gamestate;
		this.loader = loader;
		this.container = new createjs.Container();
		this.create();
	},
	add: function(container) {
		container.addChild(this.container);
	},
	remove: function(container) {
		container.removeChild(this.container);
	},
	tick: function(delta, ball, projectilesCollection) {
		var projectiles = projectilesCollection.projectiles;
		for (var i = 0; i < this.bricks.length; i++) {
			if (typeof(this.bricks[i]) == "undefined") continue;
			this.bricks[i].tick(delta);
			if (ndgmr.checkRectCollision(this.bricks[i].sprite, ball.sprite)) {
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
					delete this.bricks[i];
					new createjs.Sound.play('hit_block');
					this.gamestate.addScore(100);
				}
			}
		}
	},
	remaining: function() {
		count = 0;
		for (var i = 0; i < this.bricks.length; i++) {
			if (typeof this.bricks[i] !== "undefined") {
				count++;
			}
		}
		return count;
	},
	is_complete: function() {
		return (this.remaining() == 0);
	}
});

module.exports = BaseLevel;
