/**
 * @author Michallis Pashidis
 * @since 2016
 */
import {LocalConnection} from "../../../../core/client/Connection";
import * as CoreExceptions from "../../../../core/exceptions/CoreExceptions";

interface AbstractEidBE{
    allData(filters:string[],callback:(error:CoreExceptions.RestException, data:any) => void):void;
    allCerts(filters:string[], callback:(error:CoreExceptions.RestException, data:any) => void):void;
    rnData(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    address(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    picture(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    rootCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    citizenCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    authenticationCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    nonRepudiationCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    rrnCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    verifyPin(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    signData(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    authenticate(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
}

const SEPARATOR = "/";
const PLUGIN_CONTEXT_BEID = "/plugins/beid";
const BEID_ALL_CERTIFICATES = "/certificates";
const BEID_RN_DATA = "/rn";
const BEID_ADDRESS = "/address";
const BEID_PHOTO = "/picture";
const BEID_CERT_ROOT = BEID_ALL_CERTIFICATES + "/root";
const BEID_CERT_CITIZEN = BEID_ALL_CERTIFICATES + "/citizen";
const BEID_CERT_AUTHENTICATION = BEID_ALL_CERTIFICATES + "/authentication";
const BEID_CERT_NON_REPUDIATION = BEID_ALL_CERTIFICATES + "/non-repudiation";
const BEID_CERT_RRN = BEID_ALL_CERTIFICATES + "/rrn";
const BEID_VERIFY_PIN = "/verify-pin";
const BEID_SIGN_DATA = "/sign";
const BEID_AUTHENTICATE = "/authenticate";

// property constants
const VERIFY_PRIV_KEY_REF = "non-repudiation";

function createFilter(filters:string[]):any {
    return { filter: filters.join(',') };
}


class EidBe implements AbstractEidBE{
    // constructor
    constructor(private url:string,private connection:LocalConnection,private reader_id:string) {this.url = url + PLUGIN_CONTEXT_BEID;}

    // resolves the reader_id in the base URL
    private resolvedReaderURI():string{
        return this.url + SEPARATOR + this.reader_id;
    }

    public allData(filters, callback) {
        if(filters && filters.length>0){this.connection.get(this.resolvedReaderURI(), callback, createFilter(filters));}
        else{this.connection.get(this.resolvedReaderURI(), callback);}
    }
    public allCerts(filters, callback) {
        if(filters && filters.length>0){this.connection.get(this.resolvedReaderURI() + BEID_ALL_CERTIFICATES, callback, createFilter(filters));}
        else{this.connection.get(this.resolvedReaderURI() + BEID_ALL_CERTIFICATES, callback);}
    }
    public rnData(callback) {this.connection.get(this.resolvedReaderURI() + BEID_RN_DATA,callback);}
    public address(callback) {this.connection.get(this.resolvedReaderURI() + BEID_ADDRESS, callback);}
    public picture(callback) {this.connection.get(this.resolvedReaderURI() + BEID_PHOTO, callback);}
    public rootCertificate(callback) {this.connection.get(this.resolvedReaderURI() + BEID_CERT_ROOT, callback);}
    public citizenCertificate(callback) {this.connection.get(this.resolvedReaderURI()+ BEID_CERT_CITIZEN, callback);}
    public authenticationCertificate(callback) {this.connection.get(this.resolvedReaderURI() +  BEID_CERT_AUTHENTICATION, callback);}
    public nonRepudiationCertificate(callback) {this.connection.get(this.resolvedReaderURI() +  BEID_CERT_NON_REPUDIATION, callback);}
    public rrnCertificate(callback) {this.connection.get(this.resolvedReaderURI() +  BEID_CERT_RRN, callback);}
    public verifyPin(body, callback) {
        let _req:any = {};
        _req.private_key_reference = VERIFY_PRIV_KEY_REF;
        if(body.pin) {_req.pin = body.pin;}
        this.connection.post(this.resolvedReaderURI() + BEID_VERIFY_PIN, _req, callback);
    }    
    public signData(body, callback) {
    	let _req:any = {};
    	if (body) {
			_req.algorithm_reference = body.algorithm_reference;
			_req.data = body.data;
			if(body.pin) {_req.pin = body.pin;}  		
		}
    
    	this.connection.post(this.resolvedReaderURI() + BEID_SIGN_DATA, _req, callback);
    }
    public authenticate(body, callback) {
        let _req:any = {};
        if(body){
            _req.data = body.data;
            _req.algorithm_reference = body.algorithm_reference;
            if(body.pin) {_req.pin = body.pin;}
        }
        this.connection.post(this.resolvedReaderURI() + BEID_AUTHENTICATE, _req,callback);
    }
}

export {AbstractEidBE, EidBe}