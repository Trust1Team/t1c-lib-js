import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import { DataResponse } from '../../../core/service/CoreModel';
import { AbstractMobib, MobibCardIssuingResponse, MobibContractsResponse, MobibStatusResponse } from './mobibModel';
import { GenericSmartCard } from '../Card';
import { LocalConnection } from '../../../core/client/Connection';
export declare class Mobib extends GenericSmartCard implements AbstractMobib {
    static CONTAINER_PREFIX: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string);
    cardIssuing(callback?: (error: T1CLibException, data: MobibCardIssuingResponse) => void): Promise<MobibCardIssuingResponse>;
    contracts(callback?: (error: T1CLibException, data: MobibContractsResponse) => void): Promise<MobibContractsResponse>;
    picture(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    status(callback?: (error: T1CLibException, data: MobibStatusResponse) => void): Promise<MobibStatusResponse>;
}
