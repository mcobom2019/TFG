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
  },
  
  // Nueva función para manejar específicamente el botón de Dark Mode
  onDarkModeClick: function (evt) {
    console.log("Botón Dark Mode activado");
    var targetEl = evt.target;
    
    // Acceder a la escena
    var sceneEl = document.querySelector('a-scene');
    
    if (sceneEl.is('starry')) {
      // Cambiar a modo claro
      targetEl.setAttribute('button', 'label', 'Dark Mode');
      sceneEl.setAttribute('environment', {preset: 'default'});
      sceneEl.removeState('starry');
      console.log("Cambiado a modo claro");
    } else {
      // Cambiar a modo oscuro
      targetEl.setAttribute('button', 'label', 'Light Mode');
      sceneEl.setAttribute('environment', {preset: 'starry'});
      sceneEl.addState('starry');
      console.log("Cambiado a modo oscuro");
    }
  }
});