AFRAME.registerComponent('animacion_vueltas', {

        init: function () {
            console.log("INIT");
            var colors = ['red', 'green', 'blue'];
            var i=0;
            var self = this.el;
          
            el.addEventListener('click', function() {
              var waitTime = Math.random() * 3000;
              setTimeout( function() {
                i = (i + 1) % colors.length;
                self.el.setAttribute('color', colors[i]);
                i++;
            }, waitTime);
          });
        },
        update: function () {
            console.log("update");
            var self = this;
            self.el.setAttribute('animation', {
                property: 'rotation',
                to: '0 0 360',
                loop: true,
                dur: 4000,
                easing: 'linear',
                delay: 1500
            });
        }
 });



AFRAME.registerComponent('createsons', {
      init: function () {
        console.log('Creando Hijos iniciado');
        var el = this.el;
        const scene = document.querySelector("a-scene");
        var ok = false;
        
        el.addEventListener('click', function() {
          if(!ok){
              var parentPosition = el.getAttribute('position');
              var parentY = parentPosition.y;
              var newSphere = document.createElement("a-sphere");
              newSphere.setAttribute("color", "orange");
              newSphere.setAttribute("position", "0 1.25 10");
              newSphere.setAttribute("radius", "0.5");
              newSphere.setAttribute("circular-animation", "radius: 1; speed: 2");
              scene.appendChild(newSphere);
              ok = true;
          }
        });
      },
});

