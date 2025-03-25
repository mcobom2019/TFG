/* global AFRAME */
AFRAME.registerComponent('detector', {
  init: function () {
    this.bindMethods();

    // Elementos del menú principal
    this.startButtonEl = document.querySelector('#cylinderButon');
    this.darkModeButtonEl = document.querySelector('#darkModeButton');

    // Elementos del submenú
    this.submenuButton1El = null;
    this.submenuButton2El = null;
    this.submenuBackButtonEl = null;

    // Menús
    this.mainMenuEl = document.querySelector('#menu');
    this.submenuEl = document.querySelector('#submenu');

    // Eventos para menú principal
    this.startButtonEl.addEventListener('pressedstarted', this.onStartButtonClick);
    this.darkModeButtonEl.addEventListener('pressedstarted', this.onDarkModeButtonClick);

    // Inicializar submenú dinámicamente
    this.initSubmenuButtons();
  },

  bindMethods: function () {
    this.onStartButtonClick = this.onStartButtonClick.bind(this);
    this.onDarkModeButtonClick = this.onDarkModeButtonClick.bind(this);
    this.onSubmenuButton1Click = this.onSubmenuButton1Click.bind(this);
    this.onSubmenuButton2Click = this.onSubmenuButton2Click.bind(this);
    this.onSubmenuBackButtonClick = this.onSubmenuBackButtonClick.bind(this);
  },

  initSubmenuButtons: function () {
    // Asegurarse de que los botones del submenú estén creados
    setTimeout(() => {
      this.submenuButton1El = document.querySelector('#submenuButton1');
      this.submenuButton2El = document.querySelector('#submenuButton2');
      this.submenuBackButtonEl = document.querySelector('#submenuBackButton');

      console.log('Submenu buttons:', {
        button1: this.submenuButton1El,
        button2: this.submenuButton2El,
        backButton: this.submenuBackButtonEl
      });

      if (this.submenuButton1El) {
        this.submenuButton1El.addEventListener('pressedstarted', this.onSubmenuButton1Click);
      }
      if (this.submenuButton2El) {
        this.submenuButton2El.addEventListener('pressedstarted', this.onSubmenuButton2Click);
      }
      if (this.submenuBackButtonEl) {
        this.submenuBackButtonEl.addEventListener('pressedstarted', this.onSubmenuBackButtonClick);
      }
    }, 1000); // Aumenté el tiempo de espera para asegurar la creación de elementos
  },

  onStartButtonClick: function () {
    console.log('Start button pressed');
    console.log('Main menu:', this.mainMenuEl);
    console.log('Submenu:', this.submenuEl);

    // Ocultar menú principal, mostrar submenú
    if (this.mainMenuEl && this.submenuEl) {
      this.mainMenuEl.setAttribute('visible', 'false');
      this.submenuEl.setAttribute('visible', 'true');
    } else {
      console.error('Menu elements not found');
    }
  },

  // Resto del código permanece igual...
});