const SHA256 = require('crypto-js/sha256');
const usuario = require('../db/models/usuario');
const rol = require('../db/models/rol');
const ConfigEnv = require('../config');


const loginRender = (req, res) => {
    res.render('account/login', {
      title: 'Login'
    });
};


const permisosControl = (permiso) => async (req, res, next) => {
  let roles = await rol.getRolPermiso(permiso, req.session.user);
  if (roles == null) {
    res.redirect('/');
  }else{
    next();
  }
};


const login = async (req, res) => {
  let clave = SHA256(req.body.contrasena).toString();
  let usuarioLogueado = await usuario.getUsuarioClave(req.body.usuario, clave);
  if( usuarioLogueado != null ) {
    req.session.user = usuarioLogueado.id;
    res.redirect('/');
  } else {
    res.redirect('/');
  }
};

const logout = (req, res) => {
  req.session.destroy(function(err) {
  })
  res.redirect('login');
};



module.exports = {
    login,
    loginRender,
    logout,
    permisosControl
}