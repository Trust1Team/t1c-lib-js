/**
 * @author Maarten Somers
 * @since 2017
 */

import { RestException } from "../../../core/exceptions/CoreExceptions";
import { DataResponse, T1CResponse } from "../../../core/service/CoreModel";
import { CommandResponse } from "../RemoteLoadingModel";

export { AbstractBelfius };


interface AbstractBelfius {
    closeSession(sessionId: string, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    isBelfiusReader(sessionId: string, callback?: (error: RestException, data: boolean) => void): Promise<boolean>;
    nonce(sessionId: string, callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse>;
    openSession(timeout?: number, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    stx(command: string, sessionId: string, callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse>;
}
