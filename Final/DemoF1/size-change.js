/* global AFRAME */
AFRAME.registerComponent('size-change', {
  init: function () {
    this.bindMethods();
    this.el.sceneEl.addEventListener('sliderchanged', this.onSliderChanged);
  },

  bindMethods: function () {
    this.onSliderChanged = this.onSliderChanged.bind(this);
  },

  onSliderChanged: function (evt) {
    var sliderValue = evt.detail.value;

    // Definir rangos de escala diferentes para cada eje
    var minScaleX = 0.1;  // Escala mínima para X
    var maxScaleX = 0.8;  // Escala máxima para X (más restrictiva)

    var minScaleY = 0.1;  // Escala mínima para Y
    var maxScaleY = 1.5;  // Escala máxima para Y (puede ser más alta)

    var minScaleZ = 0.1;  // Escala mínima para Z
    var maxScaleZ = 1.0;  // Escala máxima para Z

    // Calcular las escalas finales basadas en el valor del slider
    var scaleX = minScaleX + sliderValue * (maxScaleX - minScaleX);
    var scaleY = minScaleY + sliderValue * (maxScaleY - minScaleY);
    var scaleZ = minScaleZ + sliderValue * (maxScaleZ - minScaleZ);

    // Aplicar las escalas diferentes a cada eje
    this.el.object3D.scale.set(scaleX, scaleY, scaleZ);
  }
});