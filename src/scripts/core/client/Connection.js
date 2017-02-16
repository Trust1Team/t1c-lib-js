/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */
///<reference path="../../../../typings/index.d.ts"/>
"use strict";
var axios_1 = require("axios");
var LocalAuthConnection = (function () {
    function LocalAuthConnection(cfg) {
        this.cfg = cfg;
    }
    // using Callback
    LocalAuthConnection.prototype.get = function (url, callback, queryParams) {
        return handleRequest(url, 'GET', callback, undefined, queryParams, undefined, this.cfg.jwt);
    };
    LocalAuthConnection.prototype.post = function (url, body, callback) {
        return handleRequest(url, 'POST', callback, body, undefined, undefined, this.cfg.jwt);
    };
    LocalAuthConnection.prototype.put = function (url, body, callback) {
        return handleRequest(url, 'PUT', callback, body, undefined, undefined, this.cfg.jwt);
    };
    return LocalAuthConnection;
}());
exports.LocalAuthConnection = LocalAuthConnection;
var LocalConnection = (function () {
    function LocalConnection(cfg) {
        this.cfg = cfg;
    }
    LocalConnection.prototype.get = function (url, callback, queryParams) {
        return handleRequest(url, 'GET', callback, undefined, queryParams, undefined, this.cfg.jwt);
    };
    LocalConnection.prototype.post = function (url, body, callback) {
        return handleRequest(url, 'POST', callback, body, undefined, undefined, this.cfg.jwt);
    };
    LocalConnection.prototype.put = function (url, body, callback) {
        return handleRequest(url, 'PUT', callback, body, undefined, undefined, this.cfg.jwt);
    };
    return LocalConnection;
}());
exports.LocalConnection = LocalConnection;
var RemoteConnection = (function () {
    function RemoteConnection(cfg) {
        this.cfg = cfg;
    }
    // using Callback
    RemoteConnection.prototype.get = function (url, callback, queryParams) {
        return handleRequest(url, 'GET', callback, undefined, queryParams, this.cfg.apiKey, undefined);
    };
    RemoteConnection.prototype.post = function (url, body, callback) {
        return handleRequest(url, 'POST', callback, body, undefined, this.cfg.apiKey, undefined);
    };
    RemoteConnection.prototype.put = function (url, body, callback) {
        return handleRequest(url, 'PUT', callback, body, undefined, this.cfg.apiKey, undefined);
    };
    return RemoteConnection;
}());
exports.RemoteConnection = RemoteConnection;
function handleRequest(url, method, callback, body, params, apikey, jwt) {
    var request = {
        url: url,
        method: method,
        headers: {
            'Accept-Language': 'en-US'
        },
        responseType: 'json'
    };
    if (body)
        request['data'] = body;
    if (params) {
        request['params'] = params; //?filter=a,b,c&pin=123456
    }
    if (apikey)
        request.headers['apikey'] = apikey;
    if (jwt)
        request.headers['Authorization'] = 'Bearer ' + jwt;
    axios_1.default.request(request).then(function (response) {
        return callback(null, response.data);
    }).catch(function (error) {
        if (error.response)
            return callback(error.response, null);
        else
            return callback(error, null);
    });
}
