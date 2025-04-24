/* global AFRAME */
AFRAME.registerComponent('menu', {
  init: function() {
    // Cargar el JSON
    this.pie = false;
    this.bar = false;
    this.electric = false;
    this.diesel = false;
    this.gasoline = false;
    this.white = false;
    this.black = false;
    this.red = false;
    this.yellow = false;
    this.threedoors = false;
    this.fivedoors = false;
    
    this.initmenu = false;
    this.m1 = false;
    this.m2 = false;
    this.m31 = false;
    this.m32 = false;
    this.m33 = false;
    this.m4 = false;
    this.isDarkMode = false;
    this.numChair = 0;
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
    
    //controlador boton maximizar
    this.maximizeButtonEl.addEventListener('click', () => {
        this.maximizeButtonEl.setAttribute('visible', false);
        if(this.initmenu){
          setTimeout(() => {
            this.maximizeMenu(this.menuinicio);
            if(this.isDarkMode){
              this.darkButtonEl.setAttribute('visible', false);
            }else{
              this.lightButtonEl.setAttribute('visible', false);
            }
            this.initilizeBoolean('initmenu');
          }, 500);
        }else if(this.m1){
          setTimeout(() => {
            this.maximizeMenu(this.submenu1);
            this.initilizeBoolean('m1');
          }, 500);
        }else if(this.m2){
          setTimeout(() => {
            this.maximizeMenu(this.submenu2);
            this.initilizeBoolean('m2');
          }, 500);
        }else if(this.m31){
          setTimeout(() => {
            this.maximizeMenu(this.submenu31);
            this.initilizeBoolean('m31');
          }, 500);
        }else if(this.m32){
          setTimeout(() => {
            this.maximizeMenu(this.submenu32);
            this.initilizeBoolean('m32');
          }, 500);
        }else if(this.m33){
          setTimeout(() => {
            this.maximizeMenu(this.submenu33);
            this.initilizeBoolean('m33');
          }, 500);
        }else if(this.m4){
          setTimeout(() => {
            this.maximizeMenu(this.submenu4);
            this.initilizeBoolean('m4');
          }, 500);
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
    // Guardamos el estado inicial para poder restaurarlo después
    this.originalSkyVisible = document.querySelector('a-sky').getAttribute('visible');
    // Cambiar a modo oscuro
    document.querySelector('a-sky').setAttribute('visible', false);
    document.querySelector('#luz1').setAttribute('light', 'intensity', 0);
    document.querySelector('#luz2').setAttribute('light', 'intensity', 0);
    this.el.sceneEl.setAttribute('environment', {preset: 'starry'});
    this.toggleLamp(true);
    this.isDarkMode = true;
    setTimeout(() => {
      this.lightButtonEl.setAttribute('visible', true);
    }, 250);
  },
    lightMode: function() {
    this.lightButtonEl.setAttribute('visible', false);
    // Restaurar exactamente al estado inicial
    this.el.sceneEl.removeAttribute('environment');
    document.querySelector('a-sky').setAttribute('src', '#sky');
    document.querySelector('a-sky').setAttribute('visible', true);
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
    lampEntity.setAttribute('position', '-0.5 1.5 -0.5');
    
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
  createChair: function() {
    const sceneEl = this.el.sceneEl;

    // Incrementar el contador de sillas
    this.chairCounter++;

    // Crear entidad para la silla
    const chairEntity = document.createElement('a-entity');
    
    // Asignar el ID único con el número secuencial
    chairEntity.setAttribute('id', 'menu-chair' + this.chairCounter);

    // Cargar el modelo OBJ de la silla
    chairEntity.setAttribute('obj-model', {
      obj: 'https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/Chair_low.obj?v=1745482071205',
      
    });

    // Ajustar escala si es necesario
    chairEntity.setAttribute('scale', '0.01 0.01 0.01');

    // Posicionar la silla en la escena
    chairEntity.setAttribute('position', '0 0.5 -2');

    // Hacer que la silla sea agarrable
    chairEntity.setAttribute('grabbable', true);

    // Añadir la silla a la escena
    sceneEl.appendChild(chairEntity);

    // Guardar referencia a la silla (opcional: podrías crear un array para guardar todas)
    this.chairEntity = chairEntity;

    console.log('Silla creada con ID: ' + chairEntity.id);

    return chairEntity;
  },
  deleteChair: function() {
    // Verificar si hay sillas para eliminar
    if (this.chairCounter <= 0) {
        console.log('No hay sillas para eliminar');
        return false;
    }
    
    // Obtener la última silla creada mediante su ID
    const chairToRemove = document.querySelector('#menu-chair' + this.chairCounter);
    
    if (!chairToRemove) {
        console.warn('No se encontró la silla con ID menu-chair' + this.chairCounter);
        return false;
    }
    
    // Eliminar la silla de la escena
    chairToRemove.parentNode.removeChild(chairToRemove);
    
    // Si estamos usando un array para almacenar referencias
    if (this.chairs && this.chairs.length > 0) {
        this.chairs.pop(); // Eliminar la última silla del array
    }
    
    // Disminuir el contador de sillas
    this.chairCounter--;
    
    // Actualizar la referencia a la última silla
    if (this.chairCounter > 0) {
        this.chairEntity = document.querySelector('#menu-chair' + this.chairCounter);
    } else {
        this.chairEntity = null;
    }
    
    console.log('Silla eliminada. Última silla era: menu-chair' + (this.chairCounter + 1) + '. Número de sillas restantes: ' + this.chairCounter);
    
    return true;
}/*createChair: function() {
    const sceneEl = this.el.sceneEl;

    // Incrementar el contador
    this.chairCounter++;
    
    // Crear la silla
    const chairEntity = document.createElement('a-entity');
    chairEntity.setAttribute('id', 'menu-chair' + this.chairCounter);
    
    // Configurar la silla (mantener la configuración original)
    chairEntity.setAttribute('obj-model', {
        obj: 'https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/old_chair.obj?v=1745430016393',
        mtl: 'https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/old_chair.mtl?v=1745430026754'
    });
    chairEntity.setAttribute('scale', '0.01 0.01 0.01');
    chairEntity.setAttribute('position', '0 0.5 -2');
    chairEntity.setAttribute('grabbable', true);
    
    // Añadir la silla a la escena
    sceneEl.appendChild(chairEntity);
    
    // Guardar la referencia a la entidad en el array
    this.chairs.push(chairEntity);
    
    console.log('Silla creada con ID: ' + chairEntity.id + '. Total sillas: ' + this.chairs.length);
    return chairEntity;
},

// Reemplazar completamente la función deleteChair:
deleteChair: function() {
    // Verificar si hay sillas para eliminar
    if (this.chairs.length === 0) {
        console.log('No hay sillas para eliminar');
        return false;
    }
    
    // Obtener la última silla añadida (la última en el array)
    const lastChair = this.chairs.pop();
    
    // Registro para depuración
    console.log('Eliminando silla: ' + lastChair.id);
    
    // Eliminar la silla de la escena
    if (lastChair.parentNode) {
        lastChair.parentNode.removeChild(lastChair);
    }
    
    // Actualizar el contador si es necesario
    this.chairCounter = this.chairs.length;
    
    console.log('Silla eliminada. Quedan ' + this.chairs.length + ' sillas');
    return true;
}*/
});