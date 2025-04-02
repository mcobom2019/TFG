/* global AFRAME */
AFRAME.registerComponent('loader', {
  init: function() {
    const sceneEl = this.el;
    
    // Cargar el JSON
    fetch('scene.json')
      .then(response => response.json())
      .then(data => {
        // Establecer el color de fondo
        //const skyEl = document.createElement('a-sky');
        //skyEl.setAttribute('color', data.scene.background.color);
        //sceneEl.appendChild(skyEl);
        
        // Crear entidades
        data.scene.menuPadre.forEach(entity => {
          
        });
        data.scene.entities.forEach(entity => {
          // Crear el elemento según su tipo
          const entityEl = document.createElement('a-' + entity.type);
          
          // Asignar el ID si existe
          if (entity.id) {
            entityEl.setAttribute('id', entity.id);
          }
          
          // Configurar posición
          if (entity.position) {
            entityEl.setAttribute('position', {
              x: entity.position.x,
              y: entity.position.y,
              z: entity.position.z
            });
          }
          
          // Configurar rotación
          if (entity.rotation) {
            entityEl.setAttribute('rotation', {
              x: entity.rotation.x,
              y: entity.rotation.y,
              z: entity.rotation.z
            });
          }
          
          // Configurar color
          if (entity.color) {
            entityEl.setAttribute('color', entity.color);
          }
          
          // Configurar atributos específicos según el tipo
          switch (entity.type) {
            case 'plane':
              if (entity.width) entityEl.setAttribute('width', entity.width);
              if (entity.height) entityEl.setAttribute('height', entity.height);
              break;
            case 'box':
              if (entity.width) entityEl.setAttribute('width', entity.width);
              if (entity.height) entityEl.setAttribute('height', entity.height);
              if (entity.depth) entityEl.setAttribute('depth', entity.depth);
              break;
            case 'sphere':
              if (entity.radius) entityEl.setAttribute('radius', entity.radius);
              break;
            case 'cylinder':
              if (entity.radius) entityEl.setAttribute('radius', entity.radius);
              if (entity.height) entityEl.setAttribute('height', entity.height);
              break;
            case 'text':
              if (entity.value) entityEl.setAttribute('value', entity.value);
              if (entity.width) entityEl.setAttribute('width', entity.width);
              if (entity.align) entityEl.setAttribute('align', entity.align);
              break;
          }
          
          // Añadir entidad a la escena
          sceneEl.appendChild(entityEl);
        });
        
        // Crear luces
        data.scene.lights.forEach(light => {
          const lightEl = document.createElement('a-light');
          
          // Configurar tipo de luz
          lightEl.setAttribute('type', light.type);
          
          // Configurar color e intensidad
          lightEl.setAttribute('color', light.color);
          lightEl.setAttribute('intensity', light.intensity);
          
          // Configurar posición
          if (light.position) {
            lightEl.setAttribute('position', {
              x: light.position.x,
              y: light.position.y,
              z: light.position.z
            });
          }
          
          // Añadir luz a la escena
          sceneEl.appendChild(lightEl);
        });
      })
      .catch(error => {
        console.error('Error cargando la escena desde JSON:', error);
      });
  }
});