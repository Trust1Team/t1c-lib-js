import { RemoteLoading } from '../RemoteLoading';
import { APDU } from '../RemoteLoadingModel';
import { ResponseHandler } from '../../../util/ResponseHandler';
import * as _ from 'lodash';
export class Belfius extends RemoteLoading {
    static generateStxApdu(data, prefix) {
        if (prefix && prefix.length) {
            return new APDU('F1', '95', 'F7', 'E4', prefix + data);
        }
        else {
            return new APDU('F1', '95', 'F7', 'E4', '00' + data);
        }
    }
    isBelfiusReader(sessionId, callback) {
        if (sessionId && sessionId.length) {
            return this.connection.get(this.baseUrl, '/card-readers/' + this.reader_id, undefined).then(reader => {
                return this.apdu(Belfius.NONCE_APDU, sessionId).then(res => {
                    return ResponseHandler.response({ data: res.data.sw === '9000', success: true }, callback);
                });
            }, err => {
                return ResponseHandler.error(err, callback);
            });
        }
        else {
            return ResponseHandler.error({ status: 400, description: 'Session ID is required!', code: '402' }, callback);
        }
    }
    nonce(sessionId, callback) {
        return this.isBelfiusReader(sessionId).then(compatibleReader => {
            if (compatibleReader.data) {
                return this.apdu(Belfius.NONCE_APDU, sessionId, callback);
            }
            else {
                return ResponseHandler.error({ status: 400,
                    description: 'Reader is not compatible with this request.', code: '2' }, callback);
            }
        });
    }
    stx(command, sessionId, callback) {
        return this.isBelfiusReader(sessionId).then(compatibleReader => {
            if (compatibleReader.data) {
                if (command.length <= 500) {
                    return this.apdu(Belfius.generateStxApdu(command), sessionId, callback);
                }
                else {
                    let commandStringArray = [];
                    for (let i = 0; i < Math.ceil(command.length / 500); i++) {
                        commandStringArray.push(command.substr(i * 500, 500));
                    }
                    return this.apdu(this.generateStxApdus(commandStringArray), sessionId).then(res => {
                        let totalRx = '';
                        _.forEach(res.data, partialRes => {
                            if (partialRes.rx) {
                                totalRx += partialRes.rx;
                            }
                        });
                        let finalResponse = {
                            data: { tx: res.data[res.data.length - 1].tx, sw: res.data[res.data.length - 1].sw },
                            success: res.success
                        };
                        if (finalResponse.data.sw === '9000' && totalRx.length > 0) {
                            finalResponse.data.rx = totalRx;
                        }
                        return ResponseHandler.response(finalResponse, callback);
                    });
                }
            }
            else {
                return ResponseHandler.error({ status: 400,
                    description: 'Reader is not compatible with this request.', code: '2' }, callback);
            }
        });
    }
    generateStxApdus(commands) {
        let apduArray = [];
        let totalCommands = commands.length - 1;
        _.forEach(commands, (cmd, idx) => {
            if (idx === 0) {
                apduArray.push(Belfius.generateStxApdu(cmd, '01'));
            }
            else if (idx === totalCommands) {
                apduArray.push(Belfius.generateStxApdu(cmd, '02'));
            }
            else {
                apduArray.push(Belfius.generateStxApdu(cmd, '03'));
            }
        });
        return apduArray;
    }
}
Belfius.NONCE_APDU = new APDU('F1', '95', 'F7', 'E4', 'FE0000040001300000');
//# sourceMappingURL=Belfius.js.map