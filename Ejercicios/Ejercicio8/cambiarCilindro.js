AFRAME.registerComponent('cambiarcolorcilindro', {
      init: function () {
        console.log('Cambiando color de el cilindro');
        var el = this.el;
        el.addEventListener('click', function() {
            const color = randomColor();
            el.setAttribute('material', 'color', color);
        });
      }
  });
function randomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
            
      const rgb = `rgb(${r},${g},${b})`;
      console.log("El color es", rgb);
            
      return rgb;
}

AFRAME.registerComponent('cambiarposicioncilindro', {
      init: function () {
        console.log('Cambiando pisicion de el cilindro');
        var el = this.el;
        el.addEventListener('click', function() {
            var posicionactual = el.getAttribute('position');
            var nuevaposicion = {
              x: posicionactual.x,
              y: posicionactual.y,
              z: posicionactual.z - 1,
            };
            el.setAttribute('position', nuevaposicion);
        });
      }
});