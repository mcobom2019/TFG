// Componente laser-hands
// Permite que los eventos de pinch cuando el láser apunta a objetos activen eventos de clic
AFRAME.registerComponent("laser-hands", {
  init: function () {
    console.log("Laser-hands: init");
    let el = this.el;
    
    // Referencia al raycaster
    let raycaster = null;
    
    // Esperar a que el raycaster esté disponible
    if (el.components.raycaster) {
      raycaster = el.components.raycaster;
    } else {
      el.addEventListener('componentinitialized', function (evt) {
        if (evt.detail.name === 'raycaster') {
          raycaster = el.components.raycaster;
        }
      });
    }
    
    // Escuchar eventos de pinch
    el.addEventListener("pinchstarted", function () {
      console.log("Laser-hands: Detectado pinch");
      if (raycaster && raycaster.intersectedEls && raycaster.intersectedEls.length > 0) {
        const intersectedEl = raycaster.intersectedEls[0];
        console.log("Laser-hands: Apuntando a:", intersectedEl);
        // Emitir clic en el elemento apuntado
        intersectedEl.emit('click');
      } else {
        console.log("Laser-hands: No hay intersección o raycaster no disponible");
      }
    });
  }
});