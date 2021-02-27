const mongoose = require('mongoose');
const fileSchema = mongoose.Schema({
    name: String,
    extension: String,
    createDate: Date,
    hasSubDir: Boolean,
    type: {
        type: String,
        enum: [
            'DIRECTORY',
            'FILE'
        ]},
}, {collection: 'files'});
module.exports = fileSchema;