var BaseState = require('./BaseState');
var Player = require('../entities/Player');
var Ball = require('../entities/Ball');
var Level_1 = require('../levels/Level_1');
var Level_2 = require('../levels/Level_2');
var Level_3 = require('../levels/Level_3');
var OSD = require('../utils/OSD');

var GameState = BaseState.extend({
	game      : null,
	player    : null,
	ball      : null,
	level     : null,
	osd       : null,
	container : null,
	game_is_over: false,
	lives     : 3,
	score     : 0,
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
		this.ball = new Ball(this, this.game.loader, 40, 500);
		this.level = new Level_3(this, this.game.loader);
		this.osd = new OSD(this);

		this.container.addChild(
			this.player.getDrawable(),
			this.ball.getDrawable()
		);
		this.level.add(this.container);

		this.game.stage.addChild(this.container);
		this.game.stage.addChild(this.osd.getDrawable());
	},
	addScore: function(score) {
		this.score += parseInt(score, 10);
	},
	reset: function() {
		this.player.reset();
		this.ball.reset();
	},
	decrementLife: function() {
		if (this.lives == 0) {
			this.game_over();
		} else {
			this.lives--;
		}
	},
	game_over: function() {
		this.game_is_over = true;
		this.game_over_text = new createjs.Text("Game Over Man");
		this.game_over_text.font = "bold 24px 'Press Start 2P'";
		this.game_over_text.color = "#fff";
		bounds = this.game_over_text.getBounds();
		this.game_over_text.x = (480/2)-(bounds.width/2);
		this.game_over_text.y = (640/2)-(bounds.height/2);
		this.container.addChild(this.game_over_text);
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
		if (!this.game_is_over) {
			this.player.tick(delta, this.keymap, this.ball);
			this.level.tick(delta, this.ball);
			this.ball.tick(delta);
			this.osd.tick();
			this.game.stage.update();
		}
	}
});

module.exports = GameState;
