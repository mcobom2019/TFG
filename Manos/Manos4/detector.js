// Componente detector
// Detecta cuando se pulsa el botón del ratón sobre un componente,
// cuándo se produce una colisión, o cuándo se hace el gesto "pinch".

AFRAME.registerComponent("detector", {
    init: function () {
        let self = this;
        console.log("Detector: init en", self.el);
        
        // Detección de clics
        this.el.addEventListener("click", function () {
            console.log("Detector: Botón pulsado", self.el);
        });
        
        // Colisiones Ammo.js
        this.el.addEventListener("collide", function (event) {
            console.log("Detector: Colisión general detectada", self.el);
            if (event.detail && event.detail.body && event.detail.body.el) {
                console.log("Colisión con:", event.detail.body.el);
                
                // Verificar si la colisión es con la mano
                if (event.detail.body.el.hasAttribute('hand-tracking-controls')) {
                    console.log("Colisión con la mano detectada");
                    // Disparar un evento personalizado
                    self.el.emit('hand-collision', {hand: event.detail.body.el});
                }
            }
        });
        
        // Colisiones OBB
        this.el.addEventListener("obbcollisionstarted", function (event) {
            console.log("Detector: Comienzo de colisión OBB", self.el);
            if (event.detail && event.detail.body && event.detail.body.el) {
                console.log("Colisión OBB con:", event.detail.body.el);
                
                // Verificar si la colisión es con la mano
                if (event.detail.body.el.hasAttribute('hand-tracking-controls')) {
                    console.log("Colisión OBB con la mano detectada");
                    // Disparar un evento personalizado
                    self.el.emit('hand-collision', {hand: event.detail.body.el});
                }
            }
        });
        
        // Colisiones del sphere-collider
        this.el.addEventListener("collisions", function (event) {
            console.log("Detector: Colisiones de sphere-collider detectadas", self.el);
            console.log("Colisiones con:", event.detail.els);
            
            // Verificar colisiones con la mano
            event.detail.els.forEach(function(el) {
                if (el.hasAttribute('hand-tracking-controls')) {
                    console.log("Colisión sphere-collider con la mano detectada");
                    self.el.emit('hand-collision', {hand: el});
                }
            });
        });
        
        // Otros eventos
        this.el.addEventListener("obbcollisionended", function () {
            console.log("Detector: Fin de colisión", self.el);
        });
        
        this.el.addEventListener("pinchstarted", function () {
            console.log("Detector: Comienzo de pellizco", self.el);
        });
        
        this.el.addEventListener("pinchended", function () {
            console.log("Detector: Fin de pellizco", self.el);
        });
    }
});