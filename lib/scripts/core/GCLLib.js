"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreService_1 = require("./service/CoreService");
const Connection_1 = require("./client/Connection");
const DSClientModel_1 = require("./ds/DSClientModel");
const DSClient_1 = require("./ds/DSClient");
const OCVClient_1 = require("./ocv/OCVClient");
const PluginFactory_1 = require("../plugins/PluginFactory");
const GenericService_1 = require("./generic/GenericService");
const ResponseHandler_1 = require("../util/ResponseHandler");
const agent_1 = require("./agent/agent");
const admin_1 = require("./admin/admin");
const InitUtil_1 = require("../util/InitUtil");
const ClientService_1 = require("../util/ClientService");
const Auth_1 = require("./auth/Auth");
const moment = require("moment");
const Polyfills_1 = require("../util/Polyfills");
const DSException_1 = require("./exceptions/DSException");
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
class GCLClient {
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
                    reject(new DSException_1.DSException('Distribution server is not configured'));
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
        this.connection = new Connection_1.LocalConnection(this.localConfig);
        this.authConnection = new Connection_1.LocalAuthConnection(this.localConfig);
        this.authAdminConnection = new Connection_1.LocalAuthAdminConnection(this.localConfig);
        this.adminConnection = new Connection_1.LocalAdminConnection(this.localConfig);
        this.remoteConnection = new Connection_1.RemoteJwtConnection(this.localConfig);
        this.remoteApiKeyConnection = new Connection_1.RemoteApiKeyConnection(this.localConfig);
        this.localTestConnection = new Connection_1.LocalTestConnection(this.localConfig);
        this.pluginFactory = new PluginFactory_1.PluginFactory(this.localConfig.gclUrl, this.connection);
        this.adminService = new admin_1.AdminService(this.localConfig.gclUrl, this.authAdminConnection, this.adminConnection);
        this.coreService = new CoreService_1.CoreService(this.localConfig.gclUrl, this.authConnection);
        this.agentClient = new agent_1.AgentClient(this.localConfig.gclUrl, this.authConnection);
        if (this.localConfig.dsUrl) {
            if (this.localConfig.localTestMode) {
                this.dsClient = new DSClient_1.DSClient(this.localConfig.dsUrl, this.localTestConnection, this.localConfig);
            }
            else {
                this.dsClient = new DSClient_1.DSClient(this.localConfig.dsUrl, this.remoteConnection, this.localConfig);
            }
        }
        else {
            this.dsClient = undefined;
        }
        if (this.localConfig.ocvUrl) {
            if (this.localConfig.apiKey && this.localConfig.apiKey.length) {
                this.ocvClient = new OCVClient_1.OCVClient(this.localConfig.ocvUrl, this.remoteApiKeyConnection);
            }
            else {
                this.ocvClient = new OCVClient_1.OCVClient(this.localConfig.ocvUrl, this.remoteConnection);
            }
        }
        else {
            this.ocvClient = undefined;
        }
        this.authClient = new Auth_1.AuthClient(this.localConfig, this.remoteApiKeyConnection);
        ClientService_1.ClientService.setClient(this);
        if (!automatic) {
            GCLClient.initLibrary();
        }
    }
    static checkPolyfills() {
        Polyfills_1.Polyfills.check();
    }
    static initialize(cfg, callback) {
        return new Promise((resolve, reject) => {
            const initTime = moment();
            let client = new GCLClient(cfg, true);
            ClientService_1.ClientService.setClient(client);
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
        return InitUtil_1.InitUtil.initializeLibrary(ClientService_1.ClientService.getClient());
    }
    ;
    get gclInstalled() {
        return this._gclInstalled;
    }
    set gclInstalled(value) {
        this._gclInstalled = value;
    }
    containerFor(readerId, callback) {
        return GenericService_1.GenericService.containerForReader(this, readerId, callback);
    }
    download(callback) {
        return this.core().infoBrowser().then(info => {
            let downloadData = new DSClientModel_1.DSDownloadRequest(info.data.browser, info.data.manufacturer, info.data.os, info.data.ua, this.config().gwUrl);
            return this.ds().then(ds => {
                return ds.downloadLink(downloadData, callback);
            }, err => {
                return ResponseHandler_1.ResponseHandler.error(err, callback);
            });
        }, error => {
            return ResponseHandler_1.ResponseHandler.error(error, callback);
        });
    }
    dumpData(readerId, data, callback) {
        return GenericService_1.GenericService.dumpData(this, readerId, data, callback);
    }
    readersCanAuthenticate(callback) {
        return GenericService_1.GenericService.authenticateCapable(this, callback);
    }
    authenticate(readerId, data, callback) {
        return GenericService_1.GenericService.authenticate(this, readerId, data, callback);
    }
    readersCanSign(callback) {
        return GenericService_1.GenericService.signCapable(this, callback);
    }
    sign(readerId, data, callback) {
        return GenericService_1.GenericService.sign(this, readerId, data, callback);
    }
    readersCanVerifyPin(callback) {
        return GenericService_1.GenericService.verifyPinCapable(this, callback);
    }
    verifyPin(readerId, data, callback) {
        return GenericService_1.GenericService.verifyPin(this, readerId, data, callback);
    }
    updateAuthConnection(cfg) {
        this.authConnection = new Connection_1.LocalAuthConnection(cfg);
        this.adminService = new admin_1.AdminService(cfg.gclUrl, this.authConnection, this.adminConnection);
        this.coreService = new CoreService_1.CoreService(cfg.gclUrl, this.authConnection);
    }
}
exports.GCLClient = GCLClient;
//# sourceMappingURL=GCLLib.js.map