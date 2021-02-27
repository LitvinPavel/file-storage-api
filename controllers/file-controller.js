const fileService = require('../services/file-service');

module.exports = function (app) {

    app.get('/api/v1/files/', (req, res) =>
        fileService.findAllFiles()
            .then(allFiles => res.json(allFiles)));

    app.get('/api/v1/files/:id', (req, res) =>
        fileService.findFilesById(req.params['id'])
            .then(file => res.json(file)));

    app.delete('/api/v1/files/:id', (req, res) =>
        fileService.deleteFileById(req.params['id'])
            .then(status => res.send(status)));

    app.post('/api/v1/files/', (req, res) =>
        fileService.addNewFile(req.body)
            .then(newFile => res.json(newFile)));

    app.put('/api/v1/files/:id', (req, res) =>
        fileService.updateFile(req.params['id'], req.body)
            .then(status => res.send(status)));

};