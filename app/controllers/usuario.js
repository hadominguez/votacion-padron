const usuario = require('../db/models/usuario');
const SHA256 = require('crypto-js/sha256');

const listarUsuario = async (req, res) => {
    let usuarios = await usuario.getUsuario();
    res.render('usuario/lista', {
      title: 'Lista de usuarios',
      data: usuarios
    });
};

const createUsuarioRender = async (req, res) => {
  let roles = await usuario.getRoles(req, res);
  res.render('usuario/create', {
    title: 'Crear usuario',
    data: roles
  });
};

const createUsuario = async (req, res) => {
  let usuarios = await usuario.getUsuarioExiste(req, res);
  if(usuarios == null){
    let clave_encriptada = SHA256(req.body.clave).toString();
    usuario.createUsuario(clave_encriptada, req, res);
  }
  res.redirect('/usuario');
};


const editUsuarioRender = async (req, res) => {
  let usuarios = await usuario.getUsuarioById(req, res);
  res.render('usuario/edit', {
    title: 'Cambiar clave del usuario',
    data: usuarios
  });
};

const editUsuario = async (req, res) => {
  let clave_encriptada = SHA256(req.body.clave).toString();
  usuario.updateUsuario(clave_encriptada, req, res);
  res.redirect('/usuario');
};



const deleteUsuarioRender = async (req, res) => { 
  let usuarios = await usuario.getUsuarioById(req, res);
  res.render('usuario/delete', {
    title: 'Eliminar Usuario',
    data: usuarios
  });
};

const deleteUsuario = async (req, res) => {
  usuario.deleteUsuario(req, res);
  res.redirect('/usuario');
};

module.exports = {
  listarUsuario,
  createUsuarioRender,
  createUsuario,
  editUsuarioRender,
  editUsuario,
  deleteUsuarioRender,
  deleteUsuario
}