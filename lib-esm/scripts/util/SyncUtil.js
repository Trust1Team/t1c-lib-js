import { DSClientInfo, DSRegistrationOrSyncRequest } from '../core/ds/DSClientModel';
import { DataContainerUtil } from './DataContainerUtil';
import * as _ from 'lodash';
import { T1CLibException } from '../core/exceptions/CoreExceptions';
import { ContainerSyncRequest } from '../core/admin/adminModel';
import { ActivatedContainerUtil } from './ActivatedContainerUtil';
export class SyncUtil {
    constructor() { }
    static unManagedSynchronization(client, mergedInfo, uuid, containers) {
        return new Promise((resolve, reject) => {
            console.log(client);
            if (client.ds()) {
                SyncUtil.doSyncFlow(client, mergedInfo, uuid, containers, false).then(() => {
                    resolve();
                }).catch(err => {
                    reject(err);
                });
            }
            else {
                resolve();
            }
        });
    }
    static syncDevice(client, pubKey, info, deviceId, containers) {
        return client.ds().then(ds => {
            return ds.sync(new DSRegistrationOrSyncRequest(info.activated, deviceId, info.core_version, pubKey, info.manufacturer, info.browser, info.os, info.ua, client.config().gwUrl, new DSClientInfo('JAVASCRIPT', '%%GULP_INJECT_VERSION%%'), info.namespace, containers));
        });
    }
    static doSyncFlow(client, mergedInfo, uuid, containers, isRetry) {
        return client.admin().getPubKey().then(pubKey => {
            return SyncUtil.syncDevice(client, pubKey.data.device, mergedInfo, uuid, containers).then(device => {
                client.config().contextToken = device.contextToken;
                client.admin().atr(device.atrList);
                return client.admin().updateContainerConfig(new ContainerSyncRequest(device.containerResponses)).then(() => {
                    client.config().activeContainers = ActivatedContainerUtil.getSortedContainers(device.containerResponses);
                    DataContainerUtil.setupDataContainers(device.containerResponses);
                    return SyncUtil.pollDownloadCompletion(client, device.containerResponses, isRetry).then((finalContainerList) => {
                        return SyncUtil.syncDevice(client, pubKey.data.device, mergedInfo, uuid, finalContainerList);
                    }, (error) => {
                        if (typeof error === 'boolean' && !isRetry) {
                            console.log('download error, retrying');
                            return Promise.resolve(SyncUtil.doSyncFlow(client, mergedInfo, uuid, containers, true));
                        }
                        else {
                            return Promise.reject(error);
                        }
                    });
                });
            });
        });
    }
    static pollDownloadCompletion(client, containerConfig, isRetry) {
        const maxSeconds = client.config().containerDownloadTimeout || 30;
        const pollInterval = 250;
        let remainingTries = (maxSeconds * 1000) / pollInterval;
        return new Promise((resolve, reject) => {
            poll(resolve, reject);
        });
        function poll(resolve, reject) {
            _.delay(() => {
                --remainingTries;
                client.core().info().then(infoData => {
                    let containers = infoData.data.containers;
                    checkDownloadsComplete(containerConfig, containers).then((ready) => {
                        if (ready) {
                            resolve(containers);
                        }
                        else {
                            if (remainingTries === 0) {
                                reject(new T1CLibException(408, '904', 'Container download did not complete before timeout.', null));
                            }
                            else {
                                poll(resolve, reject);
                            }
                        }
                    }, error => {
                        reject(error);
                    });
                });
            }, pollInterval);
        }
        function checkDownloadsComplete(cfg, containerStatus) {
            return new Promise((resolve, reject) => {
                if (containerMissing(cfg, containerStatus) || downloadErrored(cfg, containerStatus)) {
                    if (isRetry) {
                        reject(new T1CLibException(500, '903', 'Container download failed'));
                    }
                    else {
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
            return _.find(config, cfgCt => {
                return !_.find(status, statusCt => { return cfgCt.name === statusCt.name && cfgCt.version === statusCt.version; });
            });
        }
        function downloadErrored(config, status) {
            return _.find(config, cfgCt => {
                return _.find(status, statusCt => {
                    return cfgCt.name === statusCt.name && cfgCt.version === statusCt.version
                        && _.includes(SyncUtil.ERROR_STATES, statusCt.status);
                });
            });
        }
        function downloadOngoing(config, status) {
            return _.find(config, cfgCt => {
                return _.find(status, statusCt => {
                    return cfgCt.name === statusCt.name && cfgCt.version === statusCt.version
                        && _.includes(SyncUtil.ONGOING_STATES, statusCt.status);
                });
            });
        }
    }
}
SyncUtil.DOWNLOAD_ERROR = 'DOWNLOAD_ERROR';
SyncUtil.GENERIC_ERROR = 'ERROR';
SyncUtil.ERROR_STATES = [SyncUtil.DOWNLOAD_ERROR, SyncUtil.GENERIC_ERROR];
SyncUtil.INIT = 'INIT';
SyncUtil.DOWNLOADING = 'DOWNLOADING';
SyncUtil.ONGOING_STATES = [SyncUtil.INIT, SyncUtil.DOWNLOADING];
SyncUtil.INSTALLED = 'INSTALLED';
//# sourceMappingURL=SyncUtil.js.map