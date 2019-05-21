"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CoreService_1 = require("./service/CoreService");
var Connection_1 = require("./client/Connection");
var DSClientModel_1 = require("./ds/DSClientModel");
var DSClient_1 = require("./ds/DSClient");
var OCVClient_1 = require("./ocv/OCVClient");
var PluginFactory_1 = require("../plugins/PluginFactory");
var GenericService_1 = require("./generic/GenericService");
var ResponseHandler_1 = require("../util/ResponseHandler");
var agent_1 = require("./agent/agent");
var admin_1 = require("./admin/admin");
var InitUtil_1 = require("../util/InitUtil");
var ClientService_1 = require("../util/ClientService");
var Auth_1 = require("./auth/Auth");
var moment = require("moment");
var Polyfills_1 = require("../util/Polyfills");
var DSException_1 = require("./exceptions/DSException");
var __1 = require("../..");
var defaults = {
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
                    reject(new DSException_1.DSException('Distribution server is not configured'));
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
    GCLClient.checkPolyfills = function () {
        Polyfills_1.Polyfills.check();
    };
    GCLClient.initialize = function (cfg, callback) {
        return new Promise(function (resolve, reject) {
            var initTime = moment();
            var client = new GCLClient(cfg, true);
            ClientService_1.ClientService.setClient(client);
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
        return InitUtil_1.InitUtil.initializeLibrary(ClientService_1.ClientService.getClient());
    };
    ;
    GCLClient.prototype.encryptPin = function (pin) {
        return __1.PinEnforcer.encryptPin(pin);
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
        return GenericService_1.GenericService.containerForReader(this, readerId, callback);
    };
    GCLClient.prototype.download = function (callback) {
        var _this = this;
        return this.core().infoBrowser().then(function (info) {
            var downloadData = new DSClientModel_1.DSDownloadRequest(info.data.browser, info.data.manufacturer, info.data.os, info.data.ua, _this.config().gwUrl);
            return _this.ds().then(function (ds) {
                return ds.downloadLink(downloadData, callback);
            }, function (err) {
                return ResponseHandler_1.ResponseHandler.error(err, callback);
            });
        }, function (error) {
            return ResponseHandler_1.ResponseHandler.error(error, callback);
        });
    };
    GCLClient.prototype.dumpData = function (readerId, data, callback) {
        return GenericService_1.GenericService.dumpData(this, readerId, data, callback);
    };
    GCLClient.prototype.readersCanAuthenticate = function (callback) {
        return GenericService_1.GenericService.authenticateCapable(this, callback);
    };
    GCLClient.prototype.authenticate = function (readerId, data, callback) {
        return GenericService_1.GenericService.authenticate(this, readerId, data, callback);
    };
    GCLClient.prototype.authenticateWithEncryptedPin = function (readerId, data, callback) {
        return GenericService_1.GenericService.authenticateWithEncryptedPin(this, readerId, data, callback);
    };
    GCLClient.prototype.readersCanSign = function (callback) {
        return GenericService_1.GenericService.signCapable(this, callback);
    };
    GCLClient.prototype.sign = function (readerId, data, callback) {
        return GenericService_1.GenericService.sign(this, readerId, data, callback);
    };
    GCLClient.prototype.signWithEncryptedPin = function (readerId, data, callback) {
        return GenericService_1.GenericService.signWithEncryptedPin(this, readerId, data, callback);
    };
    GCLClient.prototype.readersCanVerifyPin = function (callback) {
        return GenericService_1.GenericService.verifyPinCapable(this, callback);
    };
    GCLClient.prototype.verifyPin = function (readerId, data, callback) {
        return GenericService_1.GenericService.verifyPin(this, readerId, data, callback);
    };
    GCLClient.prototype.verifyPinWithEncryptedPin = function (readerId, data, callback) {
        return GenericService_1.GenericService.verifyPinWithEncryptedPin(this, readerId, data, callback);
    };
    GCLClient.prototype.retrieveEncryptedUserPin = function (callback) {
        return this.core().retrieveEncryptedUserPin(callback);
    };
    GCLClient.prototype.updateAuthConnection = function (cfg) {
        this.authConnection = new Connection_1.LocalAuthConnection(cfg);
        this.adminService = new admin_1.AdminService(cfg.gclUrl, this.authConnection, this.adminConnection);
        this.coreService = new CoreService_1.CoreService(cfg.gclUrl, this.authConnection);
    };
    return GCLClient;
}());
exports.GCLClient = GCLClient;
//# sourceMappingURL=GCLLib.js.map