/* global AFRAME */
AFRAME.registerComponent('submenu', {
  init: function () {
    var el = this.el;
    var mainMenu = document.getElementById('menu');
    var startButton = document.getElementById('cylinderButon');

    // Crear el fondo del submenú (similar al menú principal)
    var submenuBackgroundEl = document.createElement('a-entity');
    submenuBackgroundEl.setAttribute('geometry', {
      primitive: 'box',
      width: 0.6,
      height: 0.40,
      depth: 0.01
    });
    submenuBackgroundEl.setAttribute('material', {
      color: 'darkgray'
    });
    submenuBackgroundEl.setAttribute('position', '0 0 -0.025');
    el.appendChild(submenuBackgroundEl);

    // Crear botones del submenú
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

    var button3 = document.createElement('a-entity');
    button3.setAttribute('id', 'submenuBackButton');
    button3.setAttribute('button', 'label: Volver');
    button3.setAttribute('position', '0 -0.10 0');
    button3.setAttribute('pressable', '');

    // Añadir botones al submenú
    el.appendChild(button1);
    el.appendChild(button2);
    el.appendChild(button3);

    // Añadir atributo de visibilidad
    el.setAttribute('visible', 'false');

    // Registro de eventos en el submenu
    console.log('Submenu component initialized');
  }
});