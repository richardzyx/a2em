/**
 * Created by nicolassempere on 11/1/15.
 */

var bcrypt = require('bcrypt');

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');


module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    //authentication process =================================================
    passport.use('local-login', new LocalStrategy ({

        passReqToCallback: true
    },
    function (req, username, password, done) {

        //query for password with username.
        User.findOne({'username': username}, function(err, user) {

            if (err)
                done(err);
            if (!user)
                done(null, false);
            // asynchronous password comparison
            bcrypt.compare(password, user.password, function (err, res) {

                if (!err) {
                    if (!res)
                        done(null, false);
                    else
                        done(null, user);
                }
            });
        });
    }));

};