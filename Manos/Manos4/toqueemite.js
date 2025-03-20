// Componente toqueimite: emite eventos cuando se produce una colisión con el dedo índice
// Cuando se produce una colisión entre el dedo índice y un objeto, emite el evento indicado
// sobre todas las entidades con las cuales haya intersección.
// Se debe usar junto con hand-tracking-controls para la mano derecha
AFRAME.registerComponent("toqueimite", {
    schema: {
        evento: { type: "string", default: "click" },
    },
    init: function () {
        console.log("Toqueimite: init");
        let self = this;
        
        // Encontrar el raycaster hijo
        let el_raycaster = this.el.querySelector('[raycaster]');
        console.log("Toqueimite (raycaster):", el_raycaster);
        
        if (!el_raycaster) {
            console.error("Toqueimite: No se encontró entidad con raycaster");
            return;
        }
        
        // Escuchar el evento de colisión con el dedo índice
        this.el.addEventListener("obbcollisionstarted", function (event) {
            console.log("Toqueimite: Colisión detectada", event.detail);
            
            // Verificar si la colisión es con el dedo índice de la mano derecha
            // Nota: Es posible que necesites adaptar esta verificación según la estructura de tu escena
            if (event.detail && event.detail.target && event.detail.target.id === "rightHand" ||
                (self.el.getAttribute('hand-tracking-controls') && 
                 self.el.getAttribute('hand-tracking-controls').hand === "right")) {
                
                console.log("Toqueimite: Colisión con mano derecha");
                
                // Esperar a que el componente raycaster esté disponible
                if (el_raycaster.components && el_raycaster.components.raycaster) {
                    let intersectedEls = el_raycaster.components.raycaster.intersectedEls;
                    console.log("Toqueimite (intersected):", intersectedEls);
                    
                    // Emitir el evento en todos los elementos intersectados
                    for (const intersectedEl of intersectedEls) {
                        console.log("Toqueimite: Emitiendo", self.data.evento, "en", intersectedEl);
                        intersectedEl.emit(self.data.evento);
                    }
                } else {
                    console.error("Toqueimite: Componente raycaster no disponible");
                }
            }
        });
    }
});