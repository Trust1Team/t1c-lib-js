/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */


import {CoreService} from './service/CoreService';
import {
    LocalConnection, RemoteJwtConnection, LocalAuthConnection, LocalTestConnection,
    RemoteApiKeyConnection, LocalAuthAdminConnection, LocalAdminConnection
} from './client/Connection';
import {DSDownloadLinkResponse, DSDownloadRequest} from './ds/DSClientModel';
import {DSClient} from './ds/DSClient';
import {OCVClient} from './ocv/OCVClient';
import {CardReadersResponse, DataResponse, T1CContainer, T1CContainerid} from './service/CoreModel';
import {AbstractEidBE} from '../plugins/smartcards/eid/be/EidBeModel';
import {AbstractEMV} from '../plugins/smartcards/emv/EMVModel';
import {AbstractOcra} from '../plugins/smartcards/ocra/ocraModel';
import {AbstractAventra} from '../plugins/smartcards/pki/aventra/AventraModel';
import {AbstractLuxTrust} from '../plugins/smartcards/pki/luxtrust/LuxTrustModel';
import {AbstractOberthur} from '../plugins/smartcards/pki/oberthur/OberthurModel';
import {AbstractPiv} from '../plugins/smartcards/piv/pivModel';
import {AbstractMobib} from '../plugins/smartcards/mobib/mobibModel';
import {AbstractEidLUX, PinType} from '../plugins/smartcards/eid/lux/EidLuxModel';
import {AbstractDNIe} from '../plugins/smartcards/eid/esp/dnieModel';
import {PluginFactory} from '../plugins/PluginFactory';
import {AuthenticateOrSignData, OptionalPin} from '../plugins/smartcards/Card';
import {T1CLibException} from './exceptions/CoreExceptions';
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
import * as moment from 'moment';
import {Polyfills} from '../util/Polyfills';
import {AbstractOCVClient} from './ocv/OCVModel';
import {GCLConfig} from './GCLConfig';
import {DSException} from './exceptions/DSException';
import {AbstractJavaKeyTool, AbstractSsh, PinEnforcer} from '../..';
import {AbstractWacom} from '../plugins/wacom/WacomModel';
import {AbstractBeLawyer} from '../plugins/smartcards/pki/BeLawyer/BeLawyerModel';
import {AbstractRawPrint} from '../plugins/raw-print/RawPrintModel';
import {AbstractIsabel} from '../plugins/smartcards/isabel/IsabelModel';

// check if any polyfills are needed
const defaults = {
    gclUrl: 'https://localhost:34752/v3',
    gwUrl: 'https://accapim.t1t.be:443',
    dsContextPath: '/trust1team/gclds/v3',
    dsContextPathTestMode: '/gcl-ds-web/v3',
    implicitDownload: false,
    localTestMode: false,
    forceHardwarePinpad: false,
    sessionTimeout: 5,
    consentDuration: 1,
    consentTimeout: 10,
    syncManaged: true,
    osPinDialog: false,
    containerDownloadTimeout: 30
};


export class GCLClient {
    private _gclInstalled: boolean;
    private localConfig: GCLConfig;
    private pluginFactory: PluginFactory;
    private adminService: AdminService;
    private coreService: CoreService;
    private connection: LocalConnection;
    private authConnection: LocalAuthConnection;
    private authAdminConnection: LocalAuthAdminConnection;
    private adminConnection: LocalAdminConnection;
    private remoteConnection: RemoteJwtConnection;
    private remoteApiKeyConnection: RemoteApiKeyConnection;
    private localTestConnection: LocalTestConnection;
    private agentClient: AgentClient;
    private dsClient: DSClient;
    private ocvClient: OCVClient;
    private authClient: AuthClient;

