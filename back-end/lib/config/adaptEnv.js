/*
* Created by Jason Zheng at 30/7/2015
* adapt the environment
* */

var config=require("./config");
var config_data;
if(process.env.NODE_ENV==="formal")
{
     config_data=config.formal;
}else
{
    if(process.env.NODE_ENV==="test")
    {
        config_data=config.test;
    }else
    {
        config_data=config.dev;
    }
};

module.exports=config_data;