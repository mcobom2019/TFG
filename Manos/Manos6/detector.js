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
    setTimeout(() => {
      this.submenuButton1El = document.querySelector('#submenuButton1');
      this.submenuButton2El = document.querySelector('#submenuButton2');
      this.submenuBackButtonEl = document.querySelector('#submenuBackButton');

      if (this.submenuButton1El) {
        this.submenuButton1El.addEventListener('pressedstarted', this.onSubmenuButton1Click);
      }
      if (this.submenuButton2El) {
        this.submenuButton2El.addEventListener('pressedstarted', this.onSubmenuButton2Click);
      }
      if (this.submenuBackButtonEl) {
        this.submenuBackButtonEl.addEventListener('pressedstarted', this.onSubmenuBackButtonClick);
      }
    }, 1000);
  },

  onStartButtonClick: function () {
    // Ocultar menú principal, mostrar submenú
    if (this.mainMenuEl && this.submenuEl) {
      this.mainMenuEl.setAttribute('visible', 'false');
      this.submenuEl.setAttribute('visible', 'true');
    }
  },

  onDarkModeButtonClick: function () {
    // Implementa la lógica del modo oscuro si lo deseas
  },

  onSubmenuButton1Click: function () {
    console.log('Submenú Opción 1 presionada');
    // Agrega aquí la lógica específica para el botón 1
  },

  onSubmenuButton2Click: function () {
    console.log('Submenú Opción 2 presionada');
    // Agrega aquí la lógica específica para el botón 2
  },

  onSubmenuBackButtonClick: function () {
    // Volver al menú principal
    if (this.mainMenuEl && this.submenuEl) {
      this.mainMenuEl.setAttribute('visible', 'true');
      this.submenuEl.setAttribute('visible', 'false');
    }
  }
});