    public constructor(cfg: GCLConfig, automatic: boolean) {
        // resolve config to singleton
        this.localConfig = cfg;
        // init communication
        this.connection = new LocalConnection(this.localConfig);
        this.authConnection = new LocalAuthConnection(this.localConfig);
        this.authAdminConnection = new LocalAuthAdminConnection(this.localConfig);
        this.adminConnection = new LocalAdminConnection(this.localConfig);
        this.remoteConnection = new RemoteJwtConnection(this.localConfig);
        this.remoteApiKeyConnection = new RemoteApiKeyConnection(this.localConfig);
        this.localTestConnection = new LocalTestConnection(this.localConfig);
        this.pluginFactory = new PluginFactory(this.localConfig.gclUrl, this.connection);
        // in citrix mode the admin endpoint should not be called through the agent
        this.adminService = new AdminService(this.localConfig.gclUrl, this.authAdminConnection, this.adminConnection);
        this.coreService = new CoreService(this.localConfig.gclUrl, this.authConnection);
        this.agentClient = new AgentClient(this.localConfig.gclUrl, this.authConnection);
        // init DS if DS url is provided
        if (this.localConfig.dsUrl) {
            if (this.localConfig.localTestMode) {
                this.dsClient = new DSClient(this.localConfig.dsUrl, this.localTestConnection, this.localConfig);
            } else {
                this.dsClient = new DSClient(this.localConfig.dsUrl, this.remoteConnection, this.localConfig);
            }
        } else {
            this.dsClient = undefined;
        }

        // init OCV if OCV url is provided - check if initialised with API key or JWT to determine which to use
        if (this.localConfig.ocvUrl) {
            if (this.localConfig.apiKey && this.localConfig.apiKey.length) {
                this.ocvClient = new OCVClient(this.localConfig.ocvUrl, this.remoteApiKeyConnection);
            } else {
                this.ocvClient = new OCVClient(this.localConfig.ocvUrl, this.remoteConnection);
            }
        } else {
            this.ocvClient = undefined;
        }

        this.authClient = new AuthClient(this.localConfig, this.remoteApiKeyConnection);
        // keep reference to client in ClientService
        ClientService.setClient(this);


        if (!automatic) {
            // setup security - fail safe
            GCLClient.initLibrary();
        }
    }

    public static checkPolyfills() {
        Polyfills.check();
    }

