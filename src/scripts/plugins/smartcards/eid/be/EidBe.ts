/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
import { AbstractEidBE, AddressResponse, RnDataResponse } from "./EidBeModel";
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { GenericCertCard, OptionalPin, VerifyPinData } from "../../Card";
import { PinEnforcer } from "../../../../util/PinEnforcer";
import { Promise } from "es6-promise";

export { EidBe };


class EidBe extends GenericCertCard implements AbstractEidBE {
    static RN_DATA = "/rn";
    static ADDRESS = "/address";
    static PHOTO = "/picture";
    static VERIFY_PRIV_KEY_REF = "non-repudiation";


    public rnData(callback?: (error: RestException, data: RnDataResponse) => void): Promise<RnDataResponse> {
        return this.connection.get(this.resolvedReaderURI() + EidBe.RN_DATA, undefined, callback);
    }

    public address(callback?: (error: RestException, data: AddressResponse) => void): Promise<AddressResponse> {
        return this.connection.get(this.resolvedReaderURI() + EidBe.ADDRESS, undefined, callback);
    }

    public picture(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.resolvedReaderURI() + EidBe.PHOTO, undefined, callback);
    }

    public rootCertificate(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.getCertificate(EidBe.CERT_ROOT, callback);
    }

    public citizenCertificate(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.getCertificate(EidBe.CERT_CITIZEN, callback);
    }

    public authenticationCertificate(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.getCertificate(EidBe.CERT_AUTHENTICATION, callback);
    }

    public nonRepudiationCertificate(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.getCertificate(EidBe.CERT_NON_REPUDIATION, callback);
    }

    public rrnCertificate(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.getCertificate(EidBe.CERT_RRN, callback);
    }


    public verifyPin(body: OptionalPin, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse> {
        let _req: VerifyPinData = { private_key_reference: EidBe.VERIFY_PRIV_KEY_REF };
        if (body.pin) { _req.pin = body.pin; }
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.resolvedReaderURI() + GenericCertCard.VERIFY_PIN, _req, undefined, callback);
        });
    }
}
