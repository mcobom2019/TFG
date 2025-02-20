AFRAME.registerComponent('createsons', {
      init: function () {
        console.log('Creando Hijos iniciado');
        var el = this.el;
        const scene = document.querySelector("a-scene");
        var hasSons = false;
        console.log("TRAZA 1: ",hasSons);
        
        el.addEventListener('click', function() {
            if (!hasSons){
              console.log("TRAZA 2: ",hasSons);
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
              hasSons = true;
              console.log("TRAZA 3: ",hasSons);
            }else{
              console.log("TRAZA 4: ",hasSons);
                var newColor = randomColor();
                el.setAttribute('color', newColor);
            }
        });
      },
});

AFRAME.registerComponent('changecolor', {
      init: function () {
        console.log('Cambiando de color iniciado');
        var el = this.el;
        
        el.addEventListener('click', function() {
            var newColor = randomColor();
            el.setAttribute('color', newColor);
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