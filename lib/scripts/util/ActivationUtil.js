"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DSClientModel_1 = require("../core/ds/DSClientModel");
var adminModel_1 = require("../core/admin/adminModel");
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
                return ds.register(new DSClientModel_1.DSRegistrationOrSyncRequest(mergedInfo.activated, uuid, mergedInfo.core_version, pubKey.data.device, mergedInfo.manufacturer, mergedInfo.browser, mergedInfo.os, mergedInfo.ua, client.config().gwUrl, new DSClientModel_1.DSClientInfo('JAVASCRIPT', VERSION), mergedInfo.namespace));
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
                var pubKeyReq = new adminModel_1.SetPubKeyRequest(pubKeyResponse.encryptedPublicKey, pubKeyResponse.encryptedAesKey, pubKeyResponse.ns);
                return args.client.admin().setPubKey(pubKeyReq);
            });
        });
    };
    return ActivationUtil;
}());
exports.ActivationUtil = ActivationUtil;
//# sourceMappingURL=ActivationUtil.js.map