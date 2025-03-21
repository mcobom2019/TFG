/* global AFRAME, THREE */
AFRAME.registerComponent('detector', {
  schema: {
    distance: { default: 0.1 }
  },

  init: function () {
    this.worldPosition = new THREE.Vector3();
    this.handEls = document.querySelectorAll('[hand-tracking-controls]');
    this.isColliding = false;
    this.bindMethods();

    // Crear un evento personalizado para interacción con la mano
    this.el.addEventListener('hand-collision', this.onHandCollision);
  },

  bindMethods: function () {
    this.onHandCollision = this.onHandCollision.bind(this);
  },

  tick: function () {
    var handEls = this.handEls;
    var handEl;
    var distance;

    for (var i = 0; i < handEls.length; i++) {
      handEl = handEls[i];
      
      // Solo procesar si el elemento de mano tiene el componente
      if (handEl.components['hand-tracking-controls']) {
        // Obtener la posición del dedo índice (similar a pressable.js en el primer archivo)
        var indexTipPosition = handEl.components['hand-tracking-controls'].indexTipPosition;
        
        if (indexTipPosition) {
          distance = this.calculateFingerDistance(indexTipPosition);
          
          if (distance < this.data.distance) {
            if (!this.isColliding) {
              this.isColliding = true;
              this.el.emit('hand-collision', { hand: handEl });
            }
            return;
          }
        }
      }
    }
    
    if (this.isColliding) {
      this.isColliding = false;
      this.el.emit('hand-collision-ended');
    }
  },

  calculateFingerDistance: function (fingerPosition) {
    var el = this.el;
    var worldPosition = this.worldPosition;

    worldPosition.copy(el.object3D.position);
    el.object3D.parent.updateMatrixWorld();
    el.object3D.parent.localToWorld(worldPosition);

    return worldPosition.distanceTo(fingerPosition);
  },

  onHandCollision: function (evt) {
    console.log('Colisión detectada con la mano', evt.detail.hand);
  }
});