var Base = require('../Base');

var Player = Base.extend({
	position: {
		x: 0,
		y: 0
	},
	initial: {
		x: 0,
		y: 0
	},
	width  : 0,
	height : 0,
	shape  : null,
	img    : null,
	sprite : null,
	speed  : 250,
	init: function(loader, x, y, w, h) {
		img = loader.getResult("player");
		this.sprite = new createjs.Bitmap(img);
		this.position.x = x;
		this.position.y = y;
		this.initial.x = x;
		this.initial.y = y;
		this.width  = w;
		this.height = h;
		this.create();
	},
	getDrawable: function() {
		return this.sprite;
	},
	create: function() {
		this.shape = new createjs.Shape();
	},
	move: function(delta, keymap) {
		if (keymap[37] || keymap[65]) { this.moveLeft(delta); }
		if (keymap[39] || keymap[68]) { this.moveRight(delta); }
	},
	moveLeft: function(delta) {
		this.position.x -= this.speed * delta;
		if (this.position.x < 10) {
			this.position.x = 10;
		}
	},
	moveRight: function(delta) {
		this.position.x += this.speed * delta;
		if (this.position.x > 410) {
			this.position.x = 410;
		}
	},
	reset: function() {
		this.position.x = this.initial.x;
		this.position.y = this.initial.y;
	},
	tick: function(delta, keymap, ball) {
		this.move(delta, keymap);
		this.sprite.x = this.position.x;
		this.sprite.y = this.position.y;
		var intersection = ndgmr.checkRectCollision(this.sprite,ball.sprite); 
		if (intersection) {
			if (intersection.x - intersection.rect1.x <= 10) {
				ball.collision('left', delta);
				console.log('hit left');
			} else if (intersection.x - intersection.rect1.x >= 54) {
				ball.collision('right', delta);
				console.log('hit right');
			} else {
				ball.collision('center', delta);
				console.log('hit center');
			}
			var instance = new createjs.Sound.play('blip');
		}
	},
});

module.exports = Player;
