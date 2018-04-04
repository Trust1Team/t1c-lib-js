/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../../core/exceptions/CoreExceptions';
import { DataResponse } from '../../../core/service/CoreModel';
import { AbstractMobib, CardIssuingResponse, ContractsResponse, StatusResponse } from './mobibModel';
import { GenericSmartCard } from '../Card';

export { Mobib };


const MOBIB_CARD_ISSUING = '/card-issuing';
const MOBIB_CONTRACTS = '/contracts';
const MOBIB_PHOTO = '/picture';
const MOBIB_STATUS = '/status';

class Mobib extends GenericSmartCard implements AbstractMobib {

    public cardIssuing(callback?: (error: RestException, data: CardIssuingResponse) => void): Promise<CardIssuingResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(MOBIB_CARD_ISSUING), undefined, undefined, callback);
    }

    public contracts(callback?: (error: RestException, data: ContractsResponse) => void): Promise<ContractsResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(MOBIB_CONTRACTS), undefined, undefined, callback);
    }

    public picture(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(MOBIB_PHOTO), undefined, undefined, callback);
    }

    public status(callback?: (error: RestException, data: StatusResponse) => void): Promise<StatusResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(MOBIB_STATUS), undefined, undefined, callback);
    }
}
