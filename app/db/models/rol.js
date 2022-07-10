const db = require('../database')

const getRolPermiso = async(operacion, id) => {
    try {
        datos = await db.pool.query('SELECT * FROM public.roles ' +
            ' JOIN public.roles_permisos ON (roles.role = roles_permisos.role)' +
            ' JOIN public.permisos ON (roles_permisos.permiso = permisos.permiso) ' +
            ' JOIN public.usuarios ON (roles.role = usuarios.role) ' +
            ' WHERE permisos.operacion = $1 AND usuarios.id = $2 ;', [operacion, id]);
        return datos.rows[0];
    } catch (error) {
        return null;
    }
}


module.exports = {
    getRolPermiso
  }