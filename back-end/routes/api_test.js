/**
 * Created by root on 10/29/15.
 */
"use strict";
var express = require('express');
var router = express.Router();
//var _ = require('underscore');

//Add your module here by require the file under api
var lastName = require('./api/lastName');

router.use('/', function(req, res, next) {
    next();
});

//Add your url to your module api
router.use('/lastname', lastName);

module.exports = router;