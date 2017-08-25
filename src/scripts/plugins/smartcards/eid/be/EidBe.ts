/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
import { AbstractEidBE, AddressResponse, RnDataResponse } from "./EidBeModel";
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { CertificateResponse, DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { GenericCertCard, OptionalPin, VerifyPinData } from "../../Card";
import { PinEnforcer } from "../../../../util/PinEnforcer";
import { Promise } from "es6-promise";
import { Options, RequestHandler } from "../../../../util/RequestHandler";

export { EidBe };


class EidBe extends GenericCertCard implements AbstractEidBE {
    static RN_DATA = "/rn";
    static ADDRESS = "/address";
    static PHOTO = "/picture";
    static VERIFY_PRIV_KEY_REF = "non-repudiation";


    public rnData(callback?: (error: RestException, data: RnDataResponse) => void, agentPort?: number): Promise<RnDataResponse> {
        return this.connection.get(this.resolvedReaderURI(agentPort) + EidBe.RN_DATA, undefined, callback);
    }

    public address(callback?: (error: RestException, data: AddressResponse) => void, agentPort?: number): Promise<AddressResponse> {
        return this.connection.get(this.resolvedReaderURI(agentPort) + EidBe.ADDRESS, undefined, callback);
    }

    public picture(callback?: (error: RestException, data: DataResponse) => void, agentPort?: number): Promise<DataResponse> {
        return this.connection.get(this.resolvedReaderURI(agentPort) + EidBe.PHOTO, undefined, callback);
    }

    public rootCertificate(options: Options,
                           callback?: (error: RestException, data: CertificateResponse) => void,
                           agentPort?: number): Promise<CertificateResponse> {
        return this.getCertificate(EidBe.CERT_ROOT, RequestHandler.determineOptions(options, callback), agentPort);
    }

    public citizenCertificate(options: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void,
                              agentPort?: number): Promise<CertificateResponse> {
        return this.getCertificate(EidBe.CERT_CITIZEN, RequestHandler.determineOptions(options, callback), agentPort);
    }

    public authenticationCertificate(options: Options,
                                     callback?: (error: RestException, data: CertificateResponse) => void,
                                     agentPort?: number): Promise<CertificateResponse> {
        return this.getCertificate(EidBe.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback), agentPort);
    }

    public nonRepudiationCertificate(options: Options,
                                     callback?: (error: RestException, data: CertificateResponse) => void,
                                     agentPort?: number): Promise<CertificateResponse> {
        return this.getCertificate(EidBe.CERT_NON_REPUDIATION, RequestHandler.determineOptions(options, callback), agentPort);
    }

    public rrnCertificate(options: Options,
                          callback?: (error: RestException, data: CertificateResponse) => void,
                          agentPort?: number): Promise<CertificateResponse> {
        return this.getCertificate(EidBe.CERT_RRN, RequestHandler.determineOptions(options, callback), agentPort);
    }

    public verifyPin(body: OptionalPin,
                     callback?: (error: RestException, data: T1CResponse) => void, agentPort?: number): Promise<T1CResponse> {
        let _req: VerifyPinData = { private_key_reference: EidBe.VERIFY_PRIV_KEY_REF };
        if (body.pin) { _req.pin = body.pin; }
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin, agentPort).then(() => {
            return this.connection.post(this.resolvedReaderURI(agentPort) + GenericCertCard.VERIFY_PIN, _req, undefined, callback);
        });
    }
}
