/**
 * @author Maarten Casteels
 * @since 2016
 */

import { Promise } from 'es6-promise';
import { Connection } from './../Connection';

export class BeIDCard {

    private url:string;
    private connection:Connection;

    constructor(url:string, connection:Connection) {
        this.url = url + '/beid';
        this.connection = connection;
    }

    // GET  Rn Data
    public rn(resolve, reject) {
        var p = this.connection.get(this.url + '/rn');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // GET  Address
    public address(resolve, reject) {
        var p = this.connection.get(this.url + '/address');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // GET  Photo
    public photo(resolve, reject) {
        var p = this.connection.get(this.url + '/photo');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }

    // GET  Certificate Root
    public rootCertificate(resolve, reject) {
        var p = this.connection.get(this.url + '/rootCertificate');
        p.then((result) => {
            return resolve(result);
        }, (error) => {
            return reject(error);
        })
    }


    // GET  Certificate Citizen
    // GET  Certificate Non Repudiation
    // POST Verify Pin
    // POST Sign
}