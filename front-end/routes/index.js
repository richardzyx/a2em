var express = require('express');
<<<<<<< HEAD
var passport = require('passport');
=======
>>>>>>> 843ecd7fcc3f3864212cdd71781df03f063211f5
var router = express.Router();
//var request = require('request');

var debug = true;
var backendURL = '/api/get';

/* GET home page. */


router.get('/', function(req, res, next) {

<<<<<<< HEAD
//set sticker values
=======
    //set sticker values
>>>>>>> 843ecd7fcc3f3864212cdd71781df03f063211f5
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
<<<<<<< HEAD
        //change backend url to specific query
=======
>>>>>>> 843ecd7fcc3f3864212cdd71781df03f063211f5
        request(backendURL, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body); // Show the HTML for the Google homepage.
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
<<<<<<< HEAD
                        week[j].amount += body.donations[i].date;
                    }
                        week[j].donations++;
                }
            }
=======
                        week[j].amount += body.donations[i].date;                    }            
                        week[j].donations++;
                };
            };
>>>>>>> 843ecd7fcc3f3864212cdd71781df03f063211f5

          } else {
            console.log('error');
          }            
        });
    }

    var today = new Date();
    for (var i = 0; i < week.length; i++) {
        week[i].day = today - 7 + i;
<<<<<<< HEAD
    }
=======
    };
>>>>>>> 843ecd7fcc3f3864212cdd71781df03f063211f5

    var context = {
        layout: 'dashboard',
        title: "A2Empowerment Dashboard",
        pageTitle: "Dashboard",
        pageSubtitle: "Info at a Glance",
        donationsToday: donationsToday,
        donationsThisWeek: donationsThisWeek,
        amountToday: amountToday,
        amountThisWeek: amountThisWeek,
        week: week
    };
    res.render('main', context);
});

<<<<<<< HEAD

router.get('/profile/:id?', function (req, res) {

    //donation fields: amount, time, date, flag
    var address, zip, email, first_name, last_name;
    var donations = [];

    if (debug) {
        address = "This St., This place";
        zip = "12345";
        email = "bob@hello.com";
        first_name = "John";
        last_name = 'Smith';
        
        var donation1 = {};
        donation1.amount = 100;
        var now = new Date();
        donation1.date = now.toDateString();
        donation1.time = now.toLocaleTimeString();
        donation1.flag = "YO";

        donations.push(donation1);
    } else {
        request(backendURL + 'person' + req.param.id, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var donation1 = {};
                donation1.amount = body.amount;
                donation1.time = body.time;
                donation1.date = body.date;
                donation.flag = body.flag;

                donations.push(donation1);
            }
        });
    }

    var fullname = first_name + ' ' + last_name;

    var context = {
        layout: 'profile',
        title: "Donor Profile",
        pageTitle: fullname,
        personAddress: address,
        personZip: zip,
        personEmail: email,
        personName: fullname,
        personDonations: donations

    };
    res.render('profile', context);

    });


// Login setup ==============================================
=======
>>>>>>> 843ecd7fcc3f3864212cdd71781df03f063211f5
router.get("/login", function (req, res) {

    var context = {
        layout: "login.hbs",
<<<<<<< HEAD
        loginTitle: "A2Empowerment",
        email: "Admin email",
        remember: "Remember this user?",
        signIn: "Sign In",
        message: req.flash("loginMessage")
    };

    res.render('login.hbs', context);
});


router.post('/login', passport.authenticate('local-login', {

    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));


//should end session and serve up login form
router.get('/logout', function (req, res) {

    req.logout();
    res.redirect('/login');
=======
        loginTitle: "A2Empowerment Login",
        email: "Admin email",
        remember: "Remember this user?",
        signIn: "Sign In"
    };
    res.render('login.hbs', context);
   // res.sendfile("../startbootstrap-sb-admin-1.0.3/login.html" /*{root: __dirname}*/);
>>>>>>> 843ecd7fcc3f3864212cdd71781df03f063211f5
});

module.exports = router;


/* Sample Request
request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
}) */
