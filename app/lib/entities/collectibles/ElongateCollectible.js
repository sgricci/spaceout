var BaseCollectible = require('./BaseCollectible');
var ElongatePowerup = require('../../entities/powerups/ElongatePowerup');

var ElongateCollectible = BaseCollectible.extend({
	img: "powerup_elongate",
	powerup: ElongatePowerup

});

module.exports = ElongateCollectible;
