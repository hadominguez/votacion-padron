const db = require('../database')

const getUsuario = async(request, response) => {
    db.pool.query('SELECT * FROM public.usuarios ORDER BY id ASC', 
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUsuarioById = async(request, response) => {
    const id = parseInt(request.params.id)
    db.pool.query('SELECT * FROM public.usuarios WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUsuarioClave = async(usuario, clave) => {
    try {
        datos = await db.pool.query('SELECT * FROM public.usuarios WHERE usuario = $1 AND clave = $2', [usuario, clave]);
        return datos.rows[0];
    } catch (error) {
        return null;
    }
}

const createUsuario = async (usuario, clave) => {
    try {
        await db.pool.query('INSERT INTO public.usuarios (usuario, clave) VALUES ($1, $2)',  [usuario, clave]);
    } catch (error) {
        return null;
    }

}

const updateUsuario = async(req, res) => {
    const { usuario, clave, id } = request.body

    db.pool.query('UPDATE public.usuarios SET usuario=$1, clave=$2 WHERE id=$3', [usuario, clave, id], (error, results) => {
        if (error) {
            console.log("Error Updating : %s ", error);
        }
        //res.redirect('/customers');
    });

};

const deleteUsuario = async(req, res) => {
    const { id } = request.body

    db.pool.query("DELETE FROM public.usuarios WHERE id=$1", [id], (error, results) => {
        if (error) {
            console.log("Error deleting : %s ", error);
        }
        //res.redirect('/customers');
    });

};

module.exports = {
    getUsuario,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioClave,
  }