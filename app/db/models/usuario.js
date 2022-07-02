const db = require('../database')

const getUsuarioClave = async(usuario, clave) => {
    try {
        datos = await db.pool.query('SELECT * FROM public.usuarios WHERE usuario = $1 AND clave = $2', [usuario, clave]);
        return datos.rows[0];
    } catch (error) {
        return null;
    }
}

const getUsuarioExiste = async(request, response) => {
    const { usuario } = request.params;
    try {
        datos = await db.pool.query('SELECT * FROM public.usuarios WHERE usuario = $1', [usuario]);
        return datos.rows[0];
    } catch (error) {
        return null;
    }
}

const getUsuario = async(request, response) => {
    try {
        datos = await db.pool.query('SELECT usuarios.id, usuarios.usuario, usuarios.clave, usuarios.role, roles.descripcion '+
        '   FROM public.usuarios '+
        '   JOIN public.roles ON (usuarios.role = roles.role) ORDER BY id ASC');
        return datos.rows;
    } catch (error) {
        return null;
    }
}

const getRoles = async(request, response) => {
    try {
        datos = await db.pool.query('SELECT * FROM public.roles ORDER BY role ASC');
        return datos.rows;
    } catch (error) {
        return null;
    }
}
const getUsuarioById = async (request, response) => {
    const { id } = request.params;
    try{
        datos = await db.pool.query('SELECT * FROM public.usuarios WHERE id = $1', [id]);
        return datos.rows[0];
    } catch (error) {
        return null;
    }
}

const createUsuario = (clave_encriptada, request, response) => {
    const { usuario, role } = request.body;
    try{
        db.pool.query('INSERT INTO public.usuarios (usuario, clave, role) VALUES ($1, $2, $3)', [usuario, clave_encriptada, role]);
    } catch (error) {
        return null;
    }
}

const updateUsuario = (clave_encriptada, request, response) => {
    const { id } = request.body;
    try{
    db.pool.query('UPDATE public.usuarios SET clave=$1 WHERE id=$2', [clave_encriptada, id]);
    } catch (error) {
        return null;
    }
}

const deleteUsuario = (request, response) => {
    const { id } = request.body;
    try{
        db.pool.query("DELETE FROM public.usuarios WHERE id=$1", [id] );
    } catch (error) {
        return null;
    }
}

module.exports = {
    getUsuario,
    getRoles,
    getUsuarioExiste,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioClave,
  }