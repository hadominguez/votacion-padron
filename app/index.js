const express = require('express');
const bodyParser = require('body-parser');
const JWT = require('jsonwebtoken');
const ConfigEnv = require('./config');
const cookieParser = require('cookie-parser');
const app = express();

const HTTP_PORT = ConfigEnv.HTTP_PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('views', __dirname + '/views/');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const routerControl = express.Router();
routerControl.use((req, res, next) => {
  var token = req.cookies.auth;

  if (token) {
    JWT.verify(token, ConfigEnv.KEY, (err, decoded) => {      
      if (err) {
        //return res.json({ mensaje: 'Token inválido' });
        res.redirect('/login');
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
});



const routerControlAPI = express.Router();
routerControlAPI.use((req, res, next) => {

  if (req.body.usuario === ConfigEnv.USER_API && req.body.contrasena === ConfigEnv.PASS_API) {
    next();
  } else {
    res.send({ 
        mensaje: 'Usuario o contraseña invalido.'
    });
  }
});




require('./routes')(routerControl,routerControlAPI, app);

app.listen(HTTP_PORT, () => console.log(`Escuchando en el puerto ${HTTP_PORT}`));