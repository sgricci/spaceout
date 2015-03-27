require('./class')
var TitleState = require('./states/TitleState.js');
var GameState = require('./states/GameState.js');

var Game = Class.extend({
	state: null,
	stage: null,
	init: function() {
		this.stage = new createjs.Stage('main');
		this.state = new TitleState(this);

		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener('tick', this.tick.bind(this));
	},
	tick: function() {
		this.state.tick();
	},
	loadGameState: function() {
		this.state = new GameState(this);
	}
});

module.exports = Game;
