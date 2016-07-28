/**
 * @author Michallis Pashidis
 * @since 2016
 */
import {connection} from "../../../../core/client/Connection";
import * as CoreExceptions from "../../../../core/exceptions/CoreExceptions";

interface AbstractEidBE{
    rnData(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    address(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    photo(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    rootCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    citizenCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    authenticationCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    nonRepudiationCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    verifyPin(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    signData(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    authenticate(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    dumpData(filters:string[],callback:(error:CoreExceptions.RestException, data:any) => void):void;
}

const QUERY_PARAM_FILTER = "filter=";
const PLUGIN_CONTEXT_BEID = "/beid";
const BEID_RN_DATA = "/rn";
const BEID_ADDRESS = "/address";
const BEID_PHOTO = "/photo";
const BEID_CERT_ROOT = "/rootCertificate";
const BEID_CERT_CITIZEN = "/citizenCertificate";
const BEID_CERT_AUTHENTICATION = "/authenticationCertificate";
const BEID_CERT_NON_REPUDIATION = "/nonRepudiationCertificate";
const BEID_VERIFY_PIN = "/verifyPin";
const BEID_SIGN_DATA = "/sign";
const BEID_AUTHENTICATE = "/auth";


class EidBe implements AbstractEidBE{
    // constructor
    constructor(private url:string) {this.url = url + PLUGIN_CONTEXT_BEID;}

    public rnData(callback) {connection.get(this.url + BEID_RN_DATA,callback);}
    public address(callback) {connection.get(this.url + BEID_ADDRESS, callback);}
    public photo(callback) {connection.get(this.url + BEID_PHOTO, callback);}
    public rootCertificate(callback) {connection.get(this.url + BEID_CERT_ROOT, callback);}
    public citizenCertificate(callback) {connection.get(this.url+ BEID_CERT_CITIZEN, callback);}
    public authenticationCertificate(callback) {connection.get(this.url +  BEID_CERT_AUTHENTICATION, callback);}
    public nonRepudiationCertificate(callback) {connection.get(this.url +  BEID_CERT_NON_REPUDIATION, callback);}
    public verifyPin(body, callback) {connection.post(this.url + BEID_VERIFY_PIN, body,callback);}
    public signData(body, callback) {connection.post(this.url + BEID_SIGN_DATA, body,callback);}
    public authenticate(body, callback) {connection.post(this.url + BEID_AUTHENTICATE, body,callback);}
    public dumpData(filters, callback) {
        connection.get(this.url, callback,QUERY_PARAM_FILTER+filters.join(","));
    }
}

export {AbstractEidBE, EidBe}