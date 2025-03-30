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
    //el.setAttribute('pressable', '');

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
    //this.el.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    //this.el.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    //this.el.addEventListener('click', this.onClick.bind(this));
  },

  bindMethods: function () {
    this.stateChanged = this.stateChanged.bind(this);
    this.onPressedStarted = this.onPressedStarted.bind(this);
    this.onPressedEnded = this.onPressedEnded.bind(this);
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
  
  onMouseEnter: function () {
    if (!this.el.is('pressed')) {
      this.el.setAttribute('material', {color: '#4a60d5'});  // Color más claro al pasar el ratón
    }
  },
  
  onMouseLeave: function () {
    if (!this.el.is('pressed')) {
      this.el.setAttribute('material', {color: this.color});
    }
  },
  
  onClick: function () {
    this.onPressedStarted();
    setTimeout(() => {
      if (!this.data.toggleable) {
        this.onPressedEnded();
      }
    }, 150);
  },
  disable: function() {
    // Eliminar todos los event listeners
    this.el.removeEventListener('stateadded', this.stateChanged);
    this.el.removeEventListener('stateremoved', this.stateChanged);
    this.el.removeEventListener('pressedstarted', this.onPressedStarted);
    this.el.removeEventListener('pressedended', this.onPressedEnded);
    this.el.removeEventListener('mouseenter', this.onMouseEnter);
    this.el.removeEventListener('mouseleave', this.onMouseLeave);
    this.el.removeEventListener('click', this.onClick);
    
    // Cambiar visualmente para indicar que está deshabilitado
    this.el.setAttribute('material', {color: '#888888'});  // Gris para indicar deshabilitado
  },
  
  enable: function() {
    // Volver a añadir los event listeners
    this.el.addEventListener('stateadded', this.stateChanged);
    this.el.addEventListener('stateremoved', this.stateChanged);
    this.el.addEventListener('pressedstarted', this.onPressedStarted);
    this.el.addEventListener('pressedended', this.onPressedEnded);
    this.el.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    this.el.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    this.el.addEventListener('click', this.onClick.bind(this));
    
    // Restaurar el color original
    this.el.setAttribute('material', {color: this.color});
  }
});