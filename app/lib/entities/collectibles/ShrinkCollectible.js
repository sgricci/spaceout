var BaseCollectible = require('./BaseCollectible');
var ShrinkPowerup = require('../../entities/powerups/ShrinkPowerup');

var ShrinkCollectible = BaseCollectible.extend({
	img: "powerup_shrink",
	powerup: ShrinkPowerup
});

module.exports = ShrinkCollectible;

