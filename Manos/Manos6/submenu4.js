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
    var parentPosition = document.getAttribute('position');
    var newPosition;
    newPosition = { x: parentPosition.x + 2, y: parentPosition.y - 1 , z: parentPosition.z };
    
    var scene = document.querySelector("a-scene");
    var barChartEntity = null;
    var pieChartEntity = null;
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
      
      const filterEntity = document.createElement('a-entity');
      var dataSource = "data";
      if (!document.querySelector("#data")) {
                var dataEntity = document.createElement('a-entity');
                dataEntity.setAttribute('id', 'data');
                dataEntity.setAttribute('babia-queryjson', 'url: ./data.json; path: data');
                scene.appendChild(dataEntity);
      }
      if(submenu3Component.data.Electrico){
          filtro = "Electrico";
          filterEntity.setAttribute('id', 'filter-data');
          filterEntity.setAttribute('babia-filter', 'from: data; filter: motor=electric');
      }
        
       scene.appendChild(filterEntity);
       dataSource = "filter-data";
      
      if (submenu1Component.data.Barras) {
          barChartEntity = document.createElement('a-entity');
          barChartEntity.setAttribute('babia-barsmap', `from: ${dataSource}; legend: true; palette: foxy; x_axis: model; height: sales; z_axis: motor`);
          barChartEntity.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);
          barChartEntity.setAttribute('scale', '0.2 0.2 0.2');
          scene.appendChild(barChartEntity);
      }
      
      
      
    }

  }
  
});
