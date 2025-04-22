AFRAME.registerComponent('button', {
  schema: {
    label: {default: 'label'},
    width: {default: 2},
    toggleable: {default: false},
    color: {default: '#32527b'},
    posetx :{default: 0},//este es x
    posety :{default: 0},//este es z
    posetz :{default: 0},//este es y al reves
    widthet: {default: 2}
    
  },

  init: function () {
    var el = this.el;
    this.color = this.data.color;
    this.hasLabel = this.data.label !== "noLabel";

    //botón circular (cilindro)
    el.setAttribute('geometry', {
      primitive: 'cylinder',
      radius: this.data.width / 6.2,
      height: 0.2
    });

    // Rotar el botón 90 grados
    el.setAttribute('rotation', '90 0 0');

    // Material
    el.setAttribute('material', 'color', this.color);

    // Sombra
    el.setAttribute('shadow', {cast: true, receive: true});

    // Base cilíndrica debajo
    const base = document.createElement('a-entity');
    base.setAttribute('geometry', {
      primitive: 'cylinder',
      radius: this.data.width / 4.8,
      height: 0.01
    });
    base.setAttribute('position', '0 -0.01 0');
    base.setAttribute('material', {
      color: '#333',
      roughness: 1,
      metalness: 0
    });
    base.setAttribute('shadow', {cast: false, receive: true});
    el.appendChild(base);

    // Etiqueta solo si no es "noLabel"
    if(this.hasLabel){
      const labelEl = this.labelEl = document.createElement('a-entity');
      labelEl.setAttribute('geometry', {
        primitive: 'plane',
        height: 0.35,
        width: (this.data.widthet + 0.05)/3
      });
      labelEl.setAttribute('material', {color: '#f0f0f0'});
      labelEl.setAttribute('text', {
        value: this.data.label,
        color: '#111',
        align: 'center',
        width: 3.5
      });

      labelEl.setAttribute('position', `${this.data.posetx} ${this.data.posety-0.004} ${this.data.posetz}`);
      labelEl.setAttribute('rotation', '-90 0 0');
      el.appendChild(labelEl);
    }

    this.bindMethods();
    this.el.addEventListener('stateadded', this.stateChanged);
    this.el.addEventListener('stateremoved', this.stateChanged);

    this.lastVisibleState = null;
    this.interactiveEventsAdded = false;

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
    // Solo actualizar el label si existe
    if (this.hasLabel && oldData.label !== this.data.label) {
      this.labelEl.setAttribute('text', 'value', this.data.label);
    }
    
    if (oldData.color !== this.data.color) {
      this.color = this.data.color;
      if (!this.el.is('pressed')) {
        this.el.setAttribute('material', 'color', this.color);
      }
    }
  },

  tick: function () {
    this.updateInteractivity();
  },

  stateChanged: function () {
    const color = this.el.is('pressed') ? 'green' : this.color;
    this.el.setAttribute('material', 'color', color);
  },

  onPressedStarted: function () {
    var el = this.el;
    el.setAttribute('material', 'color', 'green');
    el.emit('click');
    if (this.data.toggleable) {
      el.is('pressed') ? el.removeState('pressed') : el.addState('pressed');
    } else {
      el.setAttribute('material', 'color', this.color);
    }
  },

  onPressedEnded: function () {
    if (!this.el.is('pressed')) {
      this.el.setAttribute('material', 'color', this.color);
    }
  },

  updateInteractivity: function () {
    const isVisible = this.el.getAttribute('visible');

    if (this.lastVisibleState !== isVisible) {
      this.lastVisibleState = isVisible;

      if (isVisible && !this.interactiveEventsAdded) {
        this.el.setAttribute('pressable', '');

        this.el.addEventListener('pressedstarted', this.onPressedStarted);
        this.el.addEventListener('pressedended', this.onPressedEnded);

        this.el.addEventListener('mousedown', this.onMouseDown);
        this.el.addEventListener('mouseup', this.onMouseUp);
        this.el.addEventListener('mouseleave', this.onMouseLeave);

        this.el.classList.add('clickable');
        this.interactiveEventsAdded = true;
      } else if (!isVisible && this.interactiveEventsAdded) {
        this.el.removeAttribute('pressable');

        this.el.removeEventListener('pressedstarted', this.onPressedStarted);
        this.el.removeEventListener('pressedended', this.onPressedEnded);

        this.el.removeEventListener('mousedown', this.onMouseDown);
        this.el.removeEventListener('mouseup', this.onMouseUp);
        this.el.removeEventListener('mouseleave', this.onMouseLeave);

        this.el.classList.remove('clickable');
        this.interactiveEventsAdded = false;
      }
    }
  },

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