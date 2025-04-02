/* global AFRAME */
AFRAME.registerComponent('loader', {
  init: function() {
    
    
    // Cargar el JSON
    fetch('scene.json')
      .then(response => response.json())
      .then(data => {
        var pMenu = data.menuPadre;
        this.createMenu(pMenu);
        this.bindMethods(pMenu);
        pMenu = data.subMenu1;
        this.createMenu(pMenu);
    })
        
  },
  
  bindMethods: function (pMenu) {
    this.onClick = this.onClick.bind(this, pMenu);
  },
  
  onClick: function (evt, pMenu) {
    var targetEl = evt.target;
    if(pMenu.id == "menuinicio"){
      this.menuInicio = document.querySelector('#menuinicio');
      this.submenu1 = document.querySelector('#subMenu1');
      this.startButtonEl = document.querySelector('#startButton');
      this.startButtonEl.addEventListener('click', this.onClick);
      if (targetEl === this.startButtonEl) {
        this.submenu1.setAttribute('visible', true);
        this.menuInicio.setAttribute('visible', false);
      }
    }
  },
  
  
  createMenu: function(pMenu){
      const sceneEl = this.el;
      const menuEl = document.createElement('a-entity');
        
        if(pMenu.id){
          menuEl.setAttribute('id', pMenu.id);
          menuEl.setAttribute('menuinicio', '');
        }
        if(pMenu.position){
          menuEl.setAttribute('position', pMenu.position);
        }
        if(pMenu.visible){
          menuEl.setAttribute('visible', pMenu.visible);
        }
        if(pMenu.grabbable){
          menuEl.setAttribute('grababble', '');
        }
        
        if(pMenu.buttons && pMenu.buttons.length>0){
          this.createButtons(menuEl, pMenu.buttons);
        }
      
        sceneEl.appendChild(menuEl);
    },          
  createButtons: function(parentEl, buttons) {
    buttons.forEach((button, index) => { 
      const buttonEl = document.createElement('a-entity');
      
      if(button.id){
        buttonEl.setAttribute('id', button.id);
        buttonEl.setAttribute('button', {
          label: button.label,
          width: button.width,
          toggeable: button.toggeable
        });
      }
      if(button.position){
        buttonEl.setAttribute('position', button.position);
      }
      if(button.visible){
        buttonEl.setAttribute('visible', button.visible);
      }
      
      parentEl.appendChild(buttonEl);
      
    })
  }
});