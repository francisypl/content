var express = require('express');
var router = express.Router();
var db = require('../models/db');

/* POST content */
router.post('/', function(req, res, next) {
  const content = {
    'content_address': req.body.content_address,
    'price': req.body.price_in_wei,
    'url': req.body.file_url
  };

  console.log('content: ' + JSON.stringify(content));

  db.Content.create(content)
    .then(entry => {
      console.log('Saved created entry successfully. entry: ' + JSON.stringify(entry));
      res.send({
        'id': entry.id
      });
    })
    .catch(error => {
      console.error('Error saving entry. Error=' + error);
      res.status(500).send({
        'error': error
      })
    });
});

/* GET content */
router.get('/:content_id', function(req, res, next) {
  const content_id = req.params.content_id;
  console.log('content_id: ' + content_id);

  db.Content.findById(content_id)
    .then(content => {
      console.log('Got content successfully. content: ' + JSON.stringify(content));
      res.send({
          'content_address': content.content_address,
          'price_in_wei': content.price,
          'file_url': content.url
        });
    })
    .catch(error => {
      console.error('Error getting entry. Error=' + error);
      res.status(500).send({
        'error': error
      })
    });

});

module.exports = router;
