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
        let el_raycaster = this.el.querySelector('[raycaster]');
        console.log("Pellizcaemite (raycaster):", el_raycaster);
        this.el.addEventListener("pinchstarted", function () {
            console.log("Pellizcaemite: Comienzo de pellizco");
            let intersectedEls = el_raycaster.components['raycaster'].intersectedEls;
            console.log("Pellizcaemite (intersected):", intersectedEls);
            for (const intersectedEl of intersectedEls) {
                intersectedEl.emit(self.data.evento);
            }
        });
    }
});
