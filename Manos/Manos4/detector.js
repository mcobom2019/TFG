// Componente detector
// Detecta cuando se pulsa el botón del ratón sobre un componente,
// cuándo se produce una colisión, o cuándo se hace el gesto "pinch".

AFRAME.registerComponent("detector", {
    init: function () {
        let self = this;
        console.log("Detector: init en", self.el);
        
        this.el.addEventListener("click", function () {
            console.log("Detector: Botón pulsado", self.el);
        });
        
        // Mejorar los manejadores de eventos de colisión
        this.el.addEventListener("collide", function (event) {
            console.log("Detector: Colisión general detectada", self.el);
            console.log("Elemento colisionado:", event.detail.body.el);
        });
        
        this.el.addEventListener("obbcollisionstarted", function (event) {
            console.log("Detector: Comienzo de colisión OBB", self.el);
            if (event.detail && event.detail.body && event.detail.body.el) {
                console.log("Colisión con:", event.detail.body.el);
            }
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