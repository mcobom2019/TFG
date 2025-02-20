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
                scene.appendChild(newSphere);
            }
        });
      }
});