/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */

import * as _ from 'lodash';
import { ModuleConfig } from '../plugins/smartcards/pkcs11/pkcs11Model';
import { Promise } from 'es6-promise';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as jwtDecode from 'jwt-decode';

const defaultGclUrl = 'https://localhost:10443/v1';
const defaultDSUrl = 'https://accapim.t1t.be:443';
const defaultDSContextPath = '/trust1team/gclds/v2';
const defaultOCVContextPath = '/trust1team/ocv-api/v1';
const defaultDSContextPathTestMode = '/gcl-ds-web/v1';
const fileDownloadUrlPostfix = '/trust1team/gclds-file/v1';
const defaultAllowAutoUpdate = true;
const defaultImplicitDownload = false;
const defaultLocalTestMode = false;

class GCLConfig  implements GCLConfig {
    // singleton pattern
    private static instance: GCLConfig;
    private _dsUrlBase: string;
    private _ocvUrl: string;
    private _gclUrl: string;
    private _dsFileDownloadUrl: string;
    private _dsUrl: string;
    private _apiKey: string;
    private _client_id: string;
    private _client_secret: string;
    private _gwJwt: string;
    private _gclJwt: string;
    private _citrix: boolean;
    private _agentPort: number;
    private _allowAutoUpdate: boolean;
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

    // constructor for DTO
    constructor (dsUriValue?: string, apiKey?: string, pkcs11Config?: ModuleConfig) {
        this._gclUrl = defaultGclUrl;
        this._dsUrl = dsUriValue + defaultDSContextPath;
        this._ocvUrl = dsUriValue + defaultOCVContextPath;
        this._dsFileDownloadUrl = dsUriValue + fileDownloadUrlPostfix;
        this._dsUrlBase = dsUriValue;
        this._apiKey = apiKey;
        this._citrix = false;
        this._agentPort = -1;
        this._allowAutoUpdate = defaultAllowAutoUpdate;
        this._implicitDownload = defaultImplicitDownload;
        this._localTestMode = defaultLocalTestMode;
        this._forceHardwarePinpad = false;
        this._defaultSessionTimeout = 5;
        this._defaultConsentDuration = 1;
        this._defaultConsentTimeout = 10;
        this._syncManaged = true;
        this._pkcs11Config = pkcs11Config;
        this._osPinDialog = false;
        this._containerDownloadTimeout = 30;
    }

    get ocvUrl(): string {
        return this._ocvUrl;
    }

    set ocvUrl(value: string) {
        this._ocvUrl = value;
    }

    get gclUrl(): string {
        return this._gclUrl;
    }

    set gclUrl(value: string) {
        this._gclUrl = value || defaultGclUrl;
    }

    get dsUrl(): string {
        return this._dsUrl;
    }

    set dsUrl(dsUriValue: string) {
        if (_.endsWith(dsUriValue, defaultDSContextPath)) {
            this._dsUrlBase = _.replace(dsUriValue, defaultDSContextPath, '');
            this._dsUrl = dsUriValue;
            this._dsFileDownloadUrl = this._dsUrlBase + fileDownloadUrlPostfix;
            this._ocvUrl = this._dsUrlBase + defaultOCVContextPath;
        } else {
            this._dsUrl = dsUriValue + defaultDSContextPath;
            this._dsFileDownloadUrl = dsUriValue + fileDownloadUrlPostfix;
            this._dsUrlBase = dsUriValue;
            this._ocvUrl = dsUriValue + defaultOCVContextPath;
        }
    }

    get apiKey(): string {
        return this._apiKey;
    }

    set apiKey(value: string) {
        this._apiKey = value;
    }

    get allowAutoUpdate(): boolean {
        return this._allowAutoUpdate;
    }

    set allowAutoUpdate(value: boolean) {
        this._allowAutoUpdate = value;
    }

    get client_id(): string {
        return this._client_id;
    }

    set client_id(value: string) {
        this._client_id = value;
    }

    get client_secret(): string {
        return this._client_secret;
    }

    set client_secret(value: string) {
        this._client_secret = value;
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
        return this._dsFileDownloadUrl;
    }

    get dsUrlBase() {
        return this._dsUrlBase;
    }

    get localTestMode(): boolean {
        return this._localTestMode;
    }

    set localTestMode(value: boolean) {
        this._localTestMode = value;
        if (this._localTestMode) { this._dsUrl = this._dsUrlBase + defaultDSContextPathTestMode; }
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
        return new Promise((resolve, reject) => {
            console.log('promise');
            console.log(self);
            if (!self._gwJwt || !self._gwJwt.length) {
                console.log('no jwt');
                // no jwt available, get one from the GW
                resolve(self.getGwJwt());
            } else {
                console.log('jwt present');
                let decoded = jwtDecode(self._gwJwt);
                // check JWT expired
                if (decoded.exp < new Date()) {
                    // refresh
                    console.log('refreshing');
                    resolve(self.getGwJwt());
                } else {
                    // jwt ok to use
                    console.log('jwt ok');
                    resolve(self._gwJwt);
                }
            }
        });
    }

    get gclJwt(): string {
        return this._gclJwt;
    }

    set gclJwt(value: string) {
        this._gclJwt = value;
    }

    getGwJwt(): Promise<string> {
        console.log('get gw jwt');
        let config: AxiosRequestConfig = {
            url: this.dsUrlBase + '/apiengineauth/v1/login/application/token',
            method: 'GET',
            headers: { apikey: this.apiKey },
            responseType:  'json'
        };
        return axios.request(config).then((response: AxiosResponse) => {
            this._gwJwt = response.data.token;
            return response.data.token;
        });
    }
}

export { GCLConfig };
