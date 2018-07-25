"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var semver = require("semver");
var SyncUtil_1 = require("./SyncUtil");
var ActivationUtil_1 = require("./ActivationUtil");
var DSClientModel_1 = require("../core/ds/DSClientModel");
var PubKeyService_1 = require("./PubKeyService");
var CoreExceptions_1 = require("../core/exceptions/CoreExceptions");
var axios_1 = require("axios");
var InitUtil = (function () {
    function InitUtil() {
    }
    InitUtil.initializeLibrary = function (client) {
        var _this = this;
        return new Promise(function (finalResolve, finalReject) {
            var initPromise = new Promise(function (resolve, reject) {
                var cfg = client.config();
                client.core().info().then(function (infoResponse) {
                    cfg.citrix = infoResponse.data.citrix;
                    cfg.tokenCompatible = InitUtil.checkTokenCompatible(infoResponse.data.version);
                    cfg.v2Compatible = InitUtil.coreV2Compatible(infoResponse.data.version);
                    if (cfg.v2Compatible) {
                        var activated = infoResponse.data.activated;
                        var core_version = infoResponse.data.version;
                        var uuid_1 = infoResponse.data.uid;
                        var ns = _this.extractHostname(cfg.dsUrl);
                        var info = client.core().infoBrowserSync();
                        var mergedInfo_1 = new DSClientModel_1.DSPlatformInfo(activated, info.data, core_version, ns);
                        var activationPromise = void 0;
                        if (activated) {
                            activationPromise = Promise.resolve();
                        }
                        else {
                            activationPromise = ActivationUtil_1.ActivationUtil.unManagedInitialization(client, mergedInfo_1, uuid_1);
                        }
                        activationPromise.then(function () {
                            client.updateAuthConnection(cfg);
                            resolve(SyncUtil_1.SyncUtil.unManagedSynchronization(client, mergedInfo_1, uuid_1, infoResponse.data.containers));
                        }, function (err) {
                            reject(err);
                        });
                    }
                    else {
                        reject(new CoreExceptions_1.RestException(400, '301', 'Installed GCL version is not v2 compatible. Please update to a compatible version.', client));
                    }
                }, function () {
                    client.gclInstalled = false;
                    axios_1.default.get('https://localhost:10443/v1').then(function (response) {
                        reject(new CoreExceptions_1.RestException(400, '301', 'Installed GCL version is not v2 compatible. Please update to a compatible version.', client));
                    }).catch(function () {
                        reject(new CoreExceptions_1.RestException(400, '302', 'No installed GCL component found. Please download and install the GCL.', client));
                    });
                });
            });
            initPromise.then(function () {
                client.admin().getPubKey().then(function (pubKey) {
                    PubKeyService_1.PubKeyService.setPubKey(pubKey.data.device);
                    finalResolve();
                });
            }, function (err) {
                finalReject(err);
            });
        });
    };
    InitUtil.extractHostname = function (url) {
        var hostname;
        if (url.indexOf('://') > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }
        hostname = hostname.split(':')[0];
        hostname = hostname.split('?')[0];
        return hostname;
    };
    InitUtil.coreV2Compatible = function (version) {
        var sanitized = _.split(version, '-')[0];
        return semver.satisfies(sanitized, '>=2.0.0');
    };
    InitUtil.checkTokenCompatible = function (version) {
        var sanitized = _.split(version, '-')[0];
        return semver.satisfies(sanitized, '>=1.4.0');
    };
    return InitUtil;
}());
exports.InitUtil = InitUtil;
//# sourceMappingURL=InitUtil.js.map