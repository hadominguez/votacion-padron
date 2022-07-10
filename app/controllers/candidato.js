const candidato = require('../db/models/candidato');
const lista = require('../db/models/lista');
const puesto = require('../db/models/puesto');

//render de la pantalla del listado de candidatos
const listarCandidato = async (req, res) => {
    let candidatos = await candidato.getCandidato();
    res.render('candidato/lista', {
      title: 'Listado de Candidatos',
      data: candidatos
    });
};

//render de la pantalla de creación de candidato
const createCandidatoRender = async (req, res) => {
  let listas = await lista.getLista(req, res);
  let puestos = await puesto.getPuesto(req, res);
  res.render('candidato/create', {
    title: 'Crear Candidato',
    listas: listas,
    puestos: puestos
  });
};

//almacena un nuevo candidato
const createCandidato = async (req, res) => {
  candidato.createCandidato(req, res);
  res.redirect('/candidato');
};

//render de la pantalla de modificación de un candidato
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

//modifica un candidato
const editCandidato = async (req, res) => {
  candidato.updateCandidato(req, res);
  res.redirect('/candidato');
};


//pantalla para eliminar un candidato
const deleteCandidatoRender = async (req, res) => { 
  let candidatos = await candidato.getCandidatoById(req, res);
  res.render('candidato/delete', {
    title: 'Eliminar Candidato',
    data: candidatos
  });
};

//elimina un candidato
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