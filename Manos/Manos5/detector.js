/* global AFRAME */
AFRAME.registerComponent('detector', {

  init: function () {
    this.bindMethods();
    
    // Obtenemos los botones según el ID en el HTML
    this.cylinderButtonEl = document.querySelector('#cylinderButon');
    this.darkModeButtonEl = document.querySelector('#darkModeButton');

    // Añadimos listeners para ambos botones
    this.cylinderButtonEl.addEventListener('click', this.onClick);
    this.darkModeButtonEl.addEventListener('click', this.onClick);
    
    // Añadimos eventos para la presión con manos
    this.cylinderButtonEl.addEventListener('pressedended', this.onClick);
    this.darkModeButtonEl.addEventListener('pressedended', this.onClick);
  },

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
  },

  onClick: function (evt) {
    var targetEl = evt.target;
    
    // Si es el botón de Dark Mode
    if (targetEl === this.darkModeButtonEl) {
      if (this.el.sceneEl.is('starry')) {
        // Cambia a modo claro
        targetEl.setAttribute('button', 'label', 'Dark Mode');
        this.el.sceneEl.setAttribute('environment', {preset: 'default'});
        this.el.sceneEl.removeState('starry');
      } else {
        // Cambia a modo oscuro
        targetEl.setAttribute('button', 'label', 'Light Mode');
        this.el.sceneEl.setAttribute('environment', {preset: 'starry'});
        this.el.sceneEl.addState('starry');
      }
    } 
    
    // Si es el botón de Start
    if (targetEl === this.cylinderButtonEl) {
      console.log("Botón Start presionado");
      // Activa la función del componente createsons que mostrará el menú
      targetEl.components.createsons.crearMenuPrincipal();
      targetEl.addState('pressed');
    }
  }
});