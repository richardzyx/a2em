var express = require('express');
var router = express.Router();
//var _ = require('underscore');
var getTest = require('./api/getTest');

//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

router.use('/getTestTable', getTest);

module.exports = router;
