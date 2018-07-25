import { Connection } from '../client/Connection';
import { GCLConfig } from '../GCLConfig';
import { AbstractDSClient, DeviceResponse, DSDownloadLinkResponse, DSDownloadRequest, DSInfoResponse, DSPubKeyResponse, DSRegistrationOrSyncRequest } from './DSClientModel';
import { RestException } from '../exceptions/CoreExceptions';
export declare class DSClient implements AbstractDSClient {
    private url;
    private connection;
    private cfg;
    constructor(url: string, connection: Connection, cfg: GCLConfig);
    getUrl(): string;
    getInfo(callback?: (error: RestException, data: DSInfoResponse) => void): Promise<DSInfoResponse>;
    getDevice(uuid: string, callback?: (error: RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
    getPubKey(uuid: string, callback?: (error: RestException, data: DSPubKeyResponse) => void): Promise<DSPubKeyResponse>;
    downloadLink(downloadData: DSDownloadRequest, callback?: (error: RestException, data: DSDownloadLinkResponse) => void): Promise<DSDownloadLinkResponse>;
    register(registrationData: DSRegistrationOrSyncRequest, callback?: (error: RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
    sync(syncData: DSRegistrationOrSyncRequest, callback?: (error: RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
}
