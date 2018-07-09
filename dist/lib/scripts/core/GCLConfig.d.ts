import { Pkcs11ModuleConfig } from '../plugins/smartcards/pkcs11/pkcs11Model';
export interface GCLConfigOptions {
    gclUrl?: string;
    gwOrProxyUrl?: string;
    apiKey?: string;
    gwJwt?: string;
    ocvContextPath?: string;
    dsContextPath?: string;
    dsFileContextPath?: string;
    pkcs11Config?: Pkcs11ModuleConfig;
    agentPort?: number;
    implicitDownload?: boolean;
    forceHardwarePinpad?: boolean;
    sessionTimeout?: number;
    consentDuration?: number;
    consentTimeout?: number;
    syncManaged?: boolean;
    osPinDialog?: boolean;
    containerDownloadTimeout?: number;
    localTestMode?: boolean;
}
export declare class GCLConfig {
    private static instance;
    private _gwUrl;
    private _gclUrl;
    private _dsContextPath;
    private _dsFileContextPath;
    private _ocvContextPath;
    private _apiKey;
    private _gwJwt;
    private _gclJwt;
    private _citrix;
    private _agentPort;
    private _implicitDownload;
    private _localTestMode;
    private _forceHardwarePinpad;
    private _defaultSessionTimeout;
    private _tokenCompatible;
    private _v2Compatible;
    private _defaultConsentDuration;
    private _defaultConsentTimeout;
    private _syncManaged;
    private _pkcs11Config;
    private _osPinDialog;
    private _containerDownloadTimeout;
    private _contextToken;
    private _isManaged;
    constructor(options: any);
    readonly authUrl: string;
    readonly ocvUrl: string;
    ocvContextPath: string;
    gclUrl: string;
    readonly dsUrl: string;
    dsContextPath: string;
    dsFileContextPath: string;
    apiKey: string;
    citrix: boolean;
    isManaged: boolean;
    agentPort: number;
    implicitDownload: boolean;
    readonly dsFileDownloadUrl: string;
    gwUrl: string;
    localTestMode: boolean;
    forceHardwarePinpad: boolean;
    defaultSessionTimeout: number;
    tokenCompatible: boolean;
    v2Compatible: boolean;
    defaultConsentDuration: number;
    defaultConsentTimeout: number;
    syncManaged: boolean;
    pkcs11Config: Pkcs11ModuleConfig;
    osPinDialog: boolean;
    containerDownloadTimeout: number;
    readonly gwJwt: Promise<string>;
    contextToken: string;
    gclJwt: string;
    getGwJwt(): Promise<string>;
}