/**
 * @author Maarten Somers
 * @since 2017
 */
import {LocalConnection} from "../../../core/client/Connection";
import * as CoreExceptions from "../../../core/exceptions/CoreExceptions";

interface AbstractPiv{
    allDataFilters(callback:(error:CoreExceptions.RestException, data:Array<string>) => void):void;
    allCertFilters(callback:(error:CoreExceptions.RestException, data:Array<string>) => void):void;
    allKeyRefs(callback:(error:CoreExceptions.RestException, data:Array<string>) => void):void;
    allAlgoRefsForAuthentication(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    allAlgoRefsForSigning(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    printedInformation(body:any, callback:(error:CoreExceptions.RestException, data:any) => void):void;
    facialImage(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    allData(filters:string[], callback:(error:CoreExceptions.RestException, data:any) => void):void;
    allCerts(filters:string[], callback:(error:CoreExceptions.RestException, data:any) => void):void;
    authenticationCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    signingCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    verifyPin(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    signData(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    authenticate(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
}

function createFilterQueryParam(filters:string[]):any {
    return { filter: filters.join(',') };
}

const SEPARATOR = "/";
const PLUGIN_CONTEXT_PIV = "/containers/piv";
const PIV_ALL_DATA_FILTERS = '/all-data-filters';
const PIV_ALL_CERT_FILTERS = '/all-cert-filters';
const PIV_ALL_KEY_REFS = '/all-key-refs';
const PIV_ALL_AUTH_ALGOS = '/all-algo-refs-for-authentication';
const PIV_ALL_SIGN_ALGOS = '/all-algo-refs-for-signing';
const PIV_PRINTED_INFORMATION = '/printed-information';
const PIV_FACIAL_IMAGE = '/facial-image';
const PIV_ALL_CERTIFICATES = "/certificates";
const PIV_CERT_AUTHENTICATION = PIV_ALL_CERTIFICATES + "/authentication";
const PIV_CERT_SIGNING = PIV_ALL_CERTIFICATES + "/signing";
const PIV_VERIFY_PIN = "/verify-pin";
const PIV_SIGN_DATA = "/sign";
const PIV_AUTHENTICATE = "/authenticate";


class PIV implements AbstractPiv {
    // constructor
    constructor(private url:string, private connection:LocalConnection, private reader_id:string) {
        this.url = url + PLUGIN_CONTEXT_PIV;
    }

    // resolves the reader_id in the base URL
    private resolvedReaderURI():string{
        return this.url + SEPARATOR + this.reader_id;
    }

    public allDataFilters(callback) {
        this.connection.get(this.resolvedReaderURI() + PIV_ALL_DATA_FILTERS, callback);
    }

    public allCertFilters(callback) {
        this.connection.get(this.resolvedReaderURI() + PIV_ALL_CERT_FILTERS, callback);
    }

    public allKeyRefs(callback) {
        this.connection.get(this.resolvedReaderURI() + PIV_ALL_KEY_REFS, callback);
    }

    public allAlgoRefsForAuthentication(callback) {
        this.connection.get(this.resolvedReaderURI() + PIV_ALL_AUTH_ALGOS, callback);
    }

    public allAlgoRefsForSigning(callback) {
        this.connection.get(this.resolvedReaderURI() + PIV_ALL_SIGN_ALGOS, callback);
    }

    public printedInformation(body, callback) {
        let _req:any = {};
        if (body.pin) {_req.pin = body.pin;}
        this.connection.post(this.resolvedReaderURI() + PIV_PRINTED_INFORMATION, _req, callback);
    }

    public facialImage(callback) {
        this.connection.get(this.resolvedReaderURI() + PIV_FACIAL_IMAGE, callback);
    }

    public allData(filters, callback) {
        if(filters && filters.length>0){this.connection.get(this.resolvedReaderURI(), callback, createFilterQueryParam(filters));}
        else{this.connection.get(this.resolvedReaderURI(), callback);}
    }

    public allCerts(filters, callback) {
        if(filters && filters.length>0){this.connection.get(this.resolvedReaderURI() + PIV_ALL_CERTIFICATES, callback, createFilterQueryParam(filters));}
        else{this.connection.get(this.resolvedReaderURI() + PIV_ALL_CERTIFICATES, callback);}
    }

    authenticationCertificate(callback) {this.connection.get(this.resolvedReaderURI() + PIV_CERT_AUTHENTICATION, callback);}
    signingCertificate(callback) {this.connection.get(this.resolvedReaderURI() + PIV_CERT_SIGNING, callback);}

    verifyPin(body, callback) {
        let _req:any = {};
        if (body.pin) {_req.pin = body.pin;}
        this.connection.post(this.resolvedReaderURI() + PIV_VERIFY_PIN, _req, callback);
    }

    signData(body, callback) {
        let _req:any = {};
        if (body) {
            _req.algorithm_reference = body.algorithm_reference;
            _req.data = body.data;
            if(body.pin) {_req.pin = body.pin;}
        }
        this.connection.post(this.resolvedReaderURI() + PIV_SIGN_DATA, _req, callback);
    }

    authenticate(body, callback) {
        let _req:any = {};
        if(body){
            _req.data = body.data;
            _req.algorithm_reference = body.algorithm_reference;
            if(body.pin) {_req.pin = body.pin;}
        }
        this.connection.post(this.resolvedReaderURI() + PIV_AUTHENTICATE, _req, callback);
    }
}

export { AbstractPiv, PIV }