const lista = require('../db/models/lista');

const listarLista = async (req, res) => {
    let blocks = await lista.getLista();
    res.render('lista/lista', {
      title: 'Lista de partidos',
      data: blocks
    });
};

const createListaRender = async (req, res) => {
  res.render('lista/create', {
    title: 'Crear lista'
  });
};

const createLista = async (req, res) => {
  lista.createLista(req, res);
  res.redirect('/lista');
};


const editListaRender = async (req, res) => {
  let listas = await lista.getListaById(req, res);
  res.render('lista/edit', {
    title: 'Editar Lista',
    data: listas
  });
};

const editLista = async (req, res) => {
  lista.updateLista(req, res);
  res.redirect('/lista');
};



const deleteListaRender = async (req, res) => { 
  let listas = await lista.getListaById(req, res);
  res.render('lista/delete', {
    title: 'Eliminar Lista',
    data: listas
  });
};

const deleteLista = async (req, res) => {
  lista.deleteLista(req, res);
  res.redirect('/lista');
};

module.exports = {
  listarLista,
  createListaRender,
  createLista,
  editListaRender,
  editLista,
  deleteListaRender,
  deleteLista
}