/**
 * @author Maarten Somers
 */
import { Card } from "../core/service/CoreModel";
import * as _ from "lodash";

export { CardUtil };

class CardUtil {

    public static determineContainer(card: Card): string {
        if (!_.isEmpty(card) && !_.isEmpty(card.description)) {
            if (findDescription( card.description, "Belgium Electronic ID card")) { return "beid"; }
            else if (findDescription(card.description, "Grand Duchy of Luxembourg / Identity card with LuxTrust certificate (eID)")) {
                return "luxeid"; }
            else if (findDescription(card.description, "LuxTrust card")) { return "luxtrust"; }
            else if (findDescription(card.description, "Juridic Person's Token (PKI)")) { return "ocra"; }
            else if (findDescription(card.description, "MOBIB")) { return "mobib"; }
            else if (findDescription(card.description, "Mastercard")) { return "emv"; }
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
            case "aventra":
            case "beid":
            case "dni":
            case "oberthur":
            case "piv":
            case "luxeid":
            case "luxtrust":
                return "sha256";
            default:
                return undefined;
        }
    }
}
