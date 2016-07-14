/**
 * @author Maarten Casteels
 * @since 2016
 */

import {connection} from "./../Connection";

export class BeIDCard {

    private url:string;

    constructor(url:string) {
        this.url = url + '/beid';
    }

    // GET  Rn Data
    public rn(resolve, reject) {
        var p = connection.get(this.url + '/rn');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // GET  Address
    public address(resolve, reject) {
        var p = connection.get(this.url + '/address');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // GET  Photo
    public photo(resolve, reject) {
        var p = connection.get(this.url + '/photo');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // GET  Certificate Root
    public rootCertificate(resolve, reject) {
        var p = connection.get(this.url + '/rootCertificate');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }


    // GET  Certificate Citizen
    public citizenCertificate(resolve, reject) {
        var p = connection.get(this.url + '/citizenCertificate');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // GET  Certificate Non Repudiation
    public authenticationCertificate(resolve, reject) {
        var p = connection.get(this.url + '/authenticationCertificate');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // GET  Certificate Non Repudiation
    public nonRepudiationCertificate(resolve, reject) {
        var p = connection.get(this.url + '/nonRepudiationCertificate');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // POST Verify Pin
    public verifyPin(body, resolve, reject) {
        var p = connection.post(this.url + '/verifyPin', body);
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // POST Sign
    public sign(body, resolve, reject) {
        var p = connection.post(this.url + '/sign', body);
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }
}