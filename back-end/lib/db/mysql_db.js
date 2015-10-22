var mysql_config=require("./fitEnv").mysql;
var mysql=require("mysql");

var a2em = mysql.createPool(mysql_config);

exports.a2em = a2em;