/**
 * @author Maarten Somers
 * @since 2017
 */

import { RestException } from "../../../core/exceptions/CoreExceptions";
import {BoolDataResponse, DataResponse, T1CResponse} from "../../../core/service/CoreModel";
import { CommandResponse } from "../RemoteLoadingModel";
import * as Bluebird from 'bluebird';

export { AbstractBelfius };


interface AbstractBelfius {
    closeSession(sessionId: string, callback?: (error: RestException, data: T1CResponse) => void): Bluebird<T1CResponse>;
    isBelfiusReader(sessionId: string, callback?: (error: RestException, data: BoolDataResponse) => void): Bluebird<BoolDataResponse>;
    nonce(sessionId: string, callback?: (error: RestException, data: CommandResponse) => void): Bluebird<CommandResponse>;
    openSession(timeout?: number, callback?: (error: RestException, data: DataResponse) => void): Bluebird<DataResponse>;
    stx(command: string, sessionId: string, callback?: (error: RestException, data: CommandResponse) => void): Bluebird<CommandResponse>;
}
