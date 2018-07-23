/**
 * @author Maarten Somers
 * @since 2017
 */

import {BrowserInfo, T1CContainer} from '../service/CoreModel';
import {RestException} from '../exceptions/CoreExceptions';

export interface AbstractDSClient {
    getUrl(): string;

    getInfo(callback?: (error: RestException, data: DSInfoResponse) => void): Promise<DSInfoResponse>;

    getDevice(uuid: string, callback?: (error: RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;

    getPubKey(deviceId: string,
              callback?: (error: RestException, data: DSPubKeyResponse) => void): Promise<DSPubKeyResponse>;

    downloadLink(downloadData: DSDownloadRequest,
                 callback?: (error: RestException,
                             data: DSDownloadLinkResponse) => void): Promise<DSDownloadLinkResponse>;

    register(registrationData: DSRegistrationOrSyncRequest,
             callback?: (error: RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;

    sync(syncData: DSRegistrationOrSyncRequest,
         callback?: (error: RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
}

export class DSBrowser {
    constructor(public name: string, public version: string) {
    }
}

export class DSOperatingSystem {
    constructor(public architecture: number, public name: string, public version: string) {
    }
}

export class DSClientInfo {
    constructor(public type: string, public version: string) {
    }
}

export class DSDownloadRequest {
    constructor(public browser: DSBrowser,
                public manufacturer: string,
                public os: DSOperatingSystem,
                public ua: string,
                public proxyDomain: string) {
    }
}

export class DSRegistrationOrSyncRequest {
    constructor(public activated: boolean,
                public uuid: string,
                public version: string,
                public derEncodedPublicKey: string,
                public manufacturer: string,
                public browser: DSBrowser,
                public os: DSOperatingSystem,
                public ua: string,
                public proxyDomain: string,
                public clientInfo: DSClientInfo,
                public namespace: string,
                public containerStates?: T1CContainer[]) {
    }
}

export class DSInfoResponse {
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
                public securityPrivateKeyAvailable: boolean) {
    }
}

export class DSDownloadLinkResponse {
    constructor(public url: string, public success: boolean) {

    }
}

export class DSJWTResponse {
    constructor(public token: string) {
    }
}

export class DSPubKeyResponse {
    constructor(public encryptedPublicKey: string, public encryptedAesKey: string, public ns: string, public success: boolean) {
    }
}

export class DeviceResponse {
    constructor(public uuid: string,
                public activated: boolean,
                public atrList: { hash: string, storagePath: string },
                public coreVersion: string,
                public contextToken: string,
                public containerResponses: DSContainer[]) {
    }
}

export class DSContainer {
    constructor(public id: string,
                public name: string,
                public version: string,
                public osStorage: DSStorage[],
                public language: string,
                public availability: string,
                public dependsOn: string[],
                public status: string) {
    }
}

export class DSStorage {
    constructor(public hash: string, public storagePath: string, public os: string) {
    }
}

export class DSPlatformInfo extends BrowserInfo {
    constructor(public activated: boolean,
                public bi: BrowserInfo,
                public core_version: string,
                public namespace: string) {
        super(bi.browser, bi.manufacturer, bi.os, bi.ua);
    }
}

