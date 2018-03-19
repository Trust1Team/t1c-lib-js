/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 */
import { Connection } from '../client/Connection';
import { GCLConfig } from '../GCLConfig';
import * as CoreExceptions from '../exceptions/CoreExceptions';
import * as _ from 'lodash';
import { BrowserInfo } from '../service/CoreModel';
import { AbstractDSClient, DeviceResponse, DownloadLinkResponse,
    DSInfoResponse, DSPlatformInfo, DSPubKeyResponse, JWTResponse } from './DSClientModel';
import * as Bluebird from 'bluebird';

export { DSClient };


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

    public getUrl() { return this.url; }

    public getInfo(callback?: (error: CoreExceptions.RestException, data: DSInfoResponse) => void): Bluebird<DSInfoResponse> {
        return this.connection.get(this.url, SYS_INFO, undefined, callback);
    }

    public getDevice(uuid: string,
                     callback?: (error: CoreExceptions.RestException, data: DeviceResponse) => void): Bluebird<DeviceResponse> {
        return this.connection.get(this.url, DEVICE + SEPARATOR + uuid, undefined, callback);
    }

    public getJWT(callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Bluebird<JWTResponse> {
        let self = this;

        if (callback) {
            doGetJwt();
        } else {
            // promise
            return new Bluebird<JWTResponse>((resolve, reject) => {
                doGetJwt(resolve, reject);
            });
        }

        function doGetJwt(resolve?: (data: any) => void, reject?: (data: any) => void) {
            self.connection.get(self.url, SECURITY_JWT_ISSUE, undefined, function (error, data) {
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

    public refreshJWT(callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Bluebird<JWTResponse> {
        let actualJWT = this.cfg.jwt;
        if (actualJWT) {
            return this.connection.post(this.url, SECURITY_JWT_REFRESH, { originalJWT: actualJWT }, undefined, callback);
        } else {
            let error = { code: '500', description: 'No JWT available', status: 412 };
            if (callback) { callback(error, null); }
            else { return Bluebird.reject(error); }
        }
    }

    public getPubKey(callback?: (error: CoreExceptions.RestException, data: DSPubKeyResponse) => void): Bluebird<DSPubKeyResponse> {
        return this.connection.get(this.url, PUB_KEY, undefined, callback);
    }

    public downloadLink(infoBrowser: BrowserInfo,
                        callback?: (error: CoreExceptions.RestException,
                                    data: DownloadLinkResponse) => void): Bluebird<DownloadLinkResponse> {
        let self = this;
        if (callback) {
            doGetDownloadLink();
        } else {
            // promise
            return new Bluebird<DownloadLinkResponse>((resolve, reject) => {
                doGetDownloadLink(resolve, reject);
            });
        }
        function doGetDownloadLink(resolve?: (data: any) => void, reject?: (data: any) => void) {
            self.connection.post(self.url, DOWNLOAD, infoBrowser, undefined, function (err, data) {
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
                    callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Bluebird<JWTResponse> {
        let req = _.merge({ uuid: device_id, version: info.core_version }, _.omit(info, 'core_version'));
        return this.connection.put(this.url, DEVICE + SEPARATOR + device_id, req, undefined, callback);
    }

    public sync(info: DSPlatformInfo, device_id: string,
                callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Bluebird<JWTResponse> {
        let req = _.merge({ uuid: device_id, version: info.core_version }, _.omit(info, 'core_version'));
        return this.connection.post(this.url, DEVICE + SEPARATOR + device_id, req, undefined, callback);
    }

}
