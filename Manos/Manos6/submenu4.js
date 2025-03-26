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
    // En otro archivo .js
  var submenu2El = document.querySelector('#subMenu2');
var motorState = submenu2El.getAttribute('controsubmenu2').Motor;
console.log(motorState); // true o false
    
    if (targetEl === this.mostrarButtonEl) {
        // Ocultar otros menús
        this.submenu1.setAttribute('visible', false);
        this.submenu2.setAttribute('visible', false);
        this.submenu3.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        this.menuInicio.setAttribute('visible', false);
      

        var dataEntity = document.createElement('a-entity');
        dataEntity.setAttribute('id', 'data');
        dataEntity.setAttribute('babia-queryjson', 'url: ./data.json; path: data');
        scene.appendChild(dataEntity);
        
        // Crear entidad de filtro
        var filterEntity = document.createElement('a-entity');
        filterEntity.setAttribute('id', 'filter-data');
        filterEntity.setAttribute('babia-filter', 'from: data; filter: motor=electric');
        scene.appendChild(filterEntity);
      
        if()
        
        // Crear diagrama de barras
        var barChartEntity = document.createElement('a-entity');
        barChartEntity.setAttribute('id', 'bar-chart');
        barChartEntity.setAttribute('babia-barsmap', 'from: filter-data; legend: true; palette: foxy; x_axis: model; height: sales; radius: doors');
        barChartEntity.setAttribute('position', '0 0.5 -1');
        barChartEntity.setAttribute('scale', '0.1 0.1 0.1');
        scene.appendChild(barChartEntity);
    }

  }
});
