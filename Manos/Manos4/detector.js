// Componente detector
// Detecta cuando se pulsa el botón del ratón sobre un componente,
// o cuando la mano interactúa con el componente.

AFRAME.registerComponent("detector", {
    init: function () {
        let self = this;
        console.log("Detector: init");
        
        // Mantener eventos de click (para ratón y controladores)
        this.el.addEventListener("click", function () {
            console.log("Detector: Botón pulsado", self.el);
        });
        
        // Estos eventos se mantienen para compatibilidad
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