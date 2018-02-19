/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 */
import { Connection } from '../client/Connection';
import { GCLConfig } from '../GCLConfig';
import * as CoreExceptions from '../exceptions/CoreExceptions';
import * as _ from 'lodash';
import { BrowserInfo, DataResponse } from '../service/CoreModel';
import { AbstractDSClient, DeviceResponse, DownloadLinkResponse,
    DSInfoResponse, DSPlatformInfo, DSPubKeyResponse, JWTResponse } from './DSClientModel';
import { Promise } from 'es6-promise';

export { DSClient };


// TODO check correct activation & sync endpoints
const ACTIVATION = '/activate';
const SYNC = '/sync';
// ======
const SEPARATOR = '/';
const QP_APIKEY = '?apikey=';
const SECURITY = '/security';
const SYS_INFO = '/system/status';
const SECURITY_JWT_ISSUE = SECURITY + '/jwt/issue';
const SECURITY_JWT_REFRESH = SECURITY + '/jwt/refresh';
const DOWNLOAD = '/download/gcl';
const PUB_KEY = SECURITY + '/keys/public';
const DEVICE = '/devices';


class DSClient implements AbstractDSClient {
    constructor(private url: string, private connection: Connection, private cfg: GCLConfig) {}

    public activationRequest(pubKey: string, info: any,
                             callback?: (error: CoreExceptions.RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.post(this.url, ACTIVATION, { pubKey, info }, undefined, undefined, callback);
    }

    public synchronizationRequest(pubKey: string, info: any, proxy: string,
                                  callback?: (error: CoreExceptions.RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.post(this.url, SYNC, { pubKey, info, proxy }, undefined, undefined, callback);
    }

    public getUrl() { return this.url; }

    public getInfo(callback?: (error: CoreExceptions.RestException, data: DSInfoResponse) => void): Promise<DSInfoResponse> {
        return this.connection.get(this.url, SYS_INFO, undefined, undefined, callback);
    }

    public getDevice(uuid: string,
                     callback?: (error: CoreExceptions.RestException, data: DeviceResponse) => void): Promise<DeviceResponse> {
        return this.connection.get(this.url, DEVICE + SEPARATOR + uuid, undefined, undefined, callback);
    }

    public getJWT(callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Promise<JWTResponse> {
        let self = this;

        if (callback) {
            doGetJwt();
        } else {
            // promise
            return new Promise((resolve, reject) => {
                doGetJwt(resolve, reject);
            });
        }

        function doGetJwt(resolve?: (data: any) => void, reject?: (data: any) => void) {
            self.connection.get(self.url, SECURITY_JWT_ISSUE, undefined, undefined, function (error, data) {
                if (error) {
                    if (callback) { return callback(error, null); }
                    else { reject(error); }
                } else {
                    if (data && data.token) { self.cfg.jwt = data.token; }
                    if (callback) { return callback(null, data); }
                    else { resolve(data); }
                }
            });
        }
    }

    public refreshJWT(callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Promise<JWTResponse> {
        let actualJWT = this.cfg.jwt;
        if (actualJWT) {
            return this.connection.post(this.url, SECURITY_JWT_REFRESH, { originalJWT: actualJWT }, undefined, undefined, callback);
        } else {
            let error = { code: '500', description: 'No JWT available', status: 412 };
            if (callback) { callback(error, null); }
            return Promise.reject(error);
        }
    }

    public getPubKey(callback?: (error: CoreExceptions.RestException, data: DSPubKeyResponse) => void): Promise<DSPubKeyResponse> {
        return this.connection.get(this.url, PUB_KEY, undefined, undefined, callback);
    }

    public downloadLink(infoBrowser: BrowserInfo,
                        callback?: (error: CoreExceptions.RestException,
                                    data: DownloadLinkResponse) => void): Promise<DownloadLinkResponse> {
        let self = this;
        if (callback) {
            doGetDownloadLink();
        } else {
            // promise
            return new Promise((resolve, reject) => {
                doGetDownloadLink(resolve, reject);
            });
        }
        function doGetDownloadLink(resolve?: (data: any) => void, reject?: (data: any) => void) {
            self.connection.post(self.url, DOWNLOAD, infoBrowser, undefined, undefined, function (err, data) {
                if (err) {
                    if (callback) { return callback(err, null); }
                    else { reject(err); }
                } else {
                    let returnObject = { url: self.cfg.dsUrlBase + data.path + QP_APIKEY + self.cfg.apiKey, success: true };
                    if (callback) { return callback(null, returnObject); }
                    else { return resolve(returnObject); }
                }
            });
        }
    }

    public register(info: DSPlatformInfo, device_id: string,
                    callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Promise<JWTResponse> {
        let req = _.merge({ uuid: device_id, version: info.core_version }, _.omit(info, 'core_version'));
        return this.connection.put(this.url, DEVICE + SEPARATOR + device_id, req, undefined, undefined, callback);
    }

    public sync(info: DSPlatformInfo, device_id: string,
                callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Promise<JWTResponse> {
        let req = _.merge({ uuid: device_id, version: info.core_version }, _.omit(info, 'core_version'));
        return this.connection.post(this.url, DEVICE + SEPARATOR + device_id, req, undefined, undefined, callback);
    }

}
