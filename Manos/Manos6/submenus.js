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
    button1.setAttribute('button', 'label: Opción 1');
    button1.setAttribute('position', '-0.15 0.10 0');

    var button2 = document.createElement('a-entity');
    button2.setAttribute('button', 'label: Opción 2');
    button2.setAttribute('position', '0 0 0');

    var button3 = document.createElement('a-entity');
    button3.setAttribute('button', 'label: Volver');
    button3.setAttribute('position', '0 -0.10 0');

    // Añadir botones al submenú
    el.appendChild(button1);
    el.appendChild(button2);
    el.appendChild(button3);

    // Ocultar submenú inicialmente
    el.setAttribute('visible', false);

    // Evento para mostrar submenú al tocar botón Start
    startButton.addEventListener('click', () => {
      mainMenu.setAttribute('visible', false);
      el.setAttribute('visible', true);
    });

    // Evento para volver al menú principal
    button3.addEventListener('click', () => {
      mainMenu.setAttribute('visible', true);
      el.setAttribute('visible', false);
    });
  }
});