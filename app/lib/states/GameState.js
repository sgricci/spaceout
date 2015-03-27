var BaseState = require('./BaseState');
var Player = require('../entities/Player');
var Ball = require('../entities/Ball');
var Level_1 = require('../levels/Level_1');

var GameState = BaseState.extend({
	game      : null,
	player    : null,
	ball      : null,
	level     : null,
	container : null,
	keymap    : {},
	init: function(game) {
		this.game = game;
		this.create();
		this.bind();
	},
	create: function() {
		this.container = new createjs.Container();

		this.player = new Player(10, 610, 20, 50);

		this.player.add(this.container);
		
		this.ball = new Ball(40, 500);
		
		this.ball.add(this.container);

		this.level = new Level_1();

		this.level.add(this.container);

		this.game.stage.addChild(this.container);
	},
	bind: function() {
		document.onkeyup   = this.onkeyup.bind(this);
		document.onkeydown = this.onkeydown.bind(this);
	},
	onkeydown: function(event) {
		this.keymap[event.which] = true;
	},
	onkeyup: function(event) {
		delete this.keymap[event.which];
	},
	tick: function() {
		this.game.stage.clear();
		this.player.tick(this.keymap, this.ball);
		this.level.tick();
		this.ball.tick();
		this.game.stage.update();
	}
});

module.exports = GameState;
