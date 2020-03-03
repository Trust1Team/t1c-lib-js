/**
 * @author Maarten Somers
 * @since 2017
 */

import { RemoteLoading } from '../RemoteLoading';
import { AbstractBelfius } from './BelfiusModel';
import { BoolDataResponse } from '../../../core/service/CoreModel';
import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import { APDU, CommandResponse } from '../RemoteLoadingModel';
import { ResponseHandler } from '../../../util/ResponseHandler';


export class Belfius extends RemoteLoading implements AbstractBelfius {
    static readonly NONCE_APDU: APDU = new APDU('F1', '95', 'F7', 'E4', 'FE0000040001300000');

    private static generateStxApdu(data: string, prefix?: string): APDU {
        if (prefix && prefix.length) { return new APDU('F1', '95', 'F7', 'E4', prefix + data); }
        else { return new APDU('F1', '95', 'F7', 'E4', '00' + data); }
    }

    public isBelfiusReader(sessionId: string,
                           callback?: (error: T1CLibException, data: BoolDataResponse) => void): Promise<BoolDataResponse> {
        if (sessionId && sessionId.length) {
            return this.connection.get(this.baseUrl, '/card-readers/' + this.reader_id, undefined).then(reader => {
                // check Nonce command works
                return this.apdu(Belfius.NONCE_APDU, sessionId).then(res => {
                    return ResponseHandler.response({ data: res.data.sw === '9000', success: true }, callback);
                });
            }, err => {
                return ResponseHandler.error(err, callback);
            });
        } else {
            return ResponseHandler.error({ status: 400, description: 'Session ID is required!', code: '402' }, callback);
        }
    }

    public nonce(sessionId: string, callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse> {
        return this.isBelfiusReader(sessionId).then(compatibleReader => {
            if (compatibleReader.data) {
                return this.apdu(Belfius.NONCE_APDU, sessionId, callback);
            } else {
                return ResponseHandler.error({ status: 400,
                    description: 'Reader is not compatible with this request.', code: '2' }, callback);
            }
        });
    }

    public stx(command: string, sessionId: string,
               callback?: (error: T1CLibException, data: CommandResponse) => void): Promise<CommandResponse> {
        return this.isBelfiusReader(sessionId).then(compatibleReader => {
            if (compatibleReader.data) {
                if (command.length <= 500) {
                    return this.apdu(Belfius.generateStxApdu(command), sessionId, callback);
                } else {
                    // needs to be split into different requests
                    let commandStringArray = [];
                    // each request has 250 bytes (=500 char) maximum
                    for (let i = 0; i < Math.ceil(command.length / 500); i++) {
                        commandStringArray.push(command.substr(i * 500, 500));
                    }
                    return this.apdu(this.generateStxApdus(commandStringArray), sessionId).then(res => {
                        let totalRx = '';
                        // join rx's to get total rx
                        res.data.forEach(partialRes => {
                            if (partialRes.rx) { totalRx += partialRes.rx; }
                        });
                        let finalResponse: CommandResponse = {
                            data: { tx: res.data[res.data.length - 1].tx, sw: res.data[res.data.length - 1].sw },
                            success: res.success
                        };
                        if (finalResponse.data.sw === '9000' && totalRx.length > 0) { finalResponse.data.rx = totalRx; }
                        return ResponseHandler.response(finalResponse, callback);
                    });
                }
            } else {
                return ResponseHandler.error({ status: 400,
                    description: 'Reader is not compatible with this request.', code: '2' }, callback);
            }
        });
    }

    private generateStxApdus(commands: string[]): APDU[] {
        let apduArray = [];
        let totalCommands = commands.length - 1;
        commands.forEach((cmd, idx) => {
            if (idx === 0) {
                apduArray.push(Belfius.generateStxApdu(cmd, '01'));
            } else if (idx === totalCommands) {
                apduArray.push(Belfius.generateStxApdu(cmd, '02'));
            } else {
                apduArray.push(Belfius.generateStxApdu(cmd, '03'));
            }
        });
        return apduArray;
    }
}
