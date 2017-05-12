import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { GenericCertCard, ResetPinData, VerifyPinData } from "../../Card";
import { AbstractAventra } from "./AventraModel";
export { Aventra };
declare class Aventra extends GenericCertCard implements AbstractAventra {
    static RESET_PIN: string;
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    rootCertificate(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
    issuerCertificate(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
    authenticationCertificate(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
    signingCertificate(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
    encryptionCertificate(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: RestException, data: T1CResponse) => void): void | Promise<T1CResponse>;
    resetPin(body: ResetPinData, callback?: (error: RestException, data: T1CResponse) => void): void | Promise<T1CResponse>;
}
