var BaseLevel = require('./BaseLevel');
var Brick = require('../entities/Brick');

var Level_1 = BaseLevel.extend({
	bricks: [],
	container: null,
	init: function() {
		this.create();
	},
	create: function() {
		this.container = new createjs.Container();
		this.bricks.push(new Brick(0,0).add(this.container));
		this.bricks.push(new Brick(20,0).add(this.container));
		//var brick2 = new Brick(200,0);
		//brick2.add(this.container);
		//this.bricks.push(brick2);
		console.log(this.bricks);
	},
	add: function(container) {
		container.addChild(this.container);
	},
	tick: function() {
		for (var i = 0; i < this.bricks.length; i++) {
			this.bricks[i].tick();
		}
	}
});

module.exports = Level_1;
