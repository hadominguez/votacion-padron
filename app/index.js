const express = require('express');
const bodyParser = require('body-parser');
const ConfigEnv = require('./config');
const session = require('express-session');

const app = express();
//configuración para las sesiones
app.use(session({
  secret: ConfigEnv.KEY,
  resave: true,
  saveUninitialized: true
}));

//seteo del puerto
const HTTP_PORT = ConfigEnv.HTTP_PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configuración de las vistas
app.set('views', __dirname + '/views/');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//control de login
const routerControl = express.Router();
routerControl.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
});

const routerControlAPI = express.Router();
//validacion de usuario y contraseña para la api
routerControlAPI.use((req, res, next) => {
  if (req.body.usuario === ConfigEnv.USER_API && req.body.contrasena === ConfigEnv.PASS_API) {
    next();
  } else {
    res.send({ 
        mensaje: 'Usuario o contraseña invalido.'
    });
  }
});

//ruteo
require('./routes')(routerControl,routerControlAPI, app);

app.listen(HTTP_PORT, () => console.log(`Escuchando en el puerto ${HTTP_PORT}`));