/**
 * @author Maarten Somers
 */
import { Card } from '../core/service/CoreModel';
import * as _ from 'lodash';

export { CardUtil };

class CardUtil {

    public static canAuthenticate(card: Card): boolean {
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

    public static canSign(card: Card): boolean {
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

    public static canVerifyPin(card: Card): boolean {
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

    public static determineContainer(card: Card): string {
        if (!_.isEmpty(card) && !_.isEmpty(card.description)) {
            if (findDescription( card.description, 'Belgium Electronic ID card')) { return 'beid'; }
            else if (findDescription(card.description, 'DNI electronico')) {return 'dnie'; }
            else if (findDescription(card.description, 'Grand Duchy of Luxembourg / Identity card with LuxTrust certificate (eID)')) {
                return 'luxeid'; }
            else if (findDescription(card.description, 'LuxTrust card')) { return 'luxtrust'; }
            else if (findDescription(card.description, 'Juridic Person\'s Token (PKI)')) { return 'ocra'; }
            else if (findDescription(card.description, 'MOBIB')) { return 'mobib'; }
            else if (findDescription(card.description, 'Mastercard')) { return 'emv'; }
            else if (findDescription(card.description, 'Oberthur')) { return 'oberthur'; }
            else if (findDescription(card.description, 'Aventra')) { return 'aventra'; }
            else if (findDescription(card.description, 'PIV')) { return 'piv'; }
            else if (findDescription(card.description, 'CIV')) { return 'piv'; }
            else if (findDescription(card.description, 'Portuguese')) { return 'pteid'; }
            else { return undefined; }
        } else {
            return undefined;
        }

        function findDescription(descriptions: string[], toFind: string) {
            return !!_.find(descriptions, desc => {
                return desc.indexOf(toFind) > -1;
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
            case 'safenet':
                return 'slots';
            default:
                return undefined;
        }
    }

    public static dumpOptions(container: string) {
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
                return { filters: [], parseCerts: true };
            case 'safenet':
                return undefined;
            case 'emv':
                return [];
            default:
                return undefined;
        }
    }
}
