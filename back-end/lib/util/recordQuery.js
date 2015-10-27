/**
 * Created by root on 10/22/15.
 */
var URL = require('url');
var mysql_a2em = require('../db/mysql_db').a2em;

//Update your service here as a checklist
var service_map = {
    "/api/gettest/query": "getTest"
};

exports.getServiceName = function (url) {
    var pathname = URL.parse(url).pathname;
    if(pathname[pathname.length-1]=='/'){
        pathname=pathname.substring(0, pathname.length-1);
    }
    return (service_map[pathname]);
};

exports.record = function (service, param, result, user_id, timestamp_second){
    var options = [];
    var sql = "insert into user_query set service=?, param=?, result=?, user_id=?, timestamp_second=?";
    options.push(service, param, result, user_id, timestamp_second);
    return new Promise(function(resolve,reject){
        mysql_a2em.query(sql, options, function (err, results) {
            if (err) {
                console.error({
                    input : data,
                    error : err
                });
                reject({
                    "result" : 4,
                    "message" : "Incorrect MySQL Instruction" + err.code
                });
            } else {
                resolve({
                    "result" : 0,
                    "message" : "Success",
                    "data" : results
                });
            }
        });
    });
};