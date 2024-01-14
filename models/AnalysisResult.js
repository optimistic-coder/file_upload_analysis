const mongoose = require('mongoose');


const AnalysisResult = mongoose.model('AnalysisResult', {
    taskId: String,
    operation: String,
    result: Object,
    createdAt: { type: Date, default: Date.now },
    fileId: String,
  });

module.exports = AnalysisResult;