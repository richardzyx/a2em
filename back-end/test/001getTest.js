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


describe("firstName",function(){
    var headers = {
        "content-type": "application/json"
    };
    var url1 = "http://"+config.ip+"/api_test/lastname/firstname/query";
    var encoding = "utf8";

    it("should return two users' information",function(){
        var testdata1={
            "body":{"user":"bad guy"},//JSON format with quotes on every term
            "result":{"result":0,"message":"Success","data":3}
        };
        return expect(httpUtil.sendHttpAndParseJSON('POST',url1,headers,testdata1.body,encoding)).to.eventually.eql(testdata1.result);
    });

    it.skip("should require two parameters",function(){
        var testdata1={
            "body":{"group":"1"},
            "result":{result:4,message:"Require two parameters"}//This is a JavaScript object
        };
        return expect(httpUtil.sendHttpAndParseJSON('POST',url1,headers,testdata1.body,encoding)).to.eventually.eql(testdata1.result);
    });
});