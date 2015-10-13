var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var context = {
        title: "A2Empowerment Dashboard"
    };
    res.render('main', context);
});

router.get('/data', function(req, res, next) {
    var data; //get the data for the page
});

module.exports = router;
