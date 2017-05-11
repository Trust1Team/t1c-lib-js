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

    public getInfo(callback: (error: CoreExceptions.RestException, data: DSInfoResponse) => void): void {
        let consumerCb = callback;
        this.connection.get(this.url + SYS_INFO, function(error: CoreExceptions.RestException, data: DSInfoResponse) {
            if (error) { return consumerCb(error, null); }
            return consumerCb(null, data);
        });
    }

    public getDevice(uuid: string, callback: (error: CoreExceptions.RestException, data: DeviceResponse) => void): void {
        let consumerCb = callback;
        this.connection.get(this.url + DEVICE + SEPARATOR + uuid, function(error: CoreExceptions.RestException, data: DeviceResponse) {
            if (error) { return consumerCb(error, null); }
            if (data) { return consumerCb(null, data); }
            return consumerCb(null, data);
        });
    }

    public getJWT(callback: (error: CoreExceptions.RestException, data: JWTResponse) => void): void {
        let consumerCb = callback;
        let self_cfg = this.cfg;
        this.connection.get(this.url + SECURITY_JWT_ISSUE, function(error: CoreExceptions.RestException, data: JWTResponse) {
            if (error) { return consumerCb(error, null); }
            if (data && data.token) { self_cfg.jwt = data.token; }
            return consumerCb(null, data);
        });
    }

    public refreshJWT(callback: (error: CoreExceptions.RestException, data: JWTResponse) => void): void {
        let actualJWT = this.cfg.jwt;
        if (actualJWT) {
            this.connection.post(this.url + SECURITY_JWT_REFRESH, { originalJWT: actualJWT }, callback);
        } else {
            callback({ code: "500", description: "No JWT available", status: 412 }, null);
        }
    }

    public getPubKey(callback: (error: CoreExceptions.RestException, data: DSPubKeyResponse) => void): void {
        this.connection.get(this.url + PUB_KEY, callback);
    }

    public downloadLink(infoBrowser: BrowserInfoResponse,
                        callback: (error: CoreExceptions.RestException, data: DownloadLinkResponse) => void): void {
        this.connection.post(this.url + DOWNLOAD, infoBrowser, function(err: CoreExceptions.RestException, data: { path: string }) {
            if (err) { return callback(err, null); }
            return callback(null, { url: this.cfg.dsUrlBase + data.path + QP_APIKEY + this.cfg.apiKey });
        });
    }

    public register(info: DSPlatformInfo, device_id: string,
                    callback: (error: CoreExceptions.RestException, data: JWTResponse) => void): void {
        let req = _.merge({ uuid: device_id, version: info.core_version }, _.omit(info, "core_version"));
        this.connection.put(this.url + DEVICE + SEPARATOR + device_id, req, callback);
    }

    public sync(info: DSPlatformInfo, device_id: string, callback: (error: CoreExceptions.RestException, data: JWTResponse) => void): void {
        let req = _.merge({ uuid: device_id, version: info.core_version }, _.omit(info, "core_version"));
        this.connection.post(this.url + DEVICE + SEPARATOR + device_id, req, callback);
    }

}
