const db = require('../database')

const getRolPermiso = async(operacion, role) => {
    try {
        datos = await db.pool.query('SELECT * FROM public.roles ' +
            ' JOIN public.roles_permisos ON (roles.role = roles_permisos.role)' +
            ' JOIN public.permisos ON (roles_permisos.permiso = permisos.permiso)' +
            ' WHERE permisos.operacion = $1 AND roles.role = $2 ;', [operacion, role]);
        return datos.rows[0];
    } catch (error) {
        return null;
    }
}


module.exports = {
    getRolPermiso
  }