var Base = require('../Base');
var NonePowerup = require('./powerups/NonePowerup');

var Player = Base.extend({
	last_mouse_x: null,
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
	powerup: null,
	speed  : 250,
	max_x  : 410,
	min_x  : 10,
	init: function(loader, x, y, w, h) {
		this.powerup = new NonePowerup(loader);
		this.position.x = x;
		this.position.y = y;
		this.initial.x = x;
		this.initial.y = y;
		this.width  = w;
		this.height = h;
	},
	getDrawable: function() {
		return this.powerup.getDrawable();
	},
	get_pos: function() {
		return this.position;
	},
	interact: function(delta, keymap, mouse_x, gamestate) {
		if (keymap[37] || keymap[65]) { this.moveLeft(delta); }
		if (keymap[39] || keymap[68]) { this.moveRight(delta); }
		if (mouse_x != this.last_mouse_x) {
			this.position.x = mouse_x - (this.powerup.width/2);
			this.last_mouse_x = mouse_x;
			this.checkLeft();
			this.checkRight();
		}
		this.powerup.set(this.position.x, this.position.y);
		this.powerup.interact(delta, keymap, this, gamestate);
	},
	moveLeft: function(delta) {
		this.position.x -= this.speed * delta;
		this.checkLeft();
	},
	checkLeft: function() {
		if (this.position.x < this.min_x) {
			this.position.x = this.min_x;
		}
	},
	moveRight: function(delta) {
		this.position.x += this.speed * delta;
		this.checkRight();
	},
	checkRight: function() {
		if (this.position.x > this.max_x) {
			this.position.x = this.max_x;
		}
	},
	reset: function(container, game) {
		this.position.x = this.initial.x;
		this.position.y = this.initial.y;
		this.powerup.remove(container);
		this.powerup = new NonePowerup(game.loader);
		container.addChild(this.powerup.getDrawable());
	},
	tick: function(delta, keymap, mouse_x, ball, gamestate) {
		this.powerup.tick(delta);
		this.interact(delta, keymap, mouse_x, gamestate);
		var intersection = ndgmr.checkRectCollision(this.powerup.getDrawable(),ball.sprite); 
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
