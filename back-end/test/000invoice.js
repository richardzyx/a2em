var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.should();
var expect = chai.expect;
chai.use(chaiAsPromised);
var httpUtil = require('../lib/util/httpUtil');
var config = require('./config');


describe("invoice",function(){
    var headers = {
        "content-type": "application/json"
    };
    var url1 = "http://"+config.ip+"/api/email/send/invoice";
    var encoding = "utf8";

    it("should return nothing",function(){
        var testdata1={
            "to": "niketan.patel@emory.edu",
            "from": "doesthismatter@asdf.com",
            "subject": "test",
            "body": "testestetsetsetsetset"

        };
        return expect(httpUtil.sendHttpAndParseJSON('GET',url1,headers,testdata1,encoding)).to.eventually.eql("success");
    });
});