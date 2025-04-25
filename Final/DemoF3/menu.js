/* global AFRAME */
AFRAME.registerComponent('menu', {
  init: function() {
    this.im = false;
    this.cm1 = false;
    this.cm2 = false;
    this.cm3 = false;
    this.cm4 = false;
    this.cm5 = false;
    
    this.sphere = false;
    this.box = false;
    this.cylinder = false;
    this.cone = false;
    //la última posición del menu
    this.lastMenuPosition = { x: 0, y: 0, z: 0 };
    this.lastMenuRotation = { x: 0, y: 0, z: 0 };
    
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
        if(this.im){
            this.maximizeMenu(this.initMenu);
            this.changeBoolean('im');
        }else if(this.cm1){
            this.maximizeMenu(this.childMenu1);
            this.changeBoolean('cm1');
        }else if(this.cm2){
            this.maximizeMenu(this.childMenu2);
            this.changeBoolean('cm2');
        }else if(this.cm3){
            this.maximizeMenu(this.childMenu3);
            this.changeBoolean('cm3');
        }else if(this.cm4){
            this.maximizeMenu(this.childMenu4);
            this.changeBoolean('cm4');
        }else if(this.cm5){
            this.maximizeMenu(this.childMenu5);
            this.changeBoolean('cm5');
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
      menuEl.setAttribute('menuinicio', {
        width: pMenu.width || 0.6,
        height: pMenu.height || 0.4,
        radius: pMenu.radius || 0.03
      });

      if(menuEl.id === "subMenu4"){
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
      menuEl.setAttribute('grabbable', '');
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
  
  loadSong: function(name){
    const audioEl = document.createElement('audio');
        audioEl.id = 'backgroundMusic';
        if(name == "birds"){
          audioEl.src = 'https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/cantos-de-pajaros-para-relajar_btET4k1W.mp3?v=1745605337904';
        }else if(name == "water"){
          audioEl.src = "https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/agua-de-rio-fluyendo_elp1GLMm.mp3?v=1745605564985";
        }else if(name == "Fire"){
          audioEl.src = "https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/Hoguera%20%20relax%20sonido%20fueg%20(mp3cut.net).mp3?v=1745606497177";
        }else if(name == "Rain"){
          audioEl.src = "https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/Sonido%20de%20Lluvia%20Relajante%20(mp3cut.net).mp3?v=1745607104182";
        }else if(name == "gladiator"){
          audioEl.src = 'https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/now-we-are-free_eTmCadBH.mp3?v=1745604914553';
        }else if(name == "Darling Pretty"){
          audioEl.src = "https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/Mark%20Knopfler%20-%20Darling%20Pretty%20(Official%20Video).mp3?v=1744194898957";
        }else if(name == "America"){
          audioEl.src = "https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/once-upon-a-time-in-america-soundtrack-cockeyes-song_cBxq2aDx.mp3?v=1745602912037";
        }else if(name == "Bueno"){
          audioEl.src = "https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/the-good-the-bad-and-the-ugly-main-theme_LUk8QbcC.mp3?v=1745603822349";
        }else if(name == "thesurrender"){
          audioEl.src = "https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/ennio-morricone-the-surrender-la-resa-hd_mzmlUlUq.mp3?v=1745604182718";
        }
        audioEl.preload = 'auto';
        audioEl.loop = true; // Hacer que la canción se repita
        document.body.appendChild(audioEl);

        // Guardar referencia al elemento de audio
        this.audioElement = audioEl;

        // Estado inicial: música parada
        this.isPlaying = false;
  },
  
  createForm: function (){
    var type = "";
    if(this.sphere){
      type = "sphere";
    }else if(this.box){
      type = "box";
    }else if(this.cylinder){
      type = "cylinder";
    }else if(this.cone){
      type = "cone";
    }
    
    const prevElement = document.querySelector('a-' + type);
    if(prevElement){
      return;
    }
    // Crear el elemento con el tipo especificado
    const element = document.createElement('a-' + type);
    
    // Configurar propiedades comunes
    element.setAttribute('position', '0 1 -2');
    element.setAttribute('color', '#FF6347');
    element.setAttribute('scale', '0.5 0.5 0.5');
    element.setAttribute('shadow', '');
    element.setAttribute('grabbable', '');

    // Añadir el elemento a la escena
    const escene = document.querySelector('a-scene');
    escene.appendChild(element);
  },
  
  deleteForm: function() {
    // Buscar la última primitiva creada del tipo especificado
    var type = "";
    if(this.sphere){
      type = "sphere";
    }else if(this.box){
      type = "box";
    }else if(this.cylinder){
      type = "cylinder";
    }else if(this.cone){
      type = "cone";
    }
    const element = document.querySelector('a-' + type);

    if (!element) {
      console.error(`No se encontró ningún elemento del tipo: ${type}`);
      return false;
    }
    try {
      // Eliminar el elemento de la escena
      element.parentNode.removeChild(element);
      console.log(`Elemento ${type} eliminado correctamente`);
      return true;
    } catch (error) {
      console.error('Error al eliminar el elemento:', error);
      return false;
    }
  },
  
  plusSize: function (){
    var type = "";
    if(this.sphere){
      type = "sphere";
    }else if(this.box){
      type = "box";
    }else if(this.cylinder){
      type = "cylinder";
    }else if(this.cone){
      type = "cone";
    }
    
    const element = document.querySelector('a-' + type);
    if (!element) {
      console.error(`No se encontró ningún elemento del tipo: ${type}`);
      return false;
    }else{
      const currentScale = element.getAttribute('scale');
      element.setAttribute('scale', {
        x: currentScale.x * 1.1,
        y: currentScale.y * 1.1,
        z: currentScale.z * 1.1
      });
    }
  },
  
  changeColor: function (){
    var type = "";
    if(this.sphere){
      type = "sphere";
    }else if(this.box){
      type = "box";
    }else if(this.cylinder){
      type = "cylinder";
    }else if(this.cone){
      type = "cone";
    }
    
    const element = document.querySelector('a-' + type);
    if (!element) {
      console.error(`No se encontró ningún elemento del tipo: ${type}`);
      return false;
    }else{
      element.setAttribute('color', this.randomColor());
    }
  },
  
  randomColor: function(){
    const r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
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
        }, 500);
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
  
  maximizeMenu: function(menu){
    setTimeout(() => {
        menu.setAttribute('visible', true);
        const buttons = menu.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', true);
        });
    }, 500);
  },
  // Función para procesar automáticamente las referencias a los menús
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
  // Añade esta función después de setupMenuReferences
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
  setupAutomaticNextMenuEvents: function() {
    if (!this.data) return;
    
    // Función recursiva para configurar eventos de nextMenu en un menú y sus submenús
    const setupNextMenuEventsInMenu = (menuObj) => {
      if (!menuObj || !menuObj.buttons || !Array.isArray(menuObj.buttons)) return;
      
      // Recorrer todos los botones del menú
      menuObj.buttons.forEach(button => {
        // Si el botón tiene la función nextMenu y sus parámetros
        if (button.function === "nextMenu" && button.parameter1 && button.parameter2) {
          const buttonEl = document.querySelector('#' + button.id);
          const menuFrom = document.querySelector('#' + button.parameter1);
          const menuTo = document.querySelector('#' + button.parameter2);
          
          if (buttonEl && menuFrom && menuTo) {
            console.log(`Configurando evento nextMenu automático para botón ${button.id}: de ${button.parameter1} a ${button.parameter2}`);
            
            // Crear el event listener automáticamente
            buttonEl.addEventListener('click', () => {
              this.nextMenu(menuFrom, menuTo);
            });
          } else {
            console.warn(`No se puede configurar evento para botón ${button.id}, faltan elementos DOM necesarios`);
          }
        }
        
        // Buscar submenús para procesar sus botones recursivamente
        Object.keys(button).forEach(key => {
          if (key.startsWith('menuC') && button[key]) {
            setupNextMenuEventsInMenu(button[key]);
          }
        });
      });
    };
    
    // Comenzar la configuración desde todos los menús principales
    Object.keys(this.data).forEach(key => {
      if (key.startsWith('menuP')) {
        setupNextMenuEventsInMenu(this.data[key]);
      }
    });
  },
  deleteMenu: function(menu){
        menu.setAttribute('visible', false);
        const buttons2 = menu.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
  },
  
  playMusic: function(){
     console.log('Reproduciendo música...');
      if (this.audioElement) {
        this.audioElement.play();
        this.isPlaying = true;
      }
  },
  
  pauseMusic: function(){
    console.log('Pausando música...');
      if (this.audioElement && this.isPlaying) {
        this.audioElement.pause();
        this.isPlaying = false;
      }
  },
  
  stopMusic: function(){
    console.log('Deteniendo música...');
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.isPlaying = false;
      }
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
  initilizeBoolean: function(boolName) {
    this[boolName] = false;
  }
  
});
