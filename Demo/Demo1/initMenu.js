AFRAME.registerComponent('menuinicio', {
  init: function () {
    const el = this.el;

    // Crear geometría con bordes redondeados
    const shape = new THREE.Shape();
    const radius = 0.03;
    const width = 0.6;
    const height = 0.4;

    shape.moveTo(-width / 2 + radius, -height / 2);
    shape.lineTo(width / 2 - radius, -height / 2);
    shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
    shape.lineTo(width / 2, height / 2 - radius);
    shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
    shape.lineTo(-width / 2 + radius, height / 2);
    shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
    shape.lineTo(-width / 2, -height / 2 + radius);
    shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);

    const extrudeSettings = {
      depth: 0.01,
      bevelEnabled: false
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    // Material metálico
    const material = new THREE.MeshStandardMaterial({
      color: '9B9B9B',
      metalness: 1,
      roughness: 0.3
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -0.025);

    el.setObject3D('mesh', mesh);
  }
});
