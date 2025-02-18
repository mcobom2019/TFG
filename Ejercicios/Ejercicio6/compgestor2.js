AFRAME.registerComponent('compgestor', {
                                     
    schema: {
      componente: {type: 'string', default: 'chivato'},
      componente: {type: 'int', default: 5},
    },
  
    init: function () {
      console.log('Init COMPGESTOR');
      this.el.setAttribute(this.data.componente, {});
    },
});