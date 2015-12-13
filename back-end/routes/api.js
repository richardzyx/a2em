"use strict";
var express = require('express');
var router = express.Router();
//var _ = require('underscore');
//var later = require('later');
//
//var text = 'every 5 seconds';
//var sched = later.parse.text(text);
//
//later.schedule(sched)
//// execute logTime
//var timer = later.setInterval(pullPayPal, sched);
//
//// one can easily expand and increase modularity by passing objects instead of one target phone number
//function pullPayPal() {
//    console.log(new Date());
//}

//Add your module here by require the file under api
var getTest = require('./api/getTest');
var getDonation = require('./api/getDonation');
//var email = require('./api/email');

router.use('/', function(req, res, next) {
      next();
});

//Add your url to your module api
router.use('/gettest', getTest);
router.use('/getDonation', getDonation);

//router.use('/email', email);

module.exports = router;