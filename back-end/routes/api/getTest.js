/**
 * Created by root on 10/21/15.
 */
"use strict";
var express = require('express');
var router = express.Router();
var mysql_service = require('../../lib/service/getTest/mysql_service');
var recordQuery = require('../../lib/util/recordQuery');

// 1. Check for integrity i.e. user authority, parameters numbers
// 2. Take out the parameters from the req and pack into one object
// 3. Send out to model level and send to mysql service
// 4. get back the result and record the query

// Check if two parameters are passed
router.use('/', function(req, res, next) {
    Promise.resolve().then(
        function onFulfilled() {
            if (!req.body.user || !req.body.group) {// you may also check for user's authenticiation here
                res.json({
                    result: 4,
                    message: "Require two parameters"
                });
            } else {
                next();
            }
        }
    ).catch(function(err){
            //logger.error(err);
            res.json({
                result: 99,
                message: "Unknown Error"
            });
        });
});

// Query for all the user with group not the given number
router.post('/query', function(req, res, next) {
    var options = [];
    Promise.resolve().then(
        function onFulfilled() {
            var group = req.body.group;
            options.push(group);
            return mysql_service.query_allUsers(options);
        }
    ).then(
        function onFulfilled(results) {
            //console.log(results); Uncomment for sseeing the actual results
            var ret = {
                result: 0,
                message: "Success",
                data: results.data
            };

            var service = recordQuery.getServiceName(req.originalUrl);
            var param = options.join();
            var result = JSON.stringify(ret.data);//since it is a log for successful queries only, we only need data field
            var user_id = 1;//Your task will be write a helper function to get user_id from username, file is ready in util
            var timestamp_second = Date.now() / 1000; //give you the seconds since midnight, 1 Jan 1970
            recordQuery.record(service, param, result, user_id, timestamp_second).catch(function(err){
                console.error(err);
            });

            return ret;
        }
    ).catch(function(err){
            var ret={
                "result":0,
                "message":""
            };
            console.error(err.stack);
            if(err.result!==undefined)
            {
                ret.result=err.result;
                ret.message=err.message;
            }else
            {
                ret.result=99;
                ret.message="Unknown Error";
            }
            return ret;
        }).then(function(results){
            res.json(results);
        });
});


module.exports = router;