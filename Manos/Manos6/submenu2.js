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
      color: 'yellow'
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
  resetValues: function() {
    this.data.Motor = false;
    this.data.Color = false;
    this.data.Puertas = false;
    this.data.Completo = false;
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
    var submenu1Component = document.querySelector('#subMenu1').components.controsubmenu1;
    if (targetEl === this.backButtonEl) {
      // Resetear valores de submenu1
      setTimeout(() => {
        var submenu1Component = document.querySelector('#subMenu1').components.controsubmenu1;
        submenu1Component.resetValues();

        // Resetear valores propios
        this.resetValues();

        this.submenu1.setAttribute('visible', true);
        this.submenu2.setAttribute('visible', false);
        this.submenu3.setAttribute('visible', false);
        this.menuInicio.setAttribute('visible', false);

        document.getElementById('backButton').setAttribute('visible', false);
        document.getElementById('motorButton').setAttribute('visible', false);
        document.getElementById('colorButton').setAttribute('visible', false);
        document.getElementById('puertasButton').setAttribute('visible', false);
        document.getElementById('completoButton').setAttribute('visible', false);

        document.getElementById('barrasButton').setAttribute('visible', true);

        document.getElementById('circularButton').setAttribute('visible', true);

        document.getElementById('atrasButton').setAttribute('visible', true);

        document.getElementById('backButton').removeAttribute('pressable');
        document.getElementById('motorButton').removeAttribute('pressable');
        document.getElementById('colorButton').removeAttribute('pressable');
        document.getElementById('puertasButton').removeAttribute('pressable');
        document.getElementById('completoButton').removeAttribute('pressable');
      }, 500);
    }
    
    if (targetEl === this.motorButtonEl) {
      setTimeout(() => {
        this.el.setAttribute('controsubmenu2', 'Motor', true);
        this.submenu1.setAttribute('visible', false);
        this.submenu2.setAttribute('visible', false);
        this.submenu3.setAttribute('visible', true);
        this.menuInicio.setAttribute('visible', false);
        document.getElementById('backButton2').setAttribute('visible', true);
        document.getElementById('backButton2').setAttribute('pressable', '');
        document.getElementById('electricoButton').setAttribute('visible', true);
        document.getElementById('electricoButton').setAttribute('pressable', '');
        document.getElementById('DieselButton').setAttribute('visible', true);
        document.getElementById('DieselButton').setAttribute('pressable', '');
        document.getElementById('GasolinaButton').setAttribute('visible', true);
        document.getElementById('GasolinaButton').setAttribute('pressable', '');

        document.getElementById('backButton').setAttribute('visible', false);
        document.getElementById('motorButton').setAttribute('visible', false);
        document.getElementById('colorButton').setAttribute('visible', false);
        document.getElementById('puertasButton').setAttribute('visible', false);
        document.getElementById('completoButton').setAttribute('visible', false);
      }, 500);
    }
    
    if (targetEl === this.colorButtonEl) {
      setTimeout(() => {
        this.el.setAttribute('controsubmenu2', 'Color', true);
        this.submenu1.setAttribute('visible', false);
        this.submenu2.setAttribute('visible', false);
        this.submenu3.setAttribute('visible', true);
        this.menuInicio.setAttribute('visible', false);
        document.getElementById('backButton2').setAttribute('visible', true);
        document.getElementById('backButton2').setAttribute('pressable', '');
        document.getElementById('BlancoButton').setAttribute('visible', true);
        document.getElementById('BlancoButton').setAttribute('pressable', '');
        document.getElementById('NegroButton').setAttribute('visible', true);
        document.getElementById('NegroButton').setAttribute('pressable', '');
        document.getElementById('RojoButton').setAttribute('visible', true);
        document.getElementById('RojoButton').setAttribute('pressable', '');
        document.getElementById('AmarilloButton').setAttribute('visible', true);
        document.getElementById('AmarilloButton').setAttribute('pressable', '');

        document.getElementById('backButton').setAttribute('visible', false);
        document.getElementById('motorButton').setAttribute('visible', false);
        document.getElementById('colorButton').setAttribute('visible', false);
        document.getElementById('puertasButton').setAttribute('visible', false);
        document.getElementById('completoButton').setAttribute('visible', false);
      }, 500);
      
    }
    
    if (targetEl === this.puertasButtonEl) {
      setTimeout(() => {
        this.el.setAttribute('controsubmenu2', 'Puertas', true);
        this.submenu1.setAttribute('visible', false);
        this.submenu2.setAttribute('visible', false);
        this.submenu3.setAttribute('visible', true);
        this.menuInicio.setAttribute('visible', false);
        document.getElementById('backButton2').setAttribute('visible', true);
        document.getElementById('backButton2').setAttribute('pressable', '');
        document.getElementById('dosButton').setAttribute('visible', true);
        document.getElementById('dosButton').setAttribute('pressable', '');
        document.getElementById('cincoButton').setAttribute('visible', true);
        document.getElementById('cincoButton').setAttribute('pressable', '');

        document.getElementById('backButton').setAttribute('visible', false);
        document.getElementById('motorButton').setAttribute('visible', false);
        document.getElementById('colorButton').setAttribute('visible', false);
        document.getElementById('puertasButton').setAttribute('visible', false);
        document.getElementById('completoButton').setAttribute('visible', false);
      }, 500);
    }
    
    if (targetEl === this.completoButtonEl) {
      setTimeout(() => {
        document.getElementById('backButton2').setAttribute('visible', true);
        this.el.setAttribute('controsubmenu2', 'Completo', true);
        this.submenu1.setAttribute('visible', false);
        this.submenu2.setAttribute('visible', false);
        this.submenu3.setAttribute('visible', false);
        this.menuInicio.setAttribute('visible', false);
        document.getElementById('backButton2').setAttribute('pressable', '');
        document.getElementById('backButton').setAttribute('visible', false);
        document.getElementById('motorButton').setAttribute('visible', false);
        document.getElementById('colorButton').setAttribute('visible', false);
        document.getElementById('puertasButton').setAttribute('visible', false);
        document.getElementById('completoButton').setAttribute('visible', false);
      }, 500);
    }

  }
});
