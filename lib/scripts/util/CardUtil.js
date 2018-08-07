"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var RequestHandler_1 = require("./RequestHandler");
var CardUtil = (function () {
    function CardUtil() {
    }
    CardUtil.canAuthenticate = function (card) {
        var container = this.determineContainer(card);
        switch (container) {
            case 'aventra':
            case 'beid':
            case 'dnie':
            case 'luxeid':
            case 'luxtrust':
            case 'oberthur':
            case 'piv':
            case 'pteid':
                return true;
            case 'ocra':
            case 'emv':
            case 'mobib':
            default:
                return false;
        }
    };
    CardUtil.canSign = function (card) {
        var container = this.determineContainer(card);
        switch (container) {
            case 'aventra':
            case 'beid':
            case 'dnie':
            case 'luxeid':
            case 'luxtrust':
            case 'oberthur':
            case 'piv':
            case 'pteid':
            case 'pkcs11':
                return true;
            case 'ocra':
            case 'emv':
            case 'mobib':
            default:
                return false;
        }
    };
    CardUtil.canVerifyPin = function (card) {
        var container = this.determineContainer(card);
        switch (container) {
            case 'aventra':
            case 'beid':
            case 'dnie':
            case 'luxeid':
            case 'luxtrust':
            case 'oberthur':
            case 'ocra':
            case 'piv':
            case 'pteid':
            case 'emv':
                return true;
            case 'mobib':
            default:
                return false;
        }
    };
    CardUtil.determineContainer = function (card) {
        if (!_.isEmpty(card) && !_.isEmpty(card.description)) {
            if (findDescription(card.description, 'Belgium Electronic ID card')) {
                return 'beid';
            }
            else if (findDescription(card.description, 'DNI electronico')) {
                return 'dnie';
            }
            else if (findDescription(card.description, 'Grand Duchy of Luxembourg / Identity card with LuxTrust certificate (eID)')) {
                return 'luxeid';
            }
            else if (findDescription(card.description, 'LuxTrust card')) {
                return 'luxtrust';
            }
            else if (findDescription(card.description, 'Juridic Person\'s Token (PKI)')) {
                return 'ocra';
            }
            else if (findDescription(card.description, 'MOBIB')) {
                return 'mobib';
            }
            else if (findDescription(card.description, 'Oberthur')) {
                return 'oberthur';
            }
            else if (findDescription(card.description, 'Aventra')) {
                return 'aventra';
            }
            else if (findDescription(card.description, 'PIV')) {
                return 'piv';
            }
            else if (findDescription(card.description, 'CIV')) {
                return 'piv';
            }
            else if (findDescription(card.description, 'Portuguese')) {
                return 'pteid';
            }
            else if (findDescription(card.description, 'Mastercard') ||
                findDescription(card.description, 'American') ||
                findDescription(card.description, 'VISA')) {
                return 'emv';
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
        function findDescription(descriptions, toFind) {
            return !!_.find(descriptions, function (desc) {
                var lowercaseDesc = desc.toLowerCase();
                var lowercaseToFind = toFind.toLowerCase();
                return lowercaseDesc.indexOf(lowercaseToFind) > -1;
            });
        }
    };
    CardUtil.defaultAlgo = function (container) {
        switch (container) {
            case 'aventra':
            case 'beid':
            case 'dnie':
            case 'oberthur':
            case 'piv':
            case 'luxeid':
            case 'luxtrust':
            case 'pteid':
            case 'pkcs11':
                return 'sha256';
            default:
                return undefined;
        }
    };
    CardUtil.dumpMethod = function (container) {
        switch (container) {
            case 'aventra':
            case 'beid':
            case 'dnie':
            case 'emv':
            case 'luxeid':
            case 'luxtrust':
            case 'mobib':
            case 'oberthur':
            case 'ocra':
            case 'piv':
            case 'pteid':
                return 'allData';
            case 'pkcs11':
                return 'slots';
            default:
                return undefined;
        }
    };
    CardUtil.dumpOptions = function (container) {
        switch (container) {
            case 'aventra':
            case 'beid':
            case 'dnie':
            case 'luxeid':
            case 'luxtrust':
            case 'mobib':
            case 'oberthur':
            case 'ocra':
            case 'piv':
            case 'pteid':
                return new RequestHandler_1.Options(true, []);
            case 'pkcs11':
                return undefined;
            case 'emv':
                return new RequestHandler_1.Options(false, []);
            default:
                return undefined;
        }
    };
    return CardUtil;
}());
exports.CardUtil = CardUtil;
//# sourceMappingURL=CardUtil.js.map