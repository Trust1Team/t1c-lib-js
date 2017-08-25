/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
import * as CoreExceptions from "./exceptions/CoreExceptions";
import * as _ from "lodash";

import { GCLConfig } from "./GCLConfig";
import { CoreService } from "./service/CoreService";
import { LocalConnection, RemoteConnection, LocalAuthConnection, LocalTestConnection } from "./client/Connection";
import { AbstractDSClient, DownloadLinkResponse, JWTResponse } from "./ds/DSClientModel";
import { DSClient } from "./ds/DSClient";
import { AbstractOCVClient, OCVClient } from "./ocv/OCVClient";
import { CardReadersResponse, DataResponse, InfoResponse } from "./service/CoreModel";
import { AbstractEidBE } from "../plugins/smartcards/eid/be/EidBeModel";
import { AbstractEMV } from "../plugins/smartcards/emv/EMVModel";
import { AbstractOcra } from "../plugins/smartcards/ocra/ocraModel";
import { AbstractAventra } from "../plugins/smartcards/pki/aventra/AventraModel";
import { AbstractLuxTrust } from "../plugins/smartcards/pki/luxtrust/LuxTrustModel";
import { AbstractOberthur } from "../plugins/smartcards/pki/oberthur/OberthurModel";
import { AbstractPiv } from "../plugins/smartcards/piv/pivModel";
import { AbstractMobib } from "../plugins/smartcards/mobib/mobibModel";
import { AbstractEidLUX } from "../plugins/smartcards/eid/lux/EidLuxModel";
import { AbstractDNIe } from "../plugins/smartcards/eid/esp/dnieModel";
import { Promise } from "es6-promise";
import { PluginFactory } from "../plugins/PluginFactory";
import { AbstractSafeNet } from "../plugins/smartcards/pkcs11/safenet/safenetModel";
import { AuthenticateOrSignData, OptionalPin } from "../plugins/smartcards/Card";
import { RestException } from "./exceptions/CoreExceptions";
import { GenericService } from "./generic/GenericService";
import { ResponseHandler } from "../util/ResponseHandler";
import { AbstractEidPT } from "../plugins/smartcards/eid/pt/EidPtModel";
import { AbstractRemoteLoading } from "../plugins/remote-loading/RemoteLoadingModel";
import { AbstractBelfius } from "../plugins/remote-loading/belfius/BelfiusModel";


class GCLClient {
    private cfg: GCLConfig;
    private pluginFactory: PluginFactory;
    private coreService: CoreService;
    private connection: LocalConnection;
    private authConnection: LocalAuthConnection;
    private remoteConnection: RemoteConnection;
    private localTestConnection: LocalTestConnection;
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
        this.coreService = new CoreService(this.cfg.gclUrl, this.authConnection);
        if (this.cfg.localTestMode) { this.dsClient = new DSClient(this.cfg.dsUrl, this.localTestConnection, this.cfg); }
        else { this.dsClient = new DSClient(this.cfg.dsUrl, this.remoteConnection, this.cfg); }
        this.ocvClient = new OCVClient(this.cfg.ocvUrl, this.remoteConnection);

        // check if implicit download has been set
        if (this.cfg.implicitDownload && true) { this.implicitDownload(); }

        if (!automatic) {
            // setup security - fail safe
            this.initSecurityContext(function(err: {}) {
                if (err) {
                    console.log(JSON.stringify(err));
                    return;
                }
                self.registerAndActivate();
            });
        }

