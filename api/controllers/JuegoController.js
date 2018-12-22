/**
 * JuegoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

        index: function(req, res){
        Juego.find(function(err, juegos){
            if (!err) 
                res.send(juegos);
            else 
            res.send(false);
          })
        },
  
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

    continuarJuego: function(req, res){
       var numJuego=  req.param('numeroJuego');
        var matrizJuegoC=[];
        var matrizJuego=[];
        var MJT=[];
//precarga de la matriz

        Juego.find(function(err, juegos){
                    if (!err) {
                        for (var i = 0; i < juegos.length;i++) {
                        if(juegos[i].numeroJuego =numJuego){
                            console.log(matrizJuego);
                            var fil = juegos[i].fila;
                            var colum = juegos[i].columna;
                                   for (var f = 0 ; f <= 2; f++) {
                                        matrizJuegoC =[];
                                        for (var c = 0; c <= 2; c++) {
                                            
                                            if (MJT.length > 0) {
                                                var oj = MJT[f];
                                                matrizJuegoC[c] = (fil == f && colum ==c)?1:(oj[c])?oj[c]:7;
                                            }else{
                                                 matrizJuegoC[c] = (fil == f && colum ==c)?1:7;
                                            }
                                           }
                                           matrizJuego[f] = matrizJuegoC;
                                            }
                                        }
                                        MJT = matrizJuego;
                                    }
                    //validacion par ver si el jugador gana con el ultimo turno







                                    return res.send(matrizJuego);
                            }else 
                    return res.send(false);
                  });
    }

}