import { Connection } from '../client/Connection';
import { GCLConfig } from '../GCLConfig';
import { AbstractDSClient, DeviceResponse, DSDownloadLinkResponse, DSDownloadRequest, DSInfoResponse, DSPubKeyResponse, DSRegistrationOrSyncRequest } from './DSClientModel';
import { T1CLibException } from '../exceptions/CoreExceptions';
export declare class DSClient implements AbstractDSClient {
    private url;
    private connection;
    private cfg;
    constructor(url: string, connection: Connection, cfg: GCLConfig);
    private static namespaceFilter;
    getUrl(): string;
    getInfo(callback?: (error: T1CLibException, data: DSInfoResponse) => void): Promise<DSInfoResponse>;
    getDevice(uuid: string, callback?: (error: T1CLibException, data: DeviceResponse) => void): Promise<DeviceResponse>;
    getPubKey(uuid: string, callback?: (error: T1CLibException, data: DSPubKeyResponse) => void): Promise<DSPubKeyResponse>;
    downloadLink(downloadData: DSDownloadRequest, callback?: (error: T1CLibException, data: DSDownloadLinkResponse) => void): Promise<DSDownloadLinkResponse>;
    register(registrationData: DSRegistrationOrSyncRequest, callback?: (error: T1CLibException, data: DeviceResponse) => void): Promise<DeviceResponse>;
    sync(syncData: DSRegistrationOrSyncRequest, callback?: (error: T1CLibException, data: DeviceResponse) => void): Promise<DeviceResponse>;
}
