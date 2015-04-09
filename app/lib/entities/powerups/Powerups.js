var ElongatePowerup = require('./ElongatePowerup');
var ShrinkPowerup = require('./ShrinkPowerup');
var LaserPowerup = require('./LaserPowerup');

var Powerups = {
	ELONGATE : 0,
	SHRINK   : 1,
	LASER    : 2,
	0        : ElongatePowerup,
	1        : ShrinkPowerup,
	2        : LaserPowerup,
};

module.exports = Powerups;
