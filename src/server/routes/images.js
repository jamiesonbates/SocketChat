'use strict';

const cloudinary = require('cloudinary');
const db = require('../db/connection');
const router = require('express').Router();

router.post('/', (req, res, next) => {
  const { CLOUDINARY_KEY, CLOUDINARY_SECRET, CLOUDINARY_NAME } = process.env;
  const { userId, data_uri } = req.body;

  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET
  });

  cloudinary.uploader.upload(data_uri, (result) => {
    db('images')
      .insert({ profile: true, cloudinary_url: result.url, user_id: userId })
      .returning('*')
      .then((result) => {
        const image = result[0];

        res.send(image);
      });
  });
});

module.exports = router;
