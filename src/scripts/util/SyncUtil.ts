/**
 * @author Maarten Somers
 * @since 2018
 */
import { GCLConfig } from '../core/GCLConfig';
import { BrowserInfo } from '../core/service/CoreModel';
import { DSPlatformInfo, JWTResponse } from '../core/ds/DSClientModel';
import { Promise } from 'es6-promise';
import { DSClient } from '../core/ds/DSClient';
import { AdminService } from '../core/admin/admin';

export { SyncUtil };

class SyncUtil {
    // constructor
    constructor() {}

    public static unManagedSynchronization(admin: AdminService,
                                           ds: DSClient,
                                           config: GCLConfig,
                                           mergedInfo: { managed: boolean, core_version: string, activated: boolean } & BrowserInfo,
                                           uuid: string) {
        // check if we can use core v2 sync
        if (config.v2Compatible) {
            // do core v2 sync flow
            return SyncUtil.coreV2Sync(admin, ds, config, mergedInfo, uuid);
        } else {
            // do v1 sync
            return SyncUtil.syncDevice(ds, config, mergedInfo, uuid).then(() => {
                mergedInfo.activated = true;
            });
        }
    }

    public static syncDevice(client: DSClient, config: GCLConfig, info: DSPlatformInfo, deviceId: string): Promise<JWTResponse> {
        return client.sync(info, deviceId).then(activationResponse => {
            config.jwt = activationResponse.token;
            return activationResponse;
        });
    }

    private static coreV2Sync(admin: AdminService,
                              ds: DSClient,
                              self_cfg: GCLConfig,
                              mergedInfo: { managed: boolean, core_version: string, activated: boolean } & BrowserInfo,
                              uuid: string) {
        return new Promise((resolve, reject) => {
            // get GCL Pubkey
            admin.getPubKey().then(pubKey => {
                return ds.synchronizationRequest(pubKey.data, mergedInfo, self_cfg.dsUrlBase).then(containerConfig => {
                    // forward container config to GCL
                    return admin.updateContainerConfig(containerConfig.data).then(containerState => {
                        // TODO poll for container download completion?
                        // sync device
                        return SyncUtil.syncDevice(ds, self_cfg, mergedInfo, uuid).then(() => {
                            mergedInfo.activated = true;
                            resolve();
                        });
                    });
                });
            }).catch(err => {
                reject(err);
            });
        });
    }
}
