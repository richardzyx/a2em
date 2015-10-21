/**
 * Created by root on 10/21/15.
 */
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.should();
var expect = chai.expect;
chai.use(chaiAsPromised);
var httpUtil = require('../lib/util/httpUtil');
var config = require('./config');


describe("getTest",function(){
    var headers = {
        "content-type": "application/json"
    };
    var url1 = "https://"+config.ip+"/api/getTest/query";
    var encoding = "utf8";

    it("should have a normal return with two parameters",function(){
        var testdata1={
            "body":{"name":"test","phone":"13401171072"},
            "result":{"result":0,"message":"请求成功","matches":{"countNum":1,"organNum":1,"earlyDate":5}}
        };
        return expect(httpUtil.sendHttpsAndParseJSON('POST',url1,headers,testdata1.body,encoding)).to.eventually.eql(testdata1.result);
    });
    //一个参数正常返回
    it("should have a normal return with one parameter",function(){
        var testdata2={
            "body":{"phone":"13401171072"},
            "result":{"result":0,"message":"请求成功","matches":{"countNum":3,"organNum":1,"earlyDate":5}}
        };
        return expect(httpUtil.sendHttpsAndParseJSON('POST',url1,headers,testdata2.body,encoding)).to.eventually.eql(testdata2.result);
    });
    //无参数正常返回
    it.skip("should have a normal return with zero parameter",function(){
        var testdata3={
            "body":{},
            "result":{"result":2,"message":"查询信息不足"}
        };
        return expect(httpUtil.sendHttpsAndParseJSON('POST',url1,headers,testdata3.body,encoding)).to.eventually.eql(testdata3.result);
    });

});