    public static initialize(cfg: GCLConfig, callback?: (error: T1CLibException, client: GCLClient) => void): Promise<GCLClient> {
        return new Promise((resolve, reject) => {
            const initTime = moment();
            let client = new GCLClient(cfg, true);
            // keep reference to client in ClientService
            ClientService.setClient(client);

            // will be set to false if init fails
            client.gclInstalled = true;

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

    public encryptPin(pin: string): string {
        return PinEnforcer.encryptPin(pin);
    }

    // get admin services
    public admin = (): AdminService => {
        return this.adminService;
    }
    // get auth service
    public auth = (): AuthClient => {
        return this.authClient;
    }
    // get core services
    public core = (): CoreService => {
        return this.coreService;
    }
    // get core config
    public config = (): GCLConfig => {
        return this.localConfig;
    }
    // get agent client services
    public agent = (): AbstractAgent => {
        return this.agentClient;
    }
    // get ds client services
    public ds = (): Promise<DSClient> => {
        // als ds niet geconfigureerd is moet je hier een exception geven
        return new Promise((resolve, reject) => {
            if (this.dsClient) {
                resolve(this.dsClient);
            } else {
                reject(new DSException('Distribution server is not configured'));
            }
        });
    }
    // get ocv client services
    public ocv = (): AbstractOCVClient => {
        return this.ocvClient;
    }
    // get plugin factory
    public pf = (): PluginFactory => {
        return this.pluginFactory;
    }
    // get instance for belgian eID card
    public beid = (reader_id?: string): AbstractEidBE => {
        return this.pluginFactory.createEidBE(reader_id);
    }
    // get instance for belgian eID card
    public beLawyer = (reader_id?: string): AbstractBeLawyer => {
        return this.pluginFactory.createBeLawyer(reader_id);
    }
    // get instance for spanish DNIe card
    public dnie = (reader_id?: string): AbstractDNIe => {
        return this.pluginFactory.createDNIe(reader_id);
    }
    // get instance for luxemburg eID card
    public luxeid = (reader_id?: string, pin?: string, pinType?: PinType, isEncrypted = false): AbstractEidLUX => {
        return this.pluginFactory.createEidLUX(reader_id, pin, pinType, isEncrypted);
    }
    // get instance for luxtrust card
    public luxtrust = (reader_id?: string, pin?: string): AbstractLuxTrust => {
        return this.pluginFactory.createLuxTrust(reader_id);
    }
    // get instance for EMV
    public emv = (reader_id?: string): AbstractEMV => {
        return this.pluginFactory.createEmv(reader_id);
    }
    // get instance for MOBIB
    public mobib = (reader_id?: string): AbstractMobib => {
        return this.pluginFactory.createMobib(reader_id);
    }
    // get instance for OCRA
    public ocra = (reader_id?: string): AbstractOcra => {
        return this.pluginFactory.createOcra(reader_id);
    }
    // get instance for Aventra
    public aventra = (reader_id?: string): AbstractAventra => {
        return this.pluginFactory.createAventraNO(reader_id);
    }
    // get instance for Oberthur
    public oberthur = (reader_id?: string): AbstractOberthur => {
        return this.pluginFactory.createOberthurNO(reader_id);
    }
    // get instance for PIV
    public piv = (reader_id?: string): AbstractPiv => {
        return this.pluginFactory.createPIV(reader_id);
    }
    // get instance for PT Eid
    public pteid = (reader_id?: string): AbstractEidPT => {
        return this.pluginFactory.createEidPT(reader_id);
    }
    // get instance for PKCS11
    public pkcs11 = (): AbstractPkcs11 => {
        return this.pluginFactory.createPKCS11();
    }
    // get instance for Remote Loading
    public readerapi = (reader_id: string): AbstractRemoteLoading => {
        return this.pluginFactory.createRemoteLoading(reader_id);
    }
    // TODO change name
    // get instance for Belfius
    public belfius = (reader_id: string): AbstractBelfius => {
        return this.pluginFactory.createBelfius(reader_id);
    }
    // get instance for File Exchange
    public filex = (): AbstractFileExchange => {
        return this.pluginFactory.createFileExchange();
    }
    // get instance for Java key tool
    public javakeytool = (): AbstractJavaKeyTool => {
        return this.pluginFactory.createJavaKeyTool();
    }
    // get instance for SSH
    public ssh = (): AbstractSsh => {
        return this.pluginFactory.createSsh();
    }
    // get instance for Wacom
    public wacom = (): AbstractWacom => {
        return this.pluginFactory.createWacom();
    }
    public rawprint = (): AbstractRawPrint => {
        return this.pluginFactory.createRawPrint(!this.config().citrix);
    }
    public isabel = (reader_id: string): AbstractIsabel => {
        return this.pluginFactory.createIsabel(reader_id, !this.config().citrix);
    }

    get gclInstalled(): boolean {
        return this._gclInstalled;
    }

    set gclInstalled(value: boolean) {
        this._gclInstalled = value;
    }

    // generic methods
    public containerFor(readerId: string, callback?: (error: T1CLibException, data: DataResponse) => void) {
        return GenericService.containerForReader(this, readerId, callback);
    }

    public download(version?: string, callback?: (error: T1CLibException, data: DSDownloadLinkResponse) => void) {
        return this.core().infoBrowser().then(info => {
            let downloadData = new DSDownloadRequest(info.data.browser, info.data.manufacturer,
                info.data.os, info.data.ua, this.config().gwUrl, version);
            return this.ds().then(ds => {
                return ds.downloadLink(downloadData, callback);
            }, err => {
                return ResponseHandler.error(err, callback);
            });
        }, error => {
            return ResponseHandler.error(error, callback);
        });
    }

    public dumpData(readerId: string, data: OptionalPin, callback?: (error: T1CLibException, data: DataResponse) => void) {
        return GenericService.dumpData(this, readerId, data, callback);
    }

    public readersCanAuthenticate(callback?: (error: T1CLibException, data: CardReadersResponse) => void) {
        return GenericService.authenticateCapable(this, callback);
    }

    public authenticate(readerId: string, data: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void) {
        return GenericService.authenticate(this, readerId, data, callback);
    }

    public authenticateWithEncryptedPin(readerId: string, data: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void) {
        return GenericService.authenticateWithEncryptedPin(this, readerId, data, callback);
    }

    public readersCanSign(callback?: (error: T1CLibException, data: CardReadersResponse) => void) {
        return GenericService.signCapable(this, callback);
    }

    public sign(readerId: string, data: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void) {
        return GenericService.sign(this, readerId, data, callback);
    }

    public signWithEncryptedPin(readerId: string, data: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void) {
        return GenericService.signWithEncryptedPin(this, readerId, data, callback);
    }

    public readersCanVerifyPin(callback?: (error: T1CLibException, data: CardReadersResponse) => void) {
        return GenericService.verifyPinCapable(this, callback);
    }

    public verifyPin(readerId: string, data: OptionalPin, callback?: (error: T1CLibException, data: DataResponse) => void) {
        return GenericService.verifyPin(this, readerId, data, callback);
    }

    public verifyPinWithEncryptedPin(readerId: string, data: OptionalPin, callback?: (error: T1CLibException, data: DataResponse) => void) {
        return GenericService.verifyPinWithEncryptedPin(this, readerId, data, callback);
    }

    public retrieveEncryptedUserPin(callback?: (error: T1CLibException, data: DataResponse) => void) {
        return this.core().retrieveEncryptedUserPin(callback);
    }


    /**
     * Utility methods
     */
    public updateAuthConnection(cfg: GCLConfig) {
        this.authConnection = new LocalAuthConnection(cfg);
        this.adminService = new AdminService(cfg.gclUrl, this.authConnection, this.adminConnection); // TODO check if authConnection or LocalAuthAdminConnection should be passed
        this.coreService = new CoreService(cfg.gclUrl, this.authConnection);
    }
}
