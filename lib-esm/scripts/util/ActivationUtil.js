import { DSClientInfo, DSRegistrationOrSyncRequest } from '../core/ds/DSClientModel';
import { SetPubKeyRequest } from '../core/admin/adminModel';
var ActivationUtil = (function () {
    function ActivationUtil() {
    }
    ActivationUtil.unManagedInitialization = function (client, mergedInfo, uuid) {
        return new Promise(function (resolve, reject) {
            ActivationUtil.registerDevice(client, mergedInfo, uuid)
                .then(function () { return { client: client, uuid: uuid }; })
                .then(ActivationUtil.activateDevice)
                .then(function () {
                mergedInfo.activated = true;
                resolve();
            })
                .catch(function (err) { reject(err); });
        });
    };
    ActivationUtil.registerDevice = function (client, mergedInfo, uuid) {
        return client.admin().getPubKey().then(function (pubKey) {
            return client.ds().then(function (ds) {
                return ds.register(new DSRegistrationOrSyncRequest(mergedInfo.activated, uuid, mergedInfo.core_version, pubKey.data.device, mergedInfo.manufacturer, mergedInfo.browser, mergedInfo.os, mergedInfo.ua, client.config().gwUrl, new DSClientInfo('JAVASCRIPT', '%%GULP_INJECT_VERSION%%'), mergedInfo.namespace));
            });
        });
    };
    ActivationUtil.activateDevice = function (args) {
        return ActivationUtil.setDsKey(args).then(function () {
            return args.client.admin().activate();
        });
    };
    ActivationUtil.setDsKey = function (args) {
        return args.client.ds().then(function (ds) {
            return ds.getPubKey(args.uuid).then(function (pubKeyResponse) {
                var pubKeyReq = new SetPubKeyRequest(pubKeyResponse.encryptedPublicKey, pubKeyResponse.encryptedAesKey, pubKeyResponse.ns);
                return args.client.admin().setPubKey(pubKeyReq);
            });
        });
    };
    return ActivationUtil;
}());
export { ActivationUtil };
//# sourceMappingURL=ActivationUtil.js.map