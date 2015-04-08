var ElongatePowerup = require('./ElongateCollectible');
var ShrinkPowerup = require('./ShrinkCollectible');

var Collectibles = {
	ELONGATE   : 0,
	SHRINK   : 1,
	0     : ElongatePowerup,
	1     : ShrinkPowerup,
	length: 4,
};

module.exports = Collectibles;

