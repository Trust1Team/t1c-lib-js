/**
 * @author Maarten Casteels
 * @since 2016
 */
import {BeIDCard} from "./smartcards/eid/be/BeIDCard";

export class Cards {
    // card factory


    private _belgiumElectronicID:BeIDCard;

    constructor(url:string) {
        this._belgiumElectronicID = new BeIDCard(url);
    }


    get belgiumElectronicID():BeIDCard {
        return this._belgiumElectronicID;
    }
}