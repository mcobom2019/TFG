AFRAME.registerComponent('createsons', {
    schema: {
        width: { type: 'number', default: 1 },
        height: { type: 'number', default: 1 },
        depth: { type: 'number', default: 0.1 },
        color: { type: 'string', default: '#333' }
    },

    init: function () {
        var el = this.el;
        var data = this.data;
        var scene = document.querySelector("a-scene");
        var menuPanel = null;
        var isDragging = false;
        var lastMousePosition = { x: 0, y: 0 };

        el.addEventListener('click', function (event) {
            if (menuPanel) return; // Si ya existe un menú, no crear otro

            var parentPosition = el.getAttribute('position');
            var newPosition = `${parentPosition.x} ${parentPosition.y + 2} ${parentPosition.z + 2}`;

            // **Crear menú flotante**
            menuPanel = document.createElement('a-box');
            menuPanel.setAttribute('width', data.width);
            menuPanel.setAttribute('height', data.height);
            menuPanel.setAttribute('depth', data.depth);
            menuPanel.setAttribute('color', data.color);
            menuPanel.setAttribute('position', newPosition);

            // **Evitar que el clic en el menú lo elimine**
            menuPanel.addEventListener('click', (event) => {
                event.stopPropagation(); // Bloquea el clic para que no llegue a la esfera
            });

            // **Botón de cerrar**
            const closeButton = document.createElement('a-plane');
            closeButton.setAttribute('width', '0.2');
            closeButton.setAttribute('height', '0.2');
            closeButton.setAttribute('color', 'red');
            closeButton.setAttribute('position', '0.4 0.4 0.06');

            // **Evitar que el clic en el botón rojo se propague**
            closeButton.addEventListener('click', function (event) {
                event.stopPropagation(); // Bloquea el clic para que no lo detecte la esfera
                if (menuPanel && menuPanel.parentNode) {
                    menuPanel.parentNode.removeChild(menuPanel);
                    menuPanel = null;
                }
            });

            // **Agregar botón al menú y menú a la escena**
            menuPanel.appendChild(closeButton);
            scene.appendChild(menuPanel);

            // **Habilitar movimiento del menú (Drag & Drop)**
            menuPanel.addEventListener('mousedown', (event) => {
                event.preventDefault(); // Evita comportamiento extraño del navegador
                isDragging = true;
                lastMousePosition = { x: event.clientX, y: event.clientY };
            });

            window.addEventListener('mousemove', (event) => {
                if (isDragging && menuPanel) {
                    var dx = (event.clientX - lastMousePosition.x) * 0.01;
                    var dy = (event.clientY - lastMousePosition.y) * -0.01;

                    var currentPosition = menuPanel.getAttribute('position');
                    menuPanel.setAttribute('position', {
                        x: currentPosition.x + dx,
                        y: currentPosition.y + dy,
                        z: currentPosition.z
                    });

                    lastMousePosition = { x: event.clientX, y: event.clientY };
                }
            });

            window.addEventListener('mouseup', () => {
                isDragging = false;
            });
        });
    }
});
