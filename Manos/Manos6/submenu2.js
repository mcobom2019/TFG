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

  init: function () {
    this.bindMethods();
    
    this.menuInicio = document.querySelector('#menuinicio');
    this.submenu1 = document.querySelector('#subMenu1');
    this.submenu1 = document.querySelector('#subMenu2');
  
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
    if (targetEl === this.barrasButtonEl) {
      this.submenu1.visible = false;
      this.menuInicio.visible = false;
    }
    if (targetEl === this.circularButtonEl) {
      this.submenu1.visible = false;
      this.menuInicio.visible = false;
    }
    
    if (targetEl === this.atrasButtonEl) {
      this.submenu1.setAttribute('visible', false);
      this.menuInicio.setAttribute('visible', true);
    }

  }
});
