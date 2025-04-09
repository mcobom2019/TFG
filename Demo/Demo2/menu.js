/* global AFRAME */
AFRAME.registerComponent('menu', {
  init: function() {
    this.im = false;
    this.cm1 = false;
    this.cm2 = false;
    this.cm3 = false;
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
    this.initMenu = document.querySelector('#initmenu');
    this.childMenu1 = document.querySelector('#childmenu1');
    this.childMenu2 = document.querySelector('#childmenu2');
    this.childMenu3 = document.querySelector('#childmenu3');
    
    //boton de la mano izquierda Maximizar
    this.maximizeButtonEl = document.querySelector('#maximizeButton');
    this.maximizeButtonEl.setAttribute('rotation', '0 0 0');

    // Botones menuInicio
    this.startButtonEl = document.querySelector('#startButton');
    this.xButtonEl = document.querySelector('#xButton');
    this.minButton1El = document.querySelector('#minButton1');
    
    //Botones Submenu1
    this.musicButtonEl = document.querySelector('#musicButton');
    this.circularButtonEl = document.querySelector('#circularButton');
    this.backButton1El = document.querySelector('#backButton1');
    this.minButton2El = document.querySelector('#minButton2');

    //Botones submenu2
    this.backButton2El = document.querySelector('#backButton2');
    this.llseButtonEl = document.querySelector('#llseButton');
    this.gladiatorButtonEl = document.querySelector('#gladiatorButton');
    this.dpButtonEl = document.querySelector('#dpButton');
    this.minButton3El = document.querySelector('#minButton3');
    
    //Botones submenu31
    this.backButtonEl21 = document.querySelector('#backButton21');
    this.playButtonEl = document.querySelector('#playButton');
    this.pauseButton = document.querySelector('#pauseButton');
    this.stopButton = document.querySelector('#stopButton');
    this.minButton41El = document.querySelector('#minButton41');
    
    //controladores botones menuInicio
    this.startButtonEl.addEventListener('click', () => {
      if (this.childMenu1 && this.initMenu) {
        this.lastMenuPosition = this.getMenuPosition(this.initMenu);
        this.changeGrabbable(this.childMenu1, this.initMenu);
        this.initMenu.setAttribute('visible', false);
        const buttons2 = this.initMenu.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
        setTimeout(() => {
          this.applyMenuPosition(this.childMenu1, this.lastMenuPosition);
          this.childMenu1.setAttribute('visible', true);
          const buttons = this.childMenu1.querySelectorAll('[id]');
          buttons.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
      }
    });
    
    this.minButton1El.addEventListener('click', () => {
        this.im = true;
        this.lastMenuPosition = this.getMenuPosition(this.initMenu);
        this.initMenu.setAttribute('visible', false);
        const buttons2 = this.initMenu.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
        setTimeout(() => {
          this.maximizeButtonEl.setAttribute('visible', true);
        }, 500);
      
    });
    
    this.xButtonEl.addEventListener('click', () => {
        this.initMenu.setAttribute('visible', false);
        const buttons2 = this.initMenu.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
    });
    
    //controladores botones submenu1
    this.backButton1El.addEventListener('click', () => {
        this.lastMenuPosition = this.getMenuPosition(this.childMenu1);
        this.childMenu1.setAttribute('visible', false);
        this.changeGrabbable(this.initMenu, this.childMenu1);
        const buttons = this.childMenu1.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.initMenu, this.lastMenuPosition);
          this.initMenu.setAttribute('visible', true);
          const buttons2 = this.initMenu.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.musicButtonEl.addEventListener('click', () => {
        this.lastMenuPosition = this.getMenuPosition(this.childMenu1);
        this.changeGrabbable(this.childMenu2, this.childMenu1);
        this.childMenu1.setAttribute('visible', false);
        const buttons = this.childMenu1.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.childMenu2, this.lastMenuPosition);
          this.childMenu2.setAttribute('visible', true);
          const buttons2 = this.childMenu2.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.circularButtonEl.addEventListener('click', () => {
        this.pie = true;
        this.lastMenuPosition = this.getMenuPosition(this.submenu1);
        this.changeGrabbable(this.submenu2, this.submenu1);
        this.submenu1.setAttribute('visible', false);
        const buttons = this.submenu1.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu2, this.lastMenuPosition);
          this.submenu2.setAttribute('visible', true);
          const buttons2 = this.submenu2.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.minButton2El.addEventListener('click', () => {
      this.cm1 = true;
        this.lastMenuPosition = this.getMenuPosition(this.childMenu1);
        this.childMenu1.setAttribute('visible', false);
        const buttons = this.childMenu1.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        setTimeout(() => {
          this.maximizeButtonEl.setAttribute('visible', true);
        }, 500);
    });
    
    //controladores botones submenu2
    this.backButton2El.addEventListener('click', () => {
        this.lastMenuPosition = this.getMenuPosition(this.childMenu2);
        this.changeGrabbable(this.childMenu1, this.childMenu2);
        this.childMenu2.setAttribute('visible', false);
        const buttons = this.childMenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.childMenu1, this.lastMenuPosition);
          this.childMenu1.setAttribute('visible', true);
          const buttons2 = this.childMenu1.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.llseButtonEl.addEventListener('click', () => {
        this.lastMenuPosition = this.getMenuPosition(this.childMenu2);
        this.changeGrabbable(this.childMenu3, this.childMenu2);
        this.childMenu2.setAttribute('visible', false);
        const buttons = this.childMenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        this.loadSong("llse");
        setTimeout(() => {
          this.applyMenuPosition(this.childMenu3, this.lastMenuPosition);
          this.childMenu3.setAttribute('visible', true);
          const buttons2 = this.childMenu3.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.gladiatorButtonEl.addEventListener('click', () => {
        this.lastMenuPosition = this.getMenuPosition(this.childMenu2);
        this.changeGrabbable(this.childMenu3, this.childMenu2);
        this.childMenu2.setAttribute('visible', false);
        const buttons = this.childMenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        this.loadSong("gladiator");
        setTimeout(() => {
          this.applyMenuPosition(this.childMenu3, this.lastMenuPosition);
          this.childMenu3.setAttribute('visible', true);
          const buttons2 = this.childMenu3.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.dpButtonEl.addEventListener('click', () => {
        this.lastMenuPosition = this.getMenuPosition(this.childMenu2);
        this.changeGrabbable(this.childMenu3, this.childMenu2);
        this.childMenu2.setAttribute('visible', false);
        const buttons = this.childMenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        this.loadSong("Darling Pretty");
        setTimeout(() => {
          this.applyMenuPosition(this.childMenu3, this.lastMenuPosition);
          this.childMenu3.setAttribute('visible', true);
          const buttons2 = this.childMenu3.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.minButton3El.addEventListener('click', () => {
        this.cm2 = true;
        this.lastMenuPosition = this.getMenuPosition(this.childMenu2);
        this.childMenu2.setAttribute('visible', false);
        const buttons = this.childMenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        setTimeout(() => {
          this.maximizeButtonEl.setAttribute('visible', true);
        }, 500);
    });
    
    //controladores botones submenu3.1
    this.backButtonEl21.addEventListener('click', () => {
        this.lastMenuPosition = this.getMenuPosition(this.childMenu3);
        this.changeGrabbable(this.childMenu2, this.childMenu3);
        this.childMenu3.setAttribute('visible', false);
        const buttons = this.childMenu3.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.isPlaying = false;
        setTimeout(() => {
          this.applyMenuPosition(this.childMenu2, this.lastMenuPosition);
          this.childMenu2.setAttribute('visible', true);
          const buttons2 = this.childMenu2.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.playButtonEl.addEventListener('click', () => {
        this.playButtonEl.addEventListener('click', () => {
          console.log('Reproduciendo música...');
          if (this.audioElement) {
            this.audioElement.play();
            this.isPlaying = true;
          }
        });
    });
    
    this.pauseButton.addEventListener('click', () => {
      console.log('Pausando música...');
      if (this.audioElement && this.isPlaying) {
        this.audioElement.pause();
        this.isPlaying = false;
      }
    });
    
    this.stopButton.addEventListener('click', () => {
      console.log('Deteniendo música...');
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.isPlaying = false;
      }
    });
    
    this.minButton41El.addEventListener('click', () => {
        this.cm3 = true;
        this.lastMenuPosition = this.getMenuPosition(this.childMenu3);
        this.childMenu3.setAttribute('visible', false);
        const buttons = this.childMenu3.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        setTimeout(() => {
          this.maximizeButtonEl.setAttribute('visible', true);
        }, 500);
    });
    
    //controlador boton maximizar
    this.maximizeButtonEl.addEventListener('click', () => {
        this.maximizeButtonEl.setAttribute('visible', false);
        if(this.im){
          setTimeout(() => {
            this.initMenu.setAttribute('visible', true);
            const buttons = this.initMenu.querySelectorAll('[id]');
            buttons.forEach(button => {
              button.setAttribute('visible', true);
            });
            this.im = false;
          }, 500);
        }else if(this.cm1){
          setTimeout(() => {
            this.childMenu1.setAttribute('visible', true);
            const buttons = this.childMenu1.querySelectorAll('[id]');
            buttons.forEach(button => {
              button.setAttribute('visible', true);
            });
            this.cm1 = false;
          }, 500);
        }else if(this.cm2){
          setTimeout(() => {
            this.childMenu2.setAttribute('visible', true);
            const buttons = this.childMenu2.querySelectorAll('[id]');
            buttons.forEach(button => {
              button.setAttribute('visible', true);
            });
            this.cm2 = false;
          }, 500);
        }else if(this.cm3){
          setTimeout(() => {
            this.childMenu3.setAttribute('visible', true);
            const buttons = this.childMenu3.querySelectorAll('[id]');
            buttons.forEach(button => {
              button.setAttribute('visible', true);
            });
            this.cm3 = false;
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
  
  loadSong: function(name){
    const audioEl = document.createElement('audio');
        audioEl.id = 'backgroundMusic';
        if(name == "llse"){
          audioEl.src = 'https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/La%20M.O.D.A.%20_%20Los%20locos%20son%20ellos.mp3?v=1744133441584';
        }else if(name == "gladiator"){
          audioEl.src = 'https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/Now%20We%20Are%20Free.mp3?v=1744188527544';
        }else if(name == "Darling Pretty"){
          audioEl.src = "https://cdn.glitch.global/1f8e0b5c-8472-495a-a6ce-b620a6cdfd40/Mark%20Knopfler%20-%20Darling%20Pretty%20(Official%20Video).mp3?v=1744194898957";
        }
        audioEl.preload = 'auto';
        audioEl.loop = true; // Hacer que la canción se repita
        document.body.appendChild(audioEl);

        // Guardar referencia al elemento de audio
        this.audioElement = audioEl;

        // Estado inicial: música parada
        this.isPlaying = false;
}
});