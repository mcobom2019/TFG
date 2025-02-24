AFRAME.registerComponent('createsons', {
    schema: {
        width: { type: 'number', default: 1 },
        height: { type: 'number', default: 1 },
        depth: { type: 'number', default: 0.1 },
        color: { type: 'string', default: '#333' }
    },
    init: function () {
        var el = this.el;
        var scene = document.querySelector("a-scene");
        var menuPanel = null;
        var isDragging = false;
        var offset = new THREE.Vector3();
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
        
        el.addEventListener('click', function () {
            if (!menuPanel) { 
                var pos = el.getAttribute('position');
                menuPanel = document.createElement('a-box');
                menuPanel.setAttribute('width', 1);
                menuPanel.setAttribute('height', 1);
                menuPanel.setAttribute('depth', 0.1);
                menuPanel.setAttribute('color', '#333');
                menuPanel.setAttribute('position', `${pos.x} ${pos.y + 2} ${pos.z + 2}`);
                
                var closeButton = document.createElement('a-plane');
                closeButton.setAttribute('width', '0.2');
                closeButton.setAttribute('height', '0.2');
                closeButton.setAttribute('color', 'red');
                closeButton.setAttribute('position', '0.4 0.4 0.06');
                
                closeButton.addEventListener('click', function () {
                    scene.removeChild(menuPanel);
                    menuPanel = null;
                });

                // Detectar inicio de arrastre
                menuPanel.addEventListener('mousedown', function (event) {
                    isDragging = true;
                    let panelPos = menuPanel.object3D.position;
                    offset.set(
                        event.detail.intersection.point.x - panelPos.x,
                        event.detail.intersection.point.y - panelPos.y,
                        event.detail.intersection.point.z - panelPos.z
                    );
                });

                // Mover el menú mientras se arrastra
                scene.addEventListener('mousemove', function (event) {
                    if (isDragging) {
                        let canvas = scene.renderer.domElement;
                        mouse.x = (event.clientX / canvas.width) * 2 - 1;
                        mouse.y = -(event.clientY / canvas.height) * 2 + 1;
                        raycaster.setFromCamera(mouse, scene.camera);

                        let intersects = raycaster.intersectObject(menuPanel.object3D, true);
                        if (intersects.length > 0) {
                            menuPanel.object3D.position.copy(intersects[0].point.clone().sub(offset));
                        }
                    }
                });

                // Finalizar el arrastre
                scene.addEventListener('mouseup', function () {
                    isDragging = false;
                });

                menuPanel.appendChild(closeButton);
                scene.appendChild(menuPanel);
            }
        });
    }
});
