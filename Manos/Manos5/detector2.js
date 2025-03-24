/* global AFRAME */
AFRAME.registerComponent('detector', {
  init: function () {
    // Usar this.el.sceneEl en lugar de document.querySelector
    this.sceneEl = this.el.sceneEl;
    this.darkModeButtonEl = this.el.querySelector('#darkModeButton');

    if (!this.darkModeButtonEl) {
      console.error('Dark Mode Button not found');
      return;
    }

    // Por defecto, comenzar en modo claro
    this.sceneEl.setAttribute('environment', {preset: 'default'});
    this.darkModeButtonEl.setAttribute('button', 'label', 'Dark Mode');

    // Añadir evento de click, no de presión
    this.darkModeButtonEl.addEventListener('click', this.toggleDarkMode.bind(this));
  },

  toggleDarkMode: function () {
    console.log('Dark Mode Toggle Clicked');
    
    if (this.sceneEl.is('starry')) {
      // Cambia a modo claro
      this.darkModeButtonEl.setAttribute('button', 'label', 'Dark Mode');
      this.sceneEl.setAttribute('environment', {preset: 'default'});
      this.sceneEl.removeState('starry');
    } else {
      // Cambia a modo oscuro
      this.darkModeButtonEl.setAttribute('button', 'label', 'Light Mode');
      this.sceneEl.setAttribute('environment', {preset: 'starry'});
      this.sceneEl.addState('starry');
    }
  }
});