/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
import * as CoreExceptions from './exceptions/CoreExceptions';
import * as _ from 'lodash';
import * as semver from 'semver';

import { GCLConfig } from './GCLConfig';
import { CoreService } from './service/CoreService';
import { LocalConnection, RemoteConnection, LocalAuthConnection, LocalTestConnection } from './client/Connection';
import {
    AbstractDSClient, DownloadLinkResponse, DSPlatformInfo,
    JWTResponse
} from './ds/DSClientModel';
import { DSClient } from './ds/DSClient';
import { AbstractOCVClient, OCVClient } from './ocv/OCVClient';
import { BrowserInfo, CardReadersResponse, DataResponse, InfoResponse } from './service/CoreModel';
import { AbstractEidBE } from '../plugins/smartcards/eid/be/EidBeModel';
import { AbstractEMV } from '../plugins/smartcards/emv/EMVModel';
import { AbstractOcra } from '../plugins/smartcards/ocra/ocraModel';
import { AbstractAventra } from '../plugins/smartcards/pki/aventra/AventraModel';
import { AbstractLuxTrust } from '../plugins/smartcards/pki/luxtrust/LuxTrustModel';
import { AbstractOberthur } from '../plugins/smartcards/pki/oberthur/OberthurModel';
import { AbstractPiv } from '../plugins/smartcards/piv/pivModel';
import { AbstractMobib } from '../plugins/smartcards/mobib/mobibModel';
import { AbstractEidLUX } from '../plugins/smartcards/eid/lux/EidLuxModel';
import { AbstractDNIe } from '../plugins/smartcards/eid/esp/dnieModel';
import { Promise } from 'es6-promise';
import { PluginFactory } from '../plugins/PluginFactory';
import { AbstractSafeNet } from '../plugins/smartcards/pkcs11/safenet/safenetModel';
import { AuthenticateOrSignData, OptionalPin } from '../plugins/smartcards/Card';
import { RestException } from './exceptions/CoreExceptions';
import { GenericService } from './generic/GenericService';
import { ResponseHandler } from '../util/ResponseHandler';
import { AbstractEidPT } from '../plugins/smartcards/eid/pt/EidPtModel';
import { AbstractRemoteLoading } from '../plugins/remote-loading/RemoteLoadingModel';
import { AbstractBelfius } from '../plugins/remote-loading/belfius/BelfiusModel';
import { AgentClient } from './agent/agent';
import { AbstractAgent } from './agent/agentModel';
import { AbstractFileExchange } from '../plugins/file/FileExchangeModel';
import { AdminService } from './admin/admin';

class GCLClient {
    public GCLInstalled: boolean;
    private cfg: GCLConfig;
    private pluginFactory: PluginFactory;
    private adminService: AdminService;
    private coreService: CoreService;
    private connection: LocalConnection;
    private authConnection: LocalAuthConnection;
    private remoteConnection: RemoteConnection;
    private localTestConnection: LocalTestConnection;
    private agentClient: AgentClient;
    private dsClient: DSClient;
    private ocvClient: OCVClient;

    constructor(cfg: GCLConfig, automatic: boolean) {
        let self = this;
        // resolve config to singleton
        this.cfg = GCLClient.resolveConfig(cfg);
        // init communication
        this.connection = new LocalConnection(this.cfg);
        this.authConnection = new LocalAuthConnection(this.cfg);
        this.remoteConnection = new RemoteConnection(this.cfg);
        this.localTestConnection = new LocalTestConnection(this.cfg);
        this.pluginFactory = new PluginFactory(this.cfg.gclUrl, this.connection);
        this.adminService = new AdminService(this.cfg.gclUrl, this.authConnection);
        this.coreService = new CoreService(this.cfg.gclUrl, this.authConnection);
        this.agentClient = new AgentClient(this.cfg.gclUrl, this.connection);
        if (this.cfg.localTestMode) { this.dsClient = new DSClient(this.cfg.dsUrl, this.localTestConnection, this.cfg); }
        else { this.dsClient = new DSClient(this.cfg.dsUrl, this.remoteConnection, this.cfg); }
        this.ocvClient = new OCVClient(this.cfg.ocvUrl, this.remoteConnection);

        // check if implicit download has been set
        if (this.cfg.implicitDownload && true) { this.implicitDownload(); }


        if (!automatic) {
            // setup security - fail safe
            this.initLibrary();
        }
    }

    public static initialize(cfg: GCLConfig,
                             callback?: (error: CoreExceptions.RestException, client: GCLClient) => void): Promise<GCLClient> {
        return new Promise((resolve, reject) => {
            let client = new GCLClient(cfg, true);

            // will be set to false if init fails
            client.GCLInstalled = true;

            client.initLibrary().then(() => {
                if (callback && typeof callback === 'function') { callback(null, client); }
                resolve(client);
            }, error => {
                if (callback && typeof callback === 'function') { callback(error, null); }
                reject(error);
            });
        });
    }

