/**
 * @author Maarten Somers
 * @since 2018
 */
import { GCLConfig } from '../core/GCLConfig';
import { BrowserInfo } from '../core/service/CoreModel';
import { Promise } from 'es6-promise';
import { DSClient } from '../core/ds/DSClient';
import { AdminService } from '../core/admin/admin';
import { DSPlatformInfo, DSRegistrationOrSyncRequest } from '../core/ds/DSClientModel';
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
            ActivationUtil.registerDevice(admin, ds, mergedInfo, uuid)
                          .then(() => { return { admin, ds, uuid }; })
                          .then(ActivationUtil.activateDevice)
                          .then(() => {
                              // activation sequence complete, resolve promise
                              mergedInfo.activated = true;
                              resolve();
                          })
                          .catch(err => { reject(err); });
        });
    }

    private static registerDevice(admin: AdminService, ds: DSClient, mergedInfo: DSPlatformInfo, uuid: string): Promise<any> {
        // get pub key
        // register with ds
        return admin.getPubKey().then(pubKey => {
            return ds.register(new DSRegistrationOrSyncRequest(mergedInfo.managed,
                mergedInfo.activated,
                uuid,
                mergedInfo.core_version,
                pubKey,
                mergedInfo.manufacturer,
                mergedInfo.browser,
                mergedInfo.os,
                mergedInfo.ua,
                // TODO set correct proxy
                'proxy'));
        });
    }

    private static activateDevice(args: { admin: AdminService, ds: DSClient, uuid: string }): Promise<any> {
        // retrieve encrypted pub key
        // set certificate
        // activate
        return args.ds.getPubKey(args.uuid).then(pubKeyResponse => {
            return args.admin.setPubKey(pubKeyResponse.pubKey).then(() => {
                return args.admin.activate();
            });
        });
    }
}
