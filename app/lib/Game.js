require('./class')
var TitleState = require('./states/TitleState.js');
var GameState = require('./states/GameState.js');

var Game = Class.extend({
	state: null,
	stage: null,
	loader: null,
	manifest: [
		{src : "player.png" , id : "player"} ,
		{src : "ball.png"   , id : "ball"} ,
		{src : "brick.png"  , id  : "brick"} ,

	],
	init: function() {
		this.stage = new createjs.Stage('main');
		this.state = new TitleState(this);
		this.loader = new createjs.LoadQueue(false);

		this.loader.addEventListener('complete', this.state.loaded.bind(this.state));
		this.loader.loadManifest(this.manifest, true, './img/');


		createjs.Ticker.timingMode = createjs.Ticker.RAF;
		createjs.Ticker.addEventListener('tick', this.tick.bind(this));
	},
	tick: function(event) {
		var deltaS = event.delta / 1000;
		this.state.tick(deltaS);
	},
	loadGameState: function() {
		this.state = new GameState(this);
	}
});

module.exports = Game;
