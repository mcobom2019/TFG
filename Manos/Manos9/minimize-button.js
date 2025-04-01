/* global AFRAME */
AFRAME.registerComponent('controlminimizar', {
  init: function () {
    this.bindMethods();
  
    // Referencias a los elementos
    this.menuInicio = document.querySelector('#menuinicio');
    this.submenu1 = document.querySelector('#subMenu1');
    this.submenu2 = document.querySelector('#subMenu2');
    this.submenu3 = document.querySelector('#subMenu3');
    this.submenu4 = document.querySelector('#subMenu4');
  
    //boton start
    this.minButtonEl1 = document.querySelector('#minButton1');
    this.minButtonEl1.addEventListener('click', this.onClick);
    
    this.minButtonEl2 = document.querySelector('#minButton2');
    this.minButtonEl2.addEventListener('click', this.onClick);
    
    this.minButtonEl3 = document.querySelector('#minButton3');
    this.minButtonEl3.addEventListener('click', this.onClick);
    
    this.minButtonEl4 = document.querySelector('#minButton4');
    this.minButtonEl4.addEventListener('click', this.onClick);
    
    this.minButtonEl5 = document.querySelector('#minButton5');
    this.minButtonEl5.addEventListener('click', this.onClick);
    
    this.maxButtonEl = document.querySelector('#maximizeButton');
    this.maxButtonEl.addEventListener('click', this.onClick);
    
    this.menuInicioComponent = document.querySelector('#menuinicio').components.controlinicio;
    this.submenu1Component = document.querySelector('#subMenu1').components.controsubmenu1;
    this.submenu2Component = document.querySelector('#subMenu2').components.controsubmenu2;
    this.submenu3Component = document.querySelector('#subMenu3').components.controsubmenu3;
    this.submenu4Component = document.querySelector('#subMenu4').components.controsubmenu4;
  },

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
  },

  onClick: function (evt) {
    var targetEl = evt.target;
    if (targetEl === this.minButtonEl1) {
      setTimeout(() => {
        this.menuInicio.setAttribute('visible', false);
        this.maxButtonEl.setAttribute('visible', true);
        this.menuInicioComponent.data.Minimizar = true;
      }, 500);
    
    }else if (targetEl === this.minButtonEl2) {
      setTimeout(() => {
        this.submenu1.setAttribute('visible', false);
        this.maxButtonEl.setAttribute('visible', true);
        this.submenu1Component.data.Minimizar = true;
      }, 500);
    
    }else if (targetEl === this.minButtonEl3) {
      setTimeout(() => {
        this.submenu2.setAttribute('visible', false);
        this.maxButtonEl.setAttribute('visible', true);
        this.submenu2Component.data.Minimizar = true;
      }, 500);
    
    }else if (targetEl === this.minButtonEl4) {
      setTimeout(() => {
        this.submenu3.setAttribute('visible', false);
        this.maxButtonEl.setAttribute('visible', true);
        this.submenu3Component.data.Minimizar = true;
      }, 500);
    
    }else if (targetEl === this.minButtonEl5) {
      setTimeout(() => {
        this.submenu4.setAttribute('visible', false);
        this.maxButtonEl.setAttribute('visible', true);
        this.submenu4Component.data.Minimizar = true;
      }, 500);
    
    }else if (targetEl === this.maxButtonEl) {
      setTimeout(() => {
        this.maxButtonEl.setAttribute('visible', false);
        
        if(this.menuInicioComponent.data.Minimizar){
          this.menuInicio.setAttribute('visible', true);
          this.menuInicioComponent.data.Minimizar = false;
        }
        if(this.submenu1Component.data.Minimizar){
          this.submenu1.setAttribute('visible', true);
          this.submenu1Component.data.Minimizar = false;
        }
        if(this.submenu2Component.data.Minimizar){
          this.submenu2.setAttribute('visible', true);
          this.submenu2Component.data.Minimizar = false;
        }
        if(this.submenu3Component.data.Minimizar){
          this.submenu3.setAttribute('visible', true);
          this.submenu3Component.data.Minimizar = false;
        }
        if(this.submenu4Component.data.Minimizar){
          this.submenu4.setAttribute('visible', true);
          this.submenu4Component.data.Minimizar = false;
        }
      }, 500);
    }
  }
});