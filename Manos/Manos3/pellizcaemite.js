// Componente pellizcaemite: emite eventos cuando se produce un pellizco
// Cuando se produce un pellizco, emite el evento indicado sobre todas
// las entidades con las cuales haya intersección con el raycaster.
// Debe haber una entidad con raycaster como descendiente de la entidad
// donde está el componente

AFRAME.registerComponent("pellizcaemite", {
    schema: {
        evento: { type: "string", default: "click" },
    },
    init: function () {
        console.log("Pellizcaemite: init");
        let self = this;
        
        // Encontrar el raycaster hijo
        let el_raycaster = this.el.querySelector('[raycaster]');
        console.log("Pellizcaemite (raycaster):", el_raycaster);
        
        if (!el_raycaster) {
            console.error("Pellizcaemite: No se encontró entidad con raycaster");
            return;
        }
        
        // Escuchar el evento de pellizco
        this.el.addEventListener("pinchstarted", function () {
            console.log("Pellizcaemite: Comienzo de pellizco");
            
            // Esperar a que el componente raycaster esté disponible
            if (el_raycaster.components && el_raycaster.components.raycaster) {
                let intersectedEls = el_raycaster.components.raycaster.intersectedEls;
                console.log("Pellizcaemite (intersected):", intersectedEls);
                
                // Emitir el evento en todos los elementos intersectados
                for (const intersectedEl of intersectedEls) {
                    console.log("Pellizcaemite: Emitiendo", self.data.evento, "en", intersectedEl);
                    intersectedEl.emit(self.data.evento);
                }
            } else {
                console.error("Pellizcaemite: Componente raycaster no disponible");
            }
        });
    }
});