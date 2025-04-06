/* global AFRAME */
AFRAME.registerComponent('button', {
  schema: {
    label: {default: 'label'},
    width: {default: 0.11},
    toggleable: {default: false},
    primitive: {default: 'box'}
  },
  init: function () {
    var el = this.el;
    var labelEl = this.labelEl = document.createElement('a-entity');

    this.color = '#3a50c5';

    // primitiva para el maximizeButton
    if (this.data.primitive === 'cylinder') {
      el.setAttribute('geometry', {
        primitive: 'cylinder',
        radius: this.data.width / 6, // Convertir ancho a radio
        height: 0.01
      });
    } else {
      // Para cajas y otras primitivas
      el.setAttribute('geometry', {
        primitive: this.data.primitive,
        width: this.data.width,
        height: 0.05,
        depth: 0.04
      });
    }

    el.setAttribute('material', {color: this.color});
    // el.setAttribute('pressable', '');
    
    if (this.data.primitive === 'cylinder'){
      labelEl.setAttribute('position', '0.01 0 0.02');
      labelEl.setAttribute('text', {
        value: this.data.label,
        color: 'white',
        align: 'center'
      });
    }else{
      labelEl.setAttribute('position', '0 0 0.02');
      labelEl.setAttribute('text', {
        value: this.data.label,
        color: 'white',
        align: 'center'
      });
    }

    labelEl.setAttribute('scale', '0.75 0.75 0.75');
    this.el.appendChild(labelEl);

    this.bindMethods();
    this.el.addEventListener('stateadded', this.stateChanged);
    this.el.addEventListener('stateremoved', this.stateChanged);
    
    // Estos eventos serán añadidos/eliminados según la visibilidad
    // this.el.addEventListener('pressedstarted', this.onPressedStarted);
    // this.el.addEventListener('pressedended', this.onPressedEnded);
    
    // Variables para controlar el estado
    this.lastVisibleState = null;
    this.interactiveEventsAdded = false;
    
    // Iniciar comprobación de visibilidad
    this.updateInteractivity();
  },

  bindMethods: function () {
    this.stateChanged = this.stateChanged.bind(this);
    this.onPressedStarted = this.onPressedStarted.bind(this);
    this.onPressedEnded = this.onPressedEnded.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.updateInteractivity = this.updateInteractivity.bind(this);
  },

  update: function (oldData) {
    if (oldData.label !== this.data.label) {
      this.labelEl.setAttribute('text', 'value', this.data.label);
    }
  },
  
  // Verificar periódicamente la visibilidad
  tick: function() {
    this.updateInteractivity();
  },

  stateChanged: function () {
    var color = this.el.is('pressed') ? 'green' : this.color;
    this.el.setAttribute('material', {color: color});
  },

  onPressedStarted: function () {
  var el = this.el;
  el.setAttribute('material', {color: 'green'});
  el.emit('click');
  
  // Comenta o elimina este bloque:
  /*
  if (this.data.toggleable) {
    if (el.is('pressed')) {
      el.removeState('pressed');
    } else {
      el.addState('pressed');
    }
  }
  */
},

  onPressedEnded: function () {
    if (this.el.is('pressed')) { return; }
    this.el.setAttribute('material', {color: this.color});
  },
  
  // Actualizar el estado interactivo del botón según su visibilidad
  updateInteractivity: function () {
    var isVisible = this.el.getAttribute('visible');
    
    // Solo realizar cambios si el estado de visibilidad ha cambiado
    if (this.lastVisibleState !== isVisible) {
      this.lastVisibleState = isVisible;
      
      if (isVisible) {
        // Si el botón es visible, hacerlo interactivo
        if (!this.interactiveEventsAdded) {
          // Añadir pressable para interacción con manos
          this.el.setAttribute('pressable', '');
          
          // Añadir eventos de manos
          this.el.addEventListener('pressedstarted', this.onPressedStarted);
          this.el.addEventListener('pressedended', this.onPressedEnded);
          
          // Añadir eventos de ratón
          this.el.addEventListener('mousedown', this.onMouseDown);
          this.el.addEventListener('mouseup', this.onMouseUp);
          this.el.addEventListener('mouseleave', this.onMouseLeave);
          
          // Añadir clase para raycaster
          this.el.classList.add('clickable');
          
          this.interactiveEventsAdded = true;
        }
      } else {
        // Si el botón no es visible, quitarle toda interactividad
        if (this.interactiveEventsAdded) {
          // Eliminar pressable para interacción con manos
          this.el.removeAttribute('pressable');
          
          // Eliminar eventos de manos
          this.el.removeEventListener('pressedstarted', this.onPressedStarted);
          this.el.removeEventListener('pressedended', this.onPressedEnded);
          
          // Eliminar eventos de ratón
          this.el.removeEventListener('mousedown', this.onMouseDown);
          this.el.removeEventListener('mouseup', this.onMouseUp);
          this.el.removeEventListener('mouseleave', this.onMouseLeave);
          
          // Eliminar clase para raycaster
          this.el.classList.remove('clickable');
          
          this.interactiveEventsAdded = false;
        }
      }
    }
  },
  
  // Manejadores de eventos de ratón
  onMouseDown: function () {
    this.onPressedStarted();
  },
  
  onMouseUp: function () {
    this.onPressedEnded();
  },
  
  onMouseLeave: function () {
    this.onPressedEnded();
  }
});