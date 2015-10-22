

var ori_config=require("./dbconfig");

var mysql, graylog;

mysql=ori_config.mysql;

//if(process.env.NODE_ENV==="formal")
//{
//    amqp_url=ori_config.amqp.formal;
//    graylog=ori_config.graylog.formal;
//}else if(process.env.NODE_ENV==="test")
//{
//    amqp_url=ori_config.amqp.test;
//    graylog=ori_config.graylog.test;
//}else
//{
//    amqp_url=ori_config.amqp.dev;
//    graylog=ori_config.graylog.dev;
//}

exports.mysql=mysql;
//exports.graylog=graylog;