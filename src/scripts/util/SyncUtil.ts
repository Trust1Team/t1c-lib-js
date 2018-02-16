/**
 * @author Maarten Somers
 * @since 2018
 */
import { GCLConfig } from '../core/GCLConfig';
import { DSPlatformInfo, JWTResponse } from '../core/ds/DSClientModel';
import { Promise } from 'es6-promise';
import { DSClient } from '../core/ds/DSClient';
import { DataContainerUtil } from './DataContainerUtil';
import * as _ from 'lodash';
import { GCLClient } from '../core/GCLLib';
import { RestException } from '../core/exceptions/CoreExceptions';

export { SyncUtil };

class SyncUtil {
    static readonly DOWNLOAD_ERROR = 'DOWNLOAD_ERROR';
    static readonly INIT = 'INIT';
    static readonly DOWNLOADING = 'DOWNLOADING';
    static readonly INSTALLED = 'INSTALLED';

    // constructor
    constructor() {}

    public static unManagedSynchronization(client: GCLClient,
                                           config: GCLConfig,
                                           mergedInfo: DSPlatformInfo,
                                           uuid: string) {
        // TODO remove
        // DataContainerUtil.setupDataContainers([ { id: 'atr', name: 'ATR', version: '0.0.0.1', type: 'data' },
        //     { id: 'btr', name: 'BTR', version: '0.0.0.1', type: 'data' } ]);
        // let client = ClientService.getClient() as any;
        // client.dataAtr('1234').read('6789');
        // client.dataBtr('1234').delete('6789');

        // do core v2 sync flow
        return new Promise((resolve, reject) => {
            // get GCL Pubkey
            client.admin().getPubKey().then(pubKey => {
                return client.ds().synchronizationRequest(pubKey.data.device, mergedInfo, config.dsUrlBase).then(containerConfig => {
                    // forward container config to GCL
                    return client.admin().updateContainerConfig(containerConfig.data).then(containerState => {
                        // TODO setup data container paths
                        // DataContainerUtil.setupDataContainers(containerState);
                        DataContainerUtil.setupDataContainers([ { id: 'atr', name: 'ATR', version: '0.0.0.1', type: 'data' },
                            { id: 'btr', name: 'BTR', version: '0.0.0.1', type: 'data' } ]);
                        // sync device
                        return SyncUtil.syncDevice(client.ds(), config, mergedInfo, uuid).then(() => {
                            mergedInfo.activated = true;
                            SyncUtil.pollDownloadCompletion(client, containerConfig).then(() => {
                                // all download complete, lib ready to use
                                resolve();
                            }, (error) => {
                                // something went wrong, return error
                                reject(error);
                            });
                        });
                    });
                });
            }).catch(err => {
                reject(err);
            });
        });
    }

    public static pollDownloadCompletion(client: GCLClient, containerConfig: any): Promise<any> {
        let maxSeconds = client.config().containerDownloadTimeout || 30;

        return new Promise((resolve, reject) => {
            // TODO activate polling once DS and GCL are capable
            // poll(resolve, reject);
            resolve(true);
        });

        function poll(resolve?: () => void, reject?: (error: any) => void) {
            // monitor status for each container in config
            _.delay(() => {
                --maxSeconds;
                client.core().info().then(infoData => {
                    checkDownloadsComplete(containerConfig, infoData.data.containers).then((ready) => {
                        if (ready) { resolve(); }
                        else { poll(resolve, reject); }
                    }, error => {
                        reject(error);
                    });
                });
            }, 1000);
        }

        function checkDownloadsComplete(cfg: any, containerStatus: any): Promise<boolean> {
            // if >= 1 error, reject
            // if >= 1 in progress, poll again
            // if all done, resolve
            return new Promise<boolean>((resolve, reject) => {
                if (downloadErrored(cfg, containerStatus)) { reject(new RestException(500, '903', 'Container download failed')); }
                else if (downloadOngoing(cfg, containerStatus)) { resolve(false); }
                else { resolve(true); }
            });
        }

        function downloadErrored(config: { name: string, version: string }[], status: { name: string, version: string, status: string }[]) {
            return _.find(config, cfgCt => {
                return _.find(status, statusCt => {
                    return cfgCt.name === statusCt.name && cfgCt.version === statusCt.version
                           && statusCt.status === SyncUtil.DOWNLOAD_ERROR;
                });
            });
        }

        function downloadOngoing(config: { name: string, version: string }[], status: { name: string, version: string, status: string }[]) {
            return _.find(config, cfgCt => {
                return _.find(status, statusCt => {
                    return cfgCt.name === statusCt.name && cfgCt.version === statusCt.version
                           && (statusCt.status === SyncUtil.INIT || statusCt.status === SyncUtil.DOWNLOADING);
                });
            });
        }
    }

    public static syncDevice(client: DSClient, config: GCLConfig, info: DSPlatformInfo, deviceId: string): Promise<JWTResponse> {
        return client.sync(info, deviceId).then(activationResponse => {
            config.jwt = activationResponse.token;
            return activationResponse;
        });
    }
}
