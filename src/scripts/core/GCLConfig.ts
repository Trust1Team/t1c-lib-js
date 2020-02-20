import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import {T1CLibException} from './exceptions/CoreExceptions';
import {Pkcs11ModuleConfig} from '../plugins/smartcards/pkcs11/pkcs11Model';
import {T1CContainerid} from './service/CoreModel';

const defaults = {
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

export class GCLConfigOptions {
    constructor(public gclUrl?: string,
                public gwOrProxyUrl?: string,
                public apiKey?: string,
                public gwJwt?: string,
                public dsContextPath?: string,
                public pkcs11Config?: Pkcs11ModuleConfig,
                public agentPort?: number,
                public implicitDownload?: boolean,
                public forceHardwarePinpad?: boolean,
                public sessionTimeout?: number,
                public consentDuration?: number,
                public consentTimeout?: number,
                public syncManaged?: boolean,
                public osPinDialog?: boolean,
                public containerDownloadTimeout?: number,
                public localTestMode?: boolean,
                public lang?: string,
                public gclDownloadLink?: string,
                public providedContainers?: T1CContainerid[]) {
    }
}

/**
 * GCL Configuration object. Represents the GCL Library configuration state.
 * Most settings are configurable by the user; some are set by the library itself.
 */
export class GCLConfig {
    private _gwUrl: string;
    private _gclUrl: string;
    private _dsContextPath: string;
    private _apiKey: string;
    private _gwJwt: string;
    private _gclJwt: string;
    private _citrix: boolean;
    private _agentPort: number;
    private _localTestMode: boolean;
    private _forceHardwarePinpad: boolean;
    private _defaultSessionTimeout: number;
    private _tokenCompatible: boolean;
    private _v2Compatible: boolean;
    private _defaultConsentDuration: number;
    private _defaultConsentTimeout: number;
    private _pkcs11Config: Pkcs11ModuleConfig;
    private _osPinDialog: boolean;
    private _containerDownloadTimeout: number;
    private _contextToken: string;
    private _lang: string;
    private _gclDownloadLink: string;
    private _providedContainers: T1CContainerid[]; // force to use specific containerversion
    private _activeContainers: Map<string, string[]>; // hashmap with active application containers
    private _gclVersion: string;

    // constructor for DTO
    public constructor(options: GCLConfigOptions) {
        if (options) {
            if (options.gclUrl) {
                this._gclUrl = options.gclUrl;
            } else {
                this._gclUrl = defaults.gclUrl;
            }
            if (options.gclDownloadLink) {
                this._gclDownloadLink = options.gclDownloadLink;
            }
            if (options.gwOrProxyUrl) {
                this._gwUrl = options.gwOrProxyUrl;
            } else {
                this._gwUrl = undefined;
            }
            if (options.apiKey) {
                this._apiKey = options.apiKey;
            } else {
                this._apiKey = undefined;
            } // no default
            if (options.gwJwt) {
                this._gwJwt = options.gwJwt;
            } else {
                this._gwJwt = undefined;
            } // no default

            if (options.agentPort) {
                this._agentPort = options.agentPort;
            } else {
                this._agentPort = -1;
            }
            if (options.localTestMode) {
                this._localTestMode = options.localTestMode;
            } else {
                this._localTestMode = defaults.localTestMode;
            } // TODO: review
            if (options.forceHardwarePinpad) {
                this._forceHardwarePinpad = options.forceHardwarePinpad;
            } else {
                this._forceHardwarePinpad = defaults.forceHardwarePinpad;
            }
            if (options.sessionTimeout) {
                this._defaultSessionTimeout = options.sessionTimeout;
            } else {
                this._defaultSessionTimeout = defaults.sessionTimeout;
            }
            if (options.consentDuration) {
                this._defaultConsentDuration = options.consentDuration;
            } else {
                this._defaultConsentDuration = defaults.consentDuration;
            }
            if (options.consentTimeout) {
                this._defaultConsentTimeout = options.consentTimeout;
            } else {
                this._defaultConsentTimeout = defaults.consentTimeout;
            }
            if (options.pkcs11Config) {
                this._pkcs11Config = options.pkcs11Config;
            } else {
                this._pkcs11Config = undefined;
            } // no default
            if (options.osPinDialog) {
                this._osPinDialog = options.osPinDialog;
            } else {
                this._osPinDialog = defaults.osPinDialog;
            }
            if (options.containerDownloadTimeout) {
                this._containerDownloadTimeout = options.containerDownloadTimeout;
            } else {
                this._containerDownloadTimeout = defaults.containerDownloadTimeout;
            }
            if (options.lang) {
                this._lang = options.lang;
            } else {
                this._lang = defaults.lang;
            }
            if (options.providedContainers) {
                this._providedContainers = options.providedContainers;
            } else {
                this._providedContainers = undefined;
            }
            this._citrix = false; // will be set to true during initialisation if Shared environment is detected

            // resolve DS context path
            if (this.gwUrl) {
                if (options.dsContextPath) {
                    this._dsContextPath = options.dsContextPath;
                } else {
                    this._dsContextPath = defaults.dsContextPath;
                }
            } else {
                this._dsContextPath = undefined;
            }
        }
    }

    get authUrl(): string {
        // TODO: remove
        return undefined;
    }

    get ocvUrl(): string {
        return undefined;
    }

    get gclUrl(): string {
        return this._gclUrl;
    }

    set gclUrl(value: string) {
        this._gclUrl = value || defaults.gclUrl;
    }

    get dsUrl(): string {
        if (!this.gwUrl) {
            return undefined;
        } else {
            return this.gwUrl + this.dsContextPath;
        }
    }

    get dsContextPath(): string {
        return this._dsContextPath;
    }

    set dsContextPath(value: string) {
        this._dsContextPath = value;
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

    get dsFileDownloadUrl(): string {
        return undefined;
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

    get pkcs11Config(): Pkcs11ModuleConfig {
        return this._pkcs11Config;
    }

    set pkcs11Config(value: Pkcs11ModuleConfig) {
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

    // TODO should we refresh if expires < x time?
    // if no gwUrl -> skip JWT and return placeholder
    get gwJwt(): Promise<string> {
        if (!this.gwUrl) {
            return new Promise<string>((resolve, reject) => {
                resolve('none');
            });
        }
        let self = this;
        return new Promise<string>((resolve, reject) => {
            if (!self._gwJwt || !self._gwJwt.length) {
                // no jwt available, get one from the GW if we have an API key
                self.getGwJwt().then(result => {
                    resolve(result);
                }, err => {
                    reject(err);
                });
            } else {
                let decoded = jwtDecode(self._gwJwt);
                // check JWT expired
                if (decoded < moment(new Date()).format('X')) {
                    // refresh if we have an API key
                    self.getGwJwt().then(result => {
                        resolve(result);
                    }, err => {
                        reject(err);
                    });
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

    get lang(): string {
        return this._lang;
    }

    set lang(value: string) {
        this._lang = value;
    }

    get overrideContainers(): T1CContainerid[] {
        return this._providedContainers;
    }

    set overrideContainers(value: T1CContainerid[]) {
        this._providedContainers = value;
    }

    get activeContainers(): Map<string, string[]> {
        return this._activeContainers;
    }

    set activeContainers(value: Map<string, string[]>) {
        this._activeContainers = value;
    }


    get gclDownloadLink(): string {
        return this._gclDownloadLink;
    }

    set gclDownloadLink(value: string) {
        this._gclDownloadLink = value;
    }

    get gclVersion(): string {
        return this._gclVersion;
    }

    set gclVersion(value: string) {
        this._gclVersion = value;
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
                headers: {apikey: this.apiKey},
                responseType: 'json'
            };
            return new Promise((resolve, reject) => {
                axios.request(config).then((response: AxiosResponse) => {
                    this._gwJwt = response.data.token;
                    resolve(response.data.token);
                }, err => {
                    console.warn(err);
                    if (err.response) {
                        if (err.response.data) {
                            if (err.response.data.message) {
                                reject(new T1CLibException(500, '' + (err.response.data.code || err.code || '998'), err.response.data.message));
                            } else if (err.response.data.description) {
                                reject(new T1CLibException(500, '' + (err.response.data.code || err.code || '998'), err.response.data.description));
                            } else {
                                reject(new T1CLibException(500, '' + (err.response.data.code || err.code || '998'), err.response.data));
                            }
                        } else {
                            reject(new T1CLibException(500, '' + err.code || '998', JSON.stringify(err.response)));
                        }
                    } else {
                        reject(new T1CLibException(500, '998', JSON.stringify(err)));
                    }
                });
            });
        } else {
            if (this._gwJwt && this._gwJwt.length) {
                return Promise.reject(new T1CLibException(412, '205', 'JWT expired'));
            } else {
                return Promise.reject(new T1CLibException(412, '901', 'No JWT or API key found in configuration'));
            }
        }
    }
}
