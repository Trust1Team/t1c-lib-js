
import {T1CLibException} from '../../../core/exceptions/CoreExceptions';
import {BoolDataResponse, DataResponse, T1CResponse} from '../../../core/service/CoreModel';
import {CommandResponse} from '../RemoteLoadingModel';

export interface AbstractBelfius {
    closeSession(sessionId: string, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;

    isBelfiusReader(sessionId: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;

    nonce(sessionId: string, callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse>;

    openSession(timeout?: number, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;

    stx(command: string, sessionId: string, callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse>;
}
