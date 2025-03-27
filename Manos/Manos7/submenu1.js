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
      color: 'red'
    });
    menuBackGroundEl.setAttribute('position', '0 0 -0.025');
    el.appendChild(menuBackGroundEl);
  },
  tick: function (){
    this.submenu1 = document.querySelector('#subMenu1');
    this.submenu2 = document.querySelector('#subMenu2');
    this.submenu3 = document.querySelector('#subMenu3');
    this.submenu4 = document.querySelector('#subMenu4');
    this.menuInicio = document.querySelector('#menuInicio');
    if(this.submenu1.getAttribute('visible') == true){
      this.submenu1.setAttribute('grabbable', '');
    }else{
      this.submenu1.removeAttribute('grabbable');
    }
  }, 
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
      //this.submenu1.removeAttribute('grabbable');
      //this.submenu2.setAttribute('grabbable', '');
      setTimeout(() => {
        this.submenu1.setAttribute('visible', false);
        this.submenu2.setAttribute('visible', true);
        this.el.setAttribute('controsubmenu1', 'Barras', true);
        document.getElementById('backButton').setAttribute('visible', true);
        document.getElementById('backButton').setAttribute('pressable', '');
        document.getElementById('motorButton').setAttribute('visible', true);
        document.getElementById('motorButton').setAttribute('pressable', '');
        document.getElementById('colorButton').setAttribute('visible', true);
        document.getElementById('colorButton').setAttribute('pressable', '');
        document.getElementById('puertasButton').setAttribute('visible', true);
        document.getElementById('puertasButton').setAttribute('pressable', '');
        
        document.getElementById('barrasButton').setAttribute('visible', false);
        document.getElementById('circularButton').setAttribute('visible', false);
        document.getElementById('atrasButton').setAttribute('visible', false);
        
        document.getElementById('barrasButton').removeAttribute('pressable');
        document.getElementById('circularButton').removeAttribute('pressable');
        document.getElementById('atrasButton').removeAttribute('pressable');
        
      }, 500);
    }
    if (targetEl === this.circularButtonEl) {
      //this.submenu1.removeAttribute('grabbable');
      //this.submenu2.setAttribute('grabbable', '');
      setTimeout(() => {
        this.submenu1.setAttribute('visible', false);
        this.submenu2.setAttribute('visible', true);
        this.el.setAttribute('controsubmenu1', 'Circular', true);
        document.getElementById('backButton').setAttribute('visible', true);
        document.getElementById('backButton').setAttribute('pressable', '');
        document.getElementById('motorButton').setAttribute('visible', true);
        document.getElementById('motorButton').setAttribute('pressable', '');
        document.getElementById('colorButton').setAttribute('visible', true);
        document.getElementById('colorButton').setAttribute('pressable', '');
        document.getElementById('puertasButton').setAttribute('visible', true);
        document.getElementById('puertasButton').setAttribute('pressable', '');

        document.getElementById('barrasButton').setAttribute('visible', false);
        document.getElementById('circularButton').setAttribute('visible', false);
        document.getElementById('atrasButton').setAttribute('visible', false);
        
        document.getElementById('barrasButton').removeAttribute('pressable');
        document.getElementById('circularButton').removeAttribute('pressable');
        document.getElementById('atrasButton').removeAttribute('pressable');
      }, 500);
    }
    
    if (targetEl === this.atrasButtonEl) {
      //this.submenu1.removeAttribute('grabbable');
      //this.menuInicio.setAttribute('grabbable', '');
      setTimeout(() => {
        this.submenu1 = document.querySelector('#subMenu1');
        this.menuInicio = document.querySelector('#menuinicio');
        this.el.setAttribute('controsubmenu1', 'Circular', false);
        this.el.setAttribute('controsubmenu1', 'Barras', false);
        this.submenu1.setAttribute('visible', false);
        this.menuInicio.setAttribute('visible', true);
        document.getElementById('barrasButton').setAttribute('visible', false);
        document.getElementById('circularButton').setAttribute('visible', false);
        document.getElementById('atrasButton').setAttribute('visible', false);
        
        document.getElementById('barrasButton').removeAttribute('pressable');
        document.getElementById('circularButton').removeAttribute('pressable');
        document.getElementById('atrasButton').removeAttribute('pressable');
        
        document.getElementById('startButton').setAttribute('visible', true);
        document.getElementById('startButton').setAttribute('pressable', '');
        document.getElementById('xButton').setAttribute('visible', true);
        document.getElementById('xButton').setAttribute('pressable', '');        
      }, 500);
    }

  }
});