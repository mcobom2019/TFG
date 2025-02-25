AFRAME.registerComponent('createsons', {
    init: function () {
        var el = this.el;
        var scene = document.querySelector("a-scene");
        var menuPanel = null;
        var submenuPanel = null;
        var barChartEntity = null;
        var barsEntity = null;
        var pieChartEntity = null;
        var pieEntity = null;
        var isBarChartVisible = false;
        var isPieChartVisible = false;

        el.addEventListener('click', function () {
            if (!menuPanel) {
                var parentPosition = el.getAttribute('position');
                var newPosition = { x: parentPosition.x, y: parentPosition.y + 1.5, z: parentPosition.z };

                // Crear menú principal
                menuPanel = document.createElement('a-box');
                menuPanel.setAttribute('width', '1');
                menuPanel.setAttribute('height', '0.7');
                menuPanel.setAttribute('depth', '0.1');
                menuPanel.setAttribute('color', '#333');
                menuPanel.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);

                // Botón gráfico de barras
                var barChartButton = document.createElement('a-plane');
                barChartButton.setAttribute('width', '0.6');
                barChartButton.setAttribute('height', '0.2');
                barChartButton.setAttribute('color', 'blue');
                barChartButton.setAttribute('position', '0 0.1 0.06');
                barChartButton.setAttribute('text', 'value: Barras; color: white; align: center; width: 1.5;');

                // Botón gráfico circular
                var pieChartButton = document.createElement('a-plane');
                pieChartButton.setAttribute('width', '0.6');
                pieChartButton.setAttribute('height', '0.2');
                pieChartButton.setAttribute('color', 'blue');
                pieChartButton.setAttribute('position', '0 -0.2 0.06');
                pieChartButton.setAttribute('text', 'value: Circular; color: white; align: center; width: 1.5;');

                // Cerrar menú principal
                var closeButton = document.createElement('a-plane');
                closeButton.setAttribute('width', '0.2');
                closeButton.setAttribute('height', '0.2');
                closeButton.setAttribute('color', 'red');
                closeButton.setAttribute('position', '0.4 0.3 0.06');
                closeButton.setAttribute('text', 'value: X; color: white; align: center;');

                // Evento de cierre del menú
                closeButton.addEventListener('click', function () {
                    cerrarMenus();
                });

                // Evento para mostrar submenú (Barras)
                barChartButton.addEventListener('click', function () {
                    mostrarSubmenu("Barras");
                });

                // Evento para mostrar submenú (Circular)
                pieChartButton.addEventListener('click', function () {
                    mostrarSubmenu("Circular");
                });

                menuPanel.appendChild(barChartButton);
                menuPanel.appendChild(pieChartButton);
                menuPanel.appendChild(closeButton);
                scene.appendChild(menuPanel);
            }
        });

        // Función para cerrar menús y gráficos
        function cerrarMenus() {
            if (menuPanel && menuPanel.parentNode) {
                scene.removeChild(menuPanel);
                menuPanel = null;
            }
            if (submenuPanel && submenuPanel.parentNode) {
                scene.removeChild(submenuPanel);
                submenuPanel = null;
            }
            if (barChartEntity && barChartEntity.parentNode) {
                scene.removeChild(barChartEntity);
                scene.removeChild(barsEntity);
                barChartEntity = null;
                barsEntity = null;
                isBarChartVisible = false;
            }
            if (pieChartEntity && pieChartEntity.parentNode) {
                scene.removeChild(pieChartEntity);
                scene.removeChild(pieEntity);
                pieChartEntity = null;
                pieEntity = null;
                isPieChartVisible = false;
            }
        }

        // Función para mostrar el submenú
        function mostrarSubmenu(tipo) {
            if (menuPanel && menuPanel.parentNode) {
                scene.removeChild(menuPanel);
                menuPanel = null;
            }

            var parentPosition = el.getAttribute('position');
            var newPosition = { x: parentPosition.x, y: parentPosition.y + 1.5, z: parentPosition.z };

            // Crear el submenú
            submenuPanel = document.createElement('a-box');
            submenuPanel.setAttribute('width', '1');
            submenuPanel.setAttribute('height', '0.9');
            submenuPanel.setAttribute('depth', '0.1');
            submenuPanel.setAttribute('color', '#222');
            submenuPanel.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);

            // Botón de regreso
            var backButton = document.createElement('a-plane');
            backButton.setAttribute('width', '0.2');
            backButton.setAttribute('height', '0.2');
            backButton.setAttribute('color', 'orange');
            backButton.setAttribute('position', '-0.4 0.35 0.06');
            backButton.setAttribute('text', 'value: ←; color: white; align: center;');
            backButton.addEventListener('click', function () {
                if (submenuPanel && submenuPanel.parentNode) {
                    scene.removeChild(submenuPanel);
                    submenuPanel = null;
                }
                el.click(); // Vuelve a abrir el menú principal
            });

            // Crear opciones dentro del submenú
            var option1 = crearBotonSubmenu("Opción 1", "0 0.2 0.06");
            var option2 = crearBotonSubmenu("Opción 2", "0 0 0.06");
            var option3 = crearBotonSubmenu("Opción 3", "0 -0.2 0.06");

            // Agregar botones al submenú
            submenuPanel.appendChild(backButton);
            submenuPanel.appendChild(option1);
            submenuPanel.appendChild(option2);
            submenuPanel.appendChild(option3);
            scene.appendChild(submenuPanel);
        }

        // Función para crear botones del submenú
        function crearBotonSubmenu(texto, posicion) {
            var button = document.createElement('a-plane');
            button.setAttribute('width', '0.6');
            button.setAttribute('height', '0.2');
            button.setAttribute('color', 'green');
            button.setAttribute('position', posicion);
            button.setAttribute('text', `value: ${texto}; color: white; align: center; width: 1.5;`);
            button.addEventListener('click', function () {
                console.log(`Has seleccionado: ${texto}`);
            });
            return button;
        }
    }
});
