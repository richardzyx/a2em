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
    var url1 = "http://"+config.ip+"/api/gettest/query";
    var encoding = "utf8";

    it("should return two users' information",function(){
        var testdata1={
            "body":{"user":"test1","group":"0"},//JSON format with quotes on every term
            "result":{"result":0,"message":"Success","data":[{"id":3,"name":"bad guy","password":"iambad","user_group":1,"register_time":"2015-10-22T03:59:28.000Z"},
                                {"id":4,"name":"bad guy 2","password":"iambad","user_group":1,"register_time":"2015-10-22T03:59:28.000Z"}]}
        };
        return expect(httpUtil.sendHttpAndParseJSON('POST',url1,headers,testdata1.body,encoding)).to.eventually.eql(testdata1.result);
    });

    it("should require two parameters",function(){
        var testdata1={
            "body":{"group":"1"},
            "result":{result:4,message:"Require two parameters"}//This is a JavaScript object
        };
        return expect(httpUtil.sendHttpAndParseJSON('POST',url1,headers,testdata1.body,encoding)).to.eventually.eql(testdata1.result);
    });
});