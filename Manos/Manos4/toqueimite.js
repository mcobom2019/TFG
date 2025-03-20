// Componente toqueimite: detecta proximidad del dedo índice y emite eventos
AFRAME.registerComponent("toqueimite", {
    schema: {
        evento: { type: "string", default: "click" },
        distancia: { type: "number", default: 0.05 } // Distancia de detección en metros
    },
    init: function () {
        console.log("Toqueimite: init");
        this.tick = AFRAME.utils.throttleTick(this.tick, 100, this);
        this.dedoIndice = null;
        this.objetivos = document.querySelectorAll(".clickable");
        
        // Intentar encontrar el dedo índice cuando la mano se conecte
        this.el.addEventListener('model-loaded', this.buscarDedoIndice.bind(this));
    },
    
    buscarDedoIndice: function() {
        // Intentar encontrar el hueso del dedo índice
        const modelo = this.el.getObject3D('mesh');
        if (modelo) {
            modelo.traverse((node) => {
                if (node.name && node.name.toLowerCase().includes('index') && 
                    node.name.toLowerCase().includes('tip')) {
                    console.log("Toqueimite: Encontrado dedo índice", node.name);
                    this.dedoIndice = node;
                }
            });
        }
        
        // Si no se ha encontrado, usar la propia entidad como referencia
        if (!this.dedoIndice) {
            console.log("Toqueimite: No se encontró dedo índice, usando entidad completa");
            this.dedoIndice = this.el.object3D;
        }
    },
    
    tick: function() {
        if (!this.dedoIndice) return;
        
        const posicionDedo = new THREE.Vector3();
        this.dedoIndice.getWorldPosition(posicionDedo);
        
        // Comprobar distancia con cada objetivo clickable
        this.objetivos.forEach(objetivo => {
            const posicionObjetivo = new THREE.Vector3();
            objetivo.object3D.getWorldPosition(posicionObjetivo);
            
            const distancia = posicionDedo.distanceTo(posicionObjetivo);
            
            if (distancia < this.data.distancia) {
                console.log("Toqueimite: Tocando objeto", objetivo.id, "distancia:", distancia);
                objetivo.emit(this.data.evento);
            }
        });
    }
});