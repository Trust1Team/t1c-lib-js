import * as semver from 'semver';
import { SyncUtil } from './SyncUtil';
import { DSPlatformInfo } from '../core/ds/DSClientModel';
import { PubKeyService } from './PubKeyService';
import { T1CLibException } from '../core/exceptions/CoreExceptions';
import { ActivatedContainerUtil } from './ActivatedContainerUtil';
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
                        reject(new T1CLibException(400, '301', 'Installed GCL version is not v2 compatible. Please update to a compatible version.', client));
                    }
                }, function (err) {
                    console.error('initializeLibrary - getInfoError', err);
                    client.gclInstalled = false;
                });
            });
            initPromise.then(function () {
                client.admin().getPubKey().then(function (pubKey) {
                    PubKeyService.setPubKey(pubKey.data.device);
                    finalResolve();
                });
            }, function (err) {
                console.log('Initialization error', err);
                finalReject(err);
            });
        });
    };
    InitUtil.containerHandler = function (config, infoResponse) {
        config.activeContainers = config.overrideContainers ? ActivatedContainerUtil.getSortedProvidedContainers(config.overrideContainers) : ActivatedContainerUtil.getSortedContainers(infoResponse.data.containers);
    };
    InitUtil.activateAndSync = function (infoResponse, mergedInfo, client, config, initResolve, initReject) {
        var activated = infoResponse.data.activated;
        var uuid = infoResponse.data.uid;
        var activationPromise = new Promise(function (resolve, reject) {
            if (activated) {
                resolve();
            }
            else {
                initReject(new T1CLibException(400, '400', 'Installed GCL is not activated and has no DS to activate', client));
            }
        });
        activationPromise.then(function () {
            client.updateAuthConnection(config);
            initResolve(SyncUtil.unManagedSynchronization(client, mergedInfo, uuid, infoResponse.data.containers, config));
        }, function (err) {
        });
    };
    InitUtil.getMergedInfo = function (config, info, infoResponse) {
        var core_version = infoResponse.data.version;
        var activated = infoResponse.data.activated;
        if (config.dsUrl) {
            var ns = this.extractHostname(config.dsUrl);
            return new DSPlatformInfo(activated, info, core_version, ns);
        }
        else {
            return new DSPlatformInfo(activated, info, core_version);
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
export { InitUtil };
//# sourceMappingURL=InitUtil.js.map