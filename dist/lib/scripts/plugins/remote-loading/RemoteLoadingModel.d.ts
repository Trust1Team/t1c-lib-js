import { T1CLibException } from '../../core/exceptions/CoreExceptions';
import { BoolDataResponse, DataResponse, T1CResponse } from '../../core/service/CoreModel';
export interface AbstractRemoteLoading {
    atr(sessionId?: string, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    apdu(apdu: APDU, sessionId?: string, callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse>;
    apdu(apdu: APDU[], sessionId?: string, callback?: (error: T1CLibException, data: CommandsResponse) => void): Promise<CommandsResponse>;
    ccid(feature: string, command: string, sessionId?: string, callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse>;
    ccidFeatures(sessionId?: string, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    command(tx: string, sessionId?: string, callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse>;
    command(tx: string[], sessionId?: string, callback?: (error: T1CLibException, data: CommandsResponse) => void): Promise<CommandsResponse>;
    closeSession(sessionId?: string, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    isPresent(sessionId?: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    openSession(timeout?: number, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
}
export declare class APDU {
    cla: string;
    ins: string;
    p1: string;
    p2: string;
    data?: string;
    le?: string;
    constructor(cla: string, ins: string, p1: string, p2: string, data?: string, le?: string);
}
export declare class CommandResponse extends T1CResponse {
    data: Command;
    success: boolean;
    constructor(data: Command, success: boolean);
}
export declare class CommandsResponse extends T1CResponse {
    data: Command[];
    success: boolean;
    constructor(data: Command[], success: boolean);
}
export declare class Command {
    sw: string;
    tx: string;
    rx?: string;
    constructor(sw: string, tx: string, rx?: string);
}
