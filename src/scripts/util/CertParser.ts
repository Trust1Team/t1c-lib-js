/**
 * @author Maarten Somers
 */

import { Promise } from 'es6-promise';
import * as _ from 'lodash';
import * as asn1js from 'asn1js';
import * as Base64 from 'Base64';
import { Certificate } from 'pkijs';
import { RestException } from '../core/exceptions/CoreExceptions';
import { T1CCertificate, T1CResponse } from '../core/service/CoreModel';
import { ResponseHandler } from './ResponseHandler';

export { CertParser };

class CertParser {

    public static process(response: any,
                          parseCerts: boolean,
                          callback?: (error: RestException, data: T1CResponse) => void):  Promise<any> {
        // check if data has properties
        if (response && response.data && typeof response.data === 'object' && !_.isArray(response.data)) {
            _.forEach(response.data, (value, key) => {
                if (key.indexOf('certificate') > -1) {
                    if (typeof value === 'string') {
                        response.data[ key ] = { base64: value };
                        if (parseCerts) { response.data[ key ].parsed = CertParser.processCert(value); }
                    }
                    if (_.isArray(value)) {
                        let newData = [];
                        _.forEach(value, (certificate: string) => {
                            let cert: T1CCertificate = { base64: certificate };
                            if (parseCerts) { cert.parsed = CertParser.processCert(certificate); }
                            newData.push(cert);
                        });
                        response.data[ key ] = newData;
                    }
                }
            });
        } else {
            // assuming data is a string or string[]
            if (_.isArray(response.data)) {
                let newData = [];
                _.forEach(response.data, (certificate: string | { base64: string, id: string }) => {
                    if (typeof certificate === 'string') {
                        let cert: T1CCertificate = { base64: certificate };
                        if (parseCerts) { cert.parsed = CertParser.processCert(certificate); }
                        newData.push(cert);
                    } else {
                        // assume object
                        let cert: T1CCertificate = certificate;
                        if (parseCerts) { cert.parsed = CertParser.processCert(certificate.base64); }
                        newData.push(cert);
                    }
                });
                response.data = newData;
            } else {
                let cert: T1CCertificate = { base64: response.data };
                if (parseCerts) { cert.parsed = CertParser.processCert(response.data); }
                response.data = cert;
            }
        }
        return ResponseHandler.response(response, callback);
    }


    public static processCert(certificate: string): T1CCertificate {
        let rawCert = Base64.atob(certificate);
        let buffer = CertParser.str2ab(rawCert);
        const asn1 = asn1js.fromBER(buffer);
        return new Certificate({ schema: asn1.result });
    }

    // function to convert string to ArrayBuffer
    private static str2ab(str: string) {
        let buf = new ArrayBuffer(str.length);
        let bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) { bufView[i] = str.charCodeAt(i); }

        return buf;
    }

}
