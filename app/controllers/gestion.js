const blockchain = require('../db/models/blockchain');
const lista = require('../db/models/lista');
const horario = require('../db/models/horario');
const persona = require('../db/models/persona');
const fetch = require('node-fetch');

//render de la pantalla de resultados
const index = async(req, res) => {
    //contola la fecha
    var en_hora = await horario.getHorario(req, res);
    var resultados_mensaje = '';
    if(en_hora.horario >= 1){
        resultados_mensaje  = 'Resultados Parciales';
    }else{
        resultados_mensaje = 'Resultados Finales';
    }

    //trae todos los servidores
    let blocks = await blockchain.getBlockchain();
    //cuenta la cantidad de votantes habilitados
    var votos_permitidos = await persona.getCantVotantes();
    var votos_modificados = 0;
    var votos_validos = 0;
    var votos_totales = 0;
    var datos_comparar = [];
    for(var i=0; i < blocks.length; i++) { 
        //trae los datos de los servidores
        const response = await fetch('http://'+ blocks[i].ip +':'+ blocks[i].puerto +'/blocks', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "usuario": blocks[i].usuario,
                "contrasena": blocks[i].clave
            })
        });
        let data = await response.json();
        datos_comparar.push(data);
    }


    var votos1 =[];
    var votos2 =[];
    var votos3 =[];

    let total_servidores = datos_comparar.length;
    //compara los votos, menos el del bloque inicial
    if(total_servidores >= 1 && datos_comparar[0].length > 1){
        for(var i=1; i < datos_comparar[0].length; i++) {
            var celhash = datos_comparar[0][i].data[0].celhash;
            var voto1 = datos_comparar[0][i].data[0].voto1;
            var voto2 = datos_comparar[0][i].data[0].voto2;
            var voto3 = datos_comparar[0][i].data[0].voto3;
            
            var modificado = false;

            for(var j=1; j < total_servidores; j++) {
                if(celhash != datos_comparar[j][i].data[0].celhash || 
                    voto1 != datos_comparar[j][i].data[0].voto1 || 
                    voto2 != datos_comparar[j][i].data[0].voto2 ||
                    voto3 != datos_comparar[j][i].data[0].voto3){
                        modificado = true;
                }
            }
            if(modificado == true){
                votos_modificados = votos_modificados +1 ;
            }else{
                votos_validos = votos_validos +1 ;
                votos1.push(voto1);
                votos2.push(voto2);
                votos3.push(voto3);
            }
            votos_totales = votos_totales +1 ;
        }
    }

    var listas = await lista.getListaFinal(req, res);
    var lista_final = [];
    //suma de votos
    for(var x=0; x < listas.length; x++) {
        var total = 0;
        for(var y=0; y < votos1.length; y++) {
            if(votos1[y] == listas[x].candidato){
                total = total +1;
            }
        }
        for(var y=0; y < votos2.length; y++) {
            if(votos2[y] == listas[x].candidato){
                total = total +1;
            }
        }
        for(var y=0; y < votos3.length; y++) {
            if(votos3[y] == listas[x].candidato){
                total = total +1;
            }
        }
        lista_final.push({ "orden": listas[x].orden, "puesto": listas[x].descripcion,  "lista": listas[x].lista, 
        "candidato_nombre": listas[x].candidato_nombre, "votos": total });
    }

    res.render('index', {
        title: resultados_mensaje,
        votos_modificados: votos_modificados,
        votos_validos: votos_validos,
        votos_totales: votos_totales,
        votos_permitidos: votos_permitidos.total,
        lista: lista_final,
      } );
}
module.exports = {
    index,
}