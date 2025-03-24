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
        var lastMenuPosition = null;
        var esVisible = false;
        
        // Exponemos la función para que sea accesible desde fuera
        this.crearMenuPrincipal = crearMenuPrincipal;
        
        // Asignar detector con distancia ajustada
        el.setAttribute('detector', "distance: 0.15");
        
        // Escuchar clicks normales y eventos de presión de manos
        el.addEventListener('click', function () {
            console.log("Click en botón principal");
            if (!menuPanel) {
                crearMenuPrincipal();
            }
        });

        el.addEventListener('pressedended', function () {
            console.log("Presión detectada en botón principal");
            if (!menuPanel) {
                crearMenuPrincipal();
            }
        });
        
        function crearMenuPrincipal() {
            cerrarMenus();

            var parentPosition = el.getAttribute('position');
            var newPosition;
            if (lastMenuPosition) {
                newPosition = lastMenuPosition;
            } else {
                newPosition = { x: parentPosition.x, y: parentPosition.y + 1, z: parentPosition.z-0.5 };
            }

            console.log("Creando menú principal en posición:", newPosition);

            menuPanel = document.createElement('a-box');
            menuPanel.setAttribute('width', '0.5');
            menuPanel.setAttribute('height', '0.35');
            menuPanel.setAttribute('depth', '0.1');
            menuPanel.setAttribute('color', '#333');
            menuPanel.setAttribute('class', "clickable");
            
            // Aseguramos que sea agarrable
            menuPanel.setAttribute('hand-tracking-grab-target', '');
            menuPanel.setAttribute('grabbable', '');
            
            menuPanel.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);
            menuPanel.setAttribute('detector', "distance: 0.15");

            // Registramos eventos para mantener la posición
            menuPanel.addEventListener('grabend', function() {
                console.log("Finalizando agarre de menú principal");
                lastMenuPosition = menuPanel.getAttribute('position');
            });

            var barChartButton = crearBoton("Barras", "-0.02 0.07 0.06", function () {
                var posicion = el.getAttribute('position');
                mostrarSubmenu("Barras", posicion);
            });

            var pieChartButton = crearBoton("Circular", "-0.02 -0.1 0.06", function () {
                var posicion = el.getAttribute('position');
                mostrarSubmenu("Circular", posicion);
            });

            var closeButton = crearBoton("X", "0.2 0.1 0.06", cerrarMenus, "red", "0.1");
             
            menuPanel.appendChild(barChartButton);
            menuPanel.appendChild(pieChartButton);
            menuPanel.appendChild(closeButton);
            scene.appendChild(menuPanel);
            console.log("Menú principal creado y añadido a la escena");
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

        function mostrarSubmenu(tipo, posicion) {
            cerrarMenus();
            var parentPosition = el.getAttribute('position');
            var newPosition;
            
            // Use the last known menu position if available, otherwise use parent position
            if (lastMenuPosition) {
                newPosition = {
                    x: lastMenuPosition.x,
                    y: lastMenuPosition.y,
                    z: lastMenuPosition.z
                };
            } else {
                newPosition = { 
                    x: parentPosition.x, 
                    y: parentPosition.y + 1, 
                    z: parentPosition.z - 0.5 
                };
            }

            console.log("Submenu Position:", newPosition);

            subMenu = document.createElement('a-box');
            subMenu.setAttribute('width', '0.55');
            subMenu.setAttribute('height', '0.65');
            subMenu.setAttribute('depth', '0.1');
            subMenu.setAttribute('color', '#333');
            subMenu.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);
            
            // Aplicamos estos atributos para mejor agarre
            subMenu.setAttribute('hand-tracking-grab-target', '');
            subMenu.setAttribute('grabbable', '');
            
            // Registramos eventos para mantener la posición
            subMenu.addEventListener('grabstart', function() {
                console.log("Iniciando agarre de submenú");
            });
            
            subMenu.addEventListener('grabend', function() {
                console.log("Finalizando agarre de submenú");
                lastMenuPosition = subMenu.getAttribute('position');
            });

            var backButton = crearBoton("<--", "-0.225 0.249 0.06", function () {
                crearMenuPrincipal();
            }, "orange", "0.1");

            var option1 = crearBoton("Motor", "0 0.25 0.06", function () {
                mostrarSubmenu2(tipo, "Motor");
            });

            var option2 = crearBoton("Color", "0 0.125 0.06", function () {
                mostrarSubmenu2(tipo, "Color");
            });

            var option3 = crearBoton("Puertas", "0 0 0.06", function () {
                mostrarSubmenu2(tipo, "Puertas");
            });
            
            var option4 = crearBoton("Ventas", "0 -0.125 0.06", function () {
                mostrarSubmenu2(tipo, "Ventas");
            });
            
            var option5 = crearBoton("Completo", "0 -0.25 0.06", function () {
                mostrarGrafico(tipo, " ");
            });
          
            subMenu.appendChild(backButton);
            subMenu.appendChild(option1);
            subMenu.appendChild(option2);
            subMenu.appendChild(option3);
            subMenu.appendChild(option4);
            subMenu.appendChild(option5);
            scene.appendChild(subMenu);
        }
      
        function mostrarSubmenu2(tipo, tipo2) {
            cerrarMenus();
            var parentPosition = el.getAttribute('position');
            var newPosition;
            if (lastMenuPosition) {
                newPosition = lastMenuPosition;
            } else {
                newPosition = { x: parentPosition.x, y: parentPosition.y + 1, z: parentPosition.z };
            }

            subMenu = document.createElement('a-box');
            subMenu.setAttribute('width', '0.55');
            subMenu.setAttribute('height', '0.5');
            subMenu.setAttribute('depth', '0.1');
            subMenu.setAttribute('color', '#333');
            subMenu.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);
            
            // Aseguramos que sea agarrable
            subMenu.setAttribute('hand-tracking-grab-target', '');
            subMenu.setAttribute('grabbable', '');
            
            // Registramos eventos para mantener la posición
            subMenu.addEventListener('grabend', function() {
                console.log("Finalizando agarre de submenú 2");
                lastMenuPosition = subMenu.getAttribute('position');
            });

            var backButton = crearBoton("<--", "-0.225 0.195 0.06", function () {
                mostrarSubmenu(tipo)
            }, "orange", "0.1");
          
            if(tipo2 == "Motor"){
              var option1 = crearBoton("Eléctrico", "0 0.175 0.06", function () {
                mostrarSubmenu3(tipo, "Electrico");
              });
              var option2 = crearBoton("Diesel", "0 0.06 0.06", function () {
                mostrarSubmenu3(tipo, "Diesel");
              });
              var option3 = crearBoton("Gasolina", "0 -0.06 0.06", function () {
                mostrarSubmenu3(tipo, "Gasolina");
              });
              
              subMenu.appendChild(backButton);
              subMenu.appendChild(option1);
              subMenu.appendChild(option2);
              subMenu.appendChild(option3);
              scene.appendChild(subMenu);
              
            }if(tipo2 == "Color"){
              var option1 = crearBoton("Blanco", "0 0.175 0.06", function () {
                mostrarSubmenu3(tipo, "Blanco");
              });
              var option2 = crearBoton("Negro", "0 0.06 0.06", function () {
                mostrarSubmenu3(tipo, "Negro");
              });
              var option3 = crearBoton("Rojo", "0 -0.06 0.06", function () {
                mostrarSubmenu3(tipo, "Rojo");
              });
              var option4 = crearBoton("Amarillo", "0 -0.175 0.06", function () {
                mostrarSubmenu3(tipo, "Amarillo");
              });
              
              subMenu.appendChild(backButton);
              subMenu.appendChild(option1);
              subMenu.appendChild(option2);
              subMenu.appendChild(option3);
              subMenu.appendChild(option4);
              scene.appendChild(subMenu);
              
            }if(tipo2 == "Puertas"){
              var option1 = crearBoton("3 Puertas", "0 0.175 0.06", function () {
                mostrarSubmenu3(tipo, "3puertas");
              });
              var option2 = crearBoton("5 Puertas", "0 0.06 0.06", function () {
                mostrarSubmenu3(tipo, "5puertas");
              });
              
              subMenu.appendChild(backButton);
              subMenu.appendChild(option1);
              subMenu.appendChild(option2);
              scene.appendChild(subMenu);
              
            }if(tipo2 == "Ventas"){
              var option1 = crearBoton("Alta Demanda", "0 0.175 0.06", function () {
                mostrarSubmenu3(tipo, "alta");
              });
              var option2 = crearBoton("Baja Demanda", "0 0.06 0.06", function () {
                mostrarSubmenu3(tipo, "baja");
              });
              subMenu.appendChild(backButton);
              subMenu.appendChild(option1);
              subMenu.appendChild(option2);
              scene.appendChild(subMenu);
            }
        }
      
        function mostrarSubmenu3(tipo, tipo2) {
            cerrarMenus();
            var parentPosition = el.getAttribute('position');
            var newPosition;
            if (lastMenuPosition) {
                newPosition = lastMenuPosition;
            } else {
                newPosition = { x: parentPosition.x, y: parentPosition.y + 1, z: parentPosition.z };
            }

            subMenu = document.createElement('a-box');
            subMenu.setAttribute('width', '0.55');
            subMenu.setAttribute('height', '0.5');
            subMenu.setAttribute('depth', '0.1');
            subMenu.setAttribute('color', '#333');
            subMenu.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);
            
            // Aseguramos que sea agarrable
            subMenu.setAttribute('hand-tracking-grab-target', '');
            subMenu.setAttribute('grabbable', '');
            
            // Registramos eventos para mantener la posición
            subMenu.addEventListener('grabend', function() {
                console.log("Finalizando agarre de submenú 3");
                lastMenuPosition = subMenu.getAttribute('position');
            });
          
            var backButton = crearBoton("<--", "-0.225 0.195 0.06", function () {
                mostrarSubmenu(tipo)
            }, "orange", "0.1");
          
            var option1 = crearBoton("Mostrar", "0 0.175 0.06", function () {
                mostrarGrafico(tipo, tipo2);
            });
            var option2 = crearBoton("Borrar", "0 0.06 0.06", function () {
                cerrarGraficoPrevio();
            });
              
            subMenu.appendChild(backButton);
            subMenu.appendChild(option1);
            subMenu.appendChild(option2);
            scene.appendChild(subMenu);
        }

        function mostrarGrafico(tipo, filtro) {
            cerrarGraficoPrevio();

            var parentPosition = el.getAttribute('position');
            var newPosition;
            if (lastMenuPosition) {
                newPosition = { x: lastMenuPosition.x + 2, y: lastMenuPosition.y , z: lastMenuPosition.z };
            } else {
                newPosition = { x: parentPosition.x + 2, y: parentPosition.y , z: parentPosition.z };
            }

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

            if (filtro !== " ") {
                const filterEntity = document.createElement('a-entity');
                filterEntity.setAttribute('id', 'filter-data');

                if (filtro === "Electrico") {
                    filterEntity.setAttribute('babia-filter', 'from: data; filter: motor=electric');
                }else if (filtro === "Diesel") {
                    filterEntity.setAttribute('babia-filter', 'from: data; filter: motor=diesel');
                }else if (filtro === "Gasolina") {
                    filterEntity.setAttribute('babia-filter', 'from: data; filter: motor=gasoline');
                }else if (filtro === "Blanco") {
                    filterEntity.setAttribute('babia-filter', 'from: data; filter: color=white');
                }else if (filtro === "Negro") {
                    filterEntity.setAttribute('babia-filter', 'from: data; filter: color=black');
                }else if (filtro === "Rojo") {
                    filterEntity.setAttribute('babia-filter', 'from: data; filter: color=red');
                }else if (filtro === "Amarillo") {
                    filterEntity.setAttribute('babia-filter', 'from: data; filter: color=yellow');
                }else if (filtro === "3puertas") {
                    filterEntity.setAttribute('babia-filter', 'from: data; filter: doors=3');
                }else if (filtro === "5puertas") {
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
            }else if (tipo === "Circular") {
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

        function crearBoton(texto, posicion, onClick, color = "blue", size = "0.3") {
            var button = document.createElement('a-plane');
            button.setAttribute('width', size);
            button.setAttribute('height', '0.1');
            button.setAttribute('color', color);
            button.setAttribute('position', posicion);
            button.setAttribute('text', `value: ${texto}; color: white; align: center; width: 0.75;`);
            button.setAttribute('class', "clickable");

            // Añadimos el componente pressable a cada botón
            button.setAttribute('pressable', 'pressDistance: 0.08');
            button.setAttribute('detector', "distance: 0.15");

            // Almacenar el color original para poder volver a él
            button.originalColor = color;

            // Añadir evento para cambiar el color cuando se presiona
            button.addEventListener('pressedstarted', function() {
                button.setAttribute('color', 'green');
            });

            // Añadir evento para restaurar el color cuando se suelta
            button.addEventListener('pressedended', function() {
                button.setAttribute('color', button.originalColor);
                onClick();
            });

            // Mantener el evento click para interacciones con mouse/controlador
            button.addEventListener('click', onClick);

            return button;
        }
    }
});