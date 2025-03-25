/* global AFRAME */
AFRAME.registerComponent('submenu1', {
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
AFRAME.registerComponent('controsubmenu1', {
  schema: {
      Barras: {default: false},
      Circular: {default: false}
  },
  resetValues: function() {
    this.data.Barras = false;
    this.data.Circular = false;
  },
  init: function () {
    this.bindMethods();
    
    this.menuInicio = document.querySelector('#menuinicio');
    this.submenu1 = document.querySelector('#subMenu1');
    this.submenu2 = document.querySelector('#subMenu2');
  
    //boton barras
    this.barrasButtonEl = document.querySelector('#barrasButton');
    this.barrasButtonEl.addEventListener('click', this.onClick);
    
    //boton circular
    this.circularButtonEl = document.querySelector('#circularButton');
    this.circularButtonEl.addEventListener('click', this.onClick);
    
    //boton atras
    this.atrasButtonEl = document.querySelector('#atrasButton');
    this.atrasButtonEl.addEventListener('click', this.onClick);
    
  },

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
  },

  onClick: function (evt) {
    var targetEl = evt.target;
    if (targetEl === this.barrasButtonEl) {
      this.menuInicio.setAttribute('visible', false);
      this.submenu1.setAttribute('visible', false);
      this.submenu2.setAttribute('visible', true);
      this.el.setAttribute('controsubmenu1', 'Circular', true);
    }
    if (targetEl === this.circularButtonEl) {
      this.menuInicio.setAttribute('visible', false);
      this.submenu1.setAttribute('visible', false);
      this.submenu2.setAttribute('visible', true);
      this.el.setAttribute('controsubmenu1', 'Barras', true);
    }
    
    if (targetEl === this.atrasButtonEl) {
      this.el.setAttribute('controsubmenu1', 'Circular', false);
      this.el.setAttribute('controsubmenu1', 'Barras', false);
      this.submenu1.setAttribute('visible', false);
      this.submenu2.setAttribute('visible', false);
      this.menuInicio.setAttribute('visible', true);
    }

  }
});
