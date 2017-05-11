import { AbstractEMV } from "./EMVModel";
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { GenericPinCard } from "../Card";
import { DataResponse } from "../../../core/service/CoreModel";
export { EMV };
declare class EMV extends GenericPinCard implements AbstractEMV {
    pan(callback: (error: RestException, data: DataResponse) => void): void;
}
