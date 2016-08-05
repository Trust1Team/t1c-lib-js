/**
 * @author Michallis Pashidis
 */
import {RemoteConnection} from "../client/Connection";
import * as CoreExceptions from "../exceptions/CoreExceptions";
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
        this.connection.get(this.url + SECURITY_JWT_ISSUE, callback);
    }
    refreshJWT(callback:(error:CoreExceptions.RestException, data:any)=>void):void {
        //this.connection.post(this.url + SECURITY_JWT_REFRESH, _body,callback);
    }
}



export {AbstractDSClient,DSClient}