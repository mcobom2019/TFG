/* global AFRAME */
AFRAME.registerComponent('menuinicio', {
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
AFRAME.registerComponent('controlinicio', {
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
  },

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
  },

  onClick: function (evt) {
    var targetEl = evt.target;
    if (targetEl === this.startButtonEl) {
      this.submenu1.setAttribute('visible', true);
      this.menuInicio.setAttribute('visible', false);
      document.getElementById('atrasButton').setAttribute('visible', true);
      document.getElementById('atrasButton').setAttribute('pressable', '');
      document.getElementById('barrasButton').setAttribute('visible', true);
      document.getElementById('barrasButton').setAttribute('pressable', '');
      document.getElementById('circularButton').setAttribute('visible', true);
      document.getElementById('circularButton').setAttribute('pressable', '');
    }
    
    if (targetEl === this.xButtonEl) {
      this.menuInicio.setAttribute('visible', false);
    }
  }
});