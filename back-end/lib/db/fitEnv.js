//merge with db

var ori_config=require("./dbconfig");

var mysql, graylog;

mysql=ori_config.mysql;

if(process.env.NODE_ENV==="formal")
{
    mysql = mysql.formal;
    //graylog=ori_config.graylog.formal;
}else if(process.env.NODE_ENV==="test")
{
    mysql = mysql.test;
    //graylog=ori_config.graylog.test;
}else
{
    mysql = mysql.local;
    //graylog=ori_config.graylog.local;
}

exports.mysql=mysql;
//exports.graylog=graylog;