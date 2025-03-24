/* global AFRAME */
AFRAME.registerComponent('menuinicio', {
  init: function () {
    var el = this.el;
    
    // Hacemos que todo el elemento principal sea agarrable
    el.setAttribute('grabbable', '');
    
    // Creamos el fondo del menú como hijo
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
    
    // Ya no hacemos el fondo agarrable, sino todo el contenedor
    // menuBackGroundEl.setAttribute('grabbable', '');
    
    el.appendChild(menuBackGroundEl);
    
    // Los botones deberán ser añadidos como hijos del elemento principal (el)
    // en tu código HTML o JavaScript donde creas los botones
  }
});