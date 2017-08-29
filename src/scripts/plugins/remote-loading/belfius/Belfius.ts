/**
 * @author Maarten Somers
 * @since 2017
 */

import { RemoteLoading } from "../RemoteLoading";
import { AbstractBelfius } from "./BelfiusModel";
import { DataResponse, T1CResponse } from "../../../core/service/CoreModel";
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { APDU, CommandResponse } from "../RemoteLoadingModel";
import { ResponseHandler } from "../../../util/ResponseHandler";
import { GCLConfig } from "../../../core/GCLConfig";

export { Belfius };


class Belfius implements AbstractBelfius {
    static NONCE_APDU: APDU = {
        cla: "F1",
        ins: "95",
        p1: "F7",
        p2: "E4",
        data: "FE0000040001300000"
    };

    constructor(protected remoteLoading: RemoteLoading) {}

    public closeSession(callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.remoteLoading.closeSession(callback);
    }

    public nonce(sessionId: string, callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse> {
        if (sessionId && sessionId.length) {
            return this.remoteLoading.apdu(Belfius.NONCE_APDU, sessionId, callback);
        } else {
            return ResponseHandler.error({ status: 400, description: "Session ID is required!", code: "402" }, callback);
        }
    }

    public openSession(timeout?: number, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.remoteLoading.openSession(timeout, callback);
    }

    public stx(command: string, sessionId: string,
               callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse> {
        if (sessionId && sessionId.length) {
            let stxApdu = Belfius.NONCE_APDU;
            stxApdu.data = command;
            return this.remoteLoading.apdu(stxApdu, sessionId, callback);
        } else {
            return ResponseHandler.error({ status: 400, description: "Session ID is required!", code: "402" }, callback);
        }
    }
}
