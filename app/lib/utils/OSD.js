require('../class');

var OSD = Class.extend({
	gamestate: null,
	container: null,
	score: null,
	score_num: null,
	lives: null,
	lives_num: null,
	font: "normal 10px 'Press Start 2P'",
	font_color: "#fff",
	init: function(gamestate) {
		this.gamestate = gamestate;
		this.container = new createjs.Container();
		this.create();
	},
	create: function() {
		this.score = new createjs.Text("Score: "+this.score_num);
		this.score.font = this.font;
		this.score.color = this.font_color;
		this.score.x = 0;
		this.score.y = 0;
		score_boundaries = this.score.getBounds();
		this.score.x = 10;
		this.score.y = 640-(score_boundaries.height);
		this.lives = new createjs.Text("Lives: "+this.lives_num);
		this.lives.font = this.font;
		this.lives.color = this.font_color;
		lives_boundaries = this.lives.getBounds();
		this.lives.x = 480-10-(lives_boundaries.width);
		this.lives.y = 640-(lives_boundaries.height);

		this.container.addChild(this.score, this.lives);
	},
	getDrawable: function() {
		return this.container;
	},
	tick: function() {
		this.lives_num = this.gamestate.lives;
		this.lives.text = "Lives: "+this.lives_num;
		this.score_num = this.gamestate.score;
		this.score.text = "Score: "+this.score_num;
	}
});
module.exports = OSD;
