AFRAME.registerComponent('createsons', {
    init: function () {
        var el = this.el;
        var scene = document.querySelector("a-scene");
        var menuPanel = null;
        var subMenu = null;
        var barChartEntity = null;
        var barsEntity = null;
        var pieChartEntity = null;
        var pieEntity = null;

        el.addEventListener('click', function () {
            if (!menuPanel) {
                crearMenuPrincipal();
            }
        });

        function crearMenuPrincipal() {
            cerrarMenus();  // Asegura que todo está limpio antes de abrir

            var parentPosition = el.getAttribute('position');
            var newPosition = { x: parentPosition.x, y: parentPosition.y + 1.5, z: parentPosition.z };

            menuPanel = document.createElement('a-box');
            menuPanel.setAttribute('width', '1');
            menuPanel.setAttribute('height', '0.7');
            menuPanel.setAttribute('depth', '0.1');
            menuPanel.setAttribute('color', '#333');
            menuPanel.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);

            var barChartButton = crearBoton("Barras", "0 0.1 0.06", function () {
                mostrarSubmenu("Barras");
            });

            var pieChartButton = crearBoton("Circular", "0 -0.2 0.06", function () {
                mostrarSubmenu("Circular");
            });

            var closeButton = crearBoton("X", "0.4 0.3 0.06", cerrarMenus, "red", "0.2");

            menuPanel.appendChild(barChartButton);
            menuPanel.appendChild(pieChartButton);
            menuPanel.appendChild(closeButton);
            scene.appendChild(menuPanel);
        }


        function cerrarMenus() {
            if (menuPanel) {
                scene.removeChild(menuPanel);
                menuPanel = null;
            }
            if (subMenu) {
                scene.removeChild(subMenu);
                subMenu = null;
            }
            cerrarGraficoPrevio();  // Aseguramos que los gráficos se cierran sin afectar a futuros menús
        }


        function mostrarSubmenu(tipo) {
            cerrarMenus();
            var parentPosition = el.getAttribute('position');
            var newPosition = { x: parentPosition.x, y: parentPosition.y + 1.5, z: parentPosition.z };

            subMenu = document.createElement('a-box');
            subMenu.setAttribute('width', '1');
            subMenu.setAttribute('height', '0.7');
            subMenu.setAttribute('depth', '0.1');
            subMenu.setAttribute('color', '#333');
            subMenu.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);

            var backButton = crearBoton("←", "0.4 0.3 0.06", function () {
                crearMenuPrincipal();
            }, "red", "0.2");

            var option1 = crearBoton("Completo", "0 0.2 0.06", function () {
                mostrarGrafico(tipo, "");
            });

            var option2 = crearBoton("Diesel", "0 0 0.06", function () {
                mostrarGrafico(tipo, "Diesel");
            });

            var option3 = crearBoton("5 Puertas", "0 -0.2 0.06", function () {
                mostrarGrafico(tipo, "5Puertas");
            });

            subMenu.appendChild(backButton);
            subMenu.appendChild(option1);
            subMenu.appendChild(option2);
            subMenu.appendChild(option3);
            scene.appendChild(subMenu);
        }

        function mostrarGrafico(tipo, filtro) {
            cerrarGraficoPrevio();

            var parentPosition = el.getAttribute('position');
            var newPosition = { x: parentPosition.x + 3, y: parentPosition.y, z: parentPosition.z};

            var dataEntity = document.createElement('a-entity');
            dataEntity.setAttribute('id', 'data');
            dataEntity.setAttribute('babia-queryjson', 'url: ./data.json; path: data');
            scene.appendChild(dataEntity);
          
            if (tipo === "Barras") {
                barChartEntity = document.createElement('a-entity');  // Guardamos la referencia
                if(filtro == "Diesel"){
                  const filterEntity = document.createElement('a-entity');
                  filterEntity.setAttribute('id', 'filter-data');
                  filterEntity.setAttribute('babia-filter', 'from: data; filter:motor=diesel');
                  scene.appendChild(filterEntity);
                }if(filtro == "5Puertas"){
                  const filterEntity = document.createElement('a-entity');
                  filterEntity.setAttribute('id', 'filter-data');
                  filterEntity.setAttribute('babia-filter', 'from: data; filter: doors=5');
                  scene.appendChild(filterEntity);
                }
                barChartEntity.setAttribute('babia-barsmap', 'from: filter-data; legend: true; palette:foxy; x_axis: model; height: sales; radius: doors');
                barChartEntity.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);
                barChartEntity.setAttribute('scale', '0.2 0.2 0.2');
                scene.appendChild(barChartEntity);
            } else if (tipo === "Circular") {
                pieChartEntity = document.createElement('a-entity');  // Guardamos la referencia
                pieChartEntity.setAttribute('babia-pie', `from: ${filtro ? 'filter-data' : 'data'}; legend: true; palette: blues; key: model; size: doors`);
                pieChartEntity.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);
                pieChartEntity.setAttribute('scale', '0.8 0.8 0.8');
                pieChartEntity.setAttribute('rotation', '90 0 0');
                scene.appendChild(pieChartEntity);
            }
        }


        function cerrarGraficoPrevio() {
            if (barChartEntity) {
                scene.removeChild(barChartEntity);
                barChartEntity = null;
            }
            if (pieChartEntity) {
                scene.removeChild(pieChartEntity);
                pieChartEntity = null;
            }
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
    }
});
