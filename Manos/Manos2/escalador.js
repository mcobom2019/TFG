// Componente escalador
// Cambia la escala del objeto cuando se dispara un evento.

AFRAME.registerComponent("escalador", {
    schema: {
        evento: { type: "string", default: "click" },
        factor: { type: "number", default: 2 },
    },
    multiple: true,
    init: function () {
        console.log("Escalador: init");
        let el = this.el;
        let self = this;
        let factor = this.data.factor;
        self.original = true;
        let escala_original = structuredClone(el.getAttribute('scale'));
        let escala_cambiada = {
            x: escala_original.x * factor,
            y: escala_original.y * factor,
            z: escala_original.z * factor
        };
        el.addEventListener(this.data.evento, function () {
            console.log("Escalador: Evento disparado");
            if (self.original) {
                el.setAttribute('scale', escala_cambiada);
                self.original = false;
            } else {
                el.setAttribute('scale', escala_original);
                self.original = true;
            };
        });
    }
});
