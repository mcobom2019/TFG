/*
  Author: Mario Cobo Martínez
  script: menu.js
  Description: With this script you can easily create an interactive menu in aframe. 
  Through a JSON where you define the menus and its buttons have menus with buttons 
  which will do different actions depending on the functions that you apply them. 
  For this you must create the corresponding functions, I have left as an example 
  the darkButton, lightButton and createLamp functions. This scene will be created 
  automatically by reading from the JSON without having to define the controls of 
  the buttons or the menus manually, besides applies the functions defined in the JSON 
  for each menuy automatically.
*/
/* global AFRAME */
AFRAME.registerComponent('menu', {
  init: function() {
    /*Defines a boolean for each menu*/
    this.initmenu = false;
    this.m0 = false;
    this.m1 = false;
    this.m2 = false;
    this.m3 = false;
    this.isDarkMode = false;
    this.numFurniture = 0;
    
    /*Last known menu position*/
    this.lastMenuPosition = { x: 0, y: 0, z: 0 };
    this.lastMenuRotation = { x: 0, y: 0, z: 0 };
    this.createLamp();
    
    fetch('scene.json')
      .then(response => response.json())
      .then(data => {
        this.data = data;
        this.signalCreateMenus();
        this.setupEvents();
      })
      .catch(error => {
        console.error('Error cargando scene.json:', error);
      });
  },
  
  setupEvents: function() {
    this.setupMenuReferences();
    this.setupButtonReferences();
    this.setupAutomaticButtonEvents();
    
    /*Function to make the menu visible*/
    this.maximizeButtonEl.addEventListener('click', () => {
        this.maximizeButtonEl.setAttribute('visible', false);
        if(this.initmenu){
            this.maximizeMenu(this.menuinicio);
            this.initilizeBoolean('initmenu');
        }else if(this.m0){
            this.maximizeMenu(this.submenu0);
            this.changeBoolean('m0');
        }else if(this.m1){
            this.maximizeMenu(this.submenu1);
            this.changeBoolean('m1');
        }else if(this.m3){
            this.maximizeMenu(this.submenu3);
            this.changeBoolean('m3');
        }else if(this.m2){
            this.maximizeMenu(this.submenu2);
            this.changeBoolean('m2');
        }
    });
  },
  
  /*Function: signalCreateMenus
  Is a function that searches in the parent menus, which start with menuP. 
  Call the createMenu and createChildMenus function to create both parent and child menus.*/
  signalCreateMenus: function() {
    if (!this.data) {
      console.error('No data found in JSON');
      return;
    }
    
    Object.keys(this.data).forEach(key => {
      if (key.includes('menuP')) {
        console.log('Creating parent menu:', key);
        this.createMenu(this.data[key]);
        this.createChildMenus(this.data[key]);
      }
    });
    
    Object.keys(this.data).forEach(key => {
      const value = this.data[key];
      if (Array.isArray(value)) {
        value.forEach(item => {
          if (item && item.id && item.buttons) {
            console.log('Creating menu from array:', item.id);
            this.createMenu(item);
            this.createChildMenus(item);
          }
        });
      }
    });
  },
  /*Function: createChildMenus
  Is a function that searches for all child menus and creates them by calling the createMenu function. 
  Children menus have to start with menuC. These child menus are included as bootnes in parent menus*/
  createChildMenus: function(parentMenu) {
    if (!parentMenu.buttons || !Array.isArray(parentMenu.buttons)) {
      return;
    }
    
    parentMenu.buttons.forEach(button => {
      Object.keys(button).forEach(key => {
        if (key.includes('menuC') && button[key]) {
          console.log('Creating child menu:', key, ' - ID:', button[key].id);
          this.createMenu(button[key]);
          this.createChildMenus(button[key]);
        }
      });
    });
  },
  /*Function: createMenu
  Function that creates as such the menu giving you position, visibility, an id ... 
  Also calls the function createButtons.*/
  createMenu: function(pMenu) {
    if (!pMenu) return;
    
    const sceneEl = this.el;
    const menuEl = document.createElement('a-entity');
      
    if (pMenu.id) {
      menuEl.setAttribute('id', pMenu.id);
      menuEl.setAttribute('menuinicio', '');
      
      if(menuEl.id === "submenu4"){
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
      menuEl.setAttribute('grabbable', '');
    }
    if (pMenu.buttons && pMenu.buttons.length > 0) {
      this.createButtons(menuEl, pMenu.buttons);
    }
    sceneEl.appendChild(menuEl);
  },
  /*Function: createButtons
  Function that creates the buttons of each menu by giving them their appearance, id, position ...*/
  createButtons: function(parentEl, buttons) {
    buttons.forEach((button, index) => { 
      const buttonEl = document.createElement('a-entity');
      
      if (button.id) {
        buttonEl.setAttribute('id', button.id);
        buttonEl.setAttribute('button', {
          label: button.label,
          width: button.width || 0.2,
          toggleable: button.toggleable || false,
          primitive: button.primitive || 'cylinder',
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
  
  /*Function: getMenuPosition
  Function that takes the position and rotation of the menu that is passed as parameter*/
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
  
  /*Function: applyMenuPosition
  Function that applies the position and rotation passed as second parameter to the menu 
  passed as first parameter*/
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
  /*Function: changeGrabbable
  Function that makes grababble the menu that is passed as first parameter 
  and removes the grabbable attribute to the menu that is passed as second parameter*/
  changeGrabbable: function(menu1, menu2){
    menu1.setAttribute('grababble', '');
    menu2.removeAttribute('grabbable');
    menu1.setAttribute('grabbable', '');
  },
  /*Function: nextMenu
  Function that hides the menu that is passed as first parameter 
  and makes visible the menu that is passed as second parameter*/
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
  /*Function: changeBoolean
  Function that changes the state of the boolean passed as parameter*/
  changeBoolean: function(boolName) {
    if (this[boolName] !== undefined) {
      this[boolName] = !this[boolName];
      console.log('State of' + boolName + ' was changed to: ' + this[boolName]);
    }else {
      console.warn('Property ' + boolName + ' does not exist in this component');
    }
  },
  /*Function: minimizeMenu
  Function that minimizes a menu, makes it not visible, previously you have to change 
  the state of the boolean corresponding to that menu*/
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
  /*Function: deleteMenu
  Function that makes the menu passed as parameter not visible*/
  deleteMenu: function(menu){
        menu.setAttribute('visible', false);
        const buttons2 = menu.querySelectorAll('[id]');
        buttons2.forEach(button => {
          button.setAttribute('visible', false);
        });
  },
  /*Function: darkMode
  Function that controls the functionality of the DarkMode button, 
  if you press this button, it will change the scene from day to night. 
  Creates a lamp and makes the lightMode button visible*/
  darkMode: function() {
    this.darkButtonEl.setAttribute('visible', false);
    const scene = this.el.sceneEl;
    const isARMode = scene.is('ar-mode');
    const sky = document.querySelector('a-sky');
    
    if (!isARMode && sky) {
      sky.setAttribute('visible', true);
      sky.setAttribute('material', 'opacity', 0.8);
      sky.setAttribute('material', 'color', '#001133');
    }
    document.querySelector('#luz1').setAttribute('light', 'intensity', 0.1);
    document.querySelector('#luz2').setAttribute('light', 'intensity', 0.1);
    this.toggleLamp(true);
    this.isDarkMode = true;
    setTimeout(() => {
      this.lightButtonEl.setAttribute('visible', true);
    }, 250);
  },
  /*Function: lightMode
  Function that controls the lightMode button functionality, 
  if you press this button, it will change the scene from night to day. 
  Remove the lamp and make the darkModeMode button visible*/
  lightMode: function() {
    this.lightButtonEl.setAttribute('visible', false);
    const scene = this.el.sceneEl;
    const isARMode = scene.is('ar-mode');
    const sky = document.querySelector('a-sky');
    
    if (!isARMode && sky) {
      sky.setAttribute('visible', true);
      sky.setAttribute('material', 'opacity', 1);
      sky.setAttribute('material', 'color', '#FFFFFF');
    }
    document.querySelector('#luz1').setAttribute('light', 'intensity', 0.7);
    document.querySelector('#luz2').setAttribute('light', 'intensity', 0.7);
    this.toggleLamp(false);
    this.isDarkMode = false;
    setTimeout(() => {
      this.darkButtonEl.setAttribute('visible', true);
    }, 250);
  },
  /*Function: initilizeBoolean
  Function that changes the state of the boolean passed as parameter to false*/
  initilizeBoolean: function(boolName) {
    this[boolName] = false;
  },
  /*Function: maximizeMenu
  Function that makes visible the menu that was minimized*/
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
  /*Function: setupMenuReferences
  Function that initializes the menu drivers automatically by reading the JSON. 
  Instead of manually typing this.menuidEl = document.querySelector('#menuid');, 
  this function does so automatically for all menus defined in the JSON*/
  setupMenuReferences: function() {
    const menuIds = [];
    const extractMenuIds = (menuObj) => {
      if (!menuObj || typeof menuObj !== 'object') return;

      if (menuObj.id) {
        menuIds.push(menuObj.id);
      }

      if (menuObj.buttons && Array.isArray(menuObj.buttons)) {
        menuObj.buttons.forEach(button => {
          Object.keys(button).forEach(key => {
            if (key.startsWith('menuC') && button[key]) {
              extractMenuIds(button[key]);
            }
          });
        });
      }
    };
    if (this.data && this.data.menuP) {
      extractMenuIds(this.data.menuP);
    }
    menuIds.forEach(menuId => {

      const propName = menuId.replace(/([a-z])([A-Z])/g, '$1$2')
                             .replace(/[-_]([a-z])/g, (_, letter) => letter.toUpperCase())
                             .replace(/^([a-z])/, (_, letter) => letter);
      this[propName] = document.querySelector('#' + menuId);

      if (!this[propName]) {
        console.warn(`No match menu with id: ${menuId}`);
      } else {
        console.log(`Reference created, this.${propName} = element with id #${menuId}`);
      }
    });

    this.maximizeButtonEl = document.querySelector('#maximizeButton');
    if (this.maximizeButtonEl) {
      this.maximizeButtonEl.setAttribute('rotation', '0 0 0');
    } else {
      console.warn('The maximizeButton is not found');
    }
  },
  /*Function: setupButtonReferences
  Function that initializes the buttons controllers of each menu automatically by reading the JSON. 
  Instead of manually typing this.buttonidEl = document.querySelector('#buttonid');, 
  this function automatically does so for all the buttons defined in the JSON*/
  setupButtonReferences: function() {
    const buttonIds = [];
    const extractButtonIds = (menuObj) => {
      if (!menuObj || typeof menuObj !== 'object') return;

      if (menuObj.buttons && Array.isArray(menuObj.buttons)) {
        menuObj.buttons.forEach(button => {
          if (button.id) {
            buttonIds.push(button.id);
          }
          Object.keys(button).forEach(key => {
            if (key.startsWith('menuC') && button[key]) {
              extractButtonIds(button[key]);
            }
          });
        });
      }
    };
    if (this.data) {
      Object.keys(this.data).forEach(key => {
        if (key.startsWith('menuP')) {
          extractButtonIds(this.data[key]);
        }
      });
    }

    buttonIds.forEach(buttonId => {
      const propName = buttonId.replace(/([a-z])([A-Z])/g, '$1$2')
                             .replace(/[-_]([a-z])/g, (_, letter) => letter.toUpperCase())
                             .replace(/^([a-z])/, (_, letter) => letter) + 'El';


      this[propName] = document.querySelector('#' + buttonId);
      if (!this[propName]) {
        console.warn(`there is no button with id: ${buttonId}`);
      } else {
        console.log(`Reference created: this.${propName} = element with ID #${buttonId}`);
      }
    });

    this.maximizeButtonEl = document.querySelector('#maximizeButton');
    if (this.maximizeButtonEl) {
      this.maximizeButtonEl.setAttribute('rotation', '0 0 0');
    } else {
      console.warn('The maximizeButton is not found');
    }
  },
  /*Function: setupAutomaticButtonEvents
  Function that takes the functions defined in each menu, besides the parameters that use these functions. 
  Apply functions for each menu automatically without having to do it manually*/
  setupAutomaticButtonEvents: function() {
    if (!this.data) return;

    const setupButtonEventsInMenu = (menuObj, menuId) => {
      if (!menuObj || !menuObj.buttons || !Array.isArray(menuObj.buttons)) return;

      console.log(`Configuring ${menuObj.buttons.length} buttons to the menu: ${menuId}`);
      menuObj.buttons.forEach(button => {
        if (!button.id) return;

        const buttonEl = document.querySelector('#' + button.id);
        if (!buttonEl) {
          console.warn(`No match menu with id: ${button.id}`);
          return;
        }

        console.log(`Configuring button ${button.id} with label: ${button.label || 'without label'}`);
        buttonEl.addEventListener('click', (event) => {
          console.log(`Botón ${button.id} clickeado!`);

          for (let i = 1; i <= 6; i++) {
            const funcName = `function${i}`;

            if (button[funcName]) {
              const functionToCall = button[funcName];
              console.log(`Executing ${functionToCall} to the button: ${button.id}`);
              if (typeof this[functionToCall] !== 'function') {
                console.error(`The function:  "${functionToCall}" does not exists the button component`);
                continue;
              }
              const param1 = button[`parameter1f${i}`];
              const param2 = button[`parameter2f${i}`];

              try {
                switch(functionToCall) {
                  case 'nextMenu':
                  case 'minimizeMenu':
                  case 'maximizeMenu':
                  case 'deleteMenu':
                    if (param1) {
                      const menuEl = document.querySelector('#' + param1);
                      if (!menuEl) {
                        console.error(`No match menu with id: ${param1} to the function: ${functionToCall}`);
                        continue;
                      }

                      console.log(`Calling to ${functionToCall} with menu: ${param1}`);

                      if (param2 && functionToCall === 'nextMenu') {
                        const menuEl2 = document.querySelector('#' + param2);
                        if (!menuEl2) {
                          console.error(`No match menu with id: ${param2}`);
                          continue;
                        }
                        this[functionToCall](menuEl, menuEl2);
                      } else {
                        this[functionToCall](menuEl);
                      }
                    } else {
                      console.error(`No match menu with the function: ${functionToCall}`);
                    }
                    break;

                  default:
                    if (param1 && param2) {
                      this[functionToCall](param1, param2);
                    } else if (param1) {
                      this[functionToCall](param1);
                    } else {
                      this[functionToCall]();
                    }
                }
              } catch (error) {
                console.error(`Error executing ${functionToCall}:`, error);
              }
            }
          }
        });
        Object.keys(button).forEach(key => {
          if (key.startsWith('menuC') && button[key]) {
            setupButtonEventsInMenu(button[key], button[key].id);
          }
        });
      });
    };

    Object.keys(this.data).forEach(key => {
      if (key.startsWith('menuP')) {
        setupButtonEventsInMenu(this.data[key], this.data[key].id);
      }
    });

    console.log("Automatic event configuration completed");
  },
  /*Function: createLamp
  Function that creates a lamp in the scene*/
  createLamp: function() {
    const sceneEl = this.el.sceneEl;
    const lampEntity = document.createElement('a-entity');
    lampEntity.setAttribute('id', 'menu-lamp');
    
    const lightEntity = document.createElement('a-light');
    lightEntity.setAttribute('type', 'point');
    lightEntity.setAttribute('color', '#ffffff');
    lightEntity.setAttribute('intensity', '0.8');
    lightEntity.setAttribute('distance', '5');
    lightEntity.setAttribute('position', '-0 0.2 0');
    
    const lampModelEntity = document.createElement('a-entity');
    lampModelEntity.setAttribute('geometry', 'primitive: sphere; radius: 0.05');
    lampModelEntity.setAttribute('material', 'color: #ffff99; emissive: #ffff00; emissiveIntensity: 0.8');
    
    const lampStandEntity = document.createElement('a-entity');
    lampStandEntity.setAttribute('geometry', 'primitive: cylinder; radius: 0.01; height: 0.15');
    lampStandEntity.setAttribute('material', 'color: #888888');
    lampStandEntity.setAttribute('position', '0 -0.1 0');
    
    lampEntity.appendChild(lightEntity);
    lampEntity.appendChild(lampModelEntity);
    lampEntity.appendChild(lampStandEntity);
    lampEntity.setAttribute('position', '-0.5 1.5 0');
    
    lampEntity.setAttribute('visible', false);
    lampEntity.setAttribute('grabbable', true);
    sceneEl.appendChild(lampEntity);
    this.lampEntity = lampEntity;
  },
  /*Function: toggleLamp
  Function that shows/hides the lamp*/
  toggleLamp: function(show) {
    if (this.lampEntity) {
      this.lampEntity.setAttribute('visible', show);
    }
  },
});