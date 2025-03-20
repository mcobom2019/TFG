// Archivo: manos-touch.js
AFRAME.registerComponent('manos-touch', {
  init: function() {
    let self = this;
    let boton = document.querySelector('#boton3D');
    
    // Comprobar si tenemos acceso a las manos
    if (navigator.xr) {
      // Crear un elemento para visualizar el dedo índice (opcional)
      let indicador = document.createElement('a-sphere');
      indicador.setAttribute('radius', '0.02');
      indicador.setAttribute('color', 'blue');
      indicador.setAttribute('opacity', '0.5');
      indicador.setAttribute('visible', 'false');
      this.el.appendChild(indicador);
      this.indicador = indicador;
      
      // Configurar el evento de frame
      this.tick = AFRAME.utils.throttleTick(this.tick, 100, this);
    } else {
      console.warn('WebXR no está disponible para seguimiento de manos');
    }
  },
  
  tick: function() {
    let boton = document.querySelector('#boton3D');
    if (!boton) return;
    
    let mano = this.el;
    let botonPosition = new THREE.Vector3();
    let manoPosition = new THREE.Vector3();
    
    // Obtener posiciones
    boton.object3D.getWorldPosition(botonPosition);
    mano.object3D.getWorldPosition(manoPosition);
    
    // Calcular distancia
    let distancia = botonPosition.distanceTo(manoPosition);
    
    // Si la distancia es menor que un umbral, simular un clic
    if (distancia < 0.2) {
      console.log("Mano cerca del botón, simulando clic");
      boton.emit('click');
      
      // Mostrar indicador visual (opcional)
      if (this.indicador) {
        this.indicador.setAttribute('visible', 'true');
        this.indicador.setAttribute('position', `${botonPosition.x} ${botonPosition.y} ${botonPosition.z}`);
        
        // Ocultar después de un breve tiempo
        setTimeout(() => {
          this.indicador.setAttribute('visible', 'false');
        }, 500);
      }
      
      // Desactivar temporalmente para evitar múltiples clics
      this.tick = () => {};
      setTimeout(() => {
        this.tick = AFRAME.utils.throttleTick(this.tick, 100, this);
      }, 1000);
    }
  }
});