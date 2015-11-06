/**
 * Created by root on 10/29/15.
 */
"use strict";
var express = require('express');
var router = express.Router();
//var _ = require('underscore');

//Add your module here by require the file under api
var firstName = require('./firstName');

router.use('/', function(req, res, next) {
    next();
});

//Add your url to your module api
router.use('/firstname', firstName);

module.exports = router;