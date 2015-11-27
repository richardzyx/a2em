"use strict";
var express = require('express');
var router = express.Router();
//var _ = require('underscore');

//Add your module here by require the file under api
var invoice = require('./invoice');

router.use('/', function(req, res, next) {
    next();
});

//Add your url to your module api
router.use('/invoice', invoice);

module.exports = router;