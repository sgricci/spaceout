require('./class')
var TitleState = require('./states/TitleState.js');
var GameState = require('./states/GameState.js');

var Game = Class.extend({
	state: null,
	stage: null,
	loader: null,
	soundManager: null,
	manifest: [
		{src : "player.png" , id : "player"} ,
		{src : "ball.png"   , id : "ball"} ,
		{src : "brick.png"  , id  : "brick"} ,
		{src : "brick_brown.png"  , id  : "brick_brown"} ,
		{src : "brick_yellow.png"  , id  : "brick_yellow"} ,
		{src : "brick_grey.png"  , id  : "brick_grey"} ,
		{src : "brick_purple.png"  , id  : "brick_purple"} ,
		{src : "brick_red.png"  , id  : "brick_red"} ,
		{src : "../sound/died.mp3"  , id  : "died"} ,
		{src : "../sound/blip.mp3"  , id  : "blip"} ,
		{src : "../sound/bump.mp3"  , id  : "bump"} ,
		{src : "../sound/hit_block.mp3"  , id  : "hit_block"} ,

	],
	init: function() {
		this.stage = new createjs.Stage('main');
		this.state = new TitleState(this);
		this.loader = new createjs.LoadQueue(false);

		this.loader.installPlugin(createjs.Sound);
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
