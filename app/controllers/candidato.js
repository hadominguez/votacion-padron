const candidato = require('../db/models/candidato');
const lista = require('../db/models/lista');
const puesto = require('../db/models/puesto');

const listarCandidato = async (req, res) => {
    let blocks = await candidato.getCandidato();
    res.render('candidato/lista', {
      title: 'Listado de Candidatos',
      data: blocks
    });
};

const createCandidatoRender = async (req, res) => {
  let listas = await lista.getLista(req, res);
  let puestos = await puesto.getPuesto(req, res);
  res.render('candidato/create', {
    title: 'Crear Candidato',
    listas: listas,
    puestos: puestos
  });
};

const createCandidato = async (req, res) => {
  candidato.createCandidato(req, res);
  res.redirect('/candidato');
};


const editCandidatoRender = async (req, res) => {
  let candidatos = await candidato.getCandidatoById(req, res);
  let listas = await lista.getLista(req, res);
  let puestos = await puesto.getPuesto(req, res);
  res.render('candidato/edit', {
    title: 'Editar Candidato',
    data: candidatos,
    listas: listas,
    puestos: puestos
  });
};

const editCandidato = async (req, res) => {
  candidato.updateCandidato(req, res);
  res.redirect('/candidato');
};



const deleteCandidatoRender = async (req, res) => { 
  let candidatos = await candidato.getCandidatoById(req, res);
  res.render('candidato/delete', {
    title: 'Eliminar Candidato',
    data: candidatos
  });
};

const deleteCandidato = async (req, res) => {
  candidato.deleteCandidato(req, res);
  res.redirect('/candidato');
};

module.exports = {
  listarCandidato,
  createCandidatoRender,
  createCandidato,
  editCandidatoRender,
  editCandidato,
  deleteCandidatoRender,
  deleteCandidato
}