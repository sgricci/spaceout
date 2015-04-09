var BaseCollectible = require('./BaseCollectible');
var LaserPowerup = require('../../entities/powerups/LaserPowerup');

var LaserCollectible = BaseCollectible.extend({
	img: "powerup_laser",
	powerup: LaserPowerup
});

module.exports = LaserCollectible;


