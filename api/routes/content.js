var express = require('express');
var router = express.Router();

/* POST content */
router.post('/', function(req, res, next) {
  const content = {
    'content_address': req.content_address,
    'price_in_wei': req.price_in_wei,
    'file_url': req.file_url
  };

  const content_id = 1;

  console.log('content: ' + content);
  res.send({
    'id': content_id
  });
});

/* GET content */
router.get('/:content_id', function(req, res, next) {
  const content_id = req.params.content_id;

  console.log('content_id: ' + content_id);
  res.send({
    'content_address': '1234',
    'price_in_wei': 10,
    'file_url': "http://i0.kym-cdn.com/entries/icons/mobile/000/025/067/ugandanknuck.jpg"
  });
});

module.exports = router;
