const db = require('../database')


const getValidarPersona = async(request, response) => {
    const { dni, sexo } = request;
    try {
        datos = await db.pool.query('SELECT * FROM public.personas WHERE dni = $1 AND sexo = $2', [dni, sexo]);
        return datos.rows[0];
    } catch (error) {
        return null;
    }
}


const getPersona = async(usuario, clave) => {
    try {
        datos = await db.pool.query('SELECT * FROM public.personas ORDER BY persona ASC');
        return datos.rows[0];
    } catch (error) {
        return null;
    }
}


const createPersona = async(request, response) => {
    const { apellido, nombre, dni, sexo, bchain, voto } = request.body;
    try {
        datos = await db.pool.query('INSERT INTO public.personas (apellido, nombre, dni, sexo, bchain, voto) VALUES ($1, $2, $3, $4, $5, $6)', 
        [apellido, nombre, dni, sexo, bchain, voto]);
        return datos.rows;
    } catch (error) {
        return null;
    }
}


const updatePersonaVota = (persona, response) => {
    try {
        db.pool.query('UPDATE public.personas SET voto= true WHERE persona=$2', [persona]);
    } catch (error) {
        return null;
    }

};

module.exports = {
    getPersona,
    createPersona,
    updatePersonaVota,
    getValidarPersona
  }