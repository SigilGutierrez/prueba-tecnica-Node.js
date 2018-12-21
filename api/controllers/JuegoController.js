/**
 * JuegoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    create: function(req, res) {
    	
        var io = sails.io;
        var juegoObj ={
                numeroJuego: req.param('numeroJuego'),
                numeroTurno: req.param('numeroTurno'),
                jugador: req.param('jugador'),
                fila: req.param('fila'),
				columna: req.param('columna')        
			};

        Juego.create(juegoObj, function(err, juego){
            if(err) {
                req.session.flash={
                    err: err
                }
                return res.send(false);
            }else{
               // io.sockets.emit('juegoCreated',juegoObj);
                res.send(juegoObj);
                }
               

        });
      
    },

    index: function(req, res){
       var numJuego=  req.param('numeroJuego');
        var matrizJuego=[];
        var matrizJuegoC=[];
//precarga de la matriz

        Juego.find(function(err, juegos){
                    if (!err) {
                        if(juegos.numeroJuego =numJuego){
                            console.log(JSON.stringify(juegos));
                            var fil = juegos.fila;
                            var colum = juegos.columna;
                            console.log("numJuego : "+numJuego +"- "+juegos.fila +"- "+ juegos.columna);
                                   for (var f = 0 ; f <= 2; f++) {
                                        matrizJuegoC =[];
                                        for (var c = 0; c <= 2; c++) {
                                            matrizJuegoC[c] = (fil == f && colum ==c)?1:7;
                                            
                                        }
                                    matrizJuego[f] = matrizJuegoC;
                                    }
                    return res.send(matrizJuego);
                }
                        }else 
                    return res.send(false);
                        
                    
                    
                  });
    }
}

/*
                        for (var f = 0 ; f <= 2; f++) {
                                        matrizJuegoC =[];
                                        for (var c = 0; c <= 2; c++) {
                                            matrizJuegoC[c] = f+"-"+c;
                                            
                                        }
                                    matrizJuego[f] = matrizJuegoC;
                                    }*/
            


// visualizacion final de la matriz
   /* for (var f = 0 ; f <= 2; f++) {
        var c= matrizJuego[f];
        console.log(c[1]);
    }*/
/*
    var c= matrizJuego[fila];
        console.log(c[columna]);
            for (var f = 0 ; f <= 2; f++) {
                                        matrizJuegoC =[];
                                        for (var c = 0; c <= 2; c++) {
                                            matrizJuegoC[c] = (fila == f && columna ==c)?1:matrizJuegoC[c];
                                            
                                        }
                                    matrizJuego[f] = matrizJuegoC;
                                    console.log(matrizJuegoC);
                                    }

	},*/


