/**
 * @author Maarten Somers
 * @since 2017
 */

import { RemoteLoading } from "../RemoteLoading";
import { AbstractBelfius } from "./BelfiusModel";
import {BoolDataResponse, DataResponse, T1CResponse} from "../../../core/service/CoreModel";
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { APDU, CommandResponse } from "../RemoteLoadingModel";
import { ResponseHandler } from "../../../util/ResponseHandler";
import { GCLConfig } from "../../../core/GCLConfig";

export { Belfius };


class Belfius extends RemoteLoading implements AbstractBelfius {
    static NONCE_APDU: APDU = {
        cla: "F1",
        ins: "95",
        p1: "F7",
        p2: "E4",
        data: "FE0000040001300000"
    };

    public isBelfiusReader(sessionId: string,
                           callback?: (error: RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        if (sessionId && sessionId.length) {
            return this.connection.get(this.baseUrl, "/card-readers/" + this.reader_id, undefined).then(reader => {
                // check Vasco Digipass 870 Reader
                if (reader.data.name === "VASCO DIGIPASS 870") {
                    // check Nonce command works
                    return this.apdu(Belfius.NONCE_APDU, sessionId).then(res => {
                        return ResponseHandler.response({ data: res.data.sw === "9000", success: true }, callback);
                    });
                } else { return ResponseHandler.response({ data: false, success: true }, callback); }
            }, err => {
                return ResponseHandler.error(err, callback);
            });
        } else {
            return ResponseHandler.error({ status: 400, description: "Session ID is required!", code: "402" }, callback);
        }
    }

    public nonce(sessionId: string, callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse> {
        return this.isBelfiusReader(sessionId).then(compatibleReader => {
            if (compatibleReader) {
                return this.apdu(Belfius.NONCE_APDU, sessionId, callback);
            } else {
                return ResponseHandler.error({ status: 400,
                    description: "Reader is not compatible with this request.", code: "2" }, callback);
            }
        });
    }

    public stx(command: string, sessionId: string,
               callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse> {
        return this.isBelfiusReader(sessionId).then(compatibleReader => {
            if (compatibleReader) {
                let stxApdu = Belfius.NONCE_APDU;
                stxApdu.data = command;
                return this.apdu(stxApdu, sessionId, callback);
            } else {
                return ResponseHandler.error({ status: 400,
                    description: "Reader is not compatible with this request.", code: "2" }, callback);
            }
        });
    }
}
