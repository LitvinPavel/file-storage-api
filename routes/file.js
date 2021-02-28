const router = require('express').Router();
const multer = require('multer');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const config = require('../config');
const conn = mongoose.createConnection(config.db, {
   useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true
});


let gfs;

conn.once('open', () => {
   gfs = Grid(conn.db, mongoose.mongo);
   gfs.collection('file-uploads');
});

const storage = new GridFsStorage({
   url: config.db,
   cache: true,
   file: (req, file) => {
      return {
         bucketName: 'file-uploads',
         filename: `${Date.now()}-${file.originalname}`,
         metadata: {
         extension: file.originalname.split(".")[1]
         }
      }
   }
});

const singleUpload = multer({ storage: storage }).single('file');


router.get('/files/:filename', (req, res) => {
   gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
         return res.status(404).json({
            message: "Could not find file"
         });
      }

      var readstream = gfs.createReadStream({
         filename: files[0].filename
      })
      res.set('Content-Type', files[0].contentType);
      return readstream.pipe(res);
   });
});

router.get('/files', (req, res) => {
   gfs.files.find().toArray((err, files) => {
      if (!files || files.length === 0) {
         return res.status(404).json({
            message: "Could not find files"
         });
      }
      return res.json(files);
   });
});

router.post('/files', singleUpload, (req, res) => {
   if (req.file) {
      return res.json({
         success: true,
         file: req.file
      });
   }
   res.send({ success: false });
});

router.delete('/files/:id', (req, res) => {
   gfs.remove({ _id: req.params.id }, (err) => {
      if (err) return res.status(500).json({ success: false })
      return res.json({ success: true });
   })
})

module.exports = router;
