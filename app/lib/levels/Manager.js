var Base = require('../Base');
var Levels = require('./Levels');

var Manager = Base.extend({
	current_level: Levels.ONE,
	gamestate: null,
	init: function(gamestate) {
		this.gamestate = gamestate;
	},
	load: function() {
		//var level = require('Level_'+this.current_level+'.js');
		//var level = require('../levels/Level_1');
		return new Levels[this.current_level](this.gamestate, this.gamestate.game.loader);
	},
	next: function() {
		this.current_level++;
		return this.load();
	}
});

module.exports = Manager;
