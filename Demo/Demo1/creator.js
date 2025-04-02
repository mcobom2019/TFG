/* global AFRAME */
AFRAME.registerComponent('loader', {
  init: function() {
    // Cargar el JSON
    fetch('scene.json')
      .then(response => response.json())
      .then(data => {
        // Primero creamos todos los menús
        var menuPadre = data.menuPadre;
        this.createMenu(menuPadre);
        
        var subMenu1 = menuPadre.buttons[0].menuHijo1;
        this.createMenu(subMenu1);
      
        var subMenu2 = subMenu1.buttons[0].menuHijo2;
        this.createMenu(subMenu2);
        
        //submenu3
        var subMenu31 = subMenu2.buttons[1].menuHijo31;
        this.createMenu(subMenu31);
        var subMenu32 = subMenu2.buttons[2].menuHijo32;
        this.createMenu(subMenu32);
        var subMenu33 = subMenu2.buttons[3].menuHijo33;
        this.createMenu(subMenu33);
      
        //submenu4
        var subMenu41 = subMenu31.buttons[0].menuHijo41;
        this.createMenu(subMenu41);
        
        // Después de crear los menús, ahora configuramos los eventos
        this.setupEvents();
      })
      .catch(error => {
        console.error('Error cargando scene.json:', error);
      });
  },
  
  setupEvents: function() {
    // Referencia a los elementos del menú
    this.menuInicio = document.querySelector('#menuinicio');
    this.submenu1 = document.querySelector('#subMenu1');
    this.submenu2 = document.querySelector('#subMenu2');
    this.submenu31 = document.querySelector('#subMenu31');
    this.submenu32 = document.querySelector('#subMenu32');
    this.submenu33 = document.querySelector('#subMenu33');
    this.submenu41 = document.querySelector('#subMenu41');

    // Botones menuInicio
    this.startButtonEl = document.querySelector('#startButton');
    this.xButtonEl = document.querySelector('#xButton');

    //Botones Submenu1
    this.barrasButtonEl = document.querySelector('#barrasButton');
    this.atrasButtonEl = document.querySelector('#atrasButton');

    //Botones submenu2
    this.backButtonEl = document.querySelector('#backButton');
    this.motorButtonEl = document.querySelector('#motorButton');
    this.colorButtonEl = document.querySelector('#colorButton');
    this.puertasButtonEl = document.querySelector('#puertasButton');
    
    //Botones submenu31
    this.backButtonEl21 = document.querySelector('#backButton21');
    this.electricoButtonEl = document.querySelector('#electricoButton');
    
    //Botones submenu32
    this.backButtonEl22 = document.querySelector('#backButton22');
    
    //Botones submenu33
    this.backButtonEl23 = document.querySelector('#backButton23');
    
    //controladores botones menuInicio
    this.startButtonEl.addEventListener('click', () => {
      if (this.submenu1 && this.menuInicio) {
        this.submenu1.setAttribute('visible', true);
        this.menuInicio.setAttribute('visible', false);
        
        // Hacer visibles los botones del submenu1
        const buttons = this.submenu1.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', true);
        });
        const buttons2 = this.menuInicio.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
      }
    });
    this.xButtonEl.addEventListener('click', () => {
        this.submenu1.setAttribute('visible', false);
        this.menuInicio.setAttribute('visible', false);
        
        const buttons2 = this.menuInicio.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
    });
    
    //controladores botones submenu1
    this.atrasButtonEl.addEventListener('click', () => {
        this.submenu1.setAttribute('visible', false);
        this.menuInicio.setAttribute('visible', true);
        
        const buttons = this.submenu1.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.menuInicio.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.barrasButtonEl.addEventListener('click', () => {
        this.submenu1.setAttribute('visible', false);
        this.submenu2.setAttribute('visible', true);
        
        const buttons = this.submenu1.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu2.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    //controladores botones submenu2
    this.backButtonEl.addEventListener('click', () => {
        this.submenu2.setAttribute('visible', false);
        this.submenu1.setAttribute('visible', true);
        
        const buttons = this.submenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu1.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.motorButtonEl.addEventListener('click', () => {
        this.submenu2.setAttribute('visible', false);
        this.submenu31.setAttribute('visible', true);
        
        const buttons = this.submenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu31.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.colorButtonEl.addEventListener('click', () => {
        this.submenu2.setAttribute('visible', false);
        this.submenu32.setAttribute('visible', true);
        
        const buttons = this.submenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu32.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.puertasButtonEl.addEventListener('click', () => {
        this.submenu2.setAttribute('visible', false);
        this.submenu33.setAttribute('visible', true);
        
        const buttons = this.submenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu33.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    //controladores botones submenu3.1
    this.backButtonEl21.addEventListener('click', () => {
        this.submenu31.setAttribute('visible', false);
        this.submenu2.setAttribute('visible', true);
        
        const buttons = this.submenu31.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu2.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.electricoButtonEl.addEventListener('click', () => {
        this.submenu31.setAttribute('visible', false);
        this.submenu41.setAttribute('visible', true);
        
        const buttons = this.submenu31.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu41.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    
    //controladores botones submenu3.2
    this.backButtonEl22.addEventListener('click', () => {
        this.submenu32.setAttribute('visible', false);
        this.submenu2.setAttribute('visible', true);
        
        const buttons = this.submenu32.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu2.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    
    //controladores botones submenu3.3
    this.backButtonEl23.addEventListener('click', () => {
        this.submenu33.setAttribute('visible', false);
        this.submenu2.setAttribute('visible', true);
        
        const buttons = this.submenu33.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu2.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
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
          width: button.width || 0.11,
          toggleable: button.toggleable || false,
          primitive: button.primitive || 'box'
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
  }
});