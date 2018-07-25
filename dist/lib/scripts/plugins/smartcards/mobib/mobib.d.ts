import { RestException } from '../../../core/exceptions/CoreExceptions';
import { DataResponse } from '../../../core/service/CoreModel';
import { AbstractMobib, MobibCardIssuingResponse, MobibContractsResponse, MobibStatusResponse } from './mobibModel';
import { GenericSmartCard } from '../Card';
export declare class Mobib extends GenericSmartCard implements AbstractMobib {
    cardIssuing(callback?: (error: RestException, data: MobibCardIssuingResponse) => void): Promise<MobibCardIssuingResponse>;
    contracts(callback?: (error: RestException, data: MobibContractsResponse) => void): Promise<MobibContractsResponse>;
    picture(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    status(callback?: (error: RestException, data: MobibStatusResponse) => void): Promise<MobibStatusResponse>;
}
