const fileDao = require('../daos/file-dao');

const findAllFiles = () => fileDao.findAllFiles();
const findFilesById = (id) => fileDao.findFilesById(id);
const deleteFileById = (id) => fileDao.deleteFileById(id);
const addNewFile = (newFile) => fileDao.addNewFile(newFile);
const updateFile = (id, updatedFile) => fileDao.updateFile(id, updatedFile);

module.exports = {
    findAllFiles,
    findFilesById,
    deleteFileById,
    addNewFile,
    updateFile
};