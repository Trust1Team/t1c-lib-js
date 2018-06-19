/**
 * @author Maarten Somers
 * @since 2017
 */
import { AbstractRemoteLoading, APDU, CommandResponse, CommandsResponse } from './RemoteLoadingModel';
import { RestException } from '../../core/exceptions/CoreExceptions';
import * as _ from 'lodash';
import { BoolDataResponse, DataResponse, T1CResponse } from '../../core/service/CoreModel';
import { GenericReaderContainer } from '../smartcards/Card';


export class RemoteLoading extends GenericReaderContainer implements AbstractRemoteLoading {
    static ATR = '/atr';
    static APDU = '/apdu';
    static APDUS = '/apdus';
    static CCID = '/ccid';
    static CCID_FEATURES = '/ccid-features';
    static CMD = '/command';
    static CMDS = '/commands';
    static CLOSE_SESSION = '/close-session';
    static IS_PRESENT = '/is-present';
    static OPEN_SESSION = '/open-session';

    private static optionalSessionIdParam(sessionId?: string): { 'session-id': string } | undefined {
        if (sessionId && sessionId.length) { return { 'session-id': sessionId }; }
        else { return undefined; }
    }

    public atr(sessionId?: string, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(RemoteLoading.ATR),
            RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    }

    public apdu(apdu: APDU, sessionId?: string,
                callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse>;
    public apdu(apdu: APDU[], sessionId?: string,
                callback?: (error: RestException, data: CommandsResponse) => void): Promise<CommandsResponse>;
    public apdu(apdu: APDU | APDU[], sessionId?: string,
                callback?: (error: RestException, data: any) => void): Promise<any> {
        let suffix = this.containerSuffix(RemoteLoading.APDU);
        if (_.isArray(apdu)) { suffix = this.containerSuffix(RemoteLoading.APDUS); }
        return this.connection.post(this.baseUrl, suffix, apdu, RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    }

    public ccid(feature: string, command: string, sessionId?: string,
                callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(RemoteLoading.CCID), { feature, apdu: command },
            RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    }

    public ccidFeatures(sessionId?: string, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(RemoteLoading.CCID_FEATURES),
            RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    }

    public command(tx: string, sessionId?: string,
                   callback?: (error: RestException, data: CommandResponse) => void): Promise<CommandResponse>;
    public command(tx: string[], sessionId?: string,
                   callback?: (error: RestException, data: CommandsResponse) => void): Promise<CommandsResponse>;
    public command(tx: string | string[], sessionId?: string, callback?: (error: RestException, data: any) => void): Promise<any> {
        if (_.isArray(tx)) {
            let body = [];
            _.forEach(tx, txElem => { body.push({ tx: txElem }); });
            return this.connection.post(this.baseUrl, this.containerSuffix(RemoteLoading.CMDS), body,
                RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
        } else {
            return this.connection.post(this.baseUrl, this.containerSuffix(RemoteLoading.CMD), { tx },
                RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
        }
    }

    public closeSession(sessionId?: string, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(RemoteLoading.CLOSE_SESSION),
            RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    }

    public isPresent(sessionId?: string, callback?: (error: RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(RemoteLoading.IS_PRESENT),
            RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    }

    public openSession(timeout?: number, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        if (timeout && timeout > 0) {
            return this.connection.post(this.baseUrl, this.containerSuffix(RemoteLoading.OPEN_SESSION),
                { timeout }, undefined, undefined, callback);
        } else {
            return this.connection.post(this.baseUrl, this.containerSuffix(RemoteLoading.OPEN_SESSION),
                { timeout: this.connection.cfg.defaultSessionTimeout }, undefined, undefined, callback);
        }
    }

}
