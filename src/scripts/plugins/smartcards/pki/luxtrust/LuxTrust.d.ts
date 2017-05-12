import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataResponse } from "../../../../core/service/CoreModel";
import { GenericCertCard } from "../../Card";
import { AbstractLuxTrust } from "./LuxTrustModel";
export { LuxTrust };
declare class LuxTrust extends GenericCertCard implements AbstractLuxTrust {
    rootCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>): void | Promise<DataResponse>;
    authenticationCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>): void | Promise<DataResponse>;
    signingCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>): void | Promise<DataResponse>;
}
