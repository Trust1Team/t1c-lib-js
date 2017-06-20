import { AbstractPkcs11 } from "./pkcs11Model";
import { OptionalPin } from "../smartcards/Card";
import { RestException } from "../../core/exceptions/CoreExceptions";
import { CertificatesResponse } from "../../core/service/CoreModel";
import { LocalConnection } from "../../core/client/Connection";

/**
 * @author Maarten Somers
 */


export { Pkcs11 };

class Pkcs11 implements AbstractPkcs11 {
    static ALL_CERTIFICATES = "/certificates";


    constructor(protected baseUrl: string,
                protected containerUrl: string,
                protected connection: LocalConnection,
                protected modulePath: string) {}

    public certificates(body: OptionalPin,
                        callback?: (error: RestException, data: CertificatesResponse) => void): Promise<CertificatesResponse> {
        let req = { module: this.modulePath, pin: body.pin };
        return this.connection.post(this.resolvedURI() + Pkcs11.ALL_CERTIFICATES, req, undefined, callback);
    }


    // resolves the reader_id in the base URL
    protected resolvedURI(): string {
        return this.baseUrl + this.containerUrl;
    }
}

