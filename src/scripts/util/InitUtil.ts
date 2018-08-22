/**
 * @author Maarten Somers
 * @since 2018
 */
import {GCLClient} from '../core/GCLLib';
import * as semver from 'semver';
import {SyncUtil} from './SyncUtil';
import {ActivationUtil} from './ActivationUtil';
import {DSPlatformInfo} from '../core/ds/DSClientModel';
import {PubKeyService} from './PubKeyService';
import {T1CLibException} from '../core/exceptions/CoreExceptions';
import {AxiosResponse} from 'axios';
import axios from 'axios';
import {ActivatedContainerUtil} from './ActivatedContainerUtil';
import {BrowserInfo, InfoResponse} from '../core/service/CoreModel';
import {GCLConfig} from '../..';

export class InitUtil {
    // constructor
    constructor() {
    }

    /**
     * Initializes the library.
     * @param {GCLClient} client
     * @returns {Promise<any>}
     */
    public static initializeLibrary(client: GCLClient): Promise<GCLClient> {
        return new Promise((finalResolve, finalReject) => {
            let initPromise = new Promise((resolve, reject) => {
                let cfg = client.config();
                client.core().info().then(infoResponse => {
                    // update config values
                    cfg.citrix = infoResponse.data.citrix;
                    // browser fingerprint compatible?
                    cfg.tokenCompatible = InitUtil.checkTokenCompatible(infoResponse.data.version);
                    cfg.v2Compatible = InitUtil.coreV2Compatible(infoResponse.data.version);

                    if (cfg.v2Compatible) {
                        let mergedInfo = this.getMergedInfo(cfg, client.core().infoBrowserSync().data, infoResponse);
                        this.containerHandler(cfg, infoResponse);
                        // triggers activation if needed and syncs
                        if (cfg.gwUrl && !cfg.citrix) {
                            console.log('using gateway: ', cfg.gwUrl);
                            console.log('citrix: ', cfg.citrix);
                            this.activateAndSync(infoResponse, mergedInfo, client, cfg, resolve, reject);
                        } else {
                           resolve();
                        }
                    } else {
                        // installed version is not compatible, reject initialization
                        // return the client in the error so a new version can be downloaded!
                        reject(new T1CLibException(400, '301',
                            'Installed GCL version is not v2 compatible. Please update to a compatible version.', client));
                    }
                }, (err) => {
                    console.error('initializeLibrary - getInfoError', err);
                    // failure probably because GCL is not installed
                    client.gclInstalled = false;
                    // check if older GCL version is available at v1 endpoint
                    axios.get('https://localhost:10443/v1').then((response: AxiosResponse) => {
                        // response received, inform user that he needs to update
                        reject(new T1CLibException(400, '301',
                            'Installed GCL version is not v2 compatible. Please update to a compatible version.', client));
                    }).catch(() => {
                        // no response, no older GCL version installed
                        // return the client in the error so a new version can be downloaded!
                        reject(new T1CLibException(400, '302',
                            'No installed GCL component found. Please download and install the GCL.', client));
                    });
                });
            });
            initPromise.then(() => {
                // store device PubKey
                client.admin().getPubKey().then(pubKey => {
                    PubKeyService.setPubKey(pubKey.data.device);
                    finalResolve();
                });
            }, err => {
                    console.log('Initialization error', err);
                finalReject(err);
            });

        });
    }

    private static containerHandler(config: GCLConfig, infoResponse: InfoResponse) {
        // if no DS has been configured but containers override present in config
        if (!config.dsUrl && config.overrideContainers) {
            // values from overrideContainers should be sorted and available when there is no DS available but the containers are provided in the constructor
            config.activeContainers = ActivatedContainerUtil.getSortedProvidedContainers(config.overrideContainers);
        }
        // if no DS has been configured and containers are not declared
        else if (!config.dsUrl && !config.overrideContainers) {
            // if there is no DS available and the containers arent provided in the constructor turn to the GCL v2 info endpoint to fetch the containers
            config.activeContainers = ActivatedContainerUtil.getSortedContainers(infoResponse.data.containers);
        }
        // if shared environment - ignore DS and use declared containers
        else if (config.citrix && config.overrideContainers) {
            config.activeContainers = ActivatedContainerUtil.getSortedProvidedContainers(config.overrideContainers);
        }
        // if shared environment - ignore DS and request GCL for containers
        else if (config.citrix && !config.overrideContainers) {
            config.activeContainers = ActivatedContainerUtil.getSortedContainers(infoResponse.data.containers);
        }
    }


    private static activateAndSync(infoResponse: InfoResponse, mergedInfo: DSPlatformInfo, client: GCLClient, config: GCLConfig, initResolve: any, initReject: any) {
        const activated = infoResponse.data.activated;
        const uuid = infoResponse.data.uid;
        let activationPromise = new Promise((resolve, reject) => {
            if (!config.dsUrl && activated) {
                // already activated, only need to sync device
                resolve();
            } else {
                // not yet activated, do this now
                resolve(ActivationUtil.unManagedInitialization(client, mergedInfo, uuid));
            }
        });
        activationPromise.then(() => {
            // update core service
            client.updateAuthConnection(config);
            initResolve(SyncUtil.unManagedSynchronization(client, mergedInfo, uuid, infoResponse.data.containers));
        }, err => {
            // initReject(err);
            // resolve(SyncUtil.unManagedSynchronization(client.admin(), client.ds(), cfg, mergedInfo, uuid));
        });
    }

    private static getMergedInfo(config: GCLConfig, info: BrowserInfo, infoResponse: InfoResponse): DSPlatformInfo {
        const core_version = infoResponse.data.version;
        const activated = infoResponse.data.activated;
        if (config.dsUrl) {
            let ns = this.extractHostname(config.dsUrl);
            return new DSPlatformInfo(activated, info, core_version, ns);
        }
        else {
            return new DSPlatformInfo(activated, info, core_version);
        }
    }

    private static extractHostname(url: string): string {
        let hostname;
        // find & remove protocol (http, ftp, etc.) and get hostname
        if (url.indexOf('://') > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }
        // find & remove port number
        hostname = hostname.split(':')[0];
        // find & remove "?"
        hostname = hostname.split('?')[0];
        return hostname;
    }

    private static coreV2Compatible(version: string): boolean {
        // sanitize version string
        let sanitized = semver.coerce(version);
        return semver.satisfies(sanitized, '>=2.0.0');
    }

    private static checkTokenCompatible(version: string): boolean {
        // sanitize version string
        let sanitized = semver.coerce(version);
        return semver.satisfies(sanitized, '>=1.4.0');
    }
}
