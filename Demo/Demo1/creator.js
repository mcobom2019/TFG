/* global AFRAME */
AFRAME.registerComponent('loader', {
  init: function() {
    const sceneEl = this.el;
    
    // Cargar el JSON
    fetch('scene.json')
      .then(response => response.json())
      .then(data => {
        // Establecer el color de fondo
        //const skyEl = document.createElement('a-sky');
        //skyEl.setAttribute('color', data.scene.background.color);
        //sceneEl.appendChild(skyEl);
        
        // Crear entidades
        //data.scene.menuPadre.forEach(entity => {
        const pMenu = data.menuPadre;
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
      })
  },
  createButtons: function(parentEl, buttons) {
    buttons.forEach((button, index) => { 
      const buttonEl = document.createElement('a-entity');
      
      if(button.label){
        buttonEl.setAttribute('label', button.label);
        buttonEl.setAttribute('button', '');
      }
      if(button.id){
        buttonEl.setAttribute('id', button.id);
      }
      if(button.position){
        buttonEl.setAttribute('position', button.position);
      }
      if(button.visible){
        buttonEl.setAttribute('visible', button.visible);
      }
      if(button.width){
        buttonEl.setAttribute('width', button.width);
      }
      if(button.toggleable){
        buttonEl.setAttribute('toggleable', button.toggleable);
      }
      
      parentEl.appendChild(buttonEl);
    })
  }
});