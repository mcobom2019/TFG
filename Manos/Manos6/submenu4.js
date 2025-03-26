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
    //var barChartEntity = document.querySelector('#data');
    //var barsEntity = document.querySelector('#bars');
    var barChartEntity = null;
    var barsEntity = null;
    var targetEl = evt.target;

    if (targetEl === this.mostrarButtonEl) {
        this.submenu1.setAttribute('visible', false);
        this.submenu2.setAttribute('visible', false);
        this.submenu3.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        this.menuInicio.setAttribute('visible', false);
        
        // Si ya existe, lo eliminamos
        if (barChartEntity) {
            scene.removeChild(barChartEntity);
        }
        if (barsEntity) {
            scene.removeChild(barsEntity);
        }

        // Creamos nuevamente los elementos
        barChartEntity = document.createElement('a-entity');
        barChartEntity.setAttribute('id', 'data');
        barChartEntity.setAttribute('babia-queryjson', 'url: ./data.json; path: data');

        barsEntity = document.createElement('a-entity');
        barsEntity.setAttribute('id', 'bars');
        barsEntity.setAttribute('babia-barsmap', 'from: data; legend: true; palette: ubuntu; x_axis: model; z_axis: color; height: sales');
        barsEntity.setAttribute('position', '0 0.5 -1');
        barsEntity.setAttribute('scale', '0.2 0.2 0.2');

        scene.appendChild(barChartEntity);
        scene.appendChild(barsEntity);
    }
  }
});
