/**
 * @author Maarten Somers
 * @since 2018
 */
import {
    DeviceResponse, DSClientInfo, DSContainer, DSPlatformInfo, DSRegistrationOrSyncRequest
} from '../core/ds/DSClientModel';
import { DataContainerUtil } from './DataContainerUtil';
import { GCLClient } from '../core/GCLLib';
import { T1CLibException } from '../core/exceptions/CoreExceptions';
import { T1CContainer } from '../core/service/CoreModel';
// import {ContainerSyncRequest, SetPubKeyRequest} from '../core/admin/adminModel';
import {ActivatedContainerUtil} from './ActivatedContainerUtil';
import {Util} from './Utils';
import {GCLConfig} from '../..';

declare var VERSION;

export class SyncUtil {
    static readonly DOWNLOAD_ERROR = 'DOWNLOAD_ERROR';
    static readonly GENERIC_ERROR = 'ERROR';
    static readonly ERROR_STATES = [ SyncUtil.DOWNLOAD_ERROR, SyncUtil.GENERIC_ERROR ];
    static readonly INIT = 'INIT';
    static readonly DOWNLOADING = 'DOWNLOADING';
    static readonly ONGOING_STATES = [ SyncUtil.INIT, SyncUtil.DOWNLOADING ];
    static readonly INSTALLED = 'INSTALLED';

    // constructor
    constructor() {}

    public static unManagedSynchronization(client: GCLClient,
                                           mergedInfo: DSPlatformInfo,
                                           uuid: string,
                                           containers: T1CContainer[],
                                           config: GCLConfig) {
        // do core v2 sync flow
        // unmanaged sync is blocking, so reject if an error occurs
        /*return new Promise((resolve, reject) => {
            if (client.ds()) SyncUtil.doSyncFlow(client, mergedInfo, uuid, containers, false, config).then(() => {
                resolve();
            }).catch(err => {
                reject(err);
            });
            else {
                resolve();
            }
        });*/
    }

    public static syncDevice(client: GCLClient,
                             pubKey: string,
                             info: DSPlatformInfo,
                             deviceId: string,
                             containers: T1CContainer[]): Promise<DeviceResponse> {
        return client.ds().then(ds => {
          return ds.sync(new DSRegistrationOrSyncRequest(
              info.activated,
              deviceId,
              info.core_version,
              pubKey,
              info.manufacturer,
              info.browser,
              info.os,
              info.ua,
              client.config().gwUrl,
              new DSClientInfo('JAVASCRIPT', VERSION),
              info.namespace,
              containers)
          );
        });
    }

    private static doSyncFlow(client: GCLClient, mergedInfo: DSPlatformInfo, uuid: string, containers: T1CContainer[], isRetry: boolean, config: GCLConfig) {
        // get GCL Pubkey
        // get current container state
        // sync
        // get container list
        // pass container list to gcl
        // wait completion/fail
        // final sync with updated container list

        // get GCL pubkey
        /*return client.admin().getPubKey().then(pubKey => {
            return SyncUtil.syncDevice(client, pubKey.data.device, mergedInfo, uuid, containers).then(device => {
                client.ds().then(dsclient => {

                    client.updateAuthConnection(config);
                    // get DS pubkey
                    dsclient.getPubKey(uuid).then(dsPubkeyres => {
                        // set DS pubkey in GCL
                        let pubKeyReq = new SetPubKeyRequest(dsPubkeyres.encryptedPublicKey, dsPubkeyres.encryptedAesKey, dsPubkeyres.ns);
                        client.admin().setPubKey(pubKeyReq).then(res => {
                            // set context token
                            client.config().contextToken = device.contextToken;
                            // pass ATR list info to GCL
                            client.admin().atr(device.atrList);
                            // update container config
                            return client.admin().updateContainerConfig(new ContainerSyncRequest(device.containerResponses)).then(() => {
                                // setup data container paths
                                client.config().activeContainers = ActivatedContainerUtil.getSortedContainers(device.containerResponses);
                                DataContainerUtil.setupDataContainers(device.containerResponses);

                                return SyncUtil.pollDownloadCompletion(client,
                                    device.containerResponses, isRetry).then((finalContainerList) => {
                                    // all downloads complete, do final sync
                                    return SyncUtil.syncDevice(client, pubKey.data.device, mergedInfo, uuid, finalContainerList);
                                }, (error) => {
                                    if (typeof error === 'boolean' && !isRetry) {
                                        // need to trigger retry
                                        console.log('download error, retrying');
                                        return Promise.resolve(SyncUtil.doSyncFlow(client, mergedInfo, uuid, containers, true, config));
                                    } else {
                                        // something went wrong, return error
                                        return Promise.reject(error);
                                    }
                                });
                            });
                        }, err => {
                            // error while setting the DS pub key in the GCL
                            console.error(err);
                            return Promise.reject(err);
                        });
                    }, err => {
                        // error while getting the DS pubkey
                        console.error(err);
                        return Promise.reject(err);
                    });
                }, err => {
                    console.error(err);
                    return Promise.reject(err);
                });
            });
        });*/
    }

