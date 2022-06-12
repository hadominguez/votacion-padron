const SHA256 = require('crypto-js/sha256');
const usuario = require('../db/models/usuario');
const rol = require('../db/models/rol');
const JWT = require('jsonwebtoken');
const ConfigEnv = require('../config');


const loginRender = (req, res) => {
    res.render('account/login', {
      title: 'Login'
    });
};


const permisosControl = (permiso) => async (req, res, next) => {
  var token = req.cookies.auth;

  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = JSON.parse(decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join('')));
  let roles = await rol.getRolPermiso(permiso, jsonPayload.role);
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
  const token = JWT.sign(
      { 
        id: usuarioLogueado.id,
        role: usuarioLogueado.role
      },
      ConfigEnv.KEY, {
      expiresIn: 1440
    });
    res.cookie('auth',token);
    res.redirect('/');
  } else {
    res.redirect('/');
  }
};

const logout = (req, res) => {
  res.clearCookie('auth');
  res.redirect('index');
};



module.exports = {
    login,
    loginRender,
    logout,
    permisosControl
}