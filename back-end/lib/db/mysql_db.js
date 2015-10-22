/*
   Created by Jason Zheng at 2015/7/17
*/

var mysql_config=require("./fitEnv").mysql;
var mysql=require("mysql");

var a2em = mysql.createPool(mysql_config.a2em);

exports.a2em = a2em;