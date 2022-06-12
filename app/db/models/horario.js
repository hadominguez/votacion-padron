const db = require('../database')

const getHorario = async(req, res) => {
    try {
        datos = await db.pool.query('SELECT COUNT(horario) AS horario FROM public.horarios WHERE now() BETWEEN  fecha_inicio AND fecha_fin ;');
        return datos.rows[0];
    } catch (error) {
        return null;
    }
}


module.exports = {
    getHorario
  }