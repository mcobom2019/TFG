AFRAME.registerComponent('createsons', {
    init: function () {
        var el = this.el;
        var scene = document.querySelector("a-scene");
        var menuPanel = null;
        var subMenu = null;
        var barChartEntity = null;
        var barsEntity = null;
        var isBarChartVisible = false;
        var pieChartEntity = null;
        var pieEntity = null;
        var isPieChartVisible = false;

        el.addEventListener('click', function () {
            if (!menuPanel) {
                var parentPosition = el.getAttribute('position');
                var newPosition = { x: parentPosition.x, y: parentPosition.y + 1.5, z: parentPosition.z };

                // Crear el menú principal
                menuPanel = document.createElement('a-box');
                menuPanel.setAttribute('width', '1');
                menuPanel.setAttribute('height', '0.7');
                menuPanel.setAttribute('depth', '0.1');
                menuPanel.setAttribute('color', '#333');
                menuPanel.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);

                // Botón gráfico de barras
                var barChartButton = crearBoton("Barras", "0 0.1 0.06", function () {
                    mostrarSubmenu("Barras");
                });

                // Botón gráfico circular
                var pieChartButton = crearBoton("Circular", "0 -0.2 0.06", function () {
                    mostrarSubmenu("Circular");
                });

                // Botón cerrar menú
                var closeButton = crearBoton("X", "0.4 0.3 0.06", cerrarMenus, "red", "0.2");

                menuPanel.appendChild(barChartButton);
                menuPanel.appendChild(pieChartButton);
                menuPanel.appendChild(closeButton);
                scene.appendChild(menuPanel);
            }
        });

        function cerrarMenus() {
            if (menuPanel && menuPanel.parentNode) {
                menuPanel.parentNode.removeChild(menuPanel);
                menuPanel = null;
            }
            if (subMenu && subMenu.parentNode) {
                scene.removeChild(subMenu);
                subMenu = null;
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

        function mostrarSubmenu(tipo) {
            if (menuPanel && menuPanel.parentNode) {
                menuPanel.parentNode.removeChild(menuPanel);
                menuPanel = null;
            }
            var parentPosition = el.getAttribute('position');
            var newPosition = { x: parentPosition.x, y: parentPosition.y + 1.5, z: parentPosition.z };

            subMenu = document.createElement('a-box');
            subMenu.setAttribute('width', '1');
            subMenu.setAttribute('height', '0.7');
            subMenu.setAttribute('depth', '0.1');
            subMenu.setAttribute('color', '#333');
            subMenu.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);

            var backButton = crearBoton("←", "0.4 0.3 0.06", function () {
                if (subMenu && subMenu.parentNode) {
                    subMenu.parentNode.removeChild(subMenu);
                    subMenu = null;
                }
                el.click();
            }, "red", "0.2");

            var option1 = crearBoton("Completo", "0 0.2 0.06", function () {
                mostrarGrafico(tipo, "Completo");
            });

            var option2 = crearBoton("Diesel", "0 0 0.06", function () {
                mostrarGrafico(tipo, "Diesel");
            });

            var option3 = crearBoton("5 Puertas", "0 -0.2 0.06", function () {
                mostrarGrafico(tipo, "5 Puertas");
            });

            subMenu.appendChild(backButton);
            subMenu.appendChild(option1);
            subMenu.appendChild(option2);
            subMenu.appendChild(option3);
            scene.appendChild(subMenu);
        }

        function crearBoton(texto, posicion, onClick, color = "blue", size = "0.6") {
            var button = document.createElement('a-plane');
            button.setAttribute('width', size);
            button.setAttribute('height', '0.2');
            button.setAttribute('color', color);
            button.setAttribute('position', posicion);
            button.setAttribute('text', `value: ${texto}; color: white; align: center; width: 1.5;`);
            button.addEventListener('click', onClick);
            return button;
        }

        function mostrarGrafico(tipo, opcion) {
            if (tipo === "Barras") {
                if (!isBarChartVisible) {
                    barChartEntity = document.createElement('a-entity');
                    barChartEntity.setAttribute('id', 'data');
                    barChartEntity.setAttribute('babia-queryjson', `url: ./data.json; path: ${opcion.toLowerCase()}`);

                    barsEntity = document.createElement('a-entity');
                    barsEntity.setAttribute('babia-barsmap', 'from: data; legend: true; palette: ubuntu; x_axis: model; z_axis: color; height: sales');
                    barsEntity.setAttribute('position', `3 -2 0`);
                    barsEntity.setAttribute('scale', '0.2 0.2 0.2');

                    scene.appendChild(barChartEntity);
                    scene.appendChild(barsEntity);

                    isBarChartVisible = true;
                } else {
                    scene.removeChild(barChartEntity);
                    scene.removeChild(barsEntity);
                    barChartEntity = null;
                    barsEntity = null;
                    isBarChartVisible = false;
                }
            } else if (tipo === "Circular") {
                if (!isPieChartVisible) {
                    pieChartEntity = document.createElement('a-entity');
                    pieChartEntity.setAttribute('id', 'data2');
                    pieChartEntity.setAttribute('babia-queryjson', `url: ./data.json; path: ${opcion.toLowerCase()}`);

                    pieEntity = document.createElement('a-entity');
                    pieEntity.setAttribute('babia-pie', 'from: data2; legend: true; palette: blues; key: model; size: doors;');
                    pieEntity.setAttribute('position', `7 -1 0`);
                    pieEntity.setAttribute('scale', '0.8 0.8 0.8');
                    pieEntity.setAttribute('rotation', '90 0 0');

                    scene.appendChild(pieChartEntity);
                    scene.appendChild(pieEntity);

                    isPieChartVisible = true;
                } else {
                    scene.removeChild(pieChartEntity);
                    scene.removeChild(pieEntity);
                    pieChartEntity = null;
                    pieEntity = null;
                    isPieChartVisible = false;
                }
            }
        }
    }
});
