var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) {
    var context = {
        title: "A2Empowerment Dashboard",
        pageTitle: "Dashboard",
        pageSubtitle: "Info at a Glance"
    };
    res.render('main', context);
});

router.get("/login", function (req, res) {

    var context = {
        loginTitle: "A2Empowerment Login",
        email: "Admin email",
        remember: "Remember this user?",
        signIn: "Sign In"
    };
    res.render('login', context);
   // res.sendfile("../startbootstrap-sb-admin-1.0.3/login.html" /*{root: __dirname}*/);
});

module.exports = router;
