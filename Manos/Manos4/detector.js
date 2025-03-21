/* global AFRAME */
AFRAME.registerComponent('detector', {

  init: function () {
    this.bindMethods();
    
    // Aquí cambiamos la forma de obtener el botón para que coincida con el ID en el HTML
    this.cylinderButtonEl = document.querySelector('#cylinderButon');

    this.cylinderButtonEl.addEventListener('click', this.onClick);
    // Añadimos evento para la presión con manos
    this.cylinderButtonEl.addEventListener('pressedended', this.onClick);
  },

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
  },

  onClick: function (evt) {
    console.log("Botón presionado detectado");
    // Simplificamos esto para que funcione solo para nuestro botón principal
    var targetEl = evt.target;
    // Activa la función del componente createsons que mostrará el menú
    targetEl.components.createsons.crearMenuPrincipal();
  }
});