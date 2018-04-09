/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */

import { ModuleConfig } from '../plugins/smartcards/pkcs11/pkcs11Model';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { RestException } from './exceptions/CoreExceptions';

export { GCLConfig, GCLConfigOptions };

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

/**
 * GCL Config Options object. Contains all user-configurable configuration settings. Used to initialize GCLConfig.
 */
class GCLConfigOptions {
    constructor(public gclUrl?: string,
                public gwOrProxyUrl?: string,
                public apiKey?: string,
                public gwJwt?: string,
                public ocvContextPath?: string,
                public dsContextPath?: string,
                public dsFileContextPath?: string,
                public pkcs11Config?: ModuleConfig,
                public agentPort?: number,
                public implicitDownload?: boolean,
                public forceHardwarePinpad?: boolean,
                public sessionTimeout?: number,
                public consentDuration?: number,
                public consentTimeout?: number,
                public syncManaged?: boolean,
                public osPinDialog?: boolean,
                public containerDownloadTimeout?: number,
                public localTestMode?: boolean) {}
}

/**
 * GCL Configuration object. Represents the GCL Library configuration state.
 * Most settings are configurable by the user; some are set by the library itself.
 */
class GCLConfig implements GCLConfig {
    // singleton pattern
    private static instance: GCLConfig;
    private _gwUrl: string;
    private _gclUrl: string;
    private _dsContextPath: string;
    private _dsFileContextPath: string;
    private _ocvContextPath: string;
    private _apiKey: string;
    private _gwJwt: string;
    private _gclJwt: string;
    private _citrix: boolean;
    private _agentPort: number;
    private _implicitDownload: boolean;
    private _localTestMode: boolean;
    private _forceHardwarePinpad: boolean;
    private _defaultSessionTimeout: number;
    private _tokenCompatible: boolean;
    private _v2Compatible: boolean;
    private _defaultConsentDuration: number;
    private _defaultConsentTimeout: number;
    private _syncManaged: boolean;
    private _pkcs11Config: ModuleConfig;
    private _osPinDialog: boolean;
    private _containerDownloadTimeout: number;
    private _contextToken: string;

    // constructor for DTO
    constructor(options: GCLConfigOptions) {
        this._gclUrl = options.gclUrl || defaults.gclUrl;
        this._gwUrl = options.gwOrProxyUrl || defaults.gwUrl;
        this._dsContextPath = options.dsContextPath || defaults.dsContextPath;
        this._dsFileContextPath = options.dsFileContextPath || defaults.dsFileContextPath;
        this._ocvContextPath = options.ocvContextPath || defaults.ocvContextPath;
        this._apiKey = options.apiKey;
        this._gwJwt = options.gwJwt;
        this._citrix = false; // will be set to true during initialisation if Citrix environment is detected
        this._agentPort = options.agentPort || -1;
        this._implicitDownload = options.implicitDownload || defaults.implicitDownload;
        this._localTestMode = options.localTestMode || defaults.localTestMode;
        this._forceHardwarePinpad = options.forceHardwarePinpad || defaults.forceHardwarePinpad;
        this._defaultSessionTimeout = options.sessionTimeout || defaults.sessionTimeout;
        this._defaultConsentDuration = options.consentDuration || defaults.consentDuration;
        this._defaultConsentTimeout = options.consentTimeout || defaults.consentTimeout;
        this._syncManaged = options.syncManaged || defaults.syncManaged;
        this._pkcs11Config = options.pkcs11Config;
        this._osPinDialog = options.osPinDialog || defaults.osPinDialog;
        this._containerDownloadTimeout = options.containerDownloadTimeout || defaults.containerDownloadTimeout;
    }

    get authUrl(): string {
        return this.gwUrl + defaults.tokenExchangeContextPath;
    }

    get ocvUrl(): string {
        return this.gwUrl + this.ocvContextPath;
    }

    get ocvContextPath(): string {
        return this._ocvContextPath;
    }

    set ocvContextPath(value: string) {
        this._ocvContextPath = value;
    }

    get gclUrl(): string {
        return this._gclUrl;
    }

    set gclUrl(value: string) {
        this._gclUrl = value || defaults.gclUrl;
    }

    get dsUrl(): string {
        if (this._localTestMode) { return this.gwUrl + defaults.dsContextPathTestMode; }
        else { return this.gwUrl + this.dsContextPath; }
    }

    get dsContextPath(): string {
        return this._dsContextPath;
    }

    set dsContextPath(value: string) {
        this._dsContextPath = value;
    }

    get dsFileContextPath(): string {
        return this._dsFileContextPath;
    }

    set dsFileContextPath(value: string) {
        this._dsFileContextPath = value;
    }

