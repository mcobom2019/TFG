/* global AFRAME */
AFRAME.registerComponent('detector', {

  init: function () {
    this.bindMethods();

    this.cylinderButtonEl = document.querySelector('#cylinderButon');

    this.cylinderButtonEl.addEventListener('click', this.onClick);
  },

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
  },

  onClick: function (evt) {
    var targetEl = evt.target;
    if (targetEl === this.cylinderButtonEl) {
      this.cylinderButtonEl.removeState('pressed');
      this.buttonToGeometry[targetEl.id].object3D.visible = true;
    }
  }
});