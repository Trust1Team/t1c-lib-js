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
    printedInformation(body: OptionalPin, callback?: (error: RestException, data: PrintedInformationResponse) => void | Promise<PrintedInformationResponse>): void | Promise<any>;
    facialImage(body: OptionalPin, callback?: (error: RestException, data: FacialImageResponse) => void | Promise<FacialImageResponse>): void | Promise<any>;
    authenticationCertificate(body: OptionalPin, callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>): void | Promise<DataResponse>;
    signingCertificate(body: OptionalPin, callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>): void | Promise<DataResponse>;
}
