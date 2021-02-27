const fileModel = require('../models/file-model');

const findAllFiles = () => fileModel.find();
const findFilesById = (id) => fileModel.findById(id);
const deleteFileById = (id) => fileModel.deleteOne({_id: id});
const addNewFile = (newFile) => fileModel.create(newFile);
const updateFile = (id, updatedFile) => fileModel.updateOne({_id: id}, {$set: updatedFile});

module.exports = {
    findAllFiles,
    findFilesById,
    deleteFileById,
    addNewFile,
    updateFile
};