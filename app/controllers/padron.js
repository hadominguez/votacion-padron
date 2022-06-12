const persona = require('../db/models/persona');
const blockchain = require('../db/models/blockchain');
const fetch = require('node-fetch');
const ConfigEnv = require('../config');

const controlarPadron = async (req, res) => {
    let datos = await persona.getPersona(req, res);
    let cargado = false;
    if(datos == null){
        cargado = false;
    }else{
        cargado = true;
    }
    res.render('padron/padron', {
      title: 'Padron',
      padron: cargado
    });
};


const cargarPadron = async (req, res) => {
    let blockchains = await blockchain.getBlockchain(req, res);
    if(blockchains != null){
        const response = await fetch('http://'+ ConfigEnv.PADRON_HOST +':'+ ConfigEnv.PADRON_PORT +'/'+ ConfigEnv.PADRON_ROUTE, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "usuario": ConfigEnv.PADRON_USER ,
                "contrasena": ConfigEnv.PADRON_PASS
            })
        });
        const data = await response.json();

        let contador = 0;
        data.forEach(element => {
            if (contador >= blockchains.length){
                contador = 0;
            }
            const resq = {
                body :{
                    apellido: element.apellido,
                    nombre: element.nombre,
                    dni: element.dni,
                    sexo: element.sexo,
                    bchain: blockchains[contador].bchain,
                    voto: false
                }
            };
            persona.createPersona(resq, res);
            contador = contador + 1;
        });
    }
    
    res.redirect('/padron');
};


module.exports = {
    controlarPadron,
    cargarPadron
}