/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */

import * as _ from 'lodash';

const defaultGclUrl = 'https://localhost:10443/v1';
const defaultDSUrl = 'https://accapim.t1t.be:443';
const defaultDSContextPath = '/trust1team/gclds/v1';
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
    private _jwt: string;
    private _citrix: boolean;
    private _agentPort: number;
    private _allowAutoUpdate: boolean;
    private _implicitDownload: boolean;
    private _localTestMode: boolean;
    private _forceHardwarePinpad: boolean;
    private _defaultSessionTimeout: number;
    private _tokenCompatible: boolean;
    private _defaultConsentDuration: number;

    // constructor for DTO
    constructor (dsUriValue?: string, apiKey?: string) {
        this._gclUrl = defaultGclUrl;
        this._dsUrl = dsUriValue + defaultDSContextPath;
        this._ocvUrl = dsUriValue + defaultOCVContextPath;
        this._dsFileDownloadUrl = dsUriValue + fileDownloadUrlPostfix;
        this._dsUrlBase = dsUriValue;
        this._apiKey = apiKey;
        this._jwt = 'none';
        this._citrix = false;
        this._agentPort = -1;
        this._allowAutoUpdate = defaultAllowAutoUpdate;
        this._implicitDownload = defaultImplicitDownload;
        this._localTestMode = defaultLocalTestMode;
        this._forceHardwarePinpad = false;
        this._defaultSessionTimeout = 5;
        this._defaultConsentDuration = 1;
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

    get jwt(): string {
        return this._jwt;
    }

    set jwt(value: string) {
        this._jwt = value;
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

    get defaultConsentDuration(): number {
        return this._defaultConsentDuration;
    }

    set defaultConsentDuration(value: number) {
        this._defaultConsentDuration = value;
    }
}

export { GCLConfig };
