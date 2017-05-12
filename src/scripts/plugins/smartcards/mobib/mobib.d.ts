import { RestException } from "../../../core/exceptions/CoreExceptions";
import { DataResponse } from "../../../core/service/CoreModel";
import { AbstractMobib, CardIssuingResponse, ContractsResponse, StatusResponse } from "./mobibModel";
import { GenericSmartCard } from "../Card";
export { Mobib };
declare class Mobib extends GenericSmartCard implements AbstractMobib {
    cardIssuing(callback?: (error: RestException, data: CardIssuingResponse) => void | Promise<CardIssuingResponse>): void | Promise<any>;
    contracts(callback?: (error: RestException, data: ContractsResponse) => void | Promise<ContractsResponse>): void | Promise<any>;
    picture(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>): void | Promise<any>;
    status(callback?: (error: RestException, data: StatusResponse) => void | Promise<StatusResponse>): void | Promise<any>;
}
