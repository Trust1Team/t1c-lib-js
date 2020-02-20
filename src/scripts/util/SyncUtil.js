"use strict";
exports.__esModule = true;
/**
 * @author Maarten Somers
 * @since 2018
 */
var DSClientModel_1 = require("../core/ds/DSClientModel");
var DataContainerUtil_1 = require("./DataContainerUtil");
var CoreExceptions_1 = require("../core/exceptions/CoreExceptions");
var adminModel_1 = require("../core/admin/adminModel");
var ActivatedContainerUtil_1 = require("./ActivatedContainerUtil");
var Utils_1 = require("./Utils");
var SyncUtil = /** @class */ (function () {
    // constructor
    function SyncUtil() {
    }
    SyncUtil.unManagedSynchronization = function (client, mergedInfo, uuid, containers, config) {
        // do core v2 sync flow
        // unmanaged sync is blocking, so reject if an error occurs
        return new Promise(function (resolve, reject) {
            if (client.ds()) {
                SyncUtil.doSyncFlow(client, mergedInfo, uuid, containers, false, config).then(function () {
                    resolve();
                })["catch"](function (err) {
                    reject(err);
                });
            }
            else {
                resolve();
            }
        });
    };
    SyncUtil.syncDevice = function (client, pubKey, info, deviceId, containers) {
        return client.ds().then(function (ds) {
            return ds.sync(new DSClientModel_1.DSRegistrationOrSyncRequest(info.activated, deviceId, info.core_version, pubKey, info.manufacturer, info.browser, info.os, info.ua, client.config().gwUrl, new DSClientModel_1.DSClientInfo('JAVASCRIPT', VERSION), info.namespace, containers));
        });
    };
    SyncUtil.doSyncFlow = function (client, mergedInfo, uuid, containers, isRetry, config) {
        // get GCL Pubkey
        // get current container state
        // sync
        // get container list
        // pass container list to gcl
        // wait completion/fail
        // final sync with updated container list
        // get GCL pubkey
        return client.admin().getPubKey().then(function (pubKey) {
            return SyncUtil.syncDevice(client, pubKey.data.device, mergedInfo, uuid, containers).then(function (device) {
                client.ds().then(function (dsclient) {
                    client.updateAuthConnection(config);
                    // get DS pubkey
                    dsclient.getPubKey(uuid).then(function (dsPubkeyres) {
                        // set DS pubkey in GCL
                        var pubKeyReq = new adminModel_1.SetPubKeyRequest(dsPubkeyres.encryptedPublicKey, dsPubkeyres.encryptedAesKey, dsPubkeyres.ns);
                        client.admin().setPubKey(pubKeyReq).then(function (res) {
                            // set context token
                            client.config().contextToken = device.contextToken;
                            // pass ATR list info to GCL
                            client.admin().atr(device.atrList);
                            // update container config
                            return client.admin().updateContainerConfig(new adminModel_1.ContainerSyncRequest(device.containerResponses)).then(function () {
                                // setup data container paths
                                client.config().activeContainers = ActivatedContainerUtil_1.ActivatedContainerUtil.getSortedContainers(device.containerResponses);
                                DataContainerUtil_1.DataContainerUtil.setupDataContainers(device.containerResponses);
                                return SyncUtil.pollDownloadCompletion(client, device.containerResponses, isRetry).then(function (finalContainerList) {
                                    // all downloads complete, do final sync
                                    return SyncUtil.syncDevice(client, pubKey.data.device, mergedInfo, uuid, finalContainerList);
                                }, function (error) {
                                    if (typeof error === 'boolean' && !isRetry) {
                                        // need to trigger retry
                                        console.log('download error, retrying');
                                        return Promise.resolve(SyncUtil.doSyncFlow(client, mergedInfo, uuid, containers, true, config));
                                    }
                                    else {
                                        // something went wrong, return error
                                        return Promise.reject(error);
                                    }
                                });
                            });
                        }, function (err) {
                            // error while setting the DS pub key in the GCL
                            console.error(err);
                            return Promise.reject(err);
                        });
                    }, function (err) {
                        // error while getting the DS pubkey
                        console.error(err);
                        return Promise.reject(err);
                    });
                }, function (err) {
                    console.error(err);
                    return Promise.reject(err);
                });
            });
        });
    };
    SyncUtil.pollDownloadCompletion = function (client, containerConfig, isRetry) {
        var maxSeconds = client.config().containerDownloadTimeout || 30;
        var pollInterval = 250;
        var remainingTries = (maxSeconds * 1000) / pollInterval;
        return new Promise(function (resolve, reject) {
            poll(resolve, reject);
        });
        function poll(resolve, reject) {
            // monitor status for each container in config
            setTimeout(function () {
                --remainingTries;
                client.core().info().then(function (infoData) {
                    var containers = infoData.data.containers;
                    checkDownloadsComplete(containerConfig, containers).then(function (ready) {
                        if (ready) {
                            resolve(containers);
                        }
                        else {
                            if (remainingTries === 0) {
                                reject(new CoreExceptions_1.T1CLibException(408, '904', 'Container download did not complete before timeout.', null));
                            }
                            else {
                                poll(resolve, reject);
                            }
                        }
                    }, function (error) {
                        reject(error);
                    });
                });
            }, pollInterval);
        }
        function checkDownloadsComplete(cfg, containerStatus) {
            // check all containers in list
            // if >= 1 error or missing, reject
            // if >= 1 in progress, poll again
            // if all done, resolve
            return new Promise(function (resolve, reject) {
                if (containerMissing(cfg, containerStatus) || downloadErrored(cfg, containerStatus)) {
                    // check if we were already retrying
                    if (isRetry) {
                        reject(new CoreExceptions_1.T1CLibException(500, '903', 'Container download failed'));
                    }
                    else {
                        // trigger retry
                        reject(false);
                    }
                }
                else if (downloadOngoing(cfg, containerStatus)) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        }
        function containerMissing(config, status) {
            return config.find(function (cfgCt) {
                return !status.find(function (statusCt) { return cfgCt.name === statusCt.name && cfgCt.version === statusCt.version; });
            });
        }
        function downloadErrored(config, status) {
            config.forEach(function (cfg) {
                status.forEach(function (sts) {
                    return !!(cfg.name === sts.name && cfg.version === sts.version && Utils_1.Util.includes(SyncUtil.ERROR_STATES, sts.status));
                });
            });
        }
        function downloadOngoing(config, status) {
            config.forEach(function (cfg) {
                status.forEach(function (sts) {
                    return !!(cfg.name === sts.name && cfg.version === sts.version && Utils_1.Util.includes(SyncUtil.ONGOING_STATES, sts.status));
                });
            });
            return false;
        }
    };
    SyncUtil.DOWNLOAD_ERROR = 'DOWNLOAD_ERROR';
    SyncUtil.GENERIC_ERROR = 'ERROR';
    SyncUtil.ERROR_STATES = [SyncUtil.DOWNLOAD_ERROR, SyncUtil.GENERIC_ERROR];
    SyncUtil.INIT = 'INIT';
    SyncUtil.DOWNLOADING = 'DOWNLOADING';
    SyncUtil.ONGOING_STATES = [SyncUtil.INIT, SyncUtil.DOWNLOADING];
    SyncUtil.INSTALLED = 'INSTALLED';
    return SyncUtil;
}());
exports.SyncUtil = SyncUtil;
