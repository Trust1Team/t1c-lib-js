import * as _ from 'lodash';
import * as semver from 'semver';
import { SyncUtil } from './SyncUtil';
import { ActivationUtil } from './ActivationUtil';
import { DSPlatformInfo } from '../core/ds/DSClientModel';
import { PubKeyService } from './PubKeyService';
import { T1CLibException } from '../core/exceptions/CoreExceptions';
import axios from 'axios';
import { ActivatedContainerUtil } from './ActivatedContainerUtil';
export class InitUtil {
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
                        reject(new T1CLibException(400, '301', 'Installed GCL version is not v2 compatible. Please update to a compatible version.', client));
                    }
                }, (err) => {
                    console.error('initializeLibrary - getInfoError', err);
                    client.gclInstalled = false;
                    axios.get('https://localhost:10443/v1').then((response) => {
                        reject(new T1CLibException(400, '301', 'Installed GCL version is not v2 compatible. Please update to a compatible version.', client));
                    }).catch(() => {
                        reject(new T1CLibException(400, '302', 'No installed GCL component found. Please download and install the GCL.', client));
                    });
                });
            });
            initPromise.then(() => {
                client.admin().getPubKey().then(pubKey => {
                    PubKeyService.setPubKey(pubKey.data.device);
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
            config.activeContainers = ActivatedContainerUtil.getSortedProvidedContainers(config.overrideContainers);
        }
        else if (!config.dsUrl && !config.overrideContainers) {
            config.activeContainers = ActivatedContainerUtil.getSortedContainers(infoResponse.data.containers);
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
                resolve(ActivationUtil.unManagedInitialization(client, mergedInfo, uuid));
            }
        });
        activationPromise.then(() => {
            client.updateAuthConnection(config);
            initResolve(SyncUtil.unManagedSynchronization(client, mergedInfo, uuid, infoResponse.data.containers));
        }, err => {
        });
    }
    static getMergedInfo(config, info, infoResponse) {
        const core_version = infoResponse.data.version;
        const activated = infoResponse.data.activated;
        if (config.dsUrl) {
            let ns = this.extractHostname(config.dsUrl);
            return new DSPlatformInfo(activated, info, core_version, ns);
        }
        else {
            return new DSPlatformInfo(activated, info, core_version);
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
//# sourceMappingURL=InitUtil.js.map