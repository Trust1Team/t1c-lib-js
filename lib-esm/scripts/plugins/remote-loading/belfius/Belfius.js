var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { RemoteLoading } from '../RemoteLoading';
import { APDU } from '../RemoteLoadingModel';
import { ResponseHandler } from '../../../util/ResponseHandler';
var Belfius = (function (_super) {
    __extends(Belfius, _super);
    function Belfius() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Belfius.generateStxApdu = function (data, prefix) {
        if (prefix && prefix.length) {
            return new APDU('F1', '95', 'F7', 'E4', prefix + data);
        }
        else {
            return new APDU('F1', '95', 'F7', 'E4', '00' + data);
        }
    };
    Belfius.prototype.isBelfiusReader = function (sessionId, callback) {
        var _this = this;
        if (sessionId && sessionId.length) {
            return this.connection.get(this.baseUrl, '/card-readers/' + this.reader_id, undefined).then(function (reader) {
                return _this.apdu(Belfius.NONCE_APDU, sessionId).then(function (res) {
                    return ResponseHandler.response({ data: res.data.sw === '9000', success: true }, callback);
                });
            }, function (err) {
                return ResponseHandler.error(err, callback);
            });
        }
        else {
            return ResponseHandler.error({ status: 400, description: 'Session ID is required!', code: '402' }, callback);
        }
    };
    Belfius.prototype.nonce = function (sessionId, callback) {
        var _this = this;
        return this.isBelfiusReader(sessionId).then(function (compatibleReader) {
            if (compatibleReader.data) {
                return _this.apdu(Belfius.NONCE_APDU, sessionId, callback);
            }
            else {
                return ResponseHandler.error({ status: 400,
                    description: 'Reader is not compatible with this request.', code: '2' }, callback);
            }
        });
    };
    Belfius.prototype.stx = function (command, sessionId, callback) {
        var _this = this;
        return this.isBelfiusReader(sessionId).then(function (compatibleReader) {
            if (compatibleReader.data) {
                if (command.length <= 500) {
                    return _this.apdu(Belfius.generateStxApdu(command), sessionId, callback);
                }
                else {
                    var commandStringArray = [];
                    for (var i = 0; i < Math.ceil(command.length / 500); i++) {
                        commandStringArray.push(command.substr(i * 500, 500));
                    }
                    return _this.apdu(_this.generateStxApdus(commandStringArray), sessionId).then(function (res) {
                        var totalRx = '';
                        res.data.forEach(function (partialRes) {
                            if (partialRes.rx) {
                                totalRx += partialRes.rx;
                            }
                        });
                        var finalResponse = {
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
    };
    Belfius.prototype.generateStxApdus = function (commands) {
        var apduArray = [];
        var totalCommands = commands.length - 1;
        commands.forEach(function (cmd, idx) {
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
    };
    Belfius.NONCE_APDU = new APDU('F1', '95', 'F7', 'E4', 'FE0000040001300000');
    return Belfius;
}(RemoteLoading));
export { Belfius };
//# sourceMappingURL=Belfius.js.map