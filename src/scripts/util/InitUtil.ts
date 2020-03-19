/**
 * @author Maarten Somers
 * @since 2018
 */
import {GCLClient} from '../core/GCLLib';
import * as semver from 'semver';
import {SyncUtil} from './SyncUtil';
import {DSPlatformInfo} from '../core/ds/DSClientModel';
import {PubKeyService} from './PubKeyService';
import {T1CLibException} from '../core/exceptions/CoreExceptions';
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
                            console.log('', infoResponse.data.version);
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
                });
            });
            initPromise.then(() => {
                // store device PubKey
                client.admin().getPubKey().then(pubKey => {
                    PubKeyService.setPubKey(pubKey.data);
                    finalResolve();
                });
            }, err => {
                console.log('Initialization error', err);
                finalReject(err);
            });

        });
    }

    private static containerHandler(config: GCLConfig, infoResponse: InfoResponse) {
        config.activeContainers = config.overrideContainers ? ActivatedContainerUtil.getSortedProvidedContainers(config.overrideContainers) : ActivatedContainerUtil.getSortedContainers(infoResponse.data.containers);
        // console.log(config.activeContainers);
    }

    private static activateAndSync(infoResponse: InfoResponse, mergedInfo: DSPlatformInfo, client: GCLClient, config: GCLConfig, initResolve: any, initReject: any) {
        const activated = infoResponse.data.activated;
        const uuid = infoResponse.data.uid;
        let activationPromise = new Promise((resolve, reject) => {
            if (activated) {
                resolve();
            } else {
                initReject(new T1CLibException(400, '400', 'Installed GCL is not activated and has no DS to activate', client));
            }
        });
        activationPromise.then(() => {
            // update core service
            client.updateAuthConnection(config);
            initResolve(SyncUtil.unManagedSynchronization(client, mergedInfo, uuid, infoResponse.data.containers, config));
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
