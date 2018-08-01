import * as _ from 'lodash';
import * as asn1js from 'asn1js';
import * as Base64 from 'Base64';
import Certificate from 'pkijs/build/Certificate';
import { T1CCertificate } from '../core/service/CoreModel';
import { ResponseHandler } from './ResponseHandler';
export class CertParser {
    static process(response, parseCerts, callback) {
        if (response && response.data && typeof response.data === 'object' && !_.isArray(response.data)) {
            _.forEach(response.data, (value, key) => {
                if (key.indexOf('certificate') > -1) {
                    if (typeof value === 'string') {
                        response.data[key] = { base64: value };
                        CertParser.setParsed(response.data[key], value, parseCerts);
                    }
                    else if (_.isArray(value)) {
                        let newData = [];
                        _.forEach(value, (certificate) => {
                            let cert = new T1CCertificate(certificate);
                            CertParser.setParsed(cert, certificate, parseCerts);
                            newData.push(cert);
                        });
                        response.data[key] = newData;
                    }
                    else if (_.isObject(value)) {
                        response.data[key] = { base64: value.base64 };
                        if (value.id) {
                            response.data[key].id = value.id;
                        }
                        if (parseCerts) {
                            response.data[key].parsed = CertParser.processCert(value.base64);
                        }
                    }
                }
            });
        }
        else {
            if (_.isArray(response.data)) {
                let newData = [];
                _.forEach(response.data, (certificate) => {
                    if (typeof certificate === 'string') {
                        let cert = new T1CCertificate(certificate);
                        CertParser.setParsed(cert, certificate, parseCerts);
                        newData.push(cert);
                    }
                    else {
                        let cert = new T1CCertificate(certificate.base64, certificate.id);
                        CertParser.setParsed(cert, certificate.base64, parseCerts);
                        newData.push(cert);
                    }
                });
                response.data = newData;
            }
            else {
                let cert = new T1CCertificate(response.data);
                CertParser.setParsed(cert, response.data, parseCerts);
                response.data = cert;
            }
        }
        return ResponseHandler.response(response, callback);
    }
    static processCert(certificate) {
        let rawCert = Base64.atob(certificate);
        let buffer = CertParser.str2ab(rawCert);
        const asn1 = asn1js.fromBER(buffer);
        return new Certificate({ schema: asn1.result });
    }
    static str2ab(str) {
        let buf = new ArrayBuffer(str.length);
        let bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }
    static setParsed(cert, base64, parseCerts) {
        if (parseCerts) {
            cert.parsed = CertParser.processCert(base64);
        }
        else {
            delete cert.parsed;
        }
    }
}
//# sourceMappingURL=CertParser.js.map