/* global AFRAME */
AFRAME.registerComponent('loader', {
  init: function() {
    // Cargar el JSON
    this.pie = false;
    this.bar = false;
    this.electric = false;
    this.diesel = false;
    this.gasoline = false;
    this.white = false;
    this.black = false;
    this.red = false;
    this.yellow = false;
    this.threedoors = false;
    this.fivedoors = false;
    
    fetch('scene.json')
      .then(response => response.json())
      .then(data => {
        // Primero creamos todos los menús
        var menuPadre = data.menuPadre;
        this.createMenu(menuPadre);
        
        var subMenu1 = menuPadre.buttons[0].menuHijo1;
        this.createMenu(subMenu1);
      
        var subMenu2 = subMenu1.buttons[0].menuHijo2;
        this.createMenu(subMenu2);
        
        //submenu3
        var subMenu31 = subMenu2.buttons[1].menuHijo31;
        this.createMenu(subMenu31);
        var subMenu32 = subMenu2.buttons[2].menuHijo32;
        this.createMenu(subMenu32);
        var subMenu33 = subMenu2.buttons[3].menuHijo33;
        this.createMenu(subMenu33);
      
        //submenu4
        var subMenu4 = subMenu31.buttons[1].menuHijo4;
        this.createMenu(subMenu4);
        
        // Después de crear los menús, ahora configuramos los eventos
        this.setupEvents();
      })
      .catch(error => {
        console.error('Error cargando scene.json:', error);
      });
  },
  
  setupEvents: function() {
    // Referencia a los elementos del menú
    this.menuInicio = document.querySelector('#menuinicio');
    this.submenu1 = document.querySelector('#subMenu1');
    this.submenu2 = document.querySelector('#subMenu2');
    this.submenu31 = document.querySelector('#subMenu31');
    this.submenu32 = document.querySelector('#subMenu32');
    this.submenu33 = document.querySelector('#subMenu33');
    this.submenu4 = document.querySelector('#subMenu4');

    // Botones menuInicio
    this.startButtonEl = document.querySelector('#startButton');
    this.xButtonEl = document.querySelector('#xButton');

    //Botones Submenu1
    this.barrasButtonEl = document.querySelector('#barrasButton');
    this.circularButtonEl = document.querySelector('#circularButton');
    this.atrasButtonEl = document.querySelector('#atrasButton');

    //Botones submenu2
    this.backButtonEl = document.querySelector('#backButton');
    this.motorButtonEl = document.querySelector('#motorButton');
    this.colorButtonEl = document.querySelector('#colorButton');
    this.puertasButtonEl = document.querySelector('#puertasButton');
    
    //Botones submenu31
    this.backButtonEl21 = document.querySelector('#backButton21');
    this.electricoButtonEl = document.querySelector('#electricoButton');
    this.DieselButtonEl = document.querySelector('#DieselButton');
    this.GasolinaButtonEl = document.querySelector('#GasolinaButton');
    
    //Botones submenu32
    this.backButtonEl22 = document.querySelector('#backButton22');
    this.BlancoButtonEl = document.querySelector('#BlancoButton');
    this.NegroButtonEl = document.querySelector('#NegroButton');
    this.RojoButtonEl = document.querySelector('#RojoButton');
    this.AmarilloButtonEl = document.querySelector('#AmarilloButton');
    
    //Botones submenu33
    this.backButtonEl23 = document.querySelector('#backButton23');
    this.tresButtonEl = document.querySelector('#dosButton');
    this.cincoButtonEl = document.querySelector('#cincoButton');
    
    //botones submenu4
    this.backButtonEl31 = document.querySelector('#backButton31');
    this.mostrarButtonEl = document.querySelector('#mostrarButton1');
    this.borrarButtonEl = document.querySelector('#borrarButton1');
    
    //controladores botones menuInicio
    this.startButtonEl.addEventListener('click', () => {
      if (this.submenu1 && this.menuInicio) {
        this.submenu1.setAttribute('visible', true);
        this.menuInicio.setAttribute('visible', false);
        
        // Hacer visibles los botones del submenu1
        const buttons = this.submenu1.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', true);
        });
        const buttons2 = this.menuInicio.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
      }
    });
    this.xButtonEl.addEventListener('click', () => {
        this.submenu1.setAttribute('visible', false);
        this.menuInicio.setAttribute('visible', false);
        
        const buttons2 = this.menuInicio.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
    });
    
    //controladores botones submenu1
    this.atrasButtonEl.addEventListener('click', () => {
        this.submenu1.setAttribute('visible', false);
        this.menuInicio.setAttribute('visible', true);
        
        const buttons = this.submenu1.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.menuInicio.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.barrasButtonEl.addEventListener('click', () => {
        this.bar = true;
        this.submenu1.setAttribute('visible', false);
        this.submenu2.setAttribute('visible', true);
        
        const buttons = this.submenu1.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu2.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.circularButtonEl.addEventListener('click', () => {
        this.pie = true;
        this.submenu1.setAttribute('visible', false);
        this.submenu2.setAttribute('visible', true);
        
        const buttons = this.submenu1.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu2.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    
    //controladores botones submenu2
    this.backButtonEl.addEventListener('click', () => {
        this.pie = false;
        this.bar = false;
        this.submenu2.setAttribute('visible', false);
        this.submenu1.setAttribute('visible', true);
        
        const buttons = this.submenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu1.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.motorButtonEl.addEventListener('click', () => {
        this.submenu2.setAttribute('visible', false);
        this.submenu31.setAttribute('visible', true);
        
        const buttons = this.submenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu31.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.colorButtonEl.addEventListener('click', () => {
        this.submenu2.setAttribute('visible', false);
        this.submenu32.setAttribute('visible', true);
        
        const buttons = this.submenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu32.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.puertasButtonEl.addEventListener('click', () => {
        this.submenu2.setAttribute('visible', false);
        this.submenu33.setAttribute('visible', true);
        
        const buttons = this.submenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu33.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    
    //controladores botones submenu3.1
    this.backButtonEl21.addEventListener('click', () => {
        this.electric = false;
        this.diesel = false;
        this.gasoline = false;
        this.submenu31.setAttribute('visible', false);
        this.submenu2.setAttribute('visible', true);
        
        const buttons = this.submenu31.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu2.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.electricoButtonEl.addEventListener('click', () => {
        this.electric = true;
        this.submenu31.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        const buttons = this.submenu31.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu4.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.DieselButtonEl.addEventListener('click', () => {
        this.diesel = true;
        this.submenu31.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        const buttons = this.submenu31.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu4.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.GasolinaButtonEl.addEventListener('click', () => {
        this.gasoline = true;
        this.submenu31.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        const buttons = this.submenu31.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu4.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    
    //controladores botones submenu3.2
    this.backButtonEl22.addEventListener('click', () => {
        this.white = false;
        this.black = false;
        this.red = false;
        this.yellow = false;
        this.submenu32.setAttribute('visible', false);
        this.submenu2.setAttribute('visible', true);
        
        const buttons = this.submenu32.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu2.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.BlancoButtonEl.addEventListener('click', () => {
        this.white = true;
        this.submenu32.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        const buttons = this.submenu32.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu4.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.NegroButtonEl.addEventListener('click', () => {
        this.black = true;
        this.submenu32.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        const buttons = this.submenu32.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu4.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.RojoButtonEl.addEventListener('click', () => {
        this.red = true;
        this.submenu32.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        const buttons = this.submenu32.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu4.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.AmarilloButtonEl.addEventListener('click', () => {
        this.yellow = true;
        this.submenu32.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        const buttons = this.submenu32.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu4.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    
    //controladores botones submenu3.3
    this.backButtonEl23.addEventListener('click', () => {
        this.submenu33.setAttribute('visible', false);
        this.submenu2.setAttribute('visible', true);
        
        const buttons = this.submenu33.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu2.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.tresButtonEl.addEventListener('click', () => {
        this.threedoors = true;
        this.submenu33.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        const buttons = this.submenu33.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu4.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    this.cincoButtonEl.addEventListener('click', () => {
        this.fivedoors = true;
        this.submenu33.setAttribute('visible', false);
        this.submenu4.setAttribute('visible', true);
        
        const buttons = this.submenu33.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        const buttons2 = this.submenu4.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', true);
        });
    });
    
    //controladores botones submenu4
    this.backButtonEl31.addEventListener('click', () => {
        var scene = document.querySelector("a-scene");
        var barChart = document.querySelector('#bar-chart');
        var pieChart = document.querySelector('#pie-chart');
        var prevFilter = document.querySelector('#filter-data');
        var dataEntity = document.querySelector('#data');
        if (barChart) scene.removeChild(barChart);
        if (pieChart) scene.removeChild(pieChart);
        if (prevFilter) scene.removeChild(prevFilter);
        if (dataEntity) scene.removeChild(dataEntity);
        console.log("electrico", this.electric);
        console.log("diesel", this.diesel);
        console.log("gasolina", this.gasoline);
        console.log("blanco", this.white);
        console.log("negro", this.black);
        console.log("rojo", this.red);
        console.log("amarillo", this.yellow);
        console.log("tres", this.threedoors);
        console.log("cinco", this.fivedoors);
        
        if(this.electric || this.diesel || this.gasoline){
          this.electric = false;
          this.diesel = false;
          this.gasoline = false;
          this.submenu4.setAttribute('visible', false);
          this.submenu31.setAttribute('visible', true);
          
          const buttons2 = this.submenu31.querySelectorAll('[id]');
            buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }else if(this.white || this.black || this.red || this.yellow){
          this.white = false;
          this.black = false;
          this.red = false;
          this.yellow = false;
          this.submenu4.setAttribute('visible', false);
          this.submenu32.setAttribute('visible', true);
          
          const buttons2 = this.submenu32.querySelectorAll('[id]');
            buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }else if(this.threedoors || this.fivedoors){
          this.threedoors = false;
          this.fivedoors = false;
          this.submenu4.setAttribute('visible', false);
          this.submenu33.setAttribute('visible', true);
          
          const buttons2 = this.submenu33.querySelectorAll('[id]');
            buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }
        
        const buttons = this.submenu4.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
    });
    this.mostrarButtonEl.addEventListener('click', () => {
        var scene = document.querySelector("a-scene");
        var dataEntity = document.createElement('a-entity');
        dataEntity.setAttribute('id', 'data');
        dataEntity.setAttribute('babia-queryjson', 'url: ./data.json; path: data');
        scene.appendChild(dataEntity);
      
        // Crear entidad de filtro
        var filterEntity = document.createElement('a-entity');
        filterEntity.setAttribute('id', 'filter-data');
      
        // Lógica de filtrado
        if(this.electric){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: motor=electric');
        } else if(this.diesel){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: motor=diesel');
        } else if(this.gasoline){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: motor=gasoline');
        } else if(this.white){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: color=white');
        } else if(this.black){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: color=black');
        } else if(this.red){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: color=red');
        } else if(this.yellow){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: color=yellow');
        } else if(this.threedoors){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: doors=3');
        } else if(this.fivedoors){
            filterEntity.setAttribute('babia-filter', 'from: data; filter: doors=5');
        }
        scene.appendChild(filterEntity);
      
        // Crear diagrama de barras
        if(this.bar) {
            var barChartEntity = document.createElement('a-entity');
            barChartEntity.setAttribute('id', 'bar-chart');
            barChartEntity.setAttribute('babia-barsmap', 'from: filter-data; legend: true; palette: foxy; x_axis: model; height: sales; radius: doors');
            barChartEntity.setAttribute('position', '0 0.5 -1');
            barChartEntity.setAttribute('scale', '0.1 0.1 0.1');
            scene.appendChild(barChartEntity);
            //pieChartEntity.setAttribute('grabbable', '');
            //barChartEntity.setAttribute('size-change', '');
          
        }else if(this.pie){
            var pieChartEntity = document.createElement('a-entity');
            pieChartEntity.setAttribute('id', 'pie-chart');
            pieChartEntity.setAttribute('babia-pie', 'from: filter-data; legend: true; palette: blues; key: model; size: doors');
            pieChartEntity.setAttribute('position', '0 0.5 -1');
            pieChartEntity.setAttribute('scale', '0.2 0.2 0.2');
            pieChartEntity.setAttribute('rotation', '90 0 0');
            scene.appendChild(pieChartEntity);
            //pieChartEntity.setAttribute('grabbable', '');
            //pieChartEntity.setAttribute('size-change', '');
        }
    });
    this.borrarButtonEl.addEventListener('click', () => {
        var scene = document.querySelector("a-scene");
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
    });
},
  
  createMenu: function(pMenu) {
    if (!pMenu) return;
    
    const sceneEl = this.el;
    const menuEl = document.createElement('a-entity');
      
    if (pMenu.id) {
      menuEl.setAttribute('id', pMenu.id);
      menuEl.setAttribute('menuinicio', '');
    }
    if (pMenu.position) {
      menuEl.setAttribute('position', pMenu.position);
    }
    if (pMenu.visible !== undefined) {
      menuEl.setAttribute('visible', pMenu.visible);
    }
    if (pMenu.grabbable) {
      menuEl.setAttribute('grabbable', ''); // Corregido "grababble" a "grabbable"
    }
      
    if (pMenu.buttons && pMenu.buttons.length > 0) {
      this.createButtons(menuEl, pMenu.buttons);
    }
    
    sceneEl.appendChild(menuEl);
  },
  
  createButtons: function(parentEl, buttons) {
    buttons.forEach((button, index) => { 
      const buttonEl = document.createElement('a-entity');
      
      if (button.id) {
        buttonEl.setAttribute('id', button.id);
        buttonEl.setAttribute('button', {
          label: button.label,
          width: button.width || 0.11,
          toggleable: button.toggleable || false,
          primitive: button.primitive || 'box'
        });
      }
      if (button.position) {
        buttonEl.setAttribute('position', button.position);
      }
      if (button.visible !== undefined) {
        buttonEl.setAttribute('visible', button.visible);
      }
      
      parentEl.appendChild(buttonEl);
    });
  }
});