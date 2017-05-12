/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 */
import { Connection } from "../client/Connection";
import { GCLConfig } from "../GCLConfig";
import * as CoreExceptions from "../exceptions/CoreExceptions";
import * as _ from "lodash";
import { BrowserInfoResponse } from "../service/CoreModel";
import { AbstractDSClient, DeviceResponse, DownloadLinkResponse,
    DSInfoResponse, DSPlatformInfo, DSPubKeyResponse, JWTResponse } from "./DSClientModel";
import { Promise } from "es6-promise";

export { DSClient };


const SEPARATOR = "/";
const QP_APIKEY = "?apikey=";
const SECURITY = "/security";
const SYS_INFO = "/system/status";
const SECURITY_JWT_ISSUE = SECURITY + "/jwt/issue";
const SECURITY_JWT_REFRESH = SECURITY + "/jwt/refresh";
const DOWNLOAD = "/download/gcl";
const PUB_KEY = SECURITY + "/keys/public";
const DEVICE = "/devices";


class DSClient implements AbstractDSClient {
    constructor(private url: string, private connection: Connection, private cfg: GCLConfig) {}

    public getUrl() { return this.url; }

    public getInfo(callback?: (error: CoreExceptions.RestException, data: DSInfoResponse) => void): void | Promise<DSInfoResponse> {
        return this.connection.get(this.url + SYS_INFO, undefined, callback);
    }

    public getDevice(uuid: string,
                     callback?: (error: CoreExceptions.RestException, data: DeviceResponse) => void): void | Promise<DeviceResponse> {
        return this.connection.get(this.url + DEVICE + SEPARATOR + uuid, undefined, callback);
    }

    public getJWT(callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): void | Promise<JWTResponse> {
        let self_cfg = this.cfg;
        return this.connection.get(this.url + SECURITY_JWT_ISSUE, undefined,
            function(error: CoreExceptions.RestException, data: JWTResponse) {
                if (error) {
                    if (callback) { return callback(error, null); }
                    else { return Promise.reject(error); }
                } else {
                    if (data && data.token) { self_cfg.jwt = data.token; }
                    if (callback) { return callback(null, data); }
                    else { return Promise.resolve(data); }
                }
            }
        );
    }

    public refreshJWT(callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): void | Promise<JWTResponse> {
        let actualJWT = this.cfg.jwt;
        if (actualJWT) {
            return this.connection.post(this.url + SECURITY_JWT_REFRESH, { originalJWT: actualJWT }, undefined, callback);
        } else {
            let error = { code: "500", description: "No JWT available", status: 412 };
            if (callback) { return callback(error, null); }
            else { return Promise.reject(error); }
        }
    }

    public getPubKey(callback?: (error: CoreExceptions.RestException, data: DSPubKeyResponse) => void): void | Promise<DSPubKeyResponse> {
        return this.connection.get(this.url + PUB_KEY, undefined, callback);
    }

    public downloadLink(infoBrowser: BrowserInfoResponse,
                        callback?: (error: CoreExceptions.RestException,
                                    data: DownloadLinkResponse) => void): void | Promise<DownloadLinkResponse> {
        this.connection.post(this.url + DOWNLOAD,
            infoBrowser,
            undefined,
            function(err: CoreExceptions.RestException, data: { path: string }) {
                if (err) {
                    if (callback) { return callback(err, null); }
                    else { return Promise.reject(err); }
                } else {
                    let returnObject = { url: this.cfg.dsUrlBase + data.path + QP_APIKEY + this.cfg.apiKey };
                    if (callback) { return callback(null, returnObject); }
                    else { return Promise.resolve(returnObject); }
                }
            });
    }

    public register(info: DSPlatformInfo, device_id: string,
                    callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): void | Promise<JWTResponse> {
        let req = _.merge({ uuid: device_id, version: info.core_version }, _.omit(info, "core_version"));
        return this.connection.put(this.url + DEVICE + SEPARATOR + device_id, req, undefined, callback);
    }

    public sync(info: DSPlatformInfo, device_id: string,
                callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): void | Promise<JWTResponse> {
        let req = _.merge({ uuid: device_id, version: info.core_version }, _.omit(info, "core_version"));
        return this.connection.post(this.url + DEVICE + SEPARATOR + device_id, req, undefined, callback);
    }

}