    private static coreV2Compatible(version: string): boolean {
        // sanitize version string
        let sanitized = _.split(version, '-')[0];
        return semver.satisfies(sanitized, '>=2.0.0');
    }

    private static checkTokenCompatible(version: string): boolean {
        // sanitize version string
        let sanitized = _.split(version, '-')[0];
        return semver.satisfies(sanitized, '>=1.4.0');
    }

    private static resolveConfig(cfg: GCLConfig) {
        // must be the base url because the GCLConfig object adds the context path and keeps the base url intact
        let resolvedCfg: GCLConfig = new GCLConfig(cfg.dsUrlBase, cfg.apiKey);
        resolvedCfg.allowAutoUpdate = cfg.allowAutoUpdate;
        resolvedCfg.client_id = cfg.client_id;
        resolvedCfg.client_secret = cfg.client_secret;
        resolvedCfg.jwt = cfg.jwt;
        resolvedCfg.gclUrl = cfg.gclUrl;
        resolvedCfg.ocvUrl = cfg.ocvUrl;
        resolvedCfg.implicitDownload = cfg.implicitDownload;
        resolvedCfg.localTestMode = cfg.localTestMode;
        resolvedCfg.forceHardwarePinpad = cfg.forceHardwarePinpad;
        resolvedCfg.defaultSessionTimeout = cfg.defaultSessionTimeout;
        resolvedCfg.defaultConsentDuration = cfg.defaultConsentDuration;
        resolvedCfg.defaultConsentTimeout = cfg.defaultConsentTimeout;
        resolvedCfg.citrix = cfg.citrix;
        resolvedCfg.agentPort = cfg.agentPort;
        resolvedCfg.syncManaged = cfg.syncManaged;
        return resolvedCfg;
    }

    // get admin services
    public admin = (): AdminService => { return this.adminService; };
    // get core services
    public core = (): CoreService => { return this.coreService; };
    // get core config
    public config = (): GCLConfig => { return this.cfg; };
    // get agent client services
    public agent = (): AbstractAgent => { return this.agentClient; };
    // get ds client services
    public ds = (): AbstractDSClient => { return this.dsClient; };
    // get ocv client services
    public ocv = (): AbstractOCVClient => { return this.ocvClient; };
    // get instance for belgian eID card
    public beid = (reader_id?: string): AbstractEidBE => { return this.pluginFactory.createEidBE(reader_id); };
    // get instance for spanish DNIe card
    public dnie = (reader_id?: string): AbstractDNIe => { return this.pluginFactory.createDNIe(reader_id); };
    // get instance for luxemburg eID card
    public luxeid = (reader_id?: string, pin?: string): AbstractEidLUX => { return this.pluginFactory.createEidLUX(reader_id, pin); };
    // get instance for luxtrust card
    public luxtrust = (reader_id?: string, pin?: string): AbstractLuxTrust => { return this.pluginFactory.createLuxTrust(reader_id); };
    // get instance for EMV
    public emv = (reader_id?: string): AbstractEMV => { return this.pluginFactory.createEmv(reader_id); };
    // get instance for MOBIB
    public mobib = (reader_id?: string): AbstractMobib => { return this.pluginFactory.createMobib(reader_id); };
    // get instance for OCRA
    public ocra = (reader_id?: string): AbstractOcra => { return this.pluginFactory.createOcra(reader_id); };
    // get instance for Aventra
    public aventra = (reader_id?: string): AbstractAventra => { return this.pluginFactory.createAventraNO(reader_id); };
    // get instance for Oberthur
    public oberthur = (reader_id?: string): AbstractOberthur => { return this.pluginFactory.createOberthurNO(reader_id); };
    // get instance for PIV
    public piv = (reader_id?: string): AbstractPiv => { return this.pluginFactory.createPIV(reader_id); };
    // get instance for PT Eid
    public pteid = (reader_id?: string): AbstractEidPT => { return this.pluginFactory.createEidPT(reader_id); };
    // get instance for PKCS11
    public safenet = (reader_id: string, moduleConfig: { linux: string, mac: string, win: string }): AbstractSafeNet => {
        return this.pluginFactory.createSafeNet(moduleConfig); };
    // get instance for Remote Loading
    public readerapi = (reader_id: string): AbstractRemoteLoading => { return this.pluginFactory.createRemoteLoading(reader_id); };
    // get instance for Belfius
    public belfius = (reader_id: string): AbstractBelfius => { return this.pluginFactory.createBelfius(reader_id); };
    // get instance for File Exchange
    // created for POC only, disabled
    // public fileExchange = (): AbstractFileExchange => { return this.pluginFactory.createFileExchange(); };