        // verify OCV accessibility
        this.initOCVContext(function(err: {}) {
            if (err) {
                console.warn("OCV not available for apikey, contact support@trust1team.com to add this capability");
            } else { console.log("OCV available for apikey"); }
        });
    }

    public static initialize(cfg: GCLConfig,
                             callback?: (error: CoreExceptions.RestException, client: GCLClient) => void): void | Promise<GCLClient> {
        return new Promise((resolve, reject) => {
            let client = new GCLClient(cfg, true);

            client.initSecurityContext(function(err: CoreExceptions.RestException) {
                if (err) {
                    console.log(JSON.stringify(err));
                    if (callback && typeof callback === "function") { callback(err, null); }
                    reject(err);
                } else {
                    client.registerAndActivate().then(() => {
                        if (callback && typeof callback === "function") { callback(null, client); }
                        resolve(client);
                    }, error => {
                        if (callback && typeof callback === "function") { callback(error, null); }
                        reject(error);
                    });
                }
            });
        });
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
        return resolvedCfg;
    }

    // get core services
    public core = (): CoreService => { return this.coreService; };
    // get core config
    public config = (): GCLConfig => { return this.cfg; };
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
    private initOCVContext(cb: (error: any) => any) {
        return this.ocvClient.getInfo(cb);
    }

    /**
     * Init security context
     */
    private initSecurityContext(cb: (error: CoreExceptions.RestException, data: {}) => void) {
        let self = this;
        let clientCb = cb;
        this.core().getPubKey(function(err: any) {
            if (err && err.data && !err.data.success) {
                // console.log('no certificate set - retrieve cert from DS');
                self.dsClient.getPubKey(function(error: any, dsResponse: any) {
                    if (error) { return clientCb(err, null); }
                    let innerCb = clientCb;

                    self.core().setPubKey(dsResponse.pubkey, function(pubKeyError: CoreExceptions.RestException) {
                        if (pubKeyError) { return innerCb(err, null); }
                        return innerCb(null, {});
                    });
                });
            }
            // certificate loaded
            return cb(null, {});
        });
    }

    private registerAndActivate() {
        let self = this;
        let self_cfg = this.cfg;
        return new Promise((resolve, reject) => {
            // get GCL info
            self.core().info(function(err: CoreExceptions.RestException, infoResponse: InfoResponse) {
                if (err) {
                    console.log(JSON.stringify(err));
                    reject(err);
                    return;
                }
                let activated = infoResponse.data.activated;
                let managed = infoResponse.data.managed;
                let core_version = infoResponse.data.version;
                let uuid = infoResponse.data.uid;
                // compose info
                let info = self.core().infoBrowserSync();
                let mergedInfo = _.merge({ managed, core_version, activated }, info.data);
                if (!activated) {
                    // we need to register the device
                    // console.log("Register device:"+uuid);
                    self.dsClient.register(mergedInfo, uuid,
                        function(error: CoreExceptions.RestException, activationResponse: JWTResponse) {
                            if (err) {
                                console.log("Error while registering the device: " + JSON.stringify(err));
                                reject(err);
                                return;
                            }
                            self_cfg.jwt = activationResponse.token;
                            self.authConnection = new LocalAuthConnection(self.cfg);
                            self.coreService = new CoreService(self.cfg.gclUrl, self.authConnection);
                            self.core().activate(function(activationError: CoreExceptions.RestException) {
                                if (activationError) {
                                    console.log("Error while activating the device: " + JSON.stringify(activationError));
                                    reject(err);
                                    return;
                                }
                                // sync
                                mergedInfo.activated = true;
                                self.dsClient.sync(mergedInfo, uuid, function(syncError: CoreExceptions.RestException) {
                                    if (syncError) {
                                        console.log("Error while syncing the device: " + JSON.stringify(syncError));
                                        reject(syncError);
                                        return;
                                    } else {
                                        resolve();
                                    }
                                });
                            });
                        });
                } else {
                    if (managed) {
                        // managed install, no need to synchronize
                        resolve();
                        return;
                    } else {
                        // we need to synchronize the device
                        // console.log("Sync device:"+uuid);
                        self.dsClient.sync(mergedInfo, uuid,
                            function (syncError: CoreExceptions.RestException, activationResponse: JWTResponse) {
                                if (syncError) {
                                    console.log("Error while syncing the device: " + JSON.stringify(syncError));
                                    reject(syncError);
                                    return;
                                }
                                self_cfg.jwt = activationResponse.token;
                                resolve();
                                return;
                            });
                    }
                }
            });
        });
    }

    // implicit download GCL instance when not found
    private implicitDownload() {
        let self = this;
        this.core().info(function(error: CoreExceptions.RestException) {
            console.log("implicit error", JSON.stringify(error));
            if (error) {
                // no gcl available - start download
                let _info = self.core().infoBrowserSync();
                console.log("implicit error", JSON.stringify(_info));
                self.ds().downloadLink(_info.data,
                    function(linkError: CoreExceptions.RestException, downloadResponse: DownloadLinkResponse) {
                        if (linkError) { console.error("could not download GCL package:", linkError.description); }
                        window.open(downloadResponse.url); return;
                    });
            } else { return; }
        });
    }
}

export { GCLClient, GCLConfig };

