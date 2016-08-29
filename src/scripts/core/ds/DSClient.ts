/**
 * @author Michallis Pashidis
 */
import {RemoteConnection} from "../client/Connection";
import * as CoreExceptions from "../exceptions/CoreExceptions";
import {RestException} from "../exceptions/CoreExceptions";
import {GCLConfig} from "../GCLConfig";

interface AbstractDSClient{
    getJWT(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    refreshJWT(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    getPubKey(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    downloadLink(infoBrowser, callback:(error:CoreExceptions.RestException, data:any) => void):void;
    register(info, device_id, callback:(error:CoreExceptions.RestException, data:any) => void):void;
    activate(device_id, callback:(error:CoreExceptions.RestException, data:any) => void):void;
}

const SEPARATOR = "/";
const SECURITY = "/security";
const SECURITY_JWT_ISSUE = SECURITY + "/jwt/issue";
const SECURITY_JWT_REFRESH = SECURITY + "/jwt/refresh";
const DOWNLOAD = "/download/gcl";
const PUB_KEY = SECURITY + "/keys/public";
const DEVICE = "/devices";


class DSClient implements AbstractDSClient{
    constructor(private url:string,private connection:RemoteConnection) {}

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
        _req.config = JSON.stringify(info);
        this.connection.put(this.url + DEVICE + SEPARATOR + device_id, _req, callback);
    }

    public activate(device_id, callback:(error:CoreExceptions.RestException, data:any)=>void):void {
        let _req:any={};
        _req.config = {};
        this.connection.post(this.url + DEVICE + SEPARATOR + device_id, _req, callback);
    }

}



export {AbstractDSClient,DSClient}