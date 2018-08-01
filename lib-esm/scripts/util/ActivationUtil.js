import { DSClientInfo, DSRegistrationOrSyncRequest } from '../core/ds/DSClientModel';
import { SetPubKeyRequest } from '../core/admin/adminModel';
export class ActivationUtil {
    constructor() { }
    static unManagedInitialization(client, mergedInfo, uuid) {
        return new Promise((resolve, reject) => {
            ActivationUtil.registerDevice(client, mergedInfo, uuid)
                .then(() => { return { client, uuid }; })
                .then(ActivationUtil.activateDevice)
                .then(() => {
                mergedInfo.activated = true;
                resolve();
            })
                .catch(err => { reject(err); });
        });
    }
    static registerDevice(client, mergedInfo, uuid) {
        return client.admin().getPubKey().then(pubKey => {
            return client.ds().then(ds => {
                return ds.register(new DSRegistrationOrSyncRequest(mergedInfo.activated, uuid, mergedInfo.core_version, pubKey.data.device, mergedInfo.manufacturer, mergedInfo.browser, mergedInfo.os, mergedInfo.ua, client.config().gwUrl, new DSClientInfo('JAVASCRIPT', '%%GULP_INJECT_VERSION%%'), mergedInfo.namespace));
            });
        });
    }
    static activateDevice(args) {
        return ActivationUtil.setDsKey(args).then(() => {
            return args.client.admin().activate();
        });
    }
    static setDsKey(args) {
        return args.client.ds().then(ds => {
            return ds.getPubKey(args.uuid).then(pubKeyResponse => {
                let pubKeyReq = new SetPubKeyRequest(pubKeyResponse.encryptedPublicKey, pubKeyResponse.encryptedAesKey, pubKeyResponse.ns);
                return args.client.admin().setPubKey(pubKeyReq);
            });
        });
    }
}
//# sourceMappingURL=ActivationUtil.js.map