/**
 * @author Maarten Casteels
 * @since 2016
 */

import {connection} from "../Connection";

export class BeIDCard {

    private url:string;
    private info_url:string;

    constructor(url:string) {
        this.url = url + '/beid';
        this.info_url = url;
    }

    // GET  GCL Info
    public info(resolve, reject) {
        let p = connection.get(this.info_url + '/info');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // GET  Rn Data
    public rn(resolve, reject) {
        let p = connection.get(this.url + '/rn');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // GET  Address
    public address(resolve, reject) {
        let p = connection.get(this.url + '/address');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // GET  Photo
    public photo(resolve, reject) {
        let p = connection.get(this.url + '/photo');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // GET  Certificate Root
    public rootCertificate(resolve, reject) {
        let p = connection.get(this.url + '/rootCertificate');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }


    // GET  Certificate Citizen
    public citizenCertificate(resolve, reject) {
        let p = connection.get(this.url + '/citizenCertificate');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // GET  Certificate Non Repudiation
    public authenticationCertificate(resolve, reject) {
        let p = connection.get(this.url + '/authenticationCertificate');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // GET  Certificate Non Repudiation
    public nonRepudiationCertificate(resolve, reject) {
        let p = connection.get(this.url + '/nonRepudiationCertificate');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // POST Verify Pin
    public verifyPin(body, resolve, reject) {
        let p = connection.post(this.url + '/verifyPin', body);
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // POST Sign
    public sign(body, resolve, reject) {
        let p = connection.post(this.url + '/sign', body);
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }
}