/* global AFRAME, THREE */
AFRAME.registerComponent('slider', {
  schema: {
    width: { default: 0.5 }
  },
  
  init: function () {
    // Crear el track (riel del slider)
    var trackEl = this.trackEl = document.createElement('a-entity');
    this.localPosition = new THREE.Vector3();
    
    // Bindear métodos
    this.onPinchedMoved = this.onPinchedMoved.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.updateInteractivity = this.updateInteractivity.bind(this);
    
    // Configurar el track
    trackEl.setAttribute('geometry', {
      primitive: 'box',
      height: 0.01,
      width: this.data.width,
      depth: 0.01
    });
    trackEl.setAttribute('material', {
      color: 'white'
    });
    
    // Añadir el track como hijo del elemento principal
    this.el.appendChild(trackEl);
    
    // Crear el picker (control deslizante)
    var pickerEl = this.pickerEl = document.createElement('a-entity');
    pickerEl.setAttribute('geometry', {
      primitive: 'cylinder',
      radius: 0.02,
      height: 0.05
    });
    pickerEl.setAttribute('material', {
      color: '#3a50c5'
    });
    pickerEl.setAttribute('pinchable', {
      pinchDistance: 0.05
    });
    pickerEl.setAttribute('rotation', {
      x: 90, y: 0, z: 0
    });
    pickerEl.setAttribute('color-change', '');
    
    // Añadir el picker como hijo del elemento principal
    this.el.appendChild(pickerEl);
    
    // Inicializar objeto para detalles de eventos
    this.evtDetail = { value: 0 };
    
    // Variable para controlar si el slider está siendo arrastrado
    this.isDragging = false;
    
    // Variables para controlar el estado de interactividad
    this.lastVisibleState = null;
    this.interactiveEventsAdded = false;
    
    // Iniciar comprobación de visibilidad
    this.updateInteractivity();
  },
  
  tick: function() {
    // Comprobar visibilidad en cada frame
    this.updateInteractivity();
  },
  
  // Método para actualizar la interactividad basada en la visibilidad
  updateInteractivity: function() {
    // Obtener el estado de visibilidad del subMenu4
    var parentMenu = document.querySelector('#submenu4');
    var isVisible = parentMenu && parentMenu.getAttribute('visible');
    
    // Solo realizar cambios si el estado de visibilidad ha cambiado
    if (this.lastVisibleState !== isVisible) {
      this.lastVisibleState = isVisible;
      
      if (isVisible) {
        // Si el menú es visible, hacer el slider interactivo
        if (!this.interactiveEventsAdded) {
          // Añadir evento para interacción con manos
          this.pickerEl.addEventListener('pinchedmoved', this.onPinchedMoved);
          
          // Añadir clase para que sea detectado por el raycaster
          this.trackEl.classList.add('clickable');
          
          // Añadir evento para interacción con ratón
          this.trackEl.addEventListener('mousedown', this.onMouseDown);
          
          this.interactiveEventsAdded = true;
        }
      } else {
        // Si el menú no es visible, quitar interactividad
        if (this.interactiveEventsAdded) {
          // Quitar evento de interacción con manos
          this.pickerEl.removeEventListener('pinchedmoved', this.onPinchedMoved);
          
          // Quitar clase para raycaster
          this.trackEl.classList.remove('clickable');
          
          // Quitar eventos de ratón
          this.trackEl.removeEventListener('mousedown', this.onMouseDown);
          
          // Asegurarse de limpiar cualquier estado de arrastre
          if (this.isDragging) {
            this.isDragging = false;
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseUp);
          }
          
          this.interactiveEventsAdded = false;
        }
      }
    }
  },
  
  onPinchedMoved: function (evt) {
    var el = this.el;
    var evtDetail = this.evtDetail;
    var halfWidth = this.data.width / 2;
    var localPosition = this.localPosition;
    
    localPosition.copy(evt.detail.position);
    el.object3D.updateMatrixWorld();
    el.object3D.worldToLocal(localPosition);
    
    if (localPosition.x < -halfWidth || localPosition.x > halfWidth) { return; }
    
    this.pickerEl.object3D.position.x = localPosition.x;
    evtDetail.value = (this.pickerEl.object3D.position.x + halfWidth) / this.data.width;
    this.el.emit('sliderchanged', evtDetail);
  },
  
  onMouseDown: function (evt) {
    // Iniciar el arrastre
    this.isDragging = true;
    
    // Añadir eventos de movimiento y soltar del ratón al documento
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    
    // Mover el picker a la posición del clic
    this.updatePickerPosition(evt);
  },
  
  onMouseMove: function (evt) {
    if (!this.isDragging) return;
    
    // Actualizar la posición del picker si estamos arrastrando
    this.updatePickerPosition(evt);
  },
  
  onMouseUp: function () {
    // Terminar el arrastre
    this.isDragging = false;
    
    // Eliminar eventos de movimiento y soltar del ratón del documento
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  },
  
  updatePickerPosition: function (evt) {
    var el = this.el;
    var halfWidth = this.data.width / 2;
    
    // Obtener la posición del clic del ratón en el mundo
    var intersection = evt.detail ? evt.detail.intersection : null;
    if (!intersection && evt.target) {
      // Si no hay intersección en el evento, usar raycaster de la escena
      var raycaster = document.querySelector('[raycaster]').components.raycaster;
      var intersects = raycaster.intersectObjects([this.trackEl.object3D], true);
      intersection = intersects.length > 0 ? intersects[0] : null;
    }
    
    if (intersection) {
      // Convertir la posición del mundo a coordenadas locales
      var worldPos = intersection.point;
      var localPos = new THREE.Vector3().copy(worldPos);
      el.object3D.updateMatrixWorld();
      el.object3D.worldToLocal(localPos);
      
      // Limitar la posición al ancho del slider
      var newX = Math.max(-halfWidth, Math.min(halfWidth, localPos.x));
      
      // Actualizar la posición del picker
      this.pickerEl.object3D.position.x = newX;
      
      // Calcular y emitir el valor del slider (0-1)
      this.evtDetail.value = (newX + halfWidth) / this.data.width;
      this.el.emit('sliderchanged', this.evtDetail);
    }
  },
  
  remove: function () {
    // Limpiar eventos cuando se elimina el componente
    if (this.interactiveEventsAdded) {
      this.pickerEl.removeEventListener('pinchedmoved', this.onPinchedMoved);
      this.trackEl.removeEventListener('mousedown', this.onMouseDown);
    }
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
});