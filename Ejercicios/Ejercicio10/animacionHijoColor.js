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