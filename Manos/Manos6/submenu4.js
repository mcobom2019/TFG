/* global AFRAME */
AFRAME.registerComponent('submenu4', {
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
AFRAME.registerComponent('controsubmenu4', {
  init: function () {
    this.bindMethods();
    
    this.menuInicio = document.querySelector('#menuinicio');
    this.submenu1 = document.querySelector('#subMenu1');
    this.submenu2 = document.querySelector('#subMenu2');
    this.submenu3 = document.querySelector('#subMenu3');
    this.submenu4 = document.querySelector('#subMenu4');
    
    //boton atras
    this.backButtonEl3 = document.querySelector('#backButton3');
    this.backButtonEl3.addEventListener('click', this.onClick);
  
    //boton electrico
    this.mostrarButtonEl = document.querySelector('#mostrarButton');
    this.mostrarButtonEl.addEventListener('click', this.onClick);
    
    //boton diesel
    this.borrarButtonEl = document.querySelector('#borrarButton');
    this.borrarButtonEl.addEventListener('click', this.onClick);
    
  },

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
  },

  onClick: function (evt) {
    var scene = document.querySelector("a-scene");
    var targetEl = evt.target;
    var submenu1Component = document.querySelector('#subMenu1').components.controsubmenu1;
    var submenu2Component = document.querySelector('#subMenu2').components.controsubmenu2;
    var submenu3Component = document.querySelector('#subMenu3').components.controsubmenu3;
    var filtro = null;
    
    if (targetEl === this.backButtonEl3) {
      submenu3Component.resetValues();
      this.submenu1.setAttribute('visible', false);
      this.submenu2.setAttribute('visible', false);
      this.submenu3.setAttribute('visible', true);
      this.submenu4.setAttribute('visible', false);
      this.menuInicio.setAttribute('visible', false);
    }
    
    if (targetEl === this.mostrarButtonEl) {
      this.submenu1.setAttribute('visible', false);
      this.submenu2.setAttribute('visible', false);
      this.submenu3.setAttribute('visible', false);
      this.submenu4.setAttribute('visible', true);
      this.menuInicio.setAttribute('visible', false);
      
       var prevFilter = document.querySelector("#filter-data");
            if (prevFilter) {
                scene.removeChild(prevFilter);
            }
      if(submenu1Component.data.Barras){
        if(submenu2Component.data.Motor){
          if(submenu3Component.data.Electrico){
              filtro = "Electrico";
              const filterEntity = document.createElement('a-entity');
              filterEntity.setAttribute('id', 'filter-data');
              filterEntity.setAttribute('babia-filter', 'from: data; filter: motor=electric');
          }
        
      
      
    }

  }
  
});
