AFRAME.registerComponent('createsons', {
      init: function () {
        console.log('Creando Hijos');
        var el = this.el;
        const btnSphere = document.getElementById("btn-sphere");
        const scene = document.querySelector("a-scene");
        
        el.addEventListener('click', function() {
            var parentPosition = el.getAttribute('position');
            var parentY = parentPosition.y;
            for(let i=0; i<3; i++){
                var newSphere = document.createElement("a-sphere");
                newSphere.setAttribute("color", "green");
                newSphere.setAttribute("position", `${(i - 1)*0.5} ${parentY + 1} -3`);
                newSphere.setAttribute("radius", "0.2");
                newSphere.setAttribute("changecolor", "");
                scene.appendChild(newSphere);
            }
        });
      },
});

AFRAME.registerComponent('changecolor', {
      init: function () {
        console.log('Creando Hijos');
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