const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();


const storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb){
        const ext = path.extname(file.originalname);
        cb(null, file.filename + '_' + Date.now() + ext);
    }
})


const upload = multer({storage:storage})

app.post('/upload', upload.single('file'), (req, res)=>{
    res.send("Upload success!")
})

app.listen(3003, (err)=>{
    console.log('App running on port: 3003');
})