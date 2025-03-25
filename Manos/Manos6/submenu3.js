/* global AFRAME */
AFRAME.registerComponent('submenu2', {
  init: function () {
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
  }
});

/* global AFRAME */
AFRAME.registerComponent('controsubmenu2', {
  schema: {
      Electrico: {default: false},
      Diesel: {default: false},
      Gasolina: {default: false},
      Blanco: {default: false},
      Negro: {default: false},
      Rojo: {default: false},
      Amarillo: {default: false},
      Dos: {default: false},
      Cinco: {default: false},
  },

  init: function () {
    this.bindMethods();
    
    this.menuInicio = document.querySelector('#menuinicio');
    this.submenu1 = document.querySelector('#subMenu1');
    this.submenu2 = document.querySelector('#subMenu2');
    this.submenu3 = document.querySelector('#subMenu3');
    
    //boton atras
    this.backButtonEl2 = document.querySelector('#backButton2');
    this.backButtonEl2.addEventListener('click', this.onClick);
  
    //boton electrico
    this.electricoButtonEl = document.querySelector('#electricoButton');
    this.electricoButtonEl.addEventListener('click', this.onClick);
    
    //boton diesel
    this.dieselButtonEl = document.querySelector('#DieselButton');
    this.dieselButtonEl.addEventListener('click', this.onClick);
    
    //boton gasolina
    this.gasolinaButtonEl = document.querySelector('#GasolinaButton');
    this.gasolinaButtonEl.addEventListener('click', this.onClick);
    
    //boton blanco
    this.blancoButtonEl = document.querySelector('#BlancoButton');
    this.blancoButtonEl.addEventListener('click', this.onClick);
    
    //boton negro
    this.negroButtonEl = document.querySelector('#NegroButton');
    this.negroButtonEl.addEventListener('click', this.onClick);
    
    //boton rojo
    this.rojoButtonEl = document.querySelector('#RojoButton');
    this.rojoButtonEl.addEventListener('click', this.onClick);
    
    //boton amarillo
    this.amarilloButtonEl = document.querySelector('#AmarilloButton');
    this.amarilloButtonEl.addEventListener('click', this.onClick);
    
    //boton dos puertas
    this.dosButtonEl = document.querySelector('#dosButton');
    this.dosButtonEl.addEventListener('click', this.onClick);
    
    //boton cinco puertas
    this.cincoButtonEl = document.querySelector('#cincoButton');
    this.cincoButtonEl.addEventListener('click', this.onClick);
    
  },

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
  },

  onClick: function (evt) {
    var targetEl = evt.target;
    if (targetEl === this.backButtonEl2) {
      this.submenu1.setAttribute('visible', false);
      this.submenu2.setAttribute('visible', true);
      this.submenu3.setAttribute('visible', false);
      this.menuInicio.setAttribute('visible', false);
    }
    
    if (targetEl === this.electricoButton) {
      this.submenu1.setAttribute('visible', false);
      this.submenu2.setAttribute('visible', false);
      this.submenu3.setAttribute('visible', false);
      this.submenu4.setAttribute('visible', false);
      this.menuInicio.setAttribute('visible', false);
    }
    
    if (targetEl === this.colorButtonEl) {
      this.submenu1.setAttribute('visible', false);
      this.submenu2.setAttribute('visible', false);
      this.menuInicio.setAttribute('visible', false);
    }
    
    if (targetEl === this.puertasButtonEl) {
      this.submenu1.setAttribute('visible', false);
      this.submenu2.setAttribute('visible', false);
      this.menuInicio.setAttribute('visible', false);
    }
    
    if (targetEl === this.completoButtonEl) {
      this.submenu1.setAttribute('visible', false);
      this.submenu2.setAttribute('visible', false);
      this.menuInicio.setAttribute('visible', false);
    }

  }
});
