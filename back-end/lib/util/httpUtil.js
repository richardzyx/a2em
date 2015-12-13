/**
 * Created by root on 10/21/15.
 */
var http = require('http');
var https = require('https');
var URL = require('url');
var _ = require('underscore');
var timeoutMillisecond = 10000;
var logger=console;

exports.sendHttp = function(method, url, headers, body, encoding) {
    return new Promise(function(resolve, reject) {
        var options = URL.parse(url);
        options.method = method;
        options.headers = headers;
        var req = http.request(options, function (res) {
            res.setEncoding(encoding);
            var chunk = "";
            res.on('data', function (d) {
                chunk += d;
            });
            res.on('end', function () {
                resolve(chunk);
            });
        });
        req.setTimeout(timeoutMillisecond, function(err){
            logger.fatal("Time Out Error");
            reject(err);
        });
        req.on('error', function(err){
            reject(err);
        });
        if((typeof body)==="object"){
            req.write(JSON.stringify(body));
        }
        else{
            req.write(body);//string
        }
        req.end();
    });
};

exports.sendHttpAndParseJSON = function(method, url, headers, body, encoding) {
    return new Promise(function(resolve, reject) {
        var options = URL.parse(url);
        options.method = method;
        options.headers = headers;
        var req = http.request(options, function (res) {
            res.setEncoding(encoding);
            var chunk = "";
            res.on('data', function (d) {
                chunk += d;
            });
            res.on('end', function () {
                try{
                    resolve(JSON.parse(chunk));
                }
                catch(err){
                    reject(err);
                }
            });
        });
        if((typeof body)==="object"){
            req.write(JSON.stringify(body));
        }
        else{
            req.write(body);//string
        }
        req.end();
    });
};

exports.sendHttps = function(method, url, headers, body, encoding) {
    return new Promise(function(resolve, reject) {
        var options = URL.parse(url);
        options.method = method;
        options.headers = headers;
        options.rejectUnauthorized = false;
        var req = https.request(options, function (res) {
            res.setEncoding(encoding);
            var chunk = "";
            res.on('data', function (d) {
                chunk += d;
            });
            res.on('end', function () {
                resolve(chunk);
            });
        });
        req.setTimeout(timeoutMillisecond, function(err){
            logger.error("Time Out Error");
            reject(err);
        });
        req.on('error', function(err){
            reject(err);
        });
        if((typeof body)==="object"){
            req.write(JSON.stringify(body));
        }
        else{
            req.write(body);//string
        }
        req.end();
    });
};

exports.sendHttpsAndParseJSON = function(method, url, headers, body, encoding) {
    return new Promise(function(resolve, reject) {
        var options = URL.parse(url);
        options.method = method;
        options.headers = headers;
        options.rejectUnauthorized = false;
        var req = https.request(options, function (res) {
            res.setEncoding(encoding);
            var chunk = "";
            res.on('data', function (d) {
                chunk += d;
            });
            res.on('end', function () {
                try{
                    resolve(chunk);
                }
                catch(err){
                    reject(err);
                }
            });
        });
        if((typeof body)==="object"){
            req.write(JSON.stringify(body));
        }
        else{
            req.write(body);//string
        }
        req.end();
    });
};