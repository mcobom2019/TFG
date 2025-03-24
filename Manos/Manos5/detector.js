/* global AFRAME */
AFRAME.registerComponent('detector', {

  init: function () {
    this.bindMethods();
    
    // Obtenemos los botones según el ID en el HTML
    this.cylinderButtonEl = document.querySelector('#cylinderButon');
    this.darkModeButtonEl = document.querySelector('#darkModeButton');

    // Añadimos listeners para ambos botones
    this.cylinderButtonEl.addEventListener('click', this.onClick);
    this.darkModeButtonEl.addEventListener('click', this.onDarkModeClick);
    
    // Añadimos eventos para la presión con manos
    this.cylinderButtonEl.addEventListener('pressedended', this.onClick);
    this.darkModeButtonEl.addEventListener('pressedended', this.onDarkModeClick);
  },

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
    this.onDarkModeClick = this.onDarkModeClick.bind(this);
  },

  onClick: function (evt) {
    console.log("Botón Start presionado");
    // Mantenemos la funcionalidad original para el botón principal
    var targetEl = evt.target;
    // Activa la función del componente createsons que mostrará el menú
    targetEl.components.createsons.crearMenuPrincipal();
    targetEl.addState('pressed');
  },
  
  onDarkModeClick: function (evt) {
    console.log("Botón Dark Mode presionado");
    var targetEl = evt.target;
    
    if (this.el.sceneEl.is('starry')) {
      targetEl.setAttribute('button', 'label', 'Dark Mode');
      this.el.sceneEl.setAttribute('environment', {preset: 'default'});
      this.el.sceneEl.removeState('starry');
    } else {
      targetEl.setAttribute('button', 'label', 'Light Mode');
      this.el.sceneEl.setAttribute('environment', {preset: 'starry'});
      this.el.sceneEl.addState('starry');
    }
    
    if (targetEl.components.button.data.toggleable) {
      if (targetEl.is('pressed')) {
        targetEl.removeState('pressed');
      } else {
        targetEl.addState('pressed');
      }
    }
  }
});