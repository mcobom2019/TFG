AFRAME.registerComponent('compgestor', {
                                     
    schema: {
      elemento: {type: "selector", default: null},
      componente: {type: 'string', default: 'chivato'},
      tiempo: {type: 'int', default: 5000},
      tiempo_antes: {type: 'int', default: 0},
      prop_nombre: {type: 'string', default: ''},
      prop_valor: {type: 'string', default: ''},
    },
  
    init: function () {
      let self = this;
        let data = this.data;
        console.log('compgestor (init)');

        let ent = this.data.elemento;
        if (!ent) {
            ent = this.el;
        };

        let prop = {};
        if (this.data.prop_nombre != '') {
            prop[this.data.prop_nombre] = this.data.prop_valor;
        };

        function quita() {
            console.log("compgestor (quita)");
            ent.removeAttribute(data.componente);
        };

        function pon() {
            console.log("compgestor (pon)");
            ent.setAttribute(data.componente, prop);
            setTimeout( quita, data.tiempo );
        };
        setTimeout( pon, this.data.tiempo_antes );
    }

});