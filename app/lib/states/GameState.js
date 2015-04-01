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
	ready: false,
	keymap    : {},
	init: function(game) {
		this.game = game;
		this.create();
		this.bind();
	},
	create: function() {
		this.container = new createjs.Container();
		this.player = new Player(this.game.loader, 10, 610, 20, 50);
		this.ball = new Ball(this.game.loader, 40, 500);
		this.level = new Level_1(this.game.loader);

		this.container.addChild(
			this.player.getDrawable(),
			this.ball.getDrawable()
		);
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
	tick: function(delta) {
		this.player.tick(delta, this.keymap, this.ball);
		this.level.tick(delta, this.ball);
		this.ball.tick(delta);
		this.game.stage.update();
	}
});

module.exports = GameState;
