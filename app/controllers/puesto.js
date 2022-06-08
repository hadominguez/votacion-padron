const puesto = require('../db/models/puesto');

const listarPuesto = async (req, res) => {
    let blocks = await puesto.getPuesto();
    res.render('puesto/lista', {
      title: 'Listado de Puestos',
      data: blocks
    });
};

const createPuestoRender = async (req, res) => {
  res.render('puesto/create', {
    title: 'Crear Puesto'
  });
};

const createPuesto = async (req, res) => {
  puesto.createPuesto(req, res);
  res.redirect('/puesto');
};


const editPuestoRender = async (req, res) => {
  let puestos = await puesto.getPuestoById(req, res);
  res.render('puesto/edit', {
    title: 'Editar Puesto',
    data: puestos,
  });
};

const editPuesto = async (req, res) => {
  puesto.updatePuesto(req, res);
  res.redirect('/puesto');
};



const deletePuestoRender = async (req, res) => { 
  let puestos = await puesto.getPuestoById(req, res);
  res.render('puesto/delete', {
    title: 'Eliminar Puesto',
    data: puestos
  });
};

const deletePuesto = async (req, res) => {
  puesto.deletePuesto(req, res);
  res.redirect('/puesto');
};

module.exports = {
  listarPuesto,
  createPuestoRender,
  createPuesto,
  editPuestoRender,
  editPuesto,
  deletePuestoRender,
  deletePuesto
}