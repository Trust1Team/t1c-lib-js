import { Pkcs11ModuleConfig } from '../plugins/smartcards/pkcs11/pkcs11Model';
import { T1CContainerid } from './service/CoreModel';
export declare class GCLConfigOptions {
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
    lang?: string;
    providedContainers?: T1CContainerid[];
    constructor(gclUrl?: string, gwOrProxyUrl?: string, apiKey?: string, gwJwt?: string, ocvContextPath?: string, dsContextPath?: string, dsFileContextPath?: string, pkcs11Config?: Pkcs11ModuleConfig, agentPort?: number, implicitDownload?: boolean, forceHardwarePinpad?: boolean, sessionTimeout?: number, consentDuration?: number, consentTimeout?: number, syncManaged?: boolean, osPinDialog?: boolean, containerDownloadTimeout?: number, localTestMode?: boolean, lang?: string, providedContainers?: T1CContainerid[]);
}
export declare class GCLConfig {
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
    private _localTestMode;
    private _forceHardwarePinpad;
    private _defaultSessionTimeout;
    private _tokenCompatible;
    private _v2Compatible;
    private _defaultConsentDuration;
    private _defaultConsentTimeout;
    private _pkcs11Config;
    private _osPinDialog;
    private _containerDownloadTimeout;
    private _contextToken;
    private _lang;
    private _providedContainers;
    private _activeContainers;
    constructor(options: GCLConfigOptions);
    readonly authUrl: string;
    readonly ocvUrl: string;
    ocvContextPath: string;
    gclUrl: string;
    readonly dsUrl: string;
    dsContextPath: string;
    dsFileContextPath: string;
    apiKey: string;
    citrix: boolean;
    agentPort: number;
    readonly dsFileDownloadUrl: string;
    gwUrl: string;
    localTestMode: boolean;
    forceHardwarePinpad: boolean;
    defaultSessionTimeout: number;
    tokenCompatible: boolean;
    v2Compatible: boolean;
    defaultConsentDuration: number;
    defaultConsentTimeout: number;
    pkcs11Config: Pkcs11ModuleConfig;
    osPinDialog: boolean;
    containerDownloadTimeout: number;
    readonly gwJwt: Promise<string>;
    contextToken: string;
    gclJwt: string;
    lang: string;
    overrideContainers: T1CContainerid[];
    activeContainers: Map<string, string[]>;
    getGwJwt(): Promise<string>;
}