/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 */
import { Connection } from '../client/Connection';
import { GCLConfig } from '../GCLConfig';
import * as CoreExceptions from '../exceptions/CoreExceptions';
import {
    AbstractDSClient, DeviceResponse, DownloadLinkResponse, DSDownloadRequest,
    DSInfoResponse, DSPubKeyResponse, DSRegistrationOrSyncRequest } from './DSClientModel';

export { DSClient };


const SEPARATOR = '/';
const QP_APIKEY = '?apikey=';
const SECURITY = '/security';
const SYS_INFO = '/system/status';
const DOWNLOAD = '/download/gcl';
const PUB_KEY = SECURITY + '/keys/public';
const DEVICE = '/devices';


class DSClient implements AbstractDSClient {
    constructor(private url: string, private connection: Connection, private cfg: GCLConfig) {}

    public getUrl() { return this.url; }

    public getInfo(callback?: (error: CoreExceptions.RestException, data: DSInfoResponse) => void): Promise<DSInfoResponse> {
        return this.connection.get(this.url, SYS_INFO, undefined, undefined, callback);
    }

    public getDevice(uuid: string,
                     callback?: (error: CoreExceptions.RestException, data: DeviceResponse) => void): Promise<DeviceResponse> {
        return this.connection.get(this.url, DEVICE + SEPARATOR + uuid, undefined, undefined, callback);
    }

    public getPubKey(uuid: string,
                     callback?: (error: CoreExceptions.RestException, data: DSPubKeyResponse) => void): Promise<DSPubKeyResponse> {
        return this.connection.get(this.url, PUB_KEY + SEPARATOR + uuid, undefined, undefined, callback);
    }

    public downloadLink(downloadData: DSDownloadRequest,
                        callback?: (error: CoreExceptions.RestException,
                                    data: DownloadLinkResponse) => void): Promise<DownloadLinkResponse> {
        let self = this;
        if (callback) {
            doGetDownloadLink();
        } else {
            // promise
            return new Promise<DownloadLinkResponse>((resolve, reject) => {
                doGetDownloadLink(resolve, reject);
            });
        }
        function doGetDownloadLink(resolve?: (data: any) => void, reject?: (data: any) => void) {
            self.connection.post(self.url, DOWNLOAD, downloadData, undefined, undefined, function (err, data) {
                if (err) {
                    if (callback) { return callback(err, null); }
                    else { reject(err); }
                } else {
                    let returnObject = { url: data.link + QP_APIKEY + self.cfg.apiKey, success: true };
                    if (callback) { return callback(null, returnObject); }
                    else { return resolve(returnObject); }
                }
            });
        }
    }

    public register(registrationData: DSRegistrationOrSyncRequest,
                    callback?: (error: CoreExceptions.RestException, data: DeviceResponse) => void): Promise<DeviceResponse> {
        return this.connection.put(this.url, DEVICE + SEPARATOR + registrationData.uuid, registrationData, undefined, undefined, callback);
    }

    public sync(syncData: DSRegistrationOrSyncRequest,
                callback?: (error: CoreExceptions.RestException, data: DeviceResponse) => void): Promise<DeviceResponse> {
        return this.connection.post(this.url, DEVICE + SEPARATOR + syncData.uuid, syncData, undefined, undefined, callback);
    }

}
