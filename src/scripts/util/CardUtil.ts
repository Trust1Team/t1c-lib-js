/**
 * @author Maarten Somers
 */
import * as lodash from 'lodash';
import { Options } from './RequestHandler';
import {SmartCard} from '../core/service/CoreModel';

export class CardUtil {

    public static canAuthenticate(card: SmartCard): boolean {
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

    public static canSign(card: SmartCard): boolean {
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

    public static canVerifyPin(card: SmartCard): boolean {
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

    public static determineContainer(card: SmartCard): string {
        if (!lodash.isEmpty(card) && !lodash.isEmpty(card.description)) {
            if (findDescription( card.description, 'Belgium Electronic ID card')) { return 'beid'; }
            else if (findDescription(card.description, 'DNI electronico')) {return 'dnie'; }
            else if (findDescription(card.description, 'Grand Duchy of Luxembourg / Identity card with LuxTrust certificate (eID)')) {
                return 'luxeid'; }
            else if (findDescription(card.description, 'LuxTrust card')) { return 'luxtrust'; }
            else if (findDescription(card.description, 'Juridic Person\'s Token (PKI)')) { return 'ocra'; }
            else if (findDescription(card.description, 'MOBIB')) { return 'mobib'; }
            else if (findDescription(card.description, 'Oberthur')) { return 'oberthur'; }
            else if (findDescription(card.description, 'Aventra')) { return 'aventra'; }
            else if (findDescription(card.description, 'PIV')) { return 'piv'; }
            else if (findDescription(card.description, 'CIV')) { return 'piv'; }
            else if (findDescription(card.description, 'Portuguese')) { return 'pteid'; }
            // emv check last to avoid any false positives
            else if (findDescription(card.description, 'Mastercard') ||
                     findDescription(card.description, 'American') ||
                     findDescription(card.description, 'VISA')) { return 'emv'; }
            else { return undefined; }
        } else {
            return undefined;
        }

        function findDescription(descriptions: string[], toFind: string) {
            return !!lodash.find(descriptions, desc => {
                // make sure there are no casing issues with our search strings
                const lowercaseDesc = desc.toLowerCase();
                const lowercaseToFind = toFind.toLowerCase();
                return lowercaseDesc.indexOf(lowercaseToFind) > -1;
            });
        }
    }

    public static defaultAlgo(container: string) {
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

    public static dumpMethod(container: string) {
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

    public static dumpOptions(container: string): Options {
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
                return new Options(true, []);
            case 'pkcs11':
                return undefined;
            case 'emv':
                return new Options(false, []);
            default:
                return undefined;
        }
    }
}
