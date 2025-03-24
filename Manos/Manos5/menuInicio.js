AFRAME.registerComponent('menuinicio', {
  init: function () {
    var el = this.el;
    var scene = document.querySelector("a-scene");
    
    // Crear fondo del menú
    var menuBackGroundEl = document.createElement('a-entity');
    menuBackGroundEl.setAttribute('geometry', {
      primitive: 'box',
      width: 0.6,
      height: 0.40,
      depth: 0.01
    });
    menuBackGroundEl.setAttribute('material', {
      color: 'gray'
    });
    menuBackGroundEl.setAttribute('position', '0 0 -0.025');
    el.appendChild(menuBackGroundEl);
    
    // Hacer que el elemento principal sea agarrable explícitamente
    el.setAttribute('class', 'grabable');
    
    // Estos atributos son clave para el componente de agarre
    el.setAttribute('dynamic-body', 'mass: 0');
    el.setAttribute('grabbable', '');
    
    console.log("Menu inicio configurado para ser agarrable");
    
    // Escuchar eventos de agarre
    el.addEventListener('grab-start', function(evt) {
      console.log("Menu inicio: grab start");
    });
    
    el.addEventListener('grab-end', function(evt) {
      console.log("Menu inicio: grab end");
    });
  }
});