import { AbstractRemoteLoading, APDU, CommandResponse, CommandsResponse } from './RemoteLoadingModel';
import { RestException } from '../../core/exceptions/CoreExceptions';
import { BoolDataResponse, DataResponse } from '../../core/service/CoreModel';
import { GenericReaderContainer } from '../smartcards/Card';
export declare class RemoteLoading extends GenericReaderContainer implements AbstractRemoteLoading {
    static ATR: string;
    static APDU: string;
    static APDUS: string;
    static CCID: string;
    static CCID_FEATURES: string;
    static CMD: string;
    static CMDS: string;
    static CLOSE_SESSION: string;
    static IS_PRESENT: string;
    static OPEN_SESSION: string;
    private static optionalSessionIdParam;
    atr(sessionId?: string, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    apdu(apdu: APDU, sessionId?: string, callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse>;
    apdu(apdu: APDU[], sessionId?: string, callback?: (error: RestException, data: CommandsResponse) => void): Promise<CommandsResponse>;
    ccid(feature: string, command: string, sessionId?: string, callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse>;
    ccidFeatures(sessionId?: string, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    command(tx: string, sessionId?: string, callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse>;
    command(tx: string[], sessionId?: string, callback?: (error: RestException, data: CommandsResponse) => void): Promise<CommandsResponse>;
    closeSession(sessionId?: string, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    isPresent(sessionId?: string, callback?: (error: RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    openSession(timeout?: number, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
}
