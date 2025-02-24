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
        var offset = new THREE.Vector3();

        el.addEventListener('click', function () {
            if (!menuPanel) { 
                var parentPosition = el.getAttribute('position');
                var newPosition = { x: parentPosition.x, y: parentPosition.y + 2, z: parentPosition.z + 2 };

                menuPanel = document.createElement('a-box');
                menuPanel.setAttribute('width', data.width);
                menuPanel.setAttribute('height', data.height);
                menuPanel.setAttribute('depth', data.depth);
                menuPanel.setAttribute('color', data.color);
                menuPanel.setAttribute('position', newPosition);

                // Botón rojo para cerrar
                const closeButton = document.createElement('a-plane');
                closeButton.setAttribute('width', '0.2');
                closeButton.setAttribute('height', '0.2');
                closeButton.setAttribute('color', 'red');
                closeButton.setAttribute('position', '0.4 0.4 0.06');

                // EVENTO PARA INICIAR EL ARRASTRE
                menuPanel.addEventListener('mousedown', function (event) {
                    isDragging = true;
                    let panelPos = menuPanel.object3D.position;
                    offset.set(
                        event.detail.intersection.point.x - panelPos.x,
                        event.detail.intersection.point.y - panelPos.y,
                        event.detail.intersection.point.z - panelPos.z
                    );
                });

                // EVENTO PARA MOVER EL PANEL
                scene.addEventListener('mousemove', function (event) {
                    if (isDragging && event.detail.intersection) {
                        let newPos = event.detail.intersection.point;
                        menuPanel.object3D.position.set(
                            newPos.x - offset.x,
                            newPos.y - offset.y,
                            newPos.z - offset.z
                        );
                    }
                });

                // EVENTO PARA TERMINAR EL ARRASTRE
                scene.addEventListener('mouseup', function () {
                    isDragging = false;
                });

                // Evento para cerrar el menú
                closeButton.addEventListener('click', function () {
                    if (menuPanel && menuPanel.parentNode) {
                        menuPanel.parentNode.removeChild(menuPanel);
                        menuPanel = null;
                    }
                });

                menuPanel.appendChild(closeButton);
                scene.appendChild(menuPanel);
            }
        });
    }
});
