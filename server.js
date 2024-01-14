
const express = require('express');
const multer = require('multer');
const app = express();
const AnalysisResult = require('./models/AnalysisResult')
const File = require('./models/File')

var bodyParser = require('body-parser');
const connectDB = require('./config/database');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

connectDB();

const upload = multer({ dest: 'uploads/' ,fileFilter: function (req, file, cb) {
    if (file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb(null, false);
      req.fileValidationError = 'Only text files are allowed!';
    }
  },});

  
app.post('/upload', upload.single('file'), async (req, res) => {
    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
      }
    const { originalname, path } = req.file;


 
    const content = fs.readFileSync(path, 'utf-8');


    const file = await File.create({
        fileId: Math.random().toString(36).substring(2, 15),
        filename: originalname,
        uploadDate: new Date(),
        content,
    });


    await AnalysisResult.create({
        taskId: Math.random().toString(36).substring(2, 15),
        operation: 'upload',
        result: { content },
        fileId: file.fileId,
    });


    fs.unlinkSync(path);

    res.json({ fileId: file.fileId });
});


app.post('/analyze', async (req, res) => {

    const { fileId, operation, options } = req.body;

    const file = await File.findOne({ fileId });


    let result;
    switch (operation) {
        case 'countWords':
            result = { count: file.content.split(/\s+/).length };
            break;
        case 'countUniqueWords':
            result = { count: new Set(file.content.split(/\s+/)).size };
            break;
        case 'findTopKWords':
            if (options) {
                const k = options.k || 10;
                const words = file.content.split(/\s+/);
                const frequencyMap = {};
                words.forEach((word) => {
                    frequencyMap[word] = (frequencyMap[word] || 0) + 1;
                });
                result = Object.entries(frequencyMap)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, k)
                    .map(([word, count]) => ({ word, count }));
            } else {
                return res.status(400).json({ error: 'Need options' });
            }
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation' });
    }


    const analysisResult = await AnalysisResult.create({
        taskId: Math.random().toString(36).substring(2, 15),
        operation,
        result,
        fileId,
    });

    res.json({ taskId: analysisResult.taskId });
});


app.get('/results/:taskId', async (req, res) => {
    const { taskId } = req.params;


    const analysisResult = await AnalysisResult.findOne({ taskId });

    if (!analysisResult) {
        return res.status(404).json({ error: 'Analysis result not found' });
    }

    res.json(analysisResult.result);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
