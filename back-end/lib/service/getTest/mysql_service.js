/**
 * Created by root on 10/22/15.
 */

//import the sql db
var mysql_a2em = require('../../db/mysql_db').a2em;

exports.query_allUsers = function(options){ //use the list of users that were passed in via post on '/query'
    return Promise.resolve().then(
        function onFulfilled(){
            var sql = "select * from user_info where user_group !=?"; //select ALL from user_info in our db
            return new Promise(function(resolve,reject){
                mysql_a2em.query(sql, options, function (err, results) {
                    if (err) {
                        console.error({
                            input : options,
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
        }
    ).catch(function(err){
        console.error(err.stack);
        if(err.result){
            return {
                result:err.result,
                message:err.message
            }
        }
        else{
            return {
                result:99,
                message:"Unknown Error"
            }
        }
    }).then(function(result){
        //console.log("response successfully"); Uncomment for debugging
        return result;
    });
};