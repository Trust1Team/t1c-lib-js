/**
 * @author Maarten Casteels
 * @since 2016
 */
var es6_promise_1 = require('es6-promise');
var Connection = (function () {
    function Connection(config) {
        this.config = config;
    }
    Connection.prototype.request = function (method, url, body) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 200) {
                        if (xmlHttp.responseText && xmlHttp.responseText.length > 0) {
                            resolve(JSON.parse(xmlHttp.responseText));
                        }
                        else {
                            resolve('');
                        }
                    }
                    else {
                        reject(JSON.parse(xmlHttp.responseText));
                    }
                }
            };
            xmlHttp.onerror = function (e) {
                reject(e);
            };
            xmlHttp.open(method, url, true); // true for asynchronous
            if (method === 'POST') {
                xmlHttp.setRequestHeader('Content-Type', 'application/json');
            }
            xmlHttp.send(body);
        });
    };
    ;
    Connection.prototype.get = function (url, body) {
        return this.request('GET', url, body || '');
    };
    ;
    Connection.prototype.post = function (url, body) {
        return this.request('POST', url, body || '');
    };
    ;
    return Connection;
})();
exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map