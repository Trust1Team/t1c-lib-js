import { Connection } from "../client/Connection";
import { GCLConfig } from "../GCLConfig";
import * as CoreExceptions from "../exceptions/CoreExceptions";
import { BrowserInfoResponse } from "../service/CoreModel";
import { AbstractDSClient, DeviceResponse, DownloadLinkResponse, DSInfoResponse, DSPlatformInfo, DSPubKeyResponse, JWTResponse } from "./DSClientModel";
import { Promise } from "es6-promise";
export { DSClient };
declare class DSClient implements AbstractDSClient {
    private url;
    private connection;
    private cfg;
    constructor(url: string, connection: Connection, cfg: GCLConfig);
    getUrl(): string;
    getInfo(callback?: (error: CoreExceptions.RestException, data: DSInfoResponse) => void): void | Promise<DSInfoResponse>;
    getDevice(uuid: string, callback?: (error: CoreExceptions.RestException, data: DeviceResponse) => void): void | Promise<DeviceResponse>;
    getJWT(callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): void | Promise<JWTResponse>;
    refreshJWT(callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): void | Promise<JWTResponse>;
    getPubKey(callback?: (error: CoreExceptions.RestException, data: DSPubKeyResponse) => void): void | Promise<DSPubKeyResponse>;
    downloadLink(infoBrowser: BrowserInfoResponse, callback?: (error: CoreExceptions.RestException, data: DownloadLinkResponse) => void): void | Promise<DownloadLinkResponse>;
    register(info: DSPlatformInfo, device_id: string, callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): void | Promise<JWTResponse>;
    sync(info: DSPlatformInfo, device_id: string, callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): void | Promise<JWTResponse>;
}
