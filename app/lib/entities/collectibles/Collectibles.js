var ElongatePowerup = require('./ElongateCollectible');
var ShrinkPowerup = require('./ShrinkCollectible');
var LaserPowerup = require('./LaserCollectible');

var Collectibles = {
	ELONGATE : 0,
	SHRINK   : 1,
	LASER    : 2,
	0        : ElongatePowerup,
	1        : ShrinkPowerup,
	2        : LaserPowerup,
	length   : 6,
};

module.exports = Collectibles;

