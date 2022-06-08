const usuario = require('../db/models/usuario');

const index = async(req, res) => {
    res.render('index', {
        title: 'Index'
      } );
}
module.exports = {
    index,
}