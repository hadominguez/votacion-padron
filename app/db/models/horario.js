const db = require('../database')

const getHorario = async(req, res) => {
    try {
        datos = await db.pool.query('SELECT COUNT(horario) AS horario FROM public.horarios WHERE now() BETWEEN  fecha_inicio AND fecha_fin ;');
        return datos.rows[0];
    } catch (error) {
        return null;
    }
}


const getHorarios = async (request, response) => {
    try{
        datos = await db.pool.query("SELECT horario, cast(fecha_inicio as date)::character varying as fecha_inicio, to_char(fecha_fin,'HH24:MI') as hora_inicio, cast(fecha_fin as date)::character varying as fecha_fin, to_char(fecha_fin,'HH24:MI') as hora_fin FROM public.horarios ",);
        return datos.rows[0];
    } catch (error) {
        return null;
    }
}

const createHorarios = (request, response) => {
    const { fecha_inicio, hora_inicio, fecha_fin, hora_fin } = request.body;
    var fecha_inicio_real = fecha_inicio + ' ' + hora_inicio;
    var fecha_fin_real = fecha_fin + ' ' + hora_fin;
    try{
        db.pool.query('INSERT INTO public.horarios( fecha_inicio, fecha_fin) VALUES ($1, $2)', 
                [fecha_inicio_real, fecha_fin_real]);
    } catch (error) {
        return null;
    }
}

const updateHorarios = (request, response) => {
    const { fecha_inicio, hora_inicio, fecha_fin, hora_fin } = request.body;
    var fecha_inicio_real = fecha_inicio + ' ' + hora_inicio;
    var fecha_fin_real = fecha_fin + ' ' + hora_fin;
    try{
    db.pool.query('UPDATE public.horarios SET fecha_inicio=$1, fecha_fin=$2', [fecha_inicio_real, fecha_fin_real]);
    } catch (error) {
        return null;
    }
};


module.exports = {
    getHorario,
    getHorarios,
    createHorarios,
    updateHorarios
  }