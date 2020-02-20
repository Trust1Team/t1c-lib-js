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
import { PinEnforcer } from '../..';
var defaults = {
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
var GCLClient = (function () {
    function GCLClient(cfg, automatic) {
        var _this = this;
        this.admin = function () {
            return _this.adminService;
        };
        this.auth = function () {
            return _this.authClient;
        };
        this.core = function () {
            return _this.coreService;
        };
        this.config = function () {
            return _this.localConfig;
        };
        this.agent = function () {
            return _this.agentClient;
        };
        this.ds = function () {
            return new Promise(function (resolve, reject) {
                if (_this.dsClient) {
                    resolve(_this.dsClient);
                }
                else {
                    reject(new DSException('Distribution server is not configured'));
                }
            });
        };
        this.ocv = function () {
            return _this.ocvClient;
        };
        this.pf = function () {
            return _this.pluginFactory;
        };
        this.beid = function (reader_id) {
            return _this.pluginFactory.createEidBE(reader_id);
        };
        this.beLawyer = function (reader_id) {
            return _this.pluginFactory.createBeLawyer(reader_id);
        };
        this.dnie = function (reader_id) {
            return _this.pluginFactory.createDNIe(reader_id);
        };
        this.luxeid = function (reader_id, pin, pinType, isEncrypted) {
            if (isEncrypted === void 0) { isEncrypted = false; }
            return _this.pluginFactory.createEidLUX(reader_id, pin, pinType, isEncrypted);
        };
        this.luxtrust = function (reader_id, pin) {
            return _this.pluginFactory.createLuxTrust(reader_id);
        };
        this.emv = function (reader_id) {
            return _this.pluginFactory.createEmv(reader_id);
        };
        this.mobib = function (reader_id) {
            return _this.pluginFactory.createMobib(reader_id);
        };
        this.ocra = function (reader_id) {
            return _this.pluginFactory.createOcra(reader_id);
        };
        this.aventra = function (reader_id) {
            return _this.pluginFactory.createAventraNO(reader_id);
        };
        this.oberthur = function (reader_id) {
            return _this.pluginFactory.createOberthurNO(reader_id);
        };
        this.piv = function (reader_id) {
            return _this.pluginFactory.createPIV(reader_id);
        };
        this.pteid = function (reader_id) {
            return _this.pluginFactory.createEidPT(reader_id);
        };
        this.pkcs11 = function () {
            return _this.pluginFactory.createPKCS11();
        };
        this.readerapi = function (reader_id) {
            return _this.pluginFactory.createRemoteLoading(reader_id);
        };
        this.belfius = function (reader_id) {
            return _this.pluginFactory.createBelfius(reader_id);
        };
        this.filex = function () {
            return _this.pluginFactory.createFileExchange();
        };
        this.javakeytool = function () {
            return _this.pluginFactory.createJavaKeyTool();
        };
        this.ssh = function () {
            return _this.pluginFactory.createSsh();
        };
        this.wacom = function () {
            return _this.pluginFactory.createWacom();
        };
        this.rawprint = function () {
            return _this.pluginFactory.createRawPrint(!_this.config().citrix);
        };
        this.isabel = function (reader_id) {
            return _this.pluginFactory.createIsabel(reader_id, !_this.config().citrix);
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
    GCLClient.checkPolyfills = function () {
        Polyfills.check();
    };
    GCLClient.initialize = function (cfg, callback) {
        return new Promise(function (resolve, reject) {
            var initTime = moment();
            var client = new GCLClient(cfg, true);
            ClientService.setClient(client);
            client.gclInstalled = true;
            GCLClient.initLibrary().then(function () {
                if (callback && typeof callback === 'function') {
                    callback(null, client);
                }
                var completionTime = moment();
                var duration = moment.duration(completionTime.diff(initTime));
                console.log('init completed in ' + duration.asMilliseconds() + ' ms');
                resolve(client);
            }, function (error) {
                if (callback && typeof callback === 'function') {
                    callback(error, null);
                }
                reject(error);
            });
        });
    };
    GCLClient.initLibrary = function () {
        return InitUtil.initializeLibrary(ClientService.getClient());
    };
    GCLClient.prototype.encryptPin = function (pin) {
        return PinEnforcer.encryptPin(pin);
    };
    Object.defineProperty(GCLClient.prototype, "gclInstalled", {
        get: function () {
            return this._gclInstalled;
        },
        set: function (value) {
            this._gclInstalled = value;
        },
        enumerable: true,
        configurable: true
    });
    GCLClient.prototype.containerFor = function (readerId, callback) {
        return GenericService.containerForReader(this, readerId, callback);
    };
    GCLClient.prototype.download = function (version, callback) {
        var _this = this;
        return this.core().infoBrowser().then(function (info) {
            var downloadData = new DSDownloadRequest(info.data.browser, info.data.manufacturer, info.data.os, info.data.ua, _this.config().gwUrl, version);
            return _this.ds().then(function (ds) {
                return ds.downloadLink(downloadData, callback);
            }, function (err) {
                return ResponseHandler.error(err, callback);
            });
        }, function (error) {
            return ResponseHandler.error(error, callback);
        });
    };
    GCLClient.prototype.dumpData = function (readerId, data, callback) {
        return GenericService.dumpData(this, readerId, data, callback);
    };
    GCLClient.prototype.readersCanAuthenticate = function (callback) {
        return GenericService.authenticateCapable(this, callback);
    };
    GCLClient.prototype.authenticate = function (readerId, data, callback) {
        return GenericService.authenticate(this, readerId, data, callback);
    };
    GCLClient.prototype.authenticateWithEncryptedPin = function (readerId, data, callback) {
        return GenericService.authenticateWithEncryptedPin(this, readerId, data, callback);
    };
    GCLClient.prototype.readersCanSign = function (callback) {
        return GenericService.signCapable(this, callback);
    };
    GCLClient.prototype.sign = function (readerId, data, callback) {
        return GenericService.sign(this, readerId, data, callback);
    };
    GCLClient.prototype.signWithEncryptedPin = function (readerId, data, callback) {
        return GenericService.signWithEncryptedPin(this, readerId, data, callback);
    };
    GCLClient.prototype.readersCanVerifyPin = function (callback) {
        return GenericService.verifyPinCapable(this, callback);
    };
    GCLClient.prototype.verifyPin = function (readerId, data, callback) {
        return GenericService.verifyPin(this, readerId, data, callback);
    };
    GCLClient.prototype.verifyPinWithEncryptedPin = function (readerId, data, callback) {
        return GenericService.verifyPinWithEncryptedPin(this, readerId, data, callback);
    };
    GCLClient.prototype.retrieveEncryptedUserPin = function (callback) {
        return this.core().retrieveEncryptedUserPin(callback);
    };
    GCLClient.prototype.updateAuthConnection = function (cfg) {
        this.authConnection = new LocalAuthConnection(cfg);
        this.adminService = new AdminService(cfg.gclUrl, this.authConnection, this.adminConnection);
        this.coreService = new CoreService(cfg.gclUrl, this.authConnection);
    };
    return GCLClient;
}());
export { GCLClient };
//# sourceMappingURL=GCLLib.js.map