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
      Motor: {default: false},
      Color: {default: false},
      Puertas: {default: false},
      Completo: {default: false},
  },
  init: function () {
    this.bindMethods();
    
    this.menuInicio = document.querySelector('#menuinicio');
    this.submenu1 = document.querySelector('#subMenu1');
    this.submenu2 = document.querySelector('#subMenu2');
    this.submenu3 = document.querySelector('#subMenu3');
  
    //boton atras
    this.backButtonEl = document.querySelector('#backButton');
    this.backButtonEl.addEventListener('click', this.onClick);
    
    //boton Motor
    this.motorButtonEl = document.querySelector('#motorButton');
    this.motorButtonEl.addEventListener('click', this.onClick);
    
    //boton Color
    this.colorButtonEl = document.querySelector('#colorButton');
    this.colorButtonEl.addEventListener('click', this.onClick);
    
    //boton Puertas
    this.puertasButtonEl = document.querySelector('#puertasButton');
    this.puertasButtonEl.addEventListener('click', this.onClick);
    
    //boton Completo
    this.completoButtonEl = document.querySelector('#completoButton');
    this.completoButtonEl.addEventListener('click', this.onClick);
    
  },

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
  },

  onClick: function (evt) {
    var targetEl = evt.target;
    if (targetEl === this.backButtonEl) {
      this.el.setAttribute('controsubmenu1', 'Circular', false);
      this.el.setAttribute('controsubmenu1', 'Barras', false);
      this.submenu1.setAttribute('visible', true);
      this.submenu2.setAttribute('visible', false);
      this.menuInicio.setAttribute('visible', false);
    }
    
    if (targetEl === this.motorButtonEl) {
      this.el.setAttribute('controsubmenu2', 'Motor', true);
      this.submenu1.setAttribute('visible', false);
      this.submenu2.setAttribute('visible', false);
      this.menuInicio.setAttribute('visible', false);
    }
    
    if (targetEl === this.colorButtonEl) {
      this.el.setAttribute('controsubmenu2', 'Color', true);
      this.submenu1.setAttribute('visible', false);
      this.submenu2.setAttribute('visible', false);
      this.submenu3.setAttribute('visible', true);
      this.menuInicio.setAttribute('visible', false);
    }
    
    if (targetEl === this.puertasButtonEl) {
      this.el.setAttribute('controsubmenu2', 'Puertas', true);
      this.submenu1.setAttribute('visible', false);
      this.submenu2.setAttribute('visible', false);
      this.submenu3.setAttribute('visible', true);
      this.menuInicio.setAttribute('visible', false);
    }
    
    if (targetEl === this.completoButtonEl) {
      this.el.setAttribute('controsubmenu2', 'Completo', true);
      this.submenu1.setAttribute('visible', false);
      this.submenu2.setAttribute('visible', false);
      this.submenu3.setAttribute('visible', true);
      this.menuInicio.setAttribute('visible', false);
    }

  }
});
