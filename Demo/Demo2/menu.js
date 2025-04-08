/* global AFRAME */
AFRAME.registerComponent('menu', {
  init: function() {
    //la última posición del menu
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
    this.initMenu = document.querySelector('#initmenu');
    this.childMenu1 = document.querySelector('#childmenu1');
    
    //boton de la mano izquierda Maximizar
    this.maximizeButtonEl = document.querySelector('#maximizeButton');
    this.maximizeButtonEl.setAttribute('rotation', '0 0 0');

    // Botones menuInicio
    this.startButtonEl = document.querySelector('#startButton');
    this.xButtonEl = document.querySelector('#xButton');
    this.minButton1El = document.querySelector('#minButton1');
    
    //Botones Submenu1
    this.musicButtonEl = document.querySelector('#musicButton');
    this.circularButtonEl = document.querySelector('#circularButton');
    this.backButton1El = document.querySelector('#backButton1');
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
      if (this.childMenu1 && this.initMenu) {
        this.lastMenuPosition = this.getMenuPosition(this.initMenu);
        this.changeGrabbable(this.childMenu1, this.initMenu);
        this.initMenu.setAttribute('visible', false);
        const buttons2 = this.initMenu.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
        setTimeout(() => {
          this.applyMenuPosition(this.childMenu1, this.lastMenuPosition);
          this.childMenu1.setAttribute('visible', true);
          const buttons = this.childMenu1.querySelectorAll('[id]');
          buttons.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
      }
    });
    
    this.minButton1El.addEventListener('click', () => {
        this.lastMenuPosition = this.getMenuPosition(this.initMenu);
        this.initMenu.setAttribute('visible', false);
        const buttons2 = this.initMenu.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
        setTimeout(() => {
          this.maximizeButtonEl.setAttribute('visible', true);
        }, 500);
      
    });
    
    this.xButtonEl.addEventListener('click', () => {
        this.initMenu.setAttribute('visible', false);
        const buttons2 = this.initMenu.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
    });
    
    //controladores botones submenu1
    this.backButton1El.addEventListener('click', () => {
        this.lastMenuPosition = this.getMenuPosition(this.childMenu1);
        this.childMenu1.setAttribute('visible', false);
        this.changeGrabbable(this.initMenu, this.childMenu1);
        const buttons = this.childMenu1.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.initMenu, this.lastMenuPosition);
          this.initMenu.setAttribute('visible', true);
          const buttons2 = this.initMenu.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.barrasButtonEl.addEventListener('click', () => {
        this.bar = true;
        this.lastMenuPosition = this.getMenuPosition(this.submenu1);
        this.changeGrabbable(this.submenu2, this.submenu1);
        this.submenu1.setAttribute('visible', false);
        const buttons = this.submenu1.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu2, this.lastMenuPosition);
          this.submenu2.setAttribute('visible', true);
          const buttons2 = this.submenu2.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.circularButtonEl.addEventListener('click', () => {
        this.pie = true;
        this.lastMenuPosition = this.getMenuPosition(this.submenu1);
        this.changeGrabbable(this.submenu2, this.submenu1);
        this.submenu1.setAttribute('visible', false);
        const buttons = this.submenu1.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu2, this.lastMenuPosition);
          this.submenu2.setAttribute('visible', true);
          const buttons2 = this.submenu2.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.minButton2El.addEventListener('click', () => {
        this.m1 = true;
        this.lastMenuPosition = this.getMenuPosition(this.submenu1);
        this.submenu1.setAttribute('visible', false);
        const buttons = this.submenu1.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        setTimeout(() => {
          this.maximizeButtonEl.setAttribute('visible', true);
        }, 500);
    });
    
    //controladores botones submenu2
    this.backButtonEl.addEventListener('click', () => {
        this.pie = false;
        this.bar = false;
        this.lastMenuPosition = this.getMenuPosition(this.submenu2);
        this.changeGrabbable(this.submenu1, this.submenu2);
        this.submenu2.setAttribute('visible', false);
        const buttons = this.submenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu1, this.lastMenuPosition);
          this.submenu1.setAttribute('visible', true);
          const buttons2 = this.submenu1.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.motorButtonEl.addEventListener('click', () => {
        this.lastMenuPosition = this.getMenuPosition(this.submenu2);
        this.changeGrabbable(this.submenu31, this.submenu2);
        this.submenu2.setAttribute('visible', false);
        const buttons = this.submenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu31, this.lastMenuPosition);
          
          this.submenu31.setAttribute('visible', true);
          const buttons2 = this.submenu31.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.colorButtonEl.addEventListener('click', () => {
        this.lastMenuPosition = this.getMenuPosition(this.submenu2);
        this.changeGrabbable(this.submenu32, this.submenu2);
        this.submenu2.setAttribute('visible', false);
        const buttons = this.submenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu32, this.lastMenuPosition);
          this.submenu32.setAttribute('visible', true);
          const buttons2 = this.submenu32.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.puertasButtonEl.addEventListener('click', () => {
        this.lastMenuPosition = this.getMenuPosition(this.submenu2);
        this.changeGrabbable(this.submenu33, this.submenu2);
        this.submenu2.setAttribute('visible', false);
        const buttons = this.submenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu33, this.lastMenuPosition);
          this.submenu33.setAttribute('visible', true);
          const buttons2 = this.submenu33.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.minButton3El.addEventListener('click', () => {
        this.m2 = true;
        this.lastMenuPosition = this.getMenuPosition(this.submenu2);
        this.submenu2.setAttribute('visible', false);
        const buttons = this.submenu2.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        setTimeout(() => {
          this.maximizeButtonEl.setAttribute('visible', true);
        }, 500);
    });
    
    //controladores botones submenu3.1
    this.backButtonEl21.addEventListener('click', () => {
        this.electric = false;
        this.diesel = false;
        this.gasoline = false;
        this.lastMenuPosition = this.getMenuPosition(this.submenu31);
        this.changeGrabbable(this.submenu2, this.submenu31);
        this.submenu31.setAttribute('visible', false);
        const buttons = this.submenu31.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu2, this.lastMenuPosition);
          this.submenu2.setAttribute('visible', true);
          const buttons2 = this.submenu2.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.electricoButtonEl.addEventListener('click', () => {
        this.electric = true;
        this.lastMenuPosition = this.getMenuPosition(this.submenu31);
        this.changeGrabbable(this.submenu4, this.submenu31);
        this.submenu31.setAttribute('visible', false);
        const buttons = this.submenu31.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu4, this.lastMenuPosition);
          this.submenu4.setAttribute('visible', true);
          const buttons2 = this.submenu4.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
          this.sliderrEl.setAttribute('visible', true);
        }, 500);
    });
    
    this.DieselButtonEl.addEventListener('click', () => {
        this.diesel = true;
        this.lastMenuPosition = this.getMenuPosition(this.submenu31);
        this.changeGrabbable(this.submenu4, this.submenu31);
        this.submenu31.setAttribute('visible', false);
        const buttons = this.submenu31.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu4, this.lastMenuPosition);
          this.submenu4.setAttribute('visible', true);
          const buttons2 = this.submenu4.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
          this.sliderrEl.setAttribute('visible', true);
        }, 500);
    });
    
    this.GasolinaButtonEl.addEventListener('click', () => {
        this.gasoline = true;
        this.lastMenuPosition = this.getMenuPosition(this.submenu31);
        this.changeGrabbable(this.submenu4, this.submenu31);
        this.submenu31.setAttribute('visible', false);
        const buttons = this.submenu31.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu4, this.lastMenuPosition);
          this.submenu4.setAttribute('visible', true);
          const buttons2 = this.submenu4.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
          this.sliderrEl.setAttribute('visible', true);
        }, 500);
    });
    
    this.minButton41El.addEventListener('click', () => {
        this.m31 = true;
        this.lastMenuPosition = this.getMenuPosition(this.submenu31);
        this.submenu31.setAttribute('visible', false);
        const buttons = this.submenu31.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        setTimeout(() => {
          this.maximizeButtonEl.setAttribute('visible', true);
        }, 500);
    });
    
    //controladores botones submenu3.2
    this.backButtonEl22.addEventListener('click', () => {
        this.white = false;
        this.black = false;
        this.red = false;
        this.yellow = false;
        this.lastMenuPosition = this.getMenuPosition(this.submenu32);
        this.changeGrabbable(this.submenu2, this.submenu32);
        this.submenu32.setAttribute('visible', false);
        const buttons = this.submenu32.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu2, this.lastMenuPosition);
          this.submenu2.setAttribute('visible', true);
          const buttons2 = this.submenu2.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.BlancoButtonEl.addEventListener('click', () => {
        this.white = true;
        this.lastMenuPosition = this.getMenuPosition(this.submenu32);
        this.changeGrabbable(this.submenu4, this.submenu32);
        this.submenu32.setAttribute('visible', false);
        const buttons = this.submenu32.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu4, this.lastMenuPosition);
          this.submenu4.setAttribute('visible', true);
          const buttons2 = this.submenu4.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
          this.sliderrEl.setAttribute('visible', true);
        }, 500);
    });
    
    this.NegroButtonEl.addEventListener('click', () => {
        this.black = true;
        this.lastMenuPosition = this.getMenuPosition(this.submenu32);
        this.changeGrabbable(this.submenu4, this.submenu32);
        this.submenu32.setAttribute('visible', false);
        const buttons = this.submenu32.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu4, this.lastMenuPosition);
          this.submenu4.setAttribute('visible', true);
          const buttons2 = this.submenu4.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
          this.sliderrEl.setAttribute('visible', true);
        }, 500);
    });
    
    this.RojoButtonEl.addEventListener('click', () => {
        this.red = true;
        this.lastMenuPosition = this.getMenuPosition(this.submenu32);
        this.changeGrabbable(this.submenu4, this.submenu32);
        this.submenu32.setAttribute('visible', false);
        const buttons = this.submenu32.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu4, this.lastMenuPosition);
          this.submenu4.setAttribute('visible', true);
          const buttons2 = this.submenu4.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
          this.sliderrEl.setAttribute('visible', true);
        }, 500);
    });
    
    this.AmarilloButtonEl.addEventListener('click', () => {
        this.yellow = true;
        this.lastMenuPosition = this.getMenuPosition(this.submenu32);
        this.changeGrabbable(this.submenu4, this.submenu32);
        this.submenu32.setAttribute('visible', false);
        const buttons = this.submenu32.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu4, this.lastMenuPosition);
          this.submenu4.setAttribute('visible', true);
          const buttons2 = this.submenu4.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
          this.sliderrEl.setAttribute('visible', true);
        }, 500);
    });
    
    this.minButton42El.addEventListener('click', () => {
        this.m32 = true;
        this.lastMenuPosition = this.getMenuPosition(this.submenu32);
        this.submenu32.setAttribute('visible', false);
        const buttons = this.submenu32.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        setTimeout(() => {
          this.maximizeButtonEl.setAttribute('visible', true);
        }, 500);
    });
    
    //controladores botones submenu3.3
    this.backButtonEl23.addEventListener('click', () => {
        this.lastMenuPosition = this.getMenuPosition(this.submenu33);
        this.changeGrabbable(this.submenu2, this.submenu33);
        this.submenu33.setAttribute('visible', false);
        const buttons = this.submenu33.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu2, this.lastMenuPosition);
          this.submenu2.setAttribute('visible', true);
          const buttons2 = this.submenu2.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
        }, 500);
    });
    
    this.tresButtonEl.addEventListener('click', () => {
        this.threedoors = true;
        this.lastMenuPosition = this.getMenuPosition(this.submenu33);
        this.changeGrabbable(this.submenu4, this.submenu33);
        this.submenu33.setAttribute('visible', false);
        const buttons = this.submenu33.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu4, this.lastMenuPosition);
          this.submenu4.setAttribute('visible', true);
          const buttons2 = this.submenu4.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
          this.sliderrEl.setAttribute('visible', true);
        }, 500);
    });
    
    this.cincoButtonEl.addEventListener('click', () => {
        this.fivedoors = true;
        this.lastMenuPosition = this.getMenuPosition(this.submenu33);
        this.changeGrabbable(this.submenu4, this.submenu33);
        this.submenu33.setAttribute('visible', false);
        const buttons = this.submenu33.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        
        setTimeout(() => {
          this.applyMenuPosition(this.submenu4, this.lastMenuPosition);
          this.submenu4.setAttribute('visible', true);
          const buttons2 = this.submenu4.querySelectorAll('[id]');
          buttons2.forEach(button => {
            button.setAttribute('visible', true);
          });
          this.sliderrEl.setAttribute('visible', true);
        }, 500);
    });
    
    this.minButton43El.addEventListener('click', () => {
        this.m33 = true;
        this.lastMenuPosition = this.getMenuPosition(this.submenu33);
        this.submenu33.setAttribute('visible', false);
        const buttons = this.submenu33.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        setTimeout(() => {
          this.maximizeButtonEl.setAttribute('visible', true);
        }, 500);
    });
    
    //controladores botones submenu4
    this.backButtonEl31.addEventListener('click', () => {
        var scene = document.querySelector("a-scene");
        this.deleteDiagram();
        
        // Guardar la posición actual del submenu4
        this.lastMenuPosition = this.getMenuPosition(this.submenu4);
        setTimeout(() => {
          if(this.electric || this.diesel || this.gasoline){
            this.changeGrabbable(this.submenu31, this.submenu4);
            this.electric = false;
            this.diesel = false;
            this.gasoline = false;
            this.submenu4.setAttribute('visible', false);
            
            setTimeout(() => {
              // Aplicar la posición guardada al submenu31
              this.applyMenuPosition(this.submenu31, this.lastMenuPosition);
              
              this.submenu31.setAttribute('visible', true);
              const buttons2 = this.submenu31.querySelectorAll('[id]');
              buttons2.forEach(button => {
                button.setAttribute('visible', true);
              });
            }, 500);
            
          } else if(this.white || this.black || this.red || this.yellow){
            this.changeGrabbable(this.submenu32, this.submenu4);
            this.white = false;
            this.black = false;
            this.red = false;
            this.yellow = false;
            this.submenu4.setAttribute('visible', false);
            
            setTimeout(() => {
              // Aplicar la posición guardada al submenu32
              this.applyMenuPosition(this.submenu32, this.lastMenuPosition);
              this.submenu32.setAttribute('visible', true);
              const buttons2 = this.submenu32.querySelectorAll('[id]');
              buttons2.forEach(button => {
                button.setAttribute('visible', true);
              });
            }, 500);
          
        }else if(this.threedoors || this.fivedoors){
          this.changeGrabbable(this.submenu33, this.submenu4);
          this.threedoors = false;
          this.fivedoors = false;
          this.submenu4.setAttribute('visible', false);
          setTimeout(() => {
            this.applyMenuPosition(this.submenu33, this.lastMenuPosition);
            this.submenu33.setAttribute('visible', true);
            const buttons2 = this.submenu33.querySelectorAll('[id]');
            buttons2.forEach(button => {
              button.setAttribute('visible', true);
            });
          }, 500);
        }
        
        const buttons = this.submenu4.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        this.sliderrEl.setAttribute('visible', false);
        }, 500);
    });
    this.mostrarButtonEl.addEventListener('click', () => {
        this.viewDiagram();
    });
    this.borrarButtonEl.addEventListener('click', () => {
        this.deleteDiagram();
    });
    this.minButton5El.addEventListener('click', () => {
        this.m4 = true;
        this.submenu4.setAttribute('visible', false);
        const buttons = this.submenu4.querySelectorAll('[id]');
        buttons.forEach(button => {
          button.setAttribute('visible', false);
        });
        setTimeout(() => {
          this.maximizeButtonEl.setAttribute('visible', true);
        }, 500);
    });
    
    //controlador boton maximizar
    this.maximizeButtonEl.addEventListener('click', () => {
        this.maximizeButtonEl.setAttribute('visible', false);
        if(this.initmenu){
          setTimeout(() => {
            this.menuInicio.setAttribute('visible', true);
            const buttons = this.menuInicio.querySelectorAll('[id]');
            buttons.forEach(button => {
              button.setAttribute('visible', true);
            });
            if(this.isDarkMode){
              this.darkButtonEl.setAttribute('visible', false);
            }else{
              this.lightButtonEl.setAttribute('visible', false);
            }
            this.initmenu = false;
          }, 500);
        }else if(this.m1){
          setTimeout(() => {
            this.submenu1.setAttribute('visible', true);
            const buttons = this.submenu1.querySelectorAll('[id]');
            buttons.forEach(button => {
              button.setAttribute('visible', true);
            });
            this.m1 = false;
          }, 500);
        }else if(this.m2){
          setTimeout(() => {
            this.submenu2.setAttribute('visible', true);
            const buttons = this.submenu2.querySelectorAll('[id]');
            buttons.forEach(button => {
              button.setAttribute('visible', true);
            });
            this.m2 = false;
          }, 500);
        }else if(this.m31){
          setTimeout(() => {
            this.submenu31.setAttribute('visible', true);
            const buttons = this.submenu31.querySelectorAll('[id]');
            buttons.forEach(button => {
              button.setAttribute('visible', true);
            });
            this.m31 = false;
          }, 500);
        }else if(this.m32){
          setTimeout(() => {
            this.submenu32.setAttribute('visible', true);
            const buttons = this.submenu32.querySelectorAll('[id]');
            buttons.forEach(button => {
              button.setAttribute('visible', true);
            });
            this.m32 = false;
          }, 500);
        }else if(this.m33){
          setTimeout(() => {
            this.submenu33.setAttribute('visible', true);
            const buttons = this.submenu33.querySelectorAll('[id]');
            buttons.forEach(button => {
              button.setAttribute('visible', true);
            });
            this.m33 = false;
          }, 500);
        }else if(this.m4){
          setTimeout(() => {
            this.submenu4.setAttribute('visible', true);
            const buttons = this.submenu4.querySelectorAll('[id]');
            buttons.forEach(button => {
              button.setAttribute('visible', true);
            });
            this.m4 = false;
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
      if (key.includes('menuP')) {
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
        if (key.includes('menuC') && button[key]) {
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
  }
});