import { RestException } from "../../../core/exceptions/CoreExceptions";
import { GenericSecuredCertCard, OptionalPin } from "../Card";
import { DataResponse } from "../../../core/service/CoreModel";
import { AbstractPiv, FacialImageResponse, PrintedInformationResponse } from "./pivModel";
export { PIV };
declare class PIV extends GenericSecuredCertCard implements AbstractPiv {
    static PRINTED_INFORMATION: string;
    static FACIAL_IMAGE: string;
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    printedInformation(body: OptionalPin, callback: (error: RestException, data: PrintedInformationResponse) => void): void;
    facialImage(body: OptionalPin, callback: (error: RestException, data: FacialImageResponse) => void): void;
    authenticationCertificate(body: OptionalPin, callback: (error: RestException, data: DataResponse) => void): void;
    signingCertificate(body: OptionalPin, callback: (error: RestException, data: DataResponse) => void): void;
}
