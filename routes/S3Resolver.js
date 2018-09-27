//S3 Resolver
const express = require('express')
const router = express.Router()
const aws = require('aws-sdk');
require('dotenv').load();
const cors = require('cors');
var bodyParser = require('body-parser');
const s3Bucket = process.env.AWS_S3_BUCKET;


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/signs3Bucket', (req, res) => {

	console.log(req.body)
	var s3 = new aws.S3();

	const s3Params = {
        Bucket: s3Bucket,
        Key: 'Gallery/' + req.body.key,
        Expires: 60,
        ContentType: 'jpg',
        ACL: 'public-read',
      };

      aws.config.update({
      accessKeyId:  process.env.AWS_ACCESS_KEY_ID,
      secretAccessKeyId: process.env.AWS_SECRET_ACCESS_KEY,
      });

   	 aws.config.region = process.env.AWS_REGION;

   	 s3.getSignedUrl('putObject', s3Params, function(err, url){
      console.log(url);
   	 	res.send(url)
   	 })



})



router.post('/signs3BucketProducts', (req, res) => {

  
  var s3 = new aws.S3();

  const s3Params = {
        Bucket: s3Bucket,
        Key: 'Gallery/Product' + req.body.key,
        Expires: 60,
        ContentType: 'jpg',
        ACL: 'public-read',
      };

      aws.config.update({
      accessKeyId:  process.env.AWS_ACCESS_KEY_ID,
      secretAccessKeyId: process.env.AWS_SECRET_ACCESS_KEY,
      });

     aws.config.region = process.env.AWS_REGION;

     s3.getSignedUrl('putObject', s3Params, function(err, url){
      res.send(url)
     })



})
    



module.exports = router