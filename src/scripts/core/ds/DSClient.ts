/**
 * @author Michallis Pashidis
 */
import {LocalConnection} from "../client/Connection";
import * as CoreExceptions from "../exceptions/CoreExceptions";

interface AbstractDSClient{
    getJWT(callback:(error:CoreExceptions.RestException, data:any) => void):void;
}

const SECURITY = "/security";
const SECURITY_JWT_ISSUE = SECURITY + "/jwt/issue";

class DSClient implements AbstractDSClient{
    constructor(private url:string,private connection:LocalConnection) {}

    getJWT(callback:(error:CoreExceptions.RestException, data:any)=>void):void {
        this.connection.get(this.url + SECURITY_JWT_ISSUE, callback);
    }
}



export {AbstractDSClient,DSClient}