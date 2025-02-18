AFRAME.registerComponent('compgestor', {
                                     
    schema: {
      componente: {type: 'string', default: 'chivato'}
    },
  
    init: function () {
      console.log('Init COMPGESTOR');
      this.el.setAttribute(this.data.componente, {});
    },
});