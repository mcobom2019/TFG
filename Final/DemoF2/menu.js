/* global AFRAME */
AFRAME.registerComponent('menu', {
  init: function() {
    // Cargar el JSON
    this.chair = false;
    this.bed = false;
    this.nightstand = false;
    this.table = false;
    this.lamp = false;
    this.bowl = false;
    this.pictures = false;
    this.plant = false;
    
    this.furniture = false;
    this.decoration = false;
    
    this.initmenu = false;
    this.m0 = false;
    this.m1 = false;
    this.m2 = false;
    this.m3 = false;
    this.isDarkMode = false;
    this.numFurniture = 0;
    //this.chairs = [];
    // Variable para almacenar la última posición conocida
    this.lastMenuPosition = { x: 0, y: 0, z: 0 };
    this.lastMenuRotation = { x: 0, y: 0, z: 0 };
    this.createLamp();
    
    fetch('scene.json')
      .then(response => response.json())
      .then(data => {
        // creo todos los menús
        this.data = data;
        this.signalCreateMenus();
        
        // Después de crear los menús, ahora configuro los eventos
        this.setupEvents();
      })
      .catch(error => {
        console.error('Error cargando scene.json:', error);
      });
  },
  
  setupEvents: function() {
    // Referencia a los elementos del menú
    this.setupMenuReferences();
    this.setupButtonReferences();
    this.setupAutomaticButtonEvents();
    
    this.maximizeButtonEl.addEventListener('click', () => {
        this.maximizeButtonEl.setAttribute('visible', false);
        if(this.initmenu){
            this.maximizeMenu(this.menuinicio);
            this.initilizeBoolean('initmenu');
        }else if(this.m0){
            this.maximizeMenu(this.submenu0);
            this.changeBoolean('m0');
        }else if(this.m1){
            this.maximizeMenu(this.submenu1);
            this.changeBoolean('m1');
        }else if(this.m3){
            this.maximizeMenu(this.submenu3);
            this.changeBoolean('m3');
        }else if(this.m2){
            this.maximizeMenu(this.submenu2);
            this.changeBoolean('m2');
        }
    });
  },
  
  signalCreateMenus: function() {
    if (!this.data) {
      console.error('No se encontraron datos en el JSON');
      return;
    }
    
    // Buscar todas las propiedades que contengan "menuPadre" en el nivel raíz
    Object.keys(this.data).forEach(key => {
      if (key.includes('menuP')) {
        console.log('Creando menú padre:', key);
        
        // Crear el menú padre
        this.createMenu(this.data[key]);
        
        // Crear recursivamente todos sus menús hijos
        this.createChildMenus(this.data[key]);
      }
    });
    
    // Adicionalmente, buscar arrays de menús padre si existieran
    Object.keys(this.data).forEach(key => {
      const value = this.data[key];
      if (Array.isArray(value)) {
        value.forEach(item => {
          // Si el elemento del array es un menú (tiene ID y posiblemente botones)
          if (item && item.id && item.buttons) {
            console.log('Creando menú desde array:', item.id);
            this.createMenu(item);
            this.createChildMenus(item);
          }
        });
      }
    });
  },
  
  createChildMenus: function(parentMenu) {
    // Si el menú no tiene botones, termina la recursión
    if (!parentMenu.buttons || !Array.isArray(parentMenu.buttons)) {
      return;
    }
    
    // Iteramos sobre todos los botones del menú
    parentMenu.buttons.forEach(button => {
      // Buscamos propiedades que contengan "menuHijo" (para ser más flexibles con los nombres)
      Object.keys(button).forEach(key => {
        if (key.includes('menuC') && button[key]) {
          // Si encontramos un menuHijo, lo creamos
          console.log('Creando menú hijo:', key, ' - ID:', button[key].id);
          this.createMenu(button[key]);
          
          // Y continuamos la recursión con ese menú hijo
          this.createChildMenus(button[key]);
        }
      });
    });
  },
  
  createMenu: function(pMenu) {
    if (!pMenu) return;
    
    const sceneEl = this.el;
    const menuEl = document.createElement('a-entity');
      
    if (pMenu.id) {
      menuEl.setAttribute('id', pMenu.id);
      menuEl.setAttribute('menuinicio', '');
      
      if(menuEl.id === "submenu4"){
        const slider = document.createElement('a-entity');
        slider.setAttribute('id', 'sliderr');
        slider.setAttribute('slider', '');
        slider.setAttribute('visible', 'false');
        slider.setAttribute('position', '0 -0.15 0');
        menuEl.appendChild(slider);
      }
    }
    if (pMenu.position) {
      menuEl.setAttribute('position', pMenu.position);
    }
    if (pMenu.visible !== undefined) {
      menuEl.setAttribute('visible', pMenu.visible);
    }
    if (pMenu.grabbable) {
      menuEl.setAttribute('grabbable', ''); // Corregido "grababble" a "grabbable"
    }
      
    if (pMenu.buttons && pMenu.buttons.length > 0) {
      this.createButtons(menuEl, pMenu.buttons);
    }
    
    sceneEl.appendChild(menuEl);
  },
  
  createButtons: function(parentEl, buttons) {
    buttons.forEach((button, index) => { 
      const buttonEl = document.createElement('a-entity');
      
      if (button.id) {
        buttonEl.setAttribute('id', button.id);
        buttonEl.setAttribute('button', {
          label: button.label,
          width: button.width || 0.2,
          toggleable: button.toggleable || false,
          primitive: button.primitive || 'cylinder',
          color: button.color ||'#32527b',
          posetx: button.posetx || 0,
          posety: button.posety || 0,
          posetz: button.posetz || 0,
          widthet: button.widthet || 0.2
        });
      }
      if (button.position) {
        buttonEl.setAttribute('position', button.position);
      }
      if (button.visible !== undefined) {
        buttonEl.setAttribute('visible', button.visible);
      }
      
      parentEl.appendChild(buttonEl);
    });
  },
  
  // Función auxiliar para obtener la posición actual de un menú
  getMenuPosition: function(menuElement) {
    if (!menuElement) return { x: 0, y: 0, z: 0 };
    
    const position = menuElement.getAttribute('position');
    const rotation = menuElement.getAttribute('rotation');
    return {
      x: position.x,
      y: position.y,
      z: position.z,
      a: rotation.x,
      b: rotation.y,
      c: rotation.z
    };
  },
  
  // Función auxiliar para aplicar una posición a un menú
  applyMenuPosition: function(menuElement, position) {
    if (!menuElement) return;
    
    menuElement.setAttribute('position', {
      x: position.x,
      y: position.y,
      z: position.z,
    });
    menuElement.setAttribute('rotation', {
      x: position.a,
      y: position.b,
      z: position.c,
    });
  },
  
  changeGrabbable: function(menu1, menu2){
    menu1.setAttribute('grababble', '');
    menu2.removeAttribute('grabbable');
    menu1.setAttribute('grabbable', '');
  },
  
  nextMenu: function (prevM, nextM){
        this.lastMenuPosition = this.getMenuPosition(prevM);
        this.changeGrabbable(nextM, prevM);
        prevM.setAttribute('visible', false);
        const buttons2 = prevM.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
        setTimeout(() => {
          this.applyMenuPosition(nextM, this.lastMenuPosition);
          nextM.setAttribute('visible', true);
          const buttons = nextM.querySelectorAll('[id]');
          buttons.forEach(button => {
            button.setAttribute('visible', true);
          });
          if(nextM == this.menuinicio){
            if(this.isDarkMode){
              this.darkButtonEl.setAttribute('visible', false);
            }else{
              this.lightButtonEl.setAttribute('visible', false);
            }
          }
        }, 500);
  },
  changeBoolean: function(boolName) {
    console.log("TRAZA",this.sphere);
    if (this[boolName] !== undefined) {
      this[boolName] = !this[boolName];
      console.log('Estado de ' + boolName + ' cambiado a: ' + this[boolName]);
    }else {
      console.warn('La propiedad ' + boolName + ' no existe en este componente');
      console.log("TRAZA",this.sphere);
    }
  },
  minimizeMenu: function (menu){
        console.log("minimizado el menu"+menu.id);
        this.lastMenuPosition = this.getMenuPosition(menu);
        menu.setAttribute('visible', false);
        const buttons2 = menu.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
        setTimeout(() => {
          this.maximizeButtonEl.setAttribute('visible', true);
        }, 500);
  },
  deleteMenu: function(menu){
        menu.setAttribute('visible', false);
        const buttons2 = menu.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
  },
  darkMode: function() {
    this.darkButtonEl.setAttribute('visible', false);

    // Comprobar si estamos en modo AR para no mostrar el cielo
    const scene = this.el.sceneEl;
    const isARMode = scene.is('ar-mode');

    // Modificar el cielo solo si NO estamos en modo AR
    const sky = document.querySelector('a-sky');
    if (!isARMode && sky) {
      sky.setAttribute('visible', true);
      sky.setAttribute('material', 'opacity', 0.8);
      sky.setAttribute('material', 'color', '#001133');
    }

    // Reducimos la intensidad de las luces para crear ambiente nocturno
    document.querySelector('#luz1').setAttribute('light', 'intensity', 0.1);
    document.querySelector('#luz2').setAttribute('light', 'intensity', 0.1);

    this.toggleLamp(true);
    this.isDarkMode = true;

    setTimeout(() => {
      this.lightButtonEl.setAttribute('visible', true);
    }, 250);
  },

  lightMode: function() {
    this.lightButtonEl.setAttribute('visible', false);

    // Comprobar si estamos en modo AR para no mostrar el cielo
    const scene = this.el.sceneEl;
    const isARMode = scene.is('ar-mode');

    // Modificar el cielo solo si NO estamos en modo AR
    const sky = document.querySelector('a-sky');
    if (!isARMode && sky) {
      sky.setAttribute('visible', true);
      sky.setAttribute('material', 'opacity', 1);
      sky.setAttribute('material', 'color', '#FFFFFF');
    }

    // Restaurar las luces a su intensidad original
    document.querySelector('#luz1').setAttribute('light', 'intensity', 0.7);
    document.querySelector('#luz2').setAttribute('light', 'intensity', 0.7);

    this.toggleLamp(false);
    this.isDarkMode = false;

    setTimeout(() => {
      this.darkButtonEl.setAttribute('visible', true);
    }, 250);
  },
  initilizeBoolean: function(boolName) {
    this[boolName] = false;
  },
  maximizeMenu: function(menu){
    setTimeout(() => {
        menu.setAttribute('visible', true);
        const buttons = menu.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', true);
        });
      if(this.isDarkMode){
        this.darkButtonEl.setAttribute('visible', false);
      }else{
        this.lightButtonEl.setAttribute('visible', false);
      }
    }, 500);
  },
  
  setupMenuReferences: function() {

    // Lista para almacenar todos los IDs de menús encontrados
    const menuIds = [];

    // Función recursiva para extraer IDs de menús del JSON
    const extractMenuIds = (menuObj) => {
      if (!menuObj || typeof menuObj !== 'object') return;

      // Si el objeto tiene un ID, lo añadimos a la lista
      if (menuObj.id) {
        menuIds.push(menuObj.id);
      }

      // Si el objeto tiene botones, buscamos menús hijos en ellos
      if (menuObj.buttons && Array.isArray(menuObj.buttons)) {
        menuObj.buttons.forEach(button => {
          // Buscamos todas las propiedades que empiezan con "menuC" (menús hijos)
          Object.keys(button).forEach(key => {
            if (key.startsWith('menuC') && button[key]) {
              extractMenuIds(button[key]);
            }
          });
        });
      }
    };

    // Iniciar la extracción desde el menú padre
    if (this.data && this.data.menuP) {
      extractMenuIds(this.data.menuP);
    }

    console.log("Menús encontrados:", menuIds);

    // Crear referencias a todos los menús encontrados
    menuIds.forEach(menuId => {
      // Convertir el ID a camelCase para la propiedad
      // Por ejemplo: 'childmenu1' → 'childMenu1'
      const propName = menuId.replace(/([a-z])([A-Z])/g, '$1$2')
                             .replace(/[-_]([a-z])/g, (_, letter) => letter.toUpperCase())
                             .replace(/^([a-z])/, (_, letter) => letter);

      // Guardar la referencia al elemento del DOM
      this[propName] = document.querySelector('#' + menuId);

      if (!this[propName]) {
        console.warn(`No se encontró el menú con ID: ${menuId}`);
      } else {
        console.log(`Referencia creada: this.${propName} = elemento con ID #${menuId}`);
      }
    });

    // También crear la referencia al botón maximizar que está fuera de la jerarquía de menús
    this.maximizeButtonEl = document.querySelector('#maximizeButton');
    if (this.maximizeButtonEl) {
      this.maximizeButtonEl.setAttribute('rotation', '0 0 0');
    } else {
      console.warn('No se encontró el botón maximizar');
    }
  },
  
  setupButtonReferences: function() {
    // Lista para almacenar todos los IDs de botones encontrados
    const buttonIds = [];

    // Función recursiva para extraer IDs de botones del JSON
    const extractButtonIds = (menuObj) => {
      if (!menuObj || typeof menuObj !== 'object') return;

      // Si el objeto tiene botones, extraemos sus IDs
      if (menuObj.buttons && Array.isArray(menuObj.buttons)) {
        menuObj.buttons.forEach(button => {
          // Si el botón tiene un ID, lo añadimos a la lista
          if (button.id) {
            buttonIds.push(button.id);
          }

          // Buscamos menús hijos para extraer también sus botones
          Object.keys(button).forEach(key => {
            if (key.startsWith('menuC') && button[key]) {
              extractButtonIds(button[key]);
            }
          });
        });
      }
    };

    // Iniciar la extracción desde todos los menús padre
    if (this.data) {
      Object.keys(this.data).forEach(key => {
        if (key.startsWith('menuP')) {
          extractButtonIds(this.data[key]);
        }
      });
    }

    console.log("Botones encontrados:", buttonIds);

    // Crear referencias a todos los botones encontrados
    buttonIds.forEach(buttonId => {
      // Convertir el ID a camelCase para la propiedad y añadir 'El' al final
      // Por ejemplo: 'startButton' → 'startButtonEl'
      const propName = buttonId.replace(/([a-z])([A-Z])/g, '$1$2')
                             .replace(/[-_]([a-z])/g, (_, letter) => letter.toUpperCase())
                             .replace(/^([a-z])/, (_, letter) => letter) + 'El';

      // Guardar la referencia al elemento del DOM
      this[propName] = document.querySelector('#' + buttonId);

      if (!this[propName]) {
        console.warn(`No se encontró el botón con ID: ${buttonId}`);
      } else {
        console.log(`Referencia creada: this.${propName} = elemento con ID #${buttonId}`);
      }
    });

    // Referencia específica al botón maximizar que podría estar fuera de la jerarquía normal
    this.maximizeButtonEl = document.querySelector('#maximizeButton');
    if (this.maximizeButtonEl) {
      this.maximizeButtonEl.setAttribute('rotation', '0 0 0');
    } else {
      console.warn('No se encontró el botón maximizar');
    }
  },
  
  setupAutomaticButtonEvents: function() {
    if (!this.data) return;

    console.log("Configurando eventos automáticos para botones...");

    // Función recursiva para configurar eventos en un menú y sus submenús
    const setupButtonEventsInMenu = (menuObj, menuId) => {
      if (!menuObj || !menuObj.buttons || !Array.isArray(menuObj.buttons)) return;

      console.log(`Configurando ${menuObj.buttons.length} botones para menú ${menuId}`);

      // Recorrer todos los botones del menú
      menuObj.buttons.forEach(button => {
        if (!button.id) return;

        const buttonEl = document.querySelector('#' + button.id);
        if (!buttonEl) {
          console.warn(`No se encontró el botón con ID: ${button.id}`);
          return;
        }

        console.log(`Configurando botón ${button.id} con label: ${button.label || 'sin etiqueta'}`);

        // Crear un solo event listener que ejecutará todas las funciones definidas
        buttonEl.addEventListener('click', (event) => {
          console.log(`Botón ${button.id} clickeado!`);

          // Buscar hasta 6 funciones definidas (function1 a function6)
          for (let i = 1; i <= 6; i++) {
            const funcName = `function${i}`;

            if (button[funcName]) {
              const functionToCall = button[funcName];
              console.log(`Ejecutando ${functionToCall} para botón ${button.id}`);

              // Si la función no existe en el componente, mostrar error
              if (typeof this[functionToCall] !== 'function') {
                console.error(`La función "${functionToCall}" no existe en el componente menu`);
                continue;
              }

              // Comprobar si hay parámetros para esta función específica
              const param1 = button[`parameter1f${i}`];
              const param2 = button[`parameter2f${i}`];

              try {
                // Manejo especial según el tipo de función
                switch(functionToCall) {
                  case 'nextMenu':
                  case 'minimizeMenu':
                  case 'maximizeMenu':
                  case 'deleteMenu':
                    // Estas funciones requieren elementos DOM
                    if (param1) {
                      const menuEl = document.querySelector('#' + param1);
                      if (!menuEl) {
                        console.error(`No se encontró el menú con ID: ${param1} para función ${functionToCall}`);
                        continue;
                      }

                      console.log(`Llamando a ${functionToCall} con menú ${param1}`);

                      if (param2 && functionToCall === 'nextMenu') {
                        const menuEl2 = document.querySelector('#' + param2);
                        if (!menuEl2) {
                          console.error(`No se encontró el menú destino con ID: ${param2}`);
                          continue;
                        }
                        this[functionToCall](menuEl, menuEl2);
                      } else {
                        this[functionToCall](menuEl);
                      }
                    } else {
                      console.error(`No se especificó menú para función ${functionToCall}`);
                    }
                    break;

                  default:
                    // Otras funciones con sus parámetros normales
                    if (param1 && param2) {
                      this[functionToCall](param1, param2);
                    } else if (param1) {
                      this[functionToCall](param1);
                    } else {
                      this[functionToCall]();
                    }
                }
              } catch (error) {
                console.error(`Error ejecutando ${functionToCall}:`, error);
              }
            }
          }
        });

        // Procesar recursivamente los submenús
        Object.keys(button).forEach(key => {
          if (key.startsWith('menuC') && button[key]) {
            setupButtonEventsInMenu(button[key], button[key].id);
          }
        });
      });
    };

    // Comenzar la configuración desde todos los menús principales
    Object.keys(this.data).forEach(key => {
      if (key.startsWith('menuP')) {
        setupButtonEventsInMenu(this.data[key], this.data[key].id);
      }
    });

    console.log("Configuración de eventos automáticos completada");
  },
  createLamp: function() {
    const sceneEl = this.el.sceneEl;
    
    // Crear entidad para la lámpara
    const lampEntity = document.createElement('a-entity');
    lampEntity.setAttribute('id', 'menu-lamp');
    
    // Crear la luz puntual
    const lightEntity = document.createElement('a-light');
    lightEntity.setAttribute('type', 'point');
    lightEntity.setAttribute('color', '#ffffff');
    lightEntity.setAttribute('intensity', '0.8');
    lightEntity.setAttribute('distance', '5');
    lightEntity.setAttribute('position', '-0 0.2 0');
    
    // Crear modelo visual de la lámpara
    const lampModelEntity = document.createElement('a-entity');
    lampModelEntity.setAttribute('geometry', 'primitive: sphere; radius: 0.05');
    lampModelEntity.setAttribute('material', 'color: #ffff99; emissive: #ffff00; emissiveIntensity: 0.8');
    
    // Crear soporte de la lámpara
    const lampStandEntity = document.createElement('a-entity');
    lampStandEntity.setAttribute('geometry', 'primitive: cylinder; radius: 0.01; height: 0.15');
    lampStandEntity.setAttribute('material', 'color: #888888');
    lampStandEntity.setAttribute('position', '0 -0.1 0');
    
    // Añadir componentes a la lámpara
    lampEntity.appendChild(lightEntity);
    lampEntity.appendChild(lampModelEntity);
    lampEntity.appendChild(lampStandEntity);
    
    // Posicionar la lámpara cerca del campo de visión del usuario pero sin estorbar
    lampEntity.setAttribute('position', '-0.5 1.5 0');
    
    // Ocultar la lámpara inicialmente
    lampEntity.setAttribute('visible', false);
    lampEntity.setAttribute('grabbable', true);
    
    // Añadir la lámpara a la escena
    sceneEl.appendChild(lampEntity);
    
    // Guardar referencia a la lámpara
    this.lampEntity = lampEntity;
  },
  
  // Método para mostrar/ocultar la lámpara
  toggleLamp: function(show) {
    if (this.lampEntity) {
      this.lampEntity.setAttribute('visible', show);
    }
  },
  
  createFurniture: function() {
    const sceneEl = this.el.sceneEl;
    const submenu2 = document.querySelector('#submenu2');
    
    // Obtener posición y rotación del submenu2
    const menuPosition = this.getMenuPosition(submenu2);
    
    // Incrementar el contador de muebles
    this.numFurniture++;

    // Crear entidad para el mueble
    const furnitureEntity = document.createElement('a-entity');
    
    // Asignar el ID único con el número secuencial
    furnitureEntity.setAttribute('id', 'menu-furniture' + this.numFurniture);

    // Calcular la posición relativa al frente del submenu2
    // Ajustamos z para que esté delante del menú
    const offsetZ = -1; // Distancia delante del menú
    
    // Calcular la posición considerando la rotación del menú
    const angle = menuPosition.b * (Math.PI / 180); // Convertir a radianes
    const offsetX = Math.sin(angle) * offsetZ;
    const adjustedZ = Math.cos(angle) * offsetZ;
    
    const position = {
        x: menuPosition.x + offsetX,
        y: menuPosition.y - 0.5,
        z: menuPosition.z + adjustedZ - 0.2
    };

    // Cargar el modelo correspondiente según el tipo de mueble
    if(this.chair){
      furnitureEntity.setAttribute('obj-model', {
        obj: 'https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/old_chair.obj?v=1745430016393',
        mtl: 'https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/old_chair.mtl?v=1745483139453'
      });
      furnitureEntity.setAttribute('scale', '0.01 0.01 0.01');
      position.y += -0.4;
    }else if(this.bed){
      furnitureEntity.setAttribute('gltf-model', 
        'https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/Bed_gltf.glb?v=1745490478737'
      );
      furnitureEntity.setAttribute('scale', '0.7 0.7 0.7');
    }else if(this.table){
      furnitureEntity.setAttribute('gltf-model', 
        'https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/uploads_files_3673019_table.glb?v=1745491767135'
      );
      furnitureEntity.setAttribute('scale', '1 1 1');
    }else if(this.nightstand){
      furnitureEntity.setAttribute('gltf-model', 
        'https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/uploads_files_4532938_Wooden%2B2%2BDrawers%2BNightstand.glb?v=1745492534532'
      );
      furnitureEntity.setAttribute('scale', '0.7 0.7 0.7');
    }else if(this.lamp){
      furnitureEntity.setAttribute('gltf-model', 
        'https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/uploads_files_6002454_Lampa_v2_glb.glb?v=1745511627153'
      );
      furnitureEntity.setAttribute('scale', '0.5 0.5 0.5');
      position.y += 0.25;
    }else if(this.bowl){
      furnitureEntity.setAttribute('gltf-model', 
        'https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/uploads_files_3962993_fruit_bowl.glb?v=1745512607464'
      );
      furnitureEntity.setAttribute('scale', '1 1 1');
    }else if(this.pictures){
      furnitureEntity.setAttribute('gltf-model', 
        'https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/uploads_files_3696339_Paintings.glb?v=1745512824249'
      );
      furnitureEntity.setAttribute('scale', '0.5 0.5 0.5');
      furnitureEntity.setAttribute('rotation', '0 ' + (menuPosition.b + 90) + ' 0'); // Ajustar rotación
      position.y += 0.15;
    }else if(this.plant){
      furnitureEntity.setAttribute('gltf-model', 
        'https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/uploads_files_5656299_Model_Caladium.glb?v=1745513921773'
      );
      furnitureEntity.setAttribute('scale', '0.5 0.5 0.5');
    }
    
    // Aplicar la posición calculada
    furnitureEntity.setAttribute('position', position);
    
    // Hacer que el mueble sea agarrable
    furnitureEntity.setAttribute('grabbable', true);
    
    // Vincular el mueble al submenu2 para seguimiento
    furnitureEntity.setAttribute('data-parent-menu', 'submenu2');

    // Añadir el mueble a la escena
    sceneEl.appendChild(furnitureEntity);

    // Guardar referencia al mueble
    this.furnitureEntity = furnitureEntity;

    console.log('Mueble creado con ID: ' + furnitureEntity.id + ' frente al submenu2');

    // Configurar el seguimiento del submenu2
    this.setupMenuTracking();

    return furnitureEntity;
  },
  deleteLastFurniture: function() {
    // Verificar si hay sillas para eliminar
    if (this.numFurniture <= 0) {
        console.log('No hay sillas para eliminar');
        return false;
    }
    
    // Obtener la última silla creada mediante su ID
    const furnitureToRemove = document.querySelector('#menu-furniture' + this.numFurniture);
    
    if (!furnitureToRemove) {
        console.warn('No se encontró el mueble con ID menu-furniture' + this.numFurniture);
        return false;
    }
    
    // Eliminar la silla de la escena
    furnitureToRemove.parentNode.removeChild(furnitureToRemove);
    
    // Disminuir el contador de sillas
    this.numFurniture--;
    
    // Actualizar la referencia a la última silla
    if (this.numFurniture > 0) {
        this.furnitureEntity = document.querySelector('#menu-furniture' + this.numFurniture);
    } else {
        this.furnitureEntity = null;
    }
    
    console.log('Mueble eliminado. Última mueble era: menu-furniture' + (this.numFurniture + 1) + '. Número de muebles restantes: ' + this.numFurniture);
    
    return true;
  },
  multipleBack: function(){
    var scene = document.querySelector("a-scene");
    // Guardar la posición actual del submenu2
        this.lastMenuPosition = this.getMenuPosition(this.submenu2);
        setTimeout(() => {
          if(this.furniture){
            this.initilizeBoolean('chair');
            this.initilizeBoolean('bed');
            this.initilizeBoolean('table');
            this.initilizeBoolean('nightstand');
            this.nextMenu(this.submenu2, this.submenu1);
          }else if(this.decoration){
            this.initilizeBoolean('lamp');
            this.initilizeBoolean('bowl');
            this.initilizeBoolean('pictures');
            this.initilizeBoolean('plant');
            this.nextMenu(this.submenu2, this.submenu3);
          }
        }, 200);
  },
});