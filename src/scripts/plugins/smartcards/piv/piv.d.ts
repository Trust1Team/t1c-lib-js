import { RestException } from '../../../core/exceptions/CoreExceptions';
import { GenericSecuredCertCard, OptionalPin } from '../Card';
import { CertificateResponse } from '../../../core/service/CoreModel';
import { AbstractPiv, FacialImageResponse, PrintedInformationResponse } from './pivModel';
import { Options } from '../../../util/RequestHandler';
export { PIV };
declare class PIV extends GenericSecuredCertCard implements AbstractPiv {
    static PRINTED_INFORMATION: string;
    static FACIAL_IMAGE: string;
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    printedInformation(body: OptionalPin, callback?: (error: RestException, data: PrintedInformationResponse) => void): Promise<PrintedInformationResponse>;
    facialImage(body: OptionalPin, callback?: (error: RestException, data: FacialImageResponse) => void): Promise<FacialImageResponse>;
    authenticationCertificate(body: OptionalPin, options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(body: OptionalPin, options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
