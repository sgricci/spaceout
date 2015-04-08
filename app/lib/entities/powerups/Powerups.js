var ElongatePowerup = require('./ElongatePowerup');
var ShrinkPowerup = require('./ShrinkPowerup');
var Powerups = {
	ELONGATE : 0,
	SHRINK   : 1,
	0        : ElongatePowerup,
	1        : ShrinkPowerup,
};

module.exports = Powerups;
