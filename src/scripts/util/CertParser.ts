/**
 * @author Maarten Somers
 */

import { Promise } from "es6-promise";
export { CertParser };
import * as _ from "lodash";
import * as asn1js from "asn1js";
import * as Base64 from "Base64";
import { Certificate } from "pkijs";
import { RestException } from "../core/exceptions/CoreExceptions";
import { T1CResponse } from "../core/service/CoreModel";

class CertParser {

    public static process(response: T1CResponse,
                          callback?: (error: RestException, data: T1CResponse) => void): void | Promise<any> {
        // determine if we need to use callback or promise
        // if error return
        // else process certificates
        if (callback && typeof callback === "function") {
            doProcess(response);
        } else {
            return new Promise((resolve, reject) => {
                doProcess(response, resolve, reject);
            });
        }

        function doProcess(res: any, resolve?: (data: any) => void, reject?: (data: any) => void) {
            // check if data has properties
            if (res && res.data && typeof res.data === "object") {
                _.forEach(res.data, (value, key) => {
                    if (key.indexOf("certificate") > -1 && typeof value === "string") {
                        res.data[key] = { base64: value, parsed: CertParser.processCert(value) };
                    }
                });
            } else {
                // assuming data is a string or string[]
                if (_.isArray(res.data)) {
                    let newData = [];
                    _.forEach(res.data, (certificate: string) => {
                        newData.push({ base64: certificate, parsed: CertParser.processCert(certificate) });
                    });
                    res.data = newData;
                } else {
                    let certificate: string = res.data;
                    res.data = { base64: certificate, parsed: CertParser.processCert(certificate) };
                }
            }
            if (resolve) { resolve(res); }
            else { callback(null, res); }
        }
    }


    public static processCert(certificate: string): Certificate {
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
