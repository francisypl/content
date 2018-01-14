var multer = require('multer');
var AWS = require('aws-sdk');

var express = require('express');
var router = express.Router();
var url = "https://s3-us-west-1.amazonaws.com/wcefhackathon/";
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 },
});

AWS.config.update(
  {
    accessKeyId: "AKIAJ7UPQQJJ3UTTP4NQ",
    secretAccessKey: "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",
    subregion: 'us-east-2',
  });

var s3 = new AWS.S3();

router.post('/', upload.single('file'), (req, res) => {
  // req.file is the 'theseNamesMustMatch' file
  //console.log("req.file.buffer: " + JSON.stringify(req.file.buffer))
  var keyID = guid();
  s3.putObject({
      Bucket: 'wcefhackathon',
      Key: keyID, 
      Body: req.file.buffer,
      ACL: 'public-read-write', // your permisions  
    }, (err, data) => { 
      if (err)
      {
      	console.log(err, err.stack);
      	return res.status(400).send(err);
      } 
      console.log(JSON.stringify(data));
      res.send({url: url + keyID});
    })

})

module.exports = router;