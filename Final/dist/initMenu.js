AFRAME.registerComponent('menuinicio', {
  schema: {
    width: {default: 0.6},
    height: {default: 0.4},
    radius: {default: 0.03}
  },
  init: function () {
    const el = this.el;

    // bordes redondeados
    const shape = new THREE.Shape();
    const radius = this.data.radius;
    const width = this.data.width;
    const height = this.data.height;

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

    // Material metálico oscuro
    const material = new THREE.MeshStandardMaterial({
      color: '3a3a3a',        // Gris oscuro metalizado
      metalness: 0.7,          // Muy metálico
      roughness: 1.2,          // reflectivo
      envMapIntensity: 1.2     // entorno HDR
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -0.025);

    el.setObject3D('mesh', mesh);
  }
});
