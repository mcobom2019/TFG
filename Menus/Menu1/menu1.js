AFRAME.registerComponent('floating-menu', {

  init: function () {
    const el = this.el;
    const data = this.data;

    // Crear panel de menú
    const menuPanel = document.createElement('a-box');
    menuPanel.setAttribute('width', data.width);
    menuPanel.setAttribute('height', data.height);
    menuPanel.setAttribute('depth', data.depth);
    menuPanel.setAttribute('color', data.color);
    menuPanel.setAttribute('position', '0 1.5 -2');
    el.appendChild(menuPanel);

    // Crear botón de cerrar
    const closeButton = document.createElement('a-plane');
    closeButton.setAttribute('width', '0.2');
    closeButton.setAttribute('height', '0.2');
    closeButton.setAttribute('color', 'red');
    closeButton.setAttribute('position', '0.4 0.4 0.06');
    menuPanel.appendChild(closeButton);

    closeButton.addEventListener('click', function () {
      el.setAttribute('visible', false);
    });

    // Agregar evento para mostrar menú
    el.sceneEl.addEventListener('menu-toggle', function () {
      el.setAttribute('visible', true);
    });
  }
});




AFRAME.registerComponent('createsons', {
    schema: {
      width: { type: 'number', default: 1 },
      height: { type: 'number', default: 1 },
      depth: { type: 'number', default: 0.1 },
      color: { type: 'string', default: '#333' }
    },
  
    init: function () {
        var el = this.el;
        const scene = document.querySelector("a-scene");
        var data = this.data;
        var ok = false;

        el.addEventListener('click', function () {
            if (!ok) {
                var parentPosition = el.getAttribute('position');
                var newMenu = document.createElement("floating-menu");
              
                newMenu.setAttribute('width', data.width);
                newMenu.setAttribute('height', data.height);
                newMenu.setAttribute('depth', data.depth);
                newMenu.setAttribute('color', data.color);
                var newPosition = `${parentPosition.x} ${parentPosition.y+2} ${parentPosition.z-1}`;
                newMenu.setAttribute("position", newPosition);

                scene.appendChild(newMenu);
                ok = true;
            }
            
        });
    }
});
