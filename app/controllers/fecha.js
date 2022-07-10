const horario = require('../db/models/horario');

//render de la pantalla de fechas
const fechaRender = async (req, res) => {
    let fecha = await horario.getHorarios();
    res.render('fecha/fecha', {
      title: 'Fecha de Votación',
      data: fecha
    });
};

//alamacena o modifica las fechas
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