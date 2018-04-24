import { RestException } from '../../../core/exceptions/CoreExceptions';
import { DataResponse } from '../../../core/service/CoreModel';
import { AbstractMobib, CardIssuingResponse, ContractsResponse, StatusResponse } from './mobibModel';
import { GenericSmartCard } from '../Card';
export { Mobib };
declare class Mobib extends GenericSmartCard implements AbstractMobib {
    cardIssuing(callback?: (error: RestException, data: CardIssuingResponse) => void): Promise<CardIssuingResponse>;
    contracts(callback?: (error: RestException, data: ContractsResponse) => void): Promise<ContractsResponse>;
    picture(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    status(callback?: (error: RestException, data: StatusResponse) => void): Promise<StatusResponse>;
}
