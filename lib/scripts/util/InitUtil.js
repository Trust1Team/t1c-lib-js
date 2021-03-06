"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var semver = require("semver");
var SyncUtil_1 = require("./SyncUtil");
var DSClientModel_1 = require("../core/ds/DSClientModel");
var PubKeyService_1 = require("./PubKeyService");
var CoreExceptions_1 = require("../core/exceptions/CoreExceptions");
var ActivatedContainerUtil_1 = require("./ActivatedContainerUtil");
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
                        var mergedInfo = _this.getMergedInfo(cfg, client.core().infoBrowserSync().data, infoResponse);
                        _this.containerHandler(cfg, infoResponse);
                        if (cfg.gwUrl && !cfg.citrix) {
                            console.log('using gateway: ', cfg.gwUrl);
                            console.log('citrix: ', cfg.citrix);
                            _this.activateAndSync(infoResponse, mergedInfo, client, cfg, resolve, reject);
                        }
                        else {
                            resolve();
                        }
                    }
                    else {
                        reject(new CoreExceptions_1.T1CLibException(400, '301', 'Installed GCL version is not v2 compatible. Please update to a compatible version.', client));
                    }
                }, function (err) {
                    console.error('initializeLibrary - getInfoError', err);
                    client.gclInstalled = false;
                });
            });
            initPromise.then(function () {
                client.admin().getPubKey().then(function (pubKey) {
                    PubKeyService_1.PubKeyService.setPubKey(pubKey.data.device);
                    finalResolve();
                });
            }, function (err) {
                console.log('Initialization error', err);
                finalReject(err);
            });
        });
    };
    InitUtil.containerHandler = function (config, infoResponse) {
        config.activeContainers = config.overrideContainers ? ActivatedContainerUtil_1.ActivatedContainerUtil.getSortedProvidedContainers(config.overrideContainers) : ActivatedContainerUtil_1.ActivatedContainerUtil.getSortedContainers(infoResponse.data.containers);
    };
    InitUtil.activateAndSync = function (infoResponse, mergedInfo, client, config, initResolve, initReject) {
        var activated = infoResponse.data.activated;
        var uuid = infoResponse.data.uid;
        var activationPromise = new Promise(function (resolve, reject) {
            if (activated) {
                resolve();
            }
            else {
                initReject(new CoreExceptions_1.T1CLibException(400, '400', 'Installed GCL is not activated and has no DS to activate', client));
            }
        });
        activationPromise.then(function () {
            client.updateAuthConnection(config);
            initResolve(SyncUtil_1.SyncUtil.unManagedSynchronization(client, mergedInfo, uuid, infoResponse.data.containers, config));
        }, function (err) {
        });
    };
    InitUtil.getMergedInfo = function (config, info, infoResponse) {
        var core_version = infoResponse.data.version;
        var activated = infoResponse.data.activated;
        if (config.dsUrl) {
            var ns = this.extractHostname(config.dsUrl);
            return new DSClientModel_1.DSPlatformInfo(activated, info, core_version, ns);
        }
        else {
            return new DSClientModel_1.DSPlatformInfo(activated, info, core_version);
        }
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
        var sanitized = semver.coerce(version);
        return semver.satisfies(sanitized, '>=2.0.0');
    };
    InitUtil.checkTokenCompatible = function (version) {
        var sanitized = semver.coerce(version);
        return semver.satisfies(sanitized, '>=1.4.0');
    };
    return InitUtil;
}());
exports.InitUtil = InitUtil;
//# sourceMappingURL=InitUtil.js.map