/* global AFRAME */
AFRAME.registerComponent('menuinicio', {
  init: function () {
    this.lastTime=0;
    var el = this.el;
    var menuBackGroundEl = document.createElement('a-entity');
    menuBackGroundEl.setAttribute('geometry', {
      primitive: 'box',
      width: 0.6,
      height: 0.40,
      depth: 0.01
    });
    menuBackGroundEl.setAttribute('material', {
      color: 'gray'
    });
    menuBackGroundEl.setAttribute('position', '0 0 -0.025');
    el.appendChild(menuBackGroundEl);
  },
  /*tick: function (){
    this.menuInicio = document.querySelector('#menuinicio');
    if(this.menuInicio.getAttribute('visible') == true){
      this.menuInicio.setAttribute('grabbable', '');
    }else{
      this.menuInicio.removeAttribute('grabbable');
    }
  },*/
});

/* global AFRAME */
AFRAME.registerComponent('controlinicio', {
  schema: {
      Minimizar: {default: false},
      
  },
  resetValues: function() {
    this.data.Minimizar = false;
  },
  init: function () {
    this.bindMethods();
  
    // Referencias a los elementos
    this.menuInicio = document.querySelector('#menuinicio');
    this.submenu1 = document.querySelector('#subMenu1');
  
    //boton start
    this.startButtonEl = document.querySelector('#startButton');
    this.startButtonEl.addEventListener('click', this.onClick);
    
    //boton X
    this.xButtonEl = document.querySelector('#xButton');
    this.xButtonEl.addEventListener('click', this.onClick);
    
    //Boton darkMode 
    this.darkButtonEl = document.querySelector('#darkButton');
    this.darkButtonEl.addEventListener('click', this.onClick);

    // Estado inicial del modo oscuro
    this.isDarkMode = false;
  },
  
  /*tick: function (time){
    if (time - this.lastTime < 1000){
      return;
    }
      this.lastTime = time;
      //this.submenu1 = document.querySelector('#subMenu1');
      console.log("menuInicio:", this.menuInicio.getAttribute('visible'));
      if(this.menuInicio.getAttribute('visible') == true){
        this.menuInicio.setAttribute('grabbable', '');
      }else{
        this.menuInicio.removeAttribute('grabbable');
      }
  },*/

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
  },

  onClick: function (evt) {
    var targetEl = evt.target;
    if (targetEl === this.startButtonEl) {
      setTimeout(() => {
        this.submenu1.setAttribute('visible', true);
        this.menuInicio.setAttribute('visible', false);
        
        document.getElementById('startButton').setAttribute('visible', false);
        document.getElementById('xButton').setAttribute('visible', false);
        document.getElementById('darkButton').setAttribute('visible', false);
        document.getElementById('minButton1').setAttribute('visible', false);
        
        document.getElementById('atrasButton').setAttribute('visible', true);
        document.getElementById('barrasButton').setAttribute('visible', true);
        document.getElementById('circularButton').setAttribute('visible', true);
        document.getElementById('minButton2').setAttribute('visible', true);
        this.submenu1.setAttribute('grabbable', '');
        this.menuInicio.removeAttribute('grabbable', '');
      }, 500);
    }
    else if (targetEl === this.xButtonEl) {
      this.menuInicio.setAttribute('visible', false);
    }
    else if (targetEl === this.darkButtonEl) {
      this.isDarkMode = targetEl.is('pressed');
      
      if (this.isDarkMode) {
        targetEl.setAttribute('button', 'label: Light Mode');
        this.el.sceneEl.setAttribute('environment', {preset: 'starry'});
        this.el.sceneEl.addState('starry');
      } else {
        targetEl.setAttribute('button', 'label: Dark Mode');
        this.el.sceneEl.setAttribute('environment', {preset: 'default'});
        this.el.sceneEl.removeState('starry');
      }
    }
  }
});