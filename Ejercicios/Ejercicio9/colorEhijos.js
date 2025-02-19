AFRAME.registerComponent('createsons', {
      init: function () {
        console.log('Creando Hijos');
        var el = this.el;
        const btnSphere = document.getElementById("btn-sphere");
        const scene = document.querySelector("a-scene");
        
        el.addEventListener('click', function() {
            for(let i=0; )
            const newBox = document.createElement("a-sphere");
            newBox.setAttribute("color", "green");
            newBox.setAttribute("position", `${Math.random() * 20 - 1} 1 -3`);
            scene.appendChild(newBox);
            
            
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


document.addEventListener("DOMContentLoaded", () => {
    const btnBox = document.getElementById("btn-box");
    const scene = document.querySelector("a-scene");

    btnBox.addEventListener("click", () => {
        const newBox = document.createElement("a-box");
        newBox.setAttribute("color", "green");
        newBox.setAttribute("position", `${Math.random() * 20 - 1} 1 -3`);
        scene.appendChild(newBox);
    });
});





function randomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
            
      const rgb = `rgb(${r},${g},${b})`;
      console.log("El color es", rgb);
            
      return rgb;
}