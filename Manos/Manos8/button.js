/* global AFRAME */
AFRAME.registerComponent('button', {
  schema: {
    label: {default: 'label'},
    width: {default: 0.11},
    toggleable: {default: false}
  },
  init: function () {
    var el = this.el;
    var labelEl = this.labelEl = document.createElement('a-entity');

    this.color = '#3a50c5';
    el.setAttribute('geometry', {
      primitive: 'box',
      width: this.data.width,
      height: 0.05,
      depth: 0.04
    });

    el.setAttribute('material', {color: this.color});
    el.setAttribute('pressable', '');

    labelEl.setAttribute('position', '0 0 0.02');
    labelEl.setAttribute('text', {
      value: this.data.label,
      color: 'white',
      align: 'center'
    });

    labelEl.setAttribute('scale', '0.75 0.75 0.75');
    this.el.appendChild(labelEl);

    this.bindMethods();
    this.el.addEventListener('stateadded', this.stateChanged);
    this.el.addEventListener('stateremoved', this.stateChanged);
    this.el.addEventListener('pressedstarted', this.onPressedStarted);
    this.el.addEventListener('pressedended', this.onPressedEnded);
    
    // Detectar cambios en la visibilidad del botón
    this.el.addEventListener('componentchanged', this.handleVisibilityChange);
    
    // Comprobar estado inicial de visibilidad
    this.checkVisibility();
  },

  bindMethods: function () {
    this.stateChanged = this.stateChanged.bind(this);
    this.onPressedStarted = this.onPressedStarted.bind(this);
    this.onPressedEnded = this.onPressedEnded.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.checkVisibility = this.checkVisibility.bind(this);
  },

  update: function (oldData) {
    if (oldData.label !== this.data.label) {
      this.labelEl.setAttribute('text', 'value', this.data.label);
    }
  },

  stateChanged: function () {
    var color = this.el.is('pressed') ? 'green' : this.color;
    this.el.setAttribute('material', {color: color});
  },

  onPressedStarted: function () {
    var el = this.el;
    el.setAttribute('material', {color: 'green'});
    el.emit('click');
    if (this.data.toggleable) {
      if (el.is('pressed')) {
        el.removeState('pressed');
      } else {
        el.addState('pressed');
      }
    }
  },

  onPressedEnded: function () {
    if (this.el.is('pressed')) { return; }
    this.el.setAttribute('material', {color: this.color});
  },
  
  // Método para detectar cambios en la visibilidad
  handleVisibilityChange: function (evt) {
    if (evt.detail.name === 'visible') {
      this.checkVisibility();
    }
  },
  
  // Comprobar si el botón está visible y actualizar los listeners del ratón
  checkVisibility: function () {
    var visible = this.el.getAttribute('visible');
    if (visible) {
      // Si el botón es visible, añadir listeners de ratón
      this.el.addEventListener('mousedown', this.onMouseDown);
      this.el.addEventListener('mouseup', this.onMouseUp);
      this.el.addEventListener('mouseleave', this.onMouseLeave);
      this.el.setAttribute('class', 'clickable'); // Añadir a la clase clickable para el raycaster
    } else {
      // Si el botón no es visible, eliminar listeners de ratón
      this.el.removeEventListener('mousedown', this.onMouseDown);
      this.el.removeEventListener('mouseup', this.onMouseUp);
      this.el.removeEventListener('mouseleave', this.onMouseLeave);
      this.el.removeAttribute('class'); // Quitar de la clase clickable
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