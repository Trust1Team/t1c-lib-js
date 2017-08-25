/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../core/exceptions/CoreExceptions";
import { BoolDataResponse, DataResponse, T1CResponse } from "../../core/service/CoreModel";

export { AbstractRemoteLoading, APDU, CommandResponse, CommandsResponse, Command };


interface AbstractRemoteLoading {
    atr(sessionId?: string, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    apdu(apdu: APDU, sessionId?: string, callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse>;
    apdu(apdu: APDU[], sessionId?: string, callback?: (error: RestException, data: CommandsResponse) => void): Promise<CommandsResponse>;
    ccid(feature: string, apdu: string, sessionId?: string,
         callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    ccidFeatures(sessionId?: string, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    command(tx: string, sessionId?: string, callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse>;
    command(tx: string[], sessionId?: string, callback?: (error: RestException, data: CommandsResponse) => void): Promise<CommandsResponse>;
    closeSession(callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    isPresent(sessionId?: string, callback?: (error: RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    openSession(timeout?: number, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
}

interface APDU {
    cla: string
    ins: string
    p1: string
    p2: string
    data?: string
    le?: string
}

interface CommandResponse extends T1CResponse {
    data: Command
}

interface CommandsResponse extends T1CResponse {
    data: Command[]
}

interface Command {
    tx: string
    rx?: string
    sw: string
}
