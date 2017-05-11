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
    rootCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    issuerCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    authenticationCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    signingCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    encryptionCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    verifyPin(body: VerifyPinData, callback: (error: RestException, data: T1CResponse) => void): void;
    resetPin(body: ResetPinData, callback: (error: RestException, data: T1CResponse) => void): void;
}
