"use strict";
exports.__esModule = true;
var semver = require("semver");
var SyncUtil_1 = require("./SyncUtil");
var ActivationUtil_1 = require("./ActivationUtil");
var DSClientModel_1 = require("../core/ds/DSClientModel");
var PubKeyService_1 = require("./PubKeyService");
var CoreExceptions_1 = require("../core/exceptions/CoreExceptions");
var axios_1 = require("axios");
var ActivatedContainerUtil_1 = require("./ActivatedContainerUtil");
var InitUtil = /** @class */ (function () {
    // constructor
    function InitUtil() {
    }
    /**
     * Initializes the library.
     * @param {GCLClient} client
     * @returns {Promise<any>}
     */
    InitUtil.initializeLibrary = function (client) {
        var _this = this;
        return new Promise(function (finalResolve, finalReject) {
            var initPromise = new Promise(function (resolve, reject) {
                var cfg = client.config();
                client.core().info().then(function (infoResponse) {
                    // update config values
                    cfg.citrix = infoResponse.data.citrix;
                    // browser fingerprint compatible?
                    cfg.tokenCompatible = InitUtil.checkTokenCompatible(infoResponse.data.version);
                    cfg.v2Compatible = InitUtil.coreV2Compatible(infoResponse.data.version);
                    if (cfg.v2Compatible) {
                        var mergedInfo = _this.getMergedInfo(cfg, client.core().infoBrowserSync().data, infoResponse);
                        _this.containerHandler(cfg, infoResponse);
                        // triggers activation if needed and syncs
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
                        // installed version is not compatible, reject initialization
                        // return the client in the error so a new version can be downloaded!
                        reject(new CoreExceptions_1.T1CLibException(400, '301', 'Installed GCL version is not v2 compatible. Please update to a compatible version.', client));
                    }
                }, function (err) {
                    console.error('initializeLibrary - getInfoError', err);
                    // failure probably because GCL is not installed
                    client.gclInstalled = false;
                    // check if older GCL version is available at v1 endpoint
                    axios_1["default"].get('https://localhost:10443/v1').then(function (response) {
                        // response received, inform user that he needs to update
                        reject(new CoreExceptions_1.T1CLibException(400, '301', 'Installed GCL version is not v2 compatible. Please update to a compatible version.', client));
                    })["catch"](function () {
                        // no response, no older GCL version installed
                        // return the client in the error so a new version can be downloaded!
                        reject(new CoreExceptions_1.T1CLibException(400, '302', 'No installed GCL component found. Please download and install the GCL.', client));
                    });
                });
            });
            initPromise.then(function () {
                // store device PubKey
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
        // console.log(config.activeContainers);
    };
    InitUtil.activateAndSync = function (infoResponse, mergedInfo, client, config, initResolve, initReject) {
        var activated = infoResponse.data.activated;
        var uuid = infoResponse.data.uid;
        var activationPromise = new Promise(function (resolve, reject) {
            if (activated) {
                resolve();
            }
            else {
                if (config.dsUrl) {
                    resolve(ActivationUtil_1.ActivationUtil.unManagedInitialization(client, mergedInfo, uuid));
                }
                else {
                    initReject(new CoreExceptions_1.T1CLibException(400, '400', 'Installed GCL is not activated and has no DS to activate', client));
                }
            }
        });
        activationPromise.then(function () {
            // update core service
            client.updateAuthConnection(config);
            initResolve(SyncUtil_1.SyncUtil.unManagedSynchronization(client, mergedInfo, uuid, infoResponse.data.containers, config));
        }, function (err) {
            // initReject(err);
            // resolve(SyncUtil.unManagedSynchronization(client.admin(), client.ds(), cfg, mergedInfo, uuid));
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
        // find & remove protocol (http, ftp, etc.) and get hostname
        if (url.indexOf('://') > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }
        // find & remove port number
        hostname = hostname.split(':')[0];
        // find & remove "?"
        hostname = hostname.split('?')[0];
        return hostname;
    };
    InitUtil.coreV2Compatible = function (version) {
        // sanitize version string
        var sanitized = semver.coerce(version);
        return semver.satisfies(sanitized, '>=2.0.0');
    };
    InitUtil.checkTokenCompatible = function (version) {
        // sanitize version string
        var sanitized = semver.coerce(version);
        return semver.satisfies(sanitized, '>=1.4.0');
    };
    return InitUtil;
}());
exports.InitUtil = InitUtil;
