/**
 * @author Michallis Pashidis
 * @since 2016
 */
import {LocalConnection} from "../../../../core/client/Connection";
import * as CoreExceptions from "../../../../core/exceptions/CoreExceptions";

interface AbstractEidBE{
    allData(filters:string[],callback:(error:CoreExceptions.RestException, data:any) => void):void;
    allCeritficates(filters:string[],callback:(error:CoreExceptions.RestException, data:any) => void):void;
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
}

const QUERY_PARAM_FILTER = "filter=";
const PLUGIN_CONTEXT_BEID = "/plugins/beid";
const BEID_ALL_DATA = "/";
const BEID_ALL_CERTIFICATES = "/certificates";
const BEID_RN_DATA = (PLUGIN_CONTEXT_BEID + "/rn");
const BEID_ADDRESS = (PLUGIN_CONTEXT_BEID + "/address");
const BEID_PHOTO = (PLUGIN_CONTEXT_BEID + "/picture");
const BEID_CERT_ROOT = (BEID_ALL_CERTIFICATES + "/root");
const BEID_CERT_CITIZEN = (BEID_ALL_CERTIFICATES + "/citizen");
const BEID_CERT_AUTHENTICATION = (BEID_ALL_CERTIFICATES + "/authentication");
const BEID_CERT_NON_REPUDIATION = (BEID_ALL_CERTIFICATES + "/non-repudiation");
const BEID_CERT_RRN = (BEID_ALL_CERTIFICATES + "/rrn");
const BEID_VERIFY_PIN = (BEID_ALL_CERTIFICATES +"/verify-pin");
const BEID_SIGN_DATA = (BEID_ALL_CERTIFICATES +"/sign");
const BEID_AUTHENTICATE = (BEID_ALL_CERTIFICATES +"/authenticate");


class EidBe implements AbstractEidBE{
    // constructor
    constructor(private url:string,private connection:LocalConnection,private reader_id:string) {this.url = url + PLUGIN_CONTEXT_BEID;}

    public allData(filters, callback) {
        if(filters.length>0){this.connection.get(this.url + BEID_ALL_DATA, callback,QUERY_PARAM_FILTER+filters.join(","));}
        else{this.connection.get(this.url, callback);}
    }
    public allCeritficates(filters, callback) {
        if(filters.length>0){this.connection.get(this.url + BEID_ALL_CERTIFICATES, callback,QUERY_PARAM_FILTER+filters.join(","));}
        else{this.connection.get(this.url, callback);}
    }
    public rnData(callback) {this.connection.get(this.url + BEID_RN_DATA,callback);}
    public address(callback) {this.connection.get(this.url + BEID_ADDRESS, callback);}
    public photo(callback) {this.connection.get(this.url + BEID_PHOTO, callback);}
    public rootCertificate(callback) {this.connection.get(this.url + BEID_CERT_ROOT, callback);}
    public citizenCertificate(callback) {this.connection.get(this.url+ BEID_CERT_CITIZEN, callback);}
    public authenticationCertificate(callback) {this.connection.get(this.url +  BEID_CERT_AUTHENTICATION, callback);}
    public nonRepudiationCertificate(callback) {this.connection.get(this.url +  BEID_CERT_NON_REPUDIATION, callback);}
    public verifyPin(body, callback) {this.connection.post(this.url + BEID_VERIFY_PIN, body,callback);}
    public signData(body, callback) {this.connection.post(this.url + BEID_SIGN_DATA, body,callback);}
    public authenticate(body, callback) {this.connection.post(this.url + BEID_AUTHENTICATE, body,callback);}
}

export {AbstractEidBE, EidBe}