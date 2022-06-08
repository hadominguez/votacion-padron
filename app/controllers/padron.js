const persona = require('../db/models/persona');
const blockchain = require('../db/models/blockchain');
const fetch = require('node-fetch');

const controlarPadron = async (req, res) => {
    let datos = await persona.getPersona(req, res);
    //console.log(datos);
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
        const response = await fetch('http://192.168.0.109:3010/personas', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "usuario":"tesisfinal",
                "contrasena":"t3s15f1n47"
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