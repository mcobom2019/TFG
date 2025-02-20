AFRAME.registerComponent('createsons', {
      init: function () {
        console.log('Creando Hijos iniciado');
        var el = this.el;
        const scene = document.querySelector("a-scene");
        var hasSons = false;
        
        el.addEventListener('click', function() {
              var parentPosition = el.getAttribute('position');
              var parentY = parentPosition.y;
              for(let i=0; i<3; i++){
                  var newSphere = document.createElement("a-sphere");
                  newSphere.setAttribute("color", "green");
                  newSphere.setAttribute("position", `${(i - 2)*0.5} ${parentY + 1} -4`);
                  newSphere.setAttribute("radius", "0.2");
                  newSphere.setAttribute("changecolor", "");
                  scene.appendChild(newSphere);
              }
        });
      },
});

AFRAME.registerComponent('changecolor', {
      init: function () {
        console.log('Cambiando de color iniciado');
        var el = this.el;
        
        el.addEventListener('click', function() {
           var waitTime = Math.random() * 3000;
            setTimeout( function() {
                var newColor = randomColor();
                el.setAttribute('color', newColor);
            }, waitTime);
        });
      }
});

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