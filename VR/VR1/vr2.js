AFRAME.registerComponent('push', {
        init: function() {
        var el = this.el;

        el.addEventListener("collidestart", function () {
          const impulse = new Ammo.btVector3(1.4, 1, 0);
          const pos = new Ammo.btVector3(0, 0, 0);
          //el.body.applyForce(force, pos);
          el.body.applyImpulse(impulse, pos);
          //el.body.setLinearVelocity( force );
          Ammo.destroy(impulse);
          Ammo.destroy(pos);
          });
        }
});