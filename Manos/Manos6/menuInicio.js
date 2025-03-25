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
  
    //boton start
    this.startButtonEl = document.querySelector('#startButton');
    this.startButtonEl.addEventListener('click', this.onClick);
    this.startButtonEl.addEventListener('pressedended', this.onClick);
    
    //boton X
    this.xButtonEl = document.querySelector('#xButton');
    this.xButtonEl.addEventListener('click', this.onClick);
    this.xButtonEl.addEventListener('pressedended', this.onClick);
    
  },

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
  },

  onClick: function (evt) {
    var targetEl = evt.target;
    if (targetEl === this.startButtonEl || targetEl.xButtonEl) {
      this.submenu1.visible = true;
      this.menuInicio.visible = false;
    }
    
    if (targetEl === this.startButtonEl || targetEl.xButtonEl) {
      this.menuInicio.visible = false;
    }

  }
});