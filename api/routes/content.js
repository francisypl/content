var express = require('express');
var router = express.Router();
var db = require('../models/db');

/* POST content */
router.post('/', function(req, res, next) {
  const content = {
    'contract_address': req.body.contract_address,
    'price': req.body.price_in_wei,
    'url': req.body.file_url
  };

  console.log('content: ' + JSON.stringify(content));

  // TODO temporary mock to test heroku connectivity
  if (req.query.mock != null && req.query.mock === 'true') {
    res.send({
        'id': 1
      });
  }
  else {
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
  }
});

/* GET content */
router.get('/:content_id', function(req, res, next) {
  const content_id = req.params.content_id;
  console.log('content_id: ' + content_id);

// TODO temporary mock to test heroku connectivity
  if (req.query.mock != null && req.query.mock === 'true') {
    res.send({
        "contract_address": "1234",
        "price_in_wei": 10,
        "file_url": "http://i0.kym-cdn.com/entries/icons/mobile/000/025/067/ugandanknuck.jpg"
      });
  }
  else {
    db.Content.findById(content_id)
      .then(content => {
        console.log('Got content successfully. content: ' + JSON.stringify(content));
        res.send({
            'contract_address': content.contract_address,
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
  }

});

module.exports = router;
