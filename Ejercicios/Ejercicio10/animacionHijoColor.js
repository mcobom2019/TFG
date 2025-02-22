AFRAME.registerComponent('circular-animation', {
      schema: {
        radius: {type: 'number', default: 1.5},
        speed: {type: 'number', default: 1},
      },
      
      init: function () {
        this.angle = 0;
        var el = this.el;
        var colors = ['red', 'green', 'blue'];
        var i=0;
        el.addEventListener('click', function() {
           var waitTime = Math.random() * 3000;
            setTimeout( function() {
                i = (i + 1) % colors.length;
                el.setAttribute('color', colors[i]);
                i++;
            }, waitTime);
        });
      },
  
      tick: function (time, timeDelta){
        let deltaSeconds = timeDelta / 1000;
        this.angle += this.data.speed * deltaSeconds;

        let x = this.data.radius * Math.cos(this.angle);
        let y = this.data.radius * Math.sin(this.angle);

        this.el.setAttribute('position', { x: x, y: y, z: -4 });
      }
});


AFRAME.registerComponent('createsons', {
      init: function () {
        console.log('Creando Hijos iniciado');
        var el = this.el;
        const scene = document.querySelector("a-scene");
        var hasSons = false;
        
        el.addEventListener('click', function() {
            if (!hasSons){
              var parentPosition = el.getAttribute('position');
              var parentY = parentPosition.y;
              var newSphere = document.createElement("a-sphere");
              //newSphere.setAttribute("color", "green");
              newSphere.setAttribute("position", `${(i - 2)*0.5} ${parentY + 1} -4`);
              newSphere.setAttribute("radius", "0.2");
                  newSphere.setAttribute("changecolor", "");
                  scene.appendChild(newSphere);
              }
              hasSons = true;
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