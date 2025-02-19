AFRAME.registerComponent('changecylinder', {
      init: function () {
        console.log('Cambiando el cilindro');
        var el = this.el;
        el.addEventListener('click', function() {
            var waitTime = Math.random() * 3000;
            
            setTimeout( function() {
                const color = randomColor();
                el.setAttribute('material', 'color', color);
                var posicionactual = el.getAttribute('position');
                var nuevaposicion = {
                  x: posicionactual.x,
                  y: posicionactual.y,
                  z: posicionactual.z - 1,
                };
                el.setAttribute('position', nuevaposicion);
            }, waitTime);
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