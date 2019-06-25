"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Card_1 = require("../Card");
var PinEnforcer_1 = require("../../../util/PinEnforcer");
var Ocra = (function (_super) {
    __extends(Ocra, _super);
    function Ocra(baseUrl, containerUrl, connection, reader_id) {
        return _super.call(this, baseUrl, containerUrl, connection, reader_id, Ocra.CONTAINER_PREFIX) || this;
    }
    Ocra.prototype.challenge = function (body, callback) {
        var _this = this;
        if (callback && typeof callback === 'function') {
            PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
                return _this.connection.post(_this.baseUrl, _this.containerSuffix(Ocra.CHALLENGE), body, undefined, undefined, callback);
            }, function (error) {
                return callback(error, null);
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                PinEnforcer_1.PinEnforcer.check(_this.connection, _this.reader_id, body).then(function () {
                    resolve(_this.connection.post(_this.baseUrl, _this.containerSuffix(Ocra.CHALLENGE), body, undefined));
                }, function (error) {
                    reject(error);
                });
            });
        }
    };
    Ocra.prototype.challengeWithEncryptedPin = function (body, callback) {
        var _this = this;
        if (callback && typeof callback === 'function') {
            PinEnforcer_1.PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(function () {
                return _this.connection.post(_this.baseUrl, _this.containerSuffix(Ocra.CHALLENGE), body, undefined, undefined, callback);
            }, function (error) {
                return callback(error, null);
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                PinEnforcer_1.PinEnforcer.checkAlreadyEncryptedPin(_this.connection, _this.reader_id, body).then(function () {
                    resolve(_this.connection.post(_this.baseUrl, _this.containerSuffix(Ocra.CHALLENGE), body, undefined));
                }, function (error) {
                    reject(error);
                });
            });
        }
    };
    Ocra.prototype.readCounter = function (body, callback) {
        var _this = this;
        if (callback && typeof callback === 'function') {
            PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
                return _this.connection.get(_this.baseUrl, _this.containerSuffix(Ocra.READ_COUNTER), { pin: body.pin }, undefined, callback);
            }, function (error) {
                return callback(error, null);
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                PinEnforcer_1.PinEnforcer.check(_this.connection, _this.reader_id, body).then(function () {
                    resolve(_this.connection.get(_this.baseUrl, _this.containerSuffix(Ocra.READ_COUNTER), { pin: body.pin }, undefined));
                }, function (error) {
                    reject(error);
                });
            });
        }
    };
    Ocra.prototype.readCounterWithEncryptedPin = function (body, callback) {
        var _this = this;
        if (callback && typeof callback === 'function') {
            PinEnforcer_1.PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(function () {
                return _this.connection.get(_this.baseUrl, _this.containerSuffix(Ocra.READ_COUNTER), { pin: body.pin }, undefined, callback);
            }, function (error) {
                return callback(error, null);
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                PinEnforcer_1.PinEnforcer.checkAlreadyEncryptedPin(_this.connection, _this.reader_id, body).then(function () {
                    resolve(_this.connection.get(_this.baseUrl, _this.containerSuffix(Ocra.READ_COUNTER), { pin: body.pin }, undefined));
                }, function (error) {
                    reject(error);
                });
            });
        }
    };
    Ocra.CONTAINER_PREFIX = 'ocra';
    Ocra.CHALLENGE = '/challenge';
    Ocra.READ_COUNTER = '/counter';
    return Ocra;
}(Card_1.GenericPinCard));
exports.Ocra = Ocra;
//# sourceMappingURL=ocra.js.map