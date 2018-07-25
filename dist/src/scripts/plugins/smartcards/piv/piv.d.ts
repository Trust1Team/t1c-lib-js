import { RestException } from '../../../core/exceptions/CoreExceptions';
import { GenericSecuredCertCard, OptionalPin } from '../Card';
import { CertificateResponse } from '../../../core/service/CoreModel';
import { AbstractPiv, PivFacialImageResponse, PivPrintedInformationResponse } from './pivModel';
import { Options } from '../../../util/RequestHandler';
export declare class PIV extends GenericSecuredCertCard implements AbstractPiv {
    static PRINTED_INFORMATION: string;
    static FACIAL_IMAGE: string;
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    printedInformation(body: OptionalPin, callback?: (error: RestException, data: PivPrintedInformationResponse) => void): Promise<PivPrintedInformationResponse>;
    facialImage(body: OptionalPin, callback?: (error: RestException, data: PivFacialImageResponse) => void): Promise<PivFacialImageResponse>;
    authenticationCertificate(body: OptionalPin, options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(body: OptionalPin, options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
