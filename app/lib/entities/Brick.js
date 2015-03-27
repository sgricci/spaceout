var Base = require('../Base');

var Brick = Base.extend({
	position: {
		x: 0,
		y: 0
	},
	width: 100,
	height: 25,
	shape: null,
	init: function(x, y) {
		this.position.x = x;
		this.position.y = y;
		this.shape = new createjs.Shape();
	},
	tick: function() {
		this.shape.graphics.clear();
		this.shape.graphics.beginFill("#f00");
		this.shape.graphics.drawRect(
			this.position.x, this.position.y,
			this.width, this.height
		);
	}
});

module.exports = Brick;
