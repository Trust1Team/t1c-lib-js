import { CoreService } from './service/CoreService';
import { LocalConnection, RemoteJwtConnection, LocalAuthConnection, LocalTestConnection, RemoteApiKeyConnection, LocalAuthAdminConnection, LocalAdminConnection } from './client/Connection';
import { DSDownloadRequest } from './ds/DSClientModel';
import { DSClient } from './ds/DSClient';
import { OCVClient } from './ocv/OCVClient';
import { PluginFactory } from '../plugins/PluginFactory';
import { GenericService } from './generic/GenericService';
import { ResponseHandler } from '../util/ResponseHandler';
import { AgentClient } from './agent/agent';
import { AdminService } from './admin/admin';
import { InitUtil } from '../util/InitUtil';
import { ClientService } from '../util/ClientService';
import { AuthClient } from './auth/Auth';
import * as moment from 'moment';
import { Polyfills } from '../util/Polyfills';
import { DSException } from './exceptions/DSException';
const defaults = {
    gclUrl: 'https://localhost:10443/v2',
    gwUrl: 'https://accapim.t1t.be:443',
    dsContextPath: '/trust1team/gclds/v2',
    ocvContextPath: '/trust1team/ocv-api/v1',
    dsContextPathTestMode: '/gcl-ds-web/v2',
    dsFileContextPath: '/trust1team/gclds-file/v1',
    tokenExchangeContextPath: '/apiengineauth/v1',
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
    constructor(cfg, automatic) {
        this.admin = () => {
            return this.adminService;
        };
        this.auth = () => {
            return this.authClient;
        };
        this.core = () => {
            return this.coreService;
        };
        this.config = () => {
            return this.localConfig;
        };
        this.agent = () => {
            return this.agentClient;
        };
        this.ds = () => {
            return new Promise((resolve, reject) => {
                if (this.dsClient) {
                    resolve(this.dsClient);
                }
                else {
                    reject(new DSException('Distribution server is not configured'));
                }
            });
        };
        this.ocv = () => {
            return this.ocvClient;
        };
        this.pf = () => {
            return this.pluginFactory;
        };
        this.beid = (reader_id) => {
            return this.pluginFactory.createEidBE(reader_id);
        };
        this.dnie = (reader_id) => {
            return this.pluginFactory.createDNIe(reader_id);
        };
        this.luxeid = (reader_id, pin, pinType) => {
            return this.pluginFactory.createEidLUX(reader_id, pin, pinType);
        };
        this.luxtrust = (reader_id, pin) => {
            return this.pluginFactory.createLuxTrust(reader_id);
        };
        this.emv = (reader_id) => {
            return this.pluginFactory.createEmv(reader_id);
        };
        this.mobib = (reader_id) => {
            return this.pluginFactory.createMobib(reader_id);
        };
        this.ocra = (reader_id) => {
            return this.pluginFactory.createOcra(reader_id);
        };
        this.aventra = (reader_id) => {
            return this.pluginFactory.createAventraNO(reader_id);
        };
        this.oberthur = (reader_id) => {
            return this.pluginFactory.createOberthurNO(reader_id);
        };
        this.piv = (reader_id) => {
            return this.pluginFactory.createPIV(reader_id);
        };
        this.pteid = (reader_id) => {
            return this.pluginFactory.createEidPT(reader_id);
        };
        this.pkcs11 = () => {
            return this.pluginFactory.createPKCS11();
        };
        this.readerapi = (reader_id) => {
            return this.pluginFactory.createRemoteLoading(reader_id);
        };
        this.belfius = (reader_id) => {
            return this.pluginFactory.createBelfius(reader_id);
        };
        this.filex = () => {
            return this.pluginFactory.createFileExchange();
        };
        this.localConfig = cfg;
        this.connection = new LocalConnection(this.localConfig);
        this.authConnection = new LocalAuthConnection(this.localConfig);
        this.authAdminConnection = new LocalAuthAdminConnection(this.localConfig);
        this.adminConnection = new LocalAdminConnection(this.localConfig);
        this.remoteConnection = new RemoteJwtConnection(this.localConfig);
        this.remoteApiKeyConnection = new RemoteApiKeyConnection(this.localConfig);
        this.localTestConnection = new LocalTestConnection(this.localConfig);
        this.pluginFactory = new PluginFactory(this.localConfig.gclUrl, this.connection);
        this.adminService = new AdminService(this.localConfig.gclUrl, this.authAdminConnection, this.adminConnection);
        this.coreService = new CoreService(this.localConfig.gclUrl, this.authConnection);
        this.agentClient = new AgentClient(this.localConfig.gclUrl, this.authConnection);
        if (this.localConfig.dsUrl) {
            if (this.localConfig.localTestMode) {
                this.dsClient = new DSClient(this.localConfig.dsUrl, this.localTestConnection, this.localConfig);
            }
            else {
                this.dsClient = new DSClient(this.localConfig.dsUrl, this.remoteConnection, this.localConfig);
            }
        }
        else {
            this.dsClient = undefined;
        }
        if (this.localConfig.ocvUrl) {
            if (this.localConfig.apiKey && this.localConfig.apiKey.length) {
                this.ocvClient = new OCVClient(this.localConfig.ocvUrl, this.remoteApiKeyConnection);
            }
            else {
                this.ocvClient = new OCVClient(this.localConfig.ocvUrl, this.remoteConnection);
            }
        }
        else {
            this.ocvClient = undefined;
        }
        this.authClient = new AuthClient(this.localConfig, this.remoteApiKeyConnection);
        ClientService.setClient(this);
        if (!automatic) {
            GCLClient.initLibrary();
        }
    }
    static checkPolyfills() {
        Polyfills.check();
    }
    static initialize(cfg, callback) {
        return new Promise((resolve, reject) => {
            const initTime = moment();
            let client = new GCLClient(cfg, true);
            ClientService.setClient(client);
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
    static initLibrary() {
        return InitUtil.initializeLibrary(ClientService.getClient());
    }
    ;
    get gclInstalled() {
        return this._gclInstalled;
    }
    set gclInstalled(value) {
        this._gclInstalled = value;
    }
    containerFor(readerId, callback) {
        return GenericService.containerForReader(this, readerId, callback);
    }
    download(callback) {
        return this.core().infoBrowser().then(info => {
            let downloadData = new DSDownloadRequest(info.data.browser, info.data.manufacturer, info.data.os, info.data.ua, this.config().gwUrl);
            return this.ds().then(ds => {
                return ds.downloadLink(downloadData, callback);
            }, err => {
                return ResponseHandler.error(err, callback);
            });
        }, error => {
            return ResponseHandler.error(error, callback);
        });
    }
    dumpData(readerId, data, callback) {
        return GenericService.dumpData(this, readerId, data, callback);
    }
    readersCanAuthenticate(callback) {
        return GenericService.authenticateCapable(this, callback);
    }
    authenticate(readerId, data, callback) {
        return GenericService.authenticate(this, readerId, data, callback);
    }
    readersCanSign(callback) {
        return GenericService.signCapable(this, callback);
    }
    sign(readerId, data, callback) {
        return GenericService.sign(this, readerId, data, callback);
    }
    readersCanVerifyPin(callback) {
        return GenericService.verifyPinCapable(this, callback);
    }
    verifyPin(readerId, data, callback) {
        return GenericService.verifyPin(this, readerId, data, callback);
    }
    updateAuthConnection(cfg) {
        this.authConnection = new LocalAuthConnection(cfg);
        this.adminService = new AdminService(cfg.gclUrl, this.authConnection, this.adminConnection);
        this.coreService = new CoreService(cfg.gclUrl, this.authConnection);
    }
}
//# sourceMappingURL=GCLLib.js.map