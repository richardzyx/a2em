var express = require('express');
var router = express.Router();
var request = require('request');

var debug = true;
var backendURL = '/api/get';

/* GET home page. */


router.get('/', function(req, res, next) {

    var donationsToday, donationsThisWeek, amountToday, amountThisWeek = 0;
    if (debug) {
        donationsToday = 4;
        donationsThisWeek = 178;
        amountToday = 170;
        amountThisWeek = 1500;
    } else {
        request(backendURL, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the Google homepage.
            for (var i = 0; i < body.donations.length; i++) {
                var today = new Date();
                if (body.donations[i].date == today) {
                    donationsToday ++;
                    amountToday += body.donations[i].amount;

                }
                var thisweek = new Date(); //minus seven days
                if (body.donations[i].date >= thisweek) {
                    donationsThisWeek++;
                    donationsThisWeek += body.donations[i].amount;
                }
            };

          } else {
            console.log('error');
          }            
        });
    }

    var context = {
        layout: 'dashboard',
        title: "A2Empowerment Dashboard",
        pageTitle: "Dashboard",
        pageSubtitle: "Info at a Glance",
        donationsToday: donationsToday,
        donationsThisWeek: donationsThisWeek,
        amountToday: amountToday,
        amountThisWeek, amountThisWeek,
    };
    res.render('main', context);
});

router.get("/login", function (req, res) {

    var context = {
        loginTitle: "A2Empowerment Login",
        email: "Admin email",
        remember: "Remember this user?",
        signIn: "Sign In",
        layout: "login"
    };
    res.render('login', context);
   // res.sendfile("../startbootstrap-sb-admin-1.0.3/login.html" /*{root: __dirname}*/);
});

module.exports = router;


/* Sample Request
request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
}) */
