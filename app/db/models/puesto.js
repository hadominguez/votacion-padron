const db = require('../database')

const getPuesto = async(request, response) => {
    try {
        datos = await db.pool.query('SELECT * FROM public.puestos ORDER BY puesto ASC');
        return datos.rows;
    } catch (error) {
        return null;
    }
}



const getPuestoById = async (request, response) => {
    const { puesto } = request.params;
    try{
        datos = await db.pool.query('SELECT * FROM public.puestos WHERE puesto = $1', [puesto]);
        return datos.rows[0];
    } catch (error) {
        return null;
    }
}



const createPuesto = (request, response) => {
    const { orden, descripcion } = request.body
    try{
        db.pool.query('INSERT INTO public.puestos (orden, descripcion) VALUES ($1, $2)', 
        [orden, descripcion]);
    } catch (error) {
        return null;
    }
}

const updatePuesto = (request, response) => {
    const { orden, descripcion, puesto } = request.body;
    try{
    db.pool.query('UPDATE public.puestos SET orden=$1, descripcion=$2 WHERE puesto=$3', [orden, descripcion, puesto]);
    } catch (error) {
        return null;
    }
};

const deletePuesto = (request, response) => {
    const { puesto } = request.body
    try{
        db.pool.query("DELETE FROM public.puestos WHERE puesto=$1", [puesto] );
    } catch (error) {
        return null;
    }
};

module.exports = {
    getPuesto,
    getPuestoById,
    createPuesto,
    updatePuesto,
    deletePuesto,
  }

