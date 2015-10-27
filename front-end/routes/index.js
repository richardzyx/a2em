var express = require('express');
var router = express.Router();
var request = require('request');

var debug = true;
var backendURL = '/api/get';

/* GET home page. */
router.get('/', function(req, res, next) {

    var donationsToday, donationsThisWeek, amountToday, amountThisWeek = 0;
    var week = [];
    if (debug) {
        donationsToday = 4;
        donationsThisWeek = 178;
        amountToday = 170;
        amountThisWeek = 1500;

        var day0 = {};
        var day1 = {};
        var day2 = {};
        var day3 = {};
        var day4 = {};
        var day5 = {};
        var day6 = {};

        day0['amount'] = 100;
        day0['num'] = 10;
        week.push(day0);
        day1['amount'] = 150;
        day1['num']= 2;
        week.push(day1);
        day2['amount'] = 20;
        day2['num'] = 170;
        week.push(day2);
        day3['amount'] = 170;
        day3['num'] = 5;
        week.push(day3);
        day4['amount'] = 17;
        day4['num'] = 1;
        week.push(day4);
        day5['amount'] = 0;
        day5['num'] = 1;
        week.push(day5);
        day6['amount'] = 12;
        day6['num'] = 12;
        week.push(day6);



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
                // my code follows up until };
                for (var j = 0; j < 7; j++) {
                    if (body.donations[i].date == today - j) {
                        week[j].amount += body.donations[i].date;                    }            
                        week[j].donations++;
                };
            };

          } else {
            console.log('error');
          }            
        });
    }

    var today = new Date();
    for (var i = 0; i < week.length; i++) {
        week[i].day = today - 7 + i;
    };

    var context = {
        layout: 'dashboard',
        title: "A2Empowerment Dashboard",
        pageTitle: "Dashboard",
        pageSubtitle: "Info at a Glance",
        donationsToday: donationsToday,
        donationsThisWeek: donationsThisWeek,
        amountToday: amountToday,
        amountThisWeek: amountThisWeek,
        week: week,
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
