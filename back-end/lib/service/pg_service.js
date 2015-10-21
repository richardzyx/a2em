/*
   Created By Jason Zheng on 31/7/2015
* */
var amqpClient=require("node-microservice");
var amqp_url=require("../config/adaptEnv").amqp_url;

amqpClient.connect_amqp(amqp_url);




/*
  查询一个时间区间内表blacklist_query中没有插入表client_company_map的client_name
*info:
 * {
 * time://单位小时
 * }
 * CCM是表client_company_map
 * */
exports.searchNotInCCM=function(info){
    var date1=(new Date()).getTime();
    var hour=parseFloat(info.time);
    if(isNaN(hour))
    {
        return new Promise(function(resolve,reject){
            reject({
                "result":2,
                "message":"参数有误"
            });
        });
    }
    date1-=hour*60*60*1000;
    var date2=new Date(date1);
    //这个sql语句真长。。。。。使用not exists的表连接查询效率优于not in(5倍左右),对client_company_map的主键
    //client_name建索引的话速度会更快
    var sql='SELECT DISTINCT blacklist_query.client_name FROM blacklist_query WHERE create_date>$1 AND  NOT EXISTS '+
            '(SELECT * FROM client_company_map WHERE blacklist_query.client_name=client_company_map.client_name)';
    var obj={
        sql:sql,
        parameter:[date2.toUTCString()]
    }
    return new Promise(function(resolve,reject){
        return amqpClient.send("blt_postgress_service",obj,10000).then(function(results){
            if(results.result==0)
            {
                resolve(results.data);
            }else
            {
                var ret={
                    "result":results.result,
                    "message":results.message
                };
                reject(ret);
            }
        },function(err){
             if("[object String]"===Object.prototype.toString.call(err)&&err.toLowerCase()==="timeout")
             {
                 reject({
                     "result":3,
                     "message":"timeout"
                 });
             }else
             {
                 reject({
                     "result":99,
                     "message":"未知错误"
                 });
             }
        });
    });
}

/*
* info:
* {
*  data:[{client_name:,company:}]
* }
*批量更新client_company_map中的数据
*
* */
exports.updateCCM=function(info)
{
    var sql="UPDATE client_company_map SET company=$1 WHERE client_name=$2;";
    var tasks=info.data.map(function(item){
       var obj={
        "sql":sql,
        "parameter":[item.company,item.client_name]
       };
       return amqpClient.send("blt_postgress_service",obj,10000).then(function(results){
           if(results.result===0)
           {
               return 0;//0表示成功
           }else
           {
               return 1;//1表示失败
           }
       },function(){
            return 1;//1表示失败,超时也认为是失败
       });
  });
    return Promise.all(tasks).then(function(results){
        var ret={
            "result":0,
            "message":"",
            "data":[]
        };
        for(var i=0;i<results.length;i++)//反馈本次更新的结果，并返回未成功的条目
        {
            if(results[i]!==0)
            {
                ret.data.push(info.data[i]);
            }
        }
        if(ret.data.length>0)
        {
            ret.result=4;
            ret.message="成功更新"+(info.data.length-ret.data.length)+"条,失败"+ret.data.length+"条";
        }else
        {
            ret.result=0;
            ret.message="更新成功";
            delete ret.data;
        }
        return ret;
    },function(){

        return {
            "result":99,
            "message":"未知错误"
        };
    });
}
/*
*批量删除符合指定条件的
* info:
* {
*   data:[{client_name:}]
* }
* pg尝试删除不存在的数据不会报错，而是忽略本次操作
* */
exports.deleteFromCCM=function(info)
{
   var sql='DELETE FROM client_company_map WHERE client_name=$1;';
    var tasks=info.data.map(function(item){
            var obj={
                "sql":sql,
                "parameter":[item.client_name]
            };
        return amqpClient.send("blt_postgress_service",obj,10000).then(function(results){
            if(results.result===0)
            {
                return 0;//0表示成功
            }else
            {
                return 1;//1表示失败
            }
        },function(){
            return 1;
        });
    });
    return Promise.all(tasks).then(function(results){
        var ret={
            "result":0,
            "message":"",
            "data":[]
        };
        for(var i=0;i<results.length;i++)
        {
            if(results[i]!==0)
            {
                ret.data.push(info.data[i]);
            }
        }
        if(ret.data.length>0)
        {
            ret.result=4;
            ret.message="成功删除"+(info.data.length-ret.data.length)+"条,失败"+ret.data.length+"条";
        }else
        {
            ret.result=0;
            ret.message="删除成功";
            delete ret.data;
        }
        return ret;
    },function(){
        return {
            "result":99,
            "message":"未知错误"
        };
    });
}
/*
 批量往client_company_map里插入数据
 info:{
  data:[{client_name:,company:}]
 }
* */
exports.insertIntoCCM=function(info)
{
   var sql='INSERT INTO client_company_map (client_name,company) VALUES ($1,$2);';
    var tasks=info.data.map(function(item){
        var obj={
            "sql":sql,
            "parameter":[item.client_name,item.company]
        };
        return amqpClient.send("blt_postgress_service",obj,10000).then(function(results){
            console.log(results);
            if(results.result===0)
            {
                return 0;//0表示成功
            }else
            {
               if(results.result==4&&(results.message.split(":")[1])=="23505")
               {
                   return 2;//违反唯一约束，即表中已经有该项数据
               }else
               {
                   return 1;
               }
            }
        },function(){
            return 1;
        });
    });
    return Promise.all(tasks).then(function(results){
        var ret={
            "result":0,
            "message":"",
            "data":[]
        };
        var additionalMes="";
        for(var i=0;i<results.length;i++)
        {
            if(results[i]!==0)
            {
                if(results[i]===2)
                {
                     additionalMes="";
                }else
                {
                    ret.data.push(info.data[i]);
                }
            }
        }
        if(ret.data.length>0)
        {
            ret.result=4;
            ret.message="成功插入"+(info.data.length-ret.data.length)+"条,失败"+ret.data.length+"条";
        }else
        {
            ret.result=0;
            ret.message="插入成功";
            delete ret.data;
        }
        return ret;
    },function(){
        return {
            "result":99,
            "message":"未知错误"
        };
    });

}
function test()
{
   var obj={
       data:[{"client_name":"ddd"},{"client_name":"ss","company":"fc"}]
   };
    exports.insertIntoCCM(obj).then(function(results){
        console.log(results.message);
    },function(err){
        console.log(err);
    })
}


setTimeout(function(){
    amqpClient.connect_amqp(amqp_url).then(function onFulfilled(){
        test();
    });
},1);