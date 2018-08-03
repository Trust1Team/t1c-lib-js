import * as _ from 'lodash';
import * as asn1js from 'asn1js';
import * as Base64 from 'Base64';
import Certificate from 'pkijs/build/Certificate';
import { T1CCertificate } from '../core/service/CoreModel';
import { ResponseHandler } from './ResponseHandler';
var CertParser = (function () {
    function CertParser() {
    }
    CertParser.process = function (response, parseCerts, callback) {
        if (response && response.data && typeof response.data === 'object' && !_.isArray(response.data)) {
            _.forEach(response.data, function (value, key) {
                if (key.indexOf('certificate') > -1) {
                    if (typeof value === 'string') {
                        response.data[key] = { base64: value };
                        CertParser.setParsed(response.data[key], value, parseCerts);
                    }
                    else if (_.isArray(value)) {
                        var newData_1 = [];
                        _.forEach(value, function (certificate) {
                            var cert = new T1CCertificate(certificate);
                            CertParser.setParsed(cert, certificate, parseCerts);
                            newData_1.push(cert);
                        });
                        response.data[key] = newData_1;
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
                var newData_2 = [];
                _.forEach(response.data, function (certificate) {
                    if (typeof certificate === 'string') {
                        var cert = new T1CCertificate(certificate);
                        CertParser.setParsed(cert, certificate, parseCerts);
                        newData_2.push(cert);
                    }
                    else {
                        var cert = new T1CCertificate(certificate.base64, certificate.id);
                        CertParser.setParsed(cert, certificate.base64, parseCerts);
                        newData_2.push(cert);
                    }
                });
                response.data = newData_2;
            }
            else {
                var cert = new T1CCertificate(response.data);
                CertParser.setParsed(cert, response.data, parseCerts);
                response.data = cert;
            }
        }
        return ResponseHandler.response(response, callback);
    };
    CertParser.processCert = function (certificate) {
        console.log('trying --> ', certificate);
        var rawCert = Base64.atob(certificate);
        console.log('trying rawCert --> ', rawCert);
        var buffer = CertParser.str2ab(rawCert);
        console.log('trying buffer --> ', buffer);
        var asn1 = asn1js.fromBER(buffer);
        console.log('trying asn1 --> ', asn1);
        var tempCert = new Certificate({ schema: asn1.result });
        console.log('trying tempCert --> ', tempCert);
        return tempCert;
    };
    CertParser.str2ab = function (str) {
        var buf = new ArrayBuffer(str.length);
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    };
    CertParser.setParsed = function (cert, base64, parseCerts) {
        if (parseCerts) {
            cert.parsed = CertParser.processCert(base64);
        }
        else {
            delete cert.parsed;
        }
    };
    return CertParser;
}());
export { CertParser };
//# sourceMappingURL=CertParser.js.map