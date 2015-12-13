/**
 * Created by root on 12/13/15.
 */
"use strict";
var express = require('express');
var router = express.Router();
var mysql_service = require('../../lib/service/getDonation/mysql_service');

router.get('/query', function(req, res, next) {    //pass mysql_Service the list of users accessing the server
    var options = [];
    Promise.resolve().then(
        function onFulfilled() {
            //var group = req.body.group;
            //options.push(group);
            return mysql_service.query_allDonations();
        }
    ).then(
        function onFulfilled(results) {
            //console.log(results); //Uncomment for seeing the actual results
            var ret = {
                result: 0,
                message: "Success",
                data:results.data
            };

            //var service = recordQuery.getServiceName(req.originalUrl);
            //var param = options.join();
            //var result = JSON.stringify(ret.data);//since it is a log for successful queries only, we only need data field
            //
            //var user_id = results[1].data[0].id;//TODO: Try tell me WTF is this
            //
            //var timestamp_second = Date.now() / 1000; //give you the seconds since midnight, 1 Jan 1970
            //recordQuery.record(service, param, result, user_id, timestamp_second).catch(function(err){
            //    console.error(err);
            //});

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