    private static pollDownloadCompletion(client: GCLClient, containerConfig: DSContainer[], isRetry: boolean): Promise<T1CContainer[]> {
        const maxSeconds = client.config().containerDownloadTimeout || 30;
        const pollInterval = 250;
        let remainingTries = (maxSeconds * 1000) / pollInterval;

        return new Promise((resolve, reject) => {
            poll(resolve, reject);
        });

        function poll(resolve?: (containers: T1CContainer[]) => void, reject?: (error: any) => void) {
            // monitor status for each container in config
            setTimeout(() => {
                --remainingTries;
                client.core().info().then(infoData => {
                    let containers = infoData.data.containers;
                    checkDownloadsComplete(containerConfig, containers).then((ready) => {
                        if (ready) { resolve(containers); }
                        else {
                            if (remainingTries === 0) {
                                reject( new T1CLibException(408, '904', 'Container download did not complete before timeout.', null));
                            } else { poll(resolve, reject); }
                        }
                    }, error => {
                        reject(error);
                    });
                });
            }, pollInterval);
        }

        function checkDownloadsComplete(cfg: any, containerStatus: any): Promise<boolean> {
            // check all containers in list
            // if >= 1 error or missing, reject
            // if >= 1 in progress, poll again
            // if all done, resolve
            return new Promise<boolean>((resolve, reject) => {
                if (containerMissing(cfg, containerStatus) || downloadErrored(cfg, containerStatus)) {
                    // check if we were already retrying
                    if (isRetry) {
                        reject(new T1CLibException(500, '903', 'Container download failed'));
                    } else {
                        // trigger retry
                        reject(false);
                    }
                }
                else if (downloadOngoing(cfg, containerStatus)) { resolve(false); }
                else { resolve(true); }
            });
        }

        function containerMissing(config: { name: string, version: string}[], status: { name: string, version: string, status: string }[]) {
            return config.find(cfgCt => {
                return !status.find(statusCt => { return cfgCt.name === statusCt.name && cfgCt.version === statusCt.version; });
            });
        }

        function downloadErrored(config: { name: string, version: string }[], status: { name: string, version: string, status: string }[]) {
            config.forEach(cfg => {
                status.forEach(sts => {
                    return !!(cfg.name === sts.name && cfg.version === sts.version && Util.includes(SyncUtil.ERROR_STATES, sts.status));
                });
            });
        }

        function downloadOngoing(config: { name: string, version: string }[], status: { name: string, version: string, status: string }[]): boolean {
            config.forEach(cfg => {
                status.forEach(sts => {
                    return !!(cfg.name === sts.name && cfg.version === sts.version && Util.includes(SyncUtil.ONGOING_STATES, sts.status));
                });
            });
            return false;
        }
    }
}
