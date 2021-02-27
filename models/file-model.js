const mongoose = require('mongoose');
const fileSchema = require('./file-schema');
const fileModel = mongoose.model(
    'FileModel',
    fileSchema
);
module.exports = fileModel;