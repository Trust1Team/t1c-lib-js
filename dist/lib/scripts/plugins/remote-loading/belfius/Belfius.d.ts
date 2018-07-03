import { RemoteLoading } from '../RemoteLoading';
import { AbstractBelfius } from './BelfiusModel';
import { BoolDataResponse } from '../../../core/service/CoreModel';
import { RestException } from '../../../core/exceptions/CoreExceptions';
import { APDU, CommandResponse } from '../RemoteLoadingModel';
export declare class Belfius extends RemoteLoading implements AbstractBelfius {
    static readonly NONCE_APDU: APDU;
    private static generateStxApdu(data, prefix?);
    isBelfiusReader(sessionId: string, callback?: (error: RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    nonce(sessionId: string, callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse>;
    stx(command: string, sessionId: string, callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse>;
    private generateStxApdus(commands);
}
