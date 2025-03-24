/* global AFRAME, THREE */
AFRAME.registerComponent('pressable', {
  schema: {
    pressDistance: { default: 0.08 }  // Aumentamos un poco la distancia para facilitar la detección
  },

  init: function () {
    this.worldPosition = new THREE.Vector3();
    this.handEls = document.querySelectorAll('[hand-tracking-controls]');
    this.pressed = false;
    
    // Añadimos mensajes de depuración
    console.log("Componente pressable inicializado");
    console.log("Manos detectadas:", this.handEls.length);
  },

  tick: function () {
    var handEls = this.handEls;
    var handEl;
    var distance;
    
    // Actualiza la posición mundial del objeto
    this.el.object3D.getWorldPosition(this.worldPosition);
    
    for (var i = 0; i < handEls.length; i++) {
      handEl = handEls[i];
      
      // Asegúrate de que el componente de seguimiento de manos está inicializado
      if (handEl.components['hand-tracking-controls'] && 
          handEl.components['hand-tracking-controls'].indexTipPosition) {
        
        distance = this.calculateFingerDistance(handEl.components['hand-tracking-controls'].indexTipPosition);
        
        // Depuración opcional
        // if (distance < 0.2) {
        //   console.log("Distancia al dedo:", distance);
        // }
        
        if (distance < this.data.pressDistance) {
          if (!this.pressed) {
            console.log("Botón presionado con el dedo");
            this.el.emit('pressedstarted');
          }
          this.pressed = true;
          return;
        }
      }
    }
    
    if (this.pressed) {
      console.log("Botón liberado");
      this.el.emit('pressedended');
    }
    this.pressed = false;
  },

  calculateFingerDistance: function (fingerPosition) {
    return this.worldPosition.distanceTo(fingerPosition);
  }
});
