/**
 * @author Maarten Somers
 * @since 2017
 */
import {LocalConnection} from "../../../core/client/Connection";
import * as CoreExceptions from "../../../core/exceptions/CoreExceptions";

interface AbstractLuxTrust{
    allData(filters:string[],callback:(error:CoreExceptions.RestException, data:any) => void):void;
    allCerts(filters:string[], callback:(error:CoreExceptions.RestException, data:any) => void):void;
    rootCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    authenticationCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    signingCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    verifyPin(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    signData(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    authenticate(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;

    // TODO remove once this is moved to separate plugin
    challenge(body:any, callback:(error:CoreExceptions.RestException, data:any) => void):void;
}

function createFilterQueryParam(filters:string[]):any {
    return { filter: filters.join(',') };
}

const SEPARATOR = "/";
const PLUGIN_CONTEXT_LUXTRUST = "/plugins/luxtrust";
const LUX_ALL_CERTIFICATES = "/certificates";
const LUX_CERT_ROOT = LUX_ALL_CERTIFICATES + "/root";
const LUX_CERT_AUTHENTICATION = LUX_ALL_CERTIFICATES + "/authentication";
const LUX_CERT_SIGNING = LUX_ALL_CERTIFICATES + "/signing";
const LUX_VERIFY_PIN = "/verify-pin";
const LUX_SIGN_DATA = "/sign";
const LUX_AUTHENTICATE = "/authenticate";
// TODO remove once this is moved to separate plugin
const LUX_OTP_CHALLENGE = '/ocra/challenge';


class LuxTrust implements AbstractLuxTrust {
    // constructor
    constructor(private url:string, private connection:LocalConnection, private reader_id:string) {
        this.url = url + PLUGIN_CONTEXT_LUXTRUST;
    }

    // resolves the reader_id in the base URL
    private resolvedReaderURI():string{
        return this.url + SEPARATOR + this.reader_id;
    }

    public allData(filters, callback) {
        if(filters && filters.length>0){this.connection.get(this.resolvedReaderURI(), callback, createFilterQueryParam(filters));}
        else{this.connection.get(this.resolvedReaderURI(), callback);}
    }

    public allCerts(filters, callback) {
        if(filters && filters.length>0){this.connection.get(this.resolvedReaderURI() + LUX_ALL_CERTIFICATES, callback, createFilterQueryParam(filters));}
        else{this.connection.get(this.resolvedReaderURI() + LUX_ALL_CERTIFICATES, callback);}
    }

    rootCertificate(callback) {this.connection.get(this.resolvedReaderURI() + LUX_CERT_ROOT, callback);}
    authenticationCertificate(callback) {this.connection.get(this.resolvedReaderURI() + LUX_CERT_AUTHENTICATION, callback);}
    signingCertificate(callback) {this.connection.get(this.resolvedReaderURI() + LUX_CERT_SIGNING, callback);}

    verifyPin(body, callback) {
        let _req:any = {};
        if (body.pin) {_req.pin = body.pin;}
        this.connection.post(this.resolvedReaderURI() + LUX_VERIFY_PIN, _req, callback);
    }

    signData(body, callback) {
        let _req:any = {};
        if (body) {
            _req.algorithm_reference = body.algorithm_reference;
            _req.data = body.data;
            if(body.pin) {_req.pin = body.pin;}
        }
        this.connection.post(this.resolvedReaderURI() + LUX_SIGN_DATA, _req, callback);
    }

    authenticate(body, callback) {
        let _req:any = {};
        if(body){
            _req.data = body.data;
            _req.algorithm_reference = body.algorithm_reference;
            if(body.pin) {_req.pin = body.pin;}
        }
        this.connection.post(this.resolvedReaderURI() + LUX_AUTHENTICATE, _req, callback);
    }

    // TODO remove once OTP gets moved to separate plugin
    challenge(body, callback) {
        let _req:any = {};
        if (body) {
            if(body.pin) {_req.pin = body.pin;}
        }
        this.connection.post(this.resolvedReaderURI() + LUX_OTP_CHALLENGE, _req, callback);
    }
}

export { AbstractLuxTrust, LuxTrust}