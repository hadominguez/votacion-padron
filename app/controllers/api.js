const persona = require('../db/models/persona');
const blockchain = require('../db/models/blockchain');
const candidato = require('../db/models/candidato');
const puesto = require('../db/models/puesto');
const lista = require('../db/models/lista');
const fetch = require('node-fetch');

const validarDatos = async (req, res) => {
    let persona_existe = await persona.getValidarPersona(req, res);
    if (persona_existe != null){
        res.status(200).json(persona_existe);
    } else {
        res.send({ 
            mensaje: 'Persona no encontrada.'
        });
    }
};

const getListasFinales = async (req, res) => {
    let listas = await lista.getListaFinal(req, res);
    res.status(200).json(listas);
};

const verificarVoto = async (req, res) => {
    let blocks = await blockchain.getBlockchain();
    let voto_modificado = false;
    for(var i=0; i < blocks.length; i++) { 
        const response = await fetch('http://'+ blocks[i].ip +':'+ blocks[i].puerto +'/block', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "usuario": blocks[i].usuario,
                "contrasena": blocks[i].clave,
                "celhash": req.body.celhash
            })
        });
        const data = await response.json();
        if(data.voto1 != req.body.voto1 || data.voto2 != req.body.voto2 || data.voto3 != req.body.voto3 ){
            voto_modificado = true;
        }
    }
    res.status(200).json({ modificado: voto_modificado });

};

const votar = async (req, res) => {
    let persona_existe = await persona.getValidarPersona(req.body.data, res);
    let blocks = await blockchain.getBlockchainId(persona_existe.bchain, res);
    if (persona_existe.votar != true){
        console.log(blocks.ip );
        const response = await fetch('http://'+ blocks.ip +':'+ blocks.puerto +'/mine', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "usuario": blocks.usuario,
                "contrasena": blocks.clave,
                "data":{
                    "celhash": req.body.celhash ,
                    "voto1": req.body.voto1,
                    "voto2": req.body.voto2,
                    "voto3": req.body.voto3 //,
                    //"voto4": req.body.voto4
                }
            })
        });
        const data = await response.json();
        console.log(data);
        let persona_existe = await persona.getValidarPersona(persona_existe.persona, res);
    }
    res.status(200).json({ resultado: 'ok' });
};




module.exports = {
    validarDatos,
    verificarVoto,
    votar,
    getListasFinales,
}