AFRAME.registerComponent('createsons', {
      init: function () {
        console.log('Creando Hijos');
        var el = this.el;
        const btnSphere = document.getElementById("btn-sphere");
        const scene = document.querySelector("a-scene");
        
        el.addEventListener('click', function() {
            for(let i=0; i<3; i++){
                var newSphere = document.createElement("a-sphere");
                newSphere.setAttribute("color", "green");
                newSphere.setAttribute("position", `0 ${(i*2)+2}-3`);
                scene.appendChild(newSphere);
            }
        });
      }
});