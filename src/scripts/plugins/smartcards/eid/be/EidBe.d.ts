import { AbstractEidBE, AddressResponse, RnDataResponse } from "./EidBeModel";
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { GenericCertCard, OptionalPin } from "../../Card";
export { EidBe };
declare class EidBe extends GenericCertCard implements AbstractEidBE {
    static RN_DATA: string;
    static ADDRESS: string;
    static PHOTO: string;
    static VERIFY_PRIV_KEY_REF: string;
    rnData(callback: (error: RestException, data: RnDataResponse) => void): void;
    address(callback: (error: RestException, data: AddressResponse) => void): void;
    picture(callback: (error: RestException, data: DataResponse) => void): void;
    rootCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    citizenCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    authenticationCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    nonRepudiationCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    rrnCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void): void;
}
