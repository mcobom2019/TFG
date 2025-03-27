/* global AFRAME */
AFRAME.registerComponent('submenu3', {
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
      color: 'orange'
    });
    menuBackGroundEl.setAttribute('position', '0 0 -0.025');
    el.appendChild(menuBackGroundEl);
  }
});

/* global AFRAME */
AFRAME.registerComponent('controsubmenu3', {
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
  resetValues: function() {
    this.data.Electrico = false;
    this.data.Diesel = false;
    this.data.Gasolina = false;
    this.data.Blanco = false;
    this.data.Negro = false;
    this.data.Color = false;
    this.data.Rojo = false;
    this.data.Amarillo = false;
    this.data.Dos = false;
    this.data.Cinco = false;
  },
  init: function () {
    this.bindMethods();
    
    this.menuInicio = document.querySelector('#menuinicio');
    this.submenu1 = document.querySelector('#subMenu1');
    this.submenu2 = document.querySelector('#subMenu2');
    this.submenu3 = document.querySelector('#subMenu3');
    this.submenu4 = document.querySelector('#subMenu4');
    
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
  
  tick: function (){
    this.submenu3 = document.querySelector('#menuinicio');
    if(this.submenu3.getAttribute('visible') == true){
      this.submenu3.setAttribute('grabbable', '');
    }else{
      this.submenu3.removeAttribute('grabbable');
    }
  }, 

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
  },

  onClick: function (evt) {
    var targetEl = evt.target;
    var submenu2Component = document.querySelector('#subMenu2').components.controsubmenu2;
    if (targetEl === this.backButtonEl2) {
      //this.submenu3.removeAttribute('grabbable');
      //this.submenu2.setAttribute('grabbable', '');
      setTimeout(() => {
        // Resetear valores de submenu2
        var submenu2Component = document.querySelector('#subMenu2').components.controsubmenu2;
        submenu2Component.resetValues();
        this.resetValues();

        this.submenu2.setAttribute('visible', true);
        this.submenu3.setAttribute('visible', false);
        
        document.getElementById('backButton2').setAttribute('visible', false);
        document.getElementById('electricoButton').setAttribute('visible', false);
        document.getElementById('DieselButton').setAttribute('visible', false);
        document.getElementById('GasolinaButton').setAttribute('visible', false);
        document.getElementById('BlancoButton').setAttribute('visible', false);
        document.getElementById('NegroButton').setAttribute('visible', false);
        document.getElementById('RojoButton').setAttribute('visible', false);
        document.getElementById('AmarilloButton').setAttribute('visible', false);
        document.getElementById('dosButton').setAttribute('visible', false);
        document.getElementById('cincoButton').setAttribute('visible', false);
        
        document.getElementById('backButton2').removeAttribute('pressable');
        document.getElementById('electricoButton').removeAttribute('pressable');
        document.getElementById('DieselButton').removeAttribute('pressable');
        document.getElementById('GasolinaButton').removeAttribute('pressable');
        document.getElementById('BlancoButton').removeAttribute('pressable');
        document.getElementById('NegroButton').removeAttribute('pressable');
        document.getElementById('RojoButton').removeAttribute('pressable');
        document.getElementById('AmarilloButton').removeAttribute('pressable');
        document.getElementById('dosButton').removeAttribute('pressable');
        document.getElementById('cincoButton').removeAttribute('pressable');

        document.getElementById('backButton').setAttribute('visible', true);
        document.getElementById('motorButton').setAttribute('visible', true);
        document.getElementById('colorButton').setAttribute('visible', true);
        document.getElementById('puertasButton').setAttribute('visible', true);
        document.getElementById('backButton').setAttribute('pressable', '');
        document.getElementById('motorButton').setAttribute('pressable', '');
        document.getElementById('colorButton').setAttribute('pressable', '');
        document.getElementById('puertasButton').setAttribute('pressable', '');

      }, 500);
    }
    
    if (targetEl === this.electricoButtonEl) {
      //this.submenu3.removeAttribute('grabbable');
      //this.submenu4.setAttribute('grabbable', '');
      setTimeout(() => {
        this.el.setAttribute('controsubmenu3', 'Electrico', true);
        
        this.submenu3.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        document.getElementById('backButton2').setAttribute('visible', false);
        document.getElementById('electricoButton').setAttribute('visible', false);
        document.getElementById('DieselButton').setAttribute('visible', false);
        document.getElementById('GasolinaButton').setAttribute('visible', false);
        document.getElementById('backButton2').removeAttribute('pressable');
        document.getElementById('electricoButton').removeAttribute('pressable');
        document.getElementById('DieselButton').removeAttribute('pressable');
        document.getElementById('GasolinaButton').removeAttribute('pressable');
        
        document.getElementById('backButton3').setAttribute('visible', true);
        document.getElementById('mostrarButton').setAttribute('visible', true);
        document.getElementById('borrarButton').setAttribute('visible', true);
        document.getElementById('backButton3').setAttribute('pressable', '');
        document.getElementById('mostrarButton').setAttribute('pressable', '');
        document.getElementById('borrarButton').setAttribute('pressable', '');
      }, 500);
    }
    
     if (targetEl === this.dieselButtonEl) {
      //this.submenu3.removeAttribute('grabbable');
      //this.submenu4.setAttribute('grabbable', '');
      setTimeout(() => {
        this.el.setAttribute('controsubmenu3', 'Diesel', true);
        
        this.submenu3.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        document.getElementById('backButton2').setAttribute('visible', false);
        document.getElementById('electricoButton').setAttribute('visible', false);
        document.getElementById('DieselButton').setAttribute('visible', false);
        document.getElementById('GasolinaButton').setAttribute('visible', false);
        document.getElementById('backButton2').removeAttribute('pressable');
        document.getElementById('electricoButton').removeAttribute('pressable');
        document.getElementById('DieselButton').removeAttribute('pressable');
        document.getElementById('GasolinaButton').removeAttribute('pressable');
        
        document.getElementById('backButton3').setAttribute('visible', true);
        document.getElementById('mostrarButton').setAttribute('visible', true);
        document.getElementById('borrarButton').setAttribute('visible', true);
        document.getElementById('backButton3').setAttribute('pressable', '');
        document.getElementById('mostrarButton').setAttribute('pressable', '');
        document.getElementById('borrarButton').setAttribute('pressable', '');
      }, 500);
    }
     if (targetEl === this.gasolinaButtonEl) {
      //this.submenu3.removeAttribute('grabbable');
      //this.submenu4.setAttribute('grabbable', '');
      setTimeout(() => {
        this.el.setAttribute('controsubmenu3', 'Gasolina', true);
        
        this.submenu3.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        document.getElementById('backButton2').setAttribute('visible', false);
        document.getElementById('electricoButton').setAttribute('visible', false);
        document.getElementById('DieselButton').setAttribute('visible', false);
        document.getElementById('GasolinaButton').setAttribute('visible', false);
        document.getElementById('backButton2').removeAttribute('pressable');
        document.getElementById('electricoButton').removeAttribute('pressable');
        document.getElementById('DieselButton').removeAttribute('pressable');
        document.getElementById('GasolinaButton').removeAttribute('pressable');
        
        document.getElementById('backButton3').setAttribute('visible', true);
        document.getElementById('mostrarButton').setAttribute('visible', true);
        document.getElementById('borrarButton').setAttribute('visible', true);
        document.getElementById('backButton3').setAttribute('pressable', '');
        document.getElementById('mostrarButton').setAttribute('pressable', '');
        document.getElementById('borrarButton').setAttribute('pressable', '');
      }, 500);
    }
     if (targetEl === this.blancoButtonEl) {
      //this.submenu3.removeAttribute('grabbable');
      //this.submenu4.setAttribute('grabbable', '');
      setTimeout(() => {
        this.el.setAttribute('controsubmenu3', 'Blanco', true);
        
        this.submenu3.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        document.getElementById('backButton2').setAttribute('visible', false);
        document.getElementById('BlancoButton').setAttribute('visible', false);
        document.getElementById('NegroButton').setAttribute('visible', false);
        document.getElementById('RojoButton').setAttribute('visible', false);
        document.getElementById('AmarilloButton').setAttribute('visible', false);
        document.getElementById('backButton2').removeAttribute('pressable');
        document.getElementById('BlancoButton').removeAttribute('pressable');
        document.getElementById('NegroButton').removeAttribute('pressable');
        document.getElementById('RojoButton').removeAttribute('pressable');
        document.getElementById('AmarilloButton').removeAttribute('pressable');
        
        document.getElementById('backButton3').setAttribute('visible', true);
        document.getElementById('mostrarButton').setAttribute('visible', true);
        document.getElementById('borrarButton').setAttribute('visible', true);
        document.getElementById('backButton3').setAttribute('pressable', '');
        document.getElementById('mostrarButton').setAttribute('pressable', '');
        document.getElementById('borrarButton').setAttribute('pressable', '');
      }, 500);
    }
     if (targetEl === this.negroButtonEl) {
      //this.submenu3.removeAttribute('grabbable');
      //this.submenu4.setAttribute('grabbable', '');
      setTimeout(() => {
        this.el.setAttribute('controsubmenu3', 'Negro', true);
        
        this.submenu3.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        document.getElementById('backButton2').setAttribute('visible', false);
        document.getElementById('BlancoButton').setAttribute('visible', false);
        document.getElementById('NegroButton').setAttribute('visible', false);
        document.getElementById('RojoButton').setAttribute('visible', false);
        document.getElementById('AmarilloButton').setAttribute('visible', false);
        document.getElementById('backButton2').removeAttribute('pressable');
        document.getElementById('BlancoButton').removeAttribute('pressable');
        document.getElementById('NegroButton').removeAttribute('pressable');
        document.getElementById('RojoButton').removeAttribute('pressable');
        document.getElementById('AmarilloButton').removeAttribute('pressable');
        
        document.getElementById('backButton3').setAttribute('visible', true);
        document.getElementById('mostrarButton').setAttribute('visible', true);
        document.getElementById('borrarButton').setAttribute('visible', true);
        document.getElementById('backButton3').setAttribute('pressable', '');
        document.getElementById('mostrarButton').setAttribute('pressable', '');
        document.getElementById('borrarButton').setAttribute('pressable', '');
      }, 500);
    }
     if (targetEl === this.rojoButtonEl) {
      //this.submenu3.removeAttribute('grabbable');
      //this.submenu4.setAttribute('grabbable', '');
      setTimeout(() => {
        this.el.setAttribute('controsubmenu3', 'Rojo', true);
        
        this.submenu3.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        document.getElementById('backButton2').setAttribute('visible', false);
        document.getElementById('BlancoButton').setAttribute('visible', false);
        document.getElementById('NegroButton').setAttribute('visible', false);
        document.getElementById('RojoButton').setAttribute('visible', false);
        document.getElementById('AmarilloButton').setAttribute('visible', false);
        document.getElementById('backButton2').removeAttribute('pressable');
        document.getElementById('BlancoButton').removeAttribute('pressable');
        document.getElementById('NegroButton').removeAttribute('pressable');
        document.getElementById('RojoButton').removeAttribute('pressable');
        document.getElementById('AmarilloButton').removeAttribute('pressable');
        
        document.getElementById('backButton3').setAttribute('visible', true);
        document.getElementById('mostrarButton').setAttribute('visible', true);
        document.getElementById('borrarButton').setAttribute('visible', true);
        document.getElementById('backButton3').setAttribute('pressable', '');
        document.getElementById('mostrarButton').setAttribute('pressable', '');
        document.getElementById('borrarButton').setAttribute('pressable', '');
      }, 500);
    }
     if (targetEl === this.amarilloButtonEl) {
      //this.submenu3.removeAttribute('grabbable');
      //this.submenu4.setAttribute('grabbable', '');
      setTimeout(() => {
        this.el.setAttribute('controsubmenu3', 'Amarillo', true);
        
        this.submenu3.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        document.getElementById('backButton2').setAttribute('visible', false);
        document.getElementById('BlancoButton').setAttribute('visible', false);
        document.getElementById('NegroButton').setAttribute('visible', false);
        document.getElementById('RojoButton').setAttribute('visible', false);
        document.getElementById('AmarilloButton').setAttribute('visible', false);
        document.getElementById('backButton2').removeAttribute('pressable');
        document.getElementById('BlancoButton').removeAttribute('pressable');
        document.getElementById('NegroButton').removeAttribute('pressable');
        document.getElementById('RojoButton').removeAttribute('pressable');
        document.getElementById('AmarilloButton').removeAttribute('pressable');
        
        document.getElementById('backButton3').setAttribute('visible', true);
        document.getElementById('mostrarButton').setAttribute('visible', true);
        document.getElementById('borrarButton').setAttribute('visible', true);
        document.getElementById('backButton3').setAttribute('pressable', '');
        document.getElementById('mostrarButton').setAttribute('pressable', '');
        document.getElementById('borrarButton').setAttribute('pressable', '');
      }, 500);
    }
     if (targetEl === this.dosButtonEl) {
      //this.submenu3.removeAttribute('grabbable');
      //this.submenu4.setAttribute('grabbable', '');
      setTimeout(() => {
        this.el.setAttribute('controsubmenu3', 'Dos', true);
        
        this.submenu3.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        document.getElementById('backButton2').setAttribute('visible', false);
        document.getElementById('dosButton').setAttribute('visible', false);
        document.getElementById('cincoButton').setAttribute('visible', false);
        document.getElementById('backButton2').removeAttribute('pressable');
        document.getElementById('dosButton').removeAttribute('pressable');
        document.getElementById('cincoButton').removeAttribute('pressable');
        
        document.getElementById('backButton3').setAttribute('visible', true);
        document.getElementById('mostrarButton').setAttribute('visible', true);
        document.getElementById('borrarButton').setAttribute('visible', true);
        document.getElementById('backButton3').setAttribute('pressable', '');
        document.getElementById('mostrarButton').setAttribute('pressable', '');
        document.getElementById('borrarButton').setAttribute('pressable', '');
      }, 500);
    }
     if (targetEl === this.cincoButtonEl) {
      //this.submenu3.removeAttribute('grabbable');
      //this.submenu4.setAttribute('grabbable', '');
      setTimeout(() => {
        this.el.setAttribute('controsubmenu3', 'Cinco', true);
        
        this.submenu3.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        document.getElementById('backButton2').setAttribute('visible', false);
        document.getElementById('dosButton').setAttribute('visible', false);
        document.getElementById('cincoButton').setAttribute('visible', false);
        document.getElementById('backButton2').removeAttribute('pressable');
        document.getElementById('dosButton').removeAttribute('pressable');
        document.getElementById('cincoButton').removeAttribute('pressable');
        
        document.getElementById('backButton3').setAttribute('visible', true);
        document.getElementById('mostrarButton').setAttribute('visible', true);
        document.getElementById('borrarButton').setAttribute('visible', true);
        document.getElementById('backButton3').setAttribute('pressable', '');
        document.getElementById('mostrarButton').setAttribute('pressable', '');
        document.getElementById('borrarButton').setAttribute('pressable', '');
      }, 500);
    }
  }
});