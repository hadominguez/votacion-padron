const persona = require('./db/models/persona');
const usuario = require('./db/models/usuario');

const api = require('./controllers/api');
const puesto = require('./controllers/puesto');
const candidato = require('./controllers/candidato');
const lista = require('./controllers/lista');
const account = require('./controllers/account');
const gestion = require('./controllers/gestion');
const padron = require('./controllers/padron');
const blockchain = require('./controllers/blockchain');

module.exports = function (routerControl, routerControlAPI, app){
    app.get('/', routerControl, (req, res) => {
        gestion.index(req, res);
    });


    app.post('/validarDatos', routerControlAPI, (req, res) => {
        api.validarDatos(req, res);
    });
    app.post('/getListasFinales', routerControlAPI, (req, res) => {
        api.getListasFinales(req, res);
    });
    app.post('/verificarVoto', routerControlAPI, (req, res) => {
        api.verificarVoto(req, res);
    });
    app.post('/votar', routerControlAPI, (req, res) => {
        api.votar(req, res);
    });


    app.get('/logout', routerControl, (req, res) => {
        account.logout(req, res);
    });

    app.get('/login', (req, res) => {
        account.loginRender(req, res);
    });
    app.post('/login', (req, res) => {
        account.login(req, res);
    });

    app.get('/padron', routerControl, account.permisosControl('/padron'), (req, res) => {
        padron.controlarPadron(req, res);
    });
    app.post('/padron', routerControl, account.permisosControl('/padron'), (req, res) => {
        padron.cargarPadron(req, res);
    });


    app.get('/blockchain', routerControl, account.permisosControl('/blockchain'), (req, res) => {
        blockchain.listarBlockchain(req, res);
    });
    app.get('/blockchain/create', routerControl, account.permisosControl('/blockchain/create'), (req, res) => {
        blockchain.createBlockchainRender(req, res);
    });
    app.post('/blockchain/create', routerControl, account.permisosControl('/blockchain/create'), (req, res) => {
        blockchain.createBlockchain(req, res);
    });
    app.get('/blockchain/edit/:bchain', routerControl, account.permisosControl('/blockchain/edit'), (req, res) => {
        blockchain.editBlockchainRender(req, res);
    });
    app.post('/blockchain/edit', routerControl, account.permisosControl('/blockchain/edit'), (req, res) => {
        blockchain.editBlockchain(req, res);
    });
    app.get('/blockchain/delete/:bchain', routerControl, account.permisosControl('/blockchain/delete'), (req, res) => {
        blockchain.deleteBlockchainRender(req, res);
    });
    app.post('/blockchain/delete', routerControl, account.permisosControl('/blockchain/delete'), (req, res) => {
        blockchain.deleteBlockchain(req, res);
    });


    app.get('/lista', routerControl, account.permisosControl('/lista'), (req, res) => {
        lista.listarLista(req, res);
    });
    app.get('/lista/create', routerControl, account.permisosControl('/lista/create'), (req, res) => {
        lista.createListaRender(req, res);
    });
    app.post('/lista/create', routerControl, account.permisosControl('/lista/create'), (req, res) => {
        lista.createLista(req, res);
    });
    app.get('/lista/edit/:lista', routerControl, account.permisosControl('/lista/edit'), (req, res) => {
        lista.editListaRender(req, res);
    });
    app.post('/lista/edit', routerControl, account.permisosControl('/lista/edit'), (req, res) => {
        lista.editLista(req, res);
    });
    app.get('/lista/delete/:lista', routerControl, account.permisosControl('/lista/delete'), (req, res) => {
        lista.deleteListaRender(req, res);
    });
    app.post('/lista/delete', routerControl, account.permisosControl('/lista/delete'), (req, res) => {
        lista.deleteLista(req, res);
    });



    app.get('/candidato', routerControl, account.permisosControl('/candidato'), (req, res) => {
        candidato.listarCandidato(req, res);
    });
    app.get('/candidato/create', routerControl, account.permisosControl('/candidato/create'), (req, res) => {
        candidato.createCandidatoRender(req, res);
    });
    app.post('/candidato/create', routerControl, account.permisosControl('/candidato/create'), (req, res) => {
        candidato.createCandidato(req, res);
    });
    app.get('/candidato/edit/:candidato', routerControl, account.permisosControl('/candidato/edit'), (req, res) => {
        candidato.editCandidatoRender(req, res);
    });
    app.post('/candidato/edit', routerControl, account.permisosControl('/candidato/edit'), (req, res) => {
        candidato.editCandidato(req, res);
    });
    app.get('/candidato/delete/:candidato', routerControl, account.permisosControl('/candidato/delete'), (req, res) => {
        candidato.deleteCandidatoRender(req, res);
    });
    app.post('/candidato/delete', routerControl, account.permisosControl('/candidato/delete'), (req, res) => {
        candidato.deleteCandidato(req, res);
    });
    



    app.get('/puesto', routerControl, account.permisosControl('/puesto'), (req, res) => {
        puesto.listarPuesto(req, res);
    });
    app.get('/puesto/create', routerControl, account.permisosControl('/puesto/create'), (req, res) => {
        puesto.createPuestoRender(req, res);
    });
    app.post('/puesto/create', routerControl, account.permisosControl('/puesto/create'), (req, res) => {
        puesto.createPuesto(req, res);
    });
    app.get('/puesto/edit/:puesto', routerControl, account.permisosControl('/puesto/edit'), (req, res) => {
        puesto.editPuestoRender(req, res);
    });
    app.post('/puesto/edit', routerControl, account.permisosControl('/puesto/edit'), (req, res) => {
        puesto.editPuesto(req, res);
    });
    app.get('/puesto/delete/:puesto', routerControl, account.permisosControl('/puesto/delete'), (req, res) => {
        puesto.deletePuestoRender(req, res);
    });
    app.post('/puesto/delete', routerControl, account.permisosControl('/puesto/delete'), (req, res) => {
        puesto.deletePuesto(req, res);
    });



    app.get('/usuario', routerControl, (req, res) => {
        usuario.getUsuario(req, res);
    });
    app.get('/usuario/:usuario', routerControl, (req, res) => {
        usuario.getUsuarioById(req, res);
    });
    app.get('/usuario/create', routerControl, (req, res) => {
        usuario.createUsuarioRender(req, res);
    });
    app.post('/usuario/create', routerControl, (req, res) => {
        usuario.createUsuario(req, res);
    });
    app.get('/usuario/edit/:usuario', routerControl, (req, res) => {
        usuario.editUsuarioRender(req, res);
    });
    app.put('/usuario/edit/:usuario', routerControl, (req, res) => {
        usuario.editUsuario(req, res);
    });
    app.get('/usuario/delete/:usuario', routerControl, (req, res) => {
        usuario.deleteUsuarioRender(req, res);
    });
    app.delete('/usuario/delete/:usuario', routerControl, (req, res) => {
        usuario.deleteUsuario(req, res);
    });
  
}