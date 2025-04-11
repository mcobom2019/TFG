/* global AFRAME */
AFRAME.registerComponent('menu', {
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
    
    this.initmenu = false;
    this.m1 = false;
    this.m2 = false;
    this.m31 = false;
    this.m32 = false;
    this.m33 = false;
    this.m4 = false;
    this.isDarkMode = false;
    
    // Variable para almacenar la última posición conocida
    this.lastMenuPosition = { x: 0, y: 0, z: 0 };
    this.lastMenuRotation = { x: 0, y: 0, z: 0 };
    
    fetch('scene.json')
      .then(response => response.json())
      .then(data => {
        // creo todos los menús
        this.data = data;
        this.signalCreateMenus();
        
        // Después de crear los menús, ahora configuro los eventos
        this.setupEvents();
      })
      .catch(error => {
        console.error('Error cargando scene.json:', error);
      });
  },
  
  setupEvents: function() {
    // Referencia a los elementos del menú
    this.menuinicio = document.querySelector('#menuinicio');
    this.submenu1 = document.querySelector('#subMenu1');
    this.submenu2 = document.querySelector('#subMenu2');
    this.submenu31 = document.querySelector('#subMenu31');
    this.submenu32 = document.querySelector('#subMenu32');
    this.submenu33 = document.querySelector('#subMenu33');
    this.submenu4 = document.querySelector('#subMenu4');
    
    //boton de la mano izquierda Maximizar
    this.maximizeButtonEl = document.querySelector('#maximizeButton');
    this.maximizeButtonEl.setAttribute('rotation', '0 0 0');

    // Botones menuInicio
    this.startButtonEl = document.querySelector('#startButton');
    this.xButtonEl = document.querySelector('#xButton');
    this.minButton1El = document.querySelector('#minButton1');
    this.darkButtonEl = document.querySelector('#darkButton');
    this.lightButtonEl = document.querySelector('#lightButton');
    
    //Botones Submenu1
    this.barrasButtonEl = document.querySelector('#barrasButton');
    this.circularButtonEl = document.querySelector('#circularButton');
    this.atrasButtonEl = document.querySelector('#atrasButton');
    this.minButton2El = document.querySelector('#minButton2');

    //Botones submenu2
    this.backButtonEl = document.querySelector('#backButton');
    this.motorButtonEl = document.querySelector('#motorButton');
    this.colorButtonEl = document.querySelector('#colorButton');
    this.puertasButtonEl = document.querySelector('#puertasButton');
    this.minButton3El = document.querySelector('#minButton3');
    
    //Botones submenu31
    this.backButtonEl21 = document.querySelector('#backButton21');
    this.electricoButtonEl = document.querySelector('#electricoButton');
    this.DieselButtonEl = document.querySelector('#DieselButton');
    this.GasolinaButtonEl = document.querySelector('#GasolinaButton');
    this.minButton41El = document.querySelector('#minButton41');
    
    //Botones submenu32
    this.backButtonEl22 = document.querySelector('#backButton22');
    this.BlancoButtonEl = document.querySelector('#BlancoButton');
    this.NegroButtonEl = document.querySelector('#NegroButton');
    this.RojoButtonEl = document.querySelector('#RojoButton');
    this.AmarilloButtonEl = document.querySelector('#AmarilloButton');
    this.minButton42El = document.querySelector('#minButton42');
    
    //Botones submenu33
    this.backButtonEl23 = document.querySelector('#backButton23');
    this.tresButtonEl = document.querySelector('#dosButton');
    this.cincoButtonEl = document.querySelector('#cincoButton');
    this.minButton43El = document.querySelector('#minButton43');
    
    //botones submenu4
    this.backButtonEl31 = document.querySelector('#backButton31');
    this.mostrarButtonEl = document.querySelector('#mostrarButton1');
    this.borrarButtonEl = document.querySelector('#borrarButton1');
    this.minButton5El = document.querySelector('#minButton5');
    this.sliderrEl = document.querySelector('#sliderr');
    
    //controladores botones menuInicio
    this.startButtonEl.addEventListener('click', () => {
      this.nextMenu(this.menuinicio, this.submenu1);
    });
    
    this.minButton1El.addEventListener('click', () => {
        this.changeBoolean('initmenu');
        this.minimizeMenu(this.menuinicio);
    });
    
    this.xButtonEl.addEventListener('click', () => {
        this.deleteMenu(this.menuinicio);
    });
    
    this.darkButtonEl.addEventListener('click', () => {
        this.changeBoolean('isDarkMode');
        this.darkMode();
    });
    
    this.lightButtonEl.addEventListener('click', () => {
        this.changeBoolean('isDarkMode');
        this.lightMode();
    });
    
    //controladores botones submenu1
    this.atrasButtonEl.addEventListener('click', () => {
        this.changeBoolean('initmenu');
        this.nextMenu(this.submenu1, this.menuinicio);
    });
    
    this.barrasButtonEl.addEventListener('click', () => {
        this.changeBoolean('bar');
        this.nextMenu(this.submenu1, this.submenu2);
    });
    
    this.circularButtonEl.addEventListener('click', () => {
        this.changeBoolean('pie');
        this.nextMenu(this.submenu1, this.submenu2);
    });
    
    this.minButton2El.addEventListener('click', () => {
        this.changeBoolean('m1');
        this.minimizeMenu(this.submenu1);
    });
    
    //controladores botones submenu2
    this.backButtonEl.addEventListener('click', () => {
        this.initilizeBoolean('pie');
        this.initilizeBoolean('bar');
        this.nextMenu(this.submenu2, this.submenu1);
    });
    
    this.motorButtonEl.addEventListener('click', () => {
        this.nextMenu(this.submenu2, this.submenu31);
    });
    
    this.colorButtonEl.addEventListener('click', () => {
        this.nextMenu(this.submenu2, this.submenu32);
    });
    
    this.puertasButtonEl.addEventListener('click', () => {
        this.nextMenu(this.submenu2, this.submenu33);
    });
    
    this.minButton3El.addEventListener('click', () => {
        this.changeBoolean('m2');
        this.minimizeMenu(this.submenu2);
    });
    
    //controladores botones submenu3.1
    this.backButtonEl21.addEventListener('click', () => {
        this.initilizeBoolean('electric');
        this.initilizeBoolean('diesel');
        this.initilizeBoolean('gasoline');
        this.nextMenu(this.submenu31, this.submenu2);
    });
    
    this.electricoButtonEl.addEventListener('click', () => {
        this.changeBoolean('electric');
        this.nextMenu(this.submenu31, this.submenu4);
    });
    
    this.DieselButtonEl.addEventListener('click', () => {
        this.changeBoolean('diesel');
        this.nextMenu(this.submenu31, this.submenu4);
    });
    
    this.GasolinaButtonEl.addEventListener('click', () => {
        this.changeBoolean('gasoline');
        this.nextMenu(this.submenu31, this.submenu4);
    });
    
    this.minButton41El.addEventListener('click', () => {
        this.changeBoolean('m31');
        this.minimizeMenu(this.submenu31);
    });
    
    //controladores botones submenu3.2
    this.backButtonEl22.addEventListener('click', () => {
        this.initilizeBoolean('white');
        this.initilizeBoolean('black');
        this.initilizeBoolean('red');
        this.initilizeBoolean('yellow');
        this.nextMenu(this.submenu32, this.submenu2);
    });
    
    this.BlancoButtonEl.addEventListener('click', () => {
        this.changeBoolean('white');
        this.nextMenu(this.submenu32, this.submenu4);
    });
    
    this.NegroButtonEl.addEventListener('click', () => {
        this.changeBoolean('black');
        this.nextMenu(this.submenu32, this.submenu4);
    });
    
    this.RojoButtonEl.addEventListener('click', () => {
        this.changeBoolean('red');
        this.nextMenu(this.submenu32, this.submenu4);
    });
    
    this.AmarilloButtonEl.addEventListener('click', () => {
        this.changeBoolean('yellow');
        this.nextMenu(this.submenu32, this.submenu4);
    });
    
    this.minButton42El.addEventListener('click', () => {
        this.changeBoolean('m32');
        this.minimizeMenu(this.submenu32);
    });
    
    //controladores botones submenu3.3
    this.backButtonEl23.addEventListener('click', () => {
        this.nextMenu(this.submenu33, this.submenu2);
    });
    
    this.tresButtonEl.addEventListener('click', () => {
        this.changeBoolean('threedoors');
        this.nextMenu(this.submenu33, this.submenu4);
    });
    
    this.cincoButtonEl.addEventListener('click', () => {
        this.changeBoolean('fivedoors');
        this.nextMenu(this.submenu33, this.submenu4);
    });
    
    this.minButton43El.addEventListener('click', () => {
        this.changeBoolean('m33');
        this.minimizeMenu(this.submenu33);
    });
    
    //controladores botones submenu4
    this.backButtonEl31.addEventListener('click', () => {
        this.deleteDiagram();
        this.multipleBack();
    });
    this.mostrarButtonEl.addEventListener('click', () => {
        this.viewDiagram();
    });
    this.borrarButtonEl.addEventListener('click', () => {
        this.deleteDiagram();
    });
    this.minButton5El.addEventListener('click', () => {
        this.changeBoolean('m4');
        this.minimizeMenu(this.submenu4);
    });
    
    //controlador boton maximizar
    this.maximizeButtonEl.addEventListener('click', () => {
        this.maximizeButtonEl.setAttribute('visible', false);
        if(this.initmenu){
          setTimeout(() => {
            this.maximizeMenu(this.menuinicio);
            if(this.isDarkMode){
              this.darkButtonEl.setAttribute('visible', false);
            }else{
              this.lightButtonEl.setAttribute('visible', false);
            }
            this.initilizeBoolean('initmenu');
          }, 500);
        }else if(this.m1){
          setTimeout(() => {
            this.maximizeMenu(this.submenu1);
            this.initilizeBoolean('m1');
          }, 500);
        }else if(this.m2){
          setTimeout(() => {
            this.maximizeMenu(this.submenu2);
            this.initilizeBoolean('m2');
          }, 500);
        }else if(this.m31){
          setTimeout(() => {
            this.maximizeMenu(this.submenu31);
            this.initilizeBoolean('m31');
          }, 500);
        }else if(this.m32){
          setTimeout(() => {
            this.maximizeMenu(this.submenu32);
            this.initilizeBoolean('m32');
          }, 500);
        }else if(this.m33){
          setTimeout(() => {
            this.maximizeMenu(this.submenu33);
            this.initilizeBoolean('m33');
          }, 500);
        }else if(this.m4){
          setTimeout(() => {
            this.maximizeMenu(this.submenu4);
            this.initilizeBoolean('m4');
          }, 500);
        }
    });
},
  
  signalCreateMenus: function() {
    if (!this.data) {
      console.error('No se encontraron datos en el JSON');
      return;
    }
    
    // Buscar todas las propiedades que contengan "menuPadre" en el nivel raíz
    Object.keys(this.data).forEach(key => {
      if (key.includes('menuPadre')) {
        console.log('Creando menú padre:', key);
        
        // Crear el menú padre
        this.createMenu(this.data[key]);
        
        // Crear recursivamente todos sus menús hijos
        this.createChildMenus(this.data[key]);
      }
    });
    
    // Adicionalmente, buscar arrays de menús padre si existieran
    Object.keys(this.data).forEach(key => {
      const value = this.data[key];
      if (Array.isArray(value)) {
        value.forEach(item => {
          // Si el elemento del array es un menú (tiene ID y posiblemente botones)
          if (item && item.id && item.buttons) {
            console.log('Creando menú desde array:', item.id);
            this.createMenu(item);
            this.createChildMenus(item);
          }
        });
      }
    });
  },
  
  createChildMenus: function(parentMenu) {
    // Si el menú no tiene botones, termina la recursión
    if (!parentMenu.buttons || !Array.isArray(parentMenu.buttons)) {
      return;
    }
    
    // Iteramos sobre todos los botones del menú
    parentMenu.buttons.forEach(button => {
      // Buscamos propiedades que contengan "menuHijo" (para ser más flexibles con los nombres)
      Object.keys(button).forEach(key => {
        if (key.includes('menuHijo') && button[key]) {
          // Si encontramos un menuHijo, lo creamos
          console.log('Creando menú hijo:', key, ' - ID:', button[key].id);
          this.createMenu(button[key]);
          
          // Y continuamos la recursión con ese menú hijo
          this.createChildMenus(button[key]);
        }
      });
    });
  },
  
  createMenu: function(pMenu) {
    if (!pMenu) return;
    
    const sceneEl = this.el;
    const menuEl = document.createElement('a-entity');
      
    if (pMenu.id) {
      menuEl.setAttribute('id', pMenu.id);
      menuEl.setAttribute('menuinicio', '');
      
      if(menuEl.id === "subMenu4"){
        const slider = document.createElement('a-entity');
        slider.setAttribute('id', 'sliderr');
        slider.setAttribute('slider', '');
        slider.setAttribute('visible', 'false');
        slider.setAttribute('position', '0 -0.15 0');
        menuEl.appendChild(slider);
      }
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
          width: button.width || 0.2,
          toggleable: button.toggleable || false,
          primitive: button.primitive || 'box',
          color: button.color ||'#32527b',
          posetx: button.posetx || 0,
          posety: button.posety || 0,
          posetz: button.posetz || 0,
          widthet: button.widthet || 0.2
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
  },
  
  viewDiagram: function (){
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
            barChartEntity.setAttribute('size-change', '');
          
        }else if(this.pie){
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
  },
  
  deleteDiagram: function(){
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
  },
  // Función auxiliar para obtener la posición actual de un menú
  getMenuPosition: function(menuElement) {
    if (!menuElement) return { x: 0, y: 0, z: 0 };
    
    const position = menuElement.getAttribute('position');
    const rotation = menuElement.getAttribute('rotation');
    return {
      x: position.x,
      y: position.y,
      z: position.z,
      a: rotation.x,
      b: rotation.y,
      c: rotation.z
    };
  },
  
  // Función auxiliar para aplicar una posición a un menú
  applyMenuPosition: function(menuElement, position) {
    if (!menuElement) return;
    
    menuElement.setAttribute('position', {
      x: position.x,
      y: position.y,
      z: position.z,
    });
    menuElement.setAttribute('rotation', {
      x: position.a,
      y: position.b,
      z: position.c,
    });
  },
  
  changeGrabbable: function(menu1, menu2){
    menu1.setAttribute('grababble', '');
    menu2.removeAttribute('grabbable');
    menu1.setAttribute('grabbable', '');
  },
  
  nextMenu: function (prevM, nextM){
        this.lastMenuPosition = this.getMenuPosition(prevM);
        this.changeGrabbable(nextM, prevM);
        prevM.setAttribute('visible', false);
        const buttons2 = prevM.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
        setTimeout(() => {
          this.applyMenuPosition(nextM, this.lastMenuPosition);
          nextM.setAttribute('visible', true);
          const buttons = nextM.querySelectorAll('[id]');
          buttons.forEach(button => {
            button.setAttribute('visible', true);
          });
          if(nextM == this.menuinicio){
            if(this.isDarkMode){
              this.darkButtonEl.setAttribute('visible', false);
            }else{
              this.lightButtonEl.setAttribute('visible', false);
            }
          }
        }, 500);
  },
  changeBoolean: function(boolName) {
    console.log("TRAZA",this.sphere);
    if (this[boolName] !== undefined) {
      this[boolName] = !this[boolName];
      console.log('Estado de ' + boolName + ' cambiado a: ' + this[boolName]);
    }else {
      console.warn('La propiedad ' + boolName + ' no existe en este componente');
      console.log("TRAZA",this.sphere);
    }
  },
  minimizeMenu: function (menu){
        this.lastMenuPosition = this.getMenuPosition(menu);
        menu.setAttribute('visible', false);
        const buttons2 = menu.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
        setTimeout(() => {
          this.maximizeButtonEl.setAttribute('visible', true);
        }, 500);
  },
  deleteMenu: function(menu){
        menu.setAttribute('visible', false);
        const buttons2 = menu.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
  },
  darkMode: function (){
    this.darkButtonEl.setAttribute('visible', false);
        this.el.sceneEl.setAttribute('environment', {preset: 'starry'});
        this.el.sceneEl.addState('starry');
        setTimeout(() => {
          this.lightButtonEl.setAttribute('visible', true);
        }, 250);
  },
  lightMode: function(){
    this.lightButtonEl.setAttribute('visible', false);
        this.el.sceneEl.setAttribute('environment', {preset: 'default'});
        this.el.sceneEl.removeState('starry');
        setTimeout(() => {
          this.darkButtonEl.setAttribute('visible', true);
        }, 250);
  },
  initilizeBoolean: function(boolName) {
    this[boolName] = false;
  },
  multipleBack: function(){
    var scene = document.querySelector("a-scene");
    // Guardar la posición actual del submenu4
        this.lastMenuPosition = this.getMenuPosition(this.submenu4);
        setTimeout(() => {
          if(this.electric || this.diesel || this.gasoline){
            this.initilizeBoolean('electric');
            this.initilizeBoolean('diesel');
            this.initilizeBoolean('gasoline');
            this.nextMenu(this.submenu4, this.submenu31);
            
          }else if(this.white || this.black || this.red || this.yellow){
            this.initilizeBoolean('white');
            this.initilizeBoolean('black');
            this.initilizeBoolean('red');
            this.initilizeBoolean('yellow');
            this.nextMenu(this.submenu4, this.submenu32);
          
          }else if(this.threedoors || this.fivedoors){
              this.initilizeBoolean('threedoors');
              this.initilizeBoolean('fivedoors');
              this.nextMenu(this.submenu4, this.submenu33);
          }
          this.sliderrEl.setAttribute('visible', false);
        }, 500);
  },
  maximizeMenu: function(menu){
    setTimeout(() => {
        menu.setAttribute('visible', true);
        const buttons = menu.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', true);
        });
      if(this.isDarkMode){
        this.darkButtonEl.setAttribute('visible', false);
      }else{
        this.lightButtonEl.setAttribute('visible', false);
      }
    }, 500);
  },
});