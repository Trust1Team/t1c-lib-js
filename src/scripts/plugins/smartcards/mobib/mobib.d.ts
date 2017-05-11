import { RestException } from "../../../core/exceptions/CoreExceptions";
import { DataResponse } from "../../../core/service/CoreModel";
import { AbstractMobib, CardIssuingResponse, ContractsResponse, StatusResponse } from "./mobibModel";
import { GenericSmartCard } from "../Card";
export { Mobib };
declare class Mobib extends GenericSmartCard implements AbstractMobib {
    cardIssuing(callback: (error: RestException, data: CardIssuingResponse) => void): void;
    contracts(callback: (error: RestException, data: ContractsResponse) => void): void;
    picture(callback: (error: RestException, data: DataResponse) => void): void;
    status(callback: (error: RestException, data: StatusResponse) => void): void;
}
