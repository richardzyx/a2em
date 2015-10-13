var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/swag', function(req, res, next) {
  res.render('index', { title: 'Swag' });
});

module.exports = router;
