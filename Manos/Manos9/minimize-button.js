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
      }, 500);
    
    }else if (targetEl === this.minButtonEl2) {
      setTimeout(() => {
        this.submenu1.setAttribute('visible', false);
        this.maxButtonEl.setAttribute('visible', true);
      }, 500);
    
    }else if (targetEl === this.minButtonEl3) {
      setTimeout(() => {
        this.submenu2.setAttribute('visible', false);
        this.maxButtonEl.setAttribute('visible', true);
      }, 500);
    
    }else if (targetEl === this.minButtonEl4) {
      setTimeout(() => {
        this.submenu3.setAttribute('visible', false);
        this.maxButtonEl.setAttribute('visible', true);
      }, 500);
    
    }else if (targetEl === this.minButtonEl5) {
      setTimeout(() => {
        this.submenu4.setAttribute('visible', false);
        this.maxButtonEl.setAttribute('visible', true);
      }, 500);
    }
  }
});