var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('main.hbs');
});

router.get('/data', function(req, res, next) {
    var data; //get the data for the page
});

module.exports = router;
