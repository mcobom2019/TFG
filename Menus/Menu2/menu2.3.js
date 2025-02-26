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
            cerrarMenus();

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
            cerrarGraficoPrevio();
        }


        function mostrarSubmenu(tipo) {
            cerrarMenus();
            var parentPosition = el.getAttribute('position');
            var newPosition = { x: parentPosition.x, y: parentPosition.y + 1.5, z: parentPosition.z };

            subMenu = document.createElement('a-box');
            subMenu.setAttribute('width', '1.1');
            subMenu.setAttribute('height', '1');
            subMenu.setAttribute('depth', '0.1');
            subMenu.setAttribute('color', '#333');
            subMenu.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);

            var backButton = crearBoton("<--", "-0.45 0.498 0.06", function () {
                crearMenuPrincipal();
            }, "orange", "0.2");

            var option1 = crearBoton("Motor", "0 0.35 0.06", function () {
                //mostrarGrafico(tipo, "");
                mostrarSubmenu2("Motor");
            });

            var option2 = crearBoton("Color", "0 0.12 0.06", function () {
                //mostrarGrafico(tipo, "Diesel");
                mostrarSubmenu2("Color");
            });

            var option3 = crearBoton("Puertas", "0 -0.12 0.06", function () {
                //mostrarGrafico(tipo, "5Puertas");
                mostrarSubmenu2("Puertas");
            });
            
            var option4 = crearBoton("Ventas", "0 -0.35 0.06", function () {
                //mostrarGrafico(tipo, "5Puertas");
                mostrarSubmenu2("Ventas");
            });

            subMenu.appendChild(backButton);
            subMenu.appendChild(option1);
            subMenu.appendChild(option2);
            subMenu.appendChild(option3);
            subMenu.appendChild(option4);
            scene.appendChild(subMenu);
        }
      
        function mostrarSubmenu2(tipo) {
            cerrarMenus();
            var parentPosition = el.getAttribute('position');
            var newPosition = { x: parentPosition.x, y: parentPosition.y + 1.5, z: parentPosition.z };

            subMenu = document.createElement('a-box');
            subMenu.setAttribute('width', '1.1');
            subMenu.setAttribute('height', '1');
            subMenu.setAttribute('depth', '0.1');
            subMenu.setAttribute('color', '#333');
            subMenu.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);
          
            var backButton = crearBoton("<--", "-0.45 0.498 0.06", function () {
                crearMenuPrincipal();
            }, "orange", "0.2");
          
            if(tipo == "Motor"){
              var option1 = crearBoton("Eléctrico", "0 0.35 0.06", function () {
                mostrarGrafico(tipo, "Electrico");
              });
              var option2 = crearBoton("Diesel", "0 0.12 0.06", function () {
                mostrarGrafico(tipo, "Diesel");
              });
              var option3 = crearBoton("Gasolina", "0 -0.12 0.06", function () {
                mostrarGrafico(tipo, "Gasolina");
              });
              
              subMenu.appendChild(backButton);
              subMenu.appendChild(option1);
              subMenu.appendChild(option2);
              subMenu.appendChild(option3);
              scene.appendChild(subMenu);
              
            }if(tipo == "Color"){
              var option1 = crearBoton("Blanco", "0 0.35 0.06", function () {
                mostrarGrafico(tipo, "Blanco");
              });
              var option2 = crearBoton("Negro", "0 0.12 0.06", function () {
                mostrarGrafico(tipo, "Negro");
              });
              var option3 = crearBoton("Rojo", "0 -0.12 0.06", function () {
                mostrarGrafico(tipo, "Rojo");
              });
              var option4 = crearBoton("Amarillo", "0 -0.35 0.06", function () {
                mostrarGrafico(tipo, "Amarillo");
              });
              
              subMenu.appendChild(backButton);
              subMenu.appendChild(option1);
              subMenu.appendChild(option2);
              subMenu.appendChild(option3);
              subMenu.appendChild(option4);
              scene.appendChild(subMenu);
              
            }if(tipo == "Puertas"){
              var option1 = crearBoton("3 Puertas", "0 0.35 0.06", function () {
                mostrarGrafico(tipo, "3puertas");
              });
              var option2 = crearBoton("5 Puertas", "0 0.12 0.06", function () {
                mostrarGrafico(tipo, "5puertas");
              });
              
              subMenu.appendChild(backButton);
              subMenu.appendChild(option1);
              subMenu.appendChild(option2);
              scene.appendChild(subMenu);
              
            }if(tipo == "Ventas"){
              var option1 = crearBoton("Trimestre", "0 0.35 0.06", function () {
                mostrarGrafico(tipo, "trimestre");
              });
              subMenu.appendChild(backButton);
              subMenu.appendChild(option1);
              scene.appendChild(subMenu);
            }
        }

        function mostrarGrafico(tipo, filtro) {
            cerrarGraficoPrevio();

            var parentPosition = el.getAttribute('position');
            var newPosition = { x: parentPosition.x + 3, y: parentPosition.y, z: parentPosition.z };

            // Elimina filtrados previos
            var prevFilter = document.querySelector("#filter-data");
            if (prevFilter) {
                scene.removeChild(prevFilter);
            }

            var dataSource = "data"; //cuando es completo, no hay filtro

            if (!document.querySelector("#data")) {
                var dataEntity = document.createElement('a-entity');
                dataEntity.setAttribute('id', 'data');
                dataEntity.setAttribute('babia-queryjson', 'url: ./data.json; path: data');
                scene.appendChild(dataEntity);
            }

            if (filtro != "") {
                const filterEntity = document.createElement('a-entity');
                filterEntity.setAttribute('id', 'filter-data');

                if (filtro === "Diesel") {
                    filterEntity.setAttribute('babia-filter', 'from: data; filter: motor=diesel');
                } else if (filtro === "5Puertas") {
                    filterEntity.setAttribute('babia-filter', 'from: data; filter: doors=5');
                }

                scene.appendChild(filterEntity);
                dataSource = "filter-data"; // cuando hemos filtrado
            }

            if (tipo === "Barras") {
                barChartEntity = document.createElement('a-entity');
                barChartEntity.setAttribute('babia-barsmap', `from: ${dataSource}; legend: true; palette: foxy; x_axis: model; height: sales; radius: doors`);
                barChartEntity.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);
                barChartEntity.setAttribute('scale', '0.2 0.2 0.2');
                scene.appendChild(barChartEntity);
            } else if (tipo === "Circular") {
                pieChartEntity = document.createElement('a-entity');
                pieChartEntity.setAttribute('babia-pie', `from: ${dataSource}; legend: true; palette: blues; key: model; size: doors`);
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
