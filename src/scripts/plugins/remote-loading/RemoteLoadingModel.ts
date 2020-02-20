
import {T1CLibException} from '../../core/exceptions/CoreExceptions';
import {BoolDataResponse, DataResponse, T1CResponse} from '../../core/service/CoreModel';


export interface AbstractRemoteLoading {
    atr(sessionId?: string, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;

    apdu(apdu: APDU, sessionId?: string,
         callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse>;

    apdu(apdu: APDU[], sessionId?: string,
         callback?: (error: T1CLibException, data: CommandsResponse) => void): Promise<CommandsResponse>;

    ccid(feature: string, command: string, sessionId?: string,
         callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse>;

    ccidFeatures(sessionId?: string, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;

    command(tx: string, sessionId?: string, callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse>;

    command(tx: string[], sessionId?: string, callback?: (error: T1CLibException, data: CommandsResponse) => void): Promise<CommandsResponse>;

    closeSession(sessionId?: string, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;

    isPresent(sessionId?: string, callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;

    openSession(timeout?: number, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
}

export class APDU {
    constructor(public cla: string, public ins: string, public p1: string, public p2: string, public data?: string, public le?: string) {
    }
}

export class CommandResponse extends T1CResponse {
    constructor(public data: Command, public success: boolean) {
        super(success, data);
    }
}

export class CommandsResponse extends T1CResponse {
    constructor(public data: Command[], public success: boolean) {
        super(success, data);
    }
}

export class Command {
    constructor(public sw: string, public tx: string, public rx?: string) {
    }
}
