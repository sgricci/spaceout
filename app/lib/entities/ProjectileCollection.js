var Base = require('../Base');

var ProjectileCollection = Base.extend({
	projectiles : [],
	loader      : null,
	container   : null,
	init: function(loader, container) {
		this.loader    = loader;
		this.container = container;
	},
	add: function(pos) {
		var Projectile = require('../entities/Projectile');
		var proj = new Projectile(this.loader, pos.x+18, pos.y);
		this.projectiles.push(proj);
		this.container.addChild(proj.getDrawable());
		var Projectile = require('../entities/Projectile');
		var proj = new Projectile(this.loader, pos.x+38, pos.y);
		this.projectiles.push(proj);
		this.container.addChild(proj.getDrawable());
	},
	tick: function(delta) {
		for(var i = 0; i < this.projectiles.length; i++) {
			var res = this.projectiles[i].tick(delta);
			if (res === false) {
				this.projectiles.splice(i, 1);
			}
		}
	},
	reset: function() {
		for(var i = 0; i < this.projectiles.length; i++) {
			this.container.removeChild(this.projectiles[i].getDrawable());
		}
		this.projectiles = [];
	},
	destroy: function(index) {
		this.container.removeChild(this.projectiles[index].getDrawable());
		this.projectiles.splice(index, 1);
	},
});
module.exports = ProjectileCollection;
