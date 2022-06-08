const db = require('../database')


const getBlockchain = async(usuario, clave) => {
    try {
        datos = await db.pool.query('SELECT * FROM public.blockchain ORDER BY bchain ASC');
        return datos.rows;
    } catch (error) {
        return null;
    }
}

const getBlockchainById = async (request, response) => {
    const { bchain } = request.params;
    try{
        datos = await db.pool.query('SELECT * FROM public.blockchain WHERE bchain = $1', [bchain]);
        return datos.rows[0];
    } catch (error) {
        return null;
    }
}

const getBlockchainId = async (bchain, response) => {
    try{
        datos = await db.pool.query('SELECT * FROM public.blockchain WHERE bchain = $1', [bchain]);
        return datos.rows[0];
    } catch (error) {
        return null;
    }
}

const createBlockchain = (request, response) => {
    const { ip, puerto, usuario, clave } = request.body;
    try{
        db.pool.query('INSERT INTO public.blockchain (ip, puerto, usuario, clave) VALUES ($1, $2, $3, $4)', 
                [ip, puerto, usuario, clave]);
    } catch (error) {
        return null;
    }
}

const updateBlockchain = (request, response) => {
    const { ip, puerto, usuario, clave, bchain } = request.body
    try{
    db.pool.query('UPDATE public.blockchain SET ip=$1, puerto=$2, usuario=$3, clave=$4 WHERE bchain=$5', [ip, puerto, usuario, clave, bchain]);
    } catch (error) {
        return null;
    }
};

const deleteBlockchain = (request, response) => {
    const { bchain } = request.body
    try{
        db.pool.query("DELETE FROM public.blockchain WHERE bchain=$1", [bchain] );
    } catch (error) {
        return null;
    }
};

module.exports = {
    getBlockchain,
    getBlockchainId,
    getBlockchainById,
    createBlockchain,
    updateBlockchain,
    deleteBlockchain,
  }