    get apiKey(): string {
        return this._apiKey;
    }

    set apiKey(value: string) {
        this._apiKey = value;
    }

    get citrix(): boolean {
        return this._citrix;
    }

    set citrix(value: boolean) {
        this._citrix = value;
    }

    get agentPort(): number {
        return this._agentPort;
    }

    set agentPort(value: number) {
        this._agentPort = value;
    }

    get implicitDownload(): boolean {
        return this._implicitDownload;
    }

    set implicitDownload(value: boolean) {
        this._implicitDownload = value;
    }

    get dsFileDownloadUrl(): string {
        return this.gwUrl + this.dsFileContextPath;
    }

    get gwUrl() {
        return this._gwUrl;
    }

    set gwUrl(value: string) {
        this._gwUrl = value;
    }

    get localTestMode(): boolean {
        return this._localTestMode;
    }

    set localTestMode(value: boolean) {
        this._localTestMode = value;
    }

    get forceHardwarePinpad(): boolean {
        return this._forceHardwarePinpad;
    }

    set forceHardwarePinpad(value: boolean) {
        this._forceHardwarePinpad = value;
    }

    get defaultSessionTimeout(): number {
        return this._defaultSessionTimeout;
    }

    set defaultSessionTimeout(value: number) {
        this._defaultSessionTimeout = value;
    }

    get tokenCompatible(): boolean {
        return this._tokenCompatible;
    }

    set tokenCompatible(value: boolean) {
        this._tokenCompatible = value;
    }

    get v2Compatible(): boolean {
        return this._v2Compatible;
    }

    set v2Compatible(value: boolean) {
        this._v2Compatible = value;
    }

    get defaultConsentDuration(): number {
        return this._defaultConsentDuration;
    }

    set defaultConsentDuration(value: number) {
        this._defaultConsentDuration = value;
    }

    get defaultConsentTimeout(): number {
        return this._defaultConsentTimeout;
    }

    set defaultConsentTimeout(value: number) {
        this._defaultConsentTimeout = value;
    }

    get syncManaged(): boolean {
        return this._syncManaged;
    }

    set syncManaged(value: boolean) {
        this._syncManaged = value;
    }

    get pkcs11Config(): ModuleConfig {
        return this._pkcs11Config;
    }

    set pkcs11Config(value: ModuleConfig) {
        this._pkcs11Config = value;
    }

    get osPinDialog(): boolean {
        return this._osPinDialog;
    }

    set osPinDialog(value: boolean) {
        this._osPinDialog = value;
    }

    get containerDownloadTimeout(): number {
        return this._containerDownloadTimeout;
    }

    set containerDownloadTimeout(value: number) {
        this._containerDownloadTimeout = value;
    }

    get gwJwt(): Promise<string> {
        let self = this;
        return new Promise<string>((resolve, reject) => {
            if (!self._gwJwt || !self._gwJwt.length) {
                // no jwt available, get one from the GW if we have an API key
                resolve(self.getGwJwt());
            } else {
                let decoded = jwtDecode(self._gwJwt);
                // check JWT expired
                if (decoded.exp < moment(new Date()).format('X')) {
                    // refresh if we have an API key
                    resolve(self.getGwJwt());
                } else {
                    // jwt ok to use
                    resolve(self._gwJwt);
                }
            }
        });
    }

    get contextToken(): string {
        return this._contextToken;
    }

    set contextToken(value: string) {
        this._contextToken = value;
    }

    get gclJwt(): string {
        return this._gclJwt;
    }

    set gclJwt(value: string) {
        this._gclJwt = value;
    }

    /**
     * Returns Gateway JWT promise.
     * If JWT is available and valid, it is immediately returned;
     * if not, a new JWT is requested from the Gateway using the configured API key.
     *
     * If no API key is available (eg. the library was initialised with a JWT token), an error is returned.
     * The application then needs to refresh the JWT token an reinitialized the library.
     *
     * @returns {Promise<string>}
     */
    getGwJwt(): Promise<string> {
        if (this.apiKey && this.apiKey.length) {
            let config: AxiosRequestConfig = {
                url: this.authUrl + '/login/application/token',
                method: 'GET',
                headers: { apikey: this.apiKey },
                responseType:  'json'
            };
            return new Promise((resolve, reject) => {
                axios.request(config).then((response: AxiosResponse) => {
                    this._gwJwt = response.data.token;
                    resolve(response.data.token);
                }, err => {
                    reject(err);
                });
            });
        } else {
            if (this._gwJwt && this._gwJwt.length) {
                return Promise.reject(new RestException(412, '205', 'JWT expired'));
            } else {
                return Promise.reject(new RestException(412, '901', 'No JWT or API key found in configuration'));
            }
        }
    }
}
