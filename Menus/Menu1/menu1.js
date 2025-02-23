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
                var newPosition = `${parentPosition.x} ${parentPosition.y+2} ${parentPosition.z+2}`;
              
                const menuPanel = document.createElement('a-box');
                menuPanel.setAttribute('width', data.width);
                menuPanel.setAttribute('height', data.height);
                menuPanel.setAttribute('depth', data.depth);
                menuPanel.setAttribute('color', data.color);
                menuPanel.setAttribute("position", newPosition);
              
                const closeButton = document.createElement('a-plane');
                closeButton.setAttribute('width', '0.2');
                closeButton.setAttribute('height', '0.2');
                closeButton.setAttribute('color', 'red');
                closeButton.setAttribute('position', '0.4 0.4 0.06');
                menuPanel.appendChild(closeButton);
                el.appendChild(menuPanel);
                ok = true;
              
                closeButton.addEventListener('click', function () {
                    // Eliminar correctamente el menú
                    if (menuPanel && menuPanel.parentNode) {
                        menuPanel.parentNode.removeChild(menuPanel);
                        menuPanel = null;
                        ok = false;
                    }
                });
            }
            
        });
    }
});
