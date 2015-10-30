/**
 * Created by root on 10/22/15.
 */

//Write a function here to use username to get user_id from the user_info table

/*
this function is passed in "req.body.user", and we can match the username to the actual name of the person
by using our sql database, then we just return the actual name.
 */

var mysql_a2em = require('../db/mysql_db').a2em;

exports.name_to_id = function(username){
        return Promise.resolve().then(
            function onFulfilled(){
                var sql = "select id from user_info where name=?"; //select ALL from user_info in our db
                return new Promise(function(resolve,reject){
                    mysql_a2em.query(sql, username, function (err, results) {
                        if (err) {
                            console.error({
                                input : username,
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