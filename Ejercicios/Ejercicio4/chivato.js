AFRAME.registerComponent('chivato', {
  init: function () {
  console.log('Chivato ACTIVADO');
  this.contador = 0;
  },

  tick: function () {
    this.contador += 1;
    if((this.contador % 10)==0){
      console.log(this.contador);
    }
    if((this.contador % 100) == 0){
      console.log('Chivato 100 ACTIVADO');
    }
  }
});