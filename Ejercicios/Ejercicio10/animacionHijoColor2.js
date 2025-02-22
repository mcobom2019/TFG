AFRAME.registerComponent('animacion_vueltas', {
    schema: {
        radius: { type: 'number', default: 1.5 },
        speed: { type: 'number', default: 1 },
    },

    init: function () {
        console.log("INIT animacion_vueltas");
        this.angle = 0;
        var colors = ['red', 'green', 'blue'];
        var i = 0;
        var el = this.el;

        el.addEventListener('click', function () {
            var waitTime = Math.random() * 3000;
            setTimeout(function () {
                i = (i + 1) % colors.length;
                el.setAttribute('color', colors[i]);
            }, waitTime);
        });
    },

    tick: function (time, timeDelta) {
        let deltaSeconds = timeDelta / 1000;
        this.angle += this.data.speed * deltaSeconds;

        let x = this.data.radius * Math.cos(this.angle);
        let y = this.data.radius * Math.sin(this.angle);

        this.el.setAttribute('position', { x: x, y: y, z: -5.5 });
    }
});

AFRAME.registerComponent('createsons', {
    init: function () {
        console.log('Creando Hijos iniciado');
        var el = this.el;
        const scene = document.querySelector("a-scene");
        var ok = false;

        el.addEventListener('click', function () {
            if (!ok) {
                var parentPosition = el.getAttribute('position');
                var newY = parentPosition.y + 1;

                var newSphere = document.createElement("a-sphere");
                newSphere.setAttribute("color", "orange");
                newSphere.setAttribute("position", `0 ${newY} 3`);
                newSphere.setAttribute("radius", "0.7");
                newSphere.setAttribute("animacion_vueltas", "radius: 1.5; speed: 1");

                scene.appendChild(newSphere);
                ok = true;
            }
        });
    }
});


AFRAME.registerComponent('create3box', {
        init: function () {
            var self = this; 
            var entityEl = document.createElement('a-entity');
            entityEl.setAttribute('geometry', {
                primitive: 'cylinder',
                height: 1.5,
                width: 0.33,
                depth: 1.5
            });
            entityEl.setAttribute('material', {
                color: '#53B2ED'
            });
            entityEl.setAttribute('changecolor', '');

            var entityE2 = document.createElement('a-entity');
            entityE2.setAttribute('geometry', {
                primitive: 'cylinder',
                height: 1.5,
                width: 0.33,
                depth: 1.5
            });
            entityE2.setAttribute('material', {
                color: '#5553ED'
            });
            entityE2.setAttribute('changecolor', '');
            entityE2.object3D.position.set(-0.33, 0, 0);

            var entityE3 = document.createElement('a-entity');
            entityE3.setAttribute('geometry', {
                primitive: 'cylinder',
                height: 1.5,
                width: 0.33,
                depth: 1.5
            });
            entityE3.setAttribute('material', {
                color: '#5381ED'
            });
            entityE3.setAttribute('changecolor', '');
            entityE3.object3D.position.set(0.33, 0, 0);

            this.add3box = function (){
                this.appendChild(entityEl);
                this.appendChild(entityE2);
                this.appendChild(entityE3);
                this.removeEventListener('click', self.add3box);
            };
        },
      update: function () {
        this.el.addEventListener('click', this.add3box);
      }
    });

AFRAME.registerComponent('changecolor', {
      init: function () {
        console.log('Cambiando de color iniciado');
        var el = this.el;
        
        el.addEventListener('click', function() {
           var waitTime = Math.random() * 3000;
            setTimeout( function() {
                var newColor = randomColor();
                el.setAttribute('material', 'color', newColor);
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