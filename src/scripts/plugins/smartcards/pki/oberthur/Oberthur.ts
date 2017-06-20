/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { GenericCertCard, VerifyPinData } from "../../Card";
import { AbstractOberthur } from "./OberthurModel";
import { PinEnforcer } from "../../../../util/PinEnforcer";
import { Promise } from "es6-promise";

export { Oberthur };


class Oberthur extends GenericCertCard implements AbstractOberthur {

    // filters
    public allDataFilters() {
        return [ "root_certificate", "authentication-certificate",
                 "encryption_certificate", "issuer_certificate", "signing_certificate" ];
    }

    public allCertFilters() {
        return [ "root_certificate", "authentication-certificate", "encryption_certificate", "issuer_certificate", "signing_certificate" ];
    }

    public allKeyRefs() {
        return [ "authenticate", "sign", "encrypt" ];
    }

    public rootCertificate(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse> {
        return this.getCertificate(Oberthur.CERT_ROOT, callback);
    }

    public issuerCertificate(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse> {
        return this.getCertificate(Oberthur.CERT_ISSUER, callback);
    }

    public authenticationCertificate(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse> {
        return this.getCertificate(Oberthur.CERT_AUTHENTICATION, callback);
    }

    public signingCertificate(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse> {
        return this.getCertificate(Oberthur.CERT_SIGNING, callback);
    }

    public encryptionCertificate(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse> {
        return this.getCertificate(Oberthur.CERT_ENCRYPTION, callback);
    }

    public verifyPin(body: VerifyPinData, callback?: (error: RestException, data: T1CResponse) => void): Promise<any> {
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.resolvedReaderURI() + Oberthur.VERIFY_PIN, body, undefined, callback);
        });
    }
}
