AFRAME.registerComponent('compgestor', {
                                     
    schema: {
      elemento: {type: "selector", default: null},
      componente: {type: 'string', default: 'chivato'},
      tiempo: {type: 'int', default: 5000},
      tiempo_antes: {type: 'int', default: 6000},
      prop_nombre: {type: 'string', default: null},
      prop_valor: {type: 'string', default: null},
    },
  
    init: function () {
      
      console.log('Init COMPGESTOR3');
      
      let ent = this.data.elemento;
      if(!ent){
        ent = this.el;
      }
      
      ent.setAttribute(this.data.componente, {});
      
      let self = this;
      setTimeout (function (event) {
        console.log("QUITANDO");
        self.el.removeAttribute(self.data.componente);
      }, this.data.tiempo);
    }
});