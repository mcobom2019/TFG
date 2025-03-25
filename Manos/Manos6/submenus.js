/* global AFRAME */
AFRAME.registerComponent('submenu', {
  init: function () {
    var el = this.el;
    
    // Aplicar el componente menu para crear el fondo gris
    var submenuBackgroundEl = document.createElement('a-entity');
    submenuBackgroundEl.setAttribute('menu', '');
    submenuBackgroundEl.setAttribute('position', '0 0 -0.025');
    
    // Crear los botones del submenú
    var button1 = document.createElement('a-entity');
    button1.setAttribute('id', 'submenuButton1');
    button1.setAttribute('button', 'label: Opción 1');
    button1.setAttribute('position', '-0.15 0.10 0');
    button1.setAttribute('pressable', '');

    var button2 = document.createElement('a-entity');
    button2.setAttribute('id', 'submenuButton2');
    button2.setAttribute('button', 'label: Opción 2');
    button2.setAttribute('position', '0 0 0');
    button2.setAttribute('pressable', '');

    var backButton = document.createElement('a-entity');
    backButton.setAttribute('id', 'submenuBackButton');
    backButton.setAttribute('button', 'label: Volver');
    backButton.setAttribute('position', '0 -0.10 0');
    backButton.setAttribute('pressable', '');

    // Añadir fondo y botones al submenú
    el.appendChild(submenuBackgroundEl);
    el.appendChild(button1);
    el.appendChild(button2);
    el.appendChild(backButton);
  }
});