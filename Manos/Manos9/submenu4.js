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
      color: 'green'
    });
    menuBackGroundEl.setAttribute('position', '0 0 -0.025');
    el.appendChild(menuBackGroundEl);
  },
  /*tick: function (){
    this.submenu4 = document.querySelector('#subMenu4');
    if(this.submenu4.getAttribute('visible') == true){
      this.submenu4.setAttribute('grabbable', '');
      
    }else{
      this.submenu4.removeAttribute('grabbable');
    }
  },*/
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
            //pieChartEntity.setAttribute('grabbable', '');
            barChartEntity.setAttribute('size-change', '');
          
        }else if(submenu1.data.Circular){
            var pieChartEntity = document.createElement('a-entity');
            pieChartEntity.setAttribute('id', 'pie-chart');
            pieChartEntity.setAttribute('babia-pie', 'from: filter-data; legend: true; palette: blues; key: model; size: doors');
            pieChartEntity.setAttribute('position', '0 0.5 -1');
            pieChartEntity.setAttribute('scale', '0.2 0.2 0.2');
            pieChartEntity.setAttribute('rotation', '90 0 0');
            scene.appendChild(pieChartEntity);
            //pieChartEntity.setAttribute('grabbable', '');
            pieChartEntity.setAttribute('size-change', '');
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
    
      if (targetEl === this.backButtonEl3) {
        //this.submenu4.removeAttribute('grabbable');
        //this.submenu3.setAttribute('grabbable', '');
        setTimeout(() => {
          var submenu3Component = document.querySelector('#subMenu3').components.controsubmenu3;
          var submenu2Component = document.querySelector('#subMenu2').components.controsubmenu2;

          // Resetear valores de submenu3 y submenu2
          //submenu3Component.resetValues();
          //submenu2Component.resetValues();

          this.submenu3.setAttribute('visible', true);
          this.submenu4.setAttribute('visible', false);

          // Eliminar elementos generados
          var scene = document.querySelector("a-scene");
          var barChart = document.querySelector('#bar-chart');
          var pieChart = document.querySelector('#pie-chart');
          var prevFilter = document.querySelector('#filter-data');
          var dataEntity = document.querySelector('#data');

          if (barChart) scene.removeChild(barChart);
          if (pieChart) scene.removeChild(pieChart);
          if (prevFilter) scene.removeChild(prevFilter);
          if (dataEntity) scene.removeChild(dataEntity);
          
          if(submenu2Component.data.Motor){
            document.getElementById('backButton2').setAttribute('visible', true);
            document.getElementById('electricoButton').setAttribute('visible', true);
            document.getElementById('DieselButton').setAttribute('visible', true);
            document.getElementById('GasolinaButton').setAttribute('visible', true);
            //document.getElementById('backButton2').setAttribute('pressable', '');
            //document.getElementById('electricoButton').setAttribute('pressable', '');
            //document.getElementById('DieselButton').setAttribute('pressable', '');
            //document.getElementById('GasolinaButton').setAttribute('pressable', '');
          } else if(submenu2Component.data.Color){
            document.getElementById('backButton2').setAttribute('visible', true);
            document.getElementById('BlancoButton').setAttribute('visible', true);
            document.getElementById('NegroButton').setAttribute('visible', true);
            document.getElementById('RojoButton').setAttribute('visible', true);
            document.getElementById('AmarilloButton').setAttribute('visible', true);
            //document.getElementById('backButton2').setAttribute('pressable', '');
            //document.getElementById('BlancoButton').setAttribute('pressable', '');
            //document.getElementById('NegroButton').setAttribute('pressable', '');
            //document.getElementById('RojoButton').setAttribute('pressable', '');
            //document.getElementById('AmarilloButton').setAttribute('pressable', '');
          } else if(submenu2Component.data.Puertas){
            document.getElementById('backButton2').setAttribute('visible', true);
            document.getElementById('dosButton').setAttribute('visible', true);
            document.getElementById('cincoButton').setAttribute('visible', true);
            //document.getElementById('backButton2').setAttribute('pressable', '');
            //document.getElementById('dosButton').setAttribute('pressable', '');
            //document.getElementById('cincoButton').setAttribute('pressable', '');
          }
          
          document.getElementById('backButton3').setAttribute('visible', false);
          document.getElementById('mostrarButton').setAttribute('visible', false);
          document.getElementById('borrarButton').setAttribute('visible', false);
          //document.getElementById('backButton3').removeAttribute('pressable');
          //document.getElementById('mostrarButton').removeAttribute('pressable');
          //document.getElementById('borrarButton').removeAttribute('pressable');

          submenu3Component.resetValues();
        }, 500);
      }
    },
});
