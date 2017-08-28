/**
 * @author Maarten Somers
 * @since 2017
 */
import { AbstractRemoteLoading, APDU, CommandResponse, CommandsResponse } from "./RemoteLoadingModel";
import { RestException } from "../../core/exceptions/CoreExceptions";
import * as _ from "lodash";
import { BoolDataResponse, DataResponse, T1CResponse } from "../../core/service/CoreModel";
import { GenericContainer } from "../smartcards/Card";

export { RemoteLoading };


class RemoteLoading extends GenericContainer implements AbstractRemoteLoading {
    static ATR = "/atr";
    static APDU = "/apdu";
    static APDUS = "/apdus";
    static CCID = "/ccid";
    static CCID_FEATURES = "/ccid-features";
    static CMD = "/command";
    static CMDS = "/commands";
    static CLOSE_SESSION = "/close-session";
    static IS_PRESENT = "/is-present";
    static OPEN_SESSION = "/open-session";

    private static optionalSessionIdParam(sessionId?: string): { "session-id": string } | undefined {
        if (sessionId && sessionId.length) { return { "session-id": sessionId }; }
        else { return undefined; }
    }

    public atr(sessionId?: string, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(RemoteLoading.ATR),
            RemoteLoading.optionalSessionIdParam(sessionId), callback);
    }

    public apdu(apdu: APDU, sessionId?: string,
                callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse>;
    public apdu(apdu: APDU[], sessionId?: string,
                callback?: (error: RestException, data: CommandsResponse) => void): Promise<CommandsResponse>;
    public apdu(apdu: APDU | APDU[], sessionId?: string,
                callback?: (error: RestException, data: any) => void): Promise<any> {
        let suffix = this.containerSuffix(RemoteLoading.APDU);
        if (_.isArray(apdu)) { suffix = this.containerSuffix(RemoteLoading.APDUS); }
        return this.connection.post(this.baseUrl, suffix, apdu, RemoteLoading.optionalSessionIdParam(sessionId), callback);
    }

    public ccid(feature: string, apdu: string, sessionId?: string,
                callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(RemoteLoading.CCID), { feature, apdu },
            RemoteLoading.optionalSessionIdParam(sessionId), callback);
    }

    public ccidFeatures(sessionId?: string, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(RemoteLoading.CCID_FEATURES),
            RemoteLoading.optionalSessionIdParam(sessionId), callback);
    }

    public command(tx: string, sessionId?: string,
                   callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse>;
    public command(tx: string[], sessionId?: string,
                   callback?: (error: RestException, data: CommandsResponse) => void): Promise<CommandsResponse>;
    public command(tx: string | string[], sessionId?: string, callback?: (error: RestException, data: any) => void): Promise<any> {
        let suffix = this.containerSuffix(RemoteLoading.CMD);
        if (_.isArray(tx)) { suffix = this.containerSuffix(RemoteLoading.CMDS); }
        return this.connection.post(this.baseUrl, suffix, tx, RemoteLoading.optionalSessionIdParam(sessionId), callback);
    }

    public closeSession(callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(RemoteLoading.CLOSE_SESSION), undefined, callback);
    }

    public isPresent(sessionId?: string, callback?: (error: RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(RemoteLoading.IS_PRESENT),
            RemoteLoading.optionalSessionIdParam(sessionId), callback);
    }

    public openSession(timeout?: number, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(RemoteLoading.OPEN_SESSION), { timeout }, undefined, callback);
    }

}
