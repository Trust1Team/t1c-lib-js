"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DSClientModel_1 = require("../core/ds/DSClientModel");
const adminModel_1 = require("../core/admin/adminModel");
class ActivationUtil {
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
                return ds.register(new DSClientModel_1.DSRegistrationOrSyncRequest(mergedInfo.activated, uuid, mergedInfo.core_version, pubKey.data.device, mergedInfo.manufacturer, mergedInfo.browser, mergedInfo.os, mergedInfo.ua, client.config().gwUrl, new DSClientModel_1.DSClientInfo('JAVASCRIPT', '%%GULP_INJECT_VERSION%%'), mergedInfo.namespace));
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
                let pubKeyReq = new adminModel_1.SetPubKeyRequest(pubKeyResponse.encryptedPublicKey, pubKeyResponse.encryptedAesKey, pubKeyResponse.ns);
                return args.client.admin().setPubKey(pubKeyReq);
            });
        });
    }
}
exports.ActivationUtil = ActivationUtil;
//# sourceMappingURL=ActivationUtil.js.map