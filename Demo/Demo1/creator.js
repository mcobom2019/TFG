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
        
        var subMenu1 = data.subMenu1 || menuPadre.buttons[0].menuHijo1;
        this.createMenu(subMenu1);
        
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
  
  // Si el submenu1 existe, configuramos su visibilidad inicial
  if (this.submenu1) {
    this.submenu1.setAttribute('visible', false);
  }
  
  // Botón de inicio
  this.startButtonEl = document.querySelector('#startButton');
  
  if (this.startButtonEl) {
    // En lugar de addEventListener, usamos .on() para escuchar eventos A-Frame
    this.startButtonEl.addEventListener('click', () => {
      console.log("Evento click detectado en startButton");
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
  }
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