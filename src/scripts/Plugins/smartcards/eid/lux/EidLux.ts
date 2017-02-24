/**
 * @author Michallis Pashidis
 * @since 2017
 */
import {LocalConnection} from "../../../../core/client/Connection";
import * as CoreExceptions from "../../../../core/exceptions/CoreExceptions";

interface AbstractEidLUX{
    allDataFilters():Array<string>;
    allCertFilters():Array<string>;
    allData(filters:string[],callback:(error:CoreExceptions.RestException, data:any) => void):void;
    allCerts(filters:string[], callback:(error:CoreExceptions.RestException, data:any) => void):void;
    biometric(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    address(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    picture(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    rootCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    authenticationCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    nonRepudiationCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    verifyPin(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    signData(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    authenticate(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    signatureImage(callback:(error:CoreExceptions.RestException, data:any) => void):void;
}

function createFilterQueryParam(filters:string[],pin:string):any {
    return { filter: filters.join(','), pin: pin };
}
function createPinQueryParam(pin:string):any {
    return { pin: pin };
}

const SEPARATOR = "/";
const PLUGIN_CONTEXT_LUXEID = "/plugins/luxeid";
const LUX_ALL_CERTIFICATES = "/certificates";
const LUX_BIOMETRIC = "/biometric";
const LUX_ADDRESS = "/address";
const LUX_PHOTO = "/picture";
const LUX_CERT_ROOT = LUX_ALL_CERTIFICATES + "/root";
const LUX_CERT_AUTHENTICATION = LUX_ALL_CERTIFICATES + "/authentication";
const LUX_CERT_NON_REPUDIATION = LUX_ALL_CERTIFICATES + "/non-repudiation";
const LUX_VERIFY_PIN = "/verify-pin";
const LUX_SIGN_DATA = "/sign";
const LUX_AUTHENTICATE = "/authenticate";
const LUX_SIGNATURE_IMAGE = "/signature-image";


class EidLux implements AbstractEidLUX{
    // constructor
    constructor(private url:string, private connection:LocalConnection, private reader_id:string, private pin:string) {
        this.url = url + PLUGIN_CONTEXT_LUXEID;
        this.pin = pin;
    }

    // filters
    public allDataFilters(){
        return ["authentication-certificate","biometric","non-repudiation-certificate","picture","root-certificates"];
    }

    public allCertFilters(){
        return ["authentication-certificate","non-repudiation-certificate","root-certificates"];
    }

    // resolves the reader_id in the base URL
    private resolvedReaderURI():string{
        return this.url + SEPARATOR + this.reader_id;
    }

    public allData(filters, callback) {
        if(filters && filters.length>0){this.connection.get(this.resolvedReaderURI(), callback, createFilterQueryParam(filters,this.pin));}
        else{this.connection.get(this.resolvedReaderURI(), callback, createPinQueryParam(this.pin));}
    }

    public allCerts(filters, callback) {
        if(filters && filters.length>0){this.connection.get(this.resolvedReaderURI() + LUX_ALL_CERTIFICATES, callback, createFilterQueryParam(filters,this.pin));}
        else{this.connection.get(this.resolvedReaderURI() + LUX_ALL_CERTIFICATES, callback, createPinQueryParam(this.pin));}
    }

    biometric(callback){this.connection.get(this.resolvedReaderURI() + LUX_BIOMETRIC,callback, createPinQueryParam(this.pin));}
    address(callback) {this.connection.get(this.resolvedReaderURI() + LUX_ADDRESS, callback, createPinQueryParam(this.pin));}
    picture(callback) {this.connection.get(this.resolvedReaderURI() + LUX_PHOTO, callback, createPinQueryParam(this.pin));}
    rootCertificate(callback) {this.connection.get(this.resolvedReaderURI() + LUX_CERT_ROOT, callback, createPinQueryParam(this.pin));}
    authenticationCertificate(callback) {this.connection.get(this.resolvedReaderURI() + LUX_CERT_AUTHENTICATION, callback,createPinQueryParam(this.pin));}
    nonRepudiationCertificate(callback) {this.connection.get(this.resolvedReaderURI() + LUX_CERT_NON_REPUDIATION, callback,createPinQueryParam(this.pin));}

    verifyPin(body, callback) {
        let _req:any = {};
        if (body.pin) {_req.pin = body.pin;}
        this.connection.post(this.resolvedReaderURI() + LUX_VERIFY_PIN, _req, callback, createPinQueryParam(this.pin));
    }

    signData(body, callback) {
        let _req:any = {};
        if (body) {
            _req.algorithm_reference = body.algorithm_reference;
            _req.data = body.data;
            if(body.pin) {_req.pin = body.pin;}
        }
        this.connection.post(this.resolvedReaderURI() + LUX_SIGN_DATA, _req, callback, createPinQueryParam(this.pin));
    }

    authenticate(body, callback) {
        let _req:any = {};
        if(body){
            _req.data = body.data;
            _req.algorithm_reference = body.algorithm_reference;
            if(body.pin) {_req.pin = body.pin;}
        }
        this.connection.post(this.resolvedReaderURI() + LUX_AUTHENTICATE, _req, callback, createPinQueryParam(this.pin));
    }

    signatureImage(callback) {
        this.connection.get(this.resolvedReaderURI() + LUX_SIGNATURE_IMAGE, callback, createPinQueryParam(this.pin));
    }
}

export {AbstractEidLUX, EidLux}