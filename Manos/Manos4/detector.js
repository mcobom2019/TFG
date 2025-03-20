// Componente detector
// Detecta cuando se pulsa el botón del ratón sobre un componente,
// cuándo se produce una colisión, o cuándo se hace el gesto "pinch".

AFRAME.registerComponent("detector", {
    init: function () {
        let self = this;
        console.log("Detector: init");
        this.el.addEventListener("click", function () {
            console.log("Detector: Botón pulsado", self.el);
        });
        this.el.addEventListener("obbcollisionstarted", function () {
            console.log("Detector: Comienzo de colisión", self.el);
        });
        this.el.addEventListener("obbcollisionended", function () {
            console.log("Detector: Fin de colisión", self.el);
        });
        this.el.addEventListener("pinchstarted", function () {
            console.log("Detector: Comienzo de pellizco", self.el);
        });
        this.el.addEventListener("pinchended", function () {
            console.log("Detector: Fin de pellizco", self.el);
        });
        this.el.addEventListener('controllerconnected', function (event) {
            console.log("Detector: Controlador conectado", self.el);
            console.log(event.detail.name);
        });
        this.el.addEventListener('controllerdisconnected', function (event) {
            console.log("Detector: Controlador desconectado", self.el);
            console.log(event.detail.name);
        });
    }
});

AFRAME.registerComponent('finger-collider', {
  schema: {
    target: {type: 'selector'}
  },
  
  init: function() {
    this.targetEl = this.data.target;
    this.tick = AFRAME.utils.throttleTick(this.tick, 100, this);
  },
  
  tick: function() {
    if (!this.targetEl) return;
    
    // Posición del dedo
    var fingerPos = new THREE.Vector3();
    this.el.object3D.getWorldPosition(fingerPos);
    
    // Posición del botón
    var buttonPos = new THREE.Vector3();
    this.targetEl.object3D.getWorldPosition(buttonPos);
    
    // Distancia entre el dedo y el botón
    var distance = fingerPos.distanceTo(buttonPos);
    
    // Radio del botón
    var buttonRadius = this.targetEl.getAttribute('radius') || 0.6;
    
    // Consideramos que hay colisión si la distancia es menor que el radio del botón
    if (distance < buttonRadius + 0.05) {
      console.log("¡Colisión detectada entre el dedo y el botón!");
      this.targetEl.emit('finger-touch', {}, false);
    }
  }
});
