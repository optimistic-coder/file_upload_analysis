
const mongoose = require('mongoose');

const File = mongoose.model('File', {
    fileId: String,
    filename: String,
    uploadDate: Date,
    content: String, 
  });

module.exports = File
