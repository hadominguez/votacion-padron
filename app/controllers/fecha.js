const horario = require('../db/models/horario');

const fechaRender = async (req, res) => {
    let fecha = await horario.getHorarios();
    res.render('fecha/fecha', {
      title: 'Fecha de Votación',
      data: fecha
    });
};


const fecha = async (req, res) => {
  let fecha = await horario.getHorarios();
  if(fecha){
    horario.updateHorarios(req, res);
  }else{
    horario.createHorarios(req, res);
  }
  res.redirect('/fecha');
};




module.exports = {
  fechaRender,
  fecha,
}