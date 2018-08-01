"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const semver = require("semver");
const SyncUtil_1 = require("./SyncUtil");
const ActivationUtil_1 = require("./ActivationUtil");
const DSClientModel_1 = require("../core/ds/DSClientModel");
const PubKeyService_1 = require("./PubKeyService");
const CoreExceptions_1 = require("../core/exceptions/CoreExceptions");
const axios_1 = require("axios");
const ActivatedContainerUtil_1 = require("./ActivatedContainerUtil");
class InitUtil {
    constructor() {
    }
    static initializeLibrary(client) {
        return new Promise((finalResolve, finalReject) => {
            let initPromise = new Promise((resolve, reject) => {
                let cfg = client.config();
                client.core().info().then(infoResponse => {
                    cfg.citrix = infoResponse.data.citrix;
                    cfg.tokenCompatible = InitUtil.checkTokenCompatible(infoResponse.data.version);
                    cfg.v2Compatible = InitUtil.coreV2Compatible(infoResponse.data.version);
                    if (cfg.v2Compatible) {
                        let mergedInfo = this.getMergedInfo(cfg, client.core().infoBrowserSync().data, infoResponse);
                        this.containerHandler(cfg, infoResponse);
                        if (cfg.gwUrl) {
                            this.activateAndSync(infoResponse, mergedInfo, client, cfg, resolve, reject);
                        }
                    }
                    else {
                        reject(new CoreExceptions_1.T1CLibException(400, '301', 'Installed GCL version is not v2 compatible. Please update to a compatible version.', client));
                    }
                }, (err) => {
                    console.error('initializeLibrary - getInfoError', err);
                    client.gclInstalled = false;
                    axios_1.default.get('https://localhost:10443/v1').then((response) => {
                        reject(new CoreExceptions_1.T1CLibException(400, '301', 'Installed GCL version is not v2 compatible. Please update to a compatible version.', client));
                    }).catch(() => {
                        reject(new CoreExceptions_1.T1CLibException(400, '302', 'No installed GCL component found. Please download and install the GCL.', client));
                    });
                });
            });
            initPromise.then(() => {
                client.admin().getPubKey().then(pubKey => {
                    PubKeyService_1.PubKeyService.setPubKey(pubKey.data.device);
                    finalResolve();
                });
            }, err => {
                console.log('Initialization error', err);
                finalReject(err);
            });
        });
    }
    static containerHandler(config, infoResponse) {
        if (!config.dsUrl && config.overrideContainers) {
            config.activeContainers = ActivatedContainerUtil_1.ActivatedContainerUtil.getSortedProvidedContainers(config.overrideContainers);
        }
        else if (!config.dsUrl && !config.overrideContainers) {
            config.activeContainers = ActivatedContainerUtil_1.ActivatedContainerUtil.getSortedContainers(infoResponse.data.containers);
        }
    }
    static activateAndSync(infoResponse, mergedInfo, client, config, initResolve, initReject) {
        const activated = infoResponse.data.activated;
        const uuid = infoResponse.data.uid;
        let activationPromise = new Promise((resolve, reject) => {
            if (!config.dsUrl && activated) {
                resolve();
            }
            else {
                resolve(ActivationUtil_1.ActivationUtil.unManagedInitialization(client, mergedInfo, uuid));
            }
        });
        activationPromise.then(() => {
            client.updateAuthConnection(config);
            initResolve(SyncUtil_1.SyncUtil.unManagedSynchronization(client, mergedInfo, uuid, infoResponse.data.containers));
        }, err => {
        });
    }
    static getMergedInfo(config, info, infoResponse) {
        const core_version = infoResponse.data.version;
        const activated = infoResponse.data.activated;
        if (config.dsUrl) {
            let ns = this.extractHostname(config.dsUrl);
            return new DSClientModel_1.DSPlatformInfo(activated, info, core_version, ns);
        }
        else {
            return new DSClientModel_1.DSPlatformInfo(activated, info, core_version);
        }
    }
    static extractHostname(url) {
        let hostname;
        if (url.indexOf('://') > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }
        hostname = hostname.split(':')[0];
        hostname = hostname.split('?')[0];
        return hostname;
    }
    static coreV2Compatible(version) {
        let sanitized = _.split(version, '-')[0];
        return semver.satisfies(sanitized, '>=2.0.0');
    }
    static checkTokenCompatible(version) {
        let sanitized = _.split(version, '-')[0];
        return semver.satisfies(sanitized, '>=1.4.0');
    }
}
exports.InitUtil = InitUtil;
//# sourceMappingURL=InitUtil.js.map