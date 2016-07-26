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
}

const PLUGIN_CONTEXT_BEID = "/beid";
const BEID_RN_DATA = "/rn";
const BEID_ADDRESS = "/address";
const BEID_PHOTO = "/photo";
const BEID_CERT_ROOT = "/rootCertificate";


class EidBe implements AbstractEidBE{

    constructor(private url:string) {
        this.url = url + PLUGIN_CONTEXT_BEID;
    }

    public rnData(callback) {connection.get(this.url + BEID_RN_DATA,callback);}
    public address(callback) {connection.get(this.url + BEID_ADDRESS, callback);}
    public photo(callback) {connection.get(this.url + BEID_PHOTO, callback);}
    public rootCertificate(callback) {connection.get(this.url + BEID_CERT_ROOT, callback);}


    // get Certificate Citizen
    public citizenCertificate(resolve, reject) {
        let p = connection.getPromise(this.url + '/citizenCertificate');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // get Certificate Non Repudiation
    public authenticationCertificate(resolve, reject) {
        let p = connection.getPromise(this.url + '/authenticationCertificate');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // get Certificate Non Repudiation
    public nonRepudiationCertificate(resolve, reject) {
        let p = connection.getPromise(this.url + '/nonRepudiationCertificate');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

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