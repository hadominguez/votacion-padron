const db = require('../database')


const getCandidato = async(request, response) => {
    try {
        datos = await db.pool.query('SELECT candidatos.candidato, candidatos.orden, candidatos.puesto, candidatos.lista, '+
        '    candidatos.apellido, candidatos.nombre, listas.nombre as lista_nombre, '+
        '    puestos.descripcion'+
        '        FROM public.candidatos'+
        '        JOIN public.listas ON (candidatos.lista = listas.lista)'+
        '        JOIN public.puestos ON (candidatos.puesto = puestos.puesto) ORDER BY candidato ASC');
        return datos.rows;
    } catch (error) {
        return null;
    }
}

const getCandidatoById = async (request, response) => {
    const { candidato } = request.params;
    try{
        datos = await db.pool.query('SELECT candidatos.candidato, candidatos.orden, candidatos.puesto, candidatos.lista, '+
        '    candidatos.apellido, candidatos.nombre, listas.nombre as lista_nombre, '+
        '    puestos.descripcion'+
        '        FROM public.candidatos'+
        '        JOIN public.listas ON (candidatos.lista = listas.lista)'+
        '        JOIN public.puestos ON (candidatos.puesto = puestos.puesto) WHERE candidato = $1', [candidato]);
        return datos.rows[0];
    } catch (error) {
        return null;
    }
}

const createCandidato = (request, response) => {
    const { orden, puesto, lista, apellido, nombre } = request.body
    try{
        db.pool.query('INSERT INTO public.candidatos (orden, puesto, lista, apellido, nombre) VALUES ($1, $2, $3, $4, $5)', 
        [orden, puesto, lista, apellido, nombre ]);
    } catch (error) {
        return null;
    }
}

const updateCandidato = (request, response) => {
    const { orden, puesto, lista, apellido, nombre, candidato } = request.body
    try{
    db.pool.query('UPDATE public.candidatos SET orden=$1, puesto=$2, lista=$3, apellido=$4, nombre=$5 WHERE candidato=$6', [orden, puesto, lista, apellido, nombre, candidato]);
    } catch (error) {
        return null;
    }
};

const deleteCandidato = (request, response) => {
    const { candidato } = request.body
    try{
        db.pool.query("DELETE FROM public.candidatos WHERE candidato=$1", [candidato] );
    } catch (error) {
        return null;
    }
};

module.exports = {
    getCandidato,
    getCandidatoById,
    createCandidato,
    updateCandidato,
    deleteCandidato,
  }