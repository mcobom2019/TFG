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
        var dragOffset = { x: 0, y: 0, z: 0 };
        
        el.addEventListener('click', function () {
            if (!menuPanel) {
                var parentPosition = el.getAttribute('position');
                var newPosition = `${parentPosition.x} ${parentPosition.y + 2} ${parentPosition.z + 2}`;
                
                menuPanel = document.createElement('a-box');
                menuPanel.setAttribute('width', data.width);
                menuPanel.setAttribute('height', data.height);
                menuPanel.setAttribute('depth', data.depth);
                menuPanel.setAttribute('color', data.color);
                menuPanel.setAttribute('position', newPosition);
                menuPanel.setAttribute('class', 'draggable');
                
                const closeButton = document.createElement('a-plane');
                closeButton.setAttribute('width', '0.2');
                closeButton.setAttribute('height', '0.2');
                closeButton.setAttribute('color', 'red');
                closeButton.setAttribute('position', '0.4 0.4 0.06');
                menuPanel.appendChild(closeButton);
                scene.appendChild(menuPanel);

                // Eventos de arrastre para el menuPanel
                menuPanel.addEventListener('mousedown', function(evt) {
                    isDragging = true;
                    var menuPosition = menuPanel.getAttribute('position');
                    var intersectionPoint = evt.detail.intersection.point;
                    dragOffset = {
                        x: menuPosition.x - intersectionPoint.x,
                        y: menuPosition.y - intersectionPoint.y,
                        z: menuPosition.z - intersectionPoint.z
                    };
                });

                // Manejar el movimiento
                scene.addEventListener('mousemove', function(evt) {
                    if (isDragging && evt.detail.intersection) {
                        var point = evt.detail.intersection.point;
                        menuPanel.setAttribute('position', {
                            x: point.x + dragOffset.x,
                            y: point.y + dragOffset.y,
                            z: point.z + dragOffset.z
                        });
                    }
                });

                // Detener el arrastre
                scene.addEventListener('mouseup', function() {
                    isDragging = false;
                });
                
                closeButton.addEventListener('click', function () {
                    if (menuPanel && menuPanel.parentNode) {
                        menuPanel.parentNode.removeChild(menuPanel);
                        menuPanel = null;
                    }
                });
            }
        });
    }
});