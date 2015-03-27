require('./class');

var Base = Class.extend({
	position: {
		x: 0,
		y: 0
	},
	width: 0,
	height: 0,
	shape: null,
	add: function(container) {
		container.addChild(this.shape);
		return this;
	},
	getBoundingBox: function() {
		return {
			x: this.position.x,
			y: this.position.y,
			w: this.width,
			h: this.height
		};
	},
	collides: function(collidable) {
		var box1 = collidable.getBoundingBox();
		var box2 = this.getBoundingBox();
		intersects = !(
			box1.x > box2.x + box2.w ||
			box1.x + box1.w < box2.x ||
			box1.y > box2.y + box2.h ||
			box1.y + box1.h < box2.y 
		);
		return intersects;
	}
});
module.exports = Base;
