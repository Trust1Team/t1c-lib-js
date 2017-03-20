/**
 * @author Michallis Pashidis
 * @since 2016
 */
import {LocalConnection} from "../../../core/client/Connection";
import * as CoreExceptions from "../../../core/exceptions/CoreExceptions";

interface AbstractAventra{
    allCerts(filters:string[], callback:(error:CoreExceptions.RestException, data:any) => void):void;
    rootCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    issuerCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    authenticationCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    signingCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    encryptionCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    verifyPin(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
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

    // resolves the reader_id in the base URL
    private resolvedReaderURI():string{
        return this.url + SEPARATOR + this.reader_id;
    }

    allCerts(filters, callback): void {
    }

    rootCertificate(callback): void {
    }

    issuerCertificate(callback): void {
    }

    authenticationCertificate(callback): void {
    }

    signingCertificate(callback): void {
    }

    encryptionCertificate(callback): void {
    }

    verifyPin(body, callback): void {
    }

    signData(body, callback): void {
    }

    authenticate(body, callback): void {
    }
}

export {AbstractAventra, Aventra}