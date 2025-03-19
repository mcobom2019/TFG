// Component laser-hands, similar to laser-controls, but with hand tracking
// This version includes the creation of hand-tracking-controls and raycaster
// if they are not already created
AFRAME.registerComponent('laser-hands', {
    schema: {
        hand: {type: 'string', default: 'right'},
        event: {type: 'string', default: 'click'},
        objects: {type: 'string', default: ''},
    },
    dependencies: ['hand-tracking-controls'],
    init: function () {
        console.log("laser-hands: init");
        let self = this;
        let el = this.el;

        if ('hand-tracking-controls' in this.el.components){
            console.log("laser-hands: hand-tracking-controls ya creado");
        } else {
            this.el.setAttribute('hand-tracking-controls',
                {hand: self.data.hand});
        }
        
        this.raycaster_el = null;
    
        this.el.addEventListener('controllerconnected', function (event) {
            console.log("laser-hands: Controlador conectado",
                event.detail.name);

            if (self.raycaster_el) {
                self.raycaster_el.object3D.visible = true;
            } else {
                self.raycaster_el = self.el.querySelector('[raycaster]');
                console.log("raycaster: ", self.raycaster_el);
                if (! self.raycaster_el) {
                    self.raycaster_el= document.createElement('a-entity');
                    self.raycaster_el.setAttribute('raycaster',
                        {showLine: true, lineColor: 'blue', objects: self.data.objects});
                };
                el.appendChild(self.raycaster_el);
            };
        });

        this.el.addEventListener('controllerdisconnected', function (event) {
            console.log("laser-hands: Controlador desconectado",
                event.detail.name);
            if (self.raycaster_el) {
                self.raycaster_el.object3D.visible = false;
            };
        });

        this.el.addEventListener("pinchstarted", function () {
            console.log("laser-hands: Comienzo de pellizco");
            let intersected_els = self.raycaster_el.components['raycaster'].intersectedEls;
            console.log("laser-hands (intersected):", intersected_els);
            for (const intersected_el of intersected_els) {
                console.log("laser-hands (emit):", intersected_el);
                intersected_el.emit(self.data.event);
            }
        });
    },
})