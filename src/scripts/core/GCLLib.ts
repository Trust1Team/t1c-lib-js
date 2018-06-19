/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
import * as CoreExceptions from './exceptions/CoreExceptions';

import {GCLConfig} from './GCLConfig';
import {CoreService} from './service/CoreService';
import {
    LocalConnection, RemoteJwtConnection, LocalAuthConnection, LocalTestConnection,
    RemoteApiKeyConnection, LocalAuthAdminConnection
} from './client/Connection';
import {DSDownloadLinkResponse, DSDownloadRequest} from './ds/DSClientModel';
import {DSClient} from './ds/DSClient';
import {AbstractOCVClient, OCVClient} from './ocv/OCVClient';
import {CardReadersResponse, DataResponse} from './service/CoreModel';
import {AbstractEidBE} from '../plugins/smartcards/eid/be/EidBeModel';
import {AbstractEMV} from '../plugins/smartcards/emv/EMVModel';
import {AbstractOcra} from '../plugins/smartcards/ocra/ocraModel';
import {AbstractAventra} from '../plugins/smartcards/pki/aventra/AventraModel';
import {AbstractLuxTrust} from '../plugins/smartcards/pki/luxtrust/LuxTrustModel';
import {AbstractOberthur} from '../plugins/smartcards/pki/oberthur/OberthurModel';
import {AbstractPiv} from '../plugins/smartcards/piv/pivModel';
import {AbstractMobib} from '../plugins/smartcards/mobib/mobibModel';
import {AbstractEidLUX} from '../plugins/smartcards/eid/lux/EidLuxModel';
import {AbstractDNIe} from '../plugins/smartcards/eid/esp/dnieModel';
import {PluginFactory} from '../plugins/PluginFactory';
import {AuthenticateOrSignData, OptionalPin} from '../plugins/smartcards/Card';
import {RestException} from './exceptions/CoreExceptions';
import {GenericService} from './generic/GenericService';
import {ResponseHandler} from '../util/ResponseHandler';
import {AbstractEidPT} from '../plugins/smartcards/eid/pt/EidPtModel';
import {AbstractRemoteLoading} from '../plugins/remote-loading/RemoteLoadingModel';
import {AbstractBelfius} from '../plugins/remote-loading/belfius/BelfiusModel';
import {AgentClient} from './agent/agent';
import {AbstractAgent} from './agent/agentModel';
import {AbstractFileExchange} from '../plugins/file/FileExchangeModel';
import {AdminService} from './admin/admin';
import {InitUtil} from '../util/InitUtil';
import {AbstractPkcs11} from '../plugins/smartcards/pkcs11/pkcs11Model';
import {ClientService} from '../util/ClientService';
import {AuthClient} from './auth/Auth';
import moment = require('moment');
import {Polyfills} from '../util/Polyfills';

// check if any polyfills are needed
Polyfills.check();


class GCLClient {
    public GCLInstalled: boolean;
    private cfg: GCLConfig;
    private pluginFactory: PluginFactory;
    private adminService: AdminService;
    private coreService: CoreService;
    private connection: LocalConnection;
    private authConnection: LocalAuthConnection;
    private authAdminConnection: LocalAuthAdminConnection;
    private remoteConnection: RemoteJwtConnection;
    private remoteApiKeyConnection: RemoteApiKeyConnection;
    private localTestConnection: LocalTestConnection;
    private agentClient: AgentClient;
    private dsClient: DSClient;
    private ocvClient: OCVClient;
    private authClient: AuthClient;

    constructor(cfg: GCLConfig, automatic: boolean) {
        // resolve config to singleton
        this.cfg = cfg;
        // init communication
        this.connection = new LocalConnection(this.cfg);
        this.authConnection = new LocalAuthConnection(this.cfg);
        this.authAdminConnection = new LocalAuthAdminConnection(this.cfg);
        this.remoteConnection = new RemoteJwtConnection(this.cfg);
        this.remoteApiKeyConnection = new RemoteApiKeyConnection(this.cfg);
        this.localTestConnection = new LocalTestConnection(this.cfg);
        this.pluginFactory = new PluginFactory(this.cfg.gclUrl, this.connection);
        // in citrix mode the admin endpoint should not be called through the agent
        this.adminService = new AdminService(this.cfg.gclUrl, this.authAdminConnection);
        this.coreService = new CoreService(this.cfg.gclUrl, this.authConnection);
        this.agentClient = new AgentClient(this.cfg.gclUrl, this.authConnection);
        if (this.cfg.localTestMode) {
            this.dsClient = new DSClient(this.cfg.dsUrl, this.localTestConnection, this.cfg);
        }
        else {
            this.dsClient = new DSClient(this.cfg.dsUrl, this.remoteConnection, this.cfg);
        }
        // TODO don't init if OCV not enabled
        // check if initialised with API key or JWT to determine which to use
        if (this.cfg.apiKey && this.cfg.apiKey.length) {
            this.ocvClient = new OCVClient(this.cfg.ocvUrl, this.remoteApiKeyConnection);
        } else {
            this.ocvClient = new OCVClient(this.cfg.ocvUrl, this.remoteConnection);
        }
        this.authClient = new AuthClient(this.cfg, this.remoteApiKeyConnection);
        // keep reference to client in ClientService
        ClientService.setClient(this);

        // check if implicit download has been set
        if (this.cfg.implicitDownload && true) {
            this.implicitDownload();
        }


        if (!automatic) {
            // setup security - fail safe
            GCLClient.initLibrary();
        }
    }

    public static checkPolyfills() {
        Polyfills.check();
    }

    public static initialize(cfg: GCLConfig,
                             callback?: (error: CoreExceptions.RestException, client: GCLClient) => void): Promise<GCLClient> {
        return new Promise((resolve, reject) => {
            const initTime = moment();
            let client = new GCLClient(cfg, true);
            // keep reference to client in ClientService
            ClientService.setClient(client);

            // will be set to false if init fails
            client.GCLInstalled = true;

            GCLClient.initLibrary().then(() => {
                if (callback && typeof callback === 'function') {
                    callback(null, client);
                }
                const completionTime = moment();
                const duration = moment.duration(completionTime.diff(initTime));
                console.log('init completed in ' + duration.asMilliseconds() + ' ms');
                resolve(client);
            }, error => {
                if (callback && typeof callback === 'function') {
                    callback(error, null);
                }
                reject(error);
            });
        });
    }

    /**
     * Init security context
     */
    private static initLibrary(): Promise<GCLClient> {
        return InitUtil.initializeLibrary(ClientService.getClient());
    }

    // get admin services
    public admin = (): AdminService => {
        return this.adminService;
    };
    // get auth service
    public auth = (): AuthClient => {
        return this.authClient;
    };
    // get core services
    public core = (): CoreService => {
        return this.coreService;
    };
    // get core config
    public config = (): GCLConfig => {
        return this.cfg;
    };
    // get agent client services
    public agent = (): AbstractAgent => {
        return this.agentClient;
    };
    // get ds client services
    public ds = (): DSClient => {
        return this.dsClient;
    };
    // get ocv client services
    public ocv = (): AbstractOCVClient => {
        return this.ocvClient;
    };
    // get plugin factory
    public pf = (): PluginFactory => {
        return this.pluginFactory;
    };
    // get instance for belgian eID card
    public beid = (reader_id?: string): AbstractEidBE => {
        return this.pluginFactory.createEidBE(reader_id);
    };
    // get instance for spanish DNIe card
    public dnie = (reader_id?: string): AbstractDNIe => {
        return this.pluginFactory.createDNIe(reader_id);
    };
    // get instance for luxemburg eID card
    public luxeid = (reader_id?: string, pin?: string): AbstractEidLUX => {
        return this.pluginFactory.createEidLUX(reader_id, pin);
    };
    // get instance for luxtrust card
    public luxtrust = (reader_id?: string, pin?: string): AbstractLuxTrust => {
        return this.pluginFactory.createLuxTrust(reader_id);
    };
    // get instance for EMV
    public emv = (reader_id?: string): AbstractEMV => {
        return this.pluginFactory.createEmv(reader_id);
    };
    // get instance for MOBIB
    public mobib = (reader_id?: string): AbstractMobib => {
        return this.pluginFactory.createMobib(reader_id);
    };
    // get instance for OCRA
    public ocra = (reader_id?: string): AbstractOcra => {
        return this.pluginFactory.createOcra(reader_id);
    };
    // get instance for Aventra
    public aventra = (reader_id?: string): AbstractAventra => {
        return this.pluginFactory.createAventraNO(reader_id);
    };
    // get instance for Oberthur
    public oberthur = (reader_id?: string): AbstractOberthur => {
        return this.pluginFactory.createOberthurNO(reader_id);
    };
    // get instance for PIV
    public piv = (reader_id?: string): AbstractPiv => {
        return this.pluginFactory.createPIV(reader_id);
    };
    // get instance for PT Eid
    public pteid = (reader_id?: string): AbstractEidPT => {
        return this.pluginFactory.createEidPT(reader_id);
    };
    // get instance for PKCS11
    public pkcs11 = (): AbstractPkcs11 => {
        return this.pluginFactory.createPKCS11();
    };
    // get instance for Remote Loading
    public readerapi = (reader_id: string): AbstractRemoteLoading => {
        return this.pluginFactory.createRemoteLoading(reader_id);
    };
    // TODO change name
    // get instance for Belfius
    public belfius = (reader_id: string): AbstractBelfius => {
        return this.pluginFactory.createBelfius(reader_id);
    };
    // get instance for File Exchange
    public filex = (): AbstractFileExchange => {
        return this.pluginFactory.createFileExchange();
    };

    // generic methods
    public containerFor(readerId: string, callback?: (error: RestException, data: DataResponse) => void) {
        return GenericService.containerForReader(this, readerId, callback);
    }

    public download(callback?: (error: RestException, data: DSDownloadLinkResponse) => void) {
        return this.core().infoBrowser().then(info => {
            let downloadData = new DSDownloadRequest(info.data.browser, info.data.manufacturer,
                info.data.os, info.data.ua, this.config().gwUrl);
            return this.ds().downloadLink(downloadData, callback);
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
     * Utility methods
     */
    public updateAuthConnection(cfg: GCLConfig) {
        this.authConnection = new LocalAuthConnection(cfg);
        this.adminService = new AdminService(cfg.gclUrl, this.authConnection);
        this.coreService = new CoreService(cfg.gclUrl, this.authConnection);
    }

    // TODO review
    // implicit download GCL instance when not found
    private implicitDownload() {
        let self = this;
        this.core().info(function (error: CoreExceptions.RestException) {
            console.log('implicit error', JSON.stringify(error));
            if (error) {
                // no gcl available - start download
                let _info = self.core().infoBrowserSync();
                console.log('implicit error', JSON.stringify(_info));
                let downloadData = new DSDownloadRequest(_info.data.browser,
                    _info.data.manufacturer, _info.data.os, _info.data.ua, self.config().gwUrl);
                self.ds().downloadLink(downloadData,
                    function (linkError: CoreExceptions.RestException, downloadResponse: DSDownloadLinkResponse) {
                        if (linkError) {
                            console.error('could not download GCL package:', linkError.description);
                        }
                        window.open(downloadResponse.url);
                        return;
                    });
            } else {
                return;
            }
        });
    }
}

export {GCLClient};

