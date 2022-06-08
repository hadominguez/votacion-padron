const blockchain = require('../db/models/blockchain');

const listarBlockchain = async (req, res) => {
    let blocks = await blockchain.getBlockchain();
    res.render('blockchain/lista', {
      title: 'Lista de servidores',
      data: blocks
    });
};

const createBlockchainRender = async (req, res) => {
  res.render('blockchain/create', {
    title: 'Crear servidor'
  });
};

const createBlockchain = async (req, res) => {
  blockchain.createBlockchain(req, res);
  res.redirect('/blockchain');
};


const editBlockchainRender = async (req, res) => {
  let blocks = await blockchain.getBlockchainById(req, res);
  res.render('blockchain/edit', {
    title: 'Editar servidor',
    data: blocks
  });
};

const editBlockchain = async (req, res) => {
  blockchain.updateBlockchain(req, res);
  res.redirect('/blockchain');
};



const deleteBlockchainRender = async (req, res) => { 
  let blocks = await blockchain.getBlockchainById(req, res);
  res.render('blockchain/delete', {
    title: 'Eliminar servidor',
    data: blocks
  });
};

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