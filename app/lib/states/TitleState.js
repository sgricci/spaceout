var BaseState = require('./BaseState');

var TitleState = BaseState.extend({
	game      : null,
	container : null,
	title     : null,
	directions: null,
	init: function(game) {
		this.game = game;
		this.container = new createjs.Container();
		this.create();
		this.bind();
	},
	create: function() {
		this.title = new createjs.Text("Space Out!");
		this.title.font = "bold 24px 'Press Start 2P'";
		this.title.color = "#ddd";
		var titleRect = this.title.getBounds();
		this.title.x = (480/2)-(titleRect.width/2);
		this.title.y = (640/2)-(titleRect.height/2);
		this.container.addChild(this.title);

		this.directions = new createjs.Text("Click anywhere to play");
		this.directions.font = "bold 14px 'Press Start 2P'";
		this.directions.color = "#fff";
		directionsRect = this.directions.getBounds();
		this.directions.x = (480/2)-(directionsRect.width/2);
		this.directions.y = (640/2)-(directionsRect.height/2)+100;
		this.container.addChild(this.directions);
		this.game.stage.addChild(this.container);
	},
	tick: function() {
		this.game.stage.clear();

		this.game.stage.update();
	},
	bind: function() {
		var self = this;
		document.onmouseup = function() {
			self.next();
		};
	},
	next: function() {
		this.game.stage.removeChild(this.container);
		document.onmouseup = function() {};
		this.game.loadGameState();
	}
});

module.exports = TitleState;
