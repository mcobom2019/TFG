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
    print("Holaaaaa");
    
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
      
        var submenu3 = document.querySelector('#subMenu3').components.controsubmenu3;
        var submenu1 = document.querySelector('#subMenu1').components.controsubmenu1;
      
        // Lógica de filtrado
        if(submenu3.data.Electrico){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: motor=electric');
        } else if(submenu3.data.Diesel){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: motor=diesel');
        } else if(submenu3.data.Gasolina){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: motor=gasoline');
        } else if(submenu3.data.Blanco){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: color=white');
        } else if(submenu3.data.Negro){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: color=black');
        } else if(submenu3.data.Rojo){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: color=red');
        } else if(submenu3.data.Amarillo){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: color=yellow');
        } else if(submenu3.data.Dos){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: doors=3');
        } else if(submenu3.data.Cinco){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: doors=5');
        }
        scene.appendChild(filterEntity);
        
        // Crear diagrama de barras
        if(submenu1.data.Barras) {
            var barChartEntity = document.createElement('a-entity');
            barChartEntity.setAttribute('id', 'bar-chart');
            barChartEntity.setAttribute('babia-barsmap', 'from: filter-data; legend: true; palette: foxy; x_axis: model; height: sales; radius: doors');
            barChartEntity.setAttribute('position', '0 0.5 -1');
            barChartEntity.setAttribute('scale', '0.1 0.1 0.1');
            scene.appendChild(barChartEntity);
          
        }else if(submenu1.data.Circular){
            var pieChartEntity = document.createElement('a-entity');
            pieChartEntity.setAttribute('id', 'pie-chart');
            pieChartEntity.setAttribute('babia-pie', 'from: filter-data; legend: true; palette: blues; key: model; size: doors');
            pieChartEntity.setAttribute('position', '0 0.5 -1');
            pieChartEntity.setAttribute('scale', '0.2 0.2 0.2');
            pieChartEntity.setAttribute('rotation', '90 0 0');
            scene.appendChild(pieChartEntity);
        }
      }
      if (targetEl === this.borrarButtonEl) {
            // Eliminar diagrama de barras si existe
            var barChart = document.querySelector('#bar-chart');
            if (barChart) {
                scene.removeChild(barChart);
            }

            // Eliminar diagrama circular si existe
            var pieChart = document.querySelector('#pie-chart');
            if (pieChart) {
                scene.removeChild(pieChart);
            }

            // Eliminar filtro de datos si existe
            var prevFilter = document.querySelector('#filter-data');
            if (prevFilter) {
                scene.removeChild(prevFilter);
            }
        }
      if (targetEl === this.borrarButtonEl) {
        
      }
    },
});
