/**
 * @author Michallis Pashidis
 */
import {RemoteConnection} from "../client/Connection";
import * as CoreExceptions from "../exceptions/CoreExceptions";
import {RestException} from "../exceptions/CoreExceptions";
import {GCLConfig} from "../GCLConfig";

interface AbstractDSClient{
    getInfo(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    getJWT(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    getDevice(uuid,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    refreshJWT(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    getPubKey(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    downloadLink(infoBrowser, callback:(error:CoreExceptions.RestException, data:any) => void):void;
    register(info, device_id, callback:(error:CoreExceptions.RestException, data:any) => void):void;
    activate(device_id, callback:(error:CoreExceptions.RestException, data:any) => void):void;
}

const SEPARATOR = "/";
const SECURITY = "/security";
const SYS_INFO = "/system/status";
const SECURITY_JWT_ISSUE = SECURITY + "/jwt/issue";
const SECURITY_JWT_REFRESH = SECURITY + "/jwt/refresh";
const DOWNLOAD = "/download/gcl";
const PUB_KEY = SECURITY + "/keys/public";
const DEVICE = "/devices";


class DSClient implements AbstractDSClient{
    constructor(private url:string,private connection:RemoteConnection) {}

    public getInfo(callback:(error:CoreExceptions.RestException, data:any)=>void):void {
        var consumerCb = callback;
        this.connection.get(this.url + SYS_INFO, function(error, data){
            if(error)return consumerCb(error,null);
            return consumerCb(null,data);
        });
    }

    public getDevice(uuid,callback:(error:CoreExceptions.RestException, data:any)=>void):void {
        var consumerCb = callback;
        this.connection.get(this.url + DEVICE + SEPARATOR + uuid, function(error, data){
            if(error)return consumerCb(error,null);
            if(data) return consumerCb(null,data); //TODO
            return consumerCb(null,data);
        });
    }

    public getJWT(callback:(error:CoreExceptions.RestException, data:any)=>void):void {
        var consumerCb = callback;
        this.connection.get(this.url + SECURITY_JWT_ISSUE, function(error, data){
            if(error)return consumerCb(error,null);
            if(data && data.token) GCLConfig.Instance.jwt = data.token;
            return consumerCb(null,data);
        });
    }

    public refreshJWT(callback:(error:CoreExceptions.RestException, data:any)=>void):void {
        var actualJWT = GCLConfig.Instance.jwt;
        if(actualJWT){
            let _body:any = {};
            _body.originalJWT = actualJWT;
            this.connection.post(this.url + SECURITY_JWT_REFRESH, _body,callback);
        } else {
            let noJWT:any = {};
            noJWT.code = '500';
            noJWT.description = 'No JWT available';
            noJWT.status = 412; //precondition failed
            callback(noJWT,null);
        }
    }

    public getPubKey(callback:(error:CoreExceptions.RestException, data:any)=>void):void {
        this.connection.get(this.url + PUB_KEY, callback);
    }

    public downloadLink(infoBrowser, callback:(error:CoreExceptions.RestException, data:any)=>void):void {
        this.connection.post(this.url + DOWNLOAD, infoBrowser, callback);
    }

    public register(info, device_id, callback:(error:CoreExceptions.RestException, data:any)=>void):void {
        let _req:any={};
        console.log("Device id:"+device_id);
        _req.uuid = device_id;
        _req.browser = info.browser;
        _req.os = info.os;
        _req.manufacturer = info.manufacturer;
        _req.ua = info.ua;
        _req.activated = info.activated;
        _req.managed = info.managed;
        _req.version = info.core_version;
        this.connection.put(this.url + DEVICE + SEPARATOR + device_id, _req, callback);
    }

    public activate(device_id, callback:(error:CoreExceptions.RestException, data:any)=>void):void {
        let _req:any={};
        _req.config = {};
        this.connection.post(this.url + DEVICE + SEPARATOR + device_id, _req, callback);
    }

}



export {AbstractDSClient,DSClient}