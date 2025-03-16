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
        
        // Variable para detectar si el rayo está apuntando al cilindro
        var estaApuntando = false;
        
        // Detectar cuando el rayo está sobre el cilindro
        el.addEventListener('raycaster-intersected', function(evt) {
            estaApuntando = true;
            // Cambiar color para feedback visual (opcional)
            el.setAttribute('color', '#ff7777');
            console.log("Rayo apuntando al botón 3D inicial");
        });
        
        // Detectar cuando el rayo ya no está sobre el cilindro
        el.addEventListener('raycaster-intersected-cleared', function(evt) {
            estaApuntando = false;
            // Restaurar color original
            el.setAttribute('color', 'red');
            console.log("Rayo ya no apunta al botón 3D inicial");
        });
        
        // Función para manejar el evento xbuttondown a nivel de escena
        function handleXButton(evt) {
            console.log("Botón X presionado");
            // Ejecutar acción si el rayo está apuntando al cilindro
            if (estaApuntando) {
                console.log("Ejecutando acción para botón 3D inicial");
                if (!menuPanel) {
                    crearMenuPrincipal();
                }
            }
        }
        
        // Añadir el listener a nivel de escena
        scene.addEventListener('xbuttondown', handleXButton);
        
        // Guardar la referencia para poder eliminarlo después si es necesario
        el.xButtonHandler = handleXButton;


        function crearMenuPrincipal() {
            cerrarMenus();

            var parentPosition = el.getAttribute('position');
            var isDragging = false;
            var newPosition;
            if (lastMenuPosition) {
                newPosition = lastMenuPosition;
            } else {
                newPosition = { x: parentPosition.x, y: parentPosition.y + 1.5, z: parentPosition.z };
            }

            menuPanel = document.createElement('a-box');
            menuPanel.setAttribute('width', '1');
            menuPanel.setAttribute('height', '0.7');
            menuPanel.setAttribute('depth', '0.1');
            menuPanel.setAttribute('color', '#333');
            //menuPanel.setAttribute('class',"clickable");
            menuPanel.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);
            
            

            var barChartButton = crearBoton("Barras", "0 0.1 0.06", function () {
                var posicion = el.getAttribute('position');
                mostrarSubmenu("Barras", posicion);
            });

            var pieChartButton = crearBoton("Circular", "0 -0.2 0.06", function () {
                var posicion = el.getAttribute('position');
                mostrarSubmenu("Circular", posicion);
            });

            var closeButton = crearBoton("X", "0.4 0.3 0.06", cerrarMenus, "red", "0.2");
            
            var moveButton = crearBoton("O", "0.2 0.3 0.06", moverMenu, "brown", "0.2");
             
            //hacerArrastrable(menuPanel);

            menuPanel.appendChild(barChartButton);
            menuPanel.appendChild(pieChartButton);
            menuPanel.appendChild(closeButton);
            menuPanel.appendChild(moveButton);
            scene.appendChild(menuPanel);
        }
      
      function moverMenu() {
    // Estado de arrastre
    var dragging = false;
    
    // Almacenar referencia al botón O
    var botonO = this;
    
    console.log("Modo de arrastre activado - Presiona el botón A para mover");
    
    // Cambiar color para indicar modo activo
    botonO.setAttribute('color', 'yellow');
    
    // Crear una entidad auxiliar invisible que seguirá al controlador
    var helper = document.createElement('a-entity');
    helper.setAttribute('visible', 'false');
    scene.appendChild(helper);
    
    // Función para iniciar arrastre
    function iniciarArrastre(e) {
        console.log("Botón A presionado - Comenzando arrastre");
        dragging = true;
    }
    
    // Función para terminar arrastre
    function terminarArrastre(e) {
        if (dragging) {
            console.log("Arrastre finalizado");
            dragging = false;
            
            // Guardar posición final
            if (menuPanel) {
                var pos = menuPanel.getAttribute('position');
                lastMenuPosition = { x: pos.x, y: pos.y, z: pos.z };
                console.log("Nueva posición guardada:", lastMenuPosition);
            }
            
            // Limpiar
            limpiarEventos();
        }
    }
    
    // Función para actualizar posición durante arrastre
    function actualizarPosicion() {
        if (!dragging || !menuPanel) return;
        
        // Obtener posición del controlador derecho
        var rightController = document.querySelector("[oculus-touch-controls='hand: right']") || 
                              document.querySelector("#rightHand");
        
        if (!rightController) return;
        
        // Obtener posición actual del controlador
        var controllerPos = rightController.getAttribute('position');
        
        // Actualizar posición del menú
        menuPanel.setAttribute('position', {
            x: controllerPos.x,
            y: controllerPos.y + 0.2, // Un poco arriba del controlador
            z: controllerPos.z - 0.3  // Un poco adelante del controlador
        });
    }
    
    // Limpiar todos los eventos
    function limpiarEventos() {
        scene.removeEventListener('abuttondown', iniciarArrastre);
        scene.removeEventListener('abuttonup', terminarArrastre);
        scene.removeEventListener('tick', actualizarPosicion);
        
        // Restaurar color del botón
        botonO.setAttribute('color', 'brown');
        
        // Eliminar helper
        if (helper && helper.parentNode) {
            helper.parentNode.removeChild(helper);
        }
    }
    
    // Registrar eventos
    scene.addEventListener('abuttondown', iniciarArrastre);
    scene.addEventListener('abuttonup', terminarArrastre);
    scene.addEventListener('tick', actualizarPosicion);
    
    // Timeout de seguridad
    setTimeout(function() {
        if (!dragging) {
            limpiarEventos();
        }
    }, 10000); // 10 segundos para cancelar si no se usa
}


        function cerrarMenus() {
            if (menuPanel) {
                scene.removeChild(menuPanel);
                menuPanel = null;
                //lastMenuPosition = null;
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
            if (lastMenuPosition) {
                newPosition = lastMenuPosition;
            } else {
                newPosition = { x: parentPosition.x, y: parentPosition.y + 1.5, z: parentPosition.z };
            }

            subMenu = document.createElement('a-box');
            subMenu.setAttribute('width', '1.1');
            subMenu.setAttribute('height', '1.3');
            subMenu.setAttribute('depth', '0.1');
            subMenu.setAttribute('color', '#333');
            subMenu.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);

            var backButton = crearBoton("<--", "-0.45 0.498 0.06", function () {
                crearMenuPrincipal();
            }, "orange", "0.2");

            var option1 = crearBoton("Motor", "0 0.5 0.06", function () {
                //mostrarGrafico(tipo, "");
                mostrarSubmenu2(tipo, "Motor");
            });

            var option2 = crearBoton("Color", "0 0.25 0.06", function () {
                //mostrarGrafico(tipo, "Diesel");
                mostrarSubmenu2(tipo, "Color");
            });

            var option3 = crearBoton("Puertas", "0 0 0.06", function () {
                //mostrarGrafico(tipo, "5Puertas");
                mostrarSubmenu2(tipo, "Puertas");
            });
            
            var option4 = crearBoton("Ventas", "0 -0.25 0.06", function () {
                //mostrarGrafico(tipo, "5Puertas");
                mostrarSubmenu2(tipo, "Ventas");
            });
            
            var option5 = crearBoton("Completo", "0 -0.5 0.06", function () {
                //mostrarGrafico(tipo, "5Puertas");
                mostrarGrafico(tipo, " ");
            });
          
            //hacerArrastrable(subMenu);

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
                newPosition = { x: parentPosition.x, y: parentPosition.y + 1.5, z: parentPosition.z };
            }

            subMenu = document.createElement('a-box');
            subMenu.setAttribute('width', '1.1');
            subMenu.setAttribute('height', '1');
            subMenu.setAttribute('depth', '0.1');
            subMenu.setAttribute('color', '#333');
            subMenu.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);
            
            //hacerArrastrable(subMenu);
          
            var backButton = crearBoton("<--", "-0.45 0.39 0.06", function () {
                mostrarSubmenu(tipo)
            }, "orange", "0.2");
          
            if(tipo2 == "Motor"){
              var option1 = crearBoton("Eléctrico", "0 0.35 0.06", function () {
                mostrarSubmenu3(tipo, "Electrico");
              });
              var option2 = crearBoton("Diesel", "0 0.12 0.06", function () {
                mostrarSubmenu3(tipo, "Diesel");
              });
              var option3 = crearBoton("Gasolina", "0 -0.12 0.06", function () {
                mostrarSubmenu3(tipo, "Gasolina");
              });
              
              subMenu.appendChild(backButton);
              subMenu.appendChild(option1);
              subMenu.appendChild(option2);
              subMenu.appendChild(option3);
              scene.appendChild(subMenu);
              
            }if(tipo2 == "Color"){
              var option1 = crearBoton("Blanco", "0 0.35 0.06", function () {
                mostrarSubmenu3(tipo, "Blanco");
              });
              var option2 = crearBoton("Negro", "0 0.12 0.06", function () {
                mostrarSubmenu3(tipo, "Negro");
              });
              var option3 = crearBoton("Rojo", "0 -0.12 0.06", function () {
                mostrarSubmenu3(tipo, "Rojo");
              });
              var option4 = crearBoton("Amarillo", "0 -0.35 0.06", function () {
                mostrarSubmenu3(tipo, "Amarillo");
              });
              
              subMenu.appendChild(backButton);
              subMenu.appendChild(option1);
              subMenu.appendChild(option2);
              subMenu.appendChild(option3);
              subMenu.appendChild(option4);
              scene.appendChild(subMenu);
              
            }if(tipo2 == "Puertas"){
              var option1 = crearBoton("3 Puertas", "0 0.35 0.06", function () {
                mostrarSubmenu3(tipo, "3puertas");
              });
              var option2 = crearBoton("5 Puertas", "0 0.12 0.06", function () {
                mostrarSubmenu3(tipo, "5puertas");
              });
              
              subMenu.appendChild(backButton);
              subMenu.appendChild(option1);
              subMenu.appendChild(option2);
              scene.appendChild(subMenu);
              
            }if(tipo2 == "Ventas"){
              var option1 = crearBoton("Alta Demanda", "0 0.35 0.06", function () {
                mostrarSubmenu3(tipo, "alta");
              });
              var option2 = crearBoton("Baja Demanda", "0 0.12 0.06", function () {
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
                newPosition = { x: parentPosition.x, y: parentPosition.y + 1.5, z: parentPosition.z };
            }

            subMenu = document.createElement('a-box');
            subMenu.setAttribute('width', '1.1');
            subMenu.setAttribute('height', '1');
            subMenu.setAttribute('depth', '0.1');
            subMenu.setAttribute('color', '#333');
            subMenu.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);
            
            //hacerArrastrable(subMenu);
          
            var backButton = crearBoton("<--", "-0.45 0.39 0.06", function () {
                mostrarSubmenu(tipo)
            }, "orange", "0.2");
          
              var option1 = crearBoton("Mostrar", "0 0.35 0.06", function () {
                mostrarGrafico(tipo, tipo2);
              });
              var option2 = crearBoton("Borrar", "0 0.12 0.06", function () {
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
                newPosition = { x: lastMenuPosition.x + 2, y: lastMenuPosition.y - 1, z: lastMenuPosition.z };
            } else {
                newPosition = { x: parentPosition.x + 2, y: parentPosition.y - 1 , z: parentPosition.z };
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
                }//else if (filtro === "alta") {
                 //   filterEntity.setAttribute('babia-filter', 'from: data; filter: sales<=10');
                //}else if (filtro === "baja") {
                //    filterEntity.setAttribute('babia-filter', 'from: data; filter: sales>=9');
                //}

                scene.appendChild(filterEntity);
                dataSource = "filter-data"; // cuando hemos filtrado
            }
            
            //if(!esVisible){
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
               // esVisible =  true;
            //}else{
             // cerrarGraficoPrevio();
             // esVisible = false;
            //}
        }
      
        /*function hacerArrastrable(elemento) {
            var isDragging = false;
            var offset = new THREE.Vector3();
            var mouse = new THREE.Vector3();
            var raycaster = new THREE.Raycaster();

            elemento.addEventListener('mousedown', function (event) {
                isDragging = true;
                let panelPos = elemento.object3D.position;
                offset.set(
                    event.detail.intersection.point.x - panelPos.x,
                    event.detail.intersection.point.y - panelPos.y,
                    event.detail.intersection.point.z - panelPos.z
                );
            });

            scene.addEventListener('mousemove', function (event) {
                if (isDragging) {
                    let canvas = scene.renderer.domElement;
                    mouse.x = (event.clientX / canvas.width) * 2 - 1;
                    mouse.y = -(event.clientY / canvas.height) * 2 + 1;
                    raycaster.setFromCamera(mouse, scene.camera);

                    let intersects = raycaster.intersectObject(elemento.object3D, true);
                    if (intersects.length > 0) {
                        elemento.object3D.position.copy(intersects[0].point.clone().sub(offset));
                    }
                }
            });

            scene.addEventListener('mouseup', function () {
                if (isDragging) {
                    lastMenuPosition = {
                        x: elemento.object3D.position.x,
                        y: elemento.object3D.position.y,
                        z: elemento.object3D.position.z
                    };
                }
                isDragging = false;
            });
        }*/
      
      

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
            let estaApuntando = false;
            var button = document.createElement('a-plane');
            button.setAttribute('width', size);
            button.setAttribute('height', '0.2');
            button.setAttribute('color', color);
            button.setAttribute('position', posicion);
            button.setAttribute('text', `value: ${texto}; color: white; align: center; width: 1.5;`);
            button.setAttribute('class', "clickable");

            // Color original para restaurar después
            const colorOriginal = color;

            // Detectar cuando el rayo está sobre el botón
            button.addEventListener('raycaster-intersected', function(evt) {
                estaApuntando = true;
                // Cambiar color para feedback visual
                button.setAttribute('color', '#aaaaff');
                console.log("Rayo apuntando al botón:", texto);
            });

            // Detectar cuando el rayo ya no está sobre el botón
            button.addEventListener('raycaster-intersected-cleared', function(evt) {
                estaApuntando = false;
                // Restaurar color original
                button.setAttribute('color', colorOriginal);
                console.log("Rayo ya no apunta al botón:", texto);
            });

            // Crear una función manejadora para el evento xbuttondown
            function xButtonHandler(evt) {
                console.log("Botón X presionado");
                // Ejecutar onClick directamente si el rayo está apuntando
                if (estaApuntando) {
                    console.log("Ejecutando acción para botón:", texto);
                    onClick();
                }
            }

            // Añadir el listener a nivel de escena
            const escena = document.querySelector('a-scene');
            escena.addEventListener('xbuttondown', xButtonHandler);

            // Almacenar referencia al handler para poder eliminarlo después
            button.xButtonHandler = xButtonHandler;

            // Si el botón se elimina, eliminar también el listener global
            button.addEventListener('remove', function() {
                escena.removeEventListener('xbuttondown', button.xButtonHandler);
            });

            return button;
        }
    }
});
// Componente para movimiento con joystick izquierdo
      AFRAME.registerComponent('body-movement', {
        schema: {
          speed: {type: 'number', default: 0.15}
        },
        
        init: function () {
          this.cameraRig = document.querySelector('#cameraRig');
          console.log("Body movement component initialized");
          
          // Capturar eventos de joystick
          this.el.addEventListener('thumbstickmoved', this.onThumbstickMoved.bind(this));
        },
        
        onThumbstickMoved: function (evt) {
          console.log("Left thumbstick moved:", evt.detail.x, evt.detail.y);
          
          if (evt.detail.x === 0 && evt.detail.y === 0) return;
          
          // Obtener posición actual
          let position = this.cameraRig.getAttribute('position');
          
          // Movimiento adelante/atrás (eje Y)
          position.z += evt.detail.y * this.data.speed;
          
          // Izquierda/derecha (eje X)
          position.x += evt.detail.x * this.data.speed;
          
          // Aplicar la nueva posición
          this.cameraRig.setAttribute('position', position);
        }
      });
      
      // Componente para rotación de cámara con joystick derecho (corregido)
      AFRAME.registerComponent('head-rotation', {
        schema: {
          speed: {type: 'number', default: 2.0}
        },
        
        init: function () {
          this.cameraHead = document.querySelector('#head');
          console.log("Head rotation component initialized");
          
          // Almacenar valores de rotación
          this.yaw = 0;
          this.pitch = 0;
          
          // Capturar eventos de joystick
          this.el.addEventListener('thumbstickmoved', this.onThumbstickMoved.bind(this));
        },
        
        tick: function() {
          // Asegurar que la rotación se aplica constantemente
          this.cameraHead.setAttribute('rotation', {x: this.pitch, y: this.yaw, z: 0});
        },
        
        onThumbstickMoved: function (evt) {
          console.log("Right thumbstick moved:", evt.detail.x, evt.detail.y);
          
          if (evt.detail.x === 0 && evt.detail.y === 0) return;
          
          // CORREGIDO: Invertir el eje Y para que arriba mire hacia arriba
          // Actualizar ángulos basados en el joystick
          this.yaw -= evt.detail.x * this.data.speed;
          
          // Invertir el pitch para que el movimiento sea natural
          this.pitch = Math.max(-70, Math.min(70, this.pitch - evt.detail.y * this.data.speed));
          
          // La aplicación real ocurre en el método tick
        }
      });