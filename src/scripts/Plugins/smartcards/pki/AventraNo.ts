/**
 * @author Michallis Pashidis
 * @since 2016
 */
import {LocalConnection} from "../../../core/client/Connection";
import * as CoreExceptions from "../../../core/exceptions/CoreExceptions";

interface AbstractAventraNo{
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
const NOAVENTRA_ALL_CERTIFICATES = "/certificates";
const NOAVENTRA_CERT_ROOT = NOAVENTRA_ALL_CERTIFICATES + "/root";
const NOAVENTRA_CERT_ISSUER = NOAVENTRA_ALL_CERTIFICATES + "/issuer";
const NOAVENTRA_CERT_AUTHENTICATION = NOAVENTRA_ALL_CERTIFICATES + "/authentication";
const NOAVENTRA_CERT_SIGNING = NOAVENTRA_ALL_CERTIFICATES + "/signing";
const NOAVENTRA_CERT_ENCRYPTION = NOAVENTRA_ALL_CERTIFICATES + "/encryption";
const NOAVENTRA_VERIFY_PIN = "/verify-pin";
const NOAVENTRA_SIGN_DATA = "/sign";
const NOAVENTRA_AUTHENTICATE = "/authenticate";

function createFilter(filters:string[]):any {
    return { filter: filters.join(',') };
}


class AventraNo implements AbstractAventraNo{
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

export {AbstractAventraNo, AventraNo}