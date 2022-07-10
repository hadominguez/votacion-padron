const persona = require('../db/models/persona');
const blockchain = require('../db/models/blockchain');
const lista = require('../db/models/lista');
const horario = require('../db/models/horario');
const fetch = require('node-fetch');
const ConfigEnv = require('../config');

//Validar datos del votante
const validarDatos = async (req, res) => {
    //control de la fecha
    var en_hora = await horario.getHorario(req, res);
    var hora = false;
    if(en_hora.horario >= 1){
        hora = true;
        //validar datos con la api externa
        const response = await fetch('http://'+ ConfigEnv.VALIDAR_HOST +':'+ ConfigEnv.VALIDAR_PORT +'/'+ ConfigEnv.VALIDAR_ROUTE , {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "usuario": ConfigEnv.VALIDAR_USER,
                "contrasena": ConfigEnv.VALIDAR_PASS,
                "dni": req.body.dni,
                "nro_tramite": req.body.nro_tramite,
                "sexo": req.body.sexo
            })
        });
        const data = await response.json();
        if(data){
            //validar datos con el padrón
            let persona_existe = await persona.getValidarPersona(data, res);
            if (persona_existe != null){
                res.status(200).json({persona: persona_existe, horario: hora});
            } else {
                res.send({ 
                    mensaje: 'La persona no se encuentra en el padrón.', tipo: "Error"
                });
            }
        }else{
            res.send({ 
                mensaje: 'Persona no existe.', tipo: "Error"
            });
        }
    }
};

//Listado de candidatos y puestos
const getListasFinales = async (req, res) => {
    let listas = await lista.getListaFinal(req, res);
    res.status(200).json(listas);
};

//Verificar Voto
const verificarVoto = async (req, res) => {
    //trae el listado de servidores de la blockchain
    let blocks = await blockchain.getBlockchain();
    let voto_modificado = false;
    for(var i=0; i < blocks.length; i++) { 
        //trae los datos de los servidores
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
        //verifica los datos con el voto
        if(data.voto1 != req.body.voto1 || data.voto2 != req.body.voto2 || data.voto3 != req.body.voto3 ){
            voto_modificado = true;
        }
    }
    res.status(200).json({ modificado: voto_modificado });

};

//Votar
const votar = async (req, res) => {
    //control de la fecha
    var en_hora = await horario.getHorario(req, res);
    if(en_hora.horario >= 1){
        //verifica la persona en el padrón
        let persona_existe = await persona.getValidarPersona(req.body.data, res);
        let blocks = await blockchain.getBlockchainId(persona_existe.bchain, res);
        if (persona_existe.voto != true){
            //envia el voto al servidor
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
                        "celhash": req.body.data.celhash ,
                        "voto1": req.body.data.voto1,
                        "voto2": req.body.data.voto2,
                        "voto3": req.body.data.voto3 //,
                        //"voto4": req.body.voto4
                    }
                })
            });
            const data = await response.json();
            //se cambia el estado de la persona
            let resultado = await persona.updatePersonaVota(persona_existe.persona, res);
            res.status(200).json({ resultado: true, horario: true });
        }else{
            res.status(200).json({ resultado: false, horario: true });
        }
    }else{
        res.status(200).json({ resultado: false, horario: false });
    }
};




module.exports = {
    validarDatos,
    verificarVoto,
    votar,
    getListasFinales,
}