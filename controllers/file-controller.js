const fileService = require('../services/file-service');

module.exports = function (app) {

    app.get('/api/v1/files/', (req, res) =>
        fileService.findAllFiles()
            .then(allFiles => res.json(allFiles))
            .catch(e => console.log(e)));

    app.get('/api/v1/files/:id', (req, res) =>
        fileService.findFilesById(req.params['id'])
            .then(file => res.json(file))
            .catch(e => console.log(e)));

    app.delete('/api/v1/files/:id', (req, res) =>
        fileService.deleteFileById(req.params['id'])
            .then(status => res.send(status))
            .catch(e => console.log(e)));

    app.post('/api/v1/files/', (req, res) =>
        fileService.addNewFile(req.body)
            .then(newFile => res.json(newFile))
            .catch(e => console.log(e)));

    app.put('/api/v1/files/:id', (req, res) =>
        fileService.updateFile(req.params['id'], req.body)
            .then(status => res.send(status))
            .catch(e => console.log(e)));

};