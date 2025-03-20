// Componente para manejar la interacción de la mano con objetos
AFRAME.registerComponent("interaccion-mano", {
    schema: {
        mano: {type: 'string', default: 'derecha'},
        distancia: {type: 'number', default: 0.05}
    },
    
    init: function () {
        let self = this;
        console.log("Interacción mano: inicio", this.data.mano);
        
        // Crear un raycaster invisible desde el centro de la mano
        this.raycaster = document.createElement('a-entity');
        this.raycaster.setAttribute('raycaster', {
            objects: '.clickable',
            showLine: false,
            far: this.data.distancia,
            interval: 100
        });
        this.el.appendChild(this.raycaster);
        
        // Detectar si está apuntando a algo
        this.tocando = false;
        this.elementoActual = null;
        
        // Comprobar continuamente si la mano está cerca de un objeto interactivo
        this.tick = AFRAME.utils.throttleTick(this.compruebaCercania, 100, this);
    },
    
    compruebaCercania: function() {
        let intersecciones = this.raycaster.components.raycaster.intersections;
        if (intersecciones && intersecciones.length > 0) {
            let elemento = intersecciones[0].object.el;
            
            // Si estamos tocando un nuevo elemento, emitir evento
            if (!this.tocando || this.elementoActual !== elemento) {
                console.log("Interacción mano: tocando elemento", elemento);
                elemento.emit('click');
                this.tocando = true;
                this.elementoActual = elemento;
                
                // Destacar visualmente el elemento
                this.colorOriginal = elemento.getAttribute('color');
                elemento.setAttribute('color', '#ffff00');
                
                // Restaurar color después de un momento
                setTimeout(() => {
                    if (this.elementoActual && this.colorOriginal) {
                        this.elementoActual.setAttribute('color', this.colorOriginal);
                    }
                }, 300);
            }
        } else {
            // Ya no estamos tocando nada
            this.tocando = false;
            this.elementoActual = null;
        }
    }
});