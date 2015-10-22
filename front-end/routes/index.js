var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    var context = {
        title: "A2Empowerment Dashboard",
        pageTitle: "Dashboard",
        pageSubtitle: "Info at a Glance"
    };
    res.render('main', context);
});

module.exports = router;


/* Sample Request
request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
}) */
