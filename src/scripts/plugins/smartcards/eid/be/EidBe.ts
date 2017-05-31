/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
import { AbstractEidBE, AddressResponse, RnDataResponse } from "./EidBeModel";
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { GenericCertCard, OptionalPin, VerifyPinData } from "../../Card";

export { EidBe };


class EidBe extends GenericCertCard implements AbstractEidBE {
    static RN_DATA = "/rn";
    static ADDRESS = "/address";
    static PHOTO = "/picture";
    static VERIFY_PRIV_KEY_REF = "non-repudiation";


    public rnData(callback?: (error: RestException, data: RnDataResponse) => void, agentPort?: number) {
        return this.connection.get(this.resolvedReaderURI(agentPort) + EidBe.RN_DATA, undefined, callback);
    }

    public address(callback?: (error: RestException, data: AddressResponse) => void, agentPort?: number) {
        return this.connection.get(this.resolvedReaderURI(agentPort) + EidBe.ADDRESS, undefined, callback);
    }

    public picture(callback?: (error: RestException, data: DataResponse) => void, agentPort?: number) {
        return this.connection.get(this.resolvedReaderURI(agentPort) + EidBe.PHOTO, undefined, callback);
    }

    public rootCertificate(callback?: (error: RestException, data: DataResponse) => void, agentPort?: number) {
        return this.getCertificate(EidBe.CERT_ROOT, callback, agentPort);
    }

    public citizenCertificate(callback?: (error: RestException, data: DataResponse) => void,
                              agentPort?: number): void | Promise<DataResponse> {
        return this.getCertificate(EidBe.CERT_CITIZEN, callback, agentPort);
    }

    public authenticationCertificate(callback?: (error: RestException, data: DataResponse) => void,
                                     agentPort?: number): void | Promise<DataResponse> {
        return this.getCertificate(EidBe.CERT_AUTHENTICATION, callback, agentPort);
    }

    public nonRepudiationCertificate(callback?: (error: RestException, data: DataResponse) => void,
                                     agentPort?: number): void | Promise<DataResponse> {
        return this.getCertificate(EidBe.CERT_NON_REPUDIATION, callback, agentPort);
    }

    public rrnCertificate(callback?: (error: RestException, data: DataResponse) => void, agentPort?: number): void | Promise<DataResponse> {
        return this.getCertificate(EidBe.CERT_RRN, callback, agentPort);
    }

    public verifyPin(body: OptionalPin, callback?: (error: RestException, data: T1CResponse) => void, agentPort?: number) {
        let _req: VerifyPinData = { private_key_reference: EidBe.VERIFY_PRIV_KEY_REF };
        if (body.pin) { _req.pin = body.pin; }
        return this.connection.post(this.resolvedReaderURI(agentPort) + GenericCertCard.VERIFY_PIN, _req, undefined, callback);
    }
}
