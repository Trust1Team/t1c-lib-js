/**
 * @author Maarten Somers
 * @since 2017
 */

import * as CoreExceptions from "../exceptions/CoreExceptions";
import { BrowserInfo, DataResponse, T1CResponse } from '../service/CoreModel';
import { GCLConfig } from '../GCLConfig';
import { Connection } from '../client/Connection';
import { DSClient } from './DSClient';

export { AbstractDSClient, DSInfoResponse, DownloadLinkResponse, JWTResponse, DSPubKeyResponse,
    DeviceResponse, DSPlatformInfo };


interface AbstractDSClient {
    registerDevice(pubKey: string, info: any,
                   callback?: (error: CoreExceptions.RestException, data: DataResponse) => void): Promise<DataResponse>;
    synchronizationRequest(pubKey: string, info: any, proxy: string,
                           callback?: (error: CoreExceptions.RestException, data: DataResponse) => void): Promise<DataResponse>;
    getUrl(): string;
    getInfo(callback?: (error: CoreExceptions.RestException, data: DSInfoResponse) => void): Promise<DSInfoResponse>;
    getJWT(callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Promise<JWTResponse>;
    getDevice(uuid: string, callback?: (error: CoreExceptions.RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
    refreshJWT(callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Promise<JWTResponse>;
    getPubKey(callback?: (error: CoreExceptions.RestException, data: DSPubKeyResponse) => void): Promise<DSPubKeyResponse>;
    downloadLink(infoBrowser: BrowserInfo,
                 callback?: (error: CoreExceptions.RestException,
                             data: DownloadLinkResponse) => void): Promise<DownloadLinkResponse>;
    register(info: DSPlatformInfo,
             device_id: string,
             callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Promise<JWTResponse>;
    sync(info: DSPlatformInfo,
         device_id: string,
         callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Promise<JWTResponse>;
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
    constructor(public pubkey: string, public success: boolean) {}
}

class DeviceResponse {
    constructor(public activated: boolean, public coreVersion: string, public managed: boolean, public uuid: string) {}
}

class DSPlatformInfo extends BrowserInfo {
    constructor(public activated: boolean,
                public bi: BrowserInfo,
                public core_version: string) {
        super(bi.browser, bi.manufacturer, bi.os, bi.ua);
    }
}

