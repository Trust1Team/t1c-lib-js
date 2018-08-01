"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const RequestHandler_1 = require("./RequestHandler");
class CardUtil {
    static canAuthenticate(card) {
        let container = this.determineContainer(card);
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
    }
    static canSign(card) {
        let container = this.determineContainer(card);
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
    }
    static canVerifyPin(card) {
        let container = this.determineContainer(card);
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
    }
    static determineContainer(card) {
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
            return !!_.find(descriptions, desc => {
                const lowercaseDesc = desc.toLowerCase();
                const lowercaseToFind = toFind.toLowerCase();
                return lowercaseDesc.indexOf(lowercaseToFind) > -1;
            });
        }
    }
    static defaultAlgo(container) {
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
    }
    static dumpMethod(container) {
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
    }
    static dumpOptions(container) {
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
    }
}
exports.CardUtil = CardUtil;
//# sourceMappingURL=CardUtil.js.map