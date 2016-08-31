'use strict';

const BUCKET_NAME = 'senecabucket';
const AWS_URL_BASE = 'https://s3-us-west-1.amazonaws.com'

const mongoose = require('mongoose');
const AWS = require('aws-sdk');
const uuid = require('uuid');
const path = require('path');

const s3 = new AWS.S3();

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  s3_key: { type: String, required: true }

});

let fileObj;

imageSchema.statics.upload = function(fileObj, cb) {
  let { originalname, buffer } = fileObj;

  let Key = uuid() + path.extname(originalname);

  let params = {
    Bucket: BUCKET_NAME,
    Key,
    ACL: 'public-read',
    Body: buffer
  };

  s3.putObject(params, (err, result) => {
    if(err) return cb(err);

    let url = `${AWS_URL_BASE}/${BUCKET_NAME}/${Key}`;

    //create image document for the data base
    this.create({ name: originalname, url, s3_key: Key }, cb);
  });
};

imageSchema.pre('remove', function(next) {
  console.log('deleted');

  let Key = this.s3_key;

  console.log('Key:', Key);
  let params = {
    Bucket: BUCKET_NAME,
    Key
  };

  s3.deleteObject(params, (err, result) =>{
    console.log('params:', params);
    if (err) return next(err)

    next();

  })
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;


















// 'use strict';
//
// const mongoose = require('mongoose');
//
// const imageSchema = new mongoose.Schema({
//   imageUrl: { type: String, required: true,  },
//   createdAt: { type: Date, required: true, default: Date.now }
// });
//
//
// const Image = mongoose.model('Image', imageSchema);
//
// module.exports = Image;
