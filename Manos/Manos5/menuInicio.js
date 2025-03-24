AFRAME.registerComponent('menuinicio', {
  init: function () {
    var el = this.el;
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
    
    // El fondo no necesita ser grabbable
    el.appendChild(menuBackGroundEl);
    
    // Aplicamos grabbable solo al elemento principal
    el.setAttribute('hand-tracking-grab-target', '');
    
    // Registramos eventos para mantener la posición
    el.addEventListener('grabstart', function() {
      console.log("Iniciando agarre de menú inicial");
    });
    
    el.addEventListener('grabend', function() {
      console.log("Finalizando agarre de menú inicial");
      // Guardamos la posición actual
      var position = el.getAttribute('position');
      el.setAttribute('position', position);
    });
  }
});