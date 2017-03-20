/**
 * @author Michallis Pashidis
 * @since 2016
 */
import {LocalConnection} from "../../../../core/client/Connection";
import * as CoreExceptions from "../../../../core/exceptions/CoreExceptions";

interface AbstractOberturNo{
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
const PLUGIN_CONTEXT_BEID = "/plugins/beid";
const NOOBERTUR_ALL_CERTIFICATES = "/certificates";
const NOOBERTUR_CERT_ROOT = NOOBERTUR_ALL_CERTIFICATES + "/root";
const NOOBERTUR_CERT_ISSUER = NOOBERTUR_ALL_CERTIFICATES + "/issuer";
const NOOBERTUR_CERT_AUTHENTICATION = NOOBERTUR_ALL_CERTIFICATES + "/authentication";
const NOOBERTUR_CERT_SIGNING = NOOBERTUR_ALL_CERTIFICATES + "/signing";
const NOOBERTUR_CERT_ENCRYPTION = NOOBERTUR_ALL_CERTIFICATES + "/encryption";
const NOOBERTUR_VERIFY_PIN = "/verify-pin";
const NOOBERTUR_SIGN_DATA = "/sign";
const NOOBERTUR_AUTHENTICATE = "/authenticate";

function createFilter(filters:string[]):any {
    return { filter: filters.join(',') };
}


class OberturNo implements AbstractOberturNo{
    // constructor
    constructor(private url:string,private connection:LocalConnection,private reader_id:string) {this.url = url + PLUGIN_CONTEXT_BEID;}

    // resolves the reader_id in the base URL
    private resolvedReaderURI():string{
        return this.url + SEPARATOR + this.reader_id;
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

export {AbstractOberturNo, OberturNo}