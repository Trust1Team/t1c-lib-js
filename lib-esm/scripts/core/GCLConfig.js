import axios from 'axios';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { T1CLibException } from './exceptions/CoreExceptions';
var defaults = {
    gclUrl: 'https://localhost:34752/v3',
    dsContextPath: '/trust1team/gclds/v3',
    dsContextPathTestMode: '/gcl-ds-web/v3',
    lang: 'en',
    implicitDownload: false,
    localTestMode: false,
    forceHardwarePinpad: false,
    sessionTimeout: 5,
    consentDuration: 1,
    consentTimeout: 10,
    osPinDialog: false,
    containerDownloadTimeout: 30
};
var GCLConfigOptions = (function () {
    function GCLConfigOptions(gclUrl, gwOrProxyUrl, apiKey, gwJwt, dsContextPath, pkcs11Config, agentPort, implicitDownload, forceHardwarePinpad, sessionTimeout, consentDuration, consentTimeout, syncManaged, osPinDialog, containerDownloadTimeout, localTestMode, lang, providedContainers) {
        this.gclUrl = gclUrl;
        this.gwOrProxyUrl = gwOrProxyUrl;
        this.apiKey = apiKey;
        this.gwJwt = gwJwt;
        this.dsContextPath = dsContextPath;
        this.pkcs11Config = pkcs11Config;
        this.agentPort = agentPort;
        this.implicitDownload = implicitDownload;
        this.forceHardwarePinpad = forceHardwarePinpad;
        this.sessionTimeout = sessionTimeout;
        this.consentDuration = consentDuration;
        this.consentTimeout = consentTimeout;
        this.syncManaged = syncManaged;
        this.osPinDialog = osPinDialog;
        this.containerDownloadTimeout = containerDownloadTimeout;
        this.localTestMode = localTestMode;
        this.lang = lang;
        this.providedContainers = providedContainers;
    }
    return GCLConfigOptions;
}());
export { GCLConfigOptions };
var GCLConfig = (function () {
    function GCLConfig(options) {
        if (options) {
            if (options.gclUrl) {
                this._gclUrl = options.gclUrl;
            }
            else {
                this._gclUrl = defaults.gclUrl;
            }
            if (options.gwOrProxyUrl) {
                this._gwUrl = options.gwOrProxyUrl;
            }
            else {
                this._gwUrl = undefined;
            }
            if (options.apiKey) {
                this._apiKey = options.apiKey;
            }
            else {
                this._apiKey = undefined;
            }
            if (options.gwJwt) {
                this._gwJwt = options.gwJwt;
            }
            else {
                this._gwJwt = undefined;
            }
            if (options.agentPort) {
                this._agentPort = options.agentPort;
            }
            else {
                this._agentPort = -1;
            }
            if (options.localTestMode) {
                this._localTestMode = options.localTestMode;
            }
            else {
                this._localTestMode = defaults.localTestMode;
            }
            if (options.forceHardwarePinpad) {
                this._forceHardwarePinpad = options.forceHardwarePinpad;
            }
            else {
                this._forceHardwarePinpad = defaults.forceHardwarePinpad;
            }
            if (options.sessionTimeout) {
                this._defaultSessionTimeout = options.sessionTimeout;
            }
            else {
                this._defaultSessionTimeout = defaults.sessionTimeout;
            }
            if (options.consentDuration) {
                this._defaultConsentDuration = options.consentDuration;
            }
            else {
                this._defaultConsentDuration = defaults.consentDuration;
            }
            if (options.consentTimeout) {
                this._defaultConsentTimeout = options.consentTimeout;
            }
            else {
                this._defaultConsentTimeout = defaults.consentTimeout;
            }
            if (options.pkcs11Config) {
                this._pkcs11Config = options.pkcs11Config;
            }
            else {
                this._pkcs11Config = undefined;
            }
            if (options.osPinDialog) {
                this._osPinDialog = options.osPinDialog;
            }
            else {
                this._osPinDialog = defaults.osPinDialog;
            }
            if (options.containerDownloadTimeout) {
                this._containerDownloadTimeout = options.containerDownloadTimeout;
            }
            else {
                this._containerDownloadTimeout = defaults.containerDownloadTimeout;
            }
            if (options.lang) {
                this._lang = options.lang;
            }
            else {
                this._lang = defaults.lang;
            }
            if (options.providedContainers) {
                this._providedContainers = options.providedContainers;
            }
            else {
                this._providedContainers = undefined;
            }
            this._citrix = false;
            if (this.gwUrl) {
                if (options.dsContextPath) {
                    this._dsContextPath = options.dsContextPath;
                }
                else {
                    this._dsContextPath = defaults.dsContextPath;
                }
            }
            else {
                this._dsContextPath = undefined;
            }
        }
    }
    Object.defineProperty(GCLConfig.prototype, "authUrl", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "ocvUrl", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "gclUrl", {
        get: function () {
            return this._gclUrl;
        },
        set: function (value) {
            this._gclUrl = value || defaults.gclUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "dsUrl", {
        get: function () {
            if (!this.gwUrl) {
                return undefined;
            }
            else {
                return this.gwUrl + this.dsContextPath;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "dsContextPath", {
        get: function () {
            return this._dsContextPath;
        },
        set: function (value) {
            this._dsContextPath = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "apiKey", {
        get: function () {
            return this._apiKey;
        },
        set: function (value) {
            this._apiKey = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "citrix", {
        get: function () {
            return this._citrix;
        },
        set: function (value) {
            this._citrix = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "agentPort", {
        get: function () {
            return this._agentPort;
        },
        set: function (value) {
            this._agentPort = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "dsFileDownloadUrl", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "gwUrl", {
        get: function () {
            return this._gwUrl;
        },
        set: function (value) {
            this._gwUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "localTestMode", {
        get: function () {
            return this._localTestMode;
        },
        set: function (value) {
            this._localTestMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "forceHardwarePinpad", {
        get: function () {
            return this._forceHardwarePinpad;
        },
        set: function (value) {
            this._forceHardwarePinpad = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "defaultSessionTimeout", {
        get: function () {
            return this._defaultSessionTimeout;
        },
        set: function (value) {
            this._defaultSessionTimeout = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "tokenCompatible", {
        get: function () {
            return this._tokenCompatible;
        },
        set: function (value) {
            this._tokenCompatible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "v2Compatible", {
        get: function () {
            return this._v2Compatible;
        },
        set: function (value) {
            this._v2Compatible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "defaultConsentDuration", {
        get: function () {
            return this._defaultConsentDuration;
        },
        set: function (value) {
            this._defaultConsentDuration = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "defaultConsentTimeout", {
        get: function () {
            return this._defaultConsentTimeout;
        },
        set: function (value) {
            this._defaultConsentTimeout = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "pkcs11Config", {
        get: function () {
            return this._pkcs11Config;
        },
        set: function (value) {
            this._pkcs11Config = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "osPinDialog", {
        get: function () {
            return this._osPinDialog;
        },
        set: function (value) {
            this._osPinDialog = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "containerDownloadTimeout", {
        get: function () {
            return this._containerDownloadTimeout;
        },
        set: function (value) {
            this._containerDownloadTimeout = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "gwJwt", {
        get: function () {
            if (!this.gwUrl) {
                return new Promise(function (resolve, reject) {
                    resolve('none');
                });
            }
            var self = this;
            return new Promise(function (resolve, reject) {
                if (!self._gwJwt || !self._gwJwt.length) {
                    self.getGwJwt().then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(err);
                    });
                }
                else {
                    var decoded = jwtDecode(self._gwJwt);
                    if (decoded < moment(new Date()).format('X')) {
                        self.getGwJwt().then(function (result) {
                            resolve(result);
                        }, function (err) {
                            reject(err);
                        });
                    }
                    else {
                        resolve(self._gwJwt);
                    }
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "contextToken", {
        get: function () {
            return this._contextToken;
        },
        set: function (value) {
            this._contextToken = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "gclJwt", {
        get: function () {
            return this._gclJwt;
        },
        set: function (value) {
            this._gclJwt = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "lang", {
        get: function () {
            return this._lang;
        },
        set: function (value) {
            this._lang = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "overrideContainers", {
        get: function () {
            return this._providedContainers;
        },
        set: function (value) {
            this._providedContainers = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "activeContainers", {
        get: function () {
            return this._activeContainers;
        },
        set: function (value) {
            this._activeContainers = value;
        },
        enumerable: true,
        configurable: true
    });
    GCLConfig.prototype.getGwJwt = function () {
        var _this = this;
        if (this.apiKey && this.apiKey.length) {
            var config_1 = {
                url: this.authUrl + '/login/application/token',
                method: 'GET',
                headers: { apikey: this.apiKey },
                responseType: 'json'
            };
            return new Promise(function (resolve, reject) {
                axios.request(config_1).then(function (response) {
                    _this._gwJwt = response.data.token;
                    resolve(response.data.token);
                }, function (err) {
                    console.warn(err);
                    if (err.response) {
                        if (err.response.data) {
                            if (err.response.data.message) {
                                reject(new T1CLibException(500, '' + (err.response.data.code || err.code || '998'), err.response.data.message));
                            }
                            else if (err.response.data.description) {
                                reject(new T1CLibException(500, '' + (err.response.data.code || err.code || '998'), err.response.data.description));
                            }
                            else {
                                reject(new T1CLibException(500, '' + (err.response.data.code || err.code || '998'), err.response.data));
                            }
                        }
                        else {
                            reject(new T1CLibException(500, '' + err.code || '998', JSON.stringify(err.response)));
                        }
                    }
                    else {
                        reject(new T1CLibException(500, '998', JSON.stringify(err)));
                    }
                });
            });
        }
        else {
            if (this._gwJwt && this._gwJwt.length) {
                return Promise.reject(new T1CLibException(412, '205', 'JWT expired'));
            }
            else {
                return Promise.reject(new T1CLibException(412, '901', 'No JWT or API key found in configuration'));
            }
        }
    };
    return GCLConfig;
}());
export { GCLConfig };
//# sourceMappingURL=GCLConfig.js.map