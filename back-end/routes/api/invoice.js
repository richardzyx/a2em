/**
 * Created by root on 10/21/15.
 */
"use strict";
var express = require('express');
var router = express.Router();
var sendgrid = require('sendgrid')("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");


router.get('/', function(req, res, next) {
    var contents = req;

    if (!contents.to || !contents.from || !contents.subject || !contents.body) {
        res.json({
           message: "Error. Invalid parameters."
        });
    } else {
        sendgrid.send({
            to: contents["to"],
            from: contents["from"],
            subject: contents["subject"],
            body: contents["body"]
            //files: gotta figure this out....
        }, function(err, json) {
            if (err) {
                return console.error(err);
            }
            if (!err) {
                return "success";
            }
        });
    }
});

module.exports = router;