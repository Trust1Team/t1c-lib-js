/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
import { AbstractEidBE, AddressResponse, AllCertsResponse, AllDataResponse, RnDataResponse } from "./EidBeModel";
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { GenericCertCard, OptionalPin, VerifyPinData } from "../../Card";

class EidBe extends GenericCertCard implements AbstractEidBE {
    static RN_DATA = "/rn";
    static ADDRESS = "/address";
    static PHOTO = "/picture";
    static VERIFY_PRIV_KEY_REF = "non-repudiation";


    public allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void) {
        if (filters && filters.length) {
            this.connection.get(this.resolvedReaderURI(), callback, GenericCertCard.createFilterQueryParam(filters));
        } else { this.connection.get(this.resolvedReaderURI(), callback); }
    }

    public allCerts(filters: string[], callback: (error: RestException, data: AllCertsResponse) => void) {
        if (filters && filters.length) {
            this.connection.get(this.resolvedReaderURI() + GenericCertCard.ALL_CERTIFICATES,
                callback,
                GenericCertCard.createFilterQueryParam(filters));
        } else { this.connection.get(this.resolvedReaderURI() + GenericCertCard.ALL_CERTIFICATES, callback); }
    }

    public rnData(callback: (error: RestException, data: RnDataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + EidBe.RN_DATA, callback);
    }

    public address(callback: (error: RestException, data: AddressResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + EidBe.ADDRESS, callback);
    }

    public picture(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + EidBe.PHOTO, callback);
    }

    public rootCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + EidBe.CERT_ROOT, callback);
    }

    public citizenCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + EidBe.CERT_CITIZEN, callback);
    }

    public authenticationCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() +  EidBe.CERT_AUTHENTICATION, callback);
    }

    public nonRepudiationCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() +  EidBe.CERT_NON_REPUDIATION, callback);
    }

    public rrnCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() +  EidBe.CERT_RRN, callback);
    }

    public verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void) {
        let _req: VerifyPinData = { private_key_reference: EidBe.VERIFY_PRIV_KEY_REF };
        if (body.pin) { _req.pin = body.pin; }
        this.connection.post(this.resolvedReaderURI() + GenericCertCard.VERIFY_PIN, _req, callback);
    }
}

export { EidBe };
