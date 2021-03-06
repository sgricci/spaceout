var BaseState = require('./BaseState');
var Player = require('../entities/Player');
var Ball = require('../entities/Ball');
var LevelManager = require('../levels/Manager');
var CollectibleCollection = require('../entities/CollectibleCollection');
var ProjectileCollection = require('../entities/ProjectileCollection');
var OSD = require('../utils/OSD');

var GameState = BaseState.extend({
	mouse_x   : null,
	mouse_down: false,
	game      : null,
	player    : null,
	ball      : null,
	level     : null,
	lm : null,
	osd       : null,
	container : null,
	game_is_over: false,
	collectibles: null,
	lives     : 2,
	score     : 0,
	ready: false,
	keymap    : {},
	init: function(game) {
		this.game = game;
		this.create();
		this.bind();
	},
	create: function() {
		this.lm = new LevelManager(this);
		this.container = new createjs.Container();
		this.collectibles = new CollectibleCollection(this.game.loader, this.container);
		this.projectiles = new ProjectileCollection(this.game.loader, this.container);
		this.player = new Player(this.game.loader, 10, 610, 20, 50);
		this.ball = new Ball(this, this.game.loader, 40, 500);
		this.level = this.lm.load();
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
	reset: function(reset_powerup) {
		this.player.reset(this.container, this.game, reset_powerup);
		this.ball.reset();
		this.projectiles.reset();
		this.collectibles.reset();
	},
	decrementLife: function() {
		if (this.lives == 0) {
			this.game_over();
		} else {
			this.lives--;
		}
	},
	brickDestroy: function(brick) {
		var rando = Math.round(Math.random()*100);
		if (rando < 10) {
			this.collectibles.spawnPowerup(
					brick.x+(48/2),
					brick.y+(16/2)
					);
		}
	},
	addProjectile: function() {
		this.projectiles.add(this.player.get_pos());
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
		var self = this;
		document.onkeyup   = this.onkeyup.bind(this);
		document.onkeydown = this.onkeydown.bind(this);
		this.game.stage.on("stagemousemove", function(event) {
			self.mouse_x = event.stageX;
		});
		this.game.stage.on("stagemousedown", function(event) {
			self.mouse_down = true;
		});
		this.game.stage.on("stagemouseup", function(event) {
			self.mouse_down = false;
		});
	},
	onkeydown: function(event) {
		this.keymap[event.which] = true;
		if (this.keymap[78]) {
			this.level.remove(this.container);
			this.level = this.lm.next();
			this.level.add(this.container);
		}
	},
	onkeyup: function(event) {
		delete this.keymap[event.which];
	},
	tick: function(delta) {
		if (!this.game_is_over) {
			this.player.tick(delta, this.keymap, this.mouse_x, this.ball, this, this.mouse_down);
			this.level.tick(delta, this.ball, this.projectiles);
			this.ball.tick(delta);
			this.collectibles.tick(delta);
			this.projectiles.tick(delta);
			var powerup = this.collectibles.collision_check(this.player);
			if (powerup !== false) {
				this.player.powerup.remove(this.container);
				this.player.powerup = new powerup(this.game.loader);
				this.container.addChild(this.player.powerup.getDrawable());
			}
			this.osd.tick();
			this.game.stage.update();
			// check if level complete
			if (this.level.is_complete() || this.keymap[77]) {
				this.level.remove(this.container);
				this.reset(false);
				this.level = this.lm.next();
				this.level.add(this.container);
			}
		}
	}
});

module.exports = GameState;
