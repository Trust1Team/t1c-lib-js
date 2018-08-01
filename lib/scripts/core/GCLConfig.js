"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const jwtDecode = require("jwt-decode");
const moment = require("moment");
const CoreExceptions_1 = require("./exceptions/CoreExceptions");
const defaults = {
    gclUrl: 'https://localhost:10443/v2',
    dsContextPath: '/trust1team/gclds/v2',
    ocvContextPath: '/trust1team/ocv-api/v1',
    dsContextPathTestMode: '/gcl-ds-web/v2',
    dsFileContextPath: '/trust1team/gclds-file/v1',
    tokenExchangeContextPath: '/apiengineauth/v1',
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
class GCLConfigOptions {
    constructor(gclUrl, gwOrProxyUrl, apiKey, gwJwt, ocvContextPath, dsContextPath, dsFileContextPath, pkcs11Config, agentPort, implicitDownload, forceHardwarePinpad, sessionTimeout, consentDuration, consentTimeout, syncManaged, osPinDialog, containerDownloadTimeout, localTestMode, lang, providedContainers) {
        this.gclUrl = gclUrl;
        this.gwOrProxyUrl = gwOrProxyUrl;
        this.apiKey = apiKey;
        this.gwJwt = gwJwt;
        this.ocvContextPath = ocvContextPath;
        this.dsContextPath = dsContextPath;
        this.dsFileContextPath = dsFileContextPath;
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
}
exports.GCLConfigOptions = GCLConfigOptions;
class GCLConfig {
    constructor(options) {
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
                if (options.dsFileContextPath) {
                    this._dsFileContextPath = options.dsFileContextPath;
                }
                else {
                    this._dsFileContextPath = defaults.dsFileContextPath;
                }
            }
            else {
                this._dsFileContextPath = undefined;
            }
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
            if (this.gwUrl) {
                if (options.ocvContextPath) {
                    this._ocvContextPath = options.ocvContextPath;
                }
                else {
                    this._ocvContextPath = defaults.ocvContextPath;
                }
            }
            else {
                this._ocvContextPath = undefined;
            }
        }
    }
    get authUrl() {
        return this.gwUrl + defaults.tokenExchangeContextPath;
    }
    get ocvUrl() {
        if (!this.gwUrl) {
            return undefined;
        }
        else {
            return this.gwUrl + this.ocvContextPath;
        }
    }
    get ocvContextPath() {
        return this._ocvContextPath;
    }
    set ocvContextPath(value) {
        this._ocvContextPath = value;
    }
    get gclUrl() {
        return this._gclUrl;
    }
    set gclUrl(value) {
        this._gclUrl = value || defaults.gclUrl;
    }
    get dsUrl() {
        if (!this.gwUrl) {
            return undefined;
        }
        else {
            return this.gwUrl + this.dsContextPath;
        }
    }
    get dsContextPath() {
        return this._dsContextPath;
    }
    set dsContextPath(value) {
        this._dsContextPath = value;
    }
    get dsFileContextPath() {
        return this._dsFileContextPath;
    }
    set dsFileContextPath(value) {
        this._dsFileContextPath = value;
    }
    get apiKey() {
        return this._apiKey;
    }
    set apiKey(value) {
        this._apiKey = value;
    }
    get citrix() {
        return this._citrix;
    }
    set citrix(value) {
        this._citrix = value;
    }
    get agentPort() {
        return this._agentPort;
    }
    set agentPort(value) {
        this._agentPort = value;
    }
    get dsFileDownloadUrl() {
        if (!this.gwUrl) {
            return undefined;
        }
        else {
            return this.gwUrl + this.dsFileContextPath;
        }
    }
    get gwUrl() {
        return this._gwUrl;
    }
    set gwUrl(value) {
        this._gwUrl = value;
    }
    get localTestMode() {
        return this._localTestMode;
    }
    set localTestMode(value) {
        this._localTestMode = value;
    }
    get forceHardwarePinpad() {
        return this._forceHardwarePinpad;
    }
    set forceHardwarePinpad(value) {
        this._forceHardwarePinpad = value;
    }
    get defaultSessionTimeout() {
        return this._defaultSessionTimeout;
    }
    set defaultSessionTimeout(value) {
        this._defaultSessionTimeout = value;
    }
    get tokenCompatible() {
        return this._tokenCompatible;
    }
    set tokenCompatible(value) {
        this._tokenCompatible = value;
    }
    get v2Compatible() {
        return this._v2Compatible;
    }
    set v2Compatible(value) {
        this._v2Compatible = value;
    }
    get defaultConsentDuration() {
        return this._defaultConsentDuration;
    }
    set defaultConsentDuration(value) {
        this._defaultConsentDuration = value;
    }
    get defaultConsentTimeout() {
        return this._defaultConsentTimeout;
    }
    set defaultConsentTimeout(value) {
        this._defaultConsentTimeout = value;
    }
    get pkcs11Config() {
        return this._pkcs11Config;
    }
    set pkcs11Config(value) {
        this._pkcs11Config = value;
    }
    get osPinDialog() {
        return this._osPinDialog;
    }
    set osPinDialog(value) {
        this._osPinDialog = value;
    }
    get containerDownloadTimeout() {
        return this._containerDownloadTimeout;
    }
    set containerDownloadTimeout(value) {
        this._containerDownloadTimeout = value;
    }
    get gwJwt() {
        if (!this.gwUrl) {
            return new Promise((resolve, reject) => {
                resolve('none');
            });
        }
        let self = this;
        return new Promise((resolve, reject) => {
            if (!self._gwJwt || !self._gwJwt.length) {
                resolve(self.getGwJwt());
            }
            else {
                let decoded = jwtDecode(self._gwJwt);
                if (decoded < moment(new Date()).format('X')) {
                    resolve(self.getGwJwt());
                }
                else {
                    resolve(self._gwJwt);
                }
            }
        });
    }
    get contextToken() {
        return this._contextToken;
    }
    set contextToken(value) {
        this._contextToken = value;
    }
    get gclJwt() {
        return this._gclJwt;
    }
    set gclJwt(value) {
        this._gclJwt = value;
    }
    get lang() {
        return this._lang;
    }
    set lang(value) {
        this._lang = value;
    }
    get overrideContainers() {
        return this._providedContainers;
    }
    set overrideContainers(value) {
        this._providedContainers = value;
    }
    get activeContainers() {
        return this._activeContainers;
    }
    set activeContainers(value) {
        this._activeContainers = value;
    }
    getGwJwt() {
        if (this.apiKey && this.apiKey.length) {
            let config = {
                url: this.authUrl + '/login/application/token',
                method: 'GET',
                headers: { apikey: this.apiKey },
                responseType: 'json'
            };
            return new Promise((resolve, reject) => {
                axios_1.default.request(config).then((response) => {
                    this._gwJwt = response.data.token;
                    resolve(response.data.token);
                }, err => {
                    reject(err);
                });
            });
        }
        else {
            if (this._gwJwt && this._gwJwt.length) {
                return Promise.reject(new CoreExceptions_1.T1CLibException(412, '205', 'JWT expired'));
            }
            else {
                return Promise.reject(new CoreExceptions_1.T1CLibException(412, '901', 'No JWT or API key found in configuration'));
            }
        }
    }
}
exports.GCLConfig = GCLConfig;
//# sourceMappingURL=GCLConfig.js.map