/**
 * @author Maarten Casteels
 * @since 2016
 */
import {connection} from "../../../../core/comm/Connection";
import * as CoreExceptions from "../../../../core/comm/CoreExceptions";

interface AbstractEidBE{
    rnData(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    address(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    photo(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    rootCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    citizenCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    authenticationCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    nonRepudiationCertificate(callback:(error:CoreExceptions.RestException, data:any) => void):void;
}

const PLUGIN_CONTEXT_BEID = "/beid";
const BEID_RN_DATA = "/rn";
const BEID_ADDRESS = "/address";
const BEID_PHOTO = "/photo";
const BEID_CERT_ROOT = "/rootCertificate";
const BEID_CERT_CITIZEN = "/citizenCertificate";
const BEID_CERT_AUTHENTICATION = "/authenticationCertificate";
const BEID_CERT_NON_REPUDIATION = "/nonRepudiationCertificate";


class EidBe implements AbstractEidBE{

    constructor(private url:string) {
        this.url = url + PLUGIN_CONTEXT_BEID;
    }

    public rnData(callback) {connection.get(this.url + BEID_RN_DATA,callback);}
    public address(callback) {connection.get(this.url + BEID_ADDRESS, callback);}
    public photo(callback) {connection.get(this.url + BEID_PHOTO, callback);}
    public rootCertificate(callback) {connection.get(this.url + BEID_CERT_ROOT, callback);}
    public citizenCertificate(callback) {connection.get(this.url+ BEID_CERT_CITIZEN, callback);}
    public authenticationCertificate(callback) {connection.get(this.url +  BEID_CERT_AUTHENTICATION, callback);}
    public nonRepudiationCertificate(callback) {connection.get(this.url +  BEID_CERT_NON_REPUDIATION, callback);}

    // post Verify Pin
    public verifyPin(body, resolve, reject) {
        let p = connection.postPromise(this.url + '/verifyPin', body);
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // post Sign
    public sign(body, resolve, reject) {
        let p = connection.postPromise(this.url + '/sign', body);
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }
}

export {AbstractEidBE, EidBe}