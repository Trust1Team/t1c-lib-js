/**
 * @author Michallis Pashidis
 * @since 2016
 */
import {LocalConnection} from "../../../core/client/Connection";
import * as CoreExceptions from "../../../core/exceptions/CoreExceptions";

interface AbstractAventra{
    allDataFilters():Array<string>;
    allCertFilters():Array<string>;
    allKeyRefs():Array<string>;
    allData(filters:string[],callback:(error:CoreExceptions.RestException, data:any) => void):void;
    allCerts(filters:string[], callback:(error:CoreExceptions.RestException, data:any) => void):void;
    rootCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    issuerCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    authenticationCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    signingCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    encryptionCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    verifyPin(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    resetPin(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    signData(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    authenticate(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
}

const SEPARATOR = "/";
const PLUGIN_CONTEXT_BEID = "/plugins/aventra";
const AVENTRA_ALL_CERTIFICATES = "/certificates";
const AVENTRA_CERT_ROOT = AVENTRA_ALL_CERTIFICATES + "/root";
const AVENTRA_CERT_ISSUER = AVENTRA_ALL_CERTIFICATES + "/issuer";
const AVENTRA_CERT_AUTHENTICATION = AVENTRA_ALL_CERTIFICATES + "/authentication";
const AVENTRA_CERT_SIGNING = AVENTRA_ALL_CERTIFICATES + "/signing";
const AVENTRA_CERT_ENCRYPTION = AVENTRA_ALL_CERTIFICATES + "/encryption";
const AVENTRA_VERIFY_PIN = "/verify-pin";
const AVENTRA_SIGN_DATA = "/sign";
const AVENTRA_AUTHENTICATE = "/authenticate";

function createFilter(filters:string[]):any {
    return { filter: filters.join(',') };
}


class Aventra implements AbstractAventra{
    // constructor
    constructor(private url:string,private connection:LocalConnection,private reader_id:string) {this.url = url + PLUGIN_CONTEXT_BEID;}

    // filters
    public allDataFilters(){
        return ["serial","root_certificate","authentication-certificate","encryption_certificate","issuer_certificate","signing_certificate"];
    }

    public allCertFilters(){
        return ["root_certificate","authentication-certificate","encryption_certificate","issuer_certificate","signing_certificate"];
    }

    public allKeyRefs(){
        return ["authenticate","sign","encrypt"];
    }

    // resolves the reader_id in the base URL
    private resolvedReaderURI():string{
        return this.url + SEPARATOR + this.reader_id;
    }

    allData(filters, callback): void {
        if(filters && filters.length>0){this.connection.get(this.resolvedReaderURI(), callback, createFilter(filters));}
        else{this.connection.get(this.resolvedReaderURI(), callback);}
    }

    allCerts(filters, callback): void {
        if(filters && filters.length>0){this.connection.get(this.resolvedReaderURI() + AVENTRA_ALL_CERTIFICATES, callback, createFilter(filters));}
        else{this.connection.get(this.resolvedReaderURI() + AVENTRA_ALL_CERTIFICATES, callback);}
    }

    rootCertificate(callback): void {
        this.connection.get(this.resolvedReaderURI() + AVENTRA_CERT_ROOT, callback);
    }

    issuerCertificate(callback): void {
        this.connection.get(this.resolvedReaderURI() + AVENTRA_CERT_ISSUER, callback);
    }

    authenticationCertificate(callback): void {
        this.connection.get(this.resolvedReaderURI() + AVENTRA_CERT_AUTHENTICATION, callback);
    }

    signingCertificate(callback): void {
        this.connection.get(this.resolvedReaderURI() + AVENTRA_CERT_SIGNING, callback);
    }

    encryptionCertificate(callback): void {
        this.connection.get(this.resolvedReaderURI() + AVENTRA_CERT_ENCRYPTION, callback);
    }

    verifyPin(body, callback): void {
        let _req:any = {};
        if (body.pin) {_req.pin = body.pin;}
        if (body.private_key_reference) {_req.private_key_reference = body.private_key_reference;}
        this.connection.post(this.resolvedReaderURI() + AVENTRA_VERIFY_PIN, _req, callback);
    }

    resetPin(body, callback): void {
        let _req:any = {};
        if (body.new_pin) {_req.pin = body.new_pin;}
        if (body.puk) {_req.puk = body.puk;}
        if (body.private_key_reference) {_req.private_key_reference = body.private_key_reference;}
        this.connection.post(this.resolvedReaderURI() + AVENTRA_VERIFY_PIN, _req, callback);
    }

    signData(body, callback): void {
        //only sha1 possible
        let _req:any = {};
        if (body) {
            _req.algorithm_reference = body.algorithm_reference;
            _req.data = body.data;
            if(body.pin) {_req.pin = body.pin;}
        }
        this.connection.post(this.resolvedReaderURI() + AVENTRA_SIGN_DATA, _req, callback);
    }

    authenticate(body, callback): void {
        let _req:any = {};
        if(body){
            _req.data = body.data;
            _req.algorithm_reference = body.algorithm_reference;
            if(body.pin) {_req.pin = body.pin;}
        }
        this.connection.post(this.resolvedReaderURI() + AVENTRA_AUTHENTICATE, _req,callback);
    }
}

export {AbstractAventra, Aventra}