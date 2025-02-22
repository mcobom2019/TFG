AFRAME.registerComponent('animacion_vueltas', {
    schema: {
        radius: { type: 'number', default: 1.5 },  // Radio del movimiento circular
        speed: { type: 'number', default: 1 }      // Velocidad de giro
    },

    init: function () {
        console.log("INIT animacion_vueltas");
        this.angle = 0;
        var colors = ['red', 'green', 'blue'];
        var i = 0;
        var el = this.el;

        // Animación de rotación sobre su propio eje
        el.setAttribute('animation', {
            property: 'rotation',
            to: '0 360 0',
            loop: true,
            dur: 4000,
            easing: 'linear'
        });

        // Cambio de color al hacer clic
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
        let z = this.data.radius * Math.sin(this.angle) - 3;  // Mantiene la profundidad de -3

        this.el.setAttribute('position', { x: x, y: this.el.getAttribute('position').y, z: z });
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
                var newY = parentPosition.y + 1;  // Hija aparece arriba

                var newSphere = document.createElement("a-sphere");
                newSphere.setAttribute("color", "orange");
                newSphere.setAttribute("position", `0 ${newY} -3`);
                newSphere.setAttribute("radius", "0.5");
                newSphere.setAttribute("animacion_vueltas", "radius: 1.5; speed: 2");

                scene.appendChild(newSphere);
                ok = true;
            }
        });
    }
});
