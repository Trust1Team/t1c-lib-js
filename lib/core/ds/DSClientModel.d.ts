import { BrowserInfo, T1CContainer } from '../service/CoreModel';
import { RestException } from '../exceptions/CoreExceptions';
export interface AbstractDSClient {
    getUrl(): string;
    getInfo(callback?: (error: RestException, data: DSInfoResponse) => void): Promise<DSInfoResponse>;
    getDevice(uuid: string, callback?: (error: RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
    getPubKey(deviceId: string, callback?: (error: RestException, data: DSPubKeyResponse) => void): Promise<DSPubKeyResponse>;
    downloadLink(downloadData: DSDownloadRequest, callback?: (error: RestException, data: DSDownloadLinkResponse) => void): Promise<DSDownloadLinkResponse>;
    register(registrationData: DSRegistrationOrSyncRequest, callback?: (error: RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
    sync(syncData: DSRegistrationOrSyncRequest, callback?: (error: RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
}
export declare class DSBrowser {
    name: string;
    version: string;
    constructor(name: string, version: string);
}
export declare class DSOperatingSystem {
    architecture: number;
    name: string;
    version: string;
    constructor(architecture: number, name: string, version: string);
}
export declare class DSClientInfo {
    type: string;
    version: string;
    constructor(type: string, version: string);
}
export declare class DSDownloadRequest {
    browser: DSBrowser;
    manufacturer: string;
    os: DSOperatingSystem;
    ua: string;
    proxyDomain: string;
    constructor(browser: DSBrowser, manufacturer: string, os: DSOperatingSystem, ua: string, proxyDomain: string);
}
export declare class DSRegistrationOrSyncRequest {
    activated: boolean;
    uuid: string;
    version: string;
    derEncodedPublicKey: string;
    manufacturer: string;
    browser: DSBrowser;
    os: DSOperatingSystem;
    ua: string;
    proxyDomain: string;
    clientInfo: DSClientInfo;
    namespace: string;
    containerStates?: T1CContainer[];
    constructor(activated: boolean, uuid: string, version: string, derEncodedPublicKey: string, manufacturer: string, browser: DSBrowser, os: DSOperatingSystem, ua: string, proxyDomain: string, clientInfo: DSClientInfo, namespace: string, containerStates?: T1CContainer[]);
}
export declare class DSInfoResponse {
    configFile: string;
    build: string;
    version: string;
    environemnt: string;
    storageAppName: string;
    storageServiceAccount: string;
    storageCertPath: string;
    storageBucket: string;
    storageDownloadPrefix: string;
    fileOsx: string;
    fileWin32: string;
    fileWin64: string;
    fileDefaultVersion: string;
    securityEnabled: string;
    securityPrivateKeyAvailable: boolean;
    constructor(configFile: string, build: string, version: string, environemnt: string, storageAppName: string, storageServiceAccount: string, storageCertPath: string, storageBucket: string, storageDownloadPrefix: string, fileOsx: string, fileWin32: string, fileWin64: string, fileDefaultVersion: string, securityEnabled: string, securityPrivateKeyAvailable: boolean);
}
export declare class DSDownloadLinkResponse {
    url: string;
    success: boolean;
    constructor(url: string, success: boolean);
}
export declare class DSJWTResponse {
    token: string;
    constructor(token: string);
}
export declare class DSPubKeyResponse {
    encryptedPublicKey: string;
    encryptedAesKey: string;
    ns: string;
    success: boolean;
    constructor(encryptedPublicKey: string, encryptedAesKey: string, ns: string, success: boolean);
}
export declare class DeviceResponse {
    uuid: string;
    activated: boolean;
    atrList: {
        hash: string;
        storagePath: string;
    };
    coreVersion: string;
    contextToken: string;
    containerResponses: DSContainer[];
    constructor(uuid: string, activated: boolean, atrList: {
        hash: string;
        storagePath: string;
    }, coreVersion: string, contextToken: string, containerResponses: DSContainer[]);
}
export declare class DSContainer {
    id: string;
    name: string;
    version: string;
    osStorage: DSStorage[];
    language: string;
    availability: string;
    dependsOn: string[];
    status: string;
    constructor(id: string, name: string, version: string, osStorage: DSStorage[], language: string, availability: string, dependsOn: string[], status: string);
}
export declare class DSStorage {
    hash: string;
    storagePath: string;
    os: string;
    constructor(hash: string, storagePath: string, os: string);
}
export declare class DSPlatformInfo extends BrowserInfo {
    activated: boolean;
    bi: BrowserInfo;
    core_version: string;
    namespace: string;
    constructor(activated: boolean, bi: BrowserInfo, core_version: string, namespace: string);
}
