/**
 * Created by root on 10/21/15.
 */
"use strict";
var express = require('express');
var router = express.Router();
var sendgrid = require('sendgrid')("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");

//check for email contents to be passed in
router.get('/', function(req, res, next) {
    var email = req.body;

   Promise.resolve().then(
       function onFulfilled() {
           if (!req.body.to || !req.body.from || !req.body.subject || !req.body.content) {
               res.json({
                   result: 4,
                   message: "Require two parameters"
               });
           } else {
               //continue
           }
       }
   ).then(
       sendgrid.send({
           to:email["to"],
           from:email["from"],
           subject:email["subject"],
           body:email["body"]
       }, function(err, json) {
               if (err) {
                   return console.error(err);
               } else {
                   return "success";
               }
          })
    ).catch(function(err) {
          res.json({
              result: 99,
              message: "Unknown Error"
          });
       });
});