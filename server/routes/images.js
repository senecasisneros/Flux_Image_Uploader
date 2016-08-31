'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const router = express.Router();

const Image = require('../models/image');

//stores to memory storage(not in local directory)
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', (req, res) => {
  Image.find({}, (err, images) => {
    res.status(err ? 400: 200).send(err || images)
  });
});

//post single image
router.post('/', upload.single('image'), (req, res) => {
  Image.upload(req.file, (err, image) => {
    // 1. Upload data to S3
    // 2. Determine the url of the image on S3
    // 3. Save image in db, with url(and original name)
    // 4. Callback with saved image doc

    res.status(err ? 400 : 200).send(err || image);
  });
});

router.route('/:id')
.delete((req, res) => {
  Image.findByIdAndRemove(req.params.id, (err, image) => {
    res.status(err ? 400 : 200).send(err);
    image.remove();
      res.send();
  })
})




module.exports = router;


















// 'use strict';
//
// const express = require('express');
// const router = express.Router();
//
// const Image = require('../models/image');
//
// router.get('/:id', (req, res) => {
//   Image.findById(req.params.id, (err, image) => {
//     if(err || !image) {
//       return res.status(400).send(err || "Image not found");
//     }
//     res.send(image)
//   })
// })
// // router.route('/')
// // .get((req, res) => {
// //   Image.find({}, (err, images) => {
// //     res.status(err ? 400 : 200).send(err || images);
// //   })
// // })
//
//
// .post('/', (req, res) => {
//   Image.create(req.body, (err, newImage) => {
//     res.status(err ? 400 : 200).send(err || newImage);
//   });
// });
//
// router.route('/:id')
// .get((req, res) => {
//   Image.findById(req.params.id, (err, image) => {
//     res.status(err ? 400 : 200).send(err || image);
//   });
// })
// .delete((req, res) => {
//   Image.findByIdAndRemove(req.params.id, err => {
//     res.status(err ? 400 : 200).send(err);
//   })
// })
// .put((req, res) => {
//   Image.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, image) => {
//     if(err) {
//       return res.status(400).send(err);
//     }
//     Image.find({}, (err, images) => {
//       res.status(err ? 400 : 200).send(err || images);
//     });
//   });
// })

// module.exports = router;
