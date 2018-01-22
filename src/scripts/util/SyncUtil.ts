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
                                           mergedInfo: DSPlatformInfo,
                                           uuid: string) {
        // do core v2 sync flow
        return new Promise((resolve, reject) => {
            // get GCL Pubkey
            admin.getPubKey().then(pubKey => {
                return ds.synchronizationRequest(pubKey.data, mergedInfo, config.dsUrlBase).then(containerConfig => {
                    // forward container config to GCL
                    return admin.updateContainerConfig(containerConfig.data).then(containerState => {
                        // TODO poll for container download completion?
                        // sync device
                        return SyncUtil.syncDevice(ds, config, mergedInfo, uuid).then(() => {
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

    public static syncDevice(client: DSClient, config: GCLConfig, info: DSPlatformInfo, deviceId: string): Promise<JWTResponse> {
        return client.sync(info, deviceId).then(activationResponse => {
            config.jwt = activationResponse.token;
            return activationResponse;
        });
    }
}
