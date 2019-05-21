import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import { GenericSecuredCertCard, OptionalPin } from '../Card';
import { CertificateResponse } from '../../../core/service/CoreModel';
import { AbstractPiv, PivFacialImageResponse, PivPrintedInformationResponse } from './pivModel';
import { Options } from '../../../util/RequestHandler';
import { LocalConnection } from '../../../core/client/Connection';
export declare class PIV extends GenericSecuredCertCard implements AbstractPiv {
    static CONTAINER_PREFIX: string;
    static PRINTED_INFORMATION: string;
    static FACIAL_IMAGE: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string);
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    printedInformation(body: OptionalPin, callback?: (error: T1CLibException, data: PivPrintedInformationResponse) => void): Promise<PivPrintedInformationResponse>;
    printedInformationWithEncryptedPin(body: OptionalPin, callback?: (error: T1CLibException, data: PivPrintedInformationResponse) => void): Promise<PivPrintedInformationResponse>;
    facialImage(body: OptionalPin, callback?: (error: T1CLibException, data: PivFacialImageResponse) => void): Promise<PivFacialImageResponse>;
    facialImageWithEncryptedPin(body: OptionalPin, callback?: (error: T1CLibException, data: PivFacialImageResponse) => void): Promise<PivFacialImageResponse>;
    authenticationCertificate(body: OptionalPin, options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(body: OptionalPin, options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
