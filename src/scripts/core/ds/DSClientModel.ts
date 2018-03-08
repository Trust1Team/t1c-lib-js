/**
 * @author Maarten Somers
 * @since 2017
 */

import { BrowserInfo, T1CContainer, T1CResponse } from '../service/CoreModel';
import { RestException } from '../exceptions/CoreExceptions';

export { AbstractDSClient, DSInfoResponse, DownloadLinkResponse, JWTResponse, DSPubKeyResponse,
    DeviceResponse, DSPlatformInfo, DSRegistrationOrSyncRequest, DSBrowser, DSOperatingSystem, DSContainer, DSStorage };


interface AbstractDSClient {
    getUrl(): string;
    getInfo(callback?: (error: RestException, data: DSInfoResponse) => void): Promise<DSInfoResponse>;
    getDevice(uuid: string, callback?: (error: RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
    getPubKey(deviceId: string,
              callback?: (error: RestException, data: DSPubKeyResponse) => void): Promise<DSPubKeyResponse>;
    downloadLink(infoBrowser: BrowserInfo,
                 callback?: (error: RestException,
                             data: DownloadLinkResponse) => void): Promise<DownloadLinkResponse>;
    register(registrationData: DSRegistrationOrSyncRequest,
             callback?: (error: RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
    sync(syncData: DSRegistrationOrSyncRequest,
         callback?: (error: RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
}

class DSBrowser {
    constructor(public name: string, public version: string) {}
}

class DSOperatingSystem {
    constructor(public architecture: number, public name: string, public version: string) {}
}

class DSRegistrationOrSyncRequest {
    constructor(public managed: boolean,
                public activated: boolean,
                public uuid: string,
                public version: string,
                public derEncodedPublicKey: string,
                public manufacturer: string,
                public browser: DSBrowser,
                public os: DSOperatingSystem,
                public ua: string,
                public proxyDomain: string,
                public containerStates?: T1CContainer[]) {}
}

class DSInfoResponse {
    constructor(public configFile: string,
                public build: string,
                public version: string,
                public environemnt: string, // TODO fix typo in DS
                public storageAppName: string,
                public storageServiceAccount: string,
                public storageCertPath: string,
                public storageBucket: string,
                public storageDownloadPrefix: string,
                public fileOsx: string,
                public fileWin32: string,
                public fileWin64: string,
                public fileDefaultVersion: string,
                public securityEnabled: string, // TODO should really be a boolean, needs fix in DS!
                public securityPrivateKeyAvailable: boolean) {}
}

class DownloadLinkResponse implements T1CResponse {
    constructor(public url: string, public success: boolean) {}
}

class JWTResponse {
    constructor(public token: string) {}
}

class DSPubKeyResponse implements T1CResponse {
    constructor(public encryptedPublicKey: string, public encryptedAesKey: string, public success: boolean) {}
}

class DeviceResponse {
    constructor(public uuid: string,
                public activated: boolean,
                public managed: boolean,
                public coreVersion: string,
                public contextToken: string,
                public containerResponses: DSContainer[]) {}
}

class DSContainer {
    constructor(public id: string,
                public name: string,
                public version: string,
                public osStorage: DSStorage[],
                public language: string,
                public availability: string,
                public dependsOn: string[],
                public status: string) {}
}

class DSStorage {
    constructor(public hash: string, public storagePath: string, public os: string) {}
}

class DSPlatformInfo extends BrowserInfo {
    constructor(public activated: boolean,
                public managed: boolean,
                public bi: BrowserInfo,
                public core_version: string) {
        super(bi.browser, bi.manufacturer, bi.os, bi.ua);
    }
}

