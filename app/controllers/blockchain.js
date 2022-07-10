const blockchain = require('../db/models/blockchain');

//render de la pantalla del listado de servidores
const listarBlockchain = async (req, res) => {
    let blocks = await blockchain.getBlockchain();
    res.render('blockchain/lista', {
      title: 'Lista de servidores',
      data: blocks
    });
};

//render de la pantalla de creación de servidores
const createBlockchainRender = async (req, res) => {
  res.render('blockchain/create', {
    title: 'Crear servidor'
  });
};

//almacena un nuevo servidor
const createBlockchain = async (req, res) => {
  blockchain.createBlockchain(req, res);
  res.redirect('/blockchain');
};

//render de la pantalla de modificación de un servidor
const editBlockchainRender = async (req, res) => {
  let blocks = await blockchain.getBlockchainById(req, res);
  res.render('blockchain/edit', {
    title: 'Editar servidor',
    data: blocks
  });
};

//modifica un servidor
const editBlockchain = async (req, res) => {
  blockchain.updateBlockchain(req, res);
  res.redirect('/blockchain');
};

//pantalla para eliminar un servidor
const deleteBlockchainRender = async (req, res) => { 
  let blocks = await blockchain.getBlockchainById(req, res);
  res.render('blockchain/delete', {
    title: 'Eliminar servidor',
    data: blocks
  });
};

//elimina un servidor
const deleteBlockchain = async (req, res) => {
  blockchain.deleteBlockchain(req, res);
  res.redirect('/blockchain');
};

module.exports = {
  listarBlockchain,
  createBlockchainRender,
  createBlockchain,
  editBlockchainRender,
  editBlockchain,
  deleteBlockchainRender,
  deleteBlockchain
}