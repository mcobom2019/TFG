/* global AFRAME */
AFRAME.registerComponent('button', {
  schema: {
    label: {default: 'label'},
    width: {default: 0.11},
    toggleable: {default: false},
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

    // Debug log para visibilidad
    console.log(`Botón ${this.data.label} - Visibilidad inicial: ${el.getAttribute('visible')}`);

    // Añadir pressable y pinchable solo si está visible
    var isVisible = el.getAttribute('visible');
    if(isVisible){
      el.setAttribute('pressable', '');
    }

    labelEl.setAttribute('position', '0 0 0.02');
    labelEl.setAttribute('text', {
      value: this.data.label,
      color: 'white',
      align: 'center'
    });

    labelEl.setAttribute('scale', '0.75 0.75 0.75');
    this.el.appendChild(labelEl);

    this.bindMethods();

    // Añadir observador de atributos
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          console.log(`Cambio de atributo en ${this.data.label}:`, mutation.attributeName);
          if (mutation.attributeName === 'visible') {
            console.log(`Nueva visibilidad para ${this.data.label}: ${el.getAttribute('visible')}`);
            this.updateInteractivity();
          }
        }
      });
    });

    observer.observe(el, { 
      attributes: true, 
      attributeFilter: ['visible'] 
    });

    this.el.addEventListener('stateadded', this.stateChanged);
    this.el.addEventListener('stateremoved', this.stateChanged);
    this.el.addEventListener('pressedstarted', this.onPressedStarted);
    this.el.addEventListener('pressedended', this.onPressedEnded);
  },

  /*updateInteractivity: function() {
    var el = this.el;
    var isVisible = el.getAttribute('visible');

    if (isVisible) {
      // Forzar añadir los atributos
      el.setAttribute('pressable', '');
      el.setAttribute('pinchable', '');
    } else {
      // Intentar remover los atributos
      try {
        el.removeAttribute('pressable');
        el.removeAttribute('pinchable');
        console.log(`Removidos pressable y pinchable de ${this.data.label}`);
      } catch(error) {
        console.error(`Error removiendo atributos de ${this.data.label}:`, error);
      }
    }
  },*/

  bindMethods: function () {
    this.stateChanged = this.stateChanged.bind(this);
    this.onPressedStarted = this.onPressedStarted.bind(this);
    this.onPressedEnded = this.onPressedEnded.bind(this);
    this.updateInteractivity = this.updateInteractivity.bind(this);
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
  }
});