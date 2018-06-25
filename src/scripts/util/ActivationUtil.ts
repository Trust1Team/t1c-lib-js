/**
 * @author Maarten Somers
 * @since 2018
 */
import { DSClientInfo, DSPlatformInfo, DSRegistrationOrSyncRequest } from '../core/ds/DSClientModel';
import { SetPubKeyRequest } from '../core/admin/adminModel';
import { GCLClient } from '../core/GCLLib';

export class ActivationUtil {
    // constructor
    constructor() {}

    public static managedInitialization(client: GCLClient,
                                        mergedInfo: DSPlatformInfo,
                                        uuid: string) {
        // do core v2 initialization flow
        // 1. register device pub key
        // 2. retrieve encrypted DS key but *don't activate* (not necessary for managed packages)
        return new Promise((resolve, reject) => {
            ActivationUtil.registerDevice(client, mergedInfo, uuid)
                          .then(() => { return { client, uuid }; })
                          .then(ActivationUtil.setDsKey)
                          .then(() => {
                              resolve();
                          })
                          .catch(err => { reject(err); });
        });
    }

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
                client.config().gwUrl,
                new DSClientInfo('JAVASCRIPT', '%%GULP_INJECT_VERSION%%')));
        });
    }

    private static activateDevice(args: { client: GCLClient, uuid: string }): Promise<any> {
        // set DS key
        // activate
        return ActivationUtil.setDsKey(args).then(() => {
            return args.client.admin().activate();
        });
    }

    private static setDsKey(args: { client: GCLClient, uuid: string }): Promise<any> {
        // retrieve encrypted pub key
        // set certificate
        return args.client.ds().getPubKey(args.uuid).then(pubKeyResponse => {
            let pubKeyReq = new SetPubKeyRequest(pubKeyResponse.encryptedPublicKey, pubKeyResponse.encryptedAesKey);
            return args.client.admin().setPubKey(pubKeyReq);
        });
    }
}
