/**
 * Created by nicolassempere on 11/1/15.
 */

var bcrypt = require('bcrypt');

//var localStrategy = require('passport-local');
//var oAuthStrategy = require('passport-oauth');



/* Sql scheme expectations:

    {
        username:
        pass TEX
        token CHAR (maybe INTEGER)

    };

    - The password needs to be stored as a string since we are storing hashed values.
    - When not in a live session, the user's token will be stored as nil. Otherwise, it will maintain a value
      and check for that value with every request for data.
 */

var saltLength = 10;

//This is for password STORAGE
function bcryptHash (pass, callback) {

    bcrypt.genSalt(saltLength, function (err, salt) {

        if (!err)
            bcrypt.hash(pass, salt, callback);
    });
}



bcryptHash('password', function (err, hash) {

    bcrypt.compare('password', hash, function (err, res) {

        if (!err) {
            if (res)
                console.log("yoyoyoyoyoyo");
        }
    })
});

