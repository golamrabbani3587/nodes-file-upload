const express = require('express');
const path = require('path')
const rn = require('random-number');
const AWS = require('aws-sdk');
const fileUpload = require('express-fileupload')
require('dotenv').config();

const app = express();
app.use(fileUpload());



app.post('/upload-image-s3', (req, res)=>{
    try {
        console.log(req.files);
        if (req.files && req.files.image) {
            let genIntDigit = rn.generator({ min: -1000000, max: 1000000, integer: true });
            let rnNumber = genIntDigit(100000);
            let imgName = `${rnNumber}${+new Date()}${req.files.image.name}`;
            
            AWS.config.update({
                accessKeyId: process.env.AccessKeyId,
                secretAccessKey: process.env.SecretAccessKey,
                region: process.env.Region
            });
    
            let s3 = new AWS.S3();
            let fileContent = Buffer.from(req.files.image.data);
            console.log(process.env.Bucket, 'bucket name');
            let imgInfo = {
                Bucket: process.env.Bucket, // Make sure process.env.Bucket is properly defined
                Key: imgName, 
                Body: fileContent
            };
    
            s3.upload(imgInfo, (er, data) => {
                if (er) {
                    console.log(er, 'err');
                    res.status(400).json({
                        success: false,
                        message: 'Image upload error!',
                    });
                } else {
                    res.status(201).json({
                        data: data,
                        success: true,
                        message: 'Upload successfully!',
                    });
                }
            });
        } else {
            res.status(400).json({
                data: null,
                success: false,
                message: 'Request invalid. File is missing!',
            });
        }
    } catch (err) {
        console.log('singleImageUpload error!');
        console.log('Error = ', err);
        res.status(500).json({
            data: null,
            success: false,
            message: "Internal Server Error Occurred!"
        });
    }    
}) 


app.listen(3006, (err)=>{
    console.log('App running on port: 3006');
})