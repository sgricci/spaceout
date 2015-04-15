var BasePaddlePowerup = require('./BasePaddlePowerup');

var LaserPowerup = BasePaddlePowerup.extend({
	img: "player_laser",
	width: 64,
	height: 20,
	cooldown: 0.2,
	current_cooldown: 0,
	interact: function(delta, keymap, player, gamestate, mouse_down) {
		if ((keymap[32] || mouse_down) && this.current_cooldown <= 0) {
			gamestate.addProjectile();
			this.current_cooldown = this.cooldown;
		}
	},
	tick: function(delta) {
		if (this.current_cooldown > 0) {
			this.current_cooldown -= delta;
		}
	}
});

module.exports = LaserPowerup;


