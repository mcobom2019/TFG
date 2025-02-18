AFRAME.registerComponent('compgestor', {
                                     
    schema: {
      componente: {type: 'string', default: 'chivato'},
      componente: {type: 'int', default: 5000},
    },
  
    init: function () {
      console.log('Init COMPGESTOR');
      this.el.setAttribute(this.data.componente, {});
      setTimeout (function (event) {
        console.log("QUITANDO");
        this.el.removeAttribute(this.data.componente);
      }, this.data
    }
});






function anade(event) {
          console.log("FLAG");
          let ent = document.getElementById("entidad");
          ent.setAttribute("chivato", {});
          setTimeout(quitar, 5000);
        }
        function quitar (event) {
          console.log("QUITANDO");
          let ent = document.getElementById("entidad");
          ent.removeAttribute("chivato");
        }