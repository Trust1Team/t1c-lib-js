/**
 * @author Maarten Somers
 * @since 2018
 */
import { GCLConfig } from '../core/GCLConfig';
import { BrowserInfo } from '../core/service/CoreModel';
import { Promise } from 'es6-promise';
import { DSClient } from '../core/ds/DSClient';
import { AdminService } from '../core/admin/admin';
import { DSPlatformInfo } from '../core/ds/DSClientModel';
import { PubKeyResponse } from '../core/admin/adminModel';

export { ActivationUtil };

class ActivationUtil {
    // constructor
    constructor() {}

    public static unManagedInitialization(admin: AdminService,
                                          ds: DSClient,
                                          self_cfg: GCLConfig,
                                          mergedInfo: DSPlatformInfo,
                                          uuid: string): Promise<{}> {
        // do core v2 initialization flow
        // 1. register device pub key
        // 2. retrieve encrypted DS key and activate
        return new Promise((resolve, reject) => {
            ActivationUtil.registerDevicePubKey(admin, ds, mergedInfo)
                          .then(ActivationUtil.activateWithDsPubKey(admin, ds))
                          .then(() => {
                              // activation sequence complete, resolve promise
                              resolve();
                          })
                          .catch(err => {
                              reject(err);
                          });
        });
    }

    private static registerDevicePubKey(admin: AdminService, ds: DSClient, mergedInfo: DSPlatformInfo): Promise<any> {
        // get pub key
        // register with ds
        return admin.getPubKey().then(pubKey => {
            // TODO check DS registration call
            return ds.registerDevice(pubKey, mergedInfo);
        });
    }

    private static activateWithDsPubKey(admin: AdminService, ds: DSClient): Promise<any> {
        // retrieve encrypted pub key
        // set certificate
        // activate
        return ds.getPubKey().then(pubKeyResponse => {
            return admin.setPubKey(pubKeyResponse.pubKey).then(() => {
                // TODO add data to activate
                return admin.activate({});
            });
        });
    }
}
