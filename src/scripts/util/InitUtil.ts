/**
 * @author Maarten Somers
 * @since 2018
 */
import { Promise } from 'es6-promise';
import { GCLClient } from '../core/GCLLib';
import * as _ from 'lodash';
import * as semver from 'semver';
import { SyncUtil } from './SyncUtil';
import { ActivationUtil } from './ActivationUtil';
import { DSPlatformInfo } from '../core/ds/DSClientModel';
import { PubKeyService } from './PubKeyService';

export { InitUtil };

class InitUtil {
    // constructor
    constructor() {}

    public static initializeLibrary(client: GCLClient) {
        return new Promise((finalResolve, finalReject) => {
            let initPromise = new Promise((resolve, reject) => {
                let cfg = client.config();
                client.core().info().then(infoResponse => {
                    // update config values
                    cfg.citrix = infoResponse.data.citrix;
                    cfg.tokenCompatible = InitUtil.checkTokenCompatible(infoResponse.data.version);
                    cfg.v2Compatible = InitUtil.coreV2Compatible(infoResponse.data.version);

                    let activated = infoResponse.data.activated;
                    let managed = infoResponse.data.managed;
                    let core_version = infoResponse.data.version;
                    let uuid = infoResponse.data.uid;
                    // compose info
                    let info = client.core().infoBrowserSync();
                    let mergedInfo = new DSPlatformInfo(activated, info.data, core_version);


                    if (managed) {
                        // only attempt to sync if API key and DS URL are available,
                        // and if syncing for managed devices is turned on
                        if (cfg.apiKey && cfg.dsUrlBase && cfg.syncManaged) {
                            // attempt to sync
                            SyncUtil.syncDevice(client.ds(), cfg, mergedInfo, uuid).then(() => { resolve(); },
                                () => { resolve(); });
                        } else {
                            // nothing to do here *jetpack*
                            resolve();
                        }
                    } else {
                        let activationPromise;
                        if (activated) {
                            // already activated, only need to sync device
                            activationPromise = Promise.resolve();
                        } else {
                            // not yet activated, do this now
                            activationPromise = ActivationUtil.unManagedInitialization(client.admin(),
                                client.ds(), cfg, mergedInfo, uuid);
                        }
                        activationPromise.then(() => {
                            // update core service
                            client.updateAuthConnection(cfg);
                            // device is activated, sync it
                            resolve(SyncUtil.unManagedSynchronization(client, cfg, mergedInfo, uuid));
                        }, err => {
                            reject(err);
                            // resolve(SyncUtil.unManagedSynchronization(client.admin(), client.ds(), cfg, mergedInfo, uuid));
                        });
                    }
                }, () => {
                    // failure probably because GCL is not installed
                    client.GCLInstalled = false;
                    // resolve with client as-is to allow download
                    resolve();
                });
            });
            initPromise.then(() => {
                // store device PubKey
                client.admin().getPubKey().then(pubKey => {
                    console.log(pubKey);
                    PubKeyService.setPubKey(pubKey.data.device);
                    finalResolve();
                });
            }, err => {
                finalReject(err);
            });

        });
    }

    private static coreV2Compatible(version: string): boolean {
        // sanitize version string
        let sanitized = _.split(version, '-')[0];
        return semver.satisfies(sanitized, '>=2.0.0');
    }

    private static checkTokenCompatible(version: string): boolean {
        // sanitize version string
        let sanitized = _.split(version, '-')[0];
        return semver.satisfies(sanitized, '>=1.4.0');
    }
}
