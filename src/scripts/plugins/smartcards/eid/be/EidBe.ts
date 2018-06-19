/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
import { AbstractEidBE, AddressResponse, BeidRnDataResponse, BeidTokenDataResponse } from './EidBeModel';
import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataResponse, T1CResponse } from '../../../../core/service/CoreModel';
import { GenericCertCard, OptionalPin, VerifyPinData } from '../../Card';
import { PinEnforcer } from '../../../../util/PinEnforcer';
import { Options, RequestHandler } from '../../../../util/RequestHandler';
import * as _ from 'lodash';

export { EidBe };


class EidBe extends GenericCertCard implements AbstractEidBE {
    static RN_DATA = '/rn';
    static ADDRESS = '/address';
    static PHOTO = '/picture';
    static TOKEN = '/token';
    static VERIFY_PRIV_KEY_REF = 'non-repudiation';


    public rnData(callback?: (error: RestException, data: BeidRnDataResponse) => void): Promise<BeidRnDataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidBe.RN_DATA), undefined, undefined, callback);
    }

    public address(callback?: (error: RestException, data: AddressResponse) => void): Promise<AddressResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidBe.ADDRESS), undefined, undefined, callback);
    }

    public tokenData(callback?: (error: RestException, data: BeidTokenDataResponse) => void): Promise<BeidTokenDataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidBe.TOKEN), undefined, undefined, callback);
    }

    public picture(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidBe.PHOTO), undefined, undefined, callback);
    }

    public rootCertificate(options: Options,
                           callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(EidBe.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }

    public citizenCertificate(options: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(EidBe.CERT_CITIZEN, RequestHandler.determineOptions(options, callback));
    }

    public authenticationCertificate(options: Options,
                                     callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(EidBe.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    }

    public nonRepudiationCertificate(options: Options,
                                     callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(EidBe.CERT_NON_REPUDIATION, RequestHandler.determineOptions(options, callback));
    }

    public rrnCertificate(options: Options,
                          callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(EidBe.CERT_RRN, RequestHandler.determineOptions(options, callback));
    }

    public verifyPin(body: OptionalPin,
                     callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse> {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            let encryptedBody = _.extend({ private_key_reference: EidBe.VERIFY_PRIV_KEY_REF }, body);
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericCertCard.VERIFY_PIN),
                encryptedBody, undefined, undefined, callback);
        });
    }
}
