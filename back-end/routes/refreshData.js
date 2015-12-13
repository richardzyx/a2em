///**
// * Created by root on 12/3/15.
// */
//var httpUtil = require('../lib/util/httpUtil');
//
//var headers = {
//    "content-type": "application/json",
//};
//var url1 = "https://api-3t.paypal.com/nvp";
//var encoding = "utf8";
//
//var testdata1={
//        "body":{"USER":"a2empowerment_api1.gmail.com","PWD":"YRGMXNSYEF5ZNJX8&SIGNATURE=AFcWxV21C7fd0v3bYYYRCpSSRl31A5jy3g1Rm55XlXWK45AQ2Bb9qVds",
//        "METHOD":"TransactionSearch", "VERSION":"78","TRXTYPE":"Q","STARTDATE":"2011-01-01T0:0:0","ENDDATE":"2015-01-03T24:0:0"}//JSON format with quotes on every term
//    };
//
//function test_fun() {
//    Promise.resolve().then(
//        function onFulfilled() {
//            return httpUtil.sendHttpsAndParseJSON('POST', url1, headers, testdata1.body, encoding);
//        }
//    ).then(
//        function onFulfilled(results){
//            console.log(results);
//        },
//        function onRej(err){
//            console.log(err);
//        }
//    )
//}
//
//test_fun();