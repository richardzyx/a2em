var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var flash = require("connect-flash");

//authentication database
var mongoose = require('mongoose');

var debugURL = 'mongodb://localhost:27017/test';

mongoose.connect(debugURL);

//passport config
var passport = require('passport');

//pass the "passport" variable into the function that the require function returns
require('./config/passport.js')(passport);
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/layouts/'));
app.engine('hbs', expressHbs({
                    extname:'hbs',
                    defaultLayout: 'main',
                    partialsDir: ['views/partials']
                    })); //all partials are registered

app.set('view engine', 'hbs');


//login session config
app.use(session({secret: "you're not my supervisor"}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//static files
app.use('/static', express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
    // is there a smarter way to do this?
    if (req.path.match(/\/login[Fail]*/g) || req.isAuthenticated())
        return next();

    res.redirect("/login");
});


app.use('/', routes);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
//TODO

module.exports = app;
