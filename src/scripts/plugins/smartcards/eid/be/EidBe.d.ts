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
    rnData(callback?: (error: RestException, data: RnDataResponse) => void | Promise<RnDataResponse>): void | Promise<any>;
    address(callback?: (error: RestException, data: AddressResponse) => void | Promise<AddressResponse>): void | Promise<any>;
    picture(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>): void | Promise<any>;
    rootCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>): void | Promise<DataResponse>;
    citizenCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>): void | Promise<DataResponse>;
    authenticationCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>): void | Promise<DataResponse>;
    nonRepudiationCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>): void | Promise<DataResponse>;
    rrnCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>): void | Promise<DataResponse>;
    verifyPin(body: OptionalPin, callback?: (error: RestException, data: T1CResponse) => void | Promise<T1CResponse>): void | Promise<any>;
}
