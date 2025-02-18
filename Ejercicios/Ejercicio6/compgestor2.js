AFRAME.registerComponent('compgestor', {
                                     
    schema: {
      componente: {type: 'string', default: 'chivato'},
      tiempo: {type: 'int', default: 5000},
    },
  
    init: function () {
      let self = this;
      console.log('Init COMPGESTOR');
      this.el.setAttribute(this.data.componente, {});
      setTimeout (function (event) {
        console.log("QUITANDO");
        self.el.removeAttribute(self.data.componente);
      }, this.data.tiempo);
    }
});