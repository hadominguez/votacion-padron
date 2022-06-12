const db = require('../database')

const getLista = async(request, response) => {
    try {
        datos = await db.pool.query('SELECT * FROM public.listas ORDER BY lista ASC');
        return datos.rows;
    } catch (error) {
        return null;
    }
}

const getListaFinal = async(request, response) => {
    try {
        datos = await db.pool.query("SELECT puestos.orden, puestos.descripcion,  listas.numero ||' - '|| listas.nombre AS lista, candidatos.candidato, "+
        " candidatos.apellido ||', '|| candidatos.nombre as candidato_nombre " +
        "    FROM public.puestos " +
        "    JOIN public.candidatos ON (candidatos.puesto = puestos.puesto AND candidatos.orden = 1) " +
        "    JOIN public.listas ON (listas.lista = candidatos.lista) "+
        "    ORDER BY puestos.orden, listas.numero ");
        return datos.rows;
    } catch (error) {
        return null;
    }
}


const getListaById = async (request, response) => {
    const { lista } = request.params;
    try{
        datos = await db.pool.query('SELECT * FROM public.listas WHERE lista = $1', [lista]);
        return datos.rows[0];
    } catch (error) {
        return null;
    }
}

const createLista = (request, response) => {
    const { nombre, numero } = request.body;
    try{
        db.pool.query('INSERT INTO public.listas (nombre, numero) VALUES ($1, $2)', [nombre, numero]);
    } catch (error) {
        return null;
    }
}

const updateLista = (request, response) => {
    const { nombre, numero, lista } = request.body;
    try{
    db.pool.query('UPDATE public.listas SET nombre=$1, numero=$2 WHERE lista=$3', [nombre, numero, lista]);
    } catch (error) {
        return null;
    }
};

const deleteLista = (request, response) => {
    const { lista } = request.body
    try{
        db.pool.query("DELETE FROM public.listas WHERE lista=$1", [lista] );
    } catch (error) {
        return null;
    }
};

module.exports = {
    getLista,
    getListaById,
    createLista,
    updateLista,
    deleteLista,
    getListaFinal
  }