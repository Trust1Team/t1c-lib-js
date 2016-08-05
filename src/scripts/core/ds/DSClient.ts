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
}

const SECURITY = "/security";
const SECURITY_JWT_ISSUE = SECURITY + "/jwt/issue";
const SECURITY_JWT_REFRESH = SECURITY + "/jwt/refresh";

class DSClient implements AbstractDSClient{
    constructor(private url:string,private connection:RemoteConnection) {}

    getJWT(callback:(error:CoreExceptions.RestException, data:any)=>void):void {
        var consumerCb = callback;
        this.connection.get(this.url + SECURITY_JWT_ISSUE, function(error, data){
            if(error)return consumerCb(error,null);
            if(data && data.token) GCLConfig.Instance.jwt = data.token;
            return consumerCb(null,data);
        });
    }
    refreshJWT(callback:(error:CoreExceptions.RestException, data:any)=>void):void {
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
}



export {AbstractDSClient,DSClient}