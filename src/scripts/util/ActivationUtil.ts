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
import { PubKeyResponse, PubKeys, SetPubKeyRequest } from '../core/admin/adminModel';
import { GCLClient } from '../core/GCLLib';

export { ActivationUtil };

class ActivationUtil {
    // constructor
    constructor() {}

    public static unManagedInitialization(client: GCLClient,
                                          mergedInfo: DSPlatformInfo,
                                          uuid: string): Promise<{}> {
        // do core v2 initialization flow
        // 1. register device pub key
        // 2. retrieve encrypted DS key and activate
        return new Promise((resolve, reject) => {
            ActivationUtil.registerDevice(client, mergedInfo, uuid)
                          .then(() => { return { client, uuid }; })
                          .then(ActivationUtil.activateDevice)
                          .then(() => {
                              // activation sequence complete, resolve promise
                              mergedInfo.activated = true;
                              resolve();
                          })
                          .catch(err => { reject(err); });
        });
    }

    private static registerDevice(client: GCLClient, mergedInfo: DSPlatformInfo, uuid: string): Promise<any> {
        // get pub key
        // register with ds
        return client.admin().getPubKey().then(pubKey => {
            return client.ds().register(new DSRegistrationOrSyncRequest(mergedInfo.managed,
                mergedInfo.activated,
                uuid,
                mergedInfo.core_version,
                pubKey.data.device,
                mergedInfo.manufacturer,
                mergedInfo.browser,
                mergedInfo.os,
                mergedInfo.ua,
                client.config().gwUrl));
        });
    }

    private static activateDevice(args: { client: GCLClient, uuid: string }): Promise<any> {
        // retrieve encrypted pub key
        // set certificate
        // activate
        return args.client.ds().getPubKey(args.uuid).then(pubKeyResponse => {
            console.log(pubKeyResponse);
            let pubKeyReq = new SetPubKeyRequest(pubKeyResponse.encryptedPublicKey, pubKeyResponse.encryptedAesKey);
            return args.client.admin().setPubKey(pubKeyReq).then(() => {
                return args.client.admin().activate();
            });
        });
    }
}
