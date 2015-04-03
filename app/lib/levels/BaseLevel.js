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
	tick: function(delta, ball) {
		for (var i = 0; i < this.bricks.length; i++) {
			if (typeof(this.bricks[i]) == "undefined") continue;
			this.bricks[i].tick(delta);
			if (ndgmr.checkRectCollision(this.bricks[i].sprite, ball.sprite)) {
				this.container.removeChild(this.bricks[i].getDrawable());
				delete this.bricks[i];
				ball.collision('block', delta);
				new createjs.Sound.play('hit_block');
				this.gamestate.addScore(100);
			}
		}
	}
});

module.exports = BaseLevel;