    // generic methods
    public containerFor(readerId: string, callback?: (error: RestException, data: DataResponse) => void) {
        return GenericService.containerForReader(this, readerId, callback);
    }

    public download(callback?: (error: RestException, data: DownloadLinkResponse) => void) {
        return this.core().infoBrowser().then(info => {
            return this.ds().downloadLink(info.data, callback);
        }, error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public dumpData(readerId: string, data: OptionalPin, callback?: (error: RestException, data: DataResponse) => void) {
        return GenericService.dumpData(this, readerId, data, callback);
    }

    public readersCanAuthenticate(callback?: (error: RestException, data: CardReadersResponse) => void) {
        return GenericService.authenticateCapable(this, callback);
    }
    public authenticate(readerId: string, data: AuthenticateOrSignData, callback?: (error: RestException, data: DataResponse) => void) {
        return GenericService.authenticate(this, readerId, data, callback);
    }

    public readersCanSign(callback?: (error: RestException, data: CardReadersResponse) => void) {
        return GenericService.signCapable(this, callback);
    }
    public sign(readerId: string, data: AuthenticateOrSignData, callback?: (error: RestException, data: DataResponse) => void) {
        return GenericService.sign(this, readerId, data, callback);
    }

    public readersCanVerifyPin(callback?: (error: RestException, data: CardReadersResponse) => void) {
        return GenericService.verifyPinCapable(this, callback);
    }
    public verifyPin(readerId: string, data: OptionalPin, callback?: (error: RestException, data: DataResponse) => void) {
        return GenericService.verifyPin(this, readerId, data, callback);
    }

    /**
     * Init OCV - verify if OCV is available
     */
    private initOCVContext(cb?: (error: any) => any) {
        return this.ocvClient.getInfo(cb);
    }

    /**
     * Init security context
     */
    private initLibrary(): Promise<{}> {
        let self = this;
        let self_cfg = this.cfg;

        return new Promise((resolve, reject) => {
            self.core().info().then(infoResponse => {
                // update config values
                self_cfg.citrix = infoResponse.data.citrix;
                self_cfg.tokenCompatible = GCLClient.checkTokenCompatible(infoResponse.data.version);
                self_cfg.v2Compatible = GCLClient.coreV2Compatible(infoResponse.data.version);

                let activated = infoResponse.data.activated;
                let managed = infoResponse.data.managed;
                let core_version = infoResponse.data.version;
                let uuid = infoResponse.data.uid;
                // compose info
                let info = self.core().infoBrowserSync();
                let mergedInfo = _.merge({ managed, core_version, activated }, info.data);


                if (managed) {
                    // only attempt to sync if API key and DS URL are available,
                    // and if syncing for managed devices is turned on
                    if (self_cfg.apiKey && self_cfg.dsUrlBase && self_cfg.syncManaged) {
                        // attempt to sync
                        self.syncDevice(self, self_cfg, mergedInfo, uuid).then(() => { resolve(); },
                            () => { resolve(); });
                    } else {
                        // nothing to do here *jetpack*
                        resolve();
                    }
                } else {
                    let activationPromise;
                    if (activated) {
                        // already activated, only need to sync device
                        activationPromise = Promise.resolve();
                    } else {
                        // not yet activated, do this now
                        activationPromise = this.unManagedInitialization(self, self_cfg, mergedInfo, uuid);
                    }
                    activationPromise.then(() => {
                        // device is activated, sync it
                        resolve(this.unManagedSynchronization(self, self_cfg, mergedInfo, uuid));
                    }, err => {
                        reject(err);
                    });
                }
            }, () => {
                // failure probably because GCL is not installed
                self.GCLInstalled = false;
                // resolve with client as-is to allow download
                resolve();
            });
        });
    }

    private unManagedSynchronization(self: GCLClient,
                                     self_cfg: GCLConfig,
                                     mergedInfo: { managed: boolean, core_version: string, activated: boolean } & BrowserInfo,
                                     uuid: string) {
        // check if we can use core v2 sync
        if (self_cfg.v2Compatible) {
            // do core v2 sync flow
            return self.coreV2Sync(self, self_cfg, mergedInfo, uuid);
        } else {
            // do v1 sync
            return self.syncDevice(self, self_cfg, mergedInfo, uuid).then(() => {
                mergedInfo.activated = true;
            });
        }
    }

    private coreV2Sync(self: GCLClient,
                       self_cfg: GCLConfig,
                       mergedInfo: { managed: boolean, core_version: string, activated: boolean } & BrowserInfo,
                       uuid: string) {
        return new Promise((resolve, reject) => {
            // get GCL Pubkey
            self.admin().getPubKey().then(pubKey => {
                return self.dsClient.synchronizationRequest(pubKey.data, mergedInfo, self_cfg.dsUrlBase).then(containerConfig => {
                    // forward container config to GCL
                    return self.admin().updateContainerConfig(containerConfig.data).then(containerState => {
                        // TODO poll for container download completion?
                        // sync device
                        return self.syncDevice(self, self_cfg, mergedInfo, uuid).then(() => {
                            mergedInfo.activated = true;
                            resolve();
                        });
                    });
                });
            }).catch(err => {
                reject(err);
            });
        });
    }

    private unManagedInitialization(self: GCLClient, self_cfg: GCLConfig,
                                    mergedInfo: { managed: boolean, core_version: string, activated: boolean } & BrowserInfo,
                                    uuid: string): Promise<{}> {
        // check if we can use core v2 initialization
        if (self_cfg.v2Compatible) {
            // do core v2 initialization flow
            return self.coreV2Init(self, mergedInfo, uuid);
        } else {
            // do v1 initialization
            return self.coreV1Init(self, self_cfg, mergedInfo, uuid);
        }
    }

    private coreV2Init(self: GCLClient,
                       mergedInfo: { managed: boolean, core_version: string, activated: boolean } & BrowserInfo, uuid: string) {
        return new Promise((resolve, reject) => {
            self.preRegister(self)
                .then(pubKey => {
                    return Promise.resolve({ self, uuid, pubKey, mergedInfo});
                })
                .then(self.register)
                .then(self.postRegister)
                .then(() => {
                    // activation sequence complete, resolve promise
                    resolve();
                }).catch(err => {
                reject(err);
            });

        });
    }

    private preRegister(self: GCLClient) {
        // get GCL pubkey and registration info
        return new Promise((resolve, reject) => {
            self.admin().getPubKey().then(pubKey => {
                resolve(pubKey);
            }).catch(err => {
                reject(err);
            });
        });

    }

    private register(args: { self: GCLClient, uuid: string, pubKey: string,
        mergedInfo: { managed: boolean, core_version: string, activated: boolean } & BrowserInfo }) {
        // register with DS
        return new Promise((resolve, reject) => {
            args.self.dsClient.activationRequest(args.pubKey, args.mergedInfo).then(res => {
                resolve({ self, activationResponse: res.data });
            }, err => {
                reject(err);
            });
        });
    }

    private postRegister(args: { self: GCLClient, activationResponse: any }) {
        // activate GCL
        return args.self.admin().activateGcl(args.activationResponse);
    }

    private coreV1Init(self: GCLClient, self_cfg: GCLConfig,
                       mergedInfo: { managed: boolean, core_version: string, activated: boolean } & BrowserInfo, uuid: string) {
        return new Promise((resolve, reject) => {
            // make sure pub key is set
            self.core().getPubKey().then(() => {
                // certificate loaded
                // console.log('certificate present, no need to retrieve from DS');
                resolve();
            }, err => {
                if (err && !err.success && err.code === 201) {
                    // no certificate loaded, retrieve it from DS
                    // console.log('no certificate set - retrieve cert from DS');
                    self.dsClient.getPubKey().then(dsResponse => {
                        return self.core().setPubKey(dsResponse.pubkey).then(() => {
                            // activate & register
                            // we need to register the device
                            // console.log('Register device:' + uuid);
                            return self.registerDevice(self, self_cfg, mergedInfo, uuid).then(() => { resolve(); });
                        });
                    }).catch(error => {
                        reject(error);
                    });
                }
            });
        });
    }

    private registerDevice(client: GCLClient, config: GCLConfig, info: DSPlatformInfo, deviceId: string): Promise<JWTResponse> {
        return client.dsClient.register(info, deviceId).then(activationResponse => {
            config.jwt = activationResponse.token;
            client.authConnection = new LocalAuthConnection(client.cfg);
            client.coreService = new CoreService(client.cfg.gclUrl, client.authConnection);
            return activationResponse;
        });
    }

    private syncDevice(client: GCLClient, config: GCLConfig, info: DSPlatformInfo, deviceId: string): Promise<JWTResponse> {
        return client.dsClient.sync(info, deviceId).then(activationResponse => {
            config.jwt = activationResponse.token;
            return activationResponse;
        });
    }

    // implicit download GCL instance when not found
    private implicitDownload() {
        let self = this;
        this.core().info(function(error: CoreExceptions.RestException) {
            console.log('implicit error', JSON.stringify(error));
            if (error) {
                // no gcl available - start download
                let _info = self.core().infoBrowserSync();
                console.log('implicit error', JSON.stringify(_info));
                self.ds().downloadLink(_info.data,
                    function(linkError: CoreExceptions.RestException, downloadResponse: DownloadLinkResponse) {
                        if (linkError) { console.error('could not download GCL package:', linkError.description); }
                        window.open(downloadResponse.url); return;
                    });
            } else { return; }
        });
    }
}

export { GCLClient, GCLConfig };

