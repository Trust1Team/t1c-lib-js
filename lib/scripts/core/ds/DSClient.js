"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SEPARATOR = '/';
const SECURITY = '/security';
const SYS_INFO = '/system/status';
const DOWNLOAD = '/download/gcl';
const PUB_KEY = SECURITY + '/keys/public';
const DEVICE = '/devices';
class DSClient {
    constructor(url, connection, cfg) {
        this.url = url;
        this.connection = connection;
        this.cfg = cfg;
    }
    getUrl() {
        return this.url;
    }
    getInfo(callback) {
        return this.connection.get(this.url, SYS_INFO, undefined, undefined, callback);
    }
    getDevice(uuid, callback) {
        return this.connection.get(this.url, DEVICE + SEPARATOR + uuid, undefined, undefined, callback);
    }
    getPubKey(uuid, callback) {
        return this.connection.get(this.url, PUB_KEY + SEPARATOR + uuid, undefined, undefined, callback);
    }
    downloadLink(downloadData, callback) {
        let self = this;
        if (callback) {
            doGetDownloadLink();
        }
        else {
            return new Promise((resolve, reject) => {
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
                    let returnObject = { url: data.link, success: true };
                    if (callback) {
                        return callback(null, returnObject);
                    }
                    else {
                        return resolve(returnObject);
                    }
                }
            });
        }
    }
    register(registrationData, callback) {
        return this.connection.put(this.url, DEVICE + SEPARATOR + registrationData.uuid, registrationData, undefined, undefined, callback);
    }
    sync(syncData, callback) {
        return this.connection.post(this.url, DEVICE + SEPARATOR + syncData.uuid, syncData, undefined, undefined, callback);
    }
}
exports.DSClient = DSClient;
//# sourceMappingURL=DSClient.js.map