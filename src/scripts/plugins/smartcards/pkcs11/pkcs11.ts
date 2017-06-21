import { AbstractPkcs11, InfoResponse, Pin, SlotAndPin, SlotsResponse } from "./pkcs11Model";
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { CertificatesResponse } from "../../../core/service/CoreModel";
import { LocalConnection } from "../../../core/client/Connection";
import * as _ from "lodash";
import { CertParser } from "../../../util/CertParser";
import { ResponseHandler } from "../../../util/ResponseHandler";

/**
 * @author Maarten Somers
 */


export { Pkcs11 };

class Pkcs11 implements AbstractPkcs11 {
    static ALL_CERTIFICATES = "/certificates";
    static INFO = "/info";
    static SLOTS = "/slots";


    constructor(protected baseUrl: string,
                protected containerUrl: string,
                protected connection: LocalConnection,
                protected modulePath: string) {}

    public certificates(body: SlotAndPin,
                        callback?: (error: RestException, data: CertificatesResponse) => void): Promise<CertificatesResponse> {
        let req = _.extend(body, { module: this.modulePath });
        return this.connection.post(this.resolvedURI() + Pkcs11.ALL_CERTIFICATES, req, undefined).then(data => {
            return CertParser.process(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public info(body: Pin, callback: (error: RestException, data: InfoResponse) => void): Promise<InfoResponse> {
        let req = _.extend(body, { module: this.modulePath });
        return this.connection.post(this.resolvedURI() + Pkcs11.INFO, req, undefined, callback);
    }

    public slots(body: Pin, callback: (error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse> {
        let req = _.extend(body, { module: this.modulePath });
        return this.connection.post(this.resolvedURI() + Pkcs11.SLOTS, req, undefined, callback);
    }

    public slotsWithTokenPresent(body: Pin, callback: (error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse> {
        let req = _.extend(body, { module: this.modulePath });
        return this.connection.post(this.resolvedURI() + Pkcs11.SLOTS, req, { "token-present": "true" }, callback);
    }


    // resolves the reader_id in the base URL
    protected resolvedURI(): string {
        return this.baseUrl + this.containerUrl;
    }
}

