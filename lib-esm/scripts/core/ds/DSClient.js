var SEPARATOR = '/';
var SECURITY = '/security';
var SYS_INFO = '/system/status';
var DOWNLOAD = '/download/gcl';
var PUB_KEY = SECURITY + '/keys/public';
var DEVICE = '/devices';
var DSClient = (function () {
    function DSClient(url, connection, cfg) {
        this.url = url;
        this.connection = connection;
        this.cfg = cfg;
    }
    DSClient.namespaceFilter = function (gwurl) {
        var hostname;
        if (gwurl.indexOf('//') > -1) {
            hostname = gwurl.split('/')[2];
        }
        else {
            hostname = gwurl.split('/')[0];
        }
        hostname = hostname.split(':')[0];
        hostname = hostname.split('?')[0];
        return { namespace: hostname };
    };
    DSClient.prototype.getUrl = function () {
        return this.url;
    };
    DSClient.prototype.getInfo = function (callback) {
        return this.connection.get(this.url, SYS_INFO, undefined, undefined, callback);
    };
    DSClient.prototype.getDevice = function (uuid, callback) {
        return this.connection.get(this.url, DEVICE + SEPARATOR + uuid, undefined, undefined, callback);
    };
    DSClient.prototype.getPubKey = function (uuid, callback) {
        if (this.cfg.gwUrl) {
            return this.connection.get(this.url, PUB_KEY + SEPARATOR + uuid, DSClient.namespaceFilter(this.cfg.gwUrl), undefined, callback);
        }
        else {
            return this.connection.get(this.url, PUB_KEY + SEPARATOR + uuid, undefined, undefined, callback);
        }
    };
    DSClient.prototype.downloadLink = function (downloadData, callback) {
        var self = this;
        if (callback) {
            doGetDownloadLink();
        }
        else {
            return new Promise(function (resolve, reject) {
                doGetDownloadLink(resolve, reject);
            });
        }
        function doGetDownloadLink(resolve, reject) {
            self.connection.post(self.url, DOWNLOAD, downloadData, undefined, undefined, function (err, data) {
                if (err) {
                    if (callback) {
                        return callback(err, null);
                    }
                    else {
                        reject(err);
                    }
                }
                else {
                    var returnObject = { url: data.link, success: true };
                    if (callback) {
                        return callback(null, returnObject);
                    }
                    else {
                        return resolve(returnObject);
                    }
                }
            });
        }
    };
    DSClient.prototype.register = function (registrationData, callback) {
        return this.connection.put(this.url, DEVICE + SEPARATOR + registrationData.uuid, registrationData, undefined, undefined, callback);
    };
    DSClient.prototype.sync = function (syncData, callback) {
        return this.connection.post(this.url, DEVICE + SEPARATOR + syncData.uuid, syncData, undefined, undefined, callback);
    };
    return DSClient;
}());
export { DSClient };
//# sourceMappingURL=DSClient